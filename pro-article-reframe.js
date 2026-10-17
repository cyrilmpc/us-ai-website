/* US AI — Pro conversion round-6 #2: article-page reframe strip (additive, thinker-pro-conversion 2026-10-12-0630)
   Article pages (article-*.html) par chalta hai. Article pages pro.js load NAHI karte,
   is liye ye file self-contained hai — SawalPro ki jagah localStorage keys se khud status nikalta hai
   (wahi keys jo pro.js use karta hai: sawalai_session, sawalai_users, sawalai_pro_paid_*,
   sawalai_pro_until_*, sawalai_trial_start_*).
   Sirf jab user Pro NA ho AUR reason "login" ya "expired" ho → article end (footer se pehle)
   slim centered strip: reading FREE forever ka wada + Pro power tools ka honest nudge.
   Hafte mein ek dafa (sawalai_artreframe_<YYYY-WW>); ✕ dismiss par flag set. */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  function ls(k) {
    try { return localStorage.getItem(k); } catch (e) { return null; }
  }
  function proStatus() {
    /* pro.js ke status() ka minimal mirror — sirf pro / reason chahiye */
    try {
      var users = JSON.parse(ls("sawalai_users") || "{}");
      var email = ls("sawalai_session");
      if (!email || !users[email]) return { pro: false, reason: "login" };
      email = email.toLowerCase();
      var now = Date.now();
      var paid = parseInt(ls("sawalai_pro_paid_" + email) || "0", 10) || 0;
      if (paid > now) return { pro: true, reason: "paid" };
      var until = parseInt(ls("sawalai_pro_until_" + email) || "0", 10) || 0;
      if (until > now) return { pro: true, reason: "reward" };
      var start = parseInt(ls("sawalai_trial_start_" + email) || "0", 10) || 0;
      if (start && start + 7 * 864e5 > now) return { pro: true, reason: "trial" };
      return { pro: false, reason: "expired" };
    } catch (e) { return { pro: false, reason: "login" }; }
  }
  function weekKey() {
    var d = new Date();
    var onejan = new Date(d.getFullYear(), 0, 1);
    var week = Math.ceil((((d - onejan) / 864e5) + onejan.getDay() + 1) / 7);
    return "sawalai_artreframe_" + d.getFullYear() + "-W" + (week < 10 ? "0" + week : week);
  }
  ready(function () {
    try {
      if (document.getElementById("pro-artreframe-strip")) return;
      /* sirf article pages */
      var p = (location.pathname || "").toLowerCase();
      if (p.indexOf("/article-") === -1 && p.indexOf("article-") !== 0) return;

      var st = proStatus();
      if (st.pro) return;
      if (st.reason !== "login" && st.reason !== "expired") return;

      var wk = weekKey();
      try { if (ls(wk)) return; } catch (e) { return; }

      var footer = document.querySelector("footer");
      if (!footer) return;

      var strip = document.createElement("div");
      strip.id = "pro-artreframe-strip";
      strip.setAttribute("style",
        "position:relative;margin:18px auto;max-width:720px;" +
        "padding:14px 18px;border-radius:14px;text-align:center;font-size:.95rem;" +
        "background:linear-gradient(90deg,rgba(34,197,94,.12),rgba(59,130,246,.12));" +
        "border:1px solid #22c55e;");
      strip.innerHTML =
        "📖 <b>Good news:</b> everything you <b>READ</b> here is <b>FREE forever</b>. " +
        "Want the power tools too? <b>20 Pro tools</b> — 7-day FREE trial, or invite friends to unlock FREE 🤝<br>" +
        '<a class="btn btn-primary" href="tools.html" ' +
        'style="margin-top:10px;padding:8px 18px;font-size:.92rem;display:inline-block">See Pro tools →</a>' +
        '<button id="pro-artreframe-x" type="button" aria-label="Dismiss" ' +
        'style="background:none;border:none;color:inherit;font-size:1.1rem;cursor:pointer;opacity:.7;margin-left:10px;vertical-align:middle">✕</button>';

      footer.parentNode.insertBefore(strip, footer);

      function dismiss() {
        try { localStorage.setItem(wk, String(Date.now())); } catch (e) {}
        strip.remove();
      }
      document.getElementById("pro-artreframe-x").addEventListener("click", dismiss);
    } catch (e) { /* never break the page */ }
  });
})();
