/**
 * ==============================================================================
 * AVYA CORPORATE SERVICES — MASTER COMPANY CONFIGURATION FILE
 * ==============================================================================
 * 
 * Central editable source of truth for the entire website.
 * Any updates made in this file automatically update all references, headers,
 * footers, forms, phone numbers, email addresses, and #tags
 * across the homepage and all dedicated service pages.
 */

const AVYA_CONFIG = {
  // Brand & Identity
  company: {
    name: "AVYA Corporate Services",
    shortName: "AVYA",
    legalName: "AVYA Corporate Services",
    tagline: "Comprehensive Business Support, Statutory Liaison, Facilities Coordination & Logistics",
    subTagline: "Over 25 Years of Operational & Administrative Excellence in Bengaluru",
    experienceYears: "25+",
    foundedYear: "1999",
    gstin: "29APAPV7401D1ZY",
    msme: "UDYAM-KR-03-0099165",
    iso: "ISO 9001:2015 Certified Operations"
  },

  // Domains & Web Coordinates (Single Official Domain)
  web: {
    primaryDomain: "avyaservices.co.in",
    secondaryDomain: "",
    websiteUrl: "https://avyaservices.co.in",
    githubRepo: "https://github.com/niranjanamc/avya-corporate-services",
    githubPagesUrl: "https://niranjanamc.github.io/avya-corporate-services"
  },

  // Contact Information
  contacts: {
    primaryEmail: "support@avyaservices.co.in",
    managementEmail: "umesh@avyaservices.co.in",
    salesEmail: "support@avyaservices.co.in",
    supportEmail: "support@avyaservices.co.in",
    rfpEmail: "support@avyaservices.co.in",
    primaryPhone: "+91 99165 99960",
    formattedPhone: "+91 99165 99960",
    altPhone: "+91 99165 99960",
    whatsappNumber: "+919916599960",
    whatsappLink: "https://wa.me/919916599960?text=Hello%20AVYA%20Corporate%20Services%2C%20I%20would%20like%20to%20inquire%20about%20your%20corporate%20support%20services.",
    workingHours: "Monday – Saturday: 9:00 AM – 7:30 PM IST"
  },

  // Web3Forms Gateway for 100% Free Form-to-Email Delivery
  web3forms: {
    accessKey: "5a133df1-53e7-4b7f-b883-9b88eb34c329", // Standard free endpoint
    targetEmails: "support@avyaservices.co.in, umesh@avyaservices.co.in"
  },

  // Physical Location & Headquarters
  location: {
    building: "131/9, SMIGB",
    landmark: "5th Phase",
    area: "Yelahanka New Town",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560064",
    country: "India",
    fullAddress: "131/9, SMIGB, 5th Phase, Yelahanka New Town, Bangalore, Karnataka 560064, India",
    mapsUrl: "https://maps.google.com/?q=131/9+SMIGB+5th+Phase+Yelahanka+New+Town+Bangalore+560064"
  },

  // Social Media Links
  socials: {
    linkedin: "https://www.linkedin.com/company/avya-corporate-services",
    instagram: "https://www.instagram.com/avyacorporateservices",
    twitter: "https://x.com/avyaservices",
    facebook: "https://www.facebook.com/avyacorporateservices",
    youtube: "https://www.youtube.com/@avyaservices"
  },

  // Official Branding & Campaign Hashtags
  hashtags: [
    "#AvyaCorporateServices",
    "#BusinessSupportServices",
    "#RTOServicesBangalore",
    "#StampPaperProcurement",
    "#NotaryServicesBangalore",
    "#CSRSupplyKits",
    "#CorporatePassportServices",
    "#ITAssetMovementBangalore"
  ],

  // Core Service Offerings & Page Slugs
  servicesCatalog: [
    {
      id: "business-support",
      title: "Business Support Services",
      pageUrl: "business-support.html",
      badge: "Facility & Vendor Management",
      shortDesc: "Coordination and support for small vendors, office florists, newspaper subscriptions, and local workplace maintenance under one consolidated bill.",
      icon: "assets/icons/icon-business-support.svg",
      heroImage: "assets/images/hero-business-support.svg"
    },
    {
      id: "rto-services",
      title: "RTO & Fleet Liaison Services",
      pageUrl: "rto-services.html",
      badge: "Statutory Compliance",
      shortDesc: "RC transfers, hypothecation cancellation, commercial vehicle fitness certificates, inter-state NOCs, and driving licence assistance across Bangalore RTOs.",
      icon: "assets/icons/icon-rto-services.svg",
      heroImage: "assets/images/hero-rto-services.svg"
    },
    {
      id: "stamp-paper-notary",
      title: "Stamp Paper & Notary Services",
      pageUrl: "stamp-paper-notary.html",
      badge: "Legal Documentation",
      shortDesc: "Government-authorized e-stamp paper procurement, legal agreement drafting, affidavits, notary attestations, and corporate doorstep delivery.",
      icon: "assets/icons/icon-stamp-notary.svg",
      heroImage: "assets/images/hero-stamp-paper.svg"
    },
    {
      id: "csr-services",
      title: "CSR Execution & Supply Kits",
      pageUrl: "csr-services.html",
      badge: "Turnkey CSR Initiatives",
      shortDesc: "Corporate-to-NGO initiative planning, turnkey procurement, and audit-verified distribution of medical kits, grocery rations, blankets, and school kits.",
      icon: "assets/icons/icon-csr-services.svg",
      heroImage: "assets/images/hero-csr-services.svg"
    },
    {
      id: "passport-services",
      title: "Corporate Passport Services",
      pageUrl: "passport-services.html",
      badge: "Employee & Executive Travel",
      shortDesc: "Pre-scrutiny, fresh/renewal applications, Tatkal processing, Police Clearance Certificates (PCC) for onsite deputation, and PSK appointment slots.",
      icon: "assets/icons/icon-passport-services.svg",
      heroImage: "assets/images/hero-passport-services.svg"
    },
    {
      id: "courier-asset-movement",
      title: "Courier & IT Asset Movement",
      pageUrl: "courier-asset-movement.html",
      badge: "Secure Enterprise Logistics",
      shortDesc: "Door-to-door transit for corporate IT hardware (laptops, monitors, workstations) for hybrid teams, multi-carrier express courier management, and asset tracking.",
      icon: "assets/icons/icon-courier-asset.svg",
      heroImage: "assets/images/hero-courier-asset.svg"
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
