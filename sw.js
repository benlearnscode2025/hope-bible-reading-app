const CACHE_NAME = 'hope-toledo-bible-cache-v46';
const ASSETS_TO_CACHE = [
  'index.html',
  'style.css',
  'app.js',
  'firebase-config.js',
  'manifest.json',
  'topographic.svg',
  'assets/brand/_-05.svg',
  'assets/brand/__Primary-Coal.jpg',
  'sermons.json',
  'kjv.json',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js',
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Montserrat:ital,wght@0,400..900;1,400..900&family=Yellowtail&display=swap',
  'https://unpkg.com/@phosphor-icons/web@2.0.3/src/index.js'
];

// Install Event - Caching App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Cleaning old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Stale While Revalidate / Cache First for Offline Bible reading
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Bypass service worker caching on localhost for easier local development
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return;
  }
  // If fetching scripture text from bible-api.com, cache it aggressively so it works offline
  if (url.hostname === 'bible-api.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request.url).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse; // Cache Hit
          }
          // Fetch the URL string to bypass iOS/Safari WebKit header security bugs for cross-origin fetches
          return fetch(event.request.url).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request.url, networkResponse.clone());
            }
            return networkResponse;
          }).catch((err) => {
            console.error("Service worker fetch failed for bible-api.com", err);
            // Offline and no cache, returns a fallback error structure
            return new Response(JSON.stringify({
              error: "Offline",
              text: "You are currently offline. Please reconnect to read this chapter."
            }), {
              headers: { 'Content-Type': 'application/json' }
            });
          });
        });
      })
    );
    return;
  }
  // Default assets stale-while-revalidate (prevents cache trap for app updates)
  event.respondWith(
    caches.match(event.request.url).then((cachedResponse) => {
      const fetchPromise = fetch(event.request.url).then((networkResponse) => {
        if (networkResponse && (networkResponse.status === 200 || (networkResponse.status === 0 && event.request.url.includes('img.youtube.com')))) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if (event.request.url.startsWith(self.location.origin) || 
                event.request.url.includes('googleapis') || 
                event.request.url.includes('gstatic') || 
                event.request.url.includes('unpkg') ||
                event.request.url.includes('img.youtube.com')) {
              cache.put(event.request.url, responseClone);
            }
          });
        }
        return networkResponse;
      });

      if (cachedResponse) {
        // Update cache in the background, extend event lifetime
        event.waitUntil(fetchPromise.catch(() => {}));
        return cachedResponse;
      }

      return fetchPromise.catch((err) => {
        if (event.request.mode === 'navigate') {
          return caches.match('index.html');
        }
        throw err;
      });
    })
  );
});
