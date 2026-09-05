# Nurshah Global &bull; Premier Physical Commodity Brokerage Portal

> **"We Weave Global Connections"** &mdash; *Old World Trust. New World Technology.*

Nurshah Global is an institutional physical commodity brokerage firm specializing in the global flow of high-value raw materials (Metals, Minerals, Energy Resources, Industrial Materials, and CleanTech Infrastructure).

---

## 🚀 Live Portal Structure

| Page | File | Core Functionality |
| :--- | :--- | :--- |
| **Home Overview** | [`index.html`](index.html) | Flagship landing page, container port hero, live spot ticker, bento grid features, top material allocations, and interactive shipment tracking lookup. |
| **Product Catalog** | [`products.html`](products.html) | 9 physical commodity cards with live category filter pills (Metals, CleanTech, Scrap, Agriculture, Textiles), instant search, specifications, and direct RFQ modal triggers. |
| **Rate Estimator & Listing** | [`estimate.html`](estimate.html) | Dynamic real-time calculation engine (CIF/FOB/CFR), port freight adjustments, transparent 5% brokerage margin breakdown, and supplier listing manager with `localStorage` persistence. |
| **About & Founder** | [`about.html`](about.html) | Company ethos, spotlight on Founder & CEO Muhammad Huzaifa Ali, authentic signature, and 4-step interactive shipment lifecycle flow. |
| **Contact HQ** | [`contact.html`](contact.html) | Direct desks (`admin@nurshah.com`, `huzaifaali@nurshah.com`), instant WhatsApp hotline, formal correspondence form with validation, and global trade route map. |

---

## 🛠️ Key Technical Features

1. **Tactile Modernist Design System**:
   - Soft skeuomorphic 3D beveled buttons with amber shadows (`assets/css/style.css`).
   - Deep Charcoal ecosystem (`#131313`) with Warm Gold accents (`#f2ca50`).
   - Noto Serif editorial typography paired with Manrope technical data sans.
2. **Live Spot Market Ticker**:
   - Continuous marquee bar tracking benchmark spot prices (LME Copper, Fe 62% Iron Ore, Thermal Coal, Aluminum P1020, Scrap HMS 1&2, Gold, Crude).
   - Real-time subtle price jitter every 6 seconds.
3. **Interactive Estimate Request Modal**:
   - Faithful implementation of the reference form (`image.png/screen.png`), pre-populating commodity names and MOQs with validation and receipt generation.
4. **Interactive Satellite Shipment Tracker**:
   - Try tracking codes: `NS-9942` (Copper to Rotterdam), `NS-8820` (Iron Ore to Qingdao), or `NS-7731` (Coal to Jebel Ali).
   - Visualizes vessel name, IMO, route progress bar, satellite AIS pings, and SGS / Bureau Veritas inspection documents.
5. **Supplier Listing Management**:
   - Submitted listings are preserved in browser `localStorage` and displayed under "Your Registered Commodity Listings" with broker assignment statuses.
6. **Zero-Dependency Architecture**:
   - Pure HTML5, Tailwind CSS CDN, and native JavaScript (`assets/js/main.js`).
   - Can be opened directly in any browser by double-clicking, or hosted on GitHub Pages / Vercel / Netlify with zero build step.

---

## 💻 Running Locally

### Option 1: Direct File
Simply double-click `index.html` in your file explorer.

### Option 2: Local HTTP Server (Node.js)
```bash
npm start
# or: npx serve . -l 3000
```
Open [http://localhost:3000](http://localhost:3000)

### Option 3: Python Server
```bash
npm run dev:python
# or: python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080)
