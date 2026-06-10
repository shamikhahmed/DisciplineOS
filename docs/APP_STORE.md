# DisciplineOS — App Store / TestFlight Prep

## Current state
- **Shipped as PWA** on GitHub Pages (Add to Home Screen).
- **Capacitor scaffold (planned):** wrap static build in `@capacitor/core` iOS shell.

## Capacitor plan
1. `npm init` + `@capacitor/cli` in repo root (webDir: `.`)
2. `npx cap add ios` — copy `index.html` entry, icons from `icon-512.png`
3. Configure `Info.plist`: `NSPhotoLibraryUsageDescription` if photos (DeePonyOS)
4. Disable third-party cookies; keep localStorage/IndexedDB

## TestFlight checklist
- [ ] App icons 1024×1024 from `icon-512.png`
- [ ] Privacy nutrition labels: **Data Not Collected** (local-only)
- [ ] Screenshots: iPhone 6.7" + 6.1"
- [ ] Review notes: offline PWA, no account required
- [ ] Export compliance: no encryption beyond standard iOS APIs

## Disclaimers (Recovery OS)
- Not medical advice. SOS tools support recovery; seek professional help when needed.

## Version
See `VERSION.json` — current `2.0.0`.
