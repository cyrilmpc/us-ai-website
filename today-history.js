/* US AI "Today in History" widget (additive, 2026-10-12).
   Shows events that happened on today's date (MM-DD) from data/history.json.
   Pure additive: reads the same schema other history tooling uses; no site changes. */
(function () {
  "use strict";
  var bodyEl = document.getElementById("ti-body");
  var miniEl = document.getElementById("ti-mini");
  if (!bodyEl) return;

  function todayKey() {
    var d = new Date();
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render(list) {
    if (!list.length) {
      bodyEl.innerHTML = '<div class="ti-item ti-empty">New historical moments are added daily.</div>';
      if (miniEl) miniEl.textContent = "📜 Today in History";
      return;
    }
    bodyEl.innerHTML = list.map(function (e) {
      return '<div class="ti-item"><span class="ti-year">' + esc(e.year) + "</span>" +
        '<span class="ti-text">' + esc(e.event) + "</span></div>";
    }).join("");
    if (miniEl) {
      var years = list.map(function (e) { return e.year; });
      miniEl.textContent = "📜 " + Math.min.apply(null, years) + "–" + Math.max.apply(null, years);
    }
  }

  function load() {
    var key = todayKey();
    fetch("data/history.json?v=20261012", { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function (data) {
        var list = (Array.isArray(data) ? data : []).filter(function (e) { return e && e.date === key; });
        list.sort(function (a, b) { return a.year - b.year; });
        render(list.slice(0, 4));
      })
      .catch(function () {
        render([]);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
