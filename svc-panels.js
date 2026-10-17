/* US AI — Service inner panels. Click a homepage service box -> rich inner panel (no scroll). */
(function () {
  "use strict";

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  var PANELS = {
    proxies: {
      title: "Buy Proxies", img: "img/icon-proxy.jpg",
      desc: "Private proxies in 10 countries — datacenter speed to real residential IPs. Every plan includes instant delivery, login-gated orders and JazzCash payment.",
      items: [
        { ic: "🏢", name: "Datacenter Proxies", desc: "Blazing-fast HTTP proxies — perfect for scraping, SEO tools and automation.", price: "$1.79/IP/mo" },
        { ic: "🏠", name: "Residential Proxies", desc: "Real home IPs — the BEST choice for social media accounts, no tracking.", price: "$8.93/IP/mo" },
        { ic: "🌐", name: "HTTP ISP Proxies", desc: "Datacenter speed + residential trust — the balanced all-rounder.", price: "$7.14/IP/mo" },
        { ic: "🔄", name: "Rotating Residential", desc: "IP auto-rotates on every request — maximum anonymity for heavy tasks.", price: "$41.43/mo" },
        { ic: "📱", name: "Mobile 4G Proxies", desc: "Real mobile-carrier IPs — the highest trust score of any proxy type.", price: "$175.50/mo" },
        { ic: "🧦", name: "SOCKS5 Proxies", desc: "For gaming, streaming and any TCP app — flexible and fast.", price: "$2.14/IP/mo" },
        { ic: "🔒", name: "Dedicated Datacenter Proxies", desc: "Exclusive datacenter IP — only yours, never shared. 250GB bandwidth, 500 threads.", price: "$2.00/IP/mo" }
      ],
      ctas: [{ label: "See Proxy Prices →", href: "#proxies" }]
    },
    rdp: {
      title: "Buy RDP & VPS", img: "img/icon-rdp.jpg",
      desc: "Windows RDP servers in 6 countries plus brand-new VPS range — dedicated RAM, full admin, instant setup after payment.",
      items: [
        { pic: "img/icon-rdp.jpg", name: "RDP 4GB RAM", desc: "Windows RDP — browsing, office work, light bots. 6 countries.", price: "from $1.43/mo" },
        { pic: "img/icon-rdp.jpg", name: "RDP 8GB RAM", desc: "More power — multitasking, automation, multiple sessions.", price: "from $2.68/mo" },
        { pic: "img/icon-rdp.jpg", name: "RDP 16GB RAM", desc: "Heavy workloads — trading terminals, video rendering.", price: "from $5.00/mo" },
        { pic: "img/logos/ubuntu.svg", name: "Linux VPS", desc: "Ubuntu VPS with root access — host websites, run bots & apps.", price: "from $2.86/mo" },
        { pic: "img/logos/microsoft.png", name: "Windows VPS", desc: "Full-administrator Windows VPS — install any software you need.", price: "from $4.29/mo" },
        { pic: "img/icon-forex-vps.jpg", name: "Forex VPS", desc: "Ultra-low-latency VPS tuned for MT4/MT5 — your trades never sleep.", price: "from $5.36/mo" },
        { pic: "img/icon-vps.jpg", name: "Storage VPS", desc: "1TB storage VPS — backups, file hosting and media library.", price: "from $3.57/mo" },
        { pic: "img/logos/ubuntu.svg", name: "Linux VPS 16GB Pro", desc: "8 vCPU, 16GB RAM, 160GB NVMe — Ubuntu 24.04 with full root.", price: "$27.86/mo" },
        { pic: "img/icon-vps.jpg", name: "Budget Shared Web Hosting", desc: "Unlimited SSD, free SSL, 1-click WordPress — perfect for blogs.", price: "$7.50/mo" }
      ],
      ctas: [{ label: "See RDP Prices & Order →", href: "#rdp" }]
    },
    aichat: {
      title: "AI Chat", img: "img/icon-ai-chat.jpg",
      desc: "Ask anything and get instant smart answers — free forever, no signup needed.",
      items: [
        { ic: "💬", name: "Ask Anything", desc: "Questions, homework, business ideas — answered instantly." },
        { ic: "🌍", name: "10 Languages", desc: "Urdu, English, Hindi, Turkish, Arabic and 5 more." },
        { ic: "🖼️", name: "Image Questions", desc: "Upload a picture and ask about it." },
        { ic: "🎙️", name: "Voice Input", desc: "Speak your question — just tap the mic." },
        { ic: "📚", name: "828+ Articles", desc: "Deep guides on AI, earning, tech & more." },
        { ic: "🆓", name: "100% Free", desc: "No account, no limits, no catch." }
      ],
      ctas: [{ label: "Open AI Chat →", href: "#demo" }]
    },
    picture: {
      title: "AI Picture Studio", img: "img/icon-picture-studio.jpg",
      desc: "Describe any picture and watch AI paint it in Full HD — free, in any language.",
      items: [
        { ic: "🎨", name: "Text to Picture", desc: "Type a description — get a stunning HD picture." },
        { ic: "🖌️", name: "Art Styles", desc: "Realistic, anime, 3D, oil painting & more." },
        { ic: "🌍", name: "Any Language", desc: "Describe in Urdu or English — AI understands." },
        { ic: "💾", name: "Download Free", desc: "Save every creation to your device." },
        { ic: "⚡", name: "Pro Upgrade", desc: "4K quality, 50 pictures at once, priority queue." }
      ],
      ctas: [{ label: "Create Pictures →", href: "#studio" }]
    },
    video: {
      title: "AI Video Studio", img: "img/icon-video-studio.jpg",
      desc: "Describe a scene — AI paints it, then animates it into a short downloadable video.",
      items: [
        { ic: "🎬", name: "Text to Video", desc: "One line of text becomes a moving video clip." },
        { ic: "🖼️", name: "Picture to Video", desc: "Animate any picture you created or uploaded." },
        { ic: "🎭", name: "Characters", desc: "Consistent characters across your clips." },
        { ic: "💾", name: "HD Download", desc: "Download and share anywhere." },
        { ic: "🎁", name: "Free Requests", desc: "Daily free video requests for everyone." }
      ],
      ctas: [{ label: "Create Videos →", href: "#video-studio" }]
    },
    articles: {
      title: "Articles", img: "img/icon-articles.jpg",
      desc: "828+ easy guides on AI, earning, tech and more — in 10 languages.",
      items: [
        { ic: "🤖", name: "AI Guides", desc: "ChatGPT, Gemini & AI tools explained simply." },
        { ic: "💰", name: "Online Earning", desc: "Freelancing, YouTube, TikTok income guides." },
        { ic: "💻", name: "Tech How-tos", desc: "Phones, apps, internet tricks." },
        { ic: "📖", name: "Stories", desc: "History, science and motivational reads." },
        { ic: "🌍", name: "10 Languages", desc: "Every article in your language." },
        { ic: "🔍", name: "Smart Search", desc: "Find any guide in seconds." }
      ],
      ctas: [{ label: "Read Articles →", href: "#articles" }]
    },
    dramas: {
      title: "Turkish Dramas", img: "img/icon-drama.jpg",
      desc: "Watch trailers of 10 epic Turkish dramas with Urdu subtitles — new videos daily.",
      items: [
        { ic: "⚔️", name: "Diriliş: Ertuğrul", desc: "The legendary beginning — trailers + shorts." },
        { ic: "🏇", name: "Kuruluş: Osman", desc: "The Ottoman Empire rises." },
        { ic: "🕌", name: "Alparslan: Büyük Selçuklu", desc: "Sultan Alparslan's conquests." },
        { ic: "👑", name: "Mehmed: Fetihler Sultanı", desc: "The conqueror of Istanbul." },
        { ic: "⚓", name: "Barbaroslar", desc: "Sword of the Mediterranean." },
        { ic: "📜", name: "Payitaht: Abdülhamid", desc: "The last great Sultan." }
      ],
      ctas: [{ label: "Watch Trailers →", href: "trailers.html" }]
    },
    tempmail: {
      title: "Temp Mail & SMS", img: "img/icon-tempmail.jpg",
      desc: "Free temporary email with live inbox + free temp numbers for SMS codes — no signup.",
      items: [
        { ic: "📧", name: "Temp Email", desc: "Instant disposable inbox — no signup." },
        { ic: "📩", name: "Live Inbox", desc: "Mails arrive in seconds, auto-refresh." },
        { ic: "📱", name: "Free Temp Numbers", desc: "Receive SMS codes free." },
        { ic: "🔒", name: "Private", desc: "Nothing stored — addresses vanish." },
        { ic: "💎", name: "Premium Numbers", desc: "Private numbers for WhatsApp/Telegram OTP." }
      ],
      ctas: [{ label: "Get Temp Inbox →", href: "temp-box.html" }, { label: "Premium Numbers →", href: "numbers.html" }]
    },
    numbers: {
      title: "Buy Real Numbers", img: "img/icon-numbers.jpg",
      desc: "Real private phone numbers for OTP codes in 24 countries — from $4.64.",
      items: [
        { ic: "💬", name: "WhatsApp OTP", desc: "Verify WhatsApp with a real number.", price: "$5.35" },
        { ic: "📧", name: "Gmail OTP", desc: "Google verification codes.", price: "$5.35" },
        { ic: "✈️", name: "Telegram OTP", desc: "Telegram verification codes.", price: "$5.35" },
        { ic: "📱", name: "Any App OTP", desc: "One code for any app or site.", price: "$4.64" },
        { ic: "🕐", name: "7-Day Rental", desc: "Keep the number for a full week.", price: "$28.57" },
        { ic: "🗓️", name: "30-Day Rental", desc: "A whole month of private use.", price: "$71.43" }
      ],
      ctas: [{ label: "Buy Numbers →", href: "numbers.html" }]
    },
    purchases: {
      title: "My Purchases", img: "img/icon-purchases.jpg",
      desc: "Everything you've bought — numbers, proxies, RDP, services, websites — with payment status.",
      items: [
        { ic: "🧾", name: "All Orders", desc: "Every order in one clean list." },
        { ic: "⏳", name: "Payment Status", desc: "Pending / verified badges on each order." },
        { ic: "💰", name: "Total Spent", desc: "See exactly what you've invested." },
        { ic: "📱", name: "WhatsApp Alerts", desc: "Order updates on your WhatsApp." }
      ],
      ctas: [{ label: "View Purchases →", href: "purchases.html" }]
    },
    builder: {
      title: "Website Builder", img: "img/icon-builder.jpg",
      desc: "Describe your dream website — we build & deliver it here in ~10 minutes.",
      items: [
        { ic: "🏗️", name: "AI Build", desc: "Describe it — get a full website in ~10 min." },
        { ic: "🎨", name: "Modern Design", desc: "Mobile-friendly, animated, professional." },
        { ic: "🆓", name: "Free Start", desc: "First build free — login required." },
        { ic: "🚀", name: "Pro Plans", desc: "Custom domains, more pages, priority." },
        { ic: "🛠️", name: "Edits Included", desc: "Ask for changes — we apply them." }
      ],
      ctas: [{ label: "Build My Website →", href: "builder.html" }]
    },
    apps: {
      title: "App Studio", img: "img/icon-apps.jpg",
      desc: "Free templates + custom apps — describe your idea, we build & deliver in ~15 minutes.",
      items: [
        { ic: "📱", name: "Custom Apps", desc: "Your idea becomes a working app." },
        { ic: "📦", name: "Templates", desc: "Start from proven app templates." },
        { ic: "⚡", name: "~15 Min Delivery", desc: "From idea to app, fast." },
        { ic: "🆓", name: "Free Start", desc: "First app free — login required." },
        { ic: "🔄", name: "Revisions", desc: "Request changes any time." }
      ],
      ctas: [{ label: "Build My App →", href: "apps.html" }]
    }
  };

  function itemHTML(it) {
    var dark = it.pic && /\.svg(\?|$)/i.test(it.pic) ? " darkbg" : "";
    var pic = it.pic
      ? '<img class="pic' + dark + '" src="' + esc(it.pic) + '" alt="' + esc(it.name) + '" loading="lazy" onerror="this.style.display=\'none\'">'
      : '<span class="pic ic">' + esc(it.ic || "✨") + "</span>";
    return '<div class="svc-item">' + pic +
      '<div class="tx"><b>' + esc(it.name) + "</b><span>" + esc(it.desc || "") + "</span>" +
      (it.price ? '<span class="pr">' + esc(it.price) + "</span>" : "") +
      "</div></div>";
  }

  function openPanel(key) {
    var p = PANELS[key];
    if (!p) return;
    var m = document.getElementById("svc-modal");
    if (!m) return;
    var body = document.getElementById("svc-panel-body");
    body.innerHTML =
      '<div class="svc-panel-hero">' +
      '<img src="' + esc(p.img) + '" alt="' + esc(p.title) + '" loading="lazy" onerror="this.style.display=\'none\'">' +
      "<h2>" + esc(p.title) + "</h2><p>" + esc(p.desc) + "</p></div>" +
      '<div class="svc-panel-grid">' + p.items.map(itemHTML).join("") + "</div>" +
      '<div class="svc-panel-cta">' +
      p.ctas.map(function (c) {
        return '<a class="btn btn-primary btn-glow" href="' + esc(c.href) + '" data-panel-nav>' + esc(c.label) + "</a>";
      }).join("") +
      "</div>";
    m.classList.add("open");
    document.body.style.overflow = "hidden";
    var panel = m.querySelector(".svc-panel");
    if (panel) panel.scrollTop = 0;
  }

  function closePanel() {
    var m = document.getElementById("svc-modal");
    if (!m) return;
    m.classList.remove("open");
    document.body.style.overflow = "";
  }

  function init() {
    /* modal shell */
    if (!document.getElementById("svc-modal")) {
      var d = document.createElement("div");
      d.id = "svc-modal";
      d.className = "svc-modal";
      d.innerHTML =
        '<div class="svc-modal-bg" data-close></div>' +
        '<div class="svc-panel" role="dialog" aria-modal="true">' +
        '<button type="button" class="svc-panel-close" data-close aria-label="Close">✕</button>' +
        '<div id="svc-panel-body"></div>' +
        "</div>";
      document.body.appendChild(d);
    }
    /* intercept service card clicks -> open inner panel instead of scrolling */
    document.addEventListener("click", function (e) {
      var closer = e.target.closest ? e.target.closest("[data-close]") : null;
      if (closer) { closePanel(); return; }
      var nav = e.target.closest ? e.target.closest("[data-panel-nav]") : null;
      if (nav) { closePanel(); return; } /* let the CTA link work normally */
      var card = e.target.closest ? e.target.closest("[data-panel]") : null;
      if (!card) return;
      e.preventDefault();
      openPanel(card.getAttribute("data-panel"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closePanel();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
