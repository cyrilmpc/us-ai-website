/* US AI Pay — shared JazzCash payment step for every buy flow.
   Usage: SawalPay.collect(containerEl, {amount:"Rs 1,499", item:"WhatsApp OTP — USA", orderId:"PN-ABC123"}, function(tid){ ...finalize order... })
   Login gate: SawalPay.requireLogin(containerEl) -> user object or null (renders login prompt).
*/
(function () {
  "use strict";

  /* ============ CONFIG — owner edits these two lines ============ */
  var JAZZCASH_NUMBER = "0325-4746678";   // owner JazzCash (Mian Abdul Rehman Saleem)
  var JAZZCASH_NAME = "Mian Abdul Rehman Saleem";
  /* ============================================================== */

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function currentUser() {
    try {
      if (window.SawalShop && window.SawalShop.currentUser) return window.SawalShop.currentUser();
      var users = JSON.parse(localStorage.getItem("sawalai_users") || "{}");
      var email = localStorage.getItem("sawalai_session");
      return email && users[email] ? users[email] : null;
    } catch (e) { return null; }
  }

  /* Login gate — returns user, or renders a login prompt and returns null */
  function requireLogin(box) {
    var u = currentUser();
    if (u) return u;
    var next = "";
    try { next = "?next=" + encodeURIComponent(location.pathname + location.hash); } catch (e) {}
    box.innerHTML =
      '<div class="pay-lock">' +
      '<div class="pay-lock-ico">🔒</div>' +
      "<h3>Login Required</h3>" +
      "<p>Please login or create a free account before buying.</p>" +
      '<a class="btn btn-primary btn-glow" href="account.html' + next + '">Login / Create Free Account →</a>' +
      "</div>";
    return null;
  }

  /* duplicate TID check across all order stores */
  function tidUsed(tid) {
    var keys = ["sawalai_orders", "pn_orders"];
    for (var k = 0; k < keys.length; k++) {
      try {
        var arr = JSON.parse(localStorage.getItem(keys[k]) || "[]");
        var list = Array.isArray(arr) ? arr : Object.keys(arr).map(function (x) { return arr[x]; });
        for (var i = 0; i < list.length; i++) {
          if (list[i] && String(list[i].tid || "") === tid) return true;
        }
      } catch (e) {}
    }
    return false;
  }

  /* Payment step UI. onDone(tid) called after valid TID submitted. */
  function collect(box, opts, onDone) {
    opts = opts || {};
    /* GLOBAL RULE: login required before every Buy — then payment */
    var user = requireLogin(box);
    if (!user) return;
    var amount = opts.amount || "", item = opts.item || "", orderId = opts.orderId || "";
    /* USD display (US AI branding); JazzCash transfer is in Rs */
    function toUSD(n) { var v = Number(n || 0) / 280; return "$" + (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(2)); }
    function toRs(n) { return "Rs " + Math.round(Number(n || 0)).toLocaleString("en-PK"); }
    var amtRs = 0;
    if (typeof amount === "number") { amtRs = amount; }
    else {
      var s = String(amount).replace(/,/g, "");
      if (s.trim().charAt(0) === "$") { amtRs = (parseFloat(s.replace(/[^0-9.]/g, "")) || 0) * 280; }
      else { amtRs = parseFloat(s.replace(/[^0-9.]/g, "")) || 0; }
    }
    var amtUSD = toUSD(amtRs), amtRsTxt = toRs(amtRs);
    box.innerHTML =
      '<div class="pay-box">' +
      '<div class="pay-head"><span class="pay-jc">JazzCash</span><span class="pay-secure">🔒 Secure Payment</span></div>' +
      '<div class="pay-amount">' + esc(amtUSD) + '</div><div class="tiny muted center">≈ ' + esc(amtRsTxt) + ' via JazzCash</div>' +
      '<div class="pay-item">' + esc(item) + (orderId ? ' <span class="tiny muted">· ' + esc(orderId) + "</span>" : "") + "</div>" +
      '<ol class="pay-steps">' +
      "<li>Open your <b>JazzCash</b> app and send <b>exactly " + esc(amtRsTxt) + "</b> (" + esc(amtUSD) + ") to this number:</li>" +
      "</ol>" +
      '<div class="pay-numrow"><span class="pay-num" id="pay-num">' + esc(JAZZCASH_NUMBER) + "</span>" +
      '<button type="button" class="btn btn-ghost btn-sm" id="pay-copy">📋 Copy</button></div>' +
      '<div class="tiny muted center">Account title: <b>' + esc(JAZZCASH_NAME) + "</b></div>" +
      '<ol class="pay-steps" start="2"><li>After sending, copy the <b>11-digit Transaction ID (TID)</b> from your JazzCash confirmation SMS and paste it below:</li></ol>' +
      '<input type="text" id="pay-tid" class="pay-tid" inputmode="numeric" placeholder="e.g. 12345678901" autocomplete="off">' +
      '<div class="tiny muted" style="margin:4px 0 10px;">TID is the 11-digit number in your JazzCash confirmation SMS.</div>' +
      '<div class="tiny muted" style="margin:0 0 10px;background:rgba(99,102,241,.08);border:1px dashed rgba(99,102,241,.35);border-radius:8px;padding:8px 10px;">💬 <i>JazzCash SMS sample:</i> "Trx ID <b>12345678901</b> has been sent to ' + esc(JAZZCASH_NUMBER) + '…" — copy the 11-digit number and paste it here.</div>' +
      '<button type="button" class="btn btn-primary btn-glow" id="pay-confirm" style="width:100%;">✅ I\'ve Sent the Payment — Submit</button>' +
      '<div class="tiny muted center" style="margin-top:8px;"><b>Step 3:</b> After submitting, your order is marked "pending verification" — we verify your payment in our JazzCash app and then activate your order.</div>' +
      '<p class="tiny muted center" id="pay-msg" style="margin-top:8px;"></p>' +
      "</div>";

    $("pay-copy").addEventListener("click", function () {
      var t = JAZZCASH_NUMBER;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(function () { $("pay-msg").textContent = "Number copied ✓"; });
      } else {
        var ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); $("pay-msg").textContent = "Number copied ✓"; } catch (e) {}
        document.body.removeChild(ta);
      }
    });

    /* 2026-10-12 think-239: TID input improvements (additive):
       (1) sanitize on input — pasted separators stripped, max 11 digits (maxlength removed so paste isn't truncated);
       (2) live digit counter in #pay-msg; (3) Enter key submits.
       2026-10-13 think-239 (additive):
       (4) paste-of-full-SMS auto-extract — when the user pastes the whole JazzCash SMS text,
           auto-fill the field if exactly one 11-digit candidate exists (the JazzCash account
           number itself is excluded from candidates); if several candidates are found, show a
           hint instead of guessing. Plain 11-digit paste is untouched (input handler deals with it).
       (5) double-submit guard — rapid double-click on the submit button finalizes only one order. */
    var submitting = false;
    var acctDigits = JAZZCASH_NUMBER.replace(/\D/g, "");
    function extractTid(text) {
      var groups = String(text || "").match(/\d+/g) || [];
      var cands = [];
      for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        if (g.length === 11 && g !== acctDigits && cands.indexOf(g) === -1) cands.push(g);
      }
      return cands;
    }
    $("pay-tid").addEventListener("paste", function (e) {
      var txt = "";
      try { txt = (e.clipboardData || window.clipboardData).getData("text") || ""; } catch (err) {}
      if (txt.replace(/\D/g, "").length === 11) return; /* plain TID paste — input handler deals with it */
      var cands = extractTid(txt);
      var msg = $("pay-msg");
      if (cands.length === 1) {
        e.preventDefault();
        $("pay-tid").value = cands[0];
        msg.textContent = "✓ TID auto-filled from your SMS.";
      } else if (cands.length > 1) {
        msg.textContent = "⚠️ Found several numbers in that text — please paste only the 11-digit TID.";
      }
    });
    function submitTid() {
      if (submitting) return;
      var tid = ($("pay-tid").value || "").replace(/\D/g, "");
      var msg = $("pay-msg");
      if (tid.length !== 11) { msg.textContent = "⚠️ Please enter the 11-digit Transaction ID."; return; }
      if (tidUsed(tid)) { msg.textContent = "⚠️ This Transaction ID was already used for another order."; return; }
      submitting = true;
      msg.textContent = "";
      try { onDone(tid); } catch (err) { submitting = false; throw err; }
    }
    $("pay-tid").addEventListener("input", function () {
      var inp = $("pay-tid");
      var clean = (inp.value || "").replace(/\D/g, "").slice(0, 11);
      if (inp.value !== clean) inp.value = clean;
      var msg = $("pay-msg");
      if (clean.length === 0) msg.textContent = "";
      else if (clean.length < 11) msg.textContent = clean.length + "/11 digits";
      else msg.textContent = "11/11 digits ✓";
    });
    $("pay-tid").addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); submitTid(); }
    });
    $("pay-confirm").addEventListener("click", submitTid);
  }

  /* small helper: payment line for WhatsApp/email summaries */
  function payLine(tid) {
    return "Payment: JazzCash " + JAZZCASH_NUMBER + " · TID " + tid + " (pending verification)";
  }

  window.SawalPay = {
    NUMBER: JAZZCASH_NUMBER,
    NAME: JAZZCASH_NAME,
    requireLogin: requireLogin,
    collect: collect,
    payLine: payLine,
    currentUser: currentUser
  };
})();
