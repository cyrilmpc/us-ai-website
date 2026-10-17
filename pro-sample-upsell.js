/* US AI — Pro conversion round-5 #1: sample upsell strip (additive, thinker-pro-conversion 2026-10-12-0426)
   tools.js openTool ka sample branch jab anonymous user ko ek Pro tool ka free demo run deta hai,
   to window._sawalaiProSample={id,name,at} set hota hai. Ye script us fresh flag par tool view
   ke top par slim strip inject karta hai. Per tool per device ek dafa, dismissible.
   Sirf ADD — maujood lock logic / content ko haath nahi lagata. */
(function () {
  "use strict";
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function ensureCSS() {
    if (document.getElementById("sawalai-sample-css")) return;
    var s = document.createElement("style");
    s.id = "sawalai-sample-css";
    s.textContent = "@keyframes sawalaiSampleGlow{0%,100%{box-shadow:0 6px 20px rgba(79,70,229,.35)}50%{box-shadow:0 6px 30px rgba(124,58,237,.6)}}";
    document.head.appendChild(s);
  }
  function stripOff(id) {
    try { return !!localStorage.getItem("sawalai_sample_strip_off_" + id); }
    catch (e) { return true; }
  }
  function show() {
    var info = window._sawalaiProSample;
    if (!info || !info.id) return;
    if (Date.now() - (info.at || 0) > 8000) return; /* stale sample */
    if (stripOff(info.id)) return;
    if (document.getElementById("sawalai-sample-strip")) return;
    var box = document.getElementById("tool-view") || document.getElementById("view");
    if (!box) return;
    ensureCSS();
    var d = document.createElement("div");
    d.id = "sawalai-sample-strip";
    d.setAttribute("style",
      "margin:0 0 12px;padding:10px 14px;border-radius:12px;" +
      "background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:.92rem;" +
      "display:flex;gap:10px;align-items:center;flex-wrap:wrap;" +
      "animation:sawalaiSampleGlow 2.4s ease-in-out infinite");
    d.innerHTML =
      '<span style="flex:1;min-width:200px">🔓 That was your <b>1 FREE taste</b> of "<b>' + esc(info.name) + '</b>" — ' +
      'create your <b>FREE account</b> to unlock the full 7-day FREE Pro trial of all 20 Pro tools!</span>' +
      '<a href="account.html" style="background:#fff;color:#4f46e5;font-weight:700;padding:8px 18px;' +
      'border-radius:999px;text-decoration:none;white-space:nowrap">Sign up FREE →</a>' +
      '<button type="button" id="sawalai-sample-strip-x" aria-label="Dismiss" ' +
      'style="background:none;border:none;color:#fff;font-size:1.1rem;cursor:pointer;opacity:.85">✕</button>';
    box.insertBefore(d, box.firstChild);
    var x = document.getElementById("sawalai-sample-strip-x");
    if (x) x.onclick = function () {
      try { localStorage.setItem("sawalai_sample_strip_off_" + info.id, "1"); } catch (e) {}
      d.remove();
    };
    /* consume — isi render par dobara inject na ho */
    info.at = 0;
  }
  function arm() {
    show();
    /* hashchange / click se khulne wale tools ke liye */
    window.addEventListener("hashchange", function () { setTimeout(show, 150); });
    try {
      if ("MutationObserver" in window && document.body) {
        new MutationObserver(function () { show(); }).observe(document.body, { childList: true, subtree: true });
      }
    } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", arm);
  else arm();
})();
