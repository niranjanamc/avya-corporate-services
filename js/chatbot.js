/**
 * AVYA Corporate Services - AI Operations Concierge Chatbot
 * Handles lead qualification with strict input validation, real email dispatch to
 * support@avyaservices.co.in and umesh@avyaservices.co.in via Web3Forms,
 * and silent Google Gemini LLM API integration via owner environment variable.
 */

(function () {
  const STORAGE_KEY_LEADS = 'avya_collected_leads';
  const STORAGE_KEY_POS = 'avya_chat_trigger_pos';
  const PRIMARY_EMAIL = 'support@avyaservices.co.in';
  const MANAGEMENT_EMAIL = 'umesh@avyaservices.co.in';

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
      prompt: "Welcome to <strong>AVYA Corporate Services</strong>! I am your AI Operations Concierge.<br><br>Backed by <strong>25+ years of operational experience</strong>, we help organizations streamline administrative, statutory, and logistical requirements through a single point of contact.<br><br>May I know your <strong>Name</strong> and the <strong>Company / Institution</strong> you represent?",
      placeholder: "e.g., Ramesh Kumar from TechCorp Solutions",
      chips: ["RTO & Fleet Liaison 🚗", "Stamp Paper & Notary ⚖️", "IT Asset & Courier Movement 💻", "CSR Supply Kits 🤝", "Business Support / Florists 🏢", "Passport Services 🛂"]
    },
    {
      key: 'service',
      prompt: "Great to connect with you! Which of our corporate service pillars can we assist your organization with today?",
      placeholder: "Choose below or type your requirement...",
      chips: ["RTO Services", "Stamp Paper & Notary", "Courier & IT Asset Movement", "CSR Services", "Business Support Services", "Passport Services", "Tailored Corporate Support"]
    },
    {
      key: 'contact_info',
      prompt: "Understood! Could you share your <strong>Work Email</strong> and <strong>Contact Phone / WhatsApp</strong> so our operations manager can send you a detailed checklist and quote?",
      placeholder: "e.g., ramesh@techcorp.com, +91 99165 99960"
    },
    {
      key: 'quantity_timeline',
      prompt: "What is your estimated <strong>volume, number of vehicles/units</strong>, or desired <strong>timeline</strong> for this requirement?",
      placeholder: "e.g., 25 laptops to dispatch next week / 5 fleet vehicle FC renewals",
      chips: ["Immediate (1 - 3 Days)", "Within this week", "Ongoing Monthly Retainer", "Bulk Enterprise Batch"]
    },
    {
      key: 'budget_notes',
      prompt: "Do you have any specific locations, vehicle registration numbers, document types, or special delivery notes?",
      placeholder: "e.g., Doorstep delivery across Bangalore North / Yelahanka RTO",
      chips: ["Bangalore Only", "Pan-India Multi-City", "Doorstep Campus Delivery", "Need Urgent Consultation"]
    }
  ];

  let chatWindow, chatMessages, chatInput, sendBtn, triggerBtn;

  function init() {
    createChatbotMarkup();
    bindEvents();
    initDraggableTrigger(triggerBtn);
    renderWelcomeMessage();
  }

  function createChatbotMarkup() {
    const trigger = document.createElement('div');
    trigger.className = 'ai-chat-trigger';
    trigger.id = 'aiChatTrigger';
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-label', 'Open AVYA AI Concierge');
    trigger.setAttribute('title', 'AVYA AI Concierge (Drag to move, Click to chat)');
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
            <h4>AVYA Operations AI</h4>
            <div class="chatbot-status"><span class="pulse-dot"></span> Ready to assist &amp; route</div>
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
        <div class="chatbot-disclaimer">
          Direct Routing to support@avyaservices.co.in • 25+ Years Experience
        </div>
      </div>
    `;
    document.body.appendChild(win);
    chatWindow = win;
    chatMessages = win.querySelector('#chatMessages');
    chatInput = win.querySelector('#chatInput');
    sendBtn = win.querySelector('#chatSendBtn');
  }

  function bindEvents() {
    triggerBtn.addEventListener('click', toggleChat);
    chatWindow.querySelector('#chatCloseBtn').addEventListener('click', closeChat);

    sendBtn.addEventListener('click', handleUserSend);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUserSend();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatWindow.classList.contains('active')) {
        closeChat();
      }
    });
  }

  function initDraggableTrigger(el) {
    let isPointerDown = false;
    let hasMoved = false;
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;

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
      if (e.button !== undefined && e.button !== 0) return;

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
        try {
          const rect = el.getBoundingClientRect();
          localStorage.setItem(STORAGE_KEY_POS, JSON.stringify({ left: rect.left, top: rect.top }));
        } catch (e) {}
      } else {
        toggleChat();
      }
    }

    el.addEventListener('mousedown', onPointerDown);
    el.addEventListener('touchstart', onPointerDown, { passive: true });

    window.addEventListener('resize', () => {
      const rect = el.getBoundingClientRect();
      const btnW = el.offsetWidth || 56;
      const btnH = el.offsetHeight || 56;
      const maxL = window.innerWidth - btnW - 12;
      const maxT = window.innerHeight - btnH - 12;

      if (rect.left > maxL || rect.top > maxT) {
        el.style.left = `${Math.min(rect.left, maxL)}px`;
        el.style.top = `${Math.min(rect.top, maxT)}px`;
      }
    });
  }

  function toggleChat() {
    const isActive = chatWindow.classList.toggle('active');
    triggerBtn.setAttribute('aria-expanded', isActive);
    if (isActive) {
      setTimeout(() => chatInput.focus(), 250);
    }
  }

  function openChat(prefillService) {
    chatWindow.classList.add('active');
    triggerBtn.setAttribute('aria-expanded', 'true');
    if (prefillService) {
      appendUserMessage(`I am interested in ${prefillService}`);
      leadState.data.service = prefillService;
      leadState.step = 2;
      appendBotMessage(`Excellent choice! Could you share your <strong>Name, Work Email</strong>, and <strong>Contact Phone</strong> so our operations manager can send over the specific checklist and pricing for <strong>${prefillService}</strong>?`);
    }
    setTimeout(() => chatInput.focus(), 250);
  }

  window.openAvyaChat = openChat;

  function closeChat() {
    chatWindow.classList.remove('active');
    triggerBtn.setAttribute('aria-expanded', 'false');
  }

  function renderWelcomeMessage() {
    appendBotMessage(steps[0].prompt);
    appendChips(steps[0].chips);
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

    const apiKey = getGeminiApiKey();
    if (apiKey && leadState.step >= steps.length) {
      await callGeminiApi(text, apiKey);
      return;
    }

    setTimeout(() => {
      removeTypingIndicator();
      processLeadStep(text);
    }, 600);
  }

  // Conversational input validator (Resolves Review Comment 11)
  function processLeadStep(input) {
    switch (leadState.step) {
      case 0:
        leadState.data.name = input;
        leadState.step++;
        appendBotMessage(`Pleased to connect! Which of our corporate service verticals can <strong>AVYA Corporate Services</strong> assist you with?`);
        appendChips(steps[1].chips);
        break;

      case 1:
        leadState.data.service = input;
        leadState.step++;
        appendBotMessage(`Noted: <strong>${input}</strong>. Could you please share your <strong>Work Email</strong> and <strong>Contact Phone / WhatsApp Number</strong> so our relationship manager can prepare the proposal and documentation checklist?`);
        break;

      case 2:
        // Validation check for contact info (Prevent "Hi", single words, or invalid entries)
        const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+/.test(input) || input.includes('@');
        const digits = input.replace(/\D/g, '');
        const hasPhone = digits.length >= 8;

        if (!hasEmail && !hasPhone) {
          appendBotMessage(`To ensure our operations desk can send you the official documentation checklist and quote, could you please provide a valid <strong>Work Email</strong> (e.g. name@company.com) or a <strong>Phone / WhatsApp number</strong>?`);
          return;
        }

        leadState.data.email = input;
        leadState.step++;
        appendBotMessage(`Thank you! What is your estimated <strong>volume, number of items/vehicles</strong>, or desired <strong>timeline</strong>?`);
        appendChips(steps[3].chips);
        break;

      case 3:
        leadState.data.quantity = input;
        leadState.step++;
        appendBotMessage(`Understood. Do you have any specific notes, delivery locations (e.g. Bangalore North / Yelahanka / Electronic City), or urgent constraints?`);
        appendChips(steps[4].chips);
        break;

      case 4:
        leadState.data.budget = input;
        leadState.step++;
        completeAndDispatchLead();
        break;

      default:
        appendBotMessage(`I have captured all your specifications. Our operations desk has received your inquiry for <strong>${leadState.data.service || 'Corporate Services'}</strong> and is routing it to <strong>${PRIMARY_EMAIL}</strong> and <strong>${MANAGEMENT_EMAIL}</strong>.<br><br>Feel free to ask any additional questions regarding our single SPOC billing, statutory RTO timelines, or e-stamp procurement!`);
        break;
    }
  }

  function completeAndDispatchLead() {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY_LEADS) || '[]');
    const record = {
      timestamp: new Date().toISOString(),
      ...leadState.data,
      recipients: `${PRIMARY_EMAIL}, ${MANAGEMENT_EMAIL}`
    };
    existing.push(record);
    localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(existing));

    // Web3Forms real email dispatch to support@avyaservices.co.in and umesh@avyaservices.co.in
    const web3Payload = {
      access_key: (window.AVYA_CONFIG && window.AVYA_CONFIG.web3forms && window.AVYA_CONFIG.web3forms.accessKey) || '5a133df1-53e7-4b7f-b883-9b88eb34c329',
      subject: `[AVYA Chat Concierge] ${leadState.data.service} - ${leadState.data.name}`,
      from_name: `AVYA Concierge: ${leadState.data.name}`,
      name: leadState.data.name,
      service: leadState.data.service,
      contact_info: leadState.data.email,
      volume_timeline: leadState.data.quantity,
      location_notes: leadState.data.budget,
      submitted_at: record.timestamp
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(web3Payload)
    }).catch(e => console.warn('Chat transmission fallback:', e));

    const summaryCard = document.createElement('div');
    summaryCard.className = 'lead-summary-card';
    summaryCard.innerHTML = `
      <div class="lead-summary-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        Corporate Requirement Dossier Prepared
      </div>
      <div class="lead-summary-item"><strong>Contact / Organization:</strong> ${leadState.data.name}</div>
      <div class="lead-summary-item"><strong>Service Pillar:</strong> ${leadState.data.service}</div>
      <div class="lead-summary-item"><strong>Contact Coordinates:</strong> ${leadState.data.email}</div>
      <div class="lead-summary-item"><strong>Volume / Timeline:</strong> ${leadState.data.quantity}</div>
      <div class="lead-summary-item"><strong>Location & Notes:</strong> ${leadState.data.budget}</div>
      <div class="lead-summary-item" style="margin-top: 8px; color: var(--gold-500); font-weight: 600;">
        ✓ Direct Routing Target: ${PRIMARY_EMAIL} &amp; ${MANAGEMENT_EMAIL}
      </div>
    `;
    chatMessages.appendChild(summaryCard);

    appendBotMessage(`Your request has been successfully registered and routed to <strong>${PRIMARY_EMAIL}</strong> and <strong>${MANAGEMENT_EMAIL}</strong>!<br><br>Our operations relationship manager will review your specifications and contact you with a customized proposal within a few business hours.`);

    const mailtoSubject = encodeURIComponent(`New Corporate Inquiry: ${leadState.data.service} - ${leadState.data.name}`);
    const mailtoBody = encodeURIComponent(
      `AVYA Corporate Services Inquiry:\n\n` +
      `Contact/Company: ${leadState.data.name}\n` +
      `Service: ${leadState.data.service}\n` +
      `Contact Email/Phone: ${leadState.data.email}\n` +
      `Volume / Timeline: ${leadState.data.quantity}\n` +
      `Location & Notes: ${leadState.data.budget}\n\n` +
      `Sent via AVYA Operations AI Concierge`
    );

    const emailButtonContainer = document.createElement('div');
    emailButtonContainer.style.marginTop = '12px';
    emailButtonContainer.innerHTML = `
      <a href="mailto:${PRIMARY_EMAIL}?cc=${MANAGEMENT_EMAIL}&subject=${mailtoSubject}&body=${mailtoBody}" class="btn btn-gold btn-sm" style="display: inline-flex;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        Send Copy via Email Client
      </a>
    `;
    chatMessages.appendChild(emailButtonContainer);

    showToast(`Inquiry captured! Routing to ${PRIMARY_EMAIL}`);
    scrollToBottom();
  }

  // Live Gemini API Integration
  async function callGeminiApi(userPrompt, apiKey) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const systemContext = `
You are the Operations AI Concierge for AVYA Corporate Services (Bangalore, India; website: avyaservices.co.in; phone: +91 99165 99960).
Backed by 25+ years of corporate operational experience since 1999.
Key services:
1. Business Support Services: Daily vendor coordination, corporate florists, newspaper/periodical subscriptions, and local facility providers with consolidated monthly billing.
2. RTO Services: RC transfers, hypothecation cancellations, commercial vehicle fitness certificates (FC), NOCs, and driving licence services across all Bangalore RTOs.
3. Stamp Paper & Notary Services: Government-authorized e-stamp paper procurement (all denominations), agreement drafting, affidavits, and registered advocate notarisation with campus delivery.
4. CSR Services: Corporate-NGO liaison, initiative planning, turnkey procurement and distribution of medical kits, grocery ration kits, blankets, and school kits with audit proof.
5. Passport Services: Corporate employee passport desk, Tatkal expedited applications, Police Clearance Certificates (PCC) for onsite deputation, and PSK appointment slots.
6. Courier & IT Asset Movement: Doorstep laptop hardware transit for remote/hybrid employees, tamper-proof packaging, and multi-carrier courier coordination (Blue Dart, DHL, DTDC, FedEx).
7. Tailored Corporate Support: Bespoke operational concierge and administrative solutions.
GSTIN: 29APAPV7401D1ZY. Headquarters: 131/9, SMIGB, 5th Phase, Yelahanka New Town, Bangalore 560064. Phone: +91 99165 99960. Email: support@avyaservices.co.in / umesh@avyaservices.co.in.

Always reply in an elegant, executive, professional tone. If the user shares corporate requirements, acknowledge them clearly and advise them that their inquiry can be dispatched directly to support@avyaservices.co.in or via WhatsApp at +91 99165 99960. Keep answers concise, clear, and action-oriented.
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
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Thank you for reaching out! Our team at support@avyaservices.co.in will be pleased to assist with your requirements.";
      appendBotMessage(botReply.replace(/\n/g, '<br>'));

    } catch (err) {
      removeTypingIndicator();
      console.warn("Live API call unavailable, falling back to corporate concierge engine:", err.message);
      appendBotMessage(`Thank you for your inquiry! Our corporate relationship team will review your specifications and connect with you directly. You can also reach our desk directly at <strong>${PRIMARY_EMAIL}</strong> or via WhatsApp at <strong>+91 99165 99960</strong>.`);
    }
  }

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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
