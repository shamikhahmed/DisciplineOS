'use strict';
const Navigation = (() => {
  const TABS = [
    { id: 'dashboard', label: 'Home', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>` },
    { id: 'recovery', label: 'Recovery', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>` },
    { id: 'emergency', label: 'SOS', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`, sos: true },
    { id: 'knowledge', label: 'Learn', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>` },
    { id: 'profile', label: 'You', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
  ];

  let current = 'dashboard';
  let params = {};

  function renderNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    nav.innerHTML = TABS.map(t => `
      <button class="nav-tab${t.id === current ? ' active' : ''}${t.sos ? ' nav-sos' : ''}" data-tab="${t.id}" onclick="Navigation.go('${t.id}')">
        <span class="nav-icon">${t.icon}</span>
        <span class="nav-label">${t.label}</span>
      </button>
    `).join('');
  }

  function go(screenId, p) {
    params = p || {};
    current = screenId;

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById('screen-' + screenId);
    if (screen) {
      screen.classList.add('active');
      screen.scrollTop = 0;
    }

    renderNav();

    if (screenId === 'emergency') {
      if (window.Emergency) Emergency.render();
    } else if (screenId === 'dashboard') {
      if (window.Dashboard) Dashboard.render();
    } else if (screenId === 'recovery') {
      if (window.Recovery) Recovery.render(params.habitId);
    } else if (screenId === 'knowledge') {
      if (window.Knowledge) Knowledge.render();
    } else if (screenId === 'profile') {
      if (window.Profile) Profile.render();
    }

    if (screenId !== 'onboarding') {
      sessionStorage.setItem('dos_tab', screenId);
    }
  }

  function init() {
    const last = sessionStorage.getItem('dos_tab') || 'dashboard';
    renderNav();
    go(last);
  }

  return { go, init, renderNav, getParams: () => params };
})();
window.Navigation = Navigation;
