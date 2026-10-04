# Avya Corporate Services — Official Web Platform

> **Bengaluru's Premier Brand Execution, Corporate Gifting, Print Media & Enterprise Hospitality Partner**  
> Serving leading IT / ITeS Enterprises & Multinational Corporations across India.  
> Primary Domains: `avyaservices.in` | `avyaservices.co.in`  
> Direct Inquiries: `contacts@avyaservices.in`

---

## 🌟 Overview

**Avya Corporate Services** (formerly Designz, established in 2009 in Koramangala, Bengaluru) is an enterprise vendor partner specializing in end-to-end brand execution, custom corporate gifting, full-spectrum print media, and domestic corporate travel management.

This platform is engineered using modern, high-performance, accessible, and responsive web standards.

---

## 🎨 Brand Identity & Design System

The visual design is grounded directly in the official **Avya Corporate Services** brand mark:
- **Warm Champagne Gold**: `#C5A059` / `#D4AF37` / `#DFBA5C`
- **Obsidian / Onyx Black**: `#0B0C10` / `#111215` / `#1A1D27`
- **Pristine Ivory / Light Surfaces**: `#FFFFFF` / `#F8F9FA` / `#EEF0F5`
- **Typography**: Display serif (`Cinzel`, `Playfair Display`) paired with clean geometric sans-serif (`Plus Jakarta Sans`, `Inter`).
- **Dark & Light Mode**: Seamless automatic detection using the user's browser/system preferences (`prefers-color-scheme`), with manual override saved in `localStorage`.
- **Adaptive Vector Logos**: Crisp SVGs (`assets/logo.svg` and `assets/logo-dark.svg`) providing infinite resolution on Retina displays.

---

## 🚀 Key Service Pillars

1. **Corporate Gifting & Swag (Primary Business Engine)**:
   - Employee Onboarding & Welcome Boxes
   - Diwali, New Year & Festive Luxury Hampers
   - High-end Tech Accessories & Branded Merchandise
   - Eco-Friendly & Sustainable Gifting Collections
   - Pan-India Direct-to-Employee Doorstep Fulfilment

2. **Full-Spectrum Print Media Services**:
   - Corporate Stationery: Business cards, embossed letterheads, presentation folders
   - Marketing Collateral: High-GSM brochures, product catalogues, annual reports
   - Custom Packaging: Rigid gift boxes with die-cut EVA foam inserts, branded sleeves
   - Large-Format & Outdoor: Roll-up standees, backdrop banners, vinyl prints, acrylic directional signage
   - Luxury Specialty Finishes: Spot UV, gold & silver foil stamping, debossing/embossing

3. **Corporate Domestic Travel & Hospitality**:
   - Curated Corporate Homestays & Private Villas (Coorg, Chikmagalur, Wayanad, Goa, Ooty, Rishikesh)
   - Corporate Event Planning & Strategy Execution
   - Business Hotel Bookings at Negotiated Enterprise Rates
   - Leadership Retreats, Workations, Hackathons & Team Building
   - Single-Window Consolidated Corporate Billing & Full GST Compliance

4. **MNC Vendor Hub & IT/ITeS Credentials**:
   - Registered corporate vendor with Fortune 500 & top-tier IT companies
   - Procurement Integration: SAP Ariba, Coupa, standard Corporate PO & MSA contracts
   - ISO 9001 quality audits & NDA-backed data protection
   - Multi-campus consolidated logistics (Bengaluru, Hyderabad, Pune, Chennai, Gurugram, Noida, Mumbai)

5. **Rewards & Recognition (R&R)**:
   - K9 Optical Crystal & Sculptured Metal Trophies
   - Laser-engraved plaques, long-service tenure commemorative awards, and custom presentation cases

---

## 🤖 AI-Assisted Executive Concierge Chatbot

The platform includes a built-in floating AI Chatbot widget configured specifically for corporate lead acquisition:
- **Intelligent Guided Lead Flow**: Greets visitors, qualifies requirements (Gifting, Print Media, Travel, R&R), captures contact coordinates (Name, Company, Work Email, Phone), volume, timeline, and budget.
- **Lead Dossier Generation**: Summarizes the requirements and automatically routes the inquiry to `contacts@avyaservices.in`.
- **Live Google Gemini API Integration**: Features an integrated configuration modal where an administrator or user can input their Google Gemini API Key. When active, the bot uses the official Gemini API with pre-prompted corporate domain knowledge for open-ended conversation.
- **Local Persistence & Mailto Fallback**: Inquiries are saved in browser storage (`localStorage`) and provide a one-click pre-filled email client link for immediate dispatch.

---

## 📁 Repository Structure

```text
avya-corporate-services/
├── index.html              # Semantic, responsive, SEO-optimized markup
├── assets/
│   ├── logo.svg            # Crisp vector brand logo (light mode)
│   ├── logo-dark.svg       # Crisp vector brand logo (dark mode)
│   └── favicon.svg         # High-resolution vector favicon
├── css/
│   ├── theme.css           # Design tokens, color palettes, dark/light theme variables
│   ├── components.css      # Buttons, badges, cards, toasts, modals
│   ├── main.css            # Navigation, hero, services, process, footer layout
│   └── chatbot.css         # Floating AI Concierge interface & chat bubbles
├── js/
│   ├── theme.js            # Auto-detection of system dark/light mode & toggle
│   ├── data.js             # Comprehensive content model for services, solutions, FAQs
│   ├── chatbot.js          # AI Chatbot controller, Gemini API caller, lead router
│   └── main.js             # Navigation, counters, accordions, and contact form
├── .gitignore              # Standard git exclusion rules
└── README.md               # Architecture and documentation
```

---

## 🛠️ Local Development & Deployment

### Running Locally
No heavy build steps or npm installations are required! Simply open `index.html` in any modern web browser, or launch a local static server:

```bash
# Using Python 3
python3 -m http.server 8080

# Or using npx serve
npx serve .
```
Navigate to `http://localhost:8080`.

### Hosting on GitHub Pages / Vercel / Netlify
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/<username>/avya-corporate-services.git
   git branch -M main
   git push -u origin main
   ```
2. Enable **GitHub Pages** under `Settings > Pages > Source: main branch / (root)`.
3. Configure your custom domains: `avyaservices.in` and `avyaservices.co.in`.
