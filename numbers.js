/* numbers.js — Buy Real Numbers shop: 63 country cards, plans modal,
   login-gated ordering via FormSubmit, My Numbers tracker (premium-numbers.json). */
(function () {
  'use strict';

  var COUNTRIES = [
    { name: 'USA', flag: '🇺🇸', cc: 'us' }, { name: 'UK', flag: '🇬🇧', cc: 'gb' },
    { name: 'Pakistan', flag: '🇵🇰', cc: 'pk' }, { name: 'Canada', flag: '🇨🇦', cc: 'ca' },
    { name: 'Germany', flag: '🇩🇪', cc: 'de' }, { name: 'France', flag: '🇫🇷', cc: 'fr' },
    { name: 'UAE', flag: '🇦🇪', cc: 'ae' }, { name: 'Saudi Arabia', flag: '🇸🇦', cc: 'sa' },
    { name: 'India', flag: '🇮🇳', cc: 'in' }, { name: 'Australia', flag: '🇦🇺', cc: 'au' },
    { name: 'Netherlands', flag: '🇳🇱', cc: 'nl' }, { name: 'Spain', flag: '🇪🇸', cc: 'es' },
    { name: 'Italy', flag: '🇮🇹', cc: 'it' }, { name: 'Turkey', flag: '🇹🇷', cc: 'tr' },
    { name: 'South Korea', flag: '🇰🇷', cc: 'kr' },
    { name: 'Singapore', flag: '🇸🇬', cc: 'sg', note: 'High-demand hub · private +65 number · codes appear right here on US AI' },
    { name: 'Malaysia', flag: '🇲🇾', cc: 'my' }, { name: 'Indonesia', flag: '🇮🇩', cc: 'id' },
    { name: 'Philippines', flag: '🇵🇭', cc: 'ph' }, { name: 'Bangladesh', flag: '🇧🇩', cc: 'bd' },
    { name: 'Nigeria', flag: '🇳🇬', cc: 'ng' }, { name: 'South Africa', flag: '🇿🇦', cc: 'za' },
    { name: 'Brazil', flag: '🇧🇷', cc: 'br' }, { name: 'Mexico', flag: '🇲🇽', cc: 'mx' },
    { name: 'Russia', flag: '🇷🇺', cc: 'ru' }, { name: 'Ukraine', flag: '🇺🇦', cc: 'ua' },
    { name: 'Japan', flag: '🇯🇵', cc: 'jp' }, { name: 'China', flag: '🇨🇳', cc: 'cn' },
    { name: 'Vietnam', flag: '🇻🇳', cc: 'vn' }, { name: 'Thailand', flag: '🇹🇭', cc: 'th' },
    { name: 'Taiwan', flag: '🇹🇼', cc: 'tw' }, { name: 'Hong Kong', flag: '🇭🇰', cc: 'hk' },
    { name: 'New Zealand', flag: '🇳🇿', cc: 'nz' }, { name: 'Ireland', flag: '🇮🇪', cc: 'ie' },
    { name: 'Sweden', flag: '🇸🇪', cc: 'se' }, { name: 'Poland', flag: '🇵🇱', cc: 'pl' },
    { name: 'Argentina', flag: '🇦🇷', cc: 'ar' }, { name: 'Chile', flag: '🇨🇱', cc: 'cl' },
    { name: 'Colombia', flag: '🇨🇴', cc: 'co' }, { name: 'Peru', flag: '🇵🇪', cc: 'pe' },
    { name: 'Egypt', flag: '🇪🇬', cc: 'eg' }, { name: 'Kazakhstan', flag: '🇰🇿', cc: 'kz' },
    { name: 'Romania', flag: '🇷🇴', cc: 'ro' }, { name: 'Austria', flag: '🇦🇹', cc: 'at' },
    { name: 'Belgium', flag: '🇧🇪', cc: 'be' }, { name: 'Switzerland', flag: '🇨🇭', cc: 'ch' },
    { name: 'Norway', flag: '🇳🇴', cc: 'no' }, { name: 'Denmark', flag: '🇩🇰', cc: 'dk' },
    { name: 'Finland', flag: '🇫🇮', cc: 'fi' }, { name: 'Portugal', flag: '🇵🇹', cc: 'pt' },
    { name: 'Greece', flag: '🇬🇷', cc: 'gr' }, { name: 'Israel', flag: '🇮🇱', cc: 'il' },
    { name: 'Qatar', flag: '🇶🇦', cc: 'qa' }, { name: 'Kuwait', flag: '🇰🇼', cc: 'kw' },
    { name: 'Oman', flag: '🇴🇲', cc: 'om' }, { name: 'Jordan', flag: '🇯🇴', cc: 'jo' },
    { name: 'Nepal', flag: '🇳🇵', cc: 'np' }, { name: 'Sri Lanka', flag: '🇱🇰', cc: 'lk' },
    { name: 'Czechia', flag: '🇨🇿', cc: 'cz' }, { name: 'Hungary', flag: '🇭🇺', cc: 'hu' },
    { name: 'Serbia', flag: '🇷🇸', cc: 'rs' }, { name: 'Croatia', flag: '🇭🇷', cc: 'hr' },
    { name: 'Cambodia', flag: '🇰🇭', cc: 'kh' }
  ];

  // id, display name, short desc, price Rs, service value for provisioning cron
  var PLANS = [
    { id: 'wa-otp', name: 'WhatsApp OTP', desc: 'Private number · receive one WhatsApp verification code', price: 1499, service: 'WhatsApp' },
    { id: 'gmail-otp', name: 'Gmail OTP', desc: 'Private number · receive one Google/Gmail verification code', price: 1499, service: 'Google / Gmail' },
    { id: 'tg-otp', name: 'Telegram OTP', desc: 'Private number · receive one Telegram verification code', price: 1499, service: 'Telegram' },
    { id: 'any-otp', name: 'Any App OTP', desc: 'Private number · receive one verification code from any app', price: 1299, service: 'Any / Other' },
    { id: 'rent7', name: '7-Day Rental', desc: 'Your own number for 7 days · unlimited OTP codes, any app', price: 7999, service: 'Any / Other' },
    { id: 'rent30', name: '30-Day Rental', desc: 'Your own number for 30 days · unlimited OTP codes, any app', price: 19999, service: 'Any / Other' }
  ];

  var PN_LS = 'pn_orders';
  var pnQueue = {};
  var selCountry = null, selPlan = null;

  function $(id) { return document.getElementById(id); }
  function usd(n) { var v = Number(n || 0) / 280; return "$" + (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(2)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function toast(msg) {
    var t = $('num-toast');
    if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function pnGet() { try { return JSON.parse(localStorage.getItem(PN_LS) || '[]'); } catch (e) { return []; } }
  function pnSave(r) { try { localStorage.setItem(PN_LS, JSON.stringify(r)); } catch (e) {} }
  function pnId() {
    return 'PN-' + Date.now().toString(36).toUpperCase().slice(-6) +
      Math.random().toString(36).slice(2, 5).toUpperCase();
  }
  function extractCodes(text) {
    var found = [], seen = {};
    String(text || '').replace(/\b\d{4,8}\b/g, function (m) {
      if (!seen[m]) { seen[m] = 1; found.push(m); }
      return m;
    });
    return found.slice(0, 6);
  }
  function currentUser() {
    var S = window.SawalShop;
    return S && S.currentUser ? S.currentUser() : null;
  }

  /* ---------- country cards ---------- */
  function renderCards(filter) {
    var grid = $('num-grid');
    var q = (filter || '').trim().toLowerCase();
    var list = COUNTRIES.filter(function (c) { return !q || c.name.toLowerCase().indexOf(q) !== -1; });
    if (!list.length) {
      grid.innerHTML = '<p class="num-empty">No country found — try another search.</p>';
      return;
    }
    grid.innerHTML = list.map(function (c, i) {
      return '<div class="num-card" data-idx="' + COUNTRIES.indexOf(c) + '" role="button" tabindex="0" aria-label="View plans for ' + esc(c.name) + '">' +
        '<span class="num-flag" style="position:relative">' + c.flag + '<img src="img/flags/' + c.cc + '.png" alt="' + esc(c.name) + ' flag" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain" onerror="this.remove()">' + '</span>' +
        '<h4>' + esc(c.name) + '</h4>' +
        '<div class="num-from">OTP from ' + usd(1299) + '</div>' +
        '<button type="button" class="num-view">View Plans →</button></div>';
    }).join('');
    Array.prototype.forEach.call(grid.querySelectorAll('.num-card'), function (card) {
      function open() { openPlans(COUNTRIES[parseInt(card.getAttribute('data-idx'), 10)]); }
      card.addEventListener('click', open);
      card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  /* ---------- plans modal ---------- */
  function openPlans(country) {
    selCountry = country;
    $('num-plan-title').textContent = country.flag + ' ' + country.name + ' — Choose a plan';
    $('num-plan-sub').textContent = 'Private real number · codes appear right here on US AI';
    var _noteEl = document.getElementById('num-country-note');
    if (country.note) {
      if (!_noteEl) {
        _noteEl = document.createElement('div');
        _noteEl.id = 'num-country-note';
        _noteEl.className = 'num-country-note';
        _noteEl.style.cssText = 'font-size:12px;color:#9aa0c3;margin:-8px 0 10px;text-align:center;';
        var _sub = $('num-plan-sub');
        _sub.parentNode.insertBefore(_noteEl, _sub.nextSibling);
      }
      _noteEl.textContent = country.note;
      _noteEl.style.display = '';
    } else if (_noteEl) {
      _noteEl.style.display = 'none';
    }
    $('num-plan-list').innerHTML = PLANS.map(function (p) {
      return '<div class="num-plan">' +
        '<div><div class="np-name">' + esc(p.name) + '</div><div class="np-desc">' + esc(p.desc) + '</div></div>' +
        '<div style="text-align:right;"><div class="np-price">' + usd(p.price) + '</div>' +
        '<button type="button" class="num-buy" data-plan="' + p.id + '">Buy →</button></div></div>';
    }).join('');
    Array.prototype.forEach.call($('num-plan-list').querySelectorAll('.num-buy'), function (btn) {
      btn.addEventListener('click', function () {
        var p = null;
        PLANS.forEach(function (x) { if (x.id === btn.getAttribute('data-plan')) p = x; });
        if (p) startOrder(p);
      });
    });
    $('num-plan-modal').classList.add('open');
  }

  /* ---------- order modal ---------- */
  function startOrder(plan) {
    selPlan = plan;
    var user = currentUser();
    var body = $('num-order-body');
    if (!user) {
      /* guest UX: remember the country+plan and send the guest back after login */
      var next = "";
      try { next = "?next=" + encodeURIComponent(location.pathname + location.search); } catch (e) {}
      try { sessionStorage.setItem("num_pending", JSON.stringify({ ci: COUNTRIES.indexOf(selCountry), pid: plan.id })); } catch (e) {}
      body.innerHTML = '<h3 style="color:#fff;margin:0 0 8px;">🔒 Login Required</h3>' +
        '<p class="muted">Only logged-in members can buy premium numbers. Your selection <b style="color:#fff;">' + esc(plan.name) + '</b> for <b style="color:#fff;">' + esc(selCountry ? selCountry.name : '') + '</b> is saved — after login you will come straight back here to finish your order.</p>' +
        '<p style="margin-top:16px;"><a class="btn btn-primary btn-glow" href="account.html' + next + '">Login / Create Free Account →</a></p>';
    } else {
      body.innerHTML = '<h3 style="color:#fff;margin:0 0 4px;">🛒 Order: ' + esc(plan.name) + '</h3>' +
        '<p class="tiny" style="color:#8b90b8;margin:0 0 6px;">' + selCountry.flag + ' ' + esc(selCountry.name) + ' · <b style="color:#ffd166;">' + usd(plan.price) + '</b></p>' +
        '<form id="num-order-form">' +
        '<label class="num-fld"><span>Your name</span><input type="text" id="no-name" value="' + esc(user.name || '') + '" placeholder="Full name" required autocomplete="name" autocapitalize="words"></label>' +
        '<label class="num-fld"><span>Email</span><input type="email" id="no-email" value="' + esc(user.email || '') + '" required autocomplete="email" autocapitalize="none"></label>' +
        '<label class="num-fld"><span>WhatsApp number (for payment &amp; delivery updates)</span><input type="text" id="no-wa" name="whatsapp" placeholder="+1 ..." required inputmode="tel" autocomplete="tel"></label>' +
        '<button type="submit" class="num-submit" id="no-submit">✅ Confirm Order — ' + usd(plan.price) + '</button>' +
        '<p class="tiny" style="color:#8b90b8;text-align:center;">We activate your number after payment confirmation.</p>' +
        '</form><div id="no-wa-row"></div>';
      $('num-order-form').addEventListener('submit', submitOrder);
    }
    $('num-plan-modal').classList.remove('open');
    $('num-order-modal').classList.add('open');
  }

  function submitOrder(e) {
    e.preventDefault();
    var user = currentUser();
    if (!user || !selPlan || !selCountry) return;
    var wa = $('no-wa').value.trim();
    var name = $('no-name').value.trim();
    var email = $('no-email').value.trim();
    if (!wa || !name || !email) { toast('Please fill all fields'); return; }
    var id = pnId();
    var order = {
      id: id, plan: selPlan.name, price: String(selPlan.price),
      service: selPlan.service, country: selCountry.name,
      whatsapp: wa, email: email, name: name,
      date: new Date().toLocaleString()
    };
    /* JazzCash payment + TID before finalizing */
    window.SawalPay.collect($('num-order-body'), {
      amount: selPlan.price,
      item: selPlan.name + ' — ' + selCountry.name,
      orderId: id
    }, function (tid) {
      order.tid = tid;
      order.payment = 'pending';
      finalizeNumberOrder(order, id);
    });
  }

  function finalizeNumberOrder(order, id) {
    var btn = $('no-submit');
    var payload = {
      _subject: 'Premium Number Order ' + id + ' — ' + selPlan.name + ' ' + selCountry.name + ' Rs ' + selPlan.price,
      _template: 'table',
      'Order ID': id, 'Plan': selPlan.name, 'Price Rs': String(selPlan.price),
      'Service': selPlan.service, 'Country': selCountry.name,
      'WhatsApp': order.whatsapp, 'Email': order.email, 'Name': order.name, 'Date': order.date,
      'Transaction ID': order.tid, 'Payment': window.SawalPay.payLine(order.tid)
    };
    /* order email goes to BOTH owner inboxes (crons read the first; user reads the second) */
    var dests = ['cyrilmp4665@gmail.com', 'rehmanmaher500@gmail.com'];
    var ps = dests.map(function (em) {
      return fetch('https://formsubmit.co/ajax/' + em, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .catch(function () { return { success: false }; });
    });
    Promise.all(ps)
    .then(function () {
      var orders = pnGet(); orders.push(order); pnSave(orders);
      var waText = '💎 *New Number Order ' + id + '*%0A' +
        'Plan: ' + encodeURIComponent(selPlan.name) + ' (Rs ' + selPlan.price + ')%0A' +
        'Country: ' + encodeURIComponent(selCountry.name) + '%0A' +
        'Name: ' + encodeURIComponent(order.name) + '%0A' +
        'WhatsApp: ' + encodeURIComponent(order.whatsapp) + '%0A' +
        'JazzCash TID: ' + encodeURIComponent(order.tid);
      $('num-order-body').innerHTML = '<h3 style="color:#6ee7b7;margin:0 0 8px;">✅ Order received!</h3>' +
        '<p class="muted">Order <b>' + esc(id) + '</b> — ' + esc(selPlan.name) + ' (' + esc(selCountry.name) + ').</p>' +
        '<p><span class="pur-badge pur-pending">💰 Payment pending verification (TID ' + esc(order.tid) + ')</span></p>' +
        '<p class="muted">Your number will appear in <b>My Numbers</b> once payment is verified &amp; activated. Track everything in <a href="purchases.html">🧾 My Purchases</a>.</p>' +
        '<p><a class="num-wa" href="https://wa.me/923254746678?text=' + waText + '" target="_blank" rel="noopener">📲 Send WhatsApp Alert</a></p>' +
        '<p class="tiny" style="color:#8b90b8;">Tap above to alert us instantly on WhatsApp for faster activation.</p>';
      pnRender(); pnPoll();
      toast('Order sent ✓');
      var sec = $('num-my');
      if (sec) sec.scrollIntoView({ behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth") });
    }).catch(function () {
      toast('⚠️ Could not send — check connection and try again');
    });
  }

  /* ---------- My Numbers tracker ---------- */
  var PN_NAMES = { otp: 'One-Time OTP Number', rent7: '7-Day Rental', rent30: '30-Day Rental' };

  function pnFetchQueue() {
    return fetch('premium-numbers.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : { orders: {} }; })
      .then(function (d) { pnQueue = (d && d.orders) || {}; return pnQueue; })
      .catch(function () { return pnQueue; });
  }
  function pnStatusBadge(id) {
    var q = pnQueue[id] || {};
    if (q.status === 'active') return '<span class="wb-st wb-ready">✅ Active</span>';
    if (q.status === 'processing') return '<span class="wb-st wb-building">🔨 Activating…</span>';
    if (q.status === 'expired') return '<span class="wb-st wb-queued">⌛ Expired</span>';
    return '<span class="wb-st wb-queued">📨 Order received</span>';
  }
  function pnRender() {
    var wrap = $('num-list');
    if (!wrap) return;
    var user = currentUser();
    if (!user) { wrap.innerHTML = '<p class="wb-empty">🔒 Login to see your numbers.</p>'; return; }
    var orders = pnGet();
    if (!orders.length) { wrap.innerHTML = '<p class="wb-empty">No premium numbers yet — pick a country above to order.</p>'; return; }
    wrap.innerHTML = orders.slice().reverse().map(function (o) {
      var q = pnQueue[o.id] || {};
      var planName = PN_NAMES[o.plan] || o.plan;
      var body = '';
      if (q.status === 'active' && q.number) {
        var sms = (q.sms || []).slice().reverse().map(function (m) {
          var codes = extractCodes(m.text);
          var codeHtml = codes.length
            ? ' <button type="button" class="tm-code" data-code="' + esc(codes[0]) + '">' + esc(codes[0]) + ' 📋</button>' : '';
          return '<div class="pn-sms"><span class="pn-from">' + esc(m.from || 'SMS') + ' · ' + esc(m.time || '') + '</span>' +
            '<div class="pn-text">' + esc(m.text) + '</div>' + codeHtml + '</div>';
        }).join('') || '<p class="wb-empty">📭 No SMS yet — your codes will appear here automatically.</p>';
        body = '<div style="margin:10px 0;"><span class="pn-num">' + esc(q.number) + '</span> ' +
          '<button type="button" class="btn-tm pn-copynum" data-num="' + esc(q.number) + '">📋 Copy</button></div>' +
          '<div>' + sms + '</div>';
      } else if (q.status === 'expired') {
        body = '<span class="wb-wait">This number has expired. Order a new one above.</span>';
      } else {
        body = '<span class="wb-wait">We are activating your private number — it will appear here with live SMS (usually within minutes of payment confirmation).</span>';
      }
      return '<div class="wb-card"><div class="wb-cardhead"><b>' + esc(planName) + '</b> ' + pnStatusBadge(o.id) + '</div>' +
        '<div class="wb-meta">' + esc(o.country || '') + ' · ID: ' + esc(o.id) + ' · ' + usd(parseInt(String(o.price).replace(/[^\d]/g, ""), 10) || 0) + ' · ' + esc(o.date) + '</div>' +
        '<div class="wb-linkrow">' + body + '</div></div>';
    }).join('');
    Array.prototype.forEach.call(wrap.querySelectorAll('.tm-code'), function (b) {
      b.addEventListener('click', function () {
        var code = b.getAttribute('data-code');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code).then(function () { toast('Code copied ✓'); });
        }
      });
    });
    Array.prototype.forEach.call(wrap.querySelectorAll('.pn-copynum'), function (b) {
      b.addEventListener('click', function () {
        var num = b.getAttribute('data-num');
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(num).then(function () { toast('Number copied ✓'); });
        }
      });
    });
  }
  function pnPoll() { if (document.hidden) return; pnFetchQueue().then(pnRender); }

  /* ---------- init ---------- */
  /* ---------- premium plans price grid ---------- */
  function renderPremGrid() {
    var g = $('prem-grid');
    if (!g) return;
    g.innerHTML = PLANS.map(function (p, i) {
      return '<div class="prem-card anim-tilt">' +
        '<div class="pc-name">' + esc(p.name) + '</div>' +
        '<div class="pc-desc">' + esc(p.desc) + '</div>' +
        '<div class="pc-price">' + usd(p.price) + '</div>' +
        '<button type="button" class="pc-buy" data-i="' + i + '">Buy →</button></div>';
    }).join('');
    Array.prototype.forEach.call(g.querySelectorAll('.pc-buy'), function (btn) {
      btn.addEventListener('click', function () {
        var p = PLANS[parseInt(btn.getAttribute('data-i'), 10)];
        // default country = first; user can change in quick panel or country cards
        selCountry = COUNTRIES[0];
        if (p) startOrder(p);
      });
    });
  }

  /* ---------- quick order panel: country + plan selects ---------- */
  function initQuickPanel() {
    var cs = $('qp-country'), ps = $('qp-plan'), buy = $('qp-buy'), sum = $('qp-summary');
    if (!cs || !ps || !buy) return;
    cs.innerHTML = COUNTRIES.map(function (c, i) {
      return '<option value="' + i + '">' + c.flag + ' ' + esc(c.name) + '</option>';
    }).join('');
    ps.innerHTML = PLANS.map(function (p, i) {
      return '<option value="' + i + '">' + esc(p.name) + ' — ' + usd(p.price) + '</option>';
    }).join('');
    /* think-066 2026-10-13: remember last country+plan picks, and show a live
       summary of the current selection (add-only UX polish, no visual change) */
    function qpSave(ci, pi) { try { localStorage.setItem('num_qp', JSON.stringify({ ci: ci, pi: pi })); } catch (e) {} }
    function qpRestore() {
      try {
        var s = JSON.parse(localStorage.getItem('num_qp') || 'null');
        if (s && COUNTRIES[s.ci]) cs.value = String(s.ci);
        if (s && PLANS[s.pi]) ps.value = String(s.pi);
      } catch (e) {}
    }
    function qpSummary() {
      if (!sum) return;
      var c = COUNTRIES[parseInt(cs.value, 10)] || COUNTRIES[0];
      var p = PLANS[parseInt(ps.value, 10)] || PLANS[0];
      sum.textContent = c.flag + ' ' + c.name + ' · ' + p.name + ' — ' + usd(p.price);
    }
    qpRestore(); qpSummary();
    cs.addEventListener('change', function () { qpSave(cs.value, ps.value); qpSummary(); });
    ps.addEventListener('change', function () { qpSave(cs.value, ps.value); qpSummary(); });
    buy.addEventListener('click', function () {
      var c = COUNTRIES[parseInt(cs.value, 10)] || COUNTRIES[0];
      var p = PLANS[parseInt(ps.value, 10)] || PLANS[0];
      selCountry = c;
      startOrder(p);
    });
  }

  /* ---------- request-a-country CTA ---------- */
  function reqCountryInit() {
    var wrap = $('num-req');
    if (!wrap) return;
    var user = currentUser();
    if (!user) {
      wrap.innerHTML = '<p class="tiny" style="color:#8b90b8;margin:0;">🌍 ' +
        'Didn\'t find your country? <a href="account.html">Login</a> to send a country request.</p>';
      return;
    }
    wrap.innerHTML = '<p class="tiny" style="color:#8b90b8;margin:0 0 8px;">🌍 ' +
      'Didn\'t find your country? Send a request — we\'ll try to add it:</p>' +
      '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;align-items:center;">' +
      '<input type="text" id="num-req-name" class="num-search" style="max-width:230px;margin:0;" ' +
      'placeholder="Country name…" aria-label="Country name" maxlength="60">' +
      '<button type="button" class="qp-buy" id="num-req-send" style="margin:0;">📨 Send Request</button></div>';
    $('num-req-send').addEventListener('click', function () {
      var nm = $('num-req-name').value.trim();
      if (!nm) { toast('Please type a country name first'); return; }
      var payload = {
        _subject: 'Country Request — ' + nm,
        _template: 'table',
        'Country requested': nm, 'Name': user.name || '', 'Email': user.email || '',
        'Date': new Date().toISOString().slice(0, 10)
      };
      var dests = ['cyrilmp4665@gmail.com', 'rehmanmaher500@gmail.com'];
      Promise.all(dests.map(function (em) {
        return fetch('https://formsubmit.co/ajax/' + em, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .catch(function () { return { success: false }; });
      })).then(function () {
        toast('Request sent ✓');
        wrap.innerHTML = '<p class="tiny" style="color:#6ee7b7;margin:0;">✅ Thanks! We got your request for <b>' + esc(nm) + '</b>.</p>';
      }).catch(function () { toast('⚠️ Could not send — check connection and try again'); });
    });
  }

  function init() {
    if (!$('num-grid')) return;
    renderCards('');
    renderPremGrid();
    initQuickPanel();
    reqCountryInit();
    var s = $('num-search');
    if (s) s.addEventListener('input', function () { renderCards(s.value); });
    $('num-plan-close').addEventListener('click', function () { $('num-plan-modal').classList.remove('open'); });
    $('num-plan-modal').addEventListener('click', function (e) { if (e.target === $('num-plan-modal')) $('num-plan-modal').classList.remove('open'); });
    $('num-order-close').addEventListener('click', function () { $('num-order-modal').classList.remove('open'); });
    $('num-order-modal').addEventListener('click', function (e) { if (e.target === $('num-order-modal')) $('num-order-modal').classList.remove('open'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        $('num-plan-modal').classList.remove('open');
        $('num-order-modal').classList.remove('open');
      }
    });
    pnRender(); pnPoll();
    setInterval(pnPoll, 30000);
    /* mobile perf: pause polling when tab hidden; re-poll instantly on return so OTP is fresh */
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) { pnPoll(); pollInbox(); }
    });
    resumePending();
  }

  /* guest UX: after login (?next= back), reopen the saved country+plan order */
  function resumePending() {
    var raw = null;
    try { raw = sessionStorage.getItem("num_pending"); } catch (e) {}
    if (!raw || !currentUser()) return;
    var p = null;
    try { p = JSON.parse(raw); } catch (e) {}
    try { sessionStorage.removeItem("num_pending"); } catch (e) {}
    if (!p) return;
    var c = COUNTRIES[parseInt(p.ci, 10)] || null;
    var pl = null;
    PLANS.forEach(function (x) { if (x.id === p.pid) pl = x; });
    if (!c || !pl) return;
    selCountry = c;
    setTimeout(function () { startOrder(pl); }, 600);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* ---------- 🆓 Free Numbers live tool ---------- */
(function () {
  var API = '/api';
  var sel = null, timer = null, lastCount = -1;

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  var FLAGS = {"United States":"🇺🇸","United Kingdom":"🇬🇧","Canada":"🇨🇦","Belgium":"🇧🇪","Sweden":"🇸🇪","Spain":"🇪🇸","Netherlands":"🇳🇱","Germany":"🇩🇪","France":"🇫🇷","Italy":"🇮🇹","Australia":"🇦🇺","India":"🇮🇳","Brazil":"🇧🇷","Mexico":"🇲🇽","Poland":"🇵🇱","Romania":"🇷🇴","Ukraine":"🇺🇦","Indonesia":"🇮🇩","Philippines":"🇵🇭","Malaysia":"🇲🇾","Thailand":"🇹🇭","Vietnam":"🇻🇳","South Africa":"🇿🇦","Turkey":"🇹🇷","South Korea":"🇰🇷","Pakistan":"🇵🇰","Portugal":"🇵🇹","Austria":"🇦🇹","Ireland":"🇮🇪","Norway":"🇳🇴","Denmark":"🇩🇰","Finland":"🇫🇮","Greece":"🇬🇷","Israel":"🇮🇱","Japan":"🇯🇵","Singapore":"🇸🇬","Switzerland":"🇨🇭","Czechia":"🇨🇿","Hungary":"🇭🇺","Argentina":"🇦🇷","Lithuania":"🇱🇹","Latvia":"🇱🇻","Estonia":"🇪🇪","Croatia":"🇭🇷","Serbia":"🇷🇸","Slovenia":"🇸🇮","Slovakia":"🇸🇰","Bulgaria":"🇧🇬","Cyprus":"🇨🇾","Luxembourg":"🇱🇺","Iceland":"🇮🇸","Moldova":"🇲🇩","Georgia":"🇬🇪","Kazakhstan":"🇰🇿","Nigeria":"🇳🇬","Saudi Arabia":"🇸🇦","Russia":"🇷🇺","Azerbaijan":"🇦🇿","Iraq":"🇮🇶","Syria":"🇸🇾","China":"🇨🇳","Hong Kong":"🇭🇰","USA":"🇺🇸","Colombia":"🇨🇴","Malta":"🇲🇹","New Zealand":"🇳🇿","Puerto Rico":"🇵🇷","Taiwan":"🇹🇼","Uzbekistan":"🇺🇿","Czech Republic":"🇨🇿","Morocco":"🇲🇦","Algeria":"🇩🇿","Ghana":"🇬🇭","Togo":"🇹🇬","Benin":"🇧🇯","Bolivia":"🇧🇴","Nepal":"🇳🇵","Zimbabwe":"🇿🇼","Côte d'Ivoire":"🇨🇮"};
  /* PQA-numbers 2026-10-12: allorigins par 12s AbortController timeout — hung proxy spinner ko hamesha ke liye atkne nahi dega, maujooda catch chain error fallback chalayegi */
  function viaProxy(url) {
    var ctrl = new AbortController();
    var to = setTimeout(function () { ctrl.abort(); }, 12000);
    return fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(url), { signal: ctrl.signal }).then(function (r) {
      clearTimeout(to);
      if (!r.ok) throw 0; return r.text();
    }).catch(function (e) {
      clearTimeout(to);
      throw e;
    });
  }
  function parseNumbersHtml(html) {
    var out = [];
    try {
      var doc = new DOMParser().parseFromString(html, "text/html");
      var cards = doc.querySelectorAll('[id^="c-"]');
      cards.forEach(function (card) {
        var h2 = card.querySelector("h2");
        if (!h2) return;
        var country = h2.textContent.split("(")[0].trim();
        if (!country) return;
        var links = card.querySelectorAll('a[href*="/receive-sms/"]');
        var n = 0;
        links.forEach(function (a) {
          if (n >= 6) return;
          var m = a.getAttribute("href").match(/^\/([a-z]{2})\/receive-sms\/(\d+)$/);
          if (m) { out.push({ country: country, flag: FLAGS[country] || "🌍", cc: m[1], num: m[2] }); n++; }
        });
      });
    } catch (e) {}
    return out.slice(0, 42);
  }
  function extractCode(t) {
    var pats = [/(?:code|otp|pin|verification)[^0-9]{0,25}(\d{4,8})/i, /(\d{4,8})[^0-9]{0,25}(?:code|otp|pin)/i, /\b(\d{6})\b/, /\b(\d{4,5})\b/];
    for (var i = 0; i < pats.length; i++) { var m = t.match(pats[i]); if (m) return m[1]; }
    return null;
  }
  function parseInboxHtml(html) {
    var msgs = [];
    try {
      var doc = new DOMParser().parseFromString(html, "text/html");
      doc.querySelectorAll("div.msg").forEach(function (b) {
        if (msgs.length >= 30) return;
        var from = (b.querySelector("span.font-bold") || {}).textContent || "Unknown";
        var snum = (b.querySelector(".text-muted.mono") || {}).textContent || "";
        var txt = (b.querySelector(".js-msgtext") || {}).textContent || "";
        txt = txt.replace(/\s+/g, " ").trim().slice(0, 300);
        if (!txt) return;
        msgs.push({ from: from.trim(), sender_num: snum.trim(), text: txt, code: extractCode(txt) });
      });
    } catch (e) {}
    return msgs;
  }
  var ALL_NUMS = [];
    function loadNumbers() {
      var dd = $('ft-number');
      /* hourly-refreshed cache first (fast, no CORS), then live fallbacks */
      fetch('data/free-numbers.json?v=' + Date.now()).then(function (r) {
        if (!r.ok) throw 0;
        return r.json();
      }).then(function (nums) {
        if (!nums || !nums.length) throw 0;
        ALL_NUMS = nums.map(function (n) { return { country: n.country, flag: FLAGS[n.country] || "🌍", cc: n.cc, num: n.num, src: n.source || "freephonenum", msgs: n.msgs || [], msgts: n.msgts || 0 }; });
        renderCountryOptions(ALL_NUMS);
        renderNumOptions(ALL_NUMS);
      }).catch(function () {
        fetch(API + '/sms-numbers').then(function (r) {
          if (!r.ok) throw 0;
          return r.json();
        }).then(function (d) {
          var nums = (d && d.numbers) || [];
          if (!nums.length) throw 0;
          ALL_NUMS = nums;
          renderCountryOptions(nums);
          renderNumOptions(nums);
        }).catch(function () {
          viaProxy("https://freephonenum.com/receive-sms").then(function (html) {
            var nums = parseNumbersHtml(html);
            ALL_NUMS = nums;
            renderCountryOptions(nums);
            renderNumOptions(nums);
          }).catch(function () {
            dd.innerHTML = '<option value="">⚠️ Live numbers unavailable — Refresh dabao</option>';
          });
        });
      });
      var cc = $('ft-country');
      if (cc && !cc.dataset.bound) {
        cc.dataset.bound = "1";
        cc.addEventListener('change', function () { renderNumOptions(ALL_NUMS); });
      }
    }
    function renderCountryOptions(nums) {
      var cc = $('ft-country');
      if (!cc) return;
      var seen = {}, list = [];
      nums.forEach(function (n) {
        if (!seen[n.country]) { seen[n.country] = 1; list.push({ country: n.country, flag: n.flag || FLAGS[n.country] || "🌍" }); }
      });
      list.sort(function (a, b) { return a.country.localeCompare(b.country); });
      /* COUNTRY RULE: USA sab se pehle, phir baqi sab alphabetical */
      var usFirst = [], restC = [];
      list.forEach(function (c) { ((c.country === 'United States' || c.country.indexOf('United States ') === 0 || c.country === 'USA' || c.country.indexOf('USA ') === 0) ? usFirst : restC).push(c); });
      list = usFirst.concat(restC);
      var cur = cc.value;
      cc.innerHTML = '<option value="">🌍 All countries (' + list.length + ')</option>' +
        list.map(function (c) { return '<option value="' + esc(c.country) + '"' + (c.country === cur ? ' selected' : '') + '>' + esc(c.flag + ' ' + c.country) + '</option>'; }).join('');
    }
    function renderNumOptions(nums) {
      var dd = $('ft-number');
      var cc = $('ft-country');
      if (!dd) return;
      if (cc && cc.value) nums = nums.filter(function (n) { return n.country === cc.value; });
      if (!nums.length) {
        dd.innerHTML = '<option value="">⚠️ Live numbers unavailable — try again</option>';
        return;
      }
      var byCountry = {};
      nums.forEach(function (n) { (byCountry[n.country] = byCountry[n.country] || []).push(n); });
      var html = '<option value="">— Select a number —</option>';
      Object.keys(byCountry).sort().forEach(function (c) {
        html += '<optgroup label="' + esc(byCountry[c][0].flag + ' ' + c) + '">';
        byCountry[c].forEach(function (n) {
          html += '<option value="' + esc(n.cc + '|' + n.num) + '">' + esc(n.flag + ' +' + n.num) + '</option>';
        });
        html += '</optgroup>';
      });
      dd.innerHTML = html;
    }

  function renderInbox(msgs, live) {
    var box = $('ft-inbox');
    if (!msgs.length) {
      box.innerHTML = '<div class="ft-empty">📭 No SMS yet — enter the number in any app, the code will appear here.</div>';
      return;
    }
    box.innerHTML = msgs.map(function (m) {
      return '<div class="ft-msg"><div class="ft-from">' + esc(m.from) +
        (m.sender_num ? ' <span style="color:#8b90b8;font-weight:400;">' + esc(m.sender_num) + '</span>' : '') + '</div>' +
        '<div class="ft-text">' + esc(m.text) + '</div>' +
        (m.code ? '<button type="button" class="ft-code" data-code="' + esc(m.code) + '" title="Copy code">' + esc(m.code) + ' 📋</button>' : '') +
        '</div>';
    }).join('');
    box.querySelectorAll('.ft-code').forEach(function (b) {
      b.addEventListener('click', function () {
        var c = b.getAttribute('data-code');
        if (navigator.clipboard) navigator.clipboard.writeText(c);
        b.textContent = '✅ Copied!';
        setTimeout(function () { b.innerHTML = esc(c) + ' 📋'; }, 1500);
      });
    });
  }

  function pollInbox() {
    if (document.hidden) return;
    if (!sel) return;
    /* additive: 7sim/tsms/tsol/rsms/fop/mts/smss + receive-sms-io/fsmsphonenumber/rfast + vwp/rsl + scc + fsr + rsmscom + smsdock + fnr + anonsms entries render server-scraped messages (honest freshness label) */
    if (sel.src === "7sim" || sel.src === "tsms" || sel.src === "tsol" || sel.src === "rsms" || sel.src === "fop" || sel.src === "mts" || sel.src === "smss" || sel.src === "vwp" || sel.src === "rsl" || sel.src === "scc" || sel.src === "fsr" || sel.src === "rsmscom" || sel.src === "smsdock" || sel.src === "fnr" || sel.src === "anonsms") {
      var msgs = (sel.msgs || []).map(function (m) {
        return { from: m.from || "Unknown", sender_num: "", text: m.text || "", code: extractCode(m.text || "") };
      });
      renderInbox(msgs, true);
      var ageH = sel.msgts ? Math.max(0, Math.round((Date.now() / 1000 - sel.msgts) / 3600)) : 99;
      var ageTxt = ageH < 1 ? "just now" : (ageH === 1 ? "1h ago" : ageH + "h ago");
      $('ft-status').innerHTML = '<span class="ft-live"></span>Live — ' + msgs.length + ' SMS • via ' + sel.src + ', updated ' + ageTxt;
      return;
    }
    fetch(API + '/sms-inbox?cc=' + encodeURIComponent(sel.cc) + '&num=' + encodeURIComponent(sel.num))
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (d) {
        var msgs = (d && d.messages) || [];
        if (!msgs.length) throw 0;
        renderInbox(msgs, true);
        var st = $('ft-status');
        if (msgs.length !== lastCount) {
          lastCount = msgs.length;
          st.innerHTML = '<span class="ft-live"></span>Live — ' + msgs.length + ' SMS • auto-refresh 20s';
        }
      }).catch(function () {
        viaProxy("https://freephonenum.com/" + sel.cc + "/receive-sms/" + sel.num).then(function (html) {
          var msgs = parseInboxHtml(html);
          renderInbox(msgs, true);
          var st = $('ft-status');
          if (msgs.length !== lastCount) {
            lastCount = msgs.length;
            st.innerHTML = '<span class="ft-live"></span>Live — ' + msgs.length + ' SMS • auto-refresh 20s';
          }
        }).catch(function () {
          /* PQA-numbers 2026-10-12: dono live paths fail hon to dead-end nahi — user ko source site ka direct link do (freephonenum pattern), Refresh phir bhi kaam karta hai */
          var srcUrl = 'https://freephonenum.com/' + sel.cc + '/receive-sms/' + sel.num;
          $('ft-status').innerHTML = '⚠️ Inbox failed to load — <a href="' + srcUrl + '" target="_blank" rel="noopener">open inbox on source site</a> or press Refresh';
        });
      });
  }

  function init() {
    var dd = $('ft-number');
    if (!dd) return;
    loadNumbers();
    dd.addEventListener('change', function () {
      var v = dd.value;
      if (timer) { clearInterval(timer); timer = null; }
      lastCount = -1;
      if (!v) {
        sel = null; $('ft-shownum').textContent = '—'; $('ft-copy').style.display = 'none';
        $('ft-inbox').innerHTML = ''; $('ft-status').textContent = 'Select a number — the inbox will open here, auto-refreshing every 20 sec.';
        return;
      }
      var parts = v.split('|');
      sel = { cc: parts[0], num: parts[1] };
      /* additive: 7sim/tsms/tsol/rsms/fop/mts/smss + receive-sms-io/fsmsphonenumber/rfast + vwp/rsl + scc + fsr + rsmscom + smsdock + fnr + anonsms numbers carry server-scraped messages (no live browser fetch) */
      for (var i = 0; i < ALL_NUMS.length; i++) {
        if (ALL_NUMS[i].cc === sel.cc && ALL_NUMS[i].num === sel.num && (ALL_NUMS[i].src === "7sim" || ALL_NUMS[i].src === "tsms" || ALL_NUMS[i].src === "tsol" || ALL_NUMS[i].src === "rsms" || ALL_NUMS[i].src === "fop" || ALL_NUMS[i].src === "mts" || ALL_NUMS[i].src === "smss" || ALL_NUMS[i].src === "receive-sms-io" || ALL_NUMS[i].src === "fsmsphonenumber" || ALL_NUMS[i].src === "rfast" || ALL_NUMS[i].src === "vwp" || ALL_NUMS[i].src === "rsl" || ALL_NUMS[i].src === "scc" || ALL_NUMS[i].src === "fsr" || ALL_NUMS[i].src === "rsmscom" || ALL_NUMS[i].src === "smsdock" || ALL_NUMS[i].src === "fnr" || ALL_NUMS[i].src === "anonsms")) {
          sel.src = ALL_NUMS[i].src; sel.msgs = ALL_NUMS[i].msgs; sel.msgts = ALL_NUMS[i].msgts;
          break;
        }
      }
      $('ft-shownum').textContent = '+' + sel.num;
      $('ft-copy').style.display = '';
      $('ft-status').innerHTML = '<span class="ft-live"></span>Connecting…';
      $('ft-inbox').innerHTML = '<div class="ft-empty">⏳ Loading inbox…</div>';
      pollInbox();
      timer = setInterval(pollInbox, 20000);
    });
    $('ft-refresh').addEventListener('click', function () {
      if (sel) pollInbox(); else loadNumbers();
    });
    $('ft-copy').addEventListener('click', function () {
      if (!sel) return;
      var n = '+' + sel.num;
      if (navigator.clipboard) navigator.clipboard.writeText(n);
      $('ft-copy').textContent = '✅ Copied!';
      setTimeout(function () { $('ft-copy').textContent = '📋 Copy'; }, 1500);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
