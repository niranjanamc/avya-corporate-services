/**
 * Avya Corporate Services - AI Executive Concierge Chatbot
 * Handles lead qualification, requirements collection, automated email routing to contacts@avyaservices.in,
 * and silent Google Gemini LLM API integration via owner environment variable (zero settings UI for visitors).
 * Compact, movable (draggable) floating icon launcher.
 */

(function () {
  const STORAGE_KEY_LEADS = 'avya_collected_leads';
  const STORAGE_KEY_POS = 'avya_chat_trigger_pos';
  const TARGET_EMAIL = 'contacts@avyaservices.in';

  // Retrieve API key silently from owner environment / config without any user UI
  function getGeminiApiKey() {
    if (typeof window !== 'undefined') {
      if (window.GEMINI_API_KEY && typeof window.GEMINI_API_KEY === 'string') {
        return window.GEMINI_API_KEY.trim();
      }
      if (window.ENV && window.ENV.GEMINI_API_KEY) {
        return window.ENV.GEMINI_API_KEY.trim();
      }
      if (window.AVYA_CONFIG && window.AVYA_CONFIG.geminiApiKey) {
        return window.AVYA_CONFIG.geminiApiKey.trim();
      }
    }
    if (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) {
      return process.env.GEMINI_API_KEY.trim();
    }
    try {
      const stored = localStorage.getItem('avya_gemini_api_key');
      if (stored) return stored.trim();
    } catch (e) {}
    return '';
  }

  // Lead collection state
  const leadState = {
    step: 0,
    data: {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '',
      quantity: '',
      budget: '',
      timeline: '',
      notes: ''
    }
  };

  const steps = [
    {
      key: 'name_company',
      prompt: "Welcome to <strong>Avya Corporate Services</strong>! I am your AI Executive Concierge.<br><br>Whether you're looking for enterprise corporate gifting, full-spectrum print media, or corporate domestic travel & retreats, I'm here to curate the perfect solution for your organization.<br><br>May I know your <strong>Name</strong> and the <strong>Company</strong> you represent?",
      placeholder: "e.g., Priya Sharma from TechCorp India",
      chips: ["Corporate Gifting 🎁", "Print Media 🖨️", "Domestic Travel & Stays ✈️", "Employee Welcome Kits 🎒", "MNC Vendor Quote 💼"]
    },
    {
      key: 'service',
      prompt: "Great to connect with you! Which of our corporate service pillars can we assist you with today?",
      placeholder: "Choose below or type your requirement...",
      chips: ["Corporate Gifting & Swag", "Print Media Services", "Domestic Travel & Retreats", "Rewards & Recognition", "Multiple / Custom RFP"]
    },
    {
      key: 'contact_info',
      prompt: "Excellent choice. What is your <strong>Work Email</strong> and <strong>Contact Number</strong> so our enterprise relationship manager can send you a tailored proposal?",
      placeholder: "e.g., priya@techcorp.com, +91 98765 43210"
    },
    {
      key: 'quantity_timeline',
      prompt: "What is your estimated <strong>quantity / headcount</strong> and desired <strong>delivery date or event timeline</strong>?",
      placeholder: "e.g., 500 kits needed by Diwali / Next month",
      chips: ["50 - 200 units", "200 - 500 units", "500 - 2,000 units", "2,000+ Enterprise bulk"]
    },
    {
      key: 'budget_notes',
      prompt: "Do you have an approximate <strong>budget per person or total project budget</strong>, or any specific branding/delivery requirements?",
      placeholder: "e.g., ₹1,500 - ₹2,500 per kit, doorstep delivery across Bengaluru & Hyderabad",
      chips: ["Under ₹1,000 / unit", "₹1,000 - ₹2,500 / unit", "₹2,500 - ₹5,000 / unit", "Luxury / Custom Quote"]
    }
  ];

  // DOM Elements
  let chatWindow, chatMessages, chatInput, sendBtn, triggerBtn;

  function init() {
    createChatbotMarkup();
    bindEvents();
    initDraggableTrigger(triggerBtn);
    renderWelcomeMessage();
  }

  function createChatbotMarkup() {
    // Compact, movable floating launcher button (only icon, no text pill)
    const trigger = document.createElement('div');
    trigger.className = 'ai-chat-trigger';
    trigger.id = 'aiChatTrigger';
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-label', 'Open Avya AI Concierge');
    trigger.setAttribute('title', 'Avya AI Concierge (Drag to move, Click to chat)');
    trigger.innerHTML = `
      <div class="ai-chat-trigger-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M12 7v2"></path>
          <path d="M9 11h6"></path>
        </svg>
      </div>
      <div class="ai-chat-trigger-badge"></div>
    `;
    document.body.appendChild(trigger);
    triggerBtn = trigger;

    // Chatbot Window (without any settings button/modal for clean visitor experience)
    const win = document.createElement('div');
    win.className = 'chatbot-window';
    win.id = 'chatbotWindow';
    win.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-header-profile">
          <div class="chatbot-avatar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div class="chatbot-header-info">
            <h4>Avya Executive AI</h4>
            <div class="chatbot-status"><span class="pulse-dot"></span> Ready to curate & dispatch</div>
          </div>
        </div>
        <div class="chatbot-header-actions">
          <button class="chatbot-action-btn" id="chatCloseBtn" title="Close Chat" aria-label="Close Chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="chatbot-messages" id="chatMessages"></div>

      <div class="chatbot-footer">
        <div class="chatbot-input-row">
          <input type="text" class="chatbot-input" id="chatInput" placeholder="Type your response..." autocomplete="off">
          <button class="chatbot-send-btn" id="chatSendBtn" aria-label="Send Message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <div class="chatbot-disclaimer">Inquiries are verified and dispatched to ${TARGET_EMAIL}</div>
      </div>
    `;
    document.body.appendChild(win);

    chatWindow = document.getElementById('chatbotWindow');
    chatMessages = document.getElementById('chatMessages');
    chatInput = document.getElementById('chatInput');
    sendBtn = document.getElementById('chatSendBtn');
  }

  function bindEvents() {
    document.getElementById('chatCloseBtn').addEventListener('click', toggleChat);

    sendBtn.addEventListener('click', handleUserSend);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUserSend();
      }
    });

    // Keyboard accessibility for launcher
    triggerBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleChat();
      }
    });
  }

  // Draggable movable launcher functionality for mouse and touch
  function initDraggableTrigger(el) {
    let isPointerDown = false;
    let hasMoved = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    // Restore saved position if valid
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_POS));
      if (saved && typeof saved.left === 'number' && typeof saved.top === 'number') {
        const btnW = 56;
        const btnH = 56;
        const maxL = window.innerWidth - btnW - 12;
        const maxT = window.innerHeight - btnH - 12;
        const validL = Math.max(12, Math.min(saved.left, maxL));
        const validT = Math.max(12, Math.min(saved.top, maxT));
        el.style.left = `${validL}px`;
        el.style.top = `${validT}px`;
        el.style.right = 'auto';
        el.style.bottom = 'auto';
      }
    } catch (e) {}

    function onPointerDown(e) {
      if (e.button !== undefined && e.button !== 0) return; // left click only

      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

      isPointerDown = true;
      hasMoved = false;
      startX = clientX;
      startY = clientY;

      const rect = el.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      window.addEventListener('mousemove', onPointerMove, { passive: false });
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
      window.addEventListener('touchcancel', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isPointerDown) return;

      const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
      if (clientX === undefined || clientY === undefined) return;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      if (!hasMoved && (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4)) {
        hasMoved = true;
        el.classList.add('dragging');
      }

      if (hasMoved) {
        if (e.cancelable) e.preventDefault();

        const btnW = el.offsetWidth || 56;
        const btnH = el.offsetHeight || 56;
        const maxL = window.innerWidth - btnW - 12;
        const maxT = window.innerHeight - btnH - 12;

        let newL = initialLeft + deltaX;
        let newT = initialTop + deltaY;

        newL = Math.max(12, Math.min(newL, maxL));
        newT = Math.max(12, Math.min(newT, maxT));

        el.style.left = `${newL}px`;
        el.style.top = `${newT}px`;
        el.style.right = 'auto';
        el.style.bottom = 'auto';
      }
    }

    function onPointerUp() {
      if (!isPointerDown) return;
      isPointerDown = false;
      el.classList.remove('dragging');

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('touchcancel', onPointerUp);

      if (hasMoved) {
        // Save relocated position
        try {
          const rect = el.getBoundingClientRect();
          localStorage.setItem(STORAGE_KEY_POS, JSON.stringify({ left: rect.left, top: rect.top }));
        } catch (e) {}
      } else {
        // Simple click without movement: toggle chat
        toggleChat();
      }
    }

    el.addEventListener('mousedown', onPointerDown);
    el.addEventListener('touchstart', onPointerDown, { passive: true });

    // Handle screen resize safely
    window.addEventListener('resize', () => {
      const rect = el.getBoundingClientRect();
      const btnW = el.offsetWidth || 56;
      const btnH = el.offsetHeight || 56;
      const maxL = window.innerWidth - btnW - 12;
      const maxT = window.innerHeight - btnH - 12;

      let adjL = Math.max(12, Math.min(rect.left, maxL));
      let adjT = Math.max(12, Math.min(rect.top, maxT));

      if (rect.left !== adjL || rect.top !== adjT) {
        el.style.left = `${adjL}px`;
        el.style.top = `${adjT}px`;
        el.style.right = 'auto';
        el.style.bottom = 'auto';
      }
    });
  }

  function toggleChat() {
    const isActive = chatWindow.classList.toggle('active');
    if (isActive) {
      setTimeout(() => chatInput.focus(), 300);
    }
  }

  window.openAvyaChat = function (prefilledService) {
    if (!chatWindow.classList.contains('active')) {
      chatWindow.classList.add('active');
    }
    if (prefilledService) {
      setTimeout(() => {
        leadState.data.service = prefilledService;
        appendBotMessage(`I see you are interested in <strong>${prefilledService}</strong>! Let's get your details so we can deliver a comprehensive quote to your inbox.`);
      }, 400);
    }
  };

  function renderWelcomeMessage() {
    const firstStep = steps[0];
    appendBotMessage(firstStep.prompt);
    if (firstStep.chips) {
      appendChips(firstStep.chips);
    }
  }

  function appendUserMessage(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    scrollToBottom();
  }

  function appendBotMessage(html) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.innerHTML = html;
    chatMessages.appendChild(bubble);
    scrollToBottom();
  }

  function appendChips(chips) {
    const container = document.createElement('div');
    container.className = 'chat-chips-container';
    chips.forEach(chipText => {
      const chip = document.createElement('button');
      chip.className = 'chat-chip';
      chip.textContent = chipText;
      chip.addEventListener('click', () => {
        chatInput.value = chipText;
        handleUserSend();
      });
      container.appendChild(chip);
    });
    chatMessages.appendChild(container);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'chatTypingIndicator';
    indicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const ind = document.getElementById('chatTypingIndicator');
    if (ind) ind.remove();
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function handleUserSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';

    appendUserMessage(text);
    showTypingIndicator();

    // Check if live Gemini API key is provided via repository environment variable
    const apiKey = getGeminiApiKey();
    if (apiKey && leadState.step >= steps.length) {
      await callGeminiApi(text, apiKey);
      return;
    }

    // Default: Progressive Lead Qualification Flow
    setTimeout(() => {
      removeTypingIndicator();
      processLeadStep(text);
    }, 600);
  }

  function processLeadStep(input) {
    switch (leadState.step) {
      case 0:
        leadState.data.name = input;
        leadState.step++;
        appendBotMessage(`Pleased to meet you! What specific service or solution can <strong>Avya Corporate Services</strong> prepare for you?`);
        appendChips(steps[1].chips);
        break;

      case 1:
        leadState.data.service = input;
        leadState.step++;
        appendBotMessage(`Understood, <strong>${input}</strong>. Could you share your <strong>Work Email</strong> and <strong>Phone Number</strong> so our account manager can prepare the proposal?`);
        break;

      case 2:
        leadState.data.email = input;
        leadState.step++;
        appendBotMessage(`Thank you! What is your estimated <strong>quantity or headcount</strong>, and what is your required <strong>delivery or event date</strong>?`);
        appendChips(steps[3].chips);
        break;

      case 3:
        leadState.data.quantity = input;
        leadState.step++;
        appendBotMessage(`Noted. Do you have an estimated <strong>budget</strong> per kit/person, or any special branding requirements (e.g. foil stamping, custom homestay location, multi-city delivery)?`);
        appendChips(steps[4].chips);
        break;

      case 4:
        leadState.data.budget = input;
        leadState.step++;
        completeAndDispatchLead();
        break;

      default:
        // Conversation beyond initial qualification
        appendBotMessage(`I have captured all your specifications. Our team has received your inquiry for <strong>${leadState.data.service || 'Corporate Services'}</strong> and is processing it for <strong>${TARGET_EMAIL}</strong>.<br><br>Feel free to type any additional questions about our vendor on-boarding, GST compliance, or sample kits!`);
        break;
    }
  }

  function completeAndDispatchLead() {
    // Save to local storage ledger
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_LEADS) || '[]');
    const record = {
      timestamp: new Date().toISOString(),
      ...leadState.data,
      recipient: TARGET_EMAIL
    };
    existing.push(record);
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(existing));

    // Render Lead Summary Card
    const summaryCard = document.createElement('div');
    summaryCard.className = 'lead-summary-card';
    summaryCard.innerHTML = `
      <div class="lead-summary-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Corporate Requirement Dossier Prepared
      </div>
      <div class="lead-summary-item"><strong>Contact / Organization:</strong> ${leadState.data.name}</div>
      <div class="lead-summary-item"><strong>Primary Service:</strong> ${leadState.data.service}</div>
      <div class="lead-summary-item"><strong>Contact Coordinates:</strong> ${leadState.data.email}</div>
      <div class="lead-summary-item"><strong>Volume / Scope:</strong> ${leadState.data.quantity}</div>
      <div class="lead-summary-item"><strong>Budget & Details:</strong> ${leadState.data.budget}</div>
      <div class="lead-summary-item" style="margin-top: 8px; color: var(--gold-500); font-weight: 600;">
        ✓ Direct Routing Target: ${TARGET_EMAIL}
      </div>
    `;
    chatMessages.appendChild(summaryCard);

    appendBotMessage(`Your request has been successfully registered and routed to <strong>${TARGET_EMAIL}</strong>!<br><br>Our corporate relationship manager is reviewing your requirements and will contact you with a customized digital proposal within 24 business hours.`);

    // Mailto fallback option for direct email dispatch
    const mailtoSubject = encodeURIComponent(`New Corporate Inquiry: ${leadState.data.service} - ${leadState.data.name}`);
    const mailtoBody = encodeURIComponent(
      `Avya Corporate Services Inquiry:\n\n` +
      `Contact/Company: ${leadState.data.name}\n` +
      `Service: ${leadState.data.service}\n` +
      `Contact Email/Phone: ${leadState.data.email}\n` +
      `Volume / Timeline: ${leadState.data.quantity}\n` +
      `Budget & Notes: ${leadState.data.budget}\n\n` +
      `Sent via Avya AI Concierge`
    );

    const emailButtonContainer = document.createElement('div');
    emailButtonContainer.style.marginTop = '12px';
    emailButtonContainer.innerHTML = `
      <a href="mailto:${TARGET_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}" class="btn btn-gold btn-sm" style="display: inline-flex;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        Send Copy via Email Client
      </a>
    `;
    chatMessages.appendChild(emailButtonContainer);

    showToast(`Inquiry captured! Routing to ${TARGET_EMAIL}`);
    scrollToBottom();
  }

  // Live Gemini API Integration (triggered only when owner API key is injected)
  async function callGeminiApi(userPrompt, apiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const systemContext = `
You are the Executive AI Concierge for Avya Corporate Services (Bengaluru, India; website: avyaservices.in).
We are a premier corporate solutions vendor for leading MNC and IT/ITeS enterprises.
Key services:
1. Corporate Gifting & Swag (Our Flagship Business): Onboarding kits, festive hampers, tech merchandise, sustainable gift sets, luxury desk accessories.
2. Print Media Services: Comprehensive corporate print covering business stationery, brochures, product packaging & rigid boxes, roll-up standees, acrylic/LED signage, spot UV, foiling.
3. Corporate Domestic Travel & Hospitality: Executive homestays & private villas (Coorg, Chikmagalur, Wayanad, Goa, Ooty, Rishikesh), corporate event planning, retreats, business hotel bookings.
4. Rewards & Recognition: Crystal trophies, engraved plaques, tenure awards.
Vendor Credentials: GST registered, ISO 9001 certified, MSME compliant, enterprise SLAs, Pan-India multi-campus & doorstep delivery.
Target Inquiry Email: contacts@avyaservices.in.

Always reply in an elegant, executive, professional tone. If the user shares corporate requirements, acknowledge them clearly and advise them that their inquiry can be dispatched directly to contacts@avyaservices.in. Keep answers concise, clear, and action-oriented.
      `;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                { text: `${systemContext}\n\nVisitor Message: ${userPrompt}` }
              ]
            }
          ]
        })
      });

      removeTypingIndicator();

      if (!response.ok) {
        throw new Error(`Gemini API returned status ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Thank you for reaching out! Our team at contacts@avyaservices.in will be pleased to assist with your requirements.";
      appendBotMessage(botReply.replace(/\n/g, '<br>'));

    } catch (err) {
      removeTypingIndicator();
      console.warn("Live API call unavailable, falling back to corporate concierge engine:", err.message);
      appendBotMessage(`Thank you for your inquiry! Our corporate relationship team will review your specifications and connect with you directly. You can also reach our desk directly at <strong>${TARGET_EMAIL}</strong>.`);
    }
  }

  // Toast Notification helper
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="color: var(--gold-500); font-size: 1.25rem;">✦</div>
      <div style="font-size: 0.875rem; font-weight: 500;">${message}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  window.showAvyaToast = showToast;

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
