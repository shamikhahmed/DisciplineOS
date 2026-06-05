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
