/* US AI AQI widget: shows US Air Quality Index via Open-Meteo (free, no key). Reuses weather.js detectLoc pattern. */
(function () {
  "use strict";
  var chip = document.getElementById("aqi-chip");
  if (!chip) return;
  var dotEl = document.getElementById("aqi-dot");
  var numEl = document.getElementById("aqi-num");
  var catEl = document.getElementById("aqi-cat");
  var miniEl = document.getElementById("aqi-mini");
  var detailEl = document.getElementById("aqi-detail");

  var CATS = [
    [50, "Good", "#22c55e"],
    [100, "Moderate", "#eab308"],
    [150, "Unhealthy for Sensitive", "#f97316"],
    [200, "Unhealthy", "#ef4444"],
    [300, "Very Unhealthy", "#a855f7"],
    [9999, "Hazardous", "#7f1d1d"]
  ];
  function catFor(aqi) {
    for (var i = 0; i < CATS.length; i++) if (aqi <= CATS[i][0]) return CATS[i];
    return CATS[CATS.length - 1];
  }
  function healthTip(aqi) {
    if (aqi <= 50) return "Air is clean — enjoy the outdoors!";
    if (aqi <= 100) return "Acceptable — sensitive people take care.";
    if (aqi <= 150) return "Sensitive groups should reduce outdoor exertion.";
    if (aqi <= 200) return "Everyone may feel effects — limit outdoor activity.";
    return "Health alert — stay indoors, wear a mask outside.";
  }

  function fetchJSON(url, timeout) {
    return new Promise(function (res, rej) {
      var to = setTimeout(function () { rej(new Error("timeout")); }, timeout || 7000);
      fetch(url).then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
        .then(function (j) { clearTimeout(to); res(j); })
        .catch(function (e) { clearTimeout(to); rej(e); });
    });
  }
  function fallbackLoc() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (/karachi|lahore|islamabad/i.test(tz)) return { lat: 31.55, lon: 74.35 };
      if (/america|new_york|chicago|los_angeles/i.test(tz)) return { lat: 40.71, lon: -74.0 };
    } catch (e) {}
    return { lat: 31.55, lon: 74.35 };
  }
  function detectLoc() {
    return fetchJSON("https://ipapi.co/json/", 6000).then(function (j) {
      if (j && j.latitude && j.longitude) return { lat: j.latitude, lon: j.longitude };
      throw new Error("no coords");
    }).catch(function () { return fallbackLoc(); });
  }

  function render(data) {
    var aqi = Math.round((data.current && data.current.us_aqi) || 0);
    if (!aqi && aqi !== 0) { chip.style.display = "none"; return; }
    var c = catFor(aqi);
    if (dotEl) dotEl.style.background = c[2];
    if (numEl) numEl.textContent = aqi;
    if (catEl) catEl.textContent = c[1];
    if (miniEl) miniEl.textContent = "🍃 " + aqi;
    // hourly bars
    if (detailEl && data.hourly && data.hourly.us_aqi) {
      var html = '<div class="aqi-tip">' + healthTip(aqi) + '</div><div class="aqi-bars">';
      var now = new Date();
      var startH = now.getHours();
      for (var i = 0; i < 12; i++) {
        var h = (startH + i) % 24;
        var v = Math.round(data.hourly.us_aqi[i] || 0);
        var cc = catFor(v);
        var pct = Math.min(100, v / 3);
        html += '<div class="aqi-bar" title="' + h + ':00 — AQI ' + v + '"><div class="aqi-bar-fill" style="height:' + pct + '%;background:' + cc[2] + '"></div><span>' + h + '</span></div>';
      }
      html += "</div>";
      detailEl.innerHTML = html;
    }
    // tap to expand
    chip.style.cursor = "pointer";
    chip.addEventListener("click", function () {
      if (detailEl) detailEl.hidden = !detailEl.hidden;
      chip.classList.toggle("tw-open", detailEl && !detailEl.hidden);
    });
  }

  function load() {
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem("sawalai_aqi") || "null"); } catch (e) {}
    if (cached && Date.now() - cached.ts < 60 * 60 * 1000) { render(cached.data); return; }
    detectLoc().then(function (loc) {
      var url = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=" + loc.lat +
        "&longitude=" + loc.lon + "&current=us_aqi,pm2_5&hourly=us_aqi&timezone=auto";
      return fetchJSON(url, 8000).then(function (data) {
        try { localStorage.setItem("sawalai_aqi", JSON.stringify({ ts: Date.now(), data: data })); } catch (e) {}
        render(data);
      });
    }).catch(function () { chip.style.display = "none"; });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load);
  else load();
})();
