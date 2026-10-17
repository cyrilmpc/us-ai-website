/* US AI dual-zone live clock widget: USA (New York ET) + Pakistan (PKT), ticks every second. No API, pure Intl. */
(function () {
  "use strict";
  var etEl = document.getElementById("clk-et");
  var pkEl = document.getElementById("clk-pk");
  var etDateEl = document.getElementById("clk-et-date");
  var pkDateEl = document.getElementById("clk-pk-date");
  var utcRow = document.getElementById("clk-utc-row");
  var utcEl = document.getElementById("clk-utc");
  var miniEl = document.getElementById("clk-mini");
  if (!etEl || !pkEl) return;

  var hasTZ = true;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York" }).format(new Date());
  } catch (e) { hasTZ = false; }

  function fmtTime(date, tz) {
    try {
      return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: true, timeZone: tz
      }).format(date);
    } catch (e) {
      return date.toLocaleTimeString("en-US");
    }
  }
  function fmtDate(date, tz) {
    try {
      return new Intl.DateTimeFormat("en-US", {
        weekday: "short", month: "short", day: "numeric", timeZone: tz
      }).format(date);
    } catch (e) { return ""; }
  }

  /* mobile-perf 2026-10-12 (additive): skip 1s ticks while widget row is off-screen — resumes on scroll-back */
  var wrapVisible = true;
  (function () {
    var wrap = document.getElementById("top-widgets") || document.body;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { wrapVisible = e[0].isIntersecting; }, { rootMargin: "100px 0px" }).observe(wrap);
    }
  })();

  function tick() {
    if (document.hidden || !wrapVisible) return; /* perf: skip 1s DOM writes while tab hidden or widget off-screen */
    var now = new Date();
    var et = hasTZ ? fmtTime(now, "America/New_York") : now.toLocaleTimeString("en-US");
    var pk = hasTZ ? fmtTime(now, "Asia/Karachi") : now.toLocaleTimeString("en-US");
    etEl.textContent = et;
    pkEl.textContent = pk;
    if (etDateEl) etDateEl.textContent = hasTZ ? fmtDate(now, "America/New_York") : "";
    if (pkDateEl) pkDateEl.textContent = hasTZ ? fmtDate(now, "Asia/Karachi") : "";
    if (utcEl) utcEl.textContent = fmtTime(now, "UTC");
    if (miniEl) miniEl.textContent = "\uD83D\uDD50 " + pk.replace(/:\d\d /, " ");
  }

  tick();
  setInterval(tick, 1000);
})();
