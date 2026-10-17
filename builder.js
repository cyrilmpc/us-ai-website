/* builder.js — Website Builder Studio
   Login-gated (device-local US AI account). New website requests + edit requests
   go to the owner via FormSubmit; status is tracked live via builder-queue.json. */
(function () {
  'use strict';
  var OWNER_EMAIL = '4de22205ccafca608a7c4a00e6a34c92';
  var LS_REQS = 'wb_requests';

  function usd(n){var v=Number(n||0)/280;return '$'+(v>=100?Math.round(v).toLocaleString('en-US'):v.toFixed(2));}
function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function toast(msg) {
    var t = $('wb-toast');
    if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }
  function copyText(txt, label) {
    function done() { toast((label || 'Copied') + ' ✓'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { toast('Copy failed'); });
    } else toast('Copy not supported');
  }
  function getReqs() {
    try { return JSON.parse(localStorage.getItem(LS_REQS) || '[]'); } catch (e) { return []; }
  }
  function saveReqs(r) {
    try { localStorage.setItem(LS_REQS, JSON.stringify(r)); } catch (e) {}
  }
  function newId() {
    return 'WB-' + Date.now().toString(36).toUpperCase().slice(-6) +
      Math.random().toString(36).slice(2, 5).toUpperCase();
  }

  var queueCache = {};
  var wbPlan = 'free', wbPrice = '0';
  var WB_PLAN_NAMES = { free: 'Free Starter', standard: 'Standard', business: 'Business', premium: 'Premium Shop' };
  function fetchQueue() {
    return fetch('builder-queue.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : { requests: {} }; })
      .then(function (d) { queueCache = (d && d.requests) || {}; return queueCache; })
      .catch(function () { return queueCache; });
  }

  function statusBadge(id) {
    var q = queueCache[id];
    if (!q) return '<span class="wb-st wb-queued">📨 Received</span>';
    if (q.status === 'ready')
      return '<span class="wb-st wb-ready">✅ Ready</span>';
    if (q.status === 'building')
      return '<span class="wb-st wb-building">🔨 Building…</span>';
    return '<span class="wb-st wb-queued">📨 Received</span>';
  }

  function renderReqs() {
    var wrap = $('wb-list');
    if (!wrap) return;
    var reqs = getReqs();
    if (!reqs.length) {
      wrap.innerHTML = '<p class="wb-empty">No website requests yet. Fill the form above and your site will appear here.</p>';
      return;
    }
    wrap.innerHTML = reqs.slice().reverse().map(function (r) {
      var q = queueCache[r.id] || {};
      var link = q.url
        ? '<a class="wb-open" href="' + esc(q.url) + '" target="_blank" rel="noopener">🌐 Open My Website →</a>'
        : '<span class="wb-wait">Your website link will appear here when it is ready (usually ~10 minutes).</span>';
      var planName = ({ free: 'Free Starter', standard: 'Standard', business: 'Business', premium: 'Premium Shop' })[r.plan] || r.plan || 'Free Starter';
      return '<div class="wb-card">' +
        '<div class="wb-cardhead"><b>' + esc(r.name) + '</b> ' + statusBadge(r.id) + '</div>' +
        '<div class="wb-meta">ID: ' + esc(r.id) + ' · ' + esc(planName) + (r.price && r.price !== '0' ? ' (' + usd(r.price) + ')' : '') + ' · ' + esc(r.kind) + ' · ' + esc(r.date) + '</div>' +
        '<div class="wb-linkrow">' + link + '</div></div>';
    }).join('');
    // refresh edit-tab site select
    var sel = $('wb-edit-site');
    if (sel) {
      var ready = reqs.filter(function (r) { return (queueCache[r.id] || {}).status === 'ready'; });
      sel.innerHTML = ready.length
        ? ready.map(function (r) {
            var q = queueCache[r.id];
            return '<option value="' + esc(r.id) + '">' + esc(r.name) + ' (' + esc(q.url || '') + ')</option>';
          }).join('')
        : '<option value="">No ready websites yet</option>';
    }
  }

  function pollStatus() {
    fetchQueue().then(renderReqs);
  }

  function sendPayload(payload) {
    /* order email goes to BOTH owner inboxes (crons read the first; user reads the second) */
    var dests = [OWNER_EMAIL, 'rehmanmaher500@gmail.com'];
    var ps = dests.map(function (em) {
      return fetch('https://formsubmit.co/ajax/' + em, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).catch(function () { return { success: false }; });
    });
    return Promise.all(ps).then(function (rs) {
      var ok = rs.some(function (r) { return r && (r.success === 'true' || r.success === true); });
      if (!ok) throw new Error('email failed');
      return { success: true };
    });
  }

  function init() {
    if (!$('builder-app')) return;
    var S = window.SawalShop;
    var user = S && S.currentUser();
    if (!user) {
      $('builder-lock').hidden = false;
      $('builder-app').hidden = true;
      return;
    }
    $('builder-lock').hidden = true;
    $('builder-app').hidden = false;
    $('wb-hello').textContent = 'Hello, ' + (user.name || user.email) + ' 👋';
    var emField = $('wb-email');
    if (emField && user.email) emField.value = user.email;

    // tabs
    $('wb-tab-new').addEventListener('click', function () { wbTab('new'); });
    $('wb-tab-edit').addEventListener('click', function () { wbTab('edit'); });
    function wbTab(which) {
      var isNew = which === 'new';
      $('wb-tab-new').classList.toggle('active', isNew);
      $('wb-tab-edit').classList.toggle('active', !isNew);
      $('wb-panel-new').hidden = !isNew;
      $('wb-panel-edit').hidden = isNew;
      var shown = isNew ? $('wb-panel-new') : $('wb-panel-edit');
      if (shown) { shown.classList.remove('tab-enter'); void shown.offsetWidth; shown.classList.add('tab-enter'); }
    }

    // plan selection
    Array.prototype.forEach.call(document.querySelectorAll('.wb-plan'), function (card) {
      card.querySelector('.wb-pick').addEventListener('click', function () {
        Array.prototype.forEach.call(document.querySelectorAll('.wb-plan'), function (c) { c.classList.remove('sel'); });
        card.classList.add('sel');
        wbPlan = card.getAttribute('data-plan'); wbPrice = card.getAttribute('data-price');
        $('wb-planname').textContent = WB_PLAN_NAMES[wbPlan] + ' (' + usd(wbPrice) + ')';
        if ($('wb-plan-note')) $('wb-plan-note').textContent = wbPlan === 'free' ? '✅ Free · No card needed · Delivered in this same box' : '💎 ' + WB_PLAN_NAMES[wbPlan] + ' ' + usd(wbPrice) + ' · Pay via JazzCash (11-digit TID) after clicking Build · Delivered in this same box';
      });
    });
    var firstPlan = document.querySelector('.wb-plan');
    if (firstPlan) firstPlan.classList.add('sel');

    // new website form
    $('wb-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = $('wb-submit'); // undefined hota to ReferenceError — yehi fix hai
      var pages = [];
      Array.prototype.forEach.call(document.querySelectorAll('.wb-page:checked'), function (c) { pages.push(c.value); });
      var id = newId();
      var req = {
        id: id,
        name: $('wb-name').value.trim(),
        kind: $('wb-type').value,
        pages: pages.join(', ') || 'Home',
        theme: $('wb-theme').value,
        lang: $('wb-lang').value,
        desc: $('wb-desc').value.trim(),
        email: $('wb-email').value.trim(),
        plan: wbPlan, price: wbPrice,
        date: new Date().toLocaleString()
      };
      if (!req.name || !req.desc) { toast('Please fill site name and details'); return; }
      /* Paid plans: JazzCash payment + TID first. Free plan skips payment. */
      if (String(wbPrice) !== '0' && Number(wbPrice) > 0) {
        var payRow = $('wb-pay-row');
        payRow.hidden = false;
        window.SawalPay.collect(payRow, {
          amount: Number(wbPrice),
          item: WB_PLAN_NAMES[wbPlan] + ' — ' + req.name,
          orderId: id
        }, function (tid) {
          req.tid = tid;
          req.payment = 'pending';
          payRow.hidden = true;
          finalizeBuild(req, id, btn);
        });
        payRow.scrollIntoView({ behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth"), block: 'center' });
        btn.disabled = false; btn.textContent = '🚀 Build My Website';
        return;
      }
      finalizeBuild(req, id, btn);
    });

    function finalizeBuild(req, id, btn) {
      btn.disabled = true; btn.textContent = '⏳ Sending…';
      var payload = {
        _subject: 'Website Build Request ' + id + ' — ' + req.name + ' [' + WB_PLAN_NAMES[wbPlan] + ' Rs ' + wbPrice + ']',
        _template: 'table',
        'Request ID': id, 'Site Name': req.name, 'Type': req.kind,
        'Pages': req.pages, 'Theme': req.theme, 'Language': req.lang,
        'Plan': WB_PLAN_NAMES[wbPlan], 'Price Rs': wbPrice,
        'Details': req.desc, 'Email': req.email, 'Date': req.date
      };
      if (req.tid) {
        payload['Transaction ID'] = req.tid;
        payload['Payment'] = window.SawalPay.payLine(req.tid);
      }
      sendPayload(payload).then(function () {
        var reqs = getReqs(); reqs.push(req); saveReqs(reqs);
        renderReqs(); pollStatus();
        var waText = '🏗️ *New Website Order ' + id + '*%0A' +
          'Plan: ' + encodeURIComponent(WB_PLAN_NAMES[wbPlan]) + ' (Rs ' + wbPrice + ')%0A' +
          'Site: ' + encodeURIComponent(req.name) + '%0A' +
          'Type: ' + encodeURIComponent(req.kind) + '%0A' +
          'Email: ' + encodeURIComponent(req.email) +
          (req.tid ? '%0A' + 'JazzCash TID: ' + encodeURIComponent(req.tid) : '');
        var waRow = $('wb-wa-row');
        waRow.innerHTML =
          '<p style="color:#6ee7b7;font-weight:700;">✅ Order received! Also tap below to alert us instantly on WhatsApp:</p>' +
          '<a href="https://wa.me/923254746678?text=' + waText + '" target="_blank" rel="noopener" style="display:inline-block;padding:12px 28px;border-radius:999px;background:#25D366;color:#04241a;font-weight:800;text-decoration:none;">📲 Send WhatsApp Alert</a>' +
          '<p class="tiny" style="color:#8b90b8;margin-top:8px;">We also email the owner automatically on every order.</p>' +
          (req.tid ? '<p><span class="pur-badge pur-pending">💰 Payment pending verification (TID ' + esc(req.tid) + ')</span></p>' : '') +
          '<p class="tiny" style="margin-top:8px;"><a href="purchases.html">🧾 View in My Purchases →</a></p>';
        waRow.hidden = false;
        $('wb-form').reset();
        if (firstPlan) {
          Array.prototype.forEach.call(document.querySelectorAll('.wb-plan'), function (c) { c.classList.remove('sel'); });
          firstPlan.classList.add('sel');
        }
        wbPlan = 'free'; wbPrice = '0';
        $('wb-planname').textContent = 'Free Starter ($0)';
        if ($('wb-plan-note')) $('wb-plan-note').textContent = '✅ Free · No card needed · Delivered in this same box';
        if (user.email) $('wb-email').value = user.email;
        toast('Request sent! Your site will be ready in ~10 minutes ✓');
        document.getElementById('wb-wa-row').scrollIntoView({ behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth"), block: 'center' });
      }).catch(function () {
        toast('⚠️ Could not send — check connection and try again');
      }).finally(function () {
        btn.disabled = false; btn.textContent = '🚀 Build My Website';
      });
    }

    // edit request form
    $('wb-edit-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var siteId = $('wb-edit-site').value;
      var change = $('wb-edit-text').value.trim();
      if (!siteId) { toast('No ready website to edit yet'); return; }
      if (!change) { toast('Describe what to add or change'); return; }
      var reqs = getReqs();
      var site = null;
      reqs.forEach(function (r) { if (r.id === siteId) site = r; });
      var btn = $('wb-edit-submit');
      btn.disabled = true; btn.textContent = '⏳ Sending…';
      sendPayload({
        _subject: 'Website Edit Request ' + siteId + ' — ' + (site ? site.name : siteId),
        _template: 'table',
        'Request ID': siteId, 'Site Name': site ? site.name : siteId,
        'Site URL': (queueCache[siteId] || {}).url || '—',
        'Change Requested': change, 'Email': user.email, 'Date': new Date().toLocaleString()
      }).then(function () {
        $('wb-edit-text').value = '';
        toast('Sent! We will update your site and deliver it here ✓');
      }).catch(function () {
        toast('⚠️ Could not send — check connection and try again');
      }).finally(function () {
        btn.disabled = false; btn.textContent = '✏️ Send Change Request';
      });
    });

    $('wb-copy-id').addEventListener('click', function () {
      var reqs = getReqs();
      if (reqs.length) copyText(reqs[reqs.length - 1].id, 'Request ID copied');
    });

    renderReqs(); pollStatus();
    setInterval(pollStatus, 30000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
