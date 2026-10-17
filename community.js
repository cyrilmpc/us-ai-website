/* US AI Community — WhatsApp group join (login gate + join reward)
   - Login REQUIRED before joining (taake har bandy ka data save ho)
   - Join karne par reward: 3 din Pro FREE + Community Member badge */
(function () {
  "use strict";

  /* Owner ka WhatsApp GROUP invite link (2026-10-10) */
  var WHATSAPP_GROUP = "https://chat.whatsapp.com/HDahpOL3tsqFKOWsRddkY6?s=cl&p=a&mlu=4&ilr=4";

  function ls(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(k);
      localStorage.setItem(k, v);
    } catch (e) { return null; }
  }
  function currentUser() {
    try {
      var users = JSON.parse(ls("sawalai_users") || "{}");
      var email = ls("sawalai_session");
      return email && users[email] ? { email: email, name: users[email].name || email } : null;
    } catch (e) { return null; }
  }

  var waBtn = document.querySelector('.comm-btn[aria-label="WhatsApp"]');
  var note = document.getElementById("comm-note");
  if (!waBtn) return;

  /* set the group link (or keep placeholder state) */
  function targetUrl() {
    return WHATSAPP_GROUP || null;
  }

  waBtn.addEventListener("click", function (e) {
    e.preventDefault();
    var u = currentUser();

    /* 1) login gate */
    if (!u) {
      if (note) {
        note.innerHTML = '🔒 Please <a href="account.html" style="color:#a78bfa"><b>log in / sign up</b></a> first — then you can join the WhatsApp group.';
      } else {
        alert("Please log in first — then you can join the WhatsApp group.");
        location.href = "account.html";
        return;
      }
      /* still offer login */
      setTimeout(function () { location.href = "account.html"; }, 1800);
      return;
    }

    /* 2) group link not set yet */
    var url = targetUrl();
    if (!url) {
      if (note) note.textContent = "🚀 The WhatsApp group is coming soon — please wait a little!";
      return;
    }

    /* 3) grant join reward (once per account) */
    var key = "sawalai_wa_joined_" + u.email.toLowerCase();
    var first = !ls(key);
    if (first) {
      ls(key, String(Date.now()));
      /* 3 din Pro */
      var until = Date.now() + 3 * 864e5;
      var cur = parseInt(ls("sawalai_pro_until_" + u.email.toLowerCase()) || "0", 10) || 0;
      ls("sawalai_pro_until_" + u.email.toLowerCase(), String(Math.max(cur, until)));
      /* badge (keep higher badge if exists) */
      var badgeKey = "sawalai_badge_" + u.email.toLowerCase();
      if (!ls(badgeKey)) ls(badgeKey, "👥 Community");
      if (note) note.innerHTML = "🎉 <b>Congratulations!</b> You got <b>3 days Pro FREE</b> + 👥 Community badge for joining the WhatsApp group!";
      /* referral cross-reward: inviter gets +1 day Pro (token via WhatsApp) */
      try {
        var by = ls("sawalai_referred_by");
        var me2 = currentUser();
        if (by && me2 && !ls("sawalai_refwa_claimed_" + me2.email.toLowerCase())) {
          ls("sawalai_refwa_claimed_" + me2.email.toLowerCase(), "1");
          var tok = "JOINED-" + by + "-" + me2.email.slice(0,3).toUpperCase();
          note.innerHTML += "<br><span class='tiny'>🎁 Your inviter (" + by + ") gets <b>+1 day Pro</b> for bringing you — WhatsApp them this token: <b>" + tok + "</b> <a class='btn btn-ghost' style='font-size:.75rem;padding:5px 12px;margin-top:4px' target='_blank' rel='noopener' href='https://wa.me/?text=" + encodeURIComponent(tok + " joined the WhatsApp community") + "'>📱 WhatsApp it</a></span>";
        }
      } catch (e) {}
      setTimeout(function () { window.open(url, "_blank", "noopener"); }, 1200);
    } else {
      window.open(url, "_blank", "noopener");
    }
  });

  /* ---------- 3c: member state on #community section (ADDITIVE) ---------- */
  /* If this device already joined the group, show member state + invite */
  /* link copy button. Existing join handler above is untouched. */
  (function showMemberState() {
    try {
      var u = currentUser();
      if (!u) return;
      if (!ls("sawalai_wa_joined_" + u.email.toLowerCase())) return;
      waBtn.innerHTML = "✅ You're a member";
      if (note) {
        note.innerHTML = '👥 Invite your friends — <button id="comm-copy" class="btn btn-small" style="margin-left:6px;">📋 Copy invite link</button>';
        var copyBtn = document.getElementById("comm-copy");
        if (copyBtn) copyBtn.addEventListener("click", function () {
          var url = targetUrl();
          if (!url) return;
          function done(ok) { copyBtn.textContent = ok ? "✅ Copied!" : "❌ Copy failed"; }
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
          } else {
            var ta = document.createElement("textarea");
            ta.value = url; ta.style.position = "fixed"; ta.style.opacity = "0";
            document.body.appendChild(ta); ta.select();
            try { done(document.execCommand("copy")); }
            catch (e) { done(false); }
            document.body.removeChild(ta);
          }
        });
      }
    } catch (e) {}
  })();

  /* expose for owner: set group link without code edit (console) */
  window.SawalCommunity = {
    setGroup: function (url) { WHATSAPP_GROUP = url; if (waBtn) waBtn.href = url; },
    getGroup: function () { return WHATSAPP_GROUP; }
  };
})();
