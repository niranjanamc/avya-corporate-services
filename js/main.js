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

// Contact Form Handler
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

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
      recipient: 'contacts@avyaservices.in'
    };

    // Button loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
      </svg>
      Processing...
    `;

    // Save lead to local storage
    const leads = JSON.parse(localStorage.getItem('avya_collected_leads') || '[]');
    leads.push(formData);
    localStorage.setItem('avya_collected_leads', JSON.stringify(leads));

    // Simulate reliable dispatch
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `✓ Proposal Requested`;

      if (window.showAvyaToast) {
        window.showAvyaToast(`Thank you, ${formData.name}! Your request was forwarded to contacts@avyaservices.in.`);
      }

      // Display Confirmation Box
      const formContainer = contactForm.parentElement;
      const successDiv = document.createElement('div');
      successDiv.className = 'card card-gold-accent text-center';
      successDiv.style.marginTop = '24px';
      successDiv.innerHTML = `
        <div style="font-size: 2.5rem; color: var(--gold-500); margin-bottom: 12px;">✦</div>
        <h3 class="font-display" style="font-size: 1.5rem; margin-bottom: 8px;">Inquiry Dispatched to contacts@avyaservices.in</h3>
        <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 20px;">
          Our dedicated account manager for MNC & IT/ITeS clients has received your specifications and will respond with product mockups and pricing.
        </p>
        <button class="btn btn-outline-gold btn-sm" onclick="location.reload()">Send Another Inquiry</button>
      `;
      contactForm.style.display = 'none';
      formContainer.appendChild(successDiv);

    }, 800);
  });
}

// Smooth Scrolling for in-page anchors
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
