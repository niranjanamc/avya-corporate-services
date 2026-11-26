# AVYA Corporate Services — Enterprise Operations & Compliance Platform

> **Bengaluru's Trusted Corporate Operations, Statutory Liaison, Facilities Coordination & Logistics Partner**  
> Serving leading IT / ITeS Enterprises, Multinational Corporations, Fleet Operators & Institutions.  
> Primary Coordinates: 131/9, SMIGB, 5th Phase, Yelahanka New Town, Bangalore - 560064  
> Direct Desk / WhatsApp: `+91 99165 99960` | Email: `contacts@avyaservices.in`

---

## 🌟 Overview & Architecture

**AVYA Corporate Services** offers a wide range of business support and corporate assistance services, helping organizations simplify their day-to-day operational and administrative requirements through a single point of contact, ensuring smooth coordination and timely execution.

### Key Service Pillars
1. **Business Support Services (`business-support.html`)**:
   - Coordination and support for small vendors, office florists, daily newspaper/periodical subscriptions, and local workplace maintenance under one consolidated monthly GST invoice.
2. **RTO & Fleet Liaison Services (`rto-services.html`)**:
   - Comprehensive assistance for corporate fleets and employee vehicles: RC transfers, hypothecation cancellations, commercial vehicle fitness certificates (FC), inter-state NOCs, and driving licence services across all Bangalore RTOs.
3. **Stamp Paper & Notary Services (`stamp-paper-notary.html`)**:
   - Government-authorized Karnataka e-stamp paper procurement (all denominations: ₹20 to ₹1000+), legal agreement drafting (NDAs, MSAs, commercial leases), affidavits, and registered Notary Public attestations with campus delivery.
4. **CSR Initiatives & Supply Kits (`csr-services.html`)**:
   - Corporate-to-NGO initiative planning, turnkey wholesale procurement, assembly, and verified distribution of medical kits, grocery ration kits, winter blankets, clothing, and student school packs with photo-audit proof for Section 135 compliance.
5. **Corporate Passport Services (`passport-services.html`)**:
   - Dedicated employee travel mobility desk: application pre-scrutiny, Tatkal expedited filings, Police Clearance Certificates (PCC) for onsite deputation, and PSK appointment slot coordination.
6. **Courier Services & IT Asset Movement (`courier-asset-movement.html`)**:
   - Secure doorstep transit for employee IT laptops, monitors, and computing workstations for remote/hybrid teams, with anti-static shock packaging and multi-carrier tier-1 courier partnerships (Blue Dart, DHL, DTDC, FedEx).
7. **Tailored Corporate Support / Operational Concierge**:
   - Bespoke administrative solutions, municipal/trade license assistance, and on-demand facility errand logistics.

---

## 📁 Repository Structure

```text
avya-corporate-services/
├── index.html                      # Homepage & master corporate hub
├── business-support.html           # Dedicated page: Facility & Daily Vendor Coordination
├── rto-services.html               # Dedicated page: Corporate Fleet & RTO Liaison
├── stamp-paper-notary.html         # Dedicated page: E-Stamps, Drafting & Notarisation
├── csr-services.html               # Dedicated page: Turnkey CSR Supplies & NGO Liaison
├── passport-services.html          # Dedicated page: Corporate Passport & PCC Desk
├── courier-asset-movement.html     # Dedicated page: IT Hardware Logistics & Courier
├── assets/
│   ├── logo.svg                    # Vector brand logo (Light mode)
│   ├── logo-dark.svg               # Vector brand logo (Dark mode)
│   ├── favicon.svg                 # High-resolution favicon
│   ├── icons/                      # Custom-crafted geometric gold & obsidian service icons
│   │   ├── icon-business-support.svg
│   │   ├── icon-rto-services.svg
│   │   ├── icon-stamp-notary.svg
│   │   ├── icon-csr-services.svg
│   │   ├── icon-passport-services.svg
│   │   └── icon-courier-asset.svg
│   └── images/                     # Hero section visuals
├── css/
│   ├── theme.css                   # Design tokens, obsidian & champagne gold palettes
│   ├── components.css              # Buttons, badges, cards, toasts, modals
│   ├── main.css                    # Main layout, hero, grid styles, footer
│   ├── service-pages.css           # Dedicated service pages layout
│   └── chatbot.css                 # Floating AI Concierge interface & chat bubbles
├── js/
│   ├── config.js                   # MASTER EDITABLE CONFIGURATION (Source of truth)
│   ├── hydrate-config.js           # Automated DOM placeholder hydrator
│   ├── theme.js                    # Auto dark/light system detection & manual toggle
│   ├── data.js                     # Content model for services, solutions, FAQs, testimonials
│   ├── chatbot.js                  # AI Chatbot controller, Gemini API caller, lead router
│   └── main.js                     # Navigation, counters, accordions, and contact form
└── README.md                       # Comprehensive platform documentation
```

---

## ⚙️ Master Configuration (`js/config.js`)

All company coordinates, phones, addresses, and services are centrally controlled in:
👉 `js/config.js`

Any modification to `js/config.js` automatically hydrates across the homepage and all dedicated pages via `js/hydrate-config.js`.

---

## 🚀 GoDaddy Domain & Go-Live Setup

### If Hosting on GitHub Pages (Recommended, Free & Fast):
1. **In GoDaddy DNS Management Zone:**
   - Under your registered domain, add **4 `A` Records** for `@` pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Add/Update **1 `CNAME` Record** for `www` pointing to:
     ```
     niranjanamc.github.io.
     ```
2. **In GitHub Repository Settings:**
   - Go to **Settings** > **Pages**.
   - Under **Custom domain**, enter your domain (e.g., `avyaservices.in`).
   - Check **Enforce HTTPS**.
   - Your site is live with a free SSL certificate within minutes!

### If Hosting on GoDaddy cPanel / Linux Web Hosting:
1. Upload all files from this repository directly into the `public_html/` root folder.
2. In GoDaddy cPanel, enable **AutoSSL** for free HTTPS certification.
