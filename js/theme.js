/**
 * AVYA Corporate Services - Theme Management
 * Defaults to Day / Light mode per customer preference.
 * Supports manual toggle with persistence in localStorage.
 */

(function () {
  const THEME_STORAGE_KEY = 'avya-theme-preference';
  const htmlElement = document.documentElement;

  // Determine initial theme: saved preference -> fallback to day / light theme
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Default to light / day theme as explicitly preferred by customer
    return 'light';
  }

  // Apply theme to DOM and update icons/logos
  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);

    // Update theme toggle buttons across the page
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      btn.innerHTML = theme === 'dark'
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <circle cx="12" cy="12" r="5"></circle>
             <line x1="12" y1="1" x2="12" y2="3"></line>
             <line x1="12" y1="21" x2="12" y2="23"></line>
             <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
             <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
             <line x1="1" y1="12" x2="3" y2="12"></line>
             <line x1="21" y1="12" x2="23" y2="12"></line>
             <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
             <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
           </svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
           </svg>`;
    });

    // Update logos to ensure contrast with gold and black/white lettering
    const brandLogos = document.querySelectorAll('.brand-logo-img');
    brandLogos.forEach(logo => {
      logo.src = theme === 'dark' ? 'assets/logo-dark.svg' : 'assets/logo.svg';
    });
  }

  // Toggle between light and dark modes
  window.toggleTheme = function () {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  };

  // Immediate execution before DOM paint to prevent white/dark flash
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);
})();
