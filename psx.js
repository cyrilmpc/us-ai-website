/* US AI PSX Market Status chip. Zero-API: Karachi-time session math.
   PSX regular session: Mon-Fri 09:30-15:30 PKT. Updates every 60s. */
(function () {
  "use strict";
  var statusEl = document.getElementById("psx-status");
  var detailEl = document.getElementById("psx-detail");
  var miniEl = document.getElementById("psx-mini");
  if (!statusEl) return;

  var OPEN_H = 9, OPEN_M = 30, CLOSE_H = 15, CLOSE_M = 30;

  function pkNow() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Karachi",
        weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
      }).formatToParts(new Date());
      var o = {};
      for (var i = 0; i < parts.length; i++) o[parts[i].type] = parts[i].value;
      return { day: o.weekday, h: parseInt(o.hour, 10) % 24, m: parseInt(o.minute, 10) };
    } catch (e) {
      return null;
    }
  }

  var DAYS = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };

  function nextOpenLabel(t) {
    var openMin = OPEN_H * 60 + OPEN_M;
    var nowMin = t.h * 60 + t.m;
    var d = DAYS[t.day];
    if (d >= 1 && d <= 5 && nowMin < openMin) return "opens today 9:30 AM";
    var add = 1;
    if (d === 5 && nowMin >= CLOSE_H * 60 + CLOSE_M) add = 3;
    else if (d === 6) add = 2;
    else if (d === 0) add = 1;
    else if (d >= 1 && d <= 4) add = 1;
    var names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return "opens " + names[(d + add) % 7] + " 9:30 AM";
  }

  function render() {
    var t = pkNow();
    if (!t) { statusEl.textContent = "\uD83D\uDD34 PSX"; return; }
    var d = DAYS[t.day];
    var nowMin = t.h * 60 + t.m;
    var open = d >= 1 && d <= 5 && nowMin >= OPEN_H * 60 + OPEN_M && nowMin < CLOSE_H * 60 + CLOSE_M;
    var label = open ? "\uD83D\uDFE2 PSX Open" : "\uD83D\uDD34 PSX Closed";
    statusEl.innerHTML = '<span class="psx-dot ' + (open ? "psx-live" : "psx-off") + '"></span> ' + label;
    if (miniEl) miniEl.textContent = label;
    if (detailEl) {
      if (open) {
        var rem = (CLOSE_H * 60 + CLOSE_M) - nowMin;
        var rh = Math.floor(rem / 60), rm = rem % 60;
        detailEl.textContent = "closes in " + rh + "h " + rm + "m (PKT)";
      } else {
        detailEl.textContent = nextOpenLabel(t);
      }
    }
  }

  render();
  setInterval(render, 60000);
})();
