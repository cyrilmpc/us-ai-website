/* US AI — Pro conversion round-5 #3: heavy-free-usage upsell strip (additive, thinker-pro-conversion 2026-10-12-0426)
   Logged-in non-Pro (ya anonymous) user jab free tools heavy use kare — device counter
   sawalai_free_tool_uses ≥ 5 (tools.js openTool mein har free tool open par +1) — to tool page
   ke top par slim dismissible strip. Hafte mein ek dafa se zyada nahi
   (sawalai_heavy_upsell_<YYYY-Wnn> flag). Paid/trial/reward users ko kuch nahi.
   Sirf ADD — maujood logic / content ko haath nahi lagata. */
(function () {
  "use strict";
  function weekKey() {
    var d = new Date(), o = new Date(d.getFullYear(), 0, 1);
    var w = Math.ceil((((d - o) / 864e5) + o.getDay() + 1) / 7);
    return d.getFullYear() + "-W" + w;
  }
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    try {
      if (document.getElementById("sawalai-heavy-strip")) return;
      var uses = 0;
      try { uses = parseInt(localStorage.getItem("sawalai_free_tool_uses") || "0", 10) || 0; }
      catch (e) { return; }
      if (uses < 5) return;
      try { if (localStorage.getItem("sawalai_heavy_upsell_" + weekKey())) return; }
      catch (e) { return; }
      if (window.SawalPro && typeof window.SawalPro.status === "function") {
        if (window.SawalPro.status().pro) return; /* paid/trial/reward — kuch nahi */
      }
      /* sirf tool pages par (tools.html ka #tool-view) */
      var box = document.getElementById("tool-view");
      if (!box) return;

      var d = document.createElement("div");
      d.id = "sawalai-heavy-strip";
      d.setAttribute("style",
        "margin:0 0 12px;padding:10px 14px;border-radius:12px;" +
        "background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;font-size:.92rem;" +
        "display:flex;gap:10px;align-items:center;flex-wrap:wrap");
      d.innerHTML =
        '<span style="flex:1;min-width:200px">🚀 You use SawalAI tools a lot — unlock <b>20 PRO tools</b>: ' +
        'Go Pro (Rs 199/mo) or invite a friend for FREE Pro days →</span>' +
        '<a href="account.html" style="background:#fff;color:#0ea5e9;font-weight:700;padding:8px 18px;' +
        'border-radius:999px;text-decoration:none;white-space:nowrap">Go Pro</a>' +
        '<a href="index.html#community" style="background:rgba(255,255,255,.18);color:#fff;font-weight:700;' +
        'padding:8px 18px;border-radius:999px;text-decoration:none;white-space:nowrap;border:1px solid #ffffff55">🎁 Invite</a>' +
        '<button type="button" id="sawalai-heavy-strip-x" aria-label="Dismiss" ' +
        'style="background:none;border:none;color:#fff;font-size:1.1rem;cursor:pointer;opacity:.85">✕</button>';
      box.insertBefore(d, box.firstChild);

      function dismiss() {
        try { localStorage.setItem("sawalai_heavy_upsell_" + weekKey(), String(Date.now())); } catch (e) {}
        d.remove();
      }
      document.getElementById("sawalai-heavy-strip-x").addEventListener("click", dismiss);
    } catch (e) { /* never break the page */ }
  });
})();
