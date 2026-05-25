const CACHE_NAME="family-clock-top-voice-hard-fix-v9";
const CORE_FILES=[
  "./",
  "./index.html",
  "./patient.html",
  "./backoffice/",
  "./backoffice/index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/calm-background.svg",
  "./favicon.ico"
];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_FILES)).then(()=>self.skipWaiting()));
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  const url=new URL(req.url);

  // Do not cache API calls; they should fail gracefully in the app.
  if(url.hostname.includes("script.google") || url.hostname.includes("open-meteo") || url.hostname.includes("googleapis")){
    return;
  }

  if(req.method!=="GET")return;

  event.respondWith(
    caches.match(req).then(cached=>{
      if(cached)return cached;
      return fetch(req).then(res=>{
        const copy=res.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)).catch(()=>{});
        return res;
      }).catch(()=>caches.match("./index.html"));
    })
  );
});
