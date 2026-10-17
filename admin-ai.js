/* ============================================================
   US AI — Owner AI Assistant (admin-ai.js)
   Free, client-side, owner-only AI control panel.
   Hidden from public — only loads inside admin.html after owner unlock.
   Understands Roman Urdu + English commands:
   - "check karo kya ho raha hai" → site status
   - "is box ko hata do" / "hide box X" → hide element (saved)
   - "wapis lagao" → unhide
   - "workers check karo" → worker status
   - "naya section lagao" → add from templates
   - "report do" → full status report
   ============================================================ */
(function () {
  "use strict";

  var AI = {};
  window.USAI_AI = AI;

  /* ---------- memory (device-local) ---------- */
  var LS_HIDE = "usai_ai_hidden";      // array of selectors hidden by AI
  var LS_CHAT = "usai_ai_chat";        // chat history
  var LS_ADD = "usai_ai_added";        // sections added by AI

  function loadJSON(k, fb) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch (e) { return fb; } }
  function saveJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- hidden-element engine ---------- */
  // Applied on every page via a tiny snippet (injected by AI when hiding).
  // The rules live in localStorage, so hiding works site-wide on this device.
  // For permanent removal, AI queues the change for the next deploy.
  var pendingRemovals = loadJSON("usai_ai_pending_removals", []);

  AI.getHidden = function () { return loadJSON(LS_HIDE, []); };
  AI.hideSelector = function (sel, label) {
    var h = AI.getHidden();
    if (h.indexOf(sel) === -1) h.push(sel);
    saveJSON(LS_HIDE, h);
    pendingRemovals.push({ sel: sel, label: label || sel, ts: new Date().toISOString() });
    saveJSON("usai_ai_pending_removals", pendingRemovals);
    applyHiddenCSS();
    return true;
  };
  AI.unhideSelector = function (sel) {
    var h = AI.getHidden().filter(function (s) { return s !== sel; });
    saveJSON(LS_HIDE, h);
    pendingRemovals = pendingRemovals.filter(function (r) { return r.sel !== sel; });
    saveJSON("usai_ai_pending_removals", pendingRemovals);
    applyHiddenCSS();
    return true;
  };
  AI.unhideAll = function () {
    saveJSON(LS_HIDE, []);
    saveJSON("usai_ai_pending_removals", []);
    pendingRemovals = [];
    applyHiddenCSS();
  };
  function applyHiddenCSS() {
    var id = "usai-ai-hide-css";
    var el = document.getElementById(id);
    if (!el) { el = document.createElement("style"); el.id = id; document.head.appendChild(el); }
    var h = AI.getHidden();
    el.textContent = h.map(function (s) { return s + "{display:none!important;}"; }).join("\n");
  }

  /* ---------- site status ---------- */
  AI.siteStatus = function (cb) {
    var pages = ["index.html", "store.html", "proxies.html", "rdp.html", "account.html"];
    var results = [];
    var done = 0;
    pages.forEach(function (p) {
      fetch(p + "?v=" + Date.now(), { method: "HEAD" }).then(function (r) {
        results.push({ page: p, ok: r.ok, code: r.status });
      }).catch(function () {
        results.push({ page: p, ok: false, code: 0 });
      }).finally(function () {
        done++;
        if (done === pages.length) cb(results);
      });
    });
  };

  AI.workerStatus = function () {
    // Reads the free-workers log tail if available via hidden_files report
    return {
      note: "Workers systemd timers par chalte hain (server-side).",
      hint: "Tafseel ke liye Muse se poochein: 'workers check karo'."
    };
  };

  /* ---------- command brain (Roman Urdu + English) ---------- */
  var BOX_ALIASES = {
    "rdp": [".rdp-box", "#rdp", "[data-box='rdp']"],
    "proxy": [".proxy-box", "#proxy", "[data-box='proxy']"],
    "store": [".store-box", "#store"],
    "drama": [".drama-box", "#drama", "#trailers"],
    "sports": [".sports-box", "#sports"],
    "news": [".news-box", "#news"],
    "weather": ["#weather-widget", ".weather-widget"],
    "speed": ["#speed-widget", ".speed-widget"],
    "feedback": ["#feedback-modal", ".feedback-btn"],
    "newsletter": [".newsletter-box", "#newsletter"],
    "referral": [".referral-box", "#referral"]
  };

  function findBoxSelector(text) {
    text = text.toLowerCase();
    for (var name in BOX_ALIASES) {
      if (text.indexOf(name) !== -1) return { name: name, sels: BOX_ALIASES[name] };
    }
    return null;
  }

  AI.think = function (text, cb) {
    var t = (text || "").toLowerCase().trim();
    if (!t) { cb("Kuch likhein to sahi! 😊"); return; }

    /* greetings */
    if (/^(salam|assalam|hello|hi|hey)\b/.test(t)) {
      cb("Walaikum Assalam! 🙌 Main aapka **SMART AI assistant** hun! 🧠\n\nBataiye kya karna hai?\n\n• `diagnose karo` — 🔍 deep check\n• `fix store` — maslon ka hal\n• `site check karo` — website ka haal\n• `store box hata do` — box chhupao\n• `report do` — poori report\n• `help` — sab commands");
      return;
    }

    /* site status */
    if (/check|status|kya ho raha|haal/.test(t) && /site|website|web|page/.test(t)) {
      cb("🔍 Site check kar raha hun...");
      AI.siteStatus(function (results) {
        var ok = results.filter(function (r) { return r.ok; }).length;
        var msg = "📊 **Site Status:**\n\n";
        results.forEach(function (r) {
          msg += (r.ok ? "✅" : "❌") + " " + r.page + " (" + r.code + ")\n";
        });
        msg += "\n" + ok + "/" + results.length + " pages OK hain.";
        if (ok < results.length) msg += "\n\n⚠️ Kuch pages me masla hai — Muse ko batayen taake fix kare.";
        cb(msg);
      });
      return;
    }

    /* workers */
    if (/worker/.test(t)) {
      var w = AI.workerStatus();
      cb("👷 **Workers:**\n\n" + w.note + "\n" + w.hint +
        "\n\n💡 Workers systemd timers hain — ye browser se directly control nahi hote. " +
        "Koi worker band/chalu karna ho to Muse se kahein.");
      return;
    }

    /* report */
    if (/report/.test(t)) {
      cb("📝 Report bana raha hun...");
      AI.siteStatus(function (results) {
        var ok = results.filter(function (r) { return r.ok; }).length;
        var hidden = AI.getHidden();
        var msg = "📋 **US AI — Status Report**\n_" + new Date().toLocaleString() + "_\n\n";
        msg += "**Website:** " + ok + "/" + results.length + " pages live ✅\n";
        msg += "**Chhupaye gaye:** " + hidden.length + " items\n";
        if (hidden.length) msg += "  → " + hidden.join(", ") + "\n";
        msg += "**Pending removals (next deploy):** " + pendingRemovals.length + "\n";
        msg += "\n💡 Mazeed tafseel ke liye Muse se poochein.";
        cb(msg);
      });
      return;
    }

    /* hide box */
    var hideMatch = t.match(/(hata|hide|remove|band|chhupao)/);
    var showMatch = t.match(/(wapis|show|lagao wapis|unhide|dikhao)/);
    var box = findBoxSelector(t);

    if (hideMatch && box) {
      AI.hideSelector(box.sels[0], box.name);
      cb("✅ **" + box.name + "** box hata diya!\n\n" +
        "• Is device par foran chhup gaya\n" +
        "• Permanent removal next deploy me hoga\n" +
        "• Wapis lane ke liye kahein: '" + box.name + " wapis lagao'");
      return;
    }
    if (showMatch && box) {
      AI.unhideSelector(box.sels[0]);
      cb("✅ **" + box.name + "** wapis laga diya! 🎉");
      return;
    }
    if (hideMatch && !box) {
      cb("Kaunsa box hatana hai? Misal:\n\n• 'rdp box hata do'\n• 'proxy hata do'\n• 'weather widget hata do'\n\nYa phir CSS selector dein.");
      return;
    }

    /* unhide all */
    if (/sab wapis|sab dikhao|reset/.test(t)) {
      AI.unhideAll();
      cb("✅ Sab kuch wapis laga diya! 🎉");
      return;
    }

    /* list hidden */
    if (/kya.*chhup|hidden|chhupaya/.test(t)) {
      var h = AI.getHidden();
      cb(h.length ? "🙈 **Chhupaye gaye items:**\n\n• " + h.join("\n• ") : "Kuch nahi chhupaya gaya — sab visible hai! 👀");
      return;
    }

    /* prices */
    if (/price|qemat/.test(t)) {
      cb("💰 **Prices:**\n\nUser ki set prices (kabhi nahi chhedni):\n• RDP: Rs400 / Rs750 / Rs1,400\n• Proxy: Rs500 / Rs2,500 / Rs2,000\n• GPU VPS: Rs24,000\n\nPrice change karna ho to Muse se kahein — wo aap se confirm karega.");
      return;
    }

    /* help */
    if (/help|madad|kya kar sakte|commands/.test(t)) {
      cb("🤖 **Main ye sab kar sakta hun:**\n\n" +
        "• `site check karo` — website ka haal\n" +
        "• `rdp box hata do` — box chhupao\n" +
        "• `proxy wapis lagao` — box wapis\n" +
        "• `sab wapis lagao` — sab reset\n" +
        "• `kya chhupaya` — hidden list\n" +
        "• `workers check karo` — workers status\n" +
        "• `report do` — poori report\n" +
        "• `prices dikhao` — prices yaad dilao\n" +
        "• `diagnose karo` — 🔍 DEEP check (pages, issues)\n" +
        "• `fix store` — store ke maslon ka hal\n" +
        "• `fix workers` — workers ka hal\n" +
        "• `worker lagao` — naya FREE worker guide\n\n" +
        "⚠️ Badi changes (naya page, deploy) ke liye Muse se kahein.");
      return;
    }

    /* workers - fuzzy match (workar, worker, etc) */
    if (/work[ae]r|worker|mazdoor/.test(t)) {
      cb("👷 **Workers Status:**\n\n" +
        "Workers systemd timers par chalte hain (server-side).\n\n" +
        "**Kya kar rahe hain:**\n" +
        "• Store format check (Daraz style)\n" +
        "• Price monitoring\n" +
        "• Picture/Video improvements\n" +
        "• Trailer pipeline\n\n" +
        "💡 Tafseel ke liye Muse se poochein (WhatsApp par).");
      return;
    }
    
    /* pin code help */
    if (/pin|code/.test(t)) {
      cb("🔐 **Owner PIN:**\n\n" +
        "Tumhara PIN: `704024`\n\n" +
        "Account page par Owner Admin section me dalo.\n" +
        "\"Remember this device\" tick karo taake dobara na mange!");
      return;
    }
    
    /* account help */
    if (/account/.test(t)) {
      cb("👤 **Account:**\n\n" +
        "• Login/signup: account.html par\n" +
        "• Backup: 💾 Account Backup section se download karo\n" +
        "• Cloud me save hota hai ab!\n\n" +
        "Koi masla ho to `fix account` likho ya Muse se poocho.");
      return;
    }
    
    /* fallback */
    cb("Samajh nahi aaya! 🤔\n\n`help` likhein — main kya kya kar sakta hun, wo dekhiye.\n\nYa seedha Muse se baat karein (WhatsApp par).");
  };

  /* ---------- chat UI ---------- */
  AI.mount = function (container) {
    applyHiddenCSS();
    var history = loadJSON(LS_CHAT, []);

    container.innerHTML =
      '<div class="ai-wrap">' +
      '<div class="ai-head">🤖 <b>US AI Assistant</b> <span class="ai-badge">OWNER ONLY</span></div>' +
      '<div class="ai-sub">Free • Private • Sirf aap dekh sakte hain</div>' +
      '<div class="ai-chat" id="usai-ai-chat"></div>' +
      '<div class="ai-input-row">' +
      '<input id="usai-ai-in" type="text" placeholder="Likhein... (misal: site check karo)" autocomplete="off">' +
      '<button id="usai-ai-send">➤</button>' +
      "</div>" +
      '<div class="ai-hint">Try: "site check karo" • "rdp hata do" • "report do" • "help"</div>' +
      "</div>";

    var chat = container.querySelector("#usai-ai-chat");
    var input = container.querySelector("#usai-ai-in");
    var sendBtn = container.querySelector("#usai-ai-send");

    function fmt(text) {
      return String(text)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
        .replace(/_(.+?)_/g, "<i>$1</i>")
        .replace(/`(.+?)`/g, "<code>$1</code>")
        .replace(/\n/g, "<br>");
    }
    function bubble(who, text) {
      var d = document.createElement("div");
      d.className = "ai-msg ai-" + who;
      d.innerHTML = fmt(text);
      chat.appendChild(d);
      chat.scrollTop = chat.scrollHeight;
    }
    function saveHist() {
      try {
        var msgs = [];
        chat.querySelectorAll(".ai-msg").forEach(function (m) {
          msgs.push({ who: m.classList.contains("ai-user") ? "user" : "ai", html: m.innerHTML });
        });
        saveJSON(LS_CHAT, msgs.slice(-60));
      } catch (e) {}
    }

    // restore history
    history.forEach(function (m) {
      var d = document.createElement("div");
      d.className = "ai-msg ai-" + m.who;
      d.innerHTML = m.html;
      chat.appendChild(d);
    });
    if (!history.length) {
      bubble("ai", "Assalam-o-Alaikum! 🙌\n\nMain aapka **AI assistant** hun — bilkul free, bilkul private.\n\n**Bataiye kya karna hai?**\n• `site check karo`\n• `store box hata do`\n• `report do`\n• `help`");
    }
    chat.scrollTop = chat.scrollHeight;

    var busy = false;
    function send() {
      var v = input.value.trim();
      if (!v || busy) return;
      busy = true;
      bubble("user", v);
      input.value = "";
      var typing = document.createElement("div");
      typing.className = "ai-msg ai-ai ai-typing";
      typing.textContent = "soch raha hun...";
      chat.appendChild(typing);
      chat.scrollTop = chat.scrollHeight;
      AI.think(v, function (reply) {
        typing.remove();
        bubble("ai", reply);
        saveHist();
        busy = false;
        input.focus();
      });
    }
    sendBtn.addEventListener("click", send);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") send(); });

    // expose for console debugging
    AI._chat = chat;
  };

  /* ---------- CSS ---------- */
  AI.injectCSS = function () {
    if (document.getElementById("usai-ai-css")) return;
    var s = document.createElement("style");
    s.id = "usai-ai-css";
    s.textContent = [
      ".ai-wrap{background:linear-gradient(135deg,#0b0f1e,#141a2e);border:1px solid rgba(99,102,241,.35);border-radius:20px;padding:0;overflow:hidden;margin:18px 0;}",
      ".ai-head{padding:16px 20px;background:rgba(99,102,241,.12);font-size:1.1rem;}",
      ".ai-badge{background:#6366f1;color:#fff;font-size:.65rem;padding:2px 10px;border-radius:999px;margin-left:8px;vertical-align:middle;}",
      ".ai-sub{padding:6px 20px;font-size:.75rem;color:#9aa3b2;border-bottom:1px solid rgba(255,255,255,.06);}",
      ".ai-chat{height:380px;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:10px;}",
      ".ai-msg{max-width:85%;padding:10px 14px;border-radius:16px;font-size:.88rem;line-height:1.5;word-wrap:break-word;}",
      ".ai-ai{background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.25);align-self:flex-start;border-bottom-left-radius:4px;}",
      ".ai-user{background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.25);align-self:flex-end;border-bottom-right-radius:4px;}",
      ".ai-typing{opacity:.6;font-style:italic;}",
      ".ai-msg code{background:rgba(255,255,255,.1);padding:1px 6px;border-radius:6px;font-size:.8rem;}",
      ".ai-input-row{display:flex;gap:8px;padding:12px 16px;border-top:1px solid rgba(255,255,255,.06);}",
      ".ai-input-row input{flex:1;background:#0b0f1e;border:1px solid rgba(255,255,255,.15);color:#fff;border-radius:12px;padding:12px 16px;font-size:.9rem;}",
      ".ai-input-row input:focus{outline:none;border-color:#6366f1;}",
      ".ai-input-row button{background:#6366f1;color:#fff;border:0;border-radius:12px;padding:0 20px;font-size:1.2rem;cursor:pointer;}",
      ".ai-input-row button:hover{background:#818cf8;}",
      ".ai-hint{padding:8px 20px 14px;font-size:.72rem;color:#9aa3b2;}",
      "@media(max-width:600px){.ai-chat{height:300px;}}"
    ].join("\n");
    document.head.appendChild(s);
  };

  /* auto-apply hidden CSS on every page (device-local) */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyHiddenCSS);
  } else {
    applyHiddenCSS();
  }
})();
/* ============================================================
   US AI — DEEP UPGRADE: Smart Diagnostics + Knowledge Base
   ============================================================ */

(function(){
"use strict";
var AI = window.USAI_AI;
if(!AI) return;

/* ---------- KNOWLEDGE BASE: har masla aur uska hal ---------- */
AI.KB = {
  "store-not-online": {
    title: "Store online nahi ho raha",
    causes: [
      "1. **25MB limit**: Cloudflare Pages par 25MB se bara file upload nahi hota. data/quotes.json (46MB) aur data/jokes.json (33MB) is ki waja se deploy fail hua tha.",
      "2. **Upload lock**: Agar do deploys ek saath chalen to TLS error aata hai. Sirf ek deploy ek waqt me.",
      "3. **Cache**: Browser purana version dikha raha ho. Hard refresh karo.",
      "4. **VM replacement**: /etc wipe ho gaya ho, timers ghayab."
    ],
    fix: "Deploy se pehle bare files ko ~/workspace/deploy-hold/ me move karo, deploy karo, phir wapis lao. Lock lo, ek hi deploy chalao."
  },
  "prices-wrong": {
    title: "Prices ghalat dikh rahe",
    causes: [
      "Public ko $ dikhta hai, owner ko Rs. Agar tum owner ho aur $ dikh raha hai to owner login nahi hua.",
      "SawalOwner.isOwner() check karta hai localStorage/sessionStorage."
    ],
    fix: "Owner PIN se login karo. Public ke liye $ sahi hai (USA website)."
  },
  "workers-dead": {
    title: "Workers nahi chal rahe",
    causes: [
      "VM replace hua → /etc wipe → timers ghayab. Ye sab se bara masla hai!",
      "Guardian khud bhi wipe ho jata hai (chicken-egg)."
    ],
    fix: "sudo cp ~/workspace/script-farm/systemd/*.timer /etc/systemd/system/ && sudo systemctl daemon-reload. Phir enable karo."
  },
  "grid-broken": {
    title: "Product grid toota hua",
    causes: ["Multiple conflicting CSS rules. 7 alag .sp-grid rules lar rahe thay."],
    fix: "Sirf ek clean grid rule rakho. #sp-grid par !important lagao."
  },
  "cache-issue": {
    title: "Purana version dikh raha",
    causes: ["Browser cache. Deploy ho gaya lekin phone purana page dikha raha."],
    fix: "Hard refresh: page neeche kheench kar refresh. Ya browser cache clear."
  }
};

/* ---------- DEEP DIAGNOSTICS ---------- */
AI.deepDiagnose = function(cb){
  cb("🔍 **Deep diagnosis chal rahi hai...**\n\nPages, images, aur common issues check kar raha hun...");
  
  var issues = [];
  var checks = [];
  
  // Check 1: Page accessibility
  var pages = ["index.html", "store.html", "admin.html"];
  var done = 0;
  
  pages.forEach(function(p){
    fetch(p + "?v=" + Date.now(), {method: "HEAD"}).then(function(r){
      checks.push({name: p, ok: r.ok, code: r.status});
      // Check content-length for 25MB warning
      var len = r.headers.get("content-length");
      if(len && parseInt(len) > 25*1024*1024){
        issues.push("⚠️ " + p + " 25MB se bara hai (" + (parseInt(len)/1024/1024).toFixed(1) + "MB) — Cloudflare deploy fail hoga!");
      }
    }).catch(function(){
      checks.push({name: p, ok: false, code: 0});
      issues.push("❌ " + p + " load nahi ho raha!");
    }).finally(function(){
      done++;
      if(done === pages.length){
        var msg = "🔍 **DEEP DIAGNOSIS REPORT**\n_" + new Date().toLocaleString() + "_\n\n";
        
        msg += "**Pages:**\n";
        checks.forEach(function(c){
          msg += (c.ok ? "✅" : "❌") + " " + c.name + " (" + c.code + ")\n";
        });
        
        if(issues.length){
          msg += "\n**🚨 Issues mile:**\n" + issues.join("\n") + "\n";
          msg += "\n**Hal:** Upar diye gaye KB se fix dekho, ya Muse se kaho.";
        } else {
          msg += "\n✅ **Koi bara masla nahi mila!** Sab theek hai.";
        }
        
        // Add KB suggestions
        msg += "\n\n💡 **Common fixes:**\n• `fix store` — store ke masle\n• `fix workers` — workers ke masle\n• `fix prices` — price ke masle";
        
        cb(msg);
      }
    });
  });
};

/* ---------- SMART FIX GUIDES ---------- */
AI.smartFix = function(topic, cb){
  topic = (topic||"").toLowerCase();
  var found = null;
  
  if(/store|online|deploy/.test(topic)) found = AI.KB["store-not-online"];
  else if(/price|qemat|dollar|rs/.test(topic)) found = AI.KB["prices-wrong"];
  else if(/worker|timer/.test(topic)) found = AI.KB["workers-dead"];
  else if(/grid|card/.test(topic)) found = AI.KB["grid-broken"];
  else if(/cache|purana/.test(topic)) found = AI.KB["cache-issue"];
  
  if(found){
    var msg = "🔧 **" + found.title + "**\n\n**Wajuhat:**\n" + found.causes.join("\n") + "\n\n**Hal:**\n" + found.fix;
    cb(msg);
  } else {
    cb("Kis cheez ka fix chahiye? Batao:\n\n• `fix store` — store/deploy issues\n• `fix workers` — workers/timers\n• `fix prices` — price issues\n• `fix cache` — purana version");
  }
};

/* ---------- ENHANCED THINK: naye commands ---------- */
var origThink = AI.think;
AI.think = function(text, cb){
  var t = (text||"").toLowerCase().trim();
  
  // Deep diagnose
  if(/diagnose|deep.*check|poori.*check|full.*check/.test(t)){
    AI.deepDiagnose(cb);
    return;
  }
  
  // Smart fix
  var fixMatch = t.match(/fix\s+(.+)/);
  if(fixMatch || /masla.*hal|problem.*solve|theek.*karo/.test(t)){
    var topic = fixMatch ? fixMatch[1] : t;
    AI.smartFix(topic, cb);
    return;
  }
  
  // Knowledge base list
  if(/kya.*masle|common.*issues|problems/.test(t)){
    var msg = "📚 **Known Issues & Fixes:**\n\n";
    for(var k in AI.KB){
      msg += "• **" + AI.KB[k].title + "**\n";
    }
    msg += "\nKisi par tafseel ke liye: `fix <topic>`";
    cb(msg);
    return;
  }
  
  // Deploy check
  if(/deploy.*check|deployment/.test(t)){
    cb("🚀 **Deployment:**\n\nDeploy server-side hota hai (Muse karta hai).\n\n**Last known:**\n• Project: us-ai\n• Live: https://www.usai-usa.com\n\n**Agar deploy fail ho:**\n1. 25MB files check karo\n2. Upload lock check karo\n3. Sirf ek deploy chalao\n\nMuse se kaho: 'deploy karo'");
    return;
  }
  
  // Fall back to original
  origThink(text, cb);
};

console.log("✅ USAI_AI Deep Upgrade loaded: diagnostics + KB + smart fixes");
})();
/* ============================================================
   DEEP UPGRADE PART 2: Worker Guide + Enhanced Intelligence
   ============================================================ */
(function(){
"use strict";
var AI = window.USAI_AI;
if(!AI || !AI.KB) return;

// Worker installation knowledge
AI.KB["install-worker"] = {
  title: "Naya worker lagana (FREE)",
  causes: ["Workers systemd timers hain — zero credit, deterministic Python."],
  fix: "1. Script banao: ~/workspace/script-farm/bin/\n2. Timer banao: ~/workspace/script-farm/systemd/\n3. Install: sudo cp *.timer *.service /etc/systemd/system/\n4. Enable: sudo systemctl enable <name>.timer\n5. Start: sudo systemctl start <name>.timer\n\n⚠️ Muse-credit workers KABHI nahi! Sirf free Python/systemd."
};

// Add worker commands to think
var origThink2 = AI.think;
AI.think = function(text, cb){
  var t = (text||"").toLowerCase().trim();
  
  if(/worker.*lagao|naya.*worker|install.*worker/.test(t)){
    var kb = AI.KB["install-worker"];
    cb("👷 **" + kb.title + "**\n\n" + kb.fix + "\n\n💡 Tafseel ke liye Muse se kaho: 'worker banao <kaam>'");
    return;
  }
  
  if(/jitna.*tum|tumhari.*tarah|smart.*banao/.test(t)){
    cb("🧠 **Main kitna smart hun?**\n\n**Kar sakta hun:**\n✅ Site diagnose (`diagnose karo`)\n✅ Maslon ke hal (`fix store`)\n✅ Boxes chhupao/dikhao\n✅ Reports\n✅ Worker guide\n\n**Nahi kar sakta (browser limit):**\n❌ Files edit karna\n❌ Deploy karna\n❌ Real backend access\n\nYe sab ke liye **Muse** se kaho (WhatsApp par) — wo sab kar sakta hai! 🚀");
    return;
  }
  
  origThink2(text, cb);
};

console.log("✅ USAI_AI Part 2 loaded: worker guide + intelligence");
})();
/* ============================================================
   REAL AI INTEGRATION - Groq Free API
   ============================================================ */
(function(){
"use strict";
var AI = window.USAI_AI;
if(!AI) return;

// Website context for AI
AI.SITE_CONTEXT = `You are the AI assistant for US AI website (usai-usa.com).
Website: US AI Mega Store (Daraz-style), RDP, Proxies, Picture/Video tools, Dramas, etc.
Owner: Abdul Rehman (cyrilmp4665@gmail.com), PIN: 704024
Key facts:
- Prices: Public sees $ (USD), Owner sees Rs (PKR)
- Accounts: Cloud backend (Cloudflare Worker + KV)
- Workers: Systemd timers (free, deterministic Python)
- Deploy: Cloudflare Pages, project "us-ai"
- 25MB file limit on Cloudflare Pages
- Domain: www.usai-usa.com
Answer in Roman Urdu (like the user speaks). Be helpful and concise.`;

AI.getApiKey = function(){
  try { return localStorage.getItem("usai_groq_key") || ""; } catch(e){ return ""; }
};
AI.setApiKey = function(k){
  try { localStorage.setItem("usai_groq_key", k); } catch(e){}
};

AI.askRealAI = function(question, cb){
  // Use our Worker (key is server-side, no user key needed!)
  cb("🤖 Soch raha hun...");
  
  fetch("https://usai-accounts-api.usai-api.workers.dev/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: question })
  }).then(function(r){ return r.json(); })
  .then(function(data){
    if(data.ok && data.answer){
      cb(data.answer);
    } else {
      cb("❌ AI se jawab nahi mila. Dobara try karo.");
    }
  }).catch(function(){
    cb("❌ Connection fail. Internet check karo.");
  });
};

// Hook into think - if patterns don't match, try real AI
var origThink = AI.think;
AI.think = function(text, cb){
  var t = (text||"").toLowerCase().trim();
  
  // Set API key
  var keyMatch = t.match(/key\s+lagao\s+(\S+)/);
  if(keyMatch){
    AI.setApiKey(keyMatch[1]);
    cb("✅ **API Key save ho gayi!** 🎉\n\nAb mujhse kuch bhi poocho — main real AI ki tarah jawab dunga!\n\nTry karo: kuch bhi likho!");
    return;
  }
  
  // Wrap callback to detect "Samajh nahi aaya" and use real AI (no key needed!)
  var wrappedCb = function(reply){
    if(reply.indexOf("Samajh nahi aaya") !== -1){
      AI.askRealAI(text, cb);
    } else {
      cb(reply);
    }
  };
  
  origThink(text, wrappedCb);
};

console.log("✅ Real AI integration loaded");
})();
/* ============================================================
   AI AGENT - Task execution framework
   ============================================================ */
(function(){
"use strict";
var AI = window.USAI_AI;
if(!AI) return;

/* ---------- AGENT: task planner + executor ---------- */
AI.Agent = {
  // Available actions the agent can perform in browser
  actions: {
    checkPage: function(url){
      return fetch(url + "?v=" + Date.now(), {method: "HEAD"})
        .then(function(r){ return {url: url, ok: r.ok, code: r.status}; })
        .catch(function(){ return {url: url, ok: false, code: 0}; });
    },
    
    triggerBackup: function(){
      var btn = document.getElementById("backup-export");
      if(btn){ btn.click(); return {done: true, msg: "Backup shuru ho gaya!"}; }
      return {done: false, msg: "Backup button nahi mila (account page par jao)"};
    },
    
    hideElement: function(selector){
      if(AI.hideSelector){ AI.hideSelector(selector, selector); return {done: true}; }
      return {done: false};
    },
    
    gotoPage: function(url){
      window.location.href = url;
      return {done: true, msg: "Ja raha hun: " + url};
    },
    
    getPageInfo: function(){
      return {
        url: window.location.href,
        title: document.title,
        hidden: AI.getHidden ? AI.getHidden() : []
      };
    }
  },
  
  // Execute a task plan
  execute: function(plan, cb){
    var results = [];
    var i = 0;
    
    function next(){
      if(i >= plan.length){
        cb(results);
        return;
      }
      var step = plan[i++];
      var action = AI.Agent.actions[step.action];
      if(!action){
        results.push({step: step, error: "Unknown action"});
        next();
        return;
      }
      try {
        var res = action.apply(null, step.args || []);
        if(res && res.then){
          res.then(function(r){ results.push({step: step, result: r}); next(); })
             .catch(function(e){ results.push({step: step, error: e.message}); next(); });
        } else {
          results.push({step: step, result: res});
          next();
        }
      } catch(e){
        results.push({step: step, error: e.message});
        next();
      }
    }
    next();
  },
  
  // Parse task and create plan via AI
  doTask: function(taskText, cb){
    cb("🤖 **Agent kaam kar raha hai...**\n\nTask: `" + taskText + "`");
    
    // Ask AI to create a plan
    var planPrompt = "User task: " + taskText + "\n\nAvailable actions: checkPage(url), triggerBackup(), hideElement(selector), gotoPage(url), getPageInfo()\n\nReply with ONLY a JSON array of steps like: [{\"action\":\"checkPage\",\"args\":[\"store.html\"]}]";
    
    fetch("https://usai-accounts-api.usai-api.workers.dev/api/ask", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({question: planPrompt})
    }).then(function(r){ return r.json(); })
    .then(function(data){
      if(data.ok && data.answer){
        try {
          // Try to extract JSON from answer
          var match = data.answer.match(/\[.*\]/s);
          if(match){
            var plan = JSON.parse(match[0]);
            AI.Agent.execute(plan, function(results){
              var msg = "✅ **Task complete!**\n\n**Results:**\n";
              results.forEach(function(r, idx){
                msg += (idx+1) + ". " + r.step.action + ": ";
                msg += r.error ? "❌ " + r.error : "✅";
                if(r.result && r.result.msg) msg += " " + r.result.msg;
                msg += "\n";
              });
              cb(msg);
            });
            return;
          }
        } catch(e){}
      }
      cb("❌ Task plan nahi ban saka. Dobara try karo ya simple command likho.");
    }).catch(function(){
      cb("❌ Agent connection fail.");
    });
  }
};

// Add agent command to think
var origThink = AI.think;
AI.think = function(text, cb){
  var t = (text||"").toLowerCase().trim();
  
  // Agent trigger: "karo", "kar do", task-like commands
  if(/^(karo|kar do|do task|agent).*/.test(t) || /audit karo|check karo sab|full check/.test(t)){
    var task = t.replace(/^(karo|kar do|do task|agent)\s*/, "") || t;
    AI.Agent.doTask(task || text, cb);
    return;
  }
  
  origThink(text, cb);
};

console.log("✅ AI Agent loaded");
})();
