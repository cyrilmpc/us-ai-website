/* US AI — Reward-expiry countdown banner (additive, proposal thinker-pro-conversion 2026-10-11)
   Users with FREE Pro from invites/community (reason==="reward") see a slim banner
   when 2 or fewer days remain. Dismissible once per day (sawalai_reward_banner_<email>_<date>).
   Prices shown only, never changed (Pro Rs 199/mo — owner-set). */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    try {
      if (!window.SawalPro || typeof window.SawalPro.status !== "function") return;
      if (document.getElementById("pro-reward-banner")) return;
      var st = window.SawalPro.status();
      if (!st.pro || st.reason !== "reward" || !st.email) return;
      var d = st.days;
      if (!(d > 0 && d <= 2)) return;
      var today = new Date().toISOString().slice(0, 10);
      var flag = "sawalai_reward_banner_" + st.email + "_" + today;
      var seen = null;
      try { seen = localStorage.getItem(flag); } catch (e) {}
      if (seen) return;

      var nav = document.querySelector("nav.nav") || document.querySelector("nav");
      if (!nav) return;

      var dayTxt = d === 1 ? "1 day" : d + " days";
      var banner = document.createElement("div");
      banner.id = "pro-reward-banner";
      banner.setAttribute("style",
        "position:relative;z-index:5;margin:0 auto;max-width:1100px;" +
        "padding:10px 14px;border-radius:14px;" +
        "background:linear-gradient(90deg,rgba(249,115,22,.16),rgba(168,85,247,.16));" +
        "border:1px solid #f59e0b;text-align:center;font-size:.95rem");
      banner.innerHTML =
        "⏳ Your FREE Pro (from invite/community) ends in <b>" + dayTxt + "</b> — keep it going! " +
        '<a class="btn btn-ghost" href="index.html#community" ' +
        'style="margin:0 6px;padding:6px 14px;font-size:.9rem">🎁 Invite 1 more friend</a>' +
        '<a class="btn btn-primary" href="account.html" id="pro-reward-gopro" ' +
        'style="margin:0 6px;padding:6px 14px;font-size:.9rem">Go Pro — Rs 199/mo</a>' +
        '<button id="pro-reward-x" type="button" aria-label="Dismiss" ' +
        'style="background:none;border:none;color:inherit;font-size:1.1rem;cursor:pointer;opacity:.7">✕</button>';

      nav.parentNode.insertBefore(banner, nav.nextSibling);

      function dismiss() {
        try { localStorage.setItem(flag, String(Date.now())); } catch (e) {}
        banner.remove();
      }
      document.getElementById("pro-reward-x").addEventListener("click", dismiss);
      document.getElementById("pro-reward-gopro").addEventListener("click", dismiss);
    } catch (e) { /* never break the page */ }
  });
})();
