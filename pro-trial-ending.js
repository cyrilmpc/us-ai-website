/* US AI — Trial-ending countdown banner (additive, proposal thinker-protrial-20261012-1225)
   Users on a FREE Pro trial (reason==="trial") see a slim banner on the homepage
   when 2 or fewer days remain. Dismissible once per day (sawalai_trial_ending_<email>_<date>).
   Prices shown only, never changed (Pro Rs 199/mo — owner-set).
   Mirror pattern of pro-reward-banner.js; no existing logic touched. */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    try {
      if (!window.SawalPro || typeof window.SawalPro.status !== "function") return;
      if (document.getElementById("pro-trial-ending")) return;
      var st = window.SawalPro.status();
      if (!st.pro || st.reason !== "trial" || !st.email) return;
      var d = st.days;
      if (!(d > 0 && d <= 2)) return;
      var today = new Date().toISOString().slice(0, 10);
      var flag = "sawalai_trial_ending_" + st.email + "_" + today;
      var seen = null;
      try { seen = localStorage.getItem(flag); } catch (e) {}
      if (seen) return;

      var nav = document.querySelector("nav.nav") || document.querySelector("nav");
      if (!nav) return;

      var dayTxt = d === 1 ? "1 day" : d + " days";
      var banner = document.createElement("div");
      banner.id = "pro-trial-ending";
      banner.setAttribute("style",
        "position:relative;z-index:5;margin:0 auto;max-width:1100px;" +
        "padding:10px 14px;border-radius:14px;" +
        "background:linear-gradient(90deg,rgba(168,85,247,.16),rgba(59,130,246,.16));" +
        "border:1px solid #a855f7;text-align:center;font-size:.95rem");
      banner.innerHTML =
        "&#9203; Your 7-day FREE Pro trial ends in <b>" + dayTxt + "</b> — keep it going FREE! " +
        '<a class="btn btn-ghost pte-cta" href="index.html#community" ' +
        'style="margin:0 6px;padding:6px 14px;font-size:.9rem">&#127873; Invite 1 friend</a>' +
        '<a class="btn btn-ghost pte-cta" href="index.html#community" ' +
        'style="margin:0 6px;padding:6px 14px;font-size:.9rem">&#128172; WhatsApp Group (3 days FREE)</a>' +
        '<a class="btn btn-primary pte-cta" href="account.html" ' +
        'style="margin:0 6px;padding:6px 14px;font-size:.9rem">Go Pro — Rs 199/mo</a>' +
        '<button id="pro-trial-ending-x" type="button" aria-label="Dismiss" ' +
        'style="background:none;border:none;color:inherit;font-size:1.1rem;cursor:pointer;opacity:.7">&#10005;</button>';

      nav.parentNode.insertBefore(banner, nav.nextSibling);

      function dismiss() {
        try { localStorage.setItem(flag, String(Date.now())); } catch (e) {}
        banner.remove();
      }
      document.getElementById("pro-trial-ending-x").addEventListener("click", dismiss);
      var ctas = banner.querySelectorAll(".pte-cta");
      for (var i = 0; i < ctas.length; i++) {
        ctas[i].addEventListener("click", dismiss);
      }
    } catch (e) { /* never break the page */ }
  });
})();
