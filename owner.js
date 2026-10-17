/* US AI Owner system — device-local owner gate.
   The site has no backend, so "owner mode" is a device-local flag:
   login with the owner email + the secret owner PIN unlocks the
   hidden Admin Panel on THAT device/browser only.
   The PIN itself is never stored here — only its SHA-256 hash. */
(function () {
  var OWNER_EMAIL = "cyrilmp4665@gmail.com";
  var PIN_HASH = "4a3cfb5195192f8260912a5b5e9b2486eb74c317a5dd4edef70255bdb8d38acb"; // sha256("sawalai-owner:"+PIN)
  var FLAG = "sawalai_owner_ok";
  var FLAG_LONG = "sawalai_owner_device";

  function sha256hex(str) {
    if (window.crypto && crypto.subtle) {
      return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(function (buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function (b) {
          return ("0" + b.toString(16)).slice(-2);
        }).join("");
      });
    }
    /* fallback: tiny sync hash (non-crypto, obfuscation only) */
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57, i;
    for (i = 0; i < str.length; i++) {
      var ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return Promise.resolve((h2 >>> 0).toString(16) + (h1 >>> 0).toString(16));
  }

  function currentEmail() {
    try {
      if (window.SawalShop && SawalShop.currentUser) {
        var u = SawalShop.currentUser();
        return u ? String(u.email || "").toLowerCase() : "";
      }
    } catch (e) {}
    return "";
  }

  window.SawalOwner = {
    email: OWNER_EMAIL,
    isOwnerEmail: function (email) {
      return String(email || "").trim().toLowerCase() === OWNER_EMAIL;
    },
    /* verify PIN → unlock owner mode. remember=true keeps it on this device (localStorage) */
    verify: function (pin, remember) {
      return sha256hex("sawalai-owner:" + String(pin || "").trim()).then(function (h) {
        if (h === PIN_HASH) {
          try {
            if (remember) localStorage.setItem(FLAG_LONG, "1");
            else sessionStorage.setItem(FLAG, "1");
          } catch (e) {}
          return true;
        }
        return false;
      });
    },
    isOwner: function () {
      var ok = false;
      try {
        ok = sessionStorage.getItem(FLAG) === "1" || localStorage.getItem(FLAG_LONG) === "1";
      } catch (e) {}
      if (!ok) return false;
      return currentEmail() === OWNER_EMAIL;
    },
    lock: function () {
      try { sessionStorage.removeItem(FLAG); localStorage.removeItem(FLAG_LONG); } catch (e) {}
    }
  };
})();
