/* US AI Viral Subscriptions shop — 100+ subscriptions, searchable, with markup pricing */
(function () {
  "use strict";

  /* [icon, name, category, official PKR/mo, our PKR/mo, desc] */
  var SUBS = [
  /* ---- AI CHAT ---- */
  ["🤖","ChatGPT Go","AI Chat",1400,2000,"OpenAI's budget plan — GPT-5, image gen, file uploads, higher limits."],
  ["🧠","ChatGPT Plus","AI Chat",5700,7500,"GPT-6 reasoning, priority access, deep research, Codex agent, custom GPTs."],
  ["🚀","ChatGPT Pro","AI Chat",28000,35000,"Max usage limits, GPT-6 Astra Pro reasoning, unlimited image gen."],
  ["🟠","Claude Pro","AI Chat",5600,7000,"Anthropic's best — long writing, coding, automation."],
  ["🟠","Claude Max","AI Chat",28000,35000,"5x usage — for heavy users."],
  ["✨","Google AI Pro","AI Chat",5600,7000,"Gemini Advanced + 2TB storage + Nano Banana image generation."],
  ["💎","Google AI Ultra","AI Chat",28000,35000,"Top-tier Gemini, max limits, early features."],
  ["🔍","Perplexity Pro","AI Chat",5600,7000,"AI search with citations — the best tool for research."],
  ["𝕏","Grok SuperGrok","AI Chat",8400,10500,"xAI's fast chatbot — X integration."],
  ["💬","Poe Pro","AI Chat",5600,7000,"All AI models in one place — GPT, Claude, Gemini."],
  ["🌐","You.com Pro","AI Chat",4200,5500,"AI search + agents, privacy focused."],
  /* ---- AI IMAGE ---- */
  ["🎨","Midjourney Basic","AI Image",2800,3800,"Best aesthetic AI images — 200 generations/month."],
  ["🎨","Midjourney Standard","AI Image",8400,10500,"Unlimited relaxed generations."],
  ["🎨","Midjourney Pro","AI Image",16800,21000,"Stealth mode, 12 concurrent jobs."],
  ["🖼️","Leonardo Apprentice","AI Image",3400,4500,"8500 tokens/month, game assets."],
  ["🖼️","Leonardo Artisan","AI Image",8400,10500,"25000 tokens, priority generations."],
  ["💡","Ideogram Plus","AI Image",5600,7000,"The king of text-in-image."],
  ["🔷","Recraft Basic","AI Image",2800,3800,"Sharpest vector-style output."],
  ["📸","Freepik Premium","AI Image",4200,5500,"Stock + AI images unlimited downloads."],
  ["🔥","Adobe Firefly","AI Image",2800,3800,"Commercial-safe AI images, 2000 credits."],
  /* ---- AI VIDEO ---- */
  ["🎥","Runway Standard","AI Video",3400,4500,"625 credits — pro AI video generation."],
  ["🎥","Runway Pro","AI Video",9800,12500,"2250 credits, priority queue."],
  ["🎬","CapCut Standard","AI Video",2800,3800,"Everyday editing, no watermark."],
  ["🎬","CapCut Pro","AI Video",5600,7000,"4K export, AI toolkit, 1TB cloud, 1200 AI credits."],
  ["🤖","Pika Pro","AI Video",5600,7000,"700 credits — viral AI video effects."],
  ["🌊","Luma Dream Machine","AI Video",8400,10500,"Ray2 model, 5000 credits."],
  ["🗣️","HeyGen Creator","AI Video",7000,9000,"AI avatars, 360 credits/month."],
  ["👔","Synthesia Starter","AI Video",8400,10500,"120 min video/year, 70+ avatars."],
  ["🎙️","Descript Creator","AI Video",4200,5500,"Text-based video editing, 30hrs transcription."],
  /* ---- AI AUDIO ---- */
  ["🔊","ElevenLabs Starter","AI Audio",1400,2000,"30k characters — realistic voiceovers."],
  ["🔊","ElevenLabs Creator","AI Audio",6200,8000,"100k characters, voice cloning."],
  ["🎵","Suno Premier","AI Audio",2800,3800,"2500 credits — AI music generation."],
  ["🎤","Murf Basic","AI Audio",5600,7000,"2hrs voice gen, 120+ voices."],
  /* ---- DESIGN ---- */
  ["🖌️","Canva Pro","Design",4200,5500,"Premium templates, brand kit, background remover."],
  ["👥","Canva Teams","Design",8400,10500,"3 users, collaboration tools."],
  ["📷","Adobe Photoshop","Design",6200,8000,"Industry standard photo editing."],
  ["☁️","Adobe Creative Cloud","Design",15400,19000,"20+ apps — Photoshop, Illustrator, Premiere."],
  ["🎯","Figma Professional","Design",4200,5500,"UI/UX design collaboration."],
  ["📦","Envato Elements","Design",4600,6000,"Unlimited stock photos, videos, templates."],
  ["🖼️","Shutterstock","Design",8400,10500,"10 images/month, commercial license."],
  /* ---- VIDEO EDITING ---- */
  ["🎞️","Adobe Premiere Pro","Video Edit",6200,8000,"Pro video editing suite."],
  ["✂️","Filmora Pro","Video Edit",2800,3800,"Easy pro editing, effects pack."],
  /* ---- PRODUCTIVITY ---- */
  ["📝","Notion Plus","Productivity",2800,3800,"Unlimited blocks, AI features."],
  ["📊","Microsoft 365 Personal","Productivity",2000,2800,"Word, Excel, PowerPoint + 1TB OneDrive."],
  ["👨‍👩‍👧","Microsoft 365 Family","Productivity",2800,3800,"6 users, 2TB shared OneDrive storage."],
  ["💾","Google One 2TB","Productivity",2800,3800,"2TB Drive + Gemini perks."],
  ["📁","Dropbox Plus","Productivity",2800,3800,"2TB cloud storage."],
  ["✅","Todoist Pro","Productivity",1400,2000,"Reminders, labels, filters."],
  ["💼","Slack Pro","Productivity",2400,3200,"Unlimited message history."],
  ["📹","Zoom Pro","Productivity",4200,5500,"30hr meetings, 100 participants."],
  ["📌","Trello Premium","Productivity",2800,3800,"Unlimited boards, timeline view."],
  ["📋","Asana Starter","Productivity",3000,4000,"Project timelines, 500 automations."],
  /* ---- STREAMING ---- */
  ["🍿","Netflix Mobile","Streaming",350,550,"Mobile only, 480p."],
  ["🍿","Netflix Basic","Streaming",650,950,"720p, 1 screen."],
  ["🍿","Netflix Standard","Streaming",1000,1400,"1080p, 2 screens."],
  ["🍿","Netflix Premium","Streaming",1100,1600,"4K UHD, 4 screens."],
  ["▶️","YouTube Premium","Streaming",479,750,"No ads, background play, offline + Music."],
  ["👪","YouTube Premium Family","Streaming",899,1300,"6 members."],
  ["🏏","Disney+ Hotstar","Streaming",1500,2000,"Cricket + movies, 4K."],
  ["📺","Amazon Prime Video","Streaming",900,1300,"Movies, series + Prime delivery."],
  ["🍎","Apple TV+","Streaming",2800,3600,"Originals in 4K Dolby."],
  ["🎭","HBO Max","Streaming",2800,3600,"HBO originals, Warner movies."],
  ["🌙","Shahid VIP","Streaming",1500,2000,"Arabic content + sports."],
  ["📡","Sony Liv","Streaming",1000,1400,"Sports + Indian shows."],
  ["🎪","Zee5","Streaming",800,1200,"Indian movies & series."],
  /* ---- MUSIC ---- */
  ["🎵","Spotify Individual","Music",379,600,"Ad-free, offline, high quality."],
  ["🎵","Spotify Duo","Music",519,800,"2 accounts."],
  ["🎵","Spotify Family","Music",679,1000,"6 accounts."],
  ["🎶","Apple Music","Music",350,550,"100M songs, spatial audio."],
  ["🎧","YouTube Music","Music",299,500,"Background play, offline."],
  /* ---- VPN ---- */
  ["🛡️","NordVPN Basic","VPN",1400,2000,"Fast, 10 devices."],
  ["🔒","ExpressVPN","VPN",2800,3800,"Top speed, 8 devices."],
  ["🦈","Surfshark Starter","VPN",700,1100,"Unlimited devices, cheapest."],
  /* ---- EDUCATION ---- */
  ["🎓","Coursera Plus","Education",11200,14000,"7000+ courses unlimited."],
  ["📚","Udemy Personal","Education",5600,7000,"12000+ courses."],
  ["💡","Skillshare","Education",4600,6000,"Creative classes."],
  ["🦉","Duolingo Super","Education",2000,2800,"No ads, offline lessons."],
  ["🌟","MasterClass","Education",2800,3800,"Celebrity-taught classes."],
  ["💼","LinkedIn Learning","Education",8400,10500,"20000+ career courses."],
  ["🗣️","Babbel","Education",3800,5000,"14 languages, live classes."],
  /* ---- SEO/MARKETING ---- */
  ["📈","Semrush Pro","Marketing",39000,48000,"Keyword research, 5 projects."],
  ["🔗","Ahrefs Starter","Marketing",8400,10500,"Site audit, keywords."],
  ["🎯","Moz Pro","Marketing",28000,35000,"Rank tracking, 3 campaigns."],
  ["📣","Hootsuite Pro","Marketing",28000,35000,"10 social accounts."],
  ["📮","Buffer Essentials","Marketing",1700,2500,"10 channels scheduling."],
  ["✉️","Mailchimp Standard","Marketing",5600,7000,"6000 emails/month."],
  /* ---- DEVELOPER ---- */
  ["💻","GitHub Copilot Pro","Developer",2800,3800,"AI code completion."],
  ["⌨️","Cursor Pro","Developer",5600,7000,"AI code editor, 500 requests."],
  ["⚡","Replit Core","Developer",5600,7000,"$25 credits, private repls."],
  ["🌊","Windsurf Pro","Developer",4200,5500,"500 prompt credits."],
  ["▲","Vercel Pro","Developer",5600,7000,"Hosting, 1TB bandwidth."],
  /* ---- GAMING ---- */
  ["🎮","Xbox Game Pass Ultimate","Gaming",3000,4000,"100+ games, cloud gaming."],
  ["🕹️","PS Plus Essential","Gaming",2000,2800,"Monthly games, online play."],
  ["🕹️","PS Plus Extra","Gaming",3000,4000,"400+ downloadable games."],
  ["⚽","EA Play","Gaming",1400,2000,"EA games vault."],
  /* ---- WRITING ---- */
  ["✍️","Grammarly Premium","Writing",3400,4500,"Advanced grammar + AI writing."],
  ["🪶","QuillBot Premium","Writing",2800,3800,"Unlimited paraphrasing."],
  ["📖","Jasper Creator","Writing",11000,14000,"AI copywriting, 1 seat."],
  ["🖊️","Writesonic","Writing",5600,7000,"AI articles, 200k words."],
  ["📄","Copy.ai Pro","Writing",10000,13000,"Unlimited words, 5 seats."],
  ["💜","Discord Nitro","Social",2800,3800,"HD streaming, custom emojis, 500MB uploads."],
  ["✈️","Telegram Premium","Social",1400,2000,"4GB uploads, faster downloads, no ads."],
  ["💼","LinkedIn Premium","Social",8400,10500,"InMail, profile views, learning."],
  ["🔥","Tinder Plus","Social",4200,5500,"Unlimited likes, passport, rewind."],
  ["🐝","Bumble Premium","Social",5600,7000,"Unlimited swipes, travel mode."],
  ["🎨","PicsArt Gold","Design",2800,3800,"Premium filters, no ads, AI tools."],
  ["📷","VSCO Pro","Design",2000,2800,"200+ presets, advanced editing."],
  ["🎞️","KineMaster Pro","Video Edit",1400,2000,"No watermark, premium assets."],
  ["✂️","InShot Pro","Video Edit",1000,1500,"No watermark, premium effects."]
  ];
  /* id generate */
  SUBS.forEach(function(s, i){ s.push("sub" + i); }); /* index 6 = id */

  var CATS = ["All", "AI Chat", "AI Image", "AI Video", "AI Audio", "Design", "Video Edit",
    "Productivity", "Streaming", "Music", "VPN", "Education", "Marketing", "Social", "Developer", "Gaming", "Writing"];

  var DUR = { "1": { m: 1, off: 0 }, "3": { m: 3, off: 0.05 }, "6": { m: 6, off: 0.10 }, "12": { m: 12, off: 0.20 } };
  var DUR_LABEL = { "1": "1 Month", "3": "3 Months (5% off)", "6": "6 Months (10% off)", "12": "12 Months (20% off)" };
  var selId = null, selCat = "All", selQ = "", subQty = 1;

  /* think-259 2026-10-13: guest selection resume — plan+duration+qty survive the login
     redirect (same pattern as buy-panel/numbers resume). Additive only, no visual change. */
  var SUB_PEND = "usai_sub_pending";
  function subPendHas(id) { for (var i = 0; i < SUBS.length; i++) if (SUBS[i][6] === id) return true; return false; }
  function subPendSave() {
    try {
      var dur = ($("sub-duration") && $("sub-duration").value) || "1";
      sessionStorage.setItem(SUB_PEND, JSON.stringify({ sub: selId, dur: dur, qty: subQty }));
    } catch (e) {}
  }
  function subPendRead() {
    try {
      var raw = sessionStorage.getItem(SUB_PEND); if (!raw) return null;
      var o = JSON.parse(raw); if (!o || !subPendHas(o.sub)) return null;
      return { sub: o.sub, dur: DUR[o.dur] ? o.dur : "1", qty: Math.min(10, Math.max(1, parseInt(o.qty, 10) || 1)) };
    } catch (e) { return null; }
  }
  function subPendClear() { try { sessionStorage.removeItem(SUB_PEND); } catch (e) {} }

  function rs(n) { var v = Math.round(n) / 280; return "$" + (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(2)); }
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* brand logo map: product-name prefix -> img/logos/<slug>.png (real brand logos) */
  var LOGOS = {
    "ChatGPT": "chatgpt", "Claude": "claude", "Google AI": "google", "Google One": "google",
    "Perplexity": "perplexity", "Grok": "grok", "Poe": "poe",
    "You.com": "youcom",
    "Midjourney": "midjourney", "Leonardo": "leonardo", "Ideogram": "ideogram",
    "Recraft": "recraft", "Freepik": "freepik", "Adobe": "adobe",
    "Runway": "runway", "CapCut": "capcut", "Pika": "pika", "Luma": "luma",
    "HeyGen": "heygen", "Synthesia": "synthesia", "Descript": "descript",
    "ElevenLabs": "elevenlabs", "Suno": "suno", "Murf": "murf",
    "Canva": "canva", "Figma": "figma", "Envato": "envato", "Shutterstock": "shutterstock",
    "Filmora": "filmora", "Notion": "notion", "Microsoft": "microsoft",
    "Dropbox": "dropbox", "Todoist": "todoist", "Slack": "slack", "Zoom": "zoom",
    "Trello": "trello", "Asana": "asana", "Netflix": "netflix",
    "YouTube": "youtube", "Disney+": "hotstar", "Amazon Prime": "amazon",
    "Apple": "apple", "HBO Max": "hbomax", "Shahid": "shahid",
    "Sony Liv": "sonyliv", "Zee5": "zee5", "Spotify": "spotify",
    "NordVPN": "nordvpn", "ExpressVPN": "expressvpn", "Surfshark": "surfshark",
    "Coursera": "coursera", "Udemy": "udemy", "Skillshare": "skillshare",
    "Duolingo": "duolingo", "MasterClass": "masterclass", "LinkedIn": "linkedin",
    "Babbel": "babbel", "Semrush": "semrush", "Ahrefs": "ahrefs", "Moz": "moz",
    "Hootsuite": "hootsuite", "Buffer": "buffer", "Mailchimp": "mailchimp",
    "GitHub": "github", "Cursor": "cursor", "Replit": "replit", "Windsurf": "windsurf",
    "Vercel": "vercel", "Xbox": "xbox", "PS Plus": "playstation", "EA Play": "ea",
    "Grammarly": "grammarly", "QuillBot": "quillbot", "Jasper": "jasper",
    "Writesonic": "writesonic", "Copy.ai": "copyai", "Discord": "discord",
    "Telegram": "telegram", "Tinder": "tinder", "Bumble": "bumble",
    "PicsArt": "picsart", "VSCO": "vsco", "KineMaster": "kinemaster", "InShot": "inshot"
  };
  function logoFor(name) {
    for (var k in LOGOS) { if (name.indexOf(k) === 0) return LOGOS[k]; }
    return null;
  }
  function logoHtml(s, detail) {
    var slug = logoFor(s[1]);
    if (slug) return '<img class="sub-logo" src="img/logos/' + slug + '.png" alt="' + esc(s[1]) + ' logo" loading="lazy" onerror="this.outerHTML=' + "'" + s[0] + "'" + '">';
    return s[0];
  }
  function get(id) { for (var i = 0; i < SUBS.length; i++) if (SUBS[i][6] === id) return SUBS[i]; return SUBS[0]; }
  function calcPrice(s, durKey) {
    var d = DUR[durKey] || DUR["1"];
    return Math.round(s[4] * d.m * (1 - d.off));
  }

  function filtered() {
    return SUBS.filter(function (s) {
      if (selCat !== "All" && s[2] !== selCat) return false;
      if (selQ && (s[1] + " " + s[2]).toLowerCase().indexOf(selQ) < 0) return false;
      return true;
    });
  }

  function renderGrid() {
    var list = filtered();
    var html = list.map(function (s) {
      var cls = s[6] === selId ? " active" : "";
      return '<button type="button" class="sub-card' + cls + '" data-sub="' + s[6] + '">' +
        '<span class="sub-ico">' + logoHtml(s) + '</span>' +
        '<span class="sub-name">' + esc(s[1]) + '</span>' +
        '<span class="sub-price">' + rs(s[4]) + '<small>/mo</small></span>' +
        "</button>";
    }).join("");
    $("sub-grid").innerHTML = html || '<p class="muted center">Nothing found — try a different search.</p>';
    $("sub-count").textContent = list.length + " / " + SUBS.length;
  }

  /* Login-first gate: buy karne se PEHLE login/account lazmi */
  function refreshLoginGate() {
    var gate = $("sub-login-gate"), form = $("sub-order-form");
    if (!gate || !form) return true;
    var u = null;
    try { u = (window.SawalPay && SawalPay.currentUser) ? SawalPay.currentUser() : null; } catch (e) {}
    if (!u) {
      var next = "";
      try { next = "?next=" + encodeURIComponent(location.pathname + "#subscriptions"); } catch (e) {}
      gate.innerHTML =
        '<div class="pay-lock">' +
        '<div class="pay-lock-ico">🔒</div>' +
        "<h3>Login Required</h3>" +
        "<p>Please login or create a free account before buying a subscription.</p>" +
        '<a class="btn btn-primary btn-glow" href="account.html' + next + '">Login / Create Free Account →</a>' +
        "</div>";
      gate.style.display = "";
      form.style.display = "none";
      return false;
    }
    gate.style.display = "none"; gate.innerHTML = "";
    form.style.display = "";
    return true;
  }

  function update() {
    var s = get(selId || SUBS[0][6]);
    var dur = ($("sub-duration") && $("sub-duration").value) || "1";
    var total = calcPrice(s, dur) * subQty;
    $("sub-details").innerHTML =
      '<div class="sub-detail-logo">' + logoHtml(s) + '</div>' +
      "<p><b>" + esc(s[1]) + "</b> <span class='tiny muted'>" + esc(s[2]) + "</span></p>" +
      '<p class="tiny muted">' + esc(s[5]) + "</p>" +
      '<p class="tiny">Official: <s class="muted">' + rs(s[3]) + '/mo</s> <b class="grad">' + rs(s[4]) + '/mo</b></p>';
    $("sub-total").textContent = rs(total);
    $("sub-unit").textContent = s[1] + " — " + DUR_LABEL[dur] + " × " + subQty;
  }

  function init() {
    if (!$("sub-grid")) return;
    /* restore guest's pre-login selection (consume once) */
    var subPend = subPendRead();
    selId = (subPend && subPend.sub) || SUBS[0][6];

    /* category pills */
    $("sub-cats").innerHTML = CATS.map(function (c, i) {
      return '<button type="button" class="ent-pill' + (i === 0 ? " active" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");
    $("sub-cats").addEventListener("click", function (e) {
      var b = e.target.closest(".ent-pill"); if (!b) return;
      var all = $("sub-cats").querySelectorAll(".ent-pill");
      for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
      b.classList.add("active"); selCat = b.getAttribute("data-cat"); renderGrid();
    });

    /* search */
    $("sub-search").addEventListener("input", function () {
      selQ = this.value.trim().toLowerCase(); renderGrid();
    });

    /* grid click */
    $("sub-grid").addEventListener("click", function (e) {
      var b = e.target.closest(".sub-card"); if (!b) return;
      selId = b.getAttribute("data-sub"); renderGrid(); update(); subPendSave();
      $("sub-details").scrollIntoView({ behavior: "smooth", block: "center" });
    });

    /* duration */
    $("sub-duration").innerHTML = Object.keys(DUR).map(function (k) {
      return '<option value="' + k + '">' + DUR_LABEL[k] + "</option>";
    }).join("");
    $("sub-duration").addEventListener("change", function () { update(); subPendSave(); });
    /* apply restored pre-login selection */
    if (subPend) {
      $("sub-duration").value = subPend.dur;
      subQty = subPend.qty;
      if ($("sub-qty-n")) $("sub-qty-n").textContent = subQty;
      subPendClear();
    }

    /* quantity stepper (additive, buy-panel pattern reuse) */
    var qtyBox = document.querySelector("#subscriptions .buy-qty");
    if (qtyBox) {
      qtyBox.addEventListener("click", function (e) {
        var b = e.target.closest("[data-sq]"); if (!b) return;
        subQty = Math.min(10, Math.max(1, subQty + parseInt(b.getAttribute("data-sq"), 10)));
        $("sub-qty-n").textContent = subQty; update(); subPendSave();
      });
    }

    renderGrid(); update(); refreshLoginGate();

    /* order form */
    $("sub-order-form").addEventListener("submit", function (e) {
      e.preventDefault();
      if (!refreshLoginGate()) {
        $("sub-login-gate").scrollIntoView({ behavior: "smooth", block: "center" });
        $("sub-order-msg").textContent = "Please login or create a free account first.";
        return;
      }
      var s = get(selId), dur = $("sub-duration").value || "1";
      var total = calcPrice(s, dur) * subQty;
      var name = $("sub-name").value.trim(), email = $("sub-email").value.trim(), wa = $("sub-wa").value.trim();
      if (!name || !email || !wa) { $("sub-order-msg").textContent = "Please fill all fields."; return; }
      var box = $("sub-pay-box");
      box.style.display = ""; box.scrollIntoView({ behavior: "smooth", block: "center" });
      SawalPay.collect(box, {
        amount: total, item: s[1] + " — " + DUR_LABEL[dur] + " × " + subQty,
        orderId: "SUB-" + Date.now().toString(36).toUpperCase()
      }, function (tid) {
        var order = { type: "subscription", item: s[1], plan: DUR_LABEL[dur], qty: subQty, amount: total, tid: tid, name: name, email: email, whatsapp: wa, notes: $("sub-notes").value.trim() };
        saveSubOrder(order); sendSubNotifications(order);
        $("sub-order-msg").innerHTML = "✅ Order received! Order <b>" + esc(order.id || "") + "</b> · TID: <b>" + esc(tid) + "</b> — account details will arrive on WhatsApp/email within 24 hours.<br>" +
          'If 24 hours pass and nothing arrives, message us on WhatsApp (<b>+92 325 4746678</b>) with your order ID — you can also see the order status anytime under "🧾 My Purchases" in your account.<br>' +
          '<a href="purchases.html" style="color:#a78bfa">🧾 Track it in My Purchases</a>';
        box.style.display = "none"; e.target.reset();
        subQty = 1; $("sub-qty-n").textContent = "1"; update(); subPendClear();
      });
    });
  }

  function saveSubOrder(o) {
    try {
      var k = "sawalai_orders", all = JSON.parse(localStorage.getItem(k) || "[]");
      o.id = "SUB-" + Date.now().toString(36).toUpperCase();
      o.date = new Date().toISOString(); o.status = "Pending";
      all.unshift(o); localStorage.setItem(k, JSON.stringify(all));
    } catch (e) {}
  }

  function sendSubNotifications(o) {
    var msg = "🔥 New Subscription Order%0AItem: " + encodeURIComponent(o.item) +
      "%0APlan: " + encodeURIComponent(o.plan) + "%0AAmount: " + rs(o.amount) + " (≈ Rs " + Math.round(o.amount).toLocaleString("en-PK") + ")" +
      "%0ATID: " + encodeURIComponent(o.tid) + "%0AName: " + encodeURIComponent(o.name) +
      "%0AWhatsApp: " + encodeURIComponent(o.whatsapp);
    var waBtn = $("sub-wa-alert");
    if (waBtn) { waBtn.href = "https://wa.me/923254746678?text=" + msg; waBtn.style.display = ""; }
    try {
      var fd = new FormData();
      fd.append("_subject", "🔥 New Subscription Order — " + o.item);
      fd.append("Item", o.item); fd.append("Plan", o.plan);
      fd.append("Amount", rs(o.amount) + " (≈ Rs " + Math.round(o.amount).toLocaleString("en-PK") + ")"); fd.append("JazzCash TID", o.tid);
      fd.append("Name", o.name); fd.append("Email", o.email); fd.append("WhatsApp", o.whatsapp);
      fd.append("Notes", o.notes || "-");
      fetch("https://formsubmit.co/ajax/rehmanmaher500@gmail.com", { method: "POST", body: fd });
      fetch("https://formsubmit.co/ajax/cyrilmp4665@gmail.com", { method: "POST", body: fd });
    } catch (e) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
