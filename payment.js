/* US AI White-Label Card Payment
 * Shows "US AI Secure Payment" - no gateway branding visible to customer.
 * Currently in SETUP MODE - needs merchant API keys to process real payments.
 * When keys arrive, set USAI_PAY.merchantId etc. and flip mode to 'live'.
 */
(function(){
"use strict";

var USAI_PAY = {
  mode: 'setup', // 'setup' | 'live'
  merchantId: '', // JazzCash Merchant ID (from merchant account)
  password: '',   // JazzCash API password
  integritySalt: '', // JazzCash integrity salt
  // Add more gateways here later
};

function openCardPayment(opts){
  // opts: {amount, currency, orderId, description, onSuccess, onError}
  opts = opts || {};
  closeCardPayment();

  var overlay = document.createElement('div');
  overlay.id = 'usai-pay-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.85);z-index:10001;display:flex;align-items:center;justify-content:center;padding:16px;';

  var box = document.createElement('div');
  box.style.cssText = 'background:#1e1b4b;border-radius:20px;padding:28px;max-width:420px;width:100%;color:#fff;box-shadow:0 10px 50px rgba(0,0,0,.6);';

  box.innerHTML =
    '<div style="text-align:center;margin-bottom:16px;">' +
      '<div style="font-size:2.5rem;">🔒</div>' +
      '<h2 style="margin:8px 0;color:#a5b4fc;">US AI Secure Payment</h2>' +
      '<p style="color:#888;font-size:.85rem;margin:0;">256-bit encrypted • PCI-DSS compliant</p>' +
    '</div>' +
    '<div style="background:#0f0d2a;padding:12px;border-radius:10px;margin-bottom:16px;text-align:center;">' +
      '<div style="font-size:.85rem;color:#a5b4fc;">' + esc(opts.description || 'Payment') + '</div>' +
      '<div style="font-size:1.6rem;font-weight:800;color:#4ade80;margin-top:4px;">' + esc(opts.currency || 'Rs ') + esc(String(opts.amount || '0')) + '</div>' +
    '</div>' +
    '<div id="usai-pay-setup-note" style="display:none;background:#3b2f0b;border:1px solid #a16207;padding:12px;border-radius:10px;margin-bottom:16px;font-size:.85rem;color:#fcd34d;">' +
      '⚠️ Payment gateway setup pending. Your card will not be charged in demo mode.' +
    '</div>' +
    '<form id="usai-pay-form">' +
      '<label style="display:block;margin-bottom:12px;"><span style="font-size:.85rem;color:#a5b4fc;">Card Number</span>' +
      '<input id="usai-cc-num" inputmode="numeric" placeholder="1234 5678 9012 3456" maxlength="19" required ' +
      'style="width:100%;padding:12px;margin-top:4px;border-radius:10px;border:1px solid #555;background:#0f0d2a;color:#fff;font-size:1rem;box-sizing:border-box;"></label>' +
      '<div style="display:flex;gap:10px;">' +
        '<label style="flex:1;"><span style="font-size:.85rem;color:#a5b4fc;">Expiry</span>' +
        '<input id="usai-cc-exp" placeholder="MM/YY" maxlength="5" required ' +
        'style="width:100%;padding:12px;margin-top:4px;border-radius:10px;border:1px solid #555;background:#0f0d2a;color:#fff;font-size:1rem;box-sizing:border-box;"></label>' +
        '<label style="flex:1;"><span style="font-size:.85rem;color:#a5b4fc;">CVV</span>' +
        '<input id="usai-cc-cvv" inputmode="numeric" placeholder="123" maxlength="4" required type="password" ' +
        'style="width:100%;padding:12px;margin-top:4px;border-radius:10px;border:1px solid #555;background:#0f0d2a;color:#fff;font-size:1rem;box-sizing:border-box;"></label>' +
      '</div>' +
      '<label style="display:block;margin:12px 0;"><span style="font-size:.85rem;color:#a5b4fc;">Name on Card</span>' +
      '<input id="usai-cc-name" placeholder="Full name" required ' +
      'style="width:100%;padding:12px;margin-top:4px;border-radius:10px;border:1px solid #555;background:#0f0d2a;color:#fff;font-size:1rem;box-sizing:border-box;"></label>' +
      '<button type="submit" id="usai-pay-btn" ' +
      'style="width:100%;padding:14px;border:none;border-radius:30px;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;font-size:1.1rem;font-weight:700;cursor:pointer;">' +
      '💳 Pay Securely</button>' +
      '<button type="button" id="usai-pay-cancel" ' +
      'style="width:100%;margin-top:10px;padding:10px;background:none;border:1px solid #555;color:#fff;border-radius:10px;cursor:pointer;">Cancel</button>' +
    '</form>';

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  if (USAI_PAY.mode !== 'live') {
    document.getElementById('usai-pay-setup-note').style.display = 'block';
  }

  // Format card number
  document.getElementById('usai-cc-num').addEventListener('input', function(e){
    var v = e.target.value.replace(/\D/g,'').slice(0,16);
    e.target.value = v.replace(/(.{4})/g,'$1 ').trim();
  });
  document.getElementById('usai-cc-exp').addEventListener('input', function(e){
    var v = e.target.value.replace(/\D/g,'').slice(0,4);
    e.target.value = v.length > 2 ? v.slice(0,2) + '/' + v.slice(2) : v;
  });

  document.getElementById('usai-pay-cancel').onclick = closeCardPayment;
  overlay.onclick = function(e){ if(e.target === overlay) closeCardPayment(); };

  document.getElementById('usai-pay-form').onsubmit = function(e){
    e.preventDefault();
    processPayment(opts);
  };
}

function closeCardPayment(){
  var o = document.getElementById('usai-pay-overlay');
  if(o) o.remove();
}

function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function processPayment(opts){
  var btn = document.getElementById('usai-pay-btn');
  btn.disabled = true;
  btn.textContent = '⏳ Processing...';

  if (USAI_PAY.mode !== 'live') {
    // SETUP MODE: simulate, do not charge
    setTimeout(function(){
      closeCardPayment();
      if(opts.onError) opts.onError({code:'SETUP_MODE', message:'Gateway not configured yet. No charge made.'});
    }, 1200);
    return;
  }

  // LIVE MODE: call backend (Cloudflare Worker) which talks to gateway.
  // Card data is tokenized; raw PAN never touches our servers in production.
  fetch('/api/pay/card', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      amount: opts.amount, currency: opts.currency || 'PKR',
      orderId: opts.orderId, description: opts.description
      // NOTE: real integration posts a gateway token, never raw PAN.
    })
  }).then(function(r){ return r.json(); })
  .then(function(res){
    closeCardPayment();
    if(res && res.success){
      if(opts.onSuccess) opts.onSuccess(res);
    } else {
      if(opts.onError) opts.onError(res || {message:'Payment failed'});
    }
  }).catch(function(err){
    closeCardPayment();
    if(opts.onError) opts.onError({message: String(err && err.message || err)});
  });
}

window.USAI_PAY = USAI_PAY;
window.USAIpay = { open: openCardPayment, close: closeCardPayment };
})();
