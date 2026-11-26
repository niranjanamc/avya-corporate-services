/**
 * Avya Corporate Services - Data Store
 * Comprehensive Corporate Services, Statutory Liaison, CSR & IT Asset Logistics Data
 */

const AVYA_DATA = {
  company: {
    name: "AVYA Corporate Services",
    tagline: "Comprehensive Business Support, Statutory Liaison, Facilities Coordination & Logistics",
    founded: 2015,
    headquarters: "Bangalore, Karnataka, India",
    domain: "avyaservices.in",
    contactEmail: "contacts@avyaservices.in",
    phone: "+91 99165 99960",
    address: "131/9, SMIGB, 5th Phase, Yelahanka New Town, Bangalore, Karnataka 560064, India"
  },

  stats: [
    { value: "100%", label: "Statutory & SLA Compliance", sub: "Strict legal & regulatory adherence" },
    { value: "5,000+", label: "Tasks & Deliveries Completed", sub: "RTO, e-stamps, CSR kits & assets" },
    { value: "50+", label: "Corporate & Institutional Clients", sub: "Trusted corporate support partner" },
    { value: "Single SPOC", label: "Single Point of Contact", sub: "Consolidated monthly billing" }
  ],

  mncHighlights: [
    { name: "IT / ITeS Tech Campuses", desc: "Remote laptop logistics, onboarding courier & legal agreements" },
    { name: "Corporate Fleet Operators", desc: "Commercial vehicle FC, RC transfers & hypothecation cancellation" },
    { name: "Enterprises & Multinational Firms", desc: "Turnkey CSR project execution & multi-carrier parcel coordination" },
    { name: "Financial & Legal Institutions", desc: "Daily e-stamp paper procurement & advocate notary attestations" },
    { name: "Facility & Admin Departments", desc: "Daily florist, newspaper & local micro-vendor management" }
  ],

  services: [
    {
      id: "business-support",
      title: "Business Support Services",
      category: "Workplace & Facility Operations",
      badge: "Facility & Vendor Management",
      icon: "🏢",
      summary: "Streamline daily workplace coordination for micro-vendors, florists, periodicals, and office essentials under one roof.",
      description: "Managing dozens of small local vendors creates administrative strain and chaotic billing. AVYA acts as your single accountable partner to coordinate daily office florists, newspaper and magazine subscriptions, pantry micro-suppliers, and local support providers with consolidated GST billing.",
      highlights: [
        "Corporate Floral Arrangements: Weekly reception displays, corporate events & executive bouquets",
        "Periodicals & Newspaper Management: Multi-floor daily newspaper & trade journal subscriptions",
        "Pantry & Daily Office Consumables: Coordination with local verified micro-vendors",
        "Emergency Facility Coordination & On-demand Office Errand Support",
        "Single Monthly Consolidated GST Invoice for all micro-vendor services",
        "Dedicated Account SPOC with strict SLA and quality tracking"
      ]
    },
    {
      id: "rto-services",
      title: "RTO & Fleet Liaison Services",
      category: "Transport & Statutory Compliance",
      badge: "Statutory Compliance",
      icon: "🚗",
      summary: "End-to-end RTO liaison across Bangalore for corporate fleets, leased vehicles, and employee documentation.",
      description: "Avoid bureaucratic delays and lost employee productivity at Regional Transport Offices. AVYA handles corporate vehicle RC transfers, bank hypothecation cancellations, commercial vehicle fitness certificates (FC), inter-state NOCs, and driving licence services with complete statutory compliance.",
      highlights: [
        "RC Transfers: Ownership change for corporate leases, buyouts, and company-to-individual transfers",
        "Hypothecation Cancellation: Loan clearance and HP endorsement removal on RC smart cards",
        "Fitness Certificates (FC): Timely renewal and inspection assistance for cabs, vans & staff buses",
        "No Objection Certificates (NOC): Seamless inter-state and inter-RTO vehicle clearance",
        "Corporate Driving Licence Desk: Renewals, address changes & International Driving Permits (IDP)",
        "Coverage across all Bangalore RTOs (Indiranagar, Koramangala, Yelahanka, Yeshwanthpur, Electronic City, etc.)"
      ]
    },
    {
      id: "stamp-paper-notary",
      title: "Stamp Paper & Notary Services",
      category: "Legal & Corporate Documentation",
      badge: "Legal Documentation",
      icon: "⚖️",
      summary: "Authorized e-stamp paper procurement, agreement drafting, affidavits, and notary attestation at your doorstep.",
      description: "Every commercial contract, vendor agreement, and HR document requires legally sound stamping and attestation. AVYA provides prompt procurement of Karnataka Government e-stamp papers across all denominations, along with legal agreement drafting, gazetted notarisation, and secure campus pickup and delivery.",
      highlights: [
        "E-Stamp Paper Procurement: Instant procurement across all denominations (₹20, ₹50, ₹100, ₹500, ₹1000+)",
        "Commercial Agreement Drafting: NDAs, MSAs, vendor contracts, commercial lease agreements & HR letters",
        "Notarisation & Attestation: Registered Notary Public seals, Gazette officer stamps & PoA verification",
        "Affidavits & Sworn Declarations: Address proofs, name-change declarations & indemnity bonds",
        "Desk-to-Desk Pickup & Delivery: Secure courier collection and return of sensitive documents",
        "100% Karnataka Government Authorised & Compliant"
      ]
    },
    {
      id: "csr-services",
      title: "CSR Execution & Supply Kits",
      category: "Corporate Social Responsibility",
      badge: "Turnkey CSR Initiatives",
      icon: "🤝",
      summary: "End-to-end CSR project planning, corporate-NGO liaison, and turnkey procurement of essential supply kits.",
      description: "Ensure your corporate social responsibility initiatives achieve meaningful impact with full audit compliance. AVYA coordinates between corporate CSR committees and vetted NGOs to plan, procure, assemble, and distribute essential kits with verifiable distribution receipts and photographic evidence.",
      highlights: [
        "Corporate & NGO Liaison: Identifying, planning, and executing verified community CSR projects",
        "Emergency Medical & First-Aid Kits: Bulk assembly for primary health centers and rural clinics",
        "Dry Grocery & Nutrition Ration Kits: High-quality food staples for disaster relief & community aid",
        "Winter Blankets & Clothing Drives: Bulk procurement and on-ground beneficiary distribution",
        "Student School Kits: Backpacks, stationery, notebooks, and educational tools for underprivileged children",
        "Audit & Statutory Compliance: Signed beneficiary distribution rolls, high-res photos & Section 135 reporting"
      ]
    },
    {
      id: "passport-services",
      title: "Corporate Passport Services",
      category: "Executive & Employee Travel",
      badge: "Employee & Executive Travel",
      icon: "🛂",
      summary: "Expedited passport assistance, documentation pre-scrutiny, Tatkal filing, and PSK appointment coordination.",
      description: "Don't let passport bottlenecks delay international client meetings or overseas project deputations. AVYA provides dedicated corporate passport desk support, ensuring error-free documentation, Tatkal filings, Police Clearance Certificates (PCC), and confirmed appointment slots at Passport Seva Kendras.",
      highlights: [
        "Fresh & Renewal Passport Filing: Hassle-free online application submission and document checks",
        "Tatkal Expedited Processing: Urgent processing assistance for immediate corporate travel",
        "Police Clearance Certificates (PCC): Crucial documentation support for overseas work permits and visas",
        "Appointment Slot Coordination: Preferred booking at Bangalore PSKs (Lalbagh, Marathahalli, Sai Arcade, POPSK)",
        "Pre-Submission Document Scrutiny: Eliminate counter rejections and repeat visits",
        "Corporate Bulk Desk: Dedicated support for batch employee onsite deputations"
      ]
    },
    {
      id: "courier-asset-movement",
      title: "Courier & IT Asset Movement",
      category: "Enterprise Logistics & Asset Care",
      badge: "Secure Enterprise Logistics",
      icon: "💻",
      summary: "Multi-carrier express courier management and secure doorstep transit for employee IT laptops and equipment.",
      description: "Remote and hybrid workforces demand reliable, zero-damage transit of expensive IT computing hardware. AVYA coordinates with major tier-1 logistics networks to provide tamper-proof, anti-static shock packaging and door-to-door transit for employee laptops, monitors, workstations, and urgent corporate documentation.",
      highlights: [
        "IT Hardware Logistics: Secure doorstep dispatch & retrieval of laptops, monitors, chargers & peripherals",
        "Onboarding & Exit Asset Movement: Smooth Day-1 hardware deliveries and clean offboarding return logistics",
        "Specialized Protective Packaging: Anti-static bubble wrapping, rigid shock-resistant boxes & security tape",
        "Multi-Carrier Coordination: Partnered with Blue Dart, DHL, DTDC, FedEx and express air/surface networks",
        "Real-Time Milestone Tracking: End-to-end consignment visibility with delivery proof and insurance coverage",
        "Consolidated Corporate Monthly Invoicing for all domestic and intra-city logistics"
      ]
    }
  ],

  solutions: [
    {
      title: "Remote Employee IT Hardware Dispatch & Return",
      desc: "Doorstep delivery of laptops, dual monitors, and welcome items to new hires across India, with secure return logistics upon employee offboarding.",
      tag: "IT & HR Operations"
    },
    {
      title: "Corporate Fleet RTO Compliance Management",
      desc: "Comprehensive renewal of fitness certificates, hypothecation removals, and inter-state NOCs for corporate transport cabs and staff buses.",
      tag: "Admin & Transport"
    },
    {
      title: "Bulk E-Stamp Procurement & Legal Agreement Drafting",
      desc: "Authorized government e-stamps, NDA drafting, lease agreements, and registered advocate notarisation delivered directly to your corporate desk.",
      tag: "Legal & Procurement"
    },
    {
      title: "Turnkey CSR Aid Drives & Supply Procurement",
      desc: "Complete sourcing, packaging, and verified on-ground distribution of ration kits, medical kits, blankets, and school packs with photo-audit proof.",
      tag: "CSR Committees"
    },
    {
      title: "Expedited Employee Passport & PCC Travel Desk",
      desc: "Fast-track passport renewals, Tatkal filings, and Police Clearance Certificates for staff scheduled for overseas client site deputations.",
      tag: "Global Mobility & HR"
    },
    {
      title: "Daily Workplace Vendor & Florist Management",
      desc: "Single-window coordination for daily reception floral displays, newspaper/magazine subscriptions, pantry vendors, and local facility errands.",
      tag: "Facility Management"
    }
  ],

  process: [
    {
      step: "01",
      title: "Share Your Requirement",
      desc: "Tell us about your administrative, statutory, logistics, or CSR requirement via phone, WhatsApp, or our online portal."
    },
    {
      step: "02",
      title: "Single SPOC & Clear Plan",
      desc: "We assign a dedicated relationship manager who provides a transparent quotation, required document checklist, and SLA timeline."
    },
    {
      step: "03",
      title: "Flawless On-Ground Execution",
      desc: "Our field team liaises directly with government authorities (RTO/PSK), vetted suppliers, advocates, or express logistics networks."
    },
    {
      step: "04",
      title: "Verified Handover & Invoicing",
      desc: "Receive your processed documents, verified delivery receipts, or distributed supplies with a consolidated GST monthly invoice."
    }
  ],

  testimonials: [
    {
      quote: "AVYA Corporate Services transformed our remote IT hardware logistics. Managing the dispatch and retrieval of over 400 laptops across Bangalore was seamless, with zero transit damage.",
      author: "Siddharth Rao",
      role: "Head of IT Infrastructure, Enterprise Cloud Solutions",
      location: "Bangalore"
    },
    {
      quote: "Handling RTO compliance and fitness certificates for our 35-bus corporate fleet used to take weeks. AVYA’s liaison team completed the inspections and paperwork in record time without a hitch.",
      author: "Manjunath Swamy",
      role: "Senior Manager - Employee Transportation & Admin",
      location: "Yelahanka, Bangalore"
    },
    {
      quote: "From procuring ₹500 e-stamps within hours to drafting commercial vendor agreements with registered notary attestations, AVYA is our go-to legal operations partner.",
      author: "Deepika Krishnan",
      role: "Corporate Legal Counsel, FinTech Enterprise",
      location: "Bangalore"
    }
  ],

  faqs: [
    {
      q: "What services does AVYA Corporate Services offer?",
      a: "AVYA Corporate Services is a single-window corporate operations partner providing Business Support Services (daily vendors, florists, periodicals), RTO Services (RC transfer, HP cancellation, FC, NOC), Stamp Paper & Notary Services (e-stamps, drafting, attestations), CSR Services (NGO coordination, medical/grocery/winter supply kits), Passport Services (new/renewal, Tatkal, PCC), and Courier & IT Asset Movement (laptop transit, multi-carrier parcel coordination)."
    },
    {
      q: "How does AVYA simplify vendor management for facility and admin teams?",
      a: "Instead of dealing with multiple unorganized vendors for flowers, newspapers, pantry items, and local errands, AVYA acts as a single point of contact (SPOC). We coordinate quality, track deliveries, and provide one consolidated GST-compliant monthly invoice."
    },
    {
      q: "Which RTO offices in Bangalore do you cover for corporate vehicle services?",
      a: "We cover all major Regional Transport Offices across Bangalore and Karnataka, including Yelahanka (KA-50), Yeshwanthpur (KA-04), Koramangala (KA-01), Indiranagar (KA-03), Jayanagar (KA-05), KR Puram (KA-53), Electronic City (KA-51), and surrounding zones."
    },
    {
      q: "Can you procure e-stamp papers of any denomination and provide notarisation?",
      a: "Yes. We procure government-authorized Karnataka e-stamp papers of all denominations (₹20, ₹50, ₹100, ₹200, ₹500, ₹1000, and custom high-value amounts). We also provide drafting assistance and registered Notary Public attestations with doorstep collection and delivery."
    },
    {
      q: "How does AVYA assist with Corporate Social Responsibility (CSR) projects?",
      a: "We connect corporate CSR committees with verified NGOs, plan initiatives, and handle turnkey bulk procurement and assembly of emergency medical kits, ration kits, winter blankets, clothing, and school kits. We provide signed beneficiary acknowledgments and photographic documentation for Section 135 compliance."
    },
    {
      q: "How do you ensure the safety of employee laptops and IT equipment during courier transit?",
      a: "We use specialized anti-static bubble packaging, rigid shock-resistant boxes, and tamper-evident security tape. All movements are handled via express logistics networks with real-time consignment tracking, insurance, and signed proof of delivery."
    },
    {
      q: "Where is AVYA Corporate Services located and how can we get started?",
      a: "Our headquarters is located at 131/9, SMIGB, 5th Phase, Yelahanka New Town, Bangalore 560064. You can reach us directly at +91 99165 99960, WhatsApp us, or email contacts@avyaservices.in. We will assign a dedicated SPOC to discuss your requirements immediately."
    }
  ]
};
