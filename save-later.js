/* --- 📑 Save-for-Later (auto-feature, device-local, no login) --- */
(function(){
  var KEY = 'usai_savelater';
  var MAX = 50;

  function getList(){
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; }
  }
  function saveList(list){
    try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX))); } catch(e){}
  }
  function pagePath(){
    var p = location.pathname.split('/').pop() || 'index.html';
    return p === '' ? 'index.html' : p;
  }
  function pageTitle(){
    var t = (document.title || pagePath()).replace(/\s*[-|–]\s*US AI\s*$/i,'').trim();
    return t || pagePath();
  }
  function has(url){
    return getList().some(function(i){ return i.url === url; });
  }
  function add(url, title){
    var list = getList().filter(function(i){ return i.url !== url; });
    list.unshift({ url: url, title: title, ts: Date.now() });
    saveList(list);
  }
  function remove(url){
    saveList(getList().filter(function(i){ return i.url !== url; }));
  }
  function toast(msg){
    if (window.SawalNotify && window.SawalNotify.toast) { window.SawalNotify.toast(msg); return; }
    if (window.SawalNotify && window.SawalNotify.show) { window.SawalNotify.show(msg); return; }
  }
  function esc(s){ return String(s).replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  window.SawalSave = { toggle: toggle, list: getList, remove: remove, has: has };

  function toggle(url, title){
    url = url || pagePath(); title = title || pageTitle();
    if (has(url)) { remove(url); toast('❌ Removed from Saved'); }
    else { add(url, title); toast('🔖 Saved for later!'); }
    render(); syncButtons();
  }

  function ensureAnim(){
    if (document.getElementById('sl-anim-style')) return;
    var st = document.createElement('style');
    st.id = 'sl-anim-style';
    st.textContent = '@keyframes slFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}'
      + '@keyframes slPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}'
      + '.sl-btn{animation:slPulse 2.4s ease-in-out infinite;}'
      + '.sl-card{animation:slFloat 4s ease-in-out infinite;}';
    document.head.appendChild(st);
  }

  /* Homepage strip */
  function render(){
    var sec = document.getElementById('saved-later');
    var box = document.getElementById('sl-list');
    if (!sec || !box) return;
    var path = pagePath();
    var list = getList().filter(function(i){ return i.url !== path; });
    if (!list.length) {
      sec.style.display = '';
      box.innerHTML = '<div class="card" style="padding:14px 18px"><div class="tx"><b>\U0001F4ED Nothing saved yet</b><span>Tap the bookmark on any article to save it here. Start with \u2B50 <a href="#tool-of-day" style="color:#c4b5fd">Tool of the Day</a> or \uD83D\uDD25 <a href="#trending-tools" style="color:#c4b5fd">Trending Tools</a>.</span></div></div>';
      return;
    }
    ensureAnim();
    sec.style.display = '';
    box.innerHTML = '';
    list.forEach(function(item, idx){
      var card = document.createElement('div');
      card.className = 'sl-card';
      card.style.cssText = 'position:relative;flex:0 0 auto;min-width:160px;max-width:210px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px;animation-delay:'+(idx*0.35)+'s;transition:border-color .2s;';
      var short = item.title.length > 44 ? item.title.slice(0,44)+'…' : item.title;
      card.innerHTML = '<a href="'+esc(item.url)+'" style="text-decoration:none;color:inherit;display:block;">'
        + '<div style="font-size:1.4rem;">🔖</div>'
        + '<div style="font-weight:600;font-size:.85rem;margin-top:6px;line-height:1.3;">'+esc(short)+'</div>'
        + '<div class="tiny" style="opacity:.6;margin-top:4px;">Read now →</div></a>'
        + '<button type="button" aria-label="Remove" data-sl-rm="'+esc(item.url)+'" style="position:absolute;top:6px;right:8px;background:none;border:none;cursor:pointer;font-size:1rem;opacity:.55;">✕</button>';
      box.appendChild(card);
    });
    box.querySelectorAll('[data-sl-rm]').forEach(function(btn){
      btn.addEventListener('click', function(){
        remove(btn.getAttribute('data-sl-rm'));
        toast('❌ Removed from Saved');
        render();
      });
    });
  }

  /* Article pages: inject a Save button after the H1 (additive, no HTML edits) */
  function injectArticleButton(){
    var wrap = document.querySelector('main.article-wrap');
    if (!wrap) return;
    var h1 = wrap.querySelector('h1');
    if (!h1 || document.getElementById('sl-article-btn')) return;
    ensureAnim();
    var url = pagePath(), title = pageTitle();
    var btn = document.createElement('button');
    btn.type = 'button'; btn.id = 'sl-article-btn'; btn.className = 'sl-btn';
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:8px;margin:10px 0;padding:10px 18px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:inherit;font-size:.95rem;font-weight:600;cursor:pointer;';
    function paint(){
      btn.innerHTML = has(url) ? '✅ Saved — tap to remove' : '🔖 Save for Later';
      btn.setAttribute('aria-pressed', has(url) ? 'true' : 'false');
    }
    btn.addEventListener('click', function(){
      if (has(url)) { remove(url); toast('❌ Removed from Saved'); }
      else { add(url, pageTitle()); toast('🔖 Saved for later!'); }
      paint(); render();
    });
    paint();
    h1.insertAdjacentElement('afterend', btn);
    window.SawalSave._syncArticle = paint;
  }
  function syncButtons(){
    if (window.SawalSave._syncArticle) window.SawalSave._syncArticle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ render(); injectArticleButton(); });
  } else { render(); injectArticleButton(); }
})();
