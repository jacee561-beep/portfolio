# Penny Scout

A personal side tool, not part of the portfolio site. It lives outside `public/`, so it never gets deployed.

It pulls every Home Depot penny item that shoppers have reported (Penny Recon and PennyCentral). Then it asks
Home Depot's own product system how each item is set up at the 10 stores nearest a ZIP code: CLEARANCE,
ACTIVE, INACTIVE or DELETED, plus the store's price and pickup stock. Items that are in clearance at a store,
with no pickup stock and strong recent reports, become that store's "best bets".

```bash
python3 penny-scanner/scan.py --zip 33462            # full scan, about 6 minutes
python3 penny-scanner/scan.py --rescore              # re-rank the last scan without re-scanning
```

The output is `penny-scanner/out/index.html`, a self-contained page published as the "Penny Scout" artifact.

What the data can't tell you: the aisle and bay (only the Home Depot app shows those) and whether an item is
actually $0.01. Only the register shows the penny price.
