/* US AI — lang-cards per-language article counts (think-166, ADD-only).
   Fills <span data-langcount="en">…</span> inside homepage .lang-card cards from
   data/live-counts.json (counts.lang). Silent refresh every 2 min, no page reload.
   No theme/layout change; does nothing if JSON lacks counts.lang. */
(function () {
  function fmt(n) {
    try { return n.toLocaleString("en-US") + " articles"; }
    catch (e) { return n + " articles"; }
  }
  function sync() {
    var els = document.querySelectorAll("[data-langcount]");
    if (!els.length) return;
    fetch("/data/live-counts.json?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.counts || !d.counts.lang) return;
        for (var i = 0; i < els.length; i++) {
          var k = els[i].getAttribute("data-langcount");
          var v = d.counts.lang[k];
          if (typeof v !== "number") continue;
          var txt = fmt(v);
          if (els[i].textContent !== txt) els[i].textContent = txt;
        }
      })
      .catch(function () {});
  }
  function start() {
    sync();
    setInterval(sync, 120000); // har 2 minute, khamoshi se
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
