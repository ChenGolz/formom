const CACHE_NAME="family-clock-v24-performance-accessibility-patch";
const AUDIO_CACHE_NAME="family-clock-drive-audio-runtime-v1";

const CORE_FILES=[
  "./",
  "./index.html",
  "./patient.html",
  "./boindex.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./assets/calm-background.svg",
  "./favicon.ico"
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache=>Promise.all(CORE_FILES.map(file=>cache.add(file).catch(err=>console.warn("cache skip",file,err)))))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>![CACHE_NAME,AUDIO_CACHE_NAME].includes(k)).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

function isDriveAudioDownload(url){
  return url.hostname==="drive.google.com" && url.pathname.includes("/uc") && url.search.includes("export=download");
}
function isLiveApiOrEmbeddedMedia(url){
  return (
    url.hostname.includes("script.google") ||
    url.hostname.includes("script.googleusercontent") ||
    url.hostname.includes("open-meteo") ||
    url.hostname.includes("googleapis") ||
    url.hostname.includes("youtube") ||
    url.hostname.includes("youtu.be") ||
    url.hostname.includes("doubleclick")
  );
}

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);

  if(isDriveAudioDownload(url)){
    event.respondWith(
      caches.open(AUDIO_CACHE_NAME).then(cache=>
        cache.match(req).then(cached=>{
          const network=fetch(req).then(res=>{
            cache.put(req,res.clone()).catch(()=>{});
            return res;
          }).catch(()=>cached);
          return cached || network;
        })
      )
    );
    return;
  }

  if(isLiveApiOrEmbeddedMedia(url))return;

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

/* V24_PERFORMANCE_ACCESSIBILITY_PATCH_SW */
