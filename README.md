# DisciplineOS

**Personal Recovery Operating System** — habits, recovery score, emergency SOS, journal, and trigger intelligence.

🔗 **Live:** https://shamikhahmed.github.io/DisciplineOS/  
📁 **Repo:** https://github.com/shamikhahmed/DisciplineOS

---

## Install on iPhone

1. Open the live URL in **Safari** (same Wi‑Fi not required — hosted on GitHub Pages)
2. **Share → Add to Home Screen**
3. Launch from home screen for full-screen PWA mode

## iPhone test checklist

- [ ] Onboarding completes and lands on dashboard
- [ ] Bottom nav switches all tabs (Dashboard, Recovery, Emergency, Knowledge, Journal, Profile)
- [ ] Recovery score renders on dashboard
- [ ] Emergency SOS screen opens
- [ ] App works in airplane mode after first load (offline SW)
- [ ] Safe area: no content under notch / home indicator

## Local dev

```bash
cd DisciplineOS
python3 -m http.server 8765
# → http://localhost:8765
```

## Stack

Vanilla JS PWA · orange accent `#FF6B35` · offline-first · localStorage

## Modules

- **Dashboard** — recovery score, habits, daily pulse
- **Recovery** — timelines, craving forecast, body engine
- **Emergency** — SOS flow, grounding tools
- **Knowledge** — recovery library
- **Journal** — daily entries
- **Profile** — settings and identity

---

Built by Shamikh Ahmed.
