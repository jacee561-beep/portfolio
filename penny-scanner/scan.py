#!/usr/bin/env python3
"""Penny scanner.

Pulls every Home Depot penny item that shoppers have reported (Penny Recon and
PennyCentral), then asks Home Depot's own product system how each item is set
up at every store near a ZIP code: CLEARANCE, ACTIVE, INACTIVE or DELETED,
plus the store's price and pickup stock. Items in CLEARANCE at a store are the
ones most likely to ring up $0.01 there.

Writes out/data.json and out/index.html (a self-contained page with images
inlined, ready to publish as an Artifact).

    python3 penny-scanner/scan.py --zip 33462 --radius 20 --stores 10

Standard library only. Runs in about five minutes.
"""
import argparse
import base64
import html
import json
import os
import re
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"
GQL = "https://www.homedepot.com/federation-gateway/graphql?opname="

# Cities whose reports count as "near you" for a Palm Beach County shopper.
NEARBY_CITIES = {
    "lake worth", "lake worth beach", "lantana", "boynton beach", "west palm beach", "palm beach",
    "royal palm beach", "wellington", "greenacres", "delray beach", "boca raton", "jupiter",
    "palm beach gardens", "lake park", "riviera beach", "loxahatchee", "deerfield beach",
    "pompano beach", "coconut creek", "coral springs", "fort lauderdale", "stuart",
}


def get(url, data=None, timeout=30):
    headers = {"User-Agent": UA}
    if data is not None:
        headers.update({"Content-Type": "application/json", "x-experience-name": "general-merchandise",
                        "x-hd-dc": "origin"})
        data = json.dumps(data).encode()
    req = urllib.request.Request(url, data=data, headers=headers)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except Exception as e:  # network blips: retry with backoff
            if attempt == 2:
                raise
            time.sleep(2 * (attempt + 1))


def gql(op, query, variables=None):
    raw = get(GQL + op, {"operationName": None, "query": query, "variables": variables or {}})
    return json.loads(raw.decode("utf-8", "replace"))


def text_of(fragment):
    t = re.sub(r"<script[\s\S]*?</script>|<style[\s\S]*?</style>", " ", fragment)
    t = html.unescape(re.sub(r"<[^>]+>", "|", t))
    return re.sub(r"\s*\|[\s|]*", "|", t)


# ---------------------------------------------------------------- sources

def from_pennyrecon():
    s = get("https://www.pennyrecon.com/").decode("utf-8", "replace")
    items = []
    for attrs, body in re.findall(r'<article class="card[^"]*"([^>]*)>([\s\S]*?)</article>', s):
        a = dict(re.findall(r'data-([a-z-]+)="([^"]*)"', attrs))
        if not a.get("sku"):
            continue
        detail = json.loads(html.unescape(a.get("detail") or "{}") or "{}")
        link = re.search(r'homedepot\.com/p/(?:[^"]*/)?(\d{9})', body)
        t = text_of(body).split("|")
        likelihood = next((x for x in t if x.endswith("likelihood")), "")
        items.append({
            "sku": a["sku"].lstrip("0"),
            "name": re.sub(r"\s*\d{3,4}-\d{3}-\d{3}\s*$", "", a.get("name", "")).strip(),
            "itemId": link.group(1) if link else None,
            "retail": float(a.get("retail") or 0) or None,
            "reports": int(a.get("reports") or 0),
            "states": [x for x in a.get("states", "").split(",") if x],
            "fl": detail.get("FL", {}).get("n", 0),
            "flCities": detail.get("FL", {}).get("c", []),
            "lastSeen": int(a["last"]) // 1000 if a.get("last") else None,
            "tier": a.get("tier"),
            "reconScore": float(a.get("score") or 0),
            "likelihood": likelihood.replace(" likelihood", ""),
            "sources": ["Penny Recon"],
        })
    return items


def from_pennycentral():
    s = get("https://www.pennycentral.com/penny-list").decode("utf-8", "replace")
    items = {}
    for chunk in re.split(r'aria-labelledby="item-', s)[1:]:
        m = re.match(r"(\d+)-name", chunk)
        if not m:
            continue
        sku = m.group(1).lstrip("0")
        body = chunk[:12000]
        t = text_of(body)
        when = re.search(r'dateTime="([^"]+)"', body)
        reports = re.search(r"\|(\d+)\|reports?\|", t)
        retail = re.search(r'line-through">\$([\d,.]+)', body)
        chips = dict((st, int(n)) for st, n in re.findall(r"\|([A-Z]{2})\|(\d+)\|", t))
        last = None
        if when:
            last = int(datetime.fromisoformat(when.group(1).replace("Z", "+00:00")).timestamp())
        prev = items.get(sku)
        if prev and (prev["reports"] or 0) >= (int(reports.group(1)) if reports else 0):
            continue
        items[sku] = {
            "sku": sku, "itemId": None,
            "name": html.unescape(re.search(r'<h3[^>]*title="([^"]*)"', body).group(1))
            if re.search(r'<h3[^>]*title="([^"]*)"', body) else "",
            "retail": float(retail.group(1).replace(",", "")) if retail else None,
            "reports": int(reports.group(1)) if reports else 0,
            "states": list(chips), "fl": chips.get("FL", 0), "flCities": [],
            "lastSeen": last, "tier": None, "reconScore": 0, "likelihood": "",
            "sources": ["PennyCentral"],
        }
    return list(items.values())


def merge(*lists):
    out = {}
    for lst in lists:
        for it in lst:
            cur = out.get(it["sku"])
            if not cur:
                out[it["sku"]] = dict(it)
                continue
            cur["sources"] = sorted(set(cur["sources"] + it["sources"]))
            cur["itemId"] = cur["itemId"] or it["itemId"]
            cur["retail"] = cur["retail"] or it["retail"]
            cur["reports"] = max(cur["reports"], it["reports"])
            cur["fl"] = max(cur["fl"], it["fl"])
            cur["states"] = sorted(set(cur["states"]) | set(it["states"]))
            cur["lastSeen"] = max(x for x in (cur["lastSeen"], it["lastSeen"], 0) if x is not None) or None
    return list(out.values())


# ---------------------------------------------------------------- Home Depot

def nearby_stores(zip_code, radius, limit):
    q = ('query($z: String!, $r: Float!, $l: Int) { storeSearch(zipCode: $z, radius: $r, limit: $l) '
         '{ storeId storeName distance phone address { street city postalCode } } }')
    d = gql("storeSearch", q, {"z": zip_code, "r": float(radius), "l": limit})
    stores = []
    for s in d["data"]["storeSearch"] or []:
        stores.append({"id": s["storeId"], "name": s["storeName"], "miles": round(float(s["distance"]), 1),
                       "phone": s["phone"], "street": s["address"]["street"], "city": s["address"]["city"]})
    return stores


SEARCH_Q = ("query($k: String, $s: String) { searchModel(keyword: $k, storeId: $s) "
            "{ products(startIndex: 0, pageSize: 24) { itemId identifiers { storeSkuNumber } } } }")


def resolve_item_id(sku, name, store_id):
    """Penny sites don't always link the product. Find it by name, matched on store SKU."""
    words = re.sub(r"[^\w\s./+-]", " ", name or "").split()
    for kw in [sku, " ".join(words[:8]), " ".join(words[:5])]:
        if not kw:
            continue
        try:
            d = gql("searchModel", SEARCH_Q, {"k": kw, "s": store_id})
            for p in (d.get("data") or {}).get("searchModel", {}).get("products") or []:
                if (p["identifiers"].get("storeSkuNumber") or "").lstrip("0") == sku:
                    return p["itemId"]
        except Exception:
            pass
        time.sleep(0.3)
    return None


BASE_Q = ('query($id: String!) { product(itemId: $id) { itemId '
          'identifiers { storeSkuNumber productLabel brandName } '
          'availabilityType { discontinued } media { images { url } } } }')

# One store per request: Home Depot's API returns null for aliased fulfillment/pricing fields.
STORE_Q = ('query($id: String!, $s: String) { product(itemId: $id) { '
           'fulfillment(storeId: $s) { anchorStoreStatusType fulfillmentOptions '
           '{ type services { type locations { isAnchor inventory { quantity } } } } } '
           'pricing(storeId: $s) { value original } } }')


def check_store(item_id, sid):
    d = gql("productClientOnlyProduct", STORE_Q, {"id": item_id, "s": sid})
    p = (d.get("data") or {}).get("product") or {}
    f = p.get("fulfillment") or {}
    pr = p.get("pricing") or {}
    qty = None
    for fo in f.get("fulfillmentOptions") or []:
        if fo.get("type") == "pickup":
            for sv in fo.get("services") or []:
                for loc in sv.get("locations") or []:
                    if loc.get("isAnchor"):
                        qty = (loc.get("inventory") or {}).get("quantity")
    return {"status": f.get("anchorStoreStatusType"), "qty": qty,
            "price": pr.get("value"), "was": pr.get("original")}


def check_item(item_id, stores, pool):
    d = gql("productClientOnlyProduct", BASE_Q, {"id": item_id})
    errs = " ".join(e.get("message", "") for e in d.get("errors") or [])
    p = (d.get("data") or {}).get("product")
    if not p:
        return {"hidden": "hide item is true" in errs, "error": errs[:200]}
    out = {"hidden": False, "name": p["identifiers"].get("productLabel"),
           "brand": p["identifiers"].get("brandName"),
           "storeSku": (p["identifiers"].get("storeSkuNumber") or "").lstrip("0"),
           "discontinued": bool((p.get("availabilityType") or {}).get("discontinued")),
           "image": ((p.get("media") or {}).get("images") or [{}])[0].get("url"), "stores": {}}
    ids = [s["id"] for s in stores]
    for sid, res in zip(ids, pool.map(lambda sid: check_store(item_id, sid), ids)):
        out["stores"][sid] = res
    return out


# ---------------------------------------------------------------- scoring

def verdict(st, retail, hidden):
    """What a store's record says about the odds. Returns (key, label, points)."""
    if hidden:
        return "maybe", "Hidden from homedepot.com", 22
    if not st or not st.get("status"):
        return "unknown", "Not carried / no record", 0
    status = st["status"]
    if status == "CLEARANCE":
        # Penny items usually drop out of pickup inventory; listed stock means it is still being sold.
        if st.get("qty"):
            return "go", "Clearance, still listed for pickup", 28
        return "go", "Clearance, pulled from pickup", 40
    if status == "INACTIVE":
        return "maybe", "Inactive at this store", 18
    if status == "DELETED":
        return "gone", "Deleted at this store", 0
    price, ref = st.get("price"), st.get("was") or retail
    if price and ref and price < ref * 0.8:
        return "watch", "Marked down, not clearance yet", 10
    return "skip", "Full price, normal stock", 0


def report_points(item, now):
    """Up to ~80 points for how strongly shoppers are reporting this item right now."""
    pts = min(item.get("reconScore", 0) / 4, 25)
    pts += min(item["reports"], 40) / 2
    pts += min(item["fl"] * 4, 16)
    if any(c.lower() in NEARBY_CITIES for c in item.get("flCities", [])):
        pts += 10
    if item.get("lastSeen"):
        days = (now - item["lastSeen"]) / 86400
        pts += 10 if days <= 3 else 5 if days <= 7 else 0 if days <= 21 else -15
    if item.get("discontinued"):
        pts += 6
    return pts


BEST_BET = 55  # go + score at or above this = "Best bets" on the page


def score(data):
    for it in data["items"]:
        rp = report_points(it, data["generated"])
        for sid, st in it["stores"].items():
            key, label, pts = verdict(st, it["retail"], it["hidden"])
            st.update(verdict=key, label=label, score=round(pts + rp, 1) if pts else 0,
                      best=key == "go" and pts + rp >= BEST_BET)


def write_outputs(data, out):
    score(data)
    with open(os.path.join(out, "data.json"), "w") as f:
        json.dump(data, f)
    template = open(os.path.join(HERE, "page.html"), encoding="utf-8").read()
    page = template.replace("/*__DATA__*/null", json.dumps(data).replace("</", "<\\/"))
    with open(os.path.join(out, "index.html"), "w", encoding="utf-8") as f:
        f.write(page)


def thumb(url, cache):
    if not url:
        return None
    if url in cache:
        return cache[url]
    try:
        raw = get(url.replace("<SIZE>", "145"), timeout=20)
        cache[url] = "data:image/jpeg;base64," + base64.b64encode(raw).decode()
    except Exception:
        cache[url] = None
    return cache[url]


# ---------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--zip", default="33462")
    ap.add_argument("--radius", type=int, default=20)
    ap.add_argument("--stores", type=int, default=10)
    ap.add_argument("--home-store", default="6316", help="store shown first on the page")
    ap.add_argument("--out", default=os.path.join(HERE, "out"))
    ap.add_argument("--rescore", action="store_true",
                    help="re-rank the last scan's data.json and rebuild the page without re-scanning")
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)
    if args.rescore:
        with open(os.path.join(args.out, "data.json")) as f:
            write_outputs(json.load(f), args.out)
        return
    now = int(time.time())

    stores = nearby_stores(args.zip, args.radius, args.stores)
    print(f"{len(stores)} stores near {args.zip}", file=sys.stderr)

    sources = []
    for name, fn in (("Penny Recon", from_pennyrecon), ("PennyCentral", from_pennycentral)):
        try:
            got = fn()
            print(f"{name}: {len(got)} items", file=sys.stderr)
            sources.append(got)
        except Exception as e:
            print(f"{name} failed: {e}", file=sys.stderr)
    items = merge(*sources)

    pool = ThreadPoolExecutor(max_workers=5)
    images, results = {}, []
    for n, it in enumerate(items, 1):
        if not it["itemId"]:
            it["itemId"] = resolve_item_id(it["sku"], it.get("name", ""), stores[0]["id"])
        if not it["itemId"]:
            continue
        try:
            hd = check_item(it["itemId"], stores, pool)
        except Exception as e:
            print(f"  {it['sku']}: {e}", file=sys.stderr)
            continue
        time.sleep(0.2)
        if hd.get("error") and not hd["hidden"]:
            continue
        results.append({
            "sku": it["sku"], "itemId": it["itemId"],
            "name": hd.get("name") or (it.get("name") or "").title() or "Hidden on homedepot.com",
            "brand": hd.get("brand") or "", "retail": it["retail"], "reports": it["reports"],
            "stateCount": len(it["states"]), "fl": it["fl"], "flCities": it["flCities"],
            "lastSeen": it["lastSeen"], "reconScore": it["reconScore"], "sources": it["sources"],
            "hidden": hd["hidden"], "discontinued": hd.get("discontinued", False),
            "image": thumb(hd.get("image"), images),
            "stores": {s["id"]: dict((hd.get("stores") or {}).get(s["id"]) or {}) for s in stores},
        })
        if n % 20 == 0:
            print(f"  checked {n}/{len(items)}", file=sys.stderr)

    data = {"generated": now, "zip": args.zip, "homeStore": args.home_store, "stores": stores,
            "itemsChecked": len(results), "itemsReported": len(items), "items": results}
    write_outputs(data, args.out)
    best = sum(1 for r in results for v in r["stores"].values() if v["best"])
    print(f"done: {len(results)} items checked, {best} best bets across {len(stores)} stores "
          f"-> {args.out}/index.html", file=sys.stderr)


if __name__ == "__main__":
    main()
