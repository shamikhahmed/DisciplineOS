const Navigation = (() => {
  const TABS = [
    { id: 'dashboard', icon: '⊙', label: 'Home',       screen: 'screen-dashboard' },
    { id: 'recovery',  icon: '🔬', label: 'Recovery',   screen: 'screen-recovery' },
    { id: 'emergency', icon: '🆘', label: 'SOS',        screen: 'screen-emergency', special: true },
    { id: 'knowledge', icon: '📚', label: 'Knowledge',  screen: 'screen-knowledge' },
    { id: 'profile',   icon: '👤', label: 'Profile',    screen: 'screen-profile' },
  ];

  let currentTab = 'dashboard';
  let currentParams = {};

  function buildNav() {
    const nav = document.getElementById('bottom-nav');
    if (!nav) return;

    nav.innerHTML = TABS.map((t) => `
      <button class="nav-tab${t.special ? ' nav-emergency' : ''}${t.id === currentTab ? ' active' : ''}" data-tab="${t.id}">
        <div class="nav-icon">${t.icon}</div>
        <div class="nav-label">${t.label}</div>
      </button>`).join('');

    nav.querySelectorAll('.nav-tab').forEach((btn) => {
      btn.addEventListener('click', () => go(btn.dataset.tab));
    });
  }

  function go(tabId, params = {}) {
    currentTab = tabId;
    currentParams = params;

    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));

    const tab = TABS.find((t) => t.id === tabId);
    if (tab) {
      const screen = document.getElementById(tab.screen);
      if (screen) screen.classList.add('active');
    }

    buildNav();
    renderScreen(tabId, params);

    window.scrollTo(0, 0);
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) activeScreen.scrollTop = 0;
  }

  function renderScreen(tabId, params) {
    switch (tabId) {
      case 'dashboard': Dashboard.render(); break;
      case 'recovery':  Recovery.render(params); break;
      case 'emergency': Emergency.render(); break;
      case 'knowledge': Knowledge.render(); break;
      case 'analytics': Analytics.render(); break;
      case 'profile':   Profile.render(); break;
    }
  }

  function showNav() {
    const nav = document.getElementById('bottom-nav');
    if (nav) nav.style.display = 'flex';
  }

  function hideNav() {
    const nav = document.getElementById('bottom-nav');
    if (nav) nav.style.display = 'none';
  }

  function getCurrentTab() { return currentTab; }
  function getCurrentParams() { return currentParams; }

  return { buildNav, go, showNav, hideNav, getCurrentTab };
})();

const Recovery = (() => {
  function render(params = {}) {
    const state = StateManager.get();
    const habits = (state.habits || []).filter((h) => h.active);
    const habit = params.habitId
      ? habits.find((h) => h.id === params.habitId)
      : habits[0];

    const el = document.getElementById('screen-recovery');
    if (!el) return;

    if (!habit) {
      el.innerHTML = `<div style="padding:60px 20px;text-align:center;">
        <div style="font-size:3rem;margin-bottom:16px;">🎯</div>
        <div class="t-heading">No habits tracked</div>
        <p class="t-body t-muted" style="margin-top:8px;">Complete onboarding to track your recovery.</p>
      </div>`;
      return;
    }

    const hrs = RecoveryEngine.hoursClean(habit.quitTime);
    const days = RecoveryEngine.daysClean(habit.quitTime);
    const phase = RecoveryEngine.recoveryPhase(hrs);
    const dStage = DopamineEngine.getStage(habit.type, hrs);
    const bodySystems = BodyEngine.getBodySystems(habit.type, hrs);
    const timeline = (typeof TIMELINES !== 'undefined' ? TIMELINES : {})[habit.type] || [];
    const integrity = RelapseEngine.getIntegrityScore(habit);

    el.innerHTML = `
    <div>
      <!-- Header -->
      <div style="padding:20px 20px 0;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
          <span style="font-size:1.8rem;">${habit.icon || '⭕'}</span>
          <div>
            <div class="t-heading">${habit.name} Recovery</div>
            <div class="t-caption">${days}d ${Math.floor(hrs % 24)}h clean</div>
          </div>
          <div style="margin-left:auto;text-align:right;">
            <div class="badge badge-orange">${phase.name}</div>
          </div>
        </div>
      </div>

      <!-- Dopamine Stage -->
      <div style="margin:0 20px 20px;">
        <div class="card" style="padding:16px;border-left:3px solid ${dStage.color};">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div class="t-label" style="color:${dStage.color};">DOPAMINE STAGE ${dStage.stageIdx + 1} / ${dStage.totalStages}</div>
            <div class="badge" style="background:rgba(255,255,255,0.08);color:${dStage.color};">${dStage.name}</div>
          </div>
          <p class="t-body t-muted" style="font-size:0.82rem;">${dStage.description}</p>
          <div style="margin-top:10px;">
            <div class="system-bar">
              <div class="system-bar-fill" style="width:${DopamineEngine.progressInStage(habit.type, hrs)}%;background:${dStage.color};"></div>
            </div>
          </div>
          <div style="margin-top:12px;">
            <div class="t-label t-dim" style="margin-bottom:6px;">CURRENT SYMPTOMS</div>
            ${dStage.symptoms.slice(0, 3).map((s) => `<div style="font-size:0.75rem;color:var(--text2);padding:2px 0;">· ${s}</div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Body Systems -->
      <div class="section-header">
        <span class="section-title">Body Systems</span>
      </div>
      <div class="recovery-wrap">
        <div class="body-systems">
          ${bodySystems.map((s) => `
          <div class="system-row">
            <div class="system-icon">${s.icon}</div>
            <div class="system-info">
              <div class="system-label">${s.label}</div>
              <div class="system-detail">${s.detail}</div>
              <div class="system-bar">
                <div class="system-bar-fill" style="width:${s.pct}%;background:${s.color};"></div>
              </div>
            </div>
            <div class="system-pct" style="color:${s.color};">${s.pct}%</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Recovery Timeline -->
      <div class="section-header">
        <span class="section-title">Recovery Timeline</span>
        <span class="section-action">${timeline.length} milestones</span>
      </div>
      <div class="recovery-wrap">
        <div class="milestone-list">
          ${timeline.map((m) => {
            const reached = hrs >= m.hours;
            const isNext = !reached && timeline.find((x) => !x.reached && x.hours > hrs) === m;
            const cls = reached ? 'reached' : (isNext ? 'next' : 'upcoming');
            const levelLabel = { scientific: '🟢', reported: '🟡', personal: '🔵' }[m.level] || '🟢';
            return `
            <div class="milestone-item">
              <div class="m-dot ${cls}">${reached ? '✓' : m.icon}</div>
              <div class="m-content">
                <div class="m-title" style="color:${reached ? 'var(--green)' : isNext ? 'var(--orange)' : 'var(--text2)'};">${m.title}</div>
                <div class="m-hours">${RecoveryEngine.formatDuration(m.hours)} ${levelLabel} ${m.system}</div>
                ${reached ? `<div class="m-body">${m.body}</div>` : isNext ? `<div class="m-body">${m.body}</div>` : ''}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Integrity Score -->
      ${integrity.relapses > 0 ? `
      <div style="margin:0 20px 20px;">
        <div class="card" style="padding:16px;">
          <div class="t-label t-dim" style="margin-bottom:8px;">RECOVERY INTEGRITY</div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <span class="t-body">Overall Score</span>
            <span style="font-size:1.2rem;font-weight:700;color:${integrity.score >= 70 ? 'var(--green)' : 'var(--gold)'};">${integrity.score}%</span>
          </div>
          <div class="system-bar">
            <div class="system-bar-fill" style="width:${integrity.score}%;background:${integrity.score >= 70 ? 'var(--green)' : 'var(--gold)'};"></div>
          </div>
          <div class="t-caption" style="margin-top:8px;">${integrity.cleanDays} clean of ${integrity.totalDays} total days · ${integrity.relapses} relapses</div>
        </div>
      </div>` : ''}

      <div style="height:20px;"></div>
    </div>`;
  }

  return { render };
})();
