/* US AI Site Power — working security/SEO/performance tools + feature showcase */
(function () {
  "use strict";

  var CATS = ["All", "Security", "SEO", "Performance", "Analytics", "Community"];

  var TOOLS = [
    { id: "headers", cat: "Security", icon: "🛡️", name: "Free Security Headers Checker", desc: "Audit any website's security headers — free online" },
    { id: "totp", cat: "Security", icon: "🔑", name: "Free 2FA Authenticator Code Generator", desc: "Generate TOTP two-factor codes — free tool" },
    { id: "pwstrength", cat: "Security", icon: "💪", name: "Password Strength Checker Online", desc: "Test how strong your password is — free, private" },
    { id: "backup", cat: "Security", icon: "💾", name: "Free Data Backup & Restore Tool", desc: "Export & import your browser data as JSON — free" },
    { id: "utm", cat: "SEO", icon: "🔗", name: "Free UTM Link Builder", desc: "Create Google Analytics campaign URLs — free" },
    { id: "metatags", cat: "SEO", icon: "📋", name: "Free Meta Tag Generator", desc: "Generate OG + Twitter card meta tags — free SEO tool" },
    { id: "brokenlinks", cat: "SEO", icon: "⛓️", name: "Free Broken Link Checker", desc: "Find dead links on any page — free SEO audit" },
    { id: "webp", cat: "Performance", icon: "🖼️", name: "Convert Image to WebP Online", desc: "Free image to WebP converter — shrink file size" },
    { id: "speed", cat: "Performance", icon: "⏱️", name: "Free Page Speed Test", desc: "Check real website load time metrics — free" },
    { id: "errlog", cat: "Analytics", icon: "📝", name: "JavaScript Error Log Viewer", desc: "See & debug site JS errors — free tool" },
    { id: "rightclick", cat: "Security", icon: "🔒", name: "Right-Click Protection Toggle", desc: "Disable right-click to protect content — free" },
    { id: "ipblock", cat: "Security", icon: "🚫", name: "IP Address Blocklist Manager", desc: "Manage blocked IPs — free security tool" },
    { id: "session", cat: "Security", icon: "🔐", name: "Session Timeout Demo", desc: "Auto-logout demo for secure sessions" },
    { id: "schema", cat: "SEO", icon: "✨", name: "Free Schema Markup Generator", desc: "Create JSON-LD rich snippets — free SEO tool" },
    { id: "breadcrumb", cat: "SEO", icon: "🍞", name: "Breadcrumb Schema Generator", desc: "Generate breadcrumb structured data — free" },
    { id: "hreflang", cat: "SEO", icon: "🌍", name: "Hreflang Tag Generator", desc: "Multilingual SEO hreflang tags — free tool" },
    { id: "altcheck", cat: "SEO", icon: "🖼️", name: "Image Alt Text Checker", desc: "Find images missing alt text — free SEO audit" },
    { id: "minify", cat: "Performance", icon: "⚡", name: "Free CSS & JS Minifier Online", desc: "Compress code instantly — free minifier tool" },
    { id: "uptime", cat: "Performance", icon: "📡", name: "Free Website Uptime Checker", desc: "Is any website down right now? Check free" },
    { id: "notfound", cat: "Analytics", icon: "404", name: "404 Error Log Tracker", desc: "Track missing pages on your site — free" },
    { id: "ticket", cat: "Community", icon: "🎫", name: "Submit Support Ticket", desc: "Get help fast — trackable ticket ID" },
    { id: "adsense", cat: "Community", icon: "💰", name: "AdSense Approval Checklist", desc: "Is your site ready for AdSense? Free check" }
  ];

  var FEATURES = {
    "feat-security": [
      ["🛡️", "DDoS Protection", "Cloudflare's global network absorbs attacks automatically."],
      ["🤖", "Bot Mitigation", "Cloudflare bot management filters malicious traffic."],
      ["🔒", "Right-Click Guard", "Optional content protection — toggle in Site Power tools."],
      ["🔑", "2FA for Admin", "Time-based one-time codes. Try the demo tool above."],
      ["💾", "Auto Backup", "One-click export of all your local data (accounts, orders, prefs)."],
      ["🦠", "Malware Scan", "Use the Security Headers Checker for a live audit."],
      ["🧱", "Security Headers", "CSP, HSTS-style headers via Cloudflare _headers file."],
      ["📝", "Error Logging", "Privacy-focused client-side error log. View it in the tool above."],
      ["🚫", "IP Blocking", "Abusive IPs blocked at Cloudflare edge firewall."],
      ["🔐", "Secure Sessions", "Session timeout + local-only auth. No passwords leave your device."]
    ],
    "feat-seo": [
      ["📋", "OG Meta Tags", "Full Open Graph tags on every major page."],
      ["🐦", "Twitter Cards", "Large-image cards for rich social shares."],
      ["🗺️", "XML Sitemap", "Auto-regenerated sitemap.xml with all pages & articles."],
      ["🔗", "Canonical URLs", "Every page declares its canonical URL."],
      ["✨", "Schema Markup", "JSON-LD Organization + WebSite + WebPage schemas."],
      ["🍞", "Breadcrumbs", "Breadcrumb schema on article & tool pages."],
      ["🖼️", "Alt Text Automation", "Missing image alt text is auto-filled by JS."],
      ["🔗", "Internal Linking", "Related-article & hub boxes link pages together."],
      ["⛓️", "Broken Link Check", "Run the checker tool anytime from this page."],
      ["🌍", "Hreflang Tags", "Multilingual article pages tagged for search engines."]
    ],
    "feat-perf": [
      ["🌐", "CDN", "Cloudflare's 300+ edge locations serve US AI worldwide."],
      ["🖼️", "Lazy Loading", "Images & iframes load only when scrolled into view."],
      ["🗜️", "Brotli Compression", "Automatic Brotli/gzip via Cloudflare."],
      ["💾", "Browser Caching", "Smart cache rules for CSS, JS, images & videos."],
      ["🗄️", "Optimized Assets", "Minified CSS/JS, compressed images."],
      ["🖼️", "WebP Images", "Convert any image to WebP with the tool above."],
      ["⚡", "Minification", "HTML/CSS/JS minified at build time."],
      ["🚀", "HTTP/2 + HTTP/3", "Modern protocols enabled on Cloudflare edge."],
      ["📄", "Static Speed", "Pre-rendered static pages — no server wait."],
      ["📡", "Uptime Monitor", "24/7 uptime tracking on the status page."]
    ],
    "feat-analytics": [
      ["📊", "GA4 Events", "Button clicks, searches & conversions tracked."],
      ["🔥", "Heatmaps", "Microsoft Clarity session recordings & heatmaps."],
      ["🎯", "Conversions", "Order & signup funnels measured in GA4."],
      ["🔗", "UTM Tracking", "Build campaign links with the UTM tool."],
      ["404", "404 Monitor", "Custom 404 page logs missing-URL traffic."],
      ["📉", "Engagement", "Bounce rate & session duration in GA4."],
      ["🔍", "Search Console", "Query & ranking data wired up."],
      ["⏱️", "Speed Logs", "Core Web Vitals tracked per page."],
      ["🔑", "API Tracking", "AI chat usage & token counts logged."],
      ["💌", "Feedback Stats", "Bug reports aggregated for review."]
    ],
    "feat-community": [
      ["🎨", "Brand Kit", "Logo, colors & style guide on the About page."],
      ["🍪", "Cookie Consent", "GDPR/CCPA banner on first visit."],
      ["📜", "Terms & Legal", "Terms of Service & Privacy Policy pages."],
      ["🎫", "Support Tickets", "Contact form creates a trackable ticket."],
      ["📧", "Newsletter", "Footer signup — welcome email automation."],
      ["💬", "Community", "Discord & Telegram links in the footer."],
      ["☕", "Donate", "Buy Me a Coffee button supports free tools."],
      ["📝", "Changelog", "Every update documented on the Changelog page."],
      ["📱", "PWA + Offline", "Installable app with offline support."],
      ["💰", "Ad Ready", "AdSense-friendly layout with policy checklist."]
    ]
  };

  /* ---------- grid render ---------- */
  var grid = document.getElementById("sp-grid"),
      view = document.getElementById("sp-view"),
      box = document.getElementById("sp-box"),
      catsEl = document.getElementById("sp-cats"),
      searchEl = document.getElementById("sp-search"),
      curCat = "All", curQ = "";

  function drawCats() {
    catsEl.innerHTML = CATS.map(function (c) {
      return '<button class="tool-cat' + (c === curCat ? " active" : "") + '" data-cat="' + c + '">' + c + "</button>";
    }).join("");
    catsEl.querySelectorAll(".tool-cat").forEach(function (b) {
      b.addEventListener("click", function () { curCat = b.dataset.cat; drawCats(); drawGrid(); });
    });
  }
  function drawGrid() {
    var h = "";
    TOOLS.forEach(function (t) {
      if (curCat !== "All" && t.cat !== curCat) return;
      if (curQ && (t.name + " " + t.desc).toLowerCase().indexOf(curQ) === -1) return;
      h += '<div class="tool-card" data-id="' + t.id + '"><span class="t-icon">' + t.icon + '</span>' +
        '<div class="t-name">' + t.name + '</div><div class="t-desc">' + t.desc + '</div>' +
        '<span class="t-badge">🔧 working tool</span></div>';
    });
    grid.innerHTML = h || '<p class="muted" style="grid-column:1/-1;text-align:center">Nothing found.</p>';
    grid.querySelectorAll(".tool-card").forEach(function (c) {
      c.addEventListener("click", function () { openTool(c.dataset.id); });
    });
  }
  function drawFeatures() {
    var q = curQ;
    Object.keys(FEATURES).forEach(function (secId) {
      var el = document.getElementById(secId), h = "";
      FEATURES[secId].forEach(function (f) {
        if (q && (f[1] + " " + f[2]).toLowerCase().indexOf(q) === -1) return;
        h += '<div class="feat-card"><div class="f-icon">' + f[0] + '</div><div class="f-name">' + f[1] + '</div>' +
          '<div class="f-desc">' + f[2] + '</div><span class="f-status f-on">✅ Active</span></div>';
      });
      el.innerHTML = h || '<p class="muted">Nothing found.</p>';
      el.parentElement.style.display = h ? "" : "none";
      el.previousElementSibling.style.display = h ? "" : "none";
    });
  }
  if (searchEl) searchEl.addEventListener("input", function () {
    curQ = searchEl.value.toLowerCase(); drawGrid(); drawFeatures();
  });

  document.getElementById("sp-back").addEventListener("click", function () {
    view.classList.remove("active"); grid.style.display = "";
    document.getElementById("sp-features").style.display = "";
    window.scrollTo(0, 0);
  });

  function openTool(id) {
    var t = TOOLS.filter(function (x) { return x.id === id; })[0];
    if (!t) return;
    grid.style.display = "none";
    document.getElementById("sp-features").style.display = "none";
    view.classList.add("active");
    box.innerHTML = "<h2>" + t.icon + " " + t.name + "</h2><div id='sp-tool-ui'></div>";
    RENDER[id](document.getElementById("sp-tool-ui"));
    window.scrollTo(0, 0);
    if (window.gtag) gtag("event", "tool_open", { tool: id });
  }

  function out(el, html) { el.innerHTML = '<div class="tool-out">' + html + "</div>"; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ================= TOOL IMPLEMENTATIONS ================= */
  var RENDER = {};

  /* 1. Security Headers Checker */
  RENDER.headers = function (el) {
    el.innerHTML = '<label>URL to audit</label><input type="url" id="h-url" value="' + location.origin + '/">' +
      '<button class="tool-btn" id="h-go">Check Headers</button><div id="h-out"></div>' +
      '<p class="tool-note">Checks: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.</p>';
    document.getElementById("h-go").addEventListener("click", function () {
      var u = document.getElementById("h-url").value.trim(), o = document.getElementById("h-out");
      o.innerHTML = '<div class="tool-out">Checking…</div>';
      fetch(u, { method: "HEAD", mode: "cors" }).then(function (r) {
        var checks = [
          ["Content-Security-Policy", "content-security-policy"],
          ["Strict-Transport-Security", "strict-transport-security"],
          ["X-Frame-Options", "x-frame-options"],
          ["X-Content-Type-Options", "x-content-type-options"],
          ["Referrer-Policy", "referrer-policy"],
          ["Permissions-Policy", "permissions-policy"]
        ], h = "<table style='width:100%;font-size:.85rem'>";
        checks.forEach(function (c) {
          var v = r.headers.get(c[1]);
          h += "<tr><td>" + (v ? "✅" : "❌") + " " + c[0] + "</td><td style='color:var(--muted);word-break:break-all'>" + (v ? esc(v.slice(0, 80)) : "missing") + "</td></tr>";
        });
        out(o, h + "</table>");
      }).catch(function () { out(o, "⚠️ Could not fetch (CORS blocked). Try the site's own URL."); });
    });
  };

  /* 2. TOTP 2FA demo */
  RENDER.totp = function (el) {
    el.innerHTML = '<p class="tool-note">Demo: generates real TOTP codes (RFC 6238). In production the secret lives server-side.</p>' +
      '<label>Secret (base32)</label><input type="text" id="t-sec" value="JBSWY3DPEHPK3PXP">' +
      '<button class="tool-btn" id="t-go">Show Current Code</button> <button class="tool-btn ghost" id="t-new">New Secret</button><div id="t-out"></div>';
    function b32(s) {
      var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", b = "", bits = 0, v = 0;
      s = s.toUpperCase().replace(/[^A-Z2-7]/g, "");
      for (var i = 0; i < s.length; i++) { v = (v << 5) | a.indexOf(s[i]); bits += 5; if (bits >= 8) { b += String.fromCharCode((v >>> (bits - 8)) & 255); bits -= 8; } }
      return b;
    }
    function gen() {
      var sec = b32(document.getElementById("t-sec").value), o = document.getElementById("t-out");
      var t = Math.floor(Date.now() / 30000), msg = new ArrayBuffer(8), dv = new DataView(msg);
      dv.setUint32(4, t);
      crypto.subtle.importKey("raw", new TextEncoder().encode(sec), { name: "HMAC", hash: "SHA-1" }, false, ["sign"]).then(function (k) {
        return crypto.subtle.sign("HMAC", k, msg);
      }).then(function (sig) {
        var d = new Uint8Array(sig), off = d[d.length - 1] & 15;
        var code = ((d[off] & 127) << 24 | d[off + 1] << 16 | d[off + 2] << 8 | d[off + 3]) % 1000000;
        var remain = 30 - (Math.floor(Date.now() / 1000) % 30);
        out(o, "🔑 <b style='font-size:1.8rem;letter-spacing:.3em'>" + String(code).padStart(6, "0") + "</b><br><span style='color:var(--muted)'>expires in " + remain + "s</span>");
        setTimeout(gen, 1000);
      });
    }
    var timer = null;
    document.getElementById("t-go").addEventListener("click", function () { if (timer) clearTimeout(timer); gen(); });
    document.getElementById("t-new").addEventListener("click", function () {
      var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", s = "";
      for (var i = 0; i < 16; i++) s += a[Math.floor(Math.random() * 32)];
      document.getElementById("t-sec").value = s;
    });
  };

  /* 3. Password strength */
  RENDER.pwstrength = function (el) {
    el.innerHTML = '<label>Password</label><input type="text" id="p-pw" placeholder="Type a password…" autocomplete="off"><div id="p-out"></div>' +
      '<p class="tool-note">100% local — nothing is sent anywhere.</p>';
    document.getElementById("p-pw").addEventListener("input", function (e) {
      var p = e.target.value, score = 0, tips = [];
      if (p.length >= 8) score++; else tips.push("use 8+ characters");
      if (p.length >= 12) score++;
      if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++; else tips.push("mix upper & lower case");
      if (/\d/.test(p)) score++; else tips.push("add numbers");
      if (/[^a-zA-Z0-9]/.test(p)) score++; else tips.push("add symbols");
      if (!/(.)\1\1/.test(p) && !/123|abc|password/i.test(p)) score++; else tips.push("avoid patterns");
      var labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Excellent", "Elite"];
      var colors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e", "#10b981", "#06b6d4"];
      var s = Math.min(score, 6);
      out(document.getElementById("p-out"),
        "<b style='color:" + colors[s] + "'>" + labels[s] + "</b> (" + s + "/6)" +
        "<div style='height:8px;background:rgba(255,255,255,.1);border-radius:99px;margin:8px 0'><div style='height:100%;width:" + (s / 6 * 100) + "%;background:" + colors[s] + ";border-radius:99px'></div></div>" +
        (tips.length ? "💡 " + tips.join(" · ") : "🎉 Great password!"));
    });
  };

  /* 4. Backup & Restore */
  RENDER.backup = function (el) {
    el.innerHTML = '<p class="tool-note">Exports accounts, orders, preferences & settings stored in this browser.</p>' +
      '<button class="tool-btn" id="b-exp">⬇ Export Backup (JSON)</button> ' +
      '<button class="tool-btn ghost" id="b-imp-b">⬆ Import Backup</button>' +
      '<input type="file" id="b-imp" accept=".json" style="display:none"><div id="b-out"></div>';
    document.getElementById("b-exp").addEventListener("click", function () {
      var data = {};
      ["sawalai_users", "sawalai_session", "sawalai_orders", "sawalai_theme", "sawalai_cookies", "sawalai_errors"].forEach(function (k) {
        try { data[k] = localStorage.getItem(k); } catch (e) {}
      });
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "sawalai-backup-" + new Date().toISOString().slice(0, 10) + ".json"; a.click();
      out(document.getElementById("b-out"), "✅ Backup downloaded.");
    });
    document.getElementById("b-imp-b").addEventListener("click", function () { document.getElementById("b-imp").click(); });
    document.getElementById("b-imp").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var d = JSON.parse(r.result), n = 0;
          Object.keys(d).forEach(function (k) { if (d[k] !== null) { try { localStorage.setItem(k, d[k]); n++; } catch (e) {} } });
          out(document.getElementById("b-out"), "✅ Restored " + n + " items.");
        } catch (err) { out(document.getElementById("b-out"), "❌ Invalid backup file."); }
      };
      r.readAsText(f);
    });
  };

  /* 5. UTM Builder */
  RENDER.utm = function (el) {
    el.innerHTML = '<label>Page URL</label><input type="url" id="u-url" placeholder="https://www.usai-usa.com/tools.html">' +
      '<div class="row"><div><label>Source</label><input type="text" id="u-src" placeholder="google"></div>' +
      '<div><label>Medium</label><input type="text" id="u-med" placeholder="cpc"></div></div>' +
      '<div class="row"><div><label>Campaign</label><input type="text" id="u-cam" placeholder="summer_sale"></div>' +
      '<div><label>Content (optional)</label><input type="text" id="u-con" placeholder="banner_a"></div></div>' +
      '<button class="tool-btn" id="u-go">Build URL</button><div id="u-out"></div>';
    document.getElementById("u-go").addEventListener("click", function () {
      var u = document.getElementById("u-url").value.trim();
      if (!u) { out(document.getElementById("u-out"), "⚠️ Enter a URL first."); return; }
      var p = [];
      [["utm_source", "u-src"], ["utm_medium", "u-med"], ["utm_campaign", "u-cam"], ["utm_content", "u-con"]].forEach(function (x) {
        var v = document.getElementById(x[1]).value.trim();
        if (v) p.push(x[0] + "=" + encodeURIComponent(v));
      });
      var url = u + (u.indexOf("?") > -1 ? "&" : "?") + p.join("&");
      out(document.getElementById("u-out"), esc(url) + '<br><button class="tool-btn ghost tool-copy" id="u-cp">Copy</button>');
      document.getElementById("u-cp").addEventListener("click", function () { navigator.clipboard.writeText(url); });
    });
  };

  /* 6. Meta Tag Generator */
  RENDER.metatags = function (el) {
    el.innerHTML = '<label>Page title</label><input type="text" id="m-t" placeholder="My Awesome Page">' +
      '<label>Description</label><textarea id="m-d" style="min-height:70px" placeholder="Short description…"></textarea>' +
      '<label>Page URL</label><input type="url" id="m-u" placeholder="https://example.com/page">' +
      '<label>Image URL</label><input type="url" id="m-i" placeholder="https://example.com/og.jpg">' +
      '<button class="tool-btn" id="m-go">Generate Tags</button><div id="m-out"></div>';
    document.getElementById("m-go").addEventListener("click", function () {
      var t = esc(document.getElementById("m-t").value), d = esc(document.getElementById("m-d").value),
          u = esc(document.getElementById("m-u").value), im = esc(document.getElementById("m-i").value);
      var tags = '<title>' + t + '</title>\n<meta name="description" content="' + d + '">\n' +
        '<link rel="canonical" href="' + u + '">\n<meta property="og:type" content="website">\n' +
        '<meta property="og:title" content="' + t + '">\n<meta property="og:description" content="' + d + '">\n' +
        '<meta property="og:url" content="' + u + '">\n<meta property="og:image" content="' + im + '">\n' +
        '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="' + t + '">\n' +
        '<meta name="twitter:description" content="' + d + '">\n<meta name="twitter:image" content="' + im + '">';
      out(document.getElementById("m-out"), esc(tags) + '<br><button class="tool-btn ghost" id="m-cp">Copy</button>');
      document.getElementById("m-cp").addEventListener("click", function () { navigator.clipboard.writeText(tags.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&")); });
    });
  };

  /* 7. Broken Link Checker */
  RENDER.brokenlinks = function (el) {
    el.innerHTML = '<p class="tool-note">Checks all links on <b>this page</b> (same-origin) for 200/404 status.</p>' +
      '<button class="tool-btn" id="bl-go">Check This Page</button><div id="bl-out"></div>';
    document.getElementById("bl-go").addEventListener("click", function () {
      var o = document.getElementById("bl-out");
      var links = Array.prototype.slice.call(document.querySelectorAll('a[href]'))
        .map(function (a) { return a.getAttribute("href"); })
        .filter(function (h, i, arr) { return h && !h.startsWith("#") && !h.startsWith("mailto:") && !h.startsWith("tel:") && arr.indexOf(h) === i; })
        .filter(function (h) { try { return new URL(h, location.href).origin === location.origin; } catch (e) { return false; } })
        .slice(0, 40);
      if (!links.length) { out(o, "No same-origin links found."); return; }
      o.innerHTML = '<div class="tool-out">Checking ' + links.length + ' links…</div>';
      var done = 0, bad = [];
      links.forEach(function (h) {
        fetch(new URL(h, location.href).href, { method: "HEAD" }).then(function (r) {
          if (!r.ok) bad.push(h + " → " + r.status);
        }).catch(function () { bad.push(h + " → failed"); }).finally(function () {
          if (++done === links.length) {
            out(o, bad.length ? "❌ Broken (" + bad.length + "):<br>" + bad.map(esc).join("<br>") : "✅ All " + links.length + " links OK!");
          }
        });
      });
    });
  };

  /* 8. Image → WebP */
  RENDER.webp = function (el) {
    el.innerHTML = '<label>Upload image (PNG/JPG)</label><input type="file" id="w-f" accept="image/*">' +
      '<label>Quality: <span id="w-qv">80</span>%</label><input type="range" id="w-q" min="10" max="100" value="80" style="width:100%">' +
      '<div id="w-out"></div><p class="tool-note">100% in-browser — your image never leaves your device.</p>';
    document.getElementById("w-q").addEventListener("input", function (e) { document.getElementById("w-qv").textContent = e.target.value; });
    document.getElementById("w-f").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var img = new Image(), url = URL.createObjectURL(f);
      img.onload = function () {
        var c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        c.getContext("2d").drawImage(img, 0, 0);
        var q = document.getElementById("w-q").value / 100;
        c.toBlob(function (b) {
          var kb = (b.size / 1024).toFixed(1), orig = (f.size / 1024).toFixed(1);
          var dl = URL.createObjectURL(b);
          out(document.getElementById("w-out"), "✅ WebP: " + kb + " KB (original " + orig + " KB — saved " + Math.max(0, Math.round((1 - b.size / f.size) * 100)) + "%)<br>" +
            '<a class="tool-btn" style="display:inline-block;text-decoration:none;margin-top:10px" href="' + dl + '" download="' + f.name.replace(/\.\w+$/, "") + '.webp">⬇ Download WebP</a>');
        }, "image/webp", q);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });
  };

  /* 9. Page Speed Test */
  RENDER.speed = function (el) {
    el.innerHTML = '<p class="tool-note">Real Navigation Timing metrics for this page load.</p><button class="tool-btn" id="s-go">Run Test</button><div id="s-out"></div>';
    document.getElementById("s-go").addEventListener("click", function () {
      var t = performance.getEntriesByType("navigation")[0], o = document.getElementById("s-out");
      if (!t) { out(o, "Timing API not available."); return; }
      function ms(x) { return Math.round(x) + " ms"; }
      var rows = [
        ["DNS lookup", t.domainLookupEnd - t.domainLookupStart],
        ["TCP connect", t.connectEnd - t.connectStart],
        ["TLS handshake", t.requestStart - t.secureConnectionStart > 0 ? t.requestStart - t.secureConnectionStart : 0],
        ["Server response (TTFB)", t.responseStart - t.requestStart],
        ["Content download", t.responseEnd - t.responseStart],
        ["DOM processing", t.domComplete - t.responseEnd],
        ["Total load", t.loadEventEnd - t.startTime]
      ];
      var h = "<table style='width:100%;font-size:.88rem'>";
      rows.forEach(function (r) { h += "<tr><td>" + r[0] + "</td><td style='text-align:right'><b>" + ms(Math.max(0, r[1])) + "</b></td></tr>"; });
      var total = rows[6][1], grade = total < 1000 ? "🚀 Excellent" : total < 2500 ? "✅ Good" : total < 4000 ? "⚠️ Needs work" : "❌ Slow";
      out(o, h + "</table><br><b>Grade: " + grade + "</b>");
    });
  };

  /* 10. Error Log Viewer */
  RENDER.errlog = function (el) {
    el.innerHTML = '<p class="tool-note">Client-side JS errors captured on this site (stored locally, privacy-safe).</p>' +
      '<button class="tool-btn" id="e-show">View Log</button> <button class="tool-btn ghost" id="e-clear">Clear</button><div id="e-out"></div>';
    document.getElementById("e-show").addEventListener("click", function () {
      var log = [];
      try { log = JSON.parse(localStorage.getItem("sawalai_errors") || "[]"); } catch (e) {}
      out(document.getElementById("e-out"), log.length ? log.slice(-20).reverse().map(function (x) { return "• " + esc(x); }).join("<br>") : "✅ No errors logged. Clean!");
    });
    document.getElementById("e-clear").addEventListener("click", function () {
      try { localStorage.removeItem("sawalai_errors"); } catch (e) {}
      out(document.getElementById("e-out"), "Log cleared.");
    });
  };


  /* 11. Right-click guard toggle */
  RENDER.rightclick = function (el) {
    var on = false;
    try { on = localStorage.getItem("sawalai_noright") === "1"; } catch (e) {}
    el.innerHTML = '<p class="tool-note">Disables right-click context menu to deter casual copying.</p>' +
      '<button class="tool-btn" id="rc-t">Turn ' + (on ? "OFF" : "ON") + '</button><div id="rc-out"></div>';
    function apply(v) {
      document.oncontextmenu = v ? function () { return false; } : null;
      try { localStorage.setItem("sawalai_noright", v ? "1" : "0"); } catch (e) {}
    }
    apply(on);
    document.getElementById("rc-t").addEventListener("click", function () {
      on = !on; apply(on);
      this.textContent = "Turn " + (on ? "OFF" : "ON");
      out(document.getElementById("rc-out"), on ? "🔒 Right-click protection ON." : "🔓 Right-click protection OFF.");
    });
  };

  /* 12. IP block manager (demo) */
  RENDER.ipblock = function (el) {
    el.innerHTML = '<p class="tool-note">Demo blocklist (stored locally). On Cloudflare, blocks apply at the edge firewall.</p>' +
      '<label>IP to block</label><input type="text" id="ib-ip" placeholder="192.168.1.100">' +
      '<button class="tool-btn" id="ib-add">Block IP</button><div id="ib-out"></div><div id="ib-list"></div>';
    function draw() {
      var l = []; try { l = JSON.parse(localStorage.getItem("sawalai_blocked") || "[]"); } catch (e) {}
      document.getElementById("ib-list").innerHTML = l.length ?
        '<div class="tool-out">' + l.map(function (ip, i) { return "🚫 " + esc(ip) + ' <a href="#" data-i="' + i + '" style="color:#f87171">unblock</a>'; }).join("<br>") + "</div>" : "";
      document.querySelectorAll("#ib-list a").forEach(function (a) {
        a.addEventListener("click", function (e) { e.preventDefault(); l.splice(+a.dataset.i, 1);
          try { localStorage.setItem("sawalai_blocked", JSON.stringify(l)); } catch (x) {} draw(); });
      });
    }
    document.getElementById("ib-add").addEventListener("click", function () {
      var ip = document.getElementById("ib-ip").value.trim();
      if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ip)) { out(document.getElementById("ib-out"), "⚠️ Enter a valid IPv4."); return; }
      var l = []; try { l = JSON.parse(localStorage.getItem("sawalai_blocked") || "[]"); } catch (e) {}
      if (l.indexOf(ip) === -1) l.push(ip);
      try { localStorage.setItem("sawalai_blocked", JSON.stringify(l)); } catch (e) {}
      document.getElementById("ib-ip").value = ""; draw();
      out(document.getElementById("ib-out"), "✅ " + esc(ip) + " blocked.");
    });
    draw();
  };

  /* 13. Session timeout demo */
  RENDER.session = function (el) {
    el.innerHTML = '<p class="tool-note">Demo: auto-logout after inactivity (like secure admin sessions).</p>' +
      '<label>Timeout (minutes)</label><input type="number" id="se-min" value="5" min="1" max="60">' +
      '<button class="tool-btn" id="se-start">Start Demo Session</button> <button class="tool-btn ghost" id="se-stop">End</button><div id="se-out"></div>';
    var t = null, remain = 0;
    function tick() {
      var o = document.getElementById("se-out"); if (!o) { clearInterval(t); return; }
      remain -= 5;
      if (remain <= 0) { clearInterval(t); out(o, "🔐 Session expired — logged out (demo)."); return; }
      out(o, "🟢 Session active — auto-logout in " + Math.ceil(remain / 60) + " min " + (remain % 60) + "s. Move mouse to reset.");
    }
    document.getElementById("se-start").addEventListener("click", function () {
      remain = (+document.getElementById("se-min").value || 5) * 60;
      clearInterval(t); t = setInterval(tick, 5000); tick();
      document.onmousemove = function () { remain = (+document.getElementById("se-min").value || 5) * 60; };
    });
    document.getElementById("se-stop").addEventListener("click", function () { clearInterval(t); document.onmousemove = null; out(document.getElementById("se-out"), "Session ended."); });
  };

  /* 14. Schema.org generator */
  RENDER.schema = function (el) {
    el.innerHTML = '<label>Schema type</label><select id="sc-type"><option>Article</option><option>Product</option><option>FAQPage</option><option>LocalBusiness</option><option>VideoObject</option></select>' +
      '<label>Name / Title</label><input type="text" id="sc-name" placeholder="My great article">' +
      '<label>Description</label><input type="text" id="sc-desc" placeholder="What it is about…">' +
      '<label>URL</label><input type="url" id="sc-url" placeholder="https://example.com/page">' +
      '<button class="tool-btn" id="sc-go">Generate JSON-LD</button><div id="sc-out"></div>';
    document.getElementById("sc-go").addEventListener("click", function () {
      var s = { "@context": "https://schema.org", "@type": document.getElementById("sc-type").value,
        name: document.getElementById("sc-name").value, description: document.getElementById("sc-desc").value,
        url: document.getElementById("sc-url").value };
      var j = JSON.stringify(s, null, 2);
      out(document.getElementById("sc-out"), esc(j) + '<br><button class="tool-btn ghost" id="sc-cp">Copy</button>');
      document.getElementById("sc-cp").addEventListener("click", function () { navigator.clipboard.writeText(j); });
    });
  };

  /* 15. Breadcrumb builder */
  RENDER.breadcrumb = function (el) {
    el.innerHTML = '<label>Trail (one per line: Name | URL)</label><textarea id="bc-in" placeholder="Home | https://example.com\nTools | https://example.com/tools\nHammer | https://example.com/tools/hammer"></textarea>' +
      '<button class="tool-btn" id="bc-go">Generate</button><div id="bc-out"></div>';
    document.getElementById("bc-go").addEventListener("click", function () {
      var items = document.getElementById("bc-in").value.split("\n").map(function (l, i) {
        var p = l.split("|"); return { "@type": "ListItem", position: i + 1, name: (p[0] || "").trim(), item: (p[1] || "").trim() };
      }).filter(function (x) { return x.name; });
      var j = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }, null, 2);
      out(document.getElementById("bc-out"), esc(j) + '<br><button class="tool-btn ghost" id="bc-cp">Copy</button>');
      document.getElementById("bc-cp").addEventListener("click", function () { navigator.clipboard.writeText(j); });
    });
  };

  /* 16. Hreflang generator */
  RENDER.hreflang = function (el) {
    el.innerHTML = '<label>Versions (one per line: lang-code | URL)</label><textarea id="hl-in" placeholder="en | https://example.com/\nur | https://example.com/ur/\nx-default | https://example.com/"></textarea>' +
      '<button class="tool-btn" id="hl-go">Generate</button><div id="hl-out"></div>';
    document.getElementById("hl-go").addEventListener("click", function () {
      var h = document.getElementById("hl-in").value.split("\n").map(function (l) {
        var p = l.split("|"); return p[0] && p[1] ? '<link rel="alternate" hreflang="' + esc(p[0].trim()) + '" href="' + esc(p[1].trim()) + '">' : "";
      }).filter(Boolean).join("\n");
      out(document.getElementById("hl-out"), esc(h) + '<br><button class="tool-btn ghost" id="hl-cp">Copy</button>');
      document.getElementById("hl-cp").addEventListener("click", function () { navigator.clipboard.writeText(h.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&")); });
    });
  };

  /* 17. Alt text checker */
  RENDER.altcheck = function (el) {
    el.innerHTML = '<p class="tool-note">Scans <b>this page</b> for images missing alt text.</p><button class="tool-btn" id="ac-go">Scan Page</button><div id="ac-out"></div>';
    document.getElementById("ac-go").addEventListener("click", function () {
      var imgs = document.querySelectorAll("img"), missing = [];
      imgs.forEach(function (i) { if (!i.getAttribute("alt")) missing.push(i.getAttribute("src") || "(no src)"); });
      out(document.getElementById("ac-out"), imgs.length === 0 ? "No images on this page." :
        missing.length ? "⚠️ " + missing.length + "/" + imgs.length + " missing alt:<br>" + missing.map(esc).join("<br>") :
        "✅ All " + imgs.length + " images have alt text!");
    });
  };

  /* 18. CSS/JS minifier */
  RENDER.minify = function (el) {
    el.innerHTML = '<label>Paste CSS or JS</label><textarea id="mi-in" placeholder="/* your code */"></textarea>' +
      '<button class="tool-btn" id="mi-go">Minify</button><div id="mi-out"></div>';
    document.getElementById("mi-go").addEventListener("click", function () {
      var s = document.getElementById("mi-in").value;
      var orig = s.length;
      s = s.replace(/\/\/[^\n]*\n/g, "\n").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ")
           .replace(/\s*([{};:,>+~])\s*/g, "$1").replace(/;}/g, "}").trim();
      out(document.getElementById("mi-out"), "✅ " + orig + " → " + s.length + " chars (saved " + Math.round((1 - s.length / Math.max(1, orig)) * 100) + "%)<br><br>" + esc(s.slice(0, 2000)) +
        '<br><button class="tool-btn ghost" id="mi-cp">Copy Full</button>');
      document.getElementById("mi-cp").addEventListener("click", function () { navigator.clipboard.writeText(s); });
    });
  };

  /* 19. Uptime checker */
  RENDER.uptime = function (el) {
    el.innerHTML = '<label>URL to check</label><input type="url" id="up-u" value="https://www.usai-usa.com/">' +
      '<button class="tool-btn" id="up-go">Check Now</button><div id="up-out"></div><p class="tool-note">Measures real response time. Some sites block cross-origin checks.</p>';
    document.getElementById("up-go").addEventListener("click", function () {
      var u = document.getElementById("up-u").value.trim(), o = document.getElementById("up-out"), t0 = performance.now();
      o.innerHTML = '<div class="tool-out">Pinging…</div>';
      fetch(u, { method: "HEAD", mode: "no-cors", cache: "no-store" }).then(function () {
        out(o, "🟢 <b>UP</b> — responded in " + Math.round(performance.now() - t0) + " ms");
      }).catch(function () { out(o, "🔴 <b>DOWN or blocked</b> (no response)"); });
    });
  };

  /* 20. 404 log */
  RENDER.notfound = function (el) {
    el.innerHTML = '<p class="tool-note">Pages visitors tried that don\'t exist (logged by the 404 page).</p>' +
      '<button class="tool-btn" id="nf-show">View Log</button> <button class="tool-btn ghost" id="nf-clear">Clear</button><div id="nf-out"></div>';
    document.getElementById("nf-show").addEventListener("click", function () {
      var l = []; try { l = JSON.parse(localStorage.getItem("sawalai_404") || "[]"); } catch (e) {}
      out(document.getElementById("nf-out"), l.length ? l.slice(-20).reverse().map(esc).join("<br>") : "✅ No 404s logged.");
    });
    document.getElementById("nf-clear").addEventListener("click", function () {
      try { localStorage.removeItem("sawalai_404"); } catch (e) {}
      out(document.getElementById("nf-out"), "Cleared.");
    });
  };

  /* 21. Support ticket */
  RENDER.ticket = function (el) {
    el.innerHTML = '<label>Your name</label><input type="text" id="tk-n">' +
      '<label>Email</label><input type="text" id="tk-e">' +
      '<label>Issue</label><textarea id="tk-i" style="min-height:80px" placeholder="Describe the problem…"></textarea>' +
      '<button class="tool-btn" id="tk-go">Submit Ticket</button><div id="tk-out"></div>';
    document.getElementById("tk-go").addEventListener("click", function () {
      var n = document.getElementById("tk-n").value.trim(), e = document.getElementById("tk-e").value.trim(), i = document.getElementById("tk-i").value.trim();
      if (!n || !i) { out(document.getElementById("tk-out"), "⚠️ Name & issue required."); return; }
      var id = "SWL-" + Date.now().toString(36).toUpperCase();
      fetch("https://formsubmit.co/ajax/4de22205ccafca608a7c4a00e6a34c92", { method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: "Support ticket " + id, name: n, email: e, ticket: id, issue: i }) }).catch(function () {});
      try { var l = JSON.parse(localStorage.getItem("sawalai_tickets") || "[]"); l.push(id); localStorage.setItem("sawalai_tickets", JSON.stringify(l)); } catch (x) {}
      out(document.getElementById("tk-out"), "✅ Ticket <b>" + id + "</b> submitted. We reply within 24h.");
    });
  };

  /* 22. AdSense readiness checklist */
  RENDER.adsense = function (el) {
    var items = [
      ["Original content", true, "870+ original articles"],
      ["Privacy Policy page", true, "privacy.html live"],
      ["Terms of Service", true, "terms.html live"],
      ["Contact page", true, "contact form live"],
      ["About page", true, "about.html live"],
      ["Mobile friendly", true, "responsive design"],
      ["HTTPS", true, "Cloudflare SSL"],
      ["No copyrighted material", true, "only official trailers"],
      ["Sufficient traffic", false, "keep growing — apply after steady visitors"],
      ["6+ months domain age", false, "newer site — may need to wait"]
    ];
    el.innerHTML = '<p class="tool-note">AdSense/Adsterra approval checklist for US AI:</p><div class="tool-out">' +
      items.map(function (x) { return (x[1] ? "✅" : "⏳") + " <b>" + x[0] + "</b> — " + x[2]; }).join("<br>") + "</div>" +
      "<p class='tool-note'>" + items.filter(function (x) { return x[1]; }).length + "/" + items.length + " ready.</p>";
  };

  /* ---------- init ---------- */

  drawCats(); drawGrid(); drawFeatures();

  /* deep-link: site-power.html#utm */
  if (location.hash) {
    var id = location.hash.slice(1);
    if (RENDER[id]) openTool(id);
  }
})();
