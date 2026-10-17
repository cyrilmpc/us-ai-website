/* US AI Pro — "Recently locked for you" row (homepage, expired users only)
   Shows top 3-4 Pro tools the user visited while they had Pro, as quick-reopen
   chips linking back to each tool page (which shows the lock screen funnel).
   Additive only; dismissible per device. */
(function () {
  "use strict";

  /* Pro tool metadata (id -> {icon, name}) — extracted from tools.js.
     qr-premium has no TOOLS entry; skipped defensively. */
  var PRO_META = {
    "yt-tags":      { icon: "🏷️", name: "YouTube Tag Generator" },
    "hashtags":     { icon: "#️⃣", name: "Hashtag Generator" },
    "caption":      { icon: "💬", name: "Caption Maker" },
    "bio-gen":      { icon: "👤", name: "Bio Generator" },
    "meta-tags":    { icon: "🏷️", name: "Meta Tag Generator" },
    "schema":       { icon: "📋", name: "Schema Markup Generator" },
    "utm":          { icon: "🔗", name: "UTM Campaign Builder" },
    "keywords":     { icon: "🔑", name: "Keyword Density Checker" },
    "hreflang":     { icon: "🌍", name: "Hreflang Tag Generator" },
    "breadcrumb":   { icon: "🍞", name: "Breadcrumb Generator" },
    "altcheck":     { icon: "🖼️", name: "Image Alt Text Checker" },
    "brokenlinks":  { icon: "🔗", name: "Broken Link Checker" },
    "readability":  { icon: "📖", name: "Readability Score" },
    "linkanalyzer": { icon: "🔗", name: "Internal Link Analyzer" },
    "headings":     { icon: "📑", name: "Heading Structure Analyzer" },
    "invoice":      { icon: "🧾", name: "Invoice Generator" },
    "barcode":      { icon: "📊", name: "Barcode Generator" },
    "tts":          { icon: "🔊", name: "Text to Speech" },
    "password":     { icon: "🔐", name: "Password Generator" }
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    try {
      if (!window.SawalPro) return;
      var st = window.SawalPro.status();
      /* only expired (not trial/reward/paid, not logged-out) */
      if (st.pro || st.reason !== "expired" || !st.email) return;

      /* dismissed on this device? */
      var hideKey = "sawalai_recent_locked_hide_" + st.email;
      try { if (localStorage.getItem(hideKey)) return; } catch (e) {}

      /* read visit history */
      var vk = "sawalai_pro_visits_" + st.email;
      var vm = {};
      try { vm = JSON.parse(localStorage.getItem(vk) || "{}"); } catch (e) { return; }
      var ids = Object.keys(vm).filter(function (id) { return PRO_META[id]; });
      if (!ids.length) return;

      /* most recent first, top 4 */
      ids.sort(function (a, b) { return (vm[b].last || 0) - (vm[a].last || 0); });
      var top = ids.slice(0, 4);

      var anchor = document.getElementById("trending-tools");
      if (!anchor || !anchor.parentNode) return;

      var row = document.createElement("div");
      row.id = "pro-recent-locked";
      row.style.cssText = "margin:14px auto;max-width:1100px;padding:12px 16px;border-radius:14px;" +
        "background:linear-gradient(135deg,rgba(168,85,247,.12),rgba(255,209,102,.10));" +
        "border:1px solid rgba(168,85,247,.35);display:flex;flex-wrap:wrap;gap:10px;align-items:center;";

      var label = document.createElement("span");
      label.style.cssText = "font-weight:700;font-size:.95rem;";
      label.textContent = "🔒 Recently locked for you:";
      row.appendChild(label);

      top.forEach(function (id) {
        var m = PRO_META[id];
        var a = document.createElement("a");
        a.href = "tools.html#" + id;
        a.style.cssText = "display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;" +
          "background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.18);" +
          "color:#e8e6ff;text-decoration:none;font-size:.88rem;font-weight:600;";
        a.innerHTML = esc(m.icon) + " " + esc(m.name);
        row.appendChild(a);
      });

      var cta = document.createElement("a");
      cta.href = "index.html#community";
      cta.style.cssText = "display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border-radius:999px;" +
        "background:linear-gradient(135deg,#a855f7,#f59e0b);color:#fff;text-decoration:none;" +
        "font-size:.88rem;font-weight:700;";
      cta.textContent = "🎁 Get FREE Pro →";
      row.appendChild(cta);

      var x = document.createElement("button");
      x.type = "button";
      x.setAttribute("aria-label", "Dismiss");
      x.style.cssText = "margin-left:auto;background:none;border:none;color:#a5b4fc;font-size:1.1rem;cursor:pointer;";
      x.textContent = "✕";
      x.onclick = function () {
        try { localStorage.setItem(hideKey, "1"); } catch (e) {}
        row.style.display = "none";
      };
      row.appendChild(x);

      anchor.parentNode.insertBefore(row, anchor);
    } catch (e) {}
  });
})();
