/* US AI Digital Tasbih Counter (FAB). Device-local dhikr counter.
   Tap = +1, goal-label tap cycles 33/100/1000, long-press (600ms) = reset.
   Count persists in localStorage. Vibration where supported. */
(function () {
  "use strict";
  var btn = document.getElementById("tasbih-fab");
  if (!btn) return;
  var countEl = document.getElementById("tasbih-count");
  var goalEl = document.getElementById("tasbih-goal");
  var ringFg = document.getElementById("tasbih-ring-fg");
  var LS_KEY = "sawal_tasbih";
  var GOALS = [33, 100, 1000];
  var CIRC = 97.4;

  var state = { count: 0, goalIdx: 0 };
  try {
    var s = JSON.parse(localStorage.getItem(LS_KEY) || "null");
    if (s && isFinite(s.count) && isFinite(s.goalIdx)) {
      state.count = Math.max(0, Math.floor(s.count));
      state.goalIdx = GOALS.indexOf(GOALS[s.goalIdx] !== undefined ? GOALS[s.goalIdx] : 33);
      if (state.goalIdx < 0) state.goalIdx = 0;
    }
  } catch (e) {}

  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ count: state.count, goalIdx: state.goalIdx })); } catch (e) {}
  }

  function goal() { return GOALS[state.goalIdx]; }

  function render(celebrate) {
    var g = goal();
    if (countEl) countEl.textContent = state.count;
    if (goalEl) goalEl.textContent = "/" + g;
    if (ringFg) {
      var frac = g > 0 ? Math.min(1, state.count / g) : 0;
      ringFg.style.strokeDashoffset = (CIRC * (1 - frac)).toFixed(1);
    }
    btn.classList.remove("tasbih-done");
    if (celebrate) {
      void btn.offsetWidth;
      btn.classList.add("tasbih-done");
    }
  }

  function tap() {
    state.count++;
    var g = goal();
    var done = state.count >= g;
    render(done);
    save();
    btn.classList.remove("tasbih-tap");
    void btn.offsetWidth;
    btn.classList.add("tasbih-tap");
    try { if (navigator.vibrate) navigator.vibrate(done ? [30, 40, 30] : 10); } catch (e) {}
  }

  function cycleGoal(ev) {
    if (ev) ev.stopPropagation();
    state.goalIdx = (state.goalIdx + 1) % GOALS.length;
    if (state.count >= goal()) state.count = 0;
    render(false);
    save();
  }

  function reset() {
    state.count = 0;
    render(false);
    save();
    try { if (navigator.vibrate) navigator.vibrate(20); } catch (e) {}
  }

  var pressTimer = 0, longPressed = false;
  function onGoalTarget(ev) {
    return ev && ev.target && ev.target.closest && ev.target.closest("#tasbih-goal");
  }
  btn.addEventListener("pointerdown", function (ev) {
    if (onGoalTarget(ev)) return;
    longPressed = false;
    pressTimer = setTimeout(function () { longPressed = true; reset(); }, 600);
  });
  btn.addEventListener("pointerup", function (ev) {
    clearTimeout(pressTimer);
    if (onGoalTarget(ev)) return;
    if (!longPressed) tap();
  });
  btn.addEventListener("pointerleave", function () { clearTimeout(pressTimer); });
  if (goalEl) goalEl.addEventListener("click", cycleGoal);

  render(false);
})();
