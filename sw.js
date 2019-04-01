---
layout: null
---

var urlsToCache = [
  '/',
  '/assets/styles/app.css',
  '{{site.static_files | map: "path" | join: "', '"}}',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
  'https://fonts.gstatic.com/s/roboto/v19/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
  'https://fonts.gstatic.com/s/roboto/v19/KFOmCnqEu92Fr1Mu4mxK.woff2',
  'https://fonts.gstatic.com/s/roboto/v19/KFOlCnqEu92Fr1MmSU5fBBc4.woff2',
];

var CACHE_NAME = 'xeed-cache-v{{site.time | date: '%s%N'}}';

self.addEventListener('install', event => {
  caches.keys().then(keys => {
    if (!keys || keys.length === 0) {
      return
    }
    console.debug('deleting sw cache', keys)
    keys.forEach(key => {
      caches.delete(key)
    })
  })
  console.debug('creating sw cache', CACHE_NAME);
  event.waitUntil(caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(urlsToCache);
    }).catch(err => {
      console.debug('err', err, event)
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request)
          .then(response => {
            // Adding other stuff in cache
            // const responseClone = response.clone();
            // cache.put(event.request, responseClone);
          })
      })
    }).catch(err => {
      console.debug('offline content not in cache', err)
      return caches.match('/404.html')
    })
  )
});