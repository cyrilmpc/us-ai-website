/* US AI Pro — freemium lock system
   - Kuch tools PRO (locked): invite/community/trial se FREE unlock, ya Rs se khareedein
   - Naye account: 7 din FREE trial (sab Pro tools)
   - Invite reward / Community join: Pro days (refer.js, community.js set karte hain)
   - Paid: Rs 199/month Pro ya Rs 49/tool one-time (JazzCash via pay.js) */
(function () {
  "use strict";

  /* 20 locked (Pro) tools — high value wale */
  var PRO_TOOLS = [
    "yt-tags", "hashtags", "caption", "bio-gen",          // social
    "meta-tags", "schema", "utm", "keywords",              // seo
    "hreflang", "breadcrumb", "altcheck", "brokenlinks",   // seo pro
    "readability", "linkanalyzer", "headings",             // analyzers
    "invoice", "barcode",                                  // business
    "tts", "password", "qr-premium"                        // utilities
  ];
  var PRICE_PRO_MONTHLY = 199;   // Rs
  var PRICE_TOOL_ONCE = 49;      // Rs

  /* Pro conversion round-5 #1 cost guard: tools with real per-run server cost
     stay fully locked (no free sample). Client-side tools (all 20 current Pro
     tools run in the browser) are eligible for the one free "taste". */
  var SAMPLE_EXCLUDED = [
    /* server-cost tool ids yahan add hon, e.g. "ai-video-pro" */
  ];

  function ls(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) { return null; }
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function me() {
    try {
      var users = JSON.parse(ls("sawalai_users") || "{}");
      var email = ls("sawalai_session");
      return email && users[email] ? email.toLowerCase() : null;
    } catch (e) { return null; }
  }

  /* trial: account banne par 7 din */
  function trialLeft(email) {
    var start = parseInt(ls("sawalai_trial_start_" + email) || "0", 10);
    if (!start) return 0;
    var left = Math.ceil((start + 7 * 864e5 - Date.now()) / 864e5);
    return left > 0 ? left : 0;
  }
  function rewardLeft(email) {
    var until = parseInt(ls("sawalai_pro_until_" + email) || "0", 10) || 0;
    var left = Math.ceil((until - Date.now()) / 864e5);
    return left > 0 ? left : 0;
  }
  function paidLeft(email) {
    var until = parseInt(ls("sawalai_pro_paid_" + email) || "0", 10) || 0;
    var left = Math.ceil((until - Date.now()) / 864e5);
    return left > 0 ? left : 0;
  }

  function status() {
    var email = me();
    if (!email) return { pro: false, reason: "login", days: 0 };
    var p = paidLeft(email);
    if (p > 0) return { pro: true, reason: "paid", days: p, email: email };
    var r = rewardLeft(email);
    if (r > 0) return { pro: true, reason: "reward", days: r, email: email };
    var t = trialLeft(email);
    if (t > 0) return { pro: true, reason: "trial", days: t, email: email };
    return { pro: false, reason: "expired", days: 0, email: email };
  }

  function isLocked(toolId) {
    if (PRO_TOOLS.indexOf(toolId) === -1) return false;
    return !status().pro;
  }

  /* mark trial start on signup (called from account.html) */
  function startTrial(email) {
    email = email.toLowerCase();
    if (!ls("sawalai_trial_start_" + email)) ls("sawalai_trial_start_" + email, String(Date.now()));
  }

  /* ---------- lock screen ---------- */
  function lockHTML(toolId, toolName) {
    var st = status();
    var trialMsg = st.reason === "login"
      ? "🔑 Please <a href='account.html' style='color:#a78bfa'><b>log in / sign up</b></a> first — new accounts get a <b>7-day FREE trial</b>!"
      : st.reason === "expired"
        ? "⏰ Your free trial has ended."
        : "";
    /* Pro conversion #1: personalized next-invite-tier line (expired only) */
    var inviteLine = '✨ Invite friends or join the community to <b>unlock FREE</b>! ✨';
    if (st.reason === "expired") {
      try {
        var _rs = window.SawalReferral;
        var _s = (_rs && _rs.stats) ? _rs.stats() : null;
        var _tiers = (_rs && _rs.tiers) ? _rs.tiers : null;
        if (_s && _tiers && _tiers.length) {
          var _next = null;
          for (var _i = 0; _i < _tiers.length; _i++) {
            if (_tiers[_i].n > _s.invites) { _next = _tiers[_i]; break; }
          }
          if (_next) {
            var _need = _next.n - _s.invites;
            inviteLine = '🎁 Just ' + _need + ' invite' + (_need === 1 ? '' : 's') + ' → <b>' + _next.reward + '</b> + ' + _next.badge + '! Your invite link is in the Community section 👇';
          }
        }
      } catch (_e) {}
    }
    /* Pro conversion #2: per-day cost reframe line (expired only) */
    var perDayLine = '';
    if (st.reason === "expired") {
      var _perDay = Math.round(PRICE_PRO_MONTHLY / 30);
      perDayLine = '<p class="tiny" style="margin-top:10px;opacity:.85">💡 Rs ' + PRICE_PRO_MONTHLY + '/month = just ~Rs ' + _perDay + '/day for <b>all 20 Pro tools</b> — less than a cup of chai ☕</p>';
    }
    return '' +
    '<div class="pro-lock">' +
      '<div style="font-size:3rem">🔒</div>' +
      '<h2>' + esc(toolName || "This Tool") + ' is <span class="grad">PRO</span></h2>' +
      (trialMsg ? '<p class="muted">' + trialMsg + '</p>' : '') +
      '<p class="pro-unlock-anim">' + inviteLine + '</p>' +
      '<div class="pro-prices">' +
        '<div class="pro-price-card"><b>Rs ' + PRICE_TOOL_ONCE + '</b><span>One-time unlock for this tool</span><button class="btn btn-primary pro-buy" data-kind="tool" data-tool="' + esc(toolId) + '">Buy</button></div>' +
        '<div class="pro-price-card hot"><b>Rs ' + PRICE_PRO_MONTHLY + '/month</b><span>Unlock all 20 Pro tools</span><button class="btn btn-primary pro-buy" data-kind="pro">Go Pro</button></div>' +
      '</div>' +
      perDayLine +
      '<div class="pro-free-row">' +
        '<a href="index.html#community" class="btn btn-ghost">🎁 Invite Friends — FREE Pro</a>' +
        '<a href="index.html#community" class="btn btn-ghost">💬 WhatsApp Group — 3 days FREE</a>' +
      '</div>' +
      '<div id="pro-pay-box" style="margin-top:12px"></div>' +
    '</div>';
  }

  function bindBuy(box) {
    box.addEventListener("click", function (e) {
      var btn = e.target.closest(".pro-buy");
      if (!btn) return;
      var kind = btn.getAttribute("data-kind");
      var payBox = box.querySelector("#pro-pay-box");
      /* login required */
      var user = null;
      try { user = window.SawalPay ? window.SawalPay.requireLogin(payBox) : null; } catch (err) {}
      if (!user) return;
      var amount = kind === "pro" ? "Rs " + PRICE_PRO_MONTHLY : "Rs " + PRICE_TOOL_ONCE;
      var item = kind === "pro" ? "US AI Pro — 1 month (20 tools)" : "Tool unlock — " + btn.getAttribute("data-tool");
      var orderId = "PRO-" + Date.now().toString(36).toUpperCase();
      try {
        window.SawalPay.collect(payBox, { amount: amount, item: item, orderId: orderId }, function (tid) {
          var email = me();
          if (kind === "pro") {
            var cur = parseInt(ls("sawalai_pro_paid_" + email) || "0", 10) || 0;
            ls("sawalai_pro_paid_" + email, String(Math.max(cur, Date.now()) + 30 * 864e5));
          } else {
            var unlocked = {};
            try { unlocked = JSON.parse(ls("sawalai_tools_unlocked_" + email) || "{}"); } catch (err) {}
            unlocked[btn.getAttribute("data-tool")] = { tid: tid, at: Date.now() };
            ls("sawalai_tools_unlocked_" + email, JSON.stringify(unlocked));
          }
          payBox.innerHTML = '<p class="ok" style="color:#4ade80">✅ Payment received! TID: ' + esc(tid) + ' — will unlock as soon as it is verified.</p>';
          try { if (window.SawalConfetti) window.SawalConfetti.burst(); } catch (e) {} /* success confetti (additive) */
        });
      } catch (err) {
        payBox.innerHTML = '<p class="err">Payment is not available right now — unlock FREE via invite or community!</p>';
      }
    });
  }

  /* single-tool one-time unlock check */
  function toolUnlocked(toolId) {
    var email = me(); if (!email) return false;
    try {
      var u = JSON.parse(ls("sawalai_tools_unlocked_" + email) || "{}");
      return !!u[toolId];
    } catch (e) { return false; }
  }

  window.SawalPro = {
    PRO_TOOLS: PRO_TOOLS,
    SAMPLE_EXCLUDED: SAMPLE_EXCLUDED,
    PRICE_PRO_MONTHLY: PRICE_PRO_MONTHLY,
    PRICE_TOOL_ONCE: PRICE_TOOL_ONCE,
    status: status,
    isLocked: function (id) { return isLocked(id) && !toolUnlocked(id); },
    lockHTML: lockHTML,
    bindBuy: bindBuy,
    startTrial: startTrial,
    toolUnlocked: toolUnlocked
  };
})();
