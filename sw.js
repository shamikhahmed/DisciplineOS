const CACHE_NAME = 'discipline-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/app.css',
  '/js/app.js',
  '/js/data/timelines.js',
  '/js/data/missions.js',
  '/js/data/knowledge.js',
  '/js/engines/recoveryEngine.js',
  '/js/engines/bodyEngine.js',
  '/js/engines/financeEngine.js',
  '/js/engines/dopamineEngine.js',
  '/js/engines/missionEngine.js',
  '/js/engines/relapseEngine.js',
  '/js/modules/stateManager.js',
  '/js/modules/onboarding.js',
  '/js/modules/dashboard.js',
  '/js/modules/emergency.js',
  '/js/modules/analytics.js',
  '/js/modules/knowledge.js',
  '/js/modules/profile.js',
  '/js/ui/navigation.js',
  '/js/ui/charts.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).catch(() => caches.match('/index.html'));
    })
  );
});
