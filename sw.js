let assets = [
  "https://cdn.glitch.com/a1587639-fd68-4bb7-a8ac-08ca51112bed%2Fmstile-150x150.png?1548953441255",
  "https://cdn.glitch.com/a1587639-fd68-4bb7-a8ac-08ca51112bed%2Ffavicon.ico?1548953452674",
  "https://cdn.glitch.com/a1587639-fd68-4bb7-a8ac-08ca51112bed%2Fandroid-chrome-512x512.png?1548953480872",
  "https://cdn.glitch.com/a1587639-fd68-4bb7-a8ac-08ca51112bed%2Fapple-touch-icon.png?1548953486326",
  "https://cdn.glitch.com/a1587639-fd68-4bb7-a8ac-08ca51112bed%2Ffavicon-16x16.png?1548953497211",
  "https://cdn.glitch.com/a1587639-fd68-4bb7-a8ac-08ca51112bed%2Ffavicon-32x32.png?1548953504546",
  "https://cdn.glitch.com/a1587639-fd68-4bb7-a8ac-08ca51112bed%2Fandroid-chrome-192x192.png?1548953531069",
  "https://cdn.glitch.com/a1587639-fd68-4bb7-a8ac-08ca51112bed%2Foffline.jpeg?1548977019123",
  "/style.css",
  "/index.html",
  "/offline.html",
  "/"
];

let cache_name = "wildcatter";


self.addEventListener("install", (e) => {
  console.log("installing...");
  e.waitUntil(
    caches.open(cache_name).then((cache) => {
      return cache.addAll(assets);
    }).catch(err => console.log(err))
  );
});

self.addEventListener("fetch", (event) => {
  console.log("You asked for", event.request.url);
  if (event.request.url === "https://pwanimals.glitch.me/") {
    event.respondWith(
      fetch(event.request).catch(err => errorPage())
      // caches.match(event.request).then(response => response || fetch(event.request))
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(err => caches.match(event.request).then(response => response || fetch(event.request)))
      // c
    );
  }
  
  
});

function fromCache(request) {
  return self.caches.open(cache_name).then(cache => cache.match(request));
}

function errorPage() {
  return fromCache("/offline.html");
}
