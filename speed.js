/* US AI mini speed test: auto-starts, downloads a 3MB file from this site, shows a live progress bar + Mbps. */
(function () {
  "use strict";
  var fill = document.getElementById("spd-fill");
  var status = document.getElementById("spd-status");
  var retest = document.getElementById("spd-retest");
  var num = document.getElementById("spd-num");
  var unit = document.getElementById("spd-unit");
  var needle = document.getElementById("spd-needle");
  var arc = document.getElementById("spd-arc");
  if (!fill || !status) return;
  var SIZE = 3 * 1024 * 1024, running = false;

  /* mini speedometer: needle + arc follow the speed (0-100 scale) */
  function gauge(mbps) {
    var frac = Math.sqrt(Math.min(Math.max(mbps, 0), 100) / 100);
    var ang = -90 + frac * 180;
    if (needle) needle.setAttribute("transform", "rotate(" + ang.toFixed(1) + " 50 52)");
    if (arc) arc.setAttribute("stroke-dashoffset", (126 * (1 - frac)).toFixed(1));
  }

  function fmt(mbps) {
    if (mbps >= 100) return [mbps.toFixed(0), "Mbps"];
    if (mbps >= 10) return [mbps.toFixed(1), "Mbps"];
    if (mbps >= 1) return [mbps.toFixed(2), "Mbps"];
    return [(mbps * 1000).toFixed(0), "Kbps"];
  }
  function grade(mbps) {
    if (mbps >= 50) return "🚀 Excellent";
    if (mbps >= 25) return "⚡ Fast";
    if (mbps >= 10) return "👍 Good";
    if (mbps >= 3) return "🐢 Slow";
    return "🐌 Very slow";
  }
  function fitHint(mbps) {
    if (mbps >= 50) return "\u00B7 great for 4K streaming & big downloads";
    if (mbps >= 25) return "\u00B7 great for HD video & video calls";
    if (mbps >= 10) return "\u00B7 OK for HD video, fine for browsing";
    if (mbps >= 3) return "\u00B7 fine for browsing & music, not HD video";
    return "\u00B7 browsing may lag \u2014 try switching network";
  }

  function run() {
    if (running) return;
    running = true;
    hasRun = true;
    if (obs) { obs.disconnect(); obs = null; }
    if (retest) retest.hidden = true;
    fill.style.width = "0%";
    fill.setAttribute("aria-valuenow", "0");
    status.textContent = "Downloading test file…";
    gauge(0);
    var url = "speedtest-3mb.bin?r=" + Math.random().toString(36).slice(2);
    var start = performance.now(), loaded = 0, lastUi = 0;
    function liveUi() {
      var t = performance.now();
      if (t - lastUi < 250 || !num) return;
      lastUi = t;
      var secs = (t - start) / 1000;
      if (secs < 0.2) return;
      var mbpsNow = (loaded * 8) / (secs * 1e6);
      var f = fmt(mbpsNow);
      num.textContent = f[0];
      if (unit) unit.textContent = f[1];
      var mini = document.getElementById("spd-mini");
      if (mini) mini.textContent = "· " + f[0] + " " + f[1];
      gauge(mbpsNow);
    }
    fetch(url, { cache: "no-store" }).then(function (resp) {
      if (!resp.ok || !resp.body) throw new Error("no body");
      var reader = resp.body.getReader();
      function pump() {
        return reader.read().then(function (r) {
          if (r.done) return finish();
          loaded += r.value.byteLength;
          var pct = Math.min(100, (loaded / SIZE) * 100);
          fill.style.width = pct.toFixed(1) + "%";
          fill.setAttribute("aria-valuenow", String(Math.round(pct)));
          liveUi();
          return pump();
        });
      }
      return pump();
    }).catch(function () {
      running = false;
      status.textContent = "⚠️ Test failed — check connection · tap ↻ to try again";
      if (retest) retest.hidden = false;
    });

    function finish() {
      var secs = (performance.now() - start) / 1000;
      var mbps = secs > 0 ? (loaded * 8) / (secs * 1e6) : 0;
      var f = fmt(mbps);
      fill.style.width = "100%";
      fill.setAttribute("aria-valuenow", "100");
      if (num) num.textContent = f[0];
      if (unit) unit.textContent = f[1];
      var mini2 = document.getElementById("spd-mini");
      if (mini2) mini2.textContent = "· " + f[0] + " " + f[1];
      gauge(mbps);
      status.innerHTML = "<b>" + f[0] + " " + f[1] + "</b> ↓ download &nbsp;" + grade(mbps) + " <span class='spd-fit'>" + fitHint(mbps) + "</span>";
      running = false;
      if (retest) retest.hidden = false;
    }
  }

  if (retest) retest.addEventListener("click", run);
  /* PThink4 P2 2026-10-11: auto 3MB download band — user click par test (page load tez) */
  /* think-027 2026-10-11: visibility gate — collapsed widget par auto-run nahi (mobile data bachat) */
  var started = false, hasRun = false, obs = null;
  function isExpanded() {
    var card = fill.closest ? fill.closest(".tw-card") : null;
    if (!card) return true; /* fail-open: purana behavior */
    if (card.classList.contains("tw-open")) return true;
    var tw = document.getElementById("top-widgets");
    if (tw && tw.classList.contains("tw-compact")) return false; /* desktop scroll: collapsed */
    return !window.matchMedia("(max-width: 768px)").matches; /* mobile: collapsed unless tw-open */
  }
  function maybeAuto() {
    if (hasRun || running) return;
    if (isExpanded()) run();
  }
  function watchExpand() {
    if (!("MutationObserver" in window)) return;
    obs = new MutationObserver(function () { maybeAuto(); });
    var card = fill.closest ? fill.closest(".tw-card") : null;
    var tw = document.getElementById("top-widgets");
    if (card) obs.observe(card, { attributes: true, attributeFilter: ["class"] });
    if (tw && tw !== card) obs.observe(tw, { attributes: true, attributeFilter: ["class"] });
  }
  function autostart() {
    if (started) return;
    started = true;
    /* P3: collapsed mini hint — khaali slot mein wording */
    var mini0 = document.getElementById("spd-mini");
    if (mini0 && !isExpanded() && !mini0.textContent) mini0.textContent = "\u00b7 tap to test";
    watchExpand();
    /* sirf tab auto-run jab widget expanded/visible ho aur page 10s+ idle rahe */
    if ("requestIdleCallback" in window) {
      requestIdleCallback(function () { setTimeout(maybeAuto, 10000); }, { timeout: 30000 });
    }
  }
  if (document.readyState === "complete") autostart();
  else window.addEventListener("load", autostart);
})();
