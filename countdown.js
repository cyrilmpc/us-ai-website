/* US AI My Countdown chip: personal event countdowns, device-local via localStorage. */
(function () {
  "use strict";
  var body = document.getElementById("cd-body");
  if (!body) return;
  var mini = document.getElementById("cd-mini");
  var KEY = "usai_countdowns";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }
  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }
  function fmt(ms) {
    if (ms <= 0) return "🎉 Today!";
    var s = Math.floor(ms / 1000);
    var d = Math.floor(s / 86400); s -= d * 86400;
    var h = Math.floor(s / 3600); s -= h * 3600;
    var m = Math.floor(s / 60);
    var out = "";
    if (d) out += d + "d ";
    out += h + "h " + m + "m";
    return out.trim();
  }
  function nearest(list) {
    var now = Date.now(), best = null, bestMs = Infinity;
    for (var i = 0; i < list.length; i++) {
      var t = new Date(list[i].date + "T00:00:00").getTime();
      // archive events older than 24h past
      if (now - t > 86400000) continue;
      var ms = t - now;
      if (ms < bestMs) { bestMs = ms; best = list[i]; }
    }
    return best ? { ev: best, ms: bestMs } : null;
  }
  function render() {
    var list = load();
    var n = nearest(list);
    if (!n) {
      body.innerHTML = '<button class="cd-add" id="cd-add">＋ Add your event</button>';
      if (mini) mini.textContent = "";
    } else {
      var label = n.ev.icon ? n.ev.icon + " " + n.ev.name : n.ev.name;
      body.innerHTML = '<div class="cd-main"><span class="cd-label">' + escapeHtml(label) + '</span>' +
        '<span class="cd-time" id="cd-time">' + fmt(n.ms) + '</span></div>' +
        '<div class="cd-actions"><button class="cd-edit" id="cd-edit">✏️</button>' +
        '<button class="cd-add2" id="cd-add2">＋</button></div>';
      if (mini) mini.textContent = "⏳ " + fmt(n.ms).split(" ").slice(0, 2).join(" ");
    }
    bind();
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function openForm(ev) {
    var name = prompt("Event name (e.g. Board Exams):", ev ? ev.name : "");
    if (name === null) return;
    name = (name || "").trim() || "My Event";
    var date = prompt("Event date (YYYY-MM-DD):", ev ? ev.date : "");
    if (date === null) return;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) { alert("Please use YYYY-MM-DD format."); return; }
    var list = load();
    if (ev) {
      for (var i = 0; i < list.length; i++) if (list[i].id === ev.id) { list[i].name = name; list[i].date = date; }
    } else {
      list.push({ id: "cd" + Date.now(), name: name, date: date, icon: "📌" });
    }
    // prune archived
    var now = Date.now();
    list = list.filter(function (e) { return now - new Date(e.date + "T00:00:00").getTime() <= 86400000; });
    save(list);
    render();
  }
  function bind() {
    var add = document.getElementById("cd-add") || document.getElementById("cd-add2");
    if (add) add.addEventListener("click", function () { openForm(null); });
    var edit = document.getElementById("cd-edit");
    if (edit) edit.addEventListener("click", function () {
      var n = nearest(load());
      if (n) {
        if (confirm("Edit \"" + n.ev.name + "\"? (Cancel = delete)")) openForm(n.ev);
        else {
          var list = load().filter(function (e) { return e.id !== n.ev.id; });
          save(list); render();
        }
      }
    });
    // tap body to toggle open (mobile)
    body.style.cursor = "pointer";
  }
  // tick every minute
  setInterval(render, 60000);
  render();
})();
