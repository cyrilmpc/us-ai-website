/* US AI feedback widget: floating button + modal. Sends to owner via FormSubmit, backs up to localStorage. */
(function () {
  "use strict";
  if (document.getElementById("feedback-btn")) return;

  var btn = document.createElement("button");
  btn.id = "feedback-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Send feedback");
  btn.textContent = "💬";
  document.body.appendChild(btn);

  var modal = document.createElement("div");
  modal.id = "feedback-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-label", "Send feedback");
  modal.innerHTML =
    '<div class="fb-box">' +
    '<h3>💬 Feedback</h3>' +
    '<p class="muted">Need a new tool? Found a problem in a tool? Tell us — we act fast.</p>' +
    '<label for="fb-type">Type</label>' +
    '<select id="fb-type">' +
    '<option value="Feature request">💡 I want a new tool</option>' +
    '<option value="Bug report">🐛 This tool has a problem</option>' +
    '<option value="General">💬 General feedback</option>' +
    '</select>' +
    '<label for="fb-text">Your message</label>' +
    '<textarea id="fb-text" placeholder="I want this new tool... / This tool has this problem..." maxlength="2000"></textarea>' +
    '<label for="fb-email">Email (optional — so we can reply)</label>' +
    '<input id="fb-email" type="email" placeholder="you@email.com" autocomplete="email">' +
    '<div class="fb-row">' +
    '<button type="button" class="btn btn-primary" id="fb-send">Send</button>' +
    '<button type="button" class="btn btn-ghost" id="fb-close">Cancel</button>' +
    '</div>' +
    '<div class="fb-msg" id="fb-msg"></div>' +
    '</div>';
  document.body.appendChild(modal);

  var typeEl = modal.querySelector("#fb-type");
  var textEl = modal.querySelector("#fb-text");
  var emailEl = modal.querySelector("#fb-email");
  var msgEl = modal.querySelector("#fb-msg");

  function open() { modal.classList.add("open"); msgEl.textContent = ""; msgEl.className = "fb-msg"; setTimeout(function () { textEl.focus(); }, 50); }
  function close() { modal.classList.remove("open"); }
  btn.addEventListener("click", open);
  modal.querySelector("#fb-close").addEventListener("click", close);
  modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  modal.querySelector("#fb-send").addEventListener("click", function () {
    var text = textEl.value.trim();
    if (!text) { msgEl.textContent = "⚠️ Please write your message first."; msgEl.className = "fb-msg err"; return; }
    var email = emailEl.value.trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msgEl.textContent = "⚠️ That email doesn't look right — please fix it, or leave it blank.";
      msgEl.className = "fb-msg err";
      return;
    }
    var data = {
      type: typeEl.value,
      message: text,
      email: email,
      page: window.location.href,
      pageTitle: document.title || "",
      date: new Date().toISOString()
    };
    /* local backup first — never lose the feedback */
    try {
      var arr = JSON.parse(localStorage.getItem("sawalai_feedback") || "[]");
      arr.push(data);
      localStorage.setItem("sawalai_feedback", JSON.stringify(arr.slice(-100)));
    } catch (e) {}
    msgEl.textContent = "⏳ Sending...";
    msgEl.className = "fb-msg";
    /* email to owner via FormSubmit (same honest pattern as shop.js) */
    fetch("https://formsubmit.co/ajax/4de22205ccafca608a7c4a00e6a34c92", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: "US AI Feedback: " + data.type,
        _template: "table",
        Type: data.type,
        Message: data.message,
        Email: data.email || "(not given)",
        Page: data.page,
        "Page title": data.pageTitle || "(none)",
        Date: data.date
      })
    }).then(function (r) { return r.json(); }).then(function () {
      msgEl.innerHTML = "✅ Thank you! We got your feedback — we will work on it.<br><span class='tiny'>💬 Want your idea prioritized? <a href='index.html#community'><b>Join our WhatsApp community</b></a> — members get <b>3 days of Pro FREE</b> 🎉</span>";
      msgEl.className = "fb-msg ok";
      textEl.value = ""; emailEl.value = "";
      setTimeout(close, 2500);
    }).catch(function () {
      /* email delivery can be down (one-time FormSubmit activation) — offer WhatsApp so the report is never lost */
      msgEl.textContent = "";
      msgEl.className = "fb-msg ok";
      msgEl.appendChild(document.createTextNode("✅ Saved on this device! Email delivery is down — send it via WhatsApp instead: "));
      var wa = document.createElement("a");
      wa.href = "https://wa.me/923254746678?text=" + encodeURIComponent("US AI Feedback (" + data.type + ")\n" + data.message + "\nPage: " + data.page);
      wa.target = "_blank";
      wa.rel = "noopener";
      wa.className = "btn btn-primary";
      wa.textContent = "📲 Send via WhatsApp";
      msgEl.appendChild(wa);
      textEl.value = ""; emailEl.value = "";
    });
  });
})();
