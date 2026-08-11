# Domain — DONE

**Live at https://jacobgonzales.tv** (and `www.`), registered via Cloudflare Registrar on 2026-08-11 and bound
in `wrangler.jsonc` under `routes` with `custom_domain: true`.

Fallback: `https://portfolio.jacee561.workers.dev`.

> If the `jacobgonzales.tv` zone is ever removed from the Cloudflare account, **delete the
> `routes` block in `wrangler.jsonc` first** — otherwise every deploy fails and the site goes down.

Still worth doing: **Cloudflare Email Routing** for `jacob@jacobgonzales.tv` forwarding to
Gmail (free). The site currently lists a personal Gmail address.

---

<details><summary>Original setup notes (kept for reference)</summary>

# Connecting your domain

The site is live at `https://newportfoilio.jacee561.workers.dev`. This points a real
domain at it. Three steps, roughly 15 minutes plus DNS wait.

---

## Step 1 — Buy the domain

Both **jacobgonzales.org** and **jacobgonzales.tv** are confirmed available.
`jacobgonzales.com` / `.net` are taken (see the IONOS note below).

| | first year | renewal | notes |
|---|---|---|---|
| **.org** | often ~$0.50 on promo | ~$10-15/yr | **recommended** — cheapest long-term, and 49 of the 259 pieces here are nonprofit work across 15 nonprofit clients, so the association fits |
| **.tv** | ~$30-40 | ~$30-40/yr | reads as "video" instantly, but costs 3x forever |

**Always check the RENEWAL price at checkout, not the first-year price.** A $0.50 first year
that renews at $40 is a worse deal than a $12 domain. If renewal is $10-15, take it.

You can also have both later — multiple domains can point at the same Worker.

Where to buy, in order of preference:

1. **Cloudflare Registrar** (`dash.cloudflare.com` → Domain Registration → Register Domain).
   Sells at wholesale cost with no markup and no renewal hikes, and the site already lives on
   Cloudflare so everything is in one place. **Check whether they offer `.tv`** — their TLD list
   doesn't cover everything. If it's not there, use option 2.
2. **Porkbun** — consistently among the cheapest for `.tv`, honest renewal pricing.
3. **Namecheap** — fine, slightly pricier.

Turn **WHOIS privacy ON** (free at all three). Without it your name, address, phone and email
are published in a public database that spammers scrape.

> **Before buying anything:** `jacobgonzales.com` and `jacobgonzales.net` are both already
> registered at **IONOS**, on the same day, both unused. That looks like someone registering
> their own name. **Check whether that's your IONOS account first** — if it is, you already own
> a better domain for free.

---

## Step 2 — Put the domain on Cloudflare

*Skip this entirely if you bought through Cloudflare Registrar — it's already done.*

1. `dash.cloudflare.com` → **Add a domain** → type your domain → choose the **Free** plan.
2. Cloudflare gives you two nameservers, e.g. `dana.ns.cloudflare.com`.
3. Go to the registrar you bought from → find **Nameservers** → replace theirs with Cloudflare's two.
4. Wait. Usually minutes, occasionally a few hours.

---

## Step 3 — Bind it to the site

Once the domain shows **Active** in Cloudflare, tell Claude Code and it will add this to
`wrangler.jsonc` and push — the next deploy binds the domain automatically:

```jsonc
"routes": [
  { "pattern": "jacobgonzales.org",     "custom_domain": true },
  { "pattern": "www.jacobgonzales.org", "custom_domain": true }
]
```

**This is deliberately not committed yet.** Deploying a `custom_domain` route for a domain that
isn't in the Cloudflare account yet makes the deploy fail — which would take the working site
down. It goes in only after Step 2 is confirmed Active.

Doing it by hand instead: **Workers & Pages** → `newportfoilio` → **Settings** → **Domains &
Routes** → **Add** → **Custom domain**. Cloudflare creates the DNS record and issues the HTTPS
certificate on its own.

---

## Step 4 — Verify

Claude Code can confirm end to end:
- the domain and its `www.` both resolve
- HTTPS certificate issued and valid
- all pieces load on the real domain
- the old `.workers.dev` URL still works as a fallback

---

## Notes

- **Keep the `.workers.dev` URL.** It keeps working and is a useful fallback if DNS ever breaks.
- **Renewal:** put a calendar reminder a month before expiry, or enable auto-renew. A lapsed
  domain can be bought out from under you and they are expensive to recover.
- **Email is separate.** Buying the domain does not give you an address on it. If you
  want `jacob@yourdomain`, Cloudflare Email Routing forwards to Gmail for free — worth doing, since the site
  currently lists a personal Gmail address.

</details>
