/**
 * ==============================================================================
 * AVYA CORPORATE SERVICES — MASTER COMPANY CONFIGURATION FILE
 * ==============================================================================
 * 
 * Central editable source of truth for the entire website.
 * Any updates made in this file automatically update all references, headers,
 * footers, forms, social links, phone numbers, email addresses, and #tags
 * across the homepage and all dedicated service pages.
 */

const AVYA_CONFIG = {
  // Brand & Identity
  company: {
    name: "Avya Corporate Services",
    shortName: "Avya",
    legalName: "Avya Corporate Services Pvt. Ltd.",
    formerName: "Formerly Designz (Est. 2009, Bengaluru)",
    tagline: "Premier Brand Execution, Corporate Gifting, Print Media & Enterprise Hospitality",
    subTagline: "Trusted Vendor Partner for IT / ITeS Enterprises & Multinational Corporations Across India",
    foundedYear: "2009",
    cin: "U74999KA2009PTC049876",
    gstin: "29AABCA1234F1Z5",
    msme: "UDYAM-KR-03-0012345",
    iso: "ISO 9001:2015 Certified"
  },

  // Domains & Web Coordinates
  web: {
    primaryDomain: "avyaservices.in",
    secondaryDomain: "avyaservices.co.in",
    websiteUrl: "https://avyaservices.in",
    githubRepo: "https://github.com/niranjanamc/avya-corporate-services",
    githubPagesUrl: "https://niranjanamc.github.io/avya-corporate-services"
  },

  // Contact Information
  contacts: {
    primaryEmail: "contacts@avyaservices.in",
    salesEmail: "sales@avyaservices.in",
    supportEmail: "support@avyaservices.in",
    rfpEmail: "contacts@avyaservices.in",
    primaryPhone: "+91 98450 12345",
    formattedPhone: "+91 98450 12345",
    altPhone: "+91 80 4123 4567",
    whatsappNumber: "+919845012345",
    whatsappLink: "https://wa.me/919845012345?text=Hello%20Avya%20Corporate%20Services%2C%20I%20would%20like%20to%20inquire%20about%20your%20corporate%20services.",
    workingHours: "Monday – Saturday: 9:30 AM – 7:00 PM IST"
  },

  // Physical Location & Headquarters
  location: {
    building: "No. 208, Venkatapura, 8th Cross",
    landmark: "Opposite New Sagar Hotel",
    area: "Koramangala 1st Block",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560034",
    country: "India",
    fullAddress: "No. 208, Venkatapura, 8th Cross, Koramangala 1st Block, Bengaluru, Karnataka 560034, India",
    mapsUrl: "https://maps.google.com/?q=Koramangala+1st+Block+Bengaluru+560034"
  },

  // Social Media Links
  socials: {
    linkedin: "https://www.linkedin.com/company/avya-corporate-services",
    instagram: "https://www.instagram.com/avyaservices",
    twitter: "https://x.com/avyaservices",
    facebook: "https://www.facebook.com/avyaservices",
    youtube: "https://www.youtube.com/@avyaservices"
  },

  // Official Branding & Campaign Hashtags
  hashtags: [
    "#AvyaCorporateServices",
    "#CorporateGiftingBangalore",
    "#MNCVendorPartner",
    "#ITeSVendorIndia",
    "#PrintMediaServices",
    "#CorporateOffsitesIndia",
    "#EmployeeOnboardingKits",
    "#BrandExecutionPartner"
  ],

  // Core Service Offerings & Page Slugs
  servicesCatalog: [
    {
      id: "corporate-gifting",
      title: "Corporate Gifting & Swag",
      pageUrl: "corporate-gifting.html",
      badge: "Main Business Source",
      shortDesc: "Welcome kits, festive hampers, tech merchandise, and sustainable gift sets with pan-India doorstep delivery.",
      icon: "assets/icons/icon-corporate-gifting.svg",
      heroImage: "assets/images/hero-corporate-gifting.svg"
    },
    {
      id: "print-media",
      title: "Print Media Services",
      pageUrl: "print-media.html",
      badge: "Full-Spectrum Corporate Print",
      shortDesc: "Complete corporate print solutions covering stationery, brochures, custom rigid boxes, and large-format signage.",
      icon: "assets/icons/icon-print-media.svg",
      heroImage: "assets/images/hero-print-media.svg"
    },
    {
      id: "corporate-travel",
      title: "Corporate Domestic Travel & Hospitality",
      pageUrl: "corporate-travel.html",
      badge: "Curated Domestic Services",
      shortDesc: "Executive homestays, team workations, corporate offsites, event planning, and verified business hotel bookings.",
      icon: "assets/icons/icon-corporate-travel.svg",
      heroImage: "assets/images/hero-corporate-travel.svg"
    },
    {
      id: "rewards-recognition",
      title: "Rewards & Recognition (R&R)",
      pageUrl: "rewards-recognition.html",
      badge: "Culture & Morale",
      shortDesc: "Custom crystal trophies, sculptured metal plaques, long service awards, and annual day recognition sets.",
      icon: "assets/icons/icon-rewards-recognition.svg",
      heroImage: "assets/images/hero-rewards-recognition.svg"
    },
    {
      id: "brand-design",
      title: "Brand & Design Services",
      pageUrl: "brand-design.html",
      badge: "Design Precision",
      shortDesc: "Pantone PMS matching, 3D merchandise mockups, packaging dieline engineering, and brand style guides.",
      icon: "assets/icons/icon-brand-design.svg",
      heroImage: "assets/images/hero-brand-design.svg"
    },
    {
      id: "event-branding",
      title: "Event Branding & Signage",
      pageUrl: "event-branding.html",
      badge: "Turnkey Execution",
      shortDesc: "Conference delegate welcome kits, stage backdrops, trade show booths, LED signage, and on-site event coordination.",
      icon: "assets/icons/icon-event-branding.svg",
      heroImage: "assets/images/hero-event-branding.svg"
    }
  ]
};

// Expose globally for browser usage
if (typeof window !== 'undefined') {
  window.AVYA_CONFIG = AVYA_CONFIG;
}

// Support Node.js / module imports if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AVYA_CONFIG;
}
