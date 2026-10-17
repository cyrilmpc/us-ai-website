/* US AI — Pro conversion round-6 #1: "New Pro tools since your trial ended" strip (additive, thinker-pro-conversion 2026-10-12-0630)
   Homepage only (index.html). Visitor ka Pro trial EXPIRED (SawalPro.status().reason === "expired")
   → nav ke neeche slim strip: trial ke baad add hue NAYE Pro tools ka count + ek random naya tool
   + Go Pro CTA + free paths (invite/community). Dismissible, roz ek dafa se zyada nahi.
   Pehli run par localStorage snapshot save hota hai (sawalai_pro_ids_snapshot) — us ke baad
   add hue Pro tool IDs = current PRO_TOOLS − snapshot. pro.js se PEHLE load na ho (SawalPro chahiye). */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  function pretty(id) {
    return String(id || "").split("-").map(function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(" ");
  }
  ready(function () {
    try {
      if (document.getElementById("pro-newsince-strip")) return;
      /* homepage guard */
      var p = (location.pathname || "").toLowerCase();
      if (!/(^|\/)(index\.html)?$/.test(p)) return;
      if (!window.SawalPro || typeof window.SawalPro.status !== "function") return;
      var st = window.SawalPro.status();
      if (st.pro || st.reason !== "expired") return;

      /* daily cap: roz ek dafa se zyada nahi */
      var today = new Date().toISOString().slice(0, 10);
      var flagK = "sawalai_newpro_strip_" + today;
      try { if (localStorage.getItem(flagK)) return; } catch (e) { return; }

      var proIds = (window.SawalPro.PRO_TOOLS || []).slice();
      if (!proIds.length) return;

      var snapK = "sawalai_pro_ids_snapshot";
      var snap = null;
      try { snap = JSON.parse(localStorage.getItem(snapK) || "null"); } catch (e) { snap = null; }
      if (!Array.isArray(snap)) {
        /* pehli run: snapshot save, abhi kuch "naya" nahi */
        try { localStorage.setItem(snapK, JSON.stringify(proIds)); } catch (e) {}
        return;
      }
      var fresh = proIds.filter(function (id) { return snap.indexOf(id) === -1; });
      if (!fresh.length) return;

      var nav = document.querySelector("nav.nav") || document.querySelector("nav");
      if (!nav) return;

      var pick = fresh[Math.floor(Math.random() * fresh.length)];
      var strip = document.createElement("div");
      strip.id = "pro-newsince-strip";
      strip.setAttribute("style",
        "position:relative;z-index:5;margin:0 auto;max-width:1100px;" +
        "padding:10px 14px;border-radius:14px;" +
        "background:linear-gradient(90deg,rgba(167,139,250,.16),rgba(59,130,246,.16));" +
        "border:1px solid #a78bfa;text-align:center;font-size:.95rem");
      strip.innerHTML =
        "✨ Your trial ended, but Pro kept growing — <b>" + fresh.length + " NEW Pro tool" +
        (fresh.length === 1 ? "" : "s") + "</b> added since then. " +
        "Here's one you haven't tried: <a href=\"tool-" + encodeURIComponent(pick) +
        ".html\" style=\"color:#a78bfa\"><b>" + pretty(pick) + "</b></a>. " +
        '<a class="btn btn-primary" href="account.html" ' +
        'style="margin:0 8px;padding:6px 14px;font-size:.9rem">Go Pro to unlock all →</a>' +
        '<span style="opacity:.8;font-size:.85rem">…or invite friends / join the community to unlock FREE 👇</span>' +
        '<button id="pro-newsince-x" type="button" aria-label="Dismiss" ' +
        'style="background:none;border:none;color:inherit;font-size:1.1rem;cursor:pointer;opacity:.7;margin-left:8px">✕</button>';

      nav.parentNode.insertBefore(strip, nav.nextSibling);

      function dismiss() {
        try { localStorage.setItem(flagK, String(Date.now())); } catch (e) {}
        strip.remove();
      }
      document.getElementById("pro-newsince-x").addEventListener("click", dismiss);
    } catch (e) { /* never break the page */ }
  });
})();
