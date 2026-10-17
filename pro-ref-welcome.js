/* US AI — Pro conversion round-5 #2: referral-arrival welcome strip (additive, thinker-pro-conversion 2026-10-12-0426)
   Visitor ?ref=CODE ke saath aaye aur logged-in na ho (reason "login") → homepage par
   slim personalized strip. Per device ek dafa, dismissible. refer.js ka attribution
   logic untouched — ye sirf nazar aane wala welcome layer hai. Sirf index.html par load hota hai. */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    try {
      if (document.getElementById("pro-ref-strip")) return;
      /* refer.js wali hi regex */
      var m = null;
      try { m = location.search.match(/[?&]ref=([A-Za-z0-9]{3,12})/i); } catch (e) {}
      if (!m) return;
      try { if (localStorage.getItem("sawalai_ref_welcome")) return; } catch (e) { return; }
      if (!window.SawalPro || typeof window.SawalPro.status !== "function") return;
      var st = window.SawalPro.status();
      if (st.pro || st.reason !== "login") return;
      /* homepage guard — sirf index.html / root par */
      var p = (location.pathname || "").toLowerCase();
      if (!/(^|\/)(index\.html)?$/.test(p)) return;

      var nav = document.querySelector("nav.nav") || document.querySelector("nav");
      if (!nav) return;

      var strip = document.createElement("div");
      strip.id = "pro-ref-strip";
      strip.setAttribute("style",
        "position:relative;z-index:5;margin:0 auto;max-width:1100px;" +
        "padding:10px 14px;border-radius:14px;" +
        "background:linear-gradient(90deg,rgba(34,197,94,.16),rgba(59,130,246,.16));" +
        "border:1px solid #22c55e;text-align:center;font-size:.95rem");
      strip.innerHTML =
        "🎉 You were invited by a friend — sign up FREE and get your <b>7-day FREE Pro trial</b>! " +
        "Your friend earns FREE Pro days too 🤝 " +
        '<a class="btn btn-primary" href="account.html" id="pro-ref-strip-cta" ' +
        'style="margin:0 8px;padding:6px 14px;font-size:.9rem">Create FREE account →</a>' +
        '<button id="pro-ref-strip-x" type="button" aria-label="Dismiss" ' +
        'style="background:none;border:none;color:inherit;font-size:1.1rem;cursor:pointer;opacity:.7">✕</button>';

      nav.parentNode.insertBefore(strip, nav.nextSibling);

      function dismiss() {
        try { localStorage.setItem("sawalai_ref_welcome", String(Date.now())); } catch (e) {}
        strip.remove();
      }
      document.getElementById("pro-ref-strip-x").addEventListener("click", dismiss);
      document.getElementById("pro-ref-strip-cta").addEventListener("click", dismiss);
    } catch (e) { /* never break the page */ }
  });
})();
