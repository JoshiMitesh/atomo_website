// sw.js - Enhanced Service Worker with proper activation
const CACHE_NAME = 'atomo-cache-v2.2';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/mainfavicon.ico',
    '/assets/atomoheaderlogo.png?v=1.1',
    '/assets/Atomo_link (1).png?v=1.1',
    '/mainindex.css?v=2.0',
    '/mainindex.js?v=2.0',
    '/offline.html'
];

// Skip waiting and claim clients immediately
self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                // Force the waiting service worker to become active
                return self.skipWaiting();
            })
    );
});

// Claim clients to control all open tabs
self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all open tabs
            return self.clients.claim();
        })
    );
});

// Fetch event with improved error handling
self.addEventListener('fetch', event => {
    // Skip non-GET requests and browser extensions
    if (event.request.method !== 'GET' || 
        event.request.url.startsWith('chrome-extension://')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    return response;
                }
                
                // Otherwise fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Add to cache
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(error => {
                        console.log('Fetch failed; returning offline page instead.', error);
                        
                        // If the request is for an HTML page, return offline page
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/offline.html');
                        }
                        
                        // For images, return a placeholder if available
                        if (event.request.destination === 'image') {
                            return caches.match('/assets/atomoheaderlogo.png?v=1.1')
                                .then(response => response || new Response(''));
                        }
                        
                        return new Response('Network error happened', {
                            status: 408,
                            headers: { 'Content-Type': 'text/plain' }
                        });
                    });
            })
    );
});