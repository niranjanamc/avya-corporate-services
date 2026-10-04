# Avya Corporate Services — Multi-Page Enterprise Platform

> **Bengaluru's Premier Brand Execution, Corporate Gifting, Print Media & Enterprise Hospitality Partner**  
> Serving leading IT / ITeS Enterprises & Multinational Corporations across India.  
> Primary Domains: `avyaservices.in` | `avyaservices.co.in`  
> Direct Inquiries: `contacts@avyaservices.in`

---

## 🌟 Overview & Architecture

**Avya Corporate Services** (formerly Designz, established in 2009 in Koramangala, Bengaluru) is an enterprise vendor partner specializing in end-to-end brand execution, custom corporate gifting, full-spectrum print media, and domestic corporate travel management.

This platform has been architected to compete with top industry vendors, inspired by the executive concierge standards of platforms like [Voyage Monk](https://voyagemonk.com/).

### Key Platform Highlights
1. **Dedicated Service Pages with Custom AI Hero Visuals**:
   - Each service has its own dedicated page with an immersive hero banner, detailed split-feature sections, "Perfect For" use cases, enterprise specifications, and an itemized RFP form.
2. **Custom Built Service Logos / Icons**:
   - Every service is represented by a dedicated, custom-crafted vector icon ([assets/icons/](assets/icons/)) adhering strictly to the brand’s warm champagne gold (`#C5A059`) and deep obsidian palette with the brand's signature geometric architectural offset frame.
3. **Single Master Configuration File (`js/config.js`)**:
   - All company details, legal entity names, phone numbers, email addresses, physical office addresses, domain variants, social media URLs, and campaign hashtags are centralized in `js/config.js`.
   - Modifying `js/config.js` instantly updates every page across the entire website via the automated DOM hydrator (`js/hydrate-config.js`).
4. **GitHub Pages Ready**:
   - Built with clean, dependency-free vanilla HTML5, CSS3 design tokens, and modular JavaScript.
   - Hosted effortlessly on GitHub Pages without any compilation or build steps.
5. **Dark & Light Mode**:
   - Automatically detects system/browser preference (`prefers-color-scheme`) and provides an instant manual toggle with `localStorage` persistence.
6. **Dual-Mode AI Executive Concierge Chatbot**:
   - Features a progressive corporate lead qualification workflow that routes captured specifications to `contacts@avyaservices.in`.
   - Features a settings modal allowing administrators to connect a live Google Gemini API key for open-ended generative AI conversations.

---

## 📁 Repository Structure

```text
avya-corporate-services/
├── index.html                      # Homepage & master corporate hub
├── corporate-gifting.html          # Dedicated page: Corporate Gifting & Swag (Main business)
├── print-media.html                # Dedicated page: Full-Spectrum Print Media Services
├── corporate-travel.html           # Dedicated page: Domestic Homestays, Offsites & Bookings
├── rewards-recognition.html        # Dedicated page: Crystal Trophies & Milestone Awards
├── brand-design.html               # Dedicated page: Pantone Matching & 3D Packaging Mockups
├── event-branding.html             # Dedicated page: Stage Fabrication & Exhibition Stalls
├── assets/
│   ├── logo.svg                    # Crisp vector brand logo (light mode)
│   ├── logo-dark.svg               # Crisp vector brand logo (dark mode)
│   ├── favicon.svg                 # High-resolution vector favicon
│   ├── icons/                      # Custom-built service icons (Gold & Obsidian)
│   │   ├── icon-corporate-gifting.svg
│   │   ├── icon-print-media.svg
│   │   ├── icon-corporate-travel.svg
│   │   ├── icon-rewards-recognition.svg
│   │   ├── icon-brand-design.svg
│   │   └── icon-event-branding.svg
│   └── images/                     # Custom AI-crafted wide hero section visuals
│       ├── hero-corporate-gifting.svg
│       ├── hero-print-media.svg
│       ├── hero-corporate-travel.svg
│       ├── hero-rewards-recognition.svg
│       ├── hero-brand-design.svg
│       └── hero-event-branding.svg
├── css/
│   ├── theme.css                   # Design tokens, color palettes, dark/light variables
│   ├── components.css              # Buttons, badges, cards, toasts, modals
│   ├── main.css                    # Main layout, hero, grid styles, footer
│   ├── service-pages.css           # Dedicated service pages layout (Voyage Monk style)
│   └── chatbot.css                 # Floating AI Concierge interface & chat bubbles
├── js/
│   ├── config.js                   # MASTER EDITABLE CONFIGURATION FILE (Source of truth)
│   ├── hydrate-config.js           # Automated DOM placeholder hydrator
│   ├── theme.js                    # Auto-detection of system dark/light mode & toggle
│   ├── data.js                     # Content model for services, solutions, FAQs
│   ├── chatbot.js                  # AI Chatbot controller, Gemini API caller, lead router
│   └── main.js                     # Navigation, counters, accordions, and contact form
├── .gitignore                      # Standard git exclusion rules
└── README.md                       # Comprehensive platform documentation
```

---

## ⚙️ How to Update Company Details

All company information across the website is controlled from **one file**:
👉 `js/config.js`

To update any details:
1. Open `js/config.js` in your favorite editor.
2. Edit the corresponding value (e.g. `contacts.primaryPhone`, `contacts.primaryEmail`, `location.fullAddress`, `socials.linkedin`, `hashtags`, etc.).
3. Save the file.
4. Refresh your browser—**every single occurrence across all 7 pages updates automatically!**

---

## 🚀 Local Preview & GitHub Pages Hosting

### Local Preview
Open any `.html` file directly in your web browser:
- Homepage: `index.html`
- Corporate Gifting: `corporate-gifting.html`
- Print Media: `print-media.html`
- Corporate Travel: `corporate-travel.html`
- Rewards & Recognition: `rewards-recognition.html`
- Brand Design: `brand-design.html`
- Event Branding: `event-branding.html`

Or run a local lightweight server:
```bash
python3 -m http.server 8080
```
Navigate to `http://localhost:8080`.

### Deploying to GitHub Pages
1. Push this repository to your GitHub account:
   ```bash
   cd /Users/niranjanamurthyc/Developer/projects/avya-corporate-services
   git remote add origin https://github.com/<your-username>/avya-corporate-services.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select `main` branch and `/ (root)` folder. Click **Save**.
3. Your website will be live in 1–2 minutes at:
   `https://<your-username>.github.io/avya-corporate-services/`
4. Once you register `avyaservices.in` and `avyaservices.co.in`, enter your custom domain under the **Custom domain** setting in GitHub Pages.
