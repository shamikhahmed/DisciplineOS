'use strict';
const CACHE = 'discipline-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/app.css',
  '/js/app.js',
  '/js/data/habits.js',
  '/js/data/timelines.js',
  '/js/data/insights.js',
  '/js/data/knowledge.js',
  '/js/engines/recoveryEngine.js',
  '/js/engines/bodyEngine.js',
  '/js/engines/dopamineEngine.js',
  '/js/engines/financeEngine.js',
  '/js/ui/charts.js',
  '/js/ui/navigation.js',
  '/js/modules/state.js',
  '/js/modules/onboarding.js',
  '/js/modules/dashboard.js',
  '/js/modules/recovery.js',
  '/js/modules/emergency.js',
  '/js/modules/knowledge.js',
  '/js/modules/profile.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
