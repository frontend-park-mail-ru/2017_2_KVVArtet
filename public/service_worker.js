// const CACHE_NAME = 'serviceworker_v_1';
//
// const cacheUrls = [
//     "/dist/bundle.js",
//     "/dist/bundle.css"
// ];
//
// self.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => {
//                 return cache.addAll(cacheUrls);
//             })
//     );
// });
//
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request).then(function (cachedResponse) {
//
//             if (cachedResponse) {
//                 return cachedResponse;
//             }
//
//             return fetch(event.request);
//         })
//     );
// });
//
// self.addEventListener('activate', function(event) {
//     let cacheWhitelist = [CACHE_NAME];
//
//     event.waitUntil(
//         caches.keys().then(function(keyList) {
//             return Promise.all(keyList.map(function(key) {
//                 if (cacheWhitelist.indexOf(key) === -1) {
//                     return caches.delete(key);
//                 }
//             }));
//         })
//     );
// });