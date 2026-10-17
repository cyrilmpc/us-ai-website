/* US AI Live Gold Rate widget (Rs/tola). CoinGecko PAXG free keyless API, 5-min refresh,
   flash on change, tab-visibility respect, localStorage cache. 1 oz = 2.6666667 tola; $1 = Rs 280. */
(function () {
  "use strict";
  var priceEl = document.getElementById("gold-price");
  var chgEl = document.getElementById("gold-chg");
  var noteEl = document.getElementById("gold-note");
  var miniEl = document.getElementById("gold-mini");
  if (!priceEl) return;

  var API_PAXG = "https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd&include_24hr_change=true";
  var API_XAUT = "https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd&include_24hr_change=true";
  var LS_KEY = "usai_gold_tola";
  var OZ_TO_TOLA = 2.6666667;
  var USD_PKR = 280;
  var INTERVAL = 300000;
  var prev = 0;

  function fmtFull(n) {
    if (!isFinite(n)) return "Rs \u2014";
    return "Rs " + Math.round(n).toLocaleString("en-US") + "/tola";
  }
  function fmtMini(n) {
    if (!isFinite(n)) return "\uD83E\uDE99 Rs \u2014";
    var k = n / 1000;
    return "\uD83E\uDE99 Rs " + (k >= 100 ? Math.round(k) : k.toFixed(1)) + "K";
  }

  function flash(dir) {
    priceEl.classList.remove("gold-up", "gold-down");
    void priceEl.offsetWidth;
    if (dir > 0) priceEl.classList.add("gold-up");
    else if (dir < 0) priceEl.classList.add("gold-down");
  }

  function render(usd, chg) {
    var tola = isFinite(usd) ? (usd / OZ_TO_TOLA) * USD_PKR : NaN;
    var dir = 0;
    if (isFinite(tola) && isFinite(prev) && prev > 0) {
      dir = tola > prev ? 1 : (tola < prev ? -1 : 0);
    }
    if (isFinite(tola)) prev = tola;
    priceEl.textContent = fmtFull(tola);
    flash(dir);
    if (miniEl) miniEl.textContent = fmtMini(tola);
    if (chgEl) {
      if (isFinite(chg)) {
        chgEl.textContent = "24h " + (chg >= 0 ? "+" : "") + chg.toFixed(2) + "%";
        chgEl.className = "gold-chg " + (chg >= 0 ? "gold-up-t" : "gold-down-t");
      } else {
        chgEl.textContent = "";
      }
    }
    if (noteEl) noteEl.textContent = "24K spot-derived";
    if (isFinite(tola)) {
      try { localStorage.setItem(LS_KEY, JSON.stringify({ tola: tola, chg: chg, at: Date.now() })); } catch (e) {}
    }
  }

  function renderError() {
    if (noteEl) noteEl.textContent = "retrying\u2026";
  }

  function pick(data, key) {
    var o = data && data[key];
    if (!o || !isFinite(o.usd)) return null;
    return { usd: o.usd, chg: o.usd_24h_change };
  }

  function fetchGold(url, idKey, onFail) {
    var ctrl = null, timer = 0;
    try {
      ctrl = new AbortController();
      timer = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 12000);
    } catch (e) {}
    fetch(url, ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function (d) {
        var got = pick(d, idKey);
        if (got) render(got.usd, got.chg);
        else throw new Error("no price");
      })
      .catch(function () { if (onFail) onFail(); else renderError(); })
      .then(function () { if (timer) clearTimeout(timer); });
  }

  /* mobile-perf 2026-10-12 (additive): skip ticks while widget row is off-screen — resumes on scroll-back */
  var wrapVisible = true;
  (function () {
    var wrap = document.getElementById("top-widgets") || document.body;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { wrapVisible = e[0].isIntersecting; }, { rootMargin: "100px 0px" }).observe(wrap);
    }
  })();

  function load() {
    if (document.hidden || !wrapVisible) return;
    fetchGold(API_PAXG, "pax-gold", function () {
      fetchGold(API_XAUT, "tether-gold", function () { renderError(); });
    });
  }

  try {
    var cached = JSON.parse(localStorage.getItem(LS_KEY) || "null");
    if (cached && isFinite(cached.tola)) {
      prev = 0;
      render((cached.tola / USD_PKR) * OZ_TO_TOLA, cached.chg);
    }
  } catch (e) {}

  load();
  setInterval(load, INTERVAL);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) load(); });
})();
