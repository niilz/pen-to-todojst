/* eslint-disable no-restricted-globals */

let unused = self.__WB_MANIFEST;
//self.importScripts("./utils");

let cacheName = "pen-to-todoist-pwa-v1";
let contentToCache = [
  "src/utils.js",
  "src/App.js",
  "src/App.css",
  "src/index.js",
  "src/index.css",
  "src/components/Video.js",
  "src/components/Video.css",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(caches).then((cache) => {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      return (
        r ||
        fetch(e.request).then(async (response) => {
          let cache = await caches.open(cacheName);
          console.log(
            `[Service Worker] Caching new resource: ${e.request.url}`
          );
          cache.put(e.request, response.clone());
          return resposne;
        })
      );
    })
  );
});
