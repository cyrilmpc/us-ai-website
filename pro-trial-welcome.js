/* US AI — Trial-day-1 welcome strip (additive, proposal thinker-pro-conversion 2026-10-11)
   Homepage: trial users see a one-time slim strip nudging them to the 20 Pro tools.
   Dismiss/CTA sets sawalai_trial_welcome_<email> — never shown again in that trial. */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    try {
      if (!window.SawalPro || typeof window.SawalPro.status !== "function") return;
      if (document.getElementById("pro-trial-strip")) return;
      var st = window.SawalPro.status();
      if (!st.pro || st.reason !== "trial" || !st.email) return;
      var flag = "sawalai_trial_welcome_" + st.email;
      var seen = null;
      try { seen = localStorage.getItem(flag); } catch (e) {}
      if (seen) return;

      var nav = document.querySelector("nav.nav") || document.querySelector("nav");
      if (!nav) return;

      var strip = document.createElement("div");
      strip.id = "pro-trial-strip";
      strip.setAttribute("style",
        "position:relative;z-index:5;margin:0 auto;max-width:1100px;" +
        "padding:10px 14px;border-radius:14px;" +
        "background:linear-gradient(90deg,rgba(168,85,247,.18),rgba(236,72,153,.18));" +
        "border:1px solid #a855f7;text-align:center;font-size:.95rem");
      strip.innerHTML =
        "🎉 Your 7-day FREE Pro trial is live — all <b>20 Pro tools</b> unlocked! " +
        '<a class="btn btn-primary" href="tools.html" id="pro-strip-cta" ' +
        'style="margin:0 8px;padding:6px 14px;font-size:.9rem">Browse Pro tools →</a>' +
        '<button id="pro-strip-x" type="button" aria-label="Dismiss" ' +
        'style="background:none;border:none;color:inherit;font-size:1.1rem;cursor:pointer;opacity:.7">✕</button>';

      nav.parentNode.insertBefore(strip, nav.nextSibling);

      function dismiss() {
        try { localStorage.setItem(flag, String(Date.now())); } catch (e) {}
        strip.remove();
      }
      document.getElementById("pro-strip-x").addEventListener("click", dismiss);
      document.getElementById("pro-strip-cta").addEventListener("click", function () {
        try { localStorage.setItem(flag, String(Date.now())); } catch (e) {}
      });
    } catch (e) { /* never break the page */ }
  });
})();
