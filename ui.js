/* US AI UI extras: scroll reveal, back-to-top, hero parallax,
   animated counters, floating share rail. Lightweight, no dependencies. */
/* Reduced-motion helper: returns "auto" when OS prefers reduced motion, else "smooth". */
window.sawalScrollBehavior = function () {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"; }
  catch (e) { return "smooth"; }
};
(function () {
  "use strict";

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".section, .card");
    if (!("IntersectionObserver" in window) || !els.length) {
      for (var i = 0; i < els.length; i++) els[i].classList.add("revealed");
      return;
    }
    for (var k = 0; k < els.length; k++) els[k].classList.add("reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("revealed");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
    /* Fallback: never leave a section/card invisible if the observer misses it
       (very tall sections can sit below the intersection threshold). */
    function revealInView() {
      var hidden = document.querySelectorAll(".reveal:not(.revealed)");
      for (var i = 0; i < hidden.length; i++) {
        var r = hidden[i].getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          hidden[i].classList.add("revealed");
          try { io.unobserve(hidden[i]); } catch (e) {}
        }
      }
    }
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        (window.requestAnimationFrame || function (f) { f(); })(function () {
          revealInView(); ticking = false;
        });
      }
    }, { passive: true });
    setTimeout(revealInView, 1500);
    setTimeout(revealInView, 4000);
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    var btn = document.createElement("button");
    btn.id = "toTop";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = "↑";
    document.body.appendChild(btn);
    var shown = false;
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (y > 600 && !shown) { btn.classList.add("show"); shown = true; }
      else if (y <= 600 && shown) { btn.classList.remove("show"); shown = false; }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth") });
    });
    onScroll();
  }

  /* ---------- Hero video parallax ---------- */
  function initParallax() {
    var hero = document.querySelector(".hero");
    var video = document.querySelector(".hero-video");
    /* mobile: drop the video entirely — static poster bg is far smoother */
    if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) {
      if (video) { try { video.pause(); } catch (e) {} video.removeAttribute("src"); video.load(); video.parentNode && video.parentNode.removeChild(video); }
      return;
    }
    if (!hero || !video) return;
    /* desktop: load + play via JS (HTML ships preload=none so mobile never downloads) */
    try { video.preload = "auto"; var vp = video.play(); if (vp && vp.catch) vp.catch(function () {}); } catch (e) {}
    var ticking = false;
    function update() {
      var y = window.scrollY || window.pageYOffset;
      if (y < window.innerHeight) {
        video.style.transform = "translateY(" + (y * 0.25) + "px) scale(1.05)";
      }
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ---------- Animated counters ---------- */
  function fmtCount(n) {
    // thousand separators for readability (13,183) — data-count attribute stays a plain number
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length || !("IntersectionObserver" in window)) return;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, target = parseInt(el.getAttribute("data-count"), 10) || 0;
        if (reduceMotion) { el.textContent = fmtCount(target); return; }  // accessibility: final value, no animation
        var start = null, dur = 1200;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = fmtCount(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = fmtCount(target);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Floating share rail (desktop) ---------- */
  function initShareRail() {
    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title);
    var rail = document.createElement("div");
    rail.id = "share-rail";
    rail.setAttribute("aria-label", "Share this page");
    rail.innerHTML =
      '<a href="https://twitter.com/intent/tweet?url=' + url + '&text=' + title + '" target="_blank" rel="noopener" title="Share on X" aria-label="Share on X" class="sh sh-x">𝕏</a>' +
      '<a href="https://www.facebook.com/sharer/sharer.php?u=' + url + '" target="_blank" rel="noopener" title="Share on Facebook" aria-label="Share on Facebook" class="sh sh-fb">f</a>';
    document.body.appendChild(rail);
    var copyBtn = document.getElementById("sh-copy");
    copyBtn.addEventListener("click", function () {
      function done(ok) {
        copyBtn.textContent = ok ? "✓" : "⧉";
        setTimeout(function () { copyBtn.textContent = "⧉"; }, 1500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(function () { done(true); }, function () { done(false); });
      } else { done(false); }
    });
  }

  /* ---------- Smooth anchor scrolling ---------- */
  function initSmooth() {
    document.documentElement.style.scrollBehavior = "smooth";
  }

  /* ---------- Cinematic: hero starfield + confetti burst ---------- */
  function initStarfield() {
    var canvas = document.getElementById("starfield");
    var hero = document.querySelector(".hero");
    if (!canvas || !hero) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) return; /* mobile: #starfield is display:none — skip the whole repaint loop */
    var ctx = canvas.getContext("2d");
    var stars = [], confetti = [], meteors = [], W = 0, H = 0;
    var heroVisible = true;
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        heroVisible = entries[0].isIntersecting;
      }, { threshold: 0 }).observe(hero);
    }
    var COLORS = ["#f472b6", "#60a5fa", "#34d399", "#facc15", "#a78bfa"];
    function resize() {
      W = canvas.width = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }
    function initStars() {
      stars = [];
      var n = Math.min(160, Math.floor(W * H / 9000));
      for (var i = 0; i < n; i++) {
        stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6 + 0.4,
          vy: Math.random() * 0.25 + 0.05, tw: Math.random() * Math.PI * 2, ts: Math.random() * 0.03 + 0.008 });
      }
    }
    /* occasional shooting star — additive; hero visibility gate keeps it free when scrolled away */
    function spawnMeteor() {
      if (heroVisible && meteors.length < 3) {
        var mx = W * (0.25 + Math.random() * 0.65), my = Math.random() * H * 0.35;
        var sp = Math.random() * 6 + 5;
        meteors.push({ x: mx, y: my, vx: -sp * 0.9, vy: sp * 0.45,
          life: 1, decay: Math.random() * 0.012 + 0.018 });
      }
      setTimeout(spawnMeteor, Math.random() * 7000 + 4000);
    }
    function burst() {
      for (var i = 0; i < 90; i++) {
        var a = Math.random() * Math.PI * 2, sp = Math.random() * 4 + 1.5;
        confetti.push({ x: W * 0.08, y: H * 0.25, vx: Math.cos(a) * sp + 2.5, vy: Math.sin(a) * sp - 1,
          r: Math.random() * 3 + 1.5, c: COLORS[i % COLORS.length], life: 1, decay: Math.random() * 0.012 + 0.006 });
      }
    }
    function frame() {
      if (!heroVisible) { requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, W, H);
      var i, s;
      for (i = 0; i < stars.length; i++) {
        s = stars[i];
        s.y -= s.vy; if (s.y < -4) { s.y = H + 4; s.x = Math.random() * W; }
        s.tw += s.ts;
        var alpha = 0.35 + 0.4 * Math.abs(Math.sin(s.tw));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "#cfe3ff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      }
      for (i = confetti.length - 1; i >= 0; i--) {
        var c = confetti[i];
        c.x += c.vx; c.y += c.vy; c.vy += 0.06; c.life -= c.decay;
        if (c.life <= 0 || c.y > H + 10) { confetti.splice(i, 1); continue; }
        ctx.globalAlpha = Math.max(c.life, 0);
        ctx.fillStyle = c.c;
        ctx.fillRect(c.x, c.y, c.r, c.r * 0.6);
      }
      ctx.globalAlpha = 1;
      for (i = meteors.length - 1; i >= 0; i--) {
        var m = meteors[i];
        m.x += m.vx; m.y += m.vy; m.life -= m.decay;
        if (m.life <= 0 || m.x < -90 || m.y > H + 90) { meteors.splice(i, 1); continue; }
        var tx = m.x - m.vx * 9, ty = m.y - m.vy * 9;
        var mg = ctx.createLinearGradient(m.x, m.y, tx, ty);
        mg.addColorStop(0, "rgba(255,255,255," + Math.max(m.life, 0).toFixed(3) + ")");
        mg.addColorStop(1, "rgba(167,139,250,0)");
        ctx.strokeStyle = mg; ctx.lineWidth = 2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    resize(); initStars();
    window.addEventListener("resize", function () { resize(); initStars(); });
    setTimeout(burst, 500);
    setTimeout(spawnMeteor, 2500);
    frame();
  }

  /* ---------- AI Image Studio (free, no key) ---------- */
  /* ---------- Shared picture helpers ---------- */
  var STUDIO_STYLES = {
    "realistic": ", ultra realistic photograph, professional photography, sharp focus, highly detailed, 8k",
    "cartoon": ", kids cartoon illustration, pixar style animation, colorful, cheerful, high quality",
    "digital-art": ", vibrant digital art, highly detailed illustration, trending on artstation, sharp focus",
    "anime": ", anime style illustration, detailed, vibrant colors, studio quality",
    "3d": ", 3d render, octane render, soft studio lighting, highly detailed",
    "painting": ", classical oil painting, textured brushstrokes, museum quality, detailed",
    "islamic-art": ", intricate Islamic geometric art, arabesque pattern, elegant gold and emerald details on deep teal background, symmetrical, highly detailed, museum quality",
    "watercolor": ", soft watercolor painting, delicate brushwork, gentle pastel colors, artistic, high quality",
    "sketch": ", detailed pencil sketch, black and white, fine linework, high contrast, artistic hand drawing",
    "product": ", professional product photography, clean studio lighting, soft shadows, premium advertising shot, highly detailed",
    "pixel": ", pixel art, 16-bit retro game style, vibrant colors, crisp pixels, highly detailed",
    "neon": ", glowing neon cyberpunk aesthetic, vibrant neon signs and reflections, dark background with electric pink, cyan and purple lights, futuristic mood, highly detailed",
    "cinematic": ", cinematic film still, dramatic movie lighting, shallow depth of field, rich color grading, epic composition, high quality",
    "vector": ", flat vector illustration, clean geometric shapes, minimal design, bold colors, crisp edges, professional artwork",
    "vintage": ", vintage film photograph, warm sepia tones, film grain texture, retro 1970s style, nostalgic atmosphere, authentic aged photo",
    "lowpoly": ", low poly 3D art, faceted geometric shapes, stylized polygonal design, soft lighting, modern game art style, highly detailed",
    "double-exposure": ", double exposure art, silhouette blended with a second scene inside, dreamy layered composition, artistic photography, highly detailed",
    "papercraft": ", layered paper cut art, colorful papercraft collage, 3d layered paper depth, handmade craft style, highly detailed",
    "clay": ", handmade clay figure, stop-motion claymation look, soft matte textures, playful sculpted details, highly detailed",
    "graffiti": ", vibrant street art mural, bold spray-paint style, urban wall art, dynamic colors, highly detailed",
    "miniature": ", miniature tilt-shift photography, tiny world look, selective focus, toy-like scene, highly detailed"
  };
  var STUDIO_IDEAS = [
    "A cute robot reading a book in a cozy library",
    "A floating island with waterfalls in the sky at sunset",
    "A futuristic city street in the rain with neon signs",
    "A lion wearing a crown in a royal palace",
    "An astronaut drinking tea on the moon with Earth in the sky",
    "A magical forest with glowing mushrooms at night",
    "A vintage car parked in front of a beachside cafe",
    "A dragon flying over snow-capped mountains",
    "A cozy cabin in the woods during snowfall",
    "An underwater city with dolphins and coral reefs",
    "A happy kids cartoon picnic in a sunny park",
    "A golden Islamic geometric lantern glowing in a dark mosque courtyard at night",
    "An elegant Arabic calligraphy artwork with blue and gold arabesque borders",
    "A watercolor portrait of a smiling child holding a sunflower",
    "Soft watercolor mountains and a lake at sunrise, pastel colors",
    "A detailed pencil sketch of a majestic horse, black and white",
    "A pencil sketch portrait of an elderly fisherman with deep wrinkles",
    "A premium perfume bottle product photo on marble with soft studio light",
    "A red sneaker floating in mid-air, dramatic advertising product shot",
    "A cozy pixel-art village at night with glowing windows, 16-bit style",
    "A pixel-art astronaut exploring a colorful alien planet",
    "Realistic cinematic video: a woman with a fresh look — lavender sports set, high ponytail, thin gold anklet — doing sunrise yoga on a quiet city rooftop at dawn, slow-motion stretch sequences, city skyline waking up below, gentle drone sweep over the roof, warm golden light on her skin, shallow depth of field, smooth cinematic camera drift",
    "Realistic cinematic video: a woman with a fresh look — dusty-blue work shirt with rolled sleeves, low bun held by a wooden hair stick, clay-speckled hands — shaping a clay bowl on a pottery wheel in a sunlit studio, macro shots of spinning clay and her fingers, window light catching dust particles, slow camera orbit around the wheel, calm meditative pacing",
    "Realistic cinematic video: a woman with a fresh look — emerald-green kurti with a denim jacket, long side braid, small jhumka earrings — strolling through a glowing lantern night market, street-food stalls with steam rising, bokeh of hanging lanterns, handheld cinematic follow shots, close-ups of her smiling face in warm lantern light, festive evening energy",
    "Realistic cinematic video: a woman with a fresh look — white sundress with a camel coat, loose natural waves, woven basket bag — riding in a hot-air balloon basket at sunrise over misty valleys, balloon envelopes filling with hot air below, aerial drift shots, golden mist rolling over the hills, slow majestic pacing, breathtaking wide establishing shot",
    "A neon-lit alley at midnight with glowing signs and a cat walking through the rain, neon glow style",
    "A futuristic robot DJ in a cyberpunk club with electric pink and cyan lights",
    "A lone traveler on a cliff at sunset, cinematic film still, dramatic light",
    "A cinematic close-up of a campfire in a dark forest, sparks flying, movie mood",
    "A flat vector illustration of a happy family picnic, bold clean colors",
    "A minimal flat vector mountain landscape with sun and birds, designer artwork",
    "A vintage 1970s street market in sepia tones, old film photograph",
    "An old steam train crossing a bridge, retro film grain photo, nostalgic",
    "A low-poly fox sitting in a geometric forest, stylized 3D art",
    "A low-poly mountain lake at dawn, faceted polygonal landscape, modern game art",
    "Realistic cinematic video: a woman with a fresh look — terracotta linen apron over a sage-green sweater, messy bun with a yellow headband, small apron logo reading 'SawalAI' — making scented candles in a sunlit rustic kitchen, pouring amber wax into mason jars, steam rising, macro shots of wax texture and her hands, warm golden-hour window light, shallow depth of field, smooth slow camera moves",
    "Realistic cinematic video: a woman with a fresh look — denim overalls, white crop top, straw hat with a red ribbon — transforming a tiny city balcony into a herb garden at golden hour, painting terracotta pots, planting basil and mint, close-ups of soil and her hands, watering can pouring in slow motion, birds-eye and macro shots, warm evening glow",
    "Realistic cinematic video: a woman with a fresh look — cream knit sweater, long braided ponytail, small silver nose stud — brewing masala chai in a cozy rustic kitchen on a rainy evening, rain drops on the window, steam rising from a brass kettle, close-ups of cardamom and ginger being crushed, cozy lamp glow, shallow depth of field, slow cinematic camera drift",
    "Realistic cinematic video: a woman with a fresh look — maroon salwar kameez with white dupatta as head covering, gold bangles — baking fresh naan on an open clay tandoor flame in an outdoor courtyard at dusk, flames and sparks flying, flour dust in the air, close-ups of dough slapping onto the hot clay wall, warm firelight on her face, slow-motion sparks, cinematic tracking shots",
    "Realistic cinematic video: a woman with a fresh look — floral maxi dress, loose side braid with a small daisy pin, canvas tote bag — arranging a wildflower bouquet at a sunlit morning flower market, choosing peonies and eucalyptus from wooden buckets, water droplets on petals, macro shots of her hands trimming stems, golden morning light through the stalls, slow cinematic tracking shots, shallow depth of field",
    "Realistic cinematic video: a woman with a fresh look — royal-blue anarkali, jasmine gajra in a low bun, gold jhumka earrings — creating a colorful rangoli and lighting clay diyas on a decorated doorstep at dusk, colored powder flowing from her fingers in slow motion, diya flames flickering in a row, marigold garlands framing the doorway, warm firelight on her smiling face, cinematic close-ups of the powder patterns",
    "Realistic cinematic video: a woman with a fresh look — black apron over a white tee, double space buns, turquoise stone bracelet — pouring ocean-blue epoxy resin art on a wooden tray in a bright workshop, swirling white waves with a heat gun, macro shots of resin ripples and her gloved hands, clean studio light, slow orbiting camera moves, satisfying fluid-motion pacing",
    "Realistic cinematic video: a woman with a fresh look — mustard knit cardigan, soft natural curls, wooden leaf earrings — stringing dried orange slices, cinnamon sticks and pinecones into an autumn garland in a cozy living room, fairy lights glowing in the background, macro shots of the citrus texture and her hands tying twine, warm lamp light, gentle slow-motion dust particles, calm seasonal mood",
    "Realistic cinematic video: a woman with a fresh look — dusty-rose linen apron over a striped cream tee, two low pigtails tied with twine, a dusting of flour on her cheek — baking sourdough bread in a sunlit rustic farmhouse kitchen, stretching and folding pillowy dough on a floured wooden board, clouds of flour puffing in slow motion, scoring the loaf with a lame blade, steam billowing as the loaf comes out of the oven, crackling crust macro shots, warm morning window light, slow cinematic camera drifts",
    "Realistic cinematic video: a woman with a fresh look — indigo-dyed dupatta over a simple white kurti, messy topknot with a carved wooden hairpin, turmeric-stained fingertips — hand block printing on cotton fabric in a bright sunlit courtyard, pressing carved wooden blocks into terracotta-red dye, geometric motifs blooming row by row on the cloth, close-ups of the carved blocks and her dye-stained hands, crisp midday sunlight casting sharp shadows, shallow depth of field, rhythmic satisfying pacing with slow orbit shots",
    "Realistic cinematic video: a woman with a fresh look — white crochet cover-up over a teal swimsuit, damp loose beach waves, a tiny shell anklet — collecting seashells at sunrise on a quiet beach and stringing them into a wind chime, gentle waves washing over her bare feet, macro shots of pearl-toned shells and her hands threading driftwood beads, sea breeze lifting her hair, soft golden-pink dawn light, smooth slow tracking shots along the shoreline, dreamy coastal mood",
    "Realistic cinematic video: a woman with a fresh look — coral-pink kurti with rolled sleeves, hair in loose natural waves with a small gold tikka, green glass bangles — applying intricate henna mehndi on her friend's hands at dusk on a decorated veranda before Eid, the cone piping fine paisley and floral patterns in extreme macro, marigold garlands and fairy lights glowing behind her, warm lamp light on her concentrated face, slow-motion drops of lemon-sugar sealer glistening on the dark henna, gentle orbiting camera moves",
    "Realistic cinematic video: a woman with a fresh look — denim shorts, oversized cream retro tee knotted at the waist, colorful scrunchie ponytail, pastel quad roller skates — roller skating down a golden tree-lined boulevard at golden hour, leaves swirling around her wheels in slow motion, playful spin moves, close-ups of the wheels rolling over cracked pavement, sun flares through the branches, dynamic handheld follow shots mixed with smooth side-glides, joyful carefree energy",
    "A double exposure portrait of a woman's silhouette filled with a starry night sky and mountains",
    "Double exposure art: a deer silhouette filled with an autumn forest landscape",
    "A layered paper-cut artwork of colorful koi fish swimming among paper waves",
    "Paper-cut art of a night city skyline with a glowing paper moon, layered depth",
    "A cute handmade clay panda figure sitting on a tiny clay bamboo forest",
    "Claymation-style scene: a small clay astronaut on a colorful clay planet",
    "A vibrant street-art mural of a phoenix rising, bold graffiti colors on a brick wall",
    "Graffiti-style wall art of a roaring tiger with neon paint splashes",
    "A miniature tilt-shift photo of a tiny village market, toy-like world",
    "Miniature tilt-shift scene: a tiny harbor with small boats and a lighthouse, dreamlike",
    "Realistic cinematic video: a woman with a fresh look — cream linen midi dress, gold silk headscarf, small olive-branch earrings — making honey-drizzled baklava in a sunlit Mediterranean stone kitchen, brushing melted butter over paper-thin phyllo sheets in macro close-up, crushed pistachios raining down in slow motion, golden honey spiraling over the baked tray, warm terracotta-toned light, shallow depth of field, slow cinematic camera glides",
    "Realistic cinematic video: a woman with a fresh look — flowing lavender-print summer dress, wicker basket on her arm, loose wind-blown hair with a small braid — harvesting lavender bundles in endless purple fields at sunset, bees drifting softly, her hands tying fragrant bunches with twine in macro shots, warm amber sky glowing behind rows of lavender, dreamy shallow depth of field, slow cinematic tracking shots",
    "Realistic cinematic video: a woman with a fresh look — casual indigo happi coat over a white tee, twin buns tied with red ribbons, wooden mallet in hand — pounding fresh mochi in a large wooden mortar in a traditional Japanese courtyard, rhythmic mallet strikes in slow motion, steam rising from the soft rice dough, her friend flipping the dough between strikes, cherry blossom petals drifting in the air, warm afternoon light, dynamic yet graceful camera moves",
    "Realistic cinematic video: a woman with a fresh look — fitted denim work shirt with rolled sleeves, protective safety glasses on her forehead, thick braided bun — blowing molten glass into a glowing vase in a bright glass-blowing studio, the orange-hot glass blooming at the end of the steel pipe, sparks and embers swirling in slow motion, macro shots of the glass swelling and her gloved hands shaping it, dramatic contrast between the furnace glow and the bright studio, slow orbiting camera shots",
    "Realistic cinematic video: a woman with a fresh look — chunky cream knit sweater, fuzzy grey socks, hair in a loose topknot with a wooden pin — crocheting a soft blanket by a crackling stone fireplace on a snowy winter evening, her hands weaving the yarn in hypnotic macro close-ups, snowflakes drifting past the frosted window, warm firelight flickering on her face, a steaming mug of cocoa beside her, cozy hygge mood, shallow depth of field, slow gentle camera drift",,
    "Realistic cinematic video: a woman with a fresh look — ivory linen wrap top with wide sleeves, short layered pixie haircut, single jade bangle — pruning a miniature bonsai tree on a wooden table in a quiet sunlit tea garden, snipping tiny branches with precision shears in extreme macro close-ups, wiring delicate limbs into graceful curves, moss and pebbles arranged at the roots, her concentrated face in soft profile, dappled sunlight through bamboo leaves, shallow depth of field, meditative slow pacing with gentle orbiting camera moves",
    "Realistic cinematic video: a woman with a fresh look — cherry-red peplum top, high braided crown held by a carved wooden chopstick hairpin, tiny gold stud earrings — folding delicate dumplings in a bright modern Asian kitchen, her fingers pleating translucent wrappers in hypnotic macro close-ups, rows of perfect crescents filling bamboo steamers, clouds of aromatic steam billowing in slow motion, chilies and scallions glowing on the cutting board, warm morning window light, shallow depth of field, satisfying rhythmic pacing with slow cinematic drifts",
    "Realistic cinematic video: a woman with a fresh look — oversized sage-green artist's smock splattered with paint, curly auburn hair in a messy topknot with a paintbrush tucked in, worn leather wristband — painting a watercolor landscape en plein air beside a wildflower meadow at golden hour, soft washes blooming across the paper in macro close-ups, her brush dipping into a travel tin of pigments, the painted hills melting into the real hills behind her easel, petals drifting past the canvas, warm low sunlight on her face, dreamy shallow depth of field, slow graceful camera moves",
    "Realistic cinematic video: a woman with a fresh look — turquoise palazzo pants, cropped white embroidered kurti, long open hair flying in the wind, thin red kite-string bracelet — flying a bright handmade kite on a windy hilltop at sunset, the kite soaring and dancing against a blazing orange sky, her joyful laughter caught in close-ups, spool unwinding in slow motion, her dupatta and hair streaming in the breeze, wide sweeping aerial-style shots mixed with intimate handheld follow shots, warm backlight, carefree joyful energy"
  ];
  /* If the user asks for a cartoon but left "Realistic Photo" selected,
     use the cartoon style so the prompt is honored, not fought. */
  function studioPickStyle(prompt, style) {
    if (/cartoon/i.test(prompt) && style === "realistic") return "cartoon";
    return style;
  }
  function studioImageUrl(enPrompt, style, w, h) {
    var full = enPrompt + (STUDIO_STYLES[studioPickStyle(enPrompt, style)] || "");
    // quality boosters for sharper, more detailed output
    full += ", ultra detailed, sharp focus, professional photography, 8k quality, highly detailed";
    var seed = Math.floor(Math.random() * 999999);
    var modelEl = document.getElementById("studio-model");
    var model = modelEl ? modelEl.value : "gptimage";
    return "https://image.pollinations.ai/prompt/" + encodeURIComponent(full) +
      "?width=" + w + "&height=" + h + "&seed=" + seed + "&model=" + model + "&nologo=true&enhance=true";
  }
  /* Translate non-English prompts to English first (free, no key) */
  function studioTranslate(text, cb) {
    if (/^[\x00-\x7F\s.,!?'"-]*$/.test(text)) { cb(text, false); return; }
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=" + encodeURIComponent(text);
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      var res = "";
      try { d[0].forEach(function (s) { if (s[0]) res += s[0]; }); } catch (e) {}
      cb(res || text, true);
    }).catch(function () { cb(text, true); });
  }
  function studioLoading(out, msg) {
    out.innerHTML = '<div class="studio-loading"><div class="spinner"></div><p>' + msg + "</p></div>";
  }
  function studioNote(out, enPrompt) {
    var note = document.createElement("p");
    note.className = "tiny center";
    note.textContent = "Translated: " + enPrompt;
    out.appendChild(note);
  }
  function studioDownload(url, prompt) {
    var name = "sawalai-" + prompt.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) + ".jpg";
    fetch(url).then(function (r) {
      if (!r.ok) throw 0;
      return r.blob();
    }).then(function (blob) {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = name;
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
    }).catch(function () { window.open(url, "_blank"); });
  }

  /* ---------- AI Picture Studio ---------- */
  function initPictureStudio() {
    var btn = document.getElementById("studio-btn");
    var input = document.getElementById("studio-prompt");
    var out = document.getElementById("studio-out");
    var surprise = document.getElementById("studio-surprise");
    if (!btn || !input || !out) return;
    function setLoading(on) {
      btn.disabled = on;
      btn.textContent = on ? "Creating..." : "Generate";
    }
    function generate() {
      var prompt = input.value.trim();
      if (!prompt) { input.focus(); return; }
      setLoading(true);
      studioLoading(out, "Understanding your prompt...");
      // safety: never leave button stuck
      var safety = setTimeout(function () {
        setLoading(false);
        if (out.querySelector(".studio-loading")) {
          out.innerHTML = '<p class="muted center">Taking too long — <button type="button" class="btn btn-primary" id="studio-retry">Try Again</button></p>';
          document.getElementById("studio-retry").addEventListener("click", generate);
        }
      }, 90000);
      studioTranslate(prompt, function (enPrompt, wasTranslated) {
        clearTimeout(safety);
        doGenerate(enPrompt, wasTranslated ? prompt : null, 0);
      });
    }
    function doGenerate(enPrompt, origPrompt, attempt) {
      var style = document.getElementById("studio-style").value;
      var size = document.getElementById("studio-size").value.split("x");
      var url = studioImageUrl(enPrompt, style, size[0], size[1]);
      studioLoading(out, "Painting your picture..." + (attempt > 0 ? " (retry " + attempt + ")" : "") + "<br><span class='tiny'>Takes 10-40 seconds. Please wait.</span>");
      var img = new Image();
      var done = false;
      // timeout: if image hangs, treat as error
      var imgTimeout = setTimeout(function () {
        if (!done) { done = true; img.src = ""; handleError(); }
      }, 60000);
      function handleError() {
        clearTimeout(imgTimeout);
        // fallback: try flux model if current model failed
        var modelEl = document.getElementById("studio-model");
        if (modelEl && modelEl.value !== "gptimage" && attempt === 0) {
          modelEl.value = "gptimage";
          studioLoading(out, "First model busy — trying GPT Image...<br><span class='tiny'>Please wait.</span>");
          setTimeout(function () { doGenerate(enPrompt, origPrompt, 1); }, 3000);
          return;
        }
        // rate-limit friendly: wait longer between retries
        var waitSec = [5, 15, 30][Math.min(attempt, 2)];
        if (attempt < 3) {
          studioLoading(out, "Image service busy — retrying in " + waitSec + "s...<br><span class='tiny'>Free service, please wait.</span>");
          setTimeout(function () { doGenerate(enPrompt, origPrompt, attempt + 1); }, waitSec * 1000);
          return;
        }
        setLoading(false);
        out.innerHTML = '<p class="muted center">Image service is busy right now. Wait ~30 seconds, then <button type="button" class="btn btn-primary" id="studio-retry2">Try Again</button></p>';
        document.getElementById("studio-retry2").addEventListener("click", generate);
      }
      img.alt = enPrompt;
      img.onload = function () {
        if (done) return; done = true;
        clearTimeout(imgTimeout);
        setLoading(false);
        out.innerHTML = "";
        if (origPrompt) studioNote(out, enPrompt);
        img.className = "studio-img";
        out.appendChild(img);
        var row = document.createElement("div");
        row.className = "studio-actions";
        var dl = document.createElement("button");
        dl.type = "button"; dl.className = "btn btn-ghost"; dl.textContent = "Download";
        dl.addEventListener("click", function () { studioDownload(url, enPrompt); });
        var again = document.createElement("button");
        again.type = "button"; again.className = "btn btn-primary"; again.textContent = "Try Again";
        again.addEventListener("click", generate);
        row.appendChild(dl); row.appendChild(again);
        out.appendChild(row);
      };
      img.onerror = function () {
        if (done) return; done = true;
        handleError();
      };
      img.src = url;
    }
    btn.addEventListener("click", generate);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") generate(); });
    if (surprise) surprise.addEventListener("click", function () {
      input.value = STUDIO_IDEAS[Math.floor(Math.random() * STUDIO_IDEAS.length)];
      input.focus();
    });
  }

  /* ---------- Premium Picture Requests ---------- */
  function initPremiumStudio() {
    var btn = document.getElementById("premium-btn");
    var promptEl = document.getElementById("premium-prompt");
    var styleEl = document.getElementById("premium-style");
    var emailEl = document.getElementById("premium-email");
    var qtyEl = document.getElementById("premium-qty");
    var out = document.getElementById("premium-out");
    var gallery = document.getElementById("premium-gallery");
    // load gallery
    if (gallery) {
      fetch("premium-gallery.json").then(function (r) { return r.ok ? r.json() : []; }).then(function (items) {
        items.slice(0, 12).forEach(function (it) {
          var fig = document.createElement("figure");
          var img = document.createElement("img");
          img.src = it.src; img.alt = it.prompt; img.loading = "lazy";
          var cap = document.createElement("figcaption");
          cap.textContent = it.prompt.slice(0, 60);
          fig.appendChild(img); fig.appendChild(cap);
          gallery.appendChild(fig);
        });
      }).catch(function () {});
    }
    if (!btn) return;
    var PIC_CD = 30 * 60 * 1000; /* 30 min between picture requests */
    var PIC_LIMIT_CD = 24 * 60 * 60 * 1000; /* 24h after 30 generations */
    var picTimer = document.createElement("div");
    picTimer.className = "center"; picTimer.style.cssText = "margin-top:8px;font-size:.85rem;color:#a78bfa";
    btn.after(picTimer);
    function picMe() {
      try {
        var em = localStorage.getItem("sawalai_session");
        var us = JSON.parse(localStorage.getItem("sawalai_users") || "{}");
        return (em && us[em]) ? em : null;
      } catch (e) { return null; }
    }
    function picGenCount() {
      var em = picMe(); if (!em) return 0;
      return parseInt(localStorage.getItem("sawalai_gen_count_" + em) || "0", 10);
    }
    function picBumpCount() {
      var em = picMe(); if (!em) return;
      var c = picGenCount() + 1;
      localStorage.setItem("sawalai_gen_count_" + em, String(c));
      return c;
    }
    function picCdLeft() {
      var l = parseInt(localStorage.getItem("sawalai_pic_cd") || "0", 10);
      var cd = picGenCount() >= 30 ? PIC_LIMIT_CD : PIC_CD;
      var left = l + cd - Date.now();
      return left > 0 ? left : 0;
    }
    function picPaintTimer() {
      var left = picCdLeft();
      if (left > 0) {
        var h = Math.floor(left / 3600000), m = Math.floor((left % 3600000) / 60000), s = Math.floor((left % 60000) / 1000);
        var tstr = h > 0 ? h + "h " + m + "m" : m + ":" + String(s).padStart(2, "0");
        var limMsg = picGenCount() >= 30 ? ' <span class="tiny">(30 free generations mukammal — daily limit)</span>' : '';
        picTimer.innerHTML = "⏳ Next request: <b>" + tstr + "</b>" + limMsg;
        btn.disabled = true;
      } else { picTimer.innerHTML = ""; btn.disabled = false; }
    }
    setInterval(picPaintTimer, 1000); picPaintTimer();
    btn.addEventListener("click", function () {
      if (!picMe()) { out.innerHTML = '<p class="center" style="color:#fbbf24">🔒 <a href="account.html" style="color:#a78bfa"><b>Login / Signup</b></a> is required to request pictures.</p>'; return; }
      if (picCdLeft() > 0) { picPaintTimer(); return; }
      var prompt = promptEl.value.trim();
      var email = emailEl.value.trim();
      if (!prompt) { promptEl.focus(); return; }
      if (!email || email.indexOf("@") < 0) { emailEl.focus(); out.innerHTML = '<p class="muted center">Please enter your email so we can deliver your picture.</p>'; return; }
      btn.disabled = true; btn.textContent = "Sending...";
      var picPayload = {
        _subject: "⭐ Premium Picture Request",
        "Type": "Premium Picture Request",
        "Prompt": prompt,
        "Style": styleEl.value,
        "Quantity": qtyEl ? qtyEl.value : "1",
        "Size": (document.getElementById("premium-size") || {}).value || "8k",
        "Email": email,
        "Date": new Date().toISOString()
      };
      /* request goes to BOTH owner inboxes */
      var picDests = ["4de22205ccafca608a7c4a00e6a34c92", "rehmanmaher500@gmail.com"];
      Promise.all(picDests.map(function (em) {
        var pctrl = null;
        try { pctrl = new AbortController(); } catch (e) {}
        var popts = {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(picPayload)
        };
        if (pctrl) {
          popts.signal = pctrl.signal;
          setTimeout(function () { try { pctrl.abort(); } catch (_) {} }, 25000);
        }
        return fetch("https://formsubmit.co/ajax/" + em, popts)
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .catch(function () { return { success: false }; });
      })).then(function (rs) {
        var ok = rs.some(function (x) { return x && (x.success === "true" || x.success === true); });
        if (!ok) throw 0;
        var q = qtyEl ? qtyEl.value : "1";
        localStorage.setItem("sawalai_pic_cd", String(Date.now()));
        var newCount = picBumpCount();
        var countMsg = newCount >= 30 ? '<br><span style="font-size:.8rem;color:#fbbf24">⚠️ Your 30 free generations are complete — 24h wait now.</span>' : '<br><span style="font-size:.8rem;opacity:.7">Generations used: ' + newCount + '/30 free</span>';
        out.innerHTML = '<div class="success-anim"><span class="ok">✅ Request Received!</span><span class="msg">Check your Gmail — your picture(s) will arrive soon! 🖼️</span>' + countMsg + '</div>';
        confettiBurst();
        promptEl.value = ""; emailEl.value = "";
        picPaintTimer();
      }).catch(function () {
        out.innerHTML = '<p class="muted center">Could not send request. Check your connection and try again.</p>';
      }).finally(function () {
        btn.disabled = false; btn.textContent = "Request Premium Free — Just Time Limit";
      });
    });
  }

  /* ---------- AI Video Studio (request-based, like premium pictures) ---------- */
  /* ---------- AI Video Studio: compact + bulk (40 free / 50+ paid) ---------- */
  function initVideoStudio() {
    var btn = document.getElementById("vstudio-btn");
    var promptEl = document.getElementById("vstudio-prompt");
    var styleEl = document.getElementById("vstudio-style");
    var emailEl = document.getElementById("vstudio-email");
    var out = document.getElementById("vstudio-out");
    var timerEl = document.getElementById("vstudio-timer");
    var loginMsg = document.getElementById("vstudio-login-msg");
    var surprise = document.getElementById("vstudio-surprise");
    var qtyPills = document.getElementById("vs-qty-pills");
    var qtyNote = document.getElementById("vs-qty-note");
    var priceBox = document.getElementById("vs-price");
    var payBox = document.getElementById("vs-paybox");
    var picEl = document.getElementById("vstudio-picurl");
    var styleDescEl = document.getElementById("vs-style-desc");
    var STYLE_DESC = {
      realistic: "🎥 Lifelike real-camera footage look — best for ads, property, product promos.",
      cartoon: "🧒 Colorful playful cartoon — best for kids' stories, rhymes and learning videos.",
      cinematic: "🎞️ Dramatic movie look with rich light and mood — best for trailers and storytelling.",
      anime: "✨ Japanese anime art style — bold lines, vivid color.",
      nature: "🌿 Crisp natural detail — landscapes, wildlife and outdoor scenes."
    };
    function paintStyleDesc() {
      if (!styleDescEl || !styleEl) return;
      styleDescEl.textContent = STYLE_DESC[styleEl.value] || "";
    }
    if (!btn) return;
    var COOLDOWN = 60 * 60 * 1000;
    var VID_LIMIT_CD = 24 * 60 * 60 * 1000;
    var PRICE_PER_VIDEO = 5; /* Rs 5/video — buhat kam */
    var vsQty = 1;

    function me() {
      try {
        var email = localStorage.getItem("sawalai_session");
        var users = JSON.parse(localStorage.getItem("sawalai_users") || "{}");
        return (email && users[email]) ? email : null;
      } catch (e) { return null; }
    }
    function vidGenCount() {
      var em = me(); if (!em) return 0;
      return parseInt(localStorage.getItem("sawalai_gen_count_" + em) || "0", 10);
    }
    function vidBumpCount(n) {
      var em = me(); if (!em) return 0;
      var c = vidGenCount() + (n || 1);
      localStorage.setItem("sawalai_gen_count_" + em, String(c));
      return c;
    }
    function isPaid() { return vsQty >= 50; }
    function vsPrice() { return vsQty * PRICE_PER_VIDEO; }
    function vsPic() { return (picEl && picEl.value.trim()) ? picEl.value.trim() : ""; }

    function paintQty() {
      if (!qtyPills) return;
      var pills = qtyPills.querySelectorAll("button");
      pills.forEach(function (p) {
        p.classList.toggle("on", parseInt(p.getAttribute("data-q"), 10) === vsQty);
      });
      if (isPaid()) {
        if (qtyNote) qtyNote.textContent = "— paid bulk";
        if (priceBox) {
          priceBox.style.display = "";
          priceBox.innerHTML = '<div class="vp-big">Rs ' + vsPrice().toLocaleString() + '</div>' +
            '<div class="vp-small">' + vsQty + ' videos × Rs ' + PRICE_PER_VIDEO + '/video — only Rs ' + PRICE_PER_VIDEO + ' per video!</div>';
        }
        btn.innerHTML = "🎬 Order " + vsQty + " Videos — Rs " + vsPrice().toLocaleString();
      } else {
        if (qtyNote) qtyNote.textContent = vsQty > 1 ? "— bulk free 🎉" : "— free";
        if (priceBox) priceBox.style.display = "none";
        btn.innerHTML = vsQty > 1 ? "🎬 Request " + vsQty + " Videos — Free" : "🎬 Request Video — Free";
      }
      if (payBox) payBox.innerHTML = "";
    }

    function checkLogin() {
      if (!me() && loginMsg) {
        /* stash the draft so the user's prompt isn't lost at the login wall */
        try {
          sessionStorage.setItem("vs_pending", JSON.stringify({
            prompt: promptEl.value,
            style: styleEl.value,
            quality: (document.getElementById("vstudio-quality") || {}).value || "hd",
            qty: vsQty,
            email: emailEl.value,
            pic: (picEl && picEl.value) || ""
          }));
        } catch (e) {}
        var vsNext = "";
        try { vsNext = "?next=" + encodeURIComponent(location.pathname + location.search); } catch (e) {}
        loginMsg.innerHTML = '<p class="center" style="color:#fbbf24">🔒 <a href="account.html' + vsNext + '" style="color:#a78bfa"><b>Login / Signup</b></a> is required to request videos.</p>';
        return false;
      }
      if (loginMsg) loginMsg.innerHTML = "";
      return true;
    }
    function cooldownLeft() {
      var last = parseInt(localStorage.getItem("sawalai_vid_cd") || "0", 10);
      var cd = vidGenCount() >= 30 ? VID_LIMIT_CD : COOLDOWN;
      var left = last + cd - Date.now();
      return left > 0 ? left : 0;
    }
    function paintTimer() {
      if (!timerEl) return;
      var left = cooldownLeft();
      if (left > 0 && !isPaid()) {
        var h = Math.floor(left / 3600000), m = Math.floor((left % 3600000) / 60000), s = Math.floor((left % 60000) / 1000);
        var tstr = h > 0 ? h + "h " + m + "m" : m + ":" + String(s).padStart(2, "0");
        var limMsg = vidGenCount() >= 30 ? ' <span class="tiny">(free video allowance used — next free request in 24h)</span>' : '';
        timerEl.innerHTML = "⏳ Next request: <b>" + tstr + "</b>" + limMsg;
        btn.disabled = true;
      } else {
        timerEl.innerHTML = "";
        btn.disabled = false;
      }
    }
    setInterval(paintTimer, 1000);

    if (qtyPills) qtyPills.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      vsQty = parseInt(b.getAttribute("data-q"), 10) || 1;
      paintQty(); paintTimer();
    });
    paintQty(); paintTimer(); checkLogin(); paintStyleDesc();
    if (styleEl) styleEl.addEventListener("change", paintStyleDesc);

    /* restore video-studio draft stashed before the login wall (logged-in session only) */
    try {
      var vsdRaw = sessionStorage.getItem("vs_pending");
      if (vsdRaw && me()) {
        var vsd = JSON.parse(vsdRaw);
        if (vsd.prompt) promptEl.value = vsd.prompt;
        if (vsd.style) styleEl.value = vsd.style;
        var vsqEl = document.getElementById("vstudio-quality");
        if (vsqEl && vsd.quality) vsqEl.value = vsd.quality;
        var vsQtyList = [1, 2, 5, 10, 20, 30, 40, 50, 75, 100];
        var vsq = parseInt(vsd.qty, 10);
        if (vsQtyList.indexOf(vsq) >= 0) vsQty = vsq;
        if (vsd.email) emailEl.value = vsd.email;
        if (vsd.pic && picEl) picEl.value = vsd.pic;
        paintQty(); paintStyleDesc();
        sessionStorage.removeItem("vs_pending");
      }
    } catch (e) {}

    if (surprise) surprise.addEventListener("click", function () {
      promptEl.value = STUDIO_IDEAS[Math.floor(Math.random() * STUDIO_IDEAS.length)];
      promptEl.focus();
    });

    function sendRequest(tid) {
      var prompt = promptEl.value.trim();
      var email = emailEl.value.trim();
      var payload = {
        _subject: "🎬 Premium Video Request",
        "Type": "Premium Video Request",
        "Prompt": prompt,
        "Style": styleEl.value,
        "Quality": (document.getElementById("vstudio-quality") || {}).value || "hd",
        "Quantity": vsQty,
        "Picture URL": vsPic() || "(none)",
        "Email": email,
        "User": me(),
        "Payment": tid ? ("JazzCash Rs " + vsPrice() + ", TID " + tid) : "Free",
        "Date": new Date().toISOString()
      };
      /* FormSubmit documented ajax format: /ajax/<email>. 25s timeout taake request kabhi "Sending..." par atak kar na rahe. */
      var dests = ["cyrilmp4665@gmail.com", "rehmanmaher500@gmail.com"];
      return Promise.all(dests.map(function (em) {
        var ctrl = null;
        try { ctrl = new AbortController(); } catch (e) {}
        var opts = {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        };
        if (ctrl) {
          opts.signal = ctrl.signal;
          setTimeout(function () { try { ctrl.abort(); } catch (_) {} }, 25000);
        }
        return fetch("https://formsubmit.co/ajax/" + em, opts)
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .catch(function () { return { success: false }; });
      })).then(function (rs) {
        var ok = rs.some(function (x) { return x && (x.success === "true" || x.success === true); });
        if (!ok) {
          /* capture FormSubmit's own message so the real cause is visible */
          var det = "";
          try {
            det = rs.map(function (x) { return (x && x.message) ? String(x.message) : ""; })
              .filter(function (s) { return !!s; }).join(" | ").slice(0, 160);
          } catch (e) { det = ""; }
          var ferr = new Error("video-send-failed");
          ferr.fsDetail = det;
          throw ferr;
        }
        if (!isPaid()) localStorage.setItem("sawalai_vid_cd", String(Date.now()));
        var vCount = vidBumpCount(vsQty);
        var vCountMsg = '<br><span style="font-size:.8rem;opacity:.7">Videos requested: ' + vsQty + ' — all will be sent to <b>' + email + '</b> 📧</span>';
        out.innerHTML = '<div class="success-anim"><span class="ok">✅ Request Received!</span><span class="msg">' + vsQty + ' video(s) will be created and sent to <b>' + email + '</b>! 🎬</span>' + vCountMsg + '</div>';
        confettiBurst();
        /* front-facing notification: request went through */
        try {
          if (window.SawalNotify) window.SawalNotify("✅ <b>Request Received!</b><br>" + vsQty + " video(s) will be created and sent to <b>" +
            email.replace(/</g, "&lt;") + "</b>! 🎬", "ok");
        } catch (e) {}
        promptEl.value = "";
        if (picEl) picEl.value = "";
        paintTimer();
      });
    }

    btn.addEventListener("click", function () {
      if (!checkLogin()) return;
      var prompt = promptEl.value.trim();
      var email = emailEl.value.trim();
      if (!prompt) { promptEl.focus(); return; }
      if (!email || email.indexOf("@") < 0) { emailEl.focus(); out.innerHTML = '<p class="muted center">Enter your email so the videos can reach you.</p>'; return; }
      if (isPaid()) {
        /* paid bulk: JazzCash via SawalPay, then send request with TID */
        if (!window.SawalPay || !payBox) { out.innerHTML = '<p class="muted center">Payment system failed to load — please refresh.</p>'; return; }
        btn.disabled = true;
        var orderId = "VID-" + Date.now().toString(36).toUpperCase();
        window.SawalPay.collect(payBox, {
          amount: "Rs " + vsPrice().toLocaleString(),
          item: vsQty + " AI Videos (bulk)",
          orderId: orderId
        }, function (tid) {
          btn.textContent = "Sending...";
          sendRequest(tid).catch(function () {
            var waText2 = "";
            try {
              waText2 = encodeURIComponent("🎬 Video Request (PAID, TID " + tid + "): " + vsQty + " video(s)\nPrompt: " + promptEl.value.trim() + "\nStyle: " + styleEl.value + "\nEmail: " + emailEl.value.trim() + (vsPic() ? "\nPicture: " + vsPic() : ""));
            } catch (x) {}
            out.innerHTML = '<p class="muted center">Sending failed — please check your connection.</p>' +
              (waText2 ? '<p class="center"><a class="btn btn-primary" target="_blank" rel="noopener" href="https://wa.me/923254746678?text=' + waText2 + '">📲 Send via WhatsApp</a></p>' : '');
            try { if (window.SawalNotify) window.SawalNotify("⚠️ <b>Video request could not be sent.</b><br>Tap the WhatsApp button below to send it manually.", "err"); } catch (e) {}
          }).finally(function () { paintQty(); paintTimer(); });
        });
        return;
      }
      var left = cooldownLeft();
      if (left > 0) {
        paintTimer();
        try {
          var h = Math.floor(left / 3600000), m = Math.floor((left % 3600000) / 60000);
          var tstr = h > 0 ? h + "h " + m + "m" : m + " min";
          if (window.SawalNotify) window.SawalNotify("⏳ <b>Please wait</b> — your next video request will be available in <b>" + tstr + "</b>.", "info");
        } catch (e) {}
        return;
      }
      btn.disabled = true; btn.textContent = "Sending...";
      sendRequest(null).catch(function (e) {
        var det = "";
        try { det = (e && e.fsDetail) ? " <span class=\"tiny\">(" + String(e.fsDetail).replace(/</g, "&lt;") + ")</span>" : ""; } catch (x) {}
        var waText = "";
        try {
          waText = encodeURIComponent("🎬 Video Request: " + vsQty + " video(s)\nPrompt: " + promptEl.value.trim() + "\nStyle: " + styleEl.value + "\nEmail: " + emailEl.value.trim() + (vsPic() ? "\nPicture: " + vsPic() : ""));
        } catch (x) {}
        out.innerHTML = '<p class="muted center">Sending failed — please check your connection.' + det + '</p>' +
          (waText ? '<p class="center"><a class="btn btn-primary" target="_blank" rel="noopener" href="https://wa.me/923254746678?text=' + waText + '">📲 Send via WhatsApp</a></p>' : '');
        try { if (window.SawalNotify) window.SawalNotify("⚠️ <b>Video request could not be sent.</b><br>Check your connection, or tap the WhatsApp button below." + (det ? "<br>" + det : ""), "err"); } catch (x) {}
      }).finally(function () { paintQty(); paintTimer(); });
    });

    /* ---------- sample video lightbox ---------- */
    var lb = document.getElementById("vs-lightbox");
    var lbVideo = document.getElementById("vs-lb-video");
    var lbTitle = document.getElementById("vs-lb-title");
    function closeLb() {
      if (!lb) return;
      lb.classList.remove("open");
      if (lbVideo) { lbVideo.pause(); lbVideo.removeAttribute("src"); lbVideo.load(); }
    }
    document.querySelectorAll(".vs-vid").forEach(function (fig) {
      fig.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;
        var src = fig.getAttribute("data-src");
        if (!src || !lb || !lbVideo) return;
        if (lbTitle) lbTitle.textContent = "🎬 " + (fig.getAttribute("data-title") || "");
        lbVideo.src = src;
        lb.classList.add("open");
        lbVideo.play().catch(function () {});
      });
    });
    var lbClose = document.getElementById("vs-lb-close");
    if (lbClose) lbClose.addEventListener("click", closeLb);
    if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
  }

  /* Animate an image into a short video — 100% in-browser, free, no key.
     Ken Burns pan/zoom on canvas, recorded via MediaRecorder. */
  function animateToVideo(imgSrc, prompt, out, done) {
    studioLoading(out, "Making your video... (about 8 seconds)");
    if (!window.MediaRecorder) {
      out.innerHTML = '<p class="muted center">Sorry, your browser cannot record video.</p>';
      if (done) done();
      return;
    }
    function finish() { if (done) done(); }
    var W = 1280, H = 720, DUR = 6000;
    var canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext("2d");
    var stream;
    try { stream = canvas.captureStream(30); }
    catch (e) {
      out.innerHTML = '<p class="muted center">Sorry, video capture failed in this browser.</p>';
      finish();
      return;
    }
    var mimes = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
    var mime = "";
    for (var i = 0; i < mimes.length; i++) {
      if (MediaRecorder.isTypeSupported(mimes[i])) { mime = mimes[i]; break; }
    }
    var rec, chunks = [];
    try { rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined); }
    catch (e) {
      out.innerHTML = '<p class="muted center">Sorry, video recording is not supported here.</p>';
      finish();
      return;
    }
    rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
    rec.onstop = function () {
      var blob = new Blob(chunks, { type: "video/webm" });
      var url = URL.createObjectURL(blob);
      out.innerHTML = "";
      var v = document.createElement("video");
      v.controls = true; v.src = url; v.className = "studio-img";
      out.appendChild(v);
      var row = document.createElement("div");
      row.className = "studio-actions";
      var a = document.createElement("a");
      a.href = url;
      a.download = "sawalai-video.webm";
      a.className = "btn btn-primary"; a.textContent = "Download Video";
      row.appendChild(a);
      out.appendChild(row);
      finish();
    };
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      rec.start();
      var t0 = performance.now();
      var s = Math.max(W / img.width, H / img.height);
      var dw = img.width * s, dh = img.height * s;
      function frame(t) {
        var p = Math.min((t - t0) / DUR, 1);
        var z = 1 + p * 0.18;
        var zw = dw * z, zh = dh * z;
        var x = (W - zw) / 2 + Math.sin(p * Math.PI) * 24;
        var y = (H - zh) / 2;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, W, H);
        ctx.drawImage(img, x, y, zw, zh);
        if (p < 1) requestAnimationFrame(frame);
        else { try { rec.stop(); } catch (e) { finish(); } }
      }
      requestAnimationFrame(frame);
    };
    img.onerror = function () {
      out.innerHTML = '<p class="muted center">Could not load the image for video.</p>';
      finish();
    };
    img.src = imgSrc;
  }
  /* ---------- Topics sidebar: browse + search + filter ---------- */
  var TOPIC_CATS = [
    { icon: "🎬", name: "Movies & Shows", topics: [
      ["upcoming-movies-2026", "Upcoming Movies 2026"], ["best-movies-2026", "Best Movies 2026"],
      ["ott-streaming-guide", "Streaming Guide"], ["tiktok-growth-tips", "TikTok Growth"],
      ["youtube-videos-with-ai", "YouTube with AI"], ["video-editing-apps", "Video Editing Apps"],
      ["free-ai-video-apps", "Free AI Video Apps"], ["podcasting-guide", "Podcasting"],
      ["music-production-basics", "Music Production"],
      ["most-anticipated-movies-2026", "Most Anticipated 2026"], ["new-movie-releases-calendar", "Release Calendar"],
      ["best-action-movies-2026", "Best Action 2026"], ["best-family-movies-2026", "Family Movies"]] },
    { icon: "📚", name: "Books & Reading", topics: [
      ["best-books-2026", "Best Books 2026"], ["book-reading-habit", "Reading Habit"],
      ["best-fiction-books-2026", "Best Fiction 2026"], ["best-self-help-books-2026", "Self-Help Books"],
      ["new-book-releases-2026", "New Releases 2026"]] },
    { icon: "☪️", name: "Islamic", topics: [
      ["islamic-ramadan-guide", "Ramadan Guide"], ["quran-learning-guide", "Learn Quran"],
      ["hajj-umrah-guide", "Hajj & Umrah"], ["seerat-un-nabi", "Seerat-un-Nabi"],
      ["islamic-duas-guide", "Daily Duas"],
      ["islamic-parenting-guide", "Islamic Parenting"], ["quran-memorization-tips", "Quran Memorization"],
      ["kids-islamic-stories", "Kids Stories"]] },
    { icon: "🤖", name: "AI & Tech", topics: [
      ["what-is-ai", "What is AI?"], ["ai-chatbots-guide", "AI Chatbots"],
      ["best-free-ai-tools", "Best Free AI Tools"], ["chatgpt-guide", "ChatGPT Guide"],
      ["ai-images-guide", "AI Images"], ["ai-voiceover-guide", "AI Voiceovers"],
      ["ai-tools-students", "AI Tools for Students"]] },
    { icon: "💻", name: "Coding & Web", topics: [
      ["coding-basics", "Coding Basics"], ["python-programming-guide", "Python Programming"],
      ["web-design-basics", "Web Design"], ["app-development-basics", "App Development"],
      ["data-science-basics", "Data Science"], ["cloud-computing-basics", "Cloud Computing"],
      ["blockchain-basics", "Blockchain"]] },
    { icon: "💰", name: "Money & Business", topics: [
      ["earn-money-with-ai", "Earn Money with AI"], ["online-earning-guide", "Online Earning"],
      ["freelancing-guide", "Freelancing"], ["cryptocurrency-basics", "Cryptocurrency"],
      ["personal-finance", "Personal Finance"], ["e-commerce-guide", "E-Commerce"],
      ["affiliate-marketing-guide", "Affiliate Marketing"], ["side-hustle-ideas", "Side Hustles"],
      ["stock-market-basics", "Stock Market"], ["digital-marketing", "Digital Marketing"],
      ["social-media-marketing", "Social Media Marketing"], ["email-marketing-basics", "Email Marketing"],
      ["seo-basics", "SEO Basics"], ["copywriting-tips", "Copywriting"]] },
    { icon: "🏥", name: "Health & Fitness", topics: [
      ["healthy-eating-guide", "Healthy Eating"], ["home-workout-guide", "Home Workout"],
      ["mental-health-tips", "Mental Health"], ["sleep-better-tips", "Sleep Better"],
      ["meditation-guide", "Meditation"], ["digital-detox-guide", "Digital Detox"],
      ["meal-prep-guide", "Meal Prep"], ["first-aid-basics", "First Aid"]] },
    { icon: "🎓", name: "Career & Study", topics: [
      ["resume-tips", "Resume Tips"], ["interview-tips", "Interview Tips"],
      ["salary-negotiation-tips", "Salary Negotiation"], ["english-learning-tips", "English Learning"],
      ["online-learning-guide", "Online Learning"], ["exam-preparation-tips", "Exam Prep"],
      ["public-speaking-tips", "Public Speaking"], ["time-management-tips", "Time Management"],
      ["personal-branding-guide", "Personal Branding"], ["work-life-balance-tips", "Work-Life Balance"]] },
    { icon: "🏠", name: "Home & Life", topics: [
      ["gardening-basics", "Gardening"], ["indoor-plants-guide", "Indoor Plants"],
      ["home-organization-tips", "Home Organization"], ["car-maintenance-basics", "Car Maintenance"],
      ["parenting-tips", "Parenting"], ["pet-care-guide", "Pet Care"]] },
    { icon: "📱", name: "Mobile & Social", topics: [
      ["smartphone-tips", "Smartphone Tips"], ["online-safety-tips", "Online Safety"],
      ["social-media-safety", "Social Media Safety"], ["cybersecurity-basics", "Cybersecurity"]] },
    { icon: "🎨", name: "Creative Skills", topics: [
      ["graphic-design-basics", "Graphic Design"], ["photography-tips", "Photography"],
      ["drawing-basics", "Drawing"]] },
    { icon: "✈️", name: "Travel & Remote", topics: [
      ["travel-hacks", "Travel Hacks"], ["remote-work-guide", "Remote Work"]] }
  ];

  /* ---------- Entertainment Hub: movies/books/islamic cards with search ---------- */
  function initEntHub() {
    var list = document.getElementById("ent-list");
    var search = document.getElementById("ent-search");
    var pills = document.getElementById("ent-pills");
    if (!list) return;
    var HUB_CATS = ["Movies & Shows", "Books & Reading", "Islamic"];
    var items = [];
    TOPIC_CATS.forEach(function (cat) {
      if (HUB_CATS.indexOf(cat.name) === -1) return;
      cat.topics.forEach(function (t) {
        items.push({ slug: t[0], title: t[1], cat: cat.name, icon: cat.icon });
      });
    });
    var activeCat = "all";
    var hubExpanded = false;
    function render() {
      var q = (search ? search.value : "").trim().toLowerCase();
      var matches = items.filter(function (it) {
        if (activeCat !== "all" && it.cat !== activeCat) return false;
        if (q && it.title.toLowerCase().indexOf(q) === -1 &&
            it.slug.indexOf(q.replace(/\s+/g, "-")) === -1) return false;
        return true;
      });
      list.innerHTML = "";
      var toShow = hubExpanded ? matches : matches.slice(0, 5);
      toShow.forEach(function (it) {
        var a = document.createElement("a");
        a.className = "ent-card";
        a.href = "article-" + it.slug + "-en.html";
        var img = document.createElement("img");
        img.src = "img/topic-" + it.slug + ".jpg";
        img.alt = it.title;
        img.loading = "lazy";
        var txt = document.createElement("div");
        var nm = document.createElement("div");
        nm.className = "ename"; nm.textContent = it.title;
        var ct = document.createElement("div");
        ct.className = "ecat"; ct.textContent = it.icon + " " + it.cat;
        txt.appendChild(nm); txt.appendChild(ct);
        a.appendChild(img); a.appendChild(txt);
        list.appendChild(a);
      });
      if (!matches.length) {
        var p = document.createElement("p");
        p.className = "ent-empty";
        p.textContent = "No matches — try another word.";
        list.appendChild(p);
      } else if (matches.length > 5) {
        var more = document.createElement("button");
        more.type = "button";
        more.className = "ent-more";
        more.textContent = hubExpanded ? "Show less \u2191" : "More (" + (matches.length - 5) + " more) \u2193";
        more.addEventListener("click", function () { hubExpanded = !hubExpanded; render(); });
        list.appendChild(more);
      }
    }
    if (search) search.addEventListener("input", function () { hubExpanded = false; render(); });
    if (pills) pills.addEventListener("click", function (e) {
      var b = e.target.closest(".ent-pill");
      if (!b) return;
      activeCat = b.getAttribute("data-cat");
      var all = pills.querySelectorAll(".ent-pill");
      for (var i = 0; i < all.length; i++) all[i].classList.remove("active");
      b.classList.add("active");
      hubExpanded = false;
      render();
    });
    render();
  }

  /* ---------- Read in Your Language: show 5 cards, rest behind More (2-col) ---------- */
  function initLangMore() {
    var sec = document.getElementById("languages");
    if (!sec || sec.dataset.langMore) return;
    sec.dataset.langMore = "1";
    var grid = sec.querySelector(".grid");
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.children);
    if (cards.length <= 5) return;
    var extra = cards.slice(5);
    var moreGrid = document.createElement("div");
    moreGrid.className = "lang-more-grid";
    moreGrid.hidden = true;
    extra.forEach(function (c) { moreGrid.appendChild(c); });
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-ghost lang-more-btn";
    function label() { return moreGrid.hidden ? "More (" + extra.length + " more) \u2193" : "Show less \u2191"; }
    btn.textContent = label();
    btn.addEventListener("click", function () {
      moreGrid.hidden = !moreGrid.hidden;
      btn.textContent = label();
      if (!moreGrid.hidden) moreGrid.scrollIntoView({ behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth"), block: "nearest" });
    });
    grid.parentNode.insertBefore(moreGrid, grid.nextSibling);
    moreGrid.parentNode.insertBefore(btn, moreGrid.nextSibling);
  }

  /* ---------- Articles section: show 10 rows, rest behind More ---------- */
  function initArticlesMore() {
    var grid = document.getElementById("articles-grid");
    if (!grid || grid.dataset.artMore) return;
    grid.dataset.artMore = "1";
    var rows = Array.prototype.slice.call(grid.children);
    if (rows.length <= 10) return;
    var extra = rows.slice(10);
    var moreList = document.createElement("div");
    moreList.className = "mini-art-list articles-more-list";
    moreList.hidden = true;
    extra.forEach(function (r) { moreList.appendChild(r); });
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-ghost lang-more-btn";
    function label() { return moreList.hidden ? "More (" + extra.length + " more) \u2193" : "Show less \u2191"; }
    btn.textContent = label();
    btn.addEventListener("click", function () {
      moreList.hidden = !moreList.hidden;
      btn.textContent = label();
      if (!moreList.hidden) moreList.scrollIntoView({ behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth"), block: "nearest" });
    });
    grid.parentNode.insertBefore(moreList, grid.nextSibling);
    moreList.parentNode.insertBefore(btn, moreList.nextSibling);
  }

  function initTopicSidebar() {
    var list = document.getElementById("topic-list");
    var search = document.getElementById("topic-search");
    var reset = document.getElementById("topic-reset");
    var allartSearch = document.getElementById("allart-search");
    if (!list) return;
    function slugOf(card) {
      var h = card.getAttribute("href") || "";
      var m = h.match(/article-(.+)-[a-z]{2}\.html$/);
      return m ? m[1] : "";
    }
    function render(q) {
      q = (q || "").trim().toLowerCase();
      list.innerHTML = "";
      var shown = 0;
      TOPIC_CATS.forEach(function (cat) {
        var items = cat.topics.filter(function (t) {
          return !q || t[1].toLowerCase().indexOf(q) !== -1 ||
            t[0].indexOf(q.replace(/\s+/g, "-")) !== -1 ||
            cat.name.toLowerCase().indexOf(q) !== -1;
        });
        if (!items.length) return;
        var h = document.createElement("div");
        h.className = "topic-cat"; h.textContent = cat.icon + " " + cat.name;
        list.appendChild(h);
        items.forEach(function (t) {
          var b = document.createElement("button");
          b.type = "button"; b.className = "topic-item"; b.setAttribute("data-slug", t[0]);
          var img = document.createElement("img");
          img.loading = "lazy"; img.alt = ""; img.src = "img/topic-" + t[0] + ".jpg";
          img.onerror = function () { img.remove(); };
          var nm = document.createElement("span"); nm.className = "tname"; nm.textContent = t[1];
          var ct = document.createElement("span"); ct.className = "tcount"; ct.textContent = "10";
          b.appendChild(img); b.appendChild(nm); b.appendChild(ct);
          b.addEventListener("click", function () { filterGrid(t[0], t[1]); });
          list.appendChild(b);
          shown++;
        });
      });
      if (!shown) {
        var e = document.createElement("div");
        e.className = "topic-empty"; e.textContent = "No topics found.";
        list.appendChild(e);
      }
    }
    function filterGrid(slug, name) {
      /* grid removed — now filter the "All Articles" sidebar list */
      if (allartSearch) {
        allartSearch.value = name;
        var ev = document.createEvent("HTMLEvents");
        ev.initEvent("input", true, false);
        allartSearch.dispatchEvent(ev);
      }
      var btns = list.querySelectorAll(".topic-item");
      for (var i = 0; i < btns.length; i++) {
        btns[i].classList.toggle("active", btns[i].getAttribute("data-slug") === slug);
      }
      reset.hidden = false;
      reset.textContent = 'Show all articles';
      var sec = document.getElementById("articles");
      if (sec && sec.scrollIntoView) sec.scrollIntoView({ behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth") });
    }
    reset.addEventListener("click", function () {
      if (allartSearch) {
        allartSearch.value = "";
        var ev = document.createEvent("HTMLEvents");
        ev.initEvent("input", true, false);
        allartSearch.dispatchEvent(ev);
      }
      var btns = list.querySelectorAll(".topic-item");
      for (var i = 0; i < btns.length; i++) btns[i].classList.remove("active");
      reset.hidden = true;
    });
    search.addEventListener("input", function () { render(search.value); });
    render("");
  }

  /* ---------- Cinematic: sticky bottom CTA ---------- */
  function initStickyCta() {    var cta = document.getElementById("sticky-cta");
    if (!cta) return;
    var shown = false, studioVisible = false;
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      var past = y > window.innerHeight * 0.7;
      var show = past && !studioVisible;
      if (show && !shown) { cta.classList.add("show"); shown = true; }
      else if (!show && shown) { cta.classList.remove("show"); shown = false; }
    }
    // keep the floating CTA from covering the studios' buttons / downloads
    var studio = document.getElementById("studio");
    var vstudio = document.getElementById("video-studio");
    if ("IntersectionObserver" in window) {
      var seen = {};
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { seen[en.target.id] = en.isIntersecting; });
        studioVisible = !!(seen["studio"] || seen["video-studio"]);
        onScroll();
      }, { threshold: 0.15 });
      if (studio) obs.observe(studio);
      if (vstudio) obs.observe(vstudio);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- theme toggle (dark / light) ---------- */
  function initTheme() {
    var nav = document.querySelector(".nav");
    var btn = document.getElementById("theme-toggle") || document.getElementById("nav-theme");
    if (!btn && nav) {
      btn = document.createElement("button");
      btn.id = "theme-toggle";
      btn.className = "theme-toggle";
      btn.type = "button";
      btn.setAttribute("aria-label", "Toggle dark / light mode");
      nav.appendChild(btn);
    }
    var saved = null;
    try { saved = localStorage.getItem("sawalai_theme"); } catch (e) {}
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      /* auto-detect: follow device theme on first visit */
      document.documentElement.setAttribute("data-theme", "light");
    }
    function paint() {
      if (!btn) return;
      var isLight = document.documentElement.getAttribute("data-theme") === "light";
      btn.textContent = isLight ? "☀️" : "🌙";
      btn.setAttribute("aria-pressed", isLight ? "true" : "false");
      var mc = document.querySelector('meta[name="theme-color"]');
      if (mc) mc.setAttribute("content", isLight ? "#ffffff" : "#0d0d20");
    }
    if (btn) btn.addEventListener("click", function () {
      var light = document.documentElement.getAttribute("data-theme") === "light";
      var next = light ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("sawalai_theme", next); } catch (e) {}
      paint();
    });
    paint();
  }

  /* ---------- cookie consent ---------- */
  function initCookie() {
    var seen = null;
    try { seen = localStorage.getItem("sawalai_cookies"); } catch (e) {}
    if (seen) return;
    var bar = document.createElement("div");
    bar.id = "cookie-banner";
    bar.setAttribute("role", "dialog");
    bar.setAttribute("aria-label", "Cookie consent");
    bar.setAttribute("aria-live", "polite");
    bar.innerHTML = '<p>🍪 We use cookies to remember your preferences (theme, login). Optional analytics cookies show us which pages visitors love. <a href="privacy.html">Read our Privacy Policy</a></p>' +
      '<button class="btn btn-primary btn-sm" id="cookie-accept" type="button">Accept all</button>' +
      '<button class="btn btn-sm" id="cookie-reject" type="button">Essential only</button>';
    document.body.appendChild(bar);
    document.getElementById("cookie-accept").addEventListener("click", function () {
      try { localStorage.setItem("sawalai_cookies", "yes"); } catch (e) {}
      bar.remove();
    });
    document.getElementById("cookie-reject").addEventListener("click", function () {
      try { localStorage.setItem("sawalai_cookies", "no"); } catch (e) {}
      bar.remove();
    });
  }

  /* ---------- newsletter signup (footer) ---------- */
  function initNewsletter() {
    var footer = document.querySelector("footer");
    if (!footer || document.getElementById("nl-form")) return;
    var box = document.createElement("div");
    box.className = "newsletter";
    box.innerHTML = '<h4>📬 Get fresh articles & offers</h4>' +
      '<p class="tiny muted">One short email a week. No spam, unsubscribe anytime.</p>' +
      '<form id="nl-form"><input type="email" name="email" required placeholder="you@email.com" aria-label="Email address">' +
      '<button type="submit" id="nl-btn">Subscribe</button></form>' +
      '<p class="tiny muted" id="nl-msg"></p>';
    footer.insertBefore(box, footer.firstChild);
    document.getElementById("nl-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var form = e.target, btn = document.getElementById("nl-btn"), msg = document.getElementById("nl-msg");
      var email = form.email.value.trim();
      btn.disabled = true; btn.textContent = "…";
      fetch("https://formsubmit.co/ajax/4de22205ccafca608a7c4a00e6a34c92", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ _subject: "Newsletter signup: " + email, _template: "table", Email: email, Source: location.href })
      }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (d) {
        btn.disabled = false; btn.textContent = "Subscribe"; form.reset();
        msg.textContent = (d && (d.success === "true" || d.success === true))
          ? "✅ Subscribed! Check your inbox soon."
          : "⚠️ Could not subscribe right now — try again later.";
      }).catch(function () {
        btn.disabled = false; btn.textContent = "Subscribe";
        msg.textContent = "⚠️ Could not subscribe right now — try again later.";
      });
    });
  }

  /* ---------- All Articles: compact sidebar index ---------- */
  function initAllArticles(attempt) {
    var list = document.getElementById("allart-list");
    var search = document.getElementById("allart-search");
    if (!list) return;
    attempt = attempt || 0;
    if (typeof ARTICLES_INDEX === "undefined") {
      // Retry up to 5 times (script may load late)
      if (attempt < 5) setTimeout(function(){ initAllArticles(attempt + 1); }, 1000 * (attempt + 1));
      return;
    }
    function esc(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }
    function render(q) {
      q = (q || "").trim().toLowerCase();
      var html = "", n = 0;
      /* ticker mode: daily-rotating window of 60 (perf fix 2026-10-10 — a 540-link
         animated DOM caused multi-second scroll jank); search still covers the full index */
      var pool = ARTICLES_INDEX, base = 0;
      if (!q && ARTICLES_INDEX.length > 60) {
        var wday = Math.floor(Date.now() / 864e5);
        base = (wday * 60) % (ARTICLES_INDEX.length - 60);
        pool = ARTICLES_INDEX.slice(base, base + 60);
      }
      pool.forEach(function (a, k) {
        var i = base + k;
        if (q && a[0].toLowerCase().indexOf(q) === -1) return;
        var img = "img/topic-" + a[1].replace(/^article-/, "").replace(/-en\.html$/, "") + ".jpg";
        html += '<a class="allart-link" href="' + esc(a[1]) + '">'
          + '<img class="allart-thumb" src="' + esc(img) + '" alt="" loading="lazy" onerror="this.remove()">'
          + '<span class="n">' + (i + 1) + '.</span>'
          + '<span class="allart-t">' + esc(a[0]) + "</span></a>";
        n++;
      });
      list.innerHTML = html || '<p class="allart-empty">No articles found.</p>';
      /* ticker mode: duplicate list for a seamless auto-scroll loop (pauses on hover / search) */
      if (!q && n > 10) {
        list.innerHTML = '<div class="allart-track">' + html + html + '</div>';
        list.classList.add("ticker");
      } else {
        list.classList.remove("ticker");
      }
      if (search && !search.placeholder.match(/\d/)) {
        search.placeholder = "Search " + ARTICLES_INDEX.length + " articles...";
      }
    }
    if (search) search.addEventListener("input", function () { render(search.value); });
    render("");
    // FALLBACK: if still empty after 3s, populate from main article cards
    setTimeout(function(){
      if(list && list.children.length === 0){
        var cards = document.querySelectorAll('#articles-grid .mini-art');
        var html = '';
        cards.forEach(function(card, i){
          var title = card.querySelector('h3');
          var link = card.getAttribute('href');
          if(title && link){
            html += '<a class="allart-link" href="' + link + '"><span class="n">' + (i+1) + '.</span><span class="allart-t">' + title.textContent + '</span></a>';
          }
        });
        if(html){
          // Duplicate for ticker loop
          list.innerHTML = '<div class="allart-track">' + html + html + '</div>';
          list.classList.add('ticker');
        }
      }
    }, 3000);
  }

  /* ---------- Floating animated sports icons (all sports) ---------- */
  function initSportsFloat() {
    if (document.getElementById("sports-float")) return;
    var sports = [
      { id: "all", emoji: "🏆", label: "Sports", title: "All live sports scores" },
      { id: "cricket", emoji: "🏏", label: "Cricket", title: "Live cricket scores" },
      { id: "football", emoji: "⚽", label: "Football", title: "Live football scores" },
      { id: "basketball", emoji: "🏀", label: "Basketball", title: "Live basketball scores" },
      { id: "tennis", emoji: "🎾", label: "Tennis", title: "Live tennis scores" },
      { id: "dramas", emoji: "🎬", label: "Dramas", title: "Turkish drama shorts with Urdu subtitles" },
      { id: "ipl", emoji: "🏟️", label: "IPL", title: "IPL hub — teams, auction & 2027 season" }
    ];
    var wrap = document.createElement("div");
    wrap.id = "sports-float";
    sports.forEach(function (s, i) {
      var a = document.createElement("a");
      a.className = "sp-float";
      a.href = s.id === "all" ? "live-scores.html" : s.id === "dramas" ? "drama-shorts.html" : s.id === "ipl" ? "ipl.html" : "live-scores.html?sport=" + s.id;
      a.title = s.title;
      a.setAttribute("aria-label", s.title);
      a.style.animationDelay = (-i * 0.45) + "s";
      a.innerHTML = '<span class="sp-emoji">' + s.emoji + '</span><span class="sp-label">' + s.label + "</span>" +
        (s.id === "all" ? '<span class="sp-count" id="sp-live-count" hidden></span>' :
          (["cricket", "football", "basketball", "tennis"].indexOf(s.id) !== -1 ?
            '<span class="sp-count sp-per-sport" id="sp-live-count-' + s.id + '" hidden></span>' : ""));
      wrap.appendChild(a);
    });
    document.body.appendChild(wrap);

    /* live count on the Sports icon, refreshed every 60s */
    function short(n) {
      var map = { "Pakistan": "PAK", "Sri Lanka": "SL", "India": "IND", "West Indies": "WI",
        "Afghanistan": "AFG", "Bangladesh": "BAN", "Australia": "AUS", "South Africa": "SA",
        "England": "ENG", "New Zealand": "NZ" };
      if (map[n]) return map[n];
      return String(n).split(" ").map(function (w) { return w.charAt(0); }).join("").slice(0, 3).toUpperCase();
    }
    function updateCount() {
      var ids = ["cricket", "football", "basketball", "tennis"];
      var jobs = ids.map(function (id) {
        return fetch("https://sportscore.com/api/widget/matches/?sport=" + id + "&limit=30&src=sawalai")
          .then(function (r) { return r.json(); })
          .then(function (d) { return (d.matches || []).filter(function (m) { return m.status === "live"; }); })
          .catch(function () { return []; });
      });
      Promise.all(jobs).then(function (lists) {
        var all = [];
        var titles = { cricket: "Live cricket scores", football: "Live football scores",
          basketball: "Live basketball scores", tennis: "Live tennis scores" };
        lists.forEach(function (l, idx) {
          all = all.concat(l);
          var sb = document.getElementById("sp-live-count-" + ids[idx]);
          if (sb) {
            var link = sb.parentElement;
            if (l.length) {
              sb.hidden = false;
              sb.textContent = l.length + " live";
              var fm = l[0];
              sb.title = "LIVE: " + short(fm.home) + " vs " + short(fm.away);
              if (link) link.setAttribute("aria-label", titles[ids[idx]] + " \u2014 " + l.length + " live now");
            } else {
              sb.hidden = true;
              if (link) link.setAttribute("aria-label", titles[ids[idx]]);
            }
          }
        });
        var badge = document.getElementById("sp-live-count");
        if (!badge) return;
        if (all.length) {
          badge.hidden = false;
          badge.textContent = all.length + " live";
          var first = all[0];
          badge.title = "LIVE: " + short(first.home) + " vs " + short(first.away);
        } else { badge.hidden = true; }
      });
    }
    updateCount();
    setInterval(updateCount, 60000);
  }

  initReveal();
  initBackToTop();
  initSportsFloat();
  initParallax();
  initCounters();
  initShareRail();
  initSmooth();
  initStarfield();
  initGlobalStars();
  initStickyCta();
  initPictureStudio();
  initPremiumStudio();
  initVideoStudio();
  initTopicSidebar();
  initEntHub();
  initLangMore();
  initArticlesMore();
  initAllArticles();
  initTheme();
  initCookie();
  initAltAutomation();
  initErrorLog();
  initSideSearch();
  initNewsletter();
  /* ---------- Global 3D starfield (whole website background) ---------- */
  function initGlobalStars() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) return; /* mobile: save battery + smooth scroll */
    var canvas = document.createElement("canvas");
    canvas.id = "global-stars";
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d"), stars = [], W = 0, H = 0;
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; init(); }
    function init() {
      stars = [];
      var n = Math.min(120, Math.floor(W * H / 16000));
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.8 + 0.5, vy: Math.random() * 0.3 + 0.08, vx: (Math.random() - 0.5) * 0.15,
        tw: Math.random() * 6.28, ts: Math.random() * 0.03 + 0.01, hue: [99, 168, 34][i % 3] });
    }
    function frame() {
      if (document.hidden) { requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.y -= s.vy; s.x += s.vx; s.tw += s.ts;
        if (s.y < -5) { s.y = H + 5; s.x = Math.random() * W; }
        if (s.x < -5) s.x = W + 5; if (s.x > W + 5) s.x = -5;
        ctx.globalAlpha = 0.25 + 0.35 * Math.abs(Math.sin(s.tw));
        ctx.fillStyle = "hsl(" + s.hue + ", 80%, 70%)";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    window.addEventListener("resize", resize);
    resize(); frame();
  }

  /* ---------- Mobile: tap a floating widget title to expand/collapse it ---------- */
  function initWidgetToggle() {
    var cards = document.querySelectorAll("#top-widgets .tw-card, #top-widgets-right .tw-card");
    for (var i = 0; i < cards.length; i++) {
      (function (card) {
        var title = card.querySelector(".tw-title");
        if (!title) return;
        title.addEventListener("click", function () {
          card.classList.toggle("tw-open");
        });
      })(cards[i]);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initWidgetToggle);
  else initWidgetToggle();

  /* ---------- Desktop: scroll par widgets compact (chhote), sirf sab se oper bare ---------- */
  function initWidgetCompact() {
    var wraps = [document.getElementById("top-widgets"), document.getElementById("top-widgets-right")];
    function onScroll() {
      var y = window.scrollY || window.pageYOffset || 0;
      for (var i = 0; i < wraps.length; i++) {
        if (wraps[i]) wraps[i].classList.toggle("tw-compact", y > 60);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initWidgetCompact);
  else initWidgetCompact();

})();

  /* ---------- alt-text automation: fill missing image alts ---------- */
  function initAltAutomation() {
    function fix(scope) {
      (scope.querySelectorAll("img:not([alt])") || []).forEach(function (img) {
        var src = img.getAttribute("src") || "image";
        var name = src.split("/").pop().split(".")[0].replace(/[-_]+/g, " ").trim();
        img.setAttribute("alt", name ? "US AI — " + name : "US AI image");
      });
    }
    fix(document);
    if (window.MutationObserver) {
      new MutationObserver(function (m) {
        m.forEach(function (x) { x.addedNodes.forEach(function (n) { if (n.querySelectorAll) fix(n); }); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  }

  /* ---------- async image decoding: keeps scroll smooth while images pop in ---------- */
  function initAsyncDecoding() {
    function tag(scope) {
      (scope.querySelectorAll("img:not([decoding])") || []).forEach(function (img) { img.setAttribute("decoding", "async"); });
    }
    tag(document);
    if (window.MutationObserver) {
      new MutationObserver(function (m) {
        m.forEach(function (x) { x.addedNodes.forEach(function (n) { if (n.querySelectorAll) tag(n); }); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
  initAsyncDecoding();

  /* ---------- privacy-focused client-side error logging ---------- */  function initErrorLog() {
    window.addEventListener("error", function (e) {
      try {
        var log = JSON.parse(localStorage.getItem("sawalai_errors") || "[]");
        log.push(new Date().toISOString().slice(0, 19).replace("T", " ") + " — " + String(e.message).slice(0, 120));
        localStorage.setItem("sawalai_errors", JSON.stringify(log.slice(-50)));
      } catch (err) {}
    });
  }

  /* ---------- Hub boxes: Tools + Dramas with in-box search ---------- */
  var HUB_TOOLS = [
    ["🏷️","YouTube Tags","yt-tags"],["🖼️","YT Thumbnail","yt-thumb"],["#️⃣","Hashtags","hashtags"],
    ["📥","Video Downloader","video-downloader"],
    ["👤","Bio Maker","bio-gen"],["🎬","Title Ideas","title-ideas"],["📊","YT Stats","yt-stats"],
    ["📈","Engagement","engagement"],["💬","Captions","caption"],["📝","Paragraph","para-writer"],
    ["🔄","Rewriter","rewriter"],["✅","Grammar","grammar"],["🔢","Word Count","word-count"],
    ["🔡","Case Convert","case-converter"],["📄","Summarizer","summarizer"],["🔍","Similarity","plagiarism"],
    ["📋","Outline","outline"],["🎭","Poetry","poetry"],["📰","Lorem Ipsum","lorem"],
    ["✂️","BG Remover","bg-remover"],["🗜️","Compress","img-compress"],["🎨","Palette","palette"],
    ["🔳","QR Code","qr"],["🔁","Convert","img-convert"],["⭐","Favicon","favicon"],
    ["😂","Meme Maker","meme"],["💧","Watermark","watermark"],["🔍","Upscaler","upscaler"],
    ["🎂","Age Calc","age"],["💸","Discount","discount"],["🏦","EMI Calc","emi"],
    ["⚖️","BMI","bmi"],["🔐","Password","password"],["🌐","My IP","ip-check"],
    ["⚡","Speed Test","speed"],["📏","Units","unit"],["🕐","World Clock","clock"],
    ["💱","Currency","currency"],["🧾","JSON","json"],["🔣","Base64","base64"],
    ["🔗","Slugify","slugify"],["🏷️","Meta Tags","meta-tags"],["🤖","Robots.txt","robots"],
    ["🗺️","Sitemap","sitemap"],["🎯","Color Pick","color-picker"],["📝","MD→HTML","md-html"],
    ["🎲","Random","random"],["🗜️","Minifier","minifier"]
  ];
  var HUB_DRAMAS = [
    ["⚔️","Diriliş: Ertuğrul"],["👑","Kuruluş: Osman"],["🏰","Kuruluş: Orhan"],
    ["🦁","Alparslan: Büyük Selçuklu"],["🌙","Uyanış: Büyük Selçuklu"],["🕌","Mehmed: Fetihler Sultanı"],
    ["⚔️","Kudüs Fatihi Selahaddin"],["⚓","Barbaroslar"],["🏛️","Payitaht: Abdülhamid"],["🔥","Destan"]
  ];
  function initHubBoxes() {
    var tList = document.getElementById("hub-tools-list"), tSearch = document.getElementById("hub-tools-search");
    var dList = document.getElementById("hub-dramas-list"), dSearch = document.getElementById("hub-dramas-search");
    function drawTools(q) {
      if (!tList) return; q = (q||"").toLowerCase();
      var h = "";
      HUB_TOOLS.forEach(function(t){
        if (q && t[1].toLowerCase().indexOf(q)===-1) return;
        h += '<a class="hub-item" href="tools.html#'+t[2]+'"><span class="hi-icon">'+t[0]+'</span><span class="hi-name">'+t[1]+'</span></a>';
      });
      tList.innerHTML = h || '<p class="muted">No tools found.</p>';
    }
    function drawDramas(q) {
      if (!dList) return; q = (q||"").toLowerCase();
      var h = "";
      HUB_DRAMAS.forEach(function(d){
        if (q && d[1].toLowerCase().indexOf(q)===-1) return;
        h += '<a class="hub-item" href="trailers.html"><span class="hi-icon">'+d[0]+'</span><span class="hi-name">'+d[1]+'</span></a>';
      });
      dList.innerHTML = h || '<p class="muted">No dramas found.</p>';
    }
    if (tSearch) tSearch.addEventListener("input", function(){ drawTools(tSearch.value); });
    if (dSearch) dSearch.addEventListener("input", function(){ drawDramas(dSearch.value); });
    drawTools(""); drawDramas("");
  }

  /* ---------- Floating side global search ---------- */
  function initSideSearch() {
    if (document.getElementById("side-search")) return;
    var w = document.createElement("div"); w.id = "side-search";
    w.innerHTML = '<button id="side-search-btn" aria-label="Search">🔍</button><div id="side-search-panel"><input type="search" id="side-search-input" placeholder="Search site..." autocomplete="off"><div id="side-search-results"></div></div>';
    document.body.appendChild(w);
    var btn = document.getElementById("side-search-btn"), panel = document.getElementById("side-search-panel");
    var input = document.getElementById("side-search-input"), res = document.getElementById("side-search-results");
    btn.onclick = function(){ w.classList.toggle("open"); if (w.classList.contains("open")) input.focus(); };
    document.addEventListener("click", function(e){ if (!w.contains(e.target)) w.classList.remove("open"); });
    var timer = null;
    input.addEventListener("input", function(){
      if (timer) clearTimeout(timer);
      timer = setTimeout(function(){ runGlobalSearch(input.value.trim()); }, 200);
    });
    function runGlobalSearch(q) {
      if (!q || q.length < 2) { res.innerHTML = ""; return; }
      q = q.toLowerCase(); var h = "";
      // Tools (both lists)
      var allTools = (typeof HUB_TOOLS!=="undefined"?HUB_TOOLS:[]).concat(typeof HUB_MORE!=="undefined"?HUB_MORE:[]);
      var tm = allTools.filter(function(t){ return t[1].toLowerCase().indexOf(q) > -1; }).slice(0,4);
      if (tm.length) { h += '<div class="ss-cat">Tools</div>'; tm.forEach(function(t){ h += '<a href="advanced-tools.html#'+t[2]+'">'+t[0]+' '+t[1]+'</a>'; }); }
      // Site Pro
      if(typeof HUB_SITEPRO!=="undefined"){
        var sm = HUB_SITEPRO.filter(function(t){ return t[1].toLowerCase().indexOf(q) > -1; }).slice(0,3);
        if(sm.length){ h += '<div class="ss-cat">Site Pro</div>'; sm.forEach(function(t){ h += '<a href="'+t[2]+'">'+t[0]+' '+t[1]+'</a>'; }); }
      }
      // Dramas
      var dm = HUB_DRAMAS.filter(function(d){ return d[1].toLowerCase().indexOf(q) > -1; }).slice(0,3);
      if (dm.length) { h += '<div class="ss-cat">Dramas</div>'; dm.forEach(function(d){ h += '<a href="trailers.html">'+d[0]+' '+d[1]+'</a>'; }); }
      // Articles (from index if available)
      if (typeof ARTICLES_INDEX !== "undefined") {
        var am = ARTICLES_INDEX.filter(function(a){ return a[0].toLowerCase().indexOf(q) > -1; }).slice(0,5);
        if (am.length) { h += '<div class="ss-cat">Articles</div>'; am.forEach(function(a){ h += '<a href="'+a[1]+'">📄 '+a[0].slice(0,45)+'</a>'; }); }
      }
      // Pages
      var pages = [["index.html#demo","💬 AI Chat"],["services.html","🛠️ Services"],["tools.html","🧰 All Tools"],["trailers.html","🎬 Trailers"],["live-scores.html","🏏 Live Scores"],["drama-shorts.html","🎞️ Drama Shorts"],["about.html","ℹ️ About"]];
      var pm = pages.filter(function(p){ return p[1].toLowerCase().indexOf(q) > -1; }).slice(0,3);
      if (pm.length) { h += '<div class="ss-cat">Pages</div>'; pm.forEach(function(p){ h += '<a href="'+p[0]+'">'+p[1]+'</a>'; }); }
      res.innerHTML = h || '<p class="muted" style="padding:8px">Nothing found.</p>';
    }
  }

  /* ---------- WhatsApp share button ---------- */
  function initShareButtons() {
    if (document.getElementById("wa-share")) return;
    var b = document.createElement("a");
    b.id = "wa-share"; b.href = "https://wa.me/?text=" + encodeURIComponent("Check out US AI — free AI tools! https://www.usai-usa.com/");
    b.target = "_blank"; b.rel = "noopener"; b.setAttribute("aria-label", "Share on WhatsApp");
    b.style.cssText = "position:fixed;left:14px;bottom:14px;z-index:998;width:48px;height:48px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;font-size:1.5rem;box-shadow:0 4px 16px rgba(0,0,0,.4);text-decoration:none;";
    b.textContent = "💬";
    document.body.appendChild(b);
    /* ---------- WhatsApp community join chip (dual-action float) ---------- */
    /* ADDITIVE: does not touch the #wa-share button above. Chip runs the */
    /* WhatsApp community join flow (login gate + 3-day Pro reward, same */
    /* localStorage keys as community.js). Only renders when a group link */
    /* is configured (no dead CTA in placeholder state). */
    (function initWaJoinChip() {
      if (document.getElementById("wa-join")) return;
      var WA_GROUP_FALLBACK = "https://chat.whatsapp.com/HDahpOL3tsqFKOWsRddkY6?s=cl&p=a&mlu=4&ilr=4"; /* must match community.js WHATSAPP_GROUP */
      var liveGroup = (window.SawalCommunity && window.SawalCommunity.getGroup) ? window.SawalCommunity.getGroup() : WA_GROUP_FALLBACK;
      if (!liveGroup) return;
      var c = document.createElement("a");
      c.id = "wa-join"; c.className = "wa-join"; c.href = "#";
      c.setAttribute("aria-label", "Join WhatsApp community");
      c.textContent = "💬 Join community";
      c.style.cssText = "position:fixed;left:14px;bottom:70px;z-index:998;background:#25D366;color:#fff;font-size:.78rem;font-weight:700;padding:8px 12px;border-radius:999px;box-shadow:0 4px 16px rgba(0,0,0,.4);text-decoration:none;white-space:nowrap;animation:badgePulse 2.2s infinite;";
      c.addEventListener("click", function (e) {
        e.preventDefault();
        var url = (window.SawalCommunity && window.SawalCommunity.getGroup) ? window.SawalCommunity.getGroup() : WA_GROUP_FALLBACK;
        if (!url) return;
        var email = null, users = {};
        try {
          email = localStorage.getItem("sawalai_session");
          users = JSON.parse(localStorage.getItem("sawalai_users") || "{}");
        } catch (err) { email = null; }
        if (!email || !users[email]) {
          location.href = "account.html?next=" + encodeURIComponent(location.pathname + location.search);
          return;
        }
        try {
          var em = email.toLowerCase();
          if (!localStorage.getItem("sawalai_wa_joined_" + em)) {
            localStorage.setItem("sawalai_wa_joined_" + em, String(Date.now()));
            var until = Date.now() + 3 * 864e5;
            var cur = parseInt(localStorage.getItem("sawalai_pro_until_" + em) || "0", 10) || 0;
            localStorage.setItem("sawalai_pro_until_" + em, String(Math.max(cur, until)));
            if (!localStorage.getItem("sawalai_badge_" + em)) localStorage.setItem("sawalai_badge_" + em, "👥 Community");
          }
        } catch (err) {}
        window.open(url, "_blank", "noopener");
      });
      document.body.appendChild(c);
    })();
  }
  initShareButtons();

  /* ---------- Multi-currency pricing switcher ---------- */
  function initCurrency(){
    var shop = document.getElementById("proxies") || document.getElementById("rdp");
    if (!shop || document.getElementById("cur-switch")) return;
    var wrap = document.createElement("div");
    wrap.style.cssText = "text-align:center;margin:10px 0;";
    wrap.innerHTML = '<label style="font-size:.85rem;color:var(--muted)">Prices in: <select id="cur-switch" style="padding:6px 10px;border-radius:8px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text)"><option value="PKR">PKR Rs</option><option value="USD">USD $</option></select></label>';
    shop.insertBefore(wrap, shop.children[1]);
    var rates = {PKR:1};
    fetch("https://api.frankfurter.app/latest?from=PKR&to=USD").then(function(r){return r.json();}).then(function(d){ if(d.rates&&d.rates.USD) rates.USD=d.rates.USD; }).catch(function(){});
    document.getElementById("cur-switch").onchange = function(){
      var cur = this.value, rate = rates[cur]||1, sym = cur==="USD"?"$":"Rs ";
      document.querySelectorAll(".price-table td, .price-table th").forEach(function(td){
        if(!td.getAttribute("data-pkr")) td.setAttribute("data-pkr", td.textContent);
        var m = td.getAttribute("data-pkr").match(/([\d,]+)/);
        if(m){ var v = parseFloat(m[1].replace(/,/g,""))*rate; td.textContent = td.getAttribute("data-pkr").replace(m[1], cur==="USD" ? v.toFixed(2) : Math.round(v).toLocaleString()); if(cur==="USD") td.textContent="$"+td.textContent.replace(/[^\d.]/g,""); }
      });
    };
  }
  initCurrency();

  /* ---------- Hub box: More Tools ---------- */
  var HUB_MORE = [
    ["🧾","Invoice","invoice"],["✍️","Signature","signature"],["🧺","Receipt","receipt"],
    ["📊","Barcode","barcode"],["🔒","Hash","hash"],["🌑","Shadow","shadow"],
    ["🌈","Gradient","gradient"],["🔊","Text→Speech","tts"],["🎤","Speech→Text","stt"],
    ["💻","Binary","binary"],["📈","Compound","compound"],["🧾","GST Tax","gst"],
    ["💰","Tip Calc","tip"],["⛽","Fuel Cost","fuel"],["💼","Salary","salary"],
    ["📊","Margin","margin"],["🏖️","Retire","retire"],["₿","Crypto","crypto"],
    ["📦","Shipping","shipping"],["⚖️","BreakEven","breakeven"],["⭕","TicTacToe","tictactoe"],
    ["✊","RPS Game","rps"],["🃏","Memory","memory"],["🪙","Coin Flip","coinflip"],
    ["🎲","Dice","dice"],["🎡","Wheel","wheel"],["❤️","Love Calc","love"],
    ["♈","Zodiac","zodiac"],["😂","Jokes","joke"],["🎨","Color Game","colorguess"],
    ["🔥","Calories","calories"],["💧","Water","water"],["⚖️","Ideal Wt","ibw"],
    ["❤️","Heart Zones","heartrate"],["😴","Sleep","sleep"],["📏","Body Fat","bodyfat"],
    ["🏃","Pace","pace"],["🤰","Due Date","duedate"],["🥗","Macros","macro"],
    ["🚭","Smoke Cost","smoking"],["💌","Feedback","feedback"],["🖨️","Print","printpage"],
    ["📑","PDF","pdfexport"],["👥","Visitors","visitors"],["🔔","Notify","pushnotify"]
  ];
  function initHubMore() {
    var list = document.getElementById("hub-more-list"), search = document.getElementById("hub-more-search");
    function draw(q){
      if(!list) return; q=(q||"").toLowerCase(); var h="";
      HUB_MORE.forEach(function(t){
        if(q && t[1].toLowerCase().indexOf(q)===-1) return;
        h+='<a class="hub-item" href="advanced-tools.html#'+t[2]+'"><span class="hi-icon">'+t[0]+'</span><span class="hi-name">'+t[1]+'</span></a>';
      });
      list.innerHTML = h || '<p class="muted">No tools found.</p>';
    }
    if(search) search.addEventListener("input", function(){ draw(search.value); });
    draw("");
  }
  initHubMore();
  initHubBoxes(); /* moved here: HUB_TOOLS is declared above this point (was called before its var assignment, throwing on pages with hub lists) */

  /* ---------- GA4 event tracking ---------- */
  function initAnalytics(){
    function consentOK(){
      try{ return localStorage.getItem("sawalai_cookies")!=="no"; }catch(e){ return false; }
    }
    function ev(name, params){
      try{ if(consentOK() && typeof gtag==="function") gtag("event", name, params||{}); }catch(e){}
    }
    // tool usage
    document.addEventListener("click", function(e){
      var t=e.target.closest(".tool-card");
      if(t) ev("tool_open", {tool_id:t.getAttribute("data-id")});
      var hb=e.target.closest(".hub-item");
      if(hb) ev("hub_click", {label:hb.textContent.trim().slice(0,40)});
    });
    // outbound clicks
    document.addEventListener("click", function(e){
      var a=e.target.closest("a[href^='http']");
      if(a && a.hostname!==location.hostname) ev("outbound", {url:a.href.slice(0,120)});
    });
    // 404 tracking (on 404 page)
    if(document.title.indexOf("404")>-1||location.pathname.indexOf("404")>-1) ev("page_404",{path:location.pathname});
    // scroll depth (perf: scrollHeight cached — reading it per scroll event forces layout)
    var d25=false,d50=false,d75=false, maxScroll=1;
    function cacheMaxScroll(){ maxScroll=Math.max(1, document.body.scrollHeight-window.innerHeight); }
    cacheMaxScroll();
    window.addEventListener("resize", cacheMaxScroll, {passive:true});
    window.addEventListener("load", cacheMaxScroll);
    window.addEventListener("scroll", function(){
      var p=window.scrollY/maxScroll;
      if(p>0.25&&!d25){d25=true;ev("scroll_25");}
      if(p>0.5&&!d50){d50=true;ev("scroll_50");}
      if(p>0.75&&!d75){d75=true;ev("scroll_75");}
    }, {passive:true});
  }
  initAnalytics();

  /* ---------- Hub box: Site Pro (50 features) ---------- */
  var HUB_SITEPRO = [
    // Security (10)
    ["🛡️","DDoS Protection","#","✅ Cloudflare active"],["🤖","Bot Protection","#","✅ Headers set"],
    ["🔒","Right-Click Guard","site-power.html","🔧 tool"],["🔑","2FA Admin","#","guide"],["💾","Auto Backup","#","guide"],
    ["🦠","Malware Scan","#","guide"],["🛡️","Security Headers","#","✅ _headers"],["📝","Error Logging","#","✅ GA4"],
    ["🚫","IP Blocking","#","guide"],["🔐","Secure Sessions","#","✅ Static site"],
    // SEO (10)
    ["📋","OG Meta Tags","site-power.html#metatags","🔧 tool"],["🐦","Twitter Cards","site-power.html#metatags","🔧 tool"],
    ["🗺️","XML Sitemap","site-power.html","🔧 tool"],["🔗","Canonical URLs","#","✅ done"],
    ["📋","Schema Markup","site-power.html#metatags","🔧 tool"],["🍞","Breadcrumbs","site-power.html","🔧 tool"],
    ["🖼️","Alt Text Check","site-power.html","🔧 tool"],["🔗","Link Analyzer","site-power.html#brokenlinks","🔧 tool"],
    ["⛓️","Broken Links","tools.html#brokenlinks","🔧 tool"],["🌍","Hreflang","tools.html#hreflang","🔧 tool"],
    // Performance (10)
    ["🌐","CDN","#","✅ Cloudflare"],["🖼️","Lazy Loading","#","✅ done"],
    ["🗜️","Compression","#","✅ Cloudflare"],["💾","Browser Cache","#","✅ Cloudflare"],
    ["🗄️","DB Optimize","#","— static"],["🖼️","WebP Images","site-power.html#webp","🔧 tool"],
    ["⚡","Minification","site-power.html#speed","🔧 tool"],["🚀","HTTP/2+3","#","✅ Cloudflare"],
    ["🖥️","SSR","#","— static"],["📡","Uptime Monitor","#","guide"],
    // Analytics (10)
    ["📊","GA4 Events","#","✅ tracking"],["🔥","Heatmaps","#","guide"],
    ["🎯","Conversions","#","✅ GA4"],["🔗","UTM Builder","site-power.html#utm","🔧 tool"],
    ["404","404 Monitor","#","✅ GA4"],["📉","Bounce Rate","#","✅ GA4"],
    ["🔍","Search Console","#","guide"],["⏱️","Speed Logs","#","✅ GA4"],
    ["🔑","API Tracking","#","✅ GA4"],["💌","Feedback Stats","site-power.html","🔧 tool"],
    // Community (10)
    ["🎨","Brand Kit","about.html","📖"],["🍪","Cookie Consent","#","✅ done"],
    ["📜","Terms & Legal","#","guide"],["🎫","Support Tickets","site-power.html","🔧 tool"],
    ["📧","Newsletter","#","✅ form"],["💬","Community","#","guide"],
    ["☕","Donate","#","guide"],["📝","Changelog","#","guide"],
    ["📱","PWA Offline","#","✅ installed"],["💰","Ad Approval","#","guide"]
  ];
  function initHubSitePro() {
    var list = document.getElementById("hub-sitepro-list"), search = document.getElementById("hub-sitepro-search");
    function draw(q){
      if(!list) return; q=(q||"").toLowerCase(); var h="";
      HUB_SITEPRO.forEach(function(t){
        if(q && t[1].toLowerCase().indexOf(q)===-1) return;
        h+='<a class="hub-item" href="'+t[2]+'"'+(t[2]==="#"?' onclick="return false"':"")+'><span class="hi-icon">'+t[0]+'</span><span class="hi-name">'+t[1]+'</span><span style="font-size:.65rem;color:var(--muted)">'+t[3]+'</span></a>';
      });
      list.innerHTML = h || '<p class="muted">Nothing found.</p>';
    }
    if(search) search.addEventListener("input", function(){ draw(search.value); });
    draw("");
  }
  initHubSitePro();

  /* ---------- Nav: condense into More dropdown + Account top-right ---------- */
  (function initNavCondense(){
    var links = document.querySelector(".nav-links");
    if(!links || links.querySelector(".nav-drop")) return; // already condensed
    var moveKeys = ["faq", "builder", "temp-box", "temp-mail", "numbers", "apps", "purchases", "about"];
    var as = Array.prototype.slice.call(links.querySelectorAll("a"));
    var account = null, more = [];
    as.forEach(function(a){
      var h = (a.getAttribute("href")||"").toLowerCase(), t = a.textContent.toLowerCase();
      if(h.indexOf("account") > -1){ account = a; return; }
      for(var i=0;i<moveKeys.length;i++){
        if(h.indexOf(moveKeys[i]) > -1){ more.push(a); return; }
      }
    });
    // build More dropdown
    if(more.length){
      var drop = document.createElement("div");
      drop.className = "nav-drop";
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "nav-drop-btn";
      btn.setAttribute("aria-haspopup","true"); btn.setAttribute("aria-expanded","false");
      btn.textContent = "More ▾";
      var menu = document.createElement("div");
      menu.className = "nav-drop-menu";
      more.forEach(function(a){ menu.appendChild(a); });
      drop.appendChild(btn); drop.appendChild(menu);
      links.appendChild(drop);
      btn.addEventListener("click", function(e){
        e.stopPropagation();
        var open = drop.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function(){ drop.classList.remove("open"); btn.setAttribute("aria-expanded","false"); });
    }
    // Account pinned top-right
    if(account){
      account.classList.add("nav-account-btn");
      var nav = links.closest("nav") || links.parentNode;
      // place after nav-links, before nav-search if present
      var search = nav.querySelector(".nav-search");
      if(search) nav.insertBefore(account, search);
      else nav.appendChild(account);
    }
  })();

  /* ---------- Nav dropdown icon labels (think-645, additive) ---------- */
  (function initNavDropIcons(){
    try {
      document.querySelectorAll(".nav-drop-menu a").forEach(function(a){
        var t = (a.textContent||"").trim();
        if(t === "FAQ") a.innerHTML = "❓ " + a.innerHTML;
        else if(t === "About") a.innerHTML = "ℹ️ " + a.innerHTML;
      });
    } catch(e) {}
  })();

  /* ---------- 🎁 Deals nav link (bundles page, all pages) ---------- */
  (function initNavDeals(){
    try {
      var links = document.querySelector(".nav-links");
      if (!links || links.querySelector('a[href="bundles.html"]')) return;
      var a = document.createElement("a");
      a.href = "bundles.html";
      a.innerHTML = "🎁 Deals";
      a.title = "Bundle deals — save up to 7%";
      links.appendChild(a);
    } catch (e) {}
  })();

  /* ---------- Nav dropdown toggle (all pages) ---------- */
  document.addEventListener("click", function(e){
    var btn = e.target.closest(".nav-drop-btn");
    document.querySelectorAll(".nav-drop.open").forEach(function(d){
      if(!btn || d.querySelector(".nav-drop-btn") !== btn){
        d.classList.remove("open");
        d.querySelector(".nav-drop-btn").setAttribute("aria-expanded","false");
      }
    });
    if(btn){
      e.stopPropagation();
      var drop = btn.closest(".nav-drop");
      var open = drop.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
  });

  /* ---------- Showcase lightbox (click to view full) ---------- */
  document.addEventListener("click", function(e){
    var img = e.target.closest(".showcase-item img");
    if(img){
      var lb = document.createElement("div");
      lb.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:20px";
      lb.innerHTML = '<img src="'+img.src+'" style="max-width:95%;max-height:90%;border-radius:12px" alt="'+(img.alt||"")+'">';
      lb.onclick = function(){ document.body.removeChild(lb); };
      document.body.appendChild(lb);
      return;
    }
  });

/* ---------- Accessibility: reduced motion, OLED theme, font scaling ---------- */
(function () {
  "use strict";
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} }
  function apply() {
    if (ls("sawalai_reduce_motion") === "1") document.documentElement.classList.add("reduce-motion");
    else document.documentElement.classList.remove("reduce-motion");
    if (ls("sawalai_oled") === "1") document.documentElement.setAttribute("data-theme", "oled");
    var fs = parseFloat(ls("sawalai_fontscale") || "1");
    if (fs && fs !== 1) document.documentElement.style.fontSize = (16 * fs) + "px";
  }
  /* floating a11y button */
  function build() {
    if (document.getElementById("a11y-btn")) return;
    var b = document.createElement("button");
    b.id = "a11y-btn"; b.title = "Accessibility options"; b.textContent = "♿";
    b.style.cssText = "position:fixed;bottom:90px;left:14px;z-index:9998;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:rgba(20,20,40,.9);color:#fff;font-size:20px;cursor:pointer;backdrop-filter:blur(8px)";
    var p = document.createElement("div");
    p.id = "a11y-panel";
    p.style.cssText = "display:none;position:fixed;bottom:142px;left:14px;z-index:9998;background:rgba(15,15,30,.97);border:1px solid var(--line);border-radius:14px;padding:14px;width:230px;color:#fff;font-size:.85rem";
    p.innerHTML = '<b>♿ Accessibility</b><br><br>' +
      '<label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" id="a11y-motion"> Reduce motion</label>' +
      '<label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" id="a11y-oled"> Pure black (OLED) theme</label>' +
      '<label style="display:block;margin:8px 0 4px">Font size: <span id="a11y-fsv">100%</span></label>' +
      '<input type="range" id="a11y-fs" min="80" max="130" value="100" style="width:100%">';
    document.body.appendChild(b); document.body.appendChild(p);
    b.onclick = function(){ p.style.display = p.style.display === "none" ? "block" : "none"; };
    var m = document.getElementById("a11y-motion"), o = document.getElementById("a11y-oled"), fs = document.getElementById("a11y-fs");
    m.checked = ls("sawalai_reduce_motion") === "1";
    o.checked = ls("sawalai_oled") === "1";
    fs.value = Math.round(parseFloat(ls("sawalai_fontscale") || "1") * 100);
    document.getElementById("a11y-fsv").textContent = fs.value + "%";
    m.onchange = function(){ ls("sawalai_reduce_motion", m.checked ? "1" : "0"); apply(); };
    o.onchange = function(){ ls("sawalai_oled", o.checked ? "1" : "0"); if(!o.checked) document.documentElement.removeAttribute("data-theme"); apply(); };
    fs.oninput = function(){
      document.getElementById("a11y-fsv").textContent = fs.value + "%";
      ls("sawalai_fontscale", fs.value / 100);
      document.documentElement.style.fontSize = (16 * fs.value / 100) + "px";
    };
  }
  /* Ctrl+K quick search */
  document.addEventListener("keydown", function(e){
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      var s = document.getElementById("tool-search");
      if (s) { e.preventDefault(); s.focus(); s.scrollIntoView({ block: "center" }); }
      else { e.preventDefault(); location.href = "tools.html"; setTimeout(function(){ var q = document.getElementById("tool-search"); if(q) q.focus(); }, 800); }
    }
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function(){ apply(); build(); });
  else { apply(); build(); }
})();

/* ---------- Homepage additions: theme, lang, tool-of-day, testimonials, poll ---------- */
(function () {
  "use strict";
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} }
  function ready(fn){ if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }
  ready(function(){
    /* language selector -> language hub pages (loc-fallback fix 2026-10-11) */
    var lg = document.getElementById("nav-lang");
    if(lg){ lg.onchange = function(){ var v = lg.value, ok = ["ur","es","fr","de","hi","ar","tr","id","pt"]; if(v === "en"){ lg.value = "en"; return; } if(ok.indexOf(v) !== -1){ location.href = "lang-" + v + ".html"; } else { try { if(window.SawalNotify) window.SawalNotify("🌐 <b>Coming soon</b> — the " + v.toUpperCase() + " language hub is being prepared. Stay tuned!", "info"); } catch (e) {} } lg.value = "en"; }; }
    /* tool of the day: deterministic daily pick */
    var tod = document.getElementById("tod-link");
    if(tod){
      var picks = [["yt-tags","YouTube Tag Generator"],["qr","QR Code Generator"],["bmi","BMI Calculator"],["password","Password Generator"],["hashtags","Hashtag Generator"],["age","Age Calculator"],["invoice","Invoice Generator"],["qr-scanner","QR Scanner"]];
      var day = Math.floor(Date.now() / 864e5);
      var p = picks[day % picks.length];
      tod.textContent = p[1]; tod.href = "tools.html#" + p[0];
    }
    /* testimonials carousel */
    var TT = [
      ["Best free tools site — I use the QR and YouTube tag tools every day!", "Ahmed, Lahore"],
      ["The AI picture studio is amazing — and everything is free!", "Sara, Karachi"],
      ["No signup, instant results. It became my daily-use site.", "Bilal, Islamabad"],
      ["Joined the WhatsApp group, got 3 days of Pro free. Awesome!", "Fatima, Dubai"],
      ["Fastest free tools site I've seen — bookmarked it for daily use!", "Verified User"],
      ["The free numbers section saved my real number. Super useful!", "Verified User"],
      ["Urdu subtitles on the drama trailers are perfect for my family — free and so easy to use!", "Verified User"],
      ["The free guides actually helped me pick the right VPN — no fluff, just clear answers.", "Verified User"],
      ["Live sports scores, drama trailers and useful tools in one place — the whole family visits daily.", "Verified User"]
    ];
    var ti = 0, tx = document.getElementById("testi-text"), tn = document.getElementById("testi-name"), dots = document.getElementById("testi-dots");
    if(tx && dots){
      TT.forEach(function(_, i){
        var s = document.createElement("span"); if(!i) s.className = "on";
        s.onclick = function(){ show(i); resetTestiTimer(); }; dots.appendChild(s);
      });
      function show(i){
        ti = i; tx.textContent = '"' + TT[i][0] + '"'; tn.textContent = "— " + TT[i][1] + " ⭐⭐⭐⭐⭐";
        var d = dots.children;
        for(var j = 0; j < d.length; j++) d[j].className = j === i ? "on" : "";
      }
      /* UX polish (add-only): pause auto-rotation on hover, skip ticks while
         the tab is hidden, restart the 5s window after a manual dot click so
         the clicked testimonial stays readable, and arrow-key navigation. */
      var testiTimer = null, testiHover = false;
      function startTestiTimer(){
        if(testiTimer) clearInterval(testiTimer);
        testiTimer = setInterval(function(){ if(!testiHover && !document.hidden) show((ti + 1) % TT.length); }, 5000);
      }
      function resetTestiTimer(){ startTestiTimer(); }
      var tbx = document.getElementById("testi-box");
      if(tbx){
        tbx.addEventListener("mouseenter", function(){ testiHover = true; });
        tbx.addEventListener("mouseleave", function(){ testiHover = false; });
        tbx.setAttribute("tabindex", "0");
        tbx.addEventListener("keydown", function(e){
          if(e.key === "ArrowLeft"){ show((ti + TT.length - 1) % TT.length); resetTestiTimer(); }
          else if(e.key === "ArrowRight"){ show((ti + 1) % TT.length); resetTestiTimer(); }
        });
      }
      startTestiTimer();
    }
    /* mini poll: daily-rotating bank (4 questions, add-only) */
    var po = document.getElementById("poll-mini-opts");
    if(po){
      var POLLS_BANK = [
        { pid: "home-next-tool", q: "\uD83D\uDDF3\uFE0F Which tool should we build next?", opts: ["AI Meme Generator", "Resume Builder", "Video Compressor", "Invoice Pro"] },
        { pid: "home-feature", q: "\uD83D\uDDF3\uFE0F Which feature matters most?", opts: ["Dark OLED theme", "Offline mode", "More languages", "Faster search"] },
        { pid: "home-studio", q: "\uD83D\uDDF3\uFE0F Which new studio would you love?", opts: ["Music Studio", "Podcast Studio", "Game Studio", "3D Avatar Studio"] },
        { pid: "home-usage", q: "\uD83D\uDDF3\uFE0F How do you use US AI most?", opts: ["Free tools", "AI studios", "Articles & guides", "Turkish dramas"] }
      ];
      var _cur = POLLS_BANK[Math.floor(Date.now()/86400000) % POLLS_BANK.length];
      var opts = _cur.opts;
      var pid = _cur.pid;
      var _pq = document.getElementById("poll-mini-q");
      if(_pq) _pq.textContent = _cur.q;
      function draw(){
        var v = {}; try { v = JSON.parse(ls("sawalai_poll_" + pid) || "{}"); } catch(e){}
        var mv = ls("sawalai_myvote_" + pid);
        var total = opts.reduce(function(a,o){ return a + (v[o]||0); }, 0) || 1;
        po.innerHTML = opts.map(function(o){
          if(mv){
            var pct = Math.round((v[o]||0)/total*100);
            return '<div style="font-size:.82rem;margin:5px 0">' + o + ' <b>' + pct + '%</b><div style="background:rgba(255,255,255,.08);border-radius:6px;height:7px"><div style="width:'+pct+'%;height:100%;border-radius:6px;background:linear-gradient(90deg,#a78bfa,#67e8f9)"></div></div></div>';
          }
          return '<button class="btn btn-ghost" data-opt="' + o + '" style="padding:6px 12px;font-size:.8rem">' + o + '</button>';
        }).join("") + (mv ? '<p class="tiny" style="color:#4ade80">✅ Voted: ' + mv + '</p>' : '');
        po.querySelectorAll("[data-opt]").forEach(function(b){
          b.onclick = function(){
            var vv = {}; try { vv = JSON.parse(ls("sawalai_poll_" + pid) || "{}"); } catch(e){}
            var o = b.getAttribute("data-opt");
            vv[o] = (vv[o]||0) + 1;
            ls("sawalai_poll_" + pid, JSON.stringify(vv)); ls("sawalai_myvote_" + pid, o);
            draw();
          };
        });
      }
      draw();
    }
    /* back to top */
    var top = document.getElementById("fa-top");
    if(top) top.onclick = function(){ window.scrollTo({ top: 0, behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth") }); };
  });
})();

/* video showcase: click to play/pause */
(function () {
  document.addEventListener("click", function (e) {
    var v = e.target.closest && e.target.closest(".video-showcase video");
    if (v) { if (v.paused) v.play(); else v.pause(); }
  });
})();

/* Mobile nav tidy: on small screens move theme toggle + language select into
   the hamburger dropdown so the top bar stays one clean row (brand | search |
   account | hamburger). Moving (not cloning) keeps IDs and listeners intact. */
(function () {
  "use strict";
  function tidy() {
    var nav = document.querySelector(".nav");
    var links = document.querySelector(".nav-links");
    var theme = document.getElementById("nav-theme");
    var lang = document.getElementById("nav-lang");
    var search = document.getElementById("nav-search");
    if (!nav || !links || !theme || !lang) return;
    var mobile = window.innerWidth <= 768;
    if (mobile && theme.parentElement === nav) {
      var wrap = document.createElement("div");
      wrap.className = "nav-mobile-tools";
      wrap.id = "nav-mobile-tools";
      var label = document.createElement("span");
      label.textContent = "Theme / Language";
      wrap.appendChild(label);
      wrap.appendChild(theme);
      wrap.appendChild(lang);
      links.appendChild(wrap);
    } else if (!mobile && theme.parentElement !== nav) {
      if (search) { nav.insertBefore(theme, search); nav.insertBefore(lang, search); }
      else { nav.appendChild(theme); nav.appendChild(lang); }
      var w = document.getElementById("nav-mobile-tools");
      if (w && w.parentElement) w.parentElement.removeChild(w);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tidy);
  else tidy();
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(tidy, 200); });
})();

/* ---------- scroll-stop + idle card double-spin ---------- */
/* Perf (invisible): reads/writes batched — one forced reflow total instead of
   one per visible card (was layout-thrashing after every scroll-stop + idle). */
(function () {
  function spinVisible() {
    var cards = document.querySelectorAll(".svc-card");
    if (!cards.length) return;
    var vh = window.innerHeight || 800;
    var vis = [], i, r;
    for (i = 0; i < cards.length; i++) {          /* read phase only */
      r = cards[i].getBoundingClientRect();
      if (r.bottom > 60 && r.top < vh - 60) vis.push(cards[i]);
    }
    if (!vis.length) return;
    for (i = 0; i < vis.length; i++) vis[i].classList.remove("spin2x");
    void document.body.offsetWidth;               /* single batched reflow */
    for (i = 0; i < vis.length; i++) (function (c) {
      c.classList.add("spin2x");
      setTimeout(function () { c.classList.remove("spin2x"); }, 1500);
    })(vis[i]);
  }
  var stopT = null, idleT = null;
  function armIdle() {
    if (idleT) clearInterval(idleT);
    idleT = setInterval(spinVisible, 5000);
  }
  window.addEventListener("scroll", function () {
    if (idleT) { clearInterval(idleT); idleT = null; }
    if (stopT) clearTimeout(stopT);
    stopT = setTimeout(function () { spinVisible(); armIdle(); }, 450);
  }, { passive: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", armIdle);
  else armIdle();
})();

/* ---------- mobile scroll smoothness: pause off-screen animations (no visual change) ---------- */
(function () {
  if (!("IntersectionObserver" in window)) return;
  var SEL = ".svc-card, .sp-float, .showcase-item, .hub-box, .article-card, .vs-vid, .prem-card, .free-card, .trend-card, .cat-card, .msvc, .ticker-track, .marquee-track, .allart-list.ticker, .grad, .anim-title, .badge, .neon-ring, .premium-3d, .shop-banner, .lang-pill, .cat-pills, .community-row, .sub-card, .vs-card, .footer-icon-dock, #sawal-deal, .ent-pill, .tool-card, .sec-icon, .studio-card, .premium-box, .tod-box";
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      var en = entries[i];
      if (en.isIntersecting) en.target.classList.remove("smooth-paused");
      else en.target.classList.add("smooth-paused");
    }
  }, { rootMargin: "120px 0px" });
  function watch() {
    var els = document.querySelectorAll(SEL);
    for (var i = 0; i < els.length; i++) {
      if (!els[i]._smW) { els[i]._smW = 1; io.observe(els[i]); }
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch);
  else watch();
  setInterval(watch, 6000);
})();

/* ---------- Silent auto-refresh (har 2 min — visitor ko mehsoos nahi hota, page reload nahi hota) ---------- */
(function () {
  function fmtCountSync(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function shownCount(el) {
    // textContent may now carry thousand separators — strip non-digits before comparing
    return parseInt(String(el.textContent).replace(/[^0-9]/g, ""), 10) || 0;
  }
  function syncCounts() {
    fetch("/data/live-counts.json?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.counts) return;
        var els = document.querySelectorAll("[data-count]");
        for (var i = 0; i < els.length; i++) {
          var el = els[i];
          var lbl = el.parentElement && el.parentElement.nextElementSibling;
          var key = lbl ? lbl.textContent.trim().toLowerCase() : "";
          var val = d.counts[key];
          if (typeof val !== "number") continue;
          var cur = parseInt(el.getAttribute("data-count"), 10) || 0;
          if (val === cur) continue;
          if (val < cur) continue;   // monotonic guard: stale JSON kabhi sahi count ko neeche nahi gira sakta
          el.setAttribute("data-count", val);
          // agar counter pehle animate ho chuka hai to number khamoshi se badal do (bina dubara animation ke)
          var shown = shownCount(el);
          if (shown === cur) el.textContent = fmtCountSync(val);
        }
      })
      .catch(function () {});
  }
  setInterval(syncCounts, 120000);   // har 2 minute
  setTimeout(syncCounts, 20000);     // pehli sync 20 sec baad

  /* ---------- Success confetti burst (micro-domain: anim-confetti, additive) ----------
     Lightweight DOM-particle celebration fired on SUCCESS moments only (order placed,
     request sent, etc.). One-shot overlay, auto-cleans; no theme/layout change. */
  function confettiBurst(opts) {
    opts = opts || {};
    try {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    } catch (e) {}
    var mobile = false;
    try { mobile = window.matchMedia && window.matchMedia("(max-width: 768px)").matches; } catch (e) {}
    var count = opts.count || (mobile ? 32 : 64);
    var COLORS = ["#f472b6", "#60a5fa", "#34d399", "#facc15", "#a78bfa", "#fb923c", "#4ade80"];
    /* inject keyframes + layer styles once (avoids touching style.css) */
    if (!document.getElementById("sawal-confetti-css")) {
      var st = document.createElement("style");
      st.id = "sawal-confetti-css";
      st.textContent =
        ".sawal-confetti-layer{position:fixed;inset:0;pointer-events:none;z-index:2147483647;overflow:hidden}" +
        ".sawal-confetti-p{position:absolute;top:-14px;border-radius:2px;" +
        "animation-name:sawalConfFall;animation-timing-function:cubic-bezier(.2,.6,.6,1);" +
        "animation-iteration-count:1;animation-fill-mode:forwards}" +
        "@keyframes sawalConfFall{to{transform:translate(var(--cf-dx,0px),calc(100vh + 24px)) rotate(var(--cf-rot,720deg));opacity:.85}}";
      document.head.appendChild(st);
    }
    var layer = document.createElement("div");
    layer.className = "sawal-confetti-layer";
    document.body.appendChild(layer);
    var W = window.innerWidth || 360, x0 = W / 2;
    for (var i = 0; i < count; i++) {
      var p = document.createElement("div");
      p.className = "sawal-confetti-p";
      var sz = 6 + Math.random() * 7;
      p.style.width = sz.toFixed(1) + "px";
      p.style.height = (sz * (0.5 + Math.random() * 0.7)).toFixed(1) + "px";
      p.style.left = (x0 + (Math.random() - 0.5) * W * 0.6).toFixed(1) + "px";
      p.style.background = COLORS[i % COLORS.length];
      if (Math.random() < 0.25) p.style.borderRadius = "50%";
      p.style.setProperty("--cf-dx", ((Math.random() - 0.5) * W * 0.5).toFixed(1) + "px");
      p.style.setProperty("--cf-rot", (360 + Math.random() * 1080).toFixed(0) + "deg");
      p.style.animationDuration = (1.6 + Math.random() * 1.2).toFixed(2) + "s";
      p.style.animationDelay = (Math.random() * 0.25).toFixed(2) + "s";
      layer.appendChild(p);
    }
    setTimeout(function () { if (layer.parentNode) layer.parentNode.removeChild(layer); }, 3200);
  }
  window.SawalConfetti = { burst: confettiBurst };

  /* ---------- SawalAI front-facing toast notifications (ADD-ONLY) ----------
     sawalNotify(msg, type): shows a prominent notification at the top of the
     screen so request results are never missed. type: "ok" | "err" | "info". */
  function sawalNotify(msg, type) {
    type = type || "info";
    try {
      if (!document.getElementById("sawal-notify-css")) {
        var st = document.createElement("style");
        st.id = "sawal-notify-css";
        st.textContent =
          ".sawal-notify{position:fixed;top:14px;left:50%;transform:translate(-50%,-160%);" +
          "z-index:2147483646;max-width:min(92vw,540px);padding:12px 16px 12px 14px;border-radius:14px;" +
          "font-size:.92rem;line-height:1.5;color:#fff;background:rgba(18,18,34,.97);" +
          "border:1px solid rgba(167,139,250,.55);box-shadow:0 12px 44px rgba(0,0,0,.55);" +
          "transition:transform .38s cubic-bezier(.2,.9,.3,1.15);pointer-events:auto;text-align:left}" +
          ".sawal-notify.show{transform:translate(-50%,0)}" +
          ".sawal-notify.ok{border-color:rgba(52,211,153,.75);box-shadow:0 12px 44px rgba(52,211,153,.25)}" +
          ".sawal-notify.err{border-color:rgba(248,113,113,.75);box-shadow:0 12px 44px rgba(248,113,113,.25)}" +
          ".sawal-notify .sn-x{float:right;margin:-4px -6px 0 10px;cursor:pointer;opacity:.65;background:none;" +
          "border:0;color:#fff;font-size:1rem;line-height:1;padding:4px}" +
          ".sawal-notify .sn-x:hover{opacity:1}";
        document.head.appendChild(st);
      }
      var old = document.querySelector(".sawal-notify");
      if (old && old.parentNode) old.parentNode.removeChild(old);
      var box = document.createElement("div");
      box.className = "sawal-notify " + type;
      box.setAttribute("role", "status");
      var x = document.createElement("button");
      x.className = "sn-x"; x.textContent = "✕"; x.setAttribute("aria-label", "Close notification"); x.type = "button";
      x.onclick = function () { if (box.parentNode) box.parentNode.removeChild(box); };
      box.appendChild(x);
      var span = document.createElement("span");
      span.innerHTML = msg;
      box.appendChild(span);
      document.body.appendChild(box);
      var show = function () { box.classList.add("show"); };
      if (window.requestAnimationFrame) { requestAnimationFrame(function () { requestAnimationFrame(show); }); }
      else { setTimeout(show, 30); }
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 8000);
    } catch (e) {}
  }
  window.SawalNotify = sawalNotify;
})();

/* SawalAI page transitions — ADD-ONLY: subtle fade out on internal link click
   + fade in on arrival. Respects prefers-reduced-motion. No visual/theme/layout
   change: only animation timing on navigation. Skips external links, _blank,
   download links, in-page anchors, mailto:/tel:/javascript: links. */
(function () {
  "use strict";
  if (window.__sawalaiPT) return;
  window.__sawalaiPT = true;

  var reduce = false;
  try {
    reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  } catch (e) { reduce = false; }
  if (reduce) return;

  /* Injected styles so no shared CSS file needs editing */
  var css = "@media (prefers-reduced-motion: no-preference){" +
    "html.sawal-pt-out body{animation:sawalPtOut .26s ease-in forwards;}" +
    "html.sawal-pt-in body{animation:sawalPtIn .45s ease-out;}" +
    "@keyframes sawalPtOut{to{opacity:0}}" +
    "@keyframes sawalPtIn{from{opacity:0}to{opacity:1}}}";
  var st = document.createElement("style");
  st.setAttribute("data-sawal-pt", "1");
  st.appendChild(document.createTextNode(css));
  (document.head || document.documentElement).appendChild(st);

  function setFlag(v) {
    try {
      if (v) sessionStorage.setItem("sawalai-pt", "1");
      else sessionStorage.removeItem("sawalai-pt");
    } catch (e) {}
  }
  function getFlag() {
    try { return sessionStorage.getItem("sawalai-pt") === "1"; }
    catch (e) { return false; }
  }

  /* Incoming fade: only when we arrived via our own outgoing transition */
  if (getFlag()) {
    setFlag(false);
    document.documentElement.classList.add("sawal-pt-in");
    setTimeout(function () { document.documentElement.classList.remove("sawal-pt-in"); }, 600);
  }

  /* bfcache / cancelled-navigation safety: never leave the page faded out */
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) document.documentElement.classList.remove("sawal-pt-out", "sawal-pt-in");
  });

  function closestAnchor(el) {
    while (el && el !== document) {
      if (el.tagName && el.tagName.toUpperCase() === "A" && el.hasAttribute("href")) return el;
      el = el.parentNode;
    }
    return null;
  }

  /* Outgoing fade on same-origin link clicks (bubble phase: after any
     anchor-level handlers, so JS-driven links that preventDefault are untouched) */
  document.addEventListener("click", function (ev) {
    if (ev.defaultPrevented || ev.button !== 0) return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
    var a = closestAnchor(ev.target);
    if (!a) return;
    if (a.target === "_blank" || a.hasAttribute("download")) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || href.indexOf("javascript:") === 0) return;
    var url;
    try { url = new URL(href, location.href); } catch (e) { return; }
    if (url.origin !== location.origin) return; /* external */
    if (url.protocol !== "http:" && url.protocol !== "https:") return; /* mailto:, tel:, etc. */
    if (url.pathname === location.pathname && url.search === location.search && url.hash) return; /* in-page anchor */
    ev.preventDefault();
    setFlag(true);
    document.documentElement.classList.add("sawal-pt-out");
    setTimeout(function () { location.href = url.href; }, 240);
  }, false);
})();

/* ===== 10 NEW IDEAS 2026-10-11 (user: "sab add kar do") — all additive ===== */
(function(){
"use strict";

/* --- Idea 2: What's New bell + modal --- */
function initWhatsNew(){
  if (document.getElementById('sawal-bell')) return;
  var nav = document.querySelector('#mainnav, nav');
  if (!nav) return;
  var bell = document.createElement('button');
  bell.id = 'sawal-bell';
  bell.innerHTML = '🔔<span class="sawal-bell-dot" id="sawal-bell-dot"></span>';
  bell.title = "What's New";
  bell.setAttribute('aria-label', "What's New");
  bell.style.cssText = 'position:relative;background:rgba(99,102,241,.12);border:1px solid var(--line);border-radius:50%;width:42px;height:42px;font-size:1.2rem;cursor:pointer;animation:bellRing 3s ease-in-out infinite;';
  var style = document.createElement('style');
  style.textContent = '@keyframes bellRing{0%,100%{transform:rotate(0)}5%{transform:rotate(12deg)}10%{transform:rotate(-10deg)}15%{transform:rotate(6deg)}20%{transform:rotate(0)}}.sawal-bell-dot{position:absolute;top:6px;right:6px;width:10px;height:10px;background:#ef4444;border-radius:50%;animation:blink 1.2s infinite;}#sawal-new-modal{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;}#sawal-new-box{background:var(--card);border:1px solid var(--line);border-radius:18px;max-width:520px;width:100%;max-height:80vh;overflow-y:auto;padding:28px;animation:fadeUp .4s ease;}#sawal-new-box h2{margin-bottom:16px;}#sawal-new-box .new-item{padding:12px;border-bottom:1px solid var(--line);animation:fadeUp .4s ease both;}#sawal-new-box .new-item:last-child{border:none;}@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}';
  document.head.appendChild(style);
  var accountBtn = nav.querySelector('[href*="account"], .account-btn');
  if (accountBtn && accountBtn.parentNode) accountBtn.parentNode.insertBefore(bell, accountBtn);
  else nav.appendChild(bell);
  // hide dot if already seen
  try { if (localStorage.getItem('sawal_new_seen') === '20261011') document.getElementById('sawal-bell-dot').style.display = 'none'; } catch(e){}
  bell.onclick = function(){
    fetch('data/changelog.json').then(function(r){return r.json();}).then(function(d){
      var m = document.createElement('div');
      m.id = 'sawal-new-modal';
      var items = d.updates.map(function(u,i){
        return '<div class="new-item" style="animation-delay:'+(i*0.06)+'s"><strong>'+u.title+'</strong><br><small style="opacity:.7">'+u.date+'</small><p style="margin:6px 0 0">'+u.desc+'</p></div>';
      }).join('');
      m.innerHTML = '<div id="sawal-new-box"><h2>🔔 What\'s New</h2>'+items+'<br><button onclick="document.getElementById(\'sawal-new-modal\').remove();try{localStorage.setItem(\'sawal_new_seen\',\'20261011\');document.getElementById(\'sawal-bell-dot\').style.display=\'none\';}catch(e){}" style="background:linear-gradient(135deg,#6366f1,#a78bfa);color:#fff;border:none;border-radius:10px;padding:12px 28px;font-weight:700;cursor:pointer;width:100%">Got it!</button></div>';
      m.onclick = function(e){ if (e.target === m) m.remove(); };
      document.body.appendChild(m);
    }).catch(function(){
      alert("What's New: Check back soon for updates!");
    });
  };
}

/* --- Idea 3: Wishlist hearts --- */
function initWishlist(){
  function getW(){ try { return JSON.parse(localStorage.getItem('sawal_wishlist')||'[]'); } catch(e){ return []; } }
  function setW(w){ try { localStorage.setItem('sawal_wishlist', JSON.stringify(w)); } catch(e){} }
  // Add hearts to product cards
  document.querySelectorAll('.svc-card, .shop-card, .sub-card').forEach(function(card){
    if (card.querySelector('.wish-heart-btn')) return;
    var name = card.querySelector('h3, .svc-name, .card-title');
    if (!name) return;
    var btn = document.createElement('button');
    btn.className = 'wish-heart-btn';
    btn.innerHTML = '🤍';
    btn.title = 'Add to wishlist';
    btn.style.cssText = 'position:absolute;top:10px;right:10px;background:rgba(0,0,0,.4);border:none;border-radius:50%;width:36px;height:36px;font-size:1.2rem;cursor:pointer;z-index:5;transition:transform .2s;';
    btn.onmouseover = function(){ btn.style.transform = 'scale(1.2)'; };
    btn.onmouseout = function(){ btn.style.transform = 'scale(1)'; };
    var cardId = (name.textContent||'').trim().substring(0,30);
    var w = getW();
    if (w.some(function(x){ return x.id === cardId; })) btn.innerHTML = '❤️';
    btn.onclick = function(e){
      e.preventDefault(); e.stopPropagation();
      var w2 = getW();
      var idx = w2.findIndex(function(x){ return x.id === cardId; });
      if (idx >= 0) { w2.splice(idx,1); btn.innerHTML = '🤍'; }
      else {
        var priceEl = card.querySelector('.price, .svc-price, .amount');
        w2.push({ id: cardId, name: name.textContent.trim(), price: priceEl ? priceEl.textContent.trim().substring(0,20) : '', icon: '📦', link: location.pathname });
        btn.innerHTML = '❤️';
        btn.style.animation = 'heartPop .4s ease';
      }
      setW(w2);
    };
    if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
    card.appendChild(btn);
  });
  // Add wishlist link to nav
  var nav = document.querySelector('#mainnav, nav');
  if (nav && !document.getElementById('sawal-wish-link')) {
    var w = getW();
    var a = document.createElement('a');
    a.id = 'sawal-wish-link';
    a.href = 'wishlist.html';
    a.innerHTML = '♡' + (w.length ? ' <span style="background:#ef4444;border-radius:10px;padding:1px 7px;font-size:.7rem;">'+w.length+'</span>' : '');
    a.style.cssText = 'font-size:1.3rem;text-decoration:none;margin:0 6px;';
    a.title = 'My Wishlist';
    nav.appendChild(a);
  }
}

/* --- Idea 6: Daily streak --- */
function initStreak(){
  try {
    var today = new Date().toISOString().split('T')[0];
    var data = JSON.parse(localStorage.getItem('sawal_streak') || '{"count":0,"last":""}');
    if (data.last !== today) {
      var yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      data.count = (data.last === yesterday) ? data.count + 1 : 1;
      data.last = today;
      localStorage.setItem('sawal_streak', JSON.stringify(data));
    }
    // Show on account page
    if (location.pathname.includes('account.html')) {
      var el = document.querySelector('.account-stats, #account-info');
      if (el && !document.getElementById('sawal-streak-badge')) {
        var d = document.createElement('div');
        d.id = 'sawal-streak-badge';
        d.style.cssText = 'background:linear-gradient(135deg,#f59e0b,#ef4444);border-radius:14px;padding:16px;margin:12px 0;text-align:center;color:#fff;animation:fadeUp .5s ease;';
        var badges = '';
        if (data.count >= 7) badges += '🏆 ';
        if (data.count >= 3) badges += '⭐ ';
        badges += '🔥';
        d.innerHTML = '<div style="font-size:2rem">'+badges+'</div><strong>'+data.count+'-day streak!</strong><br><small>Visit daily to keep it going</small>';
        el.parentNode.insertBefore(d, el.nextSibling);
      }
    }
  } catch(e){}
}

/* --- Idea 7: Instant search overlay --- */
function initInstantSearch(){
  if (document.getElementById('sawal-search-overlay')) return;
  var style = document.createElement('style');
  style.textContent = '#sawal-search-overlay{position:fixed;inset:0;background:rgba(5,8,20,.96);z-index:99998;display:none;flex-direction:column;align-items:center;padding:60px 20px 20px;}#sawal-search-overlay.open{display:flex;}#sawal-search-input{width:100%;max-width:600px;background:var(--card);border:2px solid #a78bfa;border-radius:16px;padding:18px 24px;font-size:1.2rem;color:var(--text);outline:none;}#sawal-search-results{width:100%;max-width:600px;margin-top:20px;overflow-y:auto;max-height:60vh;}.sawal-sr-item{display:block;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 18px;margin-bottom:10px;text-decoration:none;color:var(--text);animation:fadeUp .3s ease both;}.sawal-sr-item:hover{border-color:#a78bfa;transform:translateX(4px);}.sawal-sr-cat{font-size:.75rem;opacity:.6;text-transform:uppercase;letter-spacing:.05em;}';
  document.head.appendChild(style);
  var ov = document.createElement('div');
  ov.id = 'sawal-search-overlay';
  ov.innerHTML = '<input id="sawal-search-input" placeholder="🔍 Search tools, articles, services... (ESC to close)" autocomplete="off"><div id="sawal-search-results"></div>';
  document.body.appendChild(ov);
  var input = document.getElementById('sawal-search-input');
  var results = document.getElementById('sawal-search-results');
  // Trigger: Ctrl+K or search icon
  document.addEventListener('keydown', function(e){
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); ov.classList.add('open'); input.focus(); }
    if (e.key === 'Escape') ov.classList.remove('open');
  });
  ov.onclick = function(e){ if (e.target === ov) ov.classList.remove('open'); };
  var searchIdx = null;
  input.addEventListener('input', function(){
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) { results.innerHTML = ''; return; }
    // Search tools
    var html = '';
    if (typeof TOOLS !== 'undefined') {
      var matches = TOOLS.filter(function(t){ return (t.name+' '+(t.desc||'')).toLowerCase().includes(q); }).slice(0,8);
      matches.forEach(function(t,i){
        html += '<a class="sawal-sr-item" style="animation-delay:'+(i*0.04)+'s" href="tools.html#'+t.id+'"><span class="sawal-sr-cat">🛠️ Tool</span><br><strong>'+t.name+'</strong><br><small style="opacity:.7">'+(t.desc||'').substring(0,80)+'</small></a>';
      });
    }
    // Search pages
    var pages = [
      { n: 'AI Chat', u: 'ai-chat.html', d: 'Chat with AI' },
      { n: 'RDP Plans', u: 'rdp.html', d: 'Remote desktops' },
      { n: 'Proxies', u: 'proxies.html', d: 'Proxy servers' },
      { n: 'Product Quiz', u: 'quiz.html', d: 'Find your plan' },
      { n: 'Explore All', u: 'explore.html', d: 'Site directory' },
      { n: 'Live Scores', u: 'live-scores.html', d: 'Sports scores' },
      { n: 'Drama Trailers', u: 'trailers.html', d: 'Turkish dramas' },
      { n: 'House Plans (Naksha)', u: 'naksha.html', d: 'Home designs and floor plans' },
      { n: 'Student Discounts', u: 'student-discounts.html', d: 'Student plans and free student perks' }
    ];
    pages.filter(function(p){ return (p.n+' '+p.d).toLowerCase().includes(q); }).slice(0,5).forEach(function(p,i){
      html += '<a class="sawal-sr-item" style="animation-delay:'+(i*0.04)+'s" href="'+p.u+'"><span class="sawal-sr-cat">📄 Page</span><br><strong>'+p.n+'</strong><br><small style="opacity:.7">'+p.d+'</small></a>';
    });
    results.innerHTML = html || '<p style="text-align:center;opacity:.6;padding:20px">No results for "'+q+'"</p>';
  });
}

/* --- Idea 8: Deal of the hour --- */
/* REMOVED 2026-10-13 per user order — deal box disabled */
function initDealCountdown(){
  return; /* disabled */
  if (!location.pathname.endsWith('index.html') && location.pathname !== '/') return;
  if (document.getElementById('sawal-deal')) return;
  var hero = document.querySelector('.hero, #hero, main');
  if (!hero) return;
  var deals = [
    { icon: '🌐', name: 'Datacenter Proxy', price: '$1.79/mo', link: 'proxies.html' },
    { icon: '🖥️', name: 'RDP 4GB', price: '$1.43/mo', link: 'rdp.html' },
    { icon: '⚡', name: 'HTTP ISP Proxy', price: '$7.14/mo', link: 'proxies.html' }
  ];
  var deal = deals[new Date().getHours() % deals.length];
  var d = document.createElement('div');
  d.id = 'sawal-deal';
  d.style.cssText = 'max-width:220px;margin:12px auto;background:linear-gradient(135deg,rgba(239,68,68,.14),rgba(99,102,241,.14));border:2px solid #ef4444;border-radius:12px;padding:8px;text-align:center;perspective:600px;';
  var style = document.createElement('style');
  style.textContent = '@keyframes dealFlip3d{0%,100%{transform:rotateY(-8deg)}50%{transform:rotateY(8deg)}}#sawal-deal-inner{animation:dealFlip3d 4s ease-in-out infinite;transform-style:preserve-3d;}#sawal-deal-timer{font-size:1.3rem;font-weight:800;color:#ef4444;font-variant-numeric:tabular-nums;}';
  document.head.appendChild(style);
  d.innerHTML = '<div id="sawal-deal-inner">' +
    '<div style="font-size:.62rem;font-weight:700;color:#ef4444;letter-spacing:.1em;">⏰ DEAL OF THE HOUR</div>' +
    '<div style="font-size:.6rem;color:#6b7280;">🔄 New deal every hour</div>' +
    '<div style="font-size:1.3rem;margin:4px 0">'+deal.icon+'</div>' +
    '<h3 style="margin:0;font-size:.85rem;">'+deal.name+' — '+deal.price+'</h3>' +
    '<div style="font-size:.6rem;color:#6b7280;">Ends in:</div>' +
    '<div id="sawal-deal-timer">--:--:--</div>' +
    '<a href="'+deal.link+'"><button style="background:linear-gradient(135deg,#ef4444,#f59e0b);color:#fff;border:none;border-radius:8px;padding:6px 18px;font-weight:700;cursor:pointer;margin-top:6px;font-size:.75rem;">Claim This Deal →</button></a>' +
    '</div>';
  var svc = document.getElementById('services');
  if (svc && svc.parentNode) { svc.parentNode.insertBefore(d, svc); }
  else { hero.parentNode.insertBefore(d, hero.nextSibling); }
/* perf: skip 1s DOM writes while the deal card is off-screen (additive, no visual change) */
  var dealVisible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { dealVisible = e[0].isIntersecting; }, { rootMargin: "100px 0px" }).observe(d);
  }
  function tick(){
    if (document.hidden || !dealVisible) return; /* perf: skip 1s DOM writes while tab hidden or card off-screen */
    var now = new Date();
    var end = new Date(now); end.setMinutes(59,59,999);
    var diff = end - now;
    var h = Math.floor(diff/3600000), m = Math.floor(diff%3600000/60000), s = Math.floor(diff%60000/1000);
    var t = document.getElementById('sawal-deal-timer');
    if (t) t.textContent = String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
  }
  tick(); setInterval(tick, 1000);
}

/* --- Idea 9: Guided tour --- */
/* --- Deal corners on every service box (user order 2026-10-11): small per-box badge --- */
function initDealCorners(){
  var grid = document.querySelector('.services-grid');
  if (!grid || grid.querySelector('.deal-corner')) return;
  var deals = {
    'proxies.html':'🔥 -7%','rdp.html':'🔥 -10%','laptops.html':'🔥 -12%','mobiles.html':'🔥 -12%',
    'numbers.html':'🔥 -5%','books.html':'🔥 -15%','movies.html':'🔥 -10%','recipes.html':'🔥 -8%',
    'jokes.html':'🔥 -5%','builder.html':'🔥 -8%','halloween.html':'🎃 -20%','black-friday.html':'🔥 -25%',
    'bundles.html':'🔥 -18%'
  };
  var free = ['ai-chat.html','picture-studio.html','video-studio.html','articles.html','trailers.html','temp-box.html','apps.html','live-scores.html','generators.html','drama-shorts.html','tools.html','quiz.html'];
  grid.querySelectorAll('.svc-card').forEach(function(card){
    if (card.querySelector('.deal-corner')) return;
    var href = card.getAttribute('href') || '';
    var txt = '🔥 DEAL', k, i;
    for (k in deals){ if (href.indexOf(k) > -1){ txt = deals[k]; break; } }
    if (txt === '🔥 DEAL'){
      for (i=0;i<free.length;i++){ if (href.indexOf(free[i]) > -1){ txt = '✨ FREE'; break; } }
    }
    var d = document.createElement('div');
    d.className = 'deal-corner'; d.title = 'Special deal'; d.textContent = txt;
    if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
    card.insertBefore(d, card.firstChild);
  });
}

/* --- subtle side ambient glows on mobile (user order 2026-10-12) --- */
function initMobileSideGlow(){
  if (window.innerWidth > 768) return;
  if (document.querySelector('.m-side-glow')) return;
  var l = document.createElement('div'); l.className = 'm-side-glow l'; l.setAttribute('aria-hidden','true');
  var r = document.createElement('div'); r.className = 'm-side-glow r'; r.setAttribute('aria-hidden','true');
  document.body.appendChild(l); document.body.appendChild(r);
}
function initGuidedTour(){
  try { if (localStorage.getItem('sawal_tour_done')) return; } catch(e){ return; }
  if (!location.pathname.endsWith('index.html') && location.pathname !== '/') return;
  // Only show after 2s, only once
  setTimeout(function(){
    try { if (localStorage.getItem('sawal_tour_done')) return; } catch(e){ return; }
    var steps = [
      { el: '#mainnav', text: '👋 Welcome to US AI! This is your navigation — explore tools, services & more.' },
      { el: '#top-widgets', text: '🌤️ Quick widgets — weather, speed, clock at a glance. Tap to expand!' },
      { el: '.hero', text: '🤖 Start here — ask AI anything or explore our services below.' }
    ];
    var idx = 0;
    var overlay = document.createElement('div');
    overlay.id = 'sawal-tour';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:99997;display:flex;align-items:flex-end;justify-content:center;padding:20px;';
    function showStep(){
      if (idx >= steps.length) { overlay.remove(); try{localStorage.setItem('sawal_tour_done','1');}catch(e){} return; }
      var s = steps[idx];
      var target = document.querySelector(s.el);
      if (target) target.scrollIntoView({behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth"), block:'center'});
      overlay.innerHTML = '<div style="background:var(--card);border:2px solid #a78bfa;border-radius:18px;padding:24px;max-width:440px;width:100%;animation:fadeUp .4s ease;">' +
        '<p style="font-size:1.05rem;line-height:1.6">'+s.text+'</p>' +
        '<div style="display:flex;gap:10px;margin-top:16px;">' +
        '<button id="sawal-tour-next" style="flex:1;background:linear-gradient(135deg,#6366f1,#a78bfa);color:#fff;border:none;border-radius:10px;padding:12px;font-weight:700;cursor:pointer;">'+(idx===steps.length-1?'Finish 🎉':'Next →')+'</button>' +
        '<button id="sawal-tour-skip" style="background:rgba(99,102,241,.15);color:var(--text);border:1px solid var(--line);border-radius:10px;padding:12px 20px;cursor:pointer;">Skip</button>' +
        '</div><div style="text-align:center;margin-top:10px;opacity:.6;font-size:.85rem">'+(idx+1)+' of '+steps.length+'</div></div>';
      document.getElementById('sawal-tour-next').onclick = function(){ idx++; showStep(); };
      document.getElementById('sawal-tour-skip').onclick = function(){ overlay.remove(); try{localStorage.setItem('sawal_tour_done','1');}catch(e){} };
    }
    document.body.appendChild(overlay);
    showStep();
  }, 2500);
}

/* --- Idea 4: PDF invoice (purchases page) --- */
function initPdfInvoice(){
  if (!location.pathname.includes('purchases.html')) return;
  // Add jsPDF
  var s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  document.head.appendChild(s);
  // Observer to add buttons to order cards
  var obs = new MutationObserver(function(){
    document.querySelectorAll('.order-card, .purchase-item').forEach(function(card){
      if (card.querySelector('.invoice-btn')) return;
      var btn = document.createElement('button');
      btn.className = 'invoice-btn';
      btn.textContent = '🧾 Invoice';
      btn.style.cssText = 'background:rgba(99,102,241,.15);border:1px solid var(--line);border-radius:8px;padding:8px 16px;cursor:pointer;margin-top:8px;';
      btn.onclick = function(){
        if (typeof window.jspdf === 'undefined') { alert('Loading PDF library... try again in a moment.'); return; }
        var doc = new window.jspdf.jsPDF();
        doc.setFontSize(20); doc.text('US AI — Invoice', 20, 20);
        doc.setFontSize(11);
        doc.text('Date: ' + new Date().toLocaleDateString(), 20, 32);
        doc.text('Order details:', 20, 44);
        var txt = card.innerText.substring(0, 500).split('\n').slice(0, 12);
        txt.forEach(function(line, i){ doc.text(line.substring(0,80), 20, 56 + i*8); });
        doc.text('Thank you for shopping with US AI!', 20, 56 + txt.length*8 + 12);
        doc.save('usai-invoice.pdf');
      };
      card.appendChild(btn);
    });
  });
  obs.observe(document.body, { childList: true, subtree: true });
}

// Init all on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function(){
    initWhatsNew(); initWishlist(); initStreak(); initInstantSearch(); initDealCountdown(); initDealCorners(); initMobileSideGlow(); initGuidedTour(); initPdfInvoice();
  });
} else {
  initWhatsNew(); initWishlist(); initStreak(); initInstantSearch(); initDealCountdown(); initDealCorners(); initMobileSideGlow(); initGuidedTour(); initPdfInvoice();
}
})();

/* --- Idea 5: Starter Packs populate --- */
(function(){
  function initPacks(){
    var grid = document.getElementById('packs-grid');
    if (!grid || grid.children.length) return;
    var packs = [
      { icon: '🎓', title: 'Student Pack', desc: 'Essays, citations, GPA calc, flashcards & more for acing school.', tools: ['word-counter','gpa-calculator','citation-generator'] },
      { icon: '💼', title: 'Freelancer Pack', desc: 'Invoices, time tracking, rate calc & contracts — get paid right.', tools: ['invoice-generator','hourly-rate-calculator'] },
      { icon: '🎨', title: 'Creator Pack', desc: 'Hashtags, color palettes, video ideas & thumbnails that pop.', tools: ['hashtag-generator','color-palette'] }
    ];
    packs.forEach(function(p, i){
      var d = document.createElement('div');
      d.style.cssText = 'background:var(--card);border:1px solid var(--line);border-radius:16px;padding:22px;text-align:center;animation:fadeUp .5s ease both;animation-delay:'+(i*0.1)+'s;transition:transform .2s;';
      d.onmouseover = function(){ d.style.transform = 'translateY(-4px)'; d.style.borderColor = '#a78bfa'; };
      d.onmouseout = function(){ d.style.transform = 'none'; };
      d.innerHTML = '<div style="font-size:2.5rem;animation:exFloat 3s ease-in-out infinite;">'+p.icon+'</div>' +
        '<h3 style="margin:10px 0 8px;">'+p.title+'</h3><p style="opacity:.75;font-size:.9rem;">'+p.desc+'</p>' +
        '<button onclick="document.getElementById(\'tool-search\').scrollIntoView({behavior:\'smooth\'})" style="background:linear-gradient(135deg,#6366f1,#a78bfa);color:#fff;border:none;border-radius:10px;padding:10px 24px;font-weight:700;cursor:pointer;margin-top:8px;">Explore Pack →</button>';
      grid.appendChild(d);
    });
    if (!document.getElementById('pack-anim-style')) {
      var st = document.createElement('style');
      st.id = 'pack-anim-style';
      st.textContent = '@keyframes exFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}';
      document.head.appendChild(st);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPacks);
  else initPacks();
})();

/* --- Recently Viewed strip (thinker-home idea #6, device-local) --- */
(function(){
  var KEY = 'usai_recently_viewed';
  function getList(){
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; }
  }
  function saveList(list){
    try { localStorage.setItem(KEY, JSON.stringify(list.slice(0,8))); } catch(e){}
  }
  function track(){
    var path = location.pathname.split('/').pop() || 'index.html';
    if (path === '' ) path = 'index.html';
    var title = (document.title || path).replace(/\s*[-|–]\s*US AI\s*$/i,'').trim() || path;
    var list = getList().filter(function(i){ return i.url !== path; });
    list.unshift({ url: path, title: title, ts: Date.now(), icon: pageIcon(path) });
    saveList(list);
  }
  /* P1: per-page icon mapping (additive, think-637) — URL keyword se emoji, display-only */
  function pageIcon(path){
    var p = String(path || '').toLowerCase();
    if (p.indexOf('ai-chat') !== -1) return '🤖';
    if (p.indexOf('ai-services') !== -1 || p.indexOf('services') !== -1) return '⚙️';
    if (p.indexOf('trailer') !== -1) return '🎬';
    if (p.indexOf('drama') !== -1) return '🎭';
    if (p.indexOf('short') !== -1) return '📱';
    if (p.indexOf('article') !== -1) return '📰';
    if (p.indexOf('news') !== -1) return '📰';
    if (p.indexOf('numbers') !== -1) return '📱';
    if (p.indexOf('temp-box') !== -1) return '📧';
    if (p.indexOf('rdp') !== -1 || p.indexOf('vps') !== -1 || p.indexOf('proxy') !== -1 || p.indexOf('proxies') !== -1) return '🖥️';
    if (p.indexOf('store') !== -1 || p.indexOf('shop') !== -1) return '🛍️';
    if (p.indexOf('live-scores') !== -1) return '🏆';
    if (p.indexOf('sport') !== -1) return '⚽';
    if (p.indexOf('picture') !== -1 || p.indexOf('picture-studio') !== -1) return '🎨';
    if (p.indexOf('video') !== -1) return '🎥';
    if (p.indexOf('book') !== -1 || p.indexOf('ebook') !== -1) return '📚';
    if (p.indexOf('movie') !== -1) return '🍿';
    if (p.indexOf('quiz') !== -1) return '🧠';
    if (p.indexOf('wallpaper') !== -1) return '🖼️';
    if (p.indexOf('flight') !== -1) return '✈️';
    if (p.indexOf('game') !== -1) return '🎮';
    if (p.indexOf('weather') !== -1) return '🌤️';
    if (p.indexOf('health') !== -1 || p.indexOf('fitness') !== -1) return '💪';
    if (p.indexOf('recipe') !== -1) return '🍳';
    if (p.indexOf('music') !== -1) return '🎵';
    if (p.indexOf('calculator') !== -1) return '🧮';
    if (p.indexOf('tool') !== -1) return '🧰';
    if (p.indexOf('chat') !== -1) return '💬';
    return '📄';
  }
  function timeAgo(ts){
    if (!ts || isNaN(ts)) return '';
    var s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return 'just now';
    var m = Math.floor(s / 60);
    if (m < 60) return m + 'm ago';
    var h = Math.floor(m / 60);
    if (h < 24) return h + 'h ago';
    var d = Math.floor(h / 24);
    if (d === 1) return 'yesterday';
    if (d < 7) return d + 'd ago';
    return Math.floor(d / 7) + 'w ago';
  }
  function addClearBtn(sec){
    if (document.getElementById('rv-clear')) return;
    var head = sec.querySelector('.sec-head');
    if (!head) return;
    var btn = document.createElement('button');
    btn.id = 'rv-clear';
    btn.type = 'button';
    btn.textContent = '🗑 Clear history';
    btn.style.cssText = 'background:none;border:1px solid var(--line);border-radius:8px;color:inherit;opacity:.7;font-size:.75rem;padding:4px 10px;cursor:pointer;margin-top:6px;';
    btn.onclick = function(){ saveList([]); render(); };
    head.appendChild(btn);
  }
  function render(){
    var sec = document.getElementById('recently-viewed');
    var box = document.getElementById('rv-list');
    if (!sec || !box) return;
    addClearBtn(sec);
    var list = getList().filter(function(i){ return i.url !== (location.pathname.split('/').pop() || 'index.html'); });
    if (!list.length) {
      sec.style.display = '';
      box.innerHTML = '<div class="card" style="padding:14px 18px"><div class="tx"><b>\U0001F4ED Nothing here yet</b><span>Pages you visit will appear here. Start with \u2B50 <a href="#tool-of-day" style="color:#c4b5fd">Tool of the Day</a> or \uD83D\uDD25 <a href="#trending-tools" style="color:#c4b5fd">Trending Tools</a>.</span></div></div>';
      return;
    }
    sec.style.display = '';
    box.innerHTML = '';
    list.forEach(function(item, idx){
      var a = document.createElement('a');
      a.href = item.url;
      a.className = 'rv-card';
      a.style.cssText = 'flex:0 0 auto;min-width:150px;max-width:200px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px;text-decoration:none;color:inherit;animation:rvFloat 4s ease-in-out infinite;animation-delay:'+(idx*0.3)+'s;transition:transform .2s,border-color .2s;';
      a.onmouseover = function(){ a.style.transform='translateY(-3px)'; a.style.borderColor='#a78bfa'; };
      a.onmouseout = function(){ a.style.transform=''; };
      var short = item.title.length > 42 ? item.title.slice(0,42)+'…' : item.title;
      var ago = timeAgo(item.ts);
      var sub = ago ? ago + ' · Tap to revisit →' : 'Tap to revisit →';
      var icon = item.icon || pageIcon(item.url) || '📄';
      a.innerHTML = '<div style="font-size:1.4rem;">'+icon+'</div><div style="font-weight:600;font-size:.85rem;margin-top:6px;line-height:1.3;">'+short.replace(/</g,'&lt;')+'</div><div class="tiny" style="opacity:.6;margin-top:4px;">'+sub+'</div>';
      box.appendChild(a);
    });
    if (!document.getElementById('rv-anim-style')){
      var st = document.createElement('style');
      st.id = 'rv-anim-style';
      st.textContent = '@keyframes rvFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}';
      document.head.appendChild(st);
    }
  }
  track();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();

/* Thinker-home #4 2026-10-12: premiere countdown — shorts drop har 10 min (honest, cron cadence) */
(function(){
  function pad(n){return (n<10?"0":"")+n;}
  /* perf: skip 1s DOM writes while tab hidden or countdown off-screen (additive, no visual change) */
  var pcVisible = true, pcEl = null, pcWatched = false;
  function tick(){
    if (document.hidden) return;
    var el = pcEl || (pcEl = document.getElementById("premiere-countdown"));
    if(!el)return;
    if (!pcWatched && "IntersectionObserver" in window) {
      pcWatched = true;
      new IntersectionObserver(function (e) { pcVisible = e[0].isIntersecting; }, { rootMargin: "100px 0px" }).observe(el);
    }
    if (!pcVisible) return;
    var now=new Date();
    var mins=now.getMinutes(), secs=now.getSeconds();
    var toNext=60-secs; if(toNext<=0)toNext=60;
    if(toNext<15){
      el.textContent="🆕 Fresh drop — watch now";
      el.classList.add("fresh");
      el.title="New shorts just dropped — open Trailers";
    }else{
      var m=Math.floor(toNext/60), s=toNext%60;
      el.textContent="⏳ Next shorts drop in "+pad(m)+":"+pad(s);
      el.classList.remove("fresh");
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){tick();setInterval(tick,1000);});
  else{tick();setInterval(tick,1000);}
})();

/* Thinker-home #9 2026-10-12: continue reading — article scroll position device-local save + homepage strip */
(function(){
  var KEY="sawal_continue_v1";
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||"{}");}catch(e){return{};}}
  function save(d){try{localStorage.setItem(KEY,JSON.stringify(d));}catch(e){}}
  var path=location.pathname.split("/").pop()||"index.html";
  var isArticle=/^article-.*\.html$/.test(path);
  if(isArticle){
    var title=(document.querySelector("h1")||{}).textContent||path;
    var t=null;
    function record(){
      var h=document.documentElement;
      var max=h.scrollHeight-h.clientHeight;
      if(max<=0)return;
      var pct=Math.round((h.scrollTop/max)*100);
      var d=load();
      if(pct>=95){delete d[path];}
      else if(pct>=10){d[path]={t:title.trim().slice(0,80),p:pct,ts:Date.now()};}
      save(d);
    }
    window.addEventListener("scroll",function(){clearTimeout(t);t=setTimeout(record,800);},{passive:true});
    /* restore: ?cont=1 ke saath aaye to saved position par jump */
    if(/[\?&]cont=1/.test(location.search)){
      var d=load()[path];
      if(d&&d.p>10){setTimeout(function(){var h=document.documentElement;var max=h.scrollHeight-h.clientHeight;window.scrollTo(0,Math.round(max*d.p/100));},600);}
    }
  }else{
    /* homepage strip render */
    var strip=document.getElementById("continue-strip"),list=document.getElementById("continue-list");
    if(!strip||!list)return;
    var d=load(),keys=Object.keys(d).sort(function(a,b){return d[b].ts-d[a].ts;}).slice(0,8);
    if(!keys.length)return;
    list.innerHTML=keys.map(function(k){
      var it=d[k];
      var href=k+"?cont=1";
      return '<a class="continue-card" href="'+href+'"><b>'+it.t.replace(/</g,"&lt;")+'</b><div class="continue-bar"><i style="width:'+it.p+'%"></i></div><small>'+it.p+'% read — continue where you left off →</small></a>';
    }).join("");
    strip.hidden=false;
  }
})();

/* Thinker-home #1 2026-10-12: Surprise Me — random discovery (articles/tools/trailers, weighted, client-side) */
(function(){
  var btn=document.getElementById("surprise-me");
  if(!btn)return;
  var TOOL_PICKS=["tools.html#poetry","tools.html#speed","tools.html#qr","tools.html#password","tools.html#bmi","tools.html#age","tools.html#typing-test","tools.html#unit","tools.html#pomodoro","tools.html#dice"];
  btn.addEventListener("click",function(){
    var r=Math.random(),url=null;
    if(r<0.6&&(typeof ARTICLES_INDEX!=="undefined")&&ARTICLES_INDEX.length){
      var a=ARTICLES_INDEX[Math.floor(Math.random()*ARTICLES_INDEX.length)];
      url=a[1]||a.url;
    }else if(r<0.85){
      url=TOOL_PICKS[Math.floor(Math.random()*TOOL_PICKS.length)];
    }else{
      url="trailers.html";
    }
    if(url){btn.textContent="🎲 Taking you somewhere fun…";location.href=url;}
  });
})();

/* Thinker-home #3 2026-10-12: Fresh badge — document.lastModified se honest "updated X min ago" */
(function(){
  var b=document.getElementById("fresh-badge");
  if(!b)return;
  try{
    var d=new Date(document.lastModified),now=new Date();
    if(isNaN(d.getTime()))return;
    var mins=Math.max(0,Math.round((now-d)/60000));
    var txt=mins<2?"📡 Updated just now":mins<60?"📡 Updated "+mins+" min ago":"📡 Updated "+Math.floor(mins/60)+"h "+(mins%60)+"m ago";
    b.textContent=txt;b.hidden=false;
  }catch(e){}
})();
