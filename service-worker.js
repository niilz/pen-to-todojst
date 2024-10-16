let cacheName = "pen-to-todoist-pwa-v1";
let contentToCache = [
  "/",
  "/index.html",
  "/babel/index.js",
  "/src/index.css",
  "/babel/App.js",
  "/src/App.css",
  "/babel/components/Video.js",
  "/src/components/Video.css",
  "/babel/components/Overlay.js",
  "/src/components/Overlay.css",
  "/babel/components/Spinner.js",
  "/src/components/Spinner.css",
  "/babel/utils.js",
  "/pkg/pen_to_todoist.js",
  "/pkg/pen_to_todoist_bg.wasm",
  "/secrets/hand-to-list-key.js",
  "/secrets/todoist-token.js",
  "/public/favicon.ico",
  "/public/android-chrome-192x192.png",
  "/public/android-chrome-512x512.png",
  "/public/favicon-16x16.png",
  "/public/favicon-32x32.png",
];

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener("fetch", (e) => {
  // Make sure that projects are not cached (because todoist-state might have changed)
  if (e.request.url === "https://api.todoist.com/rest/v2/projects") {
    e.respondWith(fetch(e.request));
  }
  e.respondWith(
    caches.match(e.request).then((r) => {
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      return (
        r ||
        fetch(e.request).then(async (response) => {
          if (e.request.method === "GET") {
            let cache = await caches.open(cacheName);
            console.log(
              `[Service Worker] Caching new resource: ${e.request.url}`
            );
            cache.put(e.request, response.clone());
          }
          return response;
        })
      );
    })
  );
});
