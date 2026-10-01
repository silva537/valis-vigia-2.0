const CACHE="valis-vigia-2.0.0";
const CORE=["./","./index.html","./css/app.css","./css/app-enhancements.css","./js/legacy-app.js","./js/firebase-service.js","./js/security.js","./js/gps.js","./js/notifications.js","./js/automation.js","./js/ai.js","./js/enhancements.js","./config/valis-config.js","./manifest.json"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).catch(()=>{})).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r;
  }).catch(()=>cached)));
});
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{for(const c of cs) if("focus" in c)return c.focus(); if(clients.openWindow)return clients.openWindow("./");}))});
self.addEventListener("push",e=>{
  let d={title:"VALIS VIGIA",body:"Novo alerta do sistema."};
  try{d=Object.assign(d,e.data?e.data.json():{});}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title,{body:d.body,tag:d.tag||"valis"}));
});