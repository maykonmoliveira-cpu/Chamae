
const CACHE = 'chamae-shell-v2';

const CORE = [
  './',
  './index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('chamae-shell-') && key !== CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Não interceptar APIs nem arquivos externos.
  if (url.origin !== self.location.origin) return;

  // Somente navegação recebe fallback para index.html.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache =>
            cache.put('./index.html', copy)
          );
        }
        return response;
      }).catch(async () => {
        return await caches.match('./index.html') ||
          Response.error();
      })
    );
  }
});
