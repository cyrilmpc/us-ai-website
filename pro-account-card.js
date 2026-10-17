/* US AI — Account page Pro status card (additive, proposal thinker-pro-conversion 2026-10-11)
   Injects a Pro status card at the top of #account when user is logged in.
   Prices shown only, never changed (Pro Rs 199/mo, one-time Rs 49 — owner-set). */
(function () {
  "use strict";
  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () {
    try {
      if (!window.SawalPro || typeof window.SawalPro.status !== "function") return;
      if (document.getElementById("pro-acct-card")) return; /* already injected */
      var st = window.SawalPro.status();
      if (!st.email) return; /* only logged-in users */
      var acct = document.getElementById("account");
      if (!acct) return;

      var PRICE_M = window.SawalPro.PRICE_PRO_MONTHLY || 199;
      var PRICE_T = window.SawalPro.PRICE_TOOL_ONCE || 49;
      var dayTxt = st.days === 1 ? "1 day left" : st.days + " days left";
      var head = "", body = "";

      /* Pay panel (reuses existing SawalPay.collect pro-buy flow via bindBuy) */
      var payPanel =
        '<div id="pro-acct-pay" hidden style="margin-top:10px">' +
          '<div class="pro-price-card hot"><b>Rs ' + PRICE_M + '/month</b>' +
          '<span>Unlock all 20 Pro tools</span>' +
          '<button class="btn btn-primary pro-buy" data-kind="pro" type="button">Go Pro</button></div>' +
          '<div id="pro-pay-box" style="margin-top:8px"></div>' +
        '</div>';
      var goProBtn = '<button class="btn btn-primary" id="pro-acct-gopro" type="button">💎 Go Pro — Rs ' +
        PRICE_M + '/mo</button>';
      var inviteBtn = '<a class="btn btn-ghost" href="index.html#community">🎁 Invite Friends — FREE Pro</a>';
      var waBtn = '<a class="btn btn-ghost" href="index.html#community">💬 WhatsApp Group — 3 days FREE</a>';
      var exploreBtn = '<a class="btn btn-ghost" href="tools.html">🔓 Explore 20 Pro tools</a>';
      var onceBtn = '<a class="btn btn-ghost" href="tools.html">⚡ One-time unlock — Rs ' + PRICE_T +
        '/tool</a>';

      if (st.pro && st.reason === "trial") {
        var pct = Math.max(0, Math.min(100, Math.round(((7 - st.days) / 7) * 100)));
        head = "🎉 <b>Pro Trial Active</b> — " + dayTxt;
        body =
          '<div style="height:10px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden;margin:8px 0">' +
          '<div style="height:100%;width:' + pct + '%;border-radius:99px;background:linear-gradient(90deg,#a855f7,#ec4899)"></div></div>' +
          '<div class="tiny muted">Day ' + (7 - st.days + 1) + ' of your 7-day FREE trial</div>';
        body += '<div class="btn-row" style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' +
          exploreBtn + goProBtn + inviteBtn + "</div>" + payPanel;
      } else if (st.pro && st.reason === "reward") {
        head = "⭐ <b>Pro FREE (reward)</b> — " + dayTxt;
        body =
          '<div class="tiny muted">Earned via invites / WhatsApp community — keep it going!</div>' +
          '<div class="btn-row" style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' +
          inviteBtn + waBtn + goProBtn + "</div>" + payPanel;
      } else if (st.pro && st.reason === "paid") {
        head = "💎 <b>Pro Active</b> — " + dayTxt;
        body = '<div class="tiny muted">All 20 Pro tools unlocked. Thanks for supporting US AI! ✨</div>' +
          '<div class="btn-row" style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' + exploreBtn + "</div>";
      } else {
        head = "⏰ <b>Pro expired</b>";
        body =
          '<div class="tiny muted">Your free trial / Pro time has ended — unlock again, or FREE via invites.</div>' +
          '<div class="btn-row" style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' +
          goProBtn + onceBtn + inviteBtn + waBtn + "</div>" + payPanel;
      }

      var card = document.createElement("div");
      card.id = "pro-acct-card";
      card.className = "card";
      card.setAttribute("style", "margin:0 auto 18px;max-width:640px;border:2px solid #a855f7;" +
        "box-shadow:0 0 24px rgba(168,85,247,.25);text-align:center");
      card.innerHTML =
        '<style>#pro-acct-card .btn-row .btn{margin:2px}</style>' +
        '<div style="font-size:1.15rem">' + head + "</div>" + body;

      /* prepend at top of #account section */
      acct.insertBefore(card, acct.firstChild);

      /* Go Pro button -> toggle inline pay panel, wired to existing bindBuy flow */
      var go = document.getElementById("pro-acct-gopro");
      var panel = document.getElementById("pro-acct-pay");
      if (go && panel) {
        go.addEventListener("click", function () {
          panel.hidden = !panel.hidden;
          if (!panel.hidden && !panel.dataset.bound) {
            panel.dataset.bound = "1";
            try { window.SawalPro.bindBuy(panel); } catch (e) {}
          }
        });
      }
    } catch (e) { /* never break the page */ }
  });
})();
