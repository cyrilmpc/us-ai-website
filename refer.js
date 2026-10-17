/* US AI Referral Rewards System (device-local, static site)
   - Login REQUIRED to get an invite link (so everyone is tracked)
   - Inviter earns tiered rewards per successful invite (account created via link)
   - Invitee gets a 7-day Pro welcome bonus on signup via referral
   - Cross-device credit via WhatsApp claim tokens (static site has no server) */
(function () {
  "use strict";

  /* ---------- helpers ---------- */
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
  function currentUser() {
    try {
      var users = JSON.parse(ls("sawalai_users") || "{}");
      var email = ls("sawalai_session");
      return email && users[email] ? { email: email, name: users[email].name || email } : null;
    } catch (e) { return null; }
  }
  /* stable referral code from email */
  function refCode(email) {
    var h = 0;
    for (var i = 0; i < email.length; i++) { h = ((h << 5) - h + email.charCodeAt(i)) | 0; }
    return "SWL" + Math.abs(h).toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
  }

  /* ---------- reward tiers ---------- */
  var TIERS = [
    { n: 1,  reward: "7 days Pro",        badge: "🌟 Starter",   desc: "Priority generation, no wait" },
    { n: 3,  reward: "30 days Pro",       badge: "🥉 Bronze",    desc: "+10 extra premium pictures/month" },
    { n: 5,  reward: "30 days VIP",       badge: "🥈 Silver",    desc: "All features unlocked" },
    { n: 10, reward: "90 days VIP",       badge: "🥇 Gold",      desc: "Gold profile badge" },
    { n: 25, reward: "1 year VIP",        badge: "💎 Diamond",   desc: "Diamond profile badge" },
    { n: 50, reward: "Lifetime VIP",     badge: "👑 Legend",    desc: "Name on homepage + lifetime everything" }
  ];
  var INVITEE_BONUS = "7 days Pro FREE";

  function myStats() {
    var u = currentUser(); if (!u) return null;
    var code = refCode(u.email);
    var invites = parseInt(ls("sawalai_invites_" + code) || "0", 10) || 0;
    var claimed = {};
    try { claimed = JSON.parse(ls("sawalai_claimed_" + code) || "{}"); } catch (e) {}
    var tier = null;
    TIERS.forEach(function (t) { if (invites >= t.n) tier = t; });
    return { code: code, invites: invites, claimed: claimed, tier: tier, user: u };
  }
  function tierFor(n) {
    var t = null;
    TIERS.forEach(function (x) { if (n >= x.n) t = x; });
    return t;
  }

  /* ---------- attribution: visitor arrived via ?ref=CODE ---------- */
  try {
    var m = location.search.match(/[?&]ref=([A-Za-z0-9]{3,12})/i);
    if (m) ls("sawalai_referred_by", m[1].toUpperCase());
  } catch (e) {}

  /* ---------- called from account.html after successful signup ---------- */
  window.SawalReferral = {
    myCode: function (email) { return refCode(String(email || "").toLowerCase()); },
    onSignup: function (email) {
      var by = null;
      try { by = ls("sawalai_referred_by"); } catch (e) {}
      if (!by) return null;
      /* invitee welcome bonus */
      var until = Date.now() + 7 * 864e5;
      ls("sawalai_pro_until_" + email.toLowerCase(), String(until));
      ls("sawalai_welcome_bonus_" + email.toLowerCase(), "1");
      /* claim token for the inviter (cross-device credit via WhatsApp) */
      var tok = "SWL-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      try {
        var pend = JSON.parse(ls("sawalai_pending_claims") || "[]");
        pend.push({ token: tok, forCode: by, email: email.toLowerCase(), at: Date.now() });
        ls("sawalai_pending_claims", JSON.stringify(pend));
      } catch (e) {}
      try { localStorage.removeItem("sawalai_referred_by"); } catch (e) {}
      return { by: by, token: tok };
    },
    claim: function (token) {
      token = String(token || "").trim().toUpperCase();
      if (!/^SWL-[A-Z0-9]{6}$/.test(token)) return { ok: false, msg: "Invalid token format." };
      var u = currentUser(); if (!u) return { ok: false, msg: "Please log in first." };
      var code = refCode(u.email);
      var claimed = {};
      try { claimed = JSON.parse(ls("sawalai_claimed_" + code) || "{}"); } catch (e) {}
      if (claimed[token]) return { ok: false, msg: "This token has already been used." };
      claimed[token] = Date.now();
      ls("sawalai_claimed_" + code, JSON.stringify(claimed));
      var invites = (parseInt(ls("sawalai_invites_" + code) || "0", 10) || 0) + 1;
      ls("sawalai_invites_" + code, String(invites));
      /* unlock tier reward */
      var tier = tierFor(invites);
      if (tier) {
        var days = tier.n >= 50 ? 36500 : tier.n >= 25 ? 365 : tier.n >= 10 ? 90 : 30;
        if (tier.n === 1) days = 7;
        ls("sawalai_pro_until_" + u.email.toLowerCase(), String(Date.now() + days * 864e5));
        ls("sawalai_badge_" + u.email.toLowerCase(), tier.badge);
      }
      return { ok: true, invites: invites, tier: tierFor(invites) };
    },
    stats: myStats,
    tiers: TIERS,
    inviteeBonus: INVITEE_BONUS
  };

  /* ---------- render the invite box ---------- */
  var box = document.getElementById("refer-box");
  if (!box) return;
  var u = currentUser();

  /* --- not logged in: login gate --- */
  if (!u) {
    box.innerHTML =
      '<h3>🎁 Invite Friends</h3>' +
      '<p class="tiny">Invite your friends — <b>you both get <span class="free-anim">FREE</span> Pro</b>! 🎉</p>' +
      '<p class="tiny" style="margin:8px 0">🔒 You must <b>log in</b> to get an invite link so every invite can be tracked.</p>' +
      '<a href="account.html" class="btn btn-primary" style="font-size:.85rem;padding:10px 22px;">🔑 Login / Sign Up</a>' +
      '<div style="margin-top:8px"><button type="button" id="refer-more-btn" class="btn btn-ghost" style="font-size:.8rem;padding:7px 16px;">More ▾ — See rewards</button></div>' +
      '<div id="refer-more-panel" style="display:none;margin-top:10px;text-align:left;"></div>';
    paintMorePanel(document.getElementById("refer-more-panel"), null);
    bindMore(document.getElementById("refer-more-btn"), document.getElementById("refer-more-panel"));
    return;
  }

  /* --- logged in: full box --- */
  var st = myStats();
  var myLink = location.origin + location.pathname.replace(/[^/]*$/, "") + "?ref=" + st.code;
  /* keep it simple: root with ref */
  myLink = location.origin + "/?ref=" + st.code;

  box.innerHTML =
    '<h3>🎁 Invite Friends</h3>' +
    '<p class="tiny">Invite now — <b>you both get <span class="free-anim">FREE</span> Pro</b>! 🎉 <span id="refer-count-line">Your invites: <b>' + st.invites + '</b>' +
    (st.tier ? ' • ' + st.tier.badge + ' ' + esc(st.tier.reward) : '') + '</span></p>' +
    '<div id="refer-line" style="display:flex;gap:8px;">' +
    '<input id="refer-link" readonly aria-label="Your invite link" value="' + esc(myLink) + '" style="flex:1;min-width:0;padding:10px 14px;border-radius:999px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text);font-size:.8rem;">' +
    '<button id="refer-copy" class="btn btn-primary" type="button" style="padding:10px 18px;font-size:.85rem;">Copy</button>' +
    '</div>' +
    '<div class="cta-row" style="margin-top:10px;margin-bottom:0;">' +
    '<a id="refer-wa" class="btn btn-ghost" target="_blank" rel="noopener" style="font-size:.85rem;padding:8px 18px;">📱 WhatsApp</a>' +
    '<a id="refer-tg" class="btn btn-ghost" target="_blank" rel="noopener" style="font-size:.85rem;padding:8px 18px;">✈️ Telegram</a>' +
    '<a id="refer-x" class="btn btn-ghost" target="_blank" rel="noopener" style="font-size:.85rem;padding:8px 18px;">𝕏 Post</a>' +
    '<a id="refer-fb" class="btn btn-ghost" target="_blank" rel="noopener" style="font-size:.85rem;padding:8px 18px;">📘 Facebook</a>' +
    '<button type="button" id="refer-shuffle" class="btn btn-ghost" title="Try a different invite message" style="font-size:.85rem;padding:8px 14px;">🔀</button>' +
    '<button type="button" id="refer-more-btn" class="btn btn-ghost" style="font-size:.85rem;padding:8px 18px;">More ▾</button>' +
    '</div>' +
    '<div class="fb-msg" id="refer-msg" style="min-height:1.2em;margin-top:8px;"></div>' +
    '<div id="refer-more-panel" style="display:none;margin-top:10px;text-align:left;"></div>';

  var msg = document.getElementById("refer-msg");
  /* (B) share-text power-up: per-channel copy + variant rotation (anti-spam hygiene) */
  var SHARE_VARIANTS = [
    "🚀 I just unlocked 7 days of US AI Pro FREE — 270+ free AI tools, AI chat, picture & video studios, no card needed! Join with my invite and you get it too 🎁 ",
    "🎁 US AI is giving 7 days of Pro FREE through invite links — I grabbed mine, here's yours (270+ free tools inside, no credit card) ",
    "⚡ Tried US AI (270+ free AI tools + studios) — free Pro week via my invite link, grab yours before sharing it on 👇 ",
    "💬 PS: US AI also has a WhatsApp community — join it for 3 days of Pro FREE on top of your 7-day invite bonus 🎁 "
  ];
  var shareIdx = 0;
  try { shareIdx = parseInt(ls("sawalai_share_variant") || "0", 10) || 0; } catch (e) {}
  function shareText(i) { return SHARE_VARIANTS[i % SHARE_VARIANTS.length]; }
  document.getElementById("refer-wa").href = "https://wa.me/?text=" + encodeURIComponent(shareText(shareIdx)) + encodeURIComponent(myLink);
  document.getElementById("refer-tg").href = "https://t.me/share/url?url=" + encodeURIComponent(myLink) + "&text=" + encodeURIComponent("🎁 7 days of US AI Pro FREE via my invite — 270+ free AI tools, no card needed! ");
  document.getElementById("refer-copy").addEventListener("click", function () {
    function done(ok) {
      msg.textContent = ok ? "✅ Link copied! Now send it to your friends." : "⚠️ Copy failed — please copy it manually.";
      msg.className = "fb-msg " + (ok ? "ok" : "err");
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(myLink).then(function () { done(true); }, function () { done(false); });
    } else {
      var li = document.getElementById("refer-link");
      li.select(); try { done(document.execCommand("copy")); } catch (e) { done(false); }
    }
  });

  /* (B) wire X + Facebook share + variant shuffle */
  document.getElementById("refer-x").href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("Unlocked 7 days of US AI Pro FREE 🎁 270+ free AI tools, no card needed ") + "&url=" + encodeURIComponent(myLink);
  document.getElementById("refer-fb").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(myLink) + "&quote=" + encodeURIComponent("🎁 7 days of US AI Pro FREE — 270+ free AI tools, no credit card!");
  document.getElementById("refer-shuffle").addEventListener("click", function () {
    shareIdx = (shareIdx + 1) % SHARE_VARIANTS.length;
    try { ls("sawalai_share_variant", String(shareIdx)); } catch (e) {}
    document.getElementById("refer-wa").href = "https://wa.me/?text=" + encodeURIComponent(shareText(shareIdx)) + encodeURIComponent(myLink);
    msg.textContent = "🔀 New invite message ready — share it!";
    msg.className = "fb-msg ok";
  });

  paintMorePanel(document.getElementById("refer-more-panel"), st);
  bindMore(document.getElementById("refer-more-btn"), document.getElementById("refer-more-panel"));

  /* ---------- More panel ---------- */
  function bindMore(btn, panel) {
    if (!btn || !panel) return;
    btn.addEventListener("click", function () {
      var open = panel.style.display === "none";
      panel.style.display = open ? "block" : "none";
      btn.innerHTML = open ? "Less ▴" : "More ▾" + (btn.id === "refer-more-btn" && !st ? " — See rewards" : "");
      if (open && !panel.dataset.painted) { /* already painted */ }
    });
  }
  function paintMorePanel(panel, st) {
    if (!panel) return;
    var rows = TIERS.map(function (t) {
      var got = st && st.invites >= t.n;
      return '<tr style="' + (got ? "background:rgba(99,102,241,.15);" : "") + '">' +
        '<td style="padding:7px 8px;border-bottom:1px solid rgba(255,255,255,.07)"><b>' + t.n + '</b> invite' + (t.n > 1 ? "s" : "") + '</td>' +
        '<td style="padding:7px 8px;border-bottom:1px solid rgba(255,255,255,.07)">' + esc(t.badge) + '</td>' +
        '<td style="padding:7px 8px;border-bottom:1px solid rgba(255,255,255,.07)"><b>' + esc(t.reward) + '</b><br><span class="tiny muted">' + esc(t.desc) + '</span></td>' +
        '<td style="padding:7px 8px;border-bottom:1px solid rgba(255,255,255,.07)">' + (got ? "✅" : "🔒") + '</td></tr>';
    }).join("");
    panel.innerHTML =
      '<div style="background:rgba(0,0,0,.25);border:1px solid var(--line);border-radius:12px;padding:12px;">' +
      '<p style="margin:0 0 8px;font-size:.85rem"><b>🎉 For newcomers:</b> <span style="color:#a78bfa"><b>' + esc(INVITEE_BONUS) + '</b></span> — auto-activates as soon as they create an account via your invite link!</p>' +
      '<p style="margin:0 0 8px;font-size:.85rem"><b>💰 For you (inviter):</b> a reward for every invite — the more friends, the bigger the prize:</p>' +
      '<div style="overflow-x:auto"><table style="width:100%;font-size:.82rem;border-collapse:collapse;">' + rows + '</table></div>' +
      '<p class="tiny muted" style="margin:8px 0">📌 When a friend creates an account via your link, they get a <b>claim token</b> — they will WhatsApp it to you; enter the token below to unlock your invite count + reward.</p>' +
      (st ?
        '<div style="display:flex;gap:8px;margin-top:8px;">' +
        '<input id="claim-token" placeholder="Claim token (SWL-XXXXXX)" style="flex:1;padding:9px 12px;border-radius:10px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text);font-size:.8rem;">' +
        '<button id="claim-btn" class="btn btn-primary" type="button" style="padding:9px 16px;font-size:.8rem;">Claim</button>' +
        '</div><div class="fb-msg" id="claim-msg" style="min-height:1.2em;margin-top:6px;"></div><div id="claim-samedevice" style="margin-top:8px;"></div>'
        : '<p class="tiny" style="margin:8px 0 0">🔒 Please <a href="account.html" style="color:#a78bfa">log in</a> to claim rewards.</p>') +
      '</div>';
    var cb = document.getElementById("claim-btn");
    if (cb) cb.addEventListener("click", function () {
      var r = window.SawalReferral.claim(document.getElementById("claim-token").value);
      var cm = document.getElementById("claim-msg");
      cm.textContent = r.ok
        ? "🎉 Congrats! Invite #" + r.invites + " counted" + (r.tier ? " — " + r.tier.badge + " " + r.tier.reward + " unlocked!" : ".")
        : "⚠️ " + r.msg;
      cm.className = "fb-msg " + (r.ok ? "ok" : "err");
      if (r.ok) setTimeout(function () { location.reload(); }, 1500);
    });
    /* (C2) same-device one-tap claim: tokens physically in this browser matching my code */
    try {
      var pendMine = [];
      var myCode2 = st ? st.code : null;
      if (myCode2) {
        var claimed2 = {};
        try { claimed2 = JSON.parse(ls("sawalai_claimed_" + myCode2) || "{}"); } catch (e2) {}
        (JSON.parse(ls("sawalai_pending_claims") || "[]")).forEach(function (p) {
          if (p && p.forCode === myCode2 && !claimed2[p.token]) pendMine.push(p.token);
        });
      }
      var sdBox = document.getElementById("claim-samedevice");
      if (sdBox && pendMine.length) {
        sdBox.innerHTML = '<button type="button" id="claim-samedevice-btn" class="btn btn-primary" style="padding:9px 18px;font-size:.85rem;">🎉 Claim ' + pendMine.length + ' invite' + (pendMine.length > 1 ? "s" : "") + ' on this device</button>';
        document.getElementById("claim-samedevice-btn").addEventListener("click", function () {
          var okN = 0;
          pendMine.forEach(function (tok) { var r2 = window.SawalReferral.claim(tok); if (r2 && r2.ok) okN++; });
          var cm2 = document.getElementById("claim-msg");
          if (cm2) {
            cm2.textContent = okN ? "🎉 " + okN + " invite" + (okN > 1 ? "s" : "") + " claimed on this device!" : "⚠️ Could not claim — try entering the token manually.";
            cm2.className = "fb-msg " + (okN ? "ok" : "err");
          }
          if (okN) setTimeout(function () { location.reload(); }, 1500);
        });
      }
    } catch (e3) {}
  }

  /* welcome note for invited visitors */
  try {
    var by = ls("sawalai_referred_by");
    var note = document.getElementById("comm-note");
    if (by && note && !sessionStorage.getItem("sawalai_ref_welcomed")) {
      note.textContent = "🎉 " + by + " invited you — create an account and get 7 days of Pro FREE!";
      sessionStorage.setItem("sawalai_ref_welcomed", "1");
    }
  } catch (e) {}
})();
