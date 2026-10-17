/* US AI Global Site Search — searches all pages, tools, dramas */
(function () {
  "use strict";
  var INDEX = null, box = null, input = null, results = null;

  function loadIndex(cb) {
    if (INDEX) return cb(INDEX);
    fetch("site-search-index.json").then(function (r) { return r.json(); })
      .then(function (d) { INDEX = d; cb(d); })
      .catch(function () { cb([]); });
  }

  /* 2026-10-12 power-search operators (additive): lang:xx, type:tool|article|page|drama, free:yes */
  function parseOps(q) {
    var ops = { type: null, lang: null, free: false }, rest = [];
    q.split(/\s+/).forEach(function (w) {
      var m = w.match(/^(type|lang):([a-z-]{2,10})$/);
      if (m) { ops[m[1]] = m[2]; return; }
      if (w === "free:yes") { ops.free = true; return; }
      rest.push(w);
    });
    return { ops: ops, q: rest.join(" ") };
  }
  function passOps(item, ops) {
    if (ops.type && item.c !== ops.type) return false;
    if (ops.lang) {
      var um = item.u.match(/-([a-z]{2})\.html$/);
      var itemLang = um ? um[1] : "en"; /* tools/pages default English */
      if (itemLang !== ops.lang) return false;
    }
    if (ops.free && (item.t + " " + item.d).toLowerCase().indexOf("free") === -1) return false;
    return true;
  }
  function search(q) {
    q = q.toLowerCase().trim();
    if (!q) return [];
    var p = parseOps(q);
    q = p.q;
    if (!q && !p.ops.type && !p.ops.lang && !p.ops.free) return [];
    if (q && q.length < 2) return [];
    var words = q ? q.split(/\s+/) : [];
    return INDEX.filter(function (item) { return passOps(item, p.ops); })
      .map(function (item) {
        var hay = (item.t + " " + item.d).toLowerCase(), score = 0;
        words.forEach(function (w) {
          if (item.t.toLowerCase().indexOf(w) > -1) score += 3;
          else if (hay.indexOf(w) > -1) score += 1;
        });
        return { item: item, score: words.length ? score : 1 };
      }).filter(function (x) { return x.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 8).map(function (x) { return x.item; });
  }

  function catIcon(c) {
    return { page: "📄", tool: "🔧", drama: "🎬" }[c] || "📄";
  }

  function render(list, target) {
    target = target || results;
    if (!list.length) {
      target.innerHTML = '<div class="gs-empty">No results — try another keyword.</div>';
    } else {
      target.innerHTML = list.map(function (i) {
        return '<a class="gs-item" href="' + i.u + '"><span class="gs-ic">' + catIcon(i.c) + '</span>' +
          '<span><b>' + esc(i.t) + '</b><small>' + esc(i.d.slice(0, 70)) + '</small></span></a>';
      }).join("");
    }
    target.style.display = "block";
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function init() {
    box = document.getElementById("global-search");
    if (box) initHeroSearch();
    initNavSearch();
  }

  function initHeroSearch() {
    input = box.querySelector("input");
    results = document.getElementById("global-search-results");
    loadIndex(function () {});

    var t = null;
    input.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var q = input.value;
        if (q.trim().length < 2) { results.style.display = "none"; return; }
        loadIndex(function () { render(search(q), results); });
      }, 200);
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = results.querySelector(".gs-item");
        if (first) location.href = first.getAttribute("href");
      }
      if (e.key === "Escape") results.style.display = "none";
    });

    document.addEventListener("click", function (e) {
      if (!box.contains(e.target)) results.style.display = "none";
    });
    input.addEventListener("focus", function () {
      if (input.value.trim().length >= 2) loadIndex(function () { render(search(input.value), results); });
    });
  }

  function initNavSearch() {
    var btn = document.getElementById("nav-search-btn"), pop = document.getElementById("nav-search-pop");
    if (!btn || !pop) return;
    var inp = document.getElementById("nav-search-input"), res = document.getElementById("nav-search-results");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = pop.style.display !== "none";
      pop.style.display = open ? "none" : "block";
      if (!open) inp.focus();
    });
    document.addEventListener("click", function (e) {
      if (!pop.contains(e.target) && e.target !== btn) pop.style.display = "none";
    });
    var t = null;
    inp.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        if (inp.value.trim().length < 2) { res.style.display = "none"; return; }
        loadIndex(function () { render(search(inp.value), res); });
      }, 200);
    });
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var first = res.querySelector(".gs-item");
        if (first) location.href = first.getAttribute("href");
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
