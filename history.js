/* US AI tool history: records which tools/pages the visitor uses (device-local), shown in My Account. */
(function () {
  "use strict";
  var KEY = "sawalai_tool_history";
  function get() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function save(a) { try { localStorage.setItem(KEY, JSON.stringify(a.slice(-60))); } catch (e) {} }
  function add(name, url) {
    if (!name) return;
    var a = get();
    var last = a[a.length - 1];
    if (last && last.n === name && Date.now() - last.ts < 60000) return; /* no spammy dupes */
    a.push({ n: name, u: url || location.pathname.split("/").pop() || "index.html", ts: Date.now() });
    save(a);
  }

  /* record tool-card clicks by their visible title */
  document.addEventListener("click", function (e) {
    var card = e.target.closest ? e.target.closest(".tool-card, .msvc, .svc-card") : null;
    if (!card) return;
    var t = card.querySelector("h3, h4, .t-name");
    var name = t ? t.textContent.trim().slice(0, 60) : (card.getAttribute("aria-label") || "Tool");
    add(name, location.pathname.split("/").pop());
  }, true);

  /* record visits to tool hub pages */
  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var hubNames = {
    "tools.html": "🛠️ Tools hub", "advanced-tools.html": "⚡ Advanced Tools",
    "site-power.html": "🚀 Site Power", "services.html": "🧰 Services",
    "trailers.html": "🎬 Trailers", "live-scores.html": "🏏 Live Scores"
  };
  if (hubNames[page]) add(hubNames[page], page);

  window.SawalHistory = { get: get, add: add };
})();
