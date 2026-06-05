const App = (() => {
  let toastTimeout = null;

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-8px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function launch() {
    const initScreen = document.getElementById('init-screen');
    document.getElementById('bottom-nav').style.display = 'flex';
    document.getElementById('screen-onboarding').classList.remove('active');

    if (initScreen) {
      initScreen.classList.add('fade-out');
      setTimeout(() => initScreen.remove(), 500);
    }

    Navigation.buildNav();
    Navigation.go('dashboard');
  }

  function init() {
    const state = StateManager.get();

    if (state.onboardingComplete) {
      launch();
    } else {
      document.getElementById('bottom-nav').style.display = 'none';
      document.getElementById('screen-onboarding').classList.add('active');
      Onboarding.init();
    }

    registerServiceWorker();
    setupBackButton();
    setupModalOverlay();

    const initScreen = document.getElementById('init-screen');
    if (initScreen) {
      setTimeout(() => {
        initScreen.classList.add('fade-out');
        setTimeout(() => initScreen.remove(), 500);
      }, state.onboardingComplete ? 800 : 1200);
    }
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }

  function setupBackButton() {
    window.addEventListener('popstate', () => {
      const current = Navigation.getCurrentTab();
      if (current !== 'dashboard') Navigation.go('dashboard');
    });
  }

  function setupModalOverlay() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    }
  }

  return { init, launch, showToast };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
