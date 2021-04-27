const CACHE_NAME = 'static-cache-v2'
const DATA_CACHE_NAME = 'data-cache-v1'
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.webmanifest',
  '/index.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache')
      return cache.addAll(FILES_TO_CACHE)
    })
  )

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache')
      return cache.add("/api/transaction")
    })
  )

  self.skipWaiting();
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})
