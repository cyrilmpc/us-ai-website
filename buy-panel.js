/* US AI — shared Buy panel for service pages.
   Buy button -> modal: options (duration/qty) -> login lock (wapis yahin) -> order form -> JazzCash -> done. */
(function () {
  "use strict";

  var DUR = [
    { m: 1, label: "1 Month", off: "" },
    { m: 3, label: "3 Months", off: "5% off" },
    { m: 6, label: "6 Months", off: "10% off" },
    { m: 12, label: "12 Months", off: "20% off" }
  ];
  var DISC = { 1: 1, 3: 2.85, 6: 5.4, 12: 9.6 };

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function rs(n) { var v = Number(n || 0) / 280; return "$" + (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(2)); }
  function $(id) { return document.getElementById(id); }

  function user() {
    try {
      if (window.SawalPay && SawalPay.currentUser) return SawalPay.currentUser();
      if (window.SawalShop && SawalShop.currentUser) return SawalShop.currentUser();
    } catch (e) {}
    return null;
  }

  var cur = null; /* current item */
  var sel = { dur: 1, qty: 1 };
  var sideMode = false; /* laptop: render in side panel, no modal */

  /* (P1) think-255: per-item selection memory (localStorage usai_buypanel_sel) */
  var SEL_KEY = "usai_buypanel_sel";
  function readSelStore() {
    try {
      var o = JSON.parse(localStorage.getItem(SEL_KEY) || "{}");
      return (o && typeof o === "object") ? o : {};
    } catch (e) { return {}; }
  }
  function writeSelStore(store) {
    try { localStorage.setItem(SEL_KEY, JSON.stringify(store)); } catch (e) {}
  }
  function saveSel() {
    try {
      var store = readSelStore();
      if (cur && cur.name) {
        var rec = store.byName || {};
        rec[cur.name] = { dur: sel.dur, qty: sel.qty };
        store.byName = rec;
        store.lastName = cur.name;
        writeSelStore(store);
      }
    } catch (e) {}
  }
  function loadSel(name) {
    try {
      var rec = readSelStore().byName || {};
      var s = rec[name];
      if (!s) return;
      var d = parseInt(s.dur, 10), q = parseInt(s.qty, 10);
      var durs = DUR.map(function (x) { return x.m; });
      sel.dur = (durs.indexOf(d) >= 0) ? d : 1;
      sel.qty = (q >= 1 && q <= 10) ? q : 1;
    } catch (e) {}
  }
  function lastName() {
    try { return readSelStore().lastName || ""; } catch (e) { return ""; }
  }

  /* (P2) think-255: pending buy durability — sessionStorage (legacy) then localStorage + 24h expiry */
  var PEND_KEY = "usai_bp_pending";
  function pendWrite(p) {
    try {
      p.ts = Date.now();
      localStorage.setItem(PEND_KEY, JSON.stringify(p));
    } catch (e) {}
  }
  function pendRead() {
    var raw = null, p = null;
    try { raw = sessionStorage.getItem("bp_pending"); } catch (e) {}
    if (raw) {
      try { p = JSON.parse(raw); } catch (e2) {}
      if (p) return { p: p, src: "session" };
    }
    try { raw = localStorage.getItem(PEND_KEY); } catch (e3) {}
    if (raw) {
      try { p = JSON.parse(raw); } catch (e4) {}
      if (p) {
        if (p.ts && (Date.now() - p.ts) > 86400000) { pendClear(); return null; } /* 24h stale */
        return { p: p, src: "local" };
      }
    }
    return null;
  }
  function pendClear() {
    try { sessionStorage.removeItem("bp_pending"); } catch (e) {}
    try { localStorage.removeItem(PEND_KEY); } catch (e2) {}
  }

  function total() {
    return Math.round((cur.price || 0) * (DISC[sel.dur] || 1) * sel.qty);
  }

  /* active container: side panel on laptop, modal body on mobile */
  function box() { return sideMode ? $("sp-side-body") : $("buy-body"); }
  function isDesktop() {
    try {
      return window.matchMedia && window.matchMedia("(min-width: 900px)").matches && !!$("sp-side");
    } catch (e) { return false; }
  }

  function ensureModal() {
    var m = $("buy-modal");
    if (m) return m;
    m = document.createElement("div");
    m.id = "buy-modal";
    m.className = "buy-modal";
    m.innerHTML =
      '<div class="buy-bg" data-bclose></div>' +
      '<div class="buy-box" role="dialog" aria-modal="true">' +
      '<button type="button" class="buy-x" data-bclose aria-label="Close">✕</button>' +
      '<div id="buy-body"></div>' +
      "</div>";
    document.body.appendChild(m);
    m.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("[data-bclose]")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
    return m;
  }

  function openModal() { ensureModal().classList.add("open"); document.body.style.overflow = "hidden"; }
  function close() {
    var m = $("buy-modal");
    if (m) m.classList.remove("open");
    document.body.style.overflow = "";
  }

  function picHTML(it, cls) {
    if (it.pic) {
      var dark = /\.svg(\?|$)/i.test(it.pic) ? " darkbg" : "";
      return '<img class="' + (cls || "pic") + dark + '" src="' + esc(it.pic) + '" alt="" loading="lazy" onerror="this.style.display=\'none\'">';
    }
    return '<span class="' + (cls || "pic") + ' ic">' + esc(it.ic || "✨") + "</span>";
  }

  /* ---------- step 1: options ---------- */
  function renderOptions() {
    var u = user();
    if (!u) { renderLock(); return; }
    var nodur = !!(cur && cur.nodur);
    if (nodur) sel.dur = 1;
    var pills = DUR.map(function (d) {
      return '<button type="button" class="buy-pill' + (sel.dur === d.m ? " active" : "") + '" data-dur="' + d.m + '">' +
        esc(d.label) + (d.off ? ' <span class="off">' + esc(d.off) + "</span>" : "") + "</button>";
    }).join("");
    var durSec = nodur
      ? '<div class="buy-sec"><span>One-time purchase</span></div>'
      : '<div class="buy-sec"><span>Duration</span><div class="buy-pills">' + pills + "</div></div>";
    box().innerHTML =
      '<div class="buy-head">' + picHTML(cur, "pic") +
      "<div><b>" + esc(cur.name) + "</b><span>" + rs(cur.price) + " " + (nodur ? "one-time" : esc(cur.per || "per month")) + "</span></div></div>" +
      durSec +
      '<div class="buy-sec"><span>Quantity</span><div class="buy-qty">' +
      '<button type="button" data-q="-1">−</button><b id="buy-qty-n">' + sel.qty + "</b>" +
      '<button type="button" data-q="1">+</button></div></div>' +
      '<div class="buy-total">Total: <strong id="buy-total">' + rs(total()) + "</strong></div>" +
      '<button type="button" class="btn btn-primary btn-glow buy-go" id="buy-proceed">Proceed →</button>';
    bindOptions();
  }

  function bindOptions() {
    var body = box();
    body.querySelectorAll("[data-dur]").forEach(function (b) {
      b.addEventListener("click", function () {
        sel.dur = parseInt(b.getAttribute("data-dur"), 10) || 1;
        saveSel(); /* (P1) remember selection */
        renderOptions();
      });
    });
    body.querySelectorAll("[data-q]").forEach(function (b) {
      b.addEventListener("click", function () {
        sel.qty = Math.min(10, Math.max(1, sel.qty + parseInt(b.getAttribute("data-q"), 10)));
        saveSel(); /* (P1) remember selection */
        renderOptions();
      });
    });
    var p = $("buy-proceed");
    if (p) p.addEventListener("click", renderForm);
  }

  /* ---------- step 1b: login lock ---------- */
  function renderLock() {
    try { sessionStorage.setItem("bp_pending", JSON.stringify({ item: cur, dur: sel.dur, qty: sel.qty })); } catch (e) {}
    pendWrite({ item: cur, dur: sel.dur, qty: sel.qty }); /* (P2) survive tab close */
    var next = "";
    try { next = "?next=" + encodeURIComponent(location.pathname + location.search); } catch (e) {}
    box().innerHTML =
      '<div class="buy-head">' + picHTML(cur, "pic") +
      "<div><b>" + esc(cur.name) + "</b><span>" + rs(cur.price) + " " + esc(cur.nodur ? "one-time" : (cur.per || "per month")) + "</span></div></div>" +
      '<div class="pay-lock"><div class="pay-lock-ico">🔒</div><h3>Login Required</h3>' +
      "<p>To buy <b>" + esc(cur.name) + "</b>, sign in or create a free account (just once). After signing in, you will come straight back here to finish your order.</p>" +
      '<a class="btn btn-primary btn-glow" href="account.html' + next + '">Login / Create Free Account →</a></div>';
  }

  /* ---------- step 2: order form ---------- */
  function renderForm() {
    var u = user();
    if (!u) { renderLock(); return; }
    var durLabel = (cur && cur.nodur) ? "One-time" : DUR.filter(function (d) { return d.m === sel.dur; })[0].label;
    box().innerHTML =
      '<div class="buy-head">' + picHTML(cur, "pic") +
      "<div><b>" + esc(cur.name) + "</b><span>" + esc(durLabel) + " × " + sel.qty + " · <strong>" + rs(total()) + "</strong></span></div></div>" +
      '<form id="buy-form">' +
      '<label class="fld"><span>Your name</span><input type="text" name="name" required placeholder="Full name" autocomplete="name" value="' + esc(u.name || "") + '"></label>' +
      '<label class="fld"><span>Email</span><input type="email" name="email" required placeholder="you@email.com" autocomplete="email" value="' + esc(u.email || "") + '"></label>' +
      '<label class="fld"><span>WhatsApp number</span><input type="tel" name="whatsapp" required placeholder="+92..." inputmode="tel" autocomplete="tel"></label>' +
      '<label class="fld"><span>Notes (optional)</span><input type="text" name="notes" placeholder="Any special request..." autocomplete="off"></label>' +
      '<button class="btn btn-primary btn-glow buy-go" type="submit">Continue to Payment →</button>' +
      "</form>";
    if (typeof usaiApplyDialCode === "function") usaiApplyDialCode();
    $("buy-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(e.target);
      cur._order = {
        kind: cur.kind || "Service",
        plan: cur.name,
        duration: durLabel,
        qty: sel.qty + " ×",
        total: rs(total()),
        totalRs: total(),
        name: String(fd.get("name") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        whatsapp: String(fd.get("whatsapp") || "").trim(),
        notes: String(fd.get("notes") || "").trim() || "—",
        account: (user() || {}).email || ""
      };
      renderPay();
    });
  }

  /* ---------- step 3: JazzCash ---------- */
  /* 2026-10-13 think-578: read collected store vouchers (additive) */
  function collectedVouchers(){
    try{
      var v = JSON.parse(localStorage.getItem("usai_vouchers")||"{}")||{};
      return Object.keys(v).filter(function(k){ return v[k]; });
    }catch(e){ return []; }
  }
  function renderPay() {
    var c = box();
    c.innerHTML = '<div id="buy-pay"></div>';
    var vcs = collectedVouchers();
    if(vcs.length){
      var vn = document.createElement("div");
      vn.className = "vcodes";
      vn.innerHTML = '🎟️ Your voucher codes: <b>'+esc(vcs.join(", "))+'</b> — mention at checkout, owner applies the discount.';
      c.insertBefore(vn, c.firstChild);
    }
    window.SawalPay.collect(c.querySelector("#buy-pay"), {
      amount: cur._order.totalRs || cur._order.total,
      item: cur._order.kind + " — " + cur._order.plan + " (" + cur._order.duration + ")",
      orderId: "new order"
    }, function (tid) {
      cur._order.tid = tid;
      cur._order.payment = "pending";
      finalize(tid);
    });
  }

  /* ---------- step 4: finalize ---------- */
  function finalize(tid) {
    var o = cur._order, saved = null;
    var vcs = collectedVouchers();
    if(vcs.length){ o.vouchers = vcs.join(", "); }
    try { saved = window.SawalShop.saveOrder(o); } catch (e) { saved = o; }
    var payload = null;
    try {
      payload = window.SawalShop.orderPayload(saved);
      payload["Transaction ID"] = tid;
      payload["Payment"] = window.SawalPay.payLine(tid);
      if(vcs.length){ payload["Voucher codes"] = vcs.join(", "); }
    } catch (e) {}
    var c2 = box();
    c2.innerHTML = '<div class="center" style="padding:18px 6px;"><div style="font-size:2.4rem;">⏳</div>' +
      "<p>Sending your order...</p></div>";
    var done = function (ok) {
      try { if (window.SawalConfetti) window.SawalConfetti.burst(); } catch (e) {} /* success confetti (additive) */
      var wa = "";
      try { wa = window.SawalShop.waReportBtn(saved, "📲 Send Order on WhatsApp"); } catch (e) {}
      c2.innerHTML =
        '<div class="center" style="padding:10px 6px;"><div style="font-size:2.6rem;">✅</div>' +
        "<h3>Order received!</h3>" +
        "<p>Order <strong>" + esc(saved.id || "") + "</strong> · TID " + esc(tid) + " (pending verification — we confirm within minutes).</p>" +
        '<p class="tiny muted">Track it in <a href="purchases.html">🧾 My Purchases</a>.</p>' + wa +
        '<div style="margin-top:14px;"><button type="button" class="btn" id="buy-done">Done</button></div></div>';
      pendClear(); /* (P2) clear both pending stores */
      var dn = $("buy-done");
      if (dn) dn.addEventListener("click", function(){ if (sideMode) { renderOptions(); } else { close(); } });
    };
    if (payload) {
      try {
        window.SawalShop.sendOrderEmail(payload).then(function () { done(true); }, function () { done(false); });
      } catch (e) { done(false); }
    } else { done(false); }
  }

  /* ---------- public ---------- */
  window.BuyPanel = {
    /* (P3) think-255: service pages register their items list so the side panel can re-select the last-viewed item */
    remember: function (items) { rememberItems = items || null; },
    open: function (item) {
      cur = item; sel = { dur: 1, qty: 1 };
      loadSel(item && item.name); /* (P1) restore remembered selection */
      if (cur && cur.nodur) sel.dur = 1; /* nodur items only restore qty */
      if (isDesktop()) {
        sideMode = true;
        renderOptions();
        var sp = $("sp-side");
        if (sp && sp.scrollIntoView) {
          try { sp.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
        }
      } else {
        sideMode = false;
        ensureModal();
        renderOptions();
        openModal();
      }
    }
  };

  /* after login (?next= back), reopen pending buy */
  function resume() {
    var got = pendRead(); /* (P2) sessionStorage first, then localStorage (24h expiry) */
    if (!got) return false;
    var p = got.p;
    if (!p || !user()) return false;
    /* back-compat: old format stored the item directly; new format is {item, dur, qty} */
    var it = (p && p.item) ? p.item : p;
    if (!it) return false;
    pendClear();
    setTimeout(function () {
      window.BuyPanel.open(it);
      /* restore the user's duration/qty selection (validated) */
      var durs = DUR.map(function (d) { return d.m; });
      var dur = parseInt(p.dur, 10);
      var qty = parseInt(p.qty, 10);
      sel.dur = (durs.indexOf(dur) >= 0) ? dur : 1;
      sel.qty = (qty >= 1 && qty <= 10) ? qty : 1;
      renderOptions();
    }, 600);
    return true;
  }

  /* laptop: show buy panel beside the grid on page load (no click needed) */
  var rememberItems = null; /* (P3) optional items list for name->button mapping */
  function autoSide() {
    if (!isDesktop()) return;
    try {
      var ln = lastName();
      if (ln && rememberItems && rememberItems.length) {
        for (var i = 0; i < rememberItems.length; i++) {
          if (rememberItems[i] && rememberItems[i].name === ln) {
            var btn = document.querySelector('[data-buy="' + i + '"]') || document.querySelector("[data-buy]");
            if (btn) { btn.click(); return; }
          }
        }
      }
      var first = document.querySelector("[data-buy]");
      if (first) first.click(); /* fallback: current behavior */
    } catch (e) {}
  }

  /* PThink3 N1 2026-10-11: login-resume race — agar resumed item tha to autoSide SKIP (warna ghalat item overwrite) */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { var resumed = resume(); setTimeout(function () { if (!resumed) autoSide(); }, 800); });
    } else { var resumedNow = resume(); setTimeout(function () { if (!resumedNow) autoSide(); }, 800); }
  /* CRITICAL FIX 2026-10-12 (think-255): bundles.html calls window.SawalBuyPanel.open(...) — alias so bundle Buy buttons work */
  window.SawalBuyPanel = window.BuyPanel;
})();

  /* ---------- 🌍 Visitor country dial code for WhatsApp field ---------- */
  var USAI_DIAL = {"US":"+1","CA":"+1","GB":"+44","PK":"+92","IN":"+91","AE":"+971","SA":"+966","AU":"+61","DE":"+49","FR":"+33","IT":"+39","ES":"+34","NL":"+31","BE":"+32","SE":"+46","NO":"+47","DK":"+45","FI":"+358","PL":"+48","TR":"+90","MY":"+60","SG":"+65","ID":"+62","PH":"+63","TH":"+66","VN":"+84","BD":"+880","LK":"+94","NP":"+977","AF":"+93","IR":"+98","IQ":"+964","KW":"+965","QA":"+974","BH":"+973","OM":"+968","JO":"+962","EG":"+20","ZA":"+27","NG":"+234","KE":"+254","GH":"+233","BR":"+55","MX":"+52","AR":"+54","CL":"+56","CO":"+57","PE":"+51","RU":"+7","UA":"+380","CN":"+86","JP":"+81","KR":"+82","HK":"+852","TW":"+886","NZ":"+64","IE":"+353","AT":"+43","CH":"+41","PT":"+351","GR":"+30","RO":"+40","HU":"+36","CZ":"+420","IL":"+972","MA":"+212","DZ":"+213","TN":"+216"};
  function usaiApplyDialCode() {
    function apply(code) {
      document.querySelectorAll('input[name="whatsapp"], input#sub-wa').forEach(function (inp) {
        if (!inp.value) inp.value = code + " ";
        inp.placeholder = code + "...";
      });
    }
    try {
      var cached = sessionStorage.getItem("usai_dial");
      if (cached) { apply(cached); return; }
    } catch (e) {}
    fetch("https://ipapi.co/json/").then(function (r) { return r.json(); }).then(function (d) {
      var code = (d && d.country_code && USAI_DIAL[d.country_code]) || "+92";
      try { sessionStorage.setItem("usai_dial", code); } catch (e) {}
      apply(code);
    }).catch(function () { apply("+92"); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", usaiApplyDialCode);
  else usaiApplyDialCode();
