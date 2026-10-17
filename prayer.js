/* US AI prayer-times widget: next-prayer countdown + progress ring. Free keyless API (aladhan.com).
   Reuses the weather widget's detected city; falls back to Lahore, Pakistan. Cached per-day in localStorage. */
(function () {
  "use strict";
  var nextEl = document.getElementById("pt-next");
  var countEl = document.getElementById("pt-count");
  var listEl = document.getElementById("pt-list");
  var ringEl = document.getElementById("pt-ring-fg");
  var miniEl = document.getElementById("pt-mini");
  var cityEl = document.getElementById("pt-city");
  var hijriEl = document.getElementById("pt-hijri");
  if (!nextEl || !countEl) return;

  var ORDER = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  var timings = null;   // {Fajr: Date, ...} for today
  var timingsDate = "";
  var city = "Lahore", country = "Pakistan";
  var cityAuto = true;   // false when user picked a manual city (device-local)
  try {
    var _mc = JSON.parse(localStorage.getItem("usai_prayer_city") || "null");
    if (_mc && _mc.city) { city = _mc.city; if (_mc.country) country = _mc.country; cityAuto = false; }
  } catch (_e) {}

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  }

  function detectCity() {
    if (!cityAuto) return true;   // manual override wins; keep user's city
    try {
      var locEl = document.getElementById("wx-loc");
      if (locEl) {
        var t = (locEl.textContent || "").replace(/^\uD83D\uDCCD\s*/, "").trim();
        if (t && !/detecting/i.test(t)) {
          var parts = t.split(",");
          if (parts[0].trim()) city = parts[0].trim();
          if (parts[1] && parts[1].trim()) country = parts[1].trim();
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function cacheKey() { return "usai_prayer_" + city + "_" + country + "_" + todayKey(); }

  function methodFor(c) {
    // aladhan calculation method per region (additive accuracy fix)
    c = String(c || "").toLowerCase();
    if (c.indexOf("pakistan") >= 0 || c.indexOf("india") >= 0 || c.indexOf("bangladesh") >= 0) return "1"; // Karachi
    if (c.indexOf("saudi") >= 0 || c.indexOf("arabia") >= 0) return "4"; // Makkah, Umm al-Qura
    return "2"; // ISNA — site is USA-first
  }

  function parseTime(str) {
    // "05:30" (24h, aladhan) -> Date today
    var m = /^(\d{1,2}):(\d{2})/.exec(str || "");
    if (!m) return null;
    var d = new Date();
    d.setHours(parseInt(m[1], 10), parseInt(m[2], 10), 0, 0);
    return d;
  }

  function fmt12(d) {
    try {
      return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(d);
    } catch (e) { return d.toLocaleTimeString("en-US"); }
  }

  function loadCache() {
    try {
      var c = JSON.parse(localStorage.getItem(cacheKey()) || "null");
      if (c && c.timings) {
        timings = {};
        for (var i = 0; i < ORDER.length; i++) {
          var p = parseTime(c.timings[ORDER[i]]);
          if (p) timings[ORDER[i]] = p;
        }
        if (Object.keys(timings).length === ORDER.length) {
          timingsDate = todayKey();
          if (c.hijri && hijriEl) hijriEl.textContent = "📅 " + c.hijri;
          renderCity();
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function saveCache(raw, hijriStr) {
    try {
      var o = {};
      for (var i = 0; i < ORDER.length; i++) o[ORDER[i]] = raw[ORDER[i]];
      var rec = { timings: o };
      if (hijriStr) rec.hijri = hijriStr;
      localStorage.setItem(cacheKey(), JSON.stringify(rec));
    } catch (e) {}
  }

  function fetchTimings() {
    var url = "https://api.aladhan.com/v1/timingsByCity?city=" + encodeURIComponent(city) +
      "&country=" + encodeURIComponent(country) + "&method=" + methodFor(country);
    var ctrl = null;
    try { ctrl = new AbortController(); } catch (e) {}
    fetch(url, ctrl ? { signal: ctrl.signal } : undefined)
      .then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(function (j) {
        var t = j && j.data && j.data.timings;
        if (!t) throw new Error("no timings");
        var ok = true, tmp = {};
        for (var i = 0; i < ORDER.length; i++) {
          var p = parseTime(t[ORDER[i]]);
          if (!p) { ok = false; break; }
          tmp[ORDER[i]] = p;
        }
        var hj = null;
        try {
          var _h = j.data.date.hijri;
          if (_h && _h.day && _h.month && _h.month.en && _h.year) hj = _h.day + " " + _h.month.en + " " + _h.year;
        } catch (_e2) {}
        if (ok) { timings = tmp; timingsDate = todayKey(); saveCache(t, hj); renderList(); renderCity(); renderHijri(hj); }
      })
      .catch(function () { /* keep cached; layout never breaks */ });
    if (ctrl) setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, 9000);
  }

  function renderList() {
    if (!listEl || !timings) return;
    var html = "";
    for (var i = 0; i < ORDER.length; i++) {
      html += '<div class="pt-row"><span>' + ORDER[i] + '</span><span>' + fmt12(timings[ORDER[i]]) + '</span></div>';
    }
    listEl.innerHTML = html;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

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
    if (!timings || timingsDate !== todayKey()) {
      if (!loadCache()) return;
      renderList();
    }
    var now = new Date();
    var prev = null, next = null, nextName = "";
    for (var i = 0; i < ORDER.length; i++) {
      var t = timings[ORDER[i]];
      if (t > now) { next = t; nextName = ORDER[i]; prev = i > 0 ? timings[ORDER[i - 1]] : null; break; }
    }
    if (!next) {
      // after Isha -> next is tomorrow's Fajr (approx +24h from today's Fajr)
      next = new Date(timings.Fajr.getTime() + 24 * 3600 * 1000);
      nextName = "Fajr";
      prev = timings.Isha;
    }
    var diff = Math.max(0, next - now);
    var h = Math.floor(diff / 3600000), m = Math.floor(diff % 3600000 / 60000), s = Math.floor(diff % 60000 / 1000);
    var cs = pad(h) + ":" + pad(m) + ":" + pad(s);
    nextEl.textContent = nextName;
    countEl.textContent = cs;
    if (miniEl) miniEl.textContent = "\uD83D\uDD4C " + nextName + " " + (h > 0 ? h + "h " + pad(m) + "m" : m + "m " + pad(s) + "s");

    // progress ring: fraction elapsed between prev and next prayer
    if (ringEl && prev) {
      var total = next - prev, el = now - prev;
      var frac = Math.min(1, Math.max(0, el / total));
      var C = 2 * Math.PI * 15.5; // r=15.5
      ringEl.style.strokeDashoffset = String(C * (1 - frac));
    }
  }

  function renderCity() {
    if (cityEl) cityEl.textContent = "📍 " + city + ", " + country + (cityAuto ? " · auto" : "") + " ✏️";
  }

  function renderHijri(hj) {
    if (hijriEl && hj) hijriEl.textContent = "📅 " + hj;
  }

  if (cityEl) cityEl.addEventListener("click", function () {
    try {
      var v = prompt("Prayer times city (City, Country):", city + ", " + country);
      if (!v) return;
      var p = v.split(",");
      var nc = (p[0] || "").trim();
      if (!nc) return;
      city = nc;
      if (p[1] && p[1].trim()) country = p[1].trim();
      cityAuto = false;
      localStorage.setItem("usai_prayer_city", JSON.stringify({ city: city, country: country }));
      timings = null; timingsDate = "";
      renderCity();
      fetchTimings();
    } catch (e) {}
  });

  // wait for weather widget city (up to ~8s), then fetch
  var tries = 0;
  var iv = setInterval(function () {
    tries++;
    if (detectCity() || tries >= 8) {
      clearInterval(iv);
      renderCity();
      if (!loadCache()) fetchTimings(); else { renderList(); fetchTimings(); }
      tick();
      setInterval(tick, 1000);
    }
  }, 1000);
})();
