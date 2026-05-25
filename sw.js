const CACHE_NAME="family-clock-v16-pwa-audio-router-fix";

// Keep this list intentionally small and ASCII-safe.
// Missing optional files must not block the PWA installation.
const CORE_FILES=[
  "./",
  "./index.html",
  "./patient.html",
  "./boindex.html",
  "./manifest.json",
  "./favicon.ico",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/calm-background.svg"
];

const OPTIONAL_FILES=[
  "./backoffice/",
  "./backoffice/index.html",
  "./README.md"
];

async function safeCacheAll(cache, files){
  await Promise.all(files.map(file =>
    cache.add(file).catch(err => console.warn("cache skip", file, err))
  ));
}

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => safeCacheAll(cache, CORE_FILES.concat(OPTIONAL_FILES)))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;

  const url=new URL(req.url);

  // Do not cache live APIs.
  if(
    url.hostname.includes("script.google") ||
    url.hostname.includes("googleusercontent") ||
    url.hostname.includes("open-meteo") ||
    url.hostname.includes("googleapis") ||
    url.hostname.includes("youtube") ||
    url.hostname.includes("youtu.be") ||
    url.hostname.includes("doubleclick")
  ){
    return;
  }

  event.respondWith(
    caches.match(req).then(cached=>{
      if(cached)return cached;
      return fetch(req).then(res=>{
        const copy=res.clone();
        caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)).catch(()=>{});
        return res;
      }).catch(async()=>{
        if(req.mode==="navigate"){
          return (await caches.match("./index.html")) || Response.error();
        }
        return Response.error();
      });
    })
  );
});

/* PWA_AUDIO_ROUTER_FIX_V16_SW */
