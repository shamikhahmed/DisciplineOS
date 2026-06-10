# DisciplineOS — Security Notes

## Local-only data

- Habits, medicines, journal entries, craving logs, and SOS content live in **localStorage** on your device.
- **No telemetry**, accounts, or cloud sync.
- Journal trigger chips and TriggerEngine forecasts are computed locally — patterns never leave the device.

## Medical disclaimer

- DisciplineOS is **not a medical device** and does not provide diagnosis or treatment.
- SOS tools support self-directed recovery; **seek professional help** for crisis, withdrawal, or mental health emergencies.
- Medicine reminders are convenience features — verify doses with your clinician.

## Sensitive data

- Recovery data may include substance use, financial savings, and personal goals. Protect device access and exported JSON backups.
- Spiritual mode and prayer anchors are optional — no religious data is transmitted.

## PWA / supply chain

- Static assets served from GitHub Pages; verify `sw.js` cache version (`discipline-v6`) when updating.
- Do not commit `.env` or API keys to the repository.

## Reporting

Open a private security issue on the [DisciplineOS GitHub repo](https://github.com/shamikhahmed/SteadyCap) for vulnerabilities.
