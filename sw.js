/* 微出国·学 · BC 驾照（ICBC） · 离线缓存。版本＝内容哈希，新发布自动汰旧。 */
const CACHE_PREFIX = 'vv-driver-';
const VERSION = CACHE_PREFIX + 'b0be91b73f0a';
const PRECACHE = ["./assets/app.js", "./assets/decks/fail-points.json", "./assets/decks/glp-system.json", "./assets/decks/knowledge-alcohol-penalties.json", "./assets/decks/knowledge-rules.json", "./assets/decks/knowledge-signs.json", "./assets/decks/knowledge-speed-parking.json", "./assets/decks/newcomer-exchange.json", "./assets/decks/road-test-class5.json", "./assets/decks/road-test-class7.json", "./assets/decks.json", "./assets/fsrs.mjs", "./assets/learning-data.mjs", "./assets/manifest.json", "./assets/questions.json", "./assets/search-index.json", "./assets/slides.js", "./assets/style.css", "./docs/fail-points.html", "./docs/glp-system.html", "./docs/index.html", "./docs/knowledge-alcohol-penalties.html", "./docs/knowledge-rules.html", "./docs/knowledge-signs.html", "./docs/knowledge-speed-parking.html", "./docs/newcomer-exchange.html", "./docs/road-test-class5.html", "./docs/road-test-class7.html", "./drill.html", "./exam.html", "./index.html", "./progress.html", "./slides.html", "./assets/img/5ce9b9bea073.webp", "./assets/img/a9d2c954b987.webp", "./assets/img/d5a531bb9a1c.webp", "./manifest.webmanifest"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then(async (c) => {
    for (const u of PRECACHE) { try { await c.add(new Request(u, {cache: 'reload'})); } catch (_) {} }
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith(CACHE_PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(fetch(req).then((r) => { const cp = r.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then((r) => r || caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => {
      const cp = res.clone(); caches.open(VERSION).then((c) => c.put(req, cp)); return res; })));
  }
});
