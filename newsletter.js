/* US AI newsletter: stores subscriber emails in localStorage + notifies owner via FormSubmit. */
(function () {
  "use strict";
  var form = document.getElementById("news-form");
  if (!form) return;
  var emailEl = document.getElementById("news-email");
  var msgEl = document.getElementById("news-msg");

  function say(t, ok) {
    msgEl.textContent = t;
    msgEl.className = "fb-msg " + (ok ? "ok" : "err");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = emailEl.value.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say("⚠️ Please enter a valid email.", false); return; }
    var list = [];
    try { list = JSON.parse(localStorage.getItem("sawalai_newsletter") || "[]"); } catch (e) {}
    if (list.indexOf(email) !== -1) { say("✅ You're already subscribed!", true); emailEl.value = ""; return; }
    list.push(email);
    try { localStorage.setItem("sawalai_newsletter", JSON.stringify(list)); } catch (e) {}
    say("⏳ Subscribing...", true);
    fetch("https://formsubmit.co/ajax/4de22205ccafca608a7c4a00e6a34c92", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ _subject: "US AI Newsletter: new subscriber", _template: "table", Email: email, Date: new Date().toISOString() })
    }).then(function () {
      say("✅ Subscribed! You'll be the first to hear about new tools.", true);
      emailEl.value = "";
    }).catch(function () {
      say("✅ Subscribed!", true);
      emailEl.value = "";
    });
  });
})();

/* community placeholder links: tell the visitor links are coming soon */
(function () {
  var note = document.getElementById("comm-note");
  document.querySelectorAll("[data-comm]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      if (note) note.textContent = "🚀 Links are coming soon — please wait a little!";
    });
  });
})();
