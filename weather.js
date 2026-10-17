/* US AI weather widget: auto-detects visitor city (IP), shows 7-day forecast via Open-Meteo (free, no key). */
(function () {
  "use strict";
  var locEl = document.getElementById("wx-loc");
  var nowEl = document.getElementById("wx-now");
  var daysEl = document.getElementById("wx-days");
  if (!locEl || !nowEl || !daysEl) return;

  var WC = { 0: ["☀️", "Clear"], 1: ["🌤️", "Mostly clear"], 2: ["⛅", "Partly cloudy"], 3: ["☁️", "Overcast"],
    45: ["🌫️", "Foggy"], 48: ["🌫️", "Foggy"], 51: ["🌦️", "Light drizzle"], 53: ["🌦️", "Drizzle"], 55: ["🌧️", "Drizzle"],
    56: ["🌧️", "Freezing drizzle"], 57: ["🌧️", "Freezing drizzle"], 61: ["🌧️", "Light rain"], 63: ["🌧️", "Rain"],
    65: ["⛈️", "Heavy rain"], 66: ["🌧️", "Freezing rain"], 67: ["🌧️", "Freezing rain"],
    71: ["🌨️", "Light snow"], 73: ["🌨️", "Snow"], 75: ["❄️", "Heavy snow"], 77: ["🌨️", "Snow grains"],
    80: ["🌦️", "Light showers"], 81: ["🌧️", "Showers"], 82: ["⛈️", "Violent showers"],
    85: ["🌨️", "Snow showers"], 86: ["❄️", "Snow showers"], 95: ["⛈️", "Thunderstorm"], 96: ["⛈️", "Storm + hail"], 99: ["⛈️", "Storm + hail"] };
  function wc(code) { return WC[code] || ["🌡️", "—"]; }

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
      /* 2026-10-13 weather uplift (additive): expanded timezone→city fallback map */
      var MAP = [
        [/karachi|lahore|islamabad/i, "Lahore", "Pakistan", 31.55, 74.35],
        [/new_york/i, "New York", "USA", 40.71, -74.0],
        [/chicago/i, "Chicago", "USA", 41.88, -87.63],
        [/los_angeles/i, "Los Angeles", "USA", 34.05, -118.24],
        [/america\/denver|america\/phoenix/i, "Denver", "USA", 39.74, -104.99],
        [/toronto|america\/winnipeg|america\/vancouver/i, "Toronto", "Canada", 43.65, -79.38],
        [/london|europe\/dublin|europe\/lisbon/i, "London", "UK", 51.51, -0.13],
        [/europe\/berlin|europe\/rome|europe\/madrid|europe\/amsterdam|europe\/brussels/i, "Berlin", "Germany", 52.52, 13.41],
        [/europe\/paris/i, "Paris", "France", 48.85, 2.35],
        [/dubai|asia\/muscat/i, "Dubai", "UAE", 25.20, 55.27],
        [/riyadh|asia\/baghdad|asia\/qatar|asia\/kuwait|asia\/bahrain/i, "Riyadh", "Saudi Arabia", 24.71, 46.68],
        [/dhaka|asia\/thimphu/i, "Dhaka", "Bangladesh", 23.81, 90.41],
        [/delhi|asia\/kolkata|asia\/kathmandu|asia\/colombo/i, "New Delhi", "India", 28.61, 77.21],
        [/tokyo|asia\/seoul|asia\/shanghai|asia\/hong_kong|asia\/taipei|asia\/kuala_lumpur|asia\/jakarta|asia\/bangkok|asia\/manila/i, "Tokyo", "Japan", 35.68, 139.69],
        [/asia\/singapore/i, "Singapore", "Singapore", 1.35, 103.82],
        [/sydney|australia\/melbourne|australia\/brisbane|australia\/perth/i, "Sydney", "Australia", -33.87, 151.21],
        [/america\/sao_paulo|america\/mexico_city|america\/buenos_aires/i, "São Paulo", "Brazil", -23.55, -46.63]
      ];
      for (var mi = 0; mi < MAP.length; mi++) {
        if (MAP[mi][0].test(tz)) return { city: MAP[mi][1], country: MAP[mi][2], lat: MAP[mi][3], lon: MAP[mi][4] };
      }
    } catch (e) {}
    return { city: "Lahore", country: "Pakistan", lat: 31.55, lon: 74.35 };
  }

  function detectLoc() {
    return fetchJSON("https://ipapi.co/json/", 6000).then(function (j) {
      if (j && j.latitude && j.longitude) {
        return { city: j.city || "Your city", country: j.country_name || "", lat: j.latitude, lon: j.longitude };
      }
      throw new Error("no coords");
    }).catch(function () { return fallbackLoc(); });
  }

  /* 2026-10-13 weather uplift (additive): USA-first dual °C/°F display */
  function isUSA(loc) { return /usa|united states/i.test(loc.country || ""); }
  function tempTxt(tC, loc) {
    var t = Math.round(tC) + "°C";
    if (isUSA(loc)) t += " / " + Math.round(tC * 9 / 5 + 32) + "°F";
    return t;
  }

  function render(loc, data) {
    var cur = data.current || {};
    /* 2026-10-12 dress-for-weather (additive): expose current conditions read-only */
    try { window.SawalWx = { temp: cur.temperature_2m, code: cur.weathercode, ts: Date.now() }; } catch (e) {}
    var w = wc(cur.weathercode);
    var miniEl = document.getElementById("wx-mini");
    if (miniEl) miniEl.textContent = w[0] + " " + tempTxt(cur.temperature_2m, loc);
    locEl.textContent = "📍 " + loc.city + (loc.country ? ", " + loc.country : "");
    nowEl.innerHTML = '<span class="wx-emoji">' + w[0] + '</span>' +
      '<span class="wx-temp">' + tempTxt(cur.temperature_2m, loc) + '</span>' +
      '<span class="wx-cond">' + w[1] + '</span>';
    var d = data.daily, html = "";
    var names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (var i = 0; i < Math.min(7, d.time.length); i++) {
      var dt = new Date(d.time[i] + "T12:00:00");
      var label = i === 0 ? "Today" : names[dt.getDay()];
      var wi = wc(d.weathercode[i]);
      html += '<div class="wx-day"><span class="wx-dname">' + label + '</span>' +
        '<span class="wx-demoji" title="' + wi[1] + '">' + wi[0] + '</span>' +
        '<span class="wx-dtmp">' + Math.round(d.temperature_2m_max[i]) + '° / ' + Math.round(d.temperature_2m_min[i]) + '°</span></div>';
    }
    daysEl.innerHTML = html;
  }

  function fetchForecast(loc) {
    var url = "https://api.open-meteo.com/v1/forecast?latitude=" + loc.lat + "&longitude=" + loc.lon +
      "&current=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7";
    return fetchJSON(url, 8000).then(function (data) {
      try { localStorage.setItem("sawalai_wx", JSON.stringify({ ts: Date.now(), loc: loc, data: data })); } catch (e) {}
      render(loc, data);
    });
  }

  /* 2026-10-13 weather uplift (additive): manual city change via free Open-Meteo geocoding */
  function setManualCity(q) {
    locEl.textContent = "📍 Looking up " + q + "…";
    fetchJSON("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(q) + "&count=1&language=en&format=json", 8000)
      .then(function (g) {
        if (!g || !g.results || !g.results.length) throw new Error("no result");
        var r = g.results[0];
        return fetchForecast({ city: r.name, country: r.country || "", lat: r.latitude, lon: r.longitude });
      })
      .catch(function () { locEl.textContent = "📍 City not found — try again"; });
  }

  function setupCityChange() {
    if (!locEl || document.getElementById("wx-chg")) return;
    var st = document.createElement("style");
    st.textContent = ".wx-change{font-size:.65rem;opacity:.7;margin-left:6px;background:none;border:1px solid rgba(140,150,220,.35);border-radius:8px;color:inherit;cursor:pointer;padding:1px 7px}" +
      ".wx-change:hover{opacity:1}" +
      ".wx-change-wrap{display:inline-flex;gap:4px;margin-left:6px}" +
      ".wx-change-in{font-size:.72rem;border-radius:8px;border:1px solid rgba(140,150,220,.35);background:rgba(0,0,0,.25);color:inherit;padding:2px 6px;width:92px}" +
      ".wx-change-go{font-size:.65rem;border-radius:8px;border:1px solid rgba(140,150,220,.35);background:rgba(99,102,241,.3);color:inherit;cursor:pointer;padding:2px 8px}";
    document.head.appendChild(st);
    var btn = document.createElement("button");
    btn.type = "button"; btn.id = "wx-chg"; btn.className = "wx-change";
    btn.textContent = "change";
    btn.title = "Change weather city"; btn.setAttribute("aria-label", "Change weather city");
    locEl.parentNode.insertBefore(btn, locEl.nextSibling);
    btn.addEventListener("click", function () {
      var wrap = document.createElement("span");
      wrap.className = "wx-change-wrap";
      var inp = document.createElement("input");
      inp.type = "text"; inp.className = "wx-change-in"; inp.maxLength = 60;
      inp.placeholder = "City name"; inp.setAttribute("aria-label", "City name");
      var go = document.createElement("button");
      go.type = "button"; go.className = "wx-change-go"; go.textContent = "Set";
      wrap.appendChild(inp); wrap.appendChild(go);
      btn.style.display = "none";
      btn.parentNode.insertBefore(wrap, btn);
      inp.focus();
      function close() { wrap.remove(); btn.style.display = ""; }
      function done() { var q = inp.value.trim(); close(); if (q) setManualCity(q); }
      go.addEventListener("click", done);
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") done(); if (e.key === "Escape") close(); });
    });
  }

  function load() {
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem("sawalai_wx") || "null"); } catch (e) {}
    if (cached && Date.now() - cached.ts < 30 * 60 * 1000) { render(cached.loc, cached.data); return; }
    locEl.textContent = "📍 Detecting your city…";
    detectLoc().then(fetchForecast).catch(function () {
      locEl.textContent = "🌤️ Weather N/A";
      nowEl.innerHTML = ""; daysEl.innerHTML = "";
    });
  }
  setupCityChange();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load);
  else load();
})();
