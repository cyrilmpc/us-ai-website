/* US AI service worker — offline cache for core pages */
var CACHE = "sawalai-v20261010i";
var CORE = ["/index.html", "/tools.html", "/style.css", "/ui.js", "/favicon.png"];
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  var url = e.request.url;
  /* JS/CSS: network-first (always fresh tools), fallback to cache offline */
  if(url.match(/\.(js|css)(\?|$)/)){
    e.respondWith(
      fetch(e.request).then(function(resp){
        var copy = resp.clone();
        caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        return resp;
      }).catch(function(){ return caches.match(e.request); })
    );
    return;
  }
  /* rest: cache-first */
  e.respondWith(
    caches.match(e.request).then(function(r){ return r || fetch(e.request); })
  );
});
