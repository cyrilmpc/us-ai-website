/* Scroll-progress Back-to-top FAB — SVG ring fills with scroll fraction, fades in after one viewport, smooth scroll to top. */
(function () {
  "use strict";
  var btn = document.getElementById("back-top");
  if (!btn) return;
  var ring = btn.querySelector(".bt-ring-fg");
  var CIRC = 2 * Math.PI * 15.5; /* r=15.5 */
  var ticking = false;

  function update() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var y = window.scrollY || window.pageYOffset || 0;
    var frac = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    if (ring) ring.style.strokeDashoffset = String(CIRC * (1 - frac));
    if (y > window.innerHeight * 0.9) {
      btn.hidden = false;
      requestAnimationFrame(function () { btn.classList.add("bt-show"); });
    } else {
      btn.classList.remove("bt-show");
      setTimeout(function () { if (!btn.classList.contains("bt-show")) btn.hidden = true; }, 250);
    }
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: (window.sawalScrollBehavior ? window.sawalScrollBehavior() : "smooth") });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
