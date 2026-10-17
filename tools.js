/* US AI Free Online Tools — 50 tools, all client-side. */
var TOOLS = window.TOOLS || [];
(function () {
"use strict";

var CATS = [
  { id: "all", name: "All" },
  { id: "social", name: "📱 Social Media" },
  { id: "text", name: "✍️ AI & Text" },
  { id: "image", name: "🎨 Image & Design" },
  { id: "calc", name: "🧮 Calculators" },
  { id: "dev", name: "💻 Developer" },
  { id: "advanced", name: "⚡ Advanced" },
  { id: "finance", name: "💰 Finance" },
  { id: "fun", name: "🎮 Fun & Games" },
  { id: "health", name: "💪 Health" },
  { id: "site", name: "🌐 Site Tools" },
  { id: "seo", name: "🚀 SEO Pro" },
  { id: "smart", name: "🧠 Smart Utilities" },
  { id: "learn", name: "📚 Learn & Local" },
  { id: "fav", name: "❤️ Favorites" }
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
function el(id) { return document.getElementById(id); }
function outHTML(box, html) { box.querySelector(".tool-out").innerHTML = html; }
function copyText(t, btn) {
  var done = function () { if (btn) { var o = btn.textContent; btn.textContent = "Copied!"; setTimeout(function(){btn.textContent=o;},1200); } };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, done);
  else { var ta=document.createElement("textarea"); ta.value=t; document.body.appendChild(ta); ta.select(); try{document.execCommand("copy");}catch(e){} ta.remove(); done(); }
}
function dl(href, name) { var a=document.createElement("a"); a.href=href; a.download=name||"download"; document.body.appendChild(a); a.click(); a.remove(); }
function showCopy(box, text) {
  var b = el("t-copy");
  if (!b) {
    b = document.createElement("button");
    b.id = "t-copy"; b.type = "button";
    b.className = "tool-btn ghost tool-copy";
    b.textContent = "\uD83D\uDCCB Copy Result";
    var o = box.querySelector(".tool-out");
    if (o && o.parentNode) o.parentNode.insertBefore(b, o.nextSibling); else box.appendChild(b);
  }
  b.style.display = "";
  b.onclick = function () { copyText(text, b); };
}
function hideCopy() { var b = el("t-copy"); if (b) b.style.display = "none"; }

/* TOOLS declared globally above */

/* ================= SOCIAL MEDIA ================= */

TOOLS.push({ id:"video-downloader", cat:"social", icon:"📥", name:"Free Video Downloader — TikTok, YouTube, Instagram, Facebook",
desc:"Paste any public video link — get the fastest honest free download path with preview. SD free (10/day); PRO adds HD/4K, batch & priority.",
how:"Open the tool, paste a TikTok, Facebook, YouTube or Instagram link, press Get Download Options, then copy the link into the trusted downloader. Only download public videos you have the right to keep.",
render:function(box){
  box.innerHTML='<h2>📥 Video Downloader</h2><p class="muted">Free download helper for TikTok, Facebook, YouTube &amp; Instagram — SD free (10/day on this device). PRO unlocks HD/4K, batch links &amp; priority speed.</p><a class="tool-btn" href="video-downloader.html" style="display:inline-block;text-decoration:none;text-align:center">Open Full Video Downloader →</a><p class="muted" style="margin-top:10px;font-size:.8rem">Honest note: this is a static page with no server, so it previews your link and hands you to the free tools that can actually download it. No passwords, no DRM/paid content.</p>';
}});

TOOLS.push({ id:"yt-tags", cat:"social", icon:"🏷️", name:"Free YouTube Tag Generator Online",
desc:"Generate SEO tags that help your videos rank higher on YouTube", how:"Type your video title or topic, press Generate Tags, then copy the SEO tags straight into your YouTube upload.",
render:function(box){
  box.innerHTML = '<h2>🏷️ YouTube Tag Generator</h2><label>Video title or topic</label><input type="text" id="t-in" placeholder="e.g. how to bake chocolate cake"><button class="tool-btn" id="t-go">Generate Tags</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Tags</button>';
  el("t-go").onclick = function(){
    var kw = el("t-in").value.trim(); if(!kw){ outHTML(box,"Please enter a topic."); return; }
    var words = kw.toLowerCase().split(/\s+/);
    var tags = [kw];
    words.forEach(function(w){ if(w.length>2) tags.push(w); });
    ["how to "+kw, kw+" tutorial", kw+" 2026", kw+" for beginners", "best "+kw, kw+" tips", kw+" guide", kw+" explained"].forEach(function(t){ tags.push(t); });
    var uniq = []; tags.forEach(function(t){ if(uniq.indexOf(t)===-1) uniq.push(t); });
    var out = uniq.slice(0,25).join(", ");
    outHTML(box, esc(out)); var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(out,c);};
  };
}});

TOOLS.push({ id:"yt-thumb", cat:"social", icon:"🖼️", name:"Free YouTube Thumbnail Downloader Online",
desc:"Grab any video thumbnail in HD", how:"Paste any YouTube video URL and press Get Thumbnails to download the thumbnail in HD. Thumbnails belong to the video owner.",
render:function(box){
  box.innerHTML = '<h2>🖼️ YouTube Thumbnail Downloader</h2><label>YouTube video URL</label><input type="text" id="t-in" placeholder="https://youtube.com/watch?v=..."><button class="tool-btn" id="t-go">Get Thumbnails</button><div class="tool-out" id="t-out"></div><p class="tool-note">Thumbnails belong to the video owner — use only with permission.</p>';
  el("t-go").onclick = function(){
    var u = el("t-in").value.trim(); var m = u.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([A-Za-z0-9_-]{11})/);
    if(!m){ outHTML(box,"Could not find a video ID in that URL."); return; }
    var id = m[1];
    var sizes = [["Max (1280x720)","maxresdefault"],["HD (640x480)","hqdefault"],["MQ (480x360)","mqdefault"],["Small (120x90)","default"]];
    var h = sizes.map(function(s){
      var src = "https://img.youtube.com/vi/"+id+"/"+s[1]+".jpg";
      return '<div style="margin:10px 0"><b>'+s[0]+'</b><br><img src="'+src+'" alt="'+esc(s[0])+' YouTube thumbnail" style="max-width:100%;border-radius:8px;margin:6px 0" loading="lazy"><br><a href="'+src+'" download style="color:#818cf8">⬇ Download</a></div>';
    }).join("");
    outHTML(box, h);
  };
}});

TOOLS.push({ id:"hashtags", cat:"social", icon:"#️⃣", name:"Free Hashtag Generator Online",
desc:"Find trending hashtags to boost your reach on Instagram, TikTok & YouTube", how:"Enter a topic, pick Instagram, TikTok or YouTube, and press Generate to get copy-ready hashtags.",
render:function(box){
  box.innerHTML = '<h2>#️⃣ Hashtag Generator</h2><label>Topic / keyword</label><input type="text" id="t-in" placeholder="e.g. fitness"><label>Platform</label><select id="t-p"><option>Instagram</option><option>TikTok</option><option>YouTube</option></select><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-go").onclick = function(){
    var kw = el("t-in").value.trim().toLowerCase().replace(/\s+/g,""); if(!kw){ outHTML(box,"Enter a topic."); return; }
    var p = el("t-p").value;
    var base = [kw, kw+"life", kw+"lover", kw+"daily", kw+"community", "insta"+kw, kw+"goals", "love"+kw, kw+"tips", kw+"2026", "viral"+kw, kw+"reels", "explore"+kw, kw+"inspiration", "daily"+kw];
    var extra = p==="TikTok" ? ["fyp","foryou","foryoupage","tiktokmade","viral"] : p==="YouTube" ? ["youtuber","subscribe","newvideo","vlog"] : ["instagood","photooftheday","instadaily","picoftheday","follow"];
    var tags = base.concat(extra).map(function(t){return "#"+t.replace(/[^a-z0-9]/g,"");});
    var out = tags.slice(0,20).join(" ");
    outHTML(box, esc(out)); var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(out,c);};
  };
}});

TOOLS.push({ id:"bio-gen", cat:"social", icon:"👤", name:"Free Social Media Bio Generator Online",
desc:"Create catchy bios that make your Instagram & X profiles stand out", how:"Enter your name or brand, what you do and a tone, then press Generate Bios for ready-to-paste social bios.",
render:function(box){
  box.innerHTML = '<h2>👤 Bio Generator</h2><label>Your name / brand</label><input type="text" id="t-n" placeholder="e.g. Ali Khan"><label>What do you do?</label><input type="text" id="t-w" placeholder="e.g. fitness coach"><label>Tone</label><select id="t-t"><option>Professional</option><option>Fun</option><option>Minimal</option></select><button class="tool-btn" id="t-go">Generate Bios</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var n=el("t-n").value.trim()||"Your Name", w=el("t-w").value.trim()||"creator", t=el("t-t").value, h="";
    if(t==="Professional") h = "💼 "+w+" | Helping you grow\n📩 DM for collabs\n👇 Latest work";
    else if(t==="Fun") h = "✨ "+w+" by day, meme lord by night 🍕\n📍 "+n+" HQ | ⬇️ chaos below";
    else h = n.toLowerCase().replace(/\s/g,".")+"\n"+w+".";
    var bioOut=h+"\n\n───\n\n🚀 "+n+" — "+w+"\n💡 Tips daily | 📩 "+n.toLowerCase().replace(/\s/g,"")+"@mail.com";
    outHTML(box, esc(bioOut)); showCopy(box, bioOut);
  };
}});

TOOLS.push({ id:"title-ideas", cat:"social", icon:"🎬", name:"Free Video Title Idea Generator Online",
desc:"Click-worthy YouTube titles", how:"Type your video topic and press Generate Titles for a list of click-worthy title ideas.",
render:function(box){
  box.innerHTML = '<h2>🎬 Video Title Ideas</h2><label>Video topic</label><input type="text" id="t-in" placeholder="e.g. morning routine"><button class="tool-btn" id="t-go">Generate Titles</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var kw=el("t-in").value.trim(); if(!kw){outHTML(box,"Enter a topic.");hideCopy();return;}
    var K=kw.charAt(0).toUpperCase()+kw.slice(1);
    var titles = ["I Tried "+K+" for 30 Days — Here\u2019s What Happened","7 "+K+" Mistakes You\u2019re Probably Making","The Ultimate "+K+" Guide (2026)","Why Nobody Talks About "+K,"10 "+K+" Tips That Actually Work","Stop Doing "+K+" Wrong!","I Spent 24 Hours Doing "+K,"The Truth About "+K+" Nobody Tells You","Beginner\u2019s Guide to "+K+" in 10 Minutes",K+": Everything You Need to Know"];
    var titlesOut= titles.map(function(t,i){return (i+1)+". "+t;}).join("\n");
    outHTML(box, titlesOut); showCopy(box, titlesOut);
  };
}});

TOOLS.push({ id:"yt-stats", cat:"social", icon:"📊", name:"Free YouTube Channel Stats Checker Online",
desc:"Needs your free API key", how:"Paste your YouTube channel URL and a free API key to see subscriber, view and video stats. Get a free key from Google Cloud Console.",
render:function(box){
  box.innerHTML = '<h2>📊 Channel Stats Checker</h2><p class="tool-note">YouTube needs an API key for stats. Get a free one at console.cloud.google.com → enable YouTube Data API v3 → create API key. Paste it below (stays in your browser only).</p><label>Your YouTube API key</label><input type="text" id="t-k" placeholder="AIza..."><label>Channel ID or username URL</label><input type="text" id="t-c" placeholder="UC... or @username"><button class="tool-btn" id="t-go">Check Stats</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var k=el("t-k").value.trim(), c=el("t-c").value.trim();
    if(!k||!c){outHTML(box,"API key and channel are required.");return;}
    outHTML(box,"Loading...");
    var url;
    if(c[0]==="@"){ url="https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&forHandle="+encodeURIComponent(c)+"&key="+encodeURIComponent(k); }
    else { url="https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id="+encodeURIComponent(c)+"&key="+encodeURIComponent(k); }
    fetch(url).then(function(r){return r.json();}).then(function(d){
      if(!d.items||!d.items.length){outHTML(box,"Channel not found. Check the ID/username.");return;}
      var s=d.items[0].statistics, sn=d.items[0].snippet;
      outHTML(box, sn.title+"\n👥 Subscribers: "+Number(s.subscriberCount).toLocaleString()+"\n👁 Views: "+Number(s.viewCount).toLocaleString()+"\n🎞 Videos: "+Number(s.videoCount).toLocaleString());
    }).catch(function(){outHTML(box,"Request failed — check your API key.");});
  };
}});

TOOLS.push({ id:"tiktok-dl", cat:"social", icon:"⬇️", name:"Free TikTok Video Downloader Online",
desc:"How to save without watermark", how:"TikTok blocks direct browser downloads, so this tool shows the safe step-by-step method to save a video without a watermark.",
render:function(box){
  box.innerHTML = '<h2>⬇️ TikTok Downloader</h2><div class="tool-out" style="display:block;white-space:normal">TikTok blocks direct downloads from browsers, so no website tool can reliably strip watermarks without a server (and doing so may break TikTok\u2019s terms).\n\n<b>Safe ways to save a video:</b>\n1. In the TikTok app, tap <b>Share → Save video</b> (has watermark).\n2. If it\u2019s your own video, post it as <b>Private</b>, then save — no watermark on drafts you created.\n3. Use TikTok\u2019s built-in <b>Save</b> in the share menu.\n\nWe won\u2019t offer a fake downloader that steals your data — that\u2019s how most \u201Cno watermark\u201D sites scam users.</div>';
}});

TOOLS.push({ id:"insta-dl", cat:"social", icon:"📸", name:"Free Instagram Reel Downloader Online",
desc:"How to save reels safely", how:"Instagram requires login for downloads, so this tool explains the safe ways to save a reel you have permission to keep.",
render:function(box){
  box.innerHTML = '<h2>📸 Instagram Reel Downloader</h2><div class="tool-out" style="display:block;white-space:normal">Instagram requires login for downloads, so browsers can\u2019t fetch reels directly — sites claiming otherwise usually harvest your account.\n\n<b>Safe ways:</b>\n1. In the Instagram app: tap <b>Share → Download</b> (available on public reels).\n2. Tap the <b>bookmark icon</b> to save reels inside Instagram.\n3. For your own reels: <b>Share → Download</b> before posting.\n\nOnly download content you own or have permission to use.</div>';
}});

TOOLS.push({ id:"engagement", cat:"social", icon:"📈", name:"Free Engagement Rate Calculator Online",
desc:"Likes + comments ÷ followers", how:"Enter follower count plus average likes and comments per post, then press Calculate to see the engagement rate.",
render:function(box){
  box.innerHTML = '<h2>📈 Engagement Rate</h2><div class="row"><div><label>Followers</label><input type="number" id="t-f" placeholder="10000"></div><div><label>Avg likes per post</label><input type="number" id="t-l" placeholder="500"></div><div><label>Avg comments</label><input type="number" id="t-c" placeholder="50"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var f=+el("t-f").value, l=+el("t-l").value||0, c=+el("t-c").value||0;
    if(!f){outHTML(box,"Enter followers.");return;}
    var r=((l+c)/f*100).toFixed(2);
    var verdict = r<1?"Low — try more interactive content":r<3?"Average — solid":"Excellent! 🔥";
    outHTML(box,"Engagement rate: "+r+"%\n"+verdict);
  };
}});

TOOLS.push({ id:"caption", cat:"social", icon:"💬", name:"Free Social Media Caption Maker Online",
desc:"Write engaging captions with emojis and calls-to-action in seconds", how:"Type your post topic and press Make Captions to get ready captions with emojis and calls to action.",
render:function(box){
  box.innerHTML = '<h2>💬 Caption Maker</h2><label>Post topic</label><input type="text" id="t-in" placeholder="e.g. sunset at the beach"><button class="tool-btn" id="t-go">Make Captions</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var kw=el("t-in").value.trim(); if(!kw){outHTML(box,"Enter a topic.");hideCopy();return;}
    var K=kw.charAt(0).toUpperCase()+kw.slice(1);
    var capOut="1. "+K+" ✨\nDouble tap if you agree ❤️\n.\n.\n.\n#"+kw.replace(/\s+/g,"")+" #love\n\n───\n\n2. POV: "+K+" 🌅\nSave this for later 📌\nTag someone who needs this 👇\n\n───\n\n3. "+K.toUpperCase()+" 🔥\nWhich one is your favorite? 1, 2 or 3? 👇";
    outHTML(box, capOut); showCopy(box, capOut);
  };
}});

/* ================= AI & TEXT ================= */

TOOLS.push({ id:"para-writer", cat:"text", icon:"📝", name:"Free AI Paragraph Writer Online",
desc:"Draft paragraphs on any topic", how:"Type a topic, pick a tone, and press Write to draft a paragraph you can edit and fact-check before using.",
render:function(box){
  box.innerHTML = '<h2>📝 Paragraph Writer</h2><label>Topic</label><input type="text" id="t-in" placeholder="e.g. benefits of morning exercise"><label>Tone</label><select id="t-t"><option>Informative</option><option>Persuasive</option><option>Casual</option></select><button class="tool-btn" id="t-go">Write</button><div class="tool-out" id="t-out"></div><p class="tool-note">Draft assistant — edit and fact-check before publishing.</p>';
  el("t-go").onclick = function(){
    var kw=el("t-in").value.trim(); if(!kw){outHTML(box,"Enter a topic.");hideCopy();return;}
    var t=el("t-t").value, K=kw.charAt(0).toUpperCase()+kw.slice(1), p;
    if(t==="Persuasive") p=K+" is one of the smartest choices you can make today. Countless people have already seen real results, and getting started takes less effort than you think. The sooner you begin, the sooner you\u2019ll see the difference — don\u2019t wait for the \u201Cperfect moment,\u201D because it rarely comes. Take the first step now and future you will be grateful.";
    else if(t==="Casual") p="So let\u2019s talk about "+kw+". Honestly, it\u2019s way simpler than most people make it sound. Once you get the basics down, everything starts to click — and you\u2019ll wonder why you didn\u2019t start sooner. Just take it one step at a time, stay consistent, and enjoy the process.";
    else p=K+" refers to a concept that has gained growing attention in recent years. Understanding it begins with the fundamentals: what it is, why it matters, and how it applies in everyday situations. Experts point to several key benefits, including improved efficiency and better outcomes for those who apply it correctly. As interest continues to grow, staying informed about "+kw+" is becoming increasingly valuable.";
    outHTML(box,p); showCopy(box,p);
  };
}});

TOOLS.push({ id:"rewriter", cat:"text", icon:"🔄", name:"Free Article Rewriter Online",
desc:"Rewrite any text in fresh words while keeping the original meaning", how:"Paste your text and press Rewrite for a synonym-based rephrase. Review the output to keep the original meaning.",
render:function(box){
  box.innerHTML = '<h2>🔄 Article Rewriter</h2><label>Paste text</label><textarea id="t-in" placeholder="Paste your text here..."></textarea><button class="tool-btn" id="t-go">Rewrite</button><div class="tool-out" id="t-out"></div><p class="tool-note">Basic synonym rewrite — review the output for meaning.</p>';
  var SYN = {good:"great",bad:"poor",big:"large",small:"tiny",fast:"quick",slow:"gradual",happy:"delighted",sad:"unhappy",important:"crucial",use:"utilize",help:"assist",make:"create",get:"obtain",show:"demonstrate",think:"believe",know:"understand",very:"extremely",really:"truly",many:"numerous",much:"considerable",often:"frequently",also:"additionally",but:"however",because:"since",although:"though",while:"whilst",start:"begin",end:"conclude",improve:"enhance",increase:"boost",decrease:"reduce",beautiful:"gorgeous",difficult:"challenging",easy:"simple",smart:"intelligent",strong:"powerful",new:"novel",old:"aged",young:"youthful",rich:"wealthy",famous:"renowned"};
  el("t-go").onclick = function(){
    var t=el("t-in").value; if(!t.trim()){outHTML(box,"Paste some text.");hideCopy();return;}
    var out=t.replace(/\b([A-Za-z]+)\b/g,function(w){
      var low=w.toLowerCase(); if(!SYN[low]||Math.random()<0.35) return w;
      var r=SYN[low]; if(w[0]===w[0].toUpperCase()) r=r.charAt(0).toUpperCase()+r.slice(1); return r;
    });
    outHTML(box,esc(out)); showCopy(box,out);
  };
}});

TOOLS.push({ id:"grammar", cat:"text", icon:"✅", name:"Free Grammar & Spell Checker Online",
desc:"Basic checks in your browser", how:"Paste your text and press Check to find double spaces, repeated words and common mistakes. Spellcheck also runs as you type.",
render:function(box){
  box.innerHTML = '<h2>✅ Grammar Checker</h2><label>Paste text (spellcheck runs as you type)</label><textarea id="t-in" spellcheck="true" placeholder="Type or paste..."></textarea><button class="tool-btn" id="t-go">Check</button><div class="tool-out" id="t-out"></div><p class="tool-note">Basic checker: finds double spaces, repeated words, and common mix-ups. For deep grammar, try a dedicated proofreader.</p>';
  el("t-go").onclick = function(){
    var t=el("t-in").value, issues=[];
    if(/  +/.test(t)) issues.push("• Double spaces found");
    var rw=t.match(/\b(\w+)\s+\1\b/gi); if(rw) issues.push("• Repeated word: "+rw.slice(0,3).join(", "));
    [["their","there"],["your","you\u2019re"],["its","it\u2019s"],["then","than"],["to","too"]].forEach(function(p){
      if(new RegExp("\\b"+p[0]+"\\b","i").test(t)) issues.push("• Check: did you mean \u201C"+p[1]+"\u201D instead of \u201C"+p[0]+"\u201D?");
    });
    outHTML(box, issues.length?("Possible issues:\n"+issues.join("\n")):"No basic issues found. 🎉");
  };
}});

TOOLS.push({ id:"word-count", cat:"text", icon:"🔢", name:"Free Word & Character Counter Online",
desc:"Live counts as you type", how:"Paste or type text to see live word, character and sentence counts plus estimated reading time.",
render:function(box){
  box.innerHTML = '<h2>🔢 Word Counter</h2><label>Your text</label><textarea id="t-in" placeholder="Paste or type your text here to count words…"></textarea><div class="tool-out" id="t-out" style="display:block">Words: 0 | Characters: 0 | Characters (no spaces): 0 | Sentences: 0 | Reading time: 0 min</div>';
  el("t-in").addEventListener("input",function(){
    var t=el("t-in").value, w=(t.trim().match(/\S+/g)||[]).length;
    var s=(t.match(/[.!?]+/g)||[]).length;
    el("t-out").textContent="Words: "+w+" | Characters: "+t.length+" | Characters (no spaces): "+t.replace(/\s/g,"").length+" | Sentences: "+s+" | Reading time: "+Math.ceil(w/200)+" min";
  });
}});

TOOLS.push({ id:"case-converter", cat:"text", icon:"🔡", name:"Free Text Case Converter Online",
desc:"UPPER, lower, Title, Sentence", how:"Paste your text and click UPPERCASE, lowercase, Title Case or Sentence case to convert it instantly.",
render:function(box){
  box.innerHTML = '<h2>🔡 Case Converter</h2><label>Your text</label><textarea id="t-in" placeholder="Type or paste text to convert…"></textarea><div class="row"><button class="tool-btn" data-c="u">UPPERCASE</button><button class="tool-btn" data-c="l">lowercase</button><button class="tool-btn" data-c="t">Title Case</button><button class="tool-btn" data-c="s">Sentence case</button></div><div class="tool-out" id="t-out"></div>';
  box.querySelectorAll("[data-c]").forEach(function(b){
    b.onclick=function(){
      var t=el("t-in").value, c=b.getAttribute("data-c"), o=t;
      if(c==="u")o=t.toUpperCase(); else if(c==="l")o=t.toLowerCase();
      else if(c==="t")o=t.replace(/\w\S*/g,function(w){return w.charAt(0).toUpperCase()+w.substr(1).toLowerCase();});
      else o=t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g,function(m){return m.toUpperCase();});
      outHTML(box,esc(o));
    };
  });
}});

TOOLS.push({ id:"summarizer", cat:"text", icon:"📄", name:"Free AI Summary Generator Online",
desc:"Turn long articles into clear, short summaries in one click", how:"Paste an article, choose Short, Medium or Long, and press Summarize to get the key sentences.",
render:function(box){
  box.innerHTML = '<h2>📄 Summary Generator</h2><label>Paste article text</label><textarea id="t-in" placeholder="Paste long text..."></textarea><label>Summary length</label><select id="t-n"><option value="3">Short (3 sentences)</option><option value="5">Medium (5 sentences)</option><option value="8">Long (8 sentences)</option></select><button class="tool-btn" id="t-go">Summarize</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var t=el("t-in").value.trim(); if(!t){outHTML(box,"Paste some text.");hideCopy();return;}
    var sents=t.replace(/\n+/g," ").match(/[^.!?]+[.!?]+/g)||[t];
    if(sents.length<=3){outHTML(box,t);showCopy(box,t);return;}
    var freq={}; t.toLowerCase().match(/\b[a-z]{4,}\b/g).forEach(function(w){freq[w]=(freq[w]||0)+1;});
    var scored=sents.map(function(s,i){var sc=0;(s.toLowerCase().match(/\b[a-z]{4,}\b/g)||[]).forEach(function(w){sc+=freq[w]||0;});return{i:i,s:s.trim(),sc:sc/Math.max(1,s.split(" ").length)};});
    scored.sort(function(a,b){return b.sc-a.sc;});
    var n=Math.min(+el("t-n").value,sents.length);
    var top=scored.slice(0,n).sort(function(a,b){return a.i-b.i;});
    var sumOut= top.map(function(x){return "• "+x.s;}).join("\n");
    outHTML(box, sumOut); showCopy(box, sumOut);
  };
}});

TOOLS.push({ id:"plagiarism", cat:"text", icon:"🔍", name:"Free Plagiarism / Similarity Checker Online",
desc:"Compare two texts honestly", how:"Paste two texts to compare them honestly. Real plagiarism checking needs a web database, which this browser tool cannot search.",
render:function(box){
  box.innerHTML = '<h2>🔍 Similarity Checker</h2><p class="tool-note">Real plagiarism checking needs a web database (needs a server). This tool honestly compares <b>two texts you paste</b> and shows how similar they are — great for checking your draft against a source.</p><label>Original text</label><textarea id="t-a" placeholder="Paste original..."></textarea><label>Your text</label><textarea id="t-b" placeholder="Paste your version..."></textarea><button class="tool-btn" id="t-go">Compare</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var a=el("t-a").value.toLowerCase().match(/\b\w+\b/g)||[], b=el("t-b").value.toLowerCase().match(/\b\w+\b/g)||[];
    if(!a.length||!b.length){outHTML(box,"Paste both texts.");return;}
    var setA={}; a.forEach(function(w){setA[w]=1;});
    var common=b.filter(function(w){return setA[w];}).length;
    var sim=(2*common/(a.length+b.length)*100).toFixed(1);
    outHTML(box,"Similarity: "+sim+"%\n"+(sim>60?"⚠️ Very similar — rewrite in your own words.":sim>30?"🟡 Some overlap — check the matching parts.":"🟢 Low similarity — looks original."));
  };
}});

TOOLS.push({ id:"outline", cat:"text", icon:"📋", name:"Free Blog Title to Outline Generator Online",
desc:"Full post structure in seconds", how:"Type your blog title or topic and press Make Outline to get a full post structure in seconds.",
render:function(box){
  box.innerHTML = '<h2>📋 Outline Generator</h2><label>Blog title / topic</label><input type="text" id="t-in" placeholder="e.g. how to start a garden"><button class="tool-btn" id="t-go">Make Outline</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var kw=el("t-in").value.trim(); if(!kw){outHTML(box,"Enter a topic.");hideCopy();return;}
    var K=kw.charAt(0).toUpperCase()+kw.slice(1);
    var olOut="# "+K+"\n\n## Introduction\n- Hook: surprising fact or question\n- What the reader will learn\n\n## 1. What is "+K+"?\n- Simple definition\n- Why it matters in 2026\n\n## 2. Getting Started\n- Step 1: basics\n- Step 2: tools you need\n- Step 3: first actions\n\n## 3. Common Mistakes to Avoid\n- Mistake 1 and fix\n- Mistake 2 and fix\n\n## 4. Pro Tips\n- Advanced trick 1\n- Advanced trick 2\n\n## Conclusion\n- Recap key points\n- Call to action";
    outHTML(box, olOut); showCopy(box, olOut);
  };
}});

TOOLS.push({ id:"poetry", cat:"text", icon:"🎭", name:"Free Poetry / Story Generator Online",
desc:"Creative writing sparks", how:"Type a theme word, then press Write Poem or Write Story for a creative spark you can build on.",
render:function(box){
  box.innerHTML = '<h2>🎭 Poetry & Story Generator</h2><label>Theme word</label><input type="text" id="t-in" placeholder="e.g. ocean"><div class="row"><button class="tool-btn" id="t-p">Write Poem</button><button class="tool-btn" id="t-s">Write Story Start</button><button class="tool-btn" id="t-u">🌙 Urdu Sher</button></div><div class="tool-out" id="t-out"></div>';
  function pick(a){return a[Math.floor(Math.random()*a.length)];}
  var urduCache=null;
  el("t-u").onclick=function(){
    function show(list){
      if(!list.length){outHTML(box,"No Urdu couplets yet — check back soon.");return;}
      var s=pick(list);
      var txt="🌙 "+s.sher.replace(/\\n/g,"\n")+"\n\n— theme: "+(s.theme||"zindagi");
      outHTML(box,esc(txt)); showCopy(box,txt);
    }
    if(urduCache){show(urduCache);return;}
    fetch("data/urdu-poetry.json").then(function(r){return r.json();}).then(function(d){urduCache=Array.isArray(d)?d:[];show(urduCache);}).catch(function(){outHTML(box,"Could not load Urdu couplets — please try again.");});
  };
  el("t-p").onclick=function(){
    var k=el("t-in").value.trim()||"dreams";
    var lines=[pick(["Beneath the","Above the","Within the"])+" "+k+", I wander alone,",pick(["Where shadows","Where light","Where echoes"])+" dance on "+pick(["silver","golden","silent"])+" stone,","The "+pick(["wind","night","morning"])+" whispers secrets soft and deep,","Of promises the "+k+" will keep."];
    var poemOut=lines.join("\n");
    outHTML(box,poemOut); showCopy(box,poemOut);
  };
  el("t-s").onclick=function(){
    var k=el("t-in").value.trim()||"mysterious door";
    var storyOut="It was a "+pick(["rainy","quiet","restless"])+" evening when Maya first noticed the "+k+". She had walked past it a hundred times, but tonight it was different — tonight it was "+pick(["glowing","open","calling her name"])+". Her heart raced as she stepped closer, unaware that beyond it lay "+pick(["a world frozen in time","the answer she had sought for years","a stranger who knew her name"])+"...";
    outHTML(box, storyOut); showCopy(box, storyOut);
  };
}});

TOOLS.push({ id:"lorem", cat:"text", icon:"📰", name:"Free Lorem Ipsum Generator Online",
desc:"Dummy text for designs", how:"Choose how many paragraphs you need, press Generate, then copy the dummy text for your design.",
render:function(box){
  box.innerHTML = '<h2>📰 Lorem Ipsum</h2><label>Paragraphs</label><input type="number" id="t-n" value="3" min="1" max="10"><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  var P="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
  el("t-go").onclick=function(){
    var n=Math.min(10,Math.max(1,+el("t-n").value||3)), out=[];
    for(var i=0;i<n;i++) out.push(P);
    var t=out.join("\n\n"); outHTML(box,esc(t));
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(t,c);};
  };
}});

/* ================= IMAGE & DESIGN ================= */

TOOLS.push({ id:"bg-remover", cat:"image", icon:"✂️", name:"Free AI Background Remover Online",
desc:"Real AI cutout", how:"Upload any photo — AI removes the background right in your browser (first use downloads the AI model, ~40MB). Nothing is uploaded to any server.",
render:function(box){
  box.innerHTML = '<h2>✂️ AI Background Remover</h2><p class="tool-note">Real AI cutout — works on <b>any photo</b>, right in your browser. First use downloads the AI model once (~40MB).</p><label>Upload image</label><input type="file" id="t-f" accept="image/*"><div id="t-prev" style="margin:10px 0"></div><button class="tool-btn" id="t-go">🤖 Remove Background (AI)</button> <button class="tool-btn ghost" id="t-chroma" type="button">🎨 Solid-color mode</button><div id="t-status" class="tool-out"></div><div id="t-result" style="margin-top:10px"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button><div id="t-chroma-ui" style="display:none;margin-top:10px"><label>Color to remove</label><input type="color" id="t-c" value="#00ff00"><label>Tolerance</label><input type="range" id="t-t" min="10" max="120" value="60"><button class="tool-btn" id="t-go2" type="button">Remove solid color</button></div>';
  var file=null, imgUrl=null;
  el("t-f").onchange=function(e){
    file=e.target.files[0]; if(!file) return;
    if(imgUrl) URL.revokeObjectURL(imgUrl);
    imgUrl=URL.createObjectURL(file);
    el("t-prev").innerHTML='<img src="'+imgUrl+'" style="max-width:100%;max-height:260px;border-radius:10px" alt="upload">';
    el("t-result").innerHTML=""; el("t-dl").style.display="none"; el("t-status").innerHTML="";
  };
  function setStatus(t){ el("t-status").innerHTML=t; }
  el("t-go").onclick=function(){
    if(!file){ setStatus("<p>Upload an image first.</p>"); return; }
    var btn=el("t-go"); btn.disabled=true;
    setStatus("⏳ Loading AI model (first-time ~40MB download)...");
    var done=function(blobUrl){
      el("t-result").innerHTML='<img src="'+blobUrl+'" style="max-width:100%;max-height:320px;border-radius:10px;background:repeating-conic-gradient(#808080 0% 25%, #404040 0% 50%) 50% / 20px 20px" alt="no background">';
      var d=el("t-dl"); d.style.display=""; d.onclick=function(){ dl(blobUrl,"no-bg.png"); };
      setStatus("✅ Background removed!");
      btn.disabled=false; btn.textContent="🤖 Remove Background (AI)";
    };
    loadBgAi(function(removeBackground){
      btn.textContent="🤖 Processing...";
      setStatus("⏳ Removing background...");
      removeBackground(file).then(function(blob){
        done(URL.createObjectURL(blob));
      }).catch(function(err){
        setStatus("⚠️ AI failed — try solid-color mode. ("+String(err&&err.message||err).slice(0,80)+")");
        btn.disabled=false; btn.textContent="🤖 Remove Background (AI)";
      });
    }, function(){
      setStatus("⚠️ AI library failed to load — try solid-color mode.");
      btn.disabled=false;
    });
  };
  /* solid-color fallback (fixed: no onload race) */
  el("t-chroma").onclick=function(){ var u=el("t-chroma-ui"); u.style.display=u.style.display==="none"?"":"none"; };
  el("t-go2").onclick=function(){
    if(!imgUrl){ setStatus("<p>Upload an image first.</p>"); return; }
    var img=new Image();
    img.onload=function(){
      var canvas=document.createElement("canvas");
      canvas.width=img.naturalWidth; canvas.height=img.naturalHeight;
      var ctx=canvas.getContext("2d"); ctx.drawImage(img,0,0);
      var d=ctx.getImageData(0,0,canvas.width,canvas.height), px=d.data;
      var c=el("t-c").value, tr=+el("t-t").value;
      var cr=parseInt(c.slice(1,3),16), cg=parseInt(c.slice(3,5),16), cb=parseInt(c.slice(5,7),16);
      for(var i=0;i<px.length;i+=4){
        var dr=px[i]-cr, dg=px[i+1]-cg, db=px[i+2]-cb;
        if(Math.sqrt(dr*dr+dg*dg+db*db)<tr) px[i+3]=0;
      }
      ctx.putImageData(d,0,0);
      var url=canvas.toDataURL("image/png");
      el("t-result").innerHTML='<img src="'+url+'" style="max-width:100%;max-height:320px;border-radius:10px;background:repeating-conic-gradient(#808080 0% 25%, #404040 0% 50%) 50% / 20px 20px" alt="no background">';
      var b=el("t-dl"); b.style.display=""; b.onclick=function(){ dl(url,"no-bg.png"); };
      setStatus("✅ Solid color removed!");
    };
    img.onerror=function(){ setStatus("⚠️ Image failed to load."); };
    img.src=imgUrl;
  };
}});

/* lazy-load @imgly/background-removal once */
var _bgAiPromise=null;
function loadBgAi(ok, fail){
  if(window._bgAiRemove){ ok(window._bgAiRemove); return; }
  if(!_bgAiPromise){
    _bgAiPromise=new Promise(function(resolve,reject){
      var s=document.createElement("script");
      s.type="module";
      s.textContent='import {removeBackground} from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm"; window._bgAiRemove=removeBackground;';
      s.onerror=reject;
      document.head.appendChild(s);
      var tries=0;
      var iv=setInterval(function(){
        if(window._bgAiRemove){ clearInterval(iv); resolve(window._bgAiRemove); }
        else if(++tries>100){ clearInterval(iv); reject(new Error("timeout")); }
      },200);
    });
  }
  _bgAiPromise.then(ok).catch(fail);
}

TOOLS.push({ id:"img-compress", cat:"image", icon:"🗜️", name:"Free Image Compressor & Resizer Online",
desc:"Compress JPG, PNG & WebP images to smaller sizes without losing quality", how:"Upload an image, set max width and quality, then press Compress and download the smaller file.",
render:function(box){
  box.innerHTML = '<h2>🗜️ Compressor & Resizer</h2><label>Upload image</label><input type="file" id="t-f" accept="image/*"><div class="row"><div><label>Max width (px)</label><input type="number" id="t-w" value="1200"></div><div><label>Quality (1-100)</label><input type="number" id="t-q" value="80" min="1" max="100"></div></div><button class="tool-btn" id="t-go">Compress</button><div class="tool-out" id="t-out"></div><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download</button>';
  var img=new Image();
  el("t-f").onchange=function(e){var r=new FileReader();r.onload=function(){img.src=r.result;};r.readAsDataURL(e.target.files[0]);};
  el("t-go").onclick=function(){
    if(!img.src){outHTML(box,"Upload an image.");return;}
    var mw=+el("t-w").value||1200, q=(+el("t-q").value||80)/100;
    var sc=Math.min(1,mw/img.width), c=document.createElement("canvas");
    c.width=Math.round(img.width*sc); c.height=Math.round(img.height*sc);
    c.getContext("2d").drawImage(img,0,0,c.width,c.height);
    var url=c.toDataURL("image/jpeg",q);
    outHTML(box,"Original: "+img.width+"x"+img.height+"\nNew: "+c.width+"x"+c.height+"\nSize: "+Math.round(url.length*0.75/1024)+" KB (approx)");
    el("t-prev").innerHTML=""; el("t-prev").appendChild(c); c.className="tool-canvas";
    var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(url,"compressed.jpg");};
  };
}});

TOOLS.push({ id:"palette", cat:"image", icon:"🎨", name:"Free Color Palette Generator Online",
desc:"Harmonious color schemes", how:"Pick a base color and a scheme like Complementary or Triadic, then press Generate for a harmonious palette with codes.",
render:function(box){
  box.innerHTML = '<h2>🎨 Palette Generator</h2><label>Base color</label><input type="color" id="t-c" value="#6366f1"><label>Scheme</label><select id="t-s"><option value="analog">Analogous</option><option value="comp">Complementary</option><option value="triad">Triadic</option><option value="mono">Monochrome</option></select><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out" style="display:block"></div>';
  function hsl(h,s,l){h=((h%360)+360)%360;var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2,r,g,b;if(h<60){r=c;g=x;b=0;}else if(h<120){r=x;g=c;b=0;}else if(h<180){r=0;g=c;b=x;}else if(h<240){r=0;g=x;b=c;}else if(h<300){r=x;g=0;b=c;}else{r=c;g=0;b=x;}r=Math.round((r+m)*255);g=Math.round((g+m)*255);b=Math.round((b+m)*255);return"#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}
  function toHSL(hex){var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),h=0,s=0,l=(mx+mn)/2;if(mx!==mn){var d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);if(mx===r)h=(g-b)/d+(g<b?6:0);else if(mx===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60;}return[h,s,l];}
  el("t-go").onclick=function(){
    var base=el("t-c").value, sch=el("t-s").value, p=toHSL(base), cols=[];
    if(sch==="analog")cols=[hsl(p[0]-30,p[1],p[2]),hsl(p[0]-15,p[1],p[2]),base,hsl(p[0]+15,p[1],p[2]),hsl(p[0]+30,p[1],p[2])];
    else if(sch==="comp")cols=[base,hsl(p[0]+180,p[1],p[2]),hsl(p[0]+180,p[1],p[2]*0.7),hsl(p[0],p[1],p[2]*0.7),hsl(p[0]+180,p[1],Math.min(0.9,p[2]*1.3))];
    else if(sch==="triad")cols=[base,hsl(p[0]+120,p[1],p[2]),hsl(p[0]+240,p[1],p[2]),hsl(p[0]+60,p[1],p[2]),hsl(p[0]+300,p[1],p[2])];
    else cols=[hsl(p[0],p[1],0.2),hsl(p[0],p[1],0.35),hsl(p[0],p[1],0.5),hsl(p[0],p[1],0.65),hsl(p[0],p[1],0.8)];
    el("t-out").innerHTML=cols.map(function(c){return '<span style="display:inline-block;width:56px;height:56px;border-radius:10px;background:'+c+';margin:4px;cursor:pointer;border:1px solid #ffffff22" title="'+c+'" onclick="navigator.clipboard&&navigator.clipboard.writeText(\''+c+'\')"></span>';}).join("")+'<div style="margin-top:8px;font-size:.8rem;color:var(--muted)">Click a color to copy its HEX</div>';
  };
  el("t-go").click();
}});

TOOLS.push({ id:"qr", cat:"image", icon:"🔳", name:"Free QR Code Generator Online",
desc:"Text, links, WiFi & more", how:"Type text or a URL, pick a size, press Generate QR, then download the code as a PNG.",
render:function(box){
  box.innerHTML = '<h2>🔳 QR Code Generator</h2><label>Text or URL</label><input type="text" id="t-in" placeholder="https://example.com"><label>Size</label><select id="t-s"><option value="200">200px</option><option value="300" selected>300px</option><option value="500">500px</option></select><button class="tool-btn" id="t-go">Generate QR</button><div style="text-align:center;margin-top:14px" id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button>';
  el("t-go").onclick=function(){
    var t=el("t-in").value.trim(); if(!t){el("t-prev").innerHTML="Enter text or URL.";return;}
    var s=el("t-s").value, url="https://api.qrserver.com/v1/create-qr-code/?size="+s+"x"+s+"&data="+encodeURIComponent(t);
    el("t-prev").innerHTML='<img src="'+url+'" alt="QR code" style="max-width:100%;height:auto;border-radius:10px;background:#fff;padding:8px">';
    var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(url,"qr.png");};
  };
}});

TOOLS.push({ id:"img-convert", cat:"image", icon:"🔁", name:"Free Image Format Converter Online",
desc:"PNG ↔ JPG ↔ WebP", how:"Upload an image, choose JPG, PNG or WebP, press Convert, then download the new file.",
render:function(box){
  box.innerHTML = '<h2>🔁 Format Converter</h2><label>Upload image</label><input type="file" id="t-f" accept="image/*"><label>Convert to</label><select id="t-t"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select><button class="tool-btn" id="t-go">Convert</button><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download</button>';
  var img=new Image();
  el("t-f").onchange=function(e){var r=new FileReader();r.onload=function(){img.src=r.result;};r.readAsDataURL(e.target.files[0]);};
  el("t-go").onclick=function(){
    if(!img.src){el("t-prev").innerHTML="<p>Upload an image.</p>";return;}
    var c=document.createElement("canvas"); c.width=img.width; c.height=img.height;
    var ctx=c.getContext("2d");
    if(el("t-t").value==="image/jpeg"){ctx.fillStyle="#fff";ctx.fillRect(0,0,c.width,c.height);}
    ctx.drawImage(img,0,0);
    var ext=el("t-t").value.split("/")[1].replace("jpeg","jpg");
    var url=c.toDataURL(el("t-t").value,0.92);
    el("t-prev").innerHTML='<img src="'+url+'" class="tool-canvas" alt="Converted image preview" style="max-width:100%;height:auto;max-height:300px">';
    var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(url,"converted."+ext);};
  };
}});

TOOLS.push({ id:"favicon", cat:"image", icon:"⭐", name:"Free Favicon Generator Online",
desc:"Image → browser icon", how:"Upload a square image or type an emoji, press Make Favicon, then download the icon for your website.",
render:function(box){
  box.innerHTML = '<h2>⭐ Favicon Generator</h2><label>Upload square image (or emoji screenshot)</label><input type="file" id="t-f" accept="image/*"><label>Or type an emoji</label><input type="text" id="t-e" placeholder="🚀" maxlength="4"><button class="tool-btn" id="t-go">Make Favicon</button><div id="t-prev" style="margin-top:12px"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG (64px)</button>';
  el("t-go").onclick=function(){
    var c=document.createElement("canvas"); c.width=64; c.height=64; var ctx=c.getContext("2d");
    function fin(url){ el("t-prev").innerHTML='<img src="'+url+'" alt="Favicon preview" style="width:64px;height:64px;border-radius:8px">'; var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(url,"favicon.png");}; }
    var f=el("t-f").files[0];
    if(f){ var r=new FileReader(); r.onload=function(){var im=new Image();im.onload=function(){ctx.drawImage(im,0,0,64,64);fin(c.toDataURL("image/png"));};im.src=r.result;}; r.readAsDataURL(f); }
    else if(el("t-e").value.trim()){ ctx.font="48px serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(el("t-e").value.trim(),32,36); fin(c.toDataURL("image/png")); }
    else el("t-prev").innerHTML="<p>Upload an image or type an emoji.</p>";
  };
}});

TOOLS.push({ id:"img-crop", cat:"image", icon:"🤏", name:"Free Image Cropper & Flipper Online",
desc:"Crop, flip, rotate", how:"Upload an image, enter crop X, Y, width and height or use flip and rotate, then download the result.",
render:function(box){
  box.innerHTML = '<h2>✂️ Cropper & Flipper</h2><label>Upload image</label><input type="file" id="t-f" accept="image/*"><div class="row"><div><label>Crop X</label><input type="number" id="t-x" value="0"></div><div><label>Crop Y</label><input type="number" id="t-y" value="0"></div><div><label>Width</label><input type="number" id="t-w" value="500"></div><div><label>Height</label><input type="number" id="t-h" value="500"></div></div><div class="row" style="margin-top:10px"><button class="tool-btn ghost" id="t-fh">↔ Flip H</button><button class="tool-btn ghost" id="t-fv">↕ Flip V</button><button class="tool-btn ghost" id="t-rt">↻ Rotate 90°</button></div><button class="tool-btn" id="t-go">Apply Crop</button><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download</button>';
  var img=new Image(), cur=null;
  el("t-f").onchange=function(e){var r=new FileReader();r.onload=function(){img.src=r.result;img.onload=function(){cur=img;show(cur);};};r.readAsDataURL(e.target.files[0]);};
  function show(im){ var c=document.createElement("canvas");c.width=im.width;c.height=im.height;c.getContext("2d").drawImage(im,0,0);el("t-prev").innerHTML="";el("t-prev").appendChild(c);c.className="tool-canvas";c.style.maxHeight="320px";cur=c;var b=el("t-dl");b.style.display="";b.onclick=function(){dl(c.toDataURL("image/png"),"edited.png");};}
  function xform(fn){ if(!cur){return;} var src=cur, c=document.createElement("canvas"); fn(c,src); show(c); }
  el("t-fh").onclick=function(){xform(function(c,s){c.width=s.width;c.height=s.height;var x=c.getContext("2d");x.translate(c.width,0);x.scale(-1,1);x.drawImage(s,0,0);});};
  el("t-fv").onclick=function(){xform(function(c,s){c.width=s.width;c.height=s.height;var x=c.getContext("2d");x.translate(0,c.height);x.scale(1,-1);x.drawImage(s,0,0);});};
  el("t-rt").onclick=function(){xform(function(c,s){c.width=s.height;c.height=s.width;var x=c.getContext("2d");x.translate(c.width/2,c.height/2);x.rotate(Math.PI/2);x.drawImage(s,-s.width/2,-s.height/2);});};
  el("t-go").onclick=function(){
    if(!img.src){el("t-prev").innerHTML="<p>Upload first.</p>";return;}
    var x=+el("t-x").value||0,y=+el("t-y").value||0,w=+el("t-w").value||img.width,h=+el("t-h").value||img.height;
    var c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,x,y,w,h,0,0,w,h);show(c);
  };
}});

TOOLS.push({ id:"meme", cat:"image", icon:"😂", name:"Free Meme Generator Online",
desc:"Top & bottom text memes", how:"Upload an image, add top and bottom text, press Make Meme, then download your meme.",
render:function(box){
  box.innerHTML = '<h2>😂 Meme Generator</h2><label>Upload image</label><input type="file" id="t-f" accept="image/*"><label>Top text</label><input type="text" id="t-t" placeholder="TOP TEXT"><label>Bottom text</label><input type="text" id="t-b" placeholder="bottom text"><button class="tool-btn" id="t-go">Make Meme</button><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download Meme</button>';
  var img=new Image();
  el("t-f").onchange=function(e){var r=new FileReader();r.onload=function(){img.src=r.result;};r.readAsDataURL(e.target.files[0]);};
  function draw(){
    if(!img.src){el("t-prev").innerHTML="<p>Upload an image.</p>";return null;}
    var c=document.createElement("canvas"), sc=Math.min(1,800/img.width);
    c.width=Math.round(img.width*sc); c.height=Math.round(img.height*sc);
    var x=c.getContext("2d"); x.drawImage(img,0,0,c.width,c.height);
    x.fillStyle="#fff"; x.strokeStyle="#000"; x.lineWidth=Math.max(2,c.width/200); x.textAlign="center";
    x.font="bold "+Math.round(c.width/12)+"px Impact, sans-serif";
    function txt(t,y){ t=t.toUpperCase(); x.strokeText(t,c.width/2,y); x.fillText(t,c.width/2,y); }
    if(el("t-t").value) txt(el("t-t").value, c.width/12+10);
    if(el("t-b").value) txt(el("t-b").value, c.height-18);
    return c;
  }
  ["t-t","t-b"].forEach(function(id){el(id).addEventListener("input",function(){var c=draw();if(c){el("t-prev").innerHTML="";el("t-prev").appendChild(c);c.className="tool-canvas";}});});
  el("t-go").onclick=function(){var c=draw();if(!c)return;el("t-prev").innerHTML="";el("t-prev").appendChild(c);c.className="tool-canvas";var b=el("t-dl");b.style.display="";b.onclick=function(){dl(c.toDataURL("image/png"),"meme.png");};};
}});

TOOLS.push({ id:"watermark", cat:"image", icon:"💧", name:"Free Watermark Adder Online",
desc:"Text watermark on photos", how:"Upload a photo, type your watermark text, set opacity, press Add Watermark, then download the protected image.",
render:function(box){
  box.innerHTML = '<h2>💧 Watermark Adder</h2><label>Upload image</label><input type="file" id="t-f" accept="image/*"><label>Watermark text</label><input type="text" id="t-t" placeholder="© Your Name"><label>Opacity</label><input type="range" id="t-o" min="10" max="100" value="50"><button class="tool-btn" id="t-go">Add Watermark</button><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download</button>';
  var img=new Image();
  el("t-f").onchange=function(e){var r=new FileReader();r.onload=function(){img.src=r.result;};r.readAsDataURL(e.target.files[0]);};
  el("t-go").onclick=function(){
    if(!img.src){el("t-prev").innerHTML="<p>Upload an image.</p>";return;}
    var t=el("t-t").value||"© Watermark";
    var c=document.createElement("canvas");c.width=img.width;c.height=img.height;
    var x=c.getContext("2d");x.drawImage(img,0,0);
    x.globalAlpha=(+el("t-o").value)/100; x.fillStyle="#fff";
    x.font="bold "+Math.round(c.width/20)+"px sans-serif"; x.textAlign="right";
    x.fillText(t,c.width-20,c.height-20); x.globalAlpha=1;
    el("t-prev").innerHTML="";el("t-prev").appendChild(c);c.className="tool-canvas";c.style.maxHeight="340px";
    var b=el("t-dl");b.style.display="";b.onclick=function(){dl(c.toDataURL("image/png"),"watermarked.png");};
  };
}});

TOOLS.push({ id:"upscaler", cat:"image", icon:"🔭", name:"Free Image Upscaler Online",
desc:"2x enlarge in browser", how:"Upload an image to enlarge it 2x with high-quality smoothing in your browser. Real AI upscaling needs a server.",
render:function(box){
  box.innerHTML = '<h2>🔍 Image Upscaler</h2><p class="tool-note">Real AI upscaling needs a server. This enlarges 2x with high-quality smoothing in your browser — good for small graphics, not a miracle for blurry photos.</p><label>Upload image</label><input type="file" id="t-f" accept="image/*"><button class="tool-btn" id="t-go">Upscale 2x</button><div class="tool-out" id="t-out"></div><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download</button>';
  var img=new Image();
  el("t-f").onchange=function(e){var r=new FileReader();r.onload=function(){img.src=r.result;};r.readAsDataURL(e.target.files[0]);};
  el("t-go").onclick=function(){
    if(!img.src){outHTML(box,"Upload an image.");return;}
    var c=document.createElement("canvas");c.width=img.width*2;c.height=img.height*2;
    var x=c.getContext("2d");x.imageSmoothingEnabled=true;x.imageSmoothingQuality="high";x.drawImage(img,0,0,c.width,c.height);
    outHTML(box,"Original: "+img.width+"x"+img.height+"\nUpscaled: "+c.width+"x"+c.height);
    el("t-prev").innerHTML="";el("t-prev").appendChild(c);c.className="tool-canvas";c.style.maxHeight="340px";
    var b=el("t-dl");b.style.display="";b.onclick=function(){dl(c.toDataURL("image/png"),"upscaled.png");};
  };
}});

/* ================= CALCULATORS & UTILITY ================= */

TOOLS.push({ id:"age", cat:"calc", icon:"🎂", name:"Free Age Calculator Online",
desc:"Exact age from birthdate", how:"Pick your date of birth and press Calculate Age to see your exact age in years, months and days.",
render:function(box){
  box.innerHTML = '<h2>🎂 Age Calculator</h2><label>Date of birth</label><input type="date" id="t-d"><button class="tool-btn" id="t-go">Calculate Age</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var d=new Date(el("t-d").value); if(isNaN(d)){outHTML(box,"Pick a date.");return;}
    var now=new Date(), y=now.getFullYear()-d.getFullYear(), m=now.getMonth()-d.getMonth(), day=now.getDate()-d.getDate();
    if(day<0){m--;day+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
    if(m<0){y--;m+=12;}
    var days=Math.floor((now-d)/86400000);
    outHTML(box,y+" years, "+m+" months, "+day+" days\nTotal days: "+days.toLocaleString()+"\nNext birthday: "+(function(){var n=new Date(now.getFullYear(),d.getMonth(),d.getDate());if(n<now)n.setFullYear(n.getFullYear()+1);return Math.ceil((n-now)/86400000)+" days";})());
  };
}});

TOOLS.push({ id:"discount", cat:"calc", cat2:"finance", icon:"💸", name:"Free Discount Calculator Online",
desc:"Sale price & savings", how:"Enter the original price and discount percent, then press Calculate to see the sale price and your savings.",
render:function(box){
  box.innerHTML = '<h2>💸 Discount Calculator</h2><div class="row"><div><label>Original price</label><input type="number" id="t-p" placeholder="1000"></div><div><label>Discount %</label><input type="number" id="t-d" placeholder="20"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var p=+el("t-p").value,d=+el("t-d").value;
    if(!p){outHTML(box,"Enter price.");return;}
    var save=p*d/100;
    outHTML(box,"You save: "+save.toFixed(2)+"\nFinal price: "+(p-save).toFixed(2));
  };
}});

TOOLS.push({ id:"emi", cat:"calc", cat2:"finance", icon:"🏦", name:"Free Loan / EMI Calculator Online",
desc:"Monthly payments", how:"Enter loan amount, annual interest and years, then press Calculate to see your monthly EMI payment.",
render:function(box){
  box.innerHTML = '<h2>🏦 EMI Calculator</h2><div class="row"><div><label>Loan amount</label><input type="number" id="t-p" placeholder="500000"></div><div><label>Annual interest %</label><input type="number" id="t-r" placeholder="12" step="0.1"></div><div><label>Years</label><input type="number" id="t-y" placeholder="5"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var P=+el("t-p").value,r=+el("t-r").value/1200,n=(+el("t-y").value)*12;
    if(!P||!n){outHTML(box,"Enter amount and years.");return;}
    var emi=r?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n;
    outHTML(box,"Monthly EMI: "+emi.toFixed(2)+"\nTotal payable: "+(emi*n).toFixed(2)+"\nTotal interest: "+(emi*n-P).toFixed(2));
  };
}});

TOOLS.push({ id:"bmi", cat:"calc", icon:"⚖️", name:"Free BMI Calculator Online",
desc:"Body mass index", how:"Enter your height in cm and weight in kg, press Calculate, and your BMI plus health category appears instantly.",
render:function(box){
  box.innerHTML = '<h2>⚖️ BMI Calculator</h2><div class="row"><div><label>Height (cm)</label><input type="number" id="t-h" placeholder="170"></div><div><label>Weight (kg)</label><input type="number" id="t-w" placeholder="65"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">General guide only — not medical advice.</p>';
  el("t-go").onclick=function(){
    var h=+el("t-h").value/100,w=+el("t-w").value;
    if(!h||!w){outHTML(box,"Enter height and weight.");return;}
    var b=w/(h*h), cat=b<18.5?"Underweight":b<25?"Normal ✅":b<30?"Overweight":"Obese";
    outHTML(box,"BMI: "+b.toFixed(1)+"\n"+cat);
  };
}});

TOOLS.push({ id:"password", cat:"dev", icon:"🔐", name:"Free Strong Password Generator Online",
desc:"Create strong, random passwords to keep your accounts safe", how:"Choose a length and whether to include symbols, then press Generate for a strong random password.",
render:function(box){
  box.innerHTML = '<h2>🔐 Password Generator</h2><div class="row"><div><label>Length</label><input type="number" id="t-l" value="16" min="8" max="64"></div><div><label>Include symbols</label><select id="t-s"><option value="1">Yes</option><option value="0">No</option></select></div></div><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out" style="font-family:monospace;font-size:1.05rem"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button><p class="tool-note">Generated on your device — never sent anywhere.</p>';
  el("t-go").onclick=function(){
    var len=Math.min(64,Math.max(8,+el("t-l").value||16));
    var ch="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"+(el("t-s").value==="1"?"!@#$%^&*()-_=+[]{}":"");
    var a=new Uint32Array(len); crypto.getRandomValues(a), out="";
    for(var i=0;i<len;i++) out+=ch[a[i]%ch.length];
    outHTML(box,esc(out)); var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(out,c);};
  };
}});

TOOLS.push({ id:"ip-check", cat:"smart", icon:"🌐", name:"Free IP Address Checker Online",
desc:"Your IP & location", how:"Press Show My IP to see your public IP address and approximate location.",
render:function(box){
  box.innerHTML = '<h2>🌐 IP Checker</h2><button class="tool-btn" id="t-go">Show My IP</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    outHTML(box,"Looking up...");
    fetch("https://ipapi.co/json/").then(function(r){return r.json();}).then(function(d){
      outHTML(box,"IP: "+d.ip+"\nCity: "+(d.city||"-")+", "+(d.region||"")+"\nCountry: "+(d.country_name||"-")+"\nISP: "+(d.org||"-"));
    }).catch(function(){outHTML(box,"Lookup failed — check connection.");});
  };
}});

TOOLS.push({ id:"speed", cat:"smart", icon:"⚡", name:"Free Internet Speed Test Online",
desc:"Basic download test", how:"Press Start to download a small test file and measure your connection speed. For certified results use your ISP tool.",
render:function(box){
  box.innerHTML = '<h2>⚡ Speed Test</h2><p class="tool-note">Basic test: downloads a ~5MB file and measures. For certified results use your ISP\u2019s tester.</p><button class="tool-btn" id="t-go">Start Test</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    outHTML(box,"Testing... downloading 5MB");
    var url="https://speed.cloudflare.com/__down?bytes=5000000&cb="+Date.now(), t0=performance.now();
    fetch(url).then(function(r){return r.blob();}).then(function(b){
      var sec=(performance.now()-t0)/1000, mbps=(b.size*8/sec/1e6).toFixed(1);
      outHTML(box,"Download speed: ~"+mbps+" Mbps\n("+(sec.toFixed(1))+"s for 5MB)");
    }).catch(function(){outHTML(box,"Test failed — check connection.");});
  };
}});

TOOLS.push({ id:"unit", cat:"calc", icon:"📏", name:"Free Unit Converter Online",
desc:"Length, weight, temperature", how:"Enter a value, pick the unit to convert from and to, and see the result instantly across length, weight and temperature.",
render:function(box){
  var U={Length:{m:1,km:1000,cm:0.01,mm:0.001,mi:1609.34,yd:0.9144,ft:0.3048,in:0.0254},Weight:{kg:1,g:0.001,lb:0.453592,oz:0.0283495},Temperature:{}};
  box.innerHTML = '<h2>📏 Unit Converter</h2><label>Category</label><select id="t-c"><option>Length</option><option>Weight</option><option>Temperature</option></select><div class="row"><div><label>Value</label><input type="number" id="t-v" value="1"></div><div><label>From</label><select id="t-f"></select></div><div><label>To</label><select id="t-t"></select></div></div><button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out"></div>';
  function fill(){
    var c=el("t-c").value, units=c==="Temperature"?["C","F","K"]:Object.keys(U[c]);
    el("t-f").innerHTML=units.map(function(u){return "<option>"+u+"</option>";}).join("");
    el("t-t").innerHTML=units.map(function(u){return "<option>"+u+"</option>";}).join("");
    el("t-t").selectedIndex=1;
  }
  el("t-c").onchange=fill; fill();
  el("t-go").onclick=function(){
    var v=+el("t-v").value,f=el("t-f").value,t=el("t-t").value,c=el("t-c").value,out;
    if(c==="Temperature"){
      var ck=f==="C"?v:f==="F"?(v-32)*5/9:v-273.15;
      out=t==="C"?ck:t==="F"?ck*9/5+32:ck+273.15;
    } else out=v*U[c][f]/U[c][t];
    el("t-out").textContent=v+" "+f+" = "+(+out.toFixed(4))+" "+t; el("t-out").style.display="block";
  };
}});

TOOLS.push({ id:"clock", cat:"smart", icon:"🕐", name:"Free World Clock Online",
desc:"Time in any timezone", how:"Pick any timezone from the list to see the current time there, updated live.",
render:function(box){
  box.innerHTML = '<h2>🕐 World Clock</h2><label>Timezone</label><select id="t-z"></select><div class="tool-out" id="t-out" style="display:block;font-size:1.3rem;text-align:center"></div>';
  var zones=["UTC","America/New_York","America/Chicago","America/Los_Angeles","Europe/London","Europe/Berlin","Asia/Dubai","Asia/Karachi","Asia/Kolkata","Asia/Singapore","Asia/Tokyo","Australia/Sydney","Pacific/Auckland"];
  el("t-z").innerHTML=zones.map(function(z){return "<option"+(z==="Asia/Karachi"?" selected":"")+">"+z+"</option>";}).join("");
  function tick(){
    try{ el("t-out").textContent=new Date().toLocaleString("en-US",{timeZone:el("t-z").value,hour12:true,weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit",second:"2-digit"}); }catch(e){}
  }
  el("t-z").onchange=tick; tick(); var iv=setInterval(tick,1000);
  box._cleanup=function(){clearInterval(iv);};
}});

TOOLS.push({ id:"currency", cat:"finance", icon:"💱", name:"Free Currency Converter Online",
desc:"Live exchange rates", how:"Enter an amount, choose the from and to currencies, and press Convert for live exchange rates.",
render:function(box){
  box.innerHTML = '<h2>💱 Currency Converter</h2><div class="row"><div><label>Amount</label><input type="number" id="t-a" value="100"></div><div><label>From</label><select id="t-f"></select></div><div><label>To</label><select id="t-t"></select></div></div><button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out"></div><p class="tool-note">Rates by Frankfurter (ECB reference).</p>';
  var cur=["USD","EUR","PKR","INR","GBP","AED","SAR","JPY","CNY","AUD","CAD"];
  el("t-f").innerHTML=cur.map(function(c){return "<option"+(c==="USD"?" selected":"")+">"+c+"</option>";}).join("");
  el("t-t").innerHTML=cur.map(function(c){return "<option"+(c==="PKR"?" selected":"")+">"+c+"</option>";}).join("");
  el("t-go").onclick=function(){
    var a=+el("t-a").value||0,f=el("t-f").value,t=el("t-t").value;
    outHTML(box,"Converting...");
    fetch("https://api.frankfurter.app/latest?amount="+a+"&from="+f+"&to="+t).then(function(r){return r.json();}).then(function(d){
      outHTML(box,a+" "+f+" = "+d.rates[t]+" "+t);
    }).catch(function(){outHTML(box,"Rate fetch failed.");});
  };
}});

/* ================= DEVELOPER ================= */

TOOLS.push({ id:"minifier", cat:"dev", icon:"🔻", name:"Free HTML/CSS/JS Minifier Online",
desc:"Remove whitespace & comments", how:"Paste your HTML, CSS or JS and press Minify to strip whitespace and comments, then copy the smaller code.",
render:function(box){
  box.innerHTML = '<h2>🗜️ Code Minifier</h2><label>Paste code</label><textarea id="t-in" placeholder="<html>..."></textarea><button class="tool-btn" id="t-go">Minify</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button><p class="tool-note">Basic minifier (whitespace + comments). For production JS use Terser.</p>';
  el("t-go").onclick=function(){
    var t=el("t-in").value; if(!t.trim()){outHTML(box,"Paste code.");return;}
    var o=t.replace(/\/\*[\s\S]*?\*\//g,"").replace(/([^:])\/\/.*/g,"$1").replace(/<!--[\s\S]*?-->/g,"").replace(/\s+/g," ").replace(/ ?([{};:,()\[\]<>]) ?/g,"$1").trim();
    outHTML(box,esc(o)+"\n\nSaved "+Math.round((1-o.length/t.length)*100)+"%");
    var c=el("t-copy");c.style.display="";c.onclick=function(){copyText(o,c);};
  };
}});

TOOLS.push({ id:"json", cat:"dev", icon:"🧾", name:"Free JSON Formatter & Validator Online",
desc:"Pretty-print or minify JSON", how:"Paste JSON and press Pretty Print to format it or Minify to compress it. Invalid JSON is flagged with an error.",
render:function(box){
  box.innerHTML = '<h2>🧾 JSON Formatter</h2><label>Paste JSON</label><textarea id="t-in" placeholder=\'{"name":"ali"}\'></textarea><div class="row"><button class="tool-btn" id="t-p">Pretty Print</button><button class="tool-btn ghost" id="t-m">Minify</button></div><div class="tool-out" id="t-out"></div>';
  function go(pretty){
    try{ var o=JSON.parse(el("t-in").value); outHTML(box,esc(pretty?JSON.stringify(o,null,2):JSON.stringify(o))); }
    catch(e){ outHTML(box,"❌ Invalid JSON: "+e.message); }
  }
  el("t-p").onclick=function(){go(true);}; el("t-m").onclick=function(){go(false);};
}});

TOOLS.push({ id:"base64", cat:"dev", icon:"🔣", name:"Free Base64 Encoder / Decoder Online",
desc:"Encode & decode text", how:"Type or paste text and press Encode to get Base64, or paste Base64 and press Decode to read it.",
render:function(box){
  box.innerHTML = '<h2>🔣 Base64</h2><label>Text</label><textarea id="t-in" placeholder="Hello world"></textarea><div class="row"><button class="tool-btn" id="t-e">Encode →</button><button class="tool-btn ghost" id="t-d">← Decode</button></div><div class="tool-out" id="t-out"></div>';
  el("t-e").onclick=function(){ try{outHTML(box,esc(btoa(unescape(encodeURIComponent(el("t-in").value)))));}catch(e){outHTML(box,"Encode failed.");} };
  el("t-d").onclick=function(){ try{outHTML(box,esc(decodeURIComponent(escape(atob(el("t-in").value.trim())))));}catch(e){outHTML(box,"❌ Not valid Base64.");} };
}});

TOOLS.push({ id:"slugify", cat:"dev", icon:"🔗", name:"Free URL Slugify Tool Online",
desc:"Title → url-friendly-slug", how:"Type a title and press Slugify to get a clean url-friendly-slug, then copy it.",
render:function(box){
  box.innerHTML = '<h2>🔗 Slugify</h2><label>Title</label><input type="text" id="t-in" placeholder="My Great Article!"><button class="tool-btn" id="t-go">Slugify</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-go").onclick=function(){
    var s=el("t-in").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
    if(!s){outHTML(box,"Type a title.");return;}
    outHTML(box,esc(s)); var c=el("t-copy");c.style.display="";c.onclick=function(){copyText(s,c);};
  };
}});

TOOLS.push({ id:"meta-tags", cat:"seo", icon:"🎫", name:"Free Meta Tag Generator (SEO) Online",
desc:"SEO + social meta tags", how:"Fill in page title, description and canonical URL, then press Generate to get SEO plus social meta tags to copy.",
render:function(box){
  box.innerHTML = '<h2>🏷️ Meta Tag Generator</h2><label>Page title</label><input type="text" id="t-t" placeholder="My Page"><label>Description</label><input type="text" id="t-d" placeholder="Short description..."><label>Canonical URL</label><input type="text" id="t-u" placeholder="https://example.com/page"><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Tags</button>';
  el("t-go").onclick=function(){
    var t=el("t-t").value.trim()||"My Page", d=el("t-d").value.trim()||"", u=el("t-u").value.trim();
    var h='<title>'+esc(t)+'</title>\n<meta name="description" content="'+esc(d)+'">\n'+(u?'<link rel="canonical" href="'+esc(u)+'">\n':"")+'<meta property="og:title" content="'+esc(t)+'">\n<meta property="og:description" content="'+esc(d)+'">\n'+(u?'<meta property="og:url" content="'+esc(u)+'">\n':"")+'<meta name="twitter:card" content="summary_large_image">';
    el("t-out").textContent=h; el("t-out").style.display="block";
    var c=el("t-copy");c.style.display="";c.onclick=function(){copyText(h,c);};
  };
}});

TOOLS.push({ id:"robots", cat:"seo", icon:"🤖", name:"Free Robots.txt Generator Online",
desc:"Crawl rules for SEO", how:"Choose allow-all or block some paths, list disallowed paths, then press Generate and copy your robots.txt.",
render:function(box){
  box.innerHTML = '<h2>🤖 Robots.txt Generator</h2><label>Allow all crawling?</label><select id="t-a"><option value="1">Yes — allow everything</option><option value="0">Block some paths</option></select><label>Disallow paths (one per line)</label><textarea id="t-d" placeholder="/admin/&#10;/private/"></textarea><label>Sitemap URL (optional)</label><input type="text" id="t-s" placeholder="https://example.com/sitemap.xml"><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-go").onclick=function(){
    var h="User-agent: *\n";
    if(el("t-a").value==="1") h+="Allow: /\n";
    else { var ds=el("t-d").value.split("\n"); ds.forEach(function(p){p=p.trim();if(p)h+="Disallow: "+p+"\n";}); if(!ds.join("").trim())h+="Disallow:\n"; }
    if(el("t-s").value.trim()) h+="\nSitemap: "+el("t-s").value.trim()+"\n";
    el("t-out").textContent=h; el("t-out").style.display="block";
    var c=el("t-copy");c.style.display="";c.onclick=function(){copyText(h,c);};
  };
}});

TOOLS.push({ id:"sitemap", cat:"seo", icon:"🗺️", name:"Free Sitemap XML Generator Online",
desc:"XML sitemap for Google", how:"Paste page URLs one per line, press Generate XML, then copy or download your sitemap.xml.",
render:function(box){
  box.innerHTML = '<h2>🗺️ Sitemap Generator</h2><label>Page URLs (one per line)</label><textarea id="t-u" placeholder="https://example.com/&#10;https://example.com/about"></textarea><button class="tool-btn" id="t-go">Generate XML</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost" id="t-copy" style="display:none">Copy XML</button><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download sitemap.xml</button>';
  el("t-go").onclick=function(){
    var urls=el("t-u").value.split("\n").map(function(u){return u.trim();}).filter(Boolean);
    if(!urls.length){outHTML(box,"Paste at least one URL.");return;}
    var x='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    urls.forEach(function(u){x+="  <url><loc>"+esc(u)+"</loc></url>\n";});
    x+="</urlset>";
    el("t-out").textContent=x; el("t-out").style.display="block";
    var c=el("t-copy");c.style.display="";c.onclick=function(){copyText(x,c);};
    var d=el("t-dl");d.style.display="";d.onclick=function(){dl("data:text/xml;charset=utf-8,"+encodeURIComponent(x),"sitemap.xml");};
  };
}});

TOOLS.push({ id:"color-picker", cat:"image", icon:"🎯", name:"Free Color Picker (HEX/RGB) Online",
desc:"Pick & convert colors", how:"Pick a color to instantly see its HEX, RGB and HSL codes, ready to copy.",
render:function(box){
  box.innerHTML = '<h2>🎯 Color Picker</h2><label>Pick a color</label><input type="color" id="t-c" value="#6366f1" style="height:60px"><div class="tool-out" id="t-out" style="display:block"></div>';
  function upd(){
    var h=el("t-c").value, r=parseInt(h.slice(1,3),16), g=parseInt(h.slice(3,5),16), b=parseInt(h.slice(5,7),16);
    el("t-out").innerHTML='<div style="width:100%;height:60px;border-radius:10px;background:'+h+';margin-bottom:10px"></div>HEX: '+h+'<br>RGB: rgb('+r+', '+g+', '+b+')<br>HSL: '+rgb2hsl(r,g,b);
  }
  function rgb2hsl(r,g,b){r/=255;g/=255;b/=255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),h=0,s=0,l=(mx+mn)/2;if(mx!==mn){var d=mx-mn;s=l>0.5?d/(2-mx-mn):d/(mx+mn);if(mx===r)h=(g-b)/d+(g<b?6:0);else if(mx===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60;}return "hsl("+Math.round(h)+", "+Math.round(s*100)+"%, "+Math.round(l*100)+"%)";}
  el("t-c").addEventListener("input",upd); upd();
}});

TOOLS.push({ id:"md-html", cat:"dev", icon:"📃", name:"Free Markdown to HTML Converter Online",
desc:"Basic MD → HTML", how:"Paste Markdown and press Convert to get HTML you can copy into your site.",
render:function(box){
  box.innerHTML = '<h2>📝 Markdown → HTML</h2><label>Markdown</label><textarea id="t-in" placeholder="# Title&#10;**bold** and *italic*"></textarea><button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy HTML</button>';
  el("t-go").onclick=function(){
    var t=el("t-in").value; if(!t.trim()){outHTML(box,"Paste markdown.");return;}
    var h=esc(t);
    h=h.replace(/^### (.*)$/gm,"<h3>$1</h3>").replace(/^## (.*)$/gm,"<h2>$1</h2>").replace(/^# (.*)$/gm,"<h1>$1</h1>");
    h=h.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/`(.+?)`/g,"<code>$1</code>");
    h=h.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2">$1</a>');
    h=h.split("\n").map(function(l){return /^<h|<ul|<li/.test(l)?l:(l.trim()?"<p>"+l+"</p>":l);}).join("\n");
    el("t-out").textContent=h; el("t-out").style.display="block";
    var c=el("t-copy");c.style.display="";c.onclick=function(){copyText(h,c);};
  };
}});

TOOLS.push({ id:"random", cat:"dev", icon:"🎲", name:"Free Random Number / Picker Online",
desc:"Numbers, dice, list picker", how:"Set a min and max and press Pick Number, or paste a list and pick a random winner from it.",
render:function(box){
  box.innerHTML = '<h2>🎲 Random Picker</h2><div class="row"><div><label>Min</label><input type="number" id="t-a" value="1"></div><div><label>Max</label><input type="number" id="t-b" value="100"></div></div><button class="tool-btn" id="t-go">Pick Number</button><div class="tool-out" id="t-out" style="display:block;font-size:1.6rem;text-align:center"></div><label style="margin-top:14px">Or pick from a list (one per line)</label><textarea id="t-l" placeholder="Ali&#10;Sara&#10;Ahmed"></textarea><button class="tool-btn ghost" id="t-go2">Pick from List</button>';
  el("t-go").onclick=function(){
    var a=+el("t-a").value,b=+el("t-b").value;
    if(a>b){var t=a;a=b;b=t;}
    el("t-out").textContent=a+Math.floor(Math.random()*(b-a+1));
  };
  el("t-go2").onclick=function(){
    var l=el("t-l").value.split("\n").map(function(s){return s.trim();}).filter(Boolean);
    if(!l.length){el("t-out").textContent="Add items first.";return;}
    el("t-out").textContent="🎉 "+l[Math.floor(Math.random()*l.length)];
  };
}});

/* ================= LEARN & LOCAL (9 new tools) ================= */
TOOLS.push({ id:"typing-test", cat:"learn", icon:"⌨️", name:"Free Typing Speed Test Online",
desc:"WPM + accuracy test",
how:"Click Start, type the shown sentence as fast as you can. We measure words-per-minute and accuracy live.",
render:function(box){
  box.innerHTML = '<h2>⌨️ Typing Speed Test</h2><p class="tool-note">Type the sentence below. The test ends after 30 seconds or when you finish it.</p><div id="t-sent" style="font-size:1.05rem;margin-bottom:10px;line-height:1.6;"></div><textarea id="t-in" rows="3" disabled placeholder="Press Start, then type here..." style="width:100%;box-sizing:border-box;"></textarea><div style="margin:8px 0;"><button class="tool-btn" id="t-go">Start Test</button></div><div class="tool-out" id="t-out">WPM: 0 · Accuracy: 100% · Time: 30s</div>';
  var SENTS = [
    "The quick brown fox jumps over the lazy dog near the river bank.",
    "Practice makes perfect when you type every single day with focus.",
    "Artificial intelligence is changing the way the whole world works today.",
    "A journey of a thousand miles begins with one small careful step.",
    "Fresh mangoes taste best in the hot summer season in Pakistan.",
    "Consistent effort beats talent when talent refuses to work hard."
  ];
  var sent="", startT=0, timer=null, done=false;
  function stats(){
    var typed = el("t-in").value;
    var elapsed = (Date.now()-startT)/1000;
    var correct = 0, i;
    for(i=0;i<typed.length && i<sent.length;i++){ if(typed[i]===sent[i]) correct++; }
    var mins = elapsed/60;
    return {
      wpm: mins>0 ? Math.round((correct/5)/mins) : 0,
      acc: typed.length ? Math.round(correct/typed.length*100) : 100,
      left: Math.max(0, 30-Math.floor(elapsed)),
      correct: correct, typed: typed.length
    };
  }
  function finish(){
    if(done) return; done = true;
    clearInterval(timer);
    el("t-in").disabled = true;
    var s = stats();
    el("t-out").textContent = "Done!\nWPM: "+s.wpm+"\nAccuracy: "+s.acc+"%\nCorrect characters: "+s.correct+"/"+s.typed;
  }
  el("t-go").onclick = function(){
    sent = SENTS[Math.floor(Math.random()*SENTS.length)];
    el("t-sent").textContent = sent;
    el("t-in").value = ""; el("t-in").disabled = false; el("t-in").focus();
    done = false; startT = Date.now();
    clearInterval(timer);
    el("t-out").textContent = "WPM: 0 · Accuracy: 100% · Time: 30s";
    timer = setInterval(function(){
      var s = stats();
      el("t-out").textContent = "WPM: "+s.wpm+" · Accuracy: "+s.acc+"% · Time: "+s.left+"s";
      if(s.left<=0 || s.typed>=sent.length) finish();
    },250);
  };
}});

TOOLS.push({ id:"dictionary", cat:"learn", icon:"📖", name:"Free English Dictionary Online",
desc:"Meanings, phonetics, examples",
how:"Type any English word and press Search to see its phonetic, meanings and examples.",
render:function(box){
  box.innerHTML = '<h2>📖 English Dictionary</h2><label>Word</label><input type="text" id="t-in" placeholder="e.g. serendipity"><button class="tool-btn" id="t-go">Search</button><div class="tool-out" id="t-out"></div><p class="tool-note">Free data: dictionaryapi.dev — no signup needed.</p>';
  el("t-go").onclick = function(){
    var w = el("t-in").value.trim();
    if(!w){ outHTML(box,"Type a word."); return; }
    outHTML(box,"Searching...");
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+encodeURIComponent(w)).then(function(r){
      if(!r.ok) throw 0; return r.json();
    }).then(function(d){
      var e = d[0], html = "<b>"+esc(e.word)+"</b>";
      if(e.phonetic) html += " <span>"+esc(e.phonetic)+"</span>";
      (e.meanings||[]).slice(0,3).forEach(function(m){
        html += "<br><br><i>"+esc(m.partOfSpeech||"")+"</i>";
        (m.definitions||[]).slice(0,2).forEach(function(df,i){
          html += "<br>"+(i+1)+". "+esc(df.definition||"");
          if(df.example) html += '<br><span style="opacity:.75">e.g. '+esc(df.example)+"</span>";
        });
      });
      outHTML(box, html);
    }).catch(function(){
      outHTML(box,"No definition found for \""+esc(w)+"\". Check the spelling and try again.");
    });
  };
}});

TOOLS.push({ id:"code-playground", cat:"dev", icon:"💻", name:"Free Online HTML CSS JS Playground",
desc:"Live code preview",
how:"Write HTML, CSS and JS in the three boxes, press Run, and see the live result below.",
render:function(box){
  box.innerHTML = '<h2>💻 HTML/CSS/JS Playground</h2><label>HTML</label><textarea id="t-h" rows="4" style="width:100%;box-sizing:border-box;" placeholder="<h1>Hello</h1>"></textarea><label>CSS</label><textarea id="t-c" rows="3" style="width:100%;box-sizing:border-box;" placeholder="h1 { color: rebeccapurple; }"></textarea><label>JavaScript</label><textarea id="t-j" rows="3" style="width:100%;box-sizing:border-box;" placeholder="document.body.style.background = &quot;#f0f0f0&quot;;"></textarea><button class="tool-btn" id="t-go">Run ▶</button><iframe id="t-f" title="preview" style="width:100%;height:260px;border:1px solid #444;border-radius:8px;background:#fff;margin-top:8px;"></iframe><p class="tool-note">Runs fully in your browser — nothing is uploaded anywhere.</p>';
  el("t-go").onclick = function(){
    el("t-f").srcdoc = el("t-h").value + "<style>"+el("t-c").value+"</style><script>"+el("t-j").value+"<\/script>";
  };
  /* shareable link: code in URL hash (base64) */
  try {
    var h = location.hash.split("code=")[1];
    if(h){ var d = JSON.parse(decodeURIComponent(escape(atob(h)))); el("t-h").value = d.h||""; el("t-c").value = d.c||""; el("t-j").value = d.j||""; el("t-go").click(); }
  } catch(e){}
  var shareBtn = document.createElement("button");
  shareBtn.className = "tool-btn ghost"; shareBtn.textContent = "🔗 Copy Share Link"; shareBtn.style.marginLeft = "8px";
  el("t-go").after(shareBtn);
  shareBtn.onclick = function(){
    var d = btoa(unescape(encodeURIComponent(JSON.stringify({ h: el("t-h").value, c: el("t-c").value, j: el("t-j").value }))));
    var link = location.origin + location.pathname + "#code-playground?code=" + d;
    copyText(link, shareBtn);
  };
}});

TOOLS.push({ id:"zakat", cat:"learn", cat2:"finance", icon:"🤲", name:"Free Zakat Calculator Online",
desc:"2.5% nisab-based",
how:"Enter cash, metals (by value or grams) and business assets, minus debts. Nisab is checked (87.48g gold / 612.36g silver) \u2014 zakat 2.5% only above nisab.",
render:function(box){
  box.innerHTML = '<h2>🤲 Zakat Calculator</h2>' +
  '<div class="row"><div><label>Cash (hand + bank)</label><input type="number" id="t-cash" placeholder="0"></div><div><label>Business assets</label><input type="number" id="t-bus" placeholder="0"></div></div>' +
  '<label>Enter metals as</label><select id="t-mode" style="max-width:220px"><option value="value">Value (your currency)</option><option value="grams">Grams / weight</option></select>' +
  '<div class="row" id="t-mv"><div><label>Gold value</label><input type="number" id="t-gv" placeholder="0"></div><div><label>Silver value</label><input type="number" id="t-sv" placeholder="0"></div></div>' +
  '<div class="row" id="t-mg" style="display:none"><div><label>Gold grams</label><input type="number" id="t-gg" placeholder="0"></div><div><label>Silver grams</label><input type="number" id="t-sg" placeholder="0"></div></div>' +
  '<div class="row"><div><label>Gold price per gram</label><input type="number" id="t-gpp" placeholder="e.g. 85"></div><div><label>Silver price per gram</label><input type="number" id="t-spp" placeholder="e.g. 1.1"></div></div>' +
  '<div style="margin:8px 0"><button class="tool-btn ghost" id="t-sync" type="button">📡 Sync live metal rates</button> <span class="tool-note" id="t-syncmsg" style="margin:0"></span></div>' +
  '<label>Debts / loans you owe</label><input type="number" id="t-debt" placeholder="0">' +
  '<label>Nisab basis</label><select id="t-nbasis" style="max-width:280px"><option value="lower">Lower of gold / silver (default)</option><option value="gold">Gold nisab (87.48g)</option><option value="silver">Silver nisab (612.36g)</option></select>' +
  '<p class="tool-note">Gold nisab is the common standard; silver nisab is lower, so more people become liable under it.</p>' +
  '<button class="tool-btn" id="t-go">Calculate Zakat</button><div class="tool-out" id="t-out"></div>' +
  '<h3 style="margin-top:18px">What is Nisab?</h3>' +
  '<p class="tool-note">Nisab is the minimum zakatable wealth you must hold for one full lunar year (haul) before zakat becomes due. The gold nisab is 87.48 grams (about 7.5 tola); the silver nisab is 612.36 grams (about 52.5 tola). Only zakatable assets count: cash, gold, silver, trade goods and investments \u2014 your personal home, car and furniture do not. Debts you owe are subtracted. <a href="tool-gold-rates.html">Check live gold &amp; silver rates</a></p>' +
  '<p class="tool-note">Nisab is valued in the same currency as your wealth. Per-gram prices must match your currency \u2014 live rates sync in USD/gram. This is an estimate \u2014 please consult your scholar.</p>';
  el("t-mode").onchange = function(){
    var m = el("t-mode").value === "grams";
    el("t-mv").style.display = m ? "none" : "";
    el("t-mg").style.display = m ? "" : "none";
  };
  el("t-sync").onclick = function(){
    try{
      var r = JSON.parse(localStorage.getItem("sawalai_metal_rates")||"null");
      if(r && r.gold>0 && r.silver>0){
        el("t-gpp").value = r.gold.toFixed(2); el("t-spp").value = r.silver.toFixed(2);
        el("t-syncmsg").textContent = "Synced USD/gram rates ("+(r.date||"cached")+") \u2014 enter wealth in USD.";
      } else { el("t-syncmsg").textContent = "No cached rates \u2014 open the Gold & Silver Rates tool and press Get Rates first."; }
    }catch(e){ el("t-syncmsg").textContent = "Could not read cached rates."; }
  };
  el("t-go").onclick = function(){
    var gp = +el("t-gpp").value||0, sp = +el("t-spp").value||0;
    var goldV, silvV;
    if(el("t-mode").value==="grams"){ goldV = (+el("t-gg").value||0)*gp; silvV = (+el("t-sg").value||0)*sp; }
    else { goldV = +el("t-gv").value||0; silvV = +el("t-sv").value||0; }
    var total = (+el("t-cash").value||0) + goldV + silvV + (+el("t-bus").value||0) - (+el("t-debt").value||0);
    if(total<=0){ outHTML(box,"No zakat due \u2014 your net zakatable wealth is not positive."); return; }
    if(gp<=0 || sp<=0){ outHTML(box,"Zakatable wealth: "+total.toFixed(2)+"\nEnter gold & silver per-gram prices (or tap \U0001F4E1 Sync live rates) to check the nisab."); return; }
    var nisG = 87.48*gp, nisS = 612.36*sp;
    var bsel = el("t-nbasis") ? el("t-nbasis").value : "lower";
    var nisab, basis;
    if(bsel==="gold"){ nisab = nisG; basis = "gold"; }
    else if(bsel==="silver"){ nisab = nisS; basis = "silver"; }
    else { nisab = Math.min(nisG, nisS); basis = nisG<=nisS ? "gold" : "silver"; }
    if(total < nisab){ outHTML(box,"Zakatable wealth: "+total.toFixed(2)+"\nNisab ("+basis+" basis): "+nisab.toFixed(2)+"\n<b>Below nisab \u2014 no zakat due.</b>"); return; }
    outHTML(box,"Zakatable wealth: "+total.toFixed(2)+"\nNisab ("+basis+" basis): "+nisab.toFixed(2)+"\nZakat (2.5%): "+(total*0.025).toFixed(2));
  };
}});

TOOLS.push({ id:"helpline", cat:"learn", icon:"🚨", name:"Emergency Helpline Directory",
desc:"PK, US, UK, UAE numbers",
how:"Pick your country to see police, ambulance and fire emergency numbers.",
render:function(box){
  var DATA = {
    pk:[["Police","15"],["Rescue / Ambulance","1122"],["Fire","16"],["Motorway Police","130"]],
    us:[["All emergencies","911"]],
    uk:[["Emergency","999"],["Alternate","112"]],
    ae:[["Police","999"],["Ambulance","998"],["Fire","997"]],
    ind:[["Police","100"],["Ambulance","102"],["Fire","101"]],
    sa:[["Police","999"],["Ambulance","997"],["Fire","998"]]
  };
  box.innerHTML = '<h2>🚨 Emergency Helplines</h2><label>Country</label><select id="t-c"><option value="us">USA</option><option value="uk">UK</option><option value="pk">Pakistan</option><option value="ae">UAE</option><option value="ind">India</option><option value="sa">Saudi Arabia</option></select><button class="tool-btn" id="t-go">Show Numbers</button><div class="tool-out" id="t-out"></div><p class="tool-note">In a real emergency, call immediately — do not rely on a website.</p>';
  el("t-go").onclick = function(){
    var rows = DATA[el("t-c").value] || [];
    var html = "";
    rows.forEach(function(r){ html += esc(r[0])+": <b>"+esc(r[1])+"</b><br>"; });
    outHTML(box, html || "No data.");
  };
}});

TOOLS.push({ id:"recipe-finder", cat:"learn", icon:"🍳", name:"Free Recipe Finder Online",
desc:"Search by ingredient",
how:"Type an ingredient (e.g. chicken) and get matching recipes with photos. Click a recipe for full details.",
render:function(box){
  box.innerHTML = '<h2>🍳 Recipe Finder</h2><label>Ingredient</label><input type="text" id="t-in" placeholder="e.g. chicken"><button class="tool-btn" id="t-go">Search Recipes</button><div class="tool-out" id="t-out"></div><p class="tool-note">Free data: TheMealDB — no signup needed.</p>';
  function showDetail(id){
    outHTML(box,"Loading recipe...");
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+encodeURIComponent(id)).then(function(r){ return r.json(); }).then(function(d){
      var m = d.meals[0], ing = [], i;
      for(i=1;i<=20;i++){
        var g = m["strIngredient"+i], ms = m["strMeasure"+i];
        if(g && g.trim()) ing.push(esc(g.trim()) + (ms && ms.trim() ? " — "+esc(ms.trim()) : ""));
      }
      outHTML(box,"<b>"+esc(m.strMeal)+"</b><br>"+'<img src="'+m.strMealThumb+'/medium" alt="" style="max-width:100%;border-radius:10px;margin:8px 0;">'+"<br><b>Ingredients:</b><br>"+ing.join("<br>")+"<br><br><b>Instructions:</b><br>"+esc(m.strInstructions||"").slice(0,1200));
    }).catch(function(){ outHTML(box,"Could not load the recipe. Try again."); });
  }
  el("t-go").onclick = function(){
    var q = el("t-in").value.trim();
    if(!q){ outHTML(box,"Type an ingredient."); return; }
    outHTML(box,"Searching...");
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i="+encodeURIComponent(q)).then(function(r){ return r.json(); }).then(function(d){
      if(!d.meals){ outHTML(box,"No recipes found for \""+esc(q)+"\". Try another ingredient."); return; }
      var html = "";
      d.meals.slice(0,12).forEach(function(m){
        html += '<div style="display:flex;gap:10px;align-items:center;margin:8px 0;">'+'<img src="'+m.strMealThumb+'/preview" alt="" style="width:64px;height:64px;border-radius:8px;object-fit:cover;">'+"<b>"+esc(m.strMeal)+'</b> <button class="tool-btn ghost" data-id="'+m.idMeal+'">View</button></div>';
      });
      outHTML(box, html);
      var btns = box.querySelectorAll("[data-id]"), i;
      for(i=0;i<btns.length;i++){
        (function(b){ b.onclick = function(){ showDetail(b.getAttribute("data-id")); }; })(btns[i]);
      }
    }).catch(function(){ outHTML(box,"Could not load recipes. Check your connection."); });
  };
}});

TOOLS.push({ id:"weather-tool", cat:"learn", icon:"🌤️", name:"Free Weather Forecast Online",
desc:"7-day, any city",
how:"Type any city name to see the current weather and 7-day forecast.",
render:function(box){
  var WM = {0:"☀️ Clear",1:"🌤️ Mostly clear",2:"⛅ Partly cloudy",3:"☁️ Overcast",45:"🌫️ Fog",48:"🌫️ Fog",51:"🌦️ Drizzle",61:"🌧️ Rain",63:"🌧️ Rain",65:"⛈️ Heavy rain",71:"🌨️ Snow",73:"🌨️ Snow",75:"❄️ Heavy snow",80:"🌦️ Showers",81:"🌧️ Showers",95:"⛈️ Thunderstorm"};
  box.innerHTML = '<h2>🌤️ Weather Forecast</h2><label>City</label><input type="text" id="t-in" placeholder="e.g. Lahore"><button class="tool-btn" id="t-go">Get Weather</button><div class="tool-out" id="t-out"></div><p class="tool-note">Free data: Open-Meteo — no signup needed.</p>';
  el("t-go").onclick = function(){
    var c = el("t-in").value.trim();
    if(!c){ outHTML(box,"Type a city name."); return; }
    outHTML(box,"Loading...");
    fetch("https://geocoding-api.open-meteo.com/v1/search?name="+encodeURIComponent(c)+"&count=1").then(function(r){ return r.json(); }).then(function(g){
      if(!g.results || !g.results.length) throw 0;
      var p = g.results[0];
      return fetch("https://api.open-meteo.com/v1/forecast?latitude="+p.latitude+"&longitude="+p.longitude+"&current=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=7").then(function(r){ return r.json(); }).then(function(w){ return {p:p, w:w}; });
    }).then(function(x){
      var cur = x.w.current, d = x.w.daily;
      var html = "<b>📍 "+esc(x.p.name)+"</b> — "+Math.round(cur.temperature_2m)+"°C, "+(WM[cur.weathercode]||"—");
      var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], i;
      for(i=0;i<d.time.length;i++){
        var dt = new Date(d.time[i]+"T12:00:00");
        html += "<br>"+(i===0 ? "Today" : days[dt.getDay()])+" · "+(WM[d.weathercode[i]]||"—")+" · "+Math.round(d.temperature_2m_max[i])+"°/"+Math.round(d.temperature_2m_min[i])+"°";
      }
      outHTML(box, html);
    }).catch(function(){ outHTML(box,"City not found. Try another spelling."); });
  };
}});

TOOLS.push({ id:"khwab-tabeer", cat:"learn", icon:"🌙", name:"Khwabon ki Tabeer — Dream Meanings",
desc:"Traditional interpretations",
how:"Type a word from your dream (e.g. snake, water, flying) to see its traditional meaning.",
render:function(box){
  var D = [
    {k:"snake", en:"A hidden enemy or a deceitful person near you — be cautious.", ur:"چھپا دشمن یا دھوکے باز شخص — محتاط رہیں۔"},
    {k:"water", en:"Clear water means blessings and relief; muddy water means worries.", ur:"صاف پانی برکت اور راحت؛ گدلا پانی فکروں کی علامت۔"},
    {k:"flying", en:"Rising in status, freedom, or achieving a big goal.", ur:"ترقی، آزادی یا بڑے مقصد کا حصول۔"},
    {k:"falling", en:"Fear of failure or losing control — slow down and reflect.", ur:"ناکامی کا خوف — ذرا ٹھہر کر غور کریں۔"},
    {k:"teeth", en:"Linked with family matters; falling teeth may mean concern for relatives.", ur:"خاندانی معاملات؛ دانت گرنا عزیزوں کی فکر کی علامت۔"},
    {k:"death", en:"Often means a long life or the end of a difficult phase — not literal.", ur:"لمبی عمر یا مشکل دور کے خاتمے کی علامت — لفظی نہ لیں۔"},
    {k:"wedding", en:"Joy and new beginnings; for the unmarried, a possible proposal.", ur:"خوشی اور نئی شروعات؛ غیر شادی شدہ کے لیے رشتے کا امکان۔"},
    {k:"baby", en:"New responsibility, blessing, or a fresh start in life.", ur:"نئی ذمہ داری، برکت یا زندگی میں نئی شروعات۔"},
    {k:"money", en:"Finding money means unexpected gain; losing it warns of wastefulness.", ur:"پیسہ ملنا غیر متوقع فائدہ؛ کھونا فضول خرچی کی تنبیہ۔"},
    {k:"gold", en:"Wealth and honor, but sometimes a test of greed.", ur:"دولت اور عزت؛ کبھی لالچ کی آزمائش۔"},
    {k:"rain", en:"Mercy, blessings and relief after hardship.", ur:"رحمت، برکت اور مشکل کے بعد آسانی۔"},
    {k:"fire", en:"Trials or strong emotions; a controlled fire can mean passion for work.", ur:"آزمائش یا شدید جذبات؛ قابو میں آگ محنت کی لگن۔"},
    {k:"dog", en:"A loyal friend; a barking dog may mean a harsh-tongued person.", ur:"وفادار دوست؛ بھونکتا کتا سخت زبان والے شخص کی علامت۔"},
    {k:"cat", en:"Independence, or a cunning person around you.", ur:"خودمختاری یا آس پاس چالاک شخص۔"},
    {k:"lion", en:"Power, courage, or facing a strong authority.", ur:"طاقت، ہمت یا کسی بااثر شخصیت کا سامنا۔"},
    {k:"fish", en:"Sustenance and lawful earnings (rizq).", ur:"رزق اور حلال کمائی کی علامت۔"},
    {k:"horse", en:"Honor, travel, or swift success.", ur:"عزت، سفر یا جلد کامیابی۔"},
    {k:"house", en:"Your life and family; a bright house means peace at home.", ur:"آپ کی زندگی اور خاندان؛ روشن گھر سکون کی علامت۔"},
    {k:"car", en:"The direction of your life; driving smoothly means you are in control.", ur:"زندگی کی سمت؛ آسانی سے چلانا کنٹرول کی علامت۔"},
    {k:"traveling", en:"A change or journey ahead — physical or spiritual.", ur:"آنے والی تبدیلی یا سفر — دنیوی یا روحانی۔"},
    {k:"prayer", en:"Closeness to Allah and acceptance of duas.", ur:"اللہ سے قربت اور دعاؤں کی قبولیت۔"},
    {k:"quran", en:"Guidance, wisdom and blessings in knowledge.", ur:"ہدایت، حکمت اور علم میں برکت۔"},
    {k:"prophet", en:"A very blessed dream — glad tidings and guidance.", ur:"بہت مبارک خواب — خوشخبری اور ہدایت۔"},
    {k:"mother", en:"Mercy, love, and duas being answered.", ur:"محبت، شفقت اور دعاؤں کی قبولیت۔"},
    {k:"father", en:"Support, protection and responsibility.", ur:"سہارا، تحفظ اور ذمہ داری۔"},
    {k:"mirror", en:"Self-reflection; a clear mirror means a clear conscience.", ur:"خود احتسابی؛ صاف آئینہ صاف ضمیر کی علامت۔"},
    {k:"stars", en:"Guidance, scholars, or high aspirations.", ur:"رہنمائی، علماء یا بلند ارادے۔"},
    {k:"moon", en:"A righteous leader, or beauty and calm in life.", ur:"نیک رہنما یا زندگی میں حسن و سکون۔"},
    {k:"sun", en:"A powerful authority, or clarity after confusion.", ur:"بااختیار شخصیت یا الجھن کے بعد وضاحت۔"},
    {k:"ocean", en:"Vast knowledge or overwhelming emotions — context matters.", ur:"وسیع علم یا شدید جذبات — سیاق و سباق اہم۔"},
    {k:"river", en:"Flowing sustenance; crossing it means overcoming difficulty.", ur:"بہتا رزق؛ پار کرنا مشکل پر قابو کی علامت۔"},
    {k:"mountain", en:"A big goal, or a strong unmoving person in your life.", ur:"بڑا مقصد یا زندگی میں مضبوط شخصیت۔"},
    {k:"tree", en:"Growth, family roots, or a generous person.", ur:"ترقی، خاندانی جڑیں یا سخی شخص۔"},
    {k:"fruit", en:"Sweet results of your efforts.", ur:"محنت کے میٹھے ثمرات۔"},
    {k:"milk", en:"Pure sustenance and wholesome earnings.", ur:"پاک رزق اور حلال کمائی۔"},
    {k:"honey", en:"Sweet lawful earnings and healing.", ur:"میٹھی حلال کمائی اور شفا۔"},
    {k:"sword", en:"Strength in argument or authority; sheathed is safer than drawn.", ur:"دلیل میں قوت یا اختیار۔"},
    {k:"war", en:"Inner conflict, or a struggle to face with courage.", ur:"اندرونی کشمکش یا ہمت سے مقابلہ۔"},
    {k:"exam", en:"Being tested in life — prepare and stay confident.", ur:"زندگی کی آزمائش — تیاری اور اعتماد۔"},
    {k:"school", en:"A learning phase; returning to school means a lesson to relearn.", ur:"سیکھنے کا دور؛ واپسی کسی سبق کی یاددہانی۔"}
  ];
  box.innerHTML = '<h2>🌙 Khwabon ki Tabeer</h2><label>Dream word (English)</label><input type="text" id="t-in" placeholder="e.g. snake, water, flying"><button class="tool-btn" id="t-go">See Meaning</button><div class="tool-out" id="t-out"></div><p class="tool-note">Traditional interpretations, not religious rulings — for guidance, consult a scholar.</p>';
  el("t-go").onclick = function(){
    var q = el("t-in").value.trim().toLowerCase();
    if(!q){ outHTML(box,"Type a word from your dream."); return; }
    var hits = D.filter(function(e){ return e.k.indexOf(q)!==-1 || q.indexOf(e.k)!==-1; });
    if(!hits.length){ outHTML(box,"No meaning found for \""+esc(q)+"\". Try: snake, water, flying, wedding, prayer..."); return; }
    var html = "";
    hits.slice(0,5).forEach(function(e){
      html += "<b>🌙 "+esc(e.k)+"</b><br>"+esc(e.en)+"<br><span>"+esc(e.ur)+"</span><br><br>";
    });
    outHTML(box, html);
  };
}});

TOOLS.push({ id:"site-speed", cat:"seo", icon:"🚀", name:"Free Website Speed & SEO Checker",
desc:"Analyze page performance",
how:"Press Analyze to check THIS page's load time, size, images and basic SEO (title, description, H1, alt texts) with a score out of 100.",
render:function(box){
  box.innerHTML = '<h2>🚀 Website Speed & SEO Checker</h2><p class="tool-note">Analyzes THIS page live, right now.</p><button class="tool-btn" id="t-go">Analyze This Page</button><div class="tool-out" id="t-out"></div><p class="tool-note">Tip: scanning other websites needs a server — this tool audits the page you are on.</p>';
  el("t-go").onclick = function(){
    var t = performance.timing;
    var loadMs = t.loadEventEnd - t.navigationStart;
    if(!(loadMs>0)) loadMs = Date.now() - t.navigationStart;
    var loadS = loadMs/1000;
    var nodes = document.querySelectorAll("*").length;
    var imgs = document.images.length, missingAlt = 0, i;
    for(i=0;i<imgs;i++){ var a = document.images[i].getAttribute("alt"); if(a===null || a.trim()==="") missingAlt++; }
    var title = document.title || "";
    var md = document.querySelector('meta[name="description"]');
    var mdLen = md ? (md.getAttribute("content")||"").length : 0;
    var h1c = document.querySelectorAll("h1").length;
    var score = 100, rows = [];
    function pen(n,why){ score -= n; rows.push("-"+n+": "+why); }
    function ok(why){ rows.push("OK: "+why); }
    if(loadS>3) pen(10,"Load time "+loadS.toFixed(1)+"s is over 3s"); else ok("Load time "+loadS.toFixed(1)+"s");
    if(nodes>1500) pen(5,nodes+" DOM nodes (heavy page)"); else ok(nodes+" DOM nodes");
    if(missingAlt>0) pen(Math.min(15,missingAlt*5), missingAlt+" images missing alt text"); else ok(imgs+" images, all have alt text");
    if(!md) pen(10,"No meta description"); else ok("Meta description present ("+mdLen+" chars)");
    if(h1c<1) pen(10,"No H1 heading"); else ok("H1 present ("+h1c+")");
    if(!title || title.length>60) pen(5,"Title missing or over 60 chars"); else ok("Title OK ("+title.length+" chars)");
    score = Math.max(0,score);
    outHTML(box,"<b>Score: "+score+"/100</b><br>"+rows.join("<br>"));
  };
}});

/* ================= MEGA TOOLS (122, 2026-10-10) ================= */
TOOLS.push({ id:"sci-calc", cat:"calc", icon:"🔬", name:"Free Scientific Calculator Online",
desc:"sin cos tan log powers", how:"Type a math expression with + - * / % ^, parentheses and functions like sin sqrt log, choose degrees or radians, then press Calculate.",
render:function(box){
  box.innerHTML = '<h2>🔬 Scientific Calculator</h2><label>Expression</label><input type="text" id="t-ex" placeholder="e.g. sin(30)+2^3*sqrt(16)"><div class="row"><div><label>Angle mode</label><select id="t-am"><option value="deg">Degrees</option><option value="rad">Radians</option></select></div></div><button class="tool-btn" id="t-go">Calculate</button> <button class="tool-btn ghost" id="t-try">✨ Try example</button><div class="tool-out" id="t-out"></div><p class="tool-note">Operators: + - * / % ^ ( ). Functions: sqrt sin cos tan asin acos atan log ln exp abs. Constants: pi e.</p>';
  el("t-try").onclick=function(){el("t-ex").value="sin(30)+2^3*sqrt(16)";el("t-go").click();};
  el("t-go").onclick=function(){
    var expr=el("t-ex").value.trim();
    if(!expr){outHTML(box,"Enter an expression.");return;}
    var deg=el("t-am").value==="deg";
    var i=0,err="",toks=[];
    while(i<expr.length){
      var ch=expr.charAt(i);
      if(ch===" "||ch==="\t"||ch==="\n"){i++;continue;}
      if((ch>="0"&&ch<="9")||ch==="."){
        var num="";
        while(i<expr.length){var ch2=expr.charAt(i);if(!((ch2>="0"&&ch2<="9")||ch2==="."))break;num+=ch2;i++;}
        var dots=num.split(".").length-1;
        if(dots>1||num==="."){err="Bad number '"+num+"'.";break;}
        toks.push({t:"n",v:parseFloat(num)});continue;
      }
      if((ch>="a"&&ch<="z")||(ch>="A"&&ch<="Z")){
        var nm="";
        while(i<expr.length){var ch3=expr.charAt(i);if(!((ch3>="a"&&ch3<="z")||(ch3>="A"&&ch3<="Z")))break;nm+=ch3;i++;}
        toks.push({t:"f",v:nm.toLowerCase()});continue;
      }
      if("+-*/%^(),".indexOf(ch)>=0){toks.push({t:"o",v:ch});i++;continue;}
      err="Unexpected character '"+ch+"'.";break;
    }
    if(err){outHTML(box,esc(err));return;}
    var pos=0;
    function peek(){return pos<toks.length?toks[pos]:null;}
    function next(){return toks[pos++];}
    function applyFn(fn,a){
      if(isNaN(a))return NaN;
      var toR=deg?Math.PI/180:1,toD=deg?180/Math.PI:1;
      if(fn==="sqrt"){if(a<0){err="sqrt of a negative number.";return NaN;}return Math.sqrt(a);}
      if(fn==="sin")return Math.sin(a*toR);
      if(fn==="cos")return Math.cos(a*toR);
      if(fn==="tan"){var c=Math.cos(a*toR);if(Math.abs(c)<1e-12){err="tan is undefined at this angle.";return NaN;}return Math.tan(a*toR);}
      if(fn==="asin"){if(a<-1||a>1){err="asin domain is -1 to 1.";return NaN;}return Math.asin(a)*toD;}
      if(fn==="acos"){if(a<-1||a>1){err="acos domain is -1 to 1.";return NaN;}return Math.acos(a)*toD;}
      if(fn==="atan")return Math.atan(a)*toD;
      if(fn==="log"){if(a<=0){err="log of a non-positive number.";return NaN;}return Math.log(a)/Math.LN10;}
      if(fn==="ln"){if(a<=0){err="ln of a non-positive number.";return NaN;}return Math.log(a);}
      if(fn==="exp")return Math.exp(a);
      if(fn==="abs")return Math.abs(a);
      err="Unknown function '"+fn+"'.";return NaN;
    }
    function parseP(){
      if(err)return NaN;
      var t=next();
      if(!t){err="Unexpected end of expression.";return NaN;}
      if(t.t==="n")return t.v;
      if(t.t==="o"&&t.v==="("){
        var v=parseE();if(err)return NaN;
        var c=next();
        if(!c||c.t!=="o"||c.v!==")"){err="Missing closing parenthesis.";return NaN;}
        return v;
      }
      if(t.t==="f"){
        if(t.v==="pi")return Math.PI;
        if(t.v==="e")return Math.E;
        var c2=next();
        if(!c2||c2.t!=="o"||c2.v!=="("){err="Expected ( after '"+t.v+"'.";return NaN;}
        var a=parseE();if(err)return NaN;
        var c3=next();
        if(!c3||c3.t!=="o"||c3.v!==")"){err="Missing ) after '"+t.v+"'.";return NaN;}
        return applyFn(t.v,a);
      }
      err="Unexpected '"+t.v+"'.";return NaN;
    }
    function parseN(){
      if(err)return NaN;
      var t=peek();
      if(t&&t.t==="o"&&(t.v==="+"||t.v==="-")){next();var v=parseN();if(err)return NaN;return t.v==="-"?-v:v;}
      return parseP();
    }
    function parseU(){
      if(err)return NaN;
      var v=parseN();if(err)return NaN;
      var t=peek();
      if(t&&t.t==="o"&&t.v==="^"){next();var w=parseU();if(err)return NaN;var pw=Math.pow(v,w);if(isNaN(pw)){err="Invalid power (e.g. negative base with fractional exponent).";return NaN;}return pw;}
      return v;
    }
    function parseT(){
      if(err)return NaN;
      var v=parseU();if(err)return NaN;
      for(;;){
        var t=peek();
        if(!t||t.t!=="o"||(t.v!=="*"&&t.v!=="/"&&t.v!=="%"))break;
        next();var w=parseU();if(err)return NaN;
        if(t.v==="*")v=v*w;
        else{if(w===0){err="Division by zero.";return NaN;}v=t.v==="/"?v/w:v%w;}
      }
      return v;
    }
    function parseE(){
      if(err)return NaN;
      var v=parseT();if(err)return NaN;
      for(;;){
        var t=peek();
        if(!t||t.t!=="o"||(t.v!=="+"&&t.v!=="-"))break;
        next();var w=parseT();if(err)return NaN;
        v=t.v==="+"?v+w:v-w;
      }
      return v;
    }
    var res=parseE();
    if(!err&&pos<toks.length)err="Unexpected '"+toks[pos].v+"'.";
    if(err){outHTML(box,esc(err));return;}
    if(isNaN(res)){outHTML(box,"Could not evaluate that expression.");return;}
    if(!isFinite(res)){outHTML(box,"Result is too large to display.");return;}
    outHTML(box,esc(expr)+" = <b>"+parseFloat(res.toPrecision(12))+"</b>");
  };
}});

TOOLS.push({ id:"cgpa", cat:"calc", icon:"🎓", name:"Free CGPA Calculator Online",
desc:"Semester grade points", how:"Add your courses with credit hours and grades, then press Calculate CGPA to see your grade point average and total credits.",
render:function(box){
  box.innerHTML = '<h2>🎓 CGPA Calculator</h2><div id="t-rows"></div><button class="tool-btn ghost" id="t-add">+ Add Course</button><button class="tool-btn" id="t-go">Calculate CGPA</button><div class="tool-out" id="t-out"></div>';
  var GRADES=[["A",4.0],["A-",3.7],["B+",3.3],["B",3.0],["B-",2.7],["C+",2.3],["C",2.0],["C-",1.7],["D",1.0],["F",0]];
  function gradeOpts(){var h="";for(var i=0;i<GRADES.length;i++)h+='<option value="'+GRADES[i][1]+'">'+GRADES[i][0]+' ('+GRADES[i][1].toFixed(1)+')</option>';return h;}
  function addRow(){
    var d=document.createElement("div");d.className="row";
    d.innerHTML='<div><label>Course</label><input type="text" class="cg-nm" placeholder="e.g. Math"></div><div><label>Credit hours</label><input type="number" class="cg-cr" placeholder="3" min="0" step="0.5"></div><div><label>Grade</label><select class="cg-gr">'+gradeOpts()+'</select></div>';
    el("t-rows").appendChild(d);
  }
  addRow();addRow();addRow();
  el("t-add").onclick=addRow;
  el("t-go").onclick=function(){
    var crs=box.querySelectorAll(".cg-cr"),grs=box.querySelectorAll(".cg-gr"),nms=box.querySelectorAll(".cg-nm");
    var tot=0,pts=0,cnt=0,lines=[];
    for(var i=0;i<crs.length;i++){
      var c=parseFloat(crs[i].value);
      if(isNaN(c)||c<=0)continue;
      var g=parseFloat(grs[i].value);
      tot+=c;pts+=c*g;cnt++;
      var nm=nms[i].value.trim()||("Course "+(i+1));
      lines.push(esc(nm)+": "+c+" cr x "+g.toFixed(1)+" = "+(c*g).toFixed(2));
    }
    if(!cnt){outHTML(box,"Enter credit hours for at least one course.");return;}
    var cg=pts/tot;
    var grade=cg>=3.7?"A range":cg>=3.0?"B range":cg>=2.0?"C range":cg>=1.0?"D range":"F range";
    outHTML(box,"<b>CGPA: "+cg.toFixed(2)+"</b> ("+grade+")\nTotal credit hours: "+tot+"\n\n"+lines.join("\n"));
  };
}});

TOOLS.push({ id:"pct-change", cat:"calc", cat2:"finance", icon:"💯", name:"Free Percentage Change Calculator Online",
desc:"Increase / decrease percent", how:"Enter the old and new values and press Calculate to see the percentage change, increase or decrease label, and difference.",
render:function(box){
  box.innerHTML = '<h2>📊 Percentage Change Calculator</h2><div class="row"><div><label>Old value</label><input type="number" id="t-o" placeholder="80"></div><div><label>New value</label><input type="number" id="t-n" placeholder="100"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var so=el("t-o").value,sn=el("t-n").value;
    if(so===""||sn===""||isNaN(+so)||isNaN(+sn)){outHTML(box,"Enter both values.");return;}
    var o=+so,n=+sn;
    if(o===0){outHTML(box,"Old value cannot be 0 — percent change is undefined.");return;}
    var ch=(n-o)/Math.abs(o)*100,diff=n-o;
    var lbl=diff>0?"increase 📈":diff<0?"decrease 📉":"no change";
    var ds=(diff>0?"+":"")+parseFloat(diff.toPrecision(10));
    outHTML(box,"Change: <b>"+parseFloat(ch.toPrecision(10))+"%</b> ("+lbl+")\nAbsolute difference: "+ds);
  };
}});

TOOLS.push({ id:"fraction", cat:"calc", icon:"➗", name:"Free Fraction Calculator Online",
desc:"Add subtract multiply divide", how:"Enter two fractions and pick add, subtract, multiply or divide, then press Calculate for the simplified result and its decimal.",
render:function(box){
  box.innerHTML = '<h2>➗ Fraction Calculator</h2><div class="row"><div><label>Numerator 1</label><input type="number" id="t-n1" placeholder="1"></div><div><label>Denominator 1</label><input type="number" id="t-d1" placeholder="2"></div></div><div class="row"><div><label>Operation</label><select id="t-op"><option value="add">+ Add</option><option value="sub">- Subtract</option><option value="mul">x Multiply</option><option value="div">/ Divide</option></select></div></div><div class="row"><div><label>Numerator 2</label><input type="number" id="t-n2" placeholder="1"></div><div><label>Denominator 2</label><input type="number" id="t-d2" placeholder="4"></div></div><button class="tool-btn" id="t-go">Calculate</button> <button class="tool-btn ghost" id="t-try">✨ Try example</button><div class="tool-out" id="t-out"></div>';
  el("t-try").onclick=function(){el("t-n1").value=1;el("t-d1").value=2;el("t-n2").value=1;el("t-d2").value=4;el("t-op").value="add";el("t-go").click();};
  el("t-go").onclick=function(){
    function get(id){var v=el(id).value;return v===""?null:+v;}
    var n1=get("t-n1"),d1=get("t-d1"),n2=get("t-n2"),d2=get("t-d2"),op=el("t-op").value;
    if(n1===null||d1===null||n2===null||d2===null){outHTML(box,"Enter all four numbers.");return;}
    if(d1===0||d2===0){outHTML(box,"Denominator cannot be 0.");return;}
    var rn,rd;
    if(op==="add"){rn=n1*d2+n2*d1;rd=d1*d2;}
    else if(op==="sub"){rn=n1*d2-n2*d1;rd=d1*d2;}
    else if(op==="mul"){rn=n1*n2;rd=d1*d2;}
    else{if(n2===0){outHTML(box,"Cannot divide by zero.");return;}rn=n1*d2;rd=d1*n2;}
    function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
    if(rd<0){rn=-rn;rd=-rd;}
    var g=gcd(rn,rd);rn/=g;rd/=g;
    outHTML(box,"Result: <b>"+rn+"/"+rd+"</b>\nDecimal: "+parseFloat((rn/rd).toPrecision(10)));
  };
}});

TOOLS.push({ id:"matrix", cat:"calc", icon:"🔲", name:"Free Matrix Calculator Online",
desc:"Add multiply determinant", how:"Choose 2x2 or 3x3, fill in matrices A and B, pick an operation, then press Calculate to see the result.",
render:function(box){
  box.innerHTML = '<h2>🔢 Matrix Calculator</h2><div class="row"><div><label>Size</label><select id="t-sz"><option value="2">2 x 2</option><option value="3">3 x 3</option></select></div><div><label>Operation</label><select id="t-op"><option value="add">A + B</option><option value="mul">A x B</option><option value="det">Determinant of A</option><option value="tr">Transpose of A</option></select></div></div><div class="row"><div><label>Matrix A</label><div id="t-ga"></div></div><div><label>Matrix B</label><div id="t-gb"></div></div></div><button class="tool-btn" id="t-go">Calculate</button> <button class="tool-btn ghost" id="t-try">✨ Try example</button><div class="tool-out" id="t-out" style="font-family:monospace;font-size:1.05rem"></div>';
  el("t-try").onclick=function(){el("t-sz").value="2";el("t-op").value="add";build();var A=[1,2,3,4],B=[5,6,7,8],qa=box.querySelectorAll(".mx-a"),qb=box.querySelectorAll(".mx-b");for(var i=0;i<4;i++){qa[i].value=A[i];qb[i].value=B[i];}el("t-go").click();};
  function grid(cls,sz){
    var h="<table>";
    for(var r=0;r<sz;r++){h+="<tr>";for(var c=0;c<sz;c++){h+='<td><input type="number" class="'+cls+'" style="width:54px" value="'+(r===c?1:0)+'"></td>';}h+="</tr>";}
    return h+"</table>";
  }
  function build(){var sz=+el("t-sz").value;el("t-ga").innerHTML=grid("mx-a",sz);el("t-gb").innerHTML=grid("mx-b",sz);}
  build();
  el("t-sz").onchange=build;
  function read(cls,sz){
    var m=[],ins=box.querySelectorAll("."+cls);
    for(var r=0;r<sz;r++){m.push([]);for(var c=0;c<sz;c++){var v=parseFloat(ins[r*sz+c].value);m[r].push(isNaN(v)?0:v);}}
    return m;
  }
  function det(m){
    if(m.length===2)return m[0][0]*m[1][1]-m[0][1]*m[1][0];
    return m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])-m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])+m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
  }
  function show(m){
    var rows=m.map(function(r){return r.map(function(v){return parseFloat(v.toPrecision(8));}).join("   ");});
    outHTML(box,rows.join("<br>"));
  }
  el("t-go").onclick=function(){
    var sz=+el("t-sz").value,op=el("t-op").value,A=read("mx-a",sz),B=read("mx-b",sz),R=[],r,c,k;
    if(op==="add"){for(r=0;r<sz;r++){R.push([]);for(c=0;c<sz;c++)R[r].push(A[r][c]+B[r][c]);}show(R);}
    else if(op==="mul"){for(r=0;r<sz;r++){R.push([]);for(c=0;c<sz;c++){var s=0;for(k=0;k<sz;k++)s+=A[r][k]*B[k][c];R[r].push(s);}}show(R);}
    else if(op==="tr"){for(r=0;r<sz;r++){R.push([]);for(c=0;c<sz;c++)R[r].push(A[c][r]);}show(R);}
    else{outHTML(box,"det(A) = <b>"+parseFloat(det(A).toPrecision(10))+"</b>");}
  };
}});

TOOLS.push({ id:"quadratic", cat:"calc", icon:"🧮", name:"Free Quadratic Equation Solver Online",
desc:"ax2+bx+c roots", how:"Enter a, b and c for ax squared plus bx plus c equals zero, then press Solve to see the discriminant, roots and vertex.",
render:function(box){
  box.innerHTML = '<h2>📈 Quadratic Equation Solver</h2><p class="tool-note">Solves ax² + bx + c = 0</p><div class="row"><div><label>a</label><input type="number" id="t-a" placeholder="1"></div><div><label>b</label><input type="number" id="t-b" placeholder="-3"></div><div><label>c</label><input type="number" id="t-c" placeholder="2"></div></div><button class="tool-btn" id="t-go">Solve</button> <button class="tool-btn ghost" id="t-try">✨ Try example</button><div class="tool-out" id="t-out"></div>';
  el("t-try").onclick=function(){el("t-a").value=1;el("t-b").value=-3;el("t-c").value=2;el("t-go").click();};
  el("t-go").onclick=function(){
    function get(id){var v=el(id).value;return v===""?null:+v;}
    var a=get("t-a"),b=get("t-b"),c=get("t-c");
    if(a===null||b===null||c===null){outHTML(box,"Enter a, b and c.");return;}
    if(a===0){outHTML(box,"a cannot be 0 — that is a linear equation, not quadratic.");return;}
    var f=function(x){return parseFloat(x.toPrecision(10));};
    var d=b*b-4*a*c;
    var vx=-b/(2*a),vy=c-(b*b)/(4*a);
    var out="Discriminant (D) = "+f(d)+"\n";
    if(d>0){
      var r1=(-b+Math.sqrt(d))/(2*a),r2=(-b-Math.sqrt(d))/(2*a);
      out+="Nature: two distinct real roots\nx1 = "+f(r1)+"\nx2 = "+f(r2);
    }else if(d===0){
      out+="Nature: one repeated real root\nx = "+f(-b/(2*a));
    }else{
      var rp=-b/(2*a),ip=Math.sqrt(-d)/(2*a);
      out+="Nature: two complex roots\nx1 = "+f(rp)+" + "+f(ip)+"i\nx2 = "+f(rp)+" - "+f(ip)+"i";
    }
    out+="\nVertex: ("+f(vx)+", "+f(vy)+")";
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"stats", cat:"calc", icon:"📉", name:"Free Statistics Calculator Online",
desc:"Mean median mode SD", how:"Paste your numbers separated by commas, spaces or lines, then press Calculate for mean, median, mode, range and standard deviation.",
render:function(box){
  box.innerHTML = '<h2>📉 Statistics Calculator</h2><label>Numbers (comma, space or line separated)</label><textarea id="t-n" rows="3" placeholder="5, 8, 12, 8, 3"></textarea><button class="tool-btn" id="t-go">Calculate</button> <button class="tool-btn ghost" id="t-try">✨ Try example</button><div class="tool-out" id="t-out"></div>';
  el("t-try").onclick=function(){el("t-n").value="5, 8, 12, 8, 3";el("t-go").click();};
  el("t-go").onclick=function(){
    var raw=el("t-n").value.trim().split(/[,\s]+/),xs=[];
    for(var i=0;i<raw.length;i++){if(raw[i]==="")continue;var v=parseFloat(raw[i]);if(!isNaN(v))xs.push(v);}
    if(!xs.length){outHTML(box,"Enter at least one number.");return;}
    xs.sort(function(a,b){return a-b;});
    var n=xs.length,sum=0;
    for(i=0;i<n;i++)sum+=xs[i];
    var mean=sum/n;
    var med=n%2?xs[(n-1)/2]:(xs[n/2-1]+xs[n/2])/2;
    var freq={},mx=0;
    for(i=0;i<n;i++){var k=String(xs[i]);freq[k]=(freq[k]||0)+1;if(freq[k]>mx)mx=freq[k];}
    var modes=[];
    for(var key in freq){if(freq.hasOwnProperty(key)&&freq[key]===mx)modes.push(parseFloat(key));}
    modes.sort(function(a,b){return a-b;});
    var vari=0;
    for(i=0;i<n;i++)vari+=(xs[i]-mean)*(xs[i]-mean);
    vari/=n;
    var f=function(x){return parseFloat(x.toPrecision(10));};
    var preview=xs.slice(0,20).join(", ")+(n>20?" ...":"");
    outHTML(box,"Count: "+n+"\nMean: "+f(mean)+"\nMedian: "+f(med)+"\nMode: "+(mx>1?modes.join(", "):"none")+"\nMin: "+f(xs[0])+"\nMax: "+f(xs[n-1])+"\nRange: "+f(xs[n-1]-xs[0])+"\nVariance: "+f(vari)+"\nStd deviation: "+f(Math.sqrt(vari))+"\nSorted: "+preview);
  };
}});

TOOLS.push({ id:"physics", cat:"calc", icon:"⚛️", name:"Free Physics Calculator Online",
desc:"Force velocity energy", how:"Pick a formula, enter the known values, then press Calculate to get the result with the correct units.",
render:function(box){
  box.innerHTML = '<h2>⚛️ Physics Calculator</h2><label>Formula</label><select id="t-f"><option value="force">Force — F = m x a</option><option value="vel">Velocity — v = d / t</option><option value="ke">Kinetic energy — KE = 1/2 m v^2</option><option value="pe">Potential energy — PE = m g h</option><option value="power">Power — P = W / t</option></select><div id="t-fields"></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">g = 9.81 m/s² for potential energy.</p>';
  var FIELDS={
    force:[["m","Mass (kg)","10"],["a","Acceleration (m/s2)","9.8"]],
    vel:[["d","Distance (m)","100"],["t","Time (s)","9.58"]],
    ke:[["m","Mass (kg)","1000"],["v","Velocity (m/s)","20"]],
    pe:[["m","Mass (kg)","5"],["h","Height (m)","10"]],
    power:[["w","Work (J)","500"],["t","Time (s)","10"]]
  };
  function buildFields(){
    var k=el("t-f").value,h='<div class="row">';
    FIELDS[k].forEach(function(f){h+='<div><label>'+f[1]+'</label><input type="number" placeholder="'+(f[2]||"")+'" id="t-'+f[0]+'"></div>';});
    el("t-fields").innerHTML=h+'</div>';
  }
  buildFields();
  el("t-f").onchange=buildFields;
  el("t-go").onclick=function(){
    function get(id){var e=el("t-"+id);if(!e||e.value==="")return null;return +e.value;}
    var k=el("t-f").value,res,unit;
    if(k==="force"){
      var m=get("m"),a=get("a");
      if(m===null||a===null){outHTML(box,"Enter mass and acceleration.");return;}
      res=m*a;unit="N (newtons)";
    }else if(k==="vel"){
      var d=get("d"),t=get("t");
      if(d===null||t===null){outHTML(box,"Enter distance and time.");return;}
      if(t===0){outHTML(box,"Time cannot be 0.");return;}
      res=d/t;unit="m/s";
    }else if(k==="ke"){
      var m2=get("m"),v=get("v");
      if(m2===null||v===null){outHTML(box,"Enter mass and velocity.");return;}
      res=0.5*m2*v*v;unit="J (joules)";
    }else if(k==="pe"){
      var m3=get("m"),h=get("h");
      if(m3===null||h===null){outHTML(box,"Enter mass and height.");return;}
      res=m3*9.81*h;unit="J (joules)";
    }else{
      var w=get("w"),t2=get("t");
      if(w===null||t2===null){outHTML(box,"Enter work and time.");return;}
      if(t2===0){outHTML(box,"Time cannot be 0.");return;}
      res=w/t2;unit="W (watts)";
    }
    outHTML(box,"Result: <b>"+parseFloat(res.toPrecision(10))+" "+unit+"</b>");
  };
}});

TOOLS.push({ id:"chemistry", cat:"calc", icon:"🧪", name:"Free Mole Calculator Online",
desc:"Molar mass + moles", how:"Type a formula like H2SO4 to get its molar mass, then convert between grams and moles in both directions.",
render:function(box){
  box.innerHTML = '<h2>🧪 Mole Calculator</h2><label>Chemical formula</label><input type="text" id="t-f" placeholder="e.g. H2SO4"><button class="tool-btn" id="t-go">Calculate Molar Mass</button><div class="tool-out" id="t-out"></div><div class="row"><div><label>Grams → moles (g)</label><input type="number" id="t-g" placeholder="98"></div><div><label>Moles → grams (mol)</label><input type="number" id="t-m" placeholder="0.5"></div></div><button class="tool-btn" id="t-cv">Convert</button>';
  var W={H:1.008,He:4.0026,C:12.011,N:14.007,O:15.999,Na:22.99,Mg:24.305,Al:26.982,Si:28.085,P:30.974,S:32.06,Cl:35.45,K:39.098,Ca:40.078,Fe:55.845,Cu:63.546,Zn:65.38,Ag:107.87,Au:196.97,Hg:200.59,Pb:207.2,I:126.9,Br:79.904,F:18.998};
  var MM=0,FORMULA="";
  el("t-go").onclick=function(){
    var f=el("t-f").value.trim().replace(/\s+/g,"");
    if(!f){outHTML(box,"Enter a chemical formula.");return;}
    var re=/([A-Z][a-z]?)(\d*)/g,m,tot=0,used=0,err="";
    while((m=re.exec(f))!==null){
      var sym=m[1],cnt=m[2]===""?1:parseInt(m[2],10);
      used+=m[0].length;
      if(!(sym in W)){err="Unknown element: "+sym+".";break;}
      tot+=W[sym]*cnt;
    }
    if(err){outHTML(box,esc(err));return;}
    if(used!==f.length){outHTML(box,"Could not parse formula — use a format like H2SO4.");return;}
    MM=tot;FORMULA=f;
    outHTML(box,"Molar mass of "+esc(f)+": <b>"+parseFloat(tot.toPrecision(8))+" g/mol</b>");
  };
  el("t-cv").onclick=function(){
    if(!MM){outHTML(box,"Calculate the molar mass first.");return;}
    var g=el("t-g").value,mo=el("t-m").value,out="";
    if(g!==""&&!isNaN(+g))out+=g+" g of "+esc(FORMULA)+" = <b>"+parseFloat((+g/MM).toPrecision(8))+" mol</b>\n";
    if(mo!==""&&!isNaN(+mo))out+=mo+" mol of "+esc(FORMULA)+" = <b>"+parseFloat((+mo*MM).toPrecision(8))+" g</b>\n";
    if(!out)out="Enter grams or moles to convert.";
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"ohm", cat:"calc", icon:"💡", name:"Free Ohms Law Calculator Online",
desc:"V=IR + resistor codes", how:"Enter any two of voltage, current, resistance and power to solve the other two, or decode a 4-band resistor color code.",
render:function(box){
  box.innerHTML = '<h2>💡 Ohms Law Calculator</h2><p class="tool-note">Enter any two of V / I / R / P.</p><div class="row"><div><label>Voltage (V)</label><input type="number" id="t-v" placeholder="12"></div><div><label>Current (A)</label><input type="number" id="t-i" placeholder="0.5"></div><div><label>Resistance (Ohm)</label><input type="number" id="t-r" placeholder="24"></div><div><label>Power (W)</label><input type="number" id="t-p" placeholder="6"></div></div><button class="tool-btn" id="t-go">Solve</button><div class="tool-out" id="t-out"></div><h2 style="margin-top:16px">🎨 4-Band Resistor Code</h2><div class="row"><div><label>Band 1 (digit)</label><select id="t-b1"></select></div><div><label>Band 2 (digit)</label><select id="t-b2"></select></div><div><label>Multiplier</label><select id="t-b3"></select></div><div><label>Tolerance</label><select id="t-b4"></select></div></div><button class="tool-btn" id="t-go2">Decode</button><div class="tool-out" id="t-out2"></div>';
  var DIG=[["Black",0],["Brown",1],["Red",2],["Orange",3],["Yellow",4],["Green",5],["Blue",6],["Violet",7],["Gray",8],["White",9]];
  var MUL=[["Black",1],["Brown",10],["Red",100],["Orange",1000],["Yellow",10000],["Green",100000],["Blue",1000000],["Gold",0.1],["Silver",0.01]];
  var TOL=[["Brown",1],["Red",2],["Gold",5],["Silver",10]];
  function opts(arr,def){var h="";for(var i=0;i<arr.length;i++)h+='<option value="'+arr[i][1]+'"'+(arr[i][0]===def?' selected="selected"':"")+'>'+arr[i][0]+'</option>';return h;}
  el("t-b1").innerHTML=opts(DIG,"Brown");
  el("t-b2").innerHTML=opts(DIG,"Black");
  el("t-b3").innerHTML=opts(MUL,"Red");
  el("t-b4").innerHTML=opts(TOL,"Gold");
  el("t-go").onclick=function(){
    function get(id){var v=el(id).value;return v===""?null:+v;}
    var V=get("t-v"),I=get("t-i"),R=get("t-r"),P=get("t-p");
    var known=[V,I,R,P].filter(function(x){return x!==null;}).length;
    if(known!==2){outHTML(box,"Enter exactly two values.");return;}
    if((R!==null&&R<0)||(P!==null&&P<0)){outHTML(box,"Resistance and power must be 0 or positive.");return;}
    var f=function(x){return parseFloat(x.toPrecision(8));};
    if(V!==null&&I!==null){
      if(I===0){outHTML(box,"Current cannot be 0 here.");return;}
      R=V/I;P=V*I;
    }else if(V!==null&&R!==null){
      if(R===0){outHTML(box,"Resistance cannot be 0 here.");return;}
      I=V/R;P=V*V/R;
    }else if(I!==null&&R!==null){
      V=I*R;P=I*I*R;
    }else if(V!==null&&P!==null){
      if(V===0){outHTML(box,"Voltage cannot be 0 here.");return;}
      I=P/V;R=V*V/P;
    }else if(I!==null&&P!==null){
      if(I===0){outHTML(box,"Current cannot be 0 here.");return;}
      V=P/I;R=P/(I*I);
    }else{
      if(R===0){outHTML(box,"Resistance cannot be 0 here.");return;}
      I=Math.sqrt(P/R);V=Math.sqrt(P*R);
    }
    outHTML(box,"V = <b>"+f(V)+" V</b>\nI = <b>"+f(I)+" A</b>\nR = <b>"+f(R)+" Ohm</b>\nP = <b>"+f(P)+" W</b>");
  };
  el("t-go2").onclick=function(){
    var d1=+el("t-b1").value,d2=+el("t-b2").value,mu=+el("t-b3").value,to=+el("t-b4").value;
    var r=(10*d1+d2)*mu;
    var disp=r>=1e6?parseFloat((r/1e6).toPrecision(6))+" MOhm":r>=1e3?parseFloat((r/1e3).toPrecision(6))+" kOhm":parseFloat(r.toPrecision(6))+" Ohm";
    var lo=r*(1-to/100),hi=r*(1+to/100);
    el("t-out2").innerHTML="Resistance: <b>"+disp+" ±"+to+"%</b>\nRange: "+parseFloat(lo.toPrecision(6))+" – "+parseFloat(hi.toPrecision(6))+" Ohm";
  };
}});

TOOLS.push({ id:"dicestats", cat:"calc", icon:"🔮", name:"Free Dice Probability Calculator Online",
desc:"Exact odds for dice", how:"Set the number of dice, sides and a target, then press Calculate Odds for the exact probability and the full sum distribution.",
render:function(box){
  box.innerHTML = '<h2>🎲 Dice Probability Calculator</h2><div class="row"><div><label>Dice (1-5)</label><input type="number" id="t-n" value="2" min="1" max="5"></div><div><label>Sides (2-20)</label><input type="number" id="t-s" value="6" min="2" max="20"></div><div><label>Target sum</label><input type="number" id="t-t" placeholder="7"></div><div><label>Condition</label><select id="t-c"><option value="ge">>= target</option><option value="eq">= target</option><option value="le"><= target</option></select></div></div><button class="tool-btn" id="t-go">Calculate Odds</button><div class="tool-out" id="t-out" style="font-family:monospace"></div>';
  el("t-go").onclick=function(){
    var n=Math.round(+el("t-n").value),s=Math.round(+el("t-s").value),c=el("t-c").value;
    if(isNaN(n)||n<1||n>5){outHTML(box,"Dice must be between 1 and 5.");return;}
    if(isNaN(s)||s<2||s>20){outHTML(box,"Sides must be between 2 and 20.");return;}
    if(el("t-t").value===""||isNaN(+el("t-t").value)){outHTML(box,"Enter a target number.");return;}
    var t=Math.round(+el("t-t").value);
    var max=n*s,dist=[1],d,i,sm,f;
    for(d=0;d<n;d++){
      var nd=[];
      for(i=0;i<=max;i++)nd.push(0);
      for(sm=0;sm<=max;sm++){if(!dist[sm])continue;for(f=1;f<=s;f++)nd[sm+f]+=dist[sm];}
      dist=nd;
    }
    var total=Math.pow(s,n),fav=0,rows=[];
    for(var x=n;x<=max;x++){
      var p=dist[x]/total;
      rows.push("sum "+x+": "+(p*100).toFixed(2)+"%");
      if((c==="ge"&&x>=t)||(c==="eq"&&x===t)||(c==="le"&&x<=t))fav+=dist[x];
    }
    var sym=c==="ge"?">=":c==="eq"?"=":"<=";
    outHTML(box,"P(sum "+sym+" "+t+") = <b>"+(fav/total*100).toFixed(4)+"%</b>\n"+fav.toLocaleString()+" of "+total.toLocaleString()+" equally likely outcomes\n\nSum distribution:\n"+rows.join("\n"));
  };
}});

TOOLS.push({ id:"bitrate", cat:"calc", icon:"📹", name:"Free Bitrate Calculator Online",
desc:"Video file size estimator", how:"Pick a mode, enter duration and bitrates, then press Calculate to estimate file size or required bitrate.",
render:function(box){
  box.innerHTML = '<h2>🎬 Bitrate Calculator</h2><div class="row"><div><label>Mode</label><select id="br-m"><option value="size">File size from bitrate</option><option value="br">Bitrate from file size</option></select></div><div><label>Duration (minutes)</label><input type="number" id="br-d" placeholder="10" min="0"></div></div><div class="row"><div><label>Video bitrate (Mbps)</label><input type="number" id="br-v" placeholder="8" step="0.1" min="0"></div><div><label>Audio bitrate (kbps)</label><input type="number" id="br-a" value="128" min="0"></div></div><div class="row"><div><label>File size (MB) — for bitrate mode</label><input type="number" id="br-s" placeholder="500" min="0"></div></div><button class="tool-btn" id="br-go">Calculate</button><div class="tool-out" id="br-out"></div><p class="tool-note">Uses decimal units (1 MB = 1,000,000 bytes) like most encoders.</p>';
  el("br-go").onclick=function(){
    var mode=el("br-m").value, sec=(+el("br-d").value||0)*60;
    if(!(sec>0)){outHTML(box,"Enter a valid duration.");return;}
    if(mode==="size"){
      var v=+el("br-v").value, a=+el("br-a").value||0;
      if(!(v>0||a>0)){outHTML(box,"Enter video and/or audio bitrate.");return;}
      var bits=(v*1e6+a*1e3)*sec, mb=bits/8e6;
      outHTML(box,"Estimated file size: "+mb.toFixed(1)+" MB ("+(mb/1000).toFixed(2)+" GB)");
    } else {
      var mb2=+el("br-s").value, a2=+el("br-a").value||0;
      if(!(mb2>0)){outHTML(box,"Enter the target file size in MB.");return;}
      var totalMbps=(mb2*8e6/sec)/1e6, vMbps=totalMbps-a2/1000;
      if(!(vMbps>0)){outHTML(box,"File size too small for that audio bitrate — audio alone needs "+(a2*1e3*sec/8e6).toFixed(1)+" MB.");return;}
      outHTML(box,"Total bitrate: "+totalMbps.toFixed(2)+" Mbps\nVideo bitrate needed: "+vMbps.toFixed(2)+" Mbps (audio "+a2+" kbps)");
    }
  };
}});

TOOLS.push({ id:"bandwidth", cat:"calc", icon:"🛜", name:"Free Bandwidth Calculator Online",
desc:"Download time estimator", how:"Enter file size and your speed to get download time, or switch mode to find the speed needed for a target time.",
render:function(box){
  box.innerHTML = '<h2>🌐 Bandwidth Calculator</h2><div class="row"><div><label>Mode</label><select id="bw-m"><option value="time">Download time</option><option value="spd">Speed for target time</option></select></div><div><label>File size</label><input type="number" id="bw-s" placeholder="1000" min="0"></div><div><label>Size unit</label><select id="bw-u"><option value="MB">MB</option><option value="GB">GB</option></select></div></div><div class="row"><div><label>Speed (Mbps)</label><input type="number" id="bw-v" placeholder="50" min="0"></div><div><label>Target time (minutes)</label><input type="number" id="bw-t" placeholder="30" min="0"></div></div><button class="tool-btn" id="bw-go">Calculate</button><div class="tool-out" id="bw-out"></div><p class="tool-note">Theoretical speed — real downloads vary with overhead and congestion.</p>';
  el("bw-go").onclick=function(){
    function fmt(sec){sec=Math.round(sec);var h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;var t="";if(h>0)t+=h+"h ";if(h>0||m>0)t+=m+"m ";t+=s+"s";return t;}
    var bits=(+el("bw-s").value||0)*(el("bw-u").value==="GB"?8e9:8e6);
    if(!(bits>0)){outHTML(box,"Enter a valid file size.");return;}
    if(el("bw-m").value==="time"){
      var mbps=+el("bw-v").value;
      if(!(mbps>0)){outHTML(box,"Enter your connection speed in Mbps.");return;}
      outHTML(box,"Download time: "+fmt(bits/(mbps*1e6)));
    } else {
      var min=+el("bw-t").value;
      if(!(min>0)){outHTML(box,"Enter a target time in minutes.");return;}
      outHTML(box,"Speed needed: "+(bits/(min*60)/1e6).toFixed(1)+" Mbps");
    }
  };
}});

TOOLS.push({ id:"electricity", cat:"calc", cat2:"finance", icon:"🔌", name:"Free Electricity Bill Calculator Online",
desc:"Units + tariff billing", how:"Enter units consumed, your per-unit rate and fixed charges to see the full bill breakdown.",
render:function(box){
  box.innerHTML = '<h2>⚡ Electricity Bill Calculator</h2><div class="row"><div><label>Units consumed (kWh)</label><input type="number" id="eb-u" placeholder="300" min="0"></div><div><label>Rate per unit ($)</label><input type="number" id="eb-r" placeholder="0.17" step="0.01" min="0"></div></div><div class="row"><div><label>Fixed / meter charges</label><input type="number" id="eb-f" value="0" step="0.01" min="0"></div></div><button class="tool-btn" id="eb-go">Calculate</button><div class="tool-out" id="eb-out"></div><p class="tool-note">Simplified single-slab estimate — real bills use slabs, taxes and surcharges.</p>';
  el("eb-go").onclick=function(){
    var u=+el("eb-u").value, r=+el("eb-r").value, f=+el("eb-f").value||0;
    if(!(u>=0&&r>=0&&!isNaN(u)&&!isNaN(r))){outHTML(box,"Enter valid units and rate.");return;}
    var e=u*r;
    outHTML(box,"Energy charges: $"+e.toFixed(2)+"\nFixed charges: $"+f.toFixed(2)+"\nTotal bill: $"+(e+f).toFixed(2)+"\nEffective cost per unit: $"+(u>0?((e+f)/u).toFixed(2):"0.00"));
  };
}});

TOOLS.push({ id:"waterflow", cat:"calc", icon:"🌊", name:"Free Water Flow Calculator Online",
desc:"Pipe flow + tank volume", how:"Enter pipe diameter and water velocity to get flow rate, plus tank size to get volume and fill time.",
render:function(box){
  box.innerHTML = '<h2>💧 Water Flow Calculator</h2><div class="row"><div><label>Pipe inner diameter (inches)</label><input type="number" id="wf-d" placeholder="1" step="0.1" min="0"></div><div><label>Water velocity (m/s)</label><input type="number" id="wf-v" placeholder="1.5" step="0.1" min="0"></div></div><div class="row"><div><label>Tank length (m)</label><input type="number" id="wf-l" placeholder="2" step="0.1" min="0"></div><div><label>Tank width (m)</label><input type="number" id="wf-w" placeholder="1" step="0.1" min="0"></div><div><label>Tank height (m)</label><input type="number" id="wf-h" placeholder="1" step="0.1" min="0"></div></div><button class="tool-btn" id="wf-go">Calculate</button><div class="tool-out" id="wf-out"></div>';
  el("wf-go").onclick=function(){
    var d=(+el("wf-d").value||0)*0.0254, v=+el("wf-v").value||0;
    var area=Math.PI*Math.pow(d/2,2), lpm=area*v*1000*60;
    var liters=(+el("wf-l").value||0)*(+el("wf-w").value||0)*(+el("wf-h").value||0)*1000;
    var out="";
    if(d>0&&v>0)out+="Flow rate: "+lpm.toFixed(1)+" L/min\n";
    if(liters>0){
      out+="Tank volume: "+liters.toFixed(0)+" liters";
      if(lpm>0){var mins=liters/lpm;out+="\nFill time: "+(mins>=60?(mins/60).toFixed(1)+" hours":mins.toFixed(1)+" minutes");}
    }
    if(!out){outHTML(box,"Enter pipe size and velocity, or tank dimensions.");return;}
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"concrete", cat:"calc", icon:"🧱", name:"Free Concrete Calculator Online",
desc:"Cement bags + bricks", how:"Enter slab size and mix ratio for cement, sand and aggregate, or wall size for the brick count.",
render:function(box){
  box.innerHTML = '<h2>🧱 Concrete Calculator</h2><div class="row"><div><label>Slab length (ft)</label><input type="number" id="cc-l" placeholder="20" min="0"></div><div><label>Slab width (ft)</label><input type="number" id="cc-w" placeholder="15" min="0"></div><div><label>Thickness (ft)</label><input type="number" id="cc-t" placeholder="0.5" step="0.01" min="0"></div><div><label>Mix ratio</label><select id="cc-r"><option value="1,1.5,3">1:1.5:3</option><option value="1,2,4" selected>1:2:4</option><option value="1,3,6">1:3:6</option></select></div></div><div class="row"><div><label>Wall length (ft)</label><input type="number" id="cc-wl" placeholder="30" min="0"></div><div><label>Wall height (ft)</label><input type="number" id="cc-wh" placeholder="10" min="0"></div></div><button class="tool-btn" id="cc-go">Calculate</button><div class="tool-out" id="cc-out"></div><p class="tool-note">Slab uses dry-volume factor 1.52; one 50 kg cement bag = 1.25 cu ft. Brick count assumes 9x4.5x3 in bricks with mortar.</p>';
  el("cc-go").onclick=function(){
    var out="";
    var L=+el("cc-l").value||0, W=+el("cc-w").value||0, T=+el("cc-t").value||0;
    if(L>0&&W>0&&T>0){
      var vol=L*W*T, parts=el("cc-r").value.split(","), p0=+parts[0], p1=+parts[1], p2=+parts[2], sum=p0+p1+p2, dry=vol*1.52;
      var bags=dry*(p0/sum)/1.25, sand=dry*(p1/sum), agg=dry*(p2/sum);
      out+="Cement: "+Math.ceil(bags)+" bags (50 kg)\nSand: "+sand.toFixed(1)+" cu ft\nAggregate: "+agg.toFixed(1)+" cu ft\n";
    }
    var wl=+el("cc-wl").value||0, wh=+el("cc-wh").value||0;
    if(wl>0&&wh>0)out+="Bricks needed: "+Math.ceil(wl*wh*13.5*1.1)+" (incl. 10% wastage)";
    if(!out){outHTML(box,"Enter slab dimensions or wall dimensions.");return;}
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"paint", cat:"calc", icon:"🖌️", name:"Free Paint Quantity Calculator Online",
desc:"Liters needed for walls", how:"Add your walls, enter doors and windows to deduct, coats and coverage, then press Calculate.",
render:function(box){
  box.innerHTML = '<h2>🖌️ Paint Quantity Calculator</h2><div id="pt-walls"></div><button class="tool-btn ghost" id="pt-add" style="margin-bottom:10px">+ Add Wall</button><div class="row"><div><label>Doors (7x3 ft)</label><input type="number" id="pt-d" value="0" min="0"></div><div><label>Windows (5x3 ft)</label><input type="number" id="pt-w" value="0" min="0"></div><div><label>Coats</label><input type="number" id="pt-c" value="2" min="1"></div><div><label>Coverage (sq ft / liter)</label><input type="number" id="pt-cov" value="120" min="1"></div></div><button class="tool-btn" id="pt-go">Calculate</button><div class="tool-out" id="pt-out"></div>';
  function addRow(){
    var d=document.createElement("div"); d.className="row"; d.style.marginBottom="8px";
    d.innerHTML='<div><label>Wall length (ft)</label><input type="number" class="pt-l" placeholder="12" min="0"></div><div><label>Wall height (ft)</label><input type="number" class="pt-h" placeholder="10" min="0"></div>';
    el("pt-walls").appendChild(d);
  }
  addRow(); addRow();
  el("pt-add").onclick=function(){addRow();};
  el("pt-go").onclick=function(){
    var area=0, ls=box.querySelectorAll(".pt-l"), hs=box.querySelectorAll(".pt-h"), i;
    for(i=0;i<ls.length;i++)area+=(+ls[i].value||0)*(+hs[i].value||0);
    if(!(area>0)){outHTML(box,"Enter at least one wall size.");return;}
    var net=area-(+el("pt-d").value||0)*21-(+el("pt-w").value||0)*15;
    if(!(net>0)){outHTML(box,"Deductions exceed wall area.");return;}
    var cov=+el("pt-cov").value||120, coats=Math.max(1,+el("pt-c").value||1);
    var liters=net*coats/cov;
    var t4=Math.floor(liters/4), rem=liters-t4*4, t1=Math.ceil(rem);
    outHTML(box,"Paintable area: "+net.toFixed(0)+" sq ft\nPaint needed: "+liters.toFixed(1)+" liters\nBuy: "+t4+" x 4L tin"+(t4===1?"":"s")+" + "+t1+" x 1L tin"+(t1===1?"":"s"));
  };
}});

TOOLS.push({ id:"tile", cat:"calc", icon:"🟫", name:"Free Tile Calculator Online",
desc:"Tiles + 10% waste", how:"Enter floor size and tile size, then press Calculate to get tile count including 10% wastage.",
render:function(box){
  box.innerHTML = '<h2>🟫 Tile Calculator</h2><div class="row"><div><label>Floor length (ft)</label><input type="number" id="tl-l" placeholder="12" min="0"></div><div><label>Floor width (ft)</label><input type="number" id="tl-w" placeholder="10" min="0"></div><div><label>Tile size</label><select id="tl-s"><option value="1">12 x 12 in</option><option value="2.25">18 x 18 in</option><option value="4">24 x 24 in</option><option value="c">Custom</option></select></div></div><div class="row" id="tl-cw" style="display:none"><div><label>Custom tile width (in)</label><input type="number" id="tl-cx" placeholder="12" min="0"></div><div><label>Custom tile height (in)</label><input type="number" id="tl-cy" placeholder="12" min="0"></div></div><button class="tool-btn" id="tl-go">Calculate</button><div class="tool-out" id="tl-out"></div>';
  el("tl-s").onchange=function(){el("tl-cw").style.display=el("tl-s").value==="c"?"":"none";};
  el("tl-go").onclick=function(){
    var sqft=(+el("tl-l").value||0)*(+el("tl-w").value||0);
    if(!(sqft>0)){outHTML(box,"Enter floor length and width.");return;}
    var t=el("tl-s").value, tps;
    if(t==="c"){var x=+el("tl-cx").value||0, y=+el("tl-cy").value||0;if(!(x>0&&y>0)){outHTML(box,"Enter custom tile width and height.");return;}tps=x*y/144;}
    else tps=+t;
    var tiles=Math.ceil(sqft/tps);
    outHTML(box,"Floor area: "+sqft.toFixed(0)+" sq ft\nTiles needed: "+tiles+"\nWith 10% wastage: "+Math.ceil(tiles*1.1)+" tiles");
  };
}});

TOOLS.push({ id:"bac", cat:"calc", icon:"🍺", name:"Free BAC Calculator Online",
desc:"Blood alcohol estimate", how:"Enter weight, gender, standard drinks and hours since the first drink for a rough BAC estimate.",
render:function(box){
  box.innerHTML = '<h2>🍺 BAC Calculator</h2><div class="row"><div><label>Weight (kg)</label><input type="number" id="bc-w" placeholder="70" min="0"></div><div><label>Gender</label><select id="bc-g"><option value="0.68">Male</option><option value="0.55">Female</option></select></div><div><label>Standard drinks</label><input type="number" id="bc-d" placeholder="3" min="0"></div><div><label>Hours since first drink</label><input type="number" id="bc-h" placeholder="2" step="0.5" min="0"></div></div><button class="tool-btn" id="bc-go">Calculate</button><div class="tool-out" id="bc-out"></div><p class="tool-note">Rough Widmark estimate only — never legal or medical advice. Do not drink and drive.</p>';
  el("bc-go").onclick=function(){
    var w=+el("bc-w").value, r=+el("bc-g").value, d=+el("bc-d").value||0, h=+el("bc-h").value||0;
    if(!(w>0)){outHTML(box,"Enter a valid weight.");return;}
    var bac=d*14/(r*w*1000)*100-0.015*h;
    if(bac<0)bac=0;
    var msg=bac<0.02?"Well below typical limits":bac<0.05?"Low — still unsafe to drive":bac<0.08?"Impaired — do not drive":"Heavily impaired — do not drive";
    outHTML(box,"Estimated BAC: "+bac.toFixed(3)+"%\n"+msg);
  };
}});

TOOLS.push({ id:"cagr", cat:"calc", cat2:"finance", icon:"💲", name:"Free CAGR Calculator Online",
desc:"Compound annual growth", how:"Enter beginning and ending values plus the number of years to see the annual growth rate.",
render:function(box){
  box.innerHTML = '<h2>📈 CAGR Calculator</h2><div class="row"><div><label>Beginning value</label><input type="number" id="cg-b" placeholder="10000" min="0"></div><div><label>Ending value</label><input type="number" id="cg-e" placeholder="16000" min="0"></div><div><label>Years</label><input type="number" id="cg-y" placeholder="5" step="0.1" min="0"></div></div><button class="tool-btn" id="cg-go">Calculate</button><div class="tool-out" id="cg-out"></div>';
  el("cg-go").onclick=function(){
    var b=+el("cg-b").value, e=+el("cg-e").value, y=+el("cg-y").value;
    if(!(b>0&&e>0&&y>0)){outHTML(box,"Enter positive values for all fields.");return;}
    var cagr=(Math.pow(e/b,1/y)-1)*100;
    outHTML(box,"CAGR: "+cagr.toFixed(2)+"% per year\nTotal growth: "+((e-b)/b*100).toFixed(1)+"%");
  };
}});

TOOLS.push({ id:"depreciation", cat:"calc", cat2:"finance", icon:"🏚️", name:"Free Depreciation Calculator Online",
desc:"Straight-line & declining", how:"Enter asset cost, salvage value and useful life, pick a method, and get the yearly depreciation table.",
render:function(box){
  box.innerHTML = '<h2>🏚️ Depreciation Calculator</h2><div class="row"><div><label>Asset cost</label><input type="number" id="dp-c" placeholder="50000" min="0"></div><div><label>Salvage value</label><input type="number" id="dp-s" value="0" min="0"></div><div><label>Useful life (years)</label><input type="number" id="dp-l" placeholder="5" min="1"></div><div><label>Method</label><select id="dp-m"><option value="sl">Straight-line</option><option value="ddb">Double declining</option></select></div></div><button class="tool-btn" id="dp-go">Calculate</button><div class="tool-out" id="dp-out"></div>';
  el("dp-go").onclick=function(){
    var c=+el("dp-c").value, s=+el("dp-s").value||0, l=Math.floor(+el("dp-l").value||0);
    if(!(c>0&&l>0)||s>=c){outHTML(box,"Enter valid cost, life, and a salvage value below cost.");return;}
    var out="", book=c, y, dep;
    if(el("dp-m").value==="sl"){
      dep=(c-s)/l;
      for(y=1;y<=l;y++){book-=dep;out+="Year "+y+": dep "+dep.toFixed(2)+" | book "+Math.max(book,s).toFixed(2)+"\n";}
    } else {
      var rate=2/l;
      for(y=1;y<=l;y++){
        dep=Math.min(book*rate,book-s); book-=dep;
        out+="Year "+y+": dep "+dep.toFixed(2)+" | book "+book.toFixed(2)+"\n";
        if(book<=s)break;
      }
    }
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"stockavg", cat:"calc", cat2:"finance", icon:"💹", name:"Free Stock Average Calculator Online",
desc:"Average buy price", how:"Add your buy lots with shares and price, enter a target sell price, then press Calculate.",
render:function(box){
  box.innerHTML = '<h2>💹 Stock Average Calculator</h2><div id="sa-rows"></div><button class="tool-btn ghost" id="sa-add" style="margin-bottom:10px">+ Add Lot</button><div class="row"><div><label>Target sell price</label><input type="number" id="sa-t" placeholder="150" step="0.01" min="0"></div></div><button class="tool-btn" id="sa-go">Calculate</button><div class="tool-out" id="sa-out"></div>';
  function addRow(){
    var d=document.createElement("div"); d.className="row"; d.style.marginBottom="8px";
    d.innerHTML='<div><label>Shares</label><input type="number" class="sa-s" placeholder="10" min="0"></div><div><label>Buy price</label><input type="number" class="sa-p" placeholder="100" step="0.01" min="0"></div>';
    el("sa-rows").appendChild(d);
  }
  addRow(); addRow();
  el("sa-add").onclick=function(){addRow();};
  el("sa-go").onclick=function(){
    var sh=0, inv=0, ss=box.querySelectorAll(".sa-s"), ps=box.querySelectorAll(".sa-p"), i;
    for(i=0;i<ss.length;i++){var s=+ss[i].value||0, p=+ps[i].value||0;sh+=s;inv+=s*p;}
    if(!(sh>0)){outHTML(box,"Enter at least one lot.");return;}
    var avg=inv/sh, out="Average price: "+avg.toFixed(2)+"\nTotal invested: "+inv.toFixed(2)+"\nTotal shares: "+sh;
    var t=+el("sa-t").value;
    if(t>0){var pl=sh*t-inv;out+="\nSell value at "+t.toFixed(2)+": "+(sh*t).toFixed(2)+"\nProfit/Loss: "+(pl>=0?"+":"")+pl.toFixed(2)+" ("+(pl/inv*100).toFixed(1)+"%)";}
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"btu", cat:"calc", icon:"❄️", name:"Free AC BTU Calculator Online",
desc:"Room cooling capacity", how:"Enter room size, sun exposure and occupants to get the recommended AC cooling capacity.",
render:function(box){
  box.innerHTML = '<h2>❄️ AC BTU Calculator</h2><div class="row"><div><label>Length (ft)</label><input type="number" id="ac-l" placeholder="15" min="0"></div><div><label>Width (ft)</label><input type="number" id="ac-w" placeholder="12" min="0"></div><div><label>Height (ft)</label><input type="number" id="ac-h" placeholder="10" min="0"></div><div><label>Sun exposure</label><select id="ac-s"><option value="0.9">Shaded</option><option value="1" selected>Moderate</option><option value="1.1">Sunny</option></select></div><div><label>Occupants</label><input type="number" id="ac-o" value="2" min="1"></div></div><button class="tool-btn" id="ac-go">Calculate</button><div class="tool-out" id="ac-out"></div><p class="tool-note">Estimate based on 20 BTU per sq ft with adjustments — insulation and climate vary.</p>';
  el("ac-go").onclick=function(){
    var L=+el("ac-l").value||0, W=+el("ac-w").value||0, H=+el("ac-h").value||10;
    if(!(L>0&&W>0)){outHTML(box,"Enter room length and width.");return;}
    var btu=L*W*20*(+el("ac-s").value)+(Math.max(1,+el("ac-o").value||1)-1)*600;
    if(H>10)btu*=1+(H-10)*0.03;
    btu=Math.round(btu/500)*500;
    outHTML(box,"Recommended: "+btu.toLocaleString()+" BTU\n≈ "+(btu/12000).toFixed(1)+" tons of cooling");
  };
}});

TOOLS.push({ id:"distance", cat:"calc", icon:"🛣️", name:"Free Distance Speed Time Calculator Online",
desc:"Solve d = v × t", how:"Fill any two of distance, speed or time, and the third is calculated for you.",
render:function(box){
  box.innerHTML = '<h2>🛣️ Distance Speed Time Calculator</h2><div class="row"><div><label>Distance (km)</label><input type="number" id="ds-d" placeholder="120" min="0"></div><div><label>Speed (km/h)</label><input type="number" id="ds-v" placeholder="60" min="0"></div><div><label>Time (hours)</label><input type="number" id="ds-t" placeholder="2" min="0"></div></div><button class="tool-btn" id="ds-go">Calculate</button><div class="tool-out" id="ds-out"></div>';
  el("ds-go").onclick=function(){
    var d=+el("ds-d").value, v=+el("ds-v").value, t=+el("ds-t").value;
    var hd=el("ds-d").value!=="", hv=el("ds-v").value!=="", ht=el("ds-t").value!=="";
    if(hd&&hv&&!ht){if(!(v>0)){outHTML(box,"Enter a valid speed.");return;}outHTML(box,"Time = "+(d/v).toFixed(2)+" hours");}
    else if(hd&&ht&&!hv){if(!(t>0)){outHTML(box,"Enter a valid time.");return;}outHTML(box,"Speed = "+(d/t).toFixed(1)+" km/h");}
    else if(hv&&ht&&!hd){outHTML(box,"Distance = "+(v*t).toFixed(1)+" km");}
    else if(hd&&hv&&ht){if(!(v>0)){outHTML(box,"Enter a valid speed.");return;}outHTML(box,"Time = "+(d/v).toFixed(2)+" hours");}
    else outHTML(box,"Enter any two values.");
  };
}});

TOOLS.push({ id:"sunmoon", cat:"calc", icon:"🌅", name:"Free Sunrise Sunset Calculator Online",
desc:"Sun times + moon phase", how:"Pick a date, choose a city preset or enter latitude and longitude, then press Calculate for sun times and moon phase.",
render:function(box){
  box.innerHTML = '<h2>🌅 Sunrise Sunset Calculator</h2><div class="row"><div><label>Date</label><input type="date" id="sm-dt"></div><div><label>City preset</label><select id="sm-c"><option value="40.7128,-74.0060,-5">New York</option><option value="51.5074,-0.1278,0">London</option><option value="25.2048,55.2708,4">Dubai</option><option value="28.6139,77.2090,5.5">Delhi</option><option value="24.8607,67.0011,5">Karachi</option><option value="31.5497,74.3436,5">Lahore</option><option value="33.7294,73.0931,5">Islamabad</option><option value="">Custom</option></select></div></div><div class="row"><div><label>Latitude</label><input type="number" id="sm-lat" value="40.7128" step="0.0001"></div><div><label>Longitude</label><input type="number" id="sm-lon" value="-74.0060" step="0.0001"></div><div><label>UTC offset (hours)</label><input type="number" id="sm-tz" value="-5" step="0.5"></div></div><button class="tool-btn" id="sm-go">Calculate</button><div class="tool-out" id="sm-out"></div><p class="tool-note">Approximate solar position math — real times can differ by a few minutes. New York offset -5 (EST); use -4 during daylight-saving months.</p>';
  el("sm-dt").valueAsDate=new Date();
  el("sm-c").onchange=function(){
    var v=el("sm-c").value; if(v){var p=v.split(",");el("sm-lat").value=p[0];el("sm-lon").value=p[1];if(p.length>2)el("sm-tz").value=p[2];}
  };
  function fmtT(h){if(h==null)return "--:--";h=((h%24)+24)%24;var H=Math.floor(h),M=Math.floor((h-H)*60);return (H<10?"0":"")+H+":"+(M<10?"0":"")+M;}
  el("sm-go").onclick=function(){
    var ds=el("sm-dt").value; if(!ds){outHTML(box,"Pick a date.");return;}
    var lat=+el("sm-lat").value, lon=+el("sm-lon").value, tz=+el("sm-tz").value||0;
    if(!(lat>=-90&&lat<=90&&lon>=-180&&lon<=180)){outHTML(box,"Enter valid latitude (-90..90) and longitude (-180..180).");return;}
    var d=new Date(ds+"T00:00:00");
    var N=Math.floor((d-new Date(d.getFullYear(),0,0))/86400000);
    var latR=lat*Math.PI/180, lngH=lon/15;
    function sun(rise){
      var t=N+((rise?6:18)-lngH)/24;
      var M=0.9856*t-3.289;
      var L=M+1.916*Math.sin(M*Math.PI/180)+0.020*Math.sin(2*M*Math.PI/180)+282.634;
      L=((L%360)+360)%360;
      var RAd=((180/Math.PI*Math.atan(0.91764*Math.tan(L*Math.PI/180)))%360+360)%360;
      var RA=(RAd+(Math.floor(L/90)-Math.floor(RAd/90))*90)/15;
      var sinDec=0.39782*Math.sin(L*Math.PI/180), cosDec=Math.cos(Math.asin(sinDec));
      var cosH=(Math.cos(90.833*Math.PI/180)-sinDec*Math.sin(latR))/(cosDec*Math.cos(latR));
      if(cosH<-1||cosH>1)return null;
      var H=(rise?360-180/Math.PI*Math.acos(cosH):180/Math.PI*Math.acos(cosH))/15;
      var UT=H+RA-0.06571*t-6.622-lngH;
      UT=((UT%24)+24)%24;
      return (((UT+tz)%24)+24)%24;
    }
    var sr=sun(true), ss=sun(false);
    var days=Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000;
    var syn=29.53058867, ref=Date.UTC(2000,0,6,18,14)/86400000;
    var age=(((days-ref)%syn)+syn)%syn;
    var illum=(1-Math.cos(2*Math.PI*age/syn))/2*100;
    var names=["New Moon","Waxing Crescent","First Quarter","Waxing Gibbous","Full Moon","Waning Gibbous","Last Quarter","Waning Crescent"];
    var phase=names[Math.floor(age/syn*8)%8];
    var out="Sunrise: "+fmtT(sr)+"\nSunset: "+fmtT(ss);
    if(sr!=null&&ss!=null){var dlh=ss-sr;if(dlh<0)dlh+=24;out+="\nDay length: "+Math.floor(dlh)+"h "+Math.round((dlh%1)*60)+"m";}
    out+="\nMoon: "+phase+" ("+illum.toFixed(0)+"% lit)";
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"carbon", cat:"calc", icon:"🌱", name:"Free Carbon Footprint Calculator Online",
desc:"Yearly CO2 estimate", how:"Enter weekly car km, flights, monthly electricity and diet, then press Calculate for your yearly CO2 estimate.",
render:function(box){
  box.innerHTML = '<h2>🌱 Carbon Footprint Calculator</h2><div class="row"><div><label>Car km per week</label><input type="number" id="cf-km" placeholder="100" min="0"></div><div><label>Fuel</label><select id="cf-f"><option value="2.31">Petrol</option><option value="2.68">Diesel</option><option value="0">Electric</option></select></div><div><label>Car efficiency (km/l)</label><input type="number" id="cf-e" value="12" step="0.1" min="0"></div></div><div class="row"><div><label>Short flights / year</label><input type="number" id="cf-fs" value="0" min="0"></div><div><label>Long flights / year</label><input type="number" id="cf-fl" value="0" min="0"></div><div><label>Electricity (kWh / month)</label><input type="number" id="cf-k" placeholder="200" min="0"></div><div><label>Diet</label><select id="cf-d"><option value="1.7">Heavy meat</option><option value="1.2" selected>Average</option><option value="0.7">Vegetarian</option><option value="0.5">Vegan</option></select></div></div><button class="tool-btn" id="cf-go">Calculate</button><div class="tool-out" id="cf-out"></div><p class="tool-note">Rough estimate using typical emission factors — not an official carbon audit.</p>';
  el("cf-go").onclick=function(){
    var km=+el("cf-km").value||0, f=+el("cf-f").value, eff=+el("cf-e").value||12;
    var car=(f>0&&eff>0)?(km*52/eff)*f/1000:0;
    var fl=(+el("cf-fs").value||0)*0.15+(+el("cf-fl").value||0)*0.9;
    var elec=(+el("cf-k").value||0)*12*0.5/1000;
    var diet=+el("cf-d").value;
    outHTML(box,"Car: "+car.toFixed(2)+" t\nFlights: "+fl.toFixed(2)+" t\nElectricity: "+elec.toFixed(2)+" t\nFood: "+diet.toFixed(2)+" t\nTotal: "+(car+fl+elec+diet).toFixed(2)+" tonnes CO2/year");
  };
}});

/* US AI Dev Tools Pack 2a — 6 client-side developer tools. Loaded alongside tools.js; expects esc(), el(), outHTML(), copyText(), dl(), TOOLS to exist. */
(function () {
"use strict";

/* 1. JSON to CSV / XML / YAML converter */
TOOLS.push({ id:"json2csv", cat:"dev", icon:"🗃️", name:"Free JSON to CSV Converter Online",
desc:"JSON to CSV, XML, YAML", how:"Paste JSON, pick CSV, XML or YAML, press Convert. Copy or download the result.",
render:function(box){
  box.innerHTML = '<h2>🔄 JSON to CSV Converter</h2><label>Paste JSON</label><textarea id="t-in" rows="6" placeholder=\'{"name":"ali"}\'></textarea><label>Output format</label><select id="t-fmt"><option value="csv">CSV</option><option value="xml">XML</option><option value="yaml">YAML</option></select><button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button> <button class="tool-btn ghost tool-dl" id="t-dl" style="display:none">Download</button>';
  el("t-go").onclick = function(){
    var raw = el("t-in").value.trim();
    if(!raw){ outHTML(box,"Please paste some JSON first."); return; }
    var data;
    try { data = JSON.parse(raw); } catch(e){ outHTML(box, "Invalid JSON: " + esc(e.message)); return; }
    var fmt = el("t-fmt").value, out = "", fname = "converted." + fmt;
    function csvCell(v){
      if(v === null || v === undefined) return "";
      var s = (typeof v === "object") ? JSON.stringify(v) : String(v);
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
    }
    if(fmt === "csv"){
      var rows = Array.isArray(data) ? data : [data];
      var keys = [], i, k, r;
      for(i=0;i<rows.length;i++){ var o = rows[i];
        if(o && typeof o === "object" && !Array.isArray(o)){
          for(k in o){ if(o.hasOwnProperty(k) && keys.indexOf(k)===-1) keys.push(k); }
        }
      }
      if(!keys.length) keys = ["value"];
      out = keys.map(csvCell).join(",");
      for(i=0;i<rows.length;i++){ r = rows[i];
        if(r && typeof r === "object" && !Array.isArray(r)) out += "\n" + keys.map(function(x){return csvCell(r[x]);}).join(",");
        else out += "\n" + csvCell(r);
      }
    } else if(fmt === "xml"){
      function xmlNode(tag, v){
        tag = String(tag).replace(/[^a-zA-Z0-9_-]/g,"_") || "item";
        if(v === null || v === undefined) return "<" + tag + "/>";
        if(typeof v === "object"){
          var inner = "";
          if(Array.isArray(v)){ for(var i=0;i<v.length;i++) inner += xmlNode("item", v[i]); }
          else { for(var k in v){ if(v.hasOwnProperty(k)) inner += xmlNode(k, v[k]); } }
          return "<" + tag + ">" + inner + "</" + tag + ">";
        }
        return "<" + tag + ">" + esc(String(v)) + "</" + tag + ">";
      }
      out = '<?xml version="1.0" encoding="UTF-8"?>\n<root>' + xmlNode("data", data).replace(/^<data>/,"").replace(/<\/data>$/,"") + "</root>";
    } else {
      function yamlVal(v, ind){
        var pad = new Array(ind+1).join("  ");
        if(v === null || v === undefined) return "null";
        if(typeof v === "number" || typeof v === "boolean") return String(v);
        if(typeof v === "string") return /[:#\n'"{}[\],&*!|>]/.test(v) ? '"' + v.replace(/"/g,'\\"') + '"' : v;
        if(Array.isArray(v)){
          if(!v.length) return "[]";
          var s = "\n";
          for(var i=0;i<v.length;i++) s += pad + "- " + yamlVal(v[i], ind+1) + "\n";
          return s.replace(/\n$/,"");
        }
        if(typeof v === "object"){
          var keys = [], k;
          for(k in v){ if(v.hasOwnProperty(k)) keys.push(k); }
          if(!keys.length) return "{}";
          var t = "\n";
          for(var j=0;j<keys.length;j++) t += pad + keys[j] + ": " + yamlVal(v[keys[j]], ind+1) + "\n";
          return t.replace(/\n$/,"");
        }
        return esc(String(v));
      }
      out = yamlVal(data, 0);
    }
    outHTML(box, "<pre>" + esc(out) + "</pre>");
    var c = el("t-copy"); c.style.display = ""; c.onclick = function(){ copyText(out, c); };
    var d = el("t-dl"); d.style.display = "";
    d.onclick = function(){ dl("data:text/plain;charset=utf-8," + encodeURIComponent(out), fname); };
  };
}});

/* 2. SQL Query Generator */
TOOLS.push({ id:"sql-gen", cat:"dev", icon:"🗄️", name:"Free SQL Query Generator Online",
desc:"Build SELECT, INSERT, UPDATE", how:"Pick a query type, fill table, columns and WHERE. For INSERT add one row of values per line.",
render:function(box){
  box.innerHTML = '<h2>🗄️ SQL Query Generator</h2><label>Query type</label><select id="t-type"><option value="SELECT">SELECT</option><option value="INSERT">INSERT</option><option value="UPDATE">UPDATE</option><option value="DELETE">DELETE</option></select><label>Table name</label><input type="text" id="t-table" placeholder="users"><label>Columns (comma separated)</label><input type="text" id="t-cols" placeholder="id, name, email"><div id="t-ins-wrap" style="display:none"><label>Values — one row per line, comma separated</label><textarea id="t-vals" rows="4" placeholder="1, Ali, ali@mail.com\n2, Sara, sara@mail.com"></textarea></div><label>WHERE condition (optional)</label><input type="text" id="t-where" placeholder="id = 1"><button class="tool-btn" id="t-go">Generate SQL</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy SQL</button>';
  el("t-type").onchange = function(){
    el("t-ins-wrap").style.display = (el("t-type").value === "INSERT") ? "" : "none";
  };
  function sqlVal(v){
    v = v.trim();
    if(v === "" || v.toUpperCase() === "NULL") return "NULL";
    if(/^-?\d+(\.\d+)?$/.test(v)) return v;
    if(v.toUpperCase() === "TRUE" || v.toUpperCase() === "FALSE") return v.toUpperCase();
    return "'" + v.replace(/'/g,"''") + "'";
  }
  el("t-go").onclick = function(){
    var type = el("t-type").value;
    var table = el("t-table").value.trim();
    if(!table){ outHTML(box,"Please enter a table name."); return; }
    var t = '"' + table.replace(/"/g,'""') + '"';
    var cols = el("t-cols").value.split(",").map(function(s){return s.trim();}).filter(function(s){return s;});
    var where = el("t-where").value.trim();
    var w = where ? "\nWHERE " + where : "";
    var sql = "";
    if(type === "SELECT"){
      sql = "SELECT " + (cols.length ? cols.join(", ") : "*") + "\nFROM " + t + w + ";";
    } else if(type === "INSERT"){
      if(!cols.length){ outHTML(box,"INSERT needs column names."); return; }
      var lines = el("t-vals").value.split("\n").map(function(s){return s.trim();}).filter(function(s){return s;});
      if(!lines.length){ outHTML(box,"Please add at least one row of values."); return; }
      var bad = false;
      var vals = lines.map(function(line){
        var parts = line.split(",").map(function(s){return s.trim();});
        if(parts.length !== cols.length) bad = true;
        return "(" + parts.map(sqlVal).join(", ") + ")";
      });
      if(bad){ outHTML(box,"Each values row must have the same number of items as columns (" + cols.length + ")."); return; }
      sql = "INSERT INTO " + t + " (" + cols.join(", ") + ")\nVALUES\n" + vals.join(",\n") + ";";
    } else if(type === "UPDATE"){
      if(!cols.length){ outHTML(box,"UPDATE needs column names. Edit the ? placeholders with real values."); return; }
      sql = "UPDATE " + t + "\nSET " + cols.map(function(c){return c + " = ?";}).join(", ") + (where ? w : "\n-- WARNING: no WHERE clause, this updates ALL rows!") + ";";
    } else {
      sql = "DELETE FROM " + t + (where ? w : "\n-- WARNING: no WHERE clause, this deletes ALL rows!") + ";";
    }
    outHTML(box, "<pre>" + esc(sql) + "</pre>");
    var c = el("t-copy"); c.style.display = ""; c.onclick = function(){ copyText(sql, c); };
  };
}});

/* 3. CSS Flexbox & Grid Generator */
TOOLS.push({ id:"flexgrid", cat:"dev", icon:"📐", name:"Free CSS Flexbox & Grid Generator Online",
desc:"Visual flex & grid builder", how:"Switch between Flex and Grid, tweak the controls, and watch the preview update live. Copy the CSS.",
render:function(box){
  box.innerHTML = '<h2>📐 CSS Flexbox & Grid Generator</h2>' +
    '<div style="margin-bottom:8px"><button class="tool-btn ghost" id="t-m-flex">Flexbox</button> <button class="tool-btn ghost" id="t-m-grid">Grid</button></div>' +
    '<div id="t-flex-c"><label>flex-direction</label><select id="t-fd"><option>row</option><option>row-reverse</option><option>column</option><option>column-reverse</option></select><label>justify-content</label><select id="t-jc"><option>flex-start</option><option>center</option><option>flex-end</option><option>space-between</option><option>space-around</option><option>space-evenly</option></select><label>align-items</label><select id="t-ai"><option>stretch</option><option>flex-start</option><option>center</option><option>flex-end</option><option>baseline</option></select></div>' +
    '<div id="t-grid-c" style="display:none"><label>Columns (e.g. 1fr 1fr 1fr)</label><input type="text" id="t-gc" value="1fr 1fr 1fr"><label>Rows (e.g. auto auto)</label><input type="text" id="t-gr" value="auto auto"><label>Gap (px)</label><input type="number" id="t-gg" value="10" min="0" max="100"></div>' +
    '<div id="t-preview" style="border:1px solid #ccc;border-radius:8px;padding:10px;margin-top:10px;min-height:120px"></div>' +
    '<div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy">Copy CSS</button>';
  var mode = "flex", css = "";
  function kids(){
    var h = "";
    for(var i=1;i<=6;i++) h += '<div style="background:#4f7cff;color:#fff;border-radius:6px;padding:18px 0;text-align:center;font-weight:bold">' + i + "</div>";
    return h;
  }
  function update(){
    var pv = el("t-preview");
    if(mode === "flex"){
      var fd = el("t-fd").value, jc = el("t-jc").value, ai = el("t-ai").value;
      pv.style.display = "flex"; pv.style.flexDirection = fd; pv.style.justifyContent = jc; pv.style.alignItems = ai;
      pv.style.gridTemplateColumns = ""; pv.style.gridTemplateRows = ""; pv.style.gap = "";
      css = ".container {\n  display: flex;\n  flex-direction: " + fd + ";\n  justify-content: " + jc + ";\n  align-items: " + ai + ";\n}";
    } else {
      var gc = el("t-gc").value.trim() || "1fr 1fr 1fr";
      var gr = el("t-gr").value.trim() || "auto";
      var gg = parseInt(el("t-gg").value, 10); if(isNaN(gg) || gg < 0) gg = 0;
      pv.style.display = "grid"; pv.style.gridTemplateColumns = gc; pv.style.gridTemplateRows = gr; pv.style.gap = gg + "px";
      pv.style.flexDirection = ""; pv.style.justifyContent = ""; pv.style.alignItems = "";
      css = ".container {\n  display: grid;\n  grid-template-columns: " + gc + ";\n  grid-template-rows: " + gr + ";\n  gap: " + gg + "px;\n}";
    }
    pv.innerHTML = kids();
    outHTML(box, "<pre>" + esc(css) + "</pre>");
  }
  el("t-m-flex").onclick = function(){ mode = "flex"; el("t-flex-c").style.display = ""; el("t-grid-c").style.display = "none"; update(); };
  el("t-m-grid").onclick = function(){ mode = "grid"; el("t-flex-c").style.display = "none"; el("t-grid-c").style.display = ""; update(); };
  var ids = ["t-fd","t-jc","t-ai","t-gc","t-gr","t-gg"];
  ids.forEach(function(id){ el(id).onchange = update; el(id).oninput = update; });
  el("t-copy").onclick = function(){ copyText(css, el("t-copy")); };
  update();
}});

/* 4. RegEx Tester & Builder */
TOOLS.push({ id:"regex", cat:"dev", icon:"🧵", name:"Free RegEx Tester & Builder Online",
desc:"Test patterns live", how:"Type a pattern, set flags or pick a preset, then test it live against your text. Matches are highlighted.",
render:function(box){
  box.innerHTML = '<h2>🧪 RegEx Tester</h2><label>Pattern</label><input type="text" id="t-pat" placeholder="e.g. [a-z]+@[a-z]+\\.com"><div style="margin:6px 0"><label style="display:inline;margin-right:12px"><input type="checkbox" id="t-f-g" checked> g</label><label style="display:inline;margin-right:12px"><input type="checkbox" id="t-f-i"> i</label><label style="display:inline"><input type="checkbox" id="t-f-m"> m</label></div><label>Preset</label><select id="t-pre"><option value="">Custom</option><option value="^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$">Email</option><option value="https?://[\\w.-]+(?:\\.[a-zA-Z]{2,})(?:/[\\w./?#&=%+-]*)?">URL</option><option value="\\+?[\\d\\s()\\-]{7,15}">Phone</option><option value="\\d+">Digits</option><option value="\\d{4}-\\d{2}-\\d{2}">Date (YYYY-MM-DD)</option></select><label>Test text</label><textarea id="t-txt" rows="5" placeholder="Type or paste text to test here..."></textarea><div class="tool-out" id="t-out"></div><p class="tool-note">The regex runs in your browser on text you paste — nothing is sent anywhere.</p>';
  el("t-pre").onchange = function(){ if(el("t-pre").value) el("t-pat").value = el("t-pre").value; test(); };
  function test(){
    var pat = el("t-pat").value;
    if(!pat){ outHTML(box, "Enter a pattern to begin."); return; }
    var flags = (el("t-f-g").checked ? "g" : "") + (el("t-f-i").checked ? "i" : "") + (el("t-f-m").checked ? "m" : "");
    var re;
    try { re = new RegExp(pat, flags); }
    catch(e){ outHTML(box, "<b>Invalid regex:</b> " + esc(e.message)); return; }
    var text = el("t-txt").value;
    var matches = text.match(re);
    var count = matches ? matches.length : 0;
    var html;
    if(re.global){
      html = esc(text).replace(re, function(m){ return "<mark>" + esc(m) + "</mark>"; });
    } else {
      var m2 = re.exec(text);
      html = m2 ? esc(text.slice(0, m2.index)) + "<mark>" + esc(m2[0]) + "</mark>" + esc(text.slice(m2.index + m2[0].length)) : esc(text);
    }
    var res = "<b>" + count + " match" + (count === 1 ? "" : "es") + "</b>";
    if(matches){
      res += "<ul>";
      for(var i=0;i<Math.min(matches.length, 20);i++) res += "<li><code>" + esc(matches[i]) + "</code></li>";
      res += "</ul>";
      if(matches.length > 20) res += "<p>Showing first 20 matches.</p>";
    }
    res += "<hr>" + html;
    outHTML(box, res);
  }
  ["t-pat","t-txt"].forEach(function(id){ el(id).oninput = test; });
  ["t-f-g","t-f-i","t-f-m"].forEach(function(id){ el(id).onchange = test; });
}});

/* 5. JWT Token Decoder */
TOOLS.push({ id:"jwt", cat:"dev", icon:"🔑", name:"Free JWT Token Decoder Online",
desc:"Decode header & payload", how:"Paste a JWT token. Header and payload are decoded and shown as readable JSON.",
render:function(box){
  box.innerHTML = '<h2>🔑 JWT Decoder</h2><label>JWT token</label><textarea id="t-in" rows="5" placeholder="eyJhbGciOi..."></textarea><button class="tool-btn" id="t-go">Decode</button><div class="tool-out" id="t-out"></div><p class="tool-note">Header and payload are only base64url-decoded — the signature is NOT verified, so never trust an unverified token. Nothing leaves your browser.</p>';
  function b64url(s){
    s = s.replace(/-/g,"+").replace(/_/g,"/");
    while(s.length % 4) s += "=";
    return decodeURIComponent(escape(atob(s)));
  }
  el("t-go").onclick = function(){
    var tok = el("t-in").value.trim();
    if(!tok){ outHTML(box, "Please paste a JWT token."); return; }
    var parts = tok.split(".");
    if(parts.length !== 3){ outHTML(box, "This does not look like a JWT — a token has 3 parts separated by dots (header.payload.signature)."); return; }
    var header, payload;
    try { header = JSON.parse(b64url(parts[0])); } catch(e){ outHTML(box, "Could not decode the header part: " + esc(e.message)); return; }
    try { payload = JSON.parse(b64url(parts[1])); } catch(e){ outHTML(box, "Could not decode the payload part: " + esc(e.message)); return; }
    var out = "<b>Header</b><pre>" + esc(JSON.stringify(header, null, 2)) + "</pre><b>Payload</b><pre>" + esc(JSON.stringify(payload, null, 2)) + "</pre>";
    out += "<b>Algorithm:</b> " + esc(header.alg ? String(header.alg) : "(none specified)") + "<br>";
    if(header.alg === "none") out += "<b>⚠ alg is \"none\" — this token is not signed.</b><br>";
    if(payload.exp){
      var exp = new Date(payload.exp * 1000);
      var past = exp.getTime() < Date.now();
      out += "<b>Expires:</b> " + esc(exp.toUTCString()) + " — " + (past ? "<b style='color:red'>EXPIRED</b>" : "<b style='color:green'>still valid</b>");
    }
    outHTML(box, out);
  };
}});

/* 6. XML Sitemap Validator */
TOOLS.push({ id:"sitemap-validate", cat:"seo", icon:"✔️", name:"Free XML Sitemap Validator Online",
desc:"Validate sitemap structure", how:"Paste your sitemap XML and press Validate. Structural errors are listed, or you get a clean summary.",
render:function(box){
  box.innerHTML = '<h2>🗺️ Sitemap Validator</h2><label>Sitemap XML</label><textarea id="t-in" rows="8" placeholder="&lt;urlset xmlns=...&gt;..."></textarea><button class="tool-btn" id="t-go">Validate</button><div class="tool-out" id="t-out"></div><p class="tool-note">This checks XML structure and required fields only — it is not a submission to Google Search Console.</p>';
  el("t-go").onclick = function(){
    var xml = el("t-in").value.trim();
    if(!xml){ outHTML(box, "Please paste your sitemap XML first."); return; }
    var doc, errors = [];
    try {
      doc = new DOMParser().parseFromString(xml, "application/xml");
    } catch(e){ outHTML(box, "Could not parse the XML: " + esc(e.message)); return; }
    if(doc.getElementsByTagName("parsererror").length){
      outHTML(box, "<b>❌ Not valid XML:</b><br><pre>" + esc(doc.getElementsByTagName("parsererror")[0].textContent) + "</pre>");
      return;
    }
    var root = doc.documentElement;
    var rname = root.tagName.replace(/^.*:/, "");
    var isIndex = (rname === "sitemapindex");
    var isSet = (rname === "urlset");
    if(!isIndex && !isSet){
      outHTML(box, "<b>❌ Root element must be &lt;urlset&gt; or &lt;sitemapindex&gt;, found:</b> " + esc(root.tagName));
      return;
    }
    var items = isIndex ? root.getElementsByTagName("sitemap") : root.getElementsByTagName("url");
    var itemTag = isIndex ? "sitemap" : "url";
    var locCount = 0;
    var lastmodRe = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})?)?$/;
    var urlRe = /^https?:\/\/[^\s<>"']+$/i;
    for(var i=0;i<items.length;i++){
      var it = items[i], n = i + 1;
      var locs = it.getElementsByTagName("loc");
      if(!locs.length || !locs[0].textContent.trim()){ errors.push("#" + n + ": &lt;" + itemTag + "&gt; is missing a &lt;loc&gt;."); }
      else { locCount++; var u = locs[0].textContent.trim();
        if(!urlRe.test(u)) errors.push("#" + n + ": &lt;loc&gt; is not a valid URL: " + esc(u)); }
      var lms = it.getElementsByTagName("lastmod");
      for(var j=0;j<lms.length;j++){
        var lm = lms[j].textContent.trim();
        if(!lastmodRe.test(lm)) errors.push("#" + n + ": bad &lt;lastmod&gt; format (" + esc(lm) + ") — use YYYY-MM-DD.");
      }
      if(!isIndex){
        var pfs = it.getElementsByTagName("priority");
        for(var k=0;k<pfs.length;k++){
          var p = parseFloat(pfs[k].textContent.trim());
          if(isNaN(p) || p < 0 || p > 1) errors.push("#" + n + ": &lt;priority&gt; must be between 0.0 and 1.0.");
        }
      }
    }
    var html;
    if(errors.length){
      html = "<b>❌ " + errors.length + " problem" + (errors.length === 1 ? "" : "s") + " found in " + items.length + " " + itemTag + " entries:</b><ul><li>" + errors.join("</li><li>") + "</li></ul>";
    } else {
      html = "<b>✅ Valid " + (isIndex ? "sitemap index" : "sitemap") + ":</b> " + items.length + " " + itemTag + " entr" + (items.length === 1 ? "y" : "ies") + ", " + locCount + " with &lt;loc&gt;, no structural errors.";
    }
    outHTML(box, html);
  };
}});

})();

/* US AI Developer tools batch 2b — 10 client-side tools. TOOLS.push blocks only. */

TOOLS.push({ id:"js-obfuscator", cat:"dev", icon:"🕵️", name:"Free JavaScript Obfuscator Online",
desc:"Light code obfuscation", how:"Paste your JavaScript below and press Obfuscate to wrap it in a self-decoding base64 wrapper.",
render:function(box){
  box.innerHTML = '<h2>🕵️ JavaScript Obfuscator</h2><label>Paste your JavaScript code</label><textarea id="t-in" rows="6" placeholder="alert(\'hello\');"></textarea><button class="tool-btn" id="t-go">Obfuscate</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Obfuscated Code</button><p class="tool-note">Light obfuscation only: it deters casual reading but is NOT real protection — anyone can decode base64. Never use it to hide malicious code.</p>';
  el("t-go").onclick = function(){
    var src = el("t-in").value;
    if(!src.trim()){ outHTML(box,"Please enter some JavaScript code first."); return; }
    var b64 = btoa(encodeURIComponent(src));
    var obf = 'eval(decodeURIComponent(atob("' + b64 + '")));';
    outHTML(box,"<pre>"+esc(obf)+"</pre>");
    var c = el("t-copy"); c.style.display=""; c.onclick=function(){copyText(obf,c);};
  };
}});

TOOLS.push({ id:"svg2png", cat:"image", icon:"🔃", name:"Free SVG to PNG Converter Online",
desc:"Rasterize SVG images", how:"Paste SVG code or upload an .svg file, set the width and height, then press Convert to PNG.",
render:function(box){
  box.innerHTML = '<h2>🖼️ SVG to PNG Converter</h2><label>Paste SVG code</label><textarea id="t-in" rows="5" placeholder="&lt;svg ...&gt;...&lt;/svg&gt;"></textarea><label>Or upload an SVG file</label><input type="file" id="t-file" accept=".svg,image/svg+xml"><label>Width (px)</label><input type="number" id="t-w" value="512" min="1" max="4000"><label>Height (px)</label><input type="number" id="t-h" value="512" min="1" max="4000"><button class="tool-btn" id="t-go">Convert to PNG</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-dl" style="display:none">Download PNG</button>';
  el("t-go").onclick = function(){
    var svgText = el("t-in").value.trim();
    var file = el("t-file").files && el("t-file").files[0];
    var w = Math.max(1, Math.min(4000, parseInt(el("t-w").value,10)||512));
    var h = Math.max(1, Math.min(4000, parseInt(el("t-h").value,10)||512));
    if(svgText){ convertSVG(svgText, w, h); }
    else if(file){
      var fr = new FileReader();
      fr.onload = function(){ convertSVG(String(fr.result||""), w, h); };
      fr.onerror = function(){ outHTML(box,"Could not read the uploaded file. Please try again."); };
      fr.readAsText(file);
    } else { outHTML(box,"Please paste SVG code or upload an .svg file first."); }
  };
  function convertSVG(svgText, w, h){
    if(svgText.indexOf("<svg")===-1){ outHTML(box,"That does not look like SVG code — it should contain an &lt;svg&gt; tag."); return; }
    outHTML(box,"Converting...");
    var blob = new Blob([svgText], {type:"image/svg+xml;charset=utf-8"});
    var url = URL.createObjectURL(blob);
    var img = new Image();
    img.onload = function(){
      try{
        var cv = document.createElement("canvas"); cv.width=w; cv.height=h;
        var ctx = cv.getContext("2d"); ctx.drawImage(img,0,0,w,h);
        var dataURL = cv.toDataURL("image/png");
        URL.revokeObjectURL(url);
        outHTML(box,'<p>PNG preview ('+w+' x '+h+' px):</p><img src="'+dataURL+'" alt="PNG preview" style="max-width:100%;border:1px solid #ddd">');
        var d = el("t-dl"); d.style.display=""; d.onclick=function(){ dl(dataURL,"svg-converted.png"); };
      }catch(e){ URL.revokeObjectURL(url); outHTML(box,"Could not rasterize this SVG: "+esc(String(e.message||e))); }
    };
    img.onerror = function(){ URL.revokeObjectURL(url); outHTML(box,"Could not render this SVG — the code may be invalid or use unsupported features."); };
    img.src = url;
  }
}});

TOOLS.push({ id:"redirect-check", cat:"seo", icon:"🔀", name:"Free URL Redirect Checker Online",
desc:"Trace URL redirects", how:"Enter any URL and press Check — we report the final destination and whether it redirected.",
render:function(box){
  box.innerHTML = '<h2>🔀 URL Redirect Checker</h2><label>URL to check</label><input type="text" id="t-in" placeholder="https://example.com/short-link"><button class="tool-btn" id="t-go">Check Redirects</button><div class="tool-out" id="t-out"></div><p class="tool-note">Browsers hide the full redirect chain for security, so only the final destination is visible — intermediate hops cannot be listed client-side.</p>';
  el("t-go").onclick = function(){
    var u = el("t-in").value.trim();
    if(!u){ outHTML(box,"Please enter a URL first."); return; }
    if(!/^https?:\/\//i.test(u)) u = "https://" + u;
    outHTML(box,"Checking...");
    fetch(u, {redirect:"follow"}).then(function(r){
      var final = r.url || u;
      var same = final.replace(/\/$/,"") === u.replace(/\/$/,"");
      outHTML(box,'<p><b>Entered URL:</b> '+esc(u)+'</p><p><b>Final URL:</b> '+esc(final)+'</p><p><b>HTTP status:</b> '+esc(String(r.status))+' '+esc(r.statusText||"")+'</p><p>'+(same?"No redirect — the URL resolves to itself.":"Redirected — the final destination differs from the entered URL.")+'</p>');
    }).catch(function(e){
      outHTML(box,"Could not check this URL: "+esc(String((e&&e.message)||e))+". The target site may block cross-origin requests (CORS), which shows up as a network error.");
    });
  };
}});

TOOLS.push({ id:"cron-gen", cat:"dev", icon:"⏰", name:"Free Cron Expression Generator Online",
desc:"Build cron + plain English", how:"Fill the five fields or pick a preset, then press Generate to get your cron expression in plain English.",
render:function(box){
  box.innerHTML = '<h2>⏰ Cron Expression Generator</h2><p class="tool-note" style="margin-top:0">Format: minute hour day-of-month month day-of-week. Use * for every, */5 for every 5, 1,15 for lists.</p><label>Minute (0-59)</label><input type="text" id="t-min" value="30"><label>Hour (0-23)</label><input type="text" id="t-hr" value="9"><label>Day of month (1-31)</label><input type="text" id="t-dom" value="*"><label>Month (1-12)</label><input type="text" id="t-mo" value="*"><label>Day of week (0-6, 0=Sunday)</label><input type="text" id="t-dow" value="*"><div style="margin:8px 0"><button class="tool-btn ghost" data-p="* * * * *">Every minute</button> <button class="tool-btn ghost" data-p="0 * * * *">Every hour</button> <button class="tool-btn ghost" data-p="0 9 * * *">Daily</button> <button class="tool-btn ghost" data-p="0 9 * * 1">Weekly</button> <button class="tool-btn ghost" data-p="0 9 1 * *">Monthly</button></div><button class="tool-btn" id="t-go">Generate Cron</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Expression</button>';
  var presets = box.querySelectorAll("[data-p]");
  for(var i=0;i<presets.length;i++){
    (function(b){ b.onclick=function(){ var p=b.getAttribute("data-p").split(" "); el("t-min").value=p[0]; el("t-hr").value=p[1]; el("t-dom").value=p[2]; el("t-mo").value=p[3]; el("t-dow").value=p[4]; }; })(presets[i]);
  }
  function pad(n){ n=String(n); return n.length<2 ? "0"+n : n; }
  function describe(mi,hr,dm,mo,dw){
    var dn=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var mn=["","January","February","March","April","May","June","July","August","September","October","November","December"];
    if(mi==="*"&&hr==="*"&&dm==="*"&&mo==="*"&&dw==="*") return "Every minute";
    if(hr==="*"&&dm==="*"&&mo==="*"&&dw==="*"){
      if(mi.indexOf("*/")===0) return "Every "+mi.slice(2)+" minutes";
      return "At minute "+mi+" of every hour";
    }
    var t = (mi!=="*"&&hr!=="*") ? "At "+pad(hr)+":"+pad(mi) : "Every "+mi+" minutes past every hour";
    var where = "every day";
    if(dw!=="*"&&/^[0-7]$/.test(dw)) where = "every "+dn[parseInt(dw,10)%7];
    else if(dm!=="*") where = "on day "+dm+" of every month";
    if(mo!=="*"&&/^\d{1,2}$/.test(mo)&&parseInt(mo,10)>=1&&parseInt(mo,10)<=12) where += " in "+mn[parseInt(mo,10)];
    return t+" "+where;
  }
  el("t-go").onclick = function(){
    var mi=el("t-min").value.trim()||"*", hr=el("t-hr").value.trim()||"*", dm=el("t-dom").value.trim()||"*", mo=el("t-mo").value.trim()||"*", dw=el("t-dow").value.trim()||"*";
    var expr = mi+" "+hr+" "+dm+" "+mo+" "+dw;
    outHTML(box,'<p style="font-size:1.3em"><b>'+esc(expr)+'</b></p><p>'+esc(describe(mi,hr,dm,mo,dw))+'</p>');
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(expr,c);};
  };
}});

TOOLS.push({ id:"uuid", cat:"dev", icon:"🆔", name:"Free UUID v4 Generator Online",
desc:"RFC4122 random UUIDs", how:"Choose how many UUIDs you need and press Generate — RFC4122 v4 IDs appear instantly.",
render:function(box){
  box.innerHTML = '<h2>🆔 UUID v4 Generator</h2><label>How many (1-50)</label><input type="number" id="t-in" value="5" min="1" max="50"><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy All</button>';
  function uuidv4(){
    var b = new Uint8Array(16);
    if(window.crypto && crypto.getRandomValues) crypto.getRandomValues(b);
    else for(var i=0;i<16;i++) b[i]=Math.floor(Math.random()*256);
    b[6] = (b[6]&0x0f)|0x40; b[8] = (b[8]&0x3f)|0x80;
    var h=[]; for(var j=0;j<16;j++) h.push(("0"+b[j].toString(16)).slice(-2));
    return h[0]+h[1]+h[2]+h[3]+"-"+h[4]+h[5]+"-"+h[6]+h[7]+"-"+h[8]+h[9]+"-"+h[10]+h[11]+h[12]+h[13]+h[14]+h[15];
  }
  el("t-go").onclick = function(){
    var n = Math.max(1, Math.min(50, parseInt(el("t-in").value,10)||5));
    var list = []; for(var i=0;i<n;i++) list.push(uuidv4());
    outHTML(box,"<pre>"+esc(list.join("\n"))+"</pre>");
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(list.join("\n"),c);};
  };
}});

TOOLS.push({ id:"ascii-art", cat:"fun", icon:"🔤", name:"Free ASCII Text Art Generator Online",
desc:"Banner text art", how:"Type text and press Generate to turn it into big block-letter ASCII art you can copy anywhere.",
render:function(box){
  box.innerHTML = '<h2>🔤 ASCII Text Art Generator</h2><label>Your text (letters, numbers, spaces)</label><input type="text" id="t-in" placeholder="HELLO" maxlength="40"><button class="tool-btn" id="t-go">Generate Art</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Art</button>';
  var F = {
    "A":[" ### ","#   #","#####","#   #","#   #"],"B":["#### ","#   #","#### ","#   #","#### "],
    "C":[" ### ","#   #","#    ","#   #"," ### "],"D":["#### ","#   #","#   #","#   #","#### "],
    "E":["#####","#    ","#### ","#    ","#####"],"F":["#####","#    ","#### ","#    ","#    "],
    "G":[" ### ","#   #","# ###","#   #"," ### "],"H":["#   #","#   #","#####","#   #","#   #"],
    "I":["#####","  #  ","  #  ","  #  ","#####"],"J":["#####","   # ","   # ","#  # "," ##  "],
    "K":["#   #","#  # ","###  ","#  # ","#   #"],"L":["#    ","#    ","#    ","#    ","#####"],
    "M":["#   #","## ##","# # #","#   #","#   #"],"N":["#   #","##  #","# # #","#  ##","#   #"],
    "O":[" ### ","#   #","#   #","#   #"," ### "],"P":["#### ","#   #","#### ","#    ","#    "],
    "Q":[" ### ","#   #","#   #","# # #"," ## #"],"R":["#### ","#   #","#### ","#  # ","#   #"],
    "S":[" ### ","#    "," ### ","    #"," ### "],"T":["#####","  #  ","  #  ","  #  ","  #  "],
    "U":["#   #","#   #","#   #","#   #"," ### "],"V":["#   #","#   #","#   #"," # # ","  #  "],
    "W":["#   #","#   #","# # #","## ##","#   #"],"X":["#   #","#   #","  #  ","#   #","#   #"],
    "Y":["#   #","#   #","  #  ","  #  ","  #  "],"Z":["#####","   # ","  #  "," #   ","#####"],
    "0":[" ### ","#  ##","# # #","##  #"," ### "],"1":["  #  "," ##  ","  #  ","  #  "," ### "],
    "2":[" ### ","#   #","   # ","  #  ","#####"],"3":["#### ","    #"," ### ","    #","#### "],
    "4":["#  # ","#  # ","#### ","   # ","   # "],"5":["#####","#    ","#### ","    #","#### "],
    "6":[" ### ","#    ","#### ","#   #"," ### "],"7":["#####","   # ","  #  "," #   "," #   "],
    "8":[" ### ","#   #"," ### ","#   #"," ### "],"9":[" ### ","#   #"," ####","    #"," ### "],
    " ":["     ","     ","     ","     ","     "]
  };
  el("t-go").onclick = function(){
    var txt = el("t-in").value.toUpperCase();
    if(!txt.trim()){ outHTML(box,"Please type some text first."); return; }
    var rows=["","","","",""];
    for(var i=0;i<txt.length;i++){
      var g = F[txt.charAt(i)] || F[" "];
      for(var r=0;r<5;r++) rows[r] += g[r] + " ";
    }
    var art = rows.join("\n");
    outHTML(box,"<pre>"+esc(art)+"</pre>");
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(art,c);};
  };
}});

TOOLS.push({ id:"html-entities", cat:"dev", icon:"🔠", name:"Free HTML Entity Encoder / Decoder Online",
desc:"Encode & decode entities", how:"Paste text and press Encode to escape entities or Decode to convert entities back to characters.",
render:function(box){
  box.innerHTML = '<h2>🔣 HTML Entity Encoder / Decoder</h2><label>Your text</label><textarea id="t-in" rows="5" placeholder="Paste text or HTML here..."></textarea><button class="tool-btn" id="t-enc">Encode (&amp; &lt; &gt; &quot; &#39;)</button> <button class="tool-btn ghost" id="t-dec">Decode</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Result</button>';
  var map = {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};
  function show(result){
    outHTML(box,"<pre>"+esc(result)+"</pre>");
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(result,c);};
  }
  el("t-enc").onclick = function(){
    var s = el("t-in").value;
    show(String(s).replace(/[&<>"']/g, function(ch){ return map[ch]; }));
  };
  el("t-dec").onclick = function(){
    var s = el("t-in").value;
    var d = document.createElement("textarea");
    d.innerHTML = s;
    show(d.value);
  };
}});

TOOLS.push({ id:"code-compiler", cat:"dev", icon:"▶️", name:"Free Online Code Runner Online",
desc:"Run JavaScript instantly", how:"Type JavaScript code and press Run — output and errors appear below, instantly.",
render:function(box){
  box.innerHTML = '<h2>▶️ Online Code Runner</h2><label>JavaScript code</label><textarea id="t-in" rows="8" placeholder="for(var i=1;i<=5;i++){ console.log(\'Line \'+i); }"></textarea><button class="tool-btn" id="t-go">Run Code</button><div class="tool-out" id="t-out"></div><p class="tool-note">This runner executes JavaScript only — Python, C++, PHP and other languages need a server. Free options: <a href="https://www.programiz.com/python-programming/online-compiler/" target="_blank" rel="noopener">Programiz</a>, <a href="https://www.onlinegdb.com/" target="_blank" rel="noopener">OnlineGDB</a>.</p>';
  el("t-go").onclick = function(){
    var src = el("t-in").value;
    if(!src.trim()){ outHTML(box,"Please type some code first."); return; }
    var logs = [];
    var fakeConsole = { log:function(){ var a=[]; for(var i=0;i<arguments.length;i++) a.push(String(arguments[i])); logs.push(a.join(" ")); } };
    try{
      var fn = new Function("console", src);
      fn(fakeConsole);
      var text = logs.length ? logs.join("\n") : "(no output — console.log produced nothing)";
      outHTML(box,"<pre>"+esc(text)+"</pre>");
    }catch(e){
      outHTML(box,"<pre>Error: "+esc(String(e && e.message || e))+"</pre>");
    }
  };
}});

TOOLS.push({ id:"css-radius", cat:"image", icon:"⬛", name:"Free Border Radius Generator Online",
desc:"Rounded corners visually", how:"Drag the four corner sliders to shape the preview box and copy the generated CSS.",
render:function(box){
  box.innerHTML = '<h2>⬛ Border Radius Generator</h2><label>Top-left: <span id="t-v1">20</span>px</label><input type="range" id="t-r1" min="0" max="200" value="20"><label>Top-right: <span id="t-v2">20</span>px</label><input type="range" id="t-r2" min="0" max="200" value="20"><label>Bottom-right: <span id="t-v3">20</span>px</label><input type="range" id="t-r3" min="0" max="200" value="20"><label>Bottom-left: <span id="t-v4">20</span>px</label><input type="range" id="t-r4" min="0" max="200" value="20"><div id="t-prev" style="width:220px;height:150px;max-width:100%;margin:12px auto;background:linear-gradient(135deg,#6a5cff,#00d4ff)"></div><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy">Copy CSS</button>';
  var lastCSS = "";
  function update(){
    var a=el("t-r1").value, b=el("t-r2").value, c=el("t-r3").value, d=el("t-r4").value;
    el("t-v1").textContent=a; el("t-v2").textContent=b; el("t-v3").textContent=c; el("t-v4").textContent=d;
    el("t-prev").style.borderRadius = a+"px "+b+"px "+c+"px "+d+"px";
    lastCSS = "border-radius: "+a+"px "+b+"px "+c+"px "+d+"px;";
    outHTML(box,"<pre>"+esc(lastCSS)+"</pre>");
  }
  el("t-r1").oninput=update; el("t-r2").oninput=update; el("t-r3").oninput=update; el("t-r4").oninput=update;
  el("t-copy").onclick=function(){ copyText(lastCSS, el("t-copy")); };
  update();
}});

TOOLS.push({ id:"unix-time", cat:"dev", icon:"🕒", name:"Free Unix Timestamp Converter Online",
desc:"Epoch to human date", how:"Enter a Unix timestamp to see the human date, or use Now; convert a date back with the picker.",
render:function(box){
  box.innerHTML = '<h2>🕒 Unix Timestamp Converter</h2><label>Unix timestamp (seconds)</label><input type="number" id="t-in" placeholder="e.g. 1791561600"><button class="tool-btn" id="t-go">Convert</button> <button class="tool-btn ghost" id="t-now">Now</button><div class="tool-out" id="t-out"></div><label style="margin-top:12px">Or: pick a date &amp; time to get its timestamp</label><input type="datetime-local" id="t-dt"><button class="tool-btn" id="t-go2">Get Timestamp</button><div class="tool-out" id="t-out2"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Timestamp</button>';
  function convert(){
    var v = parseInt(el("t-in").value,10);
    if(isNaN(v)){ outHTML(box,"Please enter a valid timestamp in seconds."); return; }
    var d = new Date(v*1000);
    if(isNaN(d.getTime())){ outHTML(box,"That value is out of range for a date."); return; }
    outHTML(box,'<p><b>Local:</b> '+esc(d.toString())+'</p><p><b>UTC:</b> '+esc(d.toUTCString())+'</p><p><b>ISO:</b> '+esc(d.toISOString())+'</p>');
  }
  el("t-go").onclick = convert;
  el("t-now").onclick = function(){ el("t-in").value = String(Math.floor(Date.now()/1000)); convert(); };
  el("t-go2").onclick = function(){
    var v = el("t-dt").value;
    if(!v){ el("t-out2").innerHTML = "Please pick a date and time first."; return; }
    var d = new Date(v);
    if(isNaN(d.getTime())){ el("t-out2").innerHTML = "Could not parse that date."; return; }
    var ts = String(Math.floor(d.getTime()/1000));
    el("t-out2").innerHTML = '<p style="font-size:1.3em"><b>'+esc(ts)+'</b></p>';
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(ts,c);};
  };
}});

/* US AI Mega Tools — Finance + Web/SEO batch (5 tools, all client-side, ES5). */

TOOLS.push({ id:"crypto-prices", cat:"finance", icon:"₿", name:"Free Live Crypto Prices Online",
desc:"Top 20 coins, CoinGecko", how:"Press Refresh to load the live top-20 coin prices from CoinGecko. Rates update about once a minute and are informational only.",
render:function(box){
  box.innerHTML = '<h2>₿ Live Crypto Prices</h2><button class="tool-btn" id="t-go">Refresh</button><div class="tool-out" id="t-out">Loading...</div><p class="tool-note">Prices by CoinGecko — informational only, not investment advice.</p>';
  function load(){
    outHTML(box, "Loading...");
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20").then(function(r){
      if(!r.ok){ throw new Error("http "+r.status); }
      return r.json();
    }).then(function(d){
      var h = '<table style="width:100%;border-collapse:collapse;font-size:.92rem">';
      h += '<tr><th style="text-align:left;padding:6px;border-bottom:1px solid var(--line)">Coin</th><th style="text-align:right;padding:6px;border-bottom:1px solid var(--line)">Price (USD)</th><th style="text-align:right;padding:6px;border-bottom:1px solid var(--line)">24h %</th></tr>';
      d.forEach(function(c){
        var chg = c.price_change_percentage_24h;
        var col = (chg >= 0) ? "#16a34a" : "#dc2626";
        var chgTxt = (chg >= 0 ? "+" : "") + (chg == null ? "—" : chg.toFixed(2) + "%");
        var price = c.current_price == null ? "—" : (c.current_price < 1 ? c.current_price.toFixed(6) : c.current_price.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}));
        h += '<tr><td style="padding:6px;border-bottom:1px solid var(--line)">' + esc(c.name) + ' (' + esc(String(c.symbol).toUpperCase()) + ')</td>' +
             '<td style="text-align:right;padding:6px;border-bottom:1px solid var(--line)">$' + price + '</td>' +
             '<td style="text-align:right;padding:6px;border-bottom:1px solid var(--line);color:' + col + '">' + chgTxt + '</td></tr>';
      });
      h += '</table>';
      outHTML(box, h);
    }).catch(function(){
      outHTML(box, "⚠️ Live prices are unavailable right now (CoinGecko rate limit or network error). Please try again in a minute.");
    });
  }
  el("t-go").onclick = load;
  load();
}});

TOOLS.push({ id:"gold-rates", cat:"finance", icon:"🪙", name:"Free Gold & Silver Rates Online",
desc:"Live metal prices", how:"Press Get Rates to fetch live gold and silver prices. If the live feed is down, an honest fallback message is shown instead of made-up numbers.",
render:function(box){
  box.innerHTML = '<h2>🪙 Gold &amp; Silver Rates</h2><button class="tool-btn" id="t-go">Get Rates</button><div class="tool-out" id="t-out"></div><p class="tool-note">Indicative spot prices per troy ounce — informational only, not investment advice.</p>';
  el("t-go").onclick = function(){
    outHTML(box, "Fetching live prices...");
    var urls = ["https://api.gold-api.com/price/XAU", "https://api.gold-api.com/price/XAG"];
    Promise.all(urls.map(function(u){
      return fetch(u).then(function(r){ if(!r.ok){ throw new Error("http "+r.status); } return r.json(); });
    })).then(function(d){
      var gold = d[0].price, silver = d[1].price;
      if(!gold || !silver){ throw new Error("bad data"); }
      try{ localStorage.setItem("sawalai_metal_rates", JSON.stringify({gold: gold/G_PER_OZ, silver: silver/G_PER_OZ, date: new Date().toISOString().slice(0,10)})); }catch(e){}
      var G_PER_OZ = 31.1035;
      var h = '<p><b>Gold (XAU):</b> $' + gold.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) + ' / troy oz' +
              ' &nbsp;(≈ $' + (gold/G_PER_OZ).toFixed(2) + ' / gram)</p>' +
              '<p><b>Silver (XAG):</b> $' + silver.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}) + ' / troy oz' +
              ' &nbsp;(≈ $' + (silver/G_PER_OZ).toFixed(2) + ' / gram)</p>';
      outHTML(box, h);
    }).catch(function(){
      outHTML(box, "⚠️ Live feed unavailable right now — please check a bullion dealer site for current gold and silver prices. We show no prices rather than made-up numbers.");
    });
  };
}});

TOOLS.push({ id:"wirasat", cat:"finance", icon:"🕌", name:"Free Wirasat Calculator Online",
desc:"Islamic inheritance shares", how:"Enter the total estate value and heir details, then press Calculate Shares to see each heir's fixed share and amount in standard proportions.",
render:function(box){
  box.innerHTML = '<h2>🤲 Wirasat (Inheritance) Calculator</h2>' +
    '<div class="row"><div><label>Total estate value</label><input type="number" id="t-v" value="1000000"></div>' +
    '<div><label>Spouse</label><select id="t-s"><option value="none">None</option><option value="husband">Husband</option><option value="wife">Wife</option></select></div></div>' +
    '<div class="row"><div><label>Sons</label><input type="number" id="t-so" value="1" min="0"></div>' +
    '<div><label>Daughters</label><input type="number" id="t-d" value="1" min="0"></div></div>' +
    '<div class="row"><div><label>Father alive?</label><select id="t-f"><option value="n">No</option><option value="y">Yes</option></select></div>' +
    '<div><label>Mother alive?</label><select id="t-m"><option value="n">No</option><option value="y">Yes</option></select></div></div>' +
    '<button class="tool-btn" id="t-go">Calculate Shares</button><div class="tool-out" id="t-out"></div>' +
    '<p class="tool-note"><b>Simplified calculation — consult a scholar for real cases.</b> Standard fixed-share rules: husband 1/2 (no children) or 1/4; wife 1/4 (no children) or 1/8; father 1/6; mother 1/6 (with children) or 1/3; remainder to children at 2:1 (son:daughter).</p>';
  el("t-go").onclick = function(){
    var total = +el("t-v").value || 0;
    var spouse = el("t-s").value;
    var sons = Math.max(0, Math.floor(+el("t-so").value || 0));
    var daughters = Math.max(0, Math.floor(+el("t-d").value || 0));
    var father = el("t-f").value === "y";
    var mother = el("t-m").value === "y";
    if(total <= 0){ outHTML(box, "Enter a valid estate value."); return; }
    var hasChildren = (sons + daughters) > 0;
    var shares = []; // {who, frac}
    var fixedTotal = 0;
    if(spouse === "husband"){ shares.push({who:"Husband", frac: hasChildren ? 1/4 : 1/2}); fixedTotal += shares[shares.length-1].frac; }
    if(spouse === "wife"){ shares.push({who:"Wife", frac: hasChildren ? 1/8 : 1/4}); fixedTotal += shares[shares.length-1].frac; }
    if(father){ shares.push({who:"Father", frac: 1/6}); fixedTotal += 1/6; }
    if(mother){ shares.push({who:"Mother", frac: hasChildren ? 1/6 : 1/3}); fixedTotal += shares[shares.length-1].frac; }
    var remainder = 1 - fixedTotal;
    var h = "";
    if(remainder < 0){ h = "⚠️ With these heirs the fixed shares exceed the estate (aul/proportional reduction needed) — this simplified calculator cannot resolve it. Consult a scholar."; }
    else if(!hasChildren){
      h = "No children selected, so the remainder (" + (remainder*100).toFixed(1) + "%) may pass to other relatives — this simplified calculator covers only spouse, parents and children. Consult a scholar.";
      shares.forEach(function(s){ h += "\n" + s.who + ": " + (s.frac*100).toFixed(1) + "% = " + Math.round(s.frac*total).toLocaleString(); });
    } else {
      var units = sons * 2 + daughters;
      if(remainder <= 0){ h = "No remainder left for children under the fixed shares — consult a scholar."; }
      else {
        var sonShare = remainder / units * 2, dauShare = remainder / units;
        if(sons){ h += "\nEach son (" + sons + "): " + (sonShare*100).toFixed(1) + "% = " + Math.round(sonShare*total).toLocaleString() +
          (sons > 1 ? "  (all sons: " + Math.round(sonShare*total*sons).toLocaleString() + ")" : ""); }
        if(daughters){ h += "\nEach daughter (" + daughters + "): " + (dauShare*100).toFixed(1) + "% = " + Math.round(dauShare*total).toLocaleString() +
          (daughters > 1 ? "  (all daughters: " + Math.round(dauShare*total*daughters).toLocaleString() + ")" : ""); }
        shares.forEach(function(s){
          h += "\n" + s.who + ": " + (s.frac*100).toFixed(1) + "% = " + Math.round(s.frac*total).toLocaleString();
        });
        h += "\n\nTotal distributed: 100% = " + Math.round(total).toLocaleString();
      }
    }
    outHTML(box, esc(h));
  };
}});

TOOLS.push({ id:"ssl-check", cat:"seo", icon:"🔒", name:"Free SSL Checker Online",
desc:"Domain security check", how:"Enter any domain to run what a browser can honestly check. For the current page, see its real protocol too.",
render:function(box){
  box.innerHTML = '<h2>🔒 SSL / HTTPS Checker</h2><label>Domain (e.g. example.com)</label><input type="text" id="t-in" placeholder="example.com"><div class="row"><button class="tool-btn" id="t-go">Check Domain</button><button class="tool-btn ghost" id="t-cur">Check current site</button></div><div class="tool-out" id="t-out"></div><p class="tool-note">What we checked vs what needs an external tool is listed clearly below each result.</p>';
  function cleanDomain(v){
    v = v.trim().toLowerCase().replace(/^https?:\/\//,"").replace(/^www\./,"").split(/[\s\/:#?]/)[0];
    return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/.test(v) ? v : null;
  }
  function sslLabsLink(d){
    return 'https://www.ssllabs.com/ssltest/analyze.html?d=' + encodeURIComponent(d);
  }
  el("t-cur").onclick = function(){
    var proto = location.protocol;
    var secure = proto === "https:";
    var host = location.host || "(this page)";
    var h = '<p><b>' + esc(host) + '</b> is loaded over <b>' + esc(proto) + '</b> — ' +
      (secure ? '<span style="color:#16a34a">✅ secure connection</span>' : '<span style="color:#dc2626">⚠️ NOT secure</span>') + '</p>';
    if(secure){
      h += '<p><b>✅ Actually checked in your browser:</b> this page was delivered over HTTPS, so its certificate is valid for ' + esc(location.hostname) + ' (browsers refuse to load pages with invalid certificates).</p>';
    }
    h += '<p><b>ℹ️ What a browser cannot read client-side:</b> issuer, expiry date, chain details. For full certificate details open <a href="' + sslLabsLink(location.hostname) + '" target="_blank" rel="noopener" style="color:#818cf8">SSL Labs test for ' + esc(location.hostname) + '</a>.</p>';
    outHTML(box, h);
  };
  el("t-go").onclick = function(){
    var d = cleanDomain(el("t-in").value);
    if(!d){ outHTML(box, "Enter a valid domain, e.g. example.com"); return; }
    outHTML(box, "Checking https://" + esc(d) + " ...");
    fetch("https://" + d, { method: "HEAD", mode: "no-cors" }).then(function(){
      var h = '<p><b>https://' + esc(d) + '</b> — <span style="color:#16a34a">✅ HTTPS reachable</span> (a TLS handshake succeeded; browsers refuse invalid certificates, so its certificate is currently valid for ' + esc(d) + ').</p>' +
        '<p><b>✅ Actually checked:</b> HTTPS reachability from your network.</p>' +
        '<p><b>ℹ️ Not checked here</b> (needs an external tool): issuer, expiry date, chain, HSTS, TLS versions. Run the free <a href="' + sslLabsLink(d) + '" target="_blank" rel="noopener" style="color:#818cf8">SSL Labs test for ' + esc(d) + '</a> for full certificate analysis.</p>';
      outHTML(box, h);
    }).catch(function(){
      var h = '<p><b>https://' + esc(d) + '</b> — <span style="color:#dc2626">⚠️ HTTPS request failed</span>. Possible causes: no HTTPS, invalid/expired certificate, blocking, or the domain does not exist.</p>' +
        '<p><b>✅ Actually checked:</b> HTTPS reachability attempt.</p>' +
        '<p><b>ℹ️ For diagnosis</b> run the free <a href="' + sslLabsLink(d) + '" target="_blank" rel="noopener" style="color:#818cf8">SSL Labs test for ' + esc(d) + '</a>.</p>';
      outHTML(box, h);
    });
  };
}});

TOOLS.push({ id:"whois", cat:"seo", icon:"🪪", name:"Free Whois Lookup Online",
desc:"Domain ownership via RDAP", how:"Type a domain name and press Lookup to fetch its public registration record from RDAP. Private or invalid domains show a friendly message.",
render:function(box){
  box.innerHTML = '<h2>🔍 Whois Lookup (RDAP)</h2><label>Domain name</label><input type="text" id="t-in" placeholder="example.com"><button class="tool-btn" id="t-go">Lookup</button><div class="tool-out" id="t-out"></div><p class="tool-note">Data from the public RDAP directory — many registrants hide details for privacy.</p>';
  el("t-go").onclick = function(){
    var v = el("t-in").value.trim().toLowerCase().replace(/^https?:\/\//,"").replace(/^www\./,"").split(/[\s\/:#?]/)[0];
    if(!/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/.test(v)){ outHTML(box, "Enter a valid domain, e.g. example.com"); return; }
    outHTML(box, "Looking up " + esc(v) + " ...");
    fetch("https://rdap.org/domain/" + encodeURIComponent(v)).then(function(r){
      if(r.status === 404){ throw new Error("not found"); }
      if(!r.ok){ throw new Error("http " + r.status); }
      return r.json();
    }).then(function(d){
      function evDate(k){
        var out = "—";
        (d.events || []).forEach(function(e){ if(e.eventAction === k && out === "—"){ out = e.eventDate ? e.eventDate.slice(0,10) : "—"; } });
        return out;
      }
      var registrar = "—";
      (d.entities || []).forEach(function(e){
        if(e.roles && e.roles.indexOf("registrar") !== -1){
          var vh = e.vcardArray && e.vcardArray[1];
          if(vh){ vh.forEach(function(f){ if(f[0] === "fn"){ registrar = f[3]; } }); }
          else if(e.publicIds && e.publicIds.length){ registrar = e.publicIds[0].identifier; }
        }
      });
      var registrant = "—";
      (d.entities || []).forEach(function(e){
        if(e.roles && e.roles.indexOf("registrant") !== -1){
          var vh = e.vcardArray && e.vcardArray[1];
          if(vh){ vh.forEach(function(f){ if(f[0] === "fn"){ registrant = f[3]; } if(f[0] === "adr"){ var parts = f[3]; if(parts && parts.length >= 3){ registrant += " (" + parts[3] + (parts[4] ? ", " + parts[4] : "") + (parts[6] ? ", " + parts[6] : "") + ")"; } } }); }
        }
      });
      var ns = (d.nameservers || []).map(function(n){ return n.ldhName; }).filter(function(x){ return x; });
      var h = '<table style="width:100%;border-collapse:collapse;font-size:.92rem">' +
        '<tr><td style="padding:6px;border-bottom:1px solid var(--line)"><b>Domain</b></td><td style="padding:6px;border-bottom:1px solid var(--line)">' + esc(d.ldhName || v) + '</td></tr>' +
        '<tr><td style="padding:6px;border-bottom:1px solid var(--line)"><b>Registrar</b></td><td style="padding:6px;border-bottom:1px solid var(--line)">' + esc(registrar) + '</td></tr>' +
        '<tr><td style="padding:6px;border-bottom:1px solid var(--line)"><b>Created</b></td><td style="padding:6px;border-bottom:1px solid var(--line)">' + esc(evDate("registration")) + '</td></tr>' +
        '<tr><td style="padding:6px;border-bottom:1px solid var(--line)"><b>Expires</b></td><td style="padding:6px;border-bottom:1px solid var(--line)">' + esc(evDate("expiration")) + '</td></tr>' +
        '<tr><td style="padding:6px;border-bottom:1px solid var(--line)"><b>Registrant</b></td><td style="padding:6px;border-bottom:1px solid var(--line)">' + esc(registrant) + '</td></tr>' +
        '<tr><td style="padding:6px;border-bottom:1px solid var(--line)"><b>Name servers</b></td><td style="padding:6px;border-bottom:1px solid var(--line)">' + esc(ns.join(", ") || "—") + '</td></tr></table>';
      outHTML(box, h);
    }).catch(function(e){
      if(e && e.message === "not found"){ outHTML(box, "❌ " + esc(v) + " does not appear to be registered, or the RDAP record is unavailable."); }
      else { outHTML(box, "⚠️ RDAP lookup failed for " + esc(v) + " (network error or RDAP service down). Please try again later."); }
    });
  };
}});

TOOLS.push({ id:"snake", cat:"fun", icon:"🐍", name:"Free Snake Game Online",
desc:"Classic arcade snake", how:"Steer with arrow keys, WASD, swipe, or the on-screen pad. Eat food to grow and speed up. Avoid walls and your own tail.",
render:function(box){
  box.innerHTML = '<h2>🐍 Snake Game</h2><canvas id="snk-cv" width="400" height="400" style="max-width:100%;background:#0d1b2a;border-radius:8px;touch-action:none"></canvas><div class="tool-out" id="snk-out"></div><div style="display:grid;grid-template-columns:repeat(3,60px);gap:6px;justify-content:center;margin-top:10px"><span></span><button class="tool-btn" data-d="up">▲</button><span></span><button class="tool-btn" data-d="left">◀</button><button class="tool-btn" data-d="down">▼</button><button class="tool-btn" data-d="right">▶</button></div><button class="tool-btn ghost" id="snk-restart" style="margin-top:10px">Restart</button>';
  var cv = el("snk-cv"), ctx = cv.getContext("2d"), out = el("snk-out");
  var N = 20, CELL = 20;
  var DIRS = { up:{x:0,y:-1}, down:{x:0,y:1}, left:{x:-1,y:0}, right:{x:1,y:0} };
  var KEYMAP = { 37:"left", 38:"up", 39:"right", 40:"down", 65:"left", 87:"up", 68:"right", 83:"down" };
  var snake, dir, pending, food, score, foods, speed, timer, over;
  function placeFood(){
    while(true){
      var x = Math.floor(Math.random()*N), y = Math.floor(Math.random()*N), ok = true, i;
      for(i=0;i<snake.length;i++){ if(snake[i].x===x && snake[i].y===y){ ok=false; break; } }
      if(ok){ food = {x:x, y:y}; return; }
    }
  }
  function reset(){
    snake = [{x:10,y:10},{x:9,y:10},{x:8,y:10}]; dir = {x:1,y:0}; pending = null;
    score = 0; foods = 0; speed = 140; over = false; placeFood(); draw(); updateOut();
  }
  function updateOut(){ out.innerHTML = "Score: " + score + " &nbsp; Length: " + snake.length + " &nbsp; Speed: " + Math.round(1400/speed*10)/10 + "x"; }
  function setDir(d){
    var nd = DIRS[d];
    if(nd.x === -dir.x && nd.y === -dir.y) return;
    pending = nd;
  }
  function tick(){
    if(over) return;
    if(pending){
      if(!(pending.x === -dir.x && pending.y === -dir.y)) dir = pending;
      pending = null;
    }
    var h = {x: snake[0].x + dir.x, y: snake[0].y + dir.y}, i;
    if(h.x < 0 || h.y < 0 || h.x >= N || h.y >= N){ gameOver(); return; }
    for(i=0;i<snake.length;i++){ if(snake[i].x === h.x && snake[i].y === h.y){ gameOver(); return; } }
    snake.unshift(h);
    if(h.x === food.x && h.y === food.y){
      score += 10; foods++;
      if(foods % 5 === 0) speed = Math.max(60, speed - 12);
      placeFood();
    } else { snake.pop(); }
    draw(); updateOut();
    timer = setTimeout(tick, speed);
  }
  function gameOver(){
    over = true;
    out.innerHTML = "Game Over! Final score: <b>" + score + "</b> — press Restart to play again.";
  }
  function draw(){
    var i;
    ctx.fillStyle = "#0d1b2a"; ctx.fillRect(0,0,400,400);
    ctx.fillStyle = "#ff4d6d";
    ctx.beginPath(); ctx.arc(food.x*CELL+CELL/2, food.y*CELL+CELL/2, CELL/2-2, 0, Math.PI*2); ctx.fill();
    for(i=snake.length-1;i>=0;i--){
      ctx.fillStyle = i===0 ? "#7CFC00" : "#3ddc84";
      ctx.fillRect(snake[i].x*CELL+1, snake[i].y*CELL+1, CELL-2, CELL-2);
    }
  }
  function onKey(e){
    var d = KEYMAP[e.keyCode];
    if(d){ e.preventDefault(); if(!over) setDir(d); }
  }
  var tx = 0, ty = 0;
  function onTouchStart(e){ var t = e.changedTouches[0]; tx = t.clientX; ty = t.clientY; }
  function onTouchEnd(e){
    var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
    if(over) return;
    if(Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
    e.preventDefault();
    if(Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? "right" : "left");
    else setDir(dy > 0 ? "down" : "up");
  }
  window.addEventListener("keydown", onKey);
  cv.addEventListener("touchstart", onTouchStart, {passive:true});
  cv.addEventListener("touchend", onTouchEnd);
  var pads = box.querySelectorAll('[data-d]');
  for(var i=0;i<pads.length;i++){
    (function(b){ b.onclick = function(){ if(!over) setDir(b.getAttribute("data-d")); }; })(pads[i]);
  }
  el("snk-restart").onclick = function(){ clearTimeout(timer); reset(); timer = setTimeout(tick, speed); };
  reset();
  timer = setTimeout(tick, speed);
  box._cleanup = function(){
    clearTimeout(timer);
    window.removeEventListener("keydown", onKey);
    cv.removeEventListener("touchstart", onTouchStart);
    cv.removeEventListener("touchend", onTouchEnd);
  };
}});

TOOLS.push({ id:"tetris", cat:"fun", icon:"🕹️", name:"Free Tetris Game Online",
desc:"Block-stacking arcade", how:"Move with left/right arrows or buttons, Up or X to rotate, Down for soft drop, Space to hard drop. Clear lines to score and level up.",
render:function(box){
  box.innerHTML = '<h2>🧱 Tetris</h2><div style="display:flex;gap:12px;justify-content:center;align-items:flex-start;flex-wrap:wrap"><canvas id="tet-cv" width="200" height="400" style="background:#0d1b2a;border-radius:8px;touch-action:none"></canvas><div><div style="font-size:12px;margin-bottom:4px">Next</div><canvas id="tet-next" width="80" height="80" style="background:#0d1b2a;border-radius:8px"></canvas><div class="tool-out" id="tet-out"></div></div></div><div style="display:grid;grid-template-columns:repeat(5,52px);gap:6px;justify-content:center;margin-top:10px"><button class="tool-btn" data-k="left">◀</button><button class="tool-btn" data-k="right">▶</button><button class="tool-btn" data-k="down">▼</button><button class="tool-btn" data-k="rot">⟳</button><button class="tool-btn" data-k="drop">⤓</button></div><button class="tool-btn ghost" id="tet-restart" style="margin-top:10px">Restart</button>';
  var COLS = 10, ROWS = 20, S = 20;
  var cv = el("tet-cv"), ctx = cv.getContext("2d"), ncv = el("tet-next"), nctx = ncv.getContext("2d"), out = el("tet-out");
  var PIECES = [
    {c:"#00e5ff", m:[[1,1,1,1]]},
    {c:"#4d7cff", m:[[1,0,0],[1,1,1]]},
    {c:"#ff9f1c", m:[[0,0,1],[1,1,1]]},
    {c:"#ffe14d", m:[[1,1],[1,1]]},
    {c:"#3ddc84", m:[[0,1,1],[1,1,0]]},
    {c:"#b967ff", m:[[0,1,0],[1,1,1]]},
    {c:"#ff4d6d", m:[[1,1,0],[0,1,1]]}
  ];
  var SCORES = [0,100,300,500,800];
  var board, cur, next, score, lines, level, grav, over;
  function newBoard(){
    var b = [], y, x;
    for(y=0;y<ROWS;y++){ var r = []; for(x=0;x<COLS;x++) r.push(0); b.push(r); }
    return b;
  }
  function rotate(m){
    var r = [], x, y;
    for(x=0;x<m[0].length;x++){ r.push([]); for(y=m.length-1;y>=0;y--) r[x].push(m[y][x]); }
    return r;
  }
  function collides(m, px, py){
    var x, y;
    for(y=0;y<m.length;y++) for(x=0;x<m[y].length;x++){
      if(!m[y][x]) continue;
      var bx = px+x, by = py+y;
      if(bx < 0 || bx >= COLS || by >= ROWS) return true;
      if(by >= 0 && board[by][bx]) return true;
    }
    return false;
  }
  function spawn(){
    var p = (next === undefined) ? Math.floor(Math.random()*7) : next;
    next = Math.floor(Math.random()*7);
    cur = { p:p, m:PIECES[p].m.map(function(r){ return r.slice(); }), x:3, y:0 };
    if(collides(cur.m, cur.x, cur.y)){ gameOver(); return false; }
    return true;
  }
  function lock(){
    var x, y;
    for(y=0;y<cur.m.length;y++) for(x=0;x<cur.m[y].length;x++){
      if(cur.m[y][x] && cur.y+y >= 0) board[cur.y+y][cur.x+x] = PIECES[cur.p].c;
    }
    clearLines();
    spawn();
  }
  function clearLines(){
    var y, x, n = 0, full, i;
    for(y=ROWS-1;y>=0;y--){
      full = true;
      for(x=0;x<COLS;x++){ if(!board[y][x]){ full = false; break; } }
      if(full){
        board.splice(y,1);
        var r = []; for(i=0;i<COLS;i++) r.push(0);
        board.unshift(r);
        n++; y++;
      }
    }
    if(n > 0){
      lines += n; score += SCORES[n]*level;
      var nl = Math.floor(lines/10)+1;
      if(nl !== level){ level = nl; setGravity(); }
    }
  }
  function setGravity(){
    if(grav) clearInterval(grav);
    var sp = Math.max(90, 800-(level-1)*70);
    grav = setInterval(function(){ if(!over) step(); }, sp);
  }
  function step(){
    if(!collides(cur.m, cur.x, cur.y+1)) cur.y++;
    else lock();
    draw(); updateOut();
  }
  function softDrop(){
    if(!collides(cur.m, cur.x, cur.y+1)){ cur.y++; score += 1; }
    else lock();
    draw(); updateOut();
  }
  function hardDrop(){
    while(!collides(cur.m, cur.x, cur.y+1)) cur.y++;
    lock(); draw(); updateOut();
  }
  function rotateCur(){
    var r = rotate(cur.m);
    if(!collides(r, cur.x, cur.y)){ cur.m = r; draw(); }
  }
  function move(dx){
    if(!collides(cur.m, cur.x+dx, cur.y)){ cur.x += dx; draw(); }
  }
  function drawMat(c, m, px, py, col){
    var x, y;
    c.fillStyle = col;
    for(y=0;y<m.length;y++) for(x=0;x<m[y].length;x++){
      if(m[y][x]) c.fillRect(px*S+x*S+1, py*S+y*S+1, S-2, S-2);
    }
  }
  function draw(){
    var x, y;
    ctx.fillStyle = "#0d1b2a"; ctx.fillRect(0,0,200,400);
    for(y=0;y<ROWS;y++) for(x=0;x<COLS;x++){
      if(board[y][x]){ ctx.fillStyle = board[y][x]; ctx.fillRect(x*S+1, y*S+1, S-2, S-2); }
    }
    var gy = cur.y;
    while(!collides(cur.m, cur.x, gy+1)) gy++;
    ctx.globalAlpha = 0.25;
    drawMat(ctx, cur.m, cur.x, gy, PIECES[cur.p].c);
    ctx.globalAlpha = 1;
    drawMat(ctx, cur.m, cur.x, cur.y, PIECES[cur.p].c);
    nctx.fillStyle = "#0d1b2a"; nctx.fillRect(0,0,80,80);
    var nm = PIECES[next].m, ox = (80-nm[0].length*S)/2, oy = (80-nm.length*S)/2;
    nctx.fillStyle = PIECES[next].c;
    for(y=0;y<nm.length;y++) for(x=0;x<nm[y].length;x++){
      if(nm[y][x]) nctx.fillRect(ox+x*S+1, oy+y*S+1, S-2, S-2);
    }
  }
  function updateOut(){ out.innerHTML = "Score: <b>" + score + "</b><br>Lines: " + lines + " &nbsp; Level: " + level; }
  function gameOver(){
    over = true;
    draw();
    ctx.fillStyle = "rgba(0,0,0,0.7)"; ctx.fillRect(0,150,200,100);
    ctx.fillStyle = "#fff"; ctx.textAlign = "center";
    ctx.font = "bold 20px sans-serif"; ctx.fillText("GAME OVER", 100, 190);
    ctx.font = "14px sans-serif"; ctx.fillText("Score: " + score, 100, 215);
    updateOut();
  }
  function reset(){
    board = newBoard(); score = 0; lines = 0; level = 1; over = false;
    next = Math.floor(Math.random()*7);
    spawn(); setGravity(); draw(); updateOut();
  }
  function onKey(e){
    if(over) return;
    switch(e.keyCode){
      case 37: move(-1); e.preventDefault(); break;
      case 39: move(1); e.preventDefault(); break;
      case 40: softDrop(); e.preventDefault(); break;
      case 38: case 87: case 88: rotateCur(); e.preventDefault(); break;
      case 32: hardDrop(); e.preventDefault(); break;
    }
  }
  var tx = 0, ty = 0;
  function onTouchStart(e){ var t = e.changedTouches[0]; tx = t.clientX; ty = t.clientY; }
  function onTouchEnd(e){
    var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
    if(over) return;
    e.preventDefault();
    if(Math.abs(dx) < 24 && Math.abs(dy) < 24){ rotateCur(); return; }
    if(Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : -1);
    else if(dy > 0) hardDrop();
    else rotateCur();
  }
  window.addEventListener("keydown", onKey);
  cv.addEventListener("touchstart", onTouchStart, {passive:true});
  cv.addEventListener("touchend", onTouchEnd);
  var btns = box.querySelectorAll('[data-k]');
  for(var i=0;i<btns.length;i++){
    (function(b){
      b.onclick = function(){
        if(over) return;
        var k = b.getAttribute("data-k");
        if(k === "left") move(-1);
        else if(k === "right") move(1);
        else if(k === "down") softDrop();
        else if(k === "rot") rotateCur();
        else if(k === "drop") hardDrop();
      };
    })(btns[i]);
  }
  el("tet-restart").onclick = function(){ reset(); };
  reset();
  box._cleanup = function(){
    if(grav) clearInterval(grav);
    window.removeEventListener("keydown", onKey);
    cv.removeEventListener("touchstart", onTouchStart);
    cv.removeEventListener("touchend", onTouchEnd);
  };
}});

TOOLS.push({ id:"game2048", cat:"fun", icon:"🎮", name:"Free 2048 Puzzle Online",
desc:"Join the numbers", how:"Slide tiles with arrow keys or swipes. Matching tiles merge when they collide. Reach 2048 to win, then chase a higher score.",
render:function(box){
  box.innerHTML = '<h2>🎯 2048 Puzzle</h2><div style="display:flex;gap:16px;justify-content:center;margin-bottom:8px"><div class="tool-out" id="t48-score" style="min-width:110px"></div><div class="tool-out" id="t48-best" style="min-width:110px"></div></div><div id="t48-grid" style="display:grid;grid-template-columns:repeat(4,70px);grid-template-rows:repeat(4,70px);gap:8px;justify-content:center;background:#bbada0;padding:8px;border-radius:8px;touch-action:none;max-width:100%"></div><div class="tool-out" id="t48-msg" style="margin-top:8px;min-height:20px"></div><button class="tool-btn ghost" id="t48-new" style="margin-top:10px">New Game</button>';
  var grid = el("t48-grid"), scoreEl = el("t48-score"), bestEl = el("t48-best"), msgEl = el("t48-msg");
  var cells = [], i;
  for(i=0;i<16;i++){
    var d = document.createElement("div");
    d.style.cssText = "border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:26px;background:#cdc1b4;color:#776e65;user-select:none";
    grid.appendChild(d); cells.push(d);
  }
  var COLORS = {2:"#eee4da",4:"#ede0c8",8:"#f2b179",16:"#f59563",32:"#f67c5f",64:"#f65e3b",128:"#edcf72",256:"#edcc61",512:"#edc850",1024:"#edc53f",2048:"#edc22e",4096:"#3c3a32",8192:"#3c3a32"};
  var bd, score, best = 0, over, won;
  try{ best = parseInt(localStorage.getItem("t48-best") || "0", 10) || 0; }catch(e){}
  function saveBest(){ try{ localStorage.setItem("t48-best", String(best)); }catch(e){} }
  function empty(){
    var r = [], y, x;
    for(y=0;y<4;y++) for(x=0;x<4;x++) if(!bd[y][x]) r.push([y,x]);
    return r;
  }
  function spawnTile(){
    var e = empty();
    if(!e.length) return;
    var c = e[Math.floor(Math.random()*e.length)];
    bd[c[0]][c[1]] = Math.random() < 0.9 ? 2 : 4;
  }
  function newGame(){
    bd = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    score = 0; over = false; won = false;
    spawnTile(); spawnTile(); render();
  }
  function slideRow(row){
    var arr = row.filter(function(v){ return v; });
    var res = [], gained = 0, i;
    for(i=0;i<arr.length;i++){
      if(i+1 < arr.length && arr[i] === arr[i+1]){ var m = arr[i]*2; res.push(m); gained += m; i++; }
      else res.push(arr[i]);
    }
    while(res.length < 4) res.push(0);
    return { row:res, gained:gained };
  }
  function transpose(b){
    var t = [], x, y;
    for(x=0;x<4;x++){ t.push([]); for(y=0;y<4;y++) t[x].push(b[y][x]); }
    return t;
  }
  function revRows(b){
    return b.map(function(r){ return r.slice().reverse(); });
  }
  function same(a, b){
    var y, x;
    for(y=0;y<4;y++) for(x=0;x<4;x++) if(a[y][x] !== b[y][x]) return false;
    return true;
  }
  function applyRows(b){
    var nb = [], gained = 0, y, s;
    for(y=0;y<4;y++){ s = slideRow(b[y]); nb.push(s.row); gained += s.gained; }
    return { board:nb, gained:gained };
  }
  function move(dir){
    if(over) return;
    var res, nb, y;
    if(dir === 0) res = applyRows(bd);
    else if(dir === 2){ var r = applyRows(revRows(bd)); res = { board:revRows(r.board), gained:r.gained }; }
    else if(dir === 1){ var t = applyRows(transpose(bd)); res = { board:transpose(t.board), gained:t.gained }; }
    else { var t2 = applyRows(revRows(transpose(bd))); res = { board:transpose(revRows(t2.board)), gained:t2.gained }; }
    nb = res.board;
    if(!same(bd, nb)){
      bd = nb; score += res.gained;
      spawnTile(); checkWin();
    }
    render();
    if(!canMove() && !over){
      over = true;
      msgEl.innerHTML = "Game over! Final score: <b>" + score + "</b> — press New Game to try again.";
      render();
    }
  }
  function checkWin(){
    if(won) return;
    var y, x;
    for(y=0;y<4;y++) for(x=0;x<4;x++){
      if(bd[y][x] === 2048){
        won = true;
        msgEl.innerHTML = "You made 2048! You win — keep playing or press New Game.";
        return;
      }
    }
  }
  function canMove(){
    var y, x;
    for(y=0;y<4;y++) for(x=0;x<4;x++){
      if(!bd[y][x]) return true;
      if(x < 3 && bd[y][x] === bd[y][x+1]) return true;
      if(y < 3 && bd[y][x] === bd[y+1][x]) return true;
    }
    return false;
  }
  function tileColor(v){ return COLORS[v] || "#3c3a32"; }
  function render(){
    var y, x, v, d;
    for(y=0;y<4;y++) for(x=0;x<4;x++){
      v = bd[y][x]; d = cells[y*4+x];
      d.textContent = v || "";
      d.style.background = v ? tileColor(v) : "#cdc1b4";
      d.style.color = v ? (v <= 4 ? "#776e65" : "#f9f6f2") : "#776e65";
      d.style.fontSize = v >= 1024 ? "17px" : (v >= 128 ? "21px" : "26px");
    }
    scoreEl.innerHTML = "Score<br><b>" + score + "</b>";
    if(score > best){ best = score; saveBest(); }
    bestEl.innerHTML = "Best<br><b>" + best + "</b>";
    if(!over && !won) msgEl.innerHTML = "";
  }
  function onKey(e){
    if(over) return;
    var dir = null;
    if(e.keyCode === 37) dir = 0;
    else if(e.keyCode === 38) dir = 1;
    else if(e.keyCode === 39) dir = 2;
    else if(e.keyCode === 40) dir = 3;
    if(dir !== null){ e.preventDefault(); move(dir); }
  }
  var tx = 0, ty = 0;
  function onTouchStart(e){ var t = e.changedTouches[0]; tx = t.clientX; ty = t.clientY; }
  function onTouchEnd(e){
    var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
    if(over) return;
    if(Math.abs(dx) < 24 && Math.abs(dy) < 24) return;
    e.preventDefault();
    if(Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 2 : 0);
    else move(dy > 0 ? 3 : 1);
  }
  window.addEventListener("keydown", onKey);
  grid.addEventListener("touchstart", onTouchStart, {passive:true});
  grid.addEventListener("touchend", onTouchEnd);
  el("t48-new").onclick = function(){ newGame(); };
  newGame();
  box._cleanup = function(){
    window.removeEventListener("keydown", onKey);
    grid.removeEventListener("touchstart", onTouchStart);
    grid.removeEventListener("touchend", onTouchEnd);
  };
}});

/* US AI Mega Games pack 2B — 6 fun games, ES5 only. */
(function () {
"use strict";

TOOLS.push({ id:"hangman", cat:"fun", icon:"🪢", name:"Free Hangman Game Online",
desc:"Guess the word", how:"Guess letters by tapping A-Z or typing. Six wrong guesses and the game is over.",
render:function(box){
  var WORDS=[
    "PYTHON|Programming language named after a snake","GALAXY|Huge system of stars","PIANO|Musical instrument with keys",
    "ECLIPSE|When the moon blocks the sun","VOLCANO|Mountain that erupts lava","ROCKET|Launches into space",
    "TURTLE|Slow animal with a shell","CASTLE|Home of a king","BICYCLE|Two-wheeled ride","CAMERA|Takes photos",
    "DESERT|Dry sandy land","FOREST|Land full of trees","OCEAN|Vast salty water","MOUNTAIN|Very high land",
    "PLANET|Earth is one","RAINBOW|Colors in the sky after rain","LIGHTNING|Flash in a storm","TORNADO|Spinning wind storm",
    "EARTHQUAKE|Shaking ground","ASTRONAUT|Travels to space","PENGUIN|Bird that cannot fly, loves ice","KANGAROO|Jumps in Australia",
    "ELEPHANT|Largest land animal","GIRAFFE|Animal with the longest neck","CROCODILE|Lives in rivers, big teeth",
    "DOLPHIN|Smart sea animal","SPIDER|Eight legs, makes webs","BUTTERFLY|Flying insect with colorful wings",
    "LIBRARY|Place full of books","DOCTOR|Treats sick people","TEACHER|Works at a school","ENGINEER|Designs machines",
    "CHEF|Cooks food","PAINTER|Uses brushes","PILOT|Flies planes","SOLDIER|Fights for the country",
    "FARMER|Grows crops","PHOTOGRAPHER|Takes pictures for a living","BALLOON|Floats with hot air","LANTERN|Handheld light",
    "COMPASS|Shows north","UMBRELLA|Keeps you dry in rain","TELESCOPE|See far stars","MICROSCOPE|Sees tiny things",
    "ANCHOR|Keeps a ship in place","KEYBOARD|Computer typing device","MOUSE|Computer pointer","SCREEN|Shows computer pictures",
    "BATTERY|Stores power","ROBOT|Machine that works for humans","BRIDGE|Crosses a river","TOWER|Tall building",
    "WINDOW|Lets light inside","DOOR|You open it to enter","ROOF|Top of a house","GARDEN|Grows flowers outside",
    "PARK|Green place to play","ZOO|See wild animals","CIRCUS|Clowns and acrobats","MUSEUM|Old things on display",
    "THEATER|Watch plays here","CINEMA|Watch movies","RESTAURANT|Eat meals out","HOTEL|Sleep away from home",
    "AIRPORT|Planes take off here","HARBOR|Ships park here","SUBMARINE|Travels under the sea","AIRPLANE|Flies in the sky",
    "TRAIN|Runs on rails","SHIP|Sails on water","CAR|Four wheels, drives on road","TRUCK|Carries heavy goods",
    "TAXI|Paid car ride","HELICOPTER|Flies with spinning blades","DRAGON|Mythical fire-breathing beast","TREASURE|Gold and jewels hidden",
    "PIRATE|Sails and steals treasure","KNIGHT|Armored fighter","WIZARD|Casts magic spells","UNICORN|Horse with one horn",
    "MERMAID|Half fish, half woman","SATELLITE|Orbits Earth and sends signals","GARDENER|Cares for plants",
    "LIBRARIAN|Keeps books in order","BACKPACK|Carried on your back","CANDLE|Gives light with a flame",
    "MIRROR|Shows your reflection","PENCIL|Writes and can be erased"
  ];
  var word, hint, guessed, wrong, over;
  box.innerHTML = '<h2>🔤 Hangman</h2><div style="text-align:center"><div id="t-svg"></div><p class="tool-note" id="t-hint" style="font-size:1rem"></p><div id="t-word" style="font-size:2rem;letter-spacing:.4rem;margin:.5rem 0"></div><div id="t-wrong" style="min-height:1.4rem;color:#c0392b"></div><div id="t-keys" style="margin:.5rem 0"></div><div class="tool-out" id="t-out"></div><button class="tool-btn" id="t-new">Play Again</button></div>';
  function svg(n){
    var parts=[
      '<circle cx="160" cy="60" r="20" fill="none" stroke="#222" stroke-width="4"/>',
      '<line x1="160" y1="80" x2="160" y2="140" stroke="#222" stroke-width="4"/>',
      '<line x1="160" y1="95" x2="125" y2="120" stroke="#222" stroke-width="4"/>',
      '<line x1="160" y1="95" x2="195" y2="120" stroke="#222" stroke-width="4"/>',
      '<line x1="160" y1="140" x2="135" y2="180" stroke="#222" stroke-width="4"/>',
      '<line x1="160" y1="140" x2="185" y2="180" stroke="#222" stroke-width="4"/>'];
    return '<svg width="220" height="200" viewBox="0 0 220 200"><line x1="40" y1="195" x2="120" y2="195" stroke="#222" stroke-width="6"/><line x1="80" y1="195" x2="80" y2="20" stroke="#222" stroke-width="6"/><line x1="80" y1="20" x2="160" y2="20" stroke="#222" stroke-width="6"/><line x1="160" y1="20" x2="160" y2="40" stroke="#222" stroke-width="4"/>'+parts.slice(0,n).join("")+'</svg>';
  }
  function draw(){
    el("t-svg").innerHTML=svg(wrong);
    var shown=word.split("").map(function(ch){return guessed.indexOf(ch)!==-1?ch:"_";}).join(" ");
    el("t-word").textContent=shown;
    el("t-wrong").textContent=wrong?"Wrong: "+wrong.join(" ")+"  •  "+(6-wrong.length)+" tries left":"6 tries left";
    el("t-hint").textContent="Hint: "+hint;
  }
  function end(win){
    over=true;
    el("t-out").style.display="block";
    el("t-out").textContent=win?"You win! The word was "+word+".":"Game over! The word was "+word+".";
  }
  function guess(ch){
    if(over||guessed.indexOf(ch)!==-1)return;
    guessed.push(ch);
    if(word.indexOf(ch)===-1){wrong.push(ch);draw();if(wrong.length>=6)end(false);}
    else{draw();var done=word.split("").every(function(c){return guessed.indexOf(c)!==-1;});if(done)end(true);}
  }
  function buildKeys(){
    var h="",i,ch;
    for(i=0;i<26;i++){ch=String.fromCharCode(65+i);h+='<button class="tool-btn ghost" data-k="'+ch+'" style="min-width:2.4rem;margin:.15rem;padding:.4rem">'+ch+'</button>';}
    el("t-keys").innerHTML=h;
    var btns=el("t-keys").querySelectorAll("button");
    for(i=0;i<btns.length;i++){btns[i].onclick=function(){guess(this.getAttribute("data-k"));this.disabled=true;};}
  }
  function keyHandler(e){var k=String.fromCharCode(e.keyCode||e.which);if(k>="A"&&k<="Z")guess(k);}
  function start(){
    var w=WORDS[Math.floor(Math.random()*WORDS.length)].split("|");
    word=w[0];hint=w[1];guessed=[];wrong=[];over=false;
    buildKeys();el("t-out").style.display="none";draw();
  }
  el("t-new").onclick=start;
  document.addEventListener("keydown",keyHandler);
  box._cleanup=function(){document.removeEventListener("keydown",keyHandler);};
  start();
}});

TOOLS.push({ id:"sudoku", cat:"fun", icon:"♟️", name:"Free Sudoku Game Online",
desc:"Generator + solver", how:"Pick a difficulty, fill the grid with the number pad, then Check your answer or let Solve finish it.",
render:function(box){
  var puzzle, sol, givens, sel=-1, iv=null, secs=0, over=false;
  box.innerHTML = '<h2>🔢 Sudoku</h2><div class="row"><div><label>Difficulty</label><select id="t-d"><option value="35">Easy</option><option value="45" selected>Medium</option><option value="52">Hard</option></select></div><div><label>Timer</label><div id="t-timer" style="font-size:1.3rem">0:00</div></div></div><button class="tool-btn" id="t-new">New Puzzle</button><div id="t-grid" style="display:grid;grid-template-columns:repeat(9,2.2rem);gap:0;justify-content:center;margin:.8rem auto;max-width:20rem"></div><div style="text-align:center" id="t-pad"></div><div class="row" style="margin-top:.5rem"><button class="tool-btn" id="t-check">Check</button><button class="tool-btn ghost" id="t-solve">Solve</button></div><div class="tool-out" id="t-out"></div>';
  function shuffled(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
  function fillGrid(g){
    var i,j,n,nums;
    for(i=0;i<81;i++){
      if(g[i]!==0)continue;
      var r=Math.floor(i/9),c=i%9,br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3,used={};
      for(j=0;j<9;j++){used[g[r*9+j]]=1;used[g[j*9+c]]=1;}
      for(j=0;j<3;j++)for(var k=0;k<3;k++)used[g[(br+j)*9+bc+k]]=1;
      nums=shuffled([1,2,3,4,5,6,7,8,9]);
      for(n=0;n<9;n++){if(!used[nums[n]]){g[i]=nums[n];if(fillGrid(g))return true;g[i]=0;}}
      return false;
    }
    return true;
  }
  function countSol(g,limit){
    var i,best=-1,bestOpts=null;
    for(i=0;i<81;i++){
      if(g[i]!==0)continue;
      var r=Math.floor(i/9),c=i%9,br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3,used={},opts=[],n,j,k;
      for(j=0;j<9;j++){used[g[r*9+j]]=1;used[g[j*9+c]]=1;}
      for(j=0;j<3;j++)for(k=0;k<3;k++)used[g[(br+j)*9+bc+k]]=1;
      for(n=1;n<=9;n++)if(!used[n])opts.push(n);
      if(opts.length===0)return 0;
      if(best===-1||opts.length<bestOpts.length){best=i;bestOpts=opts;}
    }
    if(best===-1)return 1;
    var total=0;
    for(i=0;i<bestOpts.length;i++){g[best]=bestOpts[i];total+=countSol(g,limit);g[best]=0;if(total>=limit)return total;}
    return total;
  }
  function gen(remove){
    var g=new Array(81);for(var i=0;i<81;i++)g[i]=0;
    fillGrid(g);sol=g.slice();
    var order=shuffled([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]);
    var removed=0,att=0;
    while(removed<remove&&att<400){
      att++;
      var idx=order[(removed+att)%81];
      if(g[idx]===0)continue;
      var bak=g[idx];g[idx]=0;
      if(countSol(g.slice(),2)===1)removed++;else g[idx]=bak;
    }
    return g;
  }
  function conflicts(g){
    var bad={},i,j,r,c;
    function check(cells){var seen={};for(var k=0;k<cells.length;k++){var v=g[cells[k]];if(v===0)continue;if(seen[v]!==undefined){bad[cells[k]]=1;bad[seen[v]]=1;}else seen[v]=cells[k];}}
    for(r=0;r<9;r++){var row=[];for(c=0;c<9;c++)row.push(r*9+c);check(row);}
    for(c=0;c<9;c++){var col=[];for(r=0;r<9;r++)col.push(r*9+c);check(col);}
    for(var br=0;br<3;br++)for(var bc=0;bc<3;bc++){var bx=[];for(r=0;r<3;r++)for(c=0;c<3;c++)bx.push((br*3+r)*9+bc*3+c);check(bx);}
    return bad;
  }
  function renderGrid(){
    var bad=conflicts(puzzle),h="",i,r,c;
    for(i=0;i<81;i++){
      r=Math.floor(i/9);c=i%9;
      var v=puzzle[i],style="border:1px solid #aaa;width:2.2rem;height:2.2rem;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.1rem;";
      if(c===2||c===5)style+="border-right:2px solid #333;";
      if(r===2||r===5)style+="border-bottom:2px solid #333;";
      if(i===sel)style+="background:#d6eaff;";
      else if(bad[i])style+="background:#ffd6d6;";
      else if(givens[i])style+="background:#f2f2f2;";
      h+='<div data-i="'+i+'" style="'+style+'font-weight:'+(givens[i]?"bold":"normal")+'">'+(v?v:"")+'</div>';
    }
    el("t-grid").innerHTML=h;
    var cells=el("t-grid").querySelectorAll("div");
    for(i=0;i<cells.length;i++){cells[i].onclick=function(){var k=+this.getAttribute("data-i");sel=(sel===k?-1:k);renderGrid();};}
  }
  function buildPad(){
    var h="";
    for(var n=1;n<=9;n++)h+='<button class="tool-btn ghost" data-n="'+n+'" style="min-width:2.4rem;margin:.15rem">'+n+'</button>';
    h+='<button class="tool-btn ghost" data-n="0" style="margin:.15rem">Erase</button>';
    el("t-pad").innerHTML=h;
    var btns=el("t-pad").querySelectorAll("button");
    for(var i=0;i<btns.length;i++){btns[i].onclick=function(){
      if(sel<0||givens[sel]||over)return;
      puzzle[sel]=+this.getAttribute("data-n");renderGrid();
    };}
  }
  function tick(){secs++;var m=Math.floor(secs/60),s=secs%60;el("t-timer").textContent=m+":"+(s<10?"0":"")+s;}
  function newPuzzle(){
    if(iv)clearInterval(iv);secs=0;over=false;sel=-1;
    el("t-out").style.display="none";
    puzzle=gen(+el("t-d").value);
    givens=puzzle.map(function(v){return v!==0;});
    renderGrid();iv=setInterval(tick,1000);
  }
  el("t-new").onclick=newPuzzle;
  el("t-check").onclick=function(){
    var bad=conflicts(puzzle),nb=Object.keys(bad).length,i,empty=false;
    for(i=0;i<81;i++)if(puzzle[i]===0)empty=true;
    el("t-out").style.display="block";
    if(nb===0&&!empty){over=true;clearInterval(iv);el("t-out").textContent="Correct! Solved in "+el("t-timer").textContent+".";}
    else if(nb===0)el("t-out").textContent="No conflicts so far — keep going.";
    else el("t-out").textContent="Found "+nb+" conflicting cells (highlighted red).";
  };
  el("t-solve").onclick=function(){
    var g=puzzle.slice();fillGrid(g);puzzle=g;over=true;clearInterval(iv);renderGrid();
    el("t-out").style.display="block";el("t-out").textContent="Solved by the solver.";
  };
  box._cleanup=function(){if(iv)clearInterval(iv);};
  buildPad();newPuzzle();
}});

TOOLS.push({ id:"reaction", cat:"fun", icon:"👆", name:"Free Reaction Time Test Online",
desc:"Test your reflexes", how:"Click to start, wait for green, then click fast. Five rounds averaged.",
render:function(box){
  var timer=null,state="idle",t0=0,results=[];
  box.innerHTML = '<h2>⚡ Reaction Time Test</h2><div id="t-area" style="border-radius:.5rem;padding:3rem 1rem;text-align:center;font-size:1.6rem;font-weight:bold;cursor:pointer;user-select:none;background:#eee;color:#333">Click to start</div><div class="tool-out" id="t-out" style="display:block"></div><button class="tool-btn ghost" id="t-reset">Reset</button>';
  function show(msg,bg,color){var a=el("t-area");a.textContent=msg;a.style.background=bg;a.style.color=color||"#fff";}
  function summary(){
    var txt="Round "+results.length+"/5 — ";
    if(results.length)txt+="last: "+results[results.length-1]+" ms";
    if(results.length===5){var sum=0,i;for(i=0;i<5;i++)sum+=results[i];txt+="\nAverage of 5: "+Math.round(sum/5)+" ms — best: "+Math.min.apply(null,results)+" ms";}
    el("t-out").textContent=txt;
  }
  function wait(){
    state="wait";show("Wait for green...","#d9534f");
    var delay=1500+Math.random()*2500;
    timer=setTimeout(function(){state="go";t0=performance.now();show("CLICK!","#5cb85c");},delay);
  }
  el("t-area").onclick=function(){
    if(state==="idle"||state==="done"){if(results.length===5)results=[];wait();}
    else if(state==="wait"){clearTimeout(timer);state="idle";show("Too early! That is a foul. Click to retry.","#f0ad4e");}
    else if(state==="go"){
      var ms=Math.round(performance.now()-t0);
      results.push(ms);state="done";
      show(ms+" ms — "+(ms<200?"Lightning!":ms<300?"Great!":ms<450?"Good":"Keep practicing")+" Click for next round.","#337ab7");
      summary();
    }
  };
  el("t-reset").onclick=function(){if(timer)clearTimeout(timer);results=[];state="idle";show("Click to start","#eee","#333");el("t-out").textContent="";};
  box._cleanup=function(){if(timer)clearTimeout(timer);};
}});

TOOLS.push({ id:"quiz-hub", cat:"fun", icon:"🧠", name:"Free Trivia Quiz Hub Online",
desc:"10 questions, score", how:"Pick a category and difficulty, answer 10 questions, then see your score.",
render:function(box){
  var FB=[
    {q:"What is the largest planet in our solar system?",c:"Jupiter",w:["Mars","Saturn","Venus"]},
    {q:"How many continents are there on Earth?",c:"7",w:["5","6","8"]},
    {q:"What does CPU stand for?",c:"Central Processing Unit",w:["Computer Personal Unit","Central Program Utility","Control Processing Unit"]},
    {q:"Which ocean is the largest?",c:"Pacific Ocean",w:["Atlantic Ocean","Indian Ocean","Arctic Ocean"]},
    {q:"In which year did humans first land on the Moon?",c:"1969",w:["1965","1972","1959"]},
    {q:"What is the chemical symbol for water?",c:"H2O",w:["O2","CO2","HO"]},
    {q:"How many players are on a football (soccer) team?",c:"11",w:["9","10","12"]},
    {q:"Which country has the largest population?",c:"India",w:["China","USA","Indonesia"]},
    {q:"What is the hardest natural substance on Earth?",c:"Diamond",w:["Gold","Iron","Quartz"]},
    {q:"Who painted the Mona Lisa?",c:"Leonardo da Vinci",w:["Pablo Picasso","Vincent van Gogh","Michelangelo"]}
  ];
  var qs=[],idx=0,score=0;
  box.innerHTML = '<h2>🧠 Trivia Quiz Hub</h2><div class="row"><div><label>Category</label><select id="t-c"><option value="9">General Knowledge</option><option value="17">Science</option><option value="18">Computers</option><option value="21">Sports</option><option value="22">Geography</option><option value="23">History</option></select></div><div><label>Difficulty</label><select id="t-d"><option value="">Any</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></div></div><button class="tool-btn" id="t-go">Start Quiz</button><div class="tool-out" id="t-out"></div>';
  function decode(s){var t=document.createElement("textarea");t.innerHTML=s;return t.value;}
  function shuffled(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
  function normFB(){return FB.map(function(f){return{q:f.q,c:f.c,opts:shuffled([f.c].concat(f.w))};});}
  function showQ(){
    el("t-out").style.display="block";
    if(idx>=qs.length){
      el("t-out").innerHTML="<h3>Quiz complete!</h3><p style='font-size:1.4rem'>Score: "+score+" / "+qs.length+"</p><p>"+(score===qs.length?"Perfect score!":score>=qs.length*0.7?"Great job!":score>=qs.length*0.4?"Not bad, try again!":"Keep practicing!")+"</p><button class='tool-btn' id='t-again'>Play Again</button>";
      el("t-again").onclick=function(){idx=0;score=0;qs=normFB();showQ();};
      return;
    }
    var q=qs[idx],h="<p><b>Question "+(idx+1)+" of "+qs.length+"</b></p><p style='font-size:1.15rem'>"+esc(q.q)+"</p>";
    for(var i=0;i<q.opts.length;i++)h+="<button class='tool-btn ghost' data-i='"+i+"' style='display:block;width:100%;margin:.3rem 0;text-align:left'>"+esc(q.opts[i])+"</button>";
    el("t-out").innerHTML=h;
    var btns=el("t-out").querySelectorAll("button");
    for(i=0;i<btns.length;i++){btns[i].onclick=function(){
      var picked=q.opts[+this.getAttribute("data-i")],ok=picked===q.c;
      if(ok)score++;
      var msg=ok?"Correct!":"Wrong — the answer was "+q.c+".";
      el("t-out").innerHTML="<p style='font-size:1.15rem'>"+esc(q.q)+"</p><p><b style='color:"+(ok?"green":"red")+"'>"+esc(msg)+"</b></p><p>Score so far: "+score+"/"+(idx+1)+"</p><button class='tool-btn' id='t-next'>"+(idx+1<qs.length?"Next Question":"See Results")+"</button>";
      idx++;el("t-next").onclick=showQ;
    };}
  }
  el("t-go").onclick=function(){
    el("t-out").style.display="block";el("t-out").textContent="Loading questions...";
    var cat=el("t-c").value,dif=el("t-d").value;
    var url="https://opentdb.com/api.php?amount=10&category="+cat+(dif?"&difficulty="+dif:"")+"&type=multiple";
    fetch(url).then(function(r){return r.json();}).then(function(d){
      if(!d.results||!d.results.length)throw new Error("empty");
      qs=d.results.map(function(x){return{q:decode(x.question),c:decode(x.correct_answer),opts:shuffled([decode(x.correct_answer)].concat(x.incorrect_answers.map(decode)))};});
      idx=0;score=0;showQ();
    }).catch(function(){
      qs=normFB();idx=0;score=0;showQ();
      var n=document.createElement("p");n.className="tool-note";n.textContent="Live quiz server unreachable — showing built-in questions instead.";
      el("t-out").appendChild(n);
    });
  };
}});

TOOLS.push({ id:"trivia-facts", cat:"fun", icon:"❓", name:"Free Random Facts Online",
desc:"Did-you-know cards", how:"Press New Fact to reveal a surprising fact. Each one shows once until the deck resets.",
render:function(box){
  var FACTS=[
    ["Honey never spoils; archaeologists found edible honey in ancient Egyptian tombs.","Food"],
    ["A strand of spider silk is stronger than steel of the same thickness.","Science"],
    ["Octopuses have three hearts and blue blood.","Animals"],
    ["Bananas are berries, but strawberries are not.","Food"],
    ["The Eiffel Tower grows about 15 cm taller in summer from heat expansion.","World"],
    ["There are more stars in the universe than grains of sand on all Earth beaches.","Space"],
    ["Sound travels about four times faster in water than in air.","Science"],
    ["A day on Venus is longer than a year on Venus.","Space"],
    ["Humans share about 60 percent of their DNA with bananas.","Science"],
    ["The first oranges were green and came from Southeast Asia.","Food"],
    ["Wombat poop is cube shaped.","Animals"],
    ["Antarctica is the largest desert in the world.","World"],
    ["The heart of a blue whale is the size of a small car.","Animals"],
    ["Cleopatra lived closer in time to the Moon landing than to the pyramids.","History"],
    ["Honeybees can recognize human faces.","Animals"],
    ["The dot over the letters i and j is called a tittle.","Language"],
    ["There are more ways to shuffle a deck of cards than atoms on Earth.","Math"],
    ["Saturn would float in water because its average density is lower.","Space"],
    ["A group of flamingos is called a flamboyance.","Animals"],
    ["The shortest war in history lasted about 38 minutes.","History"],
    ["Your bones are wet; they are about 31 percent water.","Body"],
    ["Laughter boosts the immune system and lowers stress.","Health"],
    ["Parts of the Great Wall of China are held together by sticky rice mortar.","History"],
    ["Dolphins have names for each other.","Animals"],
    ["A giant space water reservoir holds 140 trillion times Earth ocean water.","Space"],
    ["Hot water can freeze faster than cold water, called the Mpemba effect.","Science"],
    ["The inventor of the Pringles can is buried in one.","Fun"],
    ["Cats cannot taste sweetness.","Animals"],
    ["The human brain generates about 20 watts of electrical power.","Body"],
    ["The national animal of Scotland is the unicorn.","World"],
    ["A bolt of lightning is five times hotter than the surface of the sun.","Science"],
    ["Sea otters hold hands while sleeping so they do not drift apart.","Animals"],
    ["The first computer programmer was Ada Lovelace, in the 1840s.","Tech"],
    ["A pineapple takes about two years to grow one fruit.","Food"],
    ["The Moon drifts away from Earth about 3.8 cm per year.","Space"],
    ["Your nose can remember 50,000 different scents.","Body"],
    ["The word robot comes from the Czech word for forced labor.","Tech"],
    ["Giraffes sleep only about 30 minutes a day.","Animals"],
    ["The Amazon rainforest produces about 6 percent of the world oxygen.","World"],
    ["One lightning bolt holds enough energy to toast 100,000 slices of bread.","Science"],
    ["Elephants are the only animals that cannot jump.","Animals"],
    ["The first email was sent in 1971.","Tech"],
    ["Cows have best friends and get stressed when separated.","Animals"],
    ["The human eye can distinguish about 10 million colors.","Body"],
    ["Mount Everest grows about 4 mm every year.","World"],
    ["There are more possible chess games than atoms in the observable universe.","Math"],
    ["Koalas have fingerprints almost identical to humans.","Animals"],
    ["Glass is made from sand.","Science"],
    ["Venus spins backwards compared to most planets.","Space"],
    ["A jiffy is a real unit of time, about 1/100 of a second.","Science"],
    ["The longest hiccuping spree lasted 68 years.","Fun"],
    ["Sharks existed before trees.","Animals"],
    ["LEGO bricks from 1958 still fit modern bricks.","Fun"],
    ["Your stomach gets a new lining every few days.","Body"],
    ["The Sahara was once a lush green landscape.","History"],
    ["A single cloud can weigh over a million pounds.","Science"],
    ["The first webcam watched a coffee pot at Cambridge.","Tech"],
    ["Butterflies taste with their feet.","Animals"],
    ["There is a lake in Australia that turns pink.","World"],
    ["The human body has enough iron to make a small nail.","Body"]
  ];
  var deck=[];
  box.innerHTML = '<h2>💡 Random Facts</h2><div class="tool-out" id="t-out" style="display:block"></div><button class="tool-btn" id="t-go">New Fact</button><p class="tool-note" id="t-count"></p>';
  function refill(){
    deck=[];
    for(var i=0;i<FACTS.length;i++)deck.push(i);
    for(i=deck.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=deck[i];deck[i]=deck[j];deck[j]=t;}
  }
  function next(){
    if(deck.length===0)refill();
    var f=FACTS[deck.pop()];
    el("t-out").innerHTML="<span style='display:inline-block;background:#eee;border-radius:.4rem;padding:.15rem .6rem;font-size:.85rem;margin-bottom:.4rem'>"+esc(f[1])+"</span><p style='font-size:1.15rem'>"+esc(f[0])+"</p>";
    el("t-count").textContent=deck.length+" more facts before the deck resets.";
  }
  el("t-go").onclick=next;
  next();
}});

TOOLS.push({ id:"music-gen", cat:"fun", icon:"🎵", name:"Free Music Generator Online",
desc:"Procedural melodies", how:"Pick a key, scale, tempo and length, then press Generate and Play to hear your melody.",
render:function(box){
  var ctx=null,timers=[],playing=false;
  box.innerHTML = '<h2>🎵 Music Generator</h2><div class="row"><div><label>Key</label><select id="t-k"><option value="261.63">C</option><option value="196.00">G</option><option value="293.66">D</option><option value="220.00">A</option><option value="174.61">F</option></select></div><div><label>Scale</label><select id="t-s"><option value="0,2,4,5,7,9,11">Major</option><option value="0,2,3,5,7,8,10">Minor</option><option value="0,2,4,7,9">Pentatonic</option></select></div></div><div class="row"><div><label>Tempo (BPM): <span id="t-tv">120</span></label><input type="range" id="t-t" min="60" max="180" value="120"></div><div><label>Length</label><select id="t-l"><option value="16">16 notes</option><option value="32" selected>32 notes</option><option value="64">64 notes</option></select></div></div><div class="row"><button class="tool-btn" id="t-gen">Generate</button><button class="tool-btn ghost" id="t-play" style="display:none">Play</button><button class="tool-btn ghost" id="t-stop" style="display:none">Stop</button></div><div class="tool-out" id="t-out"></div><p class="tool-note">Melodies are procedurally generated with WebAudio — not AI-composed.</p>';
  el("t-t").oninput=function(){el("t-tv").textContent=el("t-t").value;};
  var melody=[],bass=[];
  el("t-gen").onclick=function(){
    stop();
    var ivs=el("t-s").value.split(",").map(function(x){return +x;});
    var n=+el("t-l").value,pos=Math.floor(ivs.length/2),i;
    melody=[];bass=[];
    for(i=0;i<n;i++){
      var move=Math.floor(Math.random()*5)-2;
      pos=Math.max(0,Math.min(ivs.length*2-1,pos+move));
      melody.push(Math.random()<0.12?-1:ivs[pos%ivs.length]+12*Math.floor(pos/ivs.length));
    }
    for(i=0;i<Math.ceil(n/4);i++)bass.push(i%2===0?0:7);
    el("t-play").style.display="";el("t-stop").style.display="";
    el("t-out").style.display="block";
    el("t-out").textContent="Melody ready: "+n+" notes in "+el("t-s").options[el("t-s").selectedIndex].text+" scale. Press Play.";
  };
  function freq(semi,root){return root*Math.pow(2,semi/12);}
  function note(f,at,dur,type,vol){
    var o=ctx.createOscillator(),g=ctx.createGain();
    o.type=type;o.frequency.value=f;
    g.gain.setValueAtTime(0.0001,at);
    g.gain.linearRampToValueAtTime(vol,at+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,at+dur);
    o.connect(g);g.connect(ctx.destination);
    o.start(at);o.stop(at+dur+0.05);
  }
  function play(){
    stop();
    ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();
    if(ctx.state==="suspended")ctx.resume();
    playing=true;
    var root=+el("t-k").value,bpm=+el("t-t").value,beat=60/bpm,t=ctx.currentTime+0.1,i;
    for(i=0;i<melody.length;i++){
      (function(i){
        var s=melody[i],at=t+i*beat*0.5;
        timers.push(setTimeout(function(){
          if(s>=0)note(freq(s+12,root),ctx.currentTime,beat*0.5,"triangle",0.35);
        },(at-ctx.currentTime)*1000));
      })(i);
    }
    for(i=0;i<bass.length;i++){
      (function(i){
        var at=t+i*beat*2;
        timers.push(setTimeout(function(){note(freq(bass[i],root/2),ctx.currentTime,beat*1.8,"sine",0.3);},(at-ctx.currentTime)*1000));
      })(i);
    }
    var total=(melody.length*beat*0.5+1)*1000;
    timers.push(setTimeout(function(){playing=false;},total));
  }
  function stop(){
    var i;
    for(i=0;i<timers.length;i++)clearTimeout(timers[i]);
    timers=[];playing=false;
    if(ctx){try{ctx.close();}catch(e){}ctx=null;}
  }
  el("t-play").onclick=play;
  el("t-stop").onclick=stop;
  box._cleanup=stop;
}});

})();

TOOLS.push({ id:"bsa", cat:"health", icon:"🧍", name:"Free BSA Calculator Online",
desc:"Body surface area",
how:"Enter your height in cm and weight in kg, then press Calculate to get your body surface area in square meters.",
render:function(box){
  box.innerHTML = '<h2>🧍 BSA Calculator</h2><div class="row"><div><label>Height (cm)</label><input type="number" id="t-h" placeholder="170"></div><div><label>Weight (kg)</label><input type="number" id="t-w" placeholder="65"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">BSA (Mosteller) is used for medicine dosing, cardiac index and dialysis measures. General guide only — not medical advice.</p>';
  el("t-go").onclick=function(){
    var h=+el("t-h").value, w=+el("t-w").value;
    if(!h||!w){ outHTML(box,"Enter height and weight."); return; }
    var b=Math.sqrt(h*w/3600);
    outHTML(box,"BSA (Mosteller): "+b.toFixed(2)+" m²\nAverage adult: about 1.6–1.9 m²");
  };
}});

TOOLS.push({ id:"ovulation", cat:"health", icon:"🌸", name:"Free Ovulation Calculator Online",
desc:"Fertile window finder",
how:"Pick the first day of your last period and your average cycle length, then press Calculate to see your fertile window.",
render:function(box){
  box.innerHTML = '<h2>🌸 Ovulation Calculator</h2><label>First day of last period</label><input type="date" id="t-d"><label>Average cycle length (days)</label><input type="number" id="t-c" value="28" min="21" max="45"><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">Estimate only — cycles vary month to month. Not medical advice.</p>';
  el("t-go").onclick=function(){
    var d=new Date(el("t-d").value+"T00:00:00");
    if(isNaN(d)){ outHTML(box,"Pick a date."); return; }
    var c=Math.min(45,Math.max(21,+el("t-c").value||28));
    function f(x){ return x.toLocaleDateString("en-US",{weekday:"short",day:"numeric",month:"short",year:"numeric"}); }
    var ov=new Date(d.getTime()+(c-14)*86400000);
    var fs=new Date(ov.getTime()-5*86400000), fe=new Date(ov.getTime()+86400000);
    var nx=new Date(d.getTime()+c*86400000);
    outHTML(box,"Estimated ovulation: "+f(ov)+"\nFertile window: "+f(fs)+" → "+f(fe)+"\nNext period: "+f(nx));
  };
}});

TOOLS.push({ id:"firstaid", cat:"health", icon:"⛑️", name:"Free First Aid Guide Online",
desc:"Emergency basics",
how:"Pick an emergency topic and press Show Steps for clear first-aid basics. Always call emergency services first in a real emergency.",
render:function(box){
  var FA={
    "Severe bleeding":["Call emergency services immediately.","Put on gloves if available.","Press firmly on the wound with a clean cloth or bandage.","Do NOT remove the cloth — add more layers on top.","Raise the injured area above heart level if possible.","Keep the person still and warm until help arrives."],
    "Burns":["Call emergency services for large, deep, or face burns.","Cool the burn under cool (not ice-cold) running water for 20 minutes.","Remove rings, watches, or tight clothing near the burn.","Cover loosely with cling film or a clean non-fluffy cloth.","Do NOT pop blisters or apply butter, oil, or toothpaste.","Give water and keep the person comfortable."],
    "Choking":["Ask: Are you choking? If they can cough, encourage coughing.","If they cannot breathe or speak, call emergency services.","Give up to 5 sharp back blows between the shoulder blades.","If still blocked, give up to 5 abdominal thrusts.","Repeat back blows and thrusts until the object comes out.","If the person collapses, start CPR."],
    "CPR basics":["Call emergency services first, or send someone to call.","Place the person on their back on a firm surface.","Push hard and fast in the center of the chest: 100–120 per minute.","Let the chest fully rise between pushes.","Continue without stopping until help arrives.","If trained, add rescue breaths: 30 pushes to 2 breaths."],
    "Fracture/sprain":["Call emergency services for deformed or open fractures.","Keep the injured limb still — do NOT straighten it.","Apply ice wrapped in cloth for 15–20 minutes.","For sprains use RICE: rest, ice, compression, elevation.","Remove tight rings or watches before swelling grows.","Seek medical care — do not walk on a suspected fracture."],
    "Nosebleed":["Sit upright and lean slightly forward.","Pinch the soft part of the nose firmly.","Hold for 15 minutes without checking.","Spit out blood — do not swallow it.","Press a cold cloth on the bridge of the nose.","If bleeding lasts over 20–30 minutes, seek medical care."]
  };
  var opts="";
  for(var k in FA){ opts+='<option>'+k+'</option>'; }
  box.innerHTML = '<h2>⛑️ First Aid Guide</h2><p class="tool-note"><b>⚠️ Call emergency services FIRST in any emergency. This is basic information, not a substitute for professional first-aid training.</b></p><label>Emergency topic</label><select id="t-t">'+opts+'</select><button class="tool-btn" id="t-go">Show Steps</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var steps=FA[el("t-t").value], h="";
    for(var i=0;i<steps.length;i++){ h+="<b>"+(i+1)+".</b> "+steps[i]+"<br>"; }
    outHTML(box,h);
  };
  el("t-go").onclick();
}});

TOOLS.push({ id:"bp-log", cat:"health", icon:"🩺", name:"Free BP & Sugar Log Online",
desc:"Track readings",
how:"Pick the date and reading type, enter your blood pressure or blood sugar numbers, then press Save Reading. Your log is stored on this device.",
render:function(box){
  box.innerHTML = '<h2>🩺 BP & Sugar Log</h2><label>Date</label><input type="date" id="t-d"><label>Reading type</label><select id="t-t"><option value="bp">Blood pressure</option><option value="sugar">Blood sugar</option></select><div id="t-bpf"><div class="row"><div><label>Systolic</label><input type="number" id="t-s" placeholder="120"></div><div><label>Diastolic</label><input type="number" id="t-d2" placeholder="80"></div><div><label>Pulse</label><input type="number" id="t-p" placeholder="72"></div></div></div><div id="t-sgf" style="display:none"><div class="row"><div><label>Glucose (mg/dL)</label><input type="number" id="t-v" placeholder="95"></div><div><label>When</label><select id="t-m"><option value="fasting">Fasting</option><option value="after">After meal</option></select></div></div></div><button class="tool-btn" id="t-save">Save Reading</button><div class="tool-out" id="t-out"></div><p class="tool-note">Flags use basic ranges only. Not medical advice — ask your doctor.</p>';
  el("t-d").value=new Date().toISOString().slice(0,10);
  el("t-t").onchange=function(){
    var bp=el("t-t").value==="bp";
    el("t-bpf").style.display=bp?"":"none";
    el("t-sgf").style.display=bp?"none":"";
  };
  function get(){ try{return JSON.parse(localStorage.getItem("sawalai_bplog"))||[];}catch(e){return[];} }
  function set(a){ localStorage.setItem("sawalai_bplog",JSON.stringify(a)); }
  function flag(r){
    if(r.type==="BP"){ var s=+r.s,d=+r.d; if(s<120&&d<80) return "Normal ✅"; if(s<130&&d<80) return "Elevated ⚠️"; return "High 🔴"; }
    var v=+r.v;
    if(r.mode==="fasting"){ if(v<100) return "Normal ✅"; if(v<126) return "Elevated ⚠️"; return "High 🔴"; }
    if(v<140) return "Normal ✅"; if(v<200) return "Elevated ⚠️"; return "High 🔴";
  }
  function list(){
    var a=get();
    if(!a.length){ outHTML(box,"No readings saved yet."); return; }
    var h='<div style="overflow-x:auto"><table style="width:100%;font-size:.85rem;border-collapse:collapse"><tr><th style="text-align:left">Date</th><th style="text-align:left">Reading</th><th style="text-align:left">Flag</th><th></th></tr>';
    for(var i=a.length-1;i>=0;i--){
      var r=a[i], det=r.type==="BP"?(r.s+"/"+r.d+(r.p?" · "+r.p+" bpm":"")):(r.v+" mg/dL ("+r.mode+")");
      h+='<tr><td>'+esc(r.date)+'</td><td>'+esc(det)+'</td><td>'+flag(r)+'</td><td><button class="tool-btn ghost" data-id="'+r.id+'" style="padding:2px 8px">✖</button></td></tr>';
    }
    h+='</table></div>';
    outHTML(box,h);
    var btns=box.querySelectorAll("[data-id]");
    for(var j=0;j<btns.length;j++){ (function(b){ b.onclick=function(){ var id=b.getAttribute("data-id"); set(get().filter(function(x){return String(x.id)!==id;})); list(); }; })(btns[j]); }
  }
  el("t-save").onclick=function(){
    var a=get(), t=el("t-t").value, d=el("t-d").value||new Date().toISOString().slice(0,10);
    var r={id:Date.now(),date:d,type:t==="bp"?"BP":"Sugar"};
    if(t==="bp"){ r.s=el("t-s").value; r.d=el("t-d2").value; r.p=el("t-p").value; if(!r.s||!r.d){ outHTML(box,"Enter systolic and diastolic."); return; } }
    else{ r.v=el("t-v").value; r.mode=el("t-m").value; if(!r.v){ outHTML(box,"Enter the glucose value."); return; } }
    a.push(r); set(a); list();
    el("t-s").value=""; el("t-d2").value=""; el("t-p").value=""; el("t-v").value="";
  };
  list();
}});

TOOLS.push({ id:"workout", cat:"health", icon:"💪", name:"Free Workout Planner Online",
desc:"Weekly plan builder",
how:"Pick a day, enter the exercise name, sets and reps, then press Add. Tick exercises done as you train; the plan stays on this device.",
render:function(box){
  var DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  box.innerHTML = '<h2>💪 Workout Planner</h2><div class="row"><div><label>Day</label><select id="t-day"><option>Mon</option><option>Tue</option><option>Wed</option><option>Thu</option><option>Fri</option><option>Sat</option><option>Sun</option></select></div><div><label>Exercise</label><input type="text" id="t-e" placeholder="Push-ups"></div><div><label>Sets</label><input type="number" id="t-s" value="3" min="1"></div><div><label>Reps</label><input type="number" id="t-r" value="12" min="1"></div></div><button class="tool-btn" id="t-add">Add Exercise</button> <button class="tool-btn ghost" id="t-clear">Clear Week</button><div class="tool-out" id="t-out"></div>';
  function get(){ try{return JSON.parse(localStorage.getItem("sawalai_workout"))||{};}catch(e){return{};} }
  function set(p){ localStorage.setItem("sawalai_workout",JSON.stringify(p)); }
  function list(){
    var p=get(), h="";
    for(var i=0;i<DAYS.length;i++){
      var items=p[DAYS[i]]||[];
      h+='<div style="margin:8px 0;padding:8px;border:1px solid #334155;border-radius:8px"><b>'+DAYS[i]+'</b>';
      if(!items.length){ h+=' <span style="opacity:.6;font-size:.85rem">— rest</span>'; }
      for(var j=0;j<items.length;j++){
        var it=items[j], st=it.done?'text-decoration:line-through;opacity:.6':'';
        h+='<div style="'+st+'"><label style="display:flex;gap:6px;align-items:center;font-weight:normal"><input type="checkbox" data-day="'+DAYS[i]+'" data-i="'+j+'"'+(it.done?' checked':'')+'> '+esc(it.e)+' — '+esc(String(it.s))+'×'+esc(String(it.r))+'</label></div>';
      }
      h+='</div>';
    }
    outHTML(box,h);
    var cbs=box.querySelectorAll('input[type="checkbox"]');
    for(var k=0;k<cbs.length;k++){ (function(c){ c.onchange=function(){ var p2=get(), it=p2[c.getAttribute("data-day")][+c.getAttribute("data-i")]; it.done=c.checked; set(p2); list(); }; })(cbs[k]); }
  }
  el("t-add").onclick=function(){
    var e=el("t-e").value.trim(); if(!e){ outHTML(box,"Enter an exercise name."); return; }
    var p=get(), d=el("t-day").value;
    if(!p[d]) p[d]=[];
    p[d].push({e:e,s:el("t-s").value||"3",r:el("t-r").value||"12",done:false});
    set(p); el("t-e").value=""; list();
  };
  el("t-clear").onclick=function(){ set({}); list(); };
  list();
}});

TOOLS.push({ id:"periodic", cat:"learn", icon:"⚗️", name:"Free Periodic Table Online",
desc:"Elements reference",
how:"Tap any element tile to see its atomic number, symbol, atomic mass and group. Tiles are colored by element group.",
render:function(box){
  var E=[[1,"H","Hydrogen",1.008,"nonmetal"],[2,"He","Helium",4.003,"noble"],[3,"Li","Lithium",6.94,"alkali"],[4,"Be","Beryllium",9.012,"alkaline"],[5,"B","Boron",10.81,"metalloid"],[6,"C","Carbon",12.011,"nonmetal"],[7,"N","Nitrogen",14.007,"nonmetal"],[8,"O","Oxygen",15.999,"nonmetal"],[9,"F","Fluorine",18.998,"halogen"],[10,"Ne","Neon",20.18,"noble"],[11,"Na","Sodium",22.99,"alkali"],[12,"Mg","Magnesium",24.305,"alkaline"],[13,"Al","Aluminium",26.982,"post"],[14,"Si","Silicon",28.085,"metalloid"],[15,"P","Phosphorus",30.974,"nonmetal"],[16,"S","Sulfur",32.06,"nonmetal"],[17,"Cl","Chlorine",35.45,"halogen"],[18,"Ar","Argon",39.948,"noble"],[19,"K","Potassium",39.098,"alkali"],[20,"Ca","Calcium",40.078,"alkaline"],[21,"Sc","Scandium",44.956,"transition"],[22,"Ti","Titanium",47.867,"transition"],[23,"V","Vanadium",50.942,"transition"],[24,"Cr","Chromium",51.996,"transition"],[25,"Mn","Manganese",54.938,"transition"],[26,"Fe","Iron",55.845,"transition"],[27,"Co","Cobalt",58.933,"transition"],[28,"Ni","Nickel",58.693,"transition"],[29,"Cu","Copper",63.546,"transition"],[30,"Zn","Zinc",65.38,"transition"],[31,"Ga","Gallium",69.723,"post"],[32,"Ge","Germanium",72.63,"metalloid"],[33,"As","Arsenic",74.922,"metalloid"],[34,"Br","Bromine",79.904,"halogen"],[35,"Kr","Krypton",83.798,"noble"],[36,"Ag","Silver",107.87,"transition"],[37,"Sn","Tin",118.71,"post"],[38,"I","Iodine",126.9,"halogen"],[39,"Xe","Xenon",131.29,"noble"],[40,"Au","Gold",196.97,"transition"],[41,"Hg","Mercury",200.59,"transition"],[42,"Pb","Lead",207.2,"post"]];
  var GC={nonmetal:"#3b82f6",noble:"#a855f7",alkali:"#ef4444",alkaline:"#f97316",metalloid:"#14b8a6",halogen:"#22c55e",transition:"#64748b",post:"#eab308"};
  var GN={nonmetal:"Nonmetal",noble:"Noble gas",alkali:"Alkali metal",alkaline:"Alkaline earth metal",metalloid:"Metalloid",halogen:"Halogen",transition:"Transition metal",post:"Post-transition metal"};
  var tiles="";
  for(var i=0;i<E.length;i++){
    tiles+='<span data-i="'+i+'" style="width:48px;height:48px;background:'+GC[E[i][4]]+';border-radius:6px;display:inline-flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;color:#fff;margin:2px"><b style="font-size:.9rem">'+E[i][1]+'</b><small style="font-size:9px">'+E[i][0]+'</small></span>';
  }
  box.innerHTML = '<h2>⚗️ Periodic Table</h2><div id="t-ptab" style="margin-bottom:10px">'+tiles+'</div><div class="tool-out" id="t-out"></div>';
  outHTML(box,"Tap an element to see details.");
  var ts=box.querySelectorAll("span[data-i]");
  for(var j=0;j<ts.length;j++){ (function(t){ t.onclick=function(){ var e=E[+t.getAttribute("data-i")]; outHTML(box,"<b>"+e[0]+". "+e[2]+" ("+e[1]+")</b><br>Atomic mass: "+e[3]+"<br>Group: "+GN[e[4]]); }; })(ts[j]); }
}});

TOOLS.push({ id:"math-trainer", cat:"learn", icon:"➕", name:"Free Math Trainer Online",
desc:"Mental arithmetic game",
how:"Pick a difficulty and press Start Round. Answer 10 questions — your score, time and grade appear at the end.",
render:function(box){
  box.innerHTML = '<h2>➕ Math Trainer</h2><label>Difficulty</label><select id="t-d"><option value="easy">Easy (+ / −)</option><option value="medium">Medium (× / ÷)</option><option value="hard">Hard (mixed)</option></select><button class="tool-btn" id="t-start">Start Round</button><div class="tool-out" id="t-out"></div>';
  function rnd(a,b){ return a+Math.floor(Math.random()*(b-a+1)); }
  el("t-start").onclick=function(){
    var diff=el("t-d").value, qs=[];
    for(var i=0;i<10;i++){
      var a,b,q,ans;
      if(diff==="easy"){ a=rnd(2,50); b=rnd(2,50); if(Math.random()<0.5){q=a+" + "+b;ans=a+b;} else { if(b>a){var t=a;a=b;b=t;} q=a+" − "+b;ans=a-b; } }
      else if(diff==="medium"){ if(Math.random()<0.5){a=rnd(2,12);b=rnd(2,12);q=a+" × "+b;ans=a*b;} else {b=rnd(2,12);ans=rnd(2,12);a=b*ans;q=a+" ÷ "+b;} }
      else { var k=rnd(0,3); if(k===0){a=rnd(10,99);b=rnd(10,99);q=a+" + "+b;ans=a+b;} else if(k===1){a=rnd(20,99);b=rnd(2,19);q=a+" − "+b;ans=a-b;} else if(k===2){a=rnd(3,15);b=rnd(3,15);q=a+" × "+b;ans=a*b;} else {b=rnd(2,12);ans=rnd(2,12);a=b*ans;q=a+" ÷ "+b;} }
      qs.push({q:q,a:ans});
    }
    var idx=0, score=0, t0=Date.now();
    function show(){
      if(idx>=qs.length){
        var secs=Math.round((Date.now()-t0)/1000);
        var g=score===10?"A+ 🏆":score>=9?"A":score>=8?"B":score>=7?"C":score>=6?"D":"Keep practicing 💪";
        outHTML(box,"<b>Round over!</b><br>Score: "+score+" / 10<br>Time: "+secs+" seconds<br>Grade: <b>"+g+"</b><br><br><button class=\"tool-btn\" id=\"t-again\">New Round</button>");
        el("t-again").onclick=function(){ el("t-start").onclick(); };
        return;
      }
      outHTML(box,"<b>Question "+(idx+1)+" / 10</b> &nbsp; Score: "+score+"<br><div style=\"font-size:1.6rem;margin:12px 0\">"+qs[idx].q+" = ?</div><input type=\"number\" id=\"t-a\" placeholder=\"Your answer\" style=\"max-width:200px\"><br><button class=\"tool-btn\" id=\"t-check\">Check</button> <span id=\"t-fb\"></span>");
      var inp=el("t-a"); inp.focus();
      inp.onkeydown=function(e){ if(e.key==="Enter"){ el("t-check").onclick(); } };
      el("t-check").onclick=function(){
        var v=+inp.value, ok=v===qs[idx].a;
        if(ok){ score++; }
        el("t-fb").innerHTML=ok?" ✅ Correct!":" ❌ It was "+qs[idx].a;
        el("t-check").disabled=true; idx++;
        setTimeout(show,900);
      };
    }
    show();
  };
}});

TOOLS.push({ id:"spelling", cat:"learn", icon:"🐝", name:"Free Spelling Bee Online",
desc:"Hear and spell",
how:"Press Hear Word to listen, type the spelling, then press Check. Press Next Word for a new one and watch your score grow.",
render:function(box){
  var W=["apple","banana","house","water","school","friend","happy","music","garden","window","bridge","cloud","dance","eagle","forest","guitar","horse","island","jungle","kitchen","lemon","mountain","night","ocean","piano","queen","river","sunset","tiger","umbrella","village","whale","yellow","zebra","adventure","bicycle","castle","diamond","energy","flower"];
  var word="", correct=0, total=0, said=false;
  box.innerHTML = '<h2>🐝 Spelling Bee</h2><div id="t-score" style="margin-bottom:8px">Score: 0 / 0</div><button class="tool-btn" id="t-hear">🔊 Hear Word</button> <button class="tool-btn ghost" id="t-next">Next Word</button><br><br><label>Type the spelling</label><input type="text" id="t-w" placeholder="Type the word you hear…"><button class="tool-btn" id="t-check">Check</button><div class="tool-out" id="t-out"></div>';
  function diff(w){ return w.length<5?"Easy":w.length<=7?"Medium":"Hard"; }
  function speak(w){
    if(!("speechSynthesis" in window)){ outHTML(box,"Speech is not supported in this browser."); return; }
    window.speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(w); u.lang="en-US"; u.rate=0.8;
    window.speechSynthesis.speak(u);
  }
  function newWord(){
    word=W[Math.floor(Math.random()*W.length)]; said=false; el("t-w").value="";
    outHTML(box,"Difficulty: "+diff(word)+"<br>Press Hear Word, then spell it.");
  }
  el("t-hear").onclick=function(){ if(!word) newWord(); said=true; speak(word); };
  el("t-next").onclick=function(){ newWord(); };
  el("t-check").onclick=function(){
    if(!word){ newWord(); return; }
    if(!said){ outHTML(box,"Press Hear Word first!"); return; }
    var v=el("t-w").value.trim().toLowerCase(); total++;
    if(v===word){ correct++; outHTML(box,"✅ Correct! The word was <b>"+esc(word)+"</b>."); }
    else{ outHTML(box,"❌ Not quite — the word was <b>"+esc(word)+"</b>. You typed: "+esc(v||"(nothing)")); }
    el("t-score").textContent="Score: "+correct+" / "+total;
  };
  newWord();
}});

TOOLS.push({ id:"flashcards", cat:"learn", icon:"🃏", name:"Free Flashcard Maker Online",
desc:"Study Q&A cards",
how:"Add question and answer pairs, then press Study Mode. Click a card to flip it, and use Next, Previous or Shuffle.",
render:function(box){
  box.innerHTML = '<h2>🃏 Flashcard Maker</h2><label>Question</label><input type="text" id="t-q" placeholder="e.g. Capital of Japan?"><label>Answer</label><input type="text" id="t-a" placeholder="e.g. Tokyo"><button class="tool-btn" id="t-add">Add Card</button> <button class="tool-btn ghost" id="t-study">Study Mode</button> <button class="tool-btn ghost" id="t-manage">My Cards</button><div class="tool-out" id="t-out"></div>';
  function get(){ try{return JSON.parse(localStorage.getItem("sawalai_flashcards"))||[];}catch(e){return[];} }
  function set(c){ localStorage.setItem("sawalai_flashcards",JSON.stringify(c)); }
  var order=[], idx=0, flipped=false;
  function showCard(){
    var cards=get();
    if(!order.length){ outHTML(box,"No cards yet — add some first!"); return; }
    var c=cards[order[idx]];
    outHTML(box,"<div style=\"font-size:.85rem;opacity:.7\">Card "+(idx+1)+" of "+order.length+"</div><div id=\"t-card\" style=\"border:2px solid #818cf8;border-radius:12px;padding:40px 20px;margin:10px 0;cursor:pointer;text-align:center;font-size:1.2rem;min-height:120px\">"+esc(flipped?c.a:c.q)+"</div><div style=\"opacity:.7;font-size:.85rem\">"+(flipped?"Answer — click to see question":"Question — click to see answer")+"</div><br><button class=\"tool-btn ghost\" id=\"t-prev\">◀ Prev</button> <button class=\"tool-btn ghost\" id=\"t-next\">Next ▶</button> <button class=\"tool-btn ghost\" id=\"t-shuf\">🔀 Shuffle</button>");
    el("t-card").onclick=function(){ flipped=!flipped; showCard(); };
    el("t-prev").onclick=function(){ idx=(idx-1+order.length)%order.length; flipped=false; showCard(); };
    el("t-next").onclick=function(){ idx=(idx+1)%order.length; flipped=false; showCard(); };
    el("t-shuf").onclick=function(){ for(var i=order.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=order[i]; order[i]=order[j]; order[j]=t; } idx=0; flipped=false; showCard(); };
  }
  el("t-add").onclick=function(){
    var q=el("t-q").value.trim(), a=el("t-a").value.trim();
    if(!q||!a){ outHTML(box,"Enter both a question and an answer."); return; }
    var c=get(); c.push({q:q,a:a}); set(c);
    el("t-q").value=""; el("t-a").value="";
    outHTML(box,"Card added! You have "+c.length+" card(s).");
  };
  el("t-study").onclick=function(){
    var c=get(); if(!c.length){ outHTML(box,"No cards yet — add some first!"); return; }
    order=[]; for(var i=0;i<c.length;i++) order.push(i);
    idx=0; flipped=false; showCard();
  };
  el("t-manage").onclick=function(){
    var c=get(); if(!c.length){ outHTML(box,"No cards yet."); return; }
    var h="";
    for(var i=0;i<c.length;i++){ h+='<div style="margin:6px 0;padding:8px;border:1px solid #334155;border-radius:8px"><b>Q:</b> '+esc(c[i].q)+'<br><b>A:</b> '+esc(c[i].a)+' <button class="tool-btn ghost" data-i="'+i+'" style="padding:2px 8px;float:right">✖</button></div>'; }
    outHTML(box,h);
    var ds=box.querySelectorAll("[data-i]");
    for(var j=0;j<ds.length;j++){ (function(b){ b.onclick=function(){ var c2=get(); c2.splice(+b.getAttribute("data-i"),1); set(c2); el("t-manage").onclick(); }; })(ds[j]); }
  };
  outHTML(box,"Add cards above, then press Study Mode.");
}});

TOOLS.push({ id:"timeline", cat:"learn", icon:"📜", name:"Free History Timeline Online",
desc:"Major world events",
how:"Pick an era to filter, or view all. Scroll the timeline of major world events from ancient times to the modern day.",
render:function(box){
  var EV=[
    ["c. 3100 BCE",-3100,"Narmer unites Egypt","The first pharaoh unites Upper and Lower Egypt, starting dynastic rule."],
    ["c. 1754 BCE",-1754,"Code of Hammurabi","One of the earliest written law codes, carved in Babylon."],
    ["753 BCE",-753,"Founding of Rome","Legend says Romulus founds Rome; it grows into a vast empire."],
    ["490 BCE",-490,"Battle of Marathon","Athens defeats Persia; the marathon race is named for the run to Athens."],
    ["323 BCE",-323,"Death of Alexander the Great","His empire splits, spreading Greek culture across three continents."],
    ["44 BCE",-44,"Assassination of Julius Caesar","Rome turns from republic toward empire under Augustus."],
    ["476 CE",476,"Fall of Western Rome","The Western Roman Empire collapses, beginning the Middle Ages in Europe."],
    ["622",622,"The Hijra","Muhammad migrates to Medina; year 1 of the Islamic calendar."],
    ["800",800,"Charlemagne crowned","Crowned emperor in Rome, reviving the idea of a Christian empire."],
    ["1099",1099,"First Crusade takes Jerusalem","Crusaders capture Jerusalem after a three-year campaign."],
    ["1206",1206,"Mongol Empire founded","Genghis Khan unites the steppe tribes; the largest land empire begins."],
    ["1215",1215,"Magna Carta","English barons force King John to accept limits on royal power."],
    ["1347",1347,"Black Death reaches Europe","Plague kills roughly a third of Europe in a few years."],
    ["1453",1453,"Fall of Constantinople","The Ottoman Turks end the Byzantine Empire after 1,000 years."],
    ["1492",1492,"Columbus reaches the Americas","European contact transforms both hemispheres forever."],
    ["1498",1498,"Da Gama reaches India","Portugal opens a sea route to Asia around Africa."],
    ["1517",1517,"Reformation begins","Luther challenges the Church, splitting Western Christianity."],
    ["1543",1543,"Copernicus publishes heliocentrism","The Sun-centered universe launches the scientific revolution."],
    ["1607",1607,"Jamestown founded","The first permanent English settlement in the Americas."],
    ["1687",1687,"Newton publishes Principia","Laws of motion and gravity reshape science."],
    ["1776",1776,"US Declaration of Independence","Thirteen colonies declare independence from Britain."],
    ["1789",1789,"French Revolution","Monarchy falls; liberty, equality and fraternity shake Europe."],
    ["1804",1804,"Napoleon crowned emperor","France under Napoleon redraws the map of Europe."],
    ["1859",1859,"Darwin publishes Origin of Species","Evolution by natural selection explained."],
    ["1865",1865,"End of US Civil War","Slavery abolished in the United States."],
    ["1869",1869,"Suez Canal opens","Europe to Asia shipping cuts weeks off the journey."],
    ["1876",1876,"Telephone invented","Bell patents the telephone, shrinking distances."],
    ["1879",1879,"Edison demonstrates the light bulb","Practical electric light spreads worldwide."],
    ["1903",1903,"First powered flight","The Wright brothers fly at Kitty Hawk."],
    ["1914",1914,"World War I begins","A global war engulfs Europe and beyond."],
    ["1918",1918,"World War I ends","Over 16 million dead; empires collapse."],
    ["1928",1928,"Penicillin discovered","Fleming finds the first widely used antibiotic."],
    ["1929",1929,"Great Depression","The US stock crash triggers a decade of global hardship."],
    ["1939",1939,"World War II begins","Germany invades Poland; the deadliest war in history starts."],
    ["1945",1945,"World War II ends","The UN is founded to prevent future global wars."],
    ["1957",1957,"Sputnik launched","The first satellite starts the space age."],
    ["1961",1961,"First human in space","Yuri Gagarin orbits Earth."],
    ["1969",1969,"Moon landing","Apollo 11 puts humans on the Moon."],
    ["1986",1986,"Chernobyl disaster","The worst nuclear accident in history."],
    ["1989",1989,"Fall of the Berlin Wall","The Cold War division of Europe ends."],
    ["1990",1990,"World Wide Web invented","Tim Berners-Lee creates the web we use today."],
    ["2001",2001,"September 11 attacks","Terrorist attacks reshape global politics."],
    ["2007",2007,"First iPhone","Smartphones begin reshaping daily life."],
    ["2008",2008,"Bitcoin whitepaper","The first cryptocurrency is proposed."],
    ["2012",2012,"Higgs boson discovered","The particle completing the Standard Model is found at CERN."],
    ["2019",2019,"COVID-19 pandemic","A global pandemic changes work, travel and health policy."],
    ["2022",2022,"AI chat boom","Conversational AI reaches hundreds of millions of users."]
  ];
  function eraOf(k){ return k<500?"Ancient (before 500)":k<1500?"Middle Ages (500–1499)":k<1800?"Early Modern (1500–1799)":k<1945?"Modern (1800–1944)":"Contemporary (1945–now)"; }
  box.innerHTML = '<h2>📜 History Timeline</h2><label>Era</label><select id="t-era"><option value="all">All eras</option><option>Ancient (before 500)</option><option>Middle Ages (500–1499)</option><option>Early Modern (1500–1799)</option><option>Modern (1800–1944)</option><option>Contemporary (1945–now)</option></select><div class="tool-out" id="t-out"></div>';
  function draw(){
    var f=el("t-era").value, h="";
    for(var i=0;i<EV.length;i++){
      if(f!=="all"&&eraOf(EV[i][1])!==f) continue;
      h+='<div style="display:flex;gap:10px;margin:0 0 12px"><div style="min-width:86px;text-align:right"><b style="color:#818cf8">'+EV[i][0]+'</b></div><div style="border-left:3px solid #818cf8;padding-left:10px"><b>'+esc(EV[i][2])+'</b><br><span style="font-size:.9rem;opacity:.85">'+esc(EV[i][3])+'</span></div></div>';
    }
    outHTML(box,h||"No events in this era.");
  }
  el("t-era").onchange=draw;
  draw();
}});

TOOLS.push({ id:"country-info", cat:"learn", icon:"🌍", name:"Free Country Info Finder Online",
desc:"REST Countries API",
how:"Type a country name and press Search to see its capital, population, region, languages, currency and flag.",
render:function(box){
  box.innerHTML = '<h2>🌍 Country Info Finder</h2><label>Country name</label><input type="text" id="t-n" placeholder="e.g. Pakistan"><button class="tool-btn" id="t-go">Search</button><div class="tool-out" id="t-out"></div><p class="tool-note">Data from the free REST Countries API.</p>';
  el("t-go").onclick=function(){
    var n=el("t-n").value.trim();
    if(!n){ outHTML(box,"Enter a country name."); return; }
    outHTML(box,"Searching...");
    fetch("https://restcountries.com/v3.1/name/"+encodeURIComponent(n)+"?fields=name,capital,population,flags,languages,currencies,region")
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(d){
        var c=d[0], langs=[], cur="";
        for(var k in c.languages){ langs.push(c.languages[k]); }
        for(var ck in c.currencies){ cur=c.currencies[ck].name+(c.currencies[ck].symbol?" ("+c.currencies[ck].symbol+")":""); break; }
        outHTML(box,'<img src="'+c.flags.png+'" alt="flag" style="width:120px;border-radius:6px;margin-bottom:8px"><br><b>'+esc(c.name.common)+'</b><br>Capital: '+esc((c.capital||["-"])[0])+'<br>Population: '+(+c.population).toLocaleString("en-US")+'<br>Region: '+esc(c.region||"-")+'<br>Languages: '+esc(langs.join(", ")||"-")+'<br>Currency: '+esc(cur||"-"));
      })
      .catch(function(){ outHTML(box,"Country not found — check the spelling and try again."); });
  };
}});

TOOLS.push({ id:"solar", cat:"learn", icon:"🪐", name:"Free Solar System Calculator Online",
desc:"Planet distances",
how:"Pick a planet and enter your travel speed in km/h to see how long the trip would take, plus key planet facts.",
render:function(box){
  var P=[
    {n:"Mercury",au:0.387,km:57900000,op:"88 days",day:"4,222 hours"},
    {n:"Venus",au:0.723,km:108200000,op:"225 days",day:"2,802 hours"},
    {n:"Earth",au:1,km:149600000,op:"365.25 days",day:"24 hours"},
    {n:"Mars",au:1.524,km:227900000,op:"687 days",day:"24.7 hours"},
    {n:"Jupiter",au:5.203,km:778500000,op:"11.9 years",day:"9.9 hours"},
    {n:"Saturn",au:9.537,km:1429000000,op:"29.5 years",day:"10.7 hours"},
    {n:"Uranus",au:19.19,km:2871000000,op:"84 years",day:"17.2 hours"},
    {n:"Neptune",au:30.07,km:4495000000,op:"164.8 years",day:"16.1 hours"}
  ];
  var opts="";
  for(var i=0;i<P.length;i++){ opts+='<option value="'+i+'">'+P[i].n+'</option>'; }
  box.innerHTML = '<h2>🪐 Solar System Calculator</h2><div class="row"><div><label>Planet</label><select id="t-p">'+opts+'</select></div><div><label>Your speed (km/h)</label><input type="number" id="t-v" value="100" min="1"></div></div><button class="tool-btn" id="t-go">Calculate Trip</button><div class="tool-out" id="t-out"></div><p class="tool-note">Distances are average distances from the Sun.</p>';
  el("t-go").onclick=function(){
    var p=P[+el("t-p").value], v=+el("t-v").value;
    if(!v||v<=0){ outHTML(box,"Enter a speed above 0."); return; }
    var hrs=p.km/v, t;
    if(hrs<48){ t=hrs.toFixed(1)+" hours"; }
    else{ var days=hrs/24; t=Math.round(days).toLocaleString("en-US")+" days ("+(days/365).toFixed(1)+" years)"; }
    outHTML(box,"<b>"+p.n+"</b><br>Distance from Sun: "+p.au+" AU ("+p.km.toLocaleString("en-US")+" km)<br>Trip at "+v.toLocaleString("en-US")+" km/h: <b>"+t+"</b><br>Orbital period: "+p.op+"<br>Day length: "+p.day);
  };
}});

TOOLS.push({ id:"species", cat:"learn", icon:"🦁", name:"Free Species Encyclopedia Online",
desc:"30 animals & plants",
how:"Type in the search box to filter, then click any species to see its type, habitat and a quick fact.",
render:function(box){
  var S=[
    {n:"African Lion",t:"Mammal",h:"African savannas",f:"A lion roar can be heard up to 8 km away."},
    {n:"Bengal Tiger",t:"Mammal",h:"Asian forests",f:"The largest wild cat; can be 3 meters long."},
    {n:"African Elephant",t:"Mammal",h:"African savannas and forests",f:"The largest land animal, with an excellent memory."},
    {n:"Giraffe",t:"Mammal",h:"African savannas",f:"The tallest land animal, reaching about 5.5 meters."},
    {n:"Giant Panda",t:"Mammal",h:"Chinese bamboo forests",f:"Spends up to 14 hours a day eating bamboo."},
    {n:"Kangaroo",t:"Mammal",h:"Australian grasslands",f:"Cannot walk backward because of its powerful legs and tail."},
    {n:"Polar Bear",t:"Mammal",h:"Arctic",f:"The largest land carnivore; great swimmer."},
    {n:"Snow Leopard",t:"Mammal",h:"Central Asian mountains",f:"Its tail is nearly as long as its body, for balance."},
    {n:"Blue Whale",t:"Mammal",h:"World oceans",f:"The largest animal ever; its heart is the size of a small car."},
    {n:"Bottlenose Dolphin",t:"Mammal",h:"Warm oceans",f:"Sleeps with one half of its brain awake."},
    {n:"House Cat",t:"Mammal",h:"Worldwide (domestic)",f:"Purrs at about 25 Hz, a frequency linked to healing."},
    {n:"Honeybee",t:"Insect",h:"Worldwide",f:"Dances to tell hive mates where flowers are."},
    {n:"Monarch Butterfly",t:"Insect",h:"North America",f:"Migrates about 4,000 km to Mexico each year."},
    {n:"Bald Eagle",t:"Bird",h:"North America",f:"Eyesight about 8 times sharper than a human."},
    {n:"Emperor Penguin",t:"Bird",h:"Antarctica",f:"Males incubate the egg through the Antarctic winter."},
    {n:"Ostrich",t:"Bird",h:"African savannas",f:"The largest bird; runs up to 70 km/h but cannot fly."},
    {n:"Peregrine Falcon",t:"Bird",h:"Worldwide",f:"The fastest animal, diving at over 300 km/h."},
    {n:"Great White Shark",t:"Fish",h:"Coastal oceans",f:"Can sense the tiny electric fields made by other animals."},
    {n:"Clownfish",t:"Fish",h:"Coral reefs",f:"All are born male; the dominant one can become female."},
    {n:"Octopus",t:"Mollusk",h:"World oceans",f:"Has three hearts and blue blood."},
    {n:"Komodo Dragon",t:"Reptile",h:"Indonesian islands",f:"The largest lizard; its bite is venomous."},
    {n:"Green Sea Turtle",t:"Reptile",h:"Tropical oceans",f:"Can stay underwater for hours while resting."},
    {n:"King Cobra",t:"Reptile",h:"Asian forests",f:"The longest venomous snake, up to 5.5 meters."},
    {n:"Poison Dart Frog",t:"Amphibian",h:"Central and South American rainforests",f:"Bright colors warn predators of its toxins."},
    {n:"Axolotl",t:"Amphibian",h:"Mexican lakes",f:"Can regrow lost limbs, even parts of its heart."},
    {n:"Oak Tree",t:"Plant",h:"Temperate forests",f:"Can live for over 1,000 years."},
    {n:"Sunflower",t:"Plant",h:"Worldwide (cultivated)",f:"Young flower heads track the sun across the sky."},
    {n:"Venus Flytrap",t:"Plant",h:"Wetlands of North Carolina",f:"Snaps its trap shut in about 0.1 seconds."},
    {n:"Baobab",t:"Plant",h:"Madagascar and Africa",f:"Stores thousands of liters of water in its trunk."},
    {n:"Giant Redwood",t:"Plant",h:"California coast",f:"The tallest trees on Earth, over 110 meters."}
  ];
  box.innerHTML = '<h2>🦁 Species Encyclopedia</h2><label>Search species</label><input type="text" id="t-s" placeholder="e.g. lion"><div class="tool-out" id="t-out"></div><p class="tool-note">A concise reference of 30 species — not an exhaustive encyclopedia.</p>';
  function draw(){
    var q=el("t-s").value.trim().toLowerCase(), h="";
    for(var i=0;i<S.length;i++){
      if(q&&S[i].n.toLowerCase().indexOf(q)===-1&&S[i].t.toLowerCase().indexOf(q)===-1) continue;
      h+='<div data-i="'+i+'" style="margin:6px 0;padding:8px;border:1px solid #334155;border-radius:8px;cursor:pointer"><b>'+esc(S[i].n)+'</b> <span style="opacity:.7;font-size:.85rem">'+esc(S[i].t)+'</span></div>';
    }
    outHTML(box,h||"No species match that search.");
    var ds=box.querySelectorAll("[data-i]");
    for(var j=0;j<ds.length;j++){ (function(d){ d.onclick=function(){ var s=S[+d.getAttribute("data-i")]; outHTML(box,"<b>"+esc(s.n)+"</b><br>Type: "+esc(s.t)+"<br>Habitat: "+esc(s.h)+"<br>Fact: "+esc(s.f)+"<br><br><button class=\"tool-btn ghost\" id=\"t-back\">◀ Back to list</button>"); el("t-back").onclick=draw; }; })(ds[j]); }
  }
  el("t-s").oninput=draw;
  draw();
}});

TOOLS.push({ id:"grade-tracker", cat:"learn", icon:"🏅", name:"Free Grade Tracker Online",
desc:"GPA + attendance",
how:"Add courses with credits and grades, enter attendance, then press Calculate. Everything is saved on this device.",
render:function(box){
  box.innerHTML = '<h2>📝 Grade Tracker</h2><div id="t-rows"></div><button class="tool-btn ghost" id="t-add">+ Add Course</button><div class="row" style="margin-top:10px"><div><label>Total classes</label><input type="number" id="t-tot" min="0" value="0"></div><div><label>Classes attended</label><input type="number" id="t-att" min="0" value="0"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  var PTS={A:4,B:3,C:2,D:1,F:0};
  function rowHTML(name,cr,gr){
    return '<div class="row t-row" style="margin-bottom:6px"><div><input type="text" class="t-cn" placeholder="Course name" value="'+esc(name||"")+'"></div><div><input type="number" class="t-cc" placeholder="Credits" min="0" value="'+esc(cr||"3")+'"></div><div><select class="t-cg"><option'+(gr==="A"?" selected":"")+'>A</option><option'+(gr==="B"?" selected":"")+'>B</option><option'+(gr==="C"?" selected":"")+'>C</option><option'+(gr==="D"?" selected":"")+'>D</option><option'+(gr==="F"?" selected":"")+'>F</option></select></div><div><button class="tool-btn ghost t-rm" style="padding:4px 10px">✖</button></div></div>';
  }
  function bindRemove(){
    var rs=box.querySelectorAll(".t-rm");
    for(var i=0;i<rs.length;i++){ (function(b){ b.onclick=function(){ b.parentNode.parentNode.remove(); save(); }; })(rs[i]); }
  }
  function collect(){
    var rows=box.querySelectorAll(".t-row"), c=[];
    for(var i=0;i<rows.length;i++){
      c.push({n:rows[i].querySelector(".t-cn").value, cr:rows[i].querySelector(".t-cc").value, g:rows[i].querySelector(".t-cg").value});
    }
    return {courses:c, tot:el("t-tot").value, att:el("t-att").value};
  }
  function save(){ localStorage.setItem("sawalai_grades",JSON.stringify(collect())); }
  el("t-add").onclick=function(){ el("t-rows").insertAdjacentHTML("beforeend",rowHTML("",3,"A")); bindRemove(); save(); };
  el("t-go").onclick=function(){
    var d=collect(), tp=0, tc=0, named=0;
    for(var i=0;i<d.courses.length;i++){
      var cr=+d.courses[i].cr||0;
      if(cr>0){ tp+=cr*PTS[d.courses[i].g]; tc+=cr; named++; }
    }
    save();
    var gpa=tc>0?(tp/tc).toFixed(2):"—";
    var tot=+d.tot||0, att=+d.att||0;
    var pct=tot>0?Math.min(100,(att/tot*100)).toFixed(1)+"%":"—";
    outHTML(box,"GPA: <b>"+gpa+"</b> (over "+named+" course(s))<br>Attendance: <b>"+pct+"</b>");
  };
  try{
    var sv=JSON.parse(localStorage.getItem("sawalai_grades"));
    if(sv&&sv.courses&&sv.courses.length){ for(var k=0;k<sv.courses.length;k++){ el("t-rows").insertAdjacentHTML("beforeend",rowHTML(sv.courses[k].n,sv.courses[k].cr,sv.courses[k].g)); } el("t-tot").value=sv.tot||0; el("t-att").value=sv.att||0; }
    else{ el("t-rows").insertAdjacentHTML("beforeend",rowHTML("",3,"A")); }
  }catch(e){ el("t-rows").insertAdjacentHTML("beforeend",rowHTML("",3,"A")); }
  bindRemove();
  outHTML(box,"Add your courses above, then press Calculate.");
}});

TOOLS.push({ id:"geo-quiz", cat:"learn", icon:"🌎", name:"Free Geography Quiz Online",
desc:"Country capitals quiz",
how:"Press Start Quiz and answer 10 random capital questions with 4 options each. Your score appears at the end.",
render:function(box){
  var CC=[["France","Paris"],["Germany","Berlin"],["Italy","Rome"],["Spain","Madrid"],["Portugal","Lisbon"],["United Kingdom","London"],["Netherlands","Amsterdam"],["Belgium","Brussels"],["Switzerland","Bern"],["Austria","Vienna"],["Poland","Warsaw"],["Greece","Athens"],["Turkey","Ankara"],["Russia","Moscow"],["Ukraine","Kyiv"],["Norway","Oslo"],["Sweden","Stockholm"],["Denmark","Copenhagen"],["Finland","Helsinki"],["Ireland","Dublin"],["USA","Washington D.C."],["Canada","Ottawa"],["Mexico","Mexico City"],["Brazil","Brasilia"],["Argentina","Buenos Aires"],["Egypt","Cairo"],["Nigeria","Abuja"],["Kenya","Nairobi"],["South Africa","Pretoria"],["Morocco","Rabat"],["China","Beijing"],["Japan","Tokyo"],["South Korea","Seoul"],["India","New Delhi"],["Pakistan","Islamabad"],["Thailand","Bangkok"],["Vietnam","Hanoi"],["Indonesia","Jakarta"],["Australia","Canberra"],["New Zealand","Wellington"],["Saudi Arabia","Riyadh"],["UAE","Abu Dhabi"],["Iran","Tehran"],["Iraq","Baghdad"],["Israel","Jerusalem"],["Malaysia","Kuala Lumpur"],["Philippines","Manila"],["Bangladesh","Dhaka"],["Sri Lanka","Colombo"],["Nepal","Kathmandu"]];
  box.innerHTML = '<h2>🗺️ Geography Quiz</h2><button class="tool-btn" id="t-start">Start Quiz</button><div class="tool-out" id="t-out"></div>';
  function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  el("t-start").onclick=function(){
    var qs=shuffle(CC.slice()).slice(0,10), idx=0, score=0;
    function show(){
      if(idx>=qs.length){
        var g=score===10?"Perfect! 🏆":score>=8?"Great!":score>=6?"Good":score>=4?"Fair":"Keep practicing 💪";
        outHTML(box,"<b>Quiz over!</b><br>Score: "+score+" / 10<br>"+g+"<br><br><button class=\"tool-btn\" id=\"t-again\">Play Again</button>");
        el("t-again").onclick=function(){ el("t-start").onclick(); };
        return;
      }
      var c=qs[idx], others=shuffle(CC.filter(function(x){return x[1]!==c[1];})).slice(0,3).map(function(x){return x[1];});
      var opts=shuffle([c[1]].concat(others)), h="<b>Question "+(idx+1)+" / 10</b> — Score: "+score+"<br><div style=\"font-size:1.3rem;margin:12px 0\">What is the capital of <b>"+esc(c[0])+"</b>?</div>";
      for(var i=0;i<opts.length;i++){ h+='<button class="tool-btn ghost t-opt" data-o="'+esc(opts[i])+'" style="display:block;width:100%;margin:6px 0;text-align:left">'+esc(opts[i])+'</button>'; }
      outHTML(box,h);
      var bs=box.querySelectorAll(".t-opt");
      for(var j=0;j<bs.length;j++){ (function(b){ b.onclick=function(){
        var ok=b.getAttribute("data-o")===c[1];
        for(var k=0;k<bs.length;k++){ bs[k].disabled=true; if(bs[k].getAttribute("data-o")===c[1]){ bs[k].style.borderColor="#22c55e"; bs[k].style.color="#22c55e"; } }
        if(ok){ score++; } else { b.style.borderColor="#ef4444"; b.style.color="#ef4444"; }
        idx++;
        setTimeout(show,1100);
      }; })(bs[j]); }
    }
    show();
  };
  outHTML(box,"10 random questions, 4 options each. Good luck!");
}});

TOOLS.push({ id:"pronounce", cat:"learn", icon:"🔊", name:"Free Pronunciation Guide Online",
desc:"Hear any phrase",
how:"Type any phrase, pick a voice language and speed, then press Speak to hear it read aloud.",
render:function(box){
  box.innerHTML = '<h2>🔊 Pronunciation Guide</h2><label>Text to pronounce</label><input type="text" id="t-t" placeholder="e.g. How are you?"><div class="row"><div><label>Voice language</label><select id="t-l"><option value="en-US">English (US)</option><option value="en-GB">English (UK)</option><option value="ur-PK">Urdu (Pakistan)</option><option value="ar-SA">Arabic</option><option value="es-ES">Spanish</option><option value="fr-FR">French</option><option value="hi-IN">Hindi</option></select></div><div><label>Speed</label><input type="range" id="t-r" min="0.5" max="1.5" step="0.1" value="1"></div></div><button class="tool-btn" id="t-go">🔊 Speak</button><div class="tool-out" id="t-out"></div><p class="tool-note">Voices depend on your device and browser — some languages may use a default voice.</p>';
  el("t-go").onclick=function(){
    var t=el("t-t").value.trim();
    if(!t){ outHTML(box,"Type a phrase first."); return; }
    if(!("speechSynthesis" in window)){ outHTML(box,"Speech is not supported in this browser."); return; }
    window.speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(t), lang=el("t-l").value;
    u.lang=lang; u.rate=+el("t-r").value;
    var vs=window.speechSynthesis.getVoices(), v=null;
    for(var i=0;i<vs.length;i++){ if(vs[i].lang===lang){ v=vs[i]; break; } }
    if(!v){ for(var j=0;j<vs.length;j++){ if(vs[j].lang.indexOf(lang.slice(0,2))===0){ v=vs[j]; break; } } }
    if(v) u.voice=v;
    window.speechSynthesis.speak(u);
    outHTML(box,"Speaking"+(v?" with voice: "+esc(v.name):" (default voice)")+"…");
  };
  if("speechSynthesis" in window){ window.speechSynthesis.getVoices(); }
}});

TOOLS.push({ id:"homework", cat:"learn", icon:"✏️", name:"Free Homework Planner Online",
desc:"Task checklist",
how:"Enter the subject, task and due date, then press Add. Tick tasks done as you finish; overdue tasks are highlighted.",
render:function(box){
  box.innerHTML = '<h2>✅ Homework Planner</h2><div class="row"><div><label>Subject</label><input type="text" id="t-s" placeholder="e.g. Math"></div><div><label>Task</label><input type="text" id="t-k" placeholder="e.g. Chapter 5 exercises"></div><div><label>Due date</label><input type="date" id="t-d"></div></div><button class="tool-btn" id="t-add">Add Task</button><div class="tool-out" id="t-out"></div><p class="tool-note">Saved on this device only.</p>';
  function get(){ try{return JSON.parse(localStorage.getItem("sawalai_homework"))||[];}catch(e){return[];} }
  function set(a){ localStorage.setItem("sawalai_homework",JSON.stringify(a)); }
  function today(){ return new Date().toISOString().slice(0,10); }
  function list(){
    var a=get();
    if(!a.length){ outHTML(box,"No tasks yet — add your first one above!"); return; }
    var h="", done=0;
    for(var i=a.length-1;i>=0;i--){
      var t=a[i], od=!t.done&&t.due&&t.due<today();
      if(t.done) done++;
      var st=t.done?'text-decoration:line-through;opacity:.6':'';
      var bg=od?'border-color:#ef4444;background:rgba(239,68,68,.08)':'';
      h+='<div style="margin:6px 0;padding:8px;border:1px solid #334155;border-radius:8px;'+bg+'"><label style="display:flex;gap:8px;align-items:center;font-weight:normal"><input type="checkbox" data-id="'+t.id+'"'+(t.done?' checked':'')+'><span style="flex:1;'+st+'"><b>'+esc(t.sub)+'</b>: '+esc(t.task)+(t.due?'<br><small style="opacity:.7">Due: '+esc(t.due)+(od?' — <b style="color:#ef4444">OVERDUE</b>':'')+'</small>':'')+'</span><button class="tool-btn ghost" data-del="'+t.id+'" style="padding:2px 8px">✖</button></label></div>';
    }
    outHTML(box,"<div style=\"margin-bottom:8px\">Done: "+done+" / "+a.length+"</div>"+h);
    var cbs=box.querySelectorAll('input[type="checkbox"]');
    for(var j=0;j<cbs.length;j++){ (function(c){ c.onchange=function(){ var a2=get(), id=c.getAttribute("data-id"); for(var k=0;k<a2.length;k++){ if(String(a2[k].id)===id){ a2[k].done=c.checked; break; } } set(a2); list(); }; })(cbs[j]); }
    var ds=box.querySelectorAll("[data-del]");
    for(var m=0;m<ds.length;m++){ (function(b){ b.onclick=function(){ var id=b.getAttribute("data-del"); set(get().filter(function(x){return String(x.id)!==id;})); list(); }; })(ds[m]); }
  }
  el("t-add").onclick=function(){
    var s=el("t-s").value.trim(), k=el("t-k").value.trim();
    if(!s||!k){ outHTML(box,"Enter both subject and task."); return; }
    var a=get();
    a.push({id:Date.now(),sub:s,task:k,due:el("t-d").value||"",done:false});
    set(a);
    el("t-s").value=""; el("t-k").value=""; el("t-d").value="";
    list();
  };
  list();
}});

TOOLS.push({ id:"svg-opt", cat:"image", icon:"🧽", name:"Free SVG Optimizer Online",
desc:"Clean bloated SVG code", how:"Paste SVG code, press Optimize to strip comments, collapse whitespace and round decimals, then copy or download the smaller file.",
render:function(box){
  box.innerHTML = '<h2>🧽 SVG Optimizer</h2><label>Paste SVG code</label><textarea id="t-in" rows="6" placeholder="&lt;svg ...&gt;...&lt;/svg&gt;"></textarea><button class="tool-btn" id="t-go">Optimize</button><div class="tool-out" id="t-out"></div><div class="row"><button class="tool-btn ghost" id="t-copy" style="display:none">Copy</button><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download .svg</button></div>';
  el("t-go").onclick=function(){
    var src=el("t-in").value; if(!src.trim()){outHTML(box,"Paste SVG code first.");return;}
    var before=src.length;
    var out=src.replace(/<!--[\s\S]*?-->/g,"").replace(/>\s+</g,"><").replace(/(\d*\.\d{3,})/g,function(m){return String(Math.round(parseFloat(m)*100)/100);}).trim();
    var after=out.length, saved=before?Math.round((before-after)/before*100):0;
    outHTML(box,"Before: "+before+" bytes\nAfter: "+after+" bytes\nSaved: "+saved+"%");
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(out,c);};
    var d=el("t-dl"); d.style.display=""; d.onclick=function(){dl("data:image/svg+xml;charset=utf-8,"+encodeURIComponent(out),"optimized.svg");};
  };
}});

TOOLS.push({ id:"contrast", cat:"image", icon:"👁️", name:"Free Contrast Checker Online",
desc:"WCAG AA/AAA ratios", how:"Pick a foreground and background color to see the WCAG contrast ratio and AA/AAA pass results, plus a live text preview.",
render:function(box){
  box.innerHTML = '<h2>👁️ Contrast Checker</h2><div class="row"><div><label>Foreground</label><input type="color" id="t-fg" value="#000000"></div><div><label>Background</label><input type="color" id="t-bg" value="#ffffff"></div></div><div id="t-prev" style="margin:12px 0;padding:16px;border-radius:10px;font-size:18px;font-weight:600">Sample text preview — The quick brown fox jumps over the lazy dog.</div><div class="tool-out" id="t-out"></div>';
  function lum(hex){var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;function f(v){return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b);}
  function pf(cond){return cond?"✅ PASS":"❌ FAIL";}
  function go(){
    var fg=el("t-fg").value, bg=el("t-bg").value;
    var l1=lum(fg), l2=lum(bg), r=(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
    var rr=Math.round(r*100)/100;
    el("t-prev").style.background=bg; el("t-prev").style.color=fg;
    outHTML(box,"Contrast ratio: "+rr+" : 1\nAA normal text (4.5): "+pf(r>=4.5)+"\nAA large text (3): "+pf(r>=3)+"\nAAA normal text (7): "+pf(r>=7));
  }
  el("t-fg").oninput=go; el("t-bg").oninput=go; go();
}});

TOOLS.push({ id:"css-triangle", cat:"image", icon:"🔺", name:"Free CSS Triangle Generator Online",
desc:"Border-based triangles", how:"Choose a direction, drag the size slider and pick a color to preview the triangle, then copy the ready CSS.",
render:function(box){
  box.innerHTML = '<h2>🔺 CSS Triangle Generator</h2><label>Direction</label><select id="t-d"><option value="up">Up</option><option value="down">Down</option><option value="left">Left</option><option value="right">Right</option></select><label>Size: <span id="t-sv">50</span>px</label><input type="range" id="t-s" min="10" max="150" value="50"><label>Color</label><input type="color" id="t-c" value="#6366f1"><div id="t-prev" style="margin:14px 0;min-height:170px;display:flex;align-items:center;justify-content:center"></div><div class="tool-out" id="t-out"></div><button class="tool-btn ghost" id="t-copy">Copy CSS</button>';
  var css="";
  function go(){
    var d=el("t-d").value, s=+el("t-s").value, c=el("t-c").value;
    el("t-sv").textContent=s;
    var st="width:0;height:0;border-style:solid;";
    if(d==="up") st+="border-width:0 "+s+"px "+s+"px "+s+"px;border-color:transparent transparent "+c+" transparent;";
    else if(d==="down") st+="border-width:"+s+"px "+s+"px 0 "+s+"px;border-color:"+c+" transparent transparent transparent;";
    else if(d==="left") st+="border-width:"+s+"px "+s+"px "+s+"px 0;border-color:transparent "+c+" transparent transparent;";
    else st+="border-width:"+s+"px 0 "+s+"px "+s+"px;border-color:transparent transparent transparent "+c+";";
    el("t-prev").innerHTML='<div style="'+st+'"></div>';
    css=".triangle {\n"+st.split(";").filter(function(x){return x.trim();}).map(function(x){return "  "+x+";";}).join("\n")+"\n}";
    outHTML(box,css);
  }
  el("t-d").onchange=go; el("t-s").oninput=go; el("t-c").oninput=go;
  el("t-copy").onclick=function(){copyText(css,el("t-copy"));};
  go();
}});

TOOLS.push({ id:"pixel-inspect", cat:"image", icon:"🧐", name:"Free Pixel Color Inspector Online",
desc:"Click image, get color", how:"Upload an image, move your mouse to inspect pixels magnified, and click any pixel to copy its HEX color code.",
render:function(box){
  box.innerHTML = '<h2>🎯 Pixel Color Inspector</h2><label>Upload image</label><input type="file" id="t-f" accept="image/*"><div class="row"><canvas id="t-cv" style="max-width:100%;border-radius:10px;cursor:crosshair"></canvas><div><canvas id="t-mag" width="96" height="96" style="border-radius:10px;border:2px solid #ffffff22;image-rendering:pixelated"></canvas><div class="tool-out" id="t-out"></div></div></div><p class="tool-note">Move over the image to inspect. Click to copy HEX.</p>';
  var img=new Image(), cv=el("t-cv"), ctx=cv.getContext("2d"), mag=el("t-mag").getContext("2d"), ready=false;
  function hex(px){return "#"+((1<<24)+(px[0]<<16)+(px[1]<<8)+px[2]).toString(16).slice(1);}
  el("t-f").onchange=function(e){var r=new FileReader();r.onload=function(){img.onload=function(){var sc=Math.min(1,520/img.width);cv.width=Math.round(img.width*sc);cv.height=Math.round(img.height*sc);ctx.drawImage(img,0,0,cv.width,cv.height);ready=true;outHTML(box,"Ready — hover and click.");};img.src=r.result;};r.readAsDataURL(e.target.files[0]);};
  cv.addEventListener("mousemove",function(e){
    if(!ready)return;
    var rc=cv.getBoundingClientRect(), x=Math.floor((e.clientX-rc.left)*(cv.width/rc.width)), y=Math.floor((e.clientY-rc.top)*(cv.height/rc.height));
    if(x<0||y<0||x>=cv.width||y>=cv.height)return;
    mag.imageSmoothingEnabled=false; mag.clearRect(0,0,96,96);
    mag.drawImage(cv,Math.max(0,x-6),Math.max(0,y-6),13,13,0,0,96,96);
    var p=ctx.getImageData(x,y,1,1).data;
    outHTML(box,"HEX: "+hex(p)+"\nRGB: "+p[0]+", "+p[1]+", "+p[2]);
  });
  cv.addEventListener("click",function(){
    if(!ready)return;
    var t=el("t-out").textContent.match(/#[0-9a-fA-F]{6}/);
    if(t) copyText(t[0]);
  });
}});

TOOLS.push({ id:"photoframe", cat:"image", icon:"🪟", name:"Free Photo Frame Adder Online",
desc:"Borders & polaroid frames", how:"Upload a photo, pick a frame style and color, then download the framed image as a PNG.",
render:function(box){
  box.innerHTML = '<h2>🖼️ Photo Frame Adder</h2><label>Upload photo</label><input type="file" id="t-f" accept="image/*"><label>Frame style</label><select id="t-s"><option value="thin">Thin border</option><option value="thick">Thick white border</option><option value="polaroid">Polaroid</option><option value="rounded">Rounded frame</option></select><label>Frame color</label><input type="color" id="t-c" value="#ffffff"><button class="tool-btn" id="t-go">Add Frame</button><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button>';
  var img=new Image(), url="";
  el("t-f").onchange=function(e){var r=new FileReader();r.onload=function(){img.src=r.result;};r.readAsDataURL(e.target.files[0]);};
  function rr(c,x0,y0,w0,h0,r){c.beginPath();c.moveTo(x0+r,y0);c.arcTo(x0+w0,y0,x0+w0,y0+h0,r);c.arcTo(x0+w0,y0+h0,x0,y0+h0,r);c.arcTo(x0,y0+h0,x0,y0,r);c.arcTo(x0,y0,x0+w0,y0,r);c.closePath();}
  el("t-go").onclick=function(){
    if(!img.src){el("t-prev").innerHTML="<p>Upload a photo first.</p>";return;}
    function draw(){
      var st=el("t-s").value, col=el("t-c").value, c=document.createElement("canvas"), ctx=c.getContext("2d");
      var w=img.width, h=img.height;
      if(st==="polaroid"){
        var pb=Math.round(w*0.06), pbt=Math.round(h*0.28);
        c.width=w+pb*2; c.height=h+pb+pbt;
        ctx.fillStyle=col; ctx.fillRect(0,0,c.width,c.height);
        ctx.drawImage(img,pb,pb,w,h);
      } else if(st==="rounded"){
        var bd=Math.round(w*0.06), r0=Math.round(w*0.06);
        c.width=w+bd*2; c.height=h+bd*2;
        ctx.fillStyle=col; rr(ctx,0,0,c.width,c.height,r0+bd); ctx.fill();
        ctx.save(); rr(ctx,bd,bd,w,h,r0); ctx.clip(); ctx.drawImage(img,bd,bd,w,h); ctx.restore();
      } else {
        var bb=st==="thick"?Math.round(w*0.08):Math.round(w*0.015);
        c.width=w+bb*2; c.height=h+bb*2;
        ctx.fillStyle=col; ctx.fillRect(0,0,c.width,c.height);
        ctx.drawImage(img,bb,bb,w,h);
      }
      el("t-prev").innerHTML=""; c.className="tool-canvas"; el("t-prev").appendChild(c);
      url=c.toDataURL("image/png");
      var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(url,"framed.png");};
    }
    if(img.complete&&img.naturalWidth) draw(); else img.onload=draw;
  };
}});

TOOLS.push({ id:"gif-maker", cat:"image", icon:"🎞️", name:"Free GIF Maker Online",
desc:"Images to animated GIF", how:"Add several images, set the frame delay and width, then press Create GIF. Encoded in your browser with gif.js.",
render:function(box){
  box.innerHTML = '<h2>🎞️ GIF Maker</h2><p class="tool-note">The gif.js encoder loads from a CDN, so this tool needs an internet connection.</p><label>Upload images (multiple)</label><input type="file" id="t-f" accept="image/*" multiple><label>Frame delay: <span id="t-dv">500</span> ms</label><input type="range" id="t-d" min="100" max="2000" step="50" value="500"><label>Output width</label><select id="t-w"><option value="240">240px</option><option value="320" selected>320px</option><option value="480">480px</option><option value="640">640px</option></select><button class="tool-btn" id="t-go">Create GIF</button><div class="tool-out" id="t-out"></div><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download GIF</button>';
  var CDN="https://cdnjs.cloudflare.com/ajax/libs/gif.js/0.2.0/";
  el("t-d").oninput=function(){el("t-dv").textContent=el("t-d").value;};
  function fail(){outHTML(box,"Could not load the GIF encoder — the CDN is blocked or you are offline. Connect to the internet and try again.");}
  function ensureGIF(cb){
    if(window.GIF){cb();return;}
    var s=document.createElement("script"); s.src=CDN+"gif.js";
    s.onload=function(){window.GIF?cb():fail();}; s.onerror=fail;
    document.head.appendChild(s);
  }
  el("t-go").onclick=function(){
    var files=el("t-f").files; if(files.length<2){outHTML(box,"Add at least 2 images.");return;}
    outHTML(box,"Loading encoder...");
    ensureGIF(function(){
      var delay=+el("t-d").value, w=+el("t-w").value, loaded=0, frames=[];
      for(var i=0;i<files.length;i++)(function(i){
        var r=new FileReader(); r.onload=function(){var img=new Image(); img.onload=function(){frames[i]=img; if(++loaded===files.length)startEncode();}; img.src=r.result;}; r.readAsDataURL(files[i]);
      })(i);
      function startEncode(){
        fetch(CDN+"gif.worker.js").then(function(r){return r.text();}).then(function(t){
          var ws=URL.createObjectURL(new Blob([t],{type:"application/javascript"}));
          var h=Math.round(w*frames[0].height/frames[0].width);
          var gif=new GIF({workers:2,quality:10,width:w,height:h,workerScript:ws});
          frames.forEach(function(img){var c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);gif.addFrame(c,{delay:delay});});
          gif.on("progress",function(p){outHTML(box,"Encoding: "+Math.round(p*100)+"%");});
          gif.on("finished",function(blob){
            var url=URL.createObjectURL(blob);
            outHTML(box,"Done!");
            el("t-prev").innerHTML='<img src="'+url+'" style="max-width:100%;border-radius:10px" alt="GIF result">';
            var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(url,"animation.gif");};
          });
          gif.render();
        }).catch(fail);
      }
    });
  };
}});

TOOLS.push({ id:"webp-batch", cat:"image", icon:"♻️", name:"Free WebP Batch Converter Online",
desc:"WebP to PNG/JPG", how:"Add one or more WebP files, choose PNG or JPG, then press Convert to get a download link for each file.",
render:function(box){
  box.innerHTML = '<h2>🔁 WebP Batch Converter</h2><label>Upload WebP files</label><input type="file" id="t-f" accept=".webp,image/webp" multiple><label>Output format</label><select id="t-t"><option value="image/png">PNG</option><option value="image/jpeg">JPG</option></select><button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var files=el("t-f").files; if(!files.length){outHTML(box,"Add WebP files first.");return;}
    var type=el("t-t").value, ext=type==="image/png"?"png":"jpg", done=0, html="";
    outHTML(box,"Converting...");
    for(var i=0;i<files.length;i++)(function(i){
      var r=new FileReader(); r.onload=function(){
        var img=new Image();
        img.onload=function(){
          var c=document.createElement("canvas"); c.width=img.width; c.height=img.height;
          var ctx=c.getContext("2d");
          if(ext==="jpg"){ctx.fillStyle="#ffffff"; ctx.fillRect(0,0,c.width,c.height);}
          ctx.drawImage(img,0,0);
          c.toBlob(function(blob){
            var url=URL.createObjectURL(blob);
            var name=files[i].name.replace(/\.webp$/i,"")+"."+ext;
            html+='<div style="margin:6px 0">'+esc(name)+' — <a href="'+url+'" download="'+esc(name)+'" style="color:var(--accent)">⬇ Download</a></div>';
            if(++done===files.length) el("t-out").innerHTML=html;
          },type,0.92);
        };
        img.onerror=function(){
          html+='<div style="margin:6px 0">'+esc(files[i].name)+' — could not decode (not a valid WebP).</div>';
          if(++done===files.length) el("t-out").innerHTML=html;
        };
        img.src=r.result;
      };
      r.readAsDataURL(files[i]);
    })(i);
  };
}});
TOOLS.push({ id:"audio-boost", cat:"smart", icon:"🔉", name:"Free Audio Volume Booster Online",
desc:"Normalize & export WAV", how:"Upload an audio file, boost volume with the gain slider or normalize to peak, preview it, then export as WAV.",
render:function(box){
  box.innerHTML = '<h2>🔊 Audio Volume Booster</h2><label>Upload audio</label><input type="file" id="t-f" accept="audio/*"><label>Gain: <span id="t-gv">2.0</span>x</label><input type="range" id="t-g" min="1" max="5" step="0.1" value="2"><div class="row"><button class="tool-btn" id="t-go">Apply Boost</button><button class="tool-btn ghost" id="t-norm" style="display:none">Normalize to Peak</button></div><div class="tool-out" id="t-out"></div><div class="row"><button class="tool-btn ghost" id="t-play" style="display:none">▶ Play Preview</button><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Export WAV</button></div><p class="tool-note">Boosting past 0 dB clips the waveform — use Normalize to Peak to get maximum loudness without clipping.</p>';
  var AC=window.AudioContext||window.webkitAudioContext, ctx=null, orig=null, proc=null, srcNode=null, url=null;
  box._cleanup=function(){if(srcNode){try{srcNode.stop();}catch(e){}} if(url)URL.revokeObjectURL(url);};
  function wavEncode(buf){
    var ch=buf.numberOfChannels, sr=buf.sampleRate, n=buf.length, bytes=44+n*ch*2, ab=new ArrayBuffer(bytes), v=new DataView(ab), c, i, s;
    function ws(o,str){for(var k=0;k<str.length;k++)v.setUint8(o+k,str.charCodeAt(k));}
    ws(0,"RIFF"); v.setUint32(4,bytes-8,true); ws(8,"WAVE"); ws(12,"fmt ");
    v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,ch,true);
    v.setUint32(24,sr,true); v.setUint32(28,sr*ch*2,true); v.setUint16(32,ch*2,true); v.setUint16(34,16,true);
    ws(36,"data"); v.setUint32(40,n*ch*2,true);
    var off=44, data=[];
    for(c=0;c<ch;c++)data.push(buf.getChannelData(c));
    for(i=0;i<n;i++)for(c=0;c<ch;c++){s=Math.max(-1,Math.min(1,data[c][i])); v.setInt16(off,s<0?s*0x8000:s*0x7FFF,true); off+=2;}
    return new Blob([ab],{type:"audio/wav"});
  }
  function scaleBuffer(scale){
    var b=ctx.createBuffer(orig.numberOfChannels,orig.length,orig.sampleRate);
    for(var c=0;c<orig.numberOfChannels;c++){var d=orig.getChannelData(c), o=b.getChannelData(c); for(var i=0;i<d.length;i++)o[i]=d[i]*scale;}
    return b;
  }
  el("t-g").oninput=function(){el("t-gv").textContent=el("t-g").value;};
  el("t-f").onchange=function(e){
    var f=e.target.files[0]; if(!f)return;
    if(!AC){outHTML(box,"Web Audio is not supported in this browser.");return;}
    outHTML(box,"Decoding...");
    ctx=ctx||new AC();
    var r=new FileReader(); r.onload=function(){
      ctx.decodeAudioData(r.result,function(b){
        orig=b; el("t-norm").style.display="";
        outHTML(box,"Loaded: "+Math.round(b.duration)+"s, "+b.sampleRate+"Hz. Press Apply Boost.");
      },function(){outHTML(box,"Could not decode this audio file.");});
    };
    r.readAsArrayBuffer(f);
  };
  el("t-go").onclick=function(){
    if(!orig){outHTML(box,"Upload audio first.");return;}
    var g=+el("t-g").value; proc=scaleBuffer(g);
    outHTML(box,"Boost x"+g+" applied. Values past 0 dB are clipped — Normalize to Peak avoids this.");
    el("t-play").style.display=""; el("t-dl").style.display="";
  };
  el("t-norm").onclick=function(){
    if(!orig)return;
    var peak=0, c, i, d, a;
    for(c=0;c<orig.numberOfChannels;c++){d=orig.getChannelData(c); for(i=0;i<d.length;i++){a=Math.abs(d[i]); if(a>peak)peak=a;}}
    if(peak===0){outHTML(box,"Audio is silent.");return;}
    proc=scaleBuffer(1/peak);
    outHTML(box,"Normalized to peak (gain x"+(Math.round(100/peak)/100)+").");
    el("t-play").style.display=""; el("t-dl").style.display="";
  };
  el("t-play").onclick=function(){
    if(!proc)return;
    if(ctx.state==="suspended")ctx.resume();
    if(srcNode){try{srcNode.stop();}catch(e){}}
    srcNode=ctx.createBufferSource(); srcNode.buffer=proc; srcNode.connect(ctx.destination); srcNode.start();
  };
  el("t-dl").onclick=function(){if(!proc)return; if(url)URL.revokeObjectURL(url); url=URL.createObjectURL(wavEncode(proc)); dl(url,"boosted.wav");};
}});

TOOLS.push({ id:"audio-pitch", cat:"smart", icon:"🎚️", name:"Free Audio Speed Changer Online",
desc:"Speed + pitch together", how:"Upload audio, set playback speed 0.5x to 2x, preview and export WAV. Pitch shifts with speed — that is how resampling works.",
render:function(box){
  box.innerHTML = '<h2>🎚️ Audio Speed Changer</h2><p class="tool-note">Speed and pitch change together here (like a tape). Independent pitch-shifting needs heavy processing and is not included.</p><label>Upload audio</label><input type="file" id="t-f" accept="audio/*"><label>Speed: <span id="t-sv">1.0</span>x</label><input type="range" id="t-s" min="0.5" max="2" step="0.1" value="1"><button class="tool-btn" id="t-go">Apply Speed</button><div class="tool-out" id="t-out"></div><div class="row"><button class="tool-btn ghost" id="t-play" style="display:none">▶ Play Preview</button><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Export WAV</button></div>';
  var AC=window.AudioContext||window.webkitAudioContext, ctx=null, orig=null, proc=null, srcNode=null, url=null;
  box._cleanup=function(){if(srcNode){try{srcNode.stop();}catch(e){}} if(url)URL.revokeObjectURL(url);};
  function wavEncode(buf){
    var ch=buf.numberOfChannels, sr=buf.sampleRate, n=buf.length, bytes=44+n*ch*2, ab=new ArrayBuffer(bytes), v=new DataView(ab), c, i, s;
    function ws(o,str){for(var k=0;k<str.length;k++)v.setUint8(o+k,str.charCodeAt(k));}
    ws(0,"RIFF"); v.setUint32(4,bytes-8,true); ws(8,"WAVE"); ws(12,"fmt ");
    v.setUint32(16,16,true); v.setUint16(20,1,true); v.setUint16(22,ch,true);
    v.setUint32(24,sr,true); v.setUint32(28,sr*ch*2,true); v.setUint16(32,ch*2,true); v.setUint16(34,16,true);
    ws(36,"data"); v.setUint32(40,n*ch*2,true);
    var off=44, data=[];
    for(c=0;c<ch;c++)data.push(buf.getChannelData(c));
    for(i=0;i<n;i++)for(c=0;c<ch;c++){s=Math.max(-1,Math.min(1,data[c][i])); v.setInt16(off,s<0?s*0x8000:s*0x7FFF,true); off+=2;}
    return new Blob([ab],{type:"audio/wav"});
  }
  function resample(speed){
    var nl=Math.max(1,Math.floor(orig.length/speed));
    var b=ctx.createBuffer(orig.numberOfChannels,nl,orig.sampleRate), c, i;
    for(c=0;c<orig.numberOfChannels;c++){
      var d=orig.getChannelData(c), o=b.getChannelData(c);
      for(i=0;i<nl;i++){var p=i*speed, i0=Math.floor(p), f=p-i0, v0=d[i0], v1=i0+1<d.length?d[i0+1]:v0; o[i]=v0+(v1-v0)*f;}
    }
    return b;
  }
  el("t-s").oninput=function(){el("t-sv").textContent=el("t-s").value;};
  el("t-f").onchange=function(e){
    var f=e.target.files[0]; if(!f)return;
    if(!AC){outHTML(box,"Web Audio is not supported in this browser.");return;}
    outHTML(box,"Decoding...");
    ctx=ctx||new AC();
    var r=new FileReader(); r.onload=function(){
      ctx.decodeAudioData(r.result,function(b){
        orig=b;
        outHTML(box,"Loaded: "+Math.round(b.duration)+"s. Set a speed and press Apply Speed.");
      },function(){outHTML(box,"Could not decode this audio file.");});
    };
    r.readAsArrayBuffer(f);
  };
  el("t-go").onclick=function(){
    if(!orig){outHTML(box,"Upload audio first.");return;}
    var sp=+el("t-s").value; proc=resample(sp);
    outHTML(box,"Speed x"+sp+" applied. New duration: "+(Math.round(proc.duration*10)/10)+"s. Pitch shifts with speed — like a tape.");
    el("t-play").style.display=""; el("t-dl").style.display="";
  };
  el("t-play").onclick=function(){
    if(!proc)return;
    if(ctx.state==="suspended")ctx.resume();
    if(srcNode){try{srcNode.stop();}catch(e){}}
    srcNode=ctx.createBufferSource(); srcNode.buffer=proc; srcNode.connect(ctx.destination); srcNode.start();
  };
  el("t-dl").onclick=function(){if(!proc)return; if(url)URL.revokeObjectURL(url); url=URL.createObjectURL(wavEncode(proc)); dl(url,"speed-changed.wav");};
}});

TOOLS.push({ id:"css-shape", cat:"image", icon:"🔷", name:"Free CSS Shape Generator Online",
desc:"clip-path shapes", how:"Pick a shape to preview it instantly, then copy the ready-to-use CSS clip-path code.",
render:function(box){
  box.innerHTML = '<h2>⭐ CSS Shape Generator</h2><label>Shape</label><select id="t-s"><option value="circle">Circle</option><option value="ellipse">Ellipse</option><option value="triangle">Triangle</option><option value="diamond">Diamond</option><option value="hexagon">Hexagon</option><option value="star">Star</option><option value="arrow">Arrow</option><option value="parallelogram">Parallelogram</option></select><div id="t-prev" style="margin:14px auto;width:200px;height:200px;background:linear-gradient(135deg,#6366f1,#ec4899)"></div><div class="tool-out" id="t-out"></div><button class="tool-btn ghost" id="t-copy">Copy CSS</button>';
  var SHAPES={circle:"circle(50% at 50% 50%)",ellipse:"ellipse(50% 40% at 50% 50%)",triangle:"polygon(50% 0%, 100% 100%, 0% 100%)",diamond:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",hexagon:"polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",star:"polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",arrow:"polygon(0% 25%, 60% 25%, 60% 0%, 100% 50%, 60% 100%, 60% 75%, 0% 75%)",parallelogram:"polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)"};
  var css="";
  function go(){
    var cp=SHAPES[el("t-s").value];
    el("t-prev").style.clipPath=cp; el("t-prev").style.webkitClipPath=cp;
    css=".shape {\n  width: 200px;\n  height: 200px;\n  background: linear-gradient(135deg, #6366f1, #ec4899);\n  clip-path: "+cp+";\n}";
    outHTML(box,css);
  }
  el("t-s").onchange=go;
  el("t-copy").onclick=function(){copyText(css,el("t-copy"));};
  go();
}});

TOOLS.push({ id:"img-blend", cat:"image", icon:"🥤", name:"Free Image Blender Online",
desc:"Blend two photos", how:"Upload two photos, choose a blend mode and opacity, then download the blended result.",
render:function(box){
  box.innerHTML = '<h2>🎨 Image Blender</h2><div class="row"><div><label>Photo 1 (base)</label><input type="file" id="t-f1" accept="image/*"></div><div><label>Photo 2 (blend)</label><input type="file" id="t-f2" accept="image/*"></div></div><label>Blend mode</label><select id="t-m"><option value="multiply">Multiply</option><option value="screen">Screen</option><option value="overlay">Overlay</option><option value="darken">Darken</option><option value="lighten">Lighten</option><option value="difference">Difference</option></select><label>Layer 2 opacity: <span id="t-ov">70</span>%</label><input type="range" id="t-o" min="0" max="100" value="70"><button class="tool-btn" id="t-go">Blend</button><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button>';
  var i1=new Image(), i2=new Image(), url="";
  function load(inp,img){inp.onchange=function(e){var r=new FileReader(); r.onload=function(){img.src=r.result;}; r.readAsDataURL(e.target.files[0]);};}
  load(el("t-f1"),i1); load(el("t-f2"),i2);
  el("t-o").oninput=function(){el("t-ov").textContent=el("t-o").value;};
  el("t-go").onclick=function(){
    if(!i1.src||!i2.src){el("t-prev").innerHTML="<p>Upload both photos first.</p>";return;}
    function ready(){return i1.complete&&i1.naturalWidth&&i2.complete&&i2.naturalWidth;}
    function draw(){
      var w=Math.max(i1.width,i2.width), h=Math.max(i1.height,i2.height);
      var c=document.createElement("canvas"); c.width=w; c.height=h;
      var ctx=c.getContext("2d");
      ctx.drawImage(i1,0,0,w,h);
      ctx.globalCompositeOperation=el("t-m").value; ctx.globalAlpha=+el("t-o").value/100;
      ctx.drawImage(i2,0,0,w,h);
      el("t-prev").innerHTML=""; c.className="tool-canvas"; el("t-prev").appendChild(c);
      url=c.toDataURL("image/png");
      var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(url,"blended.png");};
    }
    if(ready())draw(); else{var t=setInterval(function(){if(ready()){clearInterval(t);draw();}},100);}
  };
}});

TOOLS.push({ id:"collage", cat:"image", icon:"🧩", name:"Free Photo Collage Maker Online",
desc:"Grid layouts 2-6 photos", how:"Upload 2 to 6 photos, pick a layout, then press Build Collage and download the result.",
render:function(box){
  box.innerHTML = '<h2>🖼️ Photo Collage Maker</h2><label>Upload photos (up to 6)</label><input type="file" id="t-f" accept="image/*" multiple><label>Layout</label><select id="t-l"><option value="2h">Side by side (2)</option><option value="3h">Triple (3)</option><option value="2x2">2x2 grid (4)</option><option value="3x2">3x2 grid (6)</option></select><button class="tool-btn" id="t-go">Build Collage</button><div class="tool-out" id="t-out"></div><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button>';
  var files=[];
  el("t-f").onchange=function(e){files=Array.prototype.slice.call(e.target.files).slice(0,6);};
  el("t-go").onclick=function(){
    var layout=el("t-l").value, need=layout==="2h"?2:layout==="3h"?3:layout==="2x2"?4:6;
    if(files.length<need){outHTML(box,"Upload at least "+need+" photos for this layout.");return;}
    outHTML(box,"Loading...");
    var imgs=[], done=0;
    files.slice(0,need).forEach(function(f,i){
      var r=new FileReader(); r.onload=function(){var img=new Image(); img.onload=function(){imgs[i]=img; if(++done===need)build();}; img.src=r.result;}; r.readAsDataURL(f);
    });
    function build(){
      var cell=600, c=document.createElement("canvas"), ctx=c.getContext("2d");
      function drawCover(img,x,y,w,h){var s=Math.max(w/img.width,h/img.height), dw=img.width*s, dh=img.height*s; ctx.drawImage(img,x-(dw-w)/2,y-(dh-h)/2,dw,dh);}
      if(layout==="2h"){c.width=cell*2; c.height=cell; imgs.forEach(function(im,i){drawCover(im,i*cell,0,cell,cell);});}
      else if(layout==="3h"){c.width=cell*3; c.height=cell; imgs.forEach(function(im,i){drawCover(im,i*cell,0,cell,cell);});}
      else if(layout==="2x2"){c.width=cell*2; c.height=cell*2; imgs.forEach(function(im,i){drawCover(im,(i%2)*cell,Math.floor(i/2)*cell,cell,cell);});}
      else{c.width=cell*3; c.height=cell*2; imgs.forEach(function(im,i){drawCover(im,(i%3)*cell,Math.floor(i/3)*cell,cell,cell);});}
      outHTML(box,"Collage ready: "+c.width+"x"+c.height+"px.");
      el("t-prev").innerHTML=""; c.className="tool-canvas"; el("t-prev").appendChild(c);
      var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(c.toDataURL("image/png"),"collage.png");};
    }
  };
}});

TOOLS.push({ id:"ad-slicer", cat:"image", icon:"📢", name:"Free Banner Ad Slicer Online",
desc:"Standard ad sizes", how:"Upload an image, pick a standard ad size and which part to keep, then download the cropped banner.",
render:function(box){
  box.innerHTML = '<h2>📢 Banner Ad Slicer</h2><label>Upload image</label><input type="file" id="t-f" accept="image/*"><label>Ad size</label><select id="t-s"><option value="300x250">Medium Rectangle 300x250</option><option value="728x90">Leaderboard 728x90</option><option value="160x600">Wide Skyscraper 160x600</option><option value="320x50">Mobile Banner 320x50</option><option value="970x250">Billboard 970x250</option><option value="336x280">Large Rectangle 336x280</option></select><label>Crop position</label><select id="t-p"><option value="center">Center</option><option value="top">Top</option><option value="left">Left</option></select><button class="tool-btn" id="t-go">Slice</button><div id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button>';
  var img=new Image();
  el("t-f").onchange=function(e){var r=new FileReader(); r.onload=function(){img.src=r.result;}; r.readAsDataURL(e.target.files[0]);};
  el("t-go").onclick=function(){
    if(!img.src){el("t-prev").innerHTML="<p>Upload an image first.</p>";return;}
    function draw(){
      var dims=el("t-s").value.split("x"), tw=+dims[0], th=+dims[1], pos=el("t-p").value;
      var s=Math.max(tw/img.width,th/img.height), dw=img.width*s, dh=img.height*s;
      var ox=(dw-tw)/2, oy=(dh-th)/2;
      if(pos==="top")oy=0; if(pos==="left")ox=0;
      var c=document.createElement("canvas"); c.width=tw; c.height=th;
      c.getContext("2d").drawImage(img,-ox,-oy,dw,dh);
      el("t-prev").innerHTML=""; c.className="tool-canvas"; el("t-prev").appendChild(c);
      var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(c.toDataURL("image/png"),"banner-"+tw+"x"+th+".png");};
    }
    if(img.complete&&img.naturalWidth)draw(); else img.onload=draw;
  };
}});
TOOLS.push({ id:"icon-preview", cat:"image", icon:"😀", name:"Free Icon Previewer Online",
desc:"Symbols + HTML codes", how:"Search 120 built-in unicode symbols, click one to see its HTML entity and CSS code, then copy what you need.",
render:function(box){
  box.innerHTML = '<h2>😀 Icon Previewer</h2><label>Search symbols</label><input type="text" id="t-q" placeholder="e.g. star, arrow, heart"><div id="t-grid" style="display:flex;flex-wrap:wrap;gap:6px;margin:12px 0"></div><div class="tool-out" id="t-out"></div><div class="row" id="t-cbtns" style="display:none"><button class="tool-btn ghost" id="t-c1">Copy Char</button><button class="tool-btn ghost" id="t-c2">Copy HTML Entity</button><button class="tool-btn ghost" id="t-c3">Copy CSS Code</button></div><p class="tool-note">120 built-in unicode symbols — no downloads, no fonts needed.</p>';
  var SYM=[
  ["←","left arrow"],["↑","up arrow"],["→","right arrow"],["↓","down arrow"],["↔","left right arrow"],["↕","up down arrow"],["↖","north west arrow"],["↗","north east arrow"],["↘","south east arrow"],["↙","south west arrow"],["⇦","left double arrow"],["⇧","up double arrow"],["⇨","right double arrow"],["⇩","down double arrow"],["⟵","long left arrow"],["⟶","long right arrow"],
  ["★","black star"],["☆","white star"],["✦","black four pointed star"],["✧","white four pointed star"],["❤","heavy black heart"],["♥","black heart suit"],["♡","white heart suit"],["♦","black diamond suit"],["♢","white diamond suit"],["♣","black club suit"],["♠","black spade suit"],["⚝","outlined star"],
  ["☀","sun"],["☁","cloud"],["☂","umbrella"],["☃","snowman"],["❄","snowflake"],["⚡","lightning bolt"],["☾","crescent moon"],["☽","first quarter moon"],
  ["●","black circle"],["○","white circle"],["■","black square"],["□","white square"],["▲","black up triangle"],["△","white up triangle"],["▼","black down triangle"],["▽","white down triangle"],["◆","black diamond"],["◇","white diamond"],["⬛","black large square"],["⬜","white large square"],
  ["✓","check mark"],["✔","heavy check mark"],["✕","multiplication x"],["✖","heavy multiplication x"],["⊕","circled plus"],["⊖","circled minus"],
  ["$","dollar sign"],["€","euro sign"],["£","pound sign"],["¥","yen sign"],["₹","rupee sign"],["₿","bitcoin sign"],
  ["±","plus minus"],["×","multiply"],["÷","divide"],["=","equals"],["≠","not equal"],["≤","less or equal"],["≥","greater or equal"],["√","square root"],["∞","infinity"],["π","pi"],["∑","summation"],["∏","product"],
  ["♪","eighth note"],["♫","beamed eighth notes"],["♬","beamed sixteenth notes"],["♩","quarter note"],
  ["☎","telephone"],["✉","envelope"],["⚙","gear"],["✂","scissors"],["✏","pencil"],["⌂","house"],["⌘","command key"],["⚠","warning sign"],["♻","recycle"],["⚓","anchor"],["✈","airplane"],["☕","coffee"],
  ["«","left guillemet"],["»","right guillemet"],["‹","single left guillemet"],["›","single right guillemet"],["•","bullet"],["…","ellipsis"],["—","em dash"],["–","en dash"],["§","section sign"],["¶","pilcrow"],["©","copyright"],["®","registered"],
  ["™","trademark"],["°","degree"],["⌛","hourglass"],["⏰","alarm clock"],["⚐","white flag"],["⚑","black flag"],["⚛","atom"],["☢","radioactive"],["☣","biohazard"],["☯","yin yang"],["⌨","keyboard"],["⏻","power symbol"],
  ["♔","white king"],["♕","white queen"],["♖","white rook"],["♗","white bishop"],["♘","white knight"],["♙","white pawn"],["♚","black king"],["♛","black queen"]
  ];
  function drawGrid(q){
    q=(q||"").toLowerCase();
    var html="";
    SYM.forEach(function(s,i){
      if(!q||s[1].indexOf(q)!==-1||s[0].indexOf(q)!==-1)
        html+='<span data-i="'+i+'" style="font-size:26px;width:46px;height:46px;display:flex;align-items:center;justify-content:center;border:1px solid #ffffff22;border-radius:8px;cursor:pointer" title="'+s[1]+'">'+s[0]+'</span>';
    });
    el("t-grid").innerHTML=html||"No matches.";
  }
  el("t-grid").onclick=function(e){
    var t=e.target, ai=t.getAttribute?t.getAttribute("data-i"):null;
    if(ai===null||ai===undefined)return;
    var s=SYM[+ai];
    var cp=s[0].codePointAt(0).toString(16).toUpperCase();
    var ent="&#x"+cp+";", cssc="\\"+cp;
    outHTML(box,"Symbol: "+s[0]+"\nName: "+s[1]+"\nHTML entity: "+ent+"\nCSS content: \""+cssc+"\"");
    el("t-cbtns").style.display="";
    el("t-c1").onclick=function(){copyText(s[0],el("t-c1"));};
    el("t-c2").onclick=function(){copyText(ent,el("t-c2"));};
    el("t-c3").onclick=function(){copyText(cssc,el("t-c3"));};
  };
  el("t-q").oninput=function(){drawGrid(el("t-q").value);};
  drawGrid("");
}});

TOOLS.push({ id:"gradient-anim", cat:"image", icon:"🌈", name:"Free Animated Gradient CSS Online",
desc:"Animated backgrounds", how:"Pick three colors, an angle and a speed to preview the animated gradient, then copy the CSS.",
render:function(box){
  box.innerHTML = '<h2>🌈 Animated Gradient CSS</h2><div class="row"><div><label>Color 1</label><input type="color" id="t-c1" value="#6366f1"></div><div><label>Color 2</label><input type="color" id="t-c2" value="#ec4899"></div><div><label>Color 3</label><input type="color" id="t-c3" value="#f59e0b"></div></div><label>Angle: <span id="t-av">135</span>°</label><input type="range" id="t-a" min="0" max="360" value="135"><label>Speed: <span id="t-sv">8</span>s</label><input type="range" id="t-s" min="3" max="20" value="8"><div id="t-prev" style="margin:14px 0;height:160px;border-radius:12px"></div><div class="tool-out" id="t-out"></div><button class="tool-btn ghost" id="t-copy">Copy CSS</button>';
  var css="";
  function go(){
    var c1=el("t-c1").value, c2=el("t-c2").value, c3=el("t-c3").value, a=el("t-a").value, s=el("t-s").value;
    el("t-av").textContent=a; el("t-sv").textContent=s;
    var bg="linear-gradient("+a+"deg,"+c1+","+c2+","+c3+")";
    var p=el("t-prev");
    p.style.backgroundImage=bg; p.style.backgroundSize="300% 300%";
    p.style.animation="none"; void p.offsetWidth;
    p.style.animation="gradAnim "+s+"s ease infinite";
    if(!document.getElementById("t-grad-kf")){
      var st=document.createElement("style"); st.id="t-grad-kf";
      st.textContent="@keyframes gradAnim{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}";
      document.head.appendChild(st);
    }
    css=".animated-gradient {\n  background: "+bg+";\n  background-size: 300% 300%;\n  animation: gradientShift "+s+"s ease infinite;\n}\n@keyframes gradientShift {\n  0% { background-position: 0% 50%; }\n  50% { background-position: 100% 50%; }\n  100% { background-position: 0% 50%; }\n}";
    outHTML(box,css);
  }
  ["t-c1","t-c2","t-c3"].forEach(function(id){el(id).oninput=go;});
  el("t-a").oninput=go; el("t-s").oninput=go;
  el("t-copy").onclick=function(){copyText(css,el("t-copy"));};
  go();
}});

TOOLS.push({ id:"text-shadow", cat:"image", icon:"✨", name:"Free Text Shadow Generator Online",
desc:"Glow & shadow CSS", how:"Type text, adjust offsets and blur, press Add Layer to stack shadows, then copy the CSS.",
render:function(box){
  box.innerHTML = '<h2>✨ Text Shadow Generator</h2><label>Text</label><input type="text" id="t-t" value="Hello World"><div class="row"><div><label>X offset: <span id="t-xv">2</span></label><input type="range" id="t-x" min="-20" max="20" value="2"></div><div><label>Y offset: <span id="t-yv">2</span></label><input type="range" id="t-y" min="-20" max="20" value="2"></div></div><div class="row"><div><label>Blur: <span id="t-bv">4</span></label><input type="range" id="t-b" min="0" max="40" value="4"></div><div><label>Shadow color</label><input type="color" id="t-c" value="#000000"></div></div><div class="row"><button class="tool-btn" id="t-add">Add Layer</button><button class="tool-btn ghost" id="t-clear">Clear Layers</button></div><div id="t-prev" style="margin:14px 0;padding:24px;font-size:40px;font-weight:700;text-align:center;border-radius:12px;background:#1e1e2e;color:#fff"></div><div id="t-list"></div><div class="tool-out" id="t-out"></div><button class="tool-btn ghost" id="t-copy">Copy CSS</button>';
  var layers=[], css="";
  function render(){
    el("t-prev").textContent=el("t-t").value||"Hello World";
    var sh=layers.map(function(l){return l.x+"px "+l.y+"px "+l.b+"px "+l.c;}).join(", ");
    el("t-prev").style.textShadow=sh||"none";
    css=".glow-text {\n  text-shadow: "+(sh||"none")+";\n}";
    outHTML(box,css+"\nLayers: "+layers.length);
  }
  function drawList(){
    el("t-list").innerHTML=layers.map(function(l,i){
      return '<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #ffffff11"><span style="font-size:.85rem">Layer '+(i+1)+': '+l.x+'px '+l.y+'px '+l.b+'px <span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:'+l.c+';vertical-align:middle"></span></span><button class="tool-btn ghost" data-rm="'+i+'" style="padding:4px 10px;font-size:.8rem">Remove</button></div>';
    }).join("");
  }
  [["t-x","t-xv"],["t-y","t-yv"],["t-b","t-bv"]].forEach(function(p){el(p[0]).oninput=function(){el(p[1]).textContent=el(p[0]).value;};});
  el("t-t").oninput=render;
  el("t-add").onclick=function(){
    layers.push({x:+el("t-x").value,y:+el("t-y").value,b:+el("t-b").value,c:el("t-c").value});
    drawList(); render();
  };
  el("t-clear").onclick=function(){layers=[]; drawList(); render();};
  el("t-list").onclick=function(e){
    var i=e.target&&e.target.getAttribute?e.target.getAttribute("data-rm"):null;
    if(i===null||i===undefined)return;
    layers.splice(+i,1); drawList(); render();
  };
  el("t-copy").onclick=function(){copyText(css,el("t-copy"));};
  render();
}});

TOOLS.push({ id:"avatar-gen", cat:"image", icon:"🧑", name:"Free Avatar Generator Online",
desc:"DiceBear API avatars", how:"Pick a style, type any seed word and press Generate. Avatars are AI-drawn by DiceBear — this is not face-swap.",
render:function(box){
  box.innerHTML = '<h2>🤖 Avatar Generator</h2><p class="tool-note">Avatars are generated by the free DiceBear API. This is not face-swap — no real face is used or changed.</p><label>Style</label><select id="t-s"><option value="adventurer">Adventurer</option><option value="bottts">Bottts (robot)</option><option value="personas">Personas</option><option value="fun-emoji">Fun Emoji</option><option value="lorelei">Lorelei</option></select><label>Seed (any word)</label><input type="text" id="t-seed" placeholder="e.g. alex123"><button class="tool-btn" id="t-go">Generate</button><div id="t-prev" style="text-align:center;margin:14px 0"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download SVG</button>';
  var url="";
  el("t-go").onclick=function(){
    var st=el("t-s").value, seed=el("t-seed").value.trim()||("user"+Math.floor(Math.random()*9999));
    url="https://api.dicebear.com/9.x/"+st+"/svg?seed="+encodeURIComponent(seed);
    el("t-prev").innerHTML='<img src="'+url+'" alt="Generated avatar" style="width:180px;height:180px;border-radius:50%;background:#fff">';
    var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(url,"avatar.svg");};
  };
  el("t-go").click();
}});

TOOLS.push({ id:"screen-res", cat:"site", icon:"🖥️", name:"Free Screen Resolution Checker Online",
desc:"Screen + DPR info", how:"Open to see your screen size, pixel ratio, viewport and orientation. Updates live when you resize.",
render:function(box){
  box.innerHTML = '<h2>🖥️ Screen Resolution Checker</h2><div class="tool-out" id="t-out"></div><p class="tool-note">Updates automatically when the window is resized.</p>';
  function info(){
    var o=(screen.orientation&&screen.orientation.type)||"n/a";
    return "Screen: "+screen.width+" x "+screen.height+" px\nDevice pixel ratio: "+(window.devicePixelRatio||1)+"\nViewport: "+window.innerWidth+" x "+window.innerHeight+" px\nColor depth: "+screen.colorDepth+"-bit\nOrientation: "+o;
  }
  function upd(){outHTML(box,info());}
  upd();
  window.addEventListener("resize",upd);
  box._cleanup=function(){window.removeEventListener("resize",upd);};
}});

TOOLS.push({ id:"viewport", cat:"site", icon:"📱", name:"Free Viewport Tester Online",
desc:"Responsive size reference", how:"See your current viewport live plus scaled outlines of common device sizes. Reference only — this page cannot resize your window.",
render:function(box){
  box.innerHTML = '<h2>📱 Viewport Tester</h2><p class="tool-note">Reference sizes only — a web page cannot resize your browser window.</p><div class="tool-out" id="t-out"></div><div id="t-cards" style="display:flex;flex-wrap:wrap;gap:14px;margin-top:12px;align-items:flex-end"></div>';
  var DEV=[["iPhone 14","390x844"],["Pixel 8","412x915"],["iPad","820x1180"],["Laptop","1366x768"],["Desktop","1920x1080"]];
  function draw(){
    outHTML(box,"Your viewport: "+window.innerWidth+" x "+window.innerHeight+" px");
    var html="";
    DEV.forEach(function(d){
      var dims=d[1].split("x"), w=+dims[0], h=+dims[1];
      var sc=140/Math.max(w,h), sw=Math.round(w*sc), sh=Math.round(h*sc);
      html+='<div style="text-align:center"><div style="font-size:.8rem;margin-bottom:4px">'+d[0]+'<br>'+w+'x'+h+'</div><div style="width:'+sw+'px;height:'+sh+'px;border:2px solid var(--accent);border-radius:'+Math.round(sw/12)+'px;margin:0 auto"></div></div>';
    });
    el("t-cards").innerHTML=html;
  }
  draw();
  window.addEventListener("resize",draw);
  box._cleanup=function(){window.removeEventListener("resize",draw);};
}});

/* US AI Free Online Tools — mega text pack 2a: 9 text/language tools, all client-side. */

TOOLS.push({ id:"morse", cat:"text", icon:"📻", name:"Free Morse Code Translator Online",
desc:"Text to morse and back", how:"Type text or morse code, pick a direction and press Translate. Use Play Morse to hear the beeps.",
render:function(box){
  box.innerHTML = '<h2>📻 Morse Code Translator</h2><label>Text or morse code (separate letters with spaces, words with /)</label><textarea id="t-in" placeholder="Hello world"></textarea><label>Direction</label><select id="t-d"><option value="t2m">Text → Morse</option><option value="m2t">Morse → Text</option></select><button class="tool-btn" id="t-go">Translate</button> <button class="tool-btn ghost" id="t-play">▶ Play Morse</button><div class="tool-out" id="t-out"></div>';
  var M = {A:".-",B:"-...",C:"-.-.",D:"-..",E:".",F:"..-.",G:"--.",H:"....",I:"..",J:".---",K:"-.-",L:".-..",M:"--",N:"-.",O:"---",P:".--.",Q:"--.-",R:".-.",S:"...",T:"-",U:"..-",V:"...-",W:".--",X:"-..-",Y:"-.--",Z:"--..","0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.",",":"--..--",".":".-.-.-","?":"..--..","'":".----.","!":"-.-.--","/":"-..-.","(": "-.--.",")":"-.--.-","&":".-...",";":"-.-.-.",":":"---...","=":"-...-","+":".-.-.","-":"-....-","_":"..--.-",'"':".-..-.","$":"...-..-","@":".--.-."};
  var R = {}; Object.keys(M).forEach(function(k){ R[M[k]] = k; });
  var last = "";
  function textToMorse(t){
    return t.toUpperCase().split("").map(function(c){
      if(c === " ") return "/";
      return M[c] || "";
    }).filter(function(x){ return x !== ""; }).join(" ");
  }
  function morseToText(t){
    return t.trim().split(/\s+/).map(function(c){
      if(c === "/" || c === "|") return " ";
      return R[c] || "�";
    }).join("").replace(/[ ]+/g, " ");
  }
  el("t-go").onclick = function(){
    var inp = el("t-in").value.trim(); if(!inp){ outHTML(box,"Enter some text first."); return; }
    last = el("t-d").value === "t2m" ? textToMorse(inp) : morseToText(inp);
    outHTML(box, esc(last));
  };
  el("t-play").onclick = function(){
    if(box._cleanup){ box._cleanup(); }
    var code = last;
    if(!code){
      var inp = el("t-in").value.trim();
      if(!inp){ outHTML(box,"Enter some text first."); return; }
      code = el("t-d").value === "t2m" ? textToMorse(inp) : inp;
      last = code;
    }
    try{
      var AC = window.AudioContext || window.webkitAudioContext;
      var ctx = new AC();
      var t = ctx.currentTime + 0.15;
      for(var i = 0; i < code.length; i++){
        var ch = code.charAt(i);
        if(ch === "." || ch === "-"){
          var dur = ch === "." ? 0.08 : 0.24;
          var o = ctx.createOscillator(), g = ctx.createGain();
          o.frequency.value = 600; o.connect(g); g.connect(ctx.destination);
          g.gain.setValueAtTime(0.001, t);
          g.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
          g.gain.exponentialRampToValueAtTime(0.001, t + dur);
          o.start(t); o.stop(t + dur + 0.02);
          t += dur + 0.08;
        } else if(ch === " "){ t += 0.24; } else if(ch === "/"){ t += 0.56; }
      }
      var live = true;
      var endTimer = setTimeout(function(){ if(live){ try{ ctx.close(); }catch(e){} live = false; box._cleanup = null; } }, Math.max(0,(t - ctx.currentTime + 0.5)) * 1000);
      box._cleanup = function(){ live = false; clearTimeout(endTimer); try{ ctx.close(); }catch(e){} box._cleanup = null; };
      outHTML(box, esc(code) + "\n\n🔊 Playing morse... (press Play again to stop)");
    }catch(e){ outHTML(box, "Audio is not supported in this browser."); }
  };
}});

TOOLS.push({ id:"nato", cat:"text", icon:"✈️", name:"Free NATO Phonetic Speller Online",
desc:"Alpha Bravo Charlie", how:"Type any text and press Spell It to get the NATO phonetic spelling, one word per line.",
render:function(box){
  box.innerHTML = '<h2>✈️ NATO Phonetic Speller</h2><label>Text to spell</label><input type="text" id="t-in" placeholder="e.g. Hello World 123"><button class="tool-btn" id="t-go">Spell It</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  var N = {A:"Alfa",B:"Bravo",C:"Charlie",D:"Delta",E:"Echo",F:"Foxtrot",G:"Golf",H:"Hotel",I:"India",J:"Juliett",K:"Kilo",L:"Lima",M:"Mike",N:"November",O:"Oscar",P:"Papa",Q:"Quebec",R:"Romeo",S:"Sierra",T:"Tango",U:"Uniform",V:"Victor",W:"Whiskey",X:"Xray",Y:"Yankee",Z:"Zulu","0":"Zero","1":"One","2":"Two","3":"Three","4":"Four","5":"Five","6":"Six","7":"Seven","8":"Eight","9":"Nine"};
  el("t-go").onclick = function(){
    var inp = el("t-in").value.trim(); if(!inp){ outHTML(box,"Enter some text."); return; }
    var out = [];
    for(var i = 0; i < inp.length; i++){
      var c = inp.charAt(i);
      if(c === " "){ out.push("(space)"); continue; }
      var w = N[c.toUpperCase()];
      out.push(w ? w : c);
    }
    var res = out.join("\n");
    outHTML(box, esc(res));
    var cp = el("t-copy"); cp.style.display = "";
    cp.onclick = function(){ copyText(res, cp); };
  };
}});

TOOLS.push({ id:"upsidedown", cat:"text", icon:"🙃", name:"Free Upside-Down Text Generator Online",
desc:"Flip text upside down", how:"Type your text and press Flip to turn it upside down, then copy and paste it anywhere.",
render:function(box){
  box.innerHTML = '<h2>🙃 Upside-Down Text</h2><label>Your text</label><textarea id="t-in" placeholder="Hello world!"></textarea><button class="tool-btn" id="t-go">Flip It</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  var F = {a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"l",m:"ɯ",n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z",A:"∀",B:"ᙠ",C:"Ɔ",D:"ᗡ",E:"Ǝ",F:"Ⅎ",G:"⅁",H:"H",I:"I",J:"ᒿ",K:"ꓘ",L:"⅂",M:"W",N:"N",O:"O",P:"Ԁ",Q:"Ό",R:"ᴚ",S:"S",T:"⊥",U:"∩",V:"Λ",W:"M",X:"X",Y:"⅄",Z:"Z","0":"0","1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"ㄥ","8":"8","9":"6",".":"˙",",":"'","?":"¿","!":"¡",'"':"„","'":",","(":")",")":"(","[":"]","]":"[","{":"}","}":"{","<":">",">":"<","_":"‾","&":"⅋"};
  el("t-go").onclick = function(){
    var inp = el("t-in").value; if(!inp){ outHTML(box,"Enter some text."); return; }
    var res = inp.split("").reverse().map(function(c){ return F[c] || c; }).join("");
    outHTML(box, esc(res));
    var cp = el("t-copy"); cp.style.display = "";
    cp.onclick = function(){ copyText(res, cp); };
  };
}});

TOOLS.push({ id:"zalgo", cat:"text", icon:"👹", name:"Free Zalgo Glitch Text Generator Online",
desc:"Cursed glitch text", how:"Type text, set the glitch intensity from 1 to 3 and press Glitch It to create cursed text.",
render:function(box){
  box.innerHTML = '<h2>👹 Zalgo Glitch Text</h2><label>Your text</label><input type="text" id="t-in" placeholder="e.g. hello"><label>Intensity: <span id="t-iv">2</span></label><input type="range" id="t-i" min="1" max="3" value="2" step="1" style="width:100%"><button class="tool-btn" id="t-go">Glitch It</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-i").oninput = function(){ el("t-iv").textContent = el("t-i").value; };
  el("t-go").onclick = function(){
    var inp = el("t-in").value; if(!inp){ outHTML(box,"Enter some text."); return; }
    var n = parseInt(el("t-i").value, 10);
    var res = "";
    for(var i = 0; i < inp.length; i++){
      res += inp.charAt(i);
      var j;
      for(j = 0; j < n; j++){ res += String.fromCharCode(0x0300 + Math.floor(Math.random() * 0x47)); }
      for(j = 0; j < n; j++){ res += String.fromCharCode(0x0347 + Math.floor(Math.random() * 0x09)); }
      for(j = 0; j < n; j++){ res += String.fromCharCode(0x0350 + Math.floor(Math.random() * 0x20)); }
    }
    outHTML(box, esc(res));
    var cp = el("t-copy"); cp.style.display = "";
    cp.onclick = function(){ copyText(res, cp); };
  };
}});

TOOLS.push({ id:"fake-data", cat:"text", icon:"🪞", name:"Free Fake Test Data Generator Online",
desc:"Names, addresses, test cards", how:"Pick how many profiles you need and press Generate for random fake test data for forms and apps.",
render:function(box){
  box.innerHTML = '<h2>🧪 Fake Test Data</h2><label>Number of profiles (1–10)</label><input type="number" id="t-n" min="1" max="10" value="3"><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out" style="white-space:normal"></div>';
  var first = ["Ali","Ahmed","Sara","Fatima","John","Emma","Michael","Ayesha","Bilal","Zara","David","Maria","Usman","Hira","James","Sofia","Omar","Lina","Chris","Nadia"];
  var lastn = ["Khan","Ahmed","Malik","Smith","Johnson","Brown","Garcia","Raza","Shah","Hussain","Butt","Davis","Wilson","Farooq","Aslam","Iqbal","Nawaz","Sheikh","Akram","Ali"];
  var streets = ["Main Street","Oak Avenue","Maple Road","Sunset Boulevard","River Lane","Hill Drive","Cedar Court","Park Avenue","Elm Street","Lake View Road"];
  var cities = ["Lahore","Karachi","Islamabad","New York","London","Dubai","Toronto","Sydney","Chicago","Houston"];
  function pick(a){ return a[Math.floor(Math.random() * a.length)]; }
  function digits(n){ var s = ""; for(var i = 0; i < n; i++){ s += Math.floor(Math.random() * 10); } return s; }
  el("t-go").onclick = function(){
    var n = parseInt(el("t-n").value, 10);
    if(isNaN(n) || n < 1) n = 1; if(n > 10) n = 10; el("t-n").value = n;
    var h = "";
    for(var i = 0; i < n; i++){
      var fn = pick(first), ln = pick(lastn);
      h += '<div style="border:1px solid #333;border-radius:8px;padding:10px;margin:10px 0">';
      h += "<b>👤 " + esc(fn + " " + ln) + "</b><br>";
      h += "📍 " + esc((100 + Math.floor(Math.random() * 8900)) + " " + pick(streets) + ", " + pick(cities)) + "<br>";
      h += "📞 " + esc("+1 (555) " + digits(3) + "-" + digits(4)) + "<br>";
      h += "✉️ " + esc(fn.toLowerCase() + "." + ln.toLowerCase() + digits(2) + "@example.com");
      h += "</div>";
    }
    h += '<div style="border:2px dashed #b45309;border-radius:8px;padding:10px;margin:12px 0">';
    h += "<b>💳 Payment test cards</b><br>";
    h += "<b style='color:#ef4444'>⚠ FOR TESTING ONLY — these are publicly documented test numbers, not real cards.</b><br><br>";
    h += "Visa test: <b>4111 1111 1111 1111</b> (any future expiry, any CVV)<br>";
    h += "Mastercard test: <b>5555 5555 5555 4444</b> (any future expiry, any CVV)<br>";
    h += "<span style='font-size:0.9em'>Use these only in sandbox/test checkouts (e.g. Stripe test mode). Never use real card numbers for testing.</span>";
    h += "</div>";
    outHTML(box, h);
  };
}});

TOOLS.push({ id:"citation", cat:"text", icon:"📚", name:"Free Citation Generator Online",
desc:"APA, MLA, Chicago", how:"Fill in the source details, choose the source type and press Generate for APA, MLA and Chicago citations.",
render:function(box){
  box.innerHTML = '<h2>📚 Citation Generator</h2><label>Author(s) — First Last, separate multiple with ;</label><input type="text" id="t-a" placeholder="e.g. John Smith"><label>Year</label><input type="text" id="t-y" placeholder="e.g. 2024"><label>Title</label><input type="text" id="t-t" placeholder="e.g. The Craft of Writing"><label>Publisher / Website / Journal</label><input type="text" id="t-p" placeholder="e.g. Craft Press"><label>URL (optional, for websites/articles)</label><input type="text" id="t-u" placeholder="https://..."><label>Source type</label><select id="t-s"><option value="book">Book</option><option value="website">Website</option><option value="article">Journal article</option></select><button class="tool-btn" id="t-go">Generate Citations</button><div class="tool-out" id="t-out" style="white-space:normal"></div>';
  function authors(raw, style){
    var parts = raw.split(";").map(function(a){ return a.trim(); }).filter(function(a){ return a; });
    function flip(a){
      var bits = a.split(/\s+/);
      if(bits.length < 2) return a;
      return bits[bits.length - 1] + ", " + bits.slice(0, -1).join(" ");
    }
    function initial(a){
      var bits = a.split(/\s+/);
      if(bits.length < 2) return a;
      return bits[bits.length - 1] + ", " + bits.slice(0, -1).map(function(b){ return b.charAt(0) + "."; }).join(" ");
    }
    if(style === "apa"){
      var ap = parts.map(initial);
      if(ap.length > 1) ap[ap.length - 1] = "& " + ap[ap.length - 1];
      return ap.join(", ");
    }
    if(style === "mla"){
      if(parts.length > 2) return flip(parts[0]) + ", et al";
      if(parts.length === 2) return flip(parts[0]) + ", and " + parts[1];
      return flip(parts[0] || "");
    }
    var ch = parts.map(flip);
    if(ch.length > 1) ch[ch.length - 1] = "and " + ch[ch.length - 1];
    return ch.join(", ");
  }
  el("t-go").onclick = function(){
    var a = el("t-a").value.trim(), y = el("t-y").value.trim() || "n.d.", t = el("t-t").value.trim(),
        p = el("t-p").value.trim(), u = el("t-u").value.trim(), s = el("t-s").value;
    if(!a || !t){ outHTML(box, "Author and title are required."); return; }
    var apa, mla, chi;
    if(s === "website"){
      apa = authors(a,"apa") + " (" + y + "). " + t + ". " + p + (u ? ". " + u : "") + ".";
      mla = authors(a,"mla") + '. "' + t + '." ' + p + ", " + y + (u ? ", " + u : "") + ".";
      chi = authors(a,"chi") + '. "' + t + '." ' + p + ", " + y + (u ? ". " + u : "") + ".";
    } else if(s === "article"){
      apa = authors(a,"apa") + " (" + y + "). " + t + ". " + p + (u ? ". " + u : "") + ".";
      mla = authors(a,"mla") + '. "' + t + '." ' + p + ", " + y + (u ? ", " + u : "") + ".";
      chi = authors(a,"chi") + '. "' + t + '." ' + p + " (" + y + ")" + (u ? ": " + u : "") + ".";
    } else {
      apa = authors(a,"apa") + " (" + y + "). " + t + ". " + p + ".";
      mla = authors(a,"mla") + ". " + t + ". " + p + ", " + y + ".";
      chi = authors(a,"chi") + ". " + t + ". " + p + ", " + y + ".";
    }
    var h = '<div style="margin:8px 0"><b>APA (7th)</b><br>' + esc(apa) + '<br><button class="tool-btn ghost" id="t-c1" style="margin-top:6px">Copy APA</button></div>';
    h += '<div style="margin:8px 0"><b>MLA (9th)</b><br>' + esc(mla) + '<br><button class="tool-btn ghost" id="t-c2" style="margin-top:6px">Copy MLA</button></div>';
    h += '<div style="margin:8px 0"><b>Chicago</b><br>' + esc(chi) + '<br><button class="tool-btn ghost" id="t-c3" style="margin-top:6px">Copy Chicago</button></div>';
    h += '<p class="tool-note">Auto-generated — double-check against the official style guide before submitting.</p>';
    outHTML(box, h);
    el("t-c1").onclick = function(){ copyText(apa, el("t-c1")); };
    el("t-c2").onclick = function(){ copyText(mla, el("t-c2")); };
    el("t-c3").onclick = function(){ copyText(chi, el("t-c3")); };
  };
}});

TOOLS.push({ id:"rhyme", cat:"text", icon:"🎙️", name:"Free Rhyming Dictionary Online",
desc:"Find rhymes via API", how:"Type a word and press Find Rhymes to get a list of rhyming words from a free dictionary API.",
render:function(box){
  box.innerHTML = '<h2>🎵 Rhyming Dictionary</h2><label>Word</label><input type="text" id="t-in" placeholder="e.g. light"><button class="tool-btn" id="t-go">Find Rhymes</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-go").onclick = function(){
    var w = el("t-in").value.trim().split(/\s+/)[0];
    if(!w){ outHTML(box, "Enter a word."); return; }
    el("t-copy").style.display = "none";
    outHTML(box, "Loading rhymes for \"" + esc(w) + "\"...");
    fetch("https://api.datamuse.com/words?rel_rhy=" + encodeURIComponent(w) + "&max=40")
      .then(function(r){ if(!r.ok) throw new Error("bad"); return r.json(); })
      .then(function(d){
        if(!d || !d.length){ outHTML(box, "No rhymes found for \"" + esc(w) + "\" — try a simpler word."); return; }
        var words = d.map(function(x){ return x.word; });
        var res = words.join(", ");
        outHTML(box, "🎵 Rhymes for \"" + esc(w) + "\" (" + words.length + "):\n\n" + esc(res));
        var cp = el("t-copy"); cp.style.display = "";
        cp.onclick = function(){ copyText(res, cp); };
      })
      .catch(function(){ outHTML(box, "Could not reach the rhyme service. Check your connection and try again."); });
  };
}});

TOOLS.push({ id:"syllable", cat:"text", icon:"🗣️", name:"Free Syllable Counter Online",
desc:"Count syllables per word", how:"Paste your text and press Count Syllables for per-word counts, totals and the average per word.",
render:function(box){
  box.innerHTML = '<h2>🗣️ Syllable Counter</h2><label>Your text</label><textarea id="t-in" placeholder="Paste a sentence or paragraph..."></textarea><button class="tool-btn" id="t-go">Count Syllables</button><div class="tool-out" id="t-out"></div>';
  function countSyl(word){
    var w = String(word).toLowerCase().replace(/[^a-z]/g, "");
    if(w.length === 0) return 0;
    if(w.length <= 3) return 1;
    var extra = 0;
    if(/[td]ed$/.test(w)) extra = 1;                    // wanted, added
    if(/(s|x|z|c|ch|sh)es$/.test(w)) extra = 1;         // boxes, watches
    w = w.replace(/e$/, "");                            // silent e
    var g = w.match(/[aeiouy]+/g);
    return Math.max(1, (g ? g.length : 0) + extra);
  }
  el("t-go").onclick = function(){
    var inp = el("t-in").value.trim(); if(!inp){ outHTML(box, "Enter some text."); return; }
    var words = inp.split(/\s+/).filter(function(x){ return /[a-zA-Z]/.test(x); });
    if(!words.length){ outHTML(box, "No words found."); return; }
    var total = 0;
    var lines = words.map(function(w){
      var n = countSyl(w);
      total += n;
      return w + " — " + n;
    });
    var avg = (total / words.length).toFixed(2);
    var h = "📊 Total syllables: <b>" + total + "</b>\n";
    h += "📝 Total words: <b>" + words.length + "</b>\n";
    h += "⚖️ Average per word: <b>" + avg + "</b>\n\n";
    h += lines.join("\n");
    h += "\n\n<small>Heuristic counter — may differ on unusual words.</small>";
    outHTML(box, h);
  };
}});

TOOLS.push({ id:"thesaurus", cat:"text", icon:"📕", name:"Free Thesaurus Online",
desc:"Synonyms via API", how:"Type a word and press Look Up for synonyms and antonyms from a free dictionary API.",
render:function(box){
  box.innerHTML = '<h2>📖 Thesaurus</h2><label>Word</label><input type="text" id="t-in" placeholder="e.g. happy"><button class="tool-btn" id="t-go">Look Up</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var w = el("t-in").value.trim().split(/\s+/)[0];
    if(!w){ outHTML(box, "Enter a word."); return; }
    outHTML(box, "Looking up \"" + esc(w) + "\"...");
    var base = "https://api.datamuse.com/words?max=30&";
    Promise.all([
      fetch(base + "rel_syn=" + encodeURIComponent(w)).then(function(r){ if(!r.ok) throw new Error("bad"); return r.json(); }),
      fetch(base + "rel_ant=" + encodeURIComponent(w)).then(function(r){ if(!r.ok) throw new Error("bad"); return r.json(); })
    ]).then(function(res){
      var syn = res[0].map(function(x){ return x.word; });
      var ant = res[1].map(function(x){ return x.word; });
      if(!syn.length && !ant.length){ outHTML(box, "No synonyms or antonyms found for \"" + esc(w) + "\" — try another word."); return; }
      var h = "📖 <b>\"" + esc(w) + "\"</b>\n\n";
      h += "✅ Synonyms (" + syn.length + "):\n" + (syn.length ? esc(syn.join(", ")) : "—") + "\n\n";
      h += "❌ Antonyms (" + ant.length + "):\n" + (ant.length ? esc(ant.join(", ")) : "—");
      outHTML(box, h);
    }).catch(function(){ outHTML(box, "Could not reach the thesaurus service. Check your connection and try again."); });
  };
}});

/* US AI text/utility tools — batch 2b (10 tools, client-side, ES5 only). */

TOOLS.push({ id:"email-sig", cat:"text", icon:"✉️", name:"Free Email Signature Generator Online",
desc:"HTML signature maker", how:"Fill in your name, title, company and contact details, then press Generate Signature to preview and copy the HTML signature.",
render:function(box){
  box.innerHTML = '<h2>✉️ Email Signature Generator</h2><label>Full name</label><input type="text" id="t-n" placeholder="e.g. Ali Khan"><label>Job title</label><input type="text" id="t-j" placeholder="e.g. Marketing Manager"><label>Company</label><input type="text" id="t-c" placeholder="e.g. US AI"><label>Phone</label><input type="text" id="t-p" placeholder="e.g. +92 300 1234567"><label>Email</label><input type="text" id="t-e" placeholder="you@example.com"><label>Website</label><input type="text" id="t-w" placeholder="https://example.com"><button class="tool-btn" id="t-go">Generate Signature</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy HTML</button><p class="tool-note">Paste the copied HTML into Gmail → Settings → Signature (use the &lt;&gt; HTML / rich-text paste option). This is a basic template — edit colours or layout in your mail client.</p>';
  el("t-go").onclick = function(){
    var n=esc(el("t-n").value.trim())||"Your Name", j=esc(el("t-j").value.trim()), c=esc(el("t-c").value.trim()),
        p=esc(el("t-p").value.trim()), e=esc(el("t-e").value.trim()), w=esc(el("t-w").value.trim());
    var sig = '<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;color:#222222;"><tr><td style="padding-right:14px;border-right:3px solid #4f46e5;vertical-align:top;">'
      + '<div style="font-size:18px;font-weight:bold;color:#111827;">'+n+'</div>'
      + (j?'<div style="color:#4f46e5;font-size:13px;">'+j+'</div>':'')
      + (c?'<div style="color:#6b7280;font-size:13px;">'+c+'</div>':'')
      + '</td><td style="padding-left:14px;vertical-align:top;">'
      + (p?'<div>📞 '+p+'</div>':'')
      + (e?'<div>✉️ <a href="mailto:'+e+'" style="color:#4f46e5;">'+e+'</a></div>':'')
      + (w?'<div>🌐 <a href="'+w+'" style="color:#4f46e5;">'+w.replace(/^https?:\/\//,'')+'</a></div>':'')
      + '</td></tr></table>';
    outHTML(box, '<div style="margin-bottom:10px">'+sig+'</div>');
    var cp=el("t-copy"); cp.style.display=""; cp.onclick=function(){copyText(sig,cp);};
  };
}});

TOOLS.push({ id:"sortlist", cat:"text", icon:"🔽", name:"Free List Sorter Online",
desc:"Alphabetize any list", how:"Paste one item per line, choose a sort mode, then press Sort. Output appears below and can be copied.",
render:function(box){
  box.innerHTML = '<h2>🔤 List Sorter</h2><label>Your list (one item per line)</label><textarea id="t-in" placeholder="apple&#10;Orange&#10;banana"></textarea><label>Sort mode</label><select id="t-m"><option value="az">A → Z</option><option value="za">Z → A</option><option value="num">Numeric (first number in line)</option><option value="len">By length (shortest first)</option></select><label><input type="checkbox" id="t-ci" checked> Case-insensitive</label><button class="tool-btn" id="t-go">Sort</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-go").onclick = function(){
    var lines = el("t-in").value.split("\n").filter(function(l){return l.trim()!=="";});
    if(!lines.length){outHTML(box,"Enter at least one line.");return;}
    var m=el("t-m").value, ci=el("t-ci").checked;
    function key(s){ return ci? s.toLowerCase() : s; }
    function numOf(s){ var mt=s.match(/-?\d+(\.\d+)?/); return mt? parseFloat(mt[0]) : Infinity; }
    lines.sort(function(a,b){
      if(m==="za") return key(b).localeCompare(key(a));
      if(m==="num"){ return numOf(a)-numOf(b); }
      if(m==="len"){ return a.length-b.length; }
      return key(a).localeCompare(key(b));
    });
    var out=lines.join("\n");
    outHTML(box, esc(out)); var cp=el("t-copy"); cp.style.display=""; cp.onclick=function(){copyText(out,cp);};
  };
}});

TOOLS.push({ id:"dedupe-lines", cat:"text", icon:"🧹", name:"Free Duplicate Line Remover Online",
desc:"Remove duplicate lines", how:"Paste text with one item per line, set options, and press Remove Duplicates. Stats show how many duplicates were removed.",
render:function(box){
  box.innerHTML = '<h2>🧹 Duplicate Line Remover</h2><label>Text (one item per line)</label><textarea id="t-in" placeholder="apple&#10;banana&#10;apple&#10;orange"></textarea><label><input type="checkbox" id="t-ci" checked> Case-insensitive</label><label><input type="checkbox" id="t-kb"> Keep blank lines</label><button class="tool-btn" id="t-go">Remove Duplicates</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-go").onclick = function(){
    var lines = el("t-in").value.split("\n");
    if(!lines.length){outHTML(box,"Enter some text.");return;}
    var ci=el("t-ci").checked, kb=el("t-kb").checked, seen={}, uniq=[], removed=0;
    lines.forEach(function(l){
      var t=l.trim();
      if(t==="" && !kb){ return; }
      var k = t==="" ? "\x00blank" : (ci? t.toLowerCase() : t);
      if(seen[k]!==undefined){ removed++; return; }
      seen[k]=1; uniq.push(l);
    });
    var out=uniq.join("\n");
    outHTML(box, esc(out)+"\n\n───\nOriginal lines: "+lines.length+" · Unique: "+uniq.length+" · Removed "+removed+" duplicate(s).");
    var cp=el("t-copy"); cp.style.display=""; cp.onclick=function(){copyText(out,cp);};
  };
}});

TOOLS.push({ id:"linebreak", cat:"text", icon:"↩️", name:"Free Text Line Tools Online",
desc:"Break, split, extract lines", how:"Paste your text, choose an operation, fill the extra field that appears, then press Run.",
render:function(box){
  box.innerHTML = '<h2>✂️ Text Line Tools</h2><label>Text</label><textarea id="t-in" placeholder="Paste text here..."></textarea><label>Operation</label><select id="t-op"><option value="break">Break into lines every N characters</option><option value="split">Split by delimiter into lines</option><option value="extract">Extract lines containing keyword</option><option value="join">Join lines with delimiter</option></select><div id="t-extra"></div><button class="tool-btn" id="t-go">Run</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  function refreshExtra(){
    var op=el("t-op").value, h="";
    if(op==="break") h='<label>Characters per line (N)</label><input type="number" id="t-n" value="40" min="1">';
    else if(op==="split") h='<label>Delimiter</label><input type="text" id="t-d" placeholder="e.g. ; or ,">';
    else if(op==="extract") h='<label>Keyword (case-insensitive)</label><input type="text" id="t-k" placeholder="e.g. error">';
    else h='<label>Delimiter</label><input type="text" id="t-d" placeholder="e.g. , (use \\n for newline)">';
    el("t-extra").innerHTML=h;
  }
  el("t-op").onchange=refreshExtra; refreshExtra();
  el("t-go").onclick = function(){
    var txt=el("t-in").value, op=el("t-op").value, out="";
    if(!txt){outHTML(box,"Enter some text.");return;}
    if(op==="break"){
      var n=parseInt(el("t-n").value,10)||40, res=[];
      for(var i=0;i<txt.length;i+=n) res.push(txt.slice(i,i+n));
      out=res.join("\n");
    } else if(op==="split"){
      var d=el("t-d").value; if(!d){outHTML(box,"Enter a delimiter.");return;}
      out=txt.split(d).map(function(s){return s.trim();}).filter(function(s){return s!=="";}).join("\n");
    } else if(op==="extract"){
      var k=el("t-k").value.toLowerCase(); if(!k){outHTML(box,"Enter a keyword.");return;}
      var got=txt.split("\n").filter(function(l){return l.toLowerCase().indexOf(k)!==-1;});
      out=got.length? got.join("\n") : "No lines matched.";
    } else {
      var jd=el("t-d").value.replace(/\\n/g,"\n");
      out=txt.split("\n").filter(function(l){return l.trim()!=="";}).join(jd);
    }
    outHTML(box, esc(out)); var cp=el("t-copy"); cp.style.display=""; cp.onclick=function(){copyText(out,cp);};
  };
}});

TOOLS.push({ id:"urdu-convert", cat:"text", icon:"🇵🇰", name:"Free Roman Urdu Converter Online",
desc:"Roman to Urdu script", how:"Type Roman Urdu, choose Roman to Urdu or Urdu to Roman, and press Convert. Uses phonetic matching, longest match first.",
render:function(box){
  box.innerHTML = '<h2>🇵🇰 Roman Urdu Converter</h2><label>Direction</label><select id="t-dir"><option value="r2u">Roman → Urdu script</option><option value="u2r">Urdu script → Roman</option></select><label>Text</label><textarea id="t-in" placeholder="e.g. assalam o alaikum, aap kaise hain?"></textarea><button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button><p class="tool-note">Phonetic approximation — it converts common sounds but is not a perfect transliteration. Names and spellings may need manual fixing.</p>';
  var r2u = {
    "sh":"ش","ch":"چ","kh":"خ","gh":"غ","zh":"ژ","aa":"آ","ee":"ی","oo":"و","uu":"و",
    "dh":"دھ","th":"تھ","jh":"جھ","ph":"پھ","bh":"بھ","gh2":"غ",
    "a":"ا","b":"ب","p":"پ","t":"ت","ٹ":"ٹ","s":"س","j":"ج","c":"ک","h":"ہ","k":"خ",
    "d":"د","e":"ے","f":"ف","g":"گ","i":"ی","l":"ل","m":"م","n":"ن","o":"و","q":"ق",
    "r":"ر","v":"و","w":"و","x":"کس","y":"ی","z":"ز"
  };
  el("t-go").onclick = function(){
    var txt=el("t-in").value, dir=el("t-dir").value, out="";
    if(!txt){outHTML(box,"Enter some text.");return;}
    if(dir==="r2u"){
      var low=txt.toLowerCase(), i=0, keys=Object.keys(r2u).sort(function(a,b){return b.length-a.length;});
      while(i<low.length){
        var ch=low[i], matched=null;
        if(/[^a-z]/.test(ch)){ out+=txt[i]; i++; continue; }
        for(var k=0;k<keys.length;k++){ var key=keys[k]; if(key.length>1 && low.substr(i,key.length)===key){ matched=key; break; } }
        if(matched){ out+=r2u[matched]; i+=matched.length; }
        else { out += r2u[ch]!==undefined? r2u[ch] : txt[i]; i++; }
      }
    } else {
      var u2r={};
      for(var kk in r2u){ if(r2u.hasOwnProperty(kk)){ if(!u2r[r2u[kk]]) u2r[r2u[kk]]=kk; } }
      u2r["ٹ"]="t"; u2r["ہ"]="h"; u2r["ی"]="i"; u2r["و"]="o"; u2r["ے"]="e"; u2r["آ"]="aa"; u2r["ھ"]="h";
      for(var j=0;j<txt.length;j++){ var c2=txt[j]; out += u2r[c2]!==undefined? u2r[c2] : c2; }
    }
    outHTML(box, esc(out)); var cp=el("t-copy"); cp.style.display=""; cp.onclick=function(){copyText(out,cp);};
  };
}});

TOOLS.push({ id:"aes", cat:"text", icon:"🤐", name:"Free AES Text Encryption Online",
desc:"AES-GCM encrypt & decrypt", how:"Enter a password and your text, then Encrypt or Decrypt. The same password is needed to decrypt. Runs fully in your browser.",
render:function(box){
  box.innerHTML = '<h2>🔐 AES Text Encryption</h2><label>Password</label><input type="password" id="t-pw" placeholder="Enter a strong password"><label>Text</label><textarea id="t-in" placeholder="Text to encrypt or base64 to decrypt"></textarea><button class="tool-btn" id="t-enc">Encrypt</button> <button class="tool-btn ghost" id="t-dec">Decrypt</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button><p class="tool-note">AES-256-GCM with PBKDF2 (100,000 iterations, SHA-256). You need the SAME password to decrypt. We never see your password — everything runs in your browser.</p>';
  if(!(window.crypto && window.crypto.subtle)){ outHTML(box,"WebCrypto is not available in this browser."); return; }
  function b64encode(buf){ var s="",b=new Uint8Array(buf); for(var i=0;i<b.length;i++) s+=String.fromCharCode(b[i]); return btoa(s); }
  function b64decode(s){ var bin=atob(s), b=new Uint8Array(bin.length); for(var i=0;i<bin.length;i++) b[i]=bin.charCodeAt(i); return b.buffer; }
  function deriveKey(pw,salt){
    return window.crypto.subtle.importKey("raw", new TextEncoder().encode(pw), {name:"PBKDF2"}, false, ["deriveKey"]).then(function(base){
      return window.crypto.subtle.deriveKey({name:"PBKDF2", salt:salt, iterations:100000, hash:"SHA-256"}, base, {name:"AES-GCM", length:256}, false, ["encrypt","decrypt"]);
    });
  }
  el("t-enc").onclick = function(){
    var pw=el("t-pw").value, txt=el("t-in").value;
    if(!pw||!txt){outHTML(box,"Password and text are required.");return;}
    outHTML(box,"Encrypting...");
    var salt=window.crypto.getRandomValues(new Uint8Array(16));
    var iv=window.crypto.getRandomValues(new Uint8Array(12));
    deriveKey(pw,salt).then(function(key){
      return window.crypto.subtle.encrypt({name:"AES-GCM", iv:iv}, key, new TextEncoder().encode(txt));
    }).then(function(ct){
      var combined=new Uint8Array(16+12+ct.byteLength);
      combined.set(salt,0); combined.set(iv,16); combined.set(new Uint8Array(ct),28);
      var out=b64encode(combined.buffer);
      outHTML(box, esc(out)); var cp=el("t-copy"); cp.style.display=""; cp.onclick=function(){copyText(out,cp);};
    }).catch(function(){ outHTML(box,"Encryption failed."); });
  };
  el("t-dec").onclick = function(){
    var pw=el("t-pw").value, b64=el("t-in").value.trim();
    if(!pw||!b64){outHTML(box,"Password and base64 text are required.");return;}
    outHTML(box,"Decrypting...");
    var raw;
    try { raw=new Uint8Array(b64decode(b64)); } catch(e){ outHTML(box,"Invalid base64 input."); return; }
    if(raw.length<29){ outHTML(box,"Input too short — not a valid encrypted package."); return; }
    var salt=raw.slice(0,16), iv=raw.slice(16,28), ct=raw.slice(28);
    deriveKey(pw,salt.buffer).then(function(key){
      return window.crypto.subtle.decrypt({name:"AES-GCM", iv:iv}, key, ct.buffer);
    }).then(function(pt){
      var out=new TextDecoder().decode(pt);
      outHTML(box, esc(out)); var cp=el("t-copy"); cp.style.display=""; cp.onclick=function(){copyText(out,cp);};
    }).catch(function(){ outHTML(box,"Decryption failed — wrong password or corrupted data."); });
  };
}});

TOOLS.push({ id:"pass-phrase", cat:"dev", icon:"🗝️", name:"Free Pronounceable Password Generator Online",
desc:"Easy-to-say passwords", how:"Pick a length and how many passwords you need, optionally add a digit or symbol, then press Generate.",
render:function(box){
  box.innerHTML = '<h2>🗝️ Pronounceable Password Generator</h2><label>Length</label><select id="t-l"><option>8</option><option>10</option><option selected>12</option><option>16</option></select><label>How many (1–20)</label><input type="number" id="t-c" value="5" min="1" max="20"><label><input type="checkbox" id="t-d" checked> Add digit suffix</label><label><input type="checkbox" id="t-s"> Add symbol suffix</label><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button><p class="tool-note">Generated locally with random syllables — easy to say, hard to guess.</p>';
  var C="bcdfghjklmnpqrstvwxyz", V="aeiou", SYM="!@#$%&*?";
  function rnd(n){ var a=new Uint32Array(1); window.crypto.getRandomValues(a); return a[0]%n; }
  function syl(){ var s=C.charAt(rnd(C.length))+V.charAt(rnd(V.length)); if(rnd(2)===0) s+=C.charAt(rnd(C.length)); return s; }
  el("t-go").onclick = function(){
    var len=parseInt(el("t-l").value,10), n=Math.min(20,Math.max(1,parseInt(el("t-c").value,10)||5));
    var addD=el("t-d").checked, addS=el("t-s").checked, res=[];
    for(var i=0;i<n;i++){
      var p="";
      while(p.length<len) p+=syl();
      p=p.slice(0,len);
      p=p.charAt(0).toUpperCase()+p.slice(1);
      if(addD) p+=String(rnd(10));
      if(addS) p+=SYM.charAt(rnd(SYM.length));
      res.push(p);
    }
    var out=res.join("\n");
    outHTML(box, esc(out)); var cp=el("t-copy"); cp.style.display=""; cp.onclick=function(){copyText(out,cp);};
  };
}});

TOOLS.push({ id:"idioms", cat:"text", icon:"💭", name:"Free Idiom Finder Online",
desc:"40 idioms + word lookup", how:"Type an idiom or word to search 40 built-in idioms. A single word with no idiom match is looked up in a free dictionary.",
render:function(box){
  box.innerHTML = '<h2>💬 Idiom Finder</h2><label>Search idiom or word</label><input type="text" id="t-in" placeholder="e.g. break the ice"><button class="tool-btn" id="t-go">Search</button><div class="tool-out" id="t-out"></div>';
  var idioms=[
    ["break the ice","to do or say something to relieve tension in a social situation"],
    ["bite the bullet","to face a difficult situation with courage"],
    ["piece of cake","something very easy to do"],
    ["hit the nail on the head","to say exactly the right thing"],
    ["let the cat out of the bag","to reveal a secret by accident"],
    ["under the weather","feeling slightly ill or unwell"],
    ["break a leg","good luck, especially before a performance"],
    ["cost an arm and a leg","to be very expensive"],
    ["once in a blue moon","very rarely"],
    ["the ball is in your court","it is your turn to act"],
    ["spill the beans","to reveal secret information"],
    ["burning the midnight oil","working late into the night"],
    ["hit the sack","to go to bed"],
    ["speak of the devil","said when the person you were talking about appears"],
    ["on cloud nine","extremely happy"],
    ["beat around the bush","to avoid saying what you mean"],
    ["cut to the chase","to get to the point directly"],
    ["cry over spilled milk","to waste time worrying about something that cannot be changed"],
    ["a blessing in disguise","something good that seemed bad at first"],
    ["the best of both worlds","the advantages of two different situations"],
    ["pull someone's leg","to joke or tease someone"],
    ["barking up the wrong tree","accusing the wrong person or following the wrong course"],
    ["hit the road","to leave or begin a journey"],
    ["throw in the towel","to give up"],
    ["steal someone's thunder","to take attention away from someone else's achievement"],
    ["sit on the fence","to avoid taking sides"],
    ["a dime a dozen","very common and cheap"],
    ["keep your chin up","stay positive in a difficult situation"],
    ["through thick and thin","through good times and bad times"],
    ["the elephant in the room","an obvious problem nobody talks about"],
    ["jump on the bandwagon","to join something because it is popular"],
    ["back to square one","return to the starting point after a failure"],
    ["let sleeping dogs lie","avoid restarting an old conflict"],
    ["a drop in the ocean","a very small amount compared to what is needed"],
    ["kill two birds with one stone","achieve two things with one action"],
    ["call it a day","to stop working for the day"],
    ["miss the boat","to miss an opportunity"],
    ["off the hook","no longer in trouble, or free of responsibility"],
    ["the tip of the iceberg","a small visible part of a much bigger problem"],
    ["when pigs fly","something that will never happen"]
  ];
  el("t-go").onclick = function(){
    var q=el("t-in").value.trim().toLowerCase();
    if(!q){outHTML(box,"Type an idiom or word.");return;}
    var hits=idioms.filter(function(x){ return x[0].indexOf(q)!==-1 || q.indexOf(x[0])!==-1 || x[1].indexOf(q)!==-1; });
    if(hits.length){
      var h=hits.map(function(x){return '<div style="margin:8px 0"><b>'+esc(x[0])+'</b><br><span style="opacity:.85">'+esc(x[1])+'</span></div>';}).join("");
      outHTML(box,h); return;
    }
    if(/^[a-z]+$/.test(q)){
      outHTML(box,"No idiom found — looking up <b>"+esc(q)+"</b> in the dictionary...");
      var xhr=new XMLHttpRequest();
      xhr.open("GET","https://api.dictionaryapi.dev/api/v2/entries/en/"+encodeURIComponent(q),true);
      xhr.onload=function(){
        try{
          var d=JSON.parse(xhr.responseText);
          if(xhr.status===200 && d.length){
            var e=d[0], defs=[];
            e.meanings.forEach(function(m){ (m.definitions||[]).slice(0,2).forEach(function(df){ defs.push("<b>"+esc(m.partOfSpeech||"")+"</b> — "+esc(df.definition||"")); }); });
            outHTML(box,'<div style="margin:8px 0"><b>'+esc(e.word)+'</b> <span style="opacity:.75">'+esc(e.phonetic||"")+'</span><br>'+defs.slice(0,4).join("<br>")+'</div><p class="tool-note">Source: Free Dictionary API</p>');
          } else outHTML(box,"No definition found for <b>"+esc(q)+"</b>.");
        }catch(err){ outHTML(box,"Dictionary lookup failed — check your connection."); }
      };
      xhr.onerror=function(){ outHTML(box,"Dictionary lookup failed — check your connection."); };
      xhr.send(); return;
    }
    outHTML(box,"No idiom matched. Try a shorter phrase, or a single word for a dictionary lookup.");
  };
}});

TOOLS.push({ id:"prompt-studio", cat:"text", icon:"🪄", name:"Free AI Prompt Builder Online",
desc:"Engineer better prompts", how:"Describe your task, pick a role, tone and format, add context, then press Build Prompt for a structured prompt you can copy.",
render:function(box){
  box.innerHTML = '<h2>🤖 AI Prompt Builder</h2><label>Task description</label><textarea id="t-t" placeholder="e.g. write a 500-word blog post about urban gardening"></textarea><label>AI role</label><select id="t-r"><option>Expert assistant</option><option>Coder</option><option>Writer</option><option>Teacher</option><option>Marketer</option><option>Researcher</option><option>Storyteller</option></select><label>Tone</label><select id="t-o"><option>Professional</option><option>Friendly</option><option>Casual</option><option>Formal</option><option>Persuasive</option></select><label>Output format</label><select id="t-f"><option>Plain text</option><option>Bullet points</option><option>Numbered steps</option><option>Table</option><option>Short paragraphs with headings</option></select><label>Extra context (optional)</label><textarea id="t-x" placeholder="Audience, constraints, examples..."></textarea><button class="tool-btn" id="t-go">Build Prompt</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Prompt</button>';
  el("t-go").onclick = function(){
    var t=el("t-t").value.trim(); if(!t){outHTML(box,"Describe your task first.");return;}
    var r=el("t-r").value, o=el("t-o").value, f=el("t-f").value, x=el("t-x").value.trim();
    var prompt="You are an expert "+r+".\n\nTASK:\n"+t+"\n\nTONE:\nWrite in a "+o.toLowerCase()+" tone.\n\nOUTPUT FORMAT:\n"+f+".\n"
      +(x? "\nCONTEXT:\n"+x+"\n":"")
      +"\nRULES:\n- Be specific and accurate.\n- Ask clarifying questions only if the task is ambiguous.\n- Do not invent facts.";
    outHTML(box, esc(prompt)+"\n\n─── Quick tips ───\n1. The more specific your task, the better the answer.\n2. Add examples of the style you want.\n3. Set a length or format to avoid rambling.");
    var cp=el("t-copy"); cp.style.display=""; cp.onclick=function(){copyText(prompt,cp);};
  };
}});

TOOLS.push({ id:"resume-writer", cat:"text", icon:"👔", name:"Free Resume Builder Online",
desc:"Template-based builder", how:"Fill in your real details, press Generate Resume to preview, then print or save as PDF. A simple template — review before sending.",
render:function(box){
  box.innerHTML = '<h2>📄 Resume Builder</h2><label>Full name</label><input type="text" id="t-n" placeholder="e.g. Ali Khan"><label>Job title</label><input type="text" id="t-j" placeholder="e.g. Web Developer"><label>Email</label><input type="text" id="t-e" placeholder="you@example.com"><label>Phone</label><input type="text" id="t-p" placeholder="+92 300 1234567"><label>City</label><input type="text" id="t-c" placeholder="e.g. Lahore"><label>Professional summary</label><textarea id="t-s" placeholder="2-3 lines about yourself"></textarea><label>Skills (comma separated)</label><input type="text" id="t-k" placeholder="e.g. JavaScript, Excel, teamwork"><label>Experience</label><textarea id="t-x" placeholder="Job title, company, dates, achievements — one per line"></textarea><label>Education</label><textarea id="t-d" placeholder="Degree, institute, year — one per line"></textarea><button class="tool-btn" id="t-go">Generate Resume</button> <button class="tool-btn ghost" id="t-print" style="display:none">Print / Save PDF</button><div class="tool-out" id="t-out"></div><p class="tool-note">Template-based — fill in with your REAL details and review carefully before sending to employers.</p>';
  el("t-go").onclick = function(){
    var n=esc(el("t-n").value.trim())||"Your Name", j=esc(el("t-j").value.trim()),
        e=esc(el("t-e").value.trim()), p=esc(el("t-p").value.trim()), c=esc(el("t-c").value.trim()),
        s=esc(el("t-s").value.trim()), sk=esc(el("t-k").value.trim()),
        x=esc(el("t-x").value.trim()), d=esc(el("t-d").value.trim());
    function lines(t){ return t.split("\n").filter(function(l){return l.trim()!=="";}).map(function(l){return "<li>"+l+"</li>";}).join(""); }
    var h='<div style="font-family:Arial,sans-serif;color:#111827;max-width:640px">'
      +'<div style="text-align:center;border-bottom:3px solid #4f46e5;padding-bottom:12px;margin-bottom:14px">'
      +'<div style="font-size:26px;font-weight:bold">'+n+'</div>'
      +(j?'<div style="font-size:16px;color:#4f46e5">'+j+'</div>':'')
      +'<div style="font-size:13px;color:#6b7280">'+[e,p,c].filter(function(v){return v;}).join(" · ")+'</div></div>'
      +(s?'<div style="font-size:15px;font-weight:bold;color:#4f46e5;margin:12px 0 6px">SUMMARY</div><div style="font-size:14px">'+s.replace(/\n/g,"<br>")+'</div>':'')
      +(sk?'<div style="font-size:15px;font-weight:bold;color:#4f46e5;margin:12px 0 6px">SKILLS</div><div style="font-size:14px">'+sk+'</div>':'')
      +(x?'<div style="font-size:15px;font-weight:bold;color:#4f46e5;margin:12px 0 6px">EXPERIENCE</div><ul style="font-size:14px;padding-left:20px;margin:0">'+lines(x)+'</ul>':'')
      +(d?'<div style="font-size:15px;font-weight:bold;color:#4f46e5;margin:12px 0 6px">EDUCATION</div><ul style="font-size:14px;padding-left:20px;margin:0">'+lines(d)+'</ul>':'')
      +'</div>';
    outHTML(box, h);
    var pr=el("t-print"); pr.style.display=""; pr.onclick=function(){ window.print(); };
  };
}});

/* US AI tools batch: mega-util2 — 11 client-side utility tools. */

TOOLS.push({ id:"stopwatch", cat:"smart", icon:"⏱️", name:"Free Stopwatch Online",
desc:"With lap times", how:"Press Start to begin timing, Pause to hold it, Lap to record split times and Reset to clear everything.",
render:function(box){
  box.innerHTML = '<h2>⏱️ Stopwatch</h2><div id="t-d" style="font-size:2.4em;font-weight:bold;font-variant-numeric:tabular-nums;text-align:center;margin:12px 0">00:00.00</div><div style="text-align:center;margin-bottom:10px"><button class="tool-btn" id="t-go">Start</button> <button class="tool-btn ghost" id="t-lap">Lap</button> <button class="tool-btn ghost" id="t-r">Reset</button></div><div class="tool-out" id="t-out"></div>';
  var startAt=0, elapsed=0, running=false, iv=null, laps=[];
  function fmt(ms){ var cs=Math.floor(ms/10); var m=Math.floor(cs/6000), s=Math.floor((cs%6000)/100), c=cs%100; return (m<10?"0":"")+m+":"+(s<10?"0":"")+s+"."+(c<10?"0":"")+c; }
  function tick(){ el("t-d").textContent = fmt(elapsed + (running ? Date.now()-startAt : 0)); }
  el("t-go").onclick=function(){
    if(running){ elapsed += Date.now()-startAt; running=false; clearInterval(iv); el("t-go").textContent="Start"; }
    else { startAt=Date.now(); running=true; el("t-go").textContent="Pause"; iv=setInterval(tick,31); }
  };
  el("t-r").onclick=function(){ clearInterval(iv); running=false; elapsed=0; laps=[]; el("t-go").textContent="Start"; tick(); el("t-out").innerHTML=""; };
  el("t-lap").onclick=function(){ if(!running){return;} var t=elapsed+Date.now()-startAt; laps.push(t); var h=""; laps.forEach(function(x,i){ h+='<div style="padding:4px 0;border-bottom:1px solid #eee">Lap '+(i+1)+': <b>'+fmt(x)+'</b></div>'; }); el("t-out").innerHTML=h; };
  box._cleanup=function(){ clearInterval(iv); };
}});

TOOLS.push({ id:"countdown", cat:"smart", icon:"⏳", name:"Free Countdown Timer Online",
desc:"With alarm sound", how:"Enter hours, minutes and seconds, press Start. It beeps three times and flashes when it reaches zero.",
render:function(box){
  box.innerHTML = '<h2>⏳ Countdown Timer</h2><div style="display:flex;gap:10px"><div><label>Hours</label><input type="number" id="t-h" min="0" max="99" value="0"></div><div><label>Minutes</label><input type="number" id="t-m" min="0" max="59" value="5"></div><div><label>Seconds</label><input type="number" id="t-s" min="0" max="59" value="0"></div></div><div id="t-d" style="font-size:2.4em;font-weight:bold;text-align:center;margin:12px 0;font-variant-numeric:tabular-nums">05:00:00</div><div style="text-align:center;margin-bottom:10px"><button class="tool-btn" id="t-go">Start</button> <button class="tool-btn ghost" id="t-r">Reset</button></div><div class="tool-out" id="t-out"></div>';
  var endAt=0, total=0, running=false, iv=null, flashIv=null, actx=null;
  function fmt(ms){ var s=Math.max(0,Math.ceil(ms/1000)); var h=Math.floor(s/3600), m=Math.floor((s%3600)/60), ss=s%60; return (h<10?"0":"")+h+":"+(m<10?"0":"")+m+":"+(ss<10?"0":"")+ss; }
  function beep(){ try{ if(!actx){ actx=new (window.AudioContext||window.webkitAudioContext)(); } if(actx.state==="suspended"){actx.resume();} var t=actx.currentTime; for(var i=0;i<3;i++){ (function(i){ var o=actx.createOscillator(), g=actx.createGain(); o.type="sine"; o.frequency.value=880; var st=t+i*0.4; g.gain.setValueAtTime(0.001,st); g.gain.exponentialRampToValueAtTime(0.5,st+0.05); g.gain.exponentialRampToValueAtTime(0.001,st+0.32); o.connect(g); g.connect(actx.destination); o.start(st); o.stop(st+0.35); })(i); } }catch(e){} }
  function stopFlash(){ if(flashIv){clearInterval(flashIv); flashIv=null;} el("t-d").style.opacity="1"; el("t-d").style.color=""; }
  function draw(){ el("t-d").textContent=fmt(endAt-Date.now()); }
  el("t-go").onclick=function(){
    if(running){ running=false; clearInterval(iv); el("t-go").textContent="Resume"; return; }
    stopFlash();
    if(!total){ var h=parseInt(el("t-h").value,10)||0, m=parseInt(el("t-m").value,10)||0, s=parseInt(el("t-s").value,10)||0; total=(h*3600+m*60+s)*1000; if(total<=0){ outHTML(box,"Enter a duration greater than zero."); return; } el("t-out").innerHTML=""; }
    endAt=Date.now()+total; running=true; el("t-go").textContent="Pause";
    iv=setInterval(function(){ var left=endAt-Date.now(); if(left<=0){ clearInterval(iv); running=false; total=0; el("t-d").textContent="00:00:00"; el("t-go").textContent="Start"; beep(); el("t-d").style.color="#dc2626"; flashIv=setInterval(function(){ var d=el("t-d"); d.style.opacity=(d.style.opacity==="0.25"?"1":"0.25"); },350); outHTML(box,"Time is up!"); return; } el("t-d").textContent=fmt(left); },31);
  };
  el("t-r").onclick=function(){ clearInterval(iv); stopFlash(); running=false; total=0; el("t-go").textContent="Start"; el("t-d").textContent="05:00:00"; el("t-out").innerHTML=""; };
  box._cleanup=function(){ clearInterval(iv); if(flashIv){clearInterval(flashIv);} if(actx){try{actx.close();}catch(e){}} };
}});

TOOLS.push({ id:"pomodoro", cat:"smart", icon:"🍅", name:"Free Pomodoro Timer Online",
desc:"Focus + break cycles", how:"Pick a preset or set custom minutes, press Start. After 4 focus sessions you get a 15 minute long break automatically.",
render:function(box){
  box.innerHTML = '<h2>🍅 Pomodoro Timer</h2><div id="t-phase" style="text-align:center;font-weight:bold;font-size:1.2em;margin:8px 0">Ready — Focus</div><div id="t-d" style="font-size:2.6em;font-weight:bold;text-align:center;margin:10px 0;font-variant-numeric:tabular-nums">25:00</div><div style="text-align:center;margin-bottom:10px"><button class="tool-btn" id="t-go">Start</button> <button class="tool-btn ghost" id="t-skip">Skip</button> <button class="tool-btn ghost" id="t-r">Reset</button></div><div style="display:flex;gap:10px;align-items:flex-end"><div><label>Preset</label><select id="t-p"><option value="25/5">25 / 5</option><option value="50/10">50 / 10</option></select></div><div><label>Custom focus min</label><input type="number" id="t-c" min="1" max="180" placeholder="e.g. 45"></div></div><div class="tool-out" id="t-out"></div>';
  var mode="focus", focusLen=25, breakLen=5, sessions=0, endAt=0, running=false, iv=null, actx=null;
  function fmt(ms){ var s=Math.max(0,Math.ceil(ms/1000)); var m=Math.floor(s/60), ss=s%60; return (m<10?"0":"")+m+":"+(ss<10?"0":"")+ss; }
  function beep(n){ try{ if(!actx){ actx=new (window.AudioContext||window.webkitAudioContext)(); } if(actx.state==="suspended"){actx.resume();} var t=actx.currentTime; for(var i=0;i<n;i++){ (function(i){ var o=actx.createOscillator(), g=actx.createGain(); o.type="sine"; o.frequency.value= i===n-1?1046:880; var st=t+i*0.35; g.gain.setValueAtTime(0.001,st); g.gain.exponentialRampToValueAtTime(0.5,st+0.05); g.gain.exponentialRampToValueAtTime(0.001,st+0.28); o.connect(g); g.connect(actx.destination); o.start(st); o.stop(st+0.3); })(i); } }catch(e){} }
  function label(){ el("t-phase").textContent = (mode==="focus"?"Focus":"Break")+" — sessions completed: "+sessions; }
  function setPhase(m){ mode=m; var len = m==="focus"?focusLen:(sessions%4===0&&sessions>0?15:breakLen); endAt=Date.now()+len*60000; el("t-d").textContent=fmt(len*60000); label(); }
  el("t-p").onchange=function(){ var p=el("t-p").value.split("/"); focusLen=parseInt(p[0],10); breakLen=parseInt(p[1],10); if(!running){ setPhase("focus"); } };
  el("t-go").onclick=function(){
    if(running){ running=false; clearInterval(iv); el("t-go").textContent="Resume"; return; }
    var c=parseInt(el("t-c").value,10); if(c>0){ focusLen=c; }
    running=true; el("t-go").textContent="Pause";
    iv=setInterval(function(){ var left=endAt-Date.now(); if(left<=0){ clearInterval(iv); running=false; el("t-go").textContent="Start"; if(mode==="focus"){ sessions++; beep(2); setPhase("break"); el("t-out").innerHTML="Focus session "+sessions+" done. Take a break!"; } else { beep(3); setPhase("focus"); el("t-out").innerHTML="Break over. Back to focus!"; } return; } el("t-d").textContent=fmt(left); },250);
  };
  el("t-skip").onclick=function(){ clearInterval(iv); running=false; el("t-go").textContent="Start"; if(mode==="focus"){ sessions++; setPhase("break"); } else { setPhase("focus"); } el("t-out").innerHTML="Skipped to "+mode+" phase."; };
  el("t-r").onclick=function(){ clearInterval(iv); running=false; sessions=0; el("t-go").textContent="Start"; setPhase("focus"); el("t-out").innerHTML=""; };
  setPhase("focus");
  box._cleanup=function(){ clearInterval(iv); if(actx){try{actx.close();}catch(e){}} };
}});

TOOLS.push({ id:"team-picker", cat:"smart", icon:"👥", name:"Free Team Picker Online",
desc:"Split names into groups", how:"Paste one name per line, choose how many teams you need, then press Shuffle and Split.",
render:function(box){
  box.innerHTML = '<h2>👥 Team Picker</h2><label>Names (one per line)</label><textarea id="t-n" rows="6" placeholder="Ali\nSara\nOmar\nZara"></textarea><label>Number of teams</label><input type="number" id="t-t" min="2" max="20" value="2"><button class="tool-btn" id="t-go">Shuffle & Split</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var names=el("t-n").value.split("\n").map(function(x){return x.trim();}).filter(function(x){return x.length>0;});
    var nt=parseInt(el("t-t").value,10)||2;
    if(names.length<2){ outHTML(box,"Enter at least 2 names."); return; }
    if(nt>names.length){ outHTML(box,"Teams cannot exceed the number of names."); return; }
    var a=names.slice();
    for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var tmp=a[i]; a[i]=a[j]; a[j]=tmp; }
    var teams=[]; for(var k=0;k<nt;k++){ teams.push([]); }
    a.forEach(function(n,idx){ teams[idx%nt].push(n); });
    var h=teams.map(function(tm,ti){ return '<div style="margin:10px 0"><b>Team '+(ti+1)+' ('+tm.length+')</b><br>'+tm.map(esc).join(", ")+'</div>'; }).join("");
    outHTML(box,h);
  };
}});

TOOLS.push({ id:"yesno", cat:"fun", icon:"🎡", name:"Free Decision Spinner Online",
desc:"Yes No Maybe wheel", how:"Press SPIN and the wheel spins with a smooth slowdown, landing on Yes, No or Maybe.",
render:function(box){
  box.innerHTML = '<h2>🎡 Decision Spinner</h2><div style="text-align:center"><canvas id="t-cv" width="280" height="280" style="max-width:100%"></canvas></div><div style="text-align:center;margin:8px 0"><button class="tool-btn" id="t-go">SPIN</button></div><div id="t-r" style="text-align:center;font-size:1.5em;font-weight:bold;margin:6px 0"></div><div class="tool-out" id="t-out"></div>';
  var cv=el("t-cv"), ctx=cv.getContext("2d"), cx=140, cy=140, R=125;
  var segs=[{t:"YES",c:"#22c55e"},{t:"NO",c:"#ef4444"},{t:"MAYBE",c:"#eab308"}];
  var ang=0, raf=null, spinning=false;
  function draw(){
    ctx.clearRect(0,0,280,280);
    var sz=Math.PI*2/3;
    for(var i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,R,ang+i*sz,ang+(i+1)*sz); ctx.closePath(); ctx.fillStyle=segs[i].c; ctx.fill(); ctx.strokeStyle="#fff"; ctx.lineWidth=2; ctx.stroke();
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(ang+i*sz+sz/2); ctx.fillStyle="#fff"; ctx.font="bold 20px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillText(segs[i].t,R*0.62,0); ctx.restore(); }
    ctx.beginPath(); ctx.arc(cx,cy,18,0,Math.PI*2); ctx.fillStyle="#1f2937"; ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx-10,8); ctx.lineTo(cx+10,8); ctx.lineTo(cx,26); ctx.closePath(); ctx.fillStyle="#1f2937"; ctx.fill();
  }
  el("t-go").onclick=function(){
    if(spinning){return;} spinning=true; el("t-r").textContent="";
    var start=ang, target=start+Math.PI*2*(5+Math.random()*3), dur=4200, t0=performance.now();
    function step(now){ var p=Math.min(1,(now-t0)/dur); var e=1-Math.pow(1-p,3); ang=start+(target-start)*e; draw();
      if(p<1){ raf=requestAnimationFrame(step); }
      else { spinning=false; var a=(((-ang+Math.PI/2)%(Math.PI*2))+(Math.PI*2))%(Math.PI*2); var idx=Math.floor(a/(Math.PI*2/3))%3; el("t-r").textContent=segs[idx].t; }
    }
    raf=requestAnimationFrame(step);
  };
  draw();
  box._cleanup=function(){ if(raf){cancelAnimationFrame(raf);} };
}});

TOOLS.push({ id:"worldclock-plan", cat:"smart", icon:"🤝", name:"Free Meeting Planner Online",
desc:"Compare 5 time zones", how:"Enter your local date and time, pick 5 time zones, press Compare. Hours in green are business hours (9am-5pm).",
render:function(box){
  var zones=["Asia/Karachi","Asia/Dubai","Asia/Riyadh","Asia/Kolkata","Asia/Tokyo","Asia/Singapore","Australia/Sydney","Europe/London","Europe/Berlin","America/New_York","America/Chicago","America/Los_Angeles"];
  var defs=["Asia/Karachi","Asia/Dubai","Europe/London","America/New_York","Asia/Tokyo"];
  var now=new Date(); var pad=function(n){return (n<10?"0":"")+n;};
  var dtv=now.getFullYear()+"-"+pad(now.getMonth()+1)+"-"+pad(now.getDate())+"T"+pad(now.getHours())+":"+pad(now.getMinutes());
  var selHtml=""; for(var s=0;s<5;s++){ selHtml+='<div><label>Zone '+(s+1)+'</label><select id="t-z'+s+'">'+zones.map(function(z){return '<option value="'+z+'"'+(z===defs[s]?" selected":"")+'>'+z.replace("_"," ")+'</option>';}).join("")+'</select></div>'; }
  box.innerHTML = '<h2>🌍 Meeting Planner</h2><label>Your local date & time</label><input type="datetime-local" id="t-dt" value="'+dtv+'"><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0">'+selHtml+'</div><button class="tool-btn" id="t-go">Compare</button><div class="tool-out" id="t-out"></div><p class="tool-note">Green rows mean the time falls inside business hours (9:00–17:00) in that zone.</p>';
  el("t-go").onclick=function(){
    var dv=el("t-dt").value; if(!dv){ outHTML(box,"Pick a date and time first."); return; }
    var d=new Date(dv); if(isNaN(d.getTime())){ outHTML(box,"That date/time is not valid."); return; }
    var rows="";
    for(var s=0;s<5;s++){ var z=el("t-z"+s).value;
      var tf=new Intl.DateTimeFormat("en-GB",{timeZone:z,hour:"2-digit",minute:"2-digit",hourCycle:"h23"});
      var df=new Intl.DateTimeFormat("en-GB",{timeZone:z,day:"numeric",month:"short"});
      var hf=new Intl.DateTimeFormat("en-GB",{timeZone:z,hour:"numeric",hourCycle:"h23"});
      var hour=parseInt(hf.format(d),10);
      var biz=(hour>=9&&hour<17);
      rows+='<tr'+(biz?' style="background:#dcfce7"':"")+'><td>'+esc(z.replace("_"," "))+'</td><td><b>'+tf.format(d)+'</b></td><td>'+df.format(d)+'</td><td>'+(biz?"Business hours":"Off hours")+'</td></tr>';
    }
    outHTML(box,'<table style="width:100%;border-collapse:collapse"><tr><th style="text-align:left">Zone</th><th style="text-align:left">Time</th><th style="text-align:left">Date</th><th style="text-align:left">Status</th></tr>'+rows+'</table>');
  };
}});

TOOLS.push({ id:"dialing", cat:"learn", icon:"📞", name:"Free Dialing Code Lookup Online",
desc:"Country calling codes", how:"Type a country name or a code, and the list filters instantly to matching results.",
render:function(box){
  var D=[["Afghanistan","93"],["Albania","355"],["Algeria","213"],["Andorra","376"],["Angola","244"],["Argentina","54"],["Armenia","374"],["Australia","61"],["Austria","43"],["Azerbaijan","994"],["Bahamas","1242"],["Bahrain","973"],["Bangladesh","880"],["Belarus","375"],["Belgium","32"],["Belize","501"],["Bolivia","591"],["Bosnia and Herzegovina","387"],["Botswana","267"],["Brazil","55"],["Brunei","673"],["Bulgaria","359"],["Cambodia","855"],["Cameroon","237"],["Canada","1"],["Chile","56"],["China","86"],["Colombia","57"],["Costa Rica","506"],["Croatia","385"],["Cuba","53"],["Cyprus","357"],["Czech Republic","420"],["Denmark","45"],["Dominican Republic","1809"],["Ecuador","593"],["Egypt","20"],["El Salvador","503"],["Estonia","372"],["Ethiopia","251"],["Fiji","679"],["Finland","358"],["France","33"],["Georgia","995"],["Germany","49"],["Ghana","233"],["Greece","30"],["Guatemala","502"],["Honduras","504"],["Hong Kong","852"],["Hungary","36"],["Iceland","354"],["India","91"],["Indonesia","62"],["Iran","98"],["Iraq","964"],["Ireland","353"],["Israel","972"],["Italy","39"],["Ivory Coast","225"],["Jamaica","1876"],["Japan","81"],["Jordan","962"],["Kazakhstan","7"],["Kenya","254"],["Kuwait","965"],["Latvia","371"],["Lebanon","961"],["Lithuania","370"],["Luxembourg","352"],["Malaysia","60"],["Maldives","960"],["Malta","356"],["Mexico","52"],["Moldova","373"],["Monaco","377"],["Mongolia","976"],["Morocco","212"],["Myanmar","95"],["Nepal","977"],["Netherlands","31"],["New Zealand","64"],["Nicaragua","505"],["Nigeria","234"],["North Macedonia","389"],["Norway","47"],["Oman","968"],["Pakistan","92"],["Palestine","970"],["Panama","507"],["Paraguay","595"],["Peru","51"],["Philippines","63"],["Poland","48"],["Portugal","351"],["Qatar","974"],["Romania","40"],["Russia","7"],["Saudi Arabia","966"],["Senegal","221"],["Serbia","381"],["Singapore","65"],["Slovakia","421"],["Slovenia","386"],["South Africa","27"],["South Korea","82"],["Spain","34"],["Sri Lanka","94"],["Sweden","46"],["Switzerland","41"],["Taiwan","886"],["Thailand","66"],["Trinidad and Tobago","1868"],["Tunisia","216"],["Turkey","90"],["UAE","971"],["Uganda","256"],["UK","44"],["Ukraine","380"],["USA","1"],["Uruguay","598"],["Uzbekistan","998"],["Venezuela","58"],["Vietnam","84"],["Yemen","967"],["Zambia","260"],["Zimbabwe","263"]];
  box.innerHTML = '<h2>📞 Dialing Code Lookup</h2><label>Search country or code</label><input type="text" id="t-q" placeholder="e.g. Pakistan or 92"><div class="tool-out" id="t-out"></div><p class="tool-note">Dial + then the code, e.g. +92 for Pakistan.</p>';
  function show(q){ q=q.trim().toLowerCase(); var h=D.filter(function(x){ return x[0].toLowerCase().indexOf(q)>-1 || x[1].indexOf(q)>-1; }).map(function(x){ return '<div style="padding:5px 0;border-bottom:1px solid #eee"><b>+'+x[1]+'</b> — '+esc(x[0])+'</div>'; }).join(""); el("t-out").innerHTML=h||"No matches."; }
  el("t-q").oninput=function(){ show(el("t-q").value); };
  show("");
}});

TOOLS.push({ id:"zipfinder", cat:"learn", icon:"📮", name:"Free ZIP Code Finder Online",
desc:"City to ZIP via API", how:"Enter a country code (us, pk, de...) and a numeric ZIP, then press Look Up for place, state and coordinates.",
render:function(box){
  box.innerHTML = '<h2>📮 ZIP Code Finder</h2><div style="display:flex;gap:10px"><div><label>Country code</label><input type="text" id="t-cc" value="us" maxlength="2"></div><div style="flex:1"><label>ZIP / postal code</label><input type="text" id="t-q" placeholder="e.g. 10001"></div></div><button class="tool-btn" id="t-go">Look Up</button><div class="tool-out" id="t-out"></div><p class="tool-note">Needs the numeric ZIP/postal code, not a city name. Coverage varies by country (Zippopotam data); Pakistan coverage is partial — major cities only.</p>';
  el("t-go").onclick=function(){
    var cc=el("t-cc").value.trim().toLowerCase(), q=el("t-q").value.trim();
    if(!cc||!q){ outHTML(box,"Enter a country code and a ZIP."); return; }
    if(!/^[0-9][0-9\- ]*$/.test(q)){ outHTML(box,"Please enter the numeric ZIP/postal code (digits only), not a city name."); return; }
    outHTML(box,"Looking up...");
    fetch("https://api.zippopotam.us/"+encodeURIComponent(cc)+"/"+encodeURIComponent(q.replace(/\s/g,"")))
      .then(function(r){ if(!r.ok){ throw new Error("not found"); } return r.json(); })
      .then(function(j){
        var h='<div><b>Postal code:</b> '+esc(j["post code"]||q)+'</div><div><b>Country:</b> '+esc(j.country||"")+' ('+esc(j["country abbreviation"]||"")+')</div>';
        (j.places||[]).forEach(function(p){ h+='<div style="margin-top:8px;padding:8px;background:#f8fafc;border-radius:8px"><b>'+esc(p["place name"]||"")+'</b><br>State: '+esc(p.state||"")+'<br>Lat/Lon: '+esc(p.latitude||"")+', '+esc(p.longitude||"")+'</div>'; });
        outHTML(box,h);
      })
      .catch(function(){ outHTML(box,"Not found. Check the country code and ZIP, and try again — coverage is not worldwide."); });
  };
}});

TOOLS.push({ id:"airports", cat:"learn", icon:"🛫", name:"Free Airport Code Directory Online",
desc:"60 major airports", how:"Type an airport code, city or country and the directory filters instantly. Reference only — not a live flight tracker.",
render:function(box){
  var A=[["LHE","Lahore","Pakistan"],["KHI","Karachi","Pakistan"],["ISB","Islamabad","Pakistan"],["PEW","Peshawar","Pakistan"],["MUX","Multan","Pakistan"],["DEL","Delhi","India"],["BOM","Mumbai","India"],["BLR","Bengaluru","India"],["DXB","Dubai","UAE"],["AUH","Abu Dhabi","UAE"],["SHJ","Sharjah","UAE"],["DOH","Doha","Qatar"],["BAH","Bahrain","Bahrain"],["MCT","Muscat","Oman"],["KWI","Kuwait City","Kuwait"],["RUH","Riyadh","Saudi Arabia"],["JED","Jeddah","Saudi Arabia"],["DMM","Dammam","Saudi Arabia"],["IST","Istanbul","Turkey"],["SAW","Istanbul Sabiha","Turkey"],["ANK","Ankara","Turkey"],["LHR","London Heathrow","UK"],["LGW","London Gatwick","UK"],["MAN","Manchester","UK"],["CDG","Paris","France"],["AMS","Amsterdam","Netherlands"],["FRA","Frankfurt","Germany"],["MUC","Munich","Germany"],["ZRH","Zurich","Switzerland"],["FCO","Rome","Italy"],["MAD","Madrid","Spain"],["BCN","Barcelona","Spain"],["LIS","Lisbon","Portugal"],["VIE","Vienna","Austria"],["BRU","Brussels","Belgium"],["CPH","Copenhagen","Denmark"],["OSL","Oslo","Norway"],["ARN","Stockholm","Sweden"],["HEL","Helsinki","Finland"],["WAW","Warsaw","Poland"],["PRG","Prague","Czech Republic"],["ATH","Athens","Greece"],["JFK","New York JFK","USA"],["EWR","Newark","USA"],["LAX","Los Angeles","USA"],["SFO","San Francisco","USA"],["ORD","Chicago","USA"],["IAD","Washington Dulles","USA"],["ATL","Atlanta","USA"],["DFW","Dallas","USA"],["MIA","Miami","USA"],["BOS","Boston","USA"],["SEA","Seattle","USA"],["YYZ","Toronto","Canada"],["YVR","Vancouver","Canada"],["MEX","Mexico City","Mexico"],["GRU","Sao Paulo","Brazil"],["EZE","Buenos Aires","Argentina"],["JNB","Johannesburg","South Africa"],["CAI","Cairo","Egypt"],["NBO","Nairobi","Kenya"],["ADD","Addis Ababa","Ethiopia"],["SIN","Singapore","Singapore"],["KUL","Kuala Lumpur","Malaysia"],["BKK","Bangkok","Thailand"],["HKG","Hong Kong","Hong Kong"],["TPE","Taipei","Taiwan"],["ICN","Seoul Incheon","South Korea"],["NRT","Tokyo Narita","Japan"],["HND","Tokyo Haneda","Japan"],["KIX","Osaka","Japan"],["SYD","Sydney","Australia"],["MEL","Melbourne","Australia"],["AKL","Auckland","New Zealand"]];
  box.innerHTML = '<h2>✈️ Airport Code Directory</h2><label>Search code, city or country</label><input type="text" id="t-q" placeholder="e.g. DXB or Dubai"><div class="tool-out" id="t-out"></div><p class="tool-note">Reference directory only — not a live flight tracker.</p>';
  function show(q){ q=q.trim().toLowerCase(); var h=A.filter(function(x){ return x[0].toLowerCase().indexOf(q)>-1||x[1].toLowerCase().indexOf(q)>-1||x[2].toLowerCase().indexOf(q)>-1; }).map(function(x){ return '<div style="padding:5px 0;border-bottom:1px solid #eee"><b>'+x[0]+'</b> — '+esc(x[1])+', '+esc(x[2])+'</div>'; }).join(""); el("t-out").innerHTML=h||"No matches."; }
  el("t-q").oninput=function(){ show(el("t-q").value); };
  show("");
}});

TOOLS.push({ id:"fx-history", cat:"finance", icon:"🕰️", name:"Free Currency History Chart Online",
desc:"90-day rate chart", how:"Pick two currencies and press Fetch Chart for a 90-day exchange rate line chart with min and max labels.",
render:function(box){
  var C=["USD","EUR","PKR","GBP","AED","INR","SAR","JPY"];
  function opts(sel){ return C.map(function(c){ return '<option'+(c===sel?" selected":"")+'>'+c+'</option>'; }).join(""); }
  box.innerHTML = '<h2>📈 Currency History Chart</h2><div style="display:flex;gap:10px"><div><label>From</label><select id="t-f">'+opts("USD")+'</select></div><div><label>To</label><select id="t-t">'+opts("PKR")+'</select></div></div><button class="tool-btn" id="t-go">Fetch Chart</button><div class="tool-out" id="t-out"></div><p class="tool-note">Rates are indicative mid-market values (Frankfurter/ECB data), not live trading prices.</p>';
  function ymd(d){ return d.toISOString().slice(0,10); }
  function drawChart(labels, rates, from, to){
    var cv=document.createElement("canvas"); cv.width=560; cv.height=300; cv.style.maxWidth="100%";
    var ctx=cv.getContext("2d"); var W=560,H=300,pl=52,pr=12,pt=14,pb=30;
    var min=Math.min.apply(null,rates), max=Math.max.apply(null,rates); if(min===max){min*=0.99;max*=1.01;}
    var pad=(max-min)*0.08; min-=pad; max+=pad;
    function X(i){ return pl+(W-pl-pr)*(i/(rates.length-1)); }
    function Y(v){ return pt+(H-pt-pb)*(1-(v-min)/(max-min)); }
    ctx.strokeStyle="#e5e7eb"; ctx.fillStyle="#6b7280"; ctx.font="11px sans-serif"; ctx.lineWidth=1;
    for(var g=0;g<=4;g++){ var v=min+(max-min)*g/4, y=Y(v); ctx.beginPath(); ctx.moveTo(pl,y); ctx.lineTo(W-pr,y); ctx.stroke(); ctx.fillText(v.toFixed(4),6,y+4); }
    ctx.beginPath(); ctx.strokeStyle="#2563eb"; ctx.lineWidth=2;
    rates.forEach(function(r,i){ if(i===0){ctx.moveTo(X(i),Y(r));}else{ctx.lineTo(X(i),Y(r));} }); ctx.stroke();
    ctx.fillStyle="#6b7280"; ctx.fillText(labels[0],pl,H-10); ctx.fillText(labels[labels.length-1],W-pr-58,H-10);
    ctx.fillStyle="#111827"; ctx.font="bold 12px sans-serif"; ctx.fillText("Min "+min.toFixed(4)+"   Max "+max.toFixed(4),pl,12);
    var out=el("t-out"); out.innerHTML=""; out.appendChild(cv);
    var d=document.createElement("div"); d.innerHTML="Latest 1 "+esc(from)+" = <b>"+rates[rates.length-1].toFixed(4)+" "+esc(to)+"</b>"; out.appendChild(d);
  }
  el("t-go").onclick=function(){
    var from=el("t-f").value, to=el("t-t").value;
    if(from===to){ outHTML(box,"Pick two different currencies."); return; }
    outHTML(box,"Fetching 90 days of rates...");
    var end=new Date(), start=new Date(end.getTime()-90*86400000);
    var hosts=["https://api.frankfurter.dev/v1/","https://api.frankfurter.app/v1/"];
    function attempt(i){
      if(i>=hosts.length){ outHTML(box,"Could not load rate data. Check your connection and try again later."); return; }
      fetch(hosts[i]+ymd(start)+".."+ymd(end)+"?from="+from+"&to="+to)
        .then(function(r){ if(!r.ok){throw new Error("bad");} return r.json(); })
        .then(function(j){
          var keys=Object.keys(j.rates||{}).sort(); var rates=keys.map(function(k){ return j.rates[k][to]; }).filter(function(v){return typeof v==="number";});
          if(rates.length<2){ throw new Error("few"); }
          drawChart(keys, rates, from, to);
        })
        .catch(function(){ attempt(i+1); });
    }
    attempt(0);
  };
}});

TOOLS.push({ id:"compass", cat:"smart", icon:"🧭", name:"Free Compass & Level Online",
desc:"Uses device sensors", how:"On a phone, press Enable Compass and tilt your device. On desktop a demo dial runs instead.",
render:function(box){
  box.innerHTML = '<h2>🧭 Compass & Level</h2><div style="text-align:center"><canvas id="t-cv" width="220" height="220" style="max-width:100%"></canvas><div id="t-deg" style="font-size:1.4em;font-weight:bold;margin:6px 0">—°</div></div><div style="text-align:center;margin:8px 0"><button class="tool-btn" id="t-go">Enable Compass</button></div><div style="text-align:center"><div style="font-weight:bold;margin:6px 0">Bubble Level</div><div id="t-lv" style="position:relative;width:180px;height:180px;margin:0 auto;border:2px solid #9ca3af;border-radius:50%;background:#f8fafc"><div id="t-bub" style="position:absolute;width:34px;height:34px;border-radius:50%;background:#2563eb;opacity:0.7;left:73px;top:73px"></div></div><div id="t-tilt" style="margin:6px 0;font-size:0.9em">beta —, gamma —</div></div><div class="tool-out" id="t-out"></div><p class="tool-note">Needs a mobile device with motion sensors; on desktop a demo compass runs automatically.</p>';
  var cv=el("t-cv"), ctx=cv.getContext("2d"), raf=null, demoAng=0, demo=true, lastAlpha=null;
  function draw(ang){
    ctx.clearRect(0,0,220,220); ctx.save(); ctx.translate(110,110);
    ctx.strokeStyle="#1f2937"; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(0,0,100,0,Math.PI*2); ctx.stroke();
    ctx.rotate(-ang*Math.PI/180);
    var pts=["N","E","S","W"]; ctx.fillStyle="#1f2937"; ctx.font="bold 16px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
    for(var i=0;i<4;i++){ var a=i*Math.PI/2; ctx.save(); ctx.rotate(a); ctx.fillStyle=(i===0?"#dc2626":"#1f2937"); ctx.fillText(pts[i],0,-82); ctx.restore(); }
    ctx.strokeStyle="#dc2626"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(0,-95); ctx.lineTo(0,-60); ctx.stroke();
    ctx.fillStyle="#1f2937"; ctx.beginPath(); ctx.arc(0,0,8,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }
  function setDeg(d){ var dirs=["N","NE","E","SE","S","SW","W","NW"]; el("t-deg").textContent=Math.round(d)+"° "+dirs[Math.round(d/45)%8]; }
  function loop(){ if(demo){ demoAng=(demoAng+1.5)%360; draw(demoAng); setDeg(demoAng); } else if(lastAlpha!==null){ draw(lastAlpha); setDeg(lastAlpha); } raf=requestAnimationFrame(loop); }
  function onOrient(e){
    if(e.alpha===null&&e.alpha===undefined){ return; }
    demo=false; lastAlpha=(360-(e.alpha||0))%360;
    var b=e.beta||0, g=e.gamma||0;
    var x=Math.max(-70,Math.min(70,g*1.6)), y=Math.max(-70,Math.min(70,b*1.6));
    el("t-bub").style.left=(73+x)+"px"; el("t-bub").style.top=(73+y)+"px";
    el("t-tilt").textContent="beta "+Math.round(b)+"°, gamma "+Math.round(g)+"°";
  }
  el("t-go").onclick=function(){
    el("t-out").innerHTML="Requesting sensor access...";
    function ok(){ demo=false; window.addEventListener("deviceorientation",onOrient); el("t-out").innerHTML="Sensors active. Rotate and tilt your device."; }
    function no(){ el("t-out").innerHTML="Sensor access was blocked or unavailable — showing a demo dial instead."; demo=true; }
    if(typeof DeviceOrientationEvent!=="undefined"&&typeof DeviceOrientationEvent.requestPermission==="function"){
      DeviceOrientationEvent.requestPermission().then(function(r){ if(r==="granted"){ok();}else{no();} }).catch(no);
    } else if("DeviceOrientationEvent" in window){ ok(); }
    else { no(); }
  };
  draw(0); loop();
  box._cleanup=function(){ if(raf){cancelAnimationFrame(raf);} window.removeEventListener("deviceorientation",onOrient); };
}});

/* PQA-tools 2026-10-12 (additive dedupe): chmod/serp/date-diff each got TOOLS.push() x4 (byte-identical,
   tools-refill re-append). Runtime par first occurrence rakho taake grid/search mein har tool ka ek card dikhe;
   source blocks untouched. */
(function(){var seen={},u=[];TOOLS.forEach(function(t){if(!seen[t.id]){seen[t.id]=1;u.push(t);}});TOOLS.length=0;Array.prototype.push.apply(TOOLS,u);})();

/* ================= HUB WIRING ================= */
(function initHub(){

TOOLS.push({ id:"amortization", cat:"finance", icon:"📅", name:"Free Loan Amortization Schedule Online",
desc:"Month-by-month breakdown", how:"Enter loan amount, interest rate and years, then press Calculate to see the full month-by-month principal and interest schedule.",
render:function(box){
  box.innerHTML = '<h2>📅 Loan Amortization Schedule</h2><div class="row"><div><label>Loan amount</label><input type="number" id="t-p" placeholder="500000"></div><div><label>Annual interest %</label><input type="number" id="t-r" placeholder="12" step="0.1"></div><div><label>Years</label><input type="number" id="t-y" placeholder="5"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var P=+el("t-p").value,r=+el("t-r").value/1200,n=(+el("t-y").value)*12;
    if(!P||!n){outHTML(box,"Enter amount and years.");return;}
    var emi=r?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n, bal=P, rows=[];
    for(var i=1;i<=n&&bal>0.01;i++){ var intr=bal*r, princ=Math.min(emi-intr,bal); bal-=princ;
      if(i<=12||i>n-12||i%12===0) rows.push("M"+i+": princ "+princ.toFixed(0)+" | intr "+intr.toFixed(0)+" | bal "+Math.max(bal,0).toFixed(0)); }
    outHTML(box,"Monthly EMI: "+emi.toFixed(2)+"\nTotal interest: "+(emi*n-P).toFixed(2)+"\n\n"+rows.join("\n")+(n>24?"\n... (first & last 12 months shown)":""));
  };
}});

TOOLS.push({ id:"debt-payoff", cat:"finance", icon:"🔥", name:"Free Debt Payoff Planner Online",
desc:"Snowball & avalanche plans", how:"Add your debts with balances, rates and minimums, then press Plan to see snowball and avalanche payoff orders.",
render:function(box){
  box.innerHTML = '<h2>🔥 Debt Payoff Planner</h2><p class="tool-note">Enter debts as: name,balance,rate%,min — one per line.</p><textarea id="t-d" rows="4" style="width:100%" placeholder="Card A,5000,18,150\nLoan B,12000,9,300"></textarea><br><button class="tool-btn" id="t-go">Plan Payoff</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var lines=el("t-d").value.split("\n").filter(function(l){return l.trim();});
    if(!lines.length){outHTML(box,"Enter at least one debt.");return;}
    var debts=lines.map(function(l){var p=l.split(",");return {n:(p[0]||"Debt").trim(),b:+p[1]||0,r:+p[2]||0,m:+p[3]||0};}).filter(function(d){return d.b>0;});
    if(!debts.length){outHTML(box,"Check your numbers.");return;}
    var snow=debts.slice().sort(function(a,b){return a.b-b.b;}).map(function(d){return d.n+" ("+d.b+")";}).join(" → ");
    var aval=debts.slice().sort(function(a,b){return b.r-a.r;}).map(function(d){return d.n+" ("+d.r+"%)";}).join(" → ");
    var totB=debts.reduce(function(s,d){return s+d.b;},0), totM=debts.reduce(function(s,d){return s+d.m;},0);
    outHTML(box,"Total debt: "+totB.toFixed(2)+" | Total minimums: "+totM.toFixed(2)+"\n\n❄️ Snowball (smallest first):\n"+snow+"\n\n⚡ Avalanche (highest rate first):\n"+aval+"\n\nPay minimums on all, attack the first debt with every extra rupee/dollar.");
  };
}});

TOOLS.push({ id:"net-worth", cat:"finance", icon:"💎", name:"Free Net Worth Calculator Online",
desc:"Assets minus liabilities", how:"Enter your total assets and total liabilities, then press Calculate to see your net worth.",
render:function(box){
  box.innerHTML = '<h2>💎 Net Worth Calculator</h2><div class="row"><div><label>Total assets</label><input type="number" id="t-a" placeholder="1000000"></div><div><label>Total liabilities</label><input type="number" id="t-l" placeholder="300000"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var a=+el("t-a").value||0,l=+el("t-l").value||0,nw=a-l;
    outHTML(box,"Assets: "+a.toFixed(2)+"\nLiabilities: "+l.toFixed(2)+"\n\n💎 Net worth: "+nw.toFixed(2)+(nw<0?"\n(You owe more than you own — focus on debt payoff.)":"\nTrack this monthly to watch it grow."));
  };
}});

TOOLS.push({ id:"savings-goal", cat:"finance", icon:"🎯", name:"Free Savings Goal Planner Online",
desc:"Monthly saving needed", how:"Enter your target amount, current savings and months left, then press Calculate to see how much to save monthly.",
render:function(box){
  box.innerHTML = '<h2>🎯 Savings Goal Planner</h2><div class="row"><div><label>Target amount</label><input type="number" id="t-t" placeholder="500000"></div><div><label>Already saved</label><input type="number" id="t-s" placeholder="50000"></div><div><label>Months left</label><input type="number" id="t-m" placeholder="12"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var t=+el("t-t").value||0,s=+el("t-s").value||0,m=+el("t-m").value||0;
    if(!t||!m){outHTML(box,"Enter target and months.");return;}
    var need=Math.max(t-s,0), per=need/m;
    outHTML(box,"Still needed: "+need.toFixed(2)+"\n\n🎯 Save "+per.toFixed(2)+" per month for "+m+" months."+(s>0?"\nGreat — you already have "+s.toFixed(2)+" saved!":""));
  };
}});

TOOLS.push({ id:"freelance-rate", cat:"finance", icon:"💻", name:"Free Freelance Hourly Rate Calculator Online",
desc:"Income → hourly rate", how:"Enter desired monthly income, billable hours and expenses, then press Calculate to see your hourly rate.",
render:function(box){
  box.innerHTML = '<h2>💻 Freelance Hourly Rate</h2><div class="row"><div><label>Monthly income goal</label><input type="number" id="t-i" placeholder="200000"></div><div><label>Billable hrs/month</label><input type="number" id="t-h" placeholder="100"></div><div><label>Monthly expenses</label><input type="number" id="t-e" placeholder="20000"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var i=+el("t-i").value||0,h=+el("t-h").value||0,e=+el("t-e").value||0;
    if(!i||!h){outHTML(box,"Enter income goal and hours.");return;}
    var rate=(i+e)/h;
    outHTML(box,"Charge at least: "+rate.toFixed(2)+" per hour\n(Breakdown: "+i.toFixed(0)+" income + "+e.toFixed(0)+" expenses ÷ "+h+" hrs)");
  };
}});

TOOLS.push({ id:"simple-interest", cat:"finance", icon:"📊", name:"Free Simple Interest Calculator Online",
desc:"P×R×T / 100", how:"Enter principal, rate and time, then press Calculate to see simple interest and total amount.",
render:function(box){
  box.innerHTML = '<h2>📊 Simple Interest Calculator</h2><div class="row"><div><label>Principal</label><input type="number" id="t-p" placeholder="100000"></div><div><label>Rate %/year</label><input type="number" id="t-r" placeholder="10" step="0.1"></div><div><label>Time (years)</label><input type="number" id="t-t" placeholder="3" step="0.5"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var p=+el("t-p").value||0,r=+el("t-r").value||0,t=+el("t-t").value||0;
    if(!p||!t){outHTML(box,"Enter principal and time.");return;}
    var si=p*r*t/100;
    outHTML(box,"Simple interest: "+si.toFixed(2)+"\nTotal amount: "+(p+si).toFixed(2));
  };
}});

TOOLS.push({ id:"cc-payoff", cat:"finance", icon:"💳", name:"Free Credit Card Payoff Calculator Online",
desc:"Minimum-payment trap", how:"Enter card balance, APR and monthly payment, then press Calculate to see months and total interest.",
render:function(box){
  box.innerHTML = '<h2>💳 Credit Card Payoff</h2><div class="row"><div><label>Balance</label><input type="number" id="t-b" placeholder="100000"></div><div><label>APR %</label><input type="number" id="t-r" placeholder="36" step="0.1"></div><div><label>Monthly payment</label><input type="number" id="t-p" placeholder="5000"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var b=+el("t-b").value||0,r=(+el("t-r").value||0)/1200,p=+el("t-p").value||0;
    if(!b||!p){outHTML(box,"Enter balance and payment.");return;}
    if(p<=b*r){outHTML(box,"⚠️ Payment is less than monthly interest ("+(b*r).toFixed(2)+") — balance will NEVER shrink. Increase payment.");return;}
    var m=0,totI=0,bal=b;
    while(bal>0&&m<1200){ var intr=bal*r; totI+=intr; bal=bal+intr-p; m++; }
    outHTML(box,"Months to payoff: "+m+" ("+(m/12).toFixed(1)+" years)\nTotal interest: "+totI.toFixed(2)+"\nTotal paid: "+(b+totI).toFixed(2));
  };
}});

TOOLS.push({ id:"vat-calc", cat:"finance", icon:"🧾", name:"Free VAT Calculator Online",
desc:"Add or remove VAT", how:"Enter amount and VAT %, choose add or remove, then press Calculate.",
render:function(box){
  box.innerHTML = '<h2>🧾 VAT Calculator</h2><div class="row"><div><label>Amount</label><input type="number" id="t-a" placeholder="1000"></div><div><label>VAT %</label><input type="number" id="t-v" placeholder="5" step="0.1"></div><div><label>Mode</label><select id="t-m"><option value="add">Add VAT</option><option value="rem">Remove VAT</option></select></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var a=+el("t-a").value||0,v=+el("t-v").value||0,m=el("t-m").value;
    if(!a){outHTML(box,"Enter amount.");return;}
    if(m==="add"){ var vat=a*v/100; outHTML(box,"VAT: "+vat.toFixed(2)+"\nTotal with VAT: "+(a+vat).toFixed(2)); }
    else { var net=a/(1+v/100), vat=a-net; outHTML(box,"Net amount: "+net.toFixed(2)+"\nVAT included: "+vat.toFixed(2)); }
  };
}});

  var grid=el("tools-grid"), cats=el("tools-cats"), search=el("tool-search");
  var view=el("tool-view"), home=el("tools-home"), tbox=el("tool-box");
  if(!grid) return;
  var activeCat="all";
  /* favorites: device-local */
  function getFavs(){ try{ return JSON.parse(localStorage.getItem("sawalai_favs")||"[]"); }catch(e){ return []; } }
  function setFavs(f){ try{ localStorage.setItem("sawalai_favs", JSON.stringify(f)); }catch(e){} }
  function isFav(id){ return getFavs().indexOf(id)>-1; }
  function toggleFav(id){ var f=getFavs(), i=f.indexOf(id); if(i>-1) f.splice(i,1); else f.push(id); setFavs(f); draw(); drawRecent(); }
  cats.innerHTML=CATS.filter(function(c){return c.id==="all"||c.id==="fav"||TOOLS.some(function(t){return t.cat===c.id||t.cat2===c.id;});}).map(function(c){return '<button class="tool-cat'+(c.id==="all"?" active":"")+'" data-cat="'+c.id+'">'+c.name+'</button>';}).join("");
  cats.querySelectorAll(".tool-cat").forEach(function(b){
    b.onclick=function(){ activeCat=b.getAttribute("data-cat");
      cats.querySelectorAll(".tool-cat").forEach(function(x){x.classList.remove("active");});
      b.classList.add("active"); draw();
    };
  });
  function byId(id){ return TOOLS.filter(function(x){return x.id===id;})[0]; }
  var CAT_DESCS={"finance":"Free finance tools — loan & EMI calculators, currency converters, tax & zakat calculators, salary & savings planners. 100% free, no signup."};
  function drawCatDesc(){
    var d=document.getElementById("cat-desc");
    if(!d){ d=document.createElement("p"); d.id="cat-desc"; d.className="muted"; d.style.cssText="text-align:center;max-width:700px;margin:0 auto 6px;padding:0 16px;font-size:.92rem;"; var g=el("tools-grid"); g.parentNode.insertBefore(d,g); }
    d.textContent=CAT_DESCS[activeCat]||"";
    d.style.display=CAT_DESCS[activeCat]?"":"none";
  }
  function draw(){
    drawCatDesc();
    var q=(search.value||"").toLowerCase();
    var favs=getFavs();
    var list=TOOLS.filter(function(t){
      if(activeCat==="fav"){ if(favs.indexOf(t.id)<0) return false; }
      else if(activeCat!=="all"&&t.cat!==activeCat&&t.cat2!==activeCat&&(activeCat!=="advanced"||t.cat!=="smart")) return false; /* PQA-tools 2026-10-11: Advanced pill shows Smart Utilities tools (no empty grid) */
      return !q||t.name.toLowerCase().indexOf(q)>-1||t.desc.toLowerCase().indexOf(q)>-1||t.id.indexOf(q.replace(/\s+/g,""))>-1;
    });
    grid.innerHTML=list.map(function(t){
      var f=isFav(t.id)?"❤️":"🤍";
      var locked=false, proBadge="";
      try{ if(window.SawalPro && window.SawalPro.isLocked(t.id)){ locked=true; proBadge='<span class="tool-pro-badge">🔒 PRO</span>'; } }catch(e){}
      return '<div class="tool-card'+(locked?" locked":"")+'" data-id="'+t.id+'">'+proBadge+'<button class="t-fav" data-fav="'+t.id+'" title="Add to favorites">'+f+'</button><span class="t-icon">'+t.icon+'</span><div class="t-name">'+esc(t.name)+'</div><div class="t-desc">'+esc(t.desc)+'</div></div>';
    }).join("")||'<p class="muted" style="grid-column:1/-1;text-align:center">'+(activeCat==="fav"?"No favorites yet — tap 🤍 on any tool to save it here.":"No tools found.")+'</p>';
    grid.querySelectorAll(".tool-card").forEach(function(c){
      c.onclick=function(){ openTool(c.getAttribute("data-id")); };
    });
    grid.querySelectorAll(".t-fav").forEach(function(b){
      b.onclick=function(e){ e.stopPropagation(); toggleFav(b.getAttribute("data-fav")); };
    });
  }
  /* recent tools strip (last 6 opened tools) */
  function drawRecent(){
    var strip=el("tools-recent"); if(!strip) return;
    var rec=[];
    try{
      rec=(SawalHistory.get()||[]).filter(function(h){
        return h.u && h.u.indexOf("tools.html#")===0;
      }).slice(-6).reverse();
    }catch(e){}
    if(!rec.length){ strip.style.display="none"; return; }
    strip.style.display="";
    strip.innerHTML='<div class="recent-title">🕘 Your recent tools</div><div class="recent-row">'+rec.map(function(h){
      var id=h.u.split("#")[1], t=byId(id);
      return t?'<button class="recent-chip" data-id="'+t.id+'">'+t.icon+' '+esc(t.name.replace(/^Free /,"").replace(/ Online$/,""))+'</button>':"";
    }).join("")+'</div>';
    strip.querySelectorAll(".recent-chip").forEach(function(c){ c.onclick=function(){ openTool(c.getAttribute("data-id")); }; });
  }
  function openTool(id){
    var t=byId(id); if(!t) return;
    /* Pro lock check */
    try{
      /* Pro conversion round-5 #1: one free "taste" per Pro tool for anonymous users.
         Not-logged-in (reason "login") + is device par is tool ka sample abhi tak use nahi hua
         + tool SAMPLE_EXCLUDED mein nahi → is run ke liye lock bypass; normal tool render hota hai.
         Flag set ho jata hai, dobara kholne par lock screen waisi ki waisi. */
      var _sampleGranted=false;
      if(window.SawalPro && window.SawalPro.isLocked(id)){
        var _pst5=window.SawalPro.status();
        var _ex5=window.SawalPro.SAMPLE_EXCLUDED||[];
        var _used5=null;
        try{ _used5=localStorage.getItem("sawalai_pro_sample_"+id); }catch(_e5){}
        if(_pst5.reason==="login" && _ex5.indexOf(id)===-1 && !_used5){
          try{ localStorage.setItem("sawalai_pro_sample_"+id,"1"); }catch(_e5b){}
          window._sawalaiProSample={id:id,name:t.name,at:Date.now()};
          _sampleGranted=true;
        }
      }
      if(window.SawalPro && window.SawalPro.isLocked(id) && !_sampleGranted){
        if(tbox._cleanup){try{tbox._cleanup();}catch(e){} tbox._cleanup=null;}
        home.style.display="none"; view.classList.add("active");
        tbox.innerHTML=window.SawalPro.lockHTML(id, t.name);
        window.SawalPro.bindBuy(tbox);
        document.title=t.name+" (PRO) — US AI";
        window.scrollTo(0,0);
        return;
      }
    }catch(e){}
    /* Pro conversion round-5 #3: heavy-free-usage counter (non-Pro users only).
       Koi bhi FREE tool open hone par +1. Pro tools aur Pro users excluded. */
    try{
      if(window.SawalPro && window.SawalPro.PRO_TOOLS.indexOf(id)===-1 && !window.SawalPro.status().pro){
        var _fu=parseInt(localStorage.getItem("sawalai_free_tool_uses")||"0",10)||0;
        try{ localStorage.setItem("sawalai_free_tool_uses",String(_fu+1)); }catch(_e3){}
      }
    }catch(_e3b){}
    /* Pro conversion #3: track Pro tool visits (for recently-locked row) */
    try{
      if(window.SawalPro && window.SawalPro.PRO_TOOLS.indexOf(id)!==-1){
        var _pst=window.SawalPro.status();
        if(_pst.pro && _pst.email){
          var _vk="sawalai_pro_visits_"+_pst.email, _vm={};
          try{_vm=JSON.parse(localStorage.getItem(_vk)||"{}");}catch(_e){_vm={};}
          var _pr=_vm[id]||{count:0,last:0};
          _vm[id]={count:_pr.count+1,last:Date.now()};
          try{localStorage.setItem(_vk,JSON.stringify(_vm));}catch(_e){}
        }
      }
    }catch(_e){}
    if(tbox._cleanup){try{tbox._cleanup();}catch(e){} tbox._cleanup=null;}
    home.style.display="none"; view.classList.add("active");
    tbox.innerHTML='<div class="tool-out" id="__o" style="display:none"></div>';
    t.render(tbox);
    if(!tbox.querySelector(".tool-out")){var d=document.createElement("div");d.className="tool-out";tbox.appendChild(d);}
    /* SEO: how-to + dynamic title/meta */
    var howHtml="";
    if(t.how){ howHtml='<details class="tool-how"><summary>❓ How to use this tool?</summary><p>'+esc(t.how)+'</p></details>'; }
    var favBtn=document.createElement("button");
    favBtn.className="tool-btn ghost"; favBtn.style.cssText="margin:14px 0 0";
    function paintFav(){ favBtn.textContent=isFav(t.id)?"❤️ Saved to Favorites":"🤍 Save to Favorites"; }
    paintFav(); favBtn.onclick=function(){ toggleFav(t.id); paintFav(); };
    tbox.appendChild(favBtn);
    if(howHtml){ var hw=document.createElement("div"); hw.innerHTML=howHtml; tbox.appendChild(hw); }
    document.title=t.name+" — US AI";
    var md=document.querySelector('meta[name="description"]');
    if(md) md.setAttribute("content", t.name+": "+t.desc+". Free, no signup, works in your browser.");
    try{ if(window.SawalHistory) SawalHistory.add(t.name, "tools.html#"+t.id); }catch(e){}
    window.scrollTo(0,0);
  }
  el("tool-back").onclick=function(){
    if(tbox._cleanup){try{tbox._cleanup();}catch(e){} tbox._cleanup=null;}
    view.classList.remove("active"); home.style.display="";
    document.title="Free Online Tools — US AI";
    drawRecent();
  };
  search.addEventListener("input",draw);
  /* ?cat= param (for homepage category grid) */
  try{
    var qp=new URLSearchParams(location.search).get("cat");
    if(qp){ var btn=cats.querySelector('[data-cat="'+qp+'"]'); if(btn) btn.click(); }
  }catch(e){}
  var h=location.hash.replace("#","").split("?")[0];
  draw(); drawRecent();
  if(h) openTool(h);
  window.addEventListener("hashchange",function(){var id=location.hash.replace("#","").split("?")[0];if(id)openTool(id);});
})();

})();

/* ================= ADVANCED INTERACTIVE ================= */

TOOLS.push({ id:"estimate", cat:"finance", icon:"📝", name:"Free Estimate & Quotation Generator Online",
desc:"Professional estimates & quotations, print/PDF", how:"Enter your business and client details plus items as description | qty | rate, set tax/discount and a valid-until date, then print or save the estimate as PDF.",
render:function(box){
  box.innerHTML = '<h2>📝 Estimate & Quotation Generator</h2><p class="t-desc">Full tool on its own page:</p><p style="margin:12px 0"><a class="tool-btn" href="tool-estimate.html">Open Free Estimate Generator →</a></p><p class="t-desc">Logo upload, line items, tax & discount, multi-currency, live preview, print/PDF and one-click Convert to Invoice.</p>';
}});

TOOLS.push({ id:"invoice", cat:"finance", icon:"💳", name:"Free Invoice Generator Online",
desc:"Professional invoices, print/PDF", how:"Enter your business and client details plus items as description | qty | price, then print or save the invoice as PDF.",
render:function(box){
  box.innerHTML = '<h2>🧾 Invoice Generator</h2><div class="row"><div><label>Your business</label><input type="text" id="t-b" placeholder="My Company"></div><div><label>Client</label><input type="text" id="t-c" placeholder="Client name"></div></div><div class="row"><div><label>Invoice #</label><input type="text" id="t-n" value="INV-001"></div><div><label>Date</label><input type="date" id="t-d"></div></div><label>Items (one per line: description | qty | price)</label><textarea id="t-items" placeholder="Web design | 1 | 50000&#10;Hosting | 12 | 500"></textarea><button class="tool-btn" id="t-go">Generate Invoice</button><div class="tool-out" id="t-out" style="display:none"></div><div class="row" style="margin-top:10px"><button class="tool-btn ghost" id="t-print" style="display:none">🖨️ Print / PDF</button></div>';
  el("t-d").valueAsDate = new Date();
  el("t-go").onclick = function(){
    var items = el("t-items").value.split("\n").map(function(l){ var p=l.split("|"); return {d:(p[0]||"").trim(), q:+p[1]||0, pr:+p[2]||0}; }).filter(function(i){return i.d;});
    if(!items.length){ el("t-out").style.display="block"; el("t-out").textContent="Add at least one item."; return; }
    var total = 0, rows = items.map(function(i){ var t=i.q*i.pr; total+=t; return "<tr><td>"+esc(i.d)+"</td><td>"+i.q+"</td><td>"+i.pr.toFixed(2)+"</td><td>"+t.toFixed(2)+"</td></tr>"; }).join("");
    var html = '<div style="background:#fff;color:#111;border-radius:8px;padding:18px" id="inv-doc"><h3 style="margin:0">'+esc(el("t-b").value||"INVOICE")+'</h3><p style="color:#555;font-size:.85rem">Invoice '+esc(el("t-n").value)+' · '+esc(el("t-d").value)+' · Bill to: '+esc(el("t-c").value||"-")+'</p><table style="width:100%;border-collapse:collapse;font-size:.9rem"><tr style="background:#f0f0f0"><th style="text-align:left;padding:8px">Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>'+rows+'</table><h3 style="text-align:right">Total: '+total.toFixed(2)+'</h3></div>';
    var o = el("t-out"); o.style.display="block"; o.innerHTML = html;
    var p = el("t-print"); p.style.display=""; p.onclick=function(){ var w=window.open("","_blank"); w.document.write("<html><body>"+document.getElementById("inv-doc").outerHTML+"</body></html>"); w.document.close(); w.print(); };
  };
}});

TOOLS.push({ id:"signature", cat:"smart", icon:"✍️", name:"Free Signature Maker Online",
desc:"Draw & download signature", how:"Draw your signature with mouse or finger on the pad, then download it as a transparent PNG.",
render:function(box){
  box.innerHTML = '<h2>✍️ Signature Maker</h2><p class="tool-note">Draw your signature below, then download as PNG.</p><canvas id="t-cv" width="500" height="200" style="border:2px dashed var(--line);border-radius:10px;cursor:crosshair;touch-action:none;max-width:100%"></canvas><div class="row" style="margin-top:10px"><button class="tool-btn ghost" id="t-clear">Clear</button><button class="tool-btn" id="t-dl">⬇ Download PNG</button></div>';
  var cv=el("t-cv"), ctx=cv.getContext("2d"), drawing=false, last=null;
  ctx.strokeStyle="#1e40af"; ctx.lineWidth=3; ctx.lineCap="round";
  function pos(e){ var r=cv.getBoundingClientRect(); var x=(e.touches?e.touches[0].clientX:e.clientX)-r.left, y=(e.touches?e.touches[0].clientY:e.clientY)-r.top; return [x*cv.width/r.width, y*cv.height/r.height]; }
  function start(e){ drawing=true; last=pos(e); e.preventDefault(); }
  function move(e){ if(!drawing)return; var p=pos(e); ctx.beginPath(); ctx.moveTo(last[0],last[1]); ctx.lineTo(p[0],p[1]); ctx.stroke(); last=p; e.preventDefault(); }
  cv.addEventListener("mousedown",start); cv.addEventListener("mousemove",move); window.addEventListener("mouseup",function(){drawing=false;});
  cv.addEventListener("touchstart",start); cv.addEventListener("touchmove",move); cv.addEventListener("touchend",function(){drawing=false;});
  el("t-clear").onclick=function(){ctx.clearRect(0,0,cv.width,cv.height);};
  el("t-dl").onclick=function(){dl(cv.toDataURL("image/png"),"signature.png");};
}});

TOOLS.push({ id:"receipt", cat:"finance", icon:"🧺", name:"Free Receipt Maker Online",
desc:"Store-style receipts", how:"Enter your store name and items as item | price, then press Make Receipt to print a store-style receipt.",
render:function(box){
  box.innerHTML = '<h2>🧺 Receipt Maker</h2><label>Store name</label><input type="text" id="t-s" placeholder="My Store"><label>Items (one per line: item | price)</label><textarea id="t-items" placeholder="Bread | 120&#10;Milk | 180"></textarea><button class="tool-btn" id="t-go">Make Receipt</button><div class="tool-out" id="t-out" style="display:none;font-family:monospace"></div>';
  el("t-go").onclick=function(){
    var items=el("t-items").value.split("\n").map(function(l){var p=l.split("|");return{n:(p[0]||"").trim(),p:+p[1]||0};}).filter(function(i){return i.n;});
    if(!items.length){el("t-out").style.display="block";el("t-out").textContent="Add items.";return;}
    var total=0, lines=["*** "+(el("t-s").value||"RECEIPT")+" ***", new Date().toLocaleString(), "------------------------------"];
    items.forEach(function(i){ total+=i.p; lines.push(i.n.padEnd(20,".").slice(0,20)+" "+i.p.toFixed(2)); });
    lines.push("------------------------------","TOTAL: "+total.toFixed(2),"Thank you! 🙏");
    var o=el("t-out"); o.style.display="block"; o.textContent=lines.join("\n");
  };
}});

TOOLS.push({ id:"barcode", cat:"dev", icon:"🔖", name:"Free Barcode Generator Online",
desc:"Code-128 barcodes", how:"Type text or numbers and press Generate for a real Code-128 barcode you can download as PNG.",
render:function(box){
  box.innerHTML = '<h2>📊 Barcode Generator</h2><label>Text / numbers</label><input type="text" id="t-in" placeholder="123456789"><button class="tool-btn" id="t-go">Generate</button><div style="text-align:center;margin-top:14px" id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button><p class="tool-note">Uses bwip-js CDN for real Code-128 barcodes.</p>';
  el("t-go").onclick=function(){
    var t=el("t-in").value.trim(); if(!t){el("t-prev").innerHTML="Enter text.";return;}
    el("t-prev").innerHTML="Loading...";
    var s=document.createElement("script");
    s.src="https://cdn.jsdelivr.net/npm/bwip-js@4/dist/bwip-js-min.js";
    s.onload=function(){
      try{
        var c=document.createElement("canvas");
        bwipjs.toCanvas(c,{bcid:"code128",text:t,scale:3,height:12,includetext:true});
        el("t-prev").innerHTML=""; el("t-prev").appendChild(c); c.style.maxWidth="100%";
        var b=el("t-dl"); b.style.display=""; b.onclick=function(){dl(c.toDataURL("image/png"),"barcode.png");};
      }catch(e){ el("t-prev").innerHTML="Barcode failed for this text."; }
    };
    s.onerror=function(){el("t-prev").innerHTML="Could not load barcode library.";};
    document.head.appendChild(s);
  };
}});

TOOLS.push({ id:"hash", cat:"dev", icon:"💾", name:"Free MD5 / SHA Hash Generator Online",
desc:"Hash any text", how:"Type any text, pick SHA-256, SHA-1, SHA-384 or SHA-512, and press Generate Hash.",
render:function(box){
  box.innerHTML = '<h2>🔒 Hash Generator</h2><label>Text</label><textarea id="t-in" placeholder="Hello"></textarea><label>Algorithm</label><select id="t-a"><option value="SHA-256">SHA-256</option><option value="SHA-1">SHA-1</option><option value="SHA-384">SHA-384</option><option value="SHA-512">SHA-512</option></select><button class="tool-btn" id="t-go">Generate Hash</button><div class="tool-out" id="t-out" style="font-family:monospace;word-break:break-all"></div>';
  el("t-go").onclick=function(){
    var t=el("t-in").value; if(!t){outHTML(box,"Enter text.");return;}
    crypto.subtle.digest(el("t-a").value, new TextEncoder().encode(t)).then(function(h){
      var hex=Array.from(new Uint8Array(h)).map(function(b){return b.toString(16).padStart(2,"0");}).join("");
      outHTML(box,hex);
    });
  };
}});

TOOLS.push({ id:"shadow", cat:"dev", icon:"🌑", name:"Free CSS Box Shadow Generator Online",
desc:"Visual shadow designer", how:"Adjust X, Y, blur, spread and color to design a box shadow visually, then copy the CSS.",
render:function(box){
  box.innerHTML = '<h2>🌑 Box Shadow Generator</h2><div class="row"><div><label>X offset</label><input type="range" id="t-x" min="-50" max="50" value="0"></div><div><label>Y offset</label><input type="range" id="t-y" min="-50" max="50" value="10"></div></div><div class="row"><div><label>Blur</label><input type="range" id="t-b" min="0" max="100" value="20"></div><div><label>Spread</label><input type="range" id="t-s" min="-30" max="30" value="0"></div></div><label>Color</label><input type="color" id="t-c" value="#000000"><div id="t-prev" style="margin:18px auto;width:160px;height:160px;background:#6366f1;border-radius:16px"></div><div class="tool-out" id="t-out" style="font-family:monospace"></div><button class="tool-btn ghost tool-copy" id="t-copy">Copy CSS</button>';
  function upd(){
    var v=el("t-x").value+"px "+el("t-y").value+"px "+el("t-b").value+"px "+el("t-s").value+"px "+el("t-c").value;
    el("t-prev").style.boxShadow=v;
    el("t-out").textContent="box-shadow: "+v+";"; el("t-out").style.display="block";
  }
  ["t-x","t-y","t-b","t-s","t-c"].forEach(function(id){el(id).addEventListener("input",upd);});
  upd(); el("t-copy").onclick=function(){copyText(el("t-out").textContent,this);};
}});

TOOLS.push({ id:"gradient", cat:"image", icon:"🌇", name:"Free Gradient Generator Online",
desc:"Beautiful CSS gradients", how:"Pick two colors and an angle to preview a gradient live, then copy the CSS.",
render:function(box){
  box.innerHTML = '<h2>🌈 Gradient Generator</h2><div class="row"><div><label>Color 1</label><input type="color" id="t-a" value="#6366f1"></div><div><label>Color 2</label><input type="color" id="t-b" value="#a855f7"></div><div><label>Angle</label><input type="range" id="t-g" min="0" max="360" value="135"></div></div><div id="t-prev" style="height:120px;border-radius:12px;margin-top:14px"></div><div class="tool-out" id="t-out" style="font-family:monospace"></div><button class="tool-btn ghost tool-copy" id="t-copy">Copy CSS</button>';
  function upd(){
    var g="linear-gradient("+el("t-g").value+"deg, "+el("t-a").value+", "+el("t-b").value+")";
    el("t-prev").style.background=g;
    el("t-out").textContent="background: "+g+";"; el("t-out").style.display="block";
  }
  ["t-a","t-b","t-g"].forEach(function(id){el(id).addEventListener("input",upd);});
  upd(); el("t-copy").onclick=function(){copyText(el("t-out").textContent,this);};
}});

TOOLS.push({ id:"tts", cat:"text", icon:"🗨️", name:"Free Text to Speech Online",
desc:"Listen to any text", how:"Type any text, pick a voice and speed, then press Speak to hear it read aloud by your browser.",
render:function(box){
  box.innerHTML = '<h2>🔊 Text to Speech</h2><label>Text</label><textarea id="t-in" placeholder="Type text to hear it spoken aloud…"></textarea><div class="row"><div><label>Voice</label><select id="t-v"></select></div><div><label>Speed</label><input type="range" id="t-r" min="0.5" max="2" step="0.1" value="1"></div></div><div class="row" style="margin-top:10px"><button class="tool-btn" id="t-go">▶ Speak</button><button class="tool-btn ghost" id="t-stop">⏹ Stop</button></div><p class="tool-note">Uses your browser\u2019s built-in voices — free, no server.</p>';
  function voices(){
    var vs=speechSynthesis.getVoices();
    el("t-v").innerHTML=vs.map(function(v,i){return "<option value='"+i+"'>"+v.name+"</option>";}).join("");
  }
  speechSynthesis.onvoiceschanged=voices; voices();
  el("t-go").onclick=function(){
    speechSynthesis.cancel();
    var u=new SpeechSynthesisUtterance(el("t-in").value);
    var vs=speechSynthesis.getVoices(); if(vs[+el("t-v").value]) u.voice=vs[+el("t-v").value];
    u.rate=+el("t-r").value; speechSynthesis.speak(u);
  };
  el("t-stop").onclick=function(){speechSynthesis.cancel();};
}});

TOOLS.push({ id:"stt", cat:"text", icon:"🎤", name:"Free Speech to Text Online",
desc:"Dictate with your mic", how:"Press Start, allow the mic, and speak. Your words appear as text. Works best in Chrome or Edge.",
render:function(box){
  box.innerHTML = '<h2>🎤 Speech to Text</h2><p class="tool-note">Uses browser speech recognition (Chrome/Edge best). Click start and speak.</p><div class="row"><button class="tool-btn" id="t-go">🎤 Start Listening</button><button class="tool-btn ghost" id="t-stop">⏹ Stop</button></div><label>Transcript</label><textarea id="t-out2" placeholder="Your words appear here..." style="min-height:140px"></textarea><button class="tool-btn ghost tool-copy" id="t-copy">Copy Text</button>';
  var rec=null;
  el("t-go").onclick=function(){
    var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){el("t-out2").value="Not supported in this browser. Try Chrome.";return;}
    rec=new SR(); rec.continuous=true; rec.interimResults=true;
    rec.onresult=function(e){
      var t=""; for(var i=e.resultIndex;i<e.results.length;i++) t+=e.results[i][0].transcript;
      el("t-out2").value=t;
    };
    rec.start(); el("t-go").textContent="🔴 Listening...";
  };
  el("t-stop").onclick=function(){ if(rec)rec.stop(); el("t-go").textContent="🎤 Start Listening"; };
  el("t-copy").onclick=function(){copyText(el("t-out2").value,this);};
}});

TOOLS.push({ id:"binary", cat:"dev", icon:"0️⃣", name:"Free Binary ⇄ Text Converter Online",
desc:"Encode & decode binary", how:"Type text and press Text to Binary to encode it, or paste binary and press Binary to Text to decode.",
render:function(box){
  box.innerHTML = '<h2>💻 Binary Converter</h2><label>Text or binary</label><textarea id="t-in" placeholder="Hello  or  01001000..."></textarea><div class="row"><button class="tool-btn" id="t-e">Text → Binary</button><button class="tool-btn ghost" id="t-d">Binary → Text</button></div><div class="tool-out" id="t-out" style="font-family:monospace"></div>';
  el("t-e").onclick=function(){
    var t=el("t-in").value; if(!t){outHTML(box,"Enter text.");return;}
    outHTML(box, t.split("").map(function(c){return c.charCodeAt(0).toString(2).padStart(8,"0");}).join(" "));
  };
  el("t-d").onclick=function(){
    var t=el("t-in").value.replace(/[^01]/g,""); if(!t){outHTML(box,"Enter binary.");return;}
    var out=""; for(var i=0;i<t.length;i+=8){ var b=t.substr(i,8); if(b.length===8) out+=String.fromCharCode(parseInt(b,2)); }
    outHTML(box,esc(out)||"(no valid bytes)");
  };
}});

/* ================= FINANCIAL & BUSINESS ================= */

TOOLS.push({ id:"compound", cat:"finance", icon:"🤑", name:"Free Compound Interest Calculator Online",
desc:"Grow your savings", how:"Enter principal, annual rate, years and compounding frequency to see how your savings grow.",
render:function(box){
  box.innerHTML = '<h2>📈 Compound Interest</h2><div class="row"><div><label>Principal</label><input type="number" id="t-p" value="100000"></div><div><label>Annual rate %</label><input type="number" id="t-r" value="10" step="0.1"></div><div><label>Years</label><input type="number" id="t-y" value="10"></div><div><label>Compound</label><select id="t-f"><option value="12">Monthly</option><option value="4">Quarterly</option><option value="1">Yearly</option></select></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var P=+el("t-p").value,r=+el("t-r").value/100,n=+el("t-f").value,t=+el("t-y").value;
    var A=P*Math.pow(1+r/n,n*t);
    outHTML(box,"Final amount: "+A.toFixed(2)+"\nInterest earned: "+(A-P).toFixed(2)+"\nGrowth: "+((A/P-1)*100).toFixed(1)+"%");
  };
}});

TOOLS.push({ id:"gst", cat:"finance", icon:"🏛️", name:"Free GST / Tax Calculator Online",
desc:"Add or remove tax", how:"Enter an amount and tax percent, then press Add Tax or Remove Tax to calculate the totals.",
render:function(box){
  box.innerHTML = '<h2>🧾 GST / Tax Calculator</h2><div class="row"><div><label>Amount</label><input type="number" id="t-a" value="1000"></div><div><label>Tax %</label><input type="number" id="t-r" value="18"></div></div><div class="row" style="margin-top:10px"><button class="tool-btn" id="t-add">Add Tax</button><button class="tool-btn ghost" id="t-rem">Remove Tax</button></div><div class="tool-out" id="t-out"></div>';
  function calc(add){
    var a=+el("t-a").value,r=+el("t-r").value/100;
    if(add) outHTML(box,"Tax: "+(a*r).toFixed(2)+"\nTotal with tax: "+(a*(1+r)).toFixed(2));
    else outHTML(box,"Tax: "+(a-a/(1+r)).toFixed(2)+"\nAmount without tax: "+(a/(1+r)).toFixed(2));
  }
  el("t-add").onclick=function(){calc(true);}; el("t-rem").onclick=function(){calc(false);};
}});

TOOLS.push({ id:"tip", cat:"finance", icon:"💰", name:"Free Tip Calculator Online",
desc:"Split bills fairly", how:"Enter the bill, tip percent and number of people to split it fairly per person.",
render:function(box){
  box.innerHTML = '<h2>💰 Tip Calculator</h2><div class="row"><div><label>Bill amount</label><input type="number" id="t-b" value="1000"></div><div><label>Tip %</label><input type="number" id="t-t" value="10"></div><div><label>People</label><input type="number" id="t-p" value="2" min="1"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var b=+el("t-b").value,t=+el("t-t").value/100,p=Math.max(1,+el("t-p").value||1);
    var tip=b*t;
    outHTML(box,"Tip: "+tip.toFixed(2)+"\nTotal: "+(b+tip).toFixed(2)+"\nPer person: "+((b+tip)/p).toFixed(2));
  };
}});

TOOLS.push({ id:"fuel", cat:"finance", icon:"⛽", name:"Free Fuel Cost Calculator Online",
desc:"Trip fuel expenses", how:"Enter distance in km, fuel efficiency and price per litre to estimate your trip fuel cost.",
render:function(box){
  box.innerHTML = '<h2>⛽ Fuel Cost Calculator</h2><div class="row"><div><label>Distance (km)</label><input type="number" id="t-d" value="100"></div><div><label>Efficiency (km/l)</label><input type="number" id="t-e" value="15" step="0.1"></div><div><label>Fuel price / litre</label><input type="number" id="t-p" value="260"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var d=+el("t-d").value,e=+el("t-e").value,p=+el("t-p").value;
    if(!e){outHTML(box,"Enter efficiency.");return;}
    var litres=d/e;
    outHTML(box,"Fuel needed: "+litres.toFixed(2)+" litres\nTrip cost: "+(litres*p).toFixed(2)+"\nCost per km: "+(p/e).toFixed(2));
  };
}});

TOOLS.push({ id:"salary", cat:"finance", icon:"💼", name:"Free Salary / Wage Calculator Online",
desc:"Hourly ⇄ monthly ⇄ yearly", how:"Enter an amount, say whether it is monthly, hourly or yearly, add hours per week, and convert between them.",
render:function(box){
  box.innerHTML = '<h2>💼 Salary Calculator</h2><div class="row"><div><label>Amount</label><input type="number" id="t-a" value="50000"></div><div><label>This amount is</label><select id="t-t"><option value="m">Monthly</option><option value="h">Hourly</option><option value="y">Yearly</option></select></div><div><label>Hours/week</label><input type="number" id="t-h" value="40"></div></div><button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var a=+el("t-a").value,t=el("t-t").value,h=+el("t-h").value||40;
    var yearly, monthly, hourly;
    if(t==="m"){monthly=a;yearly=a*12;hourly=a*12/(h*52);}
    else if(t==="h"){hourly=a;yearly=a*h*52;monthly=yearly/12;}
    else {yearly=a;monthly=a/12;hourly=a/(h*52);}
    outHTML(box,"Hourly: "+hourly.toFixed(2)+"\nMonthly: "+monthly.toFixed(2)+"\nYearly: "+yearly.toFixed(2));
  };
}});

TOOLS.push({ id:"margin", cat:"finance", icon:"💷", name:"Free Profit Margin Calculator Online",
desc:"Margin & markup", how:"Enter cost price and selling price to see your profit, margin and markup percentages.",
render:function(box){
  box.innerHTML = '<h2>📊 Margin Calculator</h2><div class="row"><div><label>Cost price</label><input type="number" id="t-c" value="700"></div><div><label>Selling price</label><input type="number" id="t-s" value="1000"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var c=+el("t-c").value,s=+el("t-s").value;
    if(!s){outHTML(box,"Enter selling price.");return;}
    var profit=s-c;
    outHTML(box,"Profit: "+profit.toFixed(2)+"\nMargin: "+(profit/s*100).toFixed(1)+"%\nMarkup: "+(c?(profit/c*100).toFixed(1):0)+"%");
  };
}});

TOOLS.push({ id:"retire", cat:"finance", icon:"🏖️", name:"Free Retirement Calculator Online",
desc:"Plan your nest egg", how:"Enter your current age, retirement age, monthly savings and expected return to project your nest egg.",
render:function(box){
  box.innerHTML = '<h2>🏖️ Retirement Calculator</h2><div class="row"><div><label>Current age</label><input type="number" id="t-a" value="30"></div><div><label>Retire at</label><input type="number" id="t-r" value="60"></div></div><div class="row"><div><label>Monthly savings</label><input type="number" id="t-s" value="20000"></div><div><label>Annual return %</label><input type="number" id="t-i" value="10" step="0.1"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var yrs=(+el("t-r").value)-(+el("t-a").value), s=+el("t-s").value, r=(+el("t-i").value)/1200, n=yrs*12;
    if(yrs<=0){outHTML(box,"Retirement age must be above current age.");return;}
    var fv=r?s*(Math.pow(1+r,n)-1)/r:s*n;
    outHTML(box,"In "+yrs+" years you\u2019ll have: "+Math.round(fv).toLocaleString()+"\nTotal saved: "+Math.round(s*n).toLocaleString()+"\nGrowth: "+Math.round(fv-s*n).toLocaleString());
  };
}});

TOOLS.push({ id:"crypto", cat:"finance", icon:"💶", name:"Free Crypto Profit Calculator Online",
desc:"Coin gains & losses", how:"Enter buy price, sell price and coin amount to estimate your crypto profit or loss. Estimates only, not financial advice.",
render:function(box){
  box.innerHTML = '<h2>₿ Crypto Profit Calculator</h2><div class="row"><div><label>Buy price</label><input type="number" id="t-b" placeholder="30000" step="any"></div><div><label>Sell price</label><input type="number" id="t-s" placeholder="45000" step="any"></div><div><label>Amount (coins)</label><input type="number" id="t-a" value="0.5" step="any"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">Estimates only — not financial advice.</p>';
  el("t-go").onclick=function(){
    var b=+el("t-b").value,s=+el("t-s").value,a=+el("t-a").value;
    if(!b||!a){outHTML(box,"Enter buy price and amount.");return;}
    var profit=(s-b)*a;
    outHTML(box,"Invested: "+(b*a).toFixed(2)+"\nWorth now: "+(s*a).toFixed(2)+"\nProfit/Loss: "+(profit>=0?"+":"")+profit.toFixed(2)+" ("+(profit/(b*a)*100).toFixed(1)+"%)");
  };
}});

TOOLS.push({ id:"shipping", cat:"finance", icon:"📦", name:"Free Shipping Cost Estimator Online",
desc:"Parcel cost estimate", how:"Enter weight, distance and rate per kg per km for a rough parcel cost estimate. Couriers charge their own rates.",
render:function(box){
  box.innerHTML = '<h2>📦 Shipping Estimator</h2><div class="row"><div><label>Weight (kg)</label><input type="number" id="t-w" value="2" step="0.1"></div><div><label>Distance (km)</label><input type="number" id="t-d" value="500"></div><div><label>Rate per kg/km</label><input type="number" id="t-r" value="0.5" step="0.01"></div></div><button class="tool-btn" id="t-go">Estimate</button><div class="tool-out" id="t-out"></div><p class="tool-note">Rough estimate — couriers charge by slabs and zones.</p>';
  el("t-go").onclick=function(){
    var w=+el("t-w").value,d=+el("t-d").value,r=+el("t-r").value;
    var base=150, cost=base+w*d*r;
    outHTML(box,"Estimated cost: "+Math.round(cost)+"\n(Base "+base+" + weight×distance×rate)");
  };
}});

TOOLS.push({ id:"breakeven", cat:"finance", icon:"🟰", name:"Free Break-Even Calculator Online",
desc:"When profit starts", how:"Enter fixed costs, price per unit and variable cost per unit to find how many units you must sell to break even.",
render:function(box){
  box.innerHTML = '<h2>⚖️ Break-Even Analysis</h2><div class="row"><div><label>Fixed costs</label><input type="number" id="t-f" value="50000"></div><div><label>Price per unit</label><input type="number" id="t-p" value="500"></div><div><label>Variable cost/unit</label><input type="number" id="t-v" value="300"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var f=+el("t-f").value,p=+el("t-p").value,v=+el("t-v").value;
    var margin=p-v;
    if(margin<=0){outHTML(box,"Price must exceed variable cost!");return;}
    var units=Math.ceil(f/margin);
    outHTML(box,"Break-even: "+units.toLocaleString()+" units\nRevenue needed: "+(units*p).toLocaleString()+"\nContribution margin: "+margin.toFixed(2)+"/unit");
  };
}});

/* ================= FUN & GAMES ================= */

TOOLS.push({ id:"tictactoe", cat:"fun", icon:"⭕", name:"Free Tic-Tac-Toe Online",
desc:"Play vs computer", how:"You play X against the computer. Click any square to make your move and try to get three in a row.",
render:function(box){
  box.innerHTML = '<h2>⭕ Tic-Tac-Toe</h2><p class="muted" style="text-align:center">You are ❌ — click a square</p><div id="t-b" style="display:grid;grid-template-columns:repeat(3,80px);gap:8px;justify-content:center;margin:14px 0"></div><p id="t-msg" style="text-align:center;font-weight:700"></p><button class="tool-btn ghost" id="t-rs" style="display:block;margin:0 auto">Restart</button>';
  var b, over;
  function draw(){
    el("t-b").innerHTML = b.map(function(v,i){ return '<button data-i="'+i+'" style="width:80px;height:80px;font-size:2rem;border-radius:10px;border:1px solid var(--line);background:rgba(255,255,255,.05);color:var(--text);cursor:pointer">'+(v||"")+'</button>'; }).join("");
    el("t-b").querySelectorAll("button").forEach(function(btn){ btn.onclick=function(){ play(+btn.getAttribute("data-i")); }; });
  }
  function win(p){ var w=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; return w.some(function(l){return b[l[0]]===p&&b[l[1]]===p&&b[l[2]]===p;}); }
  function play(i){
    if(over||b[i])return; b[i]="❌";
    if(win("❌")){over=true;el("t-msg").textContent="You win! 🎉";draw();return;}
    if(b.every(Boolean)){over=true;el("t-msg").textContent="Draw!";draw();return;}
    var e=b.map(function(v,i){return v?"":i;}).filter(function(v){return v!=="";});
    var m=e[Math.floor(Math.random()*e.length)]; b[m]="⭕";
    if(win("⭕")){over=true;el("t-msg").textContent="Computer wins! 🤖";}
    else if(b.every(Boolean)){over=true;el("t-msg").textContent="Draw!";}
    draw();
  }
  el("t-rs").onclick=function(){ b=Array(9).fill(""); over=false; el("t-msg").textContent=""; draw(); };
  el("t-rs").click();
}});

TOOLS.push({ id:"rps", cat:"fun", icon:"✊", name:"Free Rock Paper Scissors Online",
desc:"Best of luck!", how:"Click Rock, Paper or Scissors to play against the computer. The highest score takes the round.",
render:function(box){
  box.innerHTML = '<h2>✊ Rock Paper Scissors</h2><div class="row" style="justify-content:center"><button class="tool-btn" data-m="✊">✊ Rock</button><button class="tool-btn" data-m="✋">✋ Paper</button><button class="tool-btn" data-m="✌️">✌️ Scissors</button></div><div class="tool-out" id="t-out" style="display:block;text-align:center;font-size:1.2rem">Pick your move!</div><p class="muted" style="text-align:center" id="t-score">You 0 — 0 CPU</p>';
  var ys=0, cs=0;
  box.querySelectorAll("[data-m]").forEach(function(btn){
    btn.onclick=function(){
      var y=btn.getAttribute("data-m"), c=["✊","✋","✌️"][Math.floor(Math.random()*3)], r;
      if(y===c) r="Draw!";
      else if((y==="✊"&&c==="✌️")||(y==="✋"&&c==="✊")||(y==="✌️"&&c==="✋")){ r="You win! 🎉"; ys++; }
      else { r="CPU wins! 🤖"; cs++; }
      el("t-out").textContent="You "+y+"  vs  "+c+" CPU\n"+r;
      el("t-score").textContent="You "+ys+" — "+cs+" CPU";
    };
  });
}});

TOOLS.push({ id:"memory", cat:"fun", icon:"🃏", name:"Free Memory Card Match Online",
desc:"Find the pairs", how:"Click cards to flip them and find all matching pairs in as few moves as you can.",
render:function(box){
  box.innerHTML = '<h2>🃏 Memory Match</h2><p class="muted" style="text-align:center" id="t-info">Moves: 0</p><div id="t-g" style="display:grid;grid-template-columns:repeat(4,64px);gap:8px;justify-content:center;margin:12px 0"></div><button class="tool-btn ghost" id="t-rs" style="display:block;margin:0 auto">Restart</button>';
  var deck, open, lock, moves, found;
  function start(){
    var em=["🐶","🐱","🦊","🐼","🦁","🐸","🐵","🐷"];
    deck=em.concat(em).sort(function(){return Math.random()-0.5;});
    open=[];lock=false;moves=0;found=0; el("t-info").textContent="Moves: 0"; draw();
  }
  function draw(){
    el("t-g").innerHTML=deck.map(function(e,i){
      var show=open.indexOf(i)>-1||deck["_f"+i];
      return '<button data-i="'+i+'" style="width:64px;height:64px;font-size:1.8rem;border-radius:10px;border:1px solid var(--line);background:'+(show?"rgba(99,102,241,.25)":"rgba(255,255,255,.05)")+';cursor:pointer">'+(show?e:"❓")+'</button>';
    }).join("");
    el("t-g").querySelectorAll("button").forEach(function(b){ b.onclick=function(){ flip(+b.getAttribute("data-i")); }; });
  }
  function flip(i){
    if(lock||open.indexOf(i)>-1||deck["_f"+i])return;
    open.push(i); draw();
    if(open.length===2){
      moves++; el("t-info").textContent="Moves: "+moves; lock=true;
      setTimeout(function(){
        if(deck[open[0]]===deck[open[1]]){ deck["_f"+open[0]]=1; deck["_f"+open[1]]=1; found+=2;
          if(found===16) el("t-info").textContent="🎉 Done in "+moves+" moves!"; }
        open=[]; lock=false; draw();
      },650);
    }
  }
  el("t-rs").onclick=start; start();
}});

TOOLS.push({ id:"coinflip", cat:"fun", icon:"🌕", name:"Free Coin Flip Online",
desc:"Heads or tails", how:"Press Flip Coin for an animated heads or tails result, with a running score of both.",
render:function(box){
  box.innerHTML = '<h2>🪙 Coin Flip</h2><div id="t-c" style="font-size:5rem;text-align:center;transition:transform .3s">🪙</div><div class="tool-out" id="t-out" style="display:block;text-align:center;font-size:1.3rem">Tap flip!</div><button class="tool-btn" id="t-go" style="display:block;margin:10px auto">Flip Coin</button><p class="muted" style="text-align:center" id="t-h">Heads 0 · Tails 0</p>';
  var h=0,t=0;
  el("t-go").onclick=function(){
    var c=el("t-c"); c.style.transform="rotateY(720deg)";
    setTimeout(function(){ c.style.transform="rotateY(0deg)"; },320);
    var r=Math.random()<0.5;
    if(r){h++;el("t-out").textContent="👑 HEADS!";}else{t++;el("t-out").textContent="🔢 TAILS!";}
    el("t-h").textContent="Heads "+h+" · Tails "+t;
  };
}});

TOOLS.push({ id:"dice", cat:"fun", icon:"⚀", name:"Free Dice Roller Online",
desc:"Roll up to 6 dice", how:"Choose how many dice to roll, up to 6, and press Roll to see the result instantly.",
render:function(box){
  box.innerHTML = '<h2>🎲 Dice Roller</h2><label>Number of dice</label><select id="t-n"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select><button class="tool-btn" id="t-go">Roll!</button><div id="t-d" style="font-size:3.5rem;text-align:center;margin:14px 0"></div><div class="tool-out" id="t-out" style="display:block;text-align:center"></div>';
  var faces=["⚀","⚁","⚂","⚃","⚄","⚅"];
  el("t-go").onclick=function(){
    var n=+el("t-n").value, rolls=[], total=0;
    for(var i=0;i<n;i++){ var r=1+Math.floor(Math.random()*6); rolls.push(r); total+=r; }
    el("t-d").textContent=rolls.map(function(r){return faces[r-1];}).join(" ");
    el("t-out").textContent="Total: "+total+(n>1?"  ("+rolls.join("+")+")":"");
  };
  el("t-go").click();
}});

TOOLS.push({ id:"wheel", cat:"fun", icon:"🎪", name:"Free Spin the Wheel Online",
desc:"Lucky draw picker", how:"Paste names one per line and press SPIN for a lucky-draw style random winner.",
render:function(box){
  box.innerHTML = '<h2>🎡 Spin the Wheel</h2><label>Names (one per line)</label><textarea id="t-n" placeholder="Ali&#10;Sara&#10;Ahmed&#10;Fatima"></textarea><button class="tool-btn" id="t-go">SPIN!</button><div class="tool-out" id="t-out" style="display:block;text-align:center;font-size:1.5rem;min-height:60px">Add names & spin</div>';
  el("t-go").onclick=function(){
    var names=el("t-n").value.split("\n").map(function(s){return s.trim();}).filter(Boolean);
    if(names.length<2){el("t-out").textContent="Add at least 2 names.";return;}
    var o=el("t-out"), i=0;
    var iv=setInterval(function(){
      o.textContent="🎡 "+names[Math.floor(Math.random()*names.length)];
      if(++i>14){ clearInterval(iv); o.textContent="🎉 WINNER: "+names[Math.floor(Math.random()*names.length)]+" 🎉"; }
    },90);
  };
}});

TOOLS.push({ id:"love", cat:"fun", icon:"❤️", name:"Free Love Calculator Online",
desc:"Just for fun 💕", how:"Type your name and your crush name, press Calculate, and get a fun love score. Just for entertainment.",
render:function(box){
  box.innerHTML = '<h2>❤️ Love Calculator</h2><div class="row"><div><label>Your name</label><input type="text" id="t-a" placeholder="Ali"></div><div><label>Crush name</label><input type="text" id="t-b" placeholder="Sara"></div></div><button class="tool-btn" id="t-go">Calculate Love %</button><div class="tool-out" id="t-out" style="display:block;text-align:center;font-size:1.4rem"></div><p class="tool-note">100% for entertainment — real love needs real effort 😉</p>';
  el("t-go").onclick=function(){
    var a=el("t-a").value.trim().toLowerCase(), b=el("t-b").value.trim().toLowerCase();
    if(!a||!b){el("t-out").textContent="Enter both names.";return;}
    var h=0, s=a+"loves"+b;
    for(var i=0;i<s.length;i++) h=(h*31+s.charCodeAt(i))%100;
    var pct=50+Math.floor(h/2);
    el("t-out").textContent="💕 "+pct+"% 💕\n"+(pct>85?"Soulmates! 💍":pct>70?"Strong spark! ✨":pct>55?"Good potential 💫":"Just friends? 🙂");
  };
}});

TOOLS.push({ id:"zodiac", cat:"fun", icon:"♈", name:"Free Zodiac Finder Online",
desc:"Your star sign", how:"Pick your birth date and press Reveal My Sign to find your star sign. Just for fun.",
render:function(box){
  box.innerHTML = '<h2>♈ Zodiac Finder</h2><label>Birth date</label><input type="date" id="t-d"><button class="tool-btn" id="t-go">Reveal My Sign</button><div class="tool-out" id="t-out" style="display:block;text-align:center"></div><p class="tool-note">For fun — the stars don\u2019t decide your day 😉</p>';
  var Z=[["♑ Capricorn","Dec 22 – Jan 19","Ambitious and disciplined."],["♒ Aquarius","Jan 20 – Feb 18","Independent and original."],["♓ Pisces","Feb 19 – Mar 20","Dreamy and kind."],["♈ Aries","Mar 21 – Apr 19","Bold and energetic."],["♉ Taurus","Apr 20 – May 20","Loyal and patient."],["♊ Gemini","May 21 – Jun 20","Curious and witty."],["♋ Cancer","Jun 21 – Jul 22","Caring and intuitive."],["♌ Leo","Jul 23 – Aug 22","Confident and warm."],["♍ Virgo","Aug 23 – Sep 22","Detail-loving and smart."],["♎ Libra","Sep 23 – Oct 22","Charming and fair."],["♏ Scorpio","Oct 23 – Nov 21","Intense and brave."],["♐ Sagittarius","Nov 22 – Dec 21","Adventurous and honest."]];
  el("t-go").onclick=function(){
    var d=new Date(el("t-d").value); if(isNaN(d)){el("t-out").textContent="Pick a date.";return;}
    var m=d.getMonth()+1, day=d.getDate(), z;
    if((m===12&&day>=22)||(m===1&&day<=19))z=Z[0];else if(m===1||(m===2&&day<=18))z=Z[1];
    else if(m===2||(m===3&&day<=20))z=Z[2];else if(m===3||(m===4&&day<=19))z=Z[3];
    else if(m===4||(m===5&&day<=20))z=Z[4];else if(m===5||(m===6&&day<=20))z=Z[5];
    else if(m===6||(m===7&&day<=22))z=Z[6];else if(m===7||(m===8&&day<=22))z=Z[7];
    else if(m===8||(m===9&&day<=22))z=Z[8];else if(m===9||(m===10&&day<=22))z=Z[9];
    else if(m===10||(m===11&&day<=21))z=Z[10];else z=Z[11];
    el("t-out").innerHTML='<div style="font-size:3rem">'+z[0].split(" ")[0]+'</div><b>'+z[0]+'</b><br><span class="muted">'+z[1]+'</span><br>'+z[2];
  };
}});

TOOLS.push({ id:"joke", cat:"fun", icon:"🤣", name:"Free Joke & Quote Generator Online",
desc:"Laughs & wisdom", how:"Press New Joke for a random joke or New Quote for a bit of wisdom.",
render:function(box){
  box.innerHTML = '<h2>😂 Jokes & Quotes</h2><div class="row" style="justify-content:center"><button class="tool-btn" id="t-j">😂 New Joke</button><button class="tool-btn ghost" id="t-q">💡 New Quote</button></div><div class="tool-out" id="t-out" style="display:block;min-height:80px;font-size:1.05rem"></div>';
  var J=["Why don\u2019t scientists trust atoms? Because they make up everything!","I told my computer I needed a break... now it won\u2019t stop sending me ads for vacations.","Why did the developer go broke? He used up all his cache.","Parallel lines have so much in common. Shame they\u2019ll never meet.","I\u2019m reading a book about anti-gravity. It\u2019s impossible to put down!","Why do programmers prefer dark mode? Because light attracts bugs!"];
  var Q=["The best time to plant a tree was 20 years ago. The second best time is now.","Done is better than perfect.","Small steps every day lead to big results.","Discipline beats motivation.","Your future self is watching you right now.","Focus on progress, not perfection."];
  el("t-j").onclick=function(){ el("t-out").textContent="😂 "+J[Math.floor(Math.random()*J.length)]; };
  el("t-q").onclick=function(){ el("t-out").textContent="💡 \u201C"+Q[Math.floor(Math.random()*Q.length)]+"\u201D"; };
  el("t-j").click();
}});

TOOLS.push({ id:"colorguess", cat:"fun", icon:"🤔", name:"Free Color Guessing Game Online",
desc:"Test your eye!", how:"Look at the shown color code, then click the matching color swatch to score points and test your eye.",
render:function(box){
  box.innerHTML = '<h2>🎨 Color Guessing Game</h2><p class="muted" style="text-align:center">Click the <b id="t-name"></b> color!</p><div id="t-g" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0"></div><p style="text-align:center;font-weight:700" id="t-s">Score: 0</p>';
  var score=0, target="";
  function rnd(){ return "#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0"); }
  function names(h){ var n={"f00":"red","0f0":"green","00f":"blue","ff0":"yellow","f0f":"magenta","0ff":"cyan"}; return n[h.slice(1,4)]||"mystery"; }
  function round(){
    var cols=[rnd(),rnd(),rnd()], ti=Math.floor(Math.random()*3);
    target=cols[ti]; el("t-name").textContent=names(target);
    el("t-g").innerHTML=cols.map(function(c){ return '<button data-c="'+c+'" style="height:70px;border-radius:10px;border:2px solid #ffffff33;background:'+c+';cursor:pointer"></button>'; }).join("");
    el("t-g").querySelectorAll("button").forEach(function(b){
      b.onclick=function(){
        if(b.getAttribute("data-c")===target){ score++; el("t-s").textContent="Score: "+score+" ✅"; }
        else { el("t-s").textContent="Score: "+score+" ❌ was "+target; score=0; setTimeout(function(){el("t-s").textContent="Score: 0";},1200); }
        round();
      };
    });
  }
  round();
}});

/* ================= HEALTH & FITNESS ================= */

TOOLS.push({ id:"calories", cat:"health", icon:"🔥", name:"Free Calorie Intake Calculator Online",
desc:"Daily calorie needs", how:"Enter age, gender, height, weight and activity level to estimate your daily calorie needs.",
render:function(box){
  box.innerHTML = '<h2>🔥 Calorie Calculator</h2><div class="row"><div><label>Age</label><input type="number" id="t-a" value="30"></div><div><label>Gender</label><select id="t-g"><option>Male</option><option>Female</option></select></div></div><div class="row"><div><label>Height (cm)</label><input type="number" id="t-h" value="170"></div><div><label>Weight (kg)</label><input type="number" id="t-w" value="70"></div></div><label>Activity</label><select id="t-x"><option value="1.2">Sedentary</option><option value="1.375">Light exercise</option><option value="1.55">Moderate</option><option value="1.725">Very active</option></select><label>Goal</label><select id="t-goal"><option value="0">Maintain</option><option value="-500">Lose weight</option><option value="500">Gain weight</option></select><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">Estimate only — not medical advice.</p>';
  el("t-go").onclick=function(){
    var a=+el("t-a").value,h=+el("t-h").value,w=+el("t-w").value;
    var bmr=el("t-g").value==="Male"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;
    var tdee=Math.round(bmr*(+el("t-x").value))+(+el("t-goal").value);
    outHTML(box,"Daily calories: ~"+tdee+" kcal\n(BMR "+Math.round(bmr)+")");
  };
}});

TOOLS.push({ id:"water", cat:"health", icon:"🚰", name:"Free Water Intake Calculator Online",
desc:"Daily hydration goal", how:"Enter your weight in kg and daily exercise minutes to get your recommended daily water intake.",
render:function(box){
  box.innerHTML = '<h2>💧 Water Calculator</h2><div class="row"><div><label>Weight (kg)</label><input type="number" id="t-w" value="70"></div><div><label>Exercise (min/day)</label><input type="number" id="t-e" value="30"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var w=+el("t-w").value,e=+el("t-e").value||0;
    var litres=w*0.033+e/30*0.35;
    outHTML(box,"Drink ~"+litres.toFixed(1)+" litres/day\n≈ "+Math.round(litres*4.2)+" glasses (250ml)");
  };
}});

TOOLS.push({ id:"ibw", cat:"health", icon:"🏋️", name:"Free Ideal Body Weight Online",
desc:"Healthy weight range", how:"Enter height in cm and gender to see your healthy ideal body weight range.",
render:function(box){
  box.innerHTML = '<h2>⚖️ Ideal Weight</h2><div class="row"><div><label>Height (cm)</label><input type="number" id="t-h" value="170"></div><div><label>Gender</label><select id="t-g"><option>Male</option><option>Female</option></select></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var h=+el("t-h").value/100;
    if(!h){outHTML(box,"Enter height.");return;}
    var lo=18.5*h*h, hi=24.9*h*h;
    outHTML(box,"Healthy range: "+lo.toFixed(1)+" – "+hi.toFixed(1)+" kg");
  };
}});

TOOLS.push({ id:"heartrate", cat:"health", icon:"💓", name:"Free Heart Rate Zones Online",
desc:"Training pulse zones", how:"Enter your age and press Show Zones to see your training heart-rate zones. Max HR is about 220 minus age.",
render:function(box){
  box.innerHTML = '<h2>❤️ Heart Rate Zones</h2><label>Age</label><input type="number" id="t-a" value="30"><button class="tool-btn" id="t-go">Show Zones</button><div class="tool-out" id="t-out"></div><p class="tool-note">Max HR ≈ 220 − age. Consult a doctor before intense training.</p>';
  el("t-go").onclick=function(){
    var max=220-(+el("t-a").value||30);
    var zones=[["Recovery",0.5,0.6],["Fat burn",0.6,0.7],["Aerobic",0.7,0.8],["Threshold",0.8,0.9],["Max",0.9,1]];
    outHTML(box,"Max HR: ~"+max+" bpm\n\n"+zones.map(function(z){return z[0]+": "+Math.round(max*z[1])+"–"+Math.round(max*z[2])+" bpm";}).join("\n"));
  };
}});

TOOLS.push({ id:"sleep", cat:"health", icon:"😴", name:"Free Sleep Calculator Online",
desc:"Best bed/wake times", how:"Enter the time you want to wake up, or press Sleep Now, to get bedtimes aligned with 90-minute sleep cycles.",
render:function(box){
  box.innerHTML = '<h2>😴 Sleep Calculator</h2><p class="tool-note">Sleep cycles are ~90 min. Wake at the end of a cycle to feel fresh.</p><label>I want to wake at</label><input type="time" id="t-w" value="07:00"><button class="tool-btn" id="t-go">When to sleep?</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var v=el("t-w").value; if(!v){outHTML(box,"Pick a time.");return;}
    var p=v.split(":"), wake=new Date(); wake.setHours(+p[0],+p[1],0,0);
    var times=[];
    for(var c=6;c>=4;c--){ var t=new Date(wake-c*90*60000-15*60000); times.push(t.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})+" ("+c+" cycles)"); }
    outHTML(box,"Go to bed at:\n"+times.join("\n"));
  };
}});

TOOLS.push({ id:"bodyfat", cat:"health", icon:"🍖", name:"Free Body Fat % Calculator Online",
desc:"US Navy method", how:"Enter gender, height, waist, neck and hip measurements for a US Navy method body fat estimate.",
render:function(box){
  box.innerHTML = '<h2>📏 Body Fat %</h2><div class="row"><div><label>Gender</label><select id="t-g"><option>Male</option><option>Female</option></select></div><div><label>Height (cm)</label><input type="number" id="t-h" value="170"></div></div><div class="row"><div><label>Waist (cm)</label><input type="number" id="t-w" value="85"></div><div><label>Neck (cm)</label><input type="number" id="t-n" value="38"></div><div id="t-hipw" style="display:none"><label>Hip (cm)</label><input type="number" id="t-hip" value="95"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-g").onchange=function(){ el("t-hipw").style.display=el("t-g").value==="Female"?"":"none"; };
  el("t-go").onclick=function(){
    var h=+el("t-h").value,w=+el("t-w").value,n=+el("t-n").value, bf;
    function log10(x){return Math.log(x)/Math.LN10;}
    if(el("t-g").value==="Male") bf=495/(1.0324-0.19077*log10(w-n)+0.15456*log10(h))-450;
    else { var hip=+el("t-hip").value||0; bf=495/(1.29579-0.35004*log10(w+hip-n)+0.221*log10(h))-450; }
    if(!isFinite(bf)||bf<0){outHTML(box,"Check measurements.");return;}
    outHTML(box,"Body fat: ~"+bf.toFixed(1)+"%\n"+(bf<15?"Athletic 🔥":bf<20?"Fit ✅":bf<25?"Average":"Above average"));
  };
}});

TOOLS.push({ id:"pace", cat:"health", icon:"🏃", name:"Free Pace Calculator Online",
desc:"Running / walking pace", how:"Enter distance in km and time in minutes to calculate your running or walking pace.",
render:function(box){
  box.innerHTML = '<h2>🏃 Pace Calculator</h2><div class="row"><div><label>Distance (km)</label><input type="number" id="t-d" value="5" step="0.1"></div><div><label>Time (min)</label><input type="number" id="t-t" value="30" step="0.1"></div></div><button class="tool-btn" id="t-go">Calculate Pace</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var d=+el("t-d").value,t=+el("t-t").value;
    if(!d||!t){outHTML(box,"Enter distance and time.");return;}
    var pace=t/d, pm=Math.floor(pace), ps=Math.round((pace-pm)*60);
    outHTML(box,"Pace: "+pm+":"+String(ps).padStart(2,"0")+" /km\nSpeed: "+(d/(t/60)).toFixed(1)+" km/h");
  };
}});

TOOLS.push({ id:"duedate", cat:"health", icon:"🤰", name:"Free Pregnancy Due Date Online",
desc:"Estimate delivery date", how:"Enter the first day of your last period to estimate the delivery date. Your doctor confirms the real date.",
render:function(box){
  box.innerHTML = '<h2>🤰 Due Date Calculator</h2><label>First day of last period</label><input type="date" id="t-d"><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">Estimate only — your doctor confirms the real date.</p>';
  el("t-go").onclick=function(){
    var d=new Date(el("t-d").value); if(isNaN(d)){outHTML(box,"Pick a date.");return;}
    var due=new Date(d.getTime()+280*86400000);
    var now=new Date(), weeks=Math.floor((now-d)/604800000);
    outHTML(box,"Due date: "+due.toLocaleDateString("en-US",{weekday:"long",day:"numeric",month:"long",year:"numeric"})+"\nYou are ~"+Math.max(0,weeks)+" weeks pregnant");
  };
}});

TOOLS.push({ id:"macro", cat:"health", icon:"🥗", name:"Free Macro Calculator Online",
desc:"Protein / carbs / fat split", how:"Enter daily calories and pick a goal to split them into protein, carbs and fat grams.",
render:function(box){
  box.innerHTML = '<h2>🥗 Macro Calculator</h2><div class="row"><div><label>Daily calories</label><input type="number" id="t-c" value="2200"></div><div><label>Goal</label><select id="t-g"><option value="30,40,30">Balanced (30/40/30)</option><option value="40,30,30">High protein</option><option value="25,50,25">High carb</option><option value="35,25,40">Keto-ish</option></select></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var c=+el("t-c").value, s=el("t-g").value.split(",").map(Number);
    var p=c*s[0]/100/4, cb=c*s[1]/100/4, f=c*s[2]/100/9;
    outHTML(box,"Protein: "+Math.round(p)+"g\nCarbs: "+Math.round(cb)+"g\nFat: "+Math.round(f)+"g");
  };
}});

TOOLS.push({ id:"smoking", cat:"health", icon:"🚭", name:"Free Smoking Cost Calculator Online",
desc:"What smoking really costs", how:"Enter cigarettes per day, pack price and years smoking to see what smoking really costs you.",
render:function(box){
  box.innerHTML = '<h2>🚭 Smoking Cost</h2><div class="row"><div><label>Cigarettes / day</label><input type="number" id="t-n" value="10"></div><div><label>Pack price (20 pcs)</label><input type="number" id="t-p" value="500"></div><div><label>Years smoking</label><input type="number" id="t-y" value="5"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var n=+el("t-n").value,p=+el("t-p").value,y=+el("t-y").value;
    var perDay=n/20*p;
    outHTML(box,"Per day: "+perDay.toFixed(0)+"\nPer month: "+Math.round(perDay*30).toLocaleString()+"\nPer year: "+Math.round(perDay*365).toLocaleString()+"\nIn "+y+" years: "+Math.round(perDay*365*y).toLocaleString()+" 😱\n\nQuitting saves all of this!");
  };
}});

/* ================= SITE ADD-ONS ================= */

TOOLS.push({ id:"feedback", cat:"site", icon:"💌", name:"Free Feedback / Bug Report Online",
desc:"Tell us what's wrong", how:"Pick Bug report, Feature request or General feedback, write your message, and press Send.",
render:function(box){
  box.innerHTML = '<h2>💌 Feedback & Bug Reports</h2><label>Your name</label><input type="text" id="t-n" placeholder="Name"><label>Type</label><select id="t-t"><option>Bug report</option><option>Feature request</option><option>General feedback</option></select><label>Message</label><textarea id="t-m" placeholder="Describe the issue..."></textarea><button class="tool-btn" id="t-go">Send Feedback</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var n=el("t-n").value.trim(), t=el("t-t").value, m=el("t-m").value.trim();
    if(!m){outHTML(box,"Please write a message.");return;}
    outHTML(box,"Sending...");
    fetch("https://formsubmit.co/ajax/4de22205ccafca608a7c4a00e6a34c92",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:"Feedback: "+t,_template:"table",Name:n||"-",Type:t,Message:m,Page:location.href})})
    .then(function(r){return r.json();}).then(function(){outHTML(box,"✅ Thanks! Your feedback was sent.");})
    .catch(function(){outHTML(box,"⚠️ Could not send. Try again later.");});
  };
}});

TOOLS.push({ id:"printpage", cat:"site", icon:"🖨️", name:"Free Print Page Online",
desc:"Print any page", how:"Press Print This Page to open your browser print dialog for the current page.",
render:function(box){
  box.innerHTML = '<h2>🖨️ Print Page</h2><p class="tool-note">Opens your browser\u2019s print dialog for the current page.</p><button class="tool-btn" id="t-go">🖨️ Print This Page</button>';
  el("t-go").onclick=function(){window.print();};
}});

TOOLS.push({ id:"pdfexport", cat:"site", icon:"📑", name:"Free PDF Export Online",
desc:"Save page as PDF", how:"Press Export to open the print dialog, then choose Save as PDF as the destination.",
render:function(box){
  box.innerHTML = '<h2>📑 Export as PDF</h2><p class="tool-note">Uses your browser\u2019s \u201CSave as PDF\u201D — choose it in the print dialog destination.</p><button class="tool-btn" id="t-go">📑 Save as PDF</button>';
  el("t-go").onclick=function(){window.print();};
}});

TOOLS.push({ id:"visitors", cat:"site", icon:"🚶", name:"Free Visitor Counter Online",
desc:"Your visits widget", how:"A demo counter stored on this device showing how the widget looks. A real public counter needs a server.",
render:function(box){
  box.innerHTML = '<h2>👥 Visitor Counter</h2><p class="tool-note">Demo counter stored on this device. A real public counter needs a server — this shows how the widget looks.</p><div class="tool-out" id="t-out" style="display:block;text-align:center;font-size:2rem"></div><button class="tool-btn ghost" id="t-copy">Copy Widget HTML</button>';
  var n=1; try{ n=+(localStorage.getItem("sawalai_visits")||0)+1; localStorage.setItem("sawalai_visits",n); }catch(e){}
  el("t-out").textContent="👥 "+n.toLocaleString()+" visits (this device)";
  el("t-copy").onclick=function(){copyText('<div style="text-align:center;padding:10px;border:1px solid #ccc;border-radius:10px">👥 <b id="vc">0</b> visitors</div><script>try{document.getElementById("vc").textContent=(+localStorage.getItem("vc")||0)+1;localStorage.setItem("vc",+localStorage.getItem("vc")||0)+1;}catch(e){}<\/script>',this);};
}});

TOOLS.push({ id:"pushnotify", cat:"site", icon:"🔔", name:"Free Push Notifications Online",
desc:"Browser alerts demo", how:"Allow notifications to try a local demo alert in your browser. Real web push needs a server.",
render:function(box){
  box.innerHTML = '<h2>🔔 Notifications</h2><p class="tool-note">Real web-push needs a server. This demo uses local browser notifications (permission required).</p><button class="tool-btn" id="t-go">🔔 Enable Test Notification</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    if(!("Notification" in window)){outHTML(box,"Not supported here.");return;}
    Notification.requestPermission().then(function(p){
      if(p==="granted"){ new Notification("US AI ✅",{body:"Notifications work! (demo)"}); outHTML(box,"✅ Notification sent!"); }
      else outHTML(box,"Permission denied.");
    });
  };
}});

/* ================= SEO PRO ================= */

TOOLS.push({ id:"utm", cat:"seo", icon:"📣", name:"Free UTM Campaign Builder Online",
desc:"Trackable campaign URLs", how:"Enter base URL, source, medium and campaign, then press Build URL to get a trackable campaign link.",
render:function(box){
  box.innerHTML = '<h2>🔗 UTM Builder</h2><label>Base URL</label><input type="text" id="t-u" placeholder="https://example.com/page"><div class="row"><div><label>Source</label><input type="text" id="t-s" placeholder="facebook"></div><div><label>Medium</label><input type="text" id="t-m" placeholder="social"></div><div><label>Campaign</label><input type="text" id="t-c" placeholder="summer_sale"></div></div><button class="tool-btn" id="t-go">Build URL</button><div class="tool-out" id="t-out" style="word-break:break-all"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy URL</button>';
  el("t-go").onclick=function(){
    var u=el("t-u").value.trim(); if(!u){outHTML(box,"Enter URL.");return;}
    var p=[["utm_source",el("t-s").value],["utm_medium",el("t-m").value],["utm_campaign",el("t-c").value]].filter(function(x){return x[1].trim();}).map(function(x){return x[0]+"="+encodeURIComponent(x[1].trim());}).join("&");
    var out=u+(u.indexOf("?")>-1?"&":"?")+p;
    outHTML(box,esc(out)); var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(out,c);};
  };
}});

TOOLS.push({ id:"schema", cat:"seo", icon:"🏗️", name:"Free Schema Markup Generator Online",
desc:"JSON-LD rich snippets", how:"Pick a type like FAQ Page or Article, fill the fields, and press Generate JSON-LD to copy the rich-snippet markup.",
render:function(box){
  box.innerHTML = '<h2>📋 Schema Generator</h2><label>Type</label><select id="t-t"><option value="FAQPage">FAQ Page</option><option value="Article">Article</option><option value="Product">Product</option><option value="LocalBusiness">Local Business</option></select><div id="t-f"></div><button class="tool-btn" id="t-go">Generate JSON-LD</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  var fields={FAQPage:[["Question","q1"],["Answer","a1"]],Article:[["Headline","h"],["Author","au"],["Date","d"]],Product:[["Name","n"],["Price","p"],["Currency","c"]],LocalBusiness:[["Name","n"],["Phone","ph"],["Address","ad"]]};
  function drawF(){
    var t=el("t-t").value;
    el("t-f").innerHTML=fields[t].map(function(f){return '<label>'+f[0]+'</label><input type="text" id="sf-'+f[1]+'">';}).join("");
  }
  el("t-t").onchange=drawF; drawF();
  el("t-go").onclick=function(){
    var t=el("t-t").value, g=function(id){return (document.getElementById("sf-"+id)||{}).value||"";}, s;
    if(t==="FAQPage") s={ "@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":g("q1"),"acceptedAnswer":{"@type":"Answer","text":g("a1")}}] };
    else if(t==="Article") s={ "@context":"https://schema.org","@type":"Article","headline":g("h"),"author":g("au"),"datePublished":g("d") };
    else if(t==="Product") s={ "@context":"https://schema.org","@type":"Product","name":g("n"),"offers":{"@type":"Offer","price":g("p"),"priceCurrency":g("c")} };
    else s={ "@context":"https://schema.org","@type":"LocalBusiness","name":g("n"),"telephone":g("ph"),"address":g("ad") };
    var o=JSON.stringify(s,null,2);
    el("t-out").textContent=o; el("t-out").style.display="block";
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(o,c);};
  };
}});

TOOLS.push({ id:"hreflang", cat:"seo", icon:"🗾", name:"Free Hreflang Tag Generator Online",
desc:"Multilingual SEO tags", how:"Paste lines as lang-code | url, one per line, and press Generate to get hreflang tags for multilingual SEO.",
render:function(box){
  box.innerHTML = '<h2>🌍 Hreflang Generator</h2><label>URLs (one per line: lang-code | url)</label><textarea id="t-u" placeholder="en | https://example.com/&#10;ur | https://example.com/ur/"></textarea><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-go").onclick=function(){
    var lines=el("t-u").value.split("\n").map(function(l){var p=l.split("|");return{lang:(p[0]||"").trim(),url:(p[1]||"").trim()};}).filter(function(x){return x.lang&&x.url;});
    if(!lines.length){outHTML(box,"Add at least one.");return;}
    var o=lines.map(function(x){return '<link rel="alternate" hreflang="'+esc(x.lang)+'" href="'+esc(x.url)+'" />';}).join("\n");
    el("t-out").textContent=o; el("t-out").style.display="block";
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(o,c);};
  };
}});

TOOLS.push({ id:"breadcrumb", cat:"seo", icon:"🍞", name:"Free Breadcrumb Generator Online",
desc:"Navigation + schema", how:"Type your path like Home > Blog > Article, add your base URL, and press Generate for breadcrumb HTML plus schema.",
render:function(box){
  box.innerHTML = '<h2>🍞 Breadcrumb Generator</h2><label>Path (Home > Category > Page)</label><input type="text" id="t-p" placeholder="Home > Blog > My Article"><label>Base URL</label><input type="text" id="t-u" placeholder="https://example.com"><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy HTML+Schema</button>';
  el("t-go").onclick=function(){
    var parts=el("t-p").value.split(">").map(function(s){return s.trim();}).filter(Boolean);
    var base=(el("t-u").value.trim()||"https://example.com").replace(/\/$/,"");
    if(parts.length<2){outHTML(box,"Enter at least 2 levels.");return;}
    var html='<nav aria-label="breadcrumb"><ol>', schema={"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[]};
    parts.forEach(function(p,i){
      var url=base+"/"+parts.slice(1,i+1).map(function(x){return x.toLowerCase().replace(/[^a-z0-9]+/g,"-");}).join("/");
      html+='<li><a href="'+(i===0?base:url)+'">'+esc(p)+"</a></li>";
      schema.itemListElement.push({"@type":"ListItem","position":i+1,"name":p,"item":i===0?base:url});
    });
    var o=html+"</ol></nav>\n<script type=\"application/ld+json\">\n"+JSON.stringify(schema,null,2)+"\n<\/script>";
    el("t-out").textContent=o; el("t-out").style.display="block";
    var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(o,c);};
  };
}});

TOOLS.push({ id:"brokenlinks", cat:"seo", icon:"💔", name:"Free Broken Link Checker Online",
desc:"Find dead links on page", how:"Press Check This Page to test the links on the current page for broken ones. Full-site scans need a desktop tool.",
render:function(box){
  box.innerHTML = '<h2>🔗 Broken Link Checker</h2><p class="tool-note">Checks all links on the <b>current page</b>. For full-site scans use Screaming Frog.</p><button class="tool-btn" id="t-go">Check This Page</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var links=[].slice.call(document.querySelectorAll("a[href]")).map(function(a){return a.href;}).filter(function(h,i,a){return h.indexOf("http")===0&&a.indexOf(h)===i;}).slice(0,30);
    if(!links.length){outHTML(box,"No links found.");return;}
    outHTML(box,"Checking "+links.length+" links...");
    var done=0, bad=[];
    links.forEach(function(u){
      fetch(u,{method:"HEAD",mode:"no-cors"}).then(function(){done++;tick();}).catch(function(){bad.push(u);done++;tick();});
    });
    function tick(){
      if(done<links.length) return;
      outHTML(box, bad.length?("❌ Broken/suspicious:\n"+bad.join("\n")):"✅ All "+links.length+" links responded!");
    }
  };
}});

TOOLS.push({ id:"altcheck", cat:"seo", icon:"♿", name:"Free Image Alt Text Checker Online",
desc:"Find images missing alt", how:"Press Scan This Page to list images missing alt text, which hurts SEO and accessibility.",
render:function(box){
  box.innerHTML = '<h2>🖼️ Alt Text Checker</h2><p class="tool-note">Scans images on the <b>current page</b> for missing alt text.</p><button class="tool-btn" id="t-go">Scan This Page</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var imgs=document.querySelectorAll("img"), missing=[];
    imgs.forEach(function(im){ if(!im.alt) missing.push(im.src.split("/").pop()||"(no src)"); });
    outHTML(box,"Images: "+imgs.length+"\nMissing alt: "+missing.length+(missing.length?"\n❌ "+missing.slice(0,10).join("\n"):"\n✅ All have alt text!"));
  };
}});

TOOLS.push({ id:"headings", cat:"seo", icon:"🗒️", name:"Free Heading Structure Analyzer Online",
desc:"H1-H6 hierarchy check", how:"Press Analyze This Page to see your H1 to H6 hierarchy and spot issues like missing or multiple H1s.",
render:function(box){
  box.innerHTML = '<h2>📑 Heading Analyzer</h2><button class="tool-btn" id="t-go">Analyze This Page</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var h=document.querySelectorAll("h1,h2,h3,h4,h5,h6"), out=[], issues=[];
    if(!document.querySelector("h1")) issues.push("⚠️ No H1 found!");
    if(document.querySelectorAll("h1").length>1) issues.push("⚠️ Multiple H1s ("+document.querySelectorAll("h1").length+")");
    h.forEach(function(x){ out.push(x.tagName+": "+x.textContent.trim().slice(0,50)); });
    outHTML(box,(issues.length?issues.join("\n")+"\n\n":"✅ Structure looks good!\n\n")+out.slice(0,20).join("\n")+(out.length>20?"\n... (+"+(out.length-20)+" more)":""));
  };
}});

TOOLS.push({ id:"keywords", cat:"seo", icon:"📌", name:"Free Keyword Density Checker Online",
desc:"Top words analysis", how:"Paste your article text and press Analyze to see the top words with density percentages.",
render:function(box){
  box.innerHTML = '<h2>🔑 Keyword Density</h2><label>Paste text</label><textarea id="t-in" placeholder="Paste article text..."></textarea><button class="tool-btn" id="t-go">Analyze</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var words=(el("t-in").value.toLowerCase().match(/\b[a-z]{3,}\b/g)||[]);
    if(!words.length){outHTML(box,"Paste text.");return;}
    var stop={the:1,and:1,for:1,are:1,but:1,not:1,you:1,all:1,any:1,can:1,had:1,her:1,was:1,one:1,our:1,out:1,has:1,have:1,will:1,would:1,there:1,their:1,what:1,when:1,which:1,with:1,this:1,that:1,from:1,they:1};
    var f={}; words.forEach(function(w){ if(!stop[w]) f[w]=(f[w]||0)+1; });
    var top=Object.keys(f).sort(function(a,b){return f[b]-f[a];}).slice(0,10);
    outHTML(box,"Total words: "+words.length+"\n\n"+top.map(function(w){return w+": "+f[w]+" ("+(f[w]/words.length*100).toFixed(1)+"%)";}).join("\n"));
  };
}});

TOOLS.push({ id:"readability", cat:"seo", icon:"👀", name:"Free Readability Score Online",
desc:"Flesch reading ease", how:"Paste text and press Score to get a Flesch reading-ease score. Aim for 60 or higher for web content.",
render:function(box){
  box.innerHTML = '<h2>📖 Readability Score</h2><label>Paste text</label><textarea id="t-in" placeholder="Paste your article or essay here…"></textarea><button class="tool-btn" id="t-go">Score</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var t=el("t-in").value.trim(); if(!t){outHTML(box,"Paste text.");return;}
    var words=(t.match(/\S+/g)||[]).length, sents=(t.match(/[.!?]+/g)||[]).length||1;
    var syl=t.toLowerCase().match(/[aeiouy]+/g); syl=syl?syl.length:words;
    var score=206.835-1.015*(words/sents)-84.6*(syl/words);
    score=Math.max(0,Math.min(100,score));
    var lvl=score>80?"Very easy 😊":score>60?"Easy 🙂":score>40?"Medium 😐":score>20?"Hard 😟":"Very hard 😫";
    outHTML(box,"Flesch score: "+score.toFixed(0)+"/100\n"+lvl+"\n(Aim 60+ for web content)");
  };
}});

TOOLS.push({ id:"linkanalyzer", cat:"seo", icon:"🔎", name:"Free Internal Link Analyzer Online",
desc:"Link structure of page", how:"Press Analyze This Page to count internal, external, nofollow and empty-anchor links.",
render:function(box){
  box.innerHTML = '<h2>🔗 Link Analyzer</h2><button class="tool-btn" id="t-go">Analyze This Page</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var as=document.querySelectorAll("a[href]"), int=0, ext=0, nofollow=0, notext=0;
    var host=location.hostname;
    as.forEach(function(a){
      try{ var u=new URL(a.href,location.href);
        if(u.hostname===host||!u.hostname) int++; else ext++;
      }catch(e){}
      if((a.rel||"").indexOf("nofollow")>-1) nofollow++;
      if(!a.textContent.trim()&&!a.querySelector("img")) notext++;
    });
    outHTML(box,"Total links: "+as.length+"\nInternal: "+int+"\nExternal: "+ext+"\nNofollow: "+nofollow+"\nEmpty anchor text: "+notext+(notext?" ⚠️":" ✅"));
  };
}});

/* ================= SMART UTILITIES (fully functional) ================= */

TOOLS.push({ id:"voice-rec", cat:"smart", icon:"👂", name:"Free Voice Recognition Online",
desc:"Speech to text in browser", how:"Press Start, speak clearly, press Stop. Your words appear as text — copy it.",
render:function(box){
  box.innerHTML = '<h2>🎤 Voice Recognition</h2><p class="tool-note">Uses your browser\'s built-in speech recognition. Works best in Chrome/Edge.</p><button class="tool-btn" id="t-go">🎤 Start Listening</button><button class="tool-btn ghost" id="t-stop" style="display:none">⏹ Stop</button><label>Result</label><textarea id="t-out" rows="5" placeholder="Your speech will appear here..."></textarea><button class="tool-btn ghost tool-copy" id="t-copy">Copy Text</button>';
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){ el("t-go").disabled = true; el("t-go").textContent = "Not supported in this browser (try Chrome)"; return; }
  var rec = new SR(); rec.continuous = true; rec.interimResults = true; rec.lang = "en-US";
  var final = "";
  rec.onresult = function(e){
    var interim = "";
    for(var i = e.resultIndex; i < e.results.length; i++){
      if(e.results[i].isFinal) final += e.results[i][0].transcript + " ";
      else interim += e.results[i][0].transcript;
    }
    el("t-out").value = final + interim;
  };
  rec.onend = function(){ el("t-go").style.display = ""; el("t-stop").style.display = "none"; };
  el("t-go").onclick = function(){ final = el("t-out").value; rec.start(); el("t-go").style.display = "none"; el("t-stop").style.display = ""; };
  el("t-stop").onclick = function(){ rec.stop(); };
  el("t-copy").onclick = function(){ copyText(el("t-out").value, el("t-copy")); };
}});

TOOLS.push({ id:"ocr", cat:"smart", icon:"👁️‍🗨️", name:"Free OCR Text Extractor Online",
desc:"Get text from images", how:"Upload a photo or screenshot containing text, press Extract — the text appears below, ready to copy.",
render:function(box){
  box.innerHTML = '<h2>👁️ OCR Text Extractor</h2><label>Upload image with text</label><input type="file" id="t-f" accept="image/*"><button class="tool-btn" id="t-go">Extract Text</button><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Text</button>';
  var dataUrl = null;
  el("t-f").onchange = function(e){ var r = new FileReader(); r.onload = function(){ dataUrl = r.result; }; r.readAsDataURL(e.target.files[0]); };
  el("t-go").onclick = function(){
    if(!dataUrl){ outHTML(box, "Upload an image first."); return; }
    outHTML(box, "Loading OCR engine (first time ~10s)...");
    function run(){
      Tesseract.recognize(dataUrl, "eng").then(function(res){
        var txt = (res.data.text || "").trim() || "(no text found)";
        el("t-out").textContent = txt; el("t-out").style.display = "block";
        var c = el("t-copy"); c.style.display = ""; c.onclick = function(){ copyText(txt, c); };
      }).catch(function(){ outHTML(box, "OCR failed — try a clearer image."); });
    }
    if(window.Tesseract) run();
    else {
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
      s.onload = run; s.onerror = function(){ outHTML(box, "Could not load OCR engine (internet needed)."); };
      document.head.appendChild(s);
    }
  };
}});

TOOLS.push({ id:"markdown", cat:"smart", icon:"🖋️", name:"Free Markdown Editor Online",
desc:"Live preview as you type", how:"Type Markdown on the left, see formatted preview on the right instantly.",
render:function(box){
  box.innerHTML = '<h2>📝 Markdown Live Preview</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div><label>Markdown</label><textarea id="t-in" rows="10" placeholder="# Hello\n**bold** and *italic*\n- list item\n[link](https://example.com)"></textarea></div><div><label>Preview</label><div id="t-prev" style="border:1px solid var(--line);border-radius:10px;padding:12px;min-height:180px;background:rgba(0,0,0,.2)"></div></div></div>';
  function md(src){
    return esc(src)
      .replace(/^###### (.*)$/gm, "<h6>$1</h6>").replace(/^##### (.*)$/gm, "<h5>$1</h5>")
      .replace(/^#### (.*)$/gm, "<h4>$1</h4>").replace(/^### (.*)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>").replace(/^# (.*)$/gm, "<h1>$1</h1>")
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<i>$1</i>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^- (.*)$/gm, "<li>$1</li>").replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
      .replace(/\n/g, "<br>");
  }
  el("t-in").addEventListener("input", function(){ el("t-prev").innerHTML = md(el("t-in").value); });
  el("t-in").value = "# Hello\n**Bold** and *italic* text.\n- Item one\n- Item two"; 
  el("t-prev").innerHTML = md(el("t-in").value);
}});

TOOLS.push({ id:"translator", cat:"smart", icon:"🌏", name:"Free Language Translator Online",
desc:"Translate 100+ languages", how:"Type text, pick languages, press Translate. Uses a free translation API.",
render:function(box){
  var langs = [["en","English"],["ur","Urdu"],["es","Spanish"],["fr","French"],["de","German"],["hi","Hindi"],["ar","Arabic"],["tr","Turkish"],["zh","Chinese"],["ru","Russian"],["pt","Portuguese"],["id","Indonesian"]];
  var opts = langs.map(function(l){ return '<option value="'+l[0]+'">'+l[1]+'</option>'; }).join("");
  box.innerHTML = '<h2>🌐 Translator</h2><div class="row"><div><label>From</label><select id="t-f">'+opts+'</select></div><div><label>To</label><select id="t-t">'+opts.replace('value="en"', 'value="en"')+'</select></div></div><label>Text</label><textarea id="t-in" rows="4" placeholder="Hello, how are you?"></textarea><button class="tool-btn" id="t-go">Translate</button><div class="tool-out" id="t-out"></div>';
  el("t-t").value = "ur";
  el("t-go").onclick = function(){
    var t = el("t-in").value.trim(); if(!t){ outHTML(box, "Type text first."); return; }
    outHTML(box, "Translating...");
    fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(t) + "&langpair=" + el("t-f").value + "|" + el("t-t").value)
      .then(function(r){ return r.json(); })
      .then(function(d){
        var tr = (d.responseData && d.responseData.translatedText) || "";
        outHTML(box, esc(tr) || "Translation failed.");
      })
      .catch(function(){ outHTML(box, "Translation failed — check internet."); });
  };
}});

TOOLS.push({ id:"tts-custom", cat:"text", icon:"🎛️", name:"Free Text to Speech Customizer",
desc:"Pitch, speed & voice control", how:"Type text, pick a voice, adjust pitch and speed, press Speak.",
render:function(box){
  box.innerHTML = '<h2>🔊 TTS Customizer</h2><label>Text</label><textarea id="t-in" rows="4" placeholder="Type something to speak..."></textarea><label>Voice</label><select id="t-v"></select><div class="row"><div><label>Speed: <span id="t-rs">1</span>x</label><input type="range" id="t-r" min="0.5" max="2" step="0.1" value="1" style="width:100%"></div><div><label>Pitch: <span id="t-ps">1</span></label><input type="range" id="t-p" min="0.5" max="2" step="0.1" value="1" style="width:100%"></div></div><button class="tool-btn" id="t-go">🔊 Speak</button>';
  function fill(){
    var vs = speechSynthesis.getVoices();
    el("t-v").innerHTML = vs.map(function(v, i){ return '<option value="'+i+'">'+esc(v.name)+" ("+v.lang+")</option>"; }).join("");
  }
  fill(); speechSynthesis.onvoiceschanged = fill;
  el("t-r").oninput = function(){ el("t-rs").textContent = el("t-r").value; };
  el("t-p").oninput = function(){ el("t-ps").textContent = el("t-p").value; };
  el("t-go").onclick = function(){
    var t = el("t-in").value.trim(); if(!t) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(t);
    var vs = speechSynthesis.getVoices();
    if(vs[el("t-v").value]) u.voice = vs[el("t-v").value];
    u.rate = parseFloat(el("t-r").value); u.pitch = parseFloat(el("t-p").value);
    speechSynthesis.speak(u);
  };
}});

TOOLS.push({ id:"lofi", cat:"smart", icon:"🎧", name:"Free Lo-Fi Focus Music Player",
desc:"Ambient sound generator", how:"Press Play — calm generated ambient music for focus. No audio files needed.",
render:function(box){
  box.innerHTML = '<h2>🎧 Lo-Fi Focus Player</h2><p class="tool-note">Generative ambient music — soft chords + gentle rain, made live in your browser.</p><button class="tool-btn" id="t-go">▶ Play</button> <button class="tool-btn ghost" id="t-stop" style="display:none">⏹ Stop</button><div style="margin-top:10px"><label>Volume</label><input type="range" id="t-v" min="0" max="100" value="40" style="width:100%"></div>';
  var ctx = null, nodes = [], gain = null;
  function chord(){
    if(!ctx) return;
    var base = [174.61, 196.00, 220.00, 146.83][Math.floor(Math.random()*4)];
    [0, 4, 7, 11].forEach(function(semi){
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = base * Math.pow(2, semi/12);
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3);
      g.gain.linearRampToValueAtTime(0, ctx.currentTime + 9);
      o.connect(g); g.connect(gain); o.start(); o.stop(ctx.currentTime + 9.5);
    });
    nodes._t = setTimeout(chord, 7000);
  }
  el("t-go").onclick = function(){
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    gain = ctx.createGain(); gain.gain.value = el("t-v").value / 100; gain.connect(ctx.destination);
    chord();
    el("t-go").style.display = "none"; el("t-stop").style.display = "";
  };
  el("t-v").oninput = function(){ if(gain) gain.gain.value = el("t-v").value / 100; };
  el("t-stop").onclick = function(){ clearTimeout(nodes._t); if(ctx) ctx.close(); ctx = null; el("t-go").style.display = ""; el("t-stop").style.display = "none"; };
  box._cleanup = function(){ clearTimeout(nodes._t); if(ctx) ctx.close(); };
}});

TOOLS.push({ id:"whiteboard", cat:"smart", icon:"🪧", name:"Free Online Whiteboard",
desc:"Draw & sketch instantly", how:"Pick a color and brush size, draw with mouse or touch. Download as PNG.",
render:function(box){
  box.innerHTML = '<h2>🎨 Whiteboard</h2><div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;flex-wrap:wrap"><input type="color" id="t-c" value="#a78bfa" style="width:44px;height:36px;border:none;background:none"><input type="range" id="t-s" min="1" max="30" value="5" title="Brush size"><button class="tool-btn ghost" id="t-clear" style="margin:0;padding:8px 14px">Clear</button><button class="tool-btn ghost" id="t-dl" style="margin:0;padding:8px 14px">⬇ PNG</button></div><canvas id="t-cv" width="600" height="380" style="width:100%;border:1px solid var(--line);border-radius:10px;background:#0d0d1a;touch-action:none;cursor:crosshair"></canvas>';
  var cv = el("t-cv"), cx = cv.getContext("2d"), drawing = false, last = null;
  cx.lineCap = "round";
  function pos(e){
    var r = cv.getBoundingClientRect();
    var p = e.touches ? e.touches[0] : e;
    return [ (p.clientX - r.left) * cv.width / r.width, (p.clientY - r.top) * cv.height / r.height ];
  }
  function start(e){ drawing = true; last = pos(e); e.preventDefault(); }
  function move(e){
    if(!drawing) return; e.preventDefault();
    var p = pos(e);
    cx.strokeStyle = el("t-c").value; cx.lineWidth = el("t-s").value;
    cx.beginPath(); cx.moveTo(last[0], last[1]); cx.lineTo(p[0], p[1]); cx.stroke();
    last = p;
  }
  cv.addEventListener("mousedown", start); cv.addEventListener("mousemove", move);
  cv.addEventListener("mouseup", function(){ drawing = false; });
  cv.addEventListener("touchstart", start, {passive:false}); cv.addEventListener("touchmove", move, {passive:false});
  cv.addEventListener("touchend", function(){ drawing = false; });
  el("t-clear").onclick = function(){ cx.clearRect(0, 0, cv.width, cv.height); };
  el("t-dl").onclick = function(){ dl(cv.toDataURL("image/png"), "whiteboard.png"); };
}});

TOOLS.push({ id:"eyedropper", cat:"smart", icon:"💉", name:"Free Screen Color Picker",
desc:"Pick any color on screen", how:"Press Pick Color, then click anywhere on your screen. The color code is copied.",
render:function(box){
  box.innerHTML = '<h2>🎯 Screen Color Picker</h2><p class="tool-note">Uses the EyeDropper API (Chrome/Edge).</p><button class="tool-btn" id="t-go">🎯 Pick Color</button><div class="tool-out" id="t-out" style="text-align:center"></div>';
  el("t-go").onclick = function(){
    if(!window.EyeDropper){ outHTML(box, "Not supported in this browser — try Chrome or Edge."); return; }
    new EyeDropper().open().then(function(r){
      el("t-out").innerHTML = '<div style="width:80px;height:80px;border-radius:12px;margin:0 auto;background:'+r.sRGBHex+';border:1px solid var(--line)"></div><p style="font-size:1.3rem;margin:8px 0"><b>'+r.sRGBHex+'</b></p><button class="tool-btn ghost" id="t-c">Copy</button>';
      el("t-c").onclick = function(){ copyText(r.sRGBHex, el("t-c")); };
    }).catch(function(){});
  };
}});

TOOLS.push({ id:"device-info", cat:"smart", icon:"⚙️", name:"Free Device Info Checker",
desc:"Browser & device details", how:"Instant report: browser, OS, screen, language, connection and more.",
render:function(box){
  var n = navigator, s = screen;
  var info = [
    ["Browser", (n.userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/[\d.]+/)||["?"])[0]],
    ["Platform", n.platform || "?"],
    ["OS", (n.userAgent.match(/\(([^;]+)/)||[])[1] || "?"],
    ["Language", n.language],
    ["Screen", s.width + "×" + s.height + " (" + (window.devicePixelRatio||1) + "x)"],
    ["Touch", ("ontouchstart" in window) ? "Yes" : "No"],
    ["Online", n.onLine ? "Yes" : "No"],
    ["Connection", (n.connection && n.connection.effectiveType) || "?"],
    ["Cookies", n.cookieEnabled ? "On" : "Off"],
    ["GPU cores", n.hardwareConcurrency || "?"],
    ["Memory", (n.deviceMemory ? n.deviceMemory + " GB" : "?")],
    ["Timezone", Intl.DateTimeFormat().resolvedOptions().timeZone]
  ];
  box.innerHTML = '<h2>💻 Device Info</h2><div class="tool-out" style="display:block">' +
    info.map(function(r){ return "<b>"+r[0]+":</b> "+esc(String(r[1])); }).join("<br>") + "</div>";
}});

TOOLS.push({ id:"qr-scanner", cat:"smart", icon:"📷", name:"Free QR Code Scanner Online",
desc:"Scan with your camera", how:"Allow camera access, point at a QR code — the content appears instantly.",
render:function(box){
  box.innerHTML = '<h2>📷 QR Scanner</h2><button class="tool-btn" id="t-go">📷 Start Camera</button><button class="tool-btn ghost" id="t-stop" style="display:none">⏹ Stop</button><div style="margin-top:10px"><video id="t-v" style="width:100%;max-width:400px;border-radius:10px;display:none" playsinline></video><canvas id="t-c" style="display:none"></canvas></div><div class="tool-out" id="t-out"></div>';
  var stream = null, raf = null;
  function loadJsQR(cb){
    if(window.jsQR) return cb();
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
    s.onload = cb; s.onerror = function(){ outHTML(box, "Scanner library failed to load."); };
    document.head.appendChild(s);
  }
  el("t-go").onclick = function(){
    loadJsQR(function(){
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(st){
        stream = st;
        var v = el("t-v"); v.srcObject = st; v.style.display = ""; v.play();
        el("t-go").style.display = "none"; el("t-stop").style.display = "";
        var c = el("t-c"), cx = c.getContext("2d");
        (function tick(){
          if(!stream) return;
          if(v.readyState === v.HAVE_ENOUGH_DATA){
            c.width = v.videoWidth; c.height = v.videoHeight;
            cx.drawImage(v, 0, 0);
            var d = cx.getImageData(0, 0, c.width, c.height);
            var code = jsQR(d.data, c.width, c.height);
            if(code){ outHTML(box, "✅ Found:<br><b>"+esc(code.data)+"</b>"); stop(); return; }
          }
          raf = requestAnimationFrame(tick);
        })();
      }).catch(function(){ outHTML(box, "Camera access denied or unavailable."); });
    });
  };
  function stop(){
    if(raf) cancelAnimationFrame(raf);
    if(stream){ stream.getTracks().forEach(function(t){ t.stop(); }); stream = null; }
    el("t-v").style.display = "none"; el("t-go").style.display = ""; el("t-stop").style.display = "none";
  }
  el("t-stop").onclick = stop;
  box._cleanup = stop;
}});

TOOLS.push({ id:"notepad", cat:"smart", icon:"📓", name:"Free Quick Notepad Online",
desc:"Auto-saved scratchpad", how:"Type notes — they save automatically in your browser. Download as .txt anytime.",
render:function(box){
  box.innerHTML = '<h2>📓 Quick Notepad</h2><p class="tool-note" id="t-saved" style="color:#4ade80"></p><textarea id="t-in" rows="10" placeholder="Type your notes here..."></textarea><div><button class="tool-btn ghost" id="t-dl">⬇ Download .txt</button> <button class="tool-btn ghost" id="t-clr">Clear</button></div>';
  try { el("t-in").value = localStorage.getItem("sawalai_notepad") || ""; } catch(e){}
  var tm = null;
  el("t-in").addEventListener("input", function(){
    clearTimeout(tm);
    tm = setTimeout(function(){
      try { localStorage.setItem("sawalai_notepad", el("t-in").value); } catch(e){}
      el("t-saved").textContent = "✓ Saved " + new Date().toLocaleTimeString();
    }, 600);
  });
  el("t-dl").onclick = function(){
    var b = new Blob([el("t-in").value], {type:"text/plain"});
    dl(URL.createObjectURL(b), "notes.txt");
  };
  el("t-clr").onclick = function(){ if(confirm("Clear all notes?")){ el("t-in").value = ""; try{ localStorage.removeItem("sawalai_notepad"); }catch(e){} } };
}});

TOOLS.push({ id:"screen-rec", cat:"smart", icon:"⏺️", name:"Free Screen Recorder Online",
desc:"Record screen or tab", how:"Press Start, choose a screen/tab to share, press Stop — download as WebM video.",
render:function(box){
  box.innerHTML = '<h2>⏺️ Screen Recorder</h2><p class="tool-note">Records your screen/tab with audio (if shared). Video saves as .webm</p><button class="tool-btn" id="t-go">⏺️ Start Recording</button><button class="tool-btn ghost" id="t-stop" style="display:none">⏹ Stop & Download</button><div class="tool-out" id="t-out"></div>';
  var rec = null, chunks = [], stream = null;
  el("t-go").onclick = function(){
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(function(st){
      stream = st; chunks = [];
      rec = new MediaRecorder(st, { mimeType: "video/webm" });
      rec.ondataavailable = function(e){ if(e.data.size) chunks.push(e.data); };
      rec.onstop = function(){
        var b = new Blob(chunks, { type: "video/webm" });
        dl(URL.createObjectURL(b), "recording.webm");
        outHTML(box, "✅ Recording downloaded (" + (b.size/1048576).toFixed(1) + " MB)");
        stream.getTracks().forEach(function(t){ t.stop(); });
        el("t-go").style.display = ""; el("t-stop").style.display = "none";
      };
      rec.start();
      outHTML(box, "🔴 Recording... press Stop when done.");
      el("t-go").style.display = "none"; el("t-stop").style.display = "";
      st.getVideoTracks()[0].onended = function(){ if(rec && rec.state !== "inactive") rec.stop(); };
    }).catch(function(){ outHTML(box, "Screen share cancelled or not supported."); });
  };
  el("t-stop").onclick = function(){ if(rec && rec.state !== "inactive") rec.stop(); };
  box._cleanup = function(){ if(rec && rec.state !== "inactive") rec.stop(); if(stream) stream.getTracks().forEach(function(t){ t.stop(); }); };
}});

TOOLS.push({ id:"chart-plot", cat:"smart", icon:"🖍️", name:"Free Chart Plotter Online",
desc:"Bar, line & pie charts", how:"Enter labels and values, pick a chart type — instant visual chart, download as PNG.",
render:function(box){
  box.innerHTML = '<h2>📊 Chart Plotter</h2><label>Labels (comma separated)</label><input type="text" id="t-l" value="Jan,Feb,Mar,Apr,May"><label>Values (comma separated)</label><input type="text" id="t-v" value="12,19,8,15,22"><label>Type</label><select id="t-t"><option value="bar">Bar</option><option value="line">Line</option><option value="pie">Pie</option></select><button class="tool-btn" id="t-go">Plot Chart</button><div style="margin-top:12px"><canvas id="t-cv" width="560" height="340" style="width:100%;border:1px solid var(--line);border-radius:10px;background:#0d0d1a"></canvas></div><button class="tool-btn ghost" id="t-dl" style="margin-top:8px">⬇ Download PNG</button>';
  var cols = ["#a78bfa","#67e8f9","#f0abfc","#4ade80","#fbbf24","#f87171","#60a5fa","#34d399"];
  el("t-go").onclick = function(){
    var labels = el("t-l").value.split(",").map(function(s){ return s.trim(); }).filter(Boolean);
    var vals = el("t-v").value.split(",").map(function(s){ return parseFloat(s) || 0; });
    if(!labels.length || !vals.length){ return; }
    var cv = el("t-cv"), cx = cv.getContext("2d"), W = cv.width, H = cv.height;
    cx.clearRect(0,0,W,H);
    var max = Math.max.apply(null, vals.concat([1]));
    var type = el("t-t").value;
    if(type === "pie"){
      var total = vals.reduce(function(a,b){ return a+b; }, 0) || 1, ang = -Math.PI/2;
      vals.forEach(function(v, i){
        var a2 = ang + (v/total) * Math.PI * 2;
        cx.beginPath(); cx.moveTo(W/2, H/2); cx.arc(W/2, H/2, 130, ang, a2); cx.closePath();
        cx.fillStyle = cols[i % cols.length]; cx.fill();
        var mid = (ang + a2)/2;
        cx.fillStyle = "#fff"; cx.font = "13px sans-serif"; cx.textAlign = "center";
        cx.fillText(labels[i]||"", W/2 + Math.cos(mid)*80, H/2 + Math.sin(mid)*80);
        ang = a2;
      });
    } else {
      var n = Math.max(labels.length, vals.length), bw = (W - 60) / n;
      cx.strokeStyle = "rgba(255,255,255,.15)"; cx.beginPath(); cx.moveTo(40, 10); cx.lineTo(40, H-40); cx.lineTo(W-10, H-40); cx.stroke();
      var pts = [];
      for(var i = 0; i < n; i++){
        var v = vals[i] || 0, h = (H - 70) * v / max, x = 50 + i * bw, y = H - 40 - h;
        if(type === "bar"){
          cx.fillStyle = cols[i % cols.length];
          cx.fillRect(x + 6, y, bw - 12, h);
        }
        pts.push([x + bw/2, y]);
        cx.fillStyle = "#9ca3af"; cx.font = "11px sans-serif"; cx.textAlign = "center";
        cx.fillText((labels[i]||"").slice(0,10), x + bw/2, H - 22);
        cx.fillText(String(v), x + bw/2, y - 6);
      }
      if(type === "line"){
        cx.strokeStyle = "#a78bfa"; cx.lineWidth = 3; cx.beginPath();
        pts.forEach(function(p, j){ j ? cx.lineTo(p[0], p[1]) : cx.moveTo(p[0], p[1]); });
        cx.stroke();
        pts.forEach(function(p, j){ cx.fillStyle = cols[j % cols.length]; cx.beginPath(); cx.arc(p[0], p[1], 5, 0, 7); cx.fill(); });
      }
    }
  };
  el("t-dl").onclick = function(){ dl(el("t-cv").toDataURL("image/png"), "chart.png"); };
  el("t-go").click();
}});

TOOLS.push({ id:"freq-gen", cat:"smart", icon:"〰️", name:"Free Tone & Frequency Generator",
desc:"Audio frequency tester", how:"Drag the slider or type Hz, press Play — hear the exact tone. Test speakers & hearing.",
render:function(box){
  box.innerHTML = '<h2>🎵 Frequency Generator</h2><label>Frequency: <b id="t-hz">440</b> Hz</label><input type="range" id="t-f" min="20" max="20000" value="440" style="width:100%"><div class="row"><div><label>Wave</label><select id="t-w"><option value="sine">Sine</option><option value="square">Square</option><option value="sawtooth">Sawtooth</option><option value="triangle">Triangle</option></select></div><div><label>Volume</label><input type="range" id="t-v" min="0" max="100" value="30" style="width:100%"></div></div><button class="tool-btn" id="t-go">▶ Play</button> <button class="tool-btn ghost" id="t-stop" style="display:none">⏹ Stop</button><p class="tool-note">Quick presets: <a href="#" id="t-p1">A4 440</a> · <a href="#" id="t-p2">C4 261</a> · <a href="#" id="t-p3">1kHz test</a> · <a href="#" id="t-p4">15kHz</a></p>';
  var ctx = null, osc = null, gain = null;
  el("t-f").oninput = function(){ el("t-hz").textContent = el("t-f").value; if(osc) osc.frequency.value = el("t-f").value; };
  [["t-p1",440],["t-p2",261.63],["t-p3",1000],["t-p4",15000]].forEach(function(p){
    el(p[0]).onclick = function(e){ e.preventDefault(); el("t-f").value = p[1]; el("t-hz").textContent = p[1]; if(osc) osc.frequency.value = p[1]; };
  });
  el("t-go").onclick = function(){
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    osc = ctx.createOscillator(); gain = ctx.createGain();
    osc.type = el("t-w").value; osc.frequency.value = el("t-f").value;
    gain.gain.value = el("t-v").value / 100;
    osc.connect(gain); gain.connect(ctx.destination); osc.start();
    el("t-go").style.display = "none"; el("t-stop").style.display = "";
  };
  function stop(){ if(osc){ try{osc.stop();}catch(e){} } if(ctx){ ctx.close(); } osc = null; ctx = null; el("t-go").style.display = ""; el("t-stop").style.display = "none"; }
  el("t-stop").onclick = stop;
  el("t-v").oninput = function(){ if(gain) gain.gain.value = el("t-v").value / 100; };
  box._cleanup = stop;
}});

TOOLS.push({ id:"ping-test", cat:"smart", icon:"📡", name:"Free Internet Ping Test Online",
desc:"Latency & speed check", how:"Press Test — measures ping to multiple servers and shows your latency.",
render:function(box){
  box.innerHTML = '<h2>📡 Ping Test</h2><button class="tool-btn" id="t-go">Test Latency</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var urls = ["https://www.google.com/generate_204", "https://www.cloudflare.com/cdn-cgi/trace", "https://api.github.com/zen"];
    outHTML(box, "Testing...");
    var results = [], done = 0;
    urls.forEach(function(u, i){
      var t0 = performance.now();
      fetch(u, { mode: "no-cors", cache: "no-store" }).then(function(){
        results[i] = Math.round(performance.now() - t0);
      }).catch(function(){ results[i] = -1; }).finally(function(){
        done++;
        if(done === urls.length){
          var names = ["Google", "Cloudflare", "GitHub"];
          var ok = results.filter(function(r){ return r > 0; });
          var avg = ok.length ? Math.round(ok.reduce(function(a,b){ return a+b; },0) / ok.length) : -1;
          var html = results.map(function(r, j){ return names[j] + ": " + (r > 0 ? r + " ms" : "fail"); }).join("<br>");
          html += "<br><br><b>Average: " + (avg > 0 ? avg + " ms " + (avg < 50 ? "🟢 Excellent" : avg < 150 ? "🟡 Good" : "🔴 Slow") : "failed") + "</b>";
          outHTML(box, html);
        }
      });
    });
  };
}});

TOOLS.push({ id:"mock-data", cat:"dev", icon:"👻", name:"Free Mock Data Generator Online",
desc:"Fake JSON/CSV for devs", how:"Pick type and count, press Generate — realistic fake data for testing apps.",
render:function(box){
  box.innerHTML = '<h2>🧪 Mock Data Generator</h2><div class="row"><div><label>Type</label><select id="t-t"><option value="users">Users</option><option value="products">Products</option><option value="orders">Orders</option></select></div><div><label>Count</label><select id="t-c"><option>5</option><option selected>10</option><option>25</option><option>50</option></select></div><div><label>Format</label><select id="t-f"><option value="json">JSON</option><option value="csv">CSV</option></select></div></div><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out" style="max-height:300px;overflow:auto"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download</button>';
  var first = ["Ayesha","Bilal","Chen","Diana","Usman","Fatima","Ali","Sara","Omar","Zara","Ahmed","Maria","Hassan","Elena","David"];
  var last = ["Khan","Ahmed","Smith","Garcia","Malik","Shah","Raza","Iqbal","Chen","Kumar"];
  var prods = ["Laptop","Phone","Headphones","Keyboard","Monitor","Mouse","Tablet","Camera","Speaker","Watch"];
  function rnd(a){ return a[Math.floor(Math.random()*a.length)]; }
  el("t-go").onclick = function(){
    var n = parseInt(el("t-c").value, 10), type = el("t-t").value, rows = [];
    for(var i = 0; i < n; i++){
      if(type === "users") rows.push({ id: i+1, name: rnd(first)+" "+rnd(last), email: "user"+(i+1)+"@example.com", age: 18+Math.floor(Math.random()*50), country: rnd(["PK","US","UK","IN","AE"]) });
      else if(type === "products") rows.push({ id: i+1, name: rnd(prods)+" Pro", price: (10+Math.random()*990).toFixed(2), stock: Math.floor(Math.random()*200), rating: (3+Math.random()*2).toFixed(1) });
      else rows.push({ id: "ORD-"+(1000+i), customer: rnd(first)+" "+rnd(last), total: (20+Math.random()*500).toFixed(2), status: rnd(["pending","shipped","delivered"]) });
    }
    var out, name;
    if(el("t-f").value === "csv"){
      var keys = Object.keys(rows[0]);
      out = keys.join(",") + "\n" + rows.map(function(r){ return keys.map(function(k){ return r[k]; }).join(","); }).join("\n");
      name = "mock.csv";
    } else { out = JSON.stringify(rows, null, 2); name = "mock.json"; }
    el("t-out").textContent = out; el("t-out").style.display = "block";
    var b = el("t-dl"); b.style.display = ""; b.onclick = function(){ var bl = new Blob([out], {type:"text/plain"}); dl(URL.createObjectURL(bl), name); };
  };
}});

TOOLS.push({ id:"url-short", cat:"smart", icon:"🩳", name:"Free URL Shortener Online",
desc:"Short links instantly", how:"Paste a long URL, press Shorten — get a tiny link, free via is.gd.",
render:function(box){
  box.innerHTML = '<h2>🔗 URL Shortener</h2><label>Long URL</label><input type="text" id="t-in" placeholder="https://example.com/very/long/url"><button class="tool-btn" id="t-go">Shorten</button><div class="tool-out" id="t-out" style="word-break:break-all"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-go").onclick = function(){
    var u = el("t-in").value.trim();
    if(!u){ outHTML(box, "Paste a URL."); return; }
    if(!/^https?:\/\//i.test(u)) u = "https://" + u;
    outHTML(box, "Shortening...");
    fetch("https://is.gd/create.php?format=simple&url=" + encodeURIComponent(u))
      .then(function(r){ return r.text(); })
      .then(function(t){
        t = t.trim();
        if(t.indexOf("http") === 0){ outHTML(box, "✅ <b>"+esc(t)+"</b>"); var c = el("t-copy"); c.style.display = ""; c.onclick = function(){ copyText(t, c); }; }
        else outHTML(box, "Failed: " + esc(t));
      })
      .catch(function(){ outHTML(box, "Failed — check internet."); });
  };
}});

TOOLS.push({ id:"web-share", cat:"smart", icon:"📤", name:"Free Web Share Tool Online",
desc:"Native mobile sharing", how:"Type title, text and URL — opens your phone's native share menu.",
render:function(box){
  box.innerHTML = '<h2>📤 Web Share</h2><label>Title</label><input type="text" id="t-ti" value="US AI"><label>Text</label><input type="text" id="t-tx" value="Check out these free tools!"><label>URL</label><input type="text" id="t-u" value="https://www.usai-usa.com"><button class="tool-btn" id="t-go">📤 Share</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    if(!navigator.share){ outHTML(box, "Web Share not supported here — works on mobile browsers."); return; }
    navigator.share({ title: el("t-ti").value, text: el("t-tx").value, url: el("t-u").value })
      .then(function(){ outHTML(box, "✅ Shared!"); })
      .catch(function(){ outHTML(box, "Share cancelled."); });
  };
}});

TOOLS.push({ id:"az-index", cat:"smart", icon:"📇", name:"A-Z Tool Directory",
desc:"Every tool, A to Z", how:"All tools in alphabetical order with instant filter — find anything in one tap.",
render:function(box){
  box.innerHTML = '<h2>🔤 A-Z Directory</h2><input type="search" id="t-q" placeholder="Filter tools..." style="width:100%;padding:10px;border-radius:10px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text);margin-bottom:10px"><div id="t-list" style="columns:2;column-gap:16px;font-size:.88rem"></div>';
  function draw(){
    var q = el("t-q").value.toLowerCase();
    var list = TOOLS.filter(function(t){ return !q || t.name.toLowerCase().indexOf(q) > -1; })
      .sort(function(a,b){ return a.name.localeCompare(b.name); });
    el("t-list").innerHTML = list.map(function(t){
      return '<div style="break-inside:avoid;padding:5px 0;border-bottom:1px solid rgba(255,255,255,.05)"><a href="tools.html#'+t.id+'" style="color:inherit;text-decoration:none">'+t.icon+' '+esc(t.name)+'</a></div>';
    }).join("") || "<p>No matches.</p>";
  }
  el("t-q").addEventListener("input", draw);
  draw();
}});

TOOLS.push({ id:"analytics-dash", cat:"smart", icon:"📺", name:"Tool Usage Dashboard",
desc:"Your activity stats", how:"See which tools you use most, your favorites and recent history — all on-device.",
render:function(box){
  var favs = [], hist = [];
  try { favs = JSON.parse(localStorage.getItem("sawalai_favs") || "[]"); } catch(e){}
  try { hist = JSON.parse(localStorage.getItem("sawalai_history") || "[]"); } catch(e){}
  var counts = {};
  hist.forEach(function(h){ var k = h.name || h; counts[k] = (counts[k]||0)+1; });
  var top = Object.keys(counts).sort(function(a,b){ return counts[b]-counts[a]; }).slice(0,8);
  box.innerHTML = '<h2>📈 Usage Dashboard</h2>' +
    '<div class="row"><div><div class="tool-out" style="display:block;text-align:center"><b style="font-size:1.6rem">'+hist.length+'</b><br>tools used</div></div>' +
    '<div><div class="tool-out" style="display:block;text-align:center"><b style="font-size:1.6rem">'+favs.length+'</b><br>favorites</div></div></div>' +
    '<h3 style="margin-top:14px">🏆 Most used</h3><div class="tool-out" style="display:block">' +
    (top.length ? top.map(function(k, i){
      var bar = Math.round(counts[k] / counts[top[0]] * 100);
      return '<div style="margin:6px 0">'+(i+1)+'. '+esc(k)+' ('+counts[k]+'x)<div style="background:rgba(255,255,255,.08);border-radius:6px;height:8px;margin-top:3px"><div style="width:'+bar+'%;height:100%;border-radius:6px;background:linear-gradient(90deg,#a78bfa,#67e8f9)"></div></div></div>';
    }).join("") : "No usage yet — try some tools!") + '</div>';
}});

TOOLS.push({ id:"xss-guard", cat:"smart", icon:"🛡️", name:"Free XSS Sanitizer Online",
desc:"Clean dangerous HTML", how:"Paste HTML/JS — get a safe escaped version. Learn what gets neutralized.",
render:function(box){
  box.innerHTML = '<h2>🛡️ XSS Sanitizer</h2><label>Potentially dangerous input</label><textarea id="t-in" rows="4" placeholder="<script>alert(&quot;xss&quot;)<\/script><img src=x onerror=alert(1)>"></textarea><button class="tool-btn" id="t-go">Sanitize</button><label>Safe output (escaped)</label><div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy</button>';
  el("t-go").onclick = function(){
    var safe = esc(el("t-in").value);
    el("t-out").textContent = safe; el("t-out").style.display = "block";
    var removed = (el("t-in").value.match(/<script|onerror|onload|javascript:/gi) || []).length;
    outHTML(box, el("t-out").textContent + "\n\n⚠️ Neutralized " + removed + " dangerous pattern(s).");
    el("t-out").textContent = safe; el("t-out").style.display = "block";
    var c = el("t-copy"); c.style.display = ""; c.onclick = function(){ copyText(safe, c); };
  };
}});

TOOLS.push({ id:"localenc", cat:"smart", icon:"🙈", name:"Free Text Encryptor Online",
desc:"AES-GCM in browser", how:"Type text + password → encrypted code. Decrypt with the same password. Nothing leaves your device.",
render:function(box){
  box.innerHTML = '<h2>🔐 Text Encryptor (AES-GCM)</h2><label>Text</label><textarea id="t-in" rows="3" placeholder="Secret message..."></textarea><label>Password</label><input type="password" id="t-pw" placeholder="Strong password"><div><button class="tool-btn" id="t-enc">Encrypt</button> <button class="tool-btn ghost" id="t-dec">Decrypt</button></div><div class="tool-out" id="t-out" style="word-break:break-all"></div>';
  function key(pw, salt){
    return crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]).then(function(k){
      return crypto.subtle.deriveKey({ name:"PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" }, k, { name:"AES-GCM", length:256 }, false, ["encrypt","decrypt"]);
    });
  }
  function b64(b){ return btoa(String.fromCharCode.apply(null, new Uint8Array(b))); }
  function ub64(s){ var bin = atob(s), a = new Uint8Array(bin.length); for(var i=0;i<bin.length;i++) a[i]=bin.charCodeAt(i); return a; }
  el("t-enc").onclick = function(){
    var t = el("t-in").value, pw = el("t-pw").value;
    if(!t || !pw){ outHTML(box, "Text + password required."); return; }
    var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    key(pw, salt).then(function(k){
      return crypto.subtle.encrypt({ name:"AES-GCM", iv: iv }, k, new TextEncoder().encode(t));
    }).then(function(ct){ outHTML(box, b64(salt) + "." + b64(iv) + "." + b64(ct)); })
    .catch(function(){ outHTML(box, "Encryption failed."); });
  };
  el("t-dec").onclick = function(){
    var parts = el("t-in").value.trim().split("."), pw = el("t-pw").value;
    if(parts.length !== 3 || !pw){ outHTML(box, "Paste encrypted code + password."); return; }
    key(pw, ub64(parts[0])).then(function(k){
      return crypto.subtle.decrypt({ name:"AES-GCM", iv: ub64(parts[1]) }, k, ub64(parts[2]));
    }).then(function(pt){ outHTML(box, "✅ " + esc(new TextDecoder().decode(pt))); })
    .catch(function(){ outHTML(box, "❌ Wrong password or corrupted data."); });
  };
}});

TOOLS.push({ id:"ssl-expiry", cat:"smart", icon:"🗓️", name:"Free SSL Expiry Checker Online",
desc:"Certificate expiry alerts", how:"Enter a domain — see its SSL certificate issuer and expiry date.",
render:function(box){
  box.innerHTML = '<h2>🔒 SSL Expiry Checker</h2><label>Domain</label><input type="text" id="t-in" placeholder="example.com"><button class="tool-btn" id="t-go">Check</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var d = el("t-in").value.trim().replace(/^https?:\/\//,"").split("/")[0];
    if(!d){ outHTML(box, "Enter a domain."); return; }
    outHTML(box, "Checking...");
    fetch("https://crt.sh/?q=" + encodeURIComponent(d) + "&output=json").then(function(r){ return r.json(); }).then(function(j){
      if(!j || !j.length){ outHTML(box, "No certificates found."); return; }
      var c = j[0];
      var exp = new Date(c.not_after), days = Math.ceil((exp - Date.now()) / 864e5);
      outHTML(box, "Domain: <b>"+esc(d)+"</b><br>Issuer: "+esc(c.issuer_name||"?")+"<br>Expires: "+exp.toLocaleDateString()+"<br>Days left: <b>"+days+"</b> " + (days < 30 ? "⚠️ Renew soon!" : "✅ OK"));
    }).catch(function(){ outHTML(box, "Check failed — try again."); });
  };
}});

TOOLS.push({ id:"ip-geo", cat:"smart", icon:"📍", name:"Free IP Geolocation Finder",
desc:"Locate any IP address", how:"Shows your own location, or enter any IP to look it up.",
render:function(box){
  box.innerHTML = '<h2>📍 IP Geolocation</h2><label>IP (blank = yours)</label><input type="text" id="t-in" placeholder="8.8.8.8"><button class="tool-btn" id="t-go">Locate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var ip = el("t-in").value.trim();
    outHTML(box, "Locating...");
    fetch("https://ipapi.co/" + (ip || "json") + "/json/").then(function(r){ return r.json(); }).then(function(d){
      if(d.error) { outHTML(box, "Lookup failed."); return; }
      outHTML(box, "IP: <b>"+esc(d.ip||"?")+"</b><br>City: "+esc(d.city||"?")+"<br>Region: "+esc(d.region||"?")+"<br>Country: "+esc(d.country_name||"?")+" "+(d.country_calling_code||"")+"<br>ISP: "+esc(d.org||"?")+"<br>Timezone: "+esc(d.timezone||"?"));
    }).catch(function(){ outHTML(box, "Lookup failed."); });
  };
  el("t-go").click();
}});

TOOLS.push({ id:"sitemap-ping", cat:"seo", icon:"📯", name:"Free Sitemap Ping Submitter",
desc:"Notify search engines", how:"Enter your sitemap URL — pings Google & Bing to recrawl it.",
render:function(box){
  box.innerHTML = '<h2>📡 Sitemap Ping</h2><label>Your sitemap URL</label><input type="text" id="t-in" placeholder="https://example.com/sitemap.xml"><button class="tool-btn" id="t-go">Ping Search Engines</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var u = el("t-in").value.trim();
    if(!u){ outHTML(box, "Enter sitemap URL."); return; }
    if(!/^https?:\/\//i.test(u)) u = "https://" + u;
    var e = encodeURIComponent(u);
    outHTML(box, 'Ping URLs (open each):<br><a href="https://www.google.com/ping?sitemap='+e+'" target="_blank" rel="noopener">Google ping →</a><br><a href="https://www.bing.com/ping?sitemap='+e+'" target="_blank" rel="noopener">Bing ping →</a><br><br>✅ Opening both...');
    window.open("https://www.google.com/ping?sitemap="+e, "_blank");
    setTimeout(function(){ window.open("https://www.bing.com/ping?sitemap="+e, "_blank"); }, 800);
  };
}});

TOOLS.push({ id:"bug-shot", cat:"smart", icon:"🐞", name:"Bug Report with Screenshot",
desc:"Capture + describe bugs", how:"Describe the bug, capture a screenshot of this page, download the report.",
render:function(box){
  box.innerHTML = '<h2>🐞 Bug Reporter</h2><label>What went wrong?</label><textarea id="t-in" rows="3" placeholder="Describe the bug..."></textarea><button class="tool-btn" id="t-shot">📸 Capture Screenshot</button> <button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download Report</button><div id="t-prev" style="margin-top:10px"></div>';
  var shot = null;
  el("t-shot").onclick = function(){
    el("t-shot").disabled = true; el("t-shot").textContent = "Capturing...";
    function done(){
      el("t-shot").disabled = false; el("t-shot").textContent = "📸 Capture Screenshot";
    }
    if(window.html2canvas){ snap(); }
    else {
      var s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
      s.onload = snap; s.onerror = function(){ outHTML(box, "Screenshot failed."); done(); };
      document.head.appendChild(s);
    }
    function snap(){
      html2canvas(document.body, { scale: 0.5 }).then(function(cv){
        shot = cv.toDataURL("image/png");
        el("t-prev").innerHTML = '<img src="'+shot+'" alt="Bug report screenshot preview" style="width:100%;border-radius:10px;border:1px solid var(--line)">';
        el("t-dl").style.display = ""; done();
      }).catch(function(){ done(); });
    }
  };
  el("t-dl").onclick = function(){
    var report = "BUG REPORT — " + new Date().toISOString() + "\nURL: " + location.href + "\nBrowser: " + navigator.userAgent + "\n\nDescription:\n" + el("t-in").value;
    dl(URL.createObjectURL(new Blob([report], {type:"text/plain"})), "bug-report.txt");
    if(shot) dl(shot, "bug-screenshot.png");
  };
}});

TOOLS.push({ id:"rate-demo", cat:"smart", icon:"🚦", name:"Rate Limiter Demo",
desc:"See abuse protection", how:"Spam the button — after 5 fast clicks you're throttled. This is how APIs stop abuse.",
render:function(box){
  box.innerHTML = '<h2>🚦 Rate Limiter Demo</h2><p class="tool-note">Click fast! After 5 clicks in 3 seconds, you get throttled for 5s.</p><button class="tool-btn" id="t-go">Click me fast!</button><div class="tool-out" id="t-out"></div>';
  var hits = [], blocked = false;
  el("t-go").onclick = function(){
    if(blocked){ return; }
    var now = Date.now();
    hits = hits.filter(function(t){ return now - t < 3000; });
    hits.push(now);
    if(hits.length > 5){
      blocked = true;
      outHTML(box, "🚦 <b>Rate limited!</b> Too many requests — cooling down 5s...");
      el("t-go").disabled = true;
      setTimeout(function(){ blocked = false; hits = []; el("t-go").disabled = false; outHTML(box, "✅ Cooldown over — try again, slower!"); }, 5000);
    } else {
      outHTML(box, "Clicks in last 3s: <b>"+hits.length+"</b> / 5");
    }
  };
}});

TOOLS.push({ id:"content-lock", cat:"smart", icon:"🔏", name:"Content Protection Toggle",
desc:"Right-click guard demo", how:"Toggle protection on this page — try right-clicking or selecting text.",
render:function(box){
  var on = false;
  box.innerHTML = '<h2>🔏 Content Protection</h2><p class="tool-note">Demo: toggles right-click + text-selection blocking on THIS page.</p><button class="tool-btn" id="t-go">Enable Protection</button><div class="tool-out" id="t-out"></div>';
  function block(e){ e.preventDefault(); }
  el("t-go").onclick = function(){
    on = !on;
    if(on){
      document.addEventListener("contextmenu", block);
      document.body.style.userSelect = "none";
      el("t-go").textContent = "Disable Protection";
      outHTML(box, "🔏 <b>ON</b> — try right-clicking anywhere!");
    } else {
      document.removeEventListener("contextmenu", block);
      document.body.style.userSelect = "";
      el("t-go").textContent = "Enable Protection";
      outHTML(box, "Protection off.");
    }
  };
  box._cleanup = function(){ document.removeEventListener("contextmenu", block); document.body.style.userSelect = ""; };
}});

TOOLS.push({ id:"dark-sched", cat:"smart", icon:"🌗", name:"Auto Dark/Light Scheduler",
desc:"Theme by time of day", how:"Set hours — the site auto-switches dark/light. Your choice saves.",
render:function(box){
  var d = 19, l = 7;
  try { var s = JSON.parse(localStorage.getItem("sawalai_theme_sched") || "{}"); if(s.d!=null){ d = s.d; l = s.l; } } catch(e){}
  box.innerHTML = '<h2>🌗 Theme Scheduler</h2><div class="row"><div><label>Dark from (hour)</label><input type="number" id="t-d" min="0" max="23" value="'+d+'"></div><div><label>Light from (hour)</label><input type="number" id="t-l" min="0" max="23" value="'+l+'"></div></div><button class="tool-btn" id="t-go">Save Schedule</button> <button class="tool-btn ghost" id="t-off">Turn Off</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    try { localStorage.setItem("sawalai_theme_sched", JSON.stringify({ d: +el("t-d").value, l: +el("t-l").value })); } catch(e){}
    apply();
    outHTML(box, "✅ Saved! Theme will follow your schedule.");
  };
  el("t-off").onclick = function(){ try{ localStorage.removeItem("sawalai_theme_sched"); }catch(e){} outHTML(box, "Scheduler off."); };
  function apply(){
    var h = new Date().getHours(), dd = +el("t-d").value, ll = +el("t-l").value;
    var dark = dd > ll ? (h >= dd || h < ll) : (h >= dd && h < ll);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }
}});

TOOLS.push({ id:"currency-quick", cat:"finance", icon:"💴", name:"Quick Currency Converter Online",
desc:"Live exchange rates", how:"Enter amount, pick currencies — live rates via free API.",
render:function(box){
  box.innerHTML = '<h2>💱 Currency Converter</h2><label>Amount</label><input type="number" id="t-a" value="100"><div class="row"><div><label>From</label><select id="t-f"><option>USD</option><option>PKR</option><option>EUR</option><option>GBP</option><option>AED</option><option>INR</option></select></div><div><label>To</label><select id="t-t"><option>PKR</option><option>USD</option><option>EUR</option><option>GBP</option><option>AED</option><option>INR</option></select></div></div><button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out" style="font-size:1.3rem;text-align:center"></div>';
  el("t-f").value = "USD"; el("t-t").value = "PKR";
  el("t-go").onclick = function(){
    var a = parseFloat(el("t-a").value) || 0, f = el("t-f").value, t = el("t-t").value;
    if(f === t){ outHTML(box, a + " " + f); return; }
    outHTML(box, "Converting...");
    fetch("https://open.er-api.com/v6/latest/" + f).then(function(r){ return r.json(); }).then(function(d){
      var r = d.rates && d.rates[t];
      if(r) outHTML(box, "<b>" + a + " " + f + " = " + (a*r).toFixed(2) + " " + t + "</b>");
      else outHTML(box, "Rate unavailable.");
    }).catch(function(){ outHTML(box, "Failed — check internet."); });
  };
}});

/* ============ ACCESSIBILITY + NEXT-GEN (fully functional) ============ */

TOOLS.push({ id:"magnifier", cat:"smart", icon:"👓", name:"Free Screen Magnifier Online",
desc:"Zoom any image detail", how:"Upload an image, move your mouse — a magnifying lens follows showing 3x zoom.",
render:function(box){
  box.innerHTML = '<h2>🔍 Screen Magnifier</h2><label>Upload image</label><input type="file" id="t-f" accept="image/*"><div style="position:relative;margin-top:10px"><canvas id="t-cv" width="560" height="340" style="width:100%;border:1px solid var(--line);border-radius:10px;cursor:none"></canvas><div id="t-lens" style="display:none;position:absolute;width:120px;height:120px;border:2px solid #a78bfa;border-radius:50%;pointer-events:none;background-repeat:no-repeat;box-shadow:0 0 20px rgba(0,0,0,.6)"></div></div><label>Zoom: <span id="t-zv">3</span>x</label><input type="range" id="t-z" min="2" max="6" value="3" style="width:100%">';
  var img = new Image(), cv = el("t-cv"), cx = cv.getContext("2d"), lens = el("t-lens");
  el("t-f").onchange = function(e){ var r = new FileReader(); r.onload = function(){ img.src = r.result; }; r.readAsDataURL(e.target.files[0]); };
  img.onload = function(){ cx.clearRect(0,0,cv.width,cv.height); var s = Math.min(cv.width/img.width, cv.height/img.height); var w = img.width*s, h = img.height*s; cx.drawImage(img, (cv.width-w)/2, (cv.height-h)/2, w, h); };
  el("t-z").oninput = function(){ el("t-zv").textContent = el("t-z").value; };
  cv.addEventListener("mousemove", function(e){
    if(!img.src) return;
    var r = cv.getBoundingClientRect(), z = +el("t-z").value;
    var x = (e.clientX - r.left) * cv.width / r.width, y = (e.clientY - r.top) * cv.height / r.height;
    lens.style.display = "block";
    lens.style.left = (e.clientX - r.left - 60) + "px"; lens.style.top = (e.clientY - r.top - 60) + "px";
    lens.style.backgroundImage = "url(" + cv.toDataURL() + ")";
    lens.style.backgroundSize = (cv.width * z) + "px " + (cv.height * z) + "px";
    lens.style.backgroundPosition = (-x * z + 60) + "px " + (-y * z + 60) + "px";
  });
  cv.addEventListener("mouseleave", function(){ lens.style.display = "none"; });
}});

TOOLS.push({ id:"colorblind", cat:"smart", icon:"👁️‍🗨️", name:"Free Color Blindness Simulator",
desc:"See as others see", how:"Upload any image — preview protanopia, deuteranopia, tritanopia filters.",
render:function(box){
  box.innerHTML = '<h2>👁️‍🗨️ Color Blindness Simulator</h2><label>Upload image</label><input type="file" id="t-f" accept="image/*"><label>Vision type</label><select id="t-t"><option value="normal">Normal vision</option><option value="protanopia">Protanopia (red-blind)</option><option value="deuteranopia">Deuteranopia (green-blind)</option><option value="tritanopia">Tritanopia (blue-blind)</option><option value="achroma">Achromatopsia (no color)</option></select><div style="margin-top:10px"><canvas id="t-cv" width="560" height="340" style="width:100%;border:1px solid var(--line);border-radius:10px"></canvas></div>';
  var img = new Image(), cv = el("t-cv"), cx = cv.getContext("2d");
  var M = {
    normal: [[1,0,0],[0,1,0],[0,0,1]],
    protanopia: [[0.567,0.433,0],[0.558,0.442,0],[0,0.242,0.758]],
    deuteranopia: [[0.625,0.375,0],[0.7,0.3,0],[0,0.3,0.7]],
    tritanopia: [[0.95,0.05,0],[0,0.433,0.567],[0,0.475,0.525]],
    achroma: [[0.299,0.587,0.114],[0.299,0.587,0.114],[0.299,0.587,0.114]]
  };
  function draw(){
    if(!img.src) return;
    var s = Math.min(cv.width/img.width, cv.height/img.height), w = img.width*s, h = img.height*s;
    var ox = (cv.width-w)/2, oy = (cv.height-h)/2;
    cx.clearRect(0,0,cv.width,cv.height); cx.drawImage(img, ox, oy, w, h);
    var m = M[el("t-t").value], d = cx.getImageData(ox, oy, w, h), p = d.data;
    for(var i = 0; i < p.length; i += 4){
      var r = p[i], g = p[i+1], b = p[i+2];
      p[i]   = r*m[0][0] + g*m[0][1] + b*m[0][2];
      p[i+1] = r*m[1][0] + g*m[1][1] + b*m[1][2];
      p[i+2] = r*m[2][0] + g*m[2][1] + b*m[2][2];
    }
    cx.putImageData(d, ox, oy);
  }
  el("t-f").onchange = function(e){ var r = new FileReader(); r.onload = function(){ img.src = r.result; }; r.readAsDataURL(e.target.files[0]); };
  img.onload = draw; el("t-t").onchange = draw;
}});

TOOLS.push({ id:"columns", cat:"smart", icon:"🗞️", name:"Free Multi-Column Reader",
desc:"Newspaper-style reading", how:"Paste long text — read it in comfortable newspaper columns. Adjust count & font.",
render:function(box){
  box.innerHTML = '<h2>📰 Multi-Column Reader</h2><div class="row"><div><label>Columns</label><select id="t-c"><option>2</option><option selected>3</option><option>4</option></select></div><div><label>Font size</label><select id="t-s"><option value="14">Small</option><option value="17" selected>Medium</option><option value="21">Large</option></select></div></div><label>Paste text</label><textarea id="t-in" rows="5" placeholder="Paste a long article here..."></textarea><button class="tool-btn" id="t-go">Format</button><div id="t-out" style="margin-top:12px;padding:16px;border:1px solid var(--line);border-radius:10px;background:rgba(0,0,0,.2);line-height:1.7"></div>';
  el("t-go").onclick = function(){
    var t = el("t-in").value.trim(); if(!t) return;
    var o = el("t-out");
    o.style.columnCount = el("t-c").value; o.style.columnGap = "28px";
    o.style.fontSize = el("t-s").value + "px";
    o.innerHTML = esc(t).replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>");
    o.innerHTML = "<p>" + o.innerHTML + "</p>";
  };
}});

TOOLS.push({ id:"qr-card", cat:"smart", icon:"📲", name:"Free Digital Business Card QR",
desc:"vCard QR generator", how:"Enter your details — get a QR code that saves you as a contact when scanned.",
render:function(box){
  box.innerHTML = '<h2>💼 QR Business Card</h2><div class="row"><div><label>Name</label><input type="text" id="t-n" placeholder="Ali Khan"></div><div><label>Phone</label><input type="text" id="t-p" placeholder="+92 300 1234567"></div></div><div class="row"><div><label>Email</label><input type="text" id="t-e" placeholder="ali@example.com"></div><div><label>Company</label><input type="text" id="t-c" placeholder="US AI"></div></div><button class="tool-btn" id="t-go">Generate Card QR</button><div style="text-align:center;margin-top:14px" id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button>';
  el("t-go").onclick = function(){
    var v = "BEGIN:VCARD\nVERSION:3.0\nFN:" + el("t-n").value + "\nTEL:" + el("t-p").value + "\nEMAIL:" + el("t-e").value + "\nORG:" + el("t-c").value + "\nEND:VCARD";
    if(!el("t-n").value.trim()){ el("t-prev").innerHTML = "Enter at least a name."; return; }
    var url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(v);
    el("t-prev").innerHTML = '<img src="'+url+'" style="border-radius:10px;background:#fff;padding:8px" alt="vCard QR">';
    var b = el("t-dl"); b.style.display = ""; b.onclick = function(){ dl(url, "business-card-qr.png"); };
  };
}});

TOOLS.push({ id:"batch-img", cat:"image", icon:"🗂️", name:"Free Batch Image Processor",
desc:"Resize many at once", how:"Select multiple images, set max width — all resized & downloaded as a ZIP-friendly set.",
render:function(box){
  box.innerHTML = '<h2>🖼️ Batch Image Processor</h2><label>Select images (multiple)</label><input type="file" id="t-f" accept="image/*" multiple><div class="row"><div><label>Max width (px)</label><input type="number" id="t-w" value="800"></div><div><label>Format</label><select id="t-fmt"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></div></div><button class="tool-btn" id="t-go">Process All</button><div class="tool-out" id="t-out"></div><div id="t-list" style="margin-top:10px"></div>';
  var done = [];
  el("t-go").onclick = function(){
    var files = el("t-f").files;
    if(!files.length){ outHTML(box, "Select images first."); return; }
    outHTML(box, "Processing " + files.length + " images...");
    done = []; var n = 0;
    Array.prototype.forEach.call(files, function(f, i){
      var img = new Image();
      img.onload = function(){
        var mw = +el("t-w").value || 800, s = Math.min(1, mw / img.width);
        var cv = document.createElement("canvas");
        cv.width = Math.round(img.width * s); cv.height = Math.round(img.height * s);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        var ext = el("t-fmt").value.split("/")[1];
        done.push({ name: f.name.replace(/\.[^.]+$/, "") + "-resized." + ext, url: cv.toDataURL(el("t-fmt").value, 0.85) });
        if(++n === files.length){
          outHTML(box, "✅ " + n + " images processed!");
          el("t-list").innerHTML = done.map(function(d, j){
            return '<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)">' + esc(d.name) + ' <a href="#" data-i="'+j+'" class="dl-one" style="color:#a78bfa">⬇</a></div>';
          }).join("");
          el("t-list").querySelectorAll(".dl-one").forEach(function(a){
            a.onclick = function(e){ e.preventDefault(); var d = done[+a.getAttribute("data-i")]; dl(d.url, d.name); };
          });
        }
      };
      var r = new FileReader(); r.onload = function(){ img.src = r.result; }; r.readAsDataURL(f);
    });
  };
}});

TOOLS.push({ id:"pomodoro-focus", cat:"smart", icon:"🧘", name:"Free Pomodoro Focus Timer",
desc:"25-min focus + ambient", how:"Start a 25-minute focus session with optional rain/cafe ambience. Breaks included.",
render:function(box){
  box.innerHTML = '<h2>🍅 Pomodoro Timer</h2><div class="row"><div><label>Focus (min)</label><input type="number" id="t-f" value="25" min="1"></div><div><label>Break (min)</label><input type="number" id="t-b" value="5" min="1"></div><div><label>Ambience</label><select id="t-a"><option value="none">None</option><option value="rain">🌧 Rain</option><option value="cafe">☕ Cafe</option></select></div></div><div style="text-align:center;font-size:3rem;margin:14px 0" id="t-clock">25:00</div><button class="tool-btn" id="t-go">▶ Start Focus</button> <button class="tool-btn ghost" id="t-stop" style="display:none">⏹ Reset</button><div class="tool-out" id="t-out"></div>';
  var iv = null, actx = null, anoise = null, endAt = 0, mode = "focus";
  function noise(kind){
    if(kind === "none" || !actx) return;
    var len = actx.sampleRate * 2, buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
    for(var i = 0; i < len; i++) d[i] = (Math.random()*2-1) * (kind === "rain" ? 0.25 : 0.12);
    var src = actx.createBufferSource(); src.buffer = buf; src.loop = true;
    var f = actx.createBiquadFilter(); f.type = kind === "rain" ? "highpass" : "bandpass"; f.frequency.value = kind === "rain" ? 1200 : 800;
    src.connect(f); f.connect(actx.destination); src.start(); anoise = src;
  }
  function tick(){
    var left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
    el("t-clock").textContent = String(Math.floor(left/60)).padStart(2,"0") + ":" + String(left%60).padStart(2,"0");
    if(left <= 0){
      clearInterval(iv);
      if(mode === "focus"){
        mode = "break"; outHTML(box, "🎉 Focus done! Break time — relax.");
        endAt = Date.now() + (+el("t-b").value) * 60000;
        iv = setInterval(tick, 500);
      } else { outHTML(box, "✅ Break over — ready for another round?"); stopAll(false); }
    }
  }
  function stopAll(reset){
    clearInterval(iv); iv = null;
    if(anoise){ try{ anoise.stop(); }catch(e){} anoise = null; }
    if(actx){ actx.close(); actx = null; }
    el("t-go").style.display = ""; el("t-stop").style.display = "none";
    if(reset){ mode = "focus"; el("t-clock").textContent = String(+el("t-f").value).padStart(2,"0") + ":00"; }
  }
  el("t-go").onclick = function(){
    mode = "focus"; endAt = Date.now() + (+el("t-f").value) * 60000;
    actx = new (window.AudioContext || window.webkitAudioContext)();
    noise(el("t-a").value);
    iv = setInterval(tick, 500); tick();
    el("t-go").style.display = "none"; el("t-stop").style.display = "";
    outHTML(box, "🔴 Focusing... stay with it!");
  };
  el("t-stop").onclick = function(){ stopAll(true); outHTML(box, "Reset."); };
  box._cleanup = function(){ stopAll(false); };
}});

TOOLS.push({ id:"note-locker", cat:"smart", icon:"📔", name:"Free Encrypted Note Locker",
desc:"Password-protected notes", how:"Write a note, lock with password — only the password opens it. AES encrypted.",
render:function(box){
  box.innerHTML = '<h2>🗝️ Note Locker</h2><div id="t-locked"><label>Password to lock/unlock</label><input type="password" id="t-pw" placeholder="Your password"><div id="t-area"></div></div><div class="tool-out" id="t-out"></div>';
  var KEY = "sawalai_locker_v1";
  function lockedUI(){
    el("t-area").innerHTML = '<button class="tool-btn" id="t-open">🔓 Unlock Notes</button>';
    el("t-open").onclick = function(){
      var pw = el("t-pw").value; if(!pw){ outHTML(box, "Enter password."); return; }
      var raw = null;
      try { raw = localStorage.getItem(KEY); } catch(e){}
      if(!raw){ openUI(pw, ""); return; }
      try {
        var parts = raw.split("."), salt = ub64(parts[0]), iv = ub64(parts[1]);
        crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]).then(function(k){
          return crypto.subtle.deriveKey({ name:"PBKDF2", salt: salt, iterations: 80000, hash:"SHA-256" }, k, { name:"AES-GCM", length:256 }, false, ["decrypt"]);
        }).then(function(k){ return crypto.subtle.decrypt({ name:"AES-GCM", iv: iv }, k, ub64(parts[2])); })
        .then(function(pt){ openUI(pw, new TextDecoder().decode(pt)); })
        .catch(function(){ outHTML(box, "❌ Wrong password."); });
      } catch(e){ outHTML(box, "❌ Wrong password."); }
    };
  }
  function ub64(s){ var b = atob(s), a = new Uint8Array(b.length); for(var i=0;i<b.length;i++) a[i]=b.charCodeAt(i); return a; }
  function b64(buf){ return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); }
  function openUI(pw, txt){
    el("t-area").innerHTML = '<label>Your secret notes</label><textarea id="t-n" rows="8" placeholder="Write secrets here..."></textarea><div style="margin-top:8px"><button class="tool-btn" id="t-save">🔒 Save & Lock</button></div>';
    el("t-n").value = txt;
    el("t-save").onclick = function(){
      var salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
      crypto.subtle.importKey("raw", new TextEncoder().encode(pw), "PBKDF2", false, ["deriveKey"]).then(function(k){
        return crypto.subtle.deriveKey({ name:"PBKDF2", salt: salt, iterations: 80000, hash:"SHA-256" }, k, { name:"AES-GCM", length:256 }, false, ["encrypt"]);
      }).then(function(k){ return crypto.subtle.encrypt({ name:"AES-GCM", iv: iv }, k, new TextEncoder().encode(el("t-n").value)); })
      .then(function(ct){
        try { localStorage.setItem(KEY, b64(salt) + "." + b64(iv) + "." + b64(ct)); } catch(e){}
        el("t-pw").value = ""; lockedUI(); outHTML(box, "🔒 Locked & saved!");
      });
    };
    outHTML(box, "🔓 Unlocked — write, then Save & Lock.");
  }
  lockedUI();
}});

TOOLS.push({ id:"polls", cat:"smart", icon:"🗳️", name:"Community Polls & Voting",
desc:"Vote for new tools", how:"Vote on which tool we build next — results save on your device, most-voted wins!",
render:function(box){
  var POLLS = [
    { id: "p1", q: "What tool should we build next?", opts: ["AI Meme Generator", "Resume Builder", "Video Compressor", "Invoice Pro"] },
    { id: "p3", q: "Which new studio would you love?", opts: ["Music Studio", "Podcast Studio", "Game Studio", "3D Avatar Studio"] },
    { id: "p4", q: "How do you use US AI most?", opts: ["Free tools", "AI studios", "Articles & guides", "Turkish dramas"] },
    { id: "p2", q: "Which feature matters most?", opts: ["Dark OLED theme", "Offline mode", "More languages", "Faster search"] }
  ];
  function votes(pid){ try { return JSON.parse(localStorage.getItem("sawalai_poll_" + pid) || "{}"); } catch(e){ return {}; } }
  function myVote(pid){ try { return localStorage.getItem("sawalai_myvote_" + pid); } catch(e){ return null; } }
  function draw(){
    box.innerHTML = '<h2>🗳️ Community Polls</h2>' + POLLS.map(function(p){
      var v = votes(p.id), mv = myVote(p.id);
      var total = p.opts.reduce(function(a,o){ return a + (v[o]||0); }, 0) || 1;
      return '<div style="margin:14px 0;padding:12px;border:1px solid var(--line);border-radius:10px"><b>' + esc(p.q) + '</b>' +
        p.opts.map(function(o){
          var pct = Math.round((v[o]||0) / total * 100);
          if(mv) return '<div style="margin:6px 0;font-size:.88rem">' + esc(o) + ' — <b>' + pct + '%</b><div style="background:rgba(255,255,255,.08);border-radius:6px;height:8px"><div style="width:'+pct+'%;height:100%;border-radius:6px;background:linear-gradient(90deg,#a78bfa,#67e8f9)"></div></div></div>';
          return '<button class="tool-btn ghost" data-poll="'+p.id+'" data-opt="'+esc(o)+'" style="margin:4px 6px 4px 0;padding:8px 14px;font-size:.85rem">' + esc(o) + '</button>';
        }).join("") +
        (mv ? '<p class="tiny" style="color:#4ade80">✅ You voted: ' + esc(mv) + '</p>' : '') + '</div>';
    }).join("");
    box.querySelectorAll("[data-poll]").forEach(function(b){
      b.onclick = function(){
        var pid = b.getAttribute("data-poll"), opt = b.getAttribute("data-opt");
        var v = votes(pid); v[opt] = (v[opt]||0) + 1;
        try { localStorage.setItem("sawalai_poll_" + pid, JSON.stringify(v)); localStorage.setItem("sawalai_myvote_" + pid, opt); } catch(e){}
        draw();
      };
    });
  }
  draw();
}});

TOOLS.push({ id:"crypto-track", cat:"finance", icon:"🛰️", name:"Free Crypto Price Tracker",
desc:"Live crypto prices", how:"Top coins with live USD prices, 24h change — auto refreshes.",
render:function(box){
  box.innerHTML = '<h2>₿ Crypto Tracker</h2><button class="tool-btn" id="t-go">Refresh Prices</button><div class="tool-out" id="t-out" style="display:block"></div><p class="tiny muted">Auto-refresh every 60s · via CoinGecko</p>';
  var iv = null;
  function load(){
    outHTML(box, "Loading...");
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,ripple,dogecoin,cardano&price_change_percentage=24h")
      .then(function(r){ return r.json(); }).then(function(d){
        outHTML(box, d.map(function(c){
          var chg = c.price_change_percentage_24h || 0;
          var col = chg >= 0 ? "#4ade80" : "#f87171";
          return '<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span><b>' + esc(c.symbol.toUpperCase()) + '</b> <span class="tiny muted">' + esc(c.name) + '</span></span><span><b>$' + c.current_price.toLocaleString() + '</b> <span style="color:'+col+'">' + (chg>=0?"+":"") + chg.toFixed(1) + '%</span></span></div>';
        }).join(""));
      }).catch(function(){ outHTML(box, "Failed to load prices."); });
  }
  el("t-go").onclick = load;
  load(); iv = setInterval(load, 60000);
  box._cleanup = function(){ clearInterval(iv); };
}});

TOOLS.push({ id:"idb-store", cat:"smart", icon:"💽", name:"Offline Database (IndexedDB)",
desc:"50MB+ browser storage", how:"Save big notes/files in IndexedDB — survives 50MB+, works offline. Your personal vault.",
render:function(box){
  box.innerHTML = '<h2>🗄️ Offline Database</h2><label>Key</label><input type="text" id="t-k" placeholder="my-note"><label>Value</label><textarea id="t-v" rows="4" placeholder="Any text, even huge..."></textarea><div><button class="tool-btn" id="t-save">💾 Save</button> <button class="tool-btn ghost" id="t-load">📂 Load</button> <button class="tool-btn ghost" id="t-list">📋 List Keys</button> <button class="tool-btn ghost" id="t-del">🗑 Delete</button></div><div class="tool-out" id="t-out"></div>';
  var db = null;
  function open(cb){
    if(db) return cb();
    var r = indexedDB.open("sawalai_vault", 1);
    r.onupgradeneeded = function(){ r.result.createObjectStore("kv"); };
    r.onsuccess = function(){ db = r.result; cb(); };
    r.onerror = function(){ outHTML(box, "IndexedDB unavailable."); };
  }
  function tx(mode, fn){
    open(function(){ var t = db.transaction("kv", mode), s = t.objectStore("kv"); fn(s); });
  }
  el("t-save").onclick = function(){
    var k = el("t-k").value.trim(); if(!k){ outHTML(box, "Enter a key."); return; }
    tx("readwrite", function(s){ s.put(el("t-v").value, k); outHTML(box, "✅ Saved <b>"+esc(k)+"</b> (" + el("t-v").value.length + " chars)"); });
  };
  el("t-load").onclick = function(){
    var k = el("t-k").value.trim(); if(!k){ outHTML(box, "Enter a key."); return; }
    tx("readonly", function(s){ var q = s.get(k); q.onsuccess = function(){ el("t-v").value = q.result || ""; outHTML(box, q.result != null ? "✅ Loaded." : "Key not found."); }; });
  };
  el("t-list").onclick = function(){
    tx("readonly", function(s){ var q = s.getAllKeys(); q.onsuccess = function(){ outHTML(box, "Keys:<br>" + (q.result.map(esc).join("<br>") || "(empty)")); }; });
  };
  el("t-del").onclick = function(){
    var k = el("t-k").value.trim(); if(!k) return;
    tx("readwrite", function(s){ s.delete(k); outHTML(box, "🗑 Deleted <b>"+esc(k)+"</b>"); });
  };
}});

TOOLS.push({ id:"favicon-gen", cat:"smart", icon:"🎖️", name:"Favicon & Badge Generator",
desc:"Emoji favicons + badges", how:"Pick an emoji — get a favicon file + live tab notification badge demo.",
render:function(box){
  box.innerHTML = '<h2>✨ Favicon Generator</h2><label>Emoji</label><input type="text" id="t-e" value="🚀" maxlength="4" style="font-size:2rem;text-align:center"><button class="tool-btn" id="t-go">Generate Favicon</button> <button class="tool-btn ghost" id="t-badge">🔴 Test Tab Badge (3)</button><div style="text-align:center;margin-top:12px" id="t-prev"></div><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button>';
  el("t-go").onclick = function(){
    var e = el("t-e").value || "🚀";
    var cv = document.createElement("canvas"); cv.width = cv.height = 128;
    var cx = cv.getContext("2d");
    cx.fillStyle = "#1a1a2e"; cx.beginPath(); cx.roundRect(0,0,128,128,28); cx.fill();
    cx.font = "84px serif"; cx.textAlign = "center"; cx.textBaseline = "middle";
    cx.fillText(e, 64, 70);
    var url = cv.toDataURL("image/png");
    el("t-prev").innerHTML = '<img src="'+url+'" alt="Generated favicon and badge preview" style="width:96px;border-radius:20px">';
    var b = el("t-dl"); b.style.display = ""; b.onclick = function(){ dl(url, "favicon.png"); };
    var link = document.querySelector("link[rel=icon]") || document.createElement("link");
    link.rel = "icon"; link.href = url; document.head.appendChild(link);
    outHTML(box, "✅ Favicon applied to THIS tab too!");
  };
  el("t-badge").onclick = function(){
    var cv = document.createElement("canvas"); cv.width = cv.height = 128;
    var cx = cv.getContext("2d");
    cx.fillStyle = "#1a1a2e"; cx.beginPath(); cx.roundRect(0,0,128,128,28); cx.fill();
    cx.fillStyle = "#ef4444"; cx.beginPath(); cx.arc(96, 32, 28, 0, 7); cx.fill();
    cx.fillStyle = "#fff"; cx.font = "bold 34px sans-serif"; cx.textAlign = "center"; cx.textBaseline = "middle";
    cx.fillText("3", 96, 34);
    var link = document.querySelector("link[rel=icon]") || document.createElement("link");
    link.rel = "icon"; link.href = cv.toDataURL("image/png"); document.head.appendChild(link);
    document.title = "(3) " + document.title.replace(/^\(\d+\) /, "");
  };
}});

TOOLS.push({ id:"urdu-subtitles", cat:"text", icon:"📼", name:"Free Urdu Auto Subtitle Generator Online",
desc:"AI video subtitles", how:"Upload any video — AI listens and writes Urdu subtitles with timings, right in your browser. Edit them, then download as SRT.",
render:function(box){
  box.innerHTML = '<h2>💬 Urdu Auto Subtitle Generator</h2><p class="tool-note">AI <b>listens to</b> your video and creates Urdu subtitles (with timings) — all in your browser, no uploads. The AI model downloads on first use (~150MB).</p><label>Upload video</label><input type="file" id="t-f" accept="video/*,audio/*"><div class="row"><div><label>Language</label><select id="t-lang"><option value="urdu">Urdu</option><option value="english">English</option><option value="turkish">Turkish</option><option value="arabic">Arabic</option><option value="hindi">Hindi</option></select></div><div><label>Model (speed vs quality)</label><select id="t-model"><option value="Xenova/whisper-base">Fast (~75MB)</option><option value="Xenova/whisper-small" selected>Better quality (~250MB)</option></select></div></div><button class="tool-btn" id="t-go">🤖 Generate Subtitles</button> <button class="tool-btn ghost" id="t-manual" type="button">✍️ Manual editor</button><div id="t-status" class="tool-out"></div><div id="t-video-wrap" style="margin:10px 0"></div><div id="t-subs"></div><div style="margin-top:10px"><button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download SRT</button> <button class="tool-btn ghost" id="t-add" style="display:none">+ Add line</button></div><div id="t-manual-ui" style="display:none;margin-top:10px"></div>';
  var file=null, videoUrl=null, cues=[];
  function setStatus(t){ el("t-status").innerHTML=t; }
  function fmtT(s){ s=Math.max(0,s); var h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=Math.floor(s%60),ms=Math.floor((s%1)*1000); function p(n,l){ n=String(n); while(n.length<(l||2)) n="0"+n; return n; } return p(h)+":"+p(m)+":"+p(sec)+","+p(ms,3); }
  function parseT(t){ var m=t.match(/(\d+):(\d+):(\d+)[,.](\d+)/); if(!m) return 0; return (+m[1])*3600+(+m[2])*60+(+m[3])+(+m[4])/1000; }
  el("t-f").onchange=function(e){
    file=e.target.files[0]; if(!file) return;
    if(videoUrl) URL.revokeObjectURL(videoUrl);
    videoUrl=URL.createObjectURL(file);
    var isA=file.type.indexOf("audio")===0;
    el("t-video-wrap").innerHTML = isA ? '<audio src="'+videoUrl+'" controls style="width:100%"></audio>' : '<video src="'+videoUrl+'" controls style="max-width:100%;max-height:280px;border-radius:10px"></video>';
    cues=[]; renderCues(); setStatus("");
  };
  function renderCues(){
    var html="";
    for(var i=0;i<cues.length;i++){
      html+='<div style="display:flex;gap:6px;margin-bottom:6px;align-items:center"><span style="color:var(--muted);min-width:24px">'+(i+1)+'</span><input data-i="'+i+'" data-k="s" value="'+fmtT(cues[i].s)+'" style="width:105px;padding:6px;border-radius:6px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text);font-size:.75rem"><span>→</span><input data-i="'+i+'" data-k="e" value="'+fmtT(cues[i].e)+'" style="width:105px;padding:6px;border-radius:6px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text);font-size:.75rem"><input data-i="'+i+'" data-k="t" value="'+esc(cues[i].t)+'" dir="auto" style="flex:1;padding:6px;border-radius:6px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text)"><button class="tool-btn ghost" data-del="'+i+'" style="padding:6px 10px">✕</button></div>';
    }
    el("t-subs").innerHTML=html || '<p class="tool-note">No subtitles yet — press Generate or use the Manual editor.</p>';
    var has=cues.length>0;
    el("t-dl").style.display=has?"":"none"; el("t-add").style.display=has||true?"":"none";
    var inputs=el("t-subs").querySelectorAll("input");
    for(var j=0;j<inputs.length;j++){ inputs[j].onchange=function(){ var i=+this.getAttribute("data-i"),k=this.getAttribute("data-k"); if(k==="t") cues[i].t=this.value; else cues[i][k]=parseT(this.value); }; }
    var dels=el("t-subs").querySelectorAll("[data-del]");
    for(var k=0;k<dels.length;k++){ dels[k].onclick=function(){ cues.splice(+this.getAttribute("data-del"),1); renderCues(); }; }
  }
  el("t-add").onclick=function(){ cues.push({s:cues.length?cues[cues.length-1].e:0, e:(cues.length?cues[cues.length-1].e:0)+3, t:""}); renderCues(); };
  el("t-dl").onclick=function(){
    var srt="";
    for(var i=0;i<cues.length;i++){ srt+=(i+1)+"\n"+fmtT(cues[i].s)+" --> "+fmtT(cues[i].e)+"\n"+cues[i].t+"\n\n"; }
    dl("data:text/plain;charset=utf-8,"+encodeURIComponent(srt),"subtitles.srt");
  };
  /* manual editor */
  el("t-manual").onclick=function(){ var u=el("t-manual-ui"); u.style.display=u.style.display==="none"?"":"none"; if(u.style.display!=="none"&&!u.innerHTML){ u.innerHTML='<p class="tool-note">Write time + text on each line, then press "Add":</p><div style="display:flex;gap:6px;flex-wrap:wrap"><input id="t-ms" placeholder="00:00:00,000" style="width:120px;padding:8px;border-radius:6px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text)"><input id="t-me" placeholder="00:00:03,000" style="width:120px;padding:8px;border-radius:6px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text)"><input id="t-mt" placeholder="اردو متن" dir="auto" style="flex:1;min-width:150px;padding:8px;border-radius:6px;border:1px solid var(--line);background:rgba(0,0,0,.3);color:var(--text)"><button class="tool-btn" id="t-madd" type="button">Add</button></div>'; el("t-madd").onclick=function(){ var s=parseT(el("t-ms").value||"0"),e=parseT(el("t-me").value||"0")+ (parseT(el("t-me").value||"0")<=s?3:0),t=el("t-mt").value; if(!t){setStatus("Write the text.");return;} cues.push({s:s,e:e,t:t}); cues.sort(function(a,b){return a.s-b.s;}); renderCues(); el("t-mt").value=""; }; } };
  /* AI transcription */
  el("t-go").onclick=function(){
    if(!file){ setStatus("<p>Please upload a video first.</p>"); return; }
    var btn=el("t-go"); btn.disabled=true;
    setStatus("⏳ Extracting audio...");
    extractAudio(file, function(audioData){
      setStatus("⏳ Loading AI model (first-time download)..."); 
      loadWhisper(el("t-model").value, function(transcriber){
        setStatus("⏳ AI is listening... (long videos take a while)");
        btn.textContent="🤖 Processing...";
        var lang=el("t-lang").value;
        transcriber(audioData, { language: lang, task: "transcribe", return_timestamps: true, chunk_length_s: 30, stride_length_s: 5 }).then(function(out){
          cues=[];
          var chunks=out.chunks||[];
          for(var i=0;i<chunks.length;i++){ cues.push({ s:chunks[i].timestamp[0]||0, e:chunks[i].timestamp[1]||((chunks[i].timestamp[0]||0)+3), t:chunks[i].text.trim() }); }
          if(!cues.length && out.text){ cues.push({s:0,e:5,t:out.text.trim()}); }
          renderCues();
          setStatus("✅ "+cues.length+" subtitles created! You can edit them, then download the SRT.");
          btn.disabled=false; btn.textContent="🤖 Generate Subtitles";
        }).catch(function(err){
          setStatus("⚠️ Transcription fail: "+esc(String((err&&err.message)||err).slice(0,120)));
          btn.disabled=false; btn.textContent="🤖 Generate Subtitles";
        });
      }, function(){
        setStatus("⚠️ AI model failed to load. Check your internet or use the Manual editor.");
        btn.disabled=false;
      });
    }, function(err){
      setStatus("⚠️ Audio extraction failed: "+esc(String(err).slice(0,100)));
      btn.disabled=false;
    });
  };
  function extractAudio(file, ok, fail){
    try{
      var AC=window.AudioContext||window.webkitAudioContext;
      var ctx=new AC({sampleRate:16000});
      var rd=new FileReader();
      rd.onload=function(){
        ctx.decodeAudioData(rd.result).then(function(buf){
          var ch=buf.getChannelData(0);
          var out;
          if(buf.sampleRate===16000){ out=ch; }
          else { var ratio=buf.sampleRate/16000, len=Math.floor(ch.length/ratio); out=new Float32Array(len); for(var i=0;i<len;i++){ out[i]=ch[Math.floor(i*ratio)]; } }
          ok(out);
        }).catch(fail);
      };
      rd.onerror=fail; rd.readAsArrayBuffer(file);
    }catch(e){ fail(e); }
  };
}});

/* lazy-load transformers.js Whisper once */
var _whisperPromise=null, _whisperModel=null;
function loadWhisper(model, ok, fail){
  if(window._whisperPipe && _whisperModel===model){ ok(window._whisperPipe); return; }
  var key=model;
  if(!_whisperPromise || _whisperModel!==model){
    _whisperModel=model;
    _whisperPromise=new Promise(function(resolve,reject){
      function boot(){
        try{
          var T=window.transformers;
          if(!T||!T.pipeline){ reject(new Error("lib")); return; }
          T.env.allowLocalModels=false;
          T.pipeline("automatic-speech-recognition", model).then(function(p){ window._whisperPipe=p; resolve(p); }).catch(reject);
        }catch(e){ reject(e); }
      }
      if(window.transformers){ boot(); return; }
      var s=document.createElement("script");
      s.src="https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1/dist/transformers.min.js";
      s.onload=function(){ setTimeout(boot,300); };
      s.onerror=function(){ reject(new Error("cdn")); };
      document.head.appendChild(s);
    });
  }
  _whisperPromise.then(ok).catch(fail);
}
TOOLS.push({ id:"password-strength", cat:"dev", icon:"🦾", name:"Free Password Strength Checker Online",
desc:"How strong is your password", how:"Type a password — get instant strength score with tips to make it stronger. Checked locally, never sent anywhere.",
render:function(box){
  box.innerHTML = '<h2>🔐 Password Strength Checker</h2><label>Password</label><input type="password" id="t-in" placeholder="Type your password"><div class="tool-out" id="t-out"></div><p class="tool-note">Checked in your browser only — nothing is uploaded.</p>';
  el("t-in").oninput = function(){
    var p = el("t-in").value, s = 0;
    if(p.length>=8) s++; if(p.length>=12) s++; if(/[A-Z]/.test(p)&&/[a-z]/.test(p)) s++;
    if(/\d/.test(p)) s++; if(/[^A-Za-z0-9]/.test(p)) s++;
    var lbl = ["Very Weak","Weak","Fair","Good","Strong","Excellent"][Math.min(s,5)];
    var col = ["#ef4444","#f97316","#eab308","#84cc16","#22c55e","#10b981"][Math.min(s,5)];
    var tips = [];
    if(p.length<12) tips.push("Use 12+ characters");
    if(!/[^A-Za-z0-9]/.test(p)) tips.push("Add a symbol (!@#)");
    if(!/\d/.test(p)) tips.push("Add a number");
    outHTML(box, '<div style="font-size:1.4rem;font-weight:800;color:'+col+'">'+lbl+'</div><div style="color:#8b90b8;margin-top:6px">'+(tips.length?"💡 "+tips.join(" · "):"✅ Great password!")+"</div>");
  };
}});
TOOLS.push({ id:"prime-checker", cat:"calc", icon:"7️⃣", name:"Free Prime Number Checker Online",
desc:"Is it prime?", how:"Enter any number — instantly check if it is prime, with the next prime shown too.",
render:function(box){
  box.innerHTML = '<h2>🔢 Prime Number Checker</h2><label>Number</label><input type="number" id="t-in" placeholder="e.g. 104729"><button class="tool-btn" id="t-go">Check Prime</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var n = parseInt(el("t-in").value,10);
    if(isNaN(n)||n<2){ outHTML(box,"Enter a number ≥ 2."); return; }
    function isP(x){ if(x<2)return false; for(var i=2;i*i<=x;i++) if(x%i===0) return false; return true; }
    var next=n+1; while(!isP(next)) next++;
    outHTML(box, (isP(n)?"✅ <b>"+n+"</b> IS prime!":"❌ <b>"+n+"</b> is not prime.")+"<br><span style='color:#8b90b8'>Next prime: <b>"+next+"</b></span>");
  };
}});
TOOLS.push({ id:"fibonacci", cat:"calc", icon:"🌀", name:"Free Fibonacci Sequence Generator Online",
desc:"Generate Fibonacci numbers", how:"Enter how many terms — get the Fibonacci sequence instantly.",
render:function(box){
  box.innerHTML = '<h2>🌀 Fibonacci Generator</h2><label>How many terms</label><input type="number" id="t-in" value="15" min="1" max="100"><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var c = Math.min(100, Math.max(1, parseInt(el("t-in").value,10)||15));
    var f=[0,1]; for(var i=2;i<c;i++) f.push(f[i-1]+f[i-2]);
    outHTML(box, esc(f.slice(0,c).join(", ")));
  };
}});
TOOLS.push({ id:"palindrome", cat:"fun", icon:"🔂", name:"Free Palindrome Checker Online",
desc:"Reads the same backwards?", how:"Type any word or phrase — check if it is a palindrome.",
render:function(box){
  box.innerHTML = '<h2>🔄 Palindrome Checker</h2><label>Word or phrase</label><input type="text" id="t-in" placeholder="e.g. racecar"><button class="tool-btn" id="t-go">Check</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var t = el("t-in").value.toLowerCase().replace(/[^a-z0-9]/g,"");
    if(!t){ outHTML(box,"Type something first."); return; }
    var rev = t.split("").reverse().join("");
    outHTML(box, t===rev?"✅ <b>Palindrome!</b> 🎉":"❌ Not a palindrome.");
  };
}});
TOOLS.push({ id:"dice-roller", cat:"fun", icon:"🎲", name:"Free Dice Roller Online",
desc:"Roll virtual dice", how:"Pick dice count and sides — roll instantly for games.",
render:function(box){
  box.innerHTML = '<h2>🎲 Dice Roller</h2><div class="row"><div><label>Dice</label><input type="number" id="t-n" value="2" min="1" max="10"></div><div><label>Sides</label><input type="number" id="t-s" value="6" min="2" max="100"></div></div><button class="tool-btn" id="t-go">🎲 Roll</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var n=Math.min(10,Math.max(1,parseInt(el("t-n").value,10)||2)), s=Math.min(100,Math.max(2,parseInt(el("t-s").value,10)||6));
    var r=[],tot=0; for(var i=0;i<n;i++){ var v=1+Math.floor(Math.random()*s); r.push(v); tot+=v; }
    outHTML(box, '<div style="font-size:2rem">'+r.map(function(x){return "🎲";}).join(" ")+"</div><div style='font-size:1.3rem;font-weight:800'>"+r.join(" + ")+" = "+tot+"</div>");
  };
}});
TOOLS.push({ id:"tip-calc", cat:"finance", icon:"💵", name:"Free Tip Calculator + Bill Total Online",
desc:"Split bills & tips", how:"Enter bill, tip % and people — see each share instantly.",
render:function(box){
  box.innerHTML = '<h2>💵 Tip Calculator</h2><label>Bill amount</label><input type="number" id="t-b" placeholder="100"><div class="row"><div><label>Tip %</label><input type="number" id="t-t" value="15"></div><div><label>People</label><input type="number" id="t-p" value="1" min="1"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var b=parseFloat(el("t-b").value)||0, t=parseFloat(el("t-t").value)||0, p=Math.max(1,parseInt(el("t-p").value,10)||1);
    var tip=b*t/100, tot=b+tip;
    outHTML(box, "Tip: <b>$"+tip.toFixed(2)+"</b><br>Total: <b>$"+tot.toFixed(2)+"</b><br><span style='color:#8b90b8'>Each pays: <b>$"+(tot/p).toFixed(2)+"</b></span>");
  };
}});
TOOLS.push({ id:"name-gen", cat:"smart", icon:"🏢", name:"Free AI Business Name Generator Online",
desc:"Brandable startup names", how:"Type a keyword, pick a style, press Generate — get brandable business names with copy buttons and a .com availability check.",
render:function(box){
  box.innerHTML = '<h2>🏷️ Business Name Generator</h2><label>Keyword (e.g. coffee, tech, fitness)</label><input type="text" id="t-kw" placeholder="coffee"><div class="row"><div><label>Style</label><select id="t-st"><option value="modern">Modern</option><option value="classic">Classic</option><option value="playful">Playful</option><option value="premium">Premium</option></select></div><div><label>How many</label><select id="t-n"><option>8</option><option selected>12</option><option>16</option></select></div></div><button class="tool-btn" id="t-go">✨ Generate Names</button><div class="tool-out" id="t-out"></div>';
  var PRE={modern:["Nova","Zen","Swift","Bright","Luma","Vivid","Nexa","Flux"],classic:["Prime","Sterling","Heritage","Crown","Summit","Anchor","Beacon","Oak"],playful:["Zippy","Bubbles","Wobble","Sunny","Pip","Doodle","Fizz","Mochi"],premium:["Luxe","Opal","Velvet","Aurum","Sovereign","Elan","Marble","Onyx"]};
  var SUF={modern:["ly","hub","labs","stack","base","loop","os","hq"],classic:["& Co.","Works","Group","Supply","Brothers","Trading","Industries","& Sons"],playful:["pop","zoo","bug","berry","puff","tastic","ville","rama"],premium:["Maison","Atelier","Collective","Reserve","& Grey","House","Edition","Club"]};
  function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}
  function pick(a){return a[Math.floor(Math.random()*a.length)];}
  el("t-go").onclick=function(){
    var kw=(el("t-kw").value||"").trim().toLowerCase().replace(/[^a-z ]/g,"").split(/\s+/)[0]||"nova";
    var st=el("t-st").value, n=parseInt(el("t-n").value,10)||12, seen={}, tries=0, names=[];
    while(names.length<n&&tries<300){ tries++;
      var pre=pick(PRE[st]), suf=pick(SUF[st]), nm, r=Math.random();
      if(r<0.30) nm=cap(kw)+" "+suf;
      else if(r<0.55) nm=cap(pre+kw);
      else if(r<0.80) nm=cap(kw)+suf;
      else nm=cap(kw)+" "+pre;
      if(!seen[nm]){ seen[nm]=1; names.push(nm); }
    }
    outHTML(box, names.map(function(nm){
      var dom=nm.toLowerCase().replace(/[^a-z]/g,"")+".com";
      return '<div style="display:flex;align-items:center;gap:10px;padding:9px 4px;border-bottom:1px solid var(--line)"><b style="flex:1;font-size:.95rem">'+nm+'</b><button class="tool-btn ghost" style="margin:0;padding:6px 12px" data-cp="'+nm+'">📋</button><a class="tool-btn ghost" style="margin:0;padding:6px 12px;text-decoration:none" target="_blank" rel="noopener" href="https://www.namecheap.com/domains/registration/results/?domain='+encodeURIComponent(dom)+'">🌐 .com</a></div>';
    }).join("")+'<p class="tool-note">Tap 📋 to copy a name. The 🌐 .com button checks domain availability (opens Namecheap).</p>');
    box.querySelectorAll("[data-cp]").forEach(function(b){
      b.onclick=function(){ var t=b.getAttribute("data-cp"); if(navigator.clipboard){navigator.clipboard.writeText(t);} b.textContent="✅"; setTimeout(function(){b.textContent="📋";},1200); };
    });
  };
}});
TOOLS.push({ id:"text-reverser", cat:"text", icon:"↔️", name:"Free Text Reverser Online",
desc:"Flip your text", how:"Paste text — reverse it instantly (whole text, words, or lines).",
render:function(box){
  box.innerHTML = '<h2>↔️ Text Reverser</h2><label>Your text</label><textarea id="t-in" placeholder="Hello world" style="min-height:80px"></textarea><label>Mode</label><select id="t-m"><option value="c">Reverse characters</option><option value="w">Reverse words</option><option value="l">Reverse lines</option></select><button class="tool-btn" id="t-go">Reverse</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var t=el("t-in").value, m=el("t-m").value, r="";
    if(m==="c") r=t.split("").reverse().join("");
    else if(m==="w") r=t.split(/\s+/).reverse().join(" ");
    else r=t.split("\n").reverse().join("\n");
    outHTML(box, "<pre style='white-space:pre-wrap'>"+esc(r)+"</pre>");
  };
}});

/* Date Format Converter — one date shown in every common world format. */
TOOLS.push({ id:"date-format", cat:"dev", icon:"📅", name:"Free Date Format Converter Online",
desc:"One date, every format", how:"Pick a date (or paste any date text like 11 Oct 2026) and press Convert — get ISO, US, UK/EU, long, weekday, RFC 2822 and Unix timestamp formats instantly.",
render:function(box){
  box.innerHTML = '<h2>📅 Date Format Converter</h2><label>Date &amp; time</label><input type="datetime-local" id="t-dt"><label style="margin-top:10px">Or paste any date text (e.g. 11 Oct 2026, Oct 11 2026, 2026-10-11)</label><input type="text" id="t-txt" placeholder="paste a date…"><button class="tool-btn" id="t-go">Convert Date</button> <button class="tool-btn ghost" id="t-now">Use Now</button><div class="tool-out" id="t-out"></div>';
  function pad(n){ return (n<10?"0":"")+n; }
  var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  function row(label, val){
    return '<div style="display:flex;align-items:center;gap:10px;padding:9px 4px;border-bottom:1px solid var(--line)"><span style="flex:0 0 128px;font-size:.82rem;color:#9aa0c7">'+label+'</span><b style="flex:1;font-size:.95rem;word-break:break-all">'+esc(val)+'</b><button class="tool-btn ghost" style="margin:0;padding:6px 12px" data-cp="'+esc(val)+'">📋</button></div>';
  }
  function convert(){
    var txt=(el("t-txt").value||"").trim(), d;
    if(txt){ d=new Date(txt); }
    else { var v=el("t-dt").value; if(!v){ outHTML(box,"Please pick a date or paste a date text."); return; } d=new Date(v); }
    if(isNaN(d.getTime())){ outHTML(box,"Could not parse that date. Try e.g. <b>11 Oct 2026</b> or <b>2026-10-11</b>."); return; }
    var y=d.getFullYear(), mo=d.getMonth(), da=d.getDate(), h=d.getHours(), mi=d.getMinutes();
    var ampm=h>=12?"PM":"AM", h12=h%12||12;
    var rows=[
      ["ISO 8601", y+"-"+pad(mo+1)+"-"+pad(da)],
      ["ISO + time", y+"-"+pad(mo+1)+"-"+pad(da)+"T"+pad(h)+":"+pad(mi)+":00"],
      ["US (MM/DD/YYYY)", pad(mo+1)+"/"+pad(da)+"/"+y],
      ["UK / EU (DD/MM/YYYY)", pad(da)+"/"+pad(mo+1)+"/"+y],
      ["Long", da+" "+MONTHS[mo]+" "+y],
      ["With weekday", DAYS[d.getDay()]+", "+da+" "+MONTHS[mo]+" "+y],
      ["Short (US)", MONTHS[mo].slice(0,3)+" "+da+", "+y],
      ["Short (EU)", da+" "+MONTHS[mo].slice(0,3)+" "+y],
      ["With time", da+" "+MONTHS[mo]+" "+y+", "+h12+":"+pad(mi)+" "+ampm],
      ["UTC (RFC 2822)", d.toUTCString()],
      ["Unix timestamp", String(Math.floor(d.getTime()/1000))]
    ];
    outHTML(box, rows.map(function(r){ return row(r[0], r[1]); }).join("")+'<p class="tool-note">Times use your device timezone. Tap 📋 to copy any format.</p>');
    box.querySelectorAll("[data-cp]").forEach(function(b){
      b.onclick=function(){ var t=b.getAttribute("data-cp"); copyText(t,b); };
    });
  }
  el("t-go").onclick=convert;
  el("t-now").onclick=function(){ var n=new Date(); el("t-dt").value=n.getFullYear()+"-"+pad(n.getMonth()+1)+"-"+pad(n.getDate())+"T"+pad(n.getHours())+":"+pad(n.getMinutes()); el("t-txt").value=""; convert(); };
}});
TOOLS.push({ id:"random-number", cat:"fun", icon:"🎰", name:"Free Random Number Generator Online",
desc:"Pick a random number", how:"Set min and max — get a random number instantly.",
render:function(box){
  box.innerHTML = '<h2>🎰 Random Number Generator</h2><div class="row"><div><label>Min</label><input type="number" id="t-a" value="1"></div><div><label>Max</label><input type="number" id="t-b" value="100"></div></div><button class="tool-btn" id="t-go">Generate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick = function(){
    var a=parseInt(el("t-a").value,10)||1, b=parseInt(el("t-b").value,10)||100;
    if(a>b){ var x=a;a=b;b=x; }
    var v=a+Math.floor(Math.random()*(b-a+1));
    outHTML(box, '<div style="font-size:2.5rem;font-weight:800;color:#a78bfa">'+v+"</div>");
  };
}});

TOOLS.push({ id:"speak-time", cat:"text", icon:"⏲️", name:"Free Speaking Time Calculator Online",
desc:"Find out how long your script takes to speak", how:"Paste your script, choose Slow (110 WPM), Average (150 WPM) or Fast (180 WPM), press Calculate. See minutes:seconds plus a per-paragraph breakdown.",
render:function(box){
  box.innerHTML = '<h2>🗣️ Speaking Time Calculator</h2><label>Your script</label><textarea id="t-in" rows="8" placeholder="Paste your script here..."></textarea><div class="row"><div><label>Speaking speed</label><select id="t-wpm"><option value="110">Slow — 110 WPM</option><option value="150" selected>Average — 150 WPM</option><option value="180">Fast — 180 WPM</option></select></div><div><label>&nbsp;</label><label style="display:flex;align-items:center;gap:8px;font-weight:400"><input type="checkbox" id="t-pause" checked style="width:auto"> Include pause estimate</label></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out" style="display:block"></div>';
  function fmt(sec){ sec=Math.max(0,Math.round(sec)); var m=Math.floor(sec/60), s=sec%60; return m+":"+(s<10?"0":"")+s; }
  el("t-go").onclick=function(){
    var t=el("t-in").value;
    var words=(t.trim().match(/\S+/g)||[]).length;
    var sentences=(t.match(/[.!?]+/g)||[]).length;
    var pause=el("t-pause").checked ? sentences*0.4 : 0;
    var paras=t.split(/\n\s*\n/).filter(function(p){return p.trim().length>0;});
    var speeds=[["Slow (110 WPM)",110],["Average (150 WPM)",150],["Fast (180 WPM)",180]];
    var rows=speeds.map(function(sp){
      var sec=words/sp[1]*60+pause;
      return '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.08)"><span>'+sp[0]+'</span><b style="color:#a78bfa;font-size:1.2rem">'+fmt(sec)+'</b></div>';
    }).join("");
    var plist="";
    if(paras.length>1){
      plist='<h3 style="margin:14px 0 6px">Per-paragraph (avg speed)</h3>';
      paras.forEach(function(p,i){
        var w=(p.trim().match(/\S+/g)||[]).length;
        var s=(p.match(/[.!?]+/g)||[]).length;
        var sec=w/150*60+(el("t-pause").checked?s*0.4:0);
        plist+='<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:.9rem"><span>Paragraph '+(i+1)+' ('+w+' words)</span><b>'+fmt(sec)+'</b></div>';
      });
    }
    var summary="Speaking time: "+words+" words = "+speeds.map(function(sp){return fmt(words/sp[1]*60+pause)+" @ "+sp[0];}).join(", ");
    outHTML(box,'<div style="font-size:.9rem;color:#8b90b8">Words: <b style="color:#fff">'+words+'</b> · Sentences: <b style="color:#fff">'+sentences+'</b></div>'+rows+plist+'<button class="tool-btn" id="t-copy" style="margin-top:12px">📋 Copy summary</button>');
    el("t-copy").onclick=function(){ copyText(summary, el("t-copy")); };
  };
}});

TOOLS.push({ id:"unit-price", cat:"smart", icon:"🛒", name:"Free Unit Price Calculator — Compare Grocery Deals",
desc:"Compare products by price per unit and find the cheapest deal", how:"Add up to 3 products: enter price and quantity (with unit: oz, lb, kg, g, L, ml, count), press Compare. The cheapest per-unit deal is highlighted.",
render:function(box){
  var units='<option value="oz">oz</option><option value="lb">lb</option><option value="g">g</option><option value="kg">kg</option><option value="floz">fl oz</option><option value="ml">ml</option><option value="L">L</option><option value="ct">count</option>';
  function prow(i){ return '<div class="row" style="margin-bottom:10px"><div><label>Product '+(i+1)+' name</label><input id="t-n'+i+'" placeholder="e.g. Cereal"></div><div><label>Price ($)</label><input type="number" id="t-p'+i+'" min="0" step="0.01" placeholder="4.99"></div><div><label>Qty</label><input type="number" id="t-q'+i+'" min="0" step="any" placeholder="12"></div><div><label>Unit</label><select id="t-u'+i+'">'+units+'</select></div></div>'; }
  box.innerHTML='<h2>🛒 Unit Price Comparator</h2><p style="font-size:.9rem;color:#8b90b8">Compare up to 3 products. Units must be in the same family (weight with weight, volume with volume, count with count).</p>'+prow(0)+prow(1)+prow(2)+'<button class="tool-btn" id="t-go">Compare Deals</button><div class="tool-out" id="t-out" style="display:block"></div>';
  var toOz={oz:1,lb:16,g:0.035274,kg:35.274};
  var toMl={ml:1,L:1000,floz:29.5735};
  function fam(u){ if(toOz[u])return "w"; if(toMl[u])return "v"; return "c"; }
  function base(u,q){ if(toOz[u])return [q*toOz[u],"oz"]; if(toMl[u])return [q*toMl[u],"ml"]; return [q,"ct"]; }
  el("t-go").onclick=function(){
    var items=[];
    for(var i=0;i<3;i++){
      var n=el("t-n"+i).value.trim()||("Product "+(i+1));
      var p=parseFloat(el("t-p"+i).value), q=parseFloat(el("t-q"+i).value), u=el("t-u"+i).value;
      if(p>0&&q>0) items.push({n:n,p:p,q:q,u:u,f:fam(u)});
    }
    if(items.length<2){ outHTML(box,'<p style="color:#f0a0a0">Enter at least 2 products with price and quantity.</p>'); return; }
    var f0=items[0].f;
    for(var j=1;j<items.length;j++){ if(items[j].f!==f0){ outHTML(box,'<p style="color:#f0a0a0">⚠️ Mixed unit families — compare weight with weight, volume with volume, or count with count.</p>'); return; } }
    items.forEach(function(it){ var b=base(it.u,it.q); it.bq=b[0]; it.bu=b[1]; it.ppu=it.p/it.bq; });
    items.sort(function(a,b){return a.ppu-b.ppu;});
    var best=items[0], worst=items[items.length-1];
    var html='<h3 style="margin:6px 0 10px">Results (per '+best.bu+')</h3>';
    items.forEach(function(it,idx){
      var badge=idx===0?' <span style="background:#f5c518;color:#111;border-radius:8px;padding:2px 8px;font-size:.8rem">🏆 Best deal</span>':'';
      var save=idx>0?'<div style="font-size:.8rem;color:#8b90b8">Save $'+(it.ppu-best.ppu).toFixed(4)+'/'+best.bu+' vs this</div>':'';
      html+='<div style="padding:10px;border:1px solid '+(idx===0?'#f5c518':'rgba(255,255,255,.1)')+';border-radius:12px;margin-bottom:8px"><div style="display:flex;justify-content:space-between"><b>'+esc(it.n)+'</b><b style="color:'+(idx===0?'#f5c518':'#a78bfa')+'">$'+it.ppu.toFixed(4)+'/'+it.bu+'</b></div><div style="font-size:.85rem;color:#8b90b8">$'+it.p.toFixed(2)+' for '+it.q+' '+it.u+'</div>'+badge+save+'</div>';
    });
    if(worst.ppu>best.ppu) html+='<p style="font-size:.9rem">💡 "'+esc(best.n)+'" saves you $'+(worst.ppu-best.ppu).toFixed(4)+' per '+best.bu+' vs the priciest option.</p>';
    outHTML(box,html);
  };
}});

TOOLS.push({ id:"color-name", cat:"dev", icon:"📛", name:"Free Color Name Finder — Hex to Color Name",
desc:"Enter any hex code and get its closest color name", how:"Type or pick a hex color, press Find Name. See the closest named color, its exact hex, and 4 nearest shades.",
render:function(box){
  var CN=[["AliceBlue","F0F8FF"],["AntiqueWhite","FAEBD7"],["Aqua","00FFFF"],["Aquamarine","7FFFD4"],["Azure","F0FFFF"],["Beige","F5F5DC"],["Bisque","FFE4C4"],["Black","000000"],["BlanchedAlmond","FFEBCD"],["Blue","0000FF"],["BlueViolet","8A2BE2"],["Brown","A52A2A"],["BurlyWood","DEB887"],["CadetBlue","5F9EA0"],["Chartreuse","7FFF00"],["Chocolate","D2691E"],["Coral","FF7F50"],["CornflowerBlue","6495ED"],["Cornsilk","FFF8DC"],["Crimson","DC143C"],["Cyan","00FFFF"],["DarkBlue","00008B"],["DarkCyan","008B8B"],["DarkGoldenRod","B8860B"],["DarkGray","A9A9A9"],["DarkGreen","006400"],["DarkKhaki","BDB76B"],["DarkMagenta","8B008B"],["DarkOliveGreen","556B2F"],["DarkOrange","FF8C00"],["DarkOrchid","9932CC"],["DarkRed","8B0000"],["DarkSalmon","E9967A"],["DarkSeaGreen","8FBC8F"],["DarkSlateBlue","483D8B"],["DarkSlateGray","2F4F4F"],["DarkTurquoise","00CED1"],["DarkViolet","9400D3"],["DeepPink","FF1493"],["DeepSkyBlue","00BFFF"],["DimGray","696969"],["DodgerBlue","1E90FF"],["FireBrick","B22222"],["FloralWhite","FFFAF0"],["ForestGreen","228B22"],["Fuchsia","FF00FF"],["Gainsboro","DCDCDC"],["GhostWhite","F8F8FF"],["Gold","FFD700"],["GoldenRod","DAA520"],["Gray","808080"],["Green","008000"],["GreenYellow","ADFF2F"],["HoneyDew","F0FFF0"],["HotPink","FF69B4"],["IndianRed","CD5C5C"],["Indigo","4B0082"],["Ivory","FFFFF0"],["Khaki","F0E68C"],["Lavender","E6E6FA"],["LavenderBlush","FFF0F5"],["LawnGreen","7CFC00"],["LemonChiffon","FFFACD"],["LightBlue","ADD8E6"],["LightCoral","F08080"],["LightCyan","E0FFFF"],["LightGoldenRodYellow","FAFAD2"],["LightGray","D3D3D3"],["LightGreen","90EE90"],["LightPink","FFB6C1"],["LightSalmon","FFA07A"],["LightSeaGreen","20B2AA"],["LightSkyBlue","87CEFA"],["LightSlateGray","778899"],["LightSteelBlue","B0C4DE"],["LightYellow","FFFFE0"],["Lime","00FF00"],["LimeGreen","32CD32"],["Linen","FAF0E6"],["Magenta","FF00FF"],["Maroon","800000"],["MediumAquaMarine","66CDAA"],["MediumBlue","0000CD"],["MediumOrchid","BA55D3"],["MediumPurple","9370DB"],["MediumSeaGreen","3CB371"],["MediumSlateBlue","7B68EE"],["MediumSpringGreen","00FA9A"],["MediumTurquoise","48D1CC"],["MediumVioletRed","C71585"],["MidnightBlue","191970"],["MintCream","F5FFFA"],["MistyRose","FFE4E1"],["Moccasin","FFE4B5"],["NavajoWhite","FFDEAD"],["Navy","000080"],["OldLace","FDF5E6"],["Olive","808000"],["OliveDrab","6B8E23"],["Orange","FFA500"],["OrangeRed","FF4500"],["Orchid","DA70D6"],["PaleGoldenRod","EEE8AA"],["PaleGreen","98FB98"],["PaleTurquoise","AFEEEE"],["PaleVioletRed","DB7093"],["PapayaWhip","FFEFD5"],["PeachPuff","FFDAB9"],["Peru","CD853F"],["Pink","FFC0CB"],["Plum","DDA0DD"],["PowderBlue","B0E0E6"],["Purple","800080"],["RebeccaPurple","663399"],["Red","FF0000"],["RosyBrown","BC8F8F"],["RoyalBlue","4169E1"],["SaddleBrown","8B4513"],["Salmon","FA8072"],["SandyBrown","F4A460"],["SeaGreen","2E8B57"],["SeaShell","FFF5EE"],["Sienna","A0522D"],["Silver","C0C0C0"],["SkyBlue","87CEEB"],["SlateBlue","6A5ACD"],["SlateGray","708090"],["Snow","FFFAFA"],["SpringGreen","00FF7F"],["SteelBlue","4682B4"],["Tan","D2B48C"],["Teal","008080"],["Thistle","D8BFD8"],["Tomato","FF6347"],["Turquoise","40E0D0"],["Violet","EE82EE"],["Wheat","F5DEB3"],["White","FFFFFF"],["WhiteSmoke","F5F5F5"],["Yellow","FFFF00"],["YellowGreen","9ACD32"]];
  function hexRgb(h){ h=h.replace("#",""); if(h.length===3)h=h.split("").map(function(c){return c+c;}).join(""); return [parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)]; }
  function dist(a,b){ var dr=a[0]-b[0],dg=a[1]-b[1],db=a[2]-b[2]; return Math.sqrt(2*dr*dr+4*dg*dg+3*db*db); }
  box.innerHTML='<h2>🎨 Color Name Finder</h2><div class="row"><div><label>Hex code</label><input id="t-hex" value="#3B7DDD" maxlength="7" placeholder="#RRGGBB"></div><div><label>Pick</label><input type="color" id="t-pick" value="#3b7ddd" style="height:44px;width:100%;padding:2px"></div></div><button class="tool-btn" id="t-go">Find Name</button><div class="tool-out" id="t-out" style="display:block"></div>';
  el("t-hex").addEventListener("input",function(){ var v=el("t-hex").value; if(/^#[0-9a-fA-F]{6}$/.test(v)) el("t-pick").value=v; });
  el("t-pick").addEventListener("input",function(){ el("t-hex").value=el("t-pick").value.toUpperCase(); });
  el("t-go").onclick=function(){
    var h=el("t-hex").value.trim();
    if(!/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(h)){ outHTML(box,'<p style="color:#f0a0a0">Enter a valid hex like #3B7DDD or 3B7DDD.</p>'); return; }
    if(h[0]!=="#")h="#"+h; h=h.toUpperCase();
    var rgb=hexRgb(h);
    var scored=CN.map(function(c){ return {n:c[0],h:"#"+c[1],d:dist(rgb,hexRgb(c[1]))}; });
    scored.sort(function(a,b){return a.d-b.d;});
    var best=scored[0], rest=scored.slice(1,5);
    var shades=rest.map(function(c){
      var cr=hexRgb(c.h);
      return '<div data-cp="'+c.h+'" style="cursor:pointer;text-align:center"><div style="width:100%;height:52px;border-radius:10px;background:'+c.h+';border:1px solid rgba(255,255,255,.2)"></div><div style="font-size:.75rem;margin-top:4px">'+c.n+'</div><div style="font-size:.7rem;color:#8b90b8">'+c.h+'</div></div>';
    }).join("");
    outHTML(box,'<div style="display:flex;gap:14px;align-items:center;margin-bottom:12px"><div style="width:72px;height:72px;border-radius:16px;background:'+h+';border:2px solid rgba(255,255,255,.25)"></div><div><div style="font-size:1.5rem;font-weight:800">'+best.n+'</div><div style="color:#8b90b8">'+h+' · rgb('+rgb.join(", ")+')</div></div></div><h3 style="margin:10px 0 8px">Nearest shades (tap to copy)</h3><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">'+shades+'</div>');
    box.querySelectorAll("[data-cp]").forEach(function(d){ d.onclick=function(){ copyText(d.getAttribute("data-cp"), d); }; });
  };
}});

TOOLS.push({ id:"pdf-merge", cat:"site", icon:"\uD83D\uDD17", name:"Free Merge PDF Online",
desc:"Combine PDFs in your browser", how:"Add 2+ PDF files, reorder with arrows, press Merge — download one combined PDF. Files never leave your device.",
render:function(box){
  var PDFLIB="https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
  box.innerHTML='<h2>\uD83D\uDD17 Merge PDF Files</h2><p style="color:#8b90b8;font-size:.88rem">\uD83D\uDD12 100% private — merging happens in your browser; your files are never uploaded.</p><label>PDF files (add 2 or more)</label><input type="file" id="t-files" accept="application/pdf,.pdf" multiple><div id="t-list" style="margin:10px 0"></div><button class="tool-btn" id="t-go">\uD83D\uDD17 Merge PDFs</button><div class="tool-out" id="t-out"></div>';
  var files=[];
  function esc(s){ return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }
  function draw(){
    var L=el("t-list"); if(!files.length){L.innerHTML="";return;}
    L.innerHTML=files.map(function(f,i){
      return '<div style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin-bottom:6px"><span style="font-weight:800;color:#a5b4fc;min-width:22px">'+(i+1)+'</span><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\uD83D\uDCC4 '+esc(f.name)+'</span><button class="tool-btn" data-mv="-1" data-i="'+i+'" style="padding:6px 10px;margin:0" aria-label="Move up">\u2191</button><button class="tool-btn" data-mv="1" data-i="'+i+'" style="padding:6px 10px;margin:0" aria-label="Move down">\u2193</button><button class="tool-btn" data-rm="'+i+'" style="padding:6px 10px;margin:0" aria-label="Remove">\u2715</button></div>';
    }).join("");
    L.querySelectorAll("[data-mv]").forEach(function(b){ b.onclick=function(){
      var i=+b.getAttribute("data-i"), d=+b.getAttribute("data-mv"), j=i+d;
      if(j<0||j>=files.length)return; var t=files[i]; files[i]=files[j]; files[j]=t; draw();
    };});
    L.querySelectorAll("[data-rm]").forEach(function(b){ b.onclick=function(){ files.splice(+b.getAttribute("data-rm"),1); draw(); };});
  }
  el("t-files").addEventListener("change",function(e){
    for(var i=0;i<e.target.files.length;i++) files.push(e.target.files[i]);
    e.target.value=""; draw();
  });
  function loadLib(cb){
    if(window.PDFLib&&window.PDFLib.PDFDocument) return cb();
    outHTML(box,'<p>Loading PDF engine (one-time, ~100KB)...</p>');
    var s=document.createElement("script"); s.src=PDFLIB;
    s.onload=function(){cb();}; s.onerror=function(){ outHTML(box,'<p style="color:#f0a0a0">Could not load the PDF engine. Check your internet connection and try again.</p>'); };
    document.head.appendChild(s);
  }
  el("t-go").onclick=function(){
    if(files.length<2){ outHTML(box,'<p style="color:#f0a0a0">Add at least 2 PDF files to merge.</p>'); return; }
    loadLib(function(){
      outHTML(box,'<p>Merging '+files.length+' PDFs...</p>');
      var done=0, bufs=[];
      files.forEach(function(f,i){
        var r=new FileReader();
        r.onload=function(){ bufs[i]=r.result; if(++done===files.length) doMerge(bufs); };
        r.onerror=function(){ outHTML(box,'<p style="color:#f0a0a0">Could not read: '+esc(f.name)+'</p>'); };
        r.readAsArrayBuffer(f);
      });
      function doMerge(bufs){
        (async function(){
          try{
            var out=await PDFLib.PDFDocument.create();
            for(var k=0;k<bufs.length;k++){
              var src=await PDFLib.PDFDocument.load(bufs[k],{ignoreEncryption:true});
              var pages=await out.copyPages(src, src.getPageIndices());
              pages.forEach(function(p){ out.addPage(p); });
            }
            var bytes=await out.save();
            var blob=new Blob([bytes],{type:"application/pdf"});
            var a=document.createElement("a");
            a.href=URL.createObjectURL(blob); a.download="merged.pdf";
            a.className="tool-btn"; a.style.cssText="display:inline-block;text-decoration:none;margin-top:8px";
            outHTML(box,'<p style="color:#7ee2a8;font-weight:700">\u2705 Merged '+bufs.length+' PDFs into one file.</p>');
            box.querySelector(".tool-out").appendChild(a); a.textContent="\u2B07 Download merged.pdf";
          }catch(err){ outHTML(box,'<p style="color:#f0a0a0">Merge failed: '+esc(err.message||err)+'. Make sure all files are valid PDFs.</p>'); }
        })();
      }
    });
  };
}});

TOOLS.push({ id:"jpg-to-pdf", cat:"site", icon:"\uD83D\uDDBC\uFE0F", name:"Free JPG to PDF Converter Online",
desc:"Turn JPG/PNG images into one PDF", how:"Add images, reorder with arrows, pick page size — download one PDF. Files never leave your device.",
render:function(box){
  var JSPDF="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  box.innerHTML='<h2>\uD83D\uDDBC\uFE0F JPG to PDF Converter</h2><p style="color:#8b90b8;font-size:.88rem">\uD83D\uDD12 100% private — conversion happens in your browser; your images are never uploaded.</p><label>Images (JPG/PNG, add as many as you like)</label><input type="file" id="t-files" accept="image/jpeg,image/jpg,image/png" multiple><div id="t-drop" style="border:2px dashed rgba(165,180,252,.4);border-radius:12px;padding:18px;text-align:center;color:#8b90b8;margin:10px 0;font-size:.9rem">\uD83D\uDCC2 or drag &amp; drop images here</div><div id="t-list" style="margin:10px 0"></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin:10px 0"><div><label>Page size</label><select id="t-psize" class="tool-in"><option value="fit">Fit image</option><option value="a4">A4</option><option value="letter">Letter</option><option value="orig">Original size</option></select></div><div><label>Orientation</label><select id="t-ori" class="tool-in"><option value="auto">Auto</option><option value="p">Portrait</option><option value="l">Landscape</option></select></div></div><button class="tool-btn" id="t-go">\uD83D\uDCC4 Convert to PDF</button><div class="tool-out" id="t-out"></div>';
  var files=[];
  function esc(s){ return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }
  function draw(){
    var L=el("t-list"); if(!files.length){L.innerHTML="";return;}
    L.innerHTML='<p style="color:#8b90b8;font-size:.85rem">'+files.length+' image'+(files.length>1?'s':'')+' added</p>'+files.map(function(f,i){
      return '<div style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:10px;padding:8px 10px;margin-bottom:6px"><span style="font-weight:800;color:#a5b4fc;min-width:22px">'+(i+1)+'</span><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\uD83D\uDDBC\uFE0F '+esc(f.name)+'</span><button class="tool-btn" data-mv="-1" data-i="'+i+'" style="padding:6px 10px;margin:0" aria-label="Move up">\u2191</button><button class="tool-btn" data-mv="1" data-i="'+i+'" style="padding:6px 10px;margin:0" aria-label="Move down">\u2193</button><button class="tool-btn" data-rm="'+i+'" style="padding:6px 10px;margin:0" aria-label="Remove">\u2715</button></div>';
    }).join("");
    L.querySelectorAll("[data-mv]").forEach(function(b){ b.onclick=function(){
      var i=+b.getAttribute("data-i"), d=+b.getAttribute("data-mv"), j=i+d;
      if(j<0||j>=files.length)return; var t=files[i]; files[i]=files[j]; files[j]=t; draw();
    };});
    L.querySelectorAll("[data-rm]").forEach(function(b){ b.onclick=function(){ files.splice(+b.getAttribute("data-rm"),1); draw(); };});
  }
  function addFiles(list){
    for(var i=0;i<list.length;i++){ if(/^image\/(jpeg|png)$/.test(list[i].type)) files.push(list[i]); }
    draw();
  }
  el("t-files").addEventListener("change",function(e){ addFiles(e.target.files); e.target.value=""; });
  var dz=el("t-drop");
  ["dragover","dragenter"].forEach(function(ev){ dz.addEventListener(ev,function(e){ e.preventDefault(); dz.style.borderColor="#a5b4fc"; }); });
  ["dragleave","drop"].forEach(function(ev){ dz.addEventListener(ev,function(e){ e.preventDefault(); dz.style.borderColor=""; }); });
  dz.addEventListener("drop",function(e){ if(e.dataTransfer&&e.dataTransfer.files) addFiles(e.dataTransfer.files); });
  function loadLib(cb){
    if(window.jspdf&&window.jspdf.jsPDF) return cb();
    outHTML(box,'<p>Loading PDF engine (one-time, ~350KB)...</p>');
    var s=document.createElement("script"); s.src=JSPDF;
    s.onload=function(){cb();}; s.onerror=function(){ outHTML(box,'<p style="color:#f0a0a0">Could not load the PDF engine. Check your internet connection and try again.</p>'); };
    document.head.appendChild(s);
  }
  el("t-go").onclick=function(){
    if(!files.length){ outHTML(box,'<p style="color:#f0a0a0">Add at least 1 image to convert.</p>'); return; }
    loadLib(function(){
      outHTML(box,'<p>Converting '+files.length+' image'+(files.length>1?'s':'')+' to PDF...</p>');
      var imgs=[], done=0, failed=0;
      files.forEach(function(f,i){
        var r=new FileReader();
        r.onload=function(){
          var im=new Image();
          im.onload=function(){ imgs[i]={url:r.result,w:im.naturalWidth,h:im.naturalHeight,name:f.name}; if(++done+failed===files.length) doConvert(); };
          im.onerror=function(){ failed++; if(++done+failed===files.length) doConvert(); };
          im.src=r.result;
        };
        r.onerror=function(){ failed++; if(++done+failed===files.length) doConvert(); };
        r.readAsDataURL(f);
      });
      function doConvert(){
        imgs=imgs.filter(Boolean);
        if(!imgs.length){ outHTML(box,'<p style="color:#f0a0a0">Could not read any of the images. Try JPG or PNG files.</p>'); return; }
        try{
          var ps=el("t-psize").value, ori=el("t-ori").value;
          var first=imgs[0];
          var pw, ph, orient;
          function pageSizeFor(w,h){
            var o=ori, land;
            if(ps==="a4"){ pw=595.28; ph=841.89; }
            else if(ps==="letter"){ pw=612; ph=792; }
            else { pw=w*0.75; ph=h*0.75; }
            if(o==="auto") land=w>h; else land=(o==="l");
            if(ps==="fit"||ps==="orig"){ orient=land?"landscape":"portrait"; }
            else { orient=land?"landscape":"portrait"; if(land){ var t=pw; pw=ph; ph=t; } }
            return [pw,ph,orient];
          }
          var sz=pageSizeFor(first.w,first.h);
          var doc=new window.jspdf.jsPDF({unit:"pt",format:[sz[0],sz[1]],orientation:sz[2],compress:true});
          imgs.forEach(function(im,k){
            var s2=pageSizeFor(im.w,im.h), W=s2[0], H=s2[1], O=s2[2];
            if(k>0) doc.addPage([W,H],O);
            var iw, ih, x, y;
            if(ps==="fit"||ps==="orig"){ iw=W; ih=H; x=0; y=0; }
            else {
              var m=36, aw=W-2*m, ah=H-2*m, r=Math.min(aw/im.w,ah/im.h);
              iw=im.w*r; ih=im.h*r; x=(W-iw)/2; y=(H-ih)/2;
            }
            var fmt=im.url.indexOf("data:image/png")===0?"PNG":"JPEG";
            doc.addImage(im.url,fmt,x,y,iw,ih);
          });
          doc.save("jpg-to-pdf.pdf");
          outHTML(box,'<p style="color:#7ee2a8;font-weight:700">\u2705 Converted '+imgs.length+' image'+(imgs.length>1?'s':'')+' into <b>jpg-to-pdf.pdf</b> — download started.</p>');
        }catch(err){ outHTML(box,'<p style="color:#f0a0a0">Conversion failed: '+esc(err.message||err)+'</p>'); }
      }
    });
  };
}});


// === think-123: 4 new health tools (TDEE/protein/caffeine/WHR) ===

TOOLS.push({ id:"tdee", cat:"health", icon:"🔥", name:"Free TDEE Calculator Online",
desc:"Total daily energy expenditure + BMR", how:"Enter weight, height, age, sex and activity level — get your BMR and TDEE with cut, maintain and bulk calorie targets.",
render:function(box){
  box.innerHTML = '<h2>🔥 TDEE Calculator</h2><div class="row"><div><label>Weight (kg)</label><input type="number" id="t-w" placeholder="70"></div><div><label>Height (cm)</label><input type="number" id="t-h" placeholder="175"></div></div><div class="row"><div><label>Age</label><input type="number" id="t-a" placeholder="30"></div><div><label>Sex</label><select id="t-s"><option value="m">Male</option><option value="f">Female</option></select></div></div><div><label>Activity level</label><select id="t-act"><option value="1.2">Sedentary (little exercise)</option><option value="1.375">Light (1-3 days/wk)</option><option value="1.55" selected>Moderate (3-5 days/wk)</option><option value="1.725">Active (6-7 days/wk)</option><option value="1.9">Extra active (physical job)</option></select></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">Estimate only — not medical advice.</p>';
  el("t-go").onclick=function(){
    var w=+el("t-w").value,h=+el("t-h").value,a=+el("t-a").value,s=el("t-s").value,act=+el("t-act").value;
    if(!w||!h||!a){outHTML(box,"Enter weight, height and age.");return;}
    var bmr=s==="m"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;
    var tdee=bmr*act;
    outHTML(box,"BMR: "+Math.round(bmr)+" cal/day\nTDEE: "+Math.round(tdee)+" cal/day\n\nCut (lose): "+Math.round(tdee-400)+"\nMaintain: "+Math.round(tdee)+"\nBulk (gain): "+Math.round(tdee+300));
  };
}});

TOOLS.push({ id:"protein", cat:"health", icon:"🥩", name:"Free Protein Intake Calculator Online",
desc:"Daily protein target by weight & goal", how:"Enter your body weight and goal (cut, maintain or bulk) — get your daily protein target in grams with a per-meal split.",
render:function(box){
  box.innerHTML = '<h2>🥩 Protein Intake Calculator</h2><div class="row"><div><label>Weight (kg)</label><input type="number" id="t-w" placeholder="70"></div><div><label>Goal</label><select id="t-g"><option value="1.8">Maintain</option><option value="2.2">Cut (keep muscle)</option><option value="1.6">Bulk (build muscle)</option></select></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">General guide only — not medical advice.</p>';
  el("t-go").onclick=function(){
    var w=+el("t-w").value,g=+el("t-g").value;
    if(!w){outHTML(box,"Enter your weight.");return;}
    var p=w*g;
    outHTML(box,"Daily protein: "+Math.round(p)+" g\n\nPer meal (4 meals): "+Math.round(p/4)+" g each");
  };
}});

TOOLS.push({ id:"caffeine", cat:"health", icon:"☕", name:"Free Caffeine Intake Calculator Online",
desc:"Daily caffeine from your drinks", how:"Enter your daily coffee, tea and energy drinks — see your total caffeine in mg against the 400 mg guideline.",
render:function(box){
  box.innerHTML = '<h2>☕ Caffeine Intake Calculator</h2><div class="row"><div><label>Coffee cups</label><input type="number" id="t-c" placeholder="2"></div><div><label>Tea cups</label><input type="number" id="t-t" placeholder="1"></div></div><div class="row"><div><label>Energy drinks</label><input type="number" id="t-e" placeholder="0"></div><div><label>Sodas</label><input type="number" id="t-s" placeholder="0"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">Estimates use typical values — actual varies by brand.</p>';
  el("t-go").onclick=function(){
    var c=+el("t-c").value||0,t=+el("t-t").value||0,e=+el("t-e").value||0,s=+el("t-s").value||0;
    var mg=c*95+t*47+e*150+s*40;
    var v=mg<=400?"✅ Within the 400 mg guideline":"⚠️ Above the 400 mg guideline — consider cutting back";
    outHTML(box,"Estimated caffeine: "+Math.round(mg)+" mg/day\n"+v);
  };
}});

TOOLS.push({ id:"wthr", cat:"health", icon:"📏", name:"Free Waist-to-Hip Ratio Calculator Online",
desc:"WHR health risk check", how:"Enter waist and hip measurements with a tape measure — get your waist-to-hip ratio and WHO risk category.",
render:function(box){
  box.innerHTML = '<h2>📏 Waist-to-Hip Ratio Calculator</h2><div class="row"><div><label>Waist (cm)</label><input type="number" id="t-w" placeholder="80"></div><div><label>Hip (cm)</label><input type="number" id="t-h" placeholder="95"></div></div><div><label>Sex</label><select id="t-s"><option value="m">Male</option><option value="f">Female</option></select></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">General guide only — not medical advice.</p>';
  el("t-go").onclick=function(){
    var w=+el("t-w").value,h=+el("t-h").value,s=el("t-s").value;
    if(!w||!h){outHTML(box,"Enter waist and hip measurements.");return;}
    var r=w/h, lim=s==="m"?0.9:0.85, cat=r<=lim?"Healthy ✅":r<=1.0?"Increased risk":"High risk ⚠️";
    outHTML(box,"WHR: "+r.toFixed(2)+"\n"+cat+"\n(Healthy: ≤ "+lim+")");
  };
}});
/* 3 new tools: chmod, serp, date-diff — APPROVED (thinker-new-tools-2026-10-11-1726) */

TOOLS.push({ id:"chmod", cat:"dev", icon:"🔐", name:"Free Chmod Calculator Online",
desc:"Convert file permissions between octal and symbolic notation", how:"Click the r/w/x boxes for Owner, Group and Others — or type an octal like 755 — and get the matching code, symbolic notation, and a ready-to-paste chmod command.",
render:function(box){
  var perms=["r","w","x"], roles=["Owner","Group","Others"];
  var h='<h2>🔐 Chmod Calculator</h2><div class="row" style="grid-template-columns:repeat(3,1fr);gap:8px">';
  roles.forEach(function(role,ri){
    h+='<div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:10px 6px"><div style="font-weight:700;font-size:.85rem;margin-bottom:8px">'+role+'</div><div style="display:flex;gap:6px;justify-content:center">';
    perms.forEach(function(p,pi){
      var id="t-chmod-"+ri+"-"+pi;
      h+='<label style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;font-size:.75rem"><input type="checkbox" id="'+id+'" style="width:22px;height:22px;accent-color:#6366f1;cursor:pointer"><span>'+p+'</span></label>';
    });
    h+='</div></div>';
  });
  h+='</div><div class="row" style="margin-top:12px"><div><label>Octal (e.g. 755)</label><input id="t-chmod-oct" maxlength="3" placeholder="755" inputmode="numeric"></div><div><label>Presets</label><div style="display:flex;gap:6px;flex-wrap:wrap">';
  ["644","755","600","700","777"].forEach(function(p){ h+='<button type="button" class="tool-btn ghost" data-preset="'+p+'" style="padding:8px 12px;font-size:.85rem">'+p+'</button>'; });
  h+='</div></div></div><div class="tool-out" id="t-out" style="display:block"></div>';
  box.innerHTML=h;
  function bits(){ var o=""; for(var ri=0;ri<3;ri++){ var v=0; for(var pi=0;pi<3;pi++){ if(box.querySelector("#t-chmod-"+ri+"-"+pi).checked) v+=[4,2,1][pi]; } o+=v; } return o; }
  function sym(o){ var m={"0":"---","1":"--x","2":"-w-","3":"-wx","4":"r--","5":"r-x","6":"rw-","7":"rwx"}; return (m[o[0]]||"---")+(m[o[1]]||"---")+(m[o[2]]||"---"); }
  function meaning(o){ var d={"7":"read+write+execute","6":"read+write","5":"read+execute","4":"read only","3":"write+execute","2":"write only","1":"execute only","0":"no permissions"}; return "Owner: "+d[o[0]]+" · Group: "+d[o[1]]+" · Others: "+d[o[2]]; }
  function update(fromOct){
    var oct=box.querySelector("#t-chmod-oct"), out=box.querySelector("#t-out"), o;
    if(fromOct){ o=oct.value.replace(/\D/g,"").slice(0,3); if(o.length<3){ outHTML(box,"Enter 3 octal digits (e.g. 755)."); return; } if(!/^[0-7]{3}$/.test(o)){ outHTML(box,"Invalid octal — use digits 0-7 only."); return; }
      for(var ri=0;ri<3;ri++){ var v=parseInt(o[ri],10); for(var pi=0;pi<3;pi++){ box.querySelector("#t-chmod-"+ri+"-"+pi).checked=!!(v&[4,2,1][pi]); } }
    } else { o=bits(); oct.value=o; }
    var s=sym(o), warn=o==="777"?'<div style="margin-top:8px;padding:8px 12px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);border-radius:8px;font-size:.85rem">⚠️ 777 is world-writable — avoid on production servers.</div>':"";
    out.innerHTML='<div style="font-size:1.3rem;font-weight:800">Octal: <code>'+o+'</code> &nbsp; Symbolic: <code>'+s+'</code></div><div style="margin-top:6px;color:#c7cbe8">'+meaning(o)+'</div><div style="margin-top:10px"><code style="background:rgba(255,255,255,.06);padding:6px 12px;border-radius:8px">chmod '+o+' filename</code> <button type="button" class="tool-btn" id="t-chmod-copy" style="margin-left:8px;padding:6px 14px;font-size:.85rem">📋 Copy</button></div>'+warn;
    var cp=box.querySelector("#t-chmod-copy"); if(cp) cp.onclick=function(){ navigator.clipboard.writeText("chmod "+o+" filename").then(function(){ cp.textContent="✅ Copied!"; setTimeout(function(){cp.textContent="📋 Copy";},1500); }); };
  }
  box.querySelectorAll('input[type="checkbox"]').forEach(function(c){ c.addEventListener("change",function(){update(false);}); });
  box.querySelector("#t-chmod-oct").addEventListener("input",function(){update(true);});
  box.querySelectorAll("[data-preset]").forEach(function(b){ b.addEventListener("click",function(){ box.querySelector("#t-chmod-oct").value=b.getAttribute("data-preset"); update(true); }); });
  update(false);
}});

TOOLS.push({ id:"serp", cat:"seo", icon:"🔍", name:"Free Google SERP Preview Tool",
desc:"Preview your title & meta description in Google search results", how:"Type your page title, URL and meta description — see exactly how your listing looks in Google on desktop and mobile, with truncation warnings before you publish.",
render:function(box){
  var h='<h2>🔍 Google SERP Preview</h2><div class="row"><div><label>Page Title</label><input id="t-serp-title" placeholder="Your page title here" maxlength="120"></div><div><label>URL</label><input id="t-serp-url" placeholder="https://example.com/page"></div></div><div class="row"><div><label>Meta Description</label><textarea id="t-serp-desc" rows="3" placeholder="Your meta description..." maxlength="320" style="width:100%"></textarea></div></div>';
  h+='<div style="margin-top:16px"><div style="font-weight:700;margin-bottom:8px">🖥️ Desktop Preview</div><div id="t-serp-desk" style="background:#fff;border-radius:8px;padding:14px;max-width:600px"></div></div>';
  h+='<div style="margin-top:12px"><div style="font-weight:700;margin-bottom:8px">📱 Mobile Preview</div><div id="t-serp-mob" style="background:#fff;border-radius:8px;padding:12px;max-width:360px"></div></div>';
  h+='<div class="tool-out" id="t-out" style="display:block;margin-top:12px"></div><p style="font-size:.78rem;color:#8b90b8;margin-top:8px">Note: pixel widths are an approximation of Google\u2019s rendering (Arial metrics).</p>';
  box.innerHTML=h;
  var cv=document.createElement("canvas"), cx=cv.getContext("2d");
  function px(t,font){ cx.font=font; return cx.measureText(t||"").width; }
  function escHtml(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function update(){
    var ti=box.querySelector("#t-serp-title").value||"Your Page Title", ur=box.querySelector("#t-serp-url").value||"https://example.com/page", de=box.querySelector("#t-serp-desc").value||"Your meta description will appear here...";
    var tw=px(ti,"20px Arial"), dw=px(de,"14px Arial");
    var tStat=tw>600?'<span style="color:#ef4444">⚠️ Title will truncate (~'+Math.round(tw-600)+'px over)</span>':'<span style="color:#22c55e">✅ Title fits</span>';
    var dStat=dw>990?'<span style="color:#ef4444">⚠️ Description will truncate</span>':'<span style="color:#22c55e">✅ Description fits</span>';
    var card='<div style="color:#1a0dab;font-size:20px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:600px">'+escHtml(ti)+'</div><div style="color:#006621;font-size:14px">'+escHtml(ur)+'</div><div style="color:#545454;font-size:14px;line-height:1.5">'+escHtml(de)+'</div>';
    box.querySelector("#t-serp-desk").innerHTML=card;
    box.querySelector("#t-serp-mob").innerHTML='<div style="color:#1a0dab;font-size:16px;line-height:1.3">'+escHtml(ti)+'</div><div style="color:#006621;font-size:12px">'+escHtml(ur)+'</div><div style="color:#545454;font-size:13px;line-height:1.4">'+escHtml(de)+'</div>';
    box.querySelector("#t-out").innerHTML='<div>'+tStat+' <span style="color:#8b90b8">('+ti.length+' chars, ~'+Math.round(tw)+'px)</span></div><div style="margin-top:4px">'+dStat+' <span style="color:#8b90b8">('+de.length+' chars, ~'+Math.round(dw)+'px)</span></div>';
  }
  ["t-serp-title","t-serp-url","t-serp-desc"].forEach(function(id){ box.querySelector("#"+id).addEventListener("input",update); });
  update();
}});

TOOLS.push({ id:"date-diff", cat:"calc", icon:"📅", name:"Free Date Difference Calculator",
desc:"Find days, weeks, months & years between any two dates", how:"Pick a start date and an end date — get the exact difference in days, a years/months/days breakdown, and the weekday of each date.",
render:function(box){
  var h='<h2>📅 Date Difference Calculator</h2><div class="row"><div><label>Start Date</label><input type="date" id="t-dd-start"></div><div><label>End Date</label><input type="date" id="t-dd-end"></div></div>';
  h+='<div class="row" style="margin-top:8px"><div><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="t-dd-biz" style="width:18px;height:18px"> Count only business days (Mon–Fri)</label></div><div><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="t-dd-inc" style="width:18px;height:18px"> Include end date</label></div></div>';
  h+='<div style="margin-top:12px"><button type="button" class="tool-btn" id="t-dd-go" style="padding:12px 32px;font-size:1rem">Calculate Difference</button></div><div class="tool-out" id="t-out" style="display:block"></div>';
  box.innerHTML=h;
  box.querySelector("#t-dd-end").valueAsDate=new Date();
  var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  box.querySelector("#t-dd-go").addEventListener("click",function(){
    var s=box.querySelector("#t-dd-start").value, e=box.querySelector("#t-dd-end").value, out=box.querySelector("#t-out");
    if(!s||!e){ outHTML(box,"Please pick both dates."); return; }
    var d1=new Date(s+"T00:00:00Z"), d2=new Date(e+"T00:00:00Z"), swapped=false;
    if(d2<d1){ var t=d1; d1=d2; d2=t; swapped=true; }
    var biz=box.querySelector("#t-dd-biz").checked, inc=box.querySelector("#t-dd-inc").checked;
    var total=Math.round((d2-d1)/86400000)+(inc?1:0);
    var weeks=Math.floor(total/7), rem=total%7;
    var y=d2.getUTCFullYear()-d1.getUTCFullYear(), m=d2.getUTCMonth()-d1.getUTCMonth(), d=d2.getUTCDate()-d1.getUTCDate();
    if(d<0){ m--; var pm=new Date(Date.UTC(d2.getUTCFullYear(),d2.getUTCMonth(),0)); d+=pm.getUTCDate(); }
    if(m<0){ y--; m+=12; }
    var bh="";
    if(biz){ var c=0, cur=new Date(d1); var endB=new Date(d2); if(inc) endB=new Date(endB.getTime()+86400000);
      while(cur<endB){ var wd=cur.getUTCDay(); if(wd!==0&&wd!==6) c++; cur=new Date(cur.getTime()+86400000); }
      bh='<div style="margin-top:6px">💼 Business days: <b>'+c+'</b></div>'; }
    out.innerHTML='<div style="font-size:1.4rem;font-weight:800">📅 '+total+' day'+(total===1?"":"s")+'</div><div style="margin-top:6px;color:#c7cbe8">'+weeks+' weeks + '+rem+' days</div><div style="margin-top:4px;color:#c7cbe8">🗓️ '+y+' years, '+m+' months, '+d+' days</div><div style="margin-top:6px;font-size:.9rem;color:#8b90b8">Start: '+days[d1.getUTCDay()]+' · End: '+days[d2.getUTCDay()]+(swapped?' <span style="color:#f59e0b">(dates were swapped)</span>':"")+'</div>'+bh+'<div style="margin-top:10px"><button type="button" class="tool-btn ghost" id="t-dd-copy" style="padding:8px 18px;font-size:.9rem">📋 Copy Summary</button></div>';
    var cp=box.querySelector("#t-dd-copy");
    if(cp) cp.onclick=function(){ var txt=total+" days ("+y+"y "+m+"m "+d+"d) from "+s+" to "+e; navigator.clipboard.writeText(txt).then(function(){ cp.textContent="✅ Copied!"; setTimeout(function(){cp.textContent="📋 Copy Summary";},1500); }); };
  });
}});

/* 3 new tools: chmod, serp, date-diff — APPROVED (thinker-new-tools-2026-10-11-1726) */

TOOLS.push({ id:"chmod", cat:"dev", icon:"🔐", name:"Free Chmod Calculator Online",
desc:"Convert file permissions between octal and symbolic notation", how:"Click the r/w/x boxes for Owner, Group and Others — or type an octal like 755 — and get the matching code, symbolic notation, and a ready-to-paste chmod command.",
render:function(box){
  var perms=["r","w","x"], roles=["Owner","Group","Others"];
  var h='<h2>🔐 Chmod Calculator</h2><div class="row" style="grid-template-columns:repeat(3,1fr);gap:8px">';
  roles.forEach(function(role,ri){
    h+='<div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:10px 6px"><div style="font-weight:700;font-size:.85rem;margin-bottom:8px">'+role+'</div><div style="display:flex;gap:6px;justify-content:center">';
    perms.forEach(function(p,pi){
      var id="t-chmod-"+ri+"-"+pi;
      h+='<label style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;font-size:.75rem"><input type="checkbox" id="'+id+'" style="width:22px;height:22px;accent-color:#6366f1;cursor:pointer"><span>'+p+'</span></label>';
    });
    h+='</div></div>';
  });
  h+='</div><div class="row" style="margin-top:12px"><div><label>Octal (e.g. 755)</label><input id="t-chmod-oct" maxlength="3" placeholder="755" inputmode="numeric"></div><div><label>Presets</label><div style="display:flex;gap:6px;flex-wrap:wrap">';
  ["644","755","600","700","777"].forEach(function(p){ h+='<button type="button" class="tool-btn ghost" data-preset="'+p+'" style="padding:8px 12px;font-size:.85rem">'+p+'</button>'; });
  h+='</div></div></div><div class="tool-out" id="t-out" style="display:block"></div>';
  box.innerHTML=h;
  function bits(){ var o=""; for(var ri=0;ri<3;ri++){ var v=0; for(var pi=0;pi<3;pi++){ if(box.querySelector("#t-chmod-"+ri+"-"+pi).checked) v+=[4,2,1][pi]; } o+=v; } return o; }
  function sym(o){ var m={"0":"---","1":"--x","2":"-w-","3":"-wx","4":"r--","5":"r-x","6":"rw-","7":"rwx"}; return (m[o[0]]||"---")+(m[o[1]]||"---")+(m[o[2]]||"---"); }
  function meaning(o){ var d={"7":"read+write+execute","6":"read+write","5":"read+execute","4":"read only","3":"write+execute","2":"write only","1":"execute only","0":"no permissions"}; return "Owner: "+d[o[0]]+" · Group: "+d[o[1]]+" · Others: "+d[o[2]]; }
  function update(fromOct){
    var oct=box.querySelector("#t-chmod-oct"), out=box.querySelector("#t-out"), o;
    if(fromOct){ o=oct.value.replace(/\D/g,"").slice(0,3); if(o.length<3){ outHTML(box,"Enter 3 octal digits (e.g. 755)."); return; } if(!/^[0-7]{3}$/.test(o)){ outHTML(box,"Invalid octal — use digits 0-7 only."); return; }
      for(var ri=0;ri<3;ri++){ var v=parseInt(o[ri],10); for(var pi=0;pi<3;pi++){ box.querySelector("#t-chmod-"+ri+"-"+pi).checked=!!(v&[4,2,1][pi]); } }
    } else { o=bits(); oct.value=o; }
    var s=sym(o), warn=o==="777"?'<div style="margin-top:8px;padding:8px 12px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);border-radius:8px;font-size:.85rem">⚠️ 777 is world-writable — avoid on production servers.</div>':"";
    out.innerHTML='<div style="font-size:1.3rem;font-weight:800">Octal: <code>'+o+'</code> &nbsp; Symbolic: <code>'+s+'</code></div><div style="margin-top:6px;color:#c7cbe8">'+meaning(o)+'</div><div style="margin-top:10px"><code style="background:rgba(255,255,255,.06);padding:6px 12px;border-radius:8px">chmod '+o+' filename</code> <button type="button" class="tool-btn" id="t-chmod-copy" style="margin-left:8px;padding:6px 14px;font-size:.85rem">📋 Copy</button></div>'+warn;
    var cp=box.querySelector("#t-chmod-copy"); if(cp) cp.onclick=function(){ navigator.clipboard.writeText("chmod "+o+" filename").then(function(){ cp.textContent="✅ Copied!"; setTimeout(function(){cp.textContent="📋 Copy";},1500); }); };
  }
  box.querySelectorAll('input[type="checkbox"]').forEach(function(c){ c.addEventListener("change",function(){update(false);}); });
  box.querySelector("#t-chmod-oct").addEventListener("input",function(){update(true);});
  box.querySelectorAll("[data-preset]").forEach(function(b){ b.addEventListener("click",function(){ box.querySelector("#t-chmod-oct").value=b.getAttribute("data-preset"); update(true); }); });
  update(false);
}});

TOOLS.push({ id:"serp", cat:"seo", icon:"🔍", name:"Free Google SERP Preview Tool",
desc:"Preview your title & meta description in Google search results", how:"Type your page title, URL and meta description — see exactly how your listing looks in Google on desktop and mobile, with truncation warnings before you publish.",
render:function(box){
  var h='<h2>🔍 Google SERP Preview</h2><div class="row"><div><label>Page Title</label><input id="t-serp-title" placeholder="Your page title here" maxlength="120"></div><div><label>URL</label><input id="t-serp-url" placeholder="https://example.com/page"></div></div><div class="row"><div><label>Meta Description</label><textarea id="t-serp-desc" rows="3" placeholder="Your meta description..." maxlength="320" style="width:100%"></textarea></div></div>';
  h+='<div style="margin-top:16px"><div style="font-weight:700;margin-bottom:8px">🖥️ Desktop Preview</div><div id="t-serp-desk" style="background:#fff;border-radius:8px;padding:14px;max-width:600px"></div></div>';
  h+='<div style="margin-top:12px"><div style="font-weight:700;margin-bottom:8px">📱 Mobile Preview</div><div id="t-serp-mob" style="background:#fff;border-radius:8px;padding:12px;max-width:360px"></div></div>';
  h+='<div class="tool-out" id="t-out" style="display:block;margin-top:12px"></div><p style="font-size:.78rem;color:#8b90b8;margin-top:8px">Note: pixel widths are an approximation of Google\u2019s rendering (Arial metrics).</p>';
  box.innerHTML=h;
  var cv=document.createElement("canvas"), cx=cv.getContext("2d");
  function px(t,font){ cx.font=font; return cx.measureText(t||"").width; }
  function escHtml(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function update(){
    var ti=box.querySelector("#t-serp-title").value||"Your Page Title", ur=box.querySelector("#t-serp-url").value||"https://example.com/page", de=box.querySelector("#t-serp-desc").value||"Your meta description will appear here...";
    var tw=px(ti,"20px Arial"), dw=px(de,"14px Arial");
    var tStat=tw>600?'<span style="color:#ef4444">⚠️ Title will truncate (~'+Math.round(tw-600)+'px over)</span>':'<span style="color:#22c55e">✅ Title fits</span>';
    var dStat=dw>990?'<span style="color:#ef4444">⚠️ Description will truncate</span>':'<span style="color:#22c55e">✅ Description fits</span>';
    var card='<div style="color:#1a0dab;font-size:20px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:600px">'+escHtml(ti)+'</div><div style="color:#006621;font-size:14px">'+escHtml(ur)+'</div><div style="color:#545454;font-size:14px;line-height:1.5">'+escHtml(de)+'</div>';
    box.querySelector("#t-serp-desk").innerHTML=card;
    box.querySelector("#t-serp-mob").innerHTML='<div style="color:#1a0dab;font-size:16px;line-height:1.3">'+escHtml(ti)+'</div><div style="color:#006621;font-size:12px">'+escHtml(ur)+'</div><div style="color:#545454;font-size:13px;line-height:1.4">'+escHtml(de)+'</div>';
    box.querySelector("#t-out").innerHTML='<div>'+tStat+' <span style="color:#8b90b8">('+ti.length+' chars, ~'+Math.round(tw)+'px)</span></div><div style="margin-top:4px">'+dStat+' <span style="color:#8b90b8">('+de.length+' chars, ~'+Math.round(dw)+'px)</span></div>';
  }
  ["t-serp-title","t-serp-url","t-serp-desc"].forEach(function(id){ box.querySelector("#"+id).addEventListener("input",update); });
  update();
}});

TOOLS.push({ id:"date-diff", cat:"calc", icon:"📅", name:"Free Date Difference Calculator",
desc:"Find days, weeks, months & years between any two dates", how:"Pick a start date and an end date — get the exact difference in days, a years/months/days breakdown, and the weekday of each date.",
render:function(box){
  var h='<h2>📅 Date Difference Calculator</h2><div class="row"><div><label>Start Date</label><input type="date" id="t-dd-start"></div><div><label>End Date</label><input type="date" id="t-dd-end"></div></div>';
  h+='<div class="row" style="margin-top:8px"><div><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="t-dd-biz" style="width:18px;height:18px"> Count only business days (Mon–Fri)</label></div><div><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="t-dd-inc" style="width:18px;height:18px"> Include end date</label></div></div>';
  h+='<div style="margin-top:12px"><button type="button" class="tool-btn" id="t-dd-go" style="padding:12px 32px;font-size:1rem">Calculate Difference</button></div><div class="tool-out" id="t-out" style="display:block"></div>';
  box.innerHTML=h;
  box.querySelector("#t-dd-end").valueAsDate=new Date();
  var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  box.querySelector("#t-dd-go").addEventListener("click",function(){
    var s=box.querySelector("#t-dd-start").value, e=box.querySelector("#t-dd-end").value, out=box.querySelector("#t-out");
    if(!s||!e){ outHTML(box,"Please pick both dates."); return; }
    var d1=new Date(s+"T00:00:00Z"), d2=new Date(e+"T00:00:00Z"), swapped=false;
    if(d2<d1){ var t=d1; d1=d2; d2=t; swapped=true; }
    var biz=box.querySelector("#t-dd-biz").checked, inc=box.querySelector("#t-dd-inc").checked;
    var total=Math.round((d2-d1)/86400000)+(inc?1:0);
    var weeks=Math.floor(total/7), rem=total%7;
    var y=d2.getUTCFullYear()-d1.getUTCFullYear(), m=d2.getUTCMonth()-d1.getUTCMonth(), d=d2.getUTCDate()-d1.getUTCDate();
    if(d<0){ m--; var pm=new Date(Date.UTC(d2.getUTCFullYear(),d2.getUTCMonth(),0)); d+=pm.getUTCDate(); }
    if(m<0){ y--; m+=12; }
    var bh="";
    if(biz){ var c=0, cur=new Date(d1); var endB=new Date(d2); if(inc) endB=new Date(endB.getTime()+86400000);
      while(cur<endB){ var wd=cur.getUTCDay(); if(wd!==0&&wd!==6) c++; cur=new Date(cur.getTime()+86400000); }
      bh='<div style="margin-top:6px">💼 Business days: <b>'+c+'</b></div>'; }
    out.innerHTML='<div style="font-size:1.4rem;font-weight:800">📅 '+total+' day'+(total===1?"":"s")+'</div><div style="margin-top:6px;color:#c7cbe8">'+weeks+' weeks + '+rem+' days</div><div style="margin-top:4px;color:#c7cbe8">🗓️ '+y+' years, '+m+' months, '+d+' days</div><div style="margin-top:6px;font-size:.9rem;color:#8b90b8">Start: '+days[d1.getUTCDay()]+' · End: '+days[d2.getUTCDay()]+(swapped?' <span style="color:#f59e0b">(dates were swapped)</span>':"")+'</div>'+bh+'<div style="margin-top:10px"><button type="button" class="tool-btn ghost" id="t-dd-copy" style="padding:8px 18px;font-size:.9rem">📋 Copy Summary</button></div>';
    var cp=box.querySelector("#t-dd-copy");
    if(cp) cp.onclick=function(){ var txt=total+" days ("+y+"y "+m+"m "+d+"d) from "+s+" to "+e; navigator.clipboard.writeText(txt).then(function(){ cp.textContent="✅ Copied!"; setTimeout(function(){cp.textContent="📋 Copy Summary";},1500); }); };
  });
}});

/* 3 new tools: chmod, serp, date-diff — APPROVED (thinker-new-tools-2026-10-11-1726) */

TOOLS.push({ id:"chmod", cat:"dev", icon:"🔐", name:"Free Chmod Calculator Online",
desc:"Convert file permissions between octal and symbolic notation", how:"Click the r/w/x boxes for Owner, Group and Others — or type an octal like 755 — and get the matching code, symbolic notation, and a ready-to-paste chmod command.",
render:function(box){
  var perms=["r","w","x"], roles=["Owner","Group","Others"];
  var h='<h2>🔐 Chmod Calculator</h2><div class="row" style="grid-template-columns:repeat(3,1fr);gap:8px">';
  roles.forEach(function(role,ri){
    h+='<div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:10px 6px"><div style="font-weight:700;font-size:.85rem;margin-bottom:8px">'+role+'</div><div style="display:flex;gap:6px;justify-content:center">';
    perms.forEach(function(p,pi){
      var id="t-chmod-"+ri+"-"+pi;
      h+='<label style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;font-size:.75rem"><input type="checkbox" id="'+id+'" style="width:22px;height:22px;accent-color:#6366f1;cursor:pointer"><span>'+p+'</span></label>';
    });
    h+='</div></div>';
  });
  h+='</div><div class="row" style="margin-top:12px"><div><label>Octal (e.g. 755)</label><input id="t-chmod-oct" maxlength="3" placeholder="755" inputmode="numeric"></div><div><label>Presets</label><div style="display:flex;gap:6px;flex-wrap:wrap">';
  ["644","755","600","700","777"].forEach(function(p){ h+='<button type="button" class="tool-btn ghost" data-preset="'+p+'" style="padding:8px 12px;font-size:.85rem">'+p+'</button>'; });
  h+='</div></div></div><div class="tool-out" id="t-out" style="display:block"></div>';
  box.innerHTML=h;
  function bits(){ var o=""; for(var ri=0;ri<3;ri++){ var v=0; for(var pi=0;pi<3;pi++){ if(box.querySelector("#t-chmod-"+ri+"-"+pi).checked) v+=[4,2,1][pi]; } o+=v; } return o; }
  function sym(o){ var m={"0":"---","1":"--x","2":"-w-","3":"-wx","4":"r--","5":"r-x","6":"rw-","7":"rwx"}; return (m[o[0]]||"---")+(m[o[1]]||"---")+(m[o[2]]||"---"); }
  function meaning(o){ var d={"7":"read+write+execute","6":"read+write","5":"read+execute","4":"read only","3":"write+execute","2":"write only","1":"execute only","0":"no permissions"}; return "Owner: "+d[o[0]]+" · Group: "+d[o[1]]+" · Others: "+d[o[2]]; }
  function update(fromOct){
    var oct=box.querySelector("#t-chmod-oct"), out=box.querySelector("#t-out"), o;
    if(fromOct){ o=oct.value.replace(/\D/g,"").slice(0,3); if(o.length<3){ outHTML(box,"Enter 3 octal digits (e.g. 755)."); return; } if(!/^[0-7]{3}$/.test(o)){ outHTML(box,"Invalid octal — use digits 0-7 only."); return; }
      for(var ri=0;ri<3;ri++){ var v=parseInt(o[ri],10); for(var pi=0;pi<3;pi++){ box.querySelector("#t-chmod-"+ri+"-"+pi).checked=!!(v&[4,2,1][pi]); } }
    } else { o=bits(); oct.value=o; }
    var s=sym(o), warn=o==="777"?'<div style="margin-top:8px;padding:8px 12px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);border-radius:8px;font-size:.85rem">⚠️ 777 is world-writable — avoid on production servers.</div>':"";
    out.innerHTML='<div style="font-size:1.3rem;font-weight:800">Octal: <code>'+o+'</code> &nbsp; Symbolic: <code>'+s+'</code></div><div style="margin-top:6px;color:#c7cbe8">'+meaning(o)+'</div><div style="margin-top:10px"><code style="background:rgba(255,255,255,.06);padding:6px 12px;border-radius:8px">chmod '+o+' filename</code> <button type="button" class="tool-btn" id="t-chmod-copy" style="margin-left:8px;padding:6px 14px;font-size:.85rem">📋 Copy</button></div>'+warn;
    var cp=box.querySelector("#t-chmod-copy"); if(cp) cp.onclick=function(){ navigator.clipboard.writeText("chmod "+o+" filename").then(function(){ cp.textContent="✅ Copied!"; setTimeout(function(){cp.textContent="📋 Copy";},1500); }); };
  }
  box.querySelectorAll('input[type="checkbox"]').forEach(function(c){ c.addEventListener("change",function(){update(false);}); });
  box.querySelector("#t-chmod-oct").addEventListener("input",function(){update(true);});
  box.querySelectorAll("[data-preset]").forEach(function(b){ b.addEventListener("click",function(){ box.querySelector("#t-chmod-oct").value=b.getAttribute("data-preset"); update(true); }); });
  update(false);
}});

TOOLS.push({ id:"serp", cat:"seo", icon:"🔍", name:"Free Google SERP Preview Tool",
desc:"Preview your title & meta description in Google search results", how:"Type your page title, URL and meta description — see exactly how your listing looks in Google on desktop and mobile, with truncation warnings before you publish.",
render:function(box){
  var h='<h2>🔍 Google SERP Preview</h2><div class="row"><div><label>Page Title</label><input id="t-serp-title" placeholder="Your page title here" maxlength="120"></div><div><label>URL</label><input id="t-serp-url" placeholder="https://example.com/page"></div></div><div class="row"><div><label>Meta Description</label><textarea id="t-serp-desc" rows="3" placeholder="Your meta description..." maxlength="320" style="width:100%"></textarea></div></div>';
  h+='<div style="margin-top:16px"><div style="font-weight:700;margin-bottom:8px">🖥️ Desktop Preview</div><div id="t-serp-desk" style="background:#fff;border-radius:8px;padding:14px;max-width:600px"></div></div>';
  h+='<div style="margin-top:12px"><div style="font-weight:700;margin-bottom:8px">📱 Mobile Preview</div><div id="t-serp-mob" style="background:#fff;border-radius:8px;padding:12px;max-width:360px"></div></div>';
  h+='<div class="tool-out" id="t-out" style="display:block;margin-top:12px"></div><p style="font-size:.78rem;color:#8b90b8;margin-top:8px">Note: pixel widths are an approximation of Google\u2019s rendering (Arial metrics).</p>';
  box.innerHTML=h;
  var cv=document.createElement("canvas"), cx=cv.getContext("2d");
  function px(t,font){ cx.font=font; return cx.measureText(t||"").width; }
  function escHtml(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function update(){
    var ti=box.querySelector("#t-serp-title").value||"Your Page Title", ur=box.querySelector("#t-serp-url").value||"https://example.com/page", de=box.querySelector("#t-serp-desc").value||"Your meta description will appear here...";
    var tw=px(ti,"20px Arial"), dw=px(de,"14px Arial");
    var tStat=tw>600?'<span style="color:#ef4444">⚠️ Title will truncate (~'+Math.round(tw-600)+'px over)</span>':'<span style="color:#22c55e">✅ Title fits</span>';
    var dStat=dw>990?'<span style="color:#ef4444">⚠️ Description will truncate</span>':'<span style="color:#22c55e">✅ Description fits</span>';
    var card='<div style="color:#1a0dab;font-size:20px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:600px">'+escHtml(ti)+'</div><div style="color:#006621;font-size:14px">'+escHtml(ur)+'</div><div style="color:#545454;font-size:14px;line-height:1.5">'+escHtml(de)+'</div>';
    box.querySelector("#t-serp-desk").innerHTML=card;
    box.querySelector("#t-serp-mob").innerHTML='<div style="color:#1a0dab;font-size:16px;line-height:1.3">'+escHtml(ti)+'</div><div style="color:#006621;font-size:12px">'+escHtml(ur)+'</div><div style="color:#545454;font-size:13px;line-height:1.4">'+escHtml(de)+'</div>';
    box.querySelector("#t-out").innerHTML='<div>'+tStat+' <span style="color:#8b90b8">('+ti.length+' chars, ~'+Math.round(tw)+'px)</span></div><div style="margin-top:4px">'+dStat+' <span style="color:#8b90b8">('+de.length+' chars, ~'+Math.round(dw)+'px)</span></div>';
  }
  ["t-serp-title","t-serp-url","t-serp-desc"].forEach(function(id){ box.querySelector("#"+id).addEventListener("input",update); });
  update();
}});

TOOLS.push({ id:"date-diff", cat:"calc", icon:"📅", name:"Free Date Difference Calculator",
desc:"Find days, weeks, months & years between any two dates", how:"Pick a start date and an end date — get the exact difference in days, a years/months/days breakdown, and the weekday of each date.",
render:function(box){
  var h='<h2>📅 Date Difference Calculator</h2><div class="row"><div><label>Start Date</label><input type="date" id="t-dd-start"></div><div><label>End Date</label><input type="date" id="t-dd-end"></div></div>';
  h+='<div class="row" style="margin-top:8px"><div><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="t-dd-biz" style="width:18px;height:18px"> Count only business days (Mon–Fri)</label></div><div><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="t-dd-inc" style="width:18px;height:18px"> Include end date</label></div></div>';
  h+='<div style="margin-top:12px"><button type="button" class="tool-btn" id="t-dd-go" style="padding:12px 32px;font-size:1rem">Calculate Difference</button></div><div class="tool-out" id="t-out" style="display:block"></div>';
  box.innerHTML=h;
  box.querySelector("#t-dd-end").valueAsDate=new Date();
  var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  box.querySelector("#t-dd-go").addEventListener("click",function(){
    var s=box.querySelector("#t-dd-start").value, e=box.querySelector("#t-dd-end").value, out=box.querySelector("#t-out");
    if(!s||!e){ outHTML(box,"Please pick both dates."); return; }
    var d1=new Date(s+"T00:00:00Z"), d2=new Date(e+"T00:00:00Z"), swapped=false;
    if(d2<d1){ var t=d1; d1=d2; d2=t; swapped=true; }
    var biz=box.querySelector("#t-dd-biz").checked, inc=box.querySelector("#t-dd-inc").checked;
    var total=Math.round((d2-d1)/86400000)+(inc?1:0);
    var weeks=Math.floor(total/7), rem=total%7;
    var y=d2.getUTCFullYear()-d1.getUTCFullYear(), m=d2.getUTCMonth()-d1.getUTCMonth(), d=d2.getUTCDate()-d1.getUTCDate();
    if(d<0){ m--; var pm=new Date(Date.UTC(d2.getUTCFullYear(),d2.getUTCMonth(),0)); d+=pm.getUTCDate(); }
    if(m<0){ y--; m+=12; }
    var bh="";
    if(biz){ var c=0, cur=new Date(d1); var endB=new Date(d2); if(inc) endB=new Date(endB.getTime()+86400000);
      while(cur<endB){ var wd=cur.getUTCDay(); if(wd!==0&&wd!==6) c++; cur=new Date(cur.getTime()+86400000); }
      bh='<div style="margin-top:6px">💼 Business days: <b>'+c+'</b></div>'; }
    out.innerHTML='<div style="font-size:1.4rem;font-weight:800">📅 '+total+' day'+(total===1?"":"s")+'</div><div style="margin-top:6px;color:#c7cbe8">'+weeks+' weeks + '+rem+' days</div><div style="margin-top:4px;color:#c7cbe8">🗓️ '+y+' years, '+m+' months, '+d+' days</div><div style="margin-top:6px;font-size:.9rem;color:#8b90b8">Start: '+days[d1.getUTCDay()]+' · End: '+days[d2.getUTCDay()]+(swapped?' <span style="color:#f59e0b">(dates were swapped)</span>':"")+'</div>'+bh+'<div style="margin-top:10px"><button type="button" class="tool-btn ghost" id="t-dd-copy" style="padding:8px 18px;font-size:.9rem">📋 Copy Summary</button></div>';
    var cp=box.querySelector("#t-dd-copy");
    if(cp) cp.onclick=function(){ var txt=total+" days ("+y+"y "+m+"m "+d+"d) from "+s+" to "+e; navigator.clipboard.writeText(txt).then(function(){ cp.textContent="✅ Copied!"; setTimeout(function(){cp.textContent="📋 Copy Summary";},1500); }); };
  });
}});


/* 3 new tools: chmod, serp, date-diff — APPROVED (thinker-new-tools-2026-10-11-1726) */

TOOLS.push({ id:"chmod", cat:"dev", icon:"🔐", name:"Free Chmod Calculator Online",
desc:"Convert file permissions between octal and symbolic notation", how:"Click the r/w/x boxes for Owner, Group and Others — or type an octal like 755 — and get the matching code, symbolic notation, and a ready-to-paste chmod command.",
render:function(box){
  var perms=["r","w","x"], roles=["Owner","Group","Others"];
  var h='<h2>🔐 Chmod Calculator</h2><div class="row" style="grid-template-columns:repeat(3,1fr);gap:8px">';
  roles.forEach(function(role,ri){
    h+='<div style="text-align:center;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:10px 6px"><div style="font-weight:700;font-size:.85rem;margin-bottom:8px">'+role+'</div><div style="display:flex;gap:6px;justify-content:center">';
    perms.forEach(function(p,pi){
      var id="t-chmod-"+ri+"-"+pi;
      h+='<label style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;font-size:.75rem"><input type="checkbox" id="'+id+'" style="width:22px;height:22px;accent-color:#6366f1;cursor:pointer"><span>'+p+'</span></label>';
    });
    h+='</div></div>';
  });
  h+='</div><div class="row" style="margin-top:12px"><div><label>Octal (e.g. 755)</label><input id="t-chmod-oct" maxlength="3" placeholder="755" inputmode="numeric"></div><div><label>Presets</label><div style="display:flex;gap:6px;flex-wrap:wrap">';
  ["644","755","600","700","777"].forEach(function(p){ h+='<button type="button" class="tool-btn ghost" data-preset="'+p+'" style="padding:8px 12px;font-size:.85rem">'+p+'</button>'; });
  h+='</div></div></div><div class="tool-out" id="t-out" style="display:block"></div>';
  box.innerHTML=h;
  function bits(){ var o=""; for(var ri=0;ri<3;ri++){ var v=0; for(var pi=0;pi<3;pi++){ if(box.querySelector("#t-chmod-"+ri+"-"+pi).checked) v+=[4,2,1][pi]; } o+=v; } return o; }
  function sym(o){ var m={"0":"---","1":"--x","2":"-w-","3":"-wx","4":"r--","5":"r-x","6":"rw-","7":"rwx"}; return (m[o[0]]||"---")+(m[o[1]]||"---")+(m[o[2]]||"---"); }
  function meaning(o){ var d={"7":"read+write+execute","6":"read+write","5":"read+execute","4":"read only","3":"write+execute","2":"write only","1":"execute only","0":"no permissions"}; return "Owner: "+d[o[0]]+" · Group: "+d[o[1]]+" · Others: "+d[o[2]]; }
  function update(fromOct){
    var oct=box.querySelector("#t-chmod-oct"), out=box.querySelector("#t-out"), o;
    if(fromOct){ o=oct.value.replace(/\D/g,"").slice(0,3); if(o.length<3){ outHTML(box,"Enter 3 octal digits (e.g. 755)."); return; } if(!/^[0-7]{3}$/.test(o)){ outHTML(box,"Invalid octal — use digits 0-7 only."); return; }
      for(var ri=0;ri<3;ri++){ var v=parseInt(o[ri],10); for(var pi=0;pi<3;pi++){ box.querySelector("#t-chmod-"+ri+"-"+pi).checked=!!(v&[4,2,1][pi]); } }
    } else { o=bits(); oct.value=o; }
    var s=sym(o), warn=o==="777"?'<div style="margin-top:8px;padding:8px 12px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.4);border-radius:8px;font-size:.85rem">⚠️ 777 is world-writable — avoid on production servers.</div>':"";
    out.innerHTML='<div style="font-size:1.3rem;font-weight:800">Octal: <code>'+o+'</code> &nbsp; Symbolic: <code>'+s+'</code></div><div style="margin-top:6px;color:#c7cbe8">'+meaning(o)+'</div><div style="margin-top:10px"><code style="background:rgba(255,255,255,.06);padding:6px 12px;border-radius:8px">chmod '+o+' filename</code> <button type="button" class="tool-btn" id="t-chmod-copy" style="margin-left:8px;padding:6px 14px;font-size:.85rem">📋 Copy</button></div>'+warn;
    var cp=box.querySelector("#t-chmod-copy"); if(cp) cp.onclick=function(){ navigator.clipboard.writeText("chmod "+o+" filename").then(function(){ cp.textContent="✅ Copied!"; setTimeout(function(){cp.textContent="📋 Copy";},1500); }); };
  }
  box.querySelectorAll('input[type="checkbox"]').forEach(function(c){ c.addEventListener("change",function(){update(false);}); });
  box.querySelector("#t-chmod-oct").addEventListener("input",function(){update(true);});
  box.querySelectorAll("[data-preset]").forEach(function(b){ b.addEventListener("click",function(){ box.querySelector("#t-chmod-oct").value=b.getAttribute("data-preset"); update(true); }); });
  update(false);
}});

TOOLS.push({ id:"serp", cat:"seo", icon:"🔍", name:"Free Google SERP Preview Tool",
desc:"Preview your title & meta description in Google search results", how:"Type your page title, URL and meta description — see exactly how your listing looks in Google on desktop and mobile, with truncation warnings before you publish.",
render:function(box){
  var h='<h2>🔍 Google SERP Preview</h2><div class="row"><div><label>Page Title</label><input id="t-serp-title" placeholder="Your page title here" maxlength="120"></div><div><label>URL</label><input id="t-serp-url" placeholder="https://example.com/page"></div></div><div class="row"><div><label>Meta Description</label><textarea id="t-serp-desc" rows="3" placeholder="Your meta description..." maxlength="320" style="width:100%"></textarea></div></div>';
  h+='<div style="margin-top:16px"><div style="font-weight:700;margin-bottom:8px">🖥️ Desktop Preview</div><div id="t-serp-desk" style="background:#fff;border-radius:8px;padding:14px;max-width:600px"></div></div>';
  h+='<div style="margin-top:12px"><div style="font-weight:700;margin-bottom:8px">📱 Mobile Preview</div><div id="t-serp-mob" style="background:#fff;border-radius:8px;padding:12px;max-width:360px"></div></div>';
  h+='<div class="tool-out" id="t-out" style="display:block;margin-top:12px"></div><p style="font-size:.78rem;color:#8b90b8;margin-top:8px">Note: pixel widths are an approximation of Google\u2019s rendering (Arial metrics).</p>';
  box.innerHTML=h;
  var cv=document.createElement("canvas"), cx=cv.getContext("2d");
  function px(t,font){ cx.font=font; return cx.measureText(t||"").width; }
  function escHtml(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function update(){
    var ti=box.querySelector("#t-serp-title").value||"Your Page Title", ur=box.querySelector("#t-serp-url").value||"https://example.com/page", de=box.querySelector("#t-serp-desc").value||"Your meta description will appear here...";
    var tw=px(ti,"20px Arial"), dw=px(de,"14px Arial");
    var tStat=tw>600?'<span style="color:#ef4444">⚠️ Title will truncate (~'+Math.round(tw-600)+'px over)</span>':'<span style="color:#22c55e">✅ Title fits</span>';
    var dStat=dw>990?'<span style="color:#ef4444">⚠️ Description will truncate</span>':'<span style="color:#22c55e">✅ Description fits</span>';
    var card='<div style="color:#1a0dab;font-size:20px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:600px">'+escHtml(ti)+'</div><div style="color:#006621;font-size:14px">'+escHtml(ur)+'</div><div style="color:#545454;font-size:14px;line-height:1.5">'+escHtml(de)+'</div>';
    box.querySelector("#t-serp-desk").innerHTML=card;
    box.querySelector("#t-serp-mob").innerHTML='<div style="color:#1a0dab;font-size:16px;line-height:1.3">'+escHtml(ti)+'</div><div style="color:#006621;font-size:12px">'+escHtml(ur)+'</div><div style="color:#545454;font-size:13px;line-height:1.4">'+escHtml(de)+'</div>';
    box.querySelector("#t-out").innerHTML='<div>'+tStat+' <span style="color:#8b90b8">('+ti.length+' chars, ~'+Math.round(tw)+'px)</span></div><div style="margin-top:4px">'+dStat+' <span style="color:#8b90b8">('+de.length+' chars, ~'+Math.round(dw)+'px)</span></div>';
  }
  ["t-serp-title","t-serp-url","t-serp-desc"].forEach(function(id){ box.querySelector("#"+id).addEventListener("input",update); });
  update();
}});

TOOLS.push({ id:"date-diff", cat:"calc", icon:"📅", name:"Free Date Difference Calculator",
desc:"Find days, weeks, months & years between any two dates", how:"Pick a start date and an end date — get the exact difference in days, a years/months/days breakdown, and the weekday of each date.",
render:function(box){
  var h='<h2>📅 Date Difference Calculator</h2><div class="row"><div><label>Start Date</label><input type="date" id="t-dd-start"></div><div><label>End Date</label><input type="date" id="t-dd-end"></div></div>';
  h+='<div class="row" style="margin-top:8px"><div><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="t-dd-biz" style="width:18px;height:18px"> Count only business days (Mon–Fri)</label></div><div><label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="t-dd-inc" style="width:18px;height:18px"> Include end date</label></div></div>';
  h+='<div style="margin-top:12px"><button type="button" class="tool-btn" id="t-dd-go" style="padding:12px 32px;font-size:1rem">Calculate Difference</button></div><div class="tool-out" id="t-out" style="display:block"></div>';
  box.innerHTML=h;
  box.querySelector("#t-dd-end").valueAsDate=new Date();
  var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  box.querySelector("#t-dd-go").addEventListener("click",function(){
    var s=box.querySelector("#t-dd-start").value, e=box.querySelector("#t-dd-end").value, out=box.querySelector("#t-out");
    if(!s||!e){ outHTML(box,"Please pick both dates."); return; }
    var d1=new Date(s+"T00:00:00Z"), d2=new Date(e+"T00:00:00Z"), swapped=false;
    if(d2<d1){ var t=d1; d1=d2; d2=t; swapped=true; }
    var biz=box.querySelector("#t-dd-biz").checked, inc=box.querySelector("#t-dd-inc").checked;
    var total=Math.round((d2-d1)/86400000)+(inc?1:0);
    var weeks=Math.floor(total/7), rem=total%7;
    var y=d2.getUTCFullYear()-d1.getUTCFullYear(), m=d2.getUTCMonth()-d1.getUTCMonth(), d=d2.getUTCDate()-d1.getUTCDate();
    if(d<0){ m--; var pm=new Date(Date.UTC(d2.getUTCFullYear(),d2.getUTCMonth(),0)); d+=pm.getUTCDate(); }
    if(m<0){ y--; m+=12; }
    var bh="";
    if(biz){ var c=0, cur=new Date(d1); var endB=new Date(d2); if(inc) endB=new Date(endB.getTime()+86400000);
      while(cur<endB){ var wd=cur.getUTCDay(); if(wd!==0&&wd!==6) c++; cur=new Date(cur.getTime()+86400000); }
      bh='<div style="margin-top:6px">💼 Business days: <b>'+c+'</b></div>'; }
    out.innerHTML='<div style="font-size:1.4rem;font-weight:800">📅 '+total+' day'+(total===1?"":"s")+'</div><div style="margin-top:6px;color:#c7cbe8">'+weeks+' weeks + '+rem+' days</div><div style="margin-top:4px;color:#c7cbe8">🗓️ '+y+' years, '+m+' months, '+d+' days</div><div style="margin-top:6px;font-size:.9rem;color:#8b90b8">Start: '+days[d1.getUTCDay()]+' · End: '+days[d2.getUTCDay()]+(swapped?' <span style="color:#f59e0b">(dates were swapped)</span>':"")+'</div>'+bh+'<div style="margin-top:10px"><button type="button" class="tool-btn ghost" id="t-dd-copy" style="padding:8px 18px;font-size:.9rem">📋 Copy Summary</button></div>';
    var cp=box.querySelector("#t-dd-copy");
    if(cp) cp.onclick=function(){ var txt=total+" days ("+y+"y "+m+"m "+d+"d) from "+s+" to "+e; navigator.clipboard.writeText(txt).then(function(){ cp.textContent="✅ Copied!"; setTimeout(function(){cp.textContent="📋 Copy Summary";},1500); }); };
  });
}});



TOOLS.push({ id:"subnet-calc", cat:"dev", icon:"🌐", name:"Free Subnet Calculator Online",
desc:"Calculate network, broadcast, usable hosts, masks from any IP and CIDR",
how:"Enter an IPv4 address and prefix length (e.g. 192.168.1.10/24) — get network address, broadcast address, first & last usable host, total usable hosts, subnet mask, wildcard mask, and binary notation of the mask.",
render:function(box){
  box.innerHTML = '<h2>🌐 Subnet Calculator</h2><div class="row"><div><label>IP address</label><input type="text" id="t-ip" placeholder="192.168.1.10"></div><div><label>CIDR prefix (1–32)</label><input type="number" id="t-cidr" min="1" max="32" placeholder="24"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tool-note">IPv4 only. Everything runs in your browser — nothing is uploaded.</p>';
  function ipToInt(s){var p=s.trim().split(".");if(p.length!==4)return -1;var n=0;for(var i=0;i<4;i++){var o=parseInt(p[i],10);if(isNaN(o)||o<0||o>255)return -1;n=(n<<8)+o;}return n>>>0;}
  function intToIp(n){return ((n>>>24)&255)+"."+((n>>>16)&255)+"."+((n>>>8)&255)+"."+(n&255);}
  function maskToBin(m){var b="";for(var i=31;i>=0;i--){b+=((m>>>i)&1)?"1":"0";if(i%8===0&&i>0)b+=".";}return b;}
  el("t-go").onclick=function(){
    var ipS=el("t-ip").value||"", cidr=parseInt(el("t-cidr").value,10);
    var ip=ipToInt(ipS);
    if(ip<0||isNaN(cidr)||cidr<1||cidr>32){outHTML(box,"Enter a valid IPv4 address and a CIDR prefix from 1 to 32.");return;}
    var mask=cidr===32?0xFFFFFFFF:((0xFFFFFFFF<<(32-cidr))>>>0);
    var wild=(~mask)>>>0;
    var net=(ip&mask)>>>0, bc=(net|wild)>>>0;
    var hosts=cidr>=31?0:Math.pow(2,32-cidr)-2;
    var first=cidr>=31?intToIp(net):intToIp((net+1)>>>0);
    var last=cidr>=31?intToIp(bc):intToIp((bc-1)>>>0);
    outHTML(box,"Network: "+intToIp(net)+"/"+cidr+"\nBroadcast: "+intToIp(bc)+"\nFirst usable: "+first+"\nLast usable: "+last+"\nUsable hosts: "+hosts.toLocaleString()+"\nSubnet mask: "+intToIp(mask)+"\nMask (binary): "+maskToBin(mask)+"\nWildcard mask: "+intToIp(wild));
  };
}});

TOOLS.push({ id:"text-diff", cat:"text", icon:"📝", name:"Free Text Difference Checker Online",
desc:"Compare two texts and highlight every difference line by line",
how:"Paste the original text on the left and the modified text on the right — differences are highlighted instantly: added lines in green, removed lines in red, with word-level changes marked inside each line.",
render:function(box){
  box.innerHTML = '<h2>📝 Text Difference Checker</h2><div class="row"><div><label>Text A (original)</label><textarea id="t-a" rows="6" placeholder="Paste original text…"></textarea></div><div><label>Text B (modified)</label><textarea id="t-b" rows="6" placeholder="Paste modified text…"></textarea></div></div><div class="row"><div><label><input type="checkbox" id="t-ic"> Ignore case</label></div><div><label><input type="checkbox" id="t-iw"> Ignore whitespace</label></div></div><button class="tool-btn" id="t-go">Compare</button><button class="tool-btn" id="t-copy" style="display:none">📋 Copy unified diff</button><div class="tool-out" id="t-out" style="text-align:left"></div>';
  function norm(s,ic,iw){if(iw)s=s.replace(/\s+/g," ").trim();if(ic)s=s.toLowerCase();return s;}
  function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
  function diffLines(a,b,ic,iw){
    var n=a.length,m=b.length,dp=[];
    for(var i=0;i<=n;i++){dp.push([]);for(var j=0;j<=m;j++)dp[i].push(0);}
    for(i=n-1;i>=0;i--)for(j=m-1;j>=0;j--)dp[i][j]=norm(a[i],ic,iw)===norm(b[j],ic,iw)?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
    var ops=[],x=0,y=0;
    while(x<n&&y<m){
      if(norm(a[x],ic,iw)===norm(b[y],ic,iw)){ops.push({t:" ",a:a[x],b:b[y]});x++;y++;}
      else if(dp[x+1][y]>=dp[x][y+1]){ops.push({t:"-",a:a[x]});x++;}
      else{ops.push({t:"+",b:b[y]});y++;}
    }
    while(x<n){ops.push({t:"-",a:a[x]});x++;}
    while(y<m){ops.push({t:"+",b:b[y]});y++;}
    return ops;
  }
  el("t-go").onclick=function(){
    var a=(el("t-a").value||"").split("\n"),b=(el("t-b").value||"").split("\n");
    var ic=el("t-ic").checked,iw=el("t-iw").checked;
    var ops=diffLines(a,b,ic,iw),html='<div class="df-wrap">',added=0,removed=0,same=0,uni=[];
    for(var k=0;k<ops.length;k++){var o=ops[k];
      if(o.t===" "){same++;html+='<div class="df-line df-same"><span class="df-no">'+(k+1)+'</span> '+esc(o.a)+'</div>';uni.push(" "+o.a);}
      else if(o.t==="-"){removed++;html+='<div class="df-line df-del-line"><span class="df-no">−</span> '+esc(o.a)+'</div>';uni.push("-"+o.a);}
      else{added++;html+='<div class="df-line df-add-line"><span class="df-no">+</span> '+esc(o.b)+'</div>';uni.push("+"+o.b);}
    }
    html+='</div>';
    var sum='<div class="df-sum">➕ '+added+' added · ➖ '+removed+' removed · ➖ '+same+' unchanged</div>';
    el("t-out").innerHTML=sum+html;
    var cb=el("t-copy");cb.style.display="inline-block";
    cb.onclick=function(){var t=uni.join("\n");if(navigator.clipboard)navigator.clipboard.writeText(t);};
  };
}});

TOOLS.push({ id:"email-extractor", cat:"text", icon:"📧", name:"Free Email Extractor Online",
desc:"Extract all unique email addresses from any text instantly",
how:"Paste any text — the extractor finds every email address, removes duplicates, sorts the list, and lets you copy all or download as .txt. Everything happens in your browser; nothing is uploaded.",
render:function(box){
  box.innerHTML = '<h2>📧 Email Extractor</h2><div><label>Paste text</label><textarea id="t-t" rows="6" placeholder="Paste any text containing email addresses…"></textarea></div><div class="row"><div><label><input type="checkbox" id="t-dd" checked> Remove duplicates</label></div><div><label><input type="checkbox" id="t-so" checked> Sort A–Z</label></div><div><label><input type="checkbox" id="t-gd"> Group by domain</label></div></div><button class="tool-btn" id="t-go">Extract</button><button class="tool-btn" id="t-copy" style="display:none">📋 Copy all</button> <button class="tool-btn" id="t-dl" style="display:none">⬇ Download .txt</button><div class="tool-out" id="t-out" style="text-align:left"></div>';
  el("t-go").onclick=function(){
    var txt=el("t-t").value||"";
    var re=/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,m,found=[];
    while((m=re.exec(txt))!==null)found.push(m[0].toLowerCase());
    if(el("t-dd").checked)found=found.filter(function(v,i){return found.indexOf(v)===i;});
    if(el("t-so").checked)found.sort();
    var out=el("t-out");
    if(!found.length){out.innerHTML='<div class="df-sum">No email addresses found.</div>';el("t-copy").style.display="none";el("t-dl").style.display="none";return;}
    var html='<div class="df-sum">✉️ '+found.length+' unique email'+(found.length>1?"s":"")+' found</div>';
    if(el("t-gd").checked){
      var groups={};
      found.forEach(function(e){var d=e.split("@")[1];(groups[d]=groups[d]||[]).push(e);});
      Object.keys(groups).sort().forEach(function(d){
        html+='<div class="df-dom"><b>@'+d+'</b> ('+groups[d].length+')</div><ol class="df-list">';
        groups[d].forEach(function(e){html+='<li>'+e+'</li>';});
        html+='</ol>';
      });
    }else{
      html+='<ol class="df-list">';
      found.forEach(function(e){html+='<li>'+e+'</li>';});
      html+='</ol>';
    }
    out.innerHTML=html;
    var list=found.join("\n");
    el("t-copy").style.display="inline-block";el("t-dl").style.display="inline-block";
    el("t-copy").onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText(list);};
    el("t-dl").onclick=function(){var bl=new Blob([list],{type:"text/plain"});var u=URL.createObjectURL(bl);var a=document.createElement("a");a.href=u;a.download="emails.txt";a.click();setTimeout(function(){URL.revokeObjectURL(u);},500);};
  };
}});

TOOLS.push({ id:"sip-calc", cat:"finance", icon:"📈", name:"Free SIP Calculator Online",
desc:"See how monthly investments grow — maturity value, gains & yearly table", how:"Enter your monthly investment, expected annual return %, and years — instantly see total invested, estimated gains, and maturity value, with a year-by-year growth breakdown.",
render:function(box){
  box.innerHTML = '<h2>📈 SIP Calculator</h2><div class="row"><div><label>Monthly investment</label><input type="number" id="t-amt" value="5000" min="0"></div><div><label>Currency</label><select id="t-cur"><option value="$">$ USD</option><option value="Rs">Rs PKR</option><option value="€">€ EUR</option></select></div><div><label>Expected annual return %</label><input type="range" id="t-ret" min="1" max="30" value="12" step="0.5"><span id="t-retv">12%</span></div><div><label>Years</label><input type="range" id="t-yrs" min="1" max="40" value="10"><span id="t-yrsv">10 yrs</span></div><div><label>Yearly step-up % (optional)</label><input type="number" id="t-step" value="0" min="0" max="50" step="1"></div></div><button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div><p class="tiny" style="margin-top:10px;color:#8b90b8">⚠️ Estimated figures only — actual returns depend on market performance. No guaranteed returns.</p>';
  el("t-ret").oninput=function(){el("t-retv").textContent=el("t-ret").value+"%";};
  el("t-yrs").oninput=function(){el("t-yrsv").textContent=el("t-yrs").value+" yrs";};
  function fmt(n,cur){return cur+" "+Math.round(n).toLocaleString("en-US");}
  el("t-go").onclick=function(){
    var P=+el("t-amt").value||0, cur=el("t-cur").value, ar=+el("t-ret").value/100, yrs=+el("t-yrs").value, step=+el("t-step").value/100||0;
    if(P<=0||yrs<=0){outHTML(box,"Enter a valid monthly amount and years.");return;}
    var i=ar/12, n=yrs*12, fv=0, invested=0, rows=[], monthly=P;
    for(var y=1;y<=yrs;y++){
      var yInv=0, yFv0=fv;
      for(var m=0;m<12;m++){ fv=(fv+monthly)*(1+i); yInv+=monthly; }
      invested+=yInv;
      rows.push({y:y, inv:Math.round(invested), val:Math.round(fv)});
      monthly=monthly*(1+step);
    }
    var gains=fv-invested;
    var html='<div style="font-size:1.6rem;font-weight:800;color:#a5b4fc;margin:8px 0">Maturity value: '+fmt(fv,cur)+'</div>';
    html+='Total invested: '+fmt(invested,cur)+'<br>Estimated gains: '+fmt(gains,cur)+'<br>Growth: '+((fv/invested-1)*100).toFixed(1)+'%';
    html+='<br><br><b>Year-by-year breakdown</b><br><table style="width:100%;margin-top:6px;border-collapse:collapse;font-size:.9rem"><tr style="border-bottom:1px solid var(--line)"><th style="text-align:left;padding:6px">Year</th><th style="text-align:right;padding:6px">Invested</th><th style="text-align:right;padding:6px">Value</th></tr>';
    rows.forEach(function(r){html+='<tr style="border-bottom:1px solid rgba(255,255,255,.06)"><td style="padding:6px">'+r.y+'</td><td style="text-align:right;padding:6px">'+fmt(r.inv,cur)+'</td><td style="text-align:right;padding:6px">'+fmt(r.val,cur)+'</td></tr>';});
    html+='</table><br><button class="tool-btn ghost" id="t-copy">📋 Copy summary</button>';
    box.querySelector("#t-out").innerHTML=html;
    el("t-copy").onclick=function(){var s="SIP Summary: Monthly "+fmt(P,cur)+", "+(ar*100)+"% return, "+yrs+" yrs → Maturity "+fmt(fv,cur)+" (Invested "+fmt(invested,cur)+", Gains "+fmt(gains,cur)+")";if(navigator.clipboard)navigator.clipboard.writeText(s);};
  };
}});

TOOLS.push({ id:"bill-split", cat:"finance", icon:"🧾", name:"Free Bill Splitter Online",
desc:"Split restaurant bills fairly — tax, tip & per-person shares in seconds", how:"Enter the subtotal, tax %, tip %, and number of people — get each person's exact share instantly. Or use itemized mode: add items with prices and assign them to people for a perfectly fair split.",
render:function(box){
  box.innerHTML = '<h2>🧾 Bill Splitter</h2><div class="row" style="margin-bottom:10px"><button class="tool-btn" id="t-mode-even">Even Split</button><button class="tool-btn ghost" id="t-mode-item">Itemized</button></div><div id="t-even"><div class="row"><div><label>Subtotal</label><input type="number" id="t-sub" value="1000" min="0"></div><div><label>Tax %</label><input type="number" id="t-tax" value="10" min="0"></div><div><label>Tip %</label><input type="number" id="t-tip" value="10" min="0"></div><div><label>People</label><input type="number" id="t-ppl" value="2" min="1"></div><div><label><input type="checkbox" id="t-round"> Round up to nearest $1</label></div></div><button class="tool-btn" id="t-go">Split</button></div><div id="t-item" style="display:none"><div class="row"><div><label>Item name</label><input type="text" id="t-iname" placeholder="e.g. Pizza"></div><div><label>Price</label><input type="number" id="t-iprice" min="0" placeholder="0"></div><div><label>Shared by (people #)</label><input type="text" id="t-ishare" placeholder="e.g. 1,2"></div></div><button class="tool-btn" id="t-add">+ Add item</button><div id="t-ilist" style="margin:10px 0"></div><div class="row"><div><label>Tax %</label><input type="number" id="t-itax" value="10" min="0"></div><div><label>Tip %</label><input type="number" id="t-itip" value="10" min="0"></div><div><label>Total people</label><input type="number" id="t-ippl" value="2" min="1"></div></div><button class="tool-btn" id="t-igo">Split itemized</button></div><div class="tool-out" id="t-out"></div>';
  var items=[];
  el("t-mode-even").onclick=function(){el("t-even").style.display="block";el("t-item").style.display="none";el("t-mode-even").classList.remove("ghost");el("t-mode-item").classList.add("ghost");};
  el("t-mode-item").onclick=function(){el("t-even").style.display="none";el("t-item").style.display="block";el("t-mode-item").classList.remove("ghost");el("t-mode-even").classList.add("ghost");};
  function money(n){return n.toFixed(2);}
  el("t-go").onclick=function(){
    var sub=+el("t-sub").value||0, tax=+el("t-tax").value/100||0, tip=+el("t-tip").value/100||0, ppl=Math.max(1,Math.round(+el("t-ppl").value)||1), round=el("t-round").checked;
    var taxAmt=sub*tax, tipAmt=sub*tip, total=sub+taxAmt+tipAmt, per=total/ppl;
    if(round) per=Math.ceil(per);
    var html='<div style="font-size:1.5rem;font-weight:800;color:#a5b4fc;margin:8px 0">Each pays: '+money(per)+'</div>';
    html+='Subtotal share: '+money(sub/ppl)+'<br>Tax share: '+money(taxAmt/ppl)+'<br>Tip share: '+money(tipAmt/ppl)+'<br>Grand total: '+money(total)+'<br><br><button class="tool-btn ghost" id="t-copy">📋 Copy summary</button>';
    box.querySelector("#t-out").innerHTML=html;
    el("t-copy").onclick=function(){if(navigator.clipboard)navigator.clipboard.writeText("Bill split: total "+money(total)+" ÷ "+ppl+" people = "+money(per)+" each (incl. tax & tip)");};
  };
  el("t-add").onclick=function(){
    var nm=el("t-iname").value||"Item", pr=+el("t-iprice").value||0, sh=el("t-ishare").value.split(",").map(function(s){return parseInt(s.trim())-1;}).filter(function(x){return x>=0;});
    if(pr<=0||!sh.length){return;}
    items.push({n:nm,p:pr,s:sh});
    el("t-ilist").innerHTML=items.map(function(it,i){return '<div>#'+(i+1)+' '+it.n+' — '+money(it.p)+' (people: '+it.s.map(function(x){return x+1;}).join(", ")+')</div>';}).join("");
    el("t-iname").value="";el("t-iprice").value="";el("t-ishare").value="";
  };
  el("t-igo").onclick=function(){
    var tax=+el("t-itax").value/100||0, tip=+el("t-itip").value/100||0, ppl=Math.max(1,Math.round(+el("t-ippl").value)||1);
    if(!items.length){box.querySelector("#t-out").innerHTML="Add at least one item.";return;}
    var per=new Array(ppl).fill(0), sub=0;
    items.forEach(function(it){sub+=it.p;var share=it.p/it.s.length;it.s.forEach(function(x){if(x<ppl)per[x]+=share;});});
    var taxAmt=sub*tax, tipAmt=sub*tip;
    for(var k=0;k<ppl;k++){per[k]=per[k]*(1+tax+tip);}
    var html='<b>Per-person totals (incl. tax & tip):</b><br><br>';
    per.forEach(function(v,i){html+='<div style="padding:8px;border:1px solid var(--line);border-radius:10px;margin:6px 0">Person '+(i+1)+': <b>'+money(v)+'</b></div>';});
    html+='<br>Grand total: '+money(sub+taxAmt+tipAmt)+'<br><br><button class="tool-btn ghost" id="t-copy2">📋 Copy summary</button>';
    box.querySelector("#t-out").innerHTML=html;
    el("t-copy2").onclick=function(){var s="Itemized bill split:\n"+per.map(function(v,i){return "Person "+(i+1)+": "+money(v);}).join("\n");if(navigator.clipboard)navigator.clipboard.writeText(s);};
  };
}});

TOOLS.push({ id:"social-preview", cat:"seo", icon:"🃏", name:"Free Social Card Preview Tool",
desc:"Preview how your link looks on Facebook, X, LinkedIn & WhatsApp", how:"Enter your page title, description, and image (URL or upload) — see live mockups of how the link card will appear on Facebook, X (Twitter), LinkedIn, and WhatsApp before you share it.",
render:function(box){
  box.innerHTML = '<h2>🃏 Social Card Preview</h2><div class="row"><div style="flex:2"><label>Page title (60 chars max for OG)</label><input type="text" id="t-title" maxlength="120" value="My Awesome Page" style="width:100%"><span class="tiny" id="t-tc">14 / 60</span></div><div><label>Site name (optional)</label><input type="text" id="t-site" value="US AI" style="width:100%"></div></div><div style="margin:10px 0"><label>Description (155 chars max)</label><textarea id="t-desc" rows="2" maxlength="300" style="width:100%">Check out this amazing page with great content!</textarea><span class="tiny" id="t-dc">47 / 155</span></div><div class="row"><div><label>Image URL</label><input type="text" id="t-img" placeholder="https://..." style="width:100%"></div><div><label>Or upload image (device only)</label><input type="file" id="t-file" accept="image/*"></div></div><div id="t-cards" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:16px"></div><div style="margin-top:12px"><button class="tool-btn ghost" id="t-meta">📋 Copy meta tags</button></div>';
  var imgUrl="";
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function render(){
    var t=el("t-title").value||"Untitled", d=el("t-desc").value||"", s=el("t-site").value||"";
    el("t-tc").textContent=t.length+" / 60"+(t.length>60?" ⚠️ truncated":"");
    el("t-dc").textContent=d.length+" / 155"+(d.length>155?" ⚠️ truncated":"");
    var td=t.length>60?t.slice(0,60)+"…":t, dd=d.length>155?d.slice(0,155)+"…":d;
    var img=imgUrl?'<div style="height:120px;background:#222 url(\''+imgUrl+'\') center/cover;border-radius:10px 10px 0 0"></div>':'<div style="height:120px;background:linear-gradient(135deg,#6366f1,#a855f7);border-radius:10px 10px 0 0;display:flex;align-items:center;justify-content:center;font-size:2rem">🖼️</div>';
    var card=function(plat,extra){return '<div style="border:1px solid var(--line);border-radius:12px;overflow:hidden;background:rgba(255,255,255,.03)"><div style="padding:8px 12px;font-size:.75rem;color:#8b90b8;font-weight:700">'+plat+'</div>'+img+'<div style="padding:10px 12px"><div style="font-size:.7rem;color:#8b90b8">'+esc(s||"example.com")+'</div><div style="font-weight:700;font-size:.92rem;margin:2px 0">'+esc(td)+'</div><div style="font-size:.82rem;color:#c7cbe8">'+esc(dd)+'</div>'+(extra||"")+'</div></div>';};
    el("t-cards").innerHTML=card("📘 Facebook")+card("𝕏 X (Twitter)",'<div style="font-size:.7rem;color:#8b90b8;margin-top:4px">🔗 example.com</div>')+card("💼 LinkedIn")+card("💬 WhatsApp",'<div style="font-size:.75rem;color:#8b90b8;margin-top:6px">Preview of link bubble in chat</div>');
  }
  ["t-title","t-desc","t-site","t-img"].forEach(function(id){el(id).oninput=function(){if(id==="t-img")imgUrl=el("t-img").value;render();};});
  el("t-file").onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){imgUrl=r.result;render();};r.readAsDataURL(f);};
  el("t-meta").onclick=function(){var t=el("t-title").value,d=el("t-desc").value,s=el("t-site").value;var tags='<meta property="og:title" content="'+esc(t)+'">\n<meta property="og:description" content="'+esc(d)+'">\n<meta property="og:image" content="'+esc(imgUrl||"IMAGE_URL")+'">\n<meta name="twitter:card" content="summary_large_image">';if(navigator.clipboard)navigator.clipboard.writeText(tags);};
  render();
}});

TOOLS.push({ id:"fancy-text", cat:"text", icon:"\u2728", name:"Fancy Text Generator \u2014 Stylish Copy Paste",
desc:"Stylish unicode text for bios & captions", how:"Type your text once, get 12 stylish versions instantly \u2014 tap Copy and paste into Instagram, TikTok, WhatsApp or Discord.",
render:function(box){
  box.innerHTML='<h2>\u2728 Fancy Text Generator</h2><p style="color:#8b90b8;font-size:.88rem">Type once \u2014 get 12 stylish versions instantly. Tap any <b>Copy</b> button and paste into Instagram, TikTok, WhatsApp, Discord or your game name.</p><label>Your text</label><textarea id="t-in" placeholder="Hello world!" maxlength="120" rows="2"></textarea><div id="t-styles" style="display:grid;gap:10px;margin-top:12px"></div>';
  function cp(c){return String.fromCodePoint(c);}
  function rng(ch,bU,bL,bD,ex){
    if(ex&&ex[ch])return ex[ch];
    var c=ch.charCodeAt(0);
    if(c>=65&&c<=90)return cp(bU+c-65);
    if(c>=97&&c<=122)return cp(bL+c-97);
    if(bD&&c>=48&&c<=57)return cp(bD+c-48);
    return ch;
  }
  var SCR_EX={B:"\u212C",E:"\u2130",F:"\u2131",H:"\u210B",I:"\u2110",L:"\u2112",M:"\u2133",R:"\u211B",e:"\u212F",g:"\u210A",o:"\u2134"};
  var FRK_EX={C:"\u212D",H:"\u210C",I:"\u2111",R:"\u211C",Z:"\u2128"};
  var DBL_EX={C:"\u2102",H:"\u210D",N:"\u2115",P:"\u2119",Q:"\u211A",R:"\u211D",Z:"\u2124"};
  var SC={a:"\u1D00",b:"\u0299",c:"\u1D04",d:"\u1D05",e:"\u1D07",f:"\uA730",g:"\u0262",h:"\u029C",i:"\u026A",j:"\u1D0A",k:"\u1D0B",l:"\u029F",m:"\u1D0D",n:"\u0274",o:"\u1D0F",p:"\u1D18",q:"Q",r:"\u0280",s:"s",t:"\u1D1B",u:"\u1D1C",v:"\u1D20",w:"\u1D21",x:"x",y:"\u028F",z:"\u1D22"};
  var STYLES=[
    {n:"Bold",f:function(ch){return rng(ch,0x1D400,0x1D41A,0x1D7CE);}},
    {n:"Italic",f:function(ch){return rng(ch,0x1D434,0x1D44E,0,{h:"\u210E"});}},
    {n:"Bold Italic",f:function(ch){return rng(ch,0x1D468,0x1D482,0);}},
    {n:"Script",f:function(ch){return rng(ch,0x1D49C,0x1D4B6,0,SCR_EX);}},
    {n:"Bold Script",f:function(ch){return rng(ch,0x1D4D0,0x1D4EA,0);}},
    {n:"Fraktur",f:function(ch){return rng(ch,0x1D504,0x1D51E,0,FRK_EX);}},
    {n:"Double Struck",f:function(ch){return rng(ch,0x1D538,0x1D552,0x1D7D8,DBL_EX);}},
    {n:"Monospace",f:function(ch){return rng(ch,0x1D670,0x1D68A,0x1D7F6);}},
    {n:"Fullwidth",f:function(ch){return rng(ch,0xFF21,0xFF41,0xFF10);}},
    {n:"Small Caps",f:function(ch){var l=ch.toLowerCase();return SC[l]||ch;}},
    {n:"Circled",f:function(ch){var c=ch.charCodeAt(0);if(c>=65&&c<=90)return cp(0x24B6+c-65);if(c>=97&&c<=122)return cp(0x24D0+c-97);if(c>=49&&c<=57)return cp(0x2460+c-49);if(ch==="0")return cp(0x24EA);return ch;}},
    {n:"Strikethrough",f:function(ch){return ch==="\n"?ch:ch+"\u0336";}}
  ];
  function convert(s,fn){var r="";for(var i=0;i<s.length;i++){r+=fn(s[i]);}return r;}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
  function draw(){
    var t=document.getElementById("t-in").value;
    var wrap=document.getElementById("t-styles");
    if(!t){wrap.innerHTML='<p style="color:#8b90b8;font-size:.85rem">Start typing above to preview all styles.</p>';return;}
    wrap.innerHTML=STYLES.map(function(st,i){
      return '<div style="background:rgba(255,255,255,.04);border:1px solid var(--line,#2a2f55);border-radius:12px;padding:10px 12px"><div style="font-size:.72rem;color:#8b90b8;margin-bottom:6px;letter-spacing:.5px">'+st.n.toUpperCase()+'</div><div style="font-size:1.15rem;word-break:break-word;margin-bottom:8px" id="t-s'+i+'">'+esc(convert(t,st.f))+'</div><button class="tool-btn ghost" style="padding:6px 16px;font-size:.8rem" data-i="'+i+'">\uD83D\uDCCB Copy</button></div>';
    }).join("");
    var btns=wrap.querySelectorAll("button[data-i]");
    for(var b=0;b<btns.length;b++){
      (function(btn){
        btn.onclick=function(){
          var i=parseInt(btn.getAttribute("data-i"),10);
          var txt=document.getElementById("t-s"+i).textContent;
          copyText(txt,btn);
        };
      })(btns[b]);
    }
  }
  document.getElementById("t-in").addEventListener("input",draw);
  draw();
}});
TOOLS.push({ id:"payslip-gen", cat:"finance", icon:"🧾", name:"Free Salary Slip Generator Online",
desc:"Make a salary slip", how:"Enter name, month and pay details — get a clean printable slip.",
render:function(box){
box.innerHTML = '<h2>🧾 Salary Slip Generator</h2><div class="row"><div><label>Employee name</label><input id="t-n" placeholder="Your name"></div><div><label>Month</label><input id="t-m" placeholder="October 2026"></div></div><div class="row"><div><label>Basic pay</label><input type="number" id="t-b" placeholder="50000"></div><div><label>Allowances</label><input type="number" id="t-a" placeholder="15000"></div></div><div class="row"><div><label>Deductions</label><input type="number" id="t-d" placeholder="5000"></div><div><label>Currency</label><input id="t-c" value="$"></div></div><button class="tool-btn" id="t-go">Generate Slip</button><div class="tool-out" id="t-out"></div>';
el("t-go").onclick = function(){
  var n=el("t-n").value||"Employee", m=el("t-m").value||"", b=parseFloat(el("t-b").value)||0, a=parseFloat(el("t-a").value)||0, d=parseFloat(el("t-d").value)||0, c=el("t-c").value||"$";
  var net=b+a-d;
  outHTML(box, "<div style='border:2px dashed #a78bfa;border-radius:12px;padding:14px'><b>🧾 SALARY SLIP</b> "+esc(m)+"<br>"+esc(n)+"<hr>Basic: <b>"+c+b.toFixed(2)+"</b><br>Allowances: <b>"+c+a.toFixed(2)+"</b><br>Deductions: <b style='color:#f87171'>-"+c+d.toFixed(2)+"</b><hr>Net pay: <b style='color:#34d399;font-size:1.3rem'>"+c+net.toFixed(2)+"</b></div>");
};
}});
TOOLS.push({ id:"wirsa-calc", cat:"finance", icon:"\u2696\uFE0F", name:"Free Wirsa Inheritance Calculator Online",
desc:"Calculate Islamic inheritance (Wirsa) shares by Hanafi rules \u2014 instant, free",
how:"Choose the heirs (spouse, parents, sons, daughters) and enter the total estate value \u2014 each heir\u2019s Quranic share is calculated instantly.",
render:function(box){
box.innerHTML='<h2>\u2696\uFE0F Wirsa Calculator</h2><p style="color:#c7cbe8">Islamic inheritance shares (Hanafi school). <b>General information only \u2014 not a fatwa.</b></p>'
+'<div class="row"><div><label>Spouse</label><select id="wr-sp"><option value="n">None</option><option value="w">Wife</option><option value="h">Husband</option></select></div>'
+'<div><label>Father alive</label><select id="wr-fa"><option value="y">Yes</option><option value="n">No</option></select></div>'
+'<div><label>Mother alive</label><select id="wr-mo"><option value="y">Yes</option><option value="n">No</option></select></div>'
+'<div><label>Sons</label><input type="number" id="wr-sn" value="0" min="0" max="20"></div>'
+'<div><label>Daughters</label><input type="number" id="wr-dn" value="0" min="0" max="20"></div>'
+'<div><label>Total estate (Rs)</label><input type="number" id="wr-tv" value="1000000" min="0"></div></div>'
+'<button class="tool-btn" id="wr-go">Calculate shares</button><div class="tool-out" id="wr-out"></div>';
function pct(f){return (f*100).toFixed(2)+"%";}
function fmt(n){return Math.round(n).toLocaleString("en-US");}
el("wr-go").onclick=function(){
var sp=el("wr-sp").value,fa=el("wr-fa").value==="y",mo=el("wr-mo").value==="y";
var sn=Math.max(0,parseInt(el("wr-sn").value,10)||0),dn=Math.max(0,parseInt(el("wr-dn").value,10)||0);
var tv=parseFloat(el("wr-tv").value)||0;
var C=(sn+dn)>0,rows=[],used=0,note="";
function fr(nm,f){rows.push({n:nm,f:f});used+=f;}
if(sp==="w")fr("Wife",C?1/8:1/4);
if(sp==="h")fr("Husband",C?1/4:1/2);
if(mo)fr("Mother",C?1/6:1/3);
if(sn>0){
  if(fa)fr("Father",1/6);
  var rs=1-used,u=sn*2+dn;
  rows.push({n:"Sons \u2014 total ("+sn+")",f:rs*2*sn/u});
  if(dn>0)rows.push({n:"Daughters \u2014 total ("+dn+")",f:rs*dn/u});
}else if(dn>0){
  fr("Daughters (fixed share)",dn>=2?2/3:1/2);
  var r1=1-used;
  if(fa)rows.push({n:"Father (fixed + residue)",f:1/6+r1});
  else note="Residue of "+pct(r1)+" left \u2014 with daughters only and no father, a scholar\u2019s ruling (radd/return) is needed.";
}else{
  var r2=1-used;
  if(fa)rows.push({n:"Father (fixed + residue)",f:1/6+r2});
  else note="Residue of "+pct(r2)+" undistributed \u2014 with no children and no father, consult a qualified scholar.";
}
if(!rows.length){box.querySelector("#wr-out").innerHTML="Please select at least one heir.";return;}
var tot=rows.reduce(function(a,r){return a+r.f;},0),awl=tot>1.000001,sc=awl?1/tot:1;
var html="<b>Shares of Rs "+fmt(tv)+":</b><br><br>";
if(awl)html+="<i>\u2018Awl applied \u2014 fixed shares exceeded 100%, scaled down proportionally.</i><br><br>";
rows.forEach(function(r){var f=r.f*sc;html+="<div style='padding:8px;border:1px solid var(--line);border-radius:10px;margin:6px 0'>"+r.n+": <b>"+pct(f)+"</b> = Rs "+fmt(tv*f)+"</div>";});
if(note)html+="<br><i>"+note+"</i>";
html+="<br><span style='font-size:.82rem;color:#a7a7c8'>General information only \u2014 not a fatwa. Debts and bequests are settled before distribution. For complex cases (debts, wills, predeceased heirs) consult a qualified scholar/mufti.</span>";
box.querySelector("#wr-out").innerHTML=html;
};}});
TOOLS.push({ id:"udhaar-khata", cat:"finance", icon:"\uD83D\uDCD2", name:"Free Udhaar Khata Ledger Online",
desc:"Shop credit ledger \u2014 track customer udhaar, payments & dues. 100% private, on your device",
how:"Add customer name, amount and date. Tick \u2018Paid\u2019 when settled. Search by name, see total outstanding instantly. Everything stays in your browser \u2014 no account, no server.",
render:function(box){
var K="sawalai_udhaar_khata";
function load(){try{return JSON.parse(localStorage.getItem(K))||[]}catch(e){return[]}}
function save(a){try{localStorage.setItem(K,JSON.stringify(a))}catch(e){}}
box.innerHTML='<h2>\uD83D\uDCD2 Udhaar Khata</h2><p style="color:#c7cbe8">Your shop credit ledger. <b>100% private \u2014 data never leaves this device.</b></p>'
+'<div class="row"><div><label>Customer name</label><input type="text" id="uk-nm" placeholder="e.g. Ahmed"></div>'
+'<div><label>Amount (Rs)</label><input type="number" id="uk-am" min="0" placeholder="0"></div>'
+'<div><label>Date</label><input type="date" id="uk-dt"></div></div>'
+'<button class="tool-btn" id="uk-add">+ Add entry</button>'
+'<div class="row" style="margin-top:12px"><div><label>\uD83D\uDD0D Search customer</label><input type="text" id="uk-s" placeholder="Type name..."></div></div>'
+'<div id="uk-tot" style="font-size:1.25rem;font-weight:800;margin:12px 0;color:#a5b4fc"></div><div id="uk-list"></div>';
function draw(){
var q=(el("uk-s").value||"").toLowerCase(),all=load(),tot=0,html="",shown=0;
all.forEach(function(e,i){
if(!e.paid)tot+=e.amt;
if(q&&String(e.nm).toLowerCase().indexOf(q)<0)return;shown++;
html+='<div style="display:flex;gap:8px;align-items:center;padding:9px;border:1px solid var(--line);border-radius:10px;margin:6px 0;'+(e.paid?'opacity:.55':'')+'">'
+'<div style="flex:1"><b>'+esc(e.nm)+'</b> \u2014 Rs '+Number(e.amt).toLocaleString("en-US")+' <span style="color:#a7a7c8;font-size:.82rem">'+esc(e.dt)+'</span> '+(e.paid?'<span style="color:#34d399">\u2705 Paid</span>':'<span style="color:#fbbf24">\u23F3 Due</span>')+'</div>'
+'<button class="tool-btn ghost" style="margin:0;padding:7px 12px" data-p="'+i+'">'+(e.paid?'\u21A9 Undo':'\u2705 Paid')+'</button>'
+'<button class="tool-btn ghost" style="margin:0;padding:7px 12px" data-d="'+i+'">\uD83D\uDDD1</button></div>';
});
el("uk-tot").textContent="Total outstanding: Rs "+tot.toLocaleString("en-US")+" ("+all.filter(function(e){return !e.paid}).length+" unpaid)";
el("uk-list").innerHTML=html||'<p style="color:#a7a7c8">No entries yet.</p>';
var btns=el("uk-list").querySelectorAll("button");
for(var b=0;b<btns.length;b++){btns[b].onclick=function(){var a=load();
if(this.hasAttribute("data-p")){var i=+this.getAttribute("data-p");a[i].paid=!a[i].paid;}
else{a.splice(+this.getAttribute("data-d"),1);}
save(a);draw();};}
}
el("uk-add").onclick=function(){
var nm=el("uk-nm").value.trim(),am=parseFloat(el("uk-am").value)||0,dt=el("uk-dt").value||new Date().toISOString().slice(0,10);
if(!nm||am<=0)return;
var a=load();a.unshift({nm:nm,amt:am,dt:dt,paid:false});save(a);
el("uk-nm").value="";el("uk-am").value="";draw();};
el("uk-s").oninput=draw;
el("uk-dt").value=new Date().toISOString().slice(0,10);
draw();
}});
TOOLS.push({ id:"committee-hisab", cat:"finance", icon:"\uD83D\uDCB0", name:"Free Committee (BC) Planner Online",
desc:"Plan your rotating savings committee \u2014 full payout schedule in one minute",
how:"Enter members, monthly installment and start month \u2014 get the complete schedule: who receives which month and the total pool. Saved on your device.",
render:function(box){
var K="sawalai_committee";
box.innerHTML='<h2>\uD83D\uDCB0 Committee Hisab</h2><p style="color:#c7cbe8">Rotating savings (BC / committee) planner. Calculation only \u2014 not financial advice.</p>'
+'<div class="row"><div><label>Members</label><input type="number" id="cm-n" value="10" min="2" max="50"></div>'
+'<div><label>Monthly installment (Rs)</label><input type="number" id="cm-am" value="5000" min="0"></div>'
+'<div><label>Start month</label><input type="month" id="cm-sm"></div></div>'
+'<div><label>Member names (one per line, optional)</label><textarea id="cm-nm" rows="3" placeholder="Ayesha\nBilal\n..."></textarea></div>'
+'<button class="tool-btn" id="cm-go">Generate schedule</button><div class="tool-out" id="cm-out"></div>';
el("cm-go").onclick=function(){
var n=Math.min(50,Math.max(2,parseInt(el("cm-n").value,10)||10)),am=parseFloat(el("cm-am").value)||0;
var sm=el("cm-sm").value||new Date().toISOString().slice(0,7);
var names=el("cm-nm").value.split("\n").map(function(s){return s.trim();}).filter(Boolean);
var pool=n*am;
var html="<b>Pool per month: Rs "+pool.toLocaleString("en-US")+"</b> ("+n+" members \u00D7 Rs "+am.toLocaleString("en-US")+"). Each member pays Rs "+(n*am).toLocaleString("en-US")+" in total over the cycle and receives the full pool once.<br><br>";
html+='<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:.88rem"><tr><th style="text-align:left;padding:8px;border-bottom:1px solid var(--line)">#</th><th style="text-align:left;padding:8px;border-bottom:1px solid var(--line)">Month</th><th style="text-align:left;padding:8px;border-bottom:1px solid var(--line)">Receiver</th><th style="text-align:right;padding:8px;border-bottom:1px solid var(--line)">Payout</th></tr>';
var d=new Date(sm+"-01T00:00:00");
var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
for(var i=0;i<n;i++){
var who=names[i]||("Member "+(i+1));
html+="<tr><td style='padding:8px;border-bottom:1px solid var(--line)'>"+(i+1)+"</td><td style='padding:8px;border-bottom:1px solid var(--line)'>"+months[d.getMonth()]+" "+d.getFullYear()+"</td><td style='padding:8px;border-bottom:1px solid var(--line)'><b>"+esc(who)+"</b></td><td style='padding:8px;border-bottom:1px solid var(--line);text-align:right'>Rs "+pool.toLocaleString("en-US")+"</td></tr>";
d.setMonth(d.getMonth()+1);
}
html+="</table></div><br><span style='font-size:.82rem;color:#a7a7c8'>Tip: keep the receiver order in writing \u2014 verbal promises cause most committee disputes. Saved on this device.</span>";
box.querySelector("#cm-out").innerHTML=html;
try{localStorage.setItem(K,JSON.stringify({n:n,am:am,sm:sm,names:names}))}catch(e){}
};
try{var p=JSON.parse(localStorage.getItem(K)||"null");if(p){el("cm-n").value=p.n;el("cm-am").value=p.am;el("cm-sm").value=p.sm;el("cm-nm").value=(p.names||[]).join("\n");}}catch(e){}
}});
TOOLS.push({ id:"dastavezat", cat:"text", icon:"\uD83D\uDCC4", name:"Dastavezat Ghar \u2014 Free Document Templates",
desc:"Original leave, fee, affidavit & rent agreement templates \u2014 fill, copy, print",
how:"Pick a template, fill the blanks, then copy or print it. 100% original templates written by US AI \u2014 no copyrighted formats.",
render:function(box){
var T=[
{name:"Leave Application",icon:"\uD83C\uDFEB",fields:[["name","Your name"],["cls","Class / designation"],["days","Number of days"],["from","From date"],["to","To date"],["reason","Reason"]],
tpl:function(v){return "To\nThe Principal / Manager\n[School / Office Name]\n\nSubject: Application for leave of "+v.days+" day(s)\n\nRespected Sir / Madam,\n\nI, "+v.name+" ("+v.cls+"), request leave from "+v.from+" to "+v.to+" ("+v.days+" days) due to "+v.reason+".\n\nI will complete all pending work on my return. Kindly grant me leave for the above days.\n\nThanking you.\n\nYours obediently,\n"+v.name+"\nDate: "+v.today;}},
{name:"Fee Concession Request",icon:"\uD83D\uDCB3",fields:[["name","Your name (parent)"],["student","Student name"],["cls","Class"],["roll","Roll no"],["amount","Monthly fee (Rs)"],["pct","Concession % requested"],["reason","Reason"]],
tpl:function(v){return "To\nThe Principal\n[School Name]\n\nSubject: Request for fee concession\n\nRespected Sir / Madam,\n\nI, "+v.name+", parent of "+v.student+" (Class "+v.cls+", Roll No. "+v.roll+"), respectfully request a concession in the school fee. Due to "+v.reason+", it is difficult for our family to pay the full fee of Rs "+v.amount+" per month.\n\nI request a concession of "+v.pct+"%. I assure you of my child\u2019s dedication to studies and shall remain grateful for your kind consideration.\n\nYours faithfully,\n"+v.name+"\nDate: "+v.today;}},
{name:"Affidavit (Halafnama)",icon:"\u2696\uFE0F",fields:[["name","Your name"],["father","Father name"],["cnic","CNIC no."],["address","Address"],["fact","Statement of fact"],["city","City"]],
tpl:function(v){return "AFFIDAVIT\n\nI, "+v.name+", son/daughter of "+v.father+", holder of CNIC No. "+v.cnic+", resident of "+v.address+", do hereby solemnly affirm and declare as under:\n\n1. That "+v.fact+".\n2. That the contents of this affidavit are true and correct to the best of my knowledge and belief.\n3. That nothing material has been concealed from the concerned authority.\n\nDeponent\n"+v.name+"\n\nVerification:\nVerified at "+v.city+" on "+v.today+" that the contents of this affidavit are true to the best of my knowledge.\n\nDeponent\n"+v.name+"\n\nNote: general template for personal reference \u2014 get it attested by an oath commissioner for legal use.";}},
{name:"Rent Agreement (Kirayanama)",icon:"\uD83C\uDFE0",fields:[["ld","Landlord name"],["lcnic","Landlord CNIC"],["tn","Tenant name"],["tcnic","Tenant CNIC"],["prop","Property address"],["descp","Property description"],["rent","Monthly rent (Rs)"],["dur","Duration"],["sdate","Start date"],["edate","End date"],["dep","Security deposit (Rs)"]],
tpl:function(v){return "RENT AGREEMENT\n\nThis agreement is made on "+v.today+" between:\n\nLANDLORD: "+v.ld+" (CNIC "+v.lcnic+")\nTENANT: "+v.tn+" (CNIC "+v.tcnic+")\n\nProperty: "+v.prop+" ("+v.descp+")\n\nTerms:\n1. Monthly rent: Rs "+v.rent+", payable by the 5th of each month.\n2. Duration: "+v.dur+", from "+v.sdate+" to "+v.edate+".\n3. Security deposit: Rs "+v.dep+", refundable after dues clearance.\n4. Utility bills (electricity, gas, water) will be paid by the Tenant.\n5. The Tenant will not sublet without written permission.\n6. Either party may end this agreement with one month\u2019s written notice.\n\nLandlord: _______________    Tenant: _______________\nWitness 1: _______________    Witness 2: _______________\n\nNote: general template for personal reference \u2014 consult a legal professional for registered agreements.";}}
];
var tabs="",i;
for(i=0;i<T.length;i++)tabs+='<button class="tool-btn'+(i?' ghost':'')+'" style="margin:4px 6px 4px 0" data-t="'+i+'">'+T[i].icon+' '+T[i].name+'</button>';
box.innerHTML='<h2>\uD83D\uDCC4 Dastavezat Ghar</h2><p style="color:#c7cbe8">Original document templates \u2014 fill the blanks, copy or print. <b>Written by US AI, free forever.</b></p>'
+'<div id="dz-tabs">'+tabs+'</div><div id="dz-form"></div>'
+'<div class="tool-out" id="dz-out" style="white-space:pre-wrap"></div>'
+'<div id="dz-btns" style="display:none"><button class="tool-btn" id="dz-copy">\uD83D\uDCCB Copy text</button> <button class="tool-btn ghost" id="dz-print">\uD83D\uDDA8\uFE0F Print</button></div>';
var cur=0;
function show(k){
cur=k;
var t=T[k],h='<div class="row">';
t.fields.forEach(function(f,j){h+='<div><label>'+f[1]+'</label><input type="text" id="dz-f'+j+'"></div>';});
h+='<div><label>Date</label><input type="date" id="dz-today"></div></div>';
el("dz-form").innerHTML=h;
el("dz-today").value=new Date().toISOString().slice(0,10);
var btns=el("dz-tabs").querySelectorAll("button");
for(var b=0;b<btns.length;b++){btns[b].classList.toggle("ghost",+btns[b].getAttribute("data-t")!==k);btns[b].onclick=function(){show(+this.getAttribute("data-t"));render();};}
render();
}
function vals(){
var t=T[cur],v={today:el("dz-today").value||new Date().toISOString().slice(0,10)};
t.fields.forEach(function(f,j){v[f[0]]=el("dz-f"+j).value.trim()||("["+f[1]+"]");});
return v;
}
function render(){
var t=T[cur];
el("dz-out").textContent=t.tpl(vals());
el("dz-btns").style.display="";
}
el("dz-form").addEventListener("input",render);
el("dz-copy").onclick=function(){var tx=el("dz-out").textContent;if(navigator.clipboard)navigator.clipboard.writeText(tx);this.textContent="\u2705 Copied!";var s=this;setTimeout(function(){s.textContent="\uD83D\uDCCB Copy text";},1500);};
el("dz-print").onclick=function(){var w=window.open("","_blank");w.document.write("<pre style='font-family:Georgia,serif;line-height:1.7;max-width:700px;margin:40px auto'>"+el("dz-out").textContent.replace(/&/g,"&amp;").replace(/</g,"&lt;")+"</pre>");w.document.close();w.print();};
show(0);
}});
TOOLS.push({ id:"packing-checklist", cat:"smart", icon:"\uD83E\uDDF3", name:"Free Safar Packing Checklist Online",
desc:"Never forget anything \u2014 smart packing lists for Umrah, business, family & student trips",
how:"Pick your trip type \u2014 tick items as you pack. Your progress is saved on this device.",
render:function(box){
var P={
umrah:{n:"\uD83D\uDD4B Umrah",c:{Documents:["Passport","Umrah visa printout","Flight tickets","Hotel booking printout","CNIC copy","Vaccination certificate"],Health:["Regular medicines","Pain reliever","ORS sachets","Band-aids","Moisturizer","Tissues"],Electronics:["Phone charger","Power bank","Universal adapter","Earbuds"],Clothing:["Ihram (2 sets)","Comfortable sandals","Light cotton clothes","Prayer mat","Unscented soap"],Money:["Saudi Riyals cash","Debit card","Money belt"]}},
business:{n:"\uD83D\uDCBC Business",c:{Documents:["Passport","Visa","Flight tickets","Hotel booking","Business cards","Meeting agenda printout"],Electronics:["Laptop + charger","Phone charger","Power bank","Universal adapter","Headphones"],Clothing:["Formal suits (2)","Formal shoes","Casual clothes","Tie / scarf","Belt"],Toiletries:["Shaving kit","Deodorant","Toothbrush & paste","Comb"],Money:["Forex card","Local currency cash","Credit cards"]}},
family:{n:"\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 Family",c:{Documents:["Passports","Flight tickets","Hotel booking","Kids\u2019 ID copies","Travel insurance"],Kids:["Diapers & wipes","Snacks","Toys / coloring books","Extra clothes set","Milk bottles / formula"],Electronics:["Chargers","Power bank","Tablet for kids","Camera"],Clothing:["Outfits per day + 2 extra","Jackets","Comfortable walking shoes","Sleepwear"],Health:["First-aid kit","Kids\u2019 medicines","Sunscreen","Mosquito repellent"],Money:["Cash","Cards","Emergency contact list"]}},
student:{n:"\uD83C\uDF93 Student",c:{Documents:["Passport","Student visa","Admission letter","Fee receipts","Academic transcripts","Passport photos"],Electronics:["Laptop + charger","Phone + charger","Power bank","Universal adapter","USB drive"],Clothing:["Seasonal clothes","One formal outfit","Comfortable shoes","Jacket / sweater"],Kitchen:["Basic utensils","Spices pack","Electric kettle (check dorm rules)","Lunch box"],Money:["Forex card","Initial cash","Bank account documents"]}}
};
var K="sawalai_packing";
function load(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}}
function save(s){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}}
box.innerHTML='<h2>\uD83E\uDDF3 Safar Packing Checklist</h2><p style="color:#c7cbe8">Tick as you pack \u2014 progress saves on this device.</p>'
+'<div class="row"><div><label>Trip type</label><select id="pk-p"><option value="umrah">\uD83D\uDD4B Umrah</option><option value="business">\uD83D\uDCBC Business</option><option value="family">\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 Family</option><option value="student">\uD83C\uDF93 Student</option></select></div></div>'
+'<div style="background:rgba(255,255,255,.06);border-radius:999px;height:16px;margin:14px 0;overflow:hidden"><div id="pk-bar" style="height:100%;width:0%;background:var(--grad);transition:width .4s"></div></div>'
+'<div id="pk-txt" style="font-weight:800;margin-bottom:10px"></div><div id="pk-list"></div>';
function draw(){
var pr=el("pk-p").value,state=load(),key="pk_"+pr,done=state[key]||{},cats=P[pr].c,total=0,nd=0,html="";
for(var cat in cats){html+="<h3 style='margin:16px 0 6px'>"+cat+"</h3>";cats[cat].forEach(function(it){
total++;var id=key+"_"+it;if(done[it])nd++;
html+='<label style="display:flex;gap:10px;align-items:center;padding:8px;border:1px solid var(--line);border-radius:10px;margin:6px 0;cursor:pointer;'+(done[it]?'opacity:.55;text-decoration:line-through':'')+'"><input type="checkbox" data-it="'+it.replace(/"/g,"&quot;")+'" '+(done[it]?'checked':'')+' style="width:18px;height:18px"> '+it+'</label>';});}
el("pk-list").innerHTML=html;
var pc=total?Math.round(nd/total*100):0;
el("pk-bar").style.width=pc+"%";
el("pk-txt").textContent=pc+"% ready \u2014 "+(total-nd)+" of "+total+" items left"+(pc===100?" \uD83C\uDF89 All packed!":"");
var cbs=el("pk-list").querySelectorAll("input[type=checkbox]");
for(var i=0;i<cbs.length;i++){cbs[i].onchange=function(){var s=load(),k="pk_"+el("pk-p").value;s[k]=s[k]||{};s[k][this.getAttribute("data-it")]=this.checked;save(s);draw();};}
}
el("pk-p").onchange=draw;
draw();
}});
TOOLS.push({ id:"pak-kaam-links", cat:"site", icon:"\uD83D\uDD17", name:"Kaam ke Links \u2014 Official Pakistan Sites",
desc:"NADRA, passport, FBR, bills & courier tracking \u2014 only official links, one place",
how:"Official links only: government services, utility bill checks and courier tracking. Every link opens the real official site in a new tab.",
render:function(box){
var G=[
["\uD83C\uDFDB\uFE0F Sarkari (Government)",[["NADRA","https://www.nadra.gov.pk","ID cards, family registration"],["Passport (DGIP)","https://dgip.gov.pk","Passport application & tracking"],["FBR","https://www.fbr.gov.pk","Tax returns, ATL status"],["HEC","https://www.hec.gov.pk","Degree verification"]]],
["\uD83D\uDCA1 Bills (Bijli / Gas / PTCL)",[["LESCO","https://www.lesco.com.pk","Lahore electricity bill"],["IESCO","https://www.iesco.com.pk","Islamabad electricity bill"],["GEPCO","https://www.gepco.com.pk","Gujranwala electricity bill"],["MEPCO","https://www.mepco.com.pk","Multan electricity bill"],["PTCL","https://www.ptcl.com.pk","Phone / internet bill"],["SNGPL","https://www.sngpl.com.pk","Sui Northern gas bill"],["SSGC","https://www.ssgc.com.pk","Sui Southern gas bill"]]],
["\uD83D\uDCE6 Courier Tracking",[["TCS","https://www.tcs.com.pk","Track TCS parcels"],["Leopards Courier","https://www.leopardscourier.com","Track Leopards parcels"],["PostEx","https://postex.pk","Track PostEx parcels"]]]
];
var html='<h2>\uD83D\uDD17 Kaam ke Links</h2><p style="color:#c7cbe8">Only <b>official</b> websites \u2014 beware of fake lookalike sites. Every link opens in a new tab.</p>';
G.forEach(function(g){
html+="<h3 style='margin:18px 0 8px'>"+g[0]+"</h3><div style='display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px'>";
g[1].forEach(function(l){
html+='<a href="'+l[1]+'" target="_blank" rel="noopener" style="display:block;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:12px;padding:12px;text-decoration:none;color:var(--text)"><b>'+l[0]+'</b><br><span style="font-size:.8rem;color:#a7a7c8">'+l[2]+'</span><br><span style="font-size:.78rem;color:#34d399">Official site \u2197</span></a>';
});
html+="</div>";
});
html+="<p class='tiny' style='margin-top:14px;color:#a7a7c8'>Tip: always check the website address carefully \u2014 scammers copy official designs on fake domains.</p>";
box.innerHTML=html;
}});

/* Batch-7 2026-10-12 (additive): 7 new standalone tools. */
TOOLS.push({ id:"study-planner", cat:"education", icon:"📚", name:"Free Study Session Planner Online",
desc:"Exam countdown + weighted topic scheduler",
how:"Set your exam date, add topics with priority weights and session counts, and get a daily pomodoro-block plan with per-topic progress. Device-local.",
render:function(box){ box.innerHTML='<h2>📚 Free Study Session Planner Online</h2><p style="color:#c7cbe8">Exam countdown + weighted topic scheduler</p><a class="tool-btn" href="tool-study-planner.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"car-maintenance", cat:"lifestyle", icon:"🚗", name:"Free Car Maintenance Log Online",
desc:"Service records + mileage oil reminders",
how:"Log oil changes, tires, brakes and services per car. Oil reminders every 5,000 miles, cost-per-mile stats, service timeline. Device-local.",
render:function(box){ box.innerHTML='<h2>🚗 Free Car Maintenance Log Online</h2><p style="color:#c7cbe8">Service records + mileage oil reminders</p><a class="tool-btn" href="tool-car-maintenance.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"tip-jar-split", cat:"finance", icon:"🫙", name:"Free Tip Jar Splitter Online",
desc:"Split shift tips by hours x role weight",
how:"Divide shift tips fairly by hours worked times role weight, with cash-friendly whole-dollar rounding. USA tipping culture. Device-local.",
render:function(box){ box.innerHTML='<h2>🫙 Free Tip Jar Splitter Online</h2><p style="color:#c7cbe8">Split shift tips by hours x role weight</p><a class="tool-btn" href="tool-tip-jar-split.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"plant-notes", cat:"lifestyle", icon:"🌱", name:"Free Houseplant Care Cards Online",
desc:"Care guides + watering schedule + diary",
how:"Original care summaries for 8 popular species, your own plant shelf with auto watering reminders, and a plant diary. Device-local.",
render:function(box){ box.innerHTML='<h2>🌱 Free Houseplant Care Cards Online</h2><p style="color:#c7cbe8">Care guides + watering schedule + diary</p><a class="tool-btn" href="tool-plant-notes.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"wedding-budget", cat:"lifestyle", cat2:"finance", icon:"💒", name:"Free Wedding Budget Tracker Online",
desc:"Categories + per-guest cost + vendors",
how:"Category budgets with spend-vs-budget bars, per-guest cost math, deposit/paid vendor tracking. USD-first, device-local.",
render:function(box){ box.innerHTML='<h2>💒 Free Wedding Budget Tracker Online</h2><p style="color:#c7cbe8">Categories + per-guest cost + vendors</p><a class="tool-btn" href="tool-wedding-budget.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"phrase-survival", cat:"travel", icon:"🗣️", name:"Free Travel Phrase Survival Kit Online",
desc:"ES/FR/IT/DE/JA phrases with tap-to-hear",
how:"Essential travel phrases in Spanish, French, Italian, German and Japanese with phonetics. Tap to hear via your device speech. Favorites saved locally.",
render:function(box){ box.innerHTML='<h2>🗣️ Free Travel Phrase Survival Kit Online</h2><p style="color:#c7cbe8">ES/FR/IT/DE/JA phrases with tap-to-hear</p><a class="tool-btn" href="tool-phrase-survival.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"password-pro", cat:"security", icon:"🔐", name:"Free Password Strength Analyzer Pro Online",
desc:"Entropy meter + weak-pattern warnings",
how:"Entropy-based strength analysis, weak-pattern warnings (substitutions, keyboard walks, dates), crack-time estimates and passphrase generator. Pattern check only — never enter real passwords.",
render:function(box){ box.innerHTML='<h2>🔐 Free Password Strength Analyzer Pro Online</h2><p style="color:#c7cbe8">Entropy meter + weak-pattern warnings</p><a class="tool-btn" href="tool-password-pro.html">Open the full tool \u2192</a>'; } });
/* Batch-6 2026-10-12 (additive): 5 new standalone tools — pages are full tools; inline render links out. */
TOOLS.push({ id:"hiit-timer", cat:"health", icon:"🏋️", name:"Free HIIT & Tabata Workout Timer Online",
desc:"Interval workout timer with beeps & round ring",
how:"Pick a preset or set your own work/rest/rounds. Follow the big timer, progress ring and exercise cards. A rough calorie estimate appears at the end.",
render:function(box){ box.innerHTML='<h2>🏋️ Free HIIT & Tabata Workout Timer Online</h2><p style="color:#c7cbe8">Interval workout timer with beeps & round ring</p><a class="tool-btn" href="tool-hiit-timer.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"focus-sounds", cat:"productivity", icon:"🎧", name:"Free Focus Sounds — Rain, Café, White Noise",
desc:"Ambient sounds synthesized live in your browser",
how:"Press Play mix and blend rain, café, white noise and night crickets with the sliders. Set a sleep timer to auto-stop. Zero audio files — all synthesized.",
render:function(box){ box.innerHTML='<h2>🎧 Free Focus Sounds — Rain, Café, White Noise</h2><p style="color:#c7cbe8">Ambient sounds synthesized live in your browser</p><a class="tool-btn" href="tool-focus-sounds.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"compare-slider", cat:"media", icon:"🖼️", name:"Free Before/After Image Compare Slider",
desc:"Draggable before/after reveal, PNG export",
how:"Upload two images (they never leave your device), drag the glowing handle, tap labels to rename, then download a comparison PNG.",
render:function(box){ box.innerHTML='<h2>🖼️ Free Before/After Image Compare Slider</h2><p style="color:#c7cbe8">Draggable before/after reveal, PNG export</p><a class="tool-btn" href="tool-compare-slider.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"sleep-calculator", cat:"health", icon:"🌙", name:"Free Sleep Cycle Calculator",
desc:"Best bedtimes & wake times from 90-min cycles",
how:"Enter your wake-up time for ideal bedtimes, or tap 'I sleep now' for the best alarm times. Based on average 90-minute sleep cycles.",
render:function(box){ box.innerHTML='<h2>🌙 Free Sleep Cycle Calculator</h2><p style="color:#c7cbe8">Best bedtimes & wake times from 90-min cycles</p><a class="tool-btn" href="tool-sleep-calculator.html">Open the full tool \u2192</a>'; } });
TOOLS.push({ id:"fuel-calculator", cat:"travel", icon:"🚗", name:"Free Road Trip Fuel Cost Calculator (USA)",
desc:"Miles + MPG + gas price, per-person split",
how:"Enter miles and gas price, pick your US car for MPG (or type it), toggle round trip and split the cost between up to 6 people.",
render:function(box){ box.innerHTML='<h2>🚗 Free Road Trip Fuel Cost Calculator (USA)</h2><p style="color:#c7cbe8">Miles + MPG + gas price, per-person split</p><a class="tool-btn" href="tool-fuel-calculator.html">Open the full tool \u2192</a>'; } });
/* PQA-tools 2026-10-12 (additive): chmod/serp/date-diff pushes land AFTER the earlier
   runtime dedupe (~line 5430), so they slipped through and render 9 duplicate cards.
   Re-run the same first-occurrence dedupe after ALL pushes. No existing code touched. */
(function(){var seen={},u=[];TOOLS.forEach(function(t){if(!seen[t.id]){seen[t.id]=1;u.push(t);}});TOOLS.length=0;Array.prototype.push.apply(TOOLS,u);})();
