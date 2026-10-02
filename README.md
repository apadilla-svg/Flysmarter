# FlySmarter v0.5 Prototype

v0.5 cleans up the date-search logic and prepares the prototype for live data.

## v0.5 changes
- Fixed the exact-date vs. flexible-date flow.
- If dates are NOT flexible, users see Departure Date + Return Date.
- If dates ARE flexible, those exact-date fields disappear and are replaced by Earliest Departure + Latest Return + Trip Length.
- One-way searches hide Return Date; flexible one-way searches use Earliest Departure + Latest Departure.
- Kept the broader v0.4 destination autocomplete intact.
- Kept airfare as the primary comparison and gas/parking as secondary context.

## Live-data preparation
The current destination list is still bundled with the prototype so the site remains self-contained. The next data layer can replace it with a generated airport index sourced from OurAirports. OurAirports publishes public-domain CSV data with airport name, municipality, IATA code, scheduled-service status, latitude, and longitude.

Live airfare is not connected yet. API credentials should be stored server-side (for example in Vercel environment variables), never in browser-side app.js.

All displayed fares remain simulated prototype data.
