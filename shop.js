/* US AI Shop: proxies + RDP pricing, calculators, orders, accounts (localStorage) */
(function () {
  "use strict";
  var OWNER_EMAIL = "4de22205ccafca608a7c4a00e6a34c92";
  var OWNER_WA = "923254746678"; /* admin WhatsApp for instant order reports */
  /* Google Sign-In: owner pastes the OAuth Client ID here (Google Cloud Console → Credentials).
     Empty = Google button hidden. Client IDs are public, not secret. */
  var GOOGLE_CLIENT_ID = "";

  /* ---------------- pricing data (Rs) ---------------- */
  var PROXY_PRICES = {
    residential: { label: "Residential", unit: "IP",
      tagline: "⭐ BEST for social media accounts",
      desc: "Real home IP — dedicated residential proxy with ISP routing and a brand-new fresh IP. Zero IP tracking or footprints, so your Facebook, Instagram, TikTok and other social accounts stay safe from flags and bans. The #1 choice for handling multiple social media accounts.",
      per: { "USA": 2500, "UK": 2500, "Germany": 2500, "France": 2500, "Netherlands": 2500, "Canada": 2500, "Singapore": 2500, "Australia": 2500, "UAE": 2500, "India": 2500, "Japan": 2500, "South Korea": 2500, "Brazil": 2500, "Turkey": 2500} },
    datacenter: { label: "Datacenter", unit: "IP",
      tagline: "Fast & cheap — simple HTTP proxy",
      desc: "Simple high-speed HTTP datacenter proxy at the lowest price. Perfect for general browsing, web scraping, SEO tools, data gathering and automation. Not recommended for social media logins — datacenter IPs are easily detected and can get accounts flagged.",
      per: { "USA": 500, "UK": 500, "Germany": 500, "France": 500, "Netherlands": 500, "Canada": 500, "Singapore": 500, "Australia": 500, "UAE": 500, "India": 500, "Japan": 500, "South Korea": 500, "Brazil": 500, "Turkey": 500} },
    http: { label: "HTTP ISP", unit: "IP",
      tagline: "ISP network — speed + trust",
      desc: "ISP proxies hosted on real internet-provider networks — residential-level trust with near-datacenter speed. Ideal for e-commerce, sneaker drops, classified ads, and multi-account work that needs a clean IP reputation without the residential price tag.",
      per: { "USA": 2000, "UK": 2000, "Germany": 2000, "France": 2000, "Netherlands": 2000, "Canada": 2000, "Singapore": 2000, "Australia": 2000, "UAE": 2000, "India": 2000, "Japan": 2000, "South Korea": 2000, "Brazil": 2000, "Turkey": 2000} },
    dedicated: { label: "Dedicated Datacenter", unit: "IP",
      tagline: "🔒 Exclusive IP — only yours, never shared",
      desc: "A fully exclusive datacenter IP assigned only to you — no sharing, no recycled history. HTTP/SOCKS5 with 250GB bandwidth and 500 threads. Datacenter speed with dedicated privacy, perfect for scrapers, SEO tools and multi-account bots.",
      per: { "USA": 560, "UK": 560, "Germany": 560, "France": 560, "Netherlands": 560, "Canada": 560, "Singapore": 560, "Australia": 560, "UAE": 560, "India": 560, "Japan": 560, "South Korea": 560, "Brazil": 560, "Turkey": 560} },
    mobile: { label: "Mobile 4G/5G", unit: "IP",
      tagline: "📱 Real carrier IPs — highest trust score",
      desc: "Real 4G/5G carrier network IPs with unlimited bandwidth, auto-rotation toggle, HTTP(S)+SOCKS5. Mobile IPs have the highest trust score — platforms avoid banning carrier ranges because thousands of real users share them. The gold standard for Instagram/TikTok multi-account management.",
      per: { "USA": 54600, "UK": 54600, "Germany": 54600, "Netherlands": 54600, "Lithuania": 54600, "France": 54600, "Australia": 54600, "Austria": 54600, "Bulgaria": 54600, "Poland": 54600, "Romania": 54600, "Spain": 54600, "Ireland": 54600, "Italy": 54600, "Malaysia": 54600 } },
    rotating: { label: "Rotating Residential", unit: "GB",
      tagline: "🔄 Pay per GB — rotating home IPs",
      desc: "Real residential IPs from a 32M+ pool that rotate on every request, with sticky sessions and HTTP(S)/SOCKS5. Billed by traffic (per GB), not per IP — traffic never expires. Perfect for scrapers and SEO tools. Price note: $2.63/GB is 1.5× IPRoyal's advertised $1.75/GB floor rate (high-volume tier); IPRoyal's small pay-as-you-go rate is higher.",
      per: { "USA": 735, "UK": 735, "Germany": 735, "France": 735, "Netherlands": 735, "Canada": 735, "Singapore": 735, "Australia": 735, "UAE": 735, "India": 735, "Japan": 735, "South Korea": 735, "Brazil": 735, "Turkey": 735} }
  };
  var RDP_PRICES = {
    "USA": { "4GB": 400, "8GB": 750, "16GB": 1400 },
    "UK": { "4GB": 500, "8GB": 900, "16GB": 1600 },
    "Germany": { "4GB": 500, "8GB": 900, "16GB": 1600 },
    "Canada": { "4GB": 450, "8GB": 850, "16GB": 1500 },
    "Singapore": { "4GB": 550, "8GB": 950, "16GB": 1700 },
    "France": { "4GB": 500, "8GB": 900, "16GB": 1600 },
    "Netherlands": { "4GB": 500, "8GB": 900, "16GB": 1600 },
    "Australia": { "4GB": 550, "8GB": 950, "16GB": 1700 },
    "UAE": { "4GB": 500, "8GB": 900, "16GB": 1600 },
    "India": { "4GB": 450, "8GB": 850, "16GB": 1500 }
  };
  var DUR_DISCOUNT = { "1": 1, "3": 2.85, "6": 5.4, "12": 9.6 };
  var DUR_LABEL = { "1": "1 month", "3": "3 months", "6": "6 months", "12": "12 months" };

  /* ---------------- bundle deals (Rs/month base; separate SKUs, base prices untouched) ---------------- */
  var BUNDLES = [
    { id: "social-media-machine", ic: "🎁",
      name: "Social Media Machine",
      desc: "RDP 8GB USA + Residential Proxy USA — run automation bots and manage multiple social media accounts from one powerful combo. Worth $11.61/mo, bundle price $10.89/mo.",
      items: [ { name: "RDP 8GB RAM (USA)", price: 750 }, { name: "Residential Proxy (USA)", price: 2500 } ],
      worth: 3250, price: 3050, savePct: 6, per: "per month", kind: "BUNDLE" },
    { id: "residential-3pack", ic: "🎁",
      name: "Residential 3-Pack",
      desc: "3 × Residential Proxy USA — triple clean residential IPs for agencies and resellers running many accounts. Real home IPs, zero footprints. Worth $26.79/mo, bundle price $24.96/mo.",
      items: [ { name: "Residential Proxy (USA) × 3", price: 7500 } ],
      worth: 7500, price: 6990, savePct: 7, per: "per month", kind: "BUNDLE" },
    { id: "trader-starter", ic: "🎁",
      name: "Trader Starter",
      desc: "RDP 16GB USA + Datacenter Proxy USA — high-performance RDP for trading terminals plus a fast datacenter IP for market data. Worth $6.79/mo, bundle price $6.43/mo.",
      items: [ { name: "RDP 16GB RAM (USA)", price: 1400 }, { name: "Datacenter Proxy (USA)", price: 500 } ],
      worth: 1900, price: 1800, savePct: 5, per: "per month", kind: "BUNDLE" },
    { id: "budget-starter", ic: "💰",
      name: "Budget Starter",
      desc: "RDP 4GB USA + Datacenter Proxy USA — our cheapest entry combo. Perfect for students and first-time buyers. Worth $3.21/mo, bundle price $3.04/mo.",
      items: [ { name: "RDP 4GB RAM (USA)", price: 400 }, { name: "Datacenter Proxy (USA)", price: 500 } ],
      worth: 900, price: 850, savePct: 6, per: "per month", kind: "BUNDLE" },
    { id: "account-unlock-kit", ic: "🔓",
      name: "Account Unlock Kit",
      desc: "Residential Proxy USA + WhatsApp OTP Premium Number — everything for new verified social accounts. Worth $14.28, bundle price $13.39.",
      items: [ { name: "Residential Proxy (USA)", price: 2500 }, { name: "WhatsApp OTP Number (USA)", price: 1499 } ],
      worth: 3999, price: 3750, savePct: 6, per: "one-time + monthly", kind: "BUNDLE" },
    { id: "pro-creator", ic: "🚀",
      name: "Pro Creator",
      desc: "RDP 16GB USA + HTTP ISP Proxy USA + Residential Proxy USA — ultimate combo for ecommerce sellers and agencies. Worth $21.07/mo, bundle price $19.82/mo.",
      items: [ { name: "RDP 16GB RAM (USA)", price: 1400 }, { name: "HTTP ISP Proxy (USA)", price: 2000 }, { name: "Residential Proxy (USA)", price: 2500 } ],
      worth: 5900, price: 5550, savePct: 6, per: "per month", kind: "BUNDLE" },
    { id: "residential-5pack", ic: "📦",
      name: "Reseller 5-Pack",
      desc: "5 × Residential Proxy USA — five clean residential IPs in one order for agencies and resellers. Real home IPs, zero footprints. Worth $44.64/mo, bundle price $40.18/mo.",
      items: [ { name: "Residential Proxy (USA) × 5", price: 12500 } ],
      worth: 12500, price: 11250, savePct: 10, per: "per month", kind: "BUNDLE" },
    { id: "multi-app-account-kit", ic: "📱",
      name: "Multi-App Account Kit",
      desc: "Residential Proxy USA + Gmail OTP Number + Telegram OTP Number — launch verified Gmail and Telegram accounts behind one clean USA residential IP. Worth $19.64, bundle price $18.46.",
      items: [ { name: "Residential Proxy (USA)", price: 2500 }, { name: "Gmail OTP Number (USA)", price: 1499 }, { name: "Telegram OTP Number (USA)", price: 1499 } ],
      worth: 5498, price: 5170, savePct: 6, per: "one-time + monthly", kind: "BUNDLE" },
    { id: "agency-monthly-rental", ic: "🗓️",
      name: "Agency Monthly Rental Pack",
      desc: "30-Day Rental Premium Number USA + Residential Proxy USA — run one verified USA number behind one clean residential IP for a full month. Worth $80.35/mo, bundle price $75.54/mo.",
      items: [ { name: "30-Day Rental Number (USA)", price: 19999 }, { name: "Residential Proxy (USA)", price: 2500 } ],
      worth: 22499, price: 21150, savePct: 6, per: "per month", kind: "BUNDLE" },
    { id: "geo-duo", ic: "🌍",
      name: "Geo Duo",
      desc: "Residential Proxy USA + Residential Proxy UK — two clean home IPs for geo-targeting, affiliate links and multi-region testing. Worth $17.86/mo, bundle price $16.79/mo.",
      items: [ { name: "Residential Proxy (USA)", price: 2500 }, { name: "Residential Proxy (UK)", price: 2500 } ],
      worth: 5000, price: 4700, savePct: 6, per: "per month", kind: "BUNDLE" },
    { id: "datacenter-10pack", ic: "🕷️",
      name: "Scraper Starter 10-Pack",
      desc: "10 × Datacenter Proxy USA — ten fast IPs for web scraping, SEO tools and automation. Not for social media logins. Worth $17.86/mo, bundle price $15.71/mo.",
      items: [ { name: "Datacenter Proxy (USA) × 10", price: 5000 } ],
      worth: 5000, price: 4400, savePct: 12, per: "per month", kind: "BUNDLE" },
    { id: "agency-ultimate-kit", ic: "🏢",
      name: "Agency Ultimate Kit",
      desc: "RDP 16GB USA + Residential Proxy USA + 30-Day Rental Number USA — the complete agency stack: compute, clean IP and a verified USA number for a full month. Worth $85.35/mo, bundle price $80.18/mo.",
      items: [ { name: "RDP 16GB RAM (USA)", price: 1400 }, { name: "Residential Proxy (USA)", price: 2500 }, { name: "30-Day Rental Number (USA)", price: 19999 } ],
      worth: 23899, price: 22450, savePct: 6, per: "per month", kind: "BUNDLE" },
    { id: "forex-trader-kit", ic: "💹",
      name: "Forex Trader Kit",
      desc: "Forex VPS + HTTP ISP Proxy USA — ultra-low-latency VPS keeps your MT4/MT5 running 24/7 next to broker servers, plus a trusted ISP IP for trading-panel logins. Worth $10.18/mo, bundle price $9.57/mo.",
      items: [ { name: "Forex VPS", price: 850 }, { name: "HTTP ISP Proxy (USA)", price: 2000 } ],
      worth: 2850, price: 2679, savePct: 6, per: "per month", kind: "BUNDLE" },
    { id: "dev-sandbox-kit", ic: "💻",
      name: "Dev Sandbox Kit",
      desc: "Linux VPS 2GB + Datacenter Proxy USA — Ubuntu VPS with full root plus a fast dedicated IP: host your bots, APIs and scrapers on your own server. Worth $8.57/mo, bundle price $7.97/mo.",
      items: [ { name: "Linux VPS 2GB", price: 1900 }, { name: "Datacenter Proxy (USA)", price: 500 } ],
      worth: 2400, price: 2232, savePct: 7, per: "per month", kind: "BUNDLE" },
    { id: "game-server-starter", ic: "🎮",
      name: "Game Server Starter",
      desc: "Game Server VPS + Datacenter Proxy USA — low-ping VPS for your Minecraft, FiveM or CS2 server, plus a fast dedicated IP to manage it. Worth $12.50/mo, bundle price $11.75/mo.",
      items: [ { name: "Game Server VPS", price: 3000 }, { name: "Datacenter Proxy (USA)", price: 500 } ],
      worth: 3500, price: 3290, savePct: 6, per: "per month", kind: "BUNDLE" },
    { id: "tiktok-shop-seller-kit", ic: "🛍️",
      name: "TikTok Shop Seller Kit",
      desc: "RDP 8GB USA + Residential Proxy USA + WhatsApp OTP Number — the complete TikTok Shop seller starter: a USA desktop, a clean residential IP and a verified WhatsApp number. Worth $16.96, bundle price $15.94.",
      items: [ { name: "RDP 8GB RAM (USA)", price: 750 }, { name: "Residential Proxy (USA)", price: 2500 }, { name: "WhatsApp OTP Number (USA)", price: 1499 } ],
      worth: 4749, price: 4464, savePct: 6, per: "one-time + monthly", kind: "BUNDLE" },
    { id: "new-account-mini-kit", ic: "🆕",
      name: "New Account Mini Kit",
      desc: "RDP 4GB USA + Datacenter Proxy USA + Any App OTP Number — the cheapest verified-account starter: a USA desktop, a fast IP and OTP verification for any app. Worth $7.85, bundle price $7.38.",
      items: [ { name: "RDP 4GB RAM (USA)", price: 400 }, { name: "Datacenter Proxy (USA)", price: 500 }, { name: "Any App OTP Number (USA)", price: 1299 } ],
      worth: 2199, price: 2067, savePct: 6, per: "one-time + monthly", kind: "BUNDLE" },
    { id: "otp-5pack", ic: "📲",
      name: "Account Farm OTP 5-Pack",
      desc: "5 × Any App OTP Number USA — five OTP verifications in one order for resellers and multi-account setups. Any app, USA numbers. Worth $23.20, bundle price $20.88.",
      items: [ { name: "Any App OTP Number (USA) × 5", price: 6495 } ],
      worth: 6495, price: 5846, savePct: 10, per: "one-time", kind: "BUNDLE" }
  ];

  function rs(n) { var v = Math.round(n) / 280; return "$" + (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(2)); }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }


  /* ---------------- accounts: KV backend + localStorage fallback ---------------- */
  var API_BASE = "https://usai-accounts-api.usai-api.workers.dev";
  var _apiToken = null;
  try { _apiToken = localStorage.getItem("usai_api_token"); } catch(e){}
  
  function apiCall(path, data) {
    var url = API_BASE + "/api/" + path;
    var opts = { method: data ? "POST" : "GET", headers: {"Content-Type": "application/json"} };
    if (data) opts.body = JSON.stringify(data);
    return fetch(url, opts).then(function(r){ return r.json(); }).catch(function(){ return {ok:false}; });
  }
  
  function apiSignup(name, email, pwHash) {
    return apiCall("signup", {name: name, email: email, pw: pwHash}).then(function(res){
      if (res.ok && res.token) {
        try { localStorage.setItem("usai_api_token", res.token); } catch(e){}
        _apiToken = res.token;
        // Also save locally as backup
        var users = getUsers(); users[email.toLowerCase()] = {name: name, pw: pwHash}; saveUsers(users);
        setSession(email);
      }
      return res;
    });
  }
  
  function apiLogin(email, pwHash) {
    return apiCall("login", {email: email, pw: pwHash}).then(function(res){
      if (res.ok && res.token) {
        try { localStorage.setItem("usai_api_token", res.token); } catch(e){}
        _apiToken = res.token;
        var users = getUsers(); users[email.toLowerCase()] = {name: res.name, pw: pwHash}; saveUsers(users);
        setSession(email);
      }
      return res;
    });
  }
  
  function apiMe() {
    if (!_apiToken) return Promise.resolve({ok:false});
    return apiCall("me?token=" + encodeURIComponent(_apiToken), null);
  }

  /* ---------------- accounts (device-local) ---------------- */
  var LS_USERS = "sawalai_users", LS_SESSION = "sawalai_session", LS_ORDERS = "sawalai_orders";
  function getUsers() { try { return JSON.parse(localStorage.getItem(LS_USERS) || "{}"); } catch (e) { return {}; } }
  function saveUsers(u) { localStorage.setItem(LS_USERS, JSON.stringify(u)); }
  function hashPw(s) { var h = 0; for (var i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; } return "h" + (h >>> 0).toString(36); }
  function currentUser() {
    var email = null;
    try { email = localStorage.getItem(LS_SESSION); } catch (e) {}
    if (!email) return null;
    var u = getUsers()[email.toLowerCase()];
    return u ? { name: u.name, email: email.toLowerCase() } : null;
  }
  function getOrders() { try { return JSON.parse(localStorage.getItem(LS_ORDERS) || "[]"); } catch (e) { return []; } }
  function saveOrder(o) {
    var all = getOrders();
    o.id = "SWL-" + Date.now().toString(36).toUpperCase();
    o.date = new Date().toISOString();
    o.status = "Pending";
    all.unshift(o);
    try { localStorage.setItem(LS_ORDERS, JSON.stringify(all)); } catch (e) {}
    return o;
  }
  /* expose for account.html / services.js */
  window.SawalShop = {
    getUsers: getUsers, saveUsers: saveUsers, hashPw: hashPw,
    apiSignup: apiSignup, apiLogin: apiLogin, apiMe: apiMe,
    currentUser: currentUser, getOrders: getOrders, saveOrder: saveOrder,
    orderPayload: orderPayload, sendOrderEmail: sendOrderEmail,
    waReportLink: waReportLink, waReportBtn: waReportBtn, rs: rs,
    BUNDLES: BUNDLES,
    googleClientId: GOOGLE_CLIENT_ID,
    setSession: function (email) { try { localStorage.setItem(LS_SESSION, email.toLowerCase()); } catch (e) {} },
    clearSession: function () { try { localStorage.removeItem(LS_SESSION); } catch (e) {} }
  };

  /* ---------------- shared order reporting ----------------
     Builds the admin email payload + the one-tap WhatsApp report link
     ("who bought what" — everything is written in it). */
  function orderPayload(o) {
    return {
      _subject: "New " + o.kind + " order " + o.id + " — " + o.total,
      _template: "table",
      "Order ID": o.id, "Product": o.kind, "Plan": o.plan || "—",
      "Country": o.country || "—", "Quantity": o.qty || "—", "Duration": o.duration || "—",
      "Details": o.details || "—",
      "Total": o.total, "Name": o.name, "Email": o.email,
      "WhatsApp": o.whatsapp, "Notes": o.notes || "—",
      "Account": o.account || "guest", "Date": o.date
    };
  }
  function sendOrderEmail(payload) {
    /* order email goes to BOTH owner inboxes (crons read the first; user reads the second) */
    var dests = [OWNER_EMAIL, "rehmanmaher500@gmail.com"];
    var ps = dests.map(function (em) {
      return fetch("https://formsubmit.co/ajax/" + em, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      }).catch(function () { return { success: false }; });
    });
    return Promise.all(ps).then(function (rs) {
      var ok = rs.some(function (r) { return r && (r.success === "true" || r.success === true); });
      return { success: ok };
    });
  }
  function waReportLink(o) {
    var lines = [
      "🧾 *New Order " + o.id + "*",
      "Product: " + o.kind,
      "Plan: " + (o.plan || "—")
    ];
    if (o.details && o.details !== "—") lines.push("Details: " + o.details);
    if (o.country && o.country !== "—") lines.push("Country: " + o.country);
    if (o.qty && o.qty !== "—") lines.push("Quantity: " + o.qty);
    if (o.duration && o.duration !== "—") lines.push("Duration: " + o.duration);
    lines.push("Total: " + o.total, "",
      "Name: " + o.name, "Email: " + o.email,
      "WhatsApp: " + o.whatsapp, "Notes: " + (o.notes || "—"));
    if (o.tid) lines.push("", "💰 JazzCash TID: " + o.tid + " (verify payment)");
    if (o.vouchers) lines.push("🎟️ My voucher codes: " + o.vouchers);
    return "https://wa.me/" + OWNER_WA + "?text=" + encodeURIComponent(lines.join("\n"));
  }
  function waReportBtn(o, label) {
    return '<a class="btn btn-primary btn-glow" target="_blank" rel="noopener" style="margin-top:10px;display:inline-block;" href="' +
      waReportLink(o) + '">' + (label || "📲 Send Order on WhatsApp") + "</a>" +
      '<p class="tiny muted" style="margin-top:6px;">Tap the button, then press send in WhatsApp — we will get your order instantly.</p>';
  }

  /* nav account label */
  function paintNavAccount() {
    var a = $("nav-account");
    if (!a) return;
    var u = currentUser();
    a.textContent = u ? ("👤 " + u.name.split(" ")[0]) : "👤 Account";
  }

  /* ---------------- proxies ---------------- */
  var proxyType = "residential";
  function initProxies() {
    var country = $("proxy-country"), qty = $("proxy-qty"), dur = $("proxy-duration"),
        total = $("proxy-total"), unit = $("proxy-unit"), types = $("proxy-types"),
        qtyLabel = $("proxy-qty-label"), table = $("proxy-price-table"),
        details = $("proxy-details");
    if (!country) return;
    function fillCountries() {
      var per = PROXY_PRICES[proxyType].per;
      country.innerHTML = "";
      Object.keys(per).forEach(function (c) {
        var o = document.createElement("option");
        o.value = c; o.textContent = c;
        country.appendChild(o);
      });
    }
    function calc() {
      var per = PROXY_PRICES[proxyType].per;
      var p = per[country.value] || 0;
      var q = Math.max(1, parseInt(qty.value || "1", 10));
      var t = total ? total : null;
      var grand = p * q * (DUR_DISCOUNT[dur.value] || 1);
      if (total) total.textContent = rs(grand);
      if (unit) unit.textContent = "(" + rs(p) + " / " + PROXY_PRICES[proxyType].unit + " / month × " + q + " × " + DUR_LABEL[dur.value] + ")";
      return { type: PROXY_PRICES[proxyType].label, country: country.value, qty: q, unitName: PROXY_PRICES[proxyType].unit, duration: DUR_LABEL[dur.value], total: Math.round(grand) };
    }
    function paintDetails() {
      if (!details) return;
      var p = PROXY_PRICES[proxyType];
      details.innerHTML =
        '<div class="proxy-tagline">' + p.tagline + '</div>' +
        '<p class="proxy-desc">' + p.desc + '</p>' +
        '<p class="proxy-price-line"><b>' + rs(p.per[Object.keys(p.per)[0]]) + '</b> / ' + p.unit + ' / month</p>';
    }
    function paintTable() {
      if (!table) return;
      var types = Object.keys(PROXY_PRICES);
      var countries = [];
      types.forEach(function (t) { Object.keys(PROXY_PRICES[t].per).forEach(function (c) { if (countries.indexOf(c) === -1) countries.push(c); }); });
      var html = "<tr><th>Country</th>" + types.map(function (t) { return "<th>" + PROXY_PRICES[t].label + " (" + PROXY_PRICES[t].unit + ")</th>"; }).join("") + "</tr>";
      countries.forEach(function (c) {
        html += "<tr><td>" + c + "</td>" + types.map(function (t) {
          var p = PROXY_PRICES[t].per[c];
          return "<td class='" + (t === "residential" ? "hl" : "") + "'>" + (p ? rs(p) : "—") + "</td>";
        }).join("") + "</tr>";
      });
      table.innerHTML = html;
    }
    if (types) types.addEventListener("click", function (e) {
      var b = e.target.closest(".ent-pill");
      if (!b) return;
      proxyType = b.getAttribute("data-ptype");
      var all = types.querySelectorAll(".ent-pill");
      for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
      b.classList.add("active");
      if (qtyLabel) qtyLabel.textContent = PROXY_PRICES[proxyType].unit === "GB" ? "Number of GBs" : "Number of IPs";
      fillCountries(); calc(); paintDetails();
    });
    [country, qty, dur].forEach(function (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); });
    fillCountries(); calc(); paintTable(); paintDetails();
    var form = $("proxy-order-form");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitOrder("proxy", calc(), form, $("proxy-order-btn"), $("proxy-order-msg"));
    });
    prefillForm(form);
  }

  /* prefill order form for logged-in users */
  function prefillForm(form) {
    var u = currentUser();
    if (!u || !form) return;
    var nm = form.querySelector('input[name="name"]'), em = form.querySelector('input[name="email"]');
    if (nm && !nm.value) nm.value = u.name || "";
    if (em && !em.value) em.value = u.email || "";
  }

  /* ---------------- RDP ---------------- */
  var rdpRam = "4GB";
  function initRdp() {
    var country = $("rdp-country"), dur = $("rdp-duration"),
        total = $("rdp-total"), unit = $("rdp-unit"), rams = $("rdp-rams"),
        table = $("rdp-price-table");
    if (!country) return;
    Object.keys(RDP_PRICES).forEach(function (c) {
      var o = document.createElement("option");
      o.value = c; o.textContent = c;
      country.appendChild(o);
    });
    function calc() {
      var p = (RDP_PRICES[country.value] || {})[rdpRam] || 0;
      var grand = p * (DUR_DISCOUNT[dur.value] || 1);
      if (total) total.textContent = rs(grand);
      if (unit) unit.textContent = "(" + rs(p) + " / month, " + rdpRam + " RAM × " + DUR_LABEL[dur.value] + ")";
      return { type: "RDP " + rdpRam, country: country.value, qty: 1, unitName: "server", duration: DUR_LABEL[dur.value], total: Math.round(grand) };
    }
    function paintTable() {
      if (!table) return;
      var rams = ["4GB", "8GB", "16GB"];
      var html = "<tr><th>Country</th>" + rams.map(function (r) { return "<th>" + r + " RAM</th>"; }).join("") + "</tr>";
      Object.keys(RDP_PRICES).forEach(function (c) {
        html += "<tr><td>" + c + "</td>" + rams.map(function (r) {
          return "<td class='" + (c === "USA" && r === "4GB" ? "hl" : "") + "'>" + rs(RDP_PRICES[c][r]) + "</td>";
        }).join("") + "</tr>";
      });
      table.innerHTML = html;
    }
    if (rams) rams.addEventListener("click", function (e) {
      var b = e.target.closest(".ent-pill");
      if (!b) return;
      rdpRam = b.getAttribute("data-ram");
      var all = rams.querySelectorAll(".ent-pill");
      for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
      b.classList.add("active");
      calc();
    });
    [country, dur].forEach(function (el) { el.addEventListener("change", calc); });
    calc(); paintTable();
    var form = $("rdp-order-form");
    if (form) form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitOrder("rdp", calc(), form, $("rdp-order-btn"), $("rdp-order-msg"));
    });
    prefillForm(form);
  }

  /* ---------------- order submit (login + JazzCash payment) ---------------- */
  function submitOrder(kind, cfg, form, btn, msgEl) {
    var u = currentUser();
    if (!u) {
      if (msgEl) {
        msgEl.innerHTML = "";
        window.SawalPay.requireLogin(msgEl);
        msgEl.classList.remove("muted");
      }
      return;
    }
    var fd = new FormData(form);
    var order = {
      kind: kind === "proxy" ? "Proxy" : "RDP",
      plan: cfg.type, country: cfg.country,
      qty: cfg.qty + " " + cfg.unitName, duration: cfg.duration,
      total: "Rs " + cfg.total.toLocaleString("en-PK"),
      name: fd.get("name"), email: fd.get("email"),
      whatsapp: fd.get("whatsapp"), notes: fd.get("notes") || "—",
      account: u.email
    };
    /* step 2: JazzCash payment + TID */
    window.SawalPay.collect(msgEl, {
      amount: order.total,
      item: order.kind + " — " + order.plan + " (" + order.country + ")",
      orderId: "new order"
    }, function (tid) {
      order.tid = tid;
      order.payment = "pending";
      finalizeShopOrder(kind, order, form, btn, msgEl, u);
    });
    if (msgEl) msgEl.classList.remove("muted");
  }

  function finalizeShopOrder(kind, order, form, btn, msgEl, u) {
    var saved = saveOrder(order);
    if (btn) { btn.disabled = true; btn.textContent = "Placing order..."; }
    var payload = orderPayload(saved);
    payload["Transaction ID"] = saved.tid;
    payload["Payment"] = window.SawalPay.payLine(saved.tid);
    sendOrderEmail(payload).then(function (data) {
      if (btn) { btn.disabled = false; btn.textContent = "Buy Now"; }
      form.reset();
      if (msgEl) {
        var track = ' Track it in <a href="purchases.html">🧾 My Purchases</a>.';
        if (data && (data.success === "true" || data.success === true)) {
          msgEl.innerHTML = "✅ Order <strong>" + saved.id + "</strong> received! Payment (TID " + esc(saved.tid) + ") is pending verification — we confirm within minutes." + track +
            "<br>" + waReportBtn(saved);
        } else {
          msgEl.innerHTML = "⚠️ Order <strong>" + saved.id + "</strong> saved on this device, but email confirmation did not go through yet (FormSubmit may need one-time activation). We have your order saved — please send it to us on WhatsApp with the button below." + track +
            "<br>" + waReportBtn(saved);
        }
        msgEl.classList.remove("muted");
      }
    }).catch(function () {
      if (btn) { btn.disabled = false; btn.textContent = "Buy Now"; }
      if (msgEl) {
        msgEl.innerHTML = "⚠️ Order <strong>" + saved.id + "</strong> saved on this device, but email confirmation failed (network issue). Please send us your order on WhatsApp with the button below so we can process it." +
          ' Track it in <a href="purchases.html">🧾 My Purchases</a>.' +
          "<br>" + waReportBtn(saved);
        msgEl.classList.remove("muted");
      }
    });
  }

  paintNavAccount();
  initProxies();
  initRdp();
  initShopSearch();
})();

/* ---------- shop country search ---------- */
function initShopSearch() {
  function capture(sel) {
    sel.dataset.all = JSON.stringify(Array.prototype.map.call(sel.options, function (o) { return [o.value, o.text]; }));
  }
  function bindSearch(inputId, selectId, repopulateBtns) {
    var inp = document.getElementById(inputId), sel = document.getElementById(selectId);
    if (!inp || !sel) return;
    capture(sel);
    // re-capture after repopulation (e.g. proxy type pills)
    if (repopulateBtns) {
      document.querySelectorAll(repopulateBtns).forEach(function (b) {
        b.addEventListener("click", function () { setTimeout(function () { capture(sel); inp.value = ""; }, 50); });
      });
    }
    inp.addEventListener("input", function () {
      var q = inp.value.toLowerCase();
      var all = JSON.parse(sel.dataset.all || "[]");
      sel.innerHTML = "";
      all.forEach(function (pair) {
        if (!q || pair[1].toLowerCase().indexOf(q) > -1) {
          var o = document.createElement("option");
          o.value = pair[0]; o.textContent = pair[1];
          sel.appendChild(o);
        }
      });
      if (sel.options.length) { sel.selectedIndex = 0; sel.dispatchEvent(new Event("change")); }
    });
  }
  bindSearch("proxy-search", "proxy-country", "#proxy-types button");
  bindSearch("rdp-search", "rdp-country", "#rdp-rams button");
}
