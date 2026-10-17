/* US AI article search — client-side, instant, no server needed. */
(function () {
  "use strict";
  var input = document.getElementById("article-search");
  var box = document.getElementById("search-results");
  if (!input || !box) return;

  var index = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* PThink4 P1 2026-10-11: 6.2MB index on-demand — pehli keypress/focus par fetch (page load par nahi) */
  var indexPromise = null;
  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch("search-index.json")
        .then(function (r) { return r.ok ? r.json() : []; })
        .then(function (data) { index = data || []; })
        .catch(function () { index = []; });
    }
    return indexPromise;
  }
  input.addEventListener("focus", loadIndex, { once: true });

  var timer = null;
  input.addEventListener("input", function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(runSearch, 180);
  });
  document.addEventListener("click", function (e) {
    if (!box.hidden && !box.contains(e.target) && e.target !== input) box.hidden = true;
  });

  function runSearch() {
    var q = input.value.trim().toLowerCase();
    if (!index || q.length < 2) { box.hidden = true; box.innerHTML = ""; return; }
    var words = q.split(/\s+/);
    var hits = [];
    for (var i = 0; i < index.length && hits.length < 8; i++) {
      var it = index[i];
      var hay = ((it.t || "") + " " + (it.d || "")).toLowerCase();
      var ok = true;
      for (var w = 0; w < words.length; w++) {
        if (hay.indexOf(words[w]) === -1) { ok = false; break; }
      }
      if (ok) hits.push(it);
    }
    if (!hits.length) {
      box.innerHTML = '<div class="sr-empty">No articles found — try "AI", "earning" or "crypto".</div>';
    } else {
      var html = "";
      for (var k = 0; k < hits.length; k++) {
        html += '<a class="sr-item" href="' + esc(hits[k].u) + '">' +
                '<span class="sr-lang">' + esc(hits[k].l || "") + '</span>' +
                '<span class="sr-title">' + esc(hits[k].t || "") + '</span></a>';
      }
      box.innerHTML = html;
    }
    box.hidden = false;
  }
})();
