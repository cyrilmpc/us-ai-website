/* US AI App Development Studio — free templates + paid custom apps, ~15 min delivery */
(function () {
  "use strict";

  var TEMPLATES = [
    { name: "Todo App", icon: "✅", desc: "Tasks with save, tick-done & delete", file: "apps/templates/todo.html", tags: "todo task list reminder" },
    { name: "Calculator", icon: "🧮", desc: "Full calculator with % and backspace", file: "apps/templates/calculator.html", tags: "calculator calc math" },
    { name: "Stopwatch", icon: "⏱️", desc: "Timer with lap times", file: "apps/templates/stopwatch.html", tags: "stopwatch timer clock lap" },
    { name: "Sticky Notes", icon: "📝", desc: "Auto-saving sticky notes", file: "apps/templates/notes.html", tags: "notes sticky memo write" },
    { name: "Quiz Game", icon: "🎯", desc: "5-question quiz with live score", file: "apps/templates/quiz.html", tags: "quiz game questions trivia" },
    { name: "Expense Tracker", icon: "💰", desc: "Track spending in Rs, auto total", file: "apps/templates/expense.html", tags: "expense money budget finance" },
    { name: "Password Generator", icon: "🔐", desc: "Strong secure passwords, copy in 1 tap", file: "apps/templates/password.html", tags: "password generator secure strong login" },
    { name: "Unit Converter", icon: "📏", desc: "Length, weight & temperature instantly", file: "apps/templates/converter.html", tags: "converter unit length weight temperature metric imperial" },
    { name: "BMI Calculator", icon: "⚖️", desc: "Body mass index with healthy range", file: "apps/templates/bmi.html", tags: "bmi calculator health weight body mass" }
  ];

  /* Prices set after Oct 2026 market check: Fiverr simple app gigs start ~$100 (Rs 28,000),
     standard $300-450. Our prices stay ~3x cheaper with 15-min delivery. */
  var PLANS = [
    { id: "free", name: "Free Custom App", price: 0, desc: "Simple custom app — completely free", feats: ["1 simple page, with your details", "Only 1 free app per account", "Login required", "Delivery ~15 min — panel + email"] },
    { id: "simple", name: "Simple App", price: 9999, desc: "Single-page polished app", feats: ["1 polished page", "Calculator / todo / landing jaisi apps", "Mobile responsive + animations", "Delivery ~15 min — panel + email"] },
    { id: "standard", name: "Standard App", price: 19999, pop: true, desc: "Multi-feature app", feats: ["Quiz / tracker / booking type apps", "Data save + multi sections", "Premium design + animations", "Delivery ~15 min — panel + email"] },
    { id: "premium", name: "Premium App", price: 39999, desc: "Advanced custom app", feats: ["Dashboard / multi-section app", "Advanced features & logic", "Custom premium design", "Priority build — panel + email"] }
  ];

  var APP_TYPES = ["Business", "Game", "Tool / Utility", "Education", "Health & Fitness", "Finance", "Shopping", "Other"];
  var DESIGN_STYLES = ["Dark (modern)", "Light (clean)", "Colorful (playful)", "Simple (minimal)"];
  var THEME_COLORS = ["Purple/Blue", "Green", "Orange", "Pink", "Teal"];
  var APP_LANGS = ["English", "Urdu", "Both"];
  var FEATURE_OPTS = ["Login screen", "Data save in browser", "Multiple pages", "Animations", "Search box", "Share button", "Reminder / notifications", "Charts / stats"];

  var LS_ORDERS = "sawalai_app_orders";
  var OWNER_WA = "923254746678";
  var OWNER_EMAIL = "4de22205ccafca608a7c4a00e6a34c92";

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
  function getOrders() { try { return JSON.parse(localStorage.getItem(LS_ORDERS) || "[]"); } catch (e) { return []; } }
  function saveOrders(o) { try { localStorage.setItem(LS_ORDERS, JSON.stringify(o)); } catch (e) {} }
  function toast(m) { var t = $("app-toast"); if (!t) return; t.textContent = m; t.classList.add("show"); setTimeout(function () { t.classList.remove("show"); }, 2600); }
  function currentUser() { return (window.SawalPay && window.SawalPay.currentUser) ? window.SawalPay.currentUser() : null; }
  function rs(n) { var v = Math.round(n) / 280; return "$" + (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(2)); }
  function newId() { var c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", s = ""; for (var i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)]; return "APP-" + s; }

  var activeCat = "all";

  /* ---------- free templates grid ---------- */
  function renderGrid() {
    var grid = $("app-grid"); if (!grid) return;
    var q = ($("app-search").value || "").trim().toLowerCase();
    grid.innerHTML = "";
    var shown = 0;
    TEMPLATES.forEach(function (t) {
      if (activeCat === "paid") return;
      if (q && (t.name + " " + t.desc + " " + t.tags).toLowerCase().indexOf(q) === -1) return;
      var d = document.createElement("div");
      d.className = "app-card";
      d.innerHTML = '<div class="app-ico">' + t.icon + '</div><span class="app-tag tag-free">FREE</span><h4>' + esc(t.name) + '</h4><div class="app-desc">' + esc(t.desc) + '</div>';
      var b = document.createElement("button");
      b.className = "app-get"; b.type = "button"; b.textContent = "Get Free App";
      b.addEventListener("click", function () { getFree(t); });
      d.appendChild(b);
      grid.appendChild(d);
      shown++;
    });
    if (!shown && activeCat !== "paid") {
      var p = document.createElement("p"); p.className = "app-empty";
      p.textContent = q ? "No free template by this name — order a custom app under paid plans below." : "No templates.";
      grid.appendChild(p);
    }
    $("app-free-wrap").style.display = activeCat === "paid" ? "none" : "";
    $("app-paid-wrap").style.display = activeCat === "free" ? "none" : "";
  }

  function getFree(t) {
    var u = currentUser();
    if (!u) { toast("Please log in first — then you will get the free app."); if (window.SawalPay) window.SawalPay.requireLogin($("app-list")); return; }
    window.open(t.file, "_blank");
    toast("✅ " + t.name + " is now open — enjoy!");
  }

  /* ---------- paid plans ---------- */
  function renderPlans() {
    var wrap = $("app-plans"); if (!wrap) return;
    wrap.innerHTML = "";
    PLANS.forEach(function (p) {
      var d = document.createElement("div");
      d.className = "app-plan" + (p.pop ? " pop" : "");
      var feats = p.feats.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("");
      d.innerHTML = (p.pop ? '<span class="app-ribbon">MOST POPULAR</span>' : "") +
        '<h3>' + esc(p.name) + '</h3><div class="tiny" style="color:#8b90b8;">' + esc(p.desc) + '</div>' +
        '<div class="app-price">' + rs(p.price) + '</div><ul>' + feats + '</ul>';
      var b = document.createElement("button");
      b.className = "app-get"; b.type = "button"; b.textContent = "Order " + p.name;
      b.addEventListener("click", function () { openOrder(p); });
      d.appendChild(b);
      wrap.appendChild(d);
    });
  }

  /* ---------- order modal (rich panel) ---------- */
  function openOrder(plan) {
    var u = currentUser();
    if (plan.id === "free" && u) {
      var mine = getOrders().filter(function (o) { return o.account === u.email && o.plan === "Free Custom App"; });
      if (mine.length) { toast("You already have 1 free custom app — get more with a paid plan."); return; }
    }
    var body = $("app-order-body");
    var featBoxes = FEATURE_OPTS.map(function (f, i) {
      return '<label style="display:inline-flex;align-items:center;gap:6px;background:#0a0d22;border:1px solid rgba(99,102,241,.3);border-radius:999px;padding:7px 14px;font-size:.82rem;cursor:pointer;"><input type="checkbox" name="feat" value="' + esc(f) + '"> ' + esc(f) + '</label>';
    }).join(" ");
    var priceLine = plan.price === 0 ? "FREE" : rs(plan.price);
    body.innerHTML =
      '<h3 style="margin:0 0 4px;color:#fff;">Order: ' + esc(plan.name) + ' — ' + priceLine + '</h3>' +
      '<p class="tiny" style="color:#8b90b8;margin:0 0 6px;">⏱️ Delivery target: <b>~15 minutes</b> — the app will arrive in your <b>📦 My Apps panel</b> + by <b>email</b>.</p>' +
      '<div id="app-order-msg"></div>' +
      '<form id="app-order-form">' +
      '<label class="app-fld"><span>App type *</span><select name="apptype" required>' +
      APP_TYPES.map(function (t) { return '<option>' + t + '</option>'; }).join("") + '</select></label>' +
      '<label class="app-fld"><span>Platform</span><select name="platform"><option>Web App — runs on phone + computer</option></select></label>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
      '<label class="app-fld"><span>Design style</span><select name="style">' + DESIGN_STYLES.map(function (t) { return '<option>' + t + '</option>'; }).join("") + '</select></label>' +
      '<label class="app-fld"><span>Theme color</span><select name="color">' + THEME_COLORS.map(function (t) { return '<option>' + t + '</option>'; }).join("") + '</select></label></div>' +
      '<label class="app-fld"><span>App language</span><select name="applang">' + APP_LANGS.map(function (t) { return '<option>' + t + '</option>'; }).join("") + '</select></label>' +
      '<div class="app-fld"><span>Choose features (as many as you like)</span><div style="display:flex;flex-wrap:wrap;gap:8px;">' + featBoxes + '</div></div>' +
      '<label class="app-fld"><span>App name *</span><input name="appname" required maxlength="60" placeholder="e.g. My Cricket Scores"></label>' +
      '<label class="app-fld"><span>What kind of app do you want? Describe in detail *</span><textarea name="details" required maxlength="800" placeholder="e.g. I want a simple app like live cricket scores, showing team names + scores…"></textarea></label>' +
      '<label class="app-fld"><span>Your name *</span><input name="name" required maxlength="60"></label>' +
      '<label class="app-fld"><span>Email * (your app link will be sent here too)</span><input name="email" type="email" required maxlength="80"></label>' +
      '<label class="app-fld"><span>WhatsApp number *</span><input name="whatsapp" required maxlength="20" placeholder="03xx-xxxxxxx"></label>' +
      '<button class="app-submit" type="submit" id="app-order-btn">' + (plan.price === 0 ? "Get My FREE App 🎁" : "Continue to Payment (" + rs(plan.price) + ")") + '</button></form>';
    $("app-order-modal").classList.add("open");
    if (u) { var f = $("app-order-form"); if (f.email) f.email.value = u.email || ""; if (f.name && u.name) f.name.value = u.name; }
    $("app-order-form").addEventListener("submit", function (e) {
      e.preventDefault();
      submitOrder(plan, new FormData(e.target), $("app-order-btn"), $("app-order-msg"));
    });
  }
  function closeOrder() { $("app-order-modal").classList.remove("open"); }
  $("app-order-close").addEventListener("click", closeOrder);
  $("app-order-modal").addEventListener("click", function (e) { if (e.target === this) closeOrder(); });

  function submitOrder(plan, fd, btn, msgEl) {
    var u = currentUser();
    if (!u) { msgEl.innerHTML = ""; window.SawalPay.requireLogin(msgEl); return; }
    var feats = [];
    try { feats = fd.getAll("feat"); } catch (e) { var fl = document.querySelectorAll('input[name="feat"]:checked'); for (var i = 0; i < fl.length; i++) feats.push(fl[i].value); }
    var order = {
      id: newId(), kind: "App Development", plan: plan.name,
      apptype: fd.get("apptype"), platform: fd.get("platform"), style: fd.get("style"),
      color: fd.get("color"), applang: fd.get("applang"), features: feats.join(", ") || "—",
      appname: fd.get("appname"), details: fd.get("details"),
      name: fd.get("name"), email: fd.get("email"), whatsapp: fd.get("whatsapp"),
      total: plan.price === 0 ? "FREE" : rs(plan.price), account: u.email, date: new Date().toISOString()
    };
    if (plan.price === 0) {
      order.tid = "FREE"; order.payment = "free";
      finalize(order, btn, msgEl);
      return;
    }
    window.SawalPay.collect(msgEl, { amount: order.total, item: "Custom App — " + plan.name, orderId: order.id }, function (tid) {
      order.tid = tid; order.payment = "pending";
      finalize(order, btn, msgEl);
    });
  }

  function finalize(order, btn, msgEl) {
    var all = getOrders(); all.unshift(order); saveOrders(all);
    btn.disabled = true; btn.textContent = "Placing order...";
    var payload = {
      _subject: "App Development Request " + order.id,
      "Order ID": order.id, "Plan": order.plan + " (" + order.total + ")",
      "App Type": order.apptype, "Platform": order.platform, "Design Style": order.style,
      "Theme Color": order.color, "App Language": order.applang, "Features": order.features,
      "App Name": order.appname,
      "Details": order.details, "Name": order.name, "Email": order.email,
      "WhatsApp": order.whatsapp, "Account": order.account,
      "Transaction ID": order.tid,
      "Payment": order.payment === "free" ? "FREE plan — no payment needed" : ("JazzCash TID " + order.tid + " — pending verification")
    };
    var dests = [OWNER_EMAIL, "rehmanmaher500@gmail.com"];
    Promise.all(dests.map(function (em) {
      return fetch("https://formsubmit.co/ajax/" + em, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(payload) })
        .then(function (r) { return r.ok ? r.json() : { success: false }; }).catch(function () { return { success: false }; });
    })).then(function (rs2) {
      btn.disabled = false; btn.textContent = "Order placed ✓"; closeOrder(); renderMyApps();
      var ok = rs2.some(function (r) { return r && (r.success === "true" || r.success === true); });
      toast(ok ? "✅ Order " + order.id + " received! It will arrive in your 📦 My Apps panel + by email in ~15 min." : "⚠️ Order saved — send it on WhatsApp.");
    }).catch(function () {
      btn.disabled = false; closeOrder(); renderMyApps();
      toast("⚠️ Order saved — send it on WhatsApp.");
    });
  }

  /* ---------- My Apps box ---------- */
  var queueCache = null;
  function fetchQueue(cb) {
    fetch("data/app-queue.json", { cache: "no-store" }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { queueCache = j && j.orders ? j.orders : {}; cb(); })
      .catch(function () { queueCache = {}; cb(); });
  }
  function renderMyApps() {
    var box = $("app-list"); if (!box) return;
    var u = currentUser();
    if (!u) { box.innerHTML = '<p class="wb-empty">🔒 Log in to see your apps.</p>'; return; }
    box.innerHTML = '<p class="wb-empty">Loading…</p>';
    fetchQueue(function () {
      var mine = getOrders().filter(function (o) { return o.account === u.email; });
      if (!mine.length) { box.innerHTML = '<p class="wb-empty">No app ordered yet — grab a free template above or order a custom app.</p>'; return; }
      box.innerHTML = "";
      mine.forEach(function (o) {
        var q = queueCache[o.id] || {};
        var st = q.status || "queued";
        var stLabel = st === "ready" ? "✅ Ready" : (st === "building" ? "🔨 Building…" : "⏳ Queued");
        var stCls = st === "ready" ? "wb-ready" : (st === "building" ? "wb-building" : "wb-queued");
        var d = document.createElement("div");
        d.className = "wb-card";
        var linkRow = st === "ready" && q.url
          ? '<div class="wb-linkrow"><a class="app-open" href="' + esc(q.url) + '" target="_blank">📱 Open My App</a></div>'
          : '<div class="wb-linkrow"><span class="tiny" style="color:#8b90b8;">⏱️ Target: ~15 min — the Open button will appear here as soon as it\'s ready.</span></div>';
        d.innerHTML = '<div class="wb-cardhead">📱 <b>' + esc(o.appname || o.plan) + '</b> <span class="wb-st ' + stCls + '">' + stLabel + '</span></div>' +
          '<div class="wb-meta">' + esc(o.id) + ' · ' + esc(o.plan) + ' (' + esc(o.total) + ') · ' + esc(o.apptype || "") + '</div>' + linkRow;
        box.appendChild(d);
      });
    });
  }

  /* ---------- search + pills ---------- */
  $("app-search").addEventListener("input", renderGrid);
  $("app-pills").addEventListener("click", function (e) {
    var b = e.target.closest(".app-pill"); if (!b) return;
    activeCat = b.getAttribute("data-cat");
    var all = this.querySelectorAll(".app-pill");
    for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
    b.classList.add("active");
    renderGrid();
  });

  /* ---------- free search hint: describe -> suggest paid ---------- */
  renderGrid();
  renderPlans();
  renderMyApps();
  setInterval(renderMyApps, 60000);
})();

  /* ---------- Visitor country dial code for WhatsApp field ---------- */
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
