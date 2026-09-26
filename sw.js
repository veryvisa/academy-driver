/* 微出国·学 · BC 驾照（ICBC） · 离线缓存。版本＝内容哈希，新发布自动汰旧。 */
const CACHE_PREFIX = 'vv-driver-';
const VERSION = CACHE_PREFIX + '256ac0a9dcf7';
const PRECACHE = ["./assets/app.js", "./assets/cards/alc-glp-zero.png", "./assets/cards/alc-glp-zero.t.jpg", "./assets/cards/alc-irp.png", "./assets/cards/alc-irp.t.jpg", "./assets/cards/drv-changes.png", "./assets/cards/drv-changes.t.jpg", "./assets/cards/drv-paths.png", "./assets/cards/drv-paths.t.jpg", "./assets/cards/exch-90days.png", "./assets/cards/exch-90days.t.jpg", "./assets/cards/exch-china.png", "./assets/cards/exch-china.t.jpg", "./assets/cards/fail-checklist.png", "./assets/cards/fail-checklist.t.jpg", "./assets/cards/fail-school-zone.png", "./assets/cards/fail-school-zone.t.jpg", "./assets/cards/glp-fees.png", "./assets/cards/glp-fees.t.jpg", "./assets/cards/glp-record.png", "./assets/cards/glp-record.t.jpg", "./assets/cards/park-distances.png", "./assets/cards/park-distances.t.jpg", "./assets/cards/rt5-myths.png", "./assets/cards/rt5-myths.t.jpg", "./assets/cards/rt5-transition.png", "./assets/cards/rt5-transition.t.jpg", "./assets/cards/rt7-maneuvers.png", "./assets/cards/rt7-maneuvers.t.jpg", "./assets/cards/rt7-vehicle-reject.png", "./assets/cards/rt7-vehicle-reject.t.jpg", "./assets/cards/rules-rightofway.png", "./assets/cards/rules-rightofway.t.jpg", "./assets/cards/rules-yield-others.png", "./assets/cards/rules-yield-others.t.jpg", "./assets/cards/signs-color-duty.png", "./assets/cards/signs-color-duty.t.jpg", "./assets/cards/signs-flashing-green.png", "./assets/cards/signs-flashing-green.t.jpg", "./assets/cards/speed-defaults.png", "./assets/cards/speed-defaults.t.jpg", "./assets/cards.js", "./assets/cover/home.jpg", "./assets/decks/fail-points.json", "./assets/decks/glp-system.json", "./assets/decks/knowledge-alcohol-penalties.json", "./assets/decks/knowledge-rules.json", "./assets/decks/knowledge-signs.json", "./assets/decks/knowledge-speed-parking.json", "./assets/decks/newcomer-exchange.json", "./assets/decks/road-test-class5.json", "./assets/decks/road-test-class7.json", "./assets/decks.json", "./assets/fsrs.mjs", "./assets/learning-data.mjs", "./assets/manifest.json", "./assets/questions.json", "./assets/search-index.json", "./assets/slides.js", "./assets/style.css", "./cards/alc-glp-zero.html", "./cards/alc-irp.html", "./cards/drv-changes.html", "./cards/drv-paths.html", "./cards/exch-90days.html", "./cards/exch-china.html", "./cards/fail-checklist.html", "./cards/fail-school-zone.html", "./cards/glp-fees.html", "./cards/glp-record.html", "./cards/index.html", "./cards/park-distances.html", "./cards/rt5-myths.html", "./cards/rt5-transition.html", "./cards/rt7-maneuvers.html", "./cards/rt7-vehicle-reject.html", "./cards/rules-rightofway.html", "./cards/rules-yield-others.html", "./cards/signs-color-duty.html", "./cards/signs-flashing-green.html", "./cards/speed-defaults.html", "./docs/fail-points.html", "./docs/glp-system.html", "./docs/index.html", "./docs/knowledge-alcohol-penalties.html", "./docs/knowledge-rules.html", "./docs/knowledge-signs.html", "./docs/knowledge-speed-parking.html", "./docs/newcomer-exchange.html", "./docs/road-test-class5.html", "./docs/road-test-class7.html", "./drill.html", "./exam.html", "./index.html", "./progress.html", "./slides.html", "./vf/framework.css", "./vf/framework.js", "./workspace/index.html", "./assets/img/25cd9ab96137.webp", "./assets/img/39b541f52903.webp", "./assets/img/52564820e268.webp", "./assets/img/5ce9b9bea073.webp", "./assets/img/a9d2c954b987.webp", "./assets/img/d5a531bb9a1c.webp", "./assets/img/d6987a816a5d.webp", "./assets/img/ec911ba184ca.webp", "./manifest.webmanifest"];
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
