// Service worker da Trilha v3.5: guarda o jogo e a arte para funcionar sem internet.
const CACHE='mdc-trilha-v3.5-17bbc0d9';
const SHELL=["./","index.html","manifest.webmanifest","arte/bia-cheer.webp","arte/bia-full.webp","arte/bia-idle.webp","arte/bia-lat.webp","arte/bia-pose.webp","arte/bia-v34.webp","arte/bia-wow.webp","arte/caio-cheer.webp","arte/caio-full.webp","arte/caio-idle.webp","arte/caio-lat.webp","arte/caio-pose.webp","arte/caio-think.webp","arte/caio-v34.webp","arte/leticia-cheer.webp","arte/leticia-full.webp","arte/leticia-idle.webp","arte/leticia-lat.webp","arte/leticia-pose.webp","arte/leticia-think.webp","arte/leticia-v34.webp","arte/logo-main.webp","arte/mel-cheer.webp","arte/mel-full.webp","arte/mel-idle.webp","arte/mel-lat.webp","arte/mel-pose.webp","arte/mel-think.webp","arte/mel-v34.webp","arte/natty-cheer.webp","arte/natty-idle.webp","arte/natty-think.webp","arte/rodrigo-cheer.webp","arte/rodrigo-idle.webp","arte/rodrigo-think.webp","arte/tiko-alegre.webp","arte/tiko-cheer.webp","arte/tiko-full.webp","arte/tiko-idle.webp","arte/tiko-lupa.webp","arte/tiko-think.webp","arte/tiko-wow.webp","arte/vinicius-cheer.webp","arte/vinicius-full.webp","arte/vinicius-idle.webp","arte/vinicius-lat.webp","arte/vinicius-pose.webp","arte/vinicius-think.webp","arte/vinicius-v34.webp","arte/vinicius-wow.webp","arte/icons/apple-touch-icon.png","arte/icons/favicon-32.png","arte/icons/icon-192.png","arte/icons/icon-512.png","arte/icons/icon-maskable-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  // Página: tenta a rede primeiro para pegar versões novas; sem internet, usa a guardada
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put('index.html',c));return res}).catch(()=>caches.match('index.html')));return}
  // Arte, ícones e fontes: usa a guardada; se não tiver, busca e guarda
  if(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)){
    e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c))}return res})));
  }
});
