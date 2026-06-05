const Onboarding = (() => {
  const HABITS_LIST = [
    { type: 'smoking',      name: 'Smoking',      icon: '🚬' },
    { type: 'vape',         name: 'Vaping',       icon: '💨' },
    { type: 'porn',         name: 'Porn',         icon: '📵' },
    { type: 'weed',         name: 'Weed',         icon: '🌿' },
    { type: 'social_media', name: 'Social Media', icon: '📱' },
    { type: 'sugar',        name: 'Junk Food',    icon: '🍔' },
    { type: 'caffeine',     name: 'Caffeine',     icon: '☕' },
  ];

  const GOALS = [
    { id: 'health',        label: 'Better Health',   icon: '❤️' },
    { id: 'discipline',    label: 'Discipline',       icon: '🎯' },
    { id: 'confidence',    label: 'Confidence',       icon: '💪' },
    { id: 'religion',      label: 'Faith & Religion', icon: '🤲' },
    { id: 'relationships', label: 'Relationships',    icon: '👥' },
    { id: 'fitness',       label: 'Fitness',          icon: '🏋️' },
    { id: 'productivity',  label: 'Productivity',     icon: '⚡' },
    { id: 'money',         label: 'Save Money',       icon: '💰' },
  ];

  const TRIGGERS = [
    { id: 'stress',    label: 'Stress',         icon: '😤' },
    { id: 'boredom',   label: 'Boredom',        icon: '😑' },
    { id: 'loneliness',label: 'Loneliness',     icon: '😔' },
    { id: 'evening',   label: 'Late Night',     icon: '🌙' },
    { id: 'social',    label: 'Social Settings',icon: '🎉' },
    { id: 'anger',     label: 'Anger',          icon: '😡' },
    { id: 'anxiety',   label: 'Anxiety',        icon: '😰' },
    { id: 'after_meals',label: 'After Meals',   icon: '🍽️' },
  ];

  const CURRENCIES = [
    { code: 'USD', label: 'USD — US Dollar', symbol: '$' },
    { code: 'GBP', label: 'GBP — British Pound', symbol: '£' },
    { code: 'EUR', label: 'EUR — Euro', symbol: '€' },
    { code: 'AED', label: 'AED — UAE Dirham', symbol: 'AED' },
    { code: 'PKR', label: 'PKR — Pakistani Rupee', symbol: '₨' },
  ];

  let currentStep = 1;
  const totalSteps = 6;
  let selectedHabits = [];
  let selectedGoals = [];
  let selectedTriggers = [];
  let habitDetails = {};
  let userData = {};

  function render() {
    const el = document.getElementById('screen-onboarding');
    if (!el) return;
    el.innerHTML = buildStep(currentStep);
    attachHandlers();
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((d, i) => {
      d.classList.remove('active', 'done');
      if (i + 1 === currentStep) d.classList.add('active');
      else if (i + 1 < currentStep) d.classList.add('done');
    });
  }

  function buildDots() {
    return Array.from({ length: totalSteps }, (_, i) =>
      `<div class="progress-dot${i + 1 === currentStep ? ' active' : i + 1 < currentStep ? ' done' : ''}"></div>`
    ).join('');
  }

  function buildStep(step) {
    const dots = buildDots();
    switch (step) {
      case 1: return buildWelcome();
      case 2: return buildIdentity(dots);
      case 3: return buildHabitScan(dots);
      case 4: return buildHabitDetails(dots);
      case 5: return buildGoals(dots);
      case 6: return buildTriggers(dots);
      default: return buildWelcome();
    }
  }

  function buildWelcome() {
    return `
    <div class="onboarding-wrap">
      <div class="welcome-screen">
        <div class="welcome-logo-ring">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,107,43,0.15)" stroke-width="2"/>
            <circle cx="60" cy="60" r="52" fill="none" stroke="url(#logoGrad)" stroke-width="3" stroke-linecap="round"
              stroke-dasharray="327" stroke-dashoffset="82" transform="rotate(-90 60 60)"
              style="animation: none"/>
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff6b2b"/>
                <stop offset="100%" stop-color="#4fc3f7"/>
              </linearGradient>
            </defs>
          </svg>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;">
            <div style="font-size:0.65rem;font-weight:800;letter-spacing:0.2em;color:#ff6b2b;">DISCIPLINE</div>
            <div style="font-size:0.55rem;font-weight:600;letter-spacing:0.25em;color:#606060;">OS</div>
          </div>
        </div>
        <div style="font-size:0.65rem;font-weight:800;letter-spacing:0.3em;color:#606060;margin-bottom:16px;">DISCIPLINE<span style="color:#ff6b2b;">OS</span></div>
        <h1 class="t-hero" style="margin-bottom:12px;">Your Recovery<br>Starts Now.</h1>
        <p class="t-body t-muted" style="max-width:280px;margin:0 auto 32px;">A personal operating system built to help you reclaim control — scientifically, systematically.</p>
        <div class="boot-text">INITIALIZING RECOVERY PROTOCOL...</div>
        <button class="btn btn-primary btn-lg" id="btn-start" style="margin-top:32px;min-width:200px;">
          Begin Protocol
        </button>
      </div>
    </div>`;
  }

  function buildIdentity(dots) {
    return `
    <div class="onboarding-wrap">
      <div class="onboarding-header">
        <div class="dos-logo">Discipline<span>OS</span></div>
        <div class="onboarding-progress">${dots}</div>
        <h2 class="t-title" style="margin-top:8px;">Identity Profile</h2>
        <p class="t-body t-muted" style="margin-top:6px;">Optional — helps personalize your experience</p>
      </div>
      <div class="onboarding-body">
        <div class="field">
          <label>Name (optional)</label>
          <input type="text" id="ob-name" placeholder="What should we call you?" value="${userData.name || ''}">
        </div>
        <div class="field">
          <label>Age</label>
          <input type="number" id="ob-age" placeholder="Your age" min="13" max="99" value="${userData.age || ''}">
        </div>
        <div class="field">
          <label>Gender</label>
          <select id="ob-gender">
            <option value="">Select...</option>
            <option value="male" ${userData.gender === 'male' ? 'selected' : ''}>Male</option>
            <option value="female" ${userData.gender === 'female' ? 'selected' : ''}>Female</option>
            <option value="other" ${userData.gender === 'other' ? 'selected' : ''}>Other</option>
          </select>
        </div>
        <div class="field">
          <label>Country</label>
          <input type="text" id="ob-country" placeholder="Your country" value="${userData.country || ''}">
        </div>
        <div class="field">
          <label>Default Currency</label>
          <select id="ob-currency">
            ${CURRENCIES.map((c) => `<option value="${c.code}" ${(userData.currency || 'USD') === c.code ? 'selected' : ''}>${c.label}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="onboarding-footer">
        <button class="btn btn-ghost" id="btn-back">Back</button>
        <button class="btn btn-primary" style="flex:1" id="btn-next">Continue</button>
      </div>
    </div>`;
  }

  function buildHabitScan(dots) {
    return `
    <div class="onboarding-wrap">
      <div class="onboarding-header">
        <div class="dos-logo">Discipline<span>OS</span></div>
        <div class="onboarding-progress">${dots}</div>
        <h2 class="t-title" style="margin-top:8px;">Habit Scan</h2>
        <p class="t-body t-muted" style="margin-top:6px;">Select everything you want to track</p>
      </div>
      <div class="onboarding-body">
        <div class="habit-grid">
          ${HABITS_LIST.map((h) => `
            <div class="habit-option${selectedHabits.includes(h.type) ? ' selected' : ''}" data-habit="${h.type}">
              <div class="ho-icon">${h.icon}</div>
              <div class="ho-name">${h.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="onboarding-footer">
        <button class="btn btn-ghost" id="btn-back">Back</button>
        <button class="btn btn-primary" style="flex:1" id="btn-next">Continue</button>
      </div>
    </div>`;
  }

  function buildHabitDetails(dots) {
    if (selectedHabits.length === 0) { next(); return ''; }
    const forms = selectedHabits.map((type) => {
      const habit = HABITS_LIST.find((h) => h.type === type);
      const d = habitDetails[type] || {};
      const currency = userData.currency || 'USD';
      const vapeExtra = type === 'vape' ? `
        <div class="field">
          <label>Device Type</label>
          <select id="device-type-vape">
            <option value="">Select...</option>
            <option value="Pod System" ${(d.deviceType||'')==='Pod System'?'selected':''}>Pod System</option>
            <option value="Box Mod" ${(d.deviceType||'')==='Box Mod'?'selected':''}>Box Mod</option>
            <option value="Disposable" ${(d.deviceType||'')==='Disposable'?'selected':''}>Disposable</option>
            <option value="Pen" ${(d.deviceType||'')==='Pen'?'selected':''}>Pen</option>
            <option value="Other" ${(d.deviceType||'')==='Other'?'selected':''}>Other</option>
          </select>
        </div>
        <div class="field">
          <label>Device Brand / Name (optional)</label>
          <input type="text" id="device-brand-vape" placeholder="e.g. Vuse, Juul, Smok, Voopoo..." value="${d.deviceBrand||''}">
        </div>
        <div class="field" id="wattage-field-vape" style="display:none;">
          <label>Output Wattage (W)</label>
          <input type="number" id="wattage-vape" placeholder="e.g. 40" min="1" max="300" value="${d.wattage||''}">
        </div>
        <div class="field">
          <label>Nicotine Type</label>
          <select id="nic-type-vape">
            <option value="Freebase Nicotine" ${(d.nicType||'Freebase Nicotine')==='Freebase Nicotine'?'selected':''}>Freebase Nicotine</option>
            <option value="Nicotine Salt" ${(d.nicType||'')==='Nicotine Salt'?'selected':''}>Nicotine Salt (Nic Salt)</option>
          </select>
        </div>
        <div class="field">
          <label>Nicotine Strength (mg/mL)</label>
          <input type="number" id="nic-strength-vape" placeholder="3, 6, 12, 20, 50..." min="0" step="0.5" value="${d.nicStrength||''}">
        </div>
        <div class="field">
          <label>Estimated Daily Puffs</label>
          <input type="number" id="daily-puffs-vape" placeholder="e.g. 200" min="0" value="${d.dailyPuffs||''}">
        </div>
        <div class="field">
          <label>Pods or Coils Per Week</label>
          <input type="number" id="pods-week-vape" placeholder="e.g. 2" min="0" value="${d.podsPerWeek||''}">
        </div>
        <div class="field">
          <label>Favourite Flavour (optional)</label>
          <input type="text" id="flavour-vape" placeholder="e.g. mango, mint, tobacco..." value="${d.flavour||''}">
        </div>` : '';
      return `
      <div style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
          <span style="font-size:1.5rem;">${habit.icon}</span>
          <span class="t-heading">${habit.name}</span>
        </div>
        <div class="field">
          <label>When did you quit? (or start tracking)</label>
          <input type="datetime-local" id="quit-${type}" value="${d.quitTime || new Date().toISOString().slice(0,16)}">
        </div>
        ${vapeExtra}
        <div class="field">
          <label>Daily cost (${currency})</label>
          <input type="number" id="cost-${type}" placeholder="0.00" min="0" step="0.01" value="${d.costPerDay || ''}">
        </div>
      </div>`;
    }).join('<div class="divider"></div>');

    return `
    <div class="onboarding-wrap">
      <div class="onboarding-header">
        <div class="dos-logo">Discipline<span>OS</span></div>
        <div class="onboarding-progress">${dots}</div>
        <h2 class="t-title" style="margin-top:8px;">Habit Details</h2>
        <p class="t-body t-muted" style="margin-top:6px;">Configure each habit for accurate tracking</p>
      </div>
      <div class="onboarding-body">${forms}</div>
      <div class="onboarding-footer">
        <button class="btn btn-ghost" id="btn-back">Back</button>
        <button class="btn btn-primary" style="flex:1" id="btn-next">Continue</button>
      </div>
    </div>`;
  }

  function buildGoals(dots) {
    return `
    <div class="onboarding-wrap">
      <div class="onboarding-header">
        <div class="dos-logo">Discipline<span>OS</span></div>
        <div class="onboarding-progress">${dots}</div>
        <h2 class="t-title" style="margin-top:8px;">Recovery Goals</h2>
        <p class="t-body t-muted" style="margin-top:6px;">What are you fighting for?</p>
      </div>
      <div class="onboarding-body">
        <div class="goal-grid">
          ${GOALS.map((g) => `
            <div class="goal-chip${selectedGoals.includes(g.id) ? ' selected' : ''}" data-goal="${g.id}">
              ${g.icon} ${g.label}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="onboarding-footer">
        <button class="btn btn-ghost" id="btn-back">Back</button>
        <button class="btn btn-primary" style="flex:1" id="btn-next">Continue</button>
      </div>
    </div>`;
  }

  function buildTriggers(dots) {
    return `
    <div class="onboarding-wrap">
      <div class="onboarding-header">
        <div class="dos-logo">Discipline<span>OS</span></div>
        <div class="onboarding-progress">${dots}</div>
        <h2 class="t-title" style="margin-top:8px;">Know Your Triggers</h2>
        <p class="t-body t-muted" style="margin-top:6px;">Awareness is the first line of defense</p>
      </div>
      <div class="onboarding-body">
        <div class="goal-grid">
          ${TRIGGERS.map((t) => `
            <div class="goal-chip${selectedTriggers.includes(t.id) ? ' selected' : ''}" data-trigger="${t.id}">
              ${t.icon} ${t.label}
            </div>
          `).join('')}
        </div>
        <p class="t-caption" style="margin-top:20px;text-align:center;">Your data never leaves your device.</p>
      </div>
      <div class="onboarding-footer">
        <button class="btn btn-ghost" id="btn-back">Back</button>
        <button class="btn btn-primary" style="flex:1" id="btn-finish">
          Launch DisciplineOS
        </button>
      </div>
    </div>`;
  }

  function attachHandlers() {
    document.getElementById('btn-start')?.addEventListener('click', () => { currentStep = 2; render(); });
    document.getElementById('btn-back')?.addEventListener('click', back);
    document.getElementById('btn-next')?.addEventListener('click', next);
    document.getElementById('btn-finish')?.addEventListener('click', finish);

    document.querySelectorAll('.habit-option').forEach((el) => {
      el.addEventListener('click', () => {
        const t = el.dataset.habit;
        if (selectedHabits.includes(t)) selectedHabits = selectedHabits.filter((h) => h !== t);
        else selectedHabits.push(t);
        el.classList.toggle('selected', selectedHabits.includes(t));
      });
    });

    document.querySelectorAll('[data-goal]').forEach((el) => {
      el.addEventListener('click', () => {
        const g = el.dataset.goal;
        if (selectedGoals.includes(g)) selectedGoals = selectedGoals.filter((x) => x !== g);
        else selectedGoals.push(g);
        el.classList.toggle('selected', selectedGoals.includes(g));
      });
    });

    document.querySelectorAll('[data-trigger]').forEach((el) => {
      el.addEventListener('click', () => {
        const t = el.dataset.trigger;
        if (selectedTriggers.includes(t)) selectedTriggers = selectedTriggers.filter((x) => x !== t);
        else selectedTriggers.push(t);
        el.classList.toggle('selected', selectedTriggers.includes(t));
      });
    });

    const deviceTypeSelect = document.getElementById('device-type-vape');
    const wattageField = document.getElementById('wattage-field-vape');
    if (deviceTypeSelect && wattageField) {
      const toggleWattage = () => {
        wattageField.style.display = ['Box Mod', 'Pen'].includes(deviceTypeSelect.value) ? '' : 'none';
      };
      toggleWattage();
      deviceTypeSelect.addEventListener('change', toggleWattage);
    }
  }

  function saveCurrentStep() {
    if (currentStep === 2) {
      userData.name     = document.getElementById('ob-name')?.value || '';
      userData.age      = document.getElementById('ob-age')?.value || '';
      userData.gender   = document.getElementById('ob-gender')?.value || '';
      userData.country  = document.getElementById('ob-country')?.value || '';
      userData.currency = document.getElementById('ob-currency')?.value || 'USD';
    }
    if (currentStep === 4) {
      for (const type of selectedHabits) {
        habitDetails[type] = {
          quitTime:   document.getElementById(`quit-${type}`)?.value || new Date().toISOString(),
          costPerDay: parseFloat(document.getElementById(`cost-${type}`)?.value) || 0,
        };
        if (type === 'vape') {
          habitDetails[type].deviceType  = document.getElementById('device-type-vape')?.value || '';
          habitDetails[type].deviceBrand = document.getElementById('device-brand-vape')?.value || '';
          habitDetails[type].wattage     = parseFloat(document.getElementById('wattage-vape')?.value) || 0;
          habitDetails[type].nicType     = document.getElementById('nic-type-vape')?.value || 'Freebase Nicotine';
          habitDetails[type].nicStrength = parseFloat(document.getElementById('nic-strength-vape')?.value) || 0;
          habitDetails[type].dailyPuffs  = parseInt(document.getElementById('daily-puffs-vape')?.value) || 0;
          habitDetails[type].podsPerWeek = parseInt(document.getElementById('pods-week-vape')?.value) || 0;
          habitDetails[type].flavour     = document.getElementById('flavour-vape')?.value || '';
        }
      }
    }
  }

  function next() {
    saveCurrentStep();
    if (currentStep === 3 && selectedHabits.length === 0) {
      App.showToast('Select at least one habit to track', 'error');
      return;
    }
    currentStep = Math.min(totalSteps, currentStep + 1);
    render();
  }

  function back() {
    saveCurrentStep();
    currentStep = Math.max(1, currentStep - 1);
    render();
  }

  function finish() {
    saveCurrentStep();
    StateManager.update((s) => {
      s.user = {
        name: userData.name,
        age: userData.age,
        gender: userData.gender,
        country: userData.country,
        goals: selectedGoals,
        triggers: selectedTriggers,
      };
      s.settings.currency = userData.currency || 'USD';
      s.habits = [];
      for (const type of selectedHabits) {
        const d = habitDetails[type] || {};
        const habit = HABITS_LIST.find((h) => h.type === type);
        s.habits.push({
          id: `h_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          type,
          name: habit.name,
          icon: habit.icon,
          quitTime: d.quitTime ? new Date(d.quitTime).toISOString() : new Date().toISOString(),
          config: type === 'vape' ? {
            costPerDay:  d.costPerDay  || 0,
            currency:    userData.currency || 'USD',
            deviceType:  d.deviceType  || '',
            deviceBrand: d.deviceBrand || '',
            wattage:     d.wattage     || 0,
            nicType:     d.nicType     || 'Freebase Nicotine',
            nicStrength: d.nicStrength || 0,
            dailyPuffs:  d.dailyPuffs  || 0,
            podsPerWeek: d.podsPerWeek || 0,
            flavour:     d.flavour     || '',
          } : { costPerDay: d.costPerDay || 0, currency: userData.currency || 'USD' },
          relapses: [],
          active: true,
          createdAt: Date.now(),
        });
      }
      s.onboardingComplete = true;
    });

    App.launch();
  }

  function init() {
    currentStep = 1;
    selectedHabits = [];
    selectedGoals = [];
    selectedTriggers = [];
    habitDetails = {};
    userData = {};
    render();
  }

  return { init };
})();
