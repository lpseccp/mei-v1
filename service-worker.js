const CACHE_NAME = 'mei-app-cache-v1';
const urlsToCache = [
  'index.html',
  'style.css',
  'manifest.json',
  'app.js',
  'offline.html',
  'receitas.html',
  'receitas.js',
  'despesas.html',
  'despesas.js',
  'pagamentos.html',
  'pagamentos.js',
  'relatorio.html',
  'relatorio.js',
  'documentos.html',
  'documentos.js',
  'declaracao.html',
  'declaracao.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(function(response) {
        return response || caches.match('offline.html');
      });
    })
  );
});