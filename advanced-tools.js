/* US AI Advanced Tools & Generators — 50 tools, all client-side. */
(function () {
"use strict";

var CATS = [
  { id: "all", name: "All" },
  { id: "docs", name: "📄 Document Generators" },
  { id: "fin", name: "💰 Financial & Business" },
  { id: "fun", name: "🎮 Fun & Games" },
  { id: "health", name: "💪 Health & Fitness" },
  { id: "site", name: "🌐 Site Add-ons" }
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
function money(n) { return "Rs " + Number(n||0).toLocaleString("en-PK",{maximumFractionDigits:2}); }

/* ---------- MD5 (self-contained) ---------- */
function md5cycle(x,k){var a=x[0],b=x[1],c=x[2],d=x[3];
a=md5ff(a,b,c,d,k[0],7,-680876936);d=md5ff(d,a,b,c,k[1],12,-389564586);c=md5ff(c,d,a,b,k[2],17,606105819);b=md5ff(b,c,d,a,k[3],22,-1044525330);
a=md5ff(a,b,c,d,k[4],7,-176418897);d=md5ff(d,a,b,c,k[5],12,1200080426);c=md5ff(c,d,a,b,k[6],17,-1473231341);b=md5ff(b,c,d,a,k[7],22,-45705983);
a=md5ff(a,b,c,d,k[8],7,1770035416);d=md5ff(d,a,b,c,k[9],12,-1958414417);c=md5ff(c,d,a,b,k[10],17,-42063);b=md5ff(b,c,d,a,k[11],22,-1990404162);
a=md5ff(a,b,c,d,k[12],7,1804603682);d=md5ff(d,a,b,c,k[13],12,-40341101);c=md5ff(c,d,a,b,k[14],17,-1502002290);b=md5ff(b,c,d,a,k[15],22,1236535329);
a=md5gg(a,b,c,d,k[1],5,-165796510);d=md5gg(d,a,b,c,k[6],9,-1069501632);c=md5gg(c,d,a,b,k[11],14,643717713);b=md5gg(b,c,d,a,k[0],20,-373897302);
a=md5gg(a,b,c,d,k[5],5,-701558691);d=md5gg(d,a,b,c,k[10],9,38016083);c=md5gg(c,d,a,b,k[15],14,-660478335);b=md5gg(b,c,d,a,k[4],20,-405537848);
a=md5gg(a,b,c,d,k[9],5,568446438);d=md5gg(d,a,b,c,k[14],9,-1019803690);c=md5gg(c,d,a,b,k[3],14,-187363961);b=md5gg(b,c,d,a,k[8],20,1163531501);
a=md5gg(a,b,c,d,k[13],5,-1444681467);d=md5gg(d,a,b,c,k[2],9,-51403784);c=md5gg(c,d,a,b,k[7],14,1735328473);b=md5gg(b,c,d,a,k[12],20,-1926607734);
a=md5hh(a,b,c,d,k[5],4,-378558);d=md5hh(d,a,b,c,k[8],11,-2022574463);c=md5hh(c,d,a,b,k[11],16,1839030562);b=md5hh(b,c,d,a,k[14],23,-35309556);
a=md5hh(a,b,c,d,k[1],4,-1530992060);d=md5hh(d,a,b,c,k[4],11,1272893353);c=md5hh(c,d,a,b,k[7],16,-155497632);b=md5hh(b,c,d,a,k[10],23,-1094730640);
a=md5hh(a,b,c,d,k[13],4,681279174);d=md5hh(d,a,b,c,k[0],11,-358537222);c=md5hh(c,d,a,b,k[3],16,-722521979);b=md5hh(b,c,d,a,k[6],23,76029189);
a=md5hh(a,b,c,d,k[9],4,-640364487);d=md5hh(d,a,b,c,k[12],11,-421815835);c=md5hh(c,d,a,b,k[15],16,530742520);b=md5hh(b,c,d,a,k[2],23,-995338651);
a=md5ii(a,b,c,d,k[0],6,-198630844);d=md5ii(d,a,b,c,k[7],10,1126891415);c=md5ii(c,d,a,b,k[14],15,-1416354905);b=md5ii(b,c,d,a,k[5],21,-57434055);
a=md5ii(a,b,c,d,k[12],6,1700485571);d=md5ii(d,a,b,c,k[3],10,-1894986606);c=md5ii(c,d,a,b,k[10],15,-1051523);b=md5ii(b,c,d,a,k[1],21,-2054922799);
a=md5ii(a,b,c,d,k[8],6,1873313359);d=md5ii(d,a,b,c,k[15],10,-30611744);c=md5ii(c,d,a,b,k[6],15,-1560198380);b=md5ii(b,c,d,a,k[13],21,1309151649);
a=md5ii(a,b,c,d,k[4],6,-145523070);d=md5ii(d,a,b,c,k[11],10,-1120210379);c=md5ii(c,d,a,b,k[2],15,718787259);b=md5ii(b,c,d,a,k[9],21,-343485551);
x[0]=add32(a,x[0]);x[1]=add32(b,x[1]);x[2]=add32(c,x[2]);x[3]=add32(d,x[3]);}
function md5cmn(q,a,b,x,s,t){a=add32(add32(a,q),add32(x,t));return add32((a<<s)|(a>>>(32-s)),b);}
function md5ff(a,b,c,d,x,s,t){return md5cmn((b&c)|((~b)&d),a,b,x,s,t);}
function md5gg(a,b,c,d,x,s,t){return md5cmn((b&d)|(c&(~d)),a,b,x,s,t);}
function md5hh(a,b,c,d,x,s,t){return md5cmn(b^c^d,a,b,x,s,t);}
function md5ii(a,b,c,d,x,s,t){return md5cmn(c^(b|(~d)),a,b,x,s,t);}
function add32(a,b){var l=(a&0xffff)+(b&0xffff),m=(a>>16)+(b>>16)+(l>>16);return (m<<16)|(l&0xffff);}
function md5blk(s){var b=[],i;for(i=0;i<64;i+=4){b[i>>2]=s.charCodeAt(i)+(s.charCodeAt(i+1)<<8)+(s.charCodeAt(i+2)<<16)+(s.charCodeAt(i+3)<<24);}return b;}
function md51(s){var n=s.length,st=[1732584193,-271733879,-1732584194,271733878],i;for(i=64;i<=n;i+=64){md5cycle(st,md5blk(s.substring(i-64,i)));}s=s.substring(i-64);var tail=new Array(16);for(i=0;i<16;i++)tail[i]=0;for(i=0;i<s.length;i++)tail[i>>2]|=s.charCodeAt(i)<<((i%4)<<3);tail[i>>2]|=0x80<<((i%4)<<3);if(i>55){md5cycle(st,tail);for(i=0;i<16;i++)tail[i]=0;}tail[14]=n*8;md5cycle(st,tail);return st;}
function rhex(n){var s="",j;for(j=0;j<4;j++)s+=((n>>(j*8+4))&0x0f).toString(16)+((n>>(j*8))&0x0f).toString(16);return s;}
function md5(s){var x=md51(s),i;for(i=0;i<x.length;i++)x[i]=rhex(x[i]);return x.join("");}
function shaHash(algo,text,cb){
  if(window.crypto&&crypto.subtle&&crypto.subtle.digest){
    crypto.subtle.digest(algo,new TextEncoder().encode(text)).then(function(buf){
      cb(Array.prototype.map.call(new Uint8Array(buf),function(x){return("0"+x.toString(16)).slice(-2);}).join(""));
    },function(){cb("error");});
  } else cb("SHA needs a secure (HTTPS) page.");
}

/* ---------- Code128-B bar patterns ---------- */
var C128=[
"212222","222122","222221","121223","121322","131222","122213","122312","132212","221213",
"221312","231212","112232","122132","122231","113222","123122","123221","223211","221132",
"221231","213212","223112","312131","311222","321122","321221","312212","322112","322211",
"212123","212321","232121","111323","131123","131321","112313","132113","132311","211313",
"231113","231311","112133","112331","132131","113123","113321","133121","313121","211331",
"231131","213113","213311","213131","311123","311321","331121","312113","312311","332111",
"314111","221411","431111","111224","111422","121124","121421","141122","141221","112214",
"112412","122114","122411","142112","142211","241211","221114","413111","241112","134111",
"111242","121142","121241","114212","124112","124211","411212","421112","421211","212141",
"214121","412121","111143","111341","131141","114113","114311","411113","411311","113141",
"114131","311141","411131","211412","211214","211232","2331112"];
function code128Bars(text){
  var vals=[104],i,v;
  for(i=0;i<text.length;i++){ v=text.charCodeAt(i)-32; if(v<0||v>95) return null; vals.push(v); }
  var chk=104; for(i=1;i<vals.length;i++) chk+=vals[i]*i; vals.push(chk%103); vals.push(106);
  return vals;
}
function drawCode128(cv,text){
  var vals=code128Bars(text); if(!vals) return false;
  var ctx=cv.getContext("2d"), mw=2, x=20, h=cv.height-40;
  ctx.fillStyle="#fff"; ctx.fillRect(0,0,cv.width,cv.height); ctx.fillStyle="#000";
  vals.forEach(function(v){
    var p=C128[v];
    for(var i=0;i<p.length;i++){ var w=parseInt(p[i],10)*mw; if(i%2===0) ctx.fillRect(x,20,w,h); x+=w; }
  });
  ctx.font="16px monospace"; ctx.textAlign="center"; ctx.fillText(text, x/2+10, cv.height-8);
  return true;
}

var TOOLS = [];

/* ================= A. DOCUMENT GENERATORS ================= */

TOOLS.push({ id:"invoice", cat:"docs", icon:"💳", name:"Free Invoice Generator Online",
desc:"Create professional invoices in seconds — free, no signup",
render:function(box){
  box.innerHTML='<h2>🧾 Invoice Generator</h2>'
  +'<div class="row"><div><label>Your business</label><input type="text" id="t-b" placeholder="US AI Services"></div>'
  +'<div><label>Client name</label><input type="text" id="t-c" placeholder="Client name"></div></div>'
  +'<label>Items (one per line: description, qty, price)</label><textarea id="t-i" placeholder="Web design, 1, 50000\nHosting setup, 2, 5000"></textarea>'
  +'<div class="row"><div><label>Tax %</label><input type="number" id="t-x" value="0" min="0"></div>'
  +'<div><label>Invoice #</label><input type="text" id="t-n" value="INV-001"></div></div>'
  +'<button class="tool-btn" id="t-go">Generate Invoice</button>'
  +'<div id="t-prev"></div>'
  +'<div class="row no-print"><button class="tool-btn ghost" id="t-pr" style="display:none">🖨️ Print</button>'
  +'<button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download HTML</button></div>'
  +'<div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var b=el("t-b").value.trim()||"My Business", c=el("t-c").value.trim()||"Client";
    var lines=el("t-i").value.split("\n"), items=[], sub=0;
    lines.forEach(function(l){ var p=l.split(","); if(p.length>=3){ var q=parseFloat(p[1])||0, pr=parseFloat(p[2])||0;
      if(q>0&&pr>=0){ items.push({d:p[0].trim(),q:q,p:pr,t:q*pr}); sub+=q*pr; } } });
    if(!items.length){ outHTML(box,"Add at least one item (description, qty, price)."); return; }
    var tax=parseFloat(el("t-x").value)||0, taxA=sub*tax/100, total=sub+taxA;
    var rows=items.map(function(it,i){return "<tr><td>"+(i+1)+"</td><td>"+esc(it.d)+"</td><td>"+it.q+"</td><td>"+money(it.p)+"</td><td>"+money(it.t)+"</td></tr>";}).join("");
    var h='<div id="t-inv" style="background:#fff;color:#111;border-radius:10px;padding:26px;margin-top:16px;font-family:Georgia,serif">'
    +'<div style="display:flex;justify-content:space-between;border-bottom:3px solid #6366f1;padding-bottom:12px"><div><h3 style="margin:0;color:#4f46e5">'+esc(b)+'</h3><div style="font-size:.85rem;color:#555">INVOICE '+esc(el("t-n").value)+'</div></div>'
    +'<div style="text-align:right;font-size:.85rem;color:#555">Bill to:<br><b style="color:#111">'+esc(c)+'</b><br>'+new Date().toLocaleDateString()+'</div></div>'
    +'<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:.9rem"><tr style="background:#eef2ff"><th style="padding:8px;text-align:left">#</th><th style="padding:8px;text-align:left">Item</th><th style="padding:8px">Qty</th><th style="padding:8px">Price</th><th style="padding:8px">Total</th></tr>'+rows+'</table>'
    +'<div style="text-align:right;font-size:.92rem">Subtotal: '+money(sub)+'<br>Tax ('+tax+'%): '+money(taxA)+'<br><b style="font-size:1.2rem;color:#4f46e5">Total: '+money(total)+'</b></div></div>';
    el("t-prev").innerHTML=h; el("t-pr").style.display=""; el("t-dl").style.display="";
    el("t-pr").onclick=function(){ window.print(); };
    el("t-dl").onclick=function(){ dl("data:text/html;charset=utf-8,"+encodeURIComponent("<html><head><title>Invoice</title></head><body>"+h+"</body></html>"),"invoice.html"); };
  };
}});

TOOLS.push({ id:"signature", cat:"docs", icon:"✍️", name:"Free Online Signature Maker",
desc:"Draw your digital signature and download as PNG",
render:function(box){
  box.innerHTML='<h2>✍️ Signature Maker</h2><p class="tool-note">Draw with mouse or finger below.</p>'
  +'<canvas id="t-cv" class="tool-canvas" width="600" height="220" style="background:#fff;cursor:crosshair;border:1px solid var(--line)"></canvas>'
  +'<div class="row"><button class="tool-btn ghost" id="t-cl">Clear</button><button class="tool-btn" id="t-dl">⬇ Download PNG</button></div>'
  +'<div class="tool-out" id="t-out"></div>';
  var cv=el("t-cv"), ctx=cv.getContext("2d"), drawing=false, lx=0, ly=0;
  ctx.lineWidth=2.5; ctx.lineCap="round"; ctx.strokeStyle="#1e1b4b";
  function pos(e){ var r=cv.getBoundingClientRect(); var t=e.touches&&e.touches[0];
    var cx=t?t.clientX:e.clientX, cy=t?t.clientY:e.clientY;
    return [ (cx-r.left)*cv.width/r.width, (cy-r.top)*cv.height/r.height ]; }
  function start(e){ e.preventDefault(); drawing=true; var p=pos(e); lx=p[0]; ly=p[1]; }
  function move(e){ if(!drawing) return; e.preventDefault(); var p=pos(e);
    ctx.beginPath(); ctx.moveTo(lx,ly); ctx.lineTo(p[0],p[1]); ctx.stroke(); lx=p[0]; ly=p[1]; }
  cv.addEventListener("mousedown",start); cv.addEventListener("mousemove",move);
  window.addEventListener("mouseup",function(){drawing=false;});
  cv.addEventListener("touchstart",start,{passive:false}); cv.addEventListener("touchmove",move,{passive:false});
  cv.addEventListener("touchend",function(){drawing=false;});
  el("t-cl").onclick=function(){ ctx.clearRect(0,0,cv.width,cv.height); };
  el("t-dl").onclick=function(){ dl(cv.toDataURL("image/png"),"signature.png"); outHTML(box,"✅ Signature downloaded."); };
  box._cleanup=function(){ drawing=false; };
}});

TOOLS.push({ id:"receipt", cat:"docs", icon:"🧷", name:"Free Receipt Maker Online",
desc:"Generate professional receipts instantly, free",
render:function(box){
  box.innerHTML='<h2>🧷 Receipt Maker</h2>'
  +'<label>Shop name</label><input type="text" id="t-s" placeholder="My Shop">'
  +'<label>Items (one per line: name, qty, price)</label><textarea id="t-i" placeholder="Milk, 2, 180\nBread, 1, 120"></textarea>'
  +'<button class="tool-btn" id="t-go">Make Receipt</button><div id="t-prev"></div>'
  +'<button class="tool-btn ghost no-print" id="t-pr" style="display:none">🖨️ Print Receipt</button>'
  +'<div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var s=el("t-s").value.trim()||"My Shop", lines=el("t-i").value.split("\n"), rows=[], total=0;
    lines.forEach(function(l){ var p=l.split(","); if(p.length>=3){ var q=parseFloat(p[1])||0, pr=parseFloat(p[2])||0;
      if(q>0&&pr>=0){ var t=q*pr; total+=t; rows.push('<div style="display:flex;justify-content:space-between"><span>'+esc(p[0].trim())+' x'+q+'</span><span>'+money(pr*q)+'</span></div>'); } } });
    if(!rows.length){ outHTML(box,"Add at least one item."); return; }
    var h='<div style="background:#fff;color:#111;font-family:monospace;max-width:320px;margin:16px auto;padding:20px 16px;border-radius:8px;font-size:.85rem">'
    +'<div style="text-align:center;font-weight:bold;font-size:1.05rem">'+esc(s)+'</div>'
    +'<div style="text-align:center">*** RECEIPT ***</div><div>'+new Date().toLocaleString()+'</div>'
    +'<div style="border-top:1px dashed #111;margin:8px 0"></div>'+rows.join("")
    +'<div style="border-top:1px dashed #111;margin:8px 0"></div>'
    +'<div style="display:flex;justify-content:space-between;font-weight:bold;font-size:1rem"><span>TOTAL</span><span>'+money(total)+'</span></div>'
    +'<div style="text-align:center;margin-top:8px">Thank you! Visit again 🙏</div></div>';
    el("t-prev").innerHTML=h; el("t-pr").style.display="";
    el("t-pr").onclick=function(){ window.print(); };
  };
}});

TOOLS.push({ id:"barcode", cat:"docs", icon:"🔖", name:"Free Barcode Generator Online",
desc:"Create Code128 barcodes from any text — free",
render:function(box){
  box.innerHTML='<h2>📊 Barcode Generator</h2><label>Text / numbers (A-Z, 0-9, symbols)</label>'
  +'<input type="text" id="t-in" placeholder="e.g. 1234567890" maxlength="30">'
  +'<button class="tool-btn" id="t-go">Generate Barcode</button><div id="t-prev"></div>'
  +'<button class="tool-btn ghost" id="t-dl" style="display:none">⬇ Download PNG</button>'
  +'<div class="tool-out" id="t-out"></div><p class="tool-note">Real Code128-B encoding, drawn with our own algorithm — scannable by any reader.</p>';
  el("t-go").onclick=function(){
    var t=el("t-in").value.trim(); if(!t){ outHTML(box,"Enter text."); return; }
    var cv=document.createElement("canvas"); cv.width=520; cv.height=160;
    if(!drawCode128(cv,t)){ outHTML(box,"Only letters, numbers and basic symbols supported."); return; }
    cv.className="tool-canvas"; var p=el("t-prev"); p.innerHTML=""; p.appendChild(cv);
    el("t-dl").style.display=""; el("t-dl").onclick=function(){ dl(cv.toDataURL("image/png"),"barcode.png"); };
    outHTML(box,"✅ Barcode generated.");
  };
}});

TOOLS.push({ id:"hash", cat:"docs", icon:"💾", name:"Free MD5 & SHA Hash Generator",
desc:"Hash any text with MD5, SHA-256, SHA-512 online",
render:function(box){
  box.innerHTML='<h2>🔐 Hash Generator</h2><label>Text to hash</label><textarea id="t-in" placeholder="Type or paste text..."></textarea>'
  +'<label>Algorithm</label><select id="t-a"><option value="md5">MD5</option><option value="SHA-256">SHA-256</option><option value="SHA-512">SHA-512</option></select>'
  +'<button class="tool-btn" id="t-go">Generate Hash</button><div class="tool-out" id="t-out"></div>'
  +'<button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Hash</button>';
  el("t-go").onclick=function(){
    var t=el("t-in").value; if(!t){ outHTML(box,"Enter text."); return; }
    var a=el("t-a").value;
    function show(h){ outHTML(box,a+":\n"+h); var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(h,c);}; }
    if(a==="md5") show(md5(t)); else { outHTML(box,"Hashing..."); shaHash(a,t,show); }
  };
}});

TOOLS.push({ id:"shadow", cat:"docs", icon:"🌑", name:"CSS Box Shadow Generator",
desc:"Design perfect CSS box shadows with live preview",
render:function(box){
  box.innerHTML='<h2>🌑 Box Shadow Generator</h2>'
  +'<div class="row"><div><label>X offset: <span id="t-xv">10</span>px</label><input type="range" id="t-x" min="-50" max="50" value="10"></div>'
  +'<div><label>Y offset: <span id="t-yv">10</span>px</label><input type="range" id="t-y" min="-50" max="50" value="10"></div></div>'
  +'<div class="row"><div><label>Blur: <span id="t-bv">20</span>px</label><input type="range" id="t-b" min="0" max="100" value="20"></div>'
  +'<div><label>Spread: <span id="t-sv">0</span>px</label><input type="range" id="t-s" min="-50" max="50" value="0"></div></div>'
  +'<div class="row"><div><label>Color</label><input type="color" id="t-c" value="#000000"></div>'
  +'<div><label>Opacity: <span id="t-ov">30</span>%</label><input type="range" id="t-o" min="0" max="100" value="30"></div></div>'
  +'<label><input type="checkbox" id="t-in" style="width:auto"> Inset shadow</label>'
  +'<div id="t-prev" style="width:180px;height:180px;background:#6366f1;border-radius:16px;margin:18px auto"></div>'
  +'<div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy">Copy CSS</button>';
  function hexA(h,o){ var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
    return "rgba("+r+","+g+","+b+","+(o/100)+")"; }
  function upd(){
    var x=el("t-x").value,y=el("t-y").value,b=el("t-b").value,s=el("t-s").value,
        c=hexA(el("t-c").value,el("t-o").value),ins=el("t-in").checked;
    el("t-xv").textContent=x;el("t-yv").textContent=y;el("t-bv").textContent=b;el("t-sv").textContent=s;el("t-ov").textContent=el("t-o").value;
    var css="box-shadow:"+(ins?" inset":"")+x+"px "+y+"px "+b+"px "+s+"px "+c+";";
    el("t-prev").style.boxShadow=(ins?"inset ":"")+x+"px "+y+"px "+b+"px "+s+"px "+c;
    outHTML(box,css);
  }
  ["t-x","t-y","t-b","t-s","t-c","t-o"].forEach(function(id){el(id).addEventListener("input",upd);});
  el("t-in").addEventListener("change",upd); upd();
  el("t-copy").onclick=function(){copyText(el("t-out").textContent,el("t-copy"));};
}});

TOOLS.push({ id:"gradient", cat:"docs", icon:"🌇", name:"CSS Gradient Generator",
desc:"Create beautiful CSS gradients — free online tool",
render:function(box){
  box.innerHTML='<h2>🌈 Gradient Generator</h2>'
  +'<div class="row"><div><label>Color 1</label><input type="color" id="t-c1" value="#6366f1"></div>'
  +'<div><label>Color 2</label><input type="color" id="t-c2" value="#ec4899"></div>'
  +'<div><label>Color 3</label><input type="color" id="t-c3" value="#f59e0b"></div></div>'
  +'<div class="row"><div><label>Type</label><select id="t-t"><option value="linear">Linear</option><option value="radial">Radial</option></select></div>'
  +'<div><label>Angle: <span id="t-av">135</span>°</label><input type="range" id="t-a" min="0" max="360" value="135"></div></div>'
  +'<div id="t-prev" style="height:160px;border-radius:14px;margin-top:14px"></div>'
  +'<div class="tool-out" id="t-out"></div><button class="tool-btn ghost tool-copy" id="t-copy">Copy CSS</button>';
  function upd(){
    var c1=el("t-c1").value,c2=el("t-c2").value,c3=el("t-c3").value,t=el("t-t").value,a=el("t-a").value;
    el("t-av").textContent=a;
    var css=t==="linear"?"linear-gradient("+a+"deg, "+c1+", "+c2+", "+c3+")":"radial-gradient(circle, "+c1+", "+c2+", "+c3+")";
    el("t-prev").style.background=css; outHTML(box,"background: "+css+";");
  }
  ["t-c1","t-c2","t-c3","t-t","t-a"].forEach(function(id){el(id).addEventListener("input",upd);});
  upd(); el("t-copy").onclick=function(){copyText(el("t-out").textContent,el("t-copy"));};
}});

TOOLS.push({ id:"tts", cat:"docs", icon:"🗨️", name:"Free Text to Speech Online",
desc:"Convert text to natural voice audio — free, no signup",
render:function(box){
  box.innerHTML='<h2>🔊 Text to Speech</h2><label>Text</label><textarea id="t-in" placeholder="Type something to hear..."></textarea>'
  +'<label>Voice</label><select id="t-v"></select>'
  +'<div class="row"><div><label>Rate: <span id="t-rv">1</span></label><input type="range" id="t-r" min="0.5" max="2" step="0.1" value="1"></div>'
  +'<div><label>Pitch: <span id="t-pv">1</span></label><input type="range" id="t-p" min="0.5" max="2" step="0.1" value="1"></div></div>'
  +'<div class="row"><button class="tool-btn" id="t-go">▶ Speak</button><button class="tool-btn ghost" id="t-st">⏹ Stop</button></div>'
  +'<div class="tool-out" id="t-out"></div>';
  if(!("speechSynthesis" in window)){ outHTML(box,"❌ Speech synthesis not supported in this browser."); return; }
  function loadV(){ var vs=speechSynthesis.getVoices();
    el("t-v").innerHTML=vs.map(function(v,i){return "<option value='"+i+"'>"+esc(v.name)+" ("+esc(v.lang)+")</option>";}).join(""); }
  loadV(); if(speechSynthesis.onvoiceschanged!==undefined) speechSynthesis.onvoiceschanged=loadV;
  el("t-r").addEventListener("input",function(){el("t-rv").textContent=el("t-r").value;});
  el("t-p").addEventListener("input",function(){el("t-pv").textContent=el("t-p").value;});
  el("t-go").onclick=function(){ var t=el("t-in").value.trim(); if(!t){outHTML(box,"Type some text.");return;}
    speechSynthesis.cancel(); var u=new SpeechSynthesisUtterance(t);
    var vs=speechSynthesis.getVoices(); if(vs[el("t-v").value]) u.voice=vs[el("t-v").value];
    u.rate=parseFloat(el("t-r").value); u.pitch=parseFloat(el("t-p").value);
    speechSynthesis.speak(u); outHTML(box,"🔊 Speaking..."); };
  el("t-st").onclick=function(){ speechSynthesis.cancel(); outHTML(box,"Stopped."); };
  box._cleanup=function(){ try{speechSynthesis.cancel();}catch(e){} };
}});

TOOLS.push({ id:"stt", cat:"docs", icon:"🎤", name:"Free Speech to Text Online",
desc:"Dictate and convert voice to text in your browser",
render:function(box){
  box.innerHTML='<h2>🎤 Speech to Text</h2><label>Language</label><select id="t-l"><option value="en-US">English</option><option value="ur-PK">Urdu</option><option value="hi-IN">Hindi</option><option value="ar-SA">Arabic</option></select>'
  +'<div class="row"><button class="tool-btn" id="t-go">🎤 Start Listening</button><button class="tool-btn ghost" id="t-st">⏹ Stop</button></div>'
  +'<label>Transcript</label><textarea id="t-in" placeholder="Your words appear here..."></textarea>'
  +'<button class="tool-btn ghost tool-copy" id="t-copy">Copy Text</button>'
  +'<div class="tool-out" id="t-out"></div>';
  var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){ outHTML(box,"❌ Speech recognition not supported — try Chrome or Edge."); return; }
  var rec=new SR(); rec.continuous=true; rec.interimResults=true;
  rec.onresult=function(e){ var txt=""; for(var i=e.resultIndex;i<e.results.length;i++) txt+=e.results[i][0].transcript;
    el("t-in").value=txt; };
  rec.onerror=function(e){ outHTML(box,"⚠️ "+e.error+" — allow microphone access and try again."); };
  el("t-go").onclick=function(){ rec.lang=el("t-l").value; try{rec.start();}catch(e){} outHTML(box,"🎤 Listening... speak now."); };
  el("t-st").onclick=function(){ try{rec.stop();}catch(e){} outHTML(box,"Stopped."); };
  el("t-copy").onclick=function(){copyText(el("t-in").value,el("t-copy"));};
  box._cleanup=function(){ try{rec.abort();}catch(e){} };
}});

TOOLS.push({ id:"binary", cat:"docs", icon:"0️⃣", name:"Binary to Text Converter",
desc:"Convert text to binary and binary to text — free",
render:function(box){
  box.innerHTML='<h2>🔢 Binary Converter</h2><label>Direction</label><select id="t-d"><option value="t2b">Text → Binary</option><option value="b2t">Binary → Text</option></select>'
  +'<label>Input</label><textarea id="t-in" placeholder="Type here..."></textarea>'
  +'<button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out"></div>'
  +'<button class="tool-btn ghost tool-copy" id="t-copy" style="display:none">Copy Result</button>';
  el("t-go").onclick=function(){
    var d=el("t-d").value, t=el("t-in").value, out="";
    if(d==="t2b"){ for(var i=0;i<t.length;i++){ out+=("0000000"+t.charCodeAt(i).toString(2)).slice(-8)+" "; } out=out.trim(); }
    else { var parts=t.trim().split(/\s+/), ok=true;
      for(var j=0;j<parts.length;j++){ if(!/^[01]{1,16}$/.test(parts[j])){ok=false;break;} out+=String.fromCharCode(parseInt(parts[j],2)); }
      if(!ok){ outHTML(box,"Invalid binary — use 0s and 1s separated by spaces."); return; } }
    if(!t){ outHTML(box,"Enter input."); return; }
    outHTML(box,out); var c=el("t-copy"); c.style.display=""; c.onclick=function(){copyText(out,c);};
  };
}});

/* ================= B. FINANCIAL & BUSINESS ================= */

TOOLS.push({ id:"compound", cat:"fin", icon:"🤑", name:"Compound Interest Calculator",
desc:"Calculate compound interest & investment growth free",
render:function(box){
  box.innerHTML='<h2>📈 Compound Interest</h2>'
  +'<div class="row"><div><label>Principal (Rs)</label><input type="number" id="t-p" value="100000"></div>'
  +'<div><label>Annual rate %</label><input type="number" id="t-r" value="10" step="0.1"></div></div>'
  +'<div class="row"><div><label>Years</label><input type="number" id="t-y" value="5"></div>'
  +'<div><label>Compounds/year</label><select id="t-n"><option value="1">Yearly</option><option value="4">Quarterly</option><option value="12" selected>Monthly</option><option value="365">Daily</option></select></div></div>'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var P=parseFloat(el("t-p").value)||0, r=(parseFloat(el("t-r").value)||0)/100,
        y=parseFloat(el("t-y").value)||0, n=parseFloat(el("t-n").value)||1;
    var A=P*Math.pow(1+r/n,n*y);
    outHTML(box,"Invested: "+money(P)+"\nFinal value: "+money(A)+"\nInterest earned: "+money(A-P)+"\nGrowth: "+(P>0?((A/P-1)*100).toFixed(1):0)+"%");
  };
}});

TOOLS.push({ id:"gst", cat:"fin", icon:"🏛️", name:"GST & Tax Calculator Online",
desc:"Add or remove GST/VAT tax — free calculator",
render:function(box){
  box.innerHTML='<h2>🧮 GST / Tax Calculator</h2><label>Amount (Rs)</label><input type="number" id="t-a" value="1000">'
  +'<label>Tax rate %</label><input type="number" id="t-r" value="18">'
  +'<label>Mode</label><select id="t-m"><option value="add">Add tax (exclusive → inclusive)</option><option value="rem">Remove tax (inclusive → exclusive)</option></select>'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var a=parseFloat(el("t-a").value)||0, r=(parseFloat(el("t-r").value)||0)/100, m=el("t-m").value, out;
    if(m==="add"){ out="Base: "+money(a)+"\nTax ("+(r*100)+"%) : "+money(a*r)+"\nTotal: "+money(a*(1+r)); }
    else { var base=a/(1+r); out="Inclusive: "+money(a)+"\nBase: "+money(base)+"\nTax included: "+money(a-base); }
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"tip", cat:"fin", icon:"💵", name:"Tip Calculator with Bill Split",
desc:"Calculate tip and split bills fairly — free",
render:function(box){
  box.innerHTML='<h2>💵 Tip Calculator</h2><label>Bill amount (Rs)</label><input type="number" id="t-b" value="2000">'
  +'<label>Tip %</label><input type="number" id="t-p" value="10">'
  +'<label>Split between (people)</label><input type="number" id="t-s" value="2" min="1">'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var b=parseFloat(el("t-b").value)||0, p=(parseFloat(el("t-p").value)||0)/100, s=Math.max(1,parseInt(el("t-s").value)||1);
    var tip=b*p, total=b+tip;
    outHTML(box,"Tip: "+money(tip)+"\nTotal: "+money(total)+"\nPer person ("+s+"): "+money(total/s));
  };
}});

TOOLS.push({ id:"fuel", cat:"fin", icon:"⛽", name:"Fuel Cost Calculator",
desc:"Calculate trip fuel cost & mileage — free tool",
render:function(box){
  box.innerHTML='<h2>⛽ Fuel Cost Calculator</h2><label>Distance (km)</label><input type="number" id="t-d" value="300">'
  +'<label>Fuel efficiency (km/litre)</label><input type="number" id="t-e" value="15">'
  +'<label>Fuel price (Rs/litre)</label><input type="number" id="t-p" value="260">'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var d=parseFloat(el("t-d").value)||0, e=parseFloat(el("t-e").value)||1, p=parseFloat(el("t-p").value)||0;
    var litres=d/e, cost=litres*p;
    outHTML(box,"Fuel needed: "+litres.toFixed(2)+" litres\nTrip cost: "+money(cost)+"\nCost per km: "+money(cost/(d||1)));
  };
}});

TOOLS.push({ id:"salary", cat:"fin", icon:"💼", name:"Salary to Hourly Calculator",
desc:"Convert salary to hourly wage & vice versa — free",
render:function(box){
  box.innerHTML='<h2>💼 Salary Converter</h2><label>Amount (Rs)</label><input type="number" id="t-a" value="80000">'
  +'<label>Convert</label><select id="t-m"><option value="m2h">Monthly → Hourly</option><option value="h2m">Hourly → Monthly</option></select>'
  +'<label>Work hours per week</label><input type="number" id="t-h" value="48">'
  +'<button class="tool-btn" id="t-go">Convert</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var a=parseFloat(el("t-a").value)||0, h=parseFloat(el("t-h").value)||48, m=el("t-m").value, out;
    if(m==="m2h"){ var hr=a/(h*4.33); out="Monthly: "+money(a)+"\nHourly: "+money(hr)+"\nDaily (8h): "+money(hr*8)+"\nYearly: "+money(a*12); }
    else { var mo=a*h*4.33; out="Hourly: "+money(a)+"\nMonthly: "+money(mo)+"\nYearly: "+money(mo*12); }
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"margin", cat:"fin", icon:"💷", name:"Profit Margin Calculator",
desc:"Calculate discount, margin & markup — free",
render:function(box){
  box.innerHTML='<h2>📊 Discount & Margin</h2><label>Cost price (Rs)</label><input type="number" id="t-c" value="700">'
  +'<label>Selling price (Rs)</label><input type="number" id="t-s" value="1000">'
  +'<label>Discount % (optional)</label><input type="number" id="t-d" value="0">'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var c=parseFloat(el("t-c").value)||0, s=parseFloat(el("t-s").value)||0, d=(parseFloat(el("t-d").value)||0)/100;
    var final=s*(1-d), profit=final-c, margin=final>0?profit/final*100:0, markup=c>0?profit/c*100:0;
    outHTML(box,"Final price: "+money(final)+"\nProfit: "+money(profit)+"\nMargin: "+margin.toFixed(1)+"%\nMarkup: "+markup.toFixed(1)+"%");
  };
}});

TOOLS.push({ id:"retire", cat:"fin", icon:"🏖️", name:"Retirement Savings Calculator",
desc:"Plan your retirement — future value calculator free",
render:function(box){
  box.innerHTML='<h2>🏖️ Retirement Calculator</h2><label>Monthly saving (Rs)</label><input type="number" id="t-m" value="20000">'
  +'<label>Years to save</label><input type="number" id="t-y" value="20">'
  +'<label>Expected annual return %</label><input type="number" id="t-r" value="12" step="0.1">'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var m=parseFloat(el("t-m").value)||0, y=parseFloat(el("t-y").value)||0, r=(parseFloat(el("t-r").value)||0)/100/12, n=y*12;
    var fv=r>0?m*((Math.pow(1+r,n)-1)/r):m*n;
    outHTML(box,"Total invested: "+money(m*n)+"\nFuture value: "+money(fv)+"\nGrowth: "+money(fv-m*n));
  };
}});

TOOLS.push({ id:"crypto", cat:"fin", icon:"💶", name:"Crypto Profit Calculator",
desc:"Calculate cryptocurrency profit & ROI — free",
render:function(box){
  box.innerHTML='<h2>🪙 Crypto Profit</h2><label>Coin</label><input type="text" id="t-n" placeholder="BTC">'
  +'<div class="row"><div><label>Buy price ($)</label><input type="number" id="t-b" step="any"></div>'
  +'<div><label>Sell price ($)</label><input type="number" id="t-s" step="any"></div></div>'
  +'<label>Amount (coins)</label><input type="number" id="t-a" step="any" value="1">'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var b=parseFloat(el("t-b").value)||0, s=parseFloat(el("t-s").value)||0, a=parseFloat(el("t-a").value)||0;
    var profit=(s-b)*a, pct=b>0?(s-b)/b*100:0;
    outHTML(box,(el("t-n").value.trim()||"Coin")+" profit: $"+profit.toLocaleString("en-US",{maximumFractionDigits:2})
      +"\nReturn: "+pct.toFixed(2)+"%\n"+(profit>=0?"🟢 Profit":"🔴 Loss"));
  };
}});

TOOLS.push({ id:"shipping", cat:"fin", icon:"📦", name:"Shipping Cost Estimator",
desc:"Estimate parcel shipping costs — free calculator",
render:function(box){
  box.innerHTML='<h2>📦 Shipping Cost</h2><label>Weight (kg)</label><input type="number" id="t-w" value="2" step="0.1">'
  +'<label>Distance (km)</label><input type="number" id="t-d" value="200">'
  +'<label>Service</label><select id="t-s"><option value="150">Standard (Rs 150 base)</option><option value="300">Express (Rs 300 base)</option><option value="500">Overnight (Rs 500 base)</option></select>'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var w=parseFloat(el("t-w").value)||0, d=parseFloat(el("t-d").value)||0, base=parseFloat(el("t-s").value)||150;
    var cost=base + w*80 + d*0.5;
    outHTML(box,"Estimated shipping: "+money(cost)+"\n(Breakdown: base "+money(base)+" + weight "+money(w*80)+" + distance "+money(d*0.5)+")");
  };
}});

TOOLS.push({ id:"breakeven", cat:"fin", icon:"🟰", name:"Break-Even Point Calculator",
desc:"Find your business break-even point — free",
render:function(box){
  box.innerHTML='<h2>⚖️ Break-Even Analysis</h2><label>Fixed costs / month (Rs)</label><input type="number" id="t-f" value="50000">'
  +'<label>Price per unit (Rs)</label><input type="number" id="t-p" value="500">'
  +'<label>Variable cost per unit (Rs)</label><input type="number" id="t-v" value="300">'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var f=parseFloat(el("t-f").value)||0, p=parseFloat(el("t-p").value)||0, v=parseFloat(el("t-v").value)||0;
    var cm=p-v;
    if(cm<=0){ outHTML(box,"⚠️ Price must be higher than variable cost!"); return; }
    var units=Math.ceil(f/cm);
    outHTML(box,"Contribution margin: "+money(cm)+"/unit\nBreak-even: "+units+" units/month\nRevenue at break-even: "+money(units*p));
  };
}});

/* ================= C. FUN & GAMES ================= */

TOOLS.push({ id:"tictactoe", cat:"fun", icon:"⭕", name:"Play Tic Tac Toe Online",
desc:"Free tic-tac-toe game vs smart computer",
render:function(box){
  box.innerHTML='<h2>⭕ Tic-Tac-Toe</h2><p class="tool-note">You are X. Computer is O (minimax AI — good luck!).</p>'
  +'<div id="t-g" style="display:grid;grid-template-columns:repeat(3,90px);gap:8px;justify-content:center;margin:16px 0"></div>'
  +'<div class="tool-out" id="t-out"></div><button class="tool-btn ghost" id="t-r">↻ New Game</button>';
  var b=["","","","","","","","",""], over=false;
  function win(p){ var W=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return W.some(function(w){return b[w[0]]===p&&b[w[1]]===p&&b[w[2]]===p;}); }
  function avail(){ var a=[]; b.forEach(function(v,i){if(!v)a.push(i);}); return a; }
  function mini(isMax){ if(win("O"))return 10; if(win("X"))return -10; var a=avail(); if(!a.length)return 0;
    var best=isMax?-99:99;
    a.forEach(function(i){ b[i]=isMax?"O":"X"; var s=mini(!isMax); b[i]="";
      best=isMax?Math.max(best,s):Math.min(best,s); });
    return best; }
  function draw(){ var g=el("t-g"); g.innerHTML="";
    b.forEach(function(v,i){ var d=document.createElement("div");
      d.style.cssText="width:90px;height:90px;background:rgba(255,255,255,.05);border:1px solid var(--line);border-radius:12px;font-size:2.2rem;display:flex;align-items:center;justify-content:center;cursor:pointer";
      d.textContent=v;
      d.onclick=function(){ if(over||b[i])return; b[i]="X";
        if(win("X")){over=true;outHTML(box,"🎉 You win! Amazing!");draw();return;}
        if(!avail().length){over=true;outHTML(box,"🤝 Draw!");draw();return;}
        var best=-99, mv=avail()[0];
        avail().forEach(function(j){ b[j]="O"; var s=mini(false); b[j]=""; if(s>best){best=s;mv=j;} });
        b[mv]="O";
        if(win("O")){over=true;outHTML(box,"🤖 Computer wins! Try again.");}
        else if(!avail().length){over=true;outHTML(box,"🤝 Draw!");}
        draw(); };
      g.appendChild(d); }); }
  el("t-r").onclick=function(){ b=["","","","","","","","",""]; over=false; outHTML(box,""); draw(); };
  draw();
}});

TOOLS.push({ id:"rps", cat:"fun", icon:"✊", name:"Rock Paper Scissors Game",
desc:"Play rock paper scissors online — free game",
render:function(box){
  var sc={w:0,l:0,d:0};
  try{ sc=JSON.parse(localStorage.getItem("adv_rps")||'{"w":0,"l":0,"d":0}'); }catch(e){}
  box.innerHTML='<h2>✊ Rock Paper Scissors</h2><p class="tool-note" id="t-sc"></p>'
  +'<div class="row" style="text-align:center"><button class="tool-btn ghost" data-c="✊" style="font-size:2rem">✊</button>'
  +'<button class="tool-btn ghost" data-c="✋" style="font-size:2rem">✋</button>'
  +'<button class="tool-btn ghost" data-c="✌️" style="font-size:2rem">✌️</button></div>'
  +'<div class="tool-out" id="t-out"></div><button class="tool-btn ghost" id="t-z">Reset Score</button>';
  function upd(){ el("t-sc").textContent="Wins: "+sc.w+" · Losses: "+sc.l+" · Draws: "+sc.d; }
  upd();
  var beats={"✊":"✌️","✋":"✊","✌️":"✋"};
  box.querySelectorAll("[data-c]").forEach(function(btn){
    btn.onclick=function(){ var you=btn.getAttribute("data-c"),
      opts=["✊","✋","✌️"], cpu=opts[Math.floor(Math.random()*3)], r;
      if(you===cpu){r="🤝 Draw!";sc.d++;} else if(beats[you]===cpu){r="🎉 You win!";sc.w++;} else {r="🤖 CPU wins!";sc.l++;}
      try{localStorage.setItem("adv_rps",JSON.stringify(sc));}catch(e){}
      outHTML(box,"You: "+you+"  vs  CPU: "+cpu+"\n"+r); upd(); };
  });
  el("t-z").onclick=function(){ sc={w:0,l:0,d:0}; try{localStorage.removeItem("adv_rps");}catch(e){} upd(); outHTML(box,"Score reset."); };
}});

TOOLS.push({ id:"memory", cat:"fun", icon:"🃏", name:"Memory Card Match Game",
desc:"Free memory matching card game — test your brain",
render:function(box){
  box.innerHTML='<h2>🃏 Memory Match</h2><p class="tool-note">Moves: <b id="t-m">0</b> · Matches: <b id="t-f">0</b>/8</p>'
  +'<div id="t-g" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;max-width:400px;margin:0 auto"></div>'
  +'<div class="tool-out" id="t-out"></div><button class="tool-btn ghost" id="t-r">↻ New Game</button>';
  var deck, first=null, lock=false, moves=0, found=0, timer=null;
  function start(){ var icons=["🍎","🚗","🐶","⚽","🎵","🌙","⭐","🎈"];
    deck=icons.concat(icons).sort(function(){return Math.random()-0.5;});
    first=null; lock=false; moves=0; found=0; if(timer){clearTimeout(timer);timer=null;}
    el("t-m").textContent="0"; el("t-f").textContent="0"; outHTML(box,""); draw(); }
  function draw(){ var g=el("t-g"); g.innerHTML="";
    deck.forEach(function(ic,i){ var d=document.createElement("div");
      d.style.cssText="aspect-ratio:1;background:rgba(255,255,255,.06);border:1px solid var(--line);border-radius:10px;font-size:1.8rem;display:flex;align-items:center;justify-content:center;cursor:pointer";
      d.textContent=d._open||d._done?ic:"❓";
      if(d._done) d.style.opacity="0.35";
      d.onclick=function(){ if(lock||d._open||d._done)return; d._open=true; moves++; el("t-m").textContent=moves;
        if(!first){ first={i:i,d:d}; draw(); return; }
        draw();
        if(deck[first.i]===ic){ first.d._done=true; d._done=true; found++; el("t-f").textContent=found; first=null; draw();
          if(found===8) outHTML(box,"🏆 You won in "+moves+" moves!"); }
        else { lock=true; var f=first; first=null;
          timer=setTimeout(function(){ f.d._open=false; d._open=false; lock=false; draw(); },700); } };
      g.appendChild(d); }); }
  el("t-r").onclick=start; start();
  box._cleanup=function(){ if(timer)clearTimeout(timer); };
}});

TOOLS.push({ id:"coinflip", cat:"fun", icon:"🌕", name:"Coin Flip — Heads or Tails",
desc:"Flip a virtual coin online — free decision maker",
render:function(box){
  box.innerHTML='<h2>🪙 Coin Flip</h2>'
  +'<div id="t-c" style="font-size:5rem;text-align:center;margin:20px 0;transition:transform .6s">🪙</div>'
  +'<div style="text-align:center"><button class="tool-btn" id="t-go">Flip Coin</button></div>'
  +'<div class="tool-out" id="t-out"></div><p class="tool-note" id="t-h"></p>';
  var h=0,t=0;
  el("t-go").onclick=function(){
    var c=el("t-c"); c.style.transform="rotateY(0deg)";
    setTimeout(function(){ c.style.transform="rotateY(1800deg)"; },30);
    setTimeout(function(){ var r=Math.random()<0.5?"Heads":"Tails";
      c.textContent=r==="Heads"?"👑":"🪙";
      if(r==="Heads")h++;else t++;
      outHTML(box,"Result: <b>"+r+"</b> "+(r==="Heads"?"👑":"⚪"));
      el("t-h").textContent="Heads: "+h+" · Tails: "+t;
    },650);
  };
}});

TOOLS.push({ id:"dice", cat:"fun", icon:"⚀", name:"Online Dice Roller",
desc:"Roll virtual dice 1-6 — free random dice",
render:function(box){
  box.innerHTML='<h2>🎲 Dice Roller</h2><label>Number of dice</label><select id="t-n"><option>1</option><option>2</option><option>3</option></select>'
  +'<div id="t-d" style="font-size:4rem;text-align:center;margin:16px 0;min-height:90px">🎲</div>'
  +'<div style="text-align:center"><button class="tool-btn" id="t-go">Roll!</button></div>'
  +'<div class="tool-out" id="t-out"></div>';
  var faces=["⚀","⚁","⚂","⚃","⚄","⚅"], iv=null;
  el("t-go").onclick=function(){
    var n=parseInt(el("t-n").value), d=el("t-d"), k=0;
    if(iv)clearInterval(iv);
    iv=setInterval(function(){ d.textContent=Array.apply(null,{length:n}).map(function(){return faces[Math.floor(Math.random()*6)];}).join(" ");
      if(++k>8){ clearInterval(iv); iv=null;
        var rolls=[],sum=0; for(var i=0;i<n;i++){var r=1+Math.floor(Math.random()*6);rolls.push(r);sum+=r;}
        d.textContent=rolls.map(function(r){return faces[r-1];}).join(" ");
        outHTML(box,"Rolled: "+rolls.join(" + ")+" = "+sum); } },90);
  };
  box._cleanup=function(){ if(iv)clearInterval(iv); };
}});

TOOLS.push({ id:"wheel", cat:"fun", icon:"🎪", name:"Spin the Wheel — Random Picker",
desc:"Lucky draw wheel — enter names, spin to pick winner",
render:function(box){
  box.innerHTML='<h2>🎡 Spin the Wheel</h2><label>Options (one per line)</label>'
  +'<textarea id="t-o" placeholder="Ali\nSara\nAhmed\nFatima"></textarea>'
  +'<div style="text-align:center"><canvas id="t-cv" class="tool-canvas" width="320" height="320"></canvas></div>'
  +'<div style="text-align:center"><button class="tool-btn" id="t-go">🌀 SPIN</button></div>'
  +'<div class="tool-out" id="t-out"></div>';
  var cv=el("t-cv"), ctx=cv.getContext("2d"), ang=0, spinning=false, raf=null;
  var cols=["#6366f1","#ec4899","#f59e0b","#10b981","#8b5cf6","#ef4444","#06b6d4","#84cc16"];
  function opts(){ return el("t-o").value.split("\n").map(function(s){return s.trim();}).filter(Boolean).slice(0,12); }
  function drawW(){ var o=opts(), n=o.length||1, R=150, cx=160, cy=160;
    ctx.clearRect(0,0,320,320);
    for(var i=0;i<n;i++){ var a0=ang+i*2*Math.PI/n, a1=a0+2*Math.PI/n;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,R,a0,a1); ctx.closePath();
      ctx.fillStyle=cols[i%cols.length]; ctx.fill(); ctx.strokeStyle="#fff"; ctx.stroke();
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(a0+Math.PI/n); ctx.textAlign="right";
      ctx.fillStyle="#fff"; ctx.font="bold 13px sans-serif";
      ctx.fillText((o[i]||"").slice(0,14), R-10, 5); ctx.restore(); }
    ctx.fillStyle="#fff"; ctx.beginPath(); ctx.moveTo(cx+R-6,cy-12); ctx.lineTo(cx+R+18,cy); ctx.lineTo(cx+R-6,cy+12); ctx.fill(); }
  drawW();
  el("t-o").addEventListener("input",drawW);
  el("t-go").onclick=function(){
    var o=opts(); if(o.length<2){ outHTML(box,"Add at least 2 options."); return; }
    if(spinning)return; spinning=true;
    var target=ang+Math.PI*2*(4+Math.random()*4), start=ang, t0=Date.now(), dur=4000;
    function tick(){ var p=Math.min(1,(Date.now()-t0)/dur), e=1-Math.pow(1-p,3);
      ang=start+(target-start)*e; drawW();
      if(p<1){ raf=requestAnimationFrame(tick); }
      else { spinning=false; var n=o.length, idx=Math.floor(((2*Math.PI-(ang%(2*Math.PI)))%(2*Math.PI))/(2*Math.PI/n))%n;
        outHTML(box,"🎉 Winner: <b>"+esc(o[idx])+"</b>"); } }
    tick(); };
  box._cleanup=function(){ if(raf)cancelAnimationFrame(raf); spinning=false; };
}});

TOOLS.push({ id:"love", cat:"fun", icon:"💘", name:"Love Calculator — Compatibility Test",
desc:"Fun love compatibility calculator — free",
render:function(box){
  box.innerHTML='<h2>💘 Love Calculator</h2><p class="tool-note">Just for fun! 😄</p>'
  +'<div class="row"><div><label>Your name</label><input type="text" id="t-a" placeholder="Ali"></div>'
  +'<div><label>Partner name</label><input type="text" id="t-b" placeholder="Sara"></div></div>'
  +'<button class="tool-btn" id="t-go">Calculate Love ❤️</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var a=el("t-a").value.trim().toLowerCase(), b=el("t-b").value.trim().toLowerCase();
    if(!a||!b){ outHTML(box,"Enter both names."); return; }
    var s=a+"loves"+b, h=0;
    for(var i=0;i<s.length;i++){ h=(h*31+s.charCodeAt(i))%100000; }
    var pct=55+(h%46), msg=pct>90?"💖 Soulmates!":pct>75?"💕 Great match!":pct>60?"💗 Good potential!":"💛 Friendship first!";
    outHTML(box,a.charAt(0).toUpperCase()+a.slice(1)+" ❤️ "+b.charAt(0).toUpperCase()+b.slice(1)+"\n\nCompatibility: "+pct+"%\n"+msg);
  };
}});

TOOLS.push({ id:"zodiac", cat:"fun", icon:"♈", name:"Zodiac Sign Finder",
desc:"Find your zodiac sign by birth date + traits",
render:function(box){
  box.innerHTML='<h2>♈ Zodiac Finder</h2><label>Birth date</label><input type="date" id="t-d">'
  +'<button class="tool-btn" id="t-go">Find My Sign</button><div class="tool-out" id="t-out"></div>';
  var signs=[
    ["♑ Capricorn","Jan 1 – Jan 19","Ambitious, disciplined, patient. Natural leaders who build lasting success."],
    ["♒ Aquarius","Jan 20 – Feb 18","Innovative, independent, humanitarian. Original thinkers ahead of their time."],
    ["♓ Pisces","Feb 19 – Mar 20","Compassionate, artistic, intuitive. Dreamers with deep emotions."],
    ["♈ Aries","Mar 21 – Apr 19","Bold, energetic, confident. Fearless pioneers who love challenges."],
    ["♉ Taurus","Apr 20 – May 20","Reliable, patient, devoted. Lovers of comfort and beauty."],
    ["♊ Gemini","May 21 – Jun 20","Curious, adaptable, witty. Great communicators, life of the party."],
    ["♋ Cancer","Jun 21 – Jul 22","Loyal, emotional, protective. Deeply caring home-lovers."],
    ["♌ Leo","Jul 23 – Aug 22","Generous, warm, charismatic. Born stars who shine bright."],
    ["♍ Virgo","Aug 23 – Sep 22","Analytical, kind, hardworking. Perfectionists with big hearts."],
    ["♎ Libra","Sep 23 – Oct 22","Charming, fair, social. Seekers of harmony and beauty."],
    ["♏ Scorpio","Oct 23 – Nov 21","Passionate, brave, loyal. Intense souls with strong will."],
    ["♐ Sagittarius","Nov 22 – Dec 21","Adventurous, honest, optimistic. Free spirits chasing horizons."],
    ["♑ Capricorn","Dec 22 – Dec 31","Ambitious, disciplined, patient. Natural leaders who build lasting success."]];
  el("t-go").onclick=function(){
    var d=el("t-d").value; if(!d){ outHTML(box,"Pick your birth date."); return; }
    var dt=new Date(d+"T00:00:00"), m=dt.getMonth()+1, day=dt.getDate(), s=null;
    signs.forEach(function(z){ var p=z[1].match(/(\w+) (\d+)/g);
      var m1={"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}[p[0].split(" ")[0]];
      var d1=parseInt(p[0].split(" ")[1]), m2={"Jan":1,"Feb":2,"Mar":3,"Apr":4,"May":5,"Jun":6,"Jul":7,"Aug":8,"Sep":9,"Oct":10,"Nov":11,"Dec":12}[p[1].split(" ")[0]];
      var d2=parseInt(p[1].split(" ")[1]);
      if((m===m1&&day>=d1)||(m===m2&&day<=d2)) s=z; });
    outHTML(box,s[0]+" "+s[1].split(" ")[0]+"\n"+s[1]+"\n\n"+s[2]);
  };
}});

TOOLS.push({ id:"joke", cat:"fun", icon:"🤣", name:"Daily Jokes & Quotes Generator",
desc:"Fresh jokes and motivational quotes every click",
render:function(box){
  var J=[
    "Why don't scientists trust atoms? Because they make up everything! 😄",
    "I told my computer I needed a break... now it won't stop sending me KitKat ads. 🍫",
    "Why did the programmer quit his job? He didn't get arrays. 💻",
    "Parallel lines have so much in common... shame they'll never meet. 📏",
    "I'm reading a book about anti-gravity. It's impossible to put down! 📚",
    "Why do Java developers wear glasses? Because they don't C#. 👓",
    "The best thing about a boolean is even if you're wrong, you're only off by a bit. 🔢",
    "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
    "I would tell you a UDP joke, but you might not get it. 📡",
    "There are 10 kinds of people: those who understand binary and those who don't. 🔢",
    "Why don't skeletons fight each other? They don't have the guts. 💀",
    "My wallet is like an onion — opening it makes me cry. 🧅",
    "The future, the present and the past walked into a bar. Things got a little tense. ⏰",
    "I asked the librarian if the library had books on paranoia. She whispered, 'They're right behind you.' 📖",
    "Why did the math book look sad? Too many problems. ➗",
    "\"Success is not final, failure is not fatal: it is the courage to continue that counts.\" — Churchill 💪",
    "\"The only way to do great work is to love what you do.\" — Steve Jobs ❤️",
    "\"In the middle of difficulty lies opportunity.\" — Einstein 🌟",
    "\"Believe you can and you're halfway there.\" — Roosevelt 🚀",
    "\"Don't watch the clock; do what it does. Keep going.\" — Sam Levenson ⏱️",
    "\"It always seems impossible until it's done.\" — Mandela 🏆",
    "\"Your limitation is only your imagination.\" ✨"];
  box.innerHTML='<h2>😂 Joke & Quote Generator</h2><div class="tool-out" id="t-out" style="font-size:1.05rem"></div>'
  +'<button class="tool-btn" id="t-go">🎲 New One</button>';
  el("t-go").onclick=function(){ outHTML(box,J[Math.floor(Math.random()*J.length)]); };
  el("t-go").onclick();
}});

TOOLS.push({ id:"colorguess", cat:"fun", icon:"🤔", name:"Color Guessing Game",
desc:"Guess the RGB color — fun free game",
render:function(box){
  box.innerHTML='<h2>🎨 Color Guessing Game</h2><p class="tool-note">Score: <b id="t-s">0</b> · Streak: <b id="t-k">0</b></p>'
  +'<div id="t-rgb" style="font-size:1.4rem;font-weight:bold;text-align:center;font-family:monospace;margin:10px 0"></div>'
  +'<div id="t-g" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:420px;margin:0 auto"></div>'
  +'<div class="tool-out" id="t-out"></div>';
  var score=0, streak=0, target=null;
  function rnd(){ return Math.floor(Math.random()*256); }
  function css(c){ return "rgb("+c[0]+","+c[1]+","+c[2]+")"; }
  function start(){ target=[rnd(),rnd(),rnd()];
    el("t-rgb").textContent=css(target).toUpperCase();
    var opts=[target.slice()], g=el("t-g"); g.innerHTML="";
    while(opts.length<6){ var c=[rnd(),rnd(),rnd()];
      if(opts.every(function(o){return Math.abs(o[0]-c[0])+Math.abs(o[1]-c[1])+Math.abs(o[2]-c[2])>90;})) opts.push(c); }
    opts.sort(function(){return Math.random()-0.5;});
    opts.forEach(function(c){ var d=document.createElement("div");
      d.style.cssText="aspect-ratio:1;border-radius:12px;cursor:pointer;border:2px solid transparent;background:"+css(c);
      d.onclick=function(){
        if(c[0]===target[0]&&c[1]===target[1]&&c[2]===target[2]){ score+=10; streak++;
          outHTML(box,"✅ Correct! +10 points"); d.style.border="3px solid #10b981"; setTimeout(start,900); }
        else { streak=0; outHTML(box,"❌ Wrong! Try again."); d.style.opacity="0.25"; d.style.pointerEvents="none"; }
        el("t-s").textContent=score; el("t-k").textContent=streak; };
      g.appendChild(d); }); }
  start();
}});

/* ================= D. HEALTH & FITNESS ================= */

TOOLS.push({ id:"calories", cat:"health", icon:"🔥", name:"Calorie Calculator — BMR & TDEE",
desc:"Calculate daily calorie needs — free BMR calculator",
render:function(box){
  box.innerHTML='<h2>🔥 Calorie Calculator</h2>'
  +'<div class="row"><div><label>Gender</label><select id="t-g"><option value="m">Male</option><option value="f">Female</option></select></div>'
  +'<div><label>Age</label><input type="number" id="t-a" value="30"></div></div>'
  +'<div class="row"><div><label>Height (cm)</label><input type="number" id="t-h" value="170"></div>'
  +'<div><label>Weight (kg)</label><input type="number" id="t-w" value="70"></div></div>'
  +'<label>Activity</label><select id="t-x"><option value="1.2">Sedentary</option><option value="1.375">Light</option><option value="1.55" selected>Moderate</option><option value="1.725">Very active</option><option value="1.9">Athlete</option></select>'
  +'<label>Goal</label><select id="t-o"><option value="0">Maintain</option><option value="-500">Lose weight</option><option value="500">Gain weight</option></select>'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var g=el("t-g").value, a=parseFloat(el("t-a").value)||0, h=parseFloat(el("t-h").value)||0, w=parseFloat(el("t-w").value)||0;
    var bmr=g==="m"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161;
    var tdee=bmr*parseFloat(el("t-x").value), goal=tdee+parseFloat(el("t-o").value);
    outHTML(box,"BMR: "+Math.round(bmr)+" kcal/day\nMaintenance: "+Math.round(tdee)+" kcal/day\nYour goal intake: "+Math.round(goal)+" kcal/day");
  };
}});

TOOLS.push({ id:"water", cat:"health", icon:"🚰", name:"Water Intake Calculator",
desc:"How much water should you drink daily? Free calculator",
render:function(box){
  box.innerHTML='<h2>💧 Water Intake</h2><label>Weight (kg)</label><input type="number" id="t-w" value="70">'
  +'<label>Activity level</label><select id="t-a"><option value="35">Normal (35 ml/kg)</option><option value="40">Active (40 ml/kg)</option><option value="45">Very active (45 ml/kg)</option></select>'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var w=parseFloat(el("t-w").value)||0, ml=w*parseFloat(el("t-a").value), L=ml/1000;
    outHTML(box,"Drink ~"+(L).toFixed(1)+" litres/day\n= "+Math.round(ml)+" ml\n= ~"+Math.ceil(L/0.25)+" glasses (250ml)");
  };
}});

TOOLS.push({ id:"ibw", cat:"health", icon:"🏋️", name:"Ideal Body Weight Calculator",
desc:"Find your healthy ideal weight — free tool",
render:function(box){
  box.innerHTML='<h2>⚖️ Ideal Body Weight</h2><label>Gender</label><select id="t-g"><option value="m">Male</option><option value="f">Female</option></select>'
  +'<label>Height (cm)</label><input type="number" id="t-h" value="170">'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var g=el("t-g").value, cm=parseFloat(el("t-h").value)||0, inch=cm/2.54, base=g==="m"?50:45.5;
    var ibw=inch<=60?base:base+2.3*(inch-60);
    outHTML(box,"Ideal weight: "+ibw.toFixed(1)+" kg\nHealthy range: "+(ibw*0.9).toFixed(1)+" – "+(ibw*1.1).toFixed(1)+" kg");
  };
}});

TOOLS.push({ id:"heartrate", cat:"health", icon:"💓", name:"Heart Rate Zone Calculator",
desc:"Find your fat-burn & cardio HR zones — free",
render:function(box){
  box.innerHTML='<h2>❤️ Heart Rate Zones</h2><label>Age</label><input type="number" id="t-a" value="30">'
  +'<label>Resting HR (bpm, optional)</label><input type="number" id="t-r" value="70">'
  +'<button class="tool-btn" id="t-go">Calculate Zones</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var a=parseFloat(el("t-a").value)||0, rest=parseFloat(el("t-r").value)||70, max=220-a, hrr=max-rest;
    var zones=[["🔵 Recovery (50-60%)",0.5,0.6],["🟢 Fat burn (60-70%)",0.6,0.7],["🟡 Aerobic (70-80%)",0.7,0.8],["🟠 Anaerobic (80-90%)",0.8,0.9],["🔴 Max (90-100%)",0.9,1]];
    var out="Max HR: ~"+max+" bpm\n\n"+zones.map(function(z){
      return z[0]+": "+Math.round(rest+hrr*z[1])+"–"+Math.round(rest+hrr*z[2])+" bpm"; }).join("\n");
    outHTML(box,out);
  };
}});

TOOLS.push({ id:"sleep", cat:"health", icon:"😴", name:"Sleep Calculator — Bedtime Finder",
desc:"Best bedtime & wake time for full sleep cycles",
render:function(box){
  box.innerHTML='<h2>😴 Sleep Calculator</h2><label>I want to wake up at</label><input type="text" id="t-w" value="06:30" placeholder="HH:MM">'
  +'<button class="tool-btn" id="t-go">Suggest Bedtimes</button><div class="tool-out" id="t-out"></div>'
  +'<p class="tool-note">Based on 90-minute sleep cycles (+15 min to fall asleep).</p>';
  el("t-go").onclick=function(){
    var m=el("t-w").value.match(/^(\d{1,2}):(\d{2})$/);
    if(!m){ outHTML(box,"Use HH:MM format, e.g. 06:30"); return; }
    var t=(parseInt(m[1])*60+parseInt(m[2]))-15, out=[];
    for(var c=6;c>=4;c--){ var b=t-c*90; b=((b%1440)+1440)%1440;
      var hh=Math.floor(b/60), mm=b%60;
      out.push((hh<10?"0":"")+hh+":"+(mm<10?"0":"")+mm+"  ("+c+" cycles, "+(c*1.5)+"h)"); }
    outHTML(box,"Wake at "+m[1]+":"+m[2]+" → go to bed at:\n\n🌙 "+out.join("\n🌙 "));
  };
}});

TOOLS.push({ id:"bodyfat", cat:"health", icon:"🍖", name:"Body Fat Percentage Calculator",
desc:"Estimate body fat % with US Navy method — free",
render:function(box){
  box.innerHTML='<h2>📏 Body Fat %</h2><label>Gender</label><select id="t-g"><option value="m">Male</option><option value="f">Female</option></select>'
  +'<div class="row"><div><label>Height (cm)</label><input type="number" id="t-h" value="175"></div>'
  +'<div><label>Waist (cm)</label><input type="number" id="t-w" value="85"></div></div>'
  +'<div class="row"><div><label>Neck (cm)</label><input type="number" id="t-n" value="38"></div>'
  +'<div id="t-hipw"><label>Hip (cm, female)</label><input type="number" id="t-hip" value="95"></div></div>'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-g").addEventListener("change",function(){ el("t-hipw").style.display=el("t-g").value==="f"?"":"none"; });
  el("t-go").onclick=function(){
    var g=el("t-g").value, h=parseFloat(el("t-h").value)||0, w=parseFloat(el("t-w").value)||0, n=parseFloat(el("t-n").value)||0;
    if(h<=0||w<=0||n<=0){ outHTML(box,"Enter valid measurements."); return; }
    var bf, log=function(x){return Math.log(x)/Math.log(10);};
    if(g==="m"){ bf=495/(1.0324-0.19077*log(w-n)+0.15456*log(h))-450; }
    else { var hip=parseFloat(el("t-hip").value)||0; if(hip<=0){outHTML(box,"Enter hip measurement.");return;}
      bf=495/(1.29579-0.35004*log(w+hip-n)+0.22100*log(h))-450; }
    if(!isFinite(bf)||bf<0){ outHTML(box,"Check measurements."); return; }
    var cat=bf<14?"Athletic 💪":bf<20?"Fit 🙂":bf<25?"Average 😐":"Above average — keep moving! 🏃";
    outHTML(box,"Body fat: "+bf.toFixed(1)+"%\n"+cat);
  };
}});

TOOLS.push({ id:"pace", cat:"health", icon:"🏃", name:"Running Pace Calculator",
desc:"Calculate pace, speed & finish time — free",
render:function(box){
  box.innerHTML='<h2>🏃 Pace Calculator</h2><label>Distance (km)</label><input type="number" id="t-d" value="5" step="0.1">'
  +'<label>Time (MM:SS)</label><input type="text" id="t-t" value="30:00" placeholder="30:00">'
  +'<button class="tool-btn" id="t-go">Calculate Pace</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var d=parseFloat(el("t-d").value)||0, m=el("t-t").value.match(/^(\d+):(\d{2})$/);
    if(!d||!m){ outHTML(box,"Enter distance and time as MM:SS."); return; }
    var sec=parseInt(m[1])*60+parseInt(m[2]), pk=sec/d, pm=Math.floor(pk/60), ps=Math.round(pk%60);
    outHTML(box,"Pace: "+pm+":"+(ps<10?"0":"")+ps+" /km\nSpeed: "+(3600/pk).toFixed(1)+" km/h\n1 mile pace: "+(function(){var x=pk*1.609,m2=Math.floor(x/60),s2=Math.round(x%60);return m2+":"+(s2<10?"0":"")+s2;})()+" /mile");
  };
}});

TOOLS.push({ id:"duedate", cat:"health", icon:"🤰", name:"Pregnancy Due Date Calculator",
desc:"Calculate baby due date from last period — free",
render:function(box){
  box.innerHTML='<h2>🤰 Due Date Calculator</h2><label>First day of last period</label><input type="date" id="t-d">'
  +'<label>Average cycle length (days)</label><input type="number" id="t-c" value="28">'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var d=el("t-d").value; if(!d){ outHTML(box,"Pick the date."); return; }
    var c=parseInt(el("t-c").value)||28, lmp=new Date(d+"T00:00:00");
    var due=new Date(lmp); due.setDate(due.getDate()+280+(c-28));
    var now=new Date(), weeks=Math.floor((now-lmp)/604800000), days=Math.floor(((now-lmp)%604800000)/86400000);
    outHTML(box,"Estimated due date: "+due.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})
      +"\n\nCurrent: "+Math.max(0,weeks)+" weeks, "+Math.max(0,days)+" days"+(weeks>=0&&weeks<=42?" 🤰":""));
  };
}});

TOOLS.push({ id:"macro", cat:"health", icon:"🍗", name:"Macro Nutrient Calculator",
desc:"Protein, carbs & fat targets — free macro calculator",
render:function(box){
  box.innerHTML='<h2>🍗 Macro Calculator</h2><label>Daily calories</label><input type="number" id="t-c" value="2200">'
  +'<label>Goal</label><select id="t-g"><option value="30,40,30">Balanced (30/40/30)</option><option value="40,30,30">High protein (40/30/30)</option><option value="25,50,25">High carb (25/50/25)</option><option value="35,15,50">Keto-ish (35/15/50)</option></select>'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var c=parseFloat(el("t-c").value)||0, p=el("t-g").value.split(",").map(Number);
    var pr=c*p[0]/100/4, cb=c*p[1]/100/4, ft=c*p[2]/100/9;
    outHTML(box,"For "+c+" kcal/day:\n\n🍗 Protein: "+Math.round(pr)+"g ("+p[0]+"%)\n🍚 Carbs: "+Math.round(cb)+"g ("+p[1]+"%)\n🥑 Fat: "+Math.round(ft)+"g ("+p[2]+"%)");
  };
}});

TOOLS.push({ id:"smoking", cat:"health", icon:"🚭", name:"Smoking Cost Calculator",
desc:"See how much smoking really costs you",
render:function(box){
  box.innerHTML='<h2>🚭 Smoking Cost</h2><label>Cigarettes per day</label><input type="number" id="t-n" value="10">'
  +'<label>Price per pack (20) Rs</label><input type="number" id="t-p" value="500">'
  +'<label>Years smoking</label><input type="number" id="t-y" value="5">'
  +'<button class="tool-btn" id="t-go">Calculate</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var n=parseFloat(el("t-n").value)||0, p=parseFloat(el("t-p").value)||0, y=parseFloat(el("t-y").value)||0;
    var perDay=n/20*p;
    outHTML(box,"Per day: "+money(perDay)+"\nPer month: "+money(perDay*30)+"\nPer year: "+money(perDay*365)
      +"\nIn "+y+" years: "+money(perDay*365*y)+" 😱\n\nQuitting saves "+money(perDay*365)+"/year — and your lungs! 💚");
  };
}});

/* ================= E. SITE ADD-ONS ================= */

TOOLS.push({ id:"feedback", cat:"site", icon:"💬", name:"Send Feedback / Report Bug",
desc:"Tell us what's broken — we fix fast",
render:function(box){
  box.innerHTML='<h2>💬 Feedback / Bug Report</h2><label>Your name</label><input type="text" id="t-n" placeholder="Your name">'
  +'<label>Type</label><select id="t-t"><option>💡 Suggestion</option><option>🐞 Bug report</option><option>❓ Question</option><option>❤️ Compliment</option></select>'
  +'<label>Message</label><textarea id="t-m" placeholder="Tell us what is on your mind..."></textarea>'
  +'<button class="tool-btn" id="t-go">Send Feedback</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var n=el("t-n").value.trim()||"Anonymous", t=el("t-t").value, m=el("t-m").value.trim();
    if(!m){ outHTML(box,"Please write a message."); return; }
    outHTML(box,"Sending...");
    var fd=new FormData();
    fd.append("_subject","US AI feedback: "+t);
    fd.append("name",n); fd.append("type",t); fd.append("message",m); fd.append("_captcha","false");
    fetch("https://formsubmit.co/ajax/4de22205ccafca608a7c4a00e6a34c92",{method:"POST",body:fd})
      .then(function(r){return r.json();})
      .then(function(){ outHTML(box,"✅ Thank you, "+esc(n)+"! Your feedback was sent."); })
      .catch(function(){ outHTML(box,"⚠️ Could not send right now. Email us directly at cyrilmp4665@gmail.com"); });
  };
}});

TOOLS.push({ id:"darkmode", cat:"site", icon:"🌙", name:"Dark / Light Mode Toggle",
desc:"Switch site theme — saves your choice",
render:function(box){
  box.innerHTML='<h2>🌙 Dark / Light Mode</h2><p class="tool-note">Current theme: <b id="t-cur"></b></p>'
  +'<div class="row"><button class="tool-btn" id="t-d">🌙 Dark</button><button class="tool-btn ghost" id="t-l">☀️ Light</button>'
  +'<button class="tool-btn ghost" id="t-a">🖥️ Auto</button></div><div class="tool-out" id="t-out"></div>';
  function cur(){ return document.documentElement.getAttribute("data-theme")||"dark"; }
  function show(){ el("t-cur").textContent=cur()==="light"?"Light ☀️":"Dark 🌙"; }
  function set(t){ if(t==="auto"){ document.documentElement.removeAttribute("data-theme");
      try{localStorage.removeItem("adv_theme");}catch(e){} }
    else { document.documentElement.setAttribute("data-theme",t);
      try{localStorage.setItem("adv_theme",t);}catch(e){} }
    show(); outHTML(box,"✅ Theme: "+(t==="auto"?"Auto (follows system)":t)); }
  show();
  el("t-d").onclick=function(){set("dark");}; el("t-l").onclick=function(){set("light");}; el("t-a").onclick=function(){set("auto");};
}});

TOOLS.push({ id:"pwa", cat:"site", icon:"📲", name:"Install App (PWA Guide)",
desc:"Install US AI as an app — offline support",
render:function(box){
  box.innerHTML='<h2>📲 Install US AI App</h2><div class="tool-out" id="t-out"></div>'
  +'<button class="tool-btn" id="t-go" style="display:none">⬇ Install App</button>'
  +'<p class="tool-note">On Android Chrome: menu ⋮ → "Add to Home screen". On iPhone Safari: Share → "Add to Home Screen".</p>';
  var msg="Manifest: "+(document.querySelector('link[rel="manifest"]')?"✅ found":"❌ missing")
    +"\nService worker: "+("serviceWorker" in navigator?"✅ supported":"❌ not supported")
    +"\nDisplay mode: "+(window.matchMedia("(display-mode: standalone)").matches?"📱 running as installed app":"🌐 running in browser");
  outHTML(box,msg);
  var dp=null;
  window.addEventListener("beforeinstallprompt",function(e){ e.preventDefault(); dp=e; el("t-go").style.display=""; });
  el("t-go").onclick=function(){ if(dp){ dp.prompt(); dp.userChoice.then(function(c){
    outHTML(box,msg+"\n\n"+(c.outcome==="accepted"?"✅ Installing...":"Dismissed.")); dp=null; }); } };
}});

TOOLS.push({ id:"pushnotify", cat:"site", icon:"🔔", name:"Push Notifications Setup",
desc:"Get notified about new tools & articles",
render:function(box){
  box.innerHTML='<h2>🔔 Push Notifications</h2><div class="tool-out" id="t-out"></div>'
  +'<button class="tool-btn" id="t-go">Enable Notifications</button>'
  +'<p class="tool-note">Honest note: full push delivery needs a backend server. This tool shows your browser permission status and can enable local test notifications.</p>';
  function show(){ outHTML(box,"Permission: "+("Notification" in window?Notification.permission:"not supported")); }
  show();
  el("t-go").onclick=function(){
    if(!("Notification" in window)){ outHTML(box,"❌ Not supported in this browser."); return; }
    Notification.requestPermission().then(function(p){ show();
      if(p==="granted"){ try{ new Notification("US AI ✅",{body:"Notifications enabled! You will get site updates."}); }catch(e){} } });
  };
}});

TOOLS.push({ id:"currency", cat:"site", icon:"💱", name:"PKR to USD Currency Switcher",
desc:"Switch prices between PKR & USD",
render:function(box){
  var rate=278, cur="PKR";
  try{ cur=localStorage.getItem("adv_cur")||"PKR"; }catch(e){}
  box.innerHTML='<h2>💱 Currency Switcher</h2><p class="tool-note">Your choice is saved and used across the site.</p>'
  +'<div class="row"><button class="tool-btn" id="t-p">🇵🇰 PKR</button><button class="tool-btn ghost" id="t-u">🇺🇸 USD</button></div>'
  +'<div class="tool-out" id="t-out"></div><p class="tool-note">Sample prices (rate Rs '+rate+' = $1):</p><div id="t-s"></div>';
  function fmt(pkr){ return cur==="PKR"?"Rs "+pkr.toLocaleString():"$"+(pkr/rate).toFixed(2); }
  function show(){
    var items=[["Residential Proxy /month",2500],["Datacenter Proxy /month",200],["HTTP ISP Proxy /month",2000],["RDP 4GB /month",400]];
    el("t-s").innerHTML=items.map(function(i){return '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--line)"><span>'+i[0]+'</span><b>'+fmt(i[1])+'</b></div>';}).join("");
    outHTML(box,"Active currency: "+cur);
  }
  function set(c){ cur=c; try{localStorage.setItem("adv_cur",c);}catch(e){} show(); }
  el("t-p").onclick=function(){set("PKR");}; el("t-u").onclick=function(){set("USD");};
  show();
}});

TOOLS.push({ id:"visitors", cat:"site", icon:"🚶", name:"Live Visitor Counter",
desc:"See how many people are on the site",
render:function(box){
  var v=0;
  try{ v=parseInt(localStorage.getItem("adv_visits")||"0")+1; localStorage.setItem("adv_visits",String(v)); }catch(e){ v=1; }
  var first=""; try{ first=localStorage.getItem("adv_first")||""; if(!first){ first=new Date().toLocaleDateString(); localStorage.setItem("adv_first",first);} }catch(e){}
  box.innerHTML='<h2>👥 Visitor Counter</h2>'
  +'<div style="text-align:center;padding:20px"><div style="font-size:3rem;font-weight:bold" class="grad">'+v+'</div>'
  +'<div class="muted">visits from this device</div></div>'
  +'<div class="tool-out" id="t-out"></div>'
  +'<button class="tool-btn ghost" id="t-r">Reset Counter</button>'
  +'<p class="tool-note">Counts visits on this device/browser. Site-wide analytics run via Google Analytics.</p>';
  outHTML(box,"First visit: "+(first||"today")+"\nThis is visit #"+v+" 🎉");
  el("t-r").onclick=function(){ try{localStorage.setItem("adv_visits","0");}catch(e){} outHTML(box,"Counter reset."); };
}});

TOOLS.push({ id:"washare", cat:"site", icon:"📤", name:"Share on WhatsApp",
desc:"Share any page via WhatsApp in one tap",
render:function(box){
  box.innerHTML='<h2>📤 Share on WhatsApp</h2><label>Page URL</label><input type="text" id="t-u" value="'+esc(location.href)+'">'
  +'<label>Message</label><input type="text" id="t-m" value="Check out US AI — free AI tools!">'
  +'<button class="tool-btn" id="t-go">📤 Open WhatsApp Share</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){
    var u=el("t-u").value.trim()||location.href, m=el("t-m").value.trim();
    var link="https://wa.me/?text="+encodeURIComponent(m+" "+u);
    outHTML(box,"Opening WhatsApp...\n"+link);
    window.open(link,"_blank");
  };
}});

TOOLS.push({ id:"printpage", cat:"site", icon:"🖨️", name:"Print This Page",
desc:"Print-friendly version of any page",
render:function(box){
  box.innerHTML='<h2>🖨️ Print Page</h2><p class="tool-note">Prints the current page with a clean layout (nav and buttons hidden automatically).</p>'
  +'<button class="tool-btn" id="t-go">🖨️ Print This Page</button><div class="tool-out" id="t-out"></div>';
  el("t-go").onclick=function(){ outHTML(box,"Opening print dialog..."); setTimeout(function(){window.print();},400); };
}});

TOOLS.push({ id:"pdfexport", cat:"site", icon:"📕", name:"Export Page as PDF",
desc:"Save any page as PDF — free",
render:function(box){
  box.innerHTML='<h2>📕 Export to PDF</h2>'
  +'<div class="tool-out" id="t-out">How to save this page as PDF:\n\n1. Click the button below\n2. In the print dialog, set Destination → "Save as PDF"\n3. Click Save ✅\n\nWorks in Chrome, Edge, Firefox and Safari — no software needed.</div>'
  +'<button class="tool-btn" id="t-go">📕 Save as PDF</button>';
  el("t-go").onclick=function(){ setTimeout(function(){window.print();},400); };
}});

TOOLS.push({ id:"adspots", cat:"site", icon:"📢", name:"Advertise With Us",
desc:"Banner ad spots — 728×90 & 300×250",
render:function(box){
  box.innerHTML='<h2>📢 Ad Spot Placements</h2><p class="tool-note">Reserved affiliate banner slots on US AI. Sizes follow IAB standards.</p>'
  +'<label>Leaderboard — 728×90 (homepage top)</label>'
  +'<div style="width:100%;max-width:728px;height:90px;margin:8px auto;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold">📢 728 × 90 — Your Ad Here</div>'
  +'<label>Medium Rectangle — 300×250 (sidebar)</label>'
  +'<div style="width:300px;max-width:100%;height:250px;margin:8px auto;background:linear-gradient(135deg,#ec4899,#f59e0b);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold">📢 300 × 250 — Your Ad Here</div>'
  +'<div class="tool-out" id="t-out">Advertise with US AI: contact cyrilmp4665@gmail.com</div>';
}});

/* ================= BOOTSTRAP ================= */

(function initHub(){
  var grid=el("tools-grid"), cats=el("tools-cats"), search=el("tool-search");
  var view=el("tool-view"), home=el("tools-home"), tbox=el("tool-box");
  if(!grid) return;
  var activeCat="all";
  cats.innerHTML=CATS.map(function(c){return '<button class="tool-cat'+(c.id==="all"?" active":"")+'" data-cat="'+c.id+'">'+c.name+'</button>';}).join("");
  cats.querySelectorAll(".tool-cat").forEach(function(b){
    b.onclick=function(){ activeCat=b.getAttribute("data-cat");
      cats.querySelectorAll(".tool-cat").forEach(function(x){x.classList.remove("active");});
      b.classList.add("active"); draw();
    };
  });
  function draw(){
    var q=(search.value||"").toLowerCase();
    var list=TOOLS.filter(function(t){
      return (activeCat==="all"||t.cat===activeCat)&&(!q||t.name.toLowerCase().indexOf(q)>-1||t.desc.toLowerCase().indexOf(q)>-1);
    });
    grid.innerHTML=list.map(function(t){
      return '<div class="tool-card" data-id="'+t.id+'"><span class="t-icon">'+t.icon+'</span><div class="t-name">'+esc(t.name)+'</div><div class="t-desc">'+esc(t.desc)+'</div></div>';
    }).join("")||'<p class="muted" style="grid-column:1/-1;text-align:center">No tools found.</p>';
    grid.querySelectorAll(".tool-card").forEach(function(c){
      c.onclick=function(){ openTool(c.getAttribute("data-id")); };
    });
  }
  function openTool(id){
    var t=TOOLS.filter(function(x){return x.id===id;})[0]; if(!t) return;
    if(tbox._cleanup){try{tbox._cleanup();}catch(e){} tbox._cleanup=null;}
    home.style.display="none"; view.classList.add("active");
    tbox.innerHTML='<div class="tool-out" id="__o" style="display:none"></div>';
    t.render(tbox);
    if(!tbox.querySelector(".tool-out")){var d=document.createElement("div");d.className="tool-out";tbox.appendChild(d);}
    window.scrollTo(0,0);
  }
  el("tool-back").onclick=function(){
    if(tbox._cleanup){try{tbox._cleanup();}catch(e){} tbox._cleanup=null;}
    view.classList.remove("active"); home.style.display="";
  };
  search.addEventListener("input",draw);
  var h=location.hash.replace("#","");
  draw();
  if(h) openTool(h);
  window.addEventListener("hashchange",function(){var id=location.hash.replace("#","");if(id)openTool(id);});
})();

})();
