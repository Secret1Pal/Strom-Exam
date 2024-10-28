const CACHE_NAME = 'image-cache-v1';
const IMAGES_TO_CACHE = [
    // Add paths to other images you want to cache initially
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(IMAGES_TO_CACHE);
        }).catch(function(error) {
            console.error('Failed to cache during install:', error);
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                if (response) {
                    return response;
                }
                const networkFetch = fetch(event.request).then(function(networkResponse) {
                    return caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }).catch(function(error) {
                    console.error('Failed to fetch image from network:', error);
                });

                return networkFetch;
            }).catch(function(error) {
                console.error('Failed to match request in cache:', error);
            })
        );
    }
});

self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).catch(function(error) {
            console.error('Failed to clean up old caches:', error);
        })
    );
});
