/* US AI USD<->PKR mini converter widget. Free keyless API (frankfurter.app), fallback Rs 280 = $1, cached in localStorage. */
(function () {
  "use strict";
  var inEl = document.getElementById("fx-in");
  var outEl = document.getElementById("fx-out");
  var rateEl = document.getElementById("fx-rate");
  var swapBtn = document.getElementById("fx-swap");
  var dirEl = document.getElementById("fx-dir");
  var miniEl = document.getElementById("fx-mini");
  if (!inEl || !outEl) return;

  var FALLBACK = 280;
  var LS_KEY = "usai_fx_usdpkr";
  var rate = FALLBACK;
  var usdToPkr = true;
  var updatedAt = 0;

  function fmt(n) {
    if (!isFinite(n)) return "\u2014";
    return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  }

  function renderMini() {
    if (miniEl) miniEl.textContent = "\uD83D\uDCB1 $1 \u2248 Rs " + Math.round(rate);
  }

  function renderRate() {
    if (!rateEl) return;
    var mins = Math.max(0, Math.round((Date.now() - updatedAt) / 60000));
    var ago = mins < 1 ? "just now" : (mins === 1 ? "1 min ago" : mins + " min ago");
    rateEl.textContent = "1 USD = Rs " + fmt(rate) + " \u00B7 " + ago;
    rateEl.classList.remove("fx-glow");
    void rateEl.offsetWidth;
    rateEl.classList.add("fx-glow");
  }

  function convert() {
    var v = parseFloat(inEl.value);
    if (!isFinite(v)) { outEl.textContent = "\u2014"; return; }
    var r = usdToPkr ? v * rate : v / rate;
    outEl.textContent = (usdToPkr ? "Rs " : "$ ") + fmt(r);
  }

  var deb = null;
  inEl.addEventListener("input", function () {
    if (deb) clearTimeout(deb);
    deb = setTimeout(convert, 150);
  });

  if (swapBtn) swapBtn.addEventListener("click", function () {
    usdToPkr = !usdToPkr;
    if (dirEl) dirEl.textContent = usdToPkr ? "USD \u2192 PKR" : "PKR \u2192 USD";
    inEl.placeholder = usdToPkr ? "USD" : "PKR";
    convert();
  });

  function loadCached() {
    try {
      var c = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (c && c.rate > 0) { rate = c.rate; updatedAt = c.at || 0; return true; }
    } catch (e) {}
    return false;
  }

  function saveCache() {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ rate: rate, at: updatedAt })); } catch (e) {}
  }

  function fetchRate() {
    var ctrl = null;
    try { ctrl = new AbortController(); } catch (e) {}
    var p = fetch("https://api.frankfurter.app/latest?from=USD&to=PKR", ctrl ? { signal: ctrl.signal } : undefined)
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function (j) {
        if (j && j.rates && j.rates.PKR > 0) {
          rate = j.rates.PKR;
          updatedAt = Date.now();
          saveCache();
        }
      })
      .catch(function () { /* keep fallback/cached */ });
    if (ctrl) setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 8000);
    return p.then(function () { renderMini(); renderRate(); convert(); });
  }

  loadCached();
  renderMini(); renderRate(); convert();
  fetchRate();
  setInterval(fetchRate, 3600000);
})();
