/**
 * Avya Corporate Services - Dynamic Configuration Hydrator
 * Automatically hydrates all placeholders across pages using AVYA_CONFIG.
 */

(function () {
  function hydrate() {
    if (typeof AVYA_CONFIG === 'undefined') {
      console.warn("AVYA_CONFIG is not loaded.");
      return;
    }

    const { company, contacts, location, web, socials, hashtags } = AVYA_CONFIG;

    // 1. Text and Link placeholders via [data-company]
    document.querySelectorAll('[data-company]').forEach(el => {
      const key = el.getAttribute('data-company');
      switch (key) {
        case 'name':
          el.textContent = company.name;
          break;
        case 'shortName':
          el.textContent = company.shortName;
          break;
        case 'legalName':
          el.textContent = company.legalName;
          break;
        case 'tagline':
          el.textContent = company.tagline;
          break;
        case 'subTagline':
          el.textContent = company.subTagline;
          break;
        case 'email':
          el.textContent = contacts.primaryEmail;
          if (el.tagName === 'A') el.href = `mailto:${contacts.primaryEmail}`;
          break;
        case 'salesEmail':
          el.textContent = contacts.salesEmail;
          if (el.tagName === 'A') el.href = `mailto:${contacts.salesEmail}`;
          break;
        case 'phone':
          el.textContent = contacts.primaryPhone;
          if (el.tagName === 'A') el.href = `tel:${contacts.primaryPhone.replace(/\s+/g, '')}`;
          break;
        case 'altPhone':
          el.textContent = contacts.altPhone;
          if (el.tagName === 'A') el.href = `tel:${contacts.altPhone.replace(/\s+/g, '')}`;
          break;
        case 'whatsapp':
          if (el.tagName === 'A') el.href = contacts.whatsappLink;
          break;
        case 'address':
          el.textContent = location.fullAddress;
          break;
        case 'city':
          el.textContent = `${location.city}, ${location.state}`;
          break;
        case 'domain':
          el.textContent = web.primaryDomain;
          break;
        case 'domains':
          el.textContent = `${web.primaryDomain} | ${web.secondaryDomain}`;
          break;
        case 'gstin':
          el.textContent = company.gstin;
          break;
        case 'msme':
          el.textContent = company.msme;
          break;
        case 'year':
          el.textContent = new Date().getFullYear();
          break;
        case 'workingHours':
          el.textContent = contacts.workingHours;
          break;
        case 'social-linkedin':
          if (el.tagName === 'A') el.href = socials.linkedin;
          break;
        case 'social-instagram':
          if (el.tagName === 'A') el.href = socials.instagram;
          break;
        case 'social-twitter':
          if (el.tagName === 'A') el.href = socials.twitter;
          break;
        case 'social-facebook':
          if (el.tagName === 'A') el.href = socials.facebook;
          break;
        case 'social-youtube':
          if (el.tagName === 'A') el.href = socials.youtube;
          break;
        case 'hashtags':
          if (Array.isArray(hashtags)) {
            el.innerHTML = hashtags
              .map(tag => `<span class="badge badge-gold" style="margin: 3px; font-size: 0.75rem;">${tag}</span>`)
              .join(' ');
          }
          break;
      }
    });

    // 2. Update page titles if requested
    const titleEl = document.querySelector('title[data-dynamic-title]');
    if (titleEl) {
      const pagePrefix = titleEl.getAttribute('data-dynamic-title');
      document.title = `${pagePrefix} | ${company.name}`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrate);
  } else {
    hydrate();
  }
})();
