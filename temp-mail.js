/* temp-mail.js — Free Temp Email box (GuerrillaMail API: free, no key, CORS-open)
   + Temp SMS tab (curated free receive-SMS sites). 100% free for visitors. */
(function () {
  'use strict';
  var API = 'https://api.guerrillamail.com/ajax.php';
  var sid = null, email = null, lastIds = {}, pollTimer = null;

  function $(id) { return document.getElementById(id); }

  function api(params) {
    var q = Object.keys(params).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
    return fetch(API + '?' + q, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }

  function toast(msg) {
    var t = $('tm-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }

  function copyText(txt, label) {
    function done() { toast((label || 'Copied') + ' ✓'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = txt; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast('Copy failed'); }
      document.body.removeChild(ta);
    }
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function extractCodes(text) {
    var found = [], seen = {};
    String(text || '').replace(/\b\d{4,8}\b/g, function (m) {
      if (!seen[m]) { seen[m] = 1; found.push(m); }
      return m;
    });
    return found.slice(0, 6);
  }

  function renderAddress() {
    var box = $('tm-addr');
    if (!box) return;
    box.innerHTML = email
      ? '<span class="tm-mail">' + esc(email) + '</span>'
      : '<span class="tm-none">Press “New Email Address” to get a free temporary inbox.</span>';
  }

  function renderInbox(list) {
    var wrap = $('tm-inbox');
    if (!wrap) return;
    if (!email) { wrap.innerHTML = '<p class="tm-empty">No inbox yet — generate an address first.</p>'; return; }
    if (!list || !list.length) {
      wrap.innerHTML = '<p class="tm-empty">📭 Inbox is empty. Waiting for new mail…<br><span class="tiny">New messages appear here automatically.</span></p>';
      return;
    }
    wrap.innerHTML = list.slice().reverse().map(function (m) {
      var fresh = !lastIds[m.mail_id];
      var d = new Date(m.mail_timestamp * 1000);
      return '<button type="button" class="tm-item' + (fresh ? ' tm-fresh' : '') + '" data-mid="' + esc(m.mail_id) + '">' +
        '<span class="tm-from">' + esc(m.mail_from) + '</span>' +
        '<span class="tm-subj">' + esc(m.mail_subject || '(no subject)') + '</span>' +
        '<span class="tm-time">' + d.toLocaleTimeString() + '</span></button>';
    }).join('');
    Array.prototype.forEach.call(wrap.querySelectorAll('.tm-item'), function (btn) {
      btn.addEventListener('click', function () { openMail(btn.getAttribute('data-mid')); });
    });
  }

  function refreshInbox(silent) {
    if (!sid) return;
    if (!silent) $('tm-inbox').innerHTML = '<p class="tm-empty">⏳ Checking inbox…</p>';
    api({ f: 'check_email', seq: '0', sid_token: sid, lang: 'en' })
      .then(function (d) {
        var list = d.list || [];
        renderInbox(list);
        var ids = {};
        list.forEach(function (m) { ids[m.mail_id] = 1; });
        lastIds = ids;
        var n = $('tm-count');
        if (n) n.textContent = list.length ? list.length + ' ✉️' : '';
      })
      .catch(function () {
        if (!silent) $('tm-inbox').innerHTML = '<p class="tm-empty">⚠️ Could not reach the mail server. Try again.</p>';
      });
  }

  function startPolling() {
    stopPolling();
    pollTimer = setInterval(function () { refreshInbox(true); }, 15000);
  }
  function stopPolling() { if (pollTimer) { clearInterval(pollTimer); pollTimer = null; } }

  function newAddress() {
    $('tm-inbox').innerHTML = '<p class="tm-empty">⏳ Creating your temporary email…</p>';
    api({ f: 'get_email_address', ip: '127.0.0.1', agent: 'US AI-TempBox/1.0', lang: 'en' })
      .then(function (d) {
        if (!d.email_addr || !d.sid_token) throw new Error('bad response');
        email = d.email_addr; sid = d.sid_token; lastIds = {};
        renderAddress(); refreshInbox(false); startPolling();
        toast('New temp email ready ✓');
      })
      .catch(function () {
        $('tm-inbox').innerHTML = '<p class="tm-empty">⚠️ Mail server busy — press “New Email Address” again.</p>';
      });
  }

  function customAddress() {
    var inp = $('tm-custom');
    var name = (inp.value || '').trim().toLowerCase().replace(/[^a-z0-9._-]/g, '');
    if (!sid) { toast('Get an address first'); return; }
    if (name.length < 3) { toast('Type at least 3 characters'); return; }
    api({ f: 'set_email_user', email_user: name, sid_token: sid, lang: 'en' })
      .then(function (d) {
        if (!d.email_addr) throw new Error('bad response');
        email = d.email_addr; lastIds = {};
        renderAddress(); refreshInbox(false);
        toast('Custom address set ✓');
      })
      .catch(function () { toast('That name is taken — try another'); });
  }

  function openMail(mid) {
    var modal = $('tm-modal'), body = $('tm-mailbody');
    modal.classList.add('open');
    body.innerHTML = '<p class="tm-empty">⏳ Loading message…</p>';
    api({ f: 'fetch_email', email_id: mid, sid_token: sid, lang: 'en' })
      .then(function (d) {
        var text = d.mail_body || '';
        var codes = extractCodes((d.mail_subject || '') + ' ' + text.replace(/<[^>]*>/g, ' '));
        var codeHtml = codes.length
          ? '<div class="tm-codes"><b>🔑 Code' + (codes.length > 1 ? 's' : '') + ' found:</b> ' +
            codes.map(function (c) {
              return '<button type="button" class="tm-code" data-code="' + esc(c) + '">' + esc(c) + ' 📋</button>';
            }).join('') + '</div>'
          : '';
        body.innerHTML =
          '<div class="tm-mailhead"><b>From:</b> ' + esc(d.mail_from || '') + '<br>' +
          '<b>Subject:</b> ' + esc(d.mail_subject || '(no subject)') + '<br>' +
          '<b>Date:</b> ' + esc(d.mail_date || '') + '</div>' +
          codeHtml +
          '<div class="tm-mailtext">' + esc(text.replace(/<[^>]*>/g, '')) + '</div>';
        Array.prototype.forEach.call(body.querySelectorAll('.tm-code'), function (b) {
          b.addEventListener('click', function () { copyText(b.getAttribute('data-code'), 'Code copied'); });
        });
      })
      .catch(function () { body.innerHTML = '<p class="tm-empty">⚠️ Could not load this message.</p>'; });
  }

  function closeModal() { $('tm-modal').classList.remove('open'); }

  function tabEnter(el) {
    if (!el) return;
    el.classList.remove('tab-enter');
    void el.offsetWidth; /* restart animation */
    el.classList.add('tab-enter');
  }

  function switchTab(which) {
    var em = which === 'email';
    $('tab-email').classList.toggle('active', em);
    $('tab-sms').classList.toggle('active', !em);
    $('panel-email').hidden = !em;
    $('panel-sms').hidden = em;
    tabEnter(em ? $('panel-email') : $('panel-sms'));
  }

  function init() {
    if (!$('tm-addr')) return;
    renderAddress(); renderInbox(null);
    $('tm-new').addEventListener('click', newAddress);
    $('tm-copy').addEventListener('click', function () {
      if (email) copyText(email, 'Email copied'); else toast('No address yet');
    });
    $('tm-custom-btn').addEventListener('click', customAddress);
    $('tm-custom').addEventListener('keydown', function (e) { if (e.key === 'Enter') customAddress(); });
    $('tm-refresh').addEventListener('click', function () { refreshInbox(false); });
    $('tab-email').addEventListener('click', function () { switchTab('email'); });
    $('tab-sms').addEventListener('click', function () { switchTab('sms'); });
    $('tm-modal-close').addEventListener('click', closeModal);
    $('tm-modal').addEventListener('click', function (e) { if (e.target === $('tm-modal')) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    newAddress(); // auto-create on page load
    pnInit();
  }

  /* ---------- Premium Numbers (paid, in-site, login-gated) ---------- */
  var PN_LS = 'pn_orders', pnQueue = {}, pnPlan = null, pnPrice = null;
  var PN_NAMES = { otp: 'One-Time OTP Number', rent7: '7-Day Rental', rent30: '30-Day Rental' };

  function pnGet() { try { return JSON.parse(localStorage.getItem(PN_LS) || '[]'); } catch (e) { return []; } }
  function pnSave(r) { try { localStorage.setItem(PN_LS, JSON.stringify(r)); } catch (e) {} }
  function pnId() {
    return 'PN-' + Date.now().toString(36).toUpperCase().slice(-6) +
      Math.random().toString(36).slice(2, 5).toUpperCase();
  }
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
    var wrap = $('pn-list');
    if (!wrap) return;
    var orders = pnGet();
    if (!orders.length) { wrap.innerHTML = '<p class="wb-empty">📭 No premium numbers yet.<br>Want a private real number for OTP codes? <a href="numbers.html" style="color:#22d3ee;font-weight:700;">Order one here →</a></p>'; return; }
    wrap.innerHTML = orders.slice().reverse().map(function (o) {
      var q = pnQueue[o.id] || {};
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
          '<button type="button" class="btn-tm pn-copynum" data-num="' + esc(q.number) + '" style="padding:6px 14px;font-size:.8rem;">📋 Copy</button></div>' +
          '<div class="pn-smslist">' + sms + '</div>';
      } else if (q.status === 'expired') {
        body = '<span class="wb-wait">This number has expired. Order a new one above.</span>';
      } else {
        body = '<span class="wb-wait">We are activating your private number — it will appear here with live SMS (usually within minutes of payment confirmation).</span>';
      }
      return '<div class="wb-card"><div class="wb-cardhead"><b>' + esc(PN_NAMES[o.plan] || o.plan) +
        '</b> ' + pnStatusBadge(o.id) + '</div>' +
        '<div class="wb-meta">ID: ' + esc(o.id) + ' · Rs ' + esc(o.price) + ' · ' + esc(o.service || '') + ' · ' + esc(o.date) + '</div>' +
        '<div class="wb-linkrow">' + body + '</div></div>';
    }).join('');
    Array.prototype.forEach.call(wrap.querySelectorAll('.tm-code'), function (b) {
      b.addEventListener('click', function () { copyText(b.getAttribute('data-code'), 'Code copied'); });
    });
    Array.prototype.forEach.call(wrap.querySelectorAll('.pn-copynum'), function (b) {
      b.addEventListener('click', function () { copyText(b.getAttribute('data-num'), 'Number copied'); });
    });
  }
  function pnPoll() { pnFetchQueue().then(pnRender); }

  function pnInit() {
    if (!$('pn-app')) return;
    var S = window.SawalShop;
    var user = S && S.currentUser();
    if (!user) { $('pn-lock').hidden = false; $('pn-app').hidden = true; return; }
    $('pn-lock').hidden = true; $('pn-app').hidden = false;
    $('pn-hello').textContent = 'Hello, ' + (user.name || user.email) + ' 👋';

    Array.prototype.forEach.call(document.querySelectorAll('.pn-order'), function (btn) {
      btn.addEventListener('click', function () {
        pnPlan = btn.getAttribute('data-plan'); pnPrice = btn.getAttribute('data-price');
        $('pn-formtitle').textContent = 'Order: ' + (PN_NAMES[pnPlan] || pnPlan) + ' — Rs ' + pnPrice;
        $('pn-formwrap').hidden = false;
        $('pn-formwrap').scrollIntoView({ behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth"), block: 'center' });
      });
    });

    var pnForm = $('pn-form');
    if (pnForm) pnForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!pnPlan) { toast('Choose a plan first'); return; }
      var wa = $('pn-wa').value.trim();
      if (!wa) { toast('Please enter your WhatsApp number'); return; }
      var id = pnId();
      var order = {
        id: id, plan: pnPlan, price: pnPrice,
        service: $('pn-service').value, country: $('pn-country').value,
        whatsapp: wa, email: user.email, name: user.name || '',
        date: new Date().toLocaleString()
      };
      var btn = $('pn-submit');
      btn.disabled = true; btn.textContent = '⏳ Sending…';
      var pnPayload = {
        _subject: 'Premium Number Order ' + id + ' — ' + PN_NAMES[pnPlan] + ' Rs ' + pnPrice,
        _template: 'table',
        'Order ID': id, 'Plan': PN_NAMES[pnPlan], 'Price Rs': pnPrice,
        'Service': order.service, 'Country': order.country,
        'WhatsApp': wa, 'Email': user.email, 'Name': order.name, 'Date': order.date
      };
      var pnDests = ['cyrilmp4665@gmail.com', 'rehmanmaher500@gmail.com'];
      Promise.all(pnDests.map(function (em) {
        return fetch('https://formsubmit.co/ajax/' + em, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(pnPayload)
        }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .catch(function () { return { success: false }; });
      }))
      .then(function () {
        var orders = pnGet(); orders.push(order); pnSave(orders);
        $('pn-form').reset(); $('pn-formwrap').hidden = true; pnPlan = null;
        pnRender(); pnPoll();
        toast('Order sent! Your number will appear below ✓');
        document.getElementById('pn-list').scrollIntoView({ behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth") });
      }).catch(function () {
        toast('⚠️ Could not send — check connection and try again');
      }).finally(function () {
        btn.disabled = false; btn.textContent = '✅ Confirm Order';
      });
    });

    pnRender(); pnPoll();
    setInterval(pnPoll, 30000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
