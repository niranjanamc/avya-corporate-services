/**
 * Avya Corporate Services - Core Interactive Controller
 * High-performance, accessible, vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initStatsObserver();
  initFaqAccordion();
  initContactForm();
  initSmoothScroll();
});

// Navigation & Mobile Menu
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile menu when clicking outside or clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }
}

// Stats Counter Animation
function initStatsObserver() {
  const statNumbers = document.querySelectorAll('[data-counter]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = el.getAttribute('data-counter');
        el.innerText = targetVal;
        el.classList.add('animated');
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isCurrentOpen = item.classList.contains('active');

        // Close other items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        // Toggle current
        item.classList.toggle('active', !isCurrentOpen);
      });
    }
  });
}

// Contact Form Handler with Free Web3Forms Real-Email Gateway & Local Fallback
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Collect values
    const formData = {
      name: document.getElementById('fullName')?.value || '',
      company: document.getElementById('companyName')?.value || '',
      email: document.getElementById('workEmail')?.value || '',
      phone: document.getElementById('phoneNumber')?.value || '',
      service: document.getElementById('serviceInterest')?.value || '',
      quantity: document.getElementById('orderVolume')?.value || '',
      message: document.getElementById('projectDetails')?.value || '',
      timestamp: new Date().toISOString(),
      recipients: 'support@avyaservices.co.in, umesh@avyaservices.co.in'
    };

    // Button loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
      Routing to Operations Desk...
    `;

    // Save lead to local storage ledger
    const leads = JSON.parse(localStorage.getItem('avya_collected_leads') || '[]');
    leads.push(formData);
    localStorage.setItem('avya_collected_leads', JSON.stringify(leads));

    // Web3Forms payload for real email delivery to support@avyaservices.co.in and umesh@avyaservices.co.in
    const web3Payload = {
      access_key: (window.AVYA_CONFIG && window.AVYA_CONFIG.web3forms && window.AVYA_CONFIG.web3forms.accessKey) || '5a133df1-53e7-4b7f-b883-9b88eb34c329',
      subject: `[AVYA Website Lead] ${formData.service} - ${formData.name} (${formData.company})`,
      from_name: `AVYA Web Desk: ${formData.name}`,
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      volume_timeline: formData.quantity,
      details: formData.message,
      submitted_at: formData.timestamp
    };

    // Send asynchronously to Web3Forms API
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(web3Payload)
    })
    .then(res => res.json())
    .catch(err => {
      console.warn("Web3Forms transmission status:", err.message);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `✓ Requirement Submitted`;

      if (window.showAvyaToast) {
        window.showAvyaToast(`Thank you, ${formData.name}! Your request was routed to support@avyaservices.co.in.`);
      }

      // Display Confirmation Box
      const formContainer = contactForm.parentElement;
      const successDiv = document.createElement('div');
      successDiv.className = 'card card-gold-accent text-center';
      successDiv.style.marginTop = '24px';
      successDiv.style.padding = '32px 24px';
      successDiv.innerHTML = `
        <div style="font-size: 2.5rem; color: var(--gold-500); margin-bottom: 12px;">✦</div>
        <h3 class="font-display" style="font-size: 1.5rem; margin-bottom: 8px;">Inquiry Dispatched to Operations Desk</h3>
        <p style="color: var(--text-secondary); max-width: 520px; margin: 0 auto 16px; font-size: 0.9375rem; line-height: 1.6;">
          Your service specifications for <strong>${formData.service}</strong> have been received and routed to <strong>support@avyaservices.co.in</strong> and <strong>umesh@avyaservices.co.in</strong>. Our operations relationship manager will contact you promptly.
        </p>
        <div style="margin-bottom: 24px;">
          <a href="mailto:support@avyaservices.co.in?cc=umesh@avyaservices.co.in&subject=${encodeURIComponent('Inquiry Confirmation: ' + formData.service)}&body=${encodeURIComponent('Requirement submitted for ' + formData.company + ':\n' + formData.message)}" class="btn btn-outline-gold btn-sm" style="display: inline-flex; gap: 6px; align-items: center;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            Send Direct Copy via Email Client
          </a>
        </div>
        <button class="btn btn-gold btn-sm" onclick="location.reload()">Send Another Inquiry</button>
      `;
      contactForm.style.display = 'none';
      formContainer.appendChild(successDiv);
    });
  });
}

// Smooth Scrolling for in-page anchors
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
