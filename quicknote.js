/* US AI Quick Note FAB: floating mini-notepad, syncs with tools.html#notepad via shared localStorage key. */
(function () {
  "use strict";
  var fab = document.getElementById("quicknote-fab");
  if (!fab) return;
  var KEY = "sawalai_notepad";

  // build popup
  var pop = document.createElement("div");
  pop.id = "qn-popup";
  pop.hidden = true;
  pop.innerHTML = '<div class="qn-head"><b>📝 Quick Note</b><button class="qn-x" aria-label="Close">✕</button></div>' +
    '<textarea id="qn-text" aria-label="Quick note text" placeholder="Jot it down…"></textarea>' +
    '<div class="qn-foot"><span class="qn-count" id="qn-count">0 words</span>' +
    '<a href="tools.html#notepad" class="qn-open">⤢ Open full notepad</a></div>';
  document.body.appendChild(pop);
  var ta = pop.querySelector("#qn-text");
  var cnt = pop.querySelector("#qn-count");
  var xBtn = pop.querySelector(".qn-x");

  function words(s) { s = (s || "").trim(); return s ? s.split(/\s+/).length : 0; }
  function load() {
    try { ta.value = localStorage.getItem(KEY) || ""; } catch (e) {}
    cnt.textContent = words(ta.value) + " words";
    fab.classList.toggle("qn-has", !!ta.value.trim());
  }
  function save() {
    try { localStorage.setItem(KEY, ta.value); } catch (e) {}
    cnt.textContent = words(ta.value) + " words";
    fab.classList.toggle("qn-has", !!ta.value.trim());
  }
  var t = null;
  ta.addEventListener("input", function () {
    clearTimeout(t);
    t = setTimeout(save, 300);
    cnt.textContent = words(ta.value) + " words";
  });
  function toggle(show) {
    var willShow = show !== undefined ? show : pop.hidden;
    pop.hidden = !willShow;
    if (willShow) { load(); setTimeout(function () { ta.focus(); }, 50); }
    else save();
  }
  fab.addEventListener("click", function (e) { e.stopPropagation(); toggle(); });
  xBtn.addEventListener("click", function () { toggle(false); });
  document.addEventListener("click", function (e) {
    if (!pop.hidden && !pop.contains(e.target) && e.target !== fab) toggle(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !pop.hidden) toggle(false);
  });
  load();
})();
