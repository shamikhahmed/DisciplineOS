'use strict';
const App = (() => {
  function init() {
    if (State.get('onboardingComplete')) {
      launch();
    } else {
      Onboarding.render();
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
      });
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && State.get('onboardingComplete')) {
        const tab = sessionStorage.getItem('dos_tab') || 'dashboard';
        if (tab === 'dashboard' && window.Dashboard) Dashboard.render();
      }
    });
  }

  function launch() {
    document.getElementById('nav').style.display = '';
    document.getElementById('screen-onboarding').classList.remove('active');
    Navigation.init();
    if (window.Notifications) Notifications.init();
  }

  function showToast(msg, type) {
    type = type || 'info';
    const wrap = document.getElementById('toast-wrap');
    if (!wrap) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    wrap.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  document.addEventListener('DOMContentLoaded', init);

  return { launch, showToast };
})();
window.App = App;
