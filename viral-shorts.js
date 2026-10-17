/* SawalAI Viral Shorts — per-drama outbound links to platform viral shorts.
   ADD-ONLY. No video hosting, no re-uploads, no embeds — outbound links only.
   Geo-IP via ipapi.co (cached in localStorage) picks the query language. */
(function () {
  "use strict";
  var DATA_URL = "data/viral-shorts.json";
  var dataCache = null;

  /* drama display name -> data key (diacritic-insensitive keyword match) */
  var KEYS = [
    ["ertugrul", ["ertugrul", "ertug"]],
    ["osman", ["osman"]],
    ["orhan", ["orhan"]],
    ["alparslan", ["alparslan"]],
    ["uyanis", ["uyanis", "uyanı"]],
    ["mehmed", ["mehmed"]],
    ["selahaddin", ["selahaddin"]],
    ["barbaroslar", ["barbaros"]],
    ["payitaht", ["payitaht", "abdulhamid"]],
    ["destan", ["destan"]]
  ];
  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/[àáâãäå]/g, "a").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i")
      .replace(/[òóôõö]/g, "o").replace(/[ùúûü]/g, "u").replace(/[ç]/g, "c")
      .replace(/[ğ]/g, "g").replace(/[ı]/g, "i").replace(/[ş]/g, "s");
  }
  function vsKey(name) {
    var n = norm(name);
    for (var i = 0; i < KEYS.length; i++) {
      var kw = KEYS[i][1];
      for (var j = 0; j < kw.length; j++) {
        if (n.indexOf(kw[j]) > -1) return KEYS[i][0];
      }
    }
    return "";
  }

  function loadData(cb) {
    if (dataCache) return cb(dataCache);
    fetch(DATA_URL, { cache: "no-store" }).then(function (r) { return r.json(); })
      .then(function (j) { dataCache = j || {}; cb(dataCache); })
      .catch(function () { cb({}); });
  }

  /* geo -> language, cached */
  function getLang(cb) {
    try {
      var c = localStorage.getItem("sawal_geo_lang");
      if (c) return cb(c);
    } catch (e) {}
    fetch("https://ipapi.co/json/").then(function (r) { return r.json(); })
      .then(function (g) {
        var cc = String((g && g.country_code) || "").toUpperCase();
        var lang = "en";
        if (cc === "TR") lang = "tr";
        else if (cc === "PK") lang = "ur";
        else if (/^(SA|AE|EG|QA|KW|BH|OM|JO|IQ|SY|YE|LB|PS|DZ|MA|TN|LY|SD)$/.test(cc)) lang = "ar";
        try { localStorage.setItem("sawal_geo_lang", lang); } catch (e2) {}
        cb(lang);
      })
      .catch(function () { cb("en"); });
  }

  /* ---------- modal ---------- */
  var modal = null, modalName = null, modalBtns = null;
  function ensureModal() {
    if (modal) return;
    var css = document.createElement("style");
    css.textContent =
      ".vs-overlay{position:fixed;inset:0;z-index:10000;background:rgba(8,6,20,.72);backdrop-filter:blur(6px);" +
      "display:flex;align-items:center;justify-content:center;padding:16px;opacity:0;pointer-events:none;transition:opacity .25s;}" +
      ".vs-overlay.open{opacity:1;pointer-events:auto;}" +
      ".vs-box{width:100%;max-width:360px;background:linear-gradient(160deg,#171434,#0e0c26);border:1px solid rgba(168,85,247,.5);" +
      "border-radius:20px;padding:22px 18px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.6);" +
      "animation:vsFloat 5s ease-in-out infinite;transform:translateY(12px);transition:transform .25s;}" +
      ".vs-overlay.open .vs-box{transform:translateY(0);}" +
      "@keyframes vsFloat{0%,100%{box-shadow:0 12px 40px rgba(139,92,246,.25);}50%{box-shadow:0 18px 54px rgba(236,72,153,.4);}}" +
      ".vs-title{margin:0 0 4px;font-size:1.05rem;color:#fff;}" +
      ".vs-sub{margin:0 0 16px;font-size:.72rem;color:#a7a7c8;}" +
      ".vs-plats{display:grid;grid-template-columns:1fr 1fr;gap:10px;}" +
      ".vs-plat{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 8px;border-radius:14px;" +
      "font-weight:800;font-size:.85rem;color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,.14);" +
      "transition:transform .18s,box-shadow .18s;animation:vsBtnGlow 3s ease-in-out infinite;}" +
      ".vs-plat:hover{transform:translateY(-3px) scale(1.04);}" +
      "@keyframes vsBtnGlow{0%,100%{filter:brightness(1);}50%{filter:brightness(1.18);}}" +
      ".vs-tiktok{background:linear-gradient(135deg,#111,#333);border-color:#fe2c55;}" +
      ".vs-youtube{background:linear-gradient(135deg,#c81e1e,#7a0e0e);border-color:#ff4e45;}" +
      ".vs-instagram{background:linear-gradient(135deg,#f58529,#dd2a7b,#8134af);border-color:#f58529;}" +
      ".vs-facebook{background:linear-gradient(135deg,#1877f2,#0d3f8f);border-color:#5aa1ff;}" +
      ".vs-close{margin-top:14px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:#fff;" +
      "border-radius:999px;padding:8px 26px;font-weight:700;cursor:pointer;font-size:.8rem;}" +
      ".vs-note{margin:12px 0 0;font-size:.62rem;color:#8b8ba8;}";
    document.head.appendChild(css);
    modal = document.createElement("div");
    modal.className = "vs-overlay";
    modal.id = "vs-overlay";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML =
      '<div class="vs-box">' +
      '<h3 class="vs-title" id="vs-title"></h3>' +
      '<p class="vs-sub">Choose a platform — viral shorts open in a new tab</p>' +
      '<div class="vs-plats" id="vs-plats">' +
      '<a class="vs-plat vs-tiktok" data-p="tiktok" target="_blank" rel="noopener"><span>🎵</span>TikTok</a>' +
      '<a class="vs-plat vs-youtube" data-p="youtube" target="_blank" rel="noopener"><span>▶️</span>YouTube</a>' +
      '<a class="vs-plat vs-instagram" data-p="instagram" target="_blank" rel="noopener"><span>📸</span>Instagram</a>' +
      '<a class="vs-plat vs-facebook" data-p="facebook" target="_blank" rel="noopener"><span>👍</span>Facebook</a>' +
      "</div>" +
      '<button type="button" class="vs-close" id="vs-close">Close</button>' +
      '<p class="vs-note">Links open public viral clips on each platform — nothing is hosted here.</p>' +
      "</div>";
    document.body.appendChild(modal);
    modalName = modal.querySelector("#vs-title");
    modalBtns = modal.querySelectorAll(".vs-plat");
    modal.querySelector("#vs-close").addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }
  function close() {
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function open(key, displayName) {
    ensureModal();
    loadData(function (d) {
      var entry = d[key] || {};
      getLang(function (lang) {
        var terms = entry.terms || {};
        var q = terms[lang] || terms.en || displayName || "";
        var tag = (entry.tag || "").replace(/[^a-z0-9]/gi, "");
        modalName.textContent = "📱 " + (entry.name || displayName || "Viral Shorts");
        modalBtns.forEach(function (a) {
          var p = a.getAttribute("data-p"), url = "";
          if (p === "tiktok") url = "https://www.tiktok.com/search?q=" + encodeURIComponent(q + " shorts");
          else if (p === "youtube") url = "https://www.youtube.com/results?search_query=" + encodeURIComponent(q + " viral shorts");
          else if (p === "instagram") url = "https://www.instagram.com/explore/tags/" + tag + "/";
          else if (p === "facebook") url = "https://www.facebook.com/hashtag/" + tag;
          a.href = url;
        });
        modal.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
  }

  /* delegated clicks for .vs-pill / .vs-btn anywhere */
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-vs-key]") : null;
    if (!t) return;
    var key = t.getAttribute("data-vs-key");
    if (!key) return;
    e.preventDefault();
    e.stopPropagation();
    open(key, t.getAttribute("data-vs-name") || "");
  }, true); /* capture: runs before page-level bubble handlers */

  window.SawalViralShorts = { open: open, keyFor: vsKey };
})();
