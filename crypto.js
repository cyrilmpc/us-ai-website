/* US AI Live Crypto Prices widget. Free keyless Kraken public REST, 60s refresh, flash on change, tab-visibility respect, localStorage cache. */
(function () {
  "use strict";
  var btcEl = document.getElementById("cr-btc");
  var ethEl = document.getElementById("cr-eth");
  var usdtEl = document.getElementById("cr-usdt");
  var solEl = document.getElementById("cr-sol");
  var xrpEl = document.getElementById("cr-xrp");
  var dogeEl = document.getElementById("cr-doge");
  var btcChg = document.getElementById("cr-btc-chg");
  var ethChg = document.getElementById("cr-eth-chg");
  var usdtChg = document.getElementById("cr-usdt-chg");
  var solChg = document.getElementById("cr-sol-chg");
  var xrpChg = document.getElementById("cr-xrp-chg");
  var dogeChg = document.getElementById("cr-doge-chg");
  var miniEl = document.getElementById("cr-mini");
  var noteEl = document.getElementById("cr-note");
  if (!btcEl) return;

  var API = "https://api.kraken.com/0/public/Ticker?pair=XBTUSD,ETHUSD,USDTUSD,SOLUSD,XRPUSD,XDGUSD";
  var LS_KEY = "usai_crypto_px";
  var INTERVAL = 60000;
  var prev = {};

  function fmt(n) {
    if (!isFinite(n)) return "$\u2014";
    return "$" + n.toLocaleString("en-US", { maximumFractionDigits: n >= 100 ? 0 : 2 });
  }

  function flash(el, dir) {
    if (!el) return;
    el.classList.remove("cr-flash-up", "cr-flash-down");
    void el.offsetWidth;
    el.classList.add(dir > 0 ? "cr-flash-up" : (dir < 0 ? "cr-flash-down" : ""));
  }

  function px(r, key) {
    try {
      var q = r[key];
      if (!q || !q.c || !q.c[0]) return null;
      var c = parseFloat(q.c[0]), o = parseFloat(q.o);
      return (isFinite(c) && isFinite(o) && o > 0) ? { c: c, o: o } : null;
    } catch (e) { return null; }
  }

  function setRow(priceEl, chgEl, key, close, open) {
    priceEl.textContent = fmt(close);
    var dir = 0;
    if (prev[key] && isFinite(prev[key]) && isFinite(close)) {
      dir = close > prev[key] ? 1 : (close < prev[key] ? -1 : 0);
    }
    prev[key] = close;
    flash(priceEl, dir);
    if (chgEl) {
      if (isFinite(close) && isFinite(open) && open > 0) {
        var pct = (close - open) / open * 100;
        chgEl.textContent = (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%";
        chgEl.className = "cr-chg " + (pct >= 0 ? "cr-up" : "cr-down");
      } else {
        chgEl.textContent = "";
      }
    }
  }

  function render(data) {
    try {
      var r = data.result;
      var btc = r.XXBTZUSD, eth = r.XETHZUSD, usd = r.USDTZUSD;
      var bc = parseFloat(btc.c[0]), bo = parseFloat(btc.o);
      var ec = parseFloat(eth.c[0]), eo = parseFloat(eth.o);
      var uc = parseFloat(usd.c[0]), uo = parseFloat(usd.o);
      setRow(btcEl, btcChg, "btc", bc, bo);
      setRow(ethEl, ethChg, "eth", ec, eo);
      setRow(usdtEl, usdtChg, "usdt", uc, uo);
      /* crypto-widget expansion 2026-10-13 (additive): SOL/XRP/DOGE — safe getter, row stays placeholder if pair missing */
      var s1 = px(r, "SOLUSD");   if (s1 && solEl) setRow(solEl, solChg, "sol", s1.c, s1.o);
      var s2 = px(r, "XXRPZUSD"); if (s2 && xrpEl) setRow(xrpEl, xrpChg, "xrp", s2.c, s2.o);
      var s3 = px(r, "XDGUSD");   if (s3 && dogeEl) setRow(dogeEl, dogeChg, "doge", s3.c, s3.o);
      if (miniEl && isFinite(bc)) miniEl.textContent = "\u20BF BTC " + fmt(bc);
      try { localStorage.setItem(LS_KEY, JSON.stringify({ at: Date.now(), data: data })); } catch (e) {}
      if (noteEl) noteEl.textContent = "live \u00B7 Kraken";
    } catch (e) {
      if (noteEl) noteEl.textContent = "retrying\u2026";
    }
  }

  /* mobile-perf 2026-10-12 (additive): skip ticks while widget row is off-screen — resumes on scroll-back */
  var wrapVisible = true;
  (function () {
    var wrap = document.getElementById("top-widgets") || document.body;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { wrapVisible = e[0].isIntersecting; }, { rootMargin: "100px 0px" }).observe(wrap);
    }
  })();

  function fetchPx() {
    if (document.hidden || !wrapVisible) return;
    fetch(API).then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.error && j.error.length === 0 && j.result) render(j);
      else if (noteEl) noteEl.textContent = "retrying\u2026";
    }).catch(function () {
      if (noteEl) noteEl.textContent = "retrying\u2026";
    });
  }

  try {
    var c = JSON.parse(localStorage.getItem(LS_KEY) || "null");
    if (c && c.data && c.data.result) render(c.data);
  } catch (e) {}

  fetchPx();
  setInterval(fetchPx, INTERVAL);
})();
