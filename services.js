/* US AI Services: in-site plans, order flow, WhatsApp/email reports.
   Har service card ka "View Plans" button yahin se modal kholta hai —
   WhatsApp ab sirf order ki report bhejne ke liye khulta hai. */
(function () {
  "use strict";
  var S = window.SawalShop;
  if (!S) return;

  /* ---------- plans per category (Rs) ---------- */
  var PLANS = {
    "cat-ai": { label: "AI & Digital Media", tiers: [
      { name: "Starter", price: 1500, delivery: "2–3 days", features: ["1 AI video (30s) / voiceover (2 min) / 5 images", "1 revision", "HD quality", "WhatsApp support"] },
      { name: "Standard", price: 4000, delivery: "3–5 days", hot: true, features: ["3 videos / 10-min voiceover / 15 images", "3 revisions", "Full HD quality", "Priority WhatsApp support"] },
      { name: "Premium", price: 10000, delivery: "5–7 days", features: ["10 videos / 30-min voiceover / 40 images", "7 days unlimited revisions", "4K where possible", "Dedicated manager"] }
    ]},
    "cat-web": { label: "Website & Technical", tiers: [
      { name: "Starter", price: 5000, delivery: "5–7 days", features: ["5-page basic website", "Mobile-friendly design", "Contact form", "WhatsApp support"] },
      { name: "Standard", price: 15000, delivery: "10–14 days", hot: true, features: ["Up to 15 pages", "SEO basics included", "Speed optimization", "1 month free support"] },
      { name: "Premium", price: 40000, delivery: "3–4 weeks", features: ["Custom design / e-commerce store", "Advanced SEO setup", "1 year priority support", "Dedicated manager"] }
    ]},
    "cat-design": { label: "Design & Branding", tiers: [
      { name: "Starter", price: 1000, delivery: "2 days", features: ["1 design (logo / banner / thumbnail)", "2 revisions", "PNG + JPG files", "WhatsApp support"] },
      { name: "Standard", price: 3000, delivery: "4 days", hot: true, features: ["Up to 5 designs", "7 days unlimited revisions", "Source files included", "Priority support"] },
      { name: "Premium", price: 8000, delivery: "7–10 days", features: ["Complete brand kit (10+ items)", "Brand style guide", "All source files", "Dedicated designer"] }
    ]},
    "cat-write": { label: "Writing & Translation", tiers: [
      { name: "Starter", price: 800, delivery: "2 days", features: ["1 article up to 800 words", "1 revision", "SEO-friendly writing", "WhatsApp support"] },
      { name: "Standard", price: 2500, delivery: "5 days", hot: true, features: ["Up to 5 articles / 5,000 words", "3 revisions", "Keyword research", "Priority support"] },
      { name: "Premium", price: 6000, delivery: "as agreed", features: ["15,000 words / month", "Dedicated writer", "Content calendar", "Priority support"] }
    ]},
    "cat-marketing": { label: "Marketing", tiers: [
      { name: "Starter", price: 3000, delivery: "monthly", features: ["12 social media posts / month", "Hashtag research", "Monthly report", "WhatsApp support"] },
      { name: "Standard", price: 10000, delivery: "monthly", hot: true, features: ["30 posts + 1 ad platform managed", "Weekly reports", "Audience targeting", "Priority support"] },
      { name: "Premium", price: 25000, delivery: "monthly", features: ["Full management (3 platforms) + ads", "Weekly strategy calls", "Dedicated manager", "Growth guarantee effort"] }
    ]}
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- modal skeleton ---------- */
  var modal = document.createElement("div");
  modal.className = "svc-modal";
  modal.id = "svc-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML =
    '<div class="svc-modal-box">' +
      '<div class="svc-modal-head"><h3 id="svc-modal-title">Plans</h3>' +
      '<button class="svc-modal-close" id="svc-modal-close" type="button" aria-label="Close">✕</button></div>' +
      '<div class="svc-modal-body" id="svc-modal-body"></div>' +
    "</div>";
  document.body.appendChild(modal);
  var mTitle = modal.querySelector("#svc-modal-title");
  var mBody = modal.querySelector("#svc-modal-body");

  function openModal() { modal.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
  modal.querySelector("#svc-modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  /* ---------- step 1: plans ---------- */
  function showPlans(card) {
    var service = card.getAttribute("data-service") || "Service";
    var desc = (card.querySelector("p") || {}).textContent || "";
    var sec = card.closest(".svc-cat");
    var catId = sec ? sec.id : "cat-ai";
    var cat = PLANS[catId] || PLANS["cat-ai"];
    mTitle.textContent = service;
    var html = '<p class="muted" style="margin-top:0;">' + esc(desc) + '</p>';
    html += '<div class="tier-grid">';
    cat.tiers.forEach(function (t, i) {
      html += '<div class="tier-card' + (t.hot ? " hot" : "") + '">' +
        (t.hot ? '<span class="tier-tag">Most Popular</span>' : "") +
        '<div class="tier-name">' + esc(t.name) + "</div>" +
        '<div class="tier-price">' + S.rs(t.price) + "</div>" +
        '<div class="tier-del">🚚 Delivery: ' + esc(t.delivery) + "</div>" +
        '<ul class="tier-feats">' + t.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
        '<button class="btn btn-primary btn-glow tier-buy" type="button" data-tier="' + i + '" style="width:100%;">Buy ' + esc(t.name) + "</button>" +
        "</div>";
    });
    html += "</div>";
    html += '<p class="tiny muted center" style="margin-top:14px;">Pay after we confirm your order on WhatsApp/email — no advance needed.</p>';
    mBody.innerHTML = html;
    mBody.querySelectorAll(".tier-buy").forEach(function (b) {
      b.addEventListener("click", function () {
        showOrderForm(card, cat.tiers[parseInt(b.getAttribute("data-tier"), 10)]);
      });
    });
    openModal();
  }

  /* ---------- step 2: order form ---------- */
  function showOrderForm(card, tier) {
    var service = card.getAttribute("data-service") || "Service";
    var u = S.currentUser();
    mTitle.textContent = "Order: " + service + " — " + tier.name;
    mBody.innerHTML =
      '<div class="order-summary"><strong>' + esc(service) + '</strong> · ' + esc(tier.name) +
      ' · <strong>' + S.rs(tier.price) + "</strong> · 🚚 " + esc(tier.delivery) + "</div>" +
      '<form id="svc-order-form">' +
        '<label class="fld"><span>Your name</span><input type="text" name="name" required placeholder="Full name" value="' + esc(u ? u.name : "") + '"></label>' +
        '<label class="fld"><span>Email</span><input type="email" name="email" required placeholder="you@email.com" value="' + esc(u ? u.email : "") + '"></label>' +
        '<label class="fld"><span>WhatsApp number</span><input type="tel" name="whatsapp" required placeholder="+92..."></label>' +
        '<label class="fld"><span>Details (optional)</span><input type="text" name="notes" placeholder="Anything we should know"></label>' +
        '<div style="display:flex;gap:10px;margin-top:6px;">' +
          '<button class="btn btn-ghost" type="button" id="svc-back">← Back to plans</button>' +
          '<button class="btn btn-primary btn-glow" type="submit" id="svc-submit" style="flex:1;">Place Order — ' + S.rs(tier.price) + "</button>" +
        "</div>" +
        '<p class="tiny muted center" id="svc-msg" style="margin-top:10px;"></p>' +
      "</form>";
    mBody.querySelector("#svc-back").addEventListener("click", function () { showPlans(card); });
    var form = mBody.querySelector("#svc-order-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var cu = S.currentUser();
      if (!cu) {
        mTitle.textContent = "Login Required 🔒";
        window.SawalPay.requireLogin(mBody);
        return;
      }
      var order = {
        kind: "Service",
        plan: service + " — " + tier.name,
        details: "Delivery: " + tier.delivery,
        total: (function(p){ var v = p/280; return "$" + (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(2)); })(tier.price),
        totalRs: Math.round(tier.price || 0), /* numeric Rs — JazzCash payment must use this, never the USD display string */
        name: fd.get("name"), email: fd.get("email"),
        whatsapp: fd.get("whatsapp"), notes: fd.get("notes") || "—",
        account: cu.email
      };
      /* step: JazzCash payment + TID before finalizing */
      mTitle.textContent = "Payment — " + order.total;
      window.SawalPay.collect(mBody, {
        amount: order.totalRs || order.total,
        item: order.plan,
        orderId: "new order"
      }, function (tid) {
        order.tid = tid;
        order.payment = "pending";
        var saved = S.saveOrder(order);
        var payload = S.orderPayload(saved);
        payload["Transaction ID"] = tid;
        var btn = mBody.querySelector("#svc-submit");
        var msg = mBody.querySelector("#svc-msg");
        if (btn) { btn.disabled = true; btn.textContent = "Placing order..."; }
        S.sendOrderEmail(payload).then(function (data) {
          var ok = data && (data.success === "true" || data.success === true);
          showDone(saved, ok);
        }).catch(function () {
          showDone(saved, false);
        });
      });
    });
    openModal();
  }

  /* ---------- step 3: done + WhatsApp report ---------- */
  function showDone(order, emailed) {
    mTitle.textContent = "Order placed! 🎉";
    mBody.innerHTML =
      '<div class="order-summary">✅ Order <strong>' + esc(order.id) + "</strong> received!<br>" +
      '<span class="muted">' + esc(order.plan) + " · <strong>" + esc(order.total) + "</strong></span><br>" +
      '<span class="pur-badge pur-pending">💰 Payment pending verification (TID ' + esc(order.tid || "—") + ")</span></div>" +
      (emailed
        ? '<p>We verify your JazzCash payment within minutes, then start work on your order.</p>'
        : '<p>⚠️ Email confirmation had an issue, but your order is saved. Please send it to us on WhatsApp below so we can process it.</p>') +
      S.waReportBtn(order) +
      '<p class="tiny muted center" style="margin-top:12px;">Track this order any time in <a href="purchases.html">🧾 My Purchases</a>.</p>';
    openModal();
  }

  /* ---------- live search: filter cards, hide empty categories ---------- */
  var sInput = document.getElementById("svc-search");
  var sNoResult = document.getElementById("svc-noresult");
  if (sInput) {
    sInput.addEventListener("input", function () {
      var q = sInput.value.trim().toLowerCase();
      var totalVisible = 0;
      document.querySelectorAll(".svc-cat").forEach(function (sec) {
        var visible = 0;
        sec.querySelectorAll(".msvc").forEach(function (card) {
          var hay = ((card.getAttribute("data-service") || "") + " " + card.textContent).toLowerCase();
          var show = !q || hay.indexOf(q) !== -1;
          card.style.display = show ? "" : "none";
          if (show) visible++;
        });
        sec.style.display = visible ? "" : "none";
        totalVisible += visible;
      });
      if (sNoResult) sNoResult.hidden = !(q && !totalVisible);
    });
  }

  /* ---------- wire up cards ---------- */
  document.querySelectorAll(".msvc").forEach(function (card) {
    var btn = card.querySelector(".quote-btn, .plan-btn");
    if (!btn) return;
    btn.className = "plan-btn";
    btn.removeAttribute("target");
    btn.removeAttribute("rel");
    btn.setAttribute("href", "#");
    btn.textContent = "View Plans";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      showPlans(card);
    });
  });
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
