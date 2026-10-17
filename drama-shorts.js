/* Drama shorts data — entries added by the daily drama-shorts cron.
   Har drama: { name, emoji, shorts: [ { title, src, desc, tag, poster, yt } ] }
   - src: video file ka path (e.g. "trailers/ertugrul-ghazi/shorts/ertugrul-ghazi-short1.mp4")
   - tag: "Trailer" ya "Short"
   - poster: optional thumbnail image
   - desc: Urdu description
   - yt: original YouTube link
*/
window.DRAMA_SHORTS = [
  { name: "Diriliş: Ertuğrul (Ertugrul Ghazi)", emoji: "⚔️", shorts: [
    { title: "ارطغرل غازی — پہلے سیزن کا تعارفی پرومو", src: "trailers/ertugrul-ghazi/shorts/ertugrul-ghazi-short3.mp4", desc: "دیریلیش ارطغرل کے پہلے سیزن کا آفیشل تعارفی پرومو — ارطغرل کا مشہور عہد: «جب تک نیلا آسمان نہ گرے اور کالی زمین نہ پھٹے، میں ظلم کے آگے سر نہیں جھکاؤں گا»۔ Diriliş Ertuğrul آفیشل چینل، اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "0:30", youtube: "https://www.youtube.com/watch?v=lqVifbXOP6M", poster: "trailers/ertugrul-ghazi/shorts/ertugrul-ghazi-short3-poster.jpg" },
    { title: "ارطغرل غازی — 137ویں قسط کا پرومو", src: "trailers/ertugrul-ghazi/shorts/ertugrul-ghazi-short2.mp4", desc: "ارطغرل غازی کے 137ویں ایپیسوڈ کا آفیشل پرومو — قبیلے کی عزت اور ظالموں کے خلاف اعلان جنگ۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "0:41", youtube: "https://www.youtube.com/watch?v=0wGNpGO5y3Q", poster: "https://i.ytimg.com/vi/0wGNpGO5y3Q/hqdefault.jpg" },
    { title: "ارطغرل غازی — 56ویں قسط کا پرومو", src: "trailers/ertugrul-ghazi/shorts/ertugrul-ghazi-short1.mp4", desc: "ارطغرل غازی کے 56ویں ایپیسوڈ کا آفیشل پرومو — سلطان علاء الدین کا لشکر اور شہزادہ یغیت کی سازش۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "0:31", youtube: "https://www.youtube.com/watch?v=b_ITWId_npM", poster: "https://i.ytimg.com/vi/b_ITWId_npM/hqdefault.jpg" }
  ] },
  { name: "Kuruluş: Osman (Osman Ghazi)", emoji: "🗡️", shorts: [
    { title: "عثمان غازی — پانچویں سیزن کا تعارفی پرومو", src: "trailers/osman-ghazi/shorts/osman-ghazi-short3.mp4", desc: "کرولوش عثمان کے پانچویں سیزن کا آفیشل تعارفی پرومو — «برسا یا میری ہوگی یا تمہاری» اور عثمان بے کے بیٹے اورخان کا تعارف۔ Kuruluş Osman آفیشل چینل (atv)، اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "0:30", youtube: "https://www.youtube.com/watch?v=P1P2oDFX32k", poster: "trailers/osman-ghazi/shorts/osman-ghazi-short3-poster.jpg" },
    { title: "عثمان غازی — 190ویں قسط کا پرومو", src: "trailers/osman-ghazi/shorts/osman-ghazi-short2.mp4", desc: "کرولوش عثمان کے 190ویں ایپیسوڈ کا آفیشل پرومو — فتح کی زمینوں کی حفاظت اور خونریز جنگ کی نوید۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "0:37", youtube: "https://www.youtube.com/watch?v=enr-eflQ-e4", poster: "https://i.ytimg.com/vi/enr-eflQ-e4/hqdefault.jpg" },
    { title: "عثمان غازی — دوسرے سیزن کا پرومو", src: "trailers/osman-ghazi/shorts/osman-ghazi-short1.mp4", desc: "کرولوش عثمان کے دوسرے سیزن کا آفیشل تعارفی پرومو — نیا دور، نئی جنگیں، اٹل عزم۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "1:59", youtube: "https://www.youtube.com/watch?v=saLAt75r6dg", poster: "https://i.ytimg.com/vi/saLAt75r6dg/hqdefault.jpg" }
  ] },
  { name: "Kuruluş: Orhan", emoji: "🏹", shorts: [
    { title: "اورخان غازی — پہلا تعارفی پرومو", src: "trailers/orhan-ghazi/shorts/orhan-ghazi-short2.mp4", desc: "کرولوش اورخان کا پہلا آفیشل تعارفی پرومو — «میں عثمان بے کا بیٹا اورخان ہوں، ہم آ گئے ہیں»۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "1:39", youtube: "https://www.youtube.com/watch?v=cBOt9Jm28Fo", poster: "https://i.ytimg.com/vi/cBOt9Jm28Fo/hqdefault.jpg" },
    { title: "اورخان غازی — پہلی قسط کا پرومو", src: "trailers/orhan-ghazi/shorts/orhan-ghazi-short1.mp4", desc: "کرولوش اورخان کی پہلی قسط کا آفیشل پرومو — عثمان کے بیٹے کی داستان شروع۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "1:21", youtube: "https://www.youtube.com/watch?v=H0RtRNaVDIg", poster: "https://i.ytimg.com/vi/H0RtRNaVDIg/hqdefault.jpg" }
  ] },
  { name: "Alparslan: Büyük Selçuklu", emoji: "🦅", shorts: [
    { title: "الپ ارسلان کی داستان — خصوصی پرومو", src: "trailers/alparslan-buyuk-selcuklu/shorts/alparslan-buyuk-selcuklu-short2.mp4", desc: "الپ ارسلان کا خصوصی پرومو — سلجوق کا سورج طلوع ہو گا، داستان لکھنے کے لیے تیار ہو جاؤ۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "0:49", youtube: "https://www.youtube.com/watch?v=tiW-br_Lu9k", poster: "https://i.ytimg.com/vi/tiW-br_Lu9k/hqdefault.jpg" },
    { title: "الپ ارسلان — پہلا تعارفی پرومو", src: "trailers/alparslan-buyuk-selcuklu/shorts/alparslan-buyuk-selcuklu-short1.mp4", desc: "الپ ارسلان عظیم سلجوق کا پہلا آفیشل تعارفی پرومو — ترک اوغوز نسل کے بہادر سلطان کی داستان۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "0:52", youtube: "https://www.youtube.com/watch?v=kuNzg9AjcjY", poster: "https://i.ytimg.com/vi/kuNzg9AjcjY/hqdefault.jpg" }
  ] },
  { name: "Uyanış: Büyük Selçuklu", emoji: "🌙", shorts: [
    { title: "بیداری عظیم سلجوق — آج کی نشریات", src: "trailers/uyanis-buyuk-selcuklu/shorts/uyanis-buyuk-selcuklu-short2.mp4", desc: "بیداری عظیم سلجوق کا آفیشل پرومو — اناطولیہ میں بازنطین کے خلاف تلوار۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "0:31", youtube: "https://www.youtube.com/watch?v=TX9H5vPqOfA", poster: "https://i.ytimg.com/vi/TX9H5vPqOfA/hqdefault.jpg" },
    { title: "بیداری عظیم سلجوق — رسمی پرومو", src: "trailers/uyanis-buyuk-selcuklu/shorts/uyanis-buyuk-selcuklu-short1.mp4", desc: "بیداری عظیم سلجوق کا رسمی آفیشل پرومو — ملک شاہ اور سلجوق کی بیداری کی داستان۔ اردو سب ٹائٹلز کے ساتھ۔", tag: "Short", dur: "1:07", youtube: "https://www.youtube.com/watch?v=YBmO08Xz6-g", poster: "https://i.ytimg.com/vi/YBmO08Xz6-g/hqdefault.jpg" }
  ] },
  { name: "Mehmed: Fetihler Sultanı", emoji: "🏰", shorts: [
    { title: "محمد فاتح سلطان — 88ویں قسط کا ٹریلر",
      src: "trailers/mehmed-fetihler-sultani/shorts/mehmed-fetihler-sultani-short1.mp4",
      desc: "88ویں قسط کا آفیشل ٹریلر اردو سب ٹائٹلز کے ساتھ — طاقت اور انصاف کی کشمکش۔ TRT1 آفیشل۔",
      tag: "Short",
      poster: "trailers/mehmed-fetihler-sultani/mehmed-fetihler-sultani_ur2-poster.jpg",
      yt: "https://www.youtube.com/watch?v=L2yhL3J45Cg" },
    { title: "محمد فاتح سلطان — 88ویں قسط کا پرومو",
      src: "trailers/mehmed-fetihler-sultani/shorts/mehmed-fetihler-sultani-short2.mp4",
      desc: "88ویں قسط کا آفیشل پرومو اردو سب ٹائٹلز کے ساتھ — کرامان اوغلو سے ٹکراؤ۔ آفیشل سیریز چینل۔",
      tag: "Short",
      poster: "trailers/mehmed-fetihler-sultani/mehmed-fetihler-sultani_ur3-poster.jpg",
      yt: "https://www.youtube.com/watch?v=jOP6Wxs3Jyo" },
    { title: "محمد فاتح سلطان — 88ویں قسط کا دوسرا ٹریلر",
      src: "trailers/mehmed-fetihler-sultani/shorts/mehmed-fetihler-sultani-short3.mp4",
      desc: "88ویں قسط کا دوسرا آفیشل ٹریلر اردو سب ٹائٹلز کے ساتھ — روم کی مہم ملتوی، اب رخ مشرق کی طرف! TRT1 آفیشل۔",
      tag: "Short",
      dur: "0:30",
      poster: "trailers/mehmed-fetihler-sultani/shorts/mehmed-fetihler-sultani-short3-poster.jpg",
      yt: "https://www.youtube.com/watch?v=yn15-7qYdB0" }
  ] },
  { name: "Kudüs Fatihi Selahaddin Eyyubi", emoji: "🕌", shorts: [
    { title: "صلاح الدین ایوبی — سیزن فائنل ٹریلر",
      src: "trailers/selahaddin-eyyubi/shorts/selahaddin-eyyubi-short1.mp4",
      desc: "28ویں قسط (سیزن فائنل) کا آفیشل ٹریلر اردو سب ٹائٹلز کے ساتھ — یہ تلوار تمام مسلمانوں کی ہے۔ TRT1 آفیشل۔",
      tag: "Short",
      poster: "trailers/selahaddin-eyyubi/selahaddin-eyyubi_ur2-poster.jpg",
      yt: "https://www.youtube.com/watch?v=CD57kZa-hOc" },
    { title: "صلاح الدین ایوبی — 27ویں قسط کا ٹریلر",
      src: "trailers/selahaddin-eyyubi/shorts/selahaddin-eyyubi-short2.mp4",
      desc: "27ویں قسط کا آفیشل ٹریلر اردو سب ٹائٹلز کے ساتھ — غزہ کی جنگ۔ TRT1 آفیشل۔",
      tag: "Short",
      poster: "trailers/selahaddin-eyyubi/selahaddin-eyyubi_ur3-poster.jpg",
      yt: "https://www.youtube.com/watch?v=Wex5PwhoEOE" }
  ] },
  { name: "Barbaroslar: Akdeniz'in Kılıcı", emoji: "⚓", shorts: [
    { title: "باربروس — بحیرہ روم کی تلوار (ٹریلر)",
      src: "trailers/barbaroslar-akdenizin-kilici/shorts/barbaroslar-akdenizin-kilici-short1.mp4",
      desc: "باربروس بھائیوں کی بحری مہم جوئی — عثمانی بحری بیڑا دشمنوں کے خلاف سمندر میں اتر آیا۔ TRT 1 کا آفیشل چوتھا ٹریلر، اردو سب ٹائٹلز کے ساتھ۔",
      tag: "Short",
      yt: "https://www.youtube.com/watch?v=I4MbYlawoII" },
    { title: "بارباروسلار — 19ویں قسط کا دوسرا ٹریلر",
      src: "trailers/barbaroslar-akdenizin-kilici/shorts/barbaroslar-akdenizin-kilici-short2.mp4",
      desc: "19ویں قسط کا دوسرا آفیشل ٹریلر اردو سب ٹائٹلز کے ساتھ — قلعے کی سرنگ۔ TRT1 آفیشل۔",
      tag: "Short",
      poster: "trailers/barbaroslar-akdenizin-kilici/barbaroslar-akdenizin-kilici_ur3-poster.jpg",
      yt: "https://www.youtube.com/watch?v=WlO_s5_2uuw" }
  ] },
  { name: "Payitaht: Abdülhamid", emoji: "👑", shorts: [
    { title: "پایہ تخت عبدالحمید — نئے سیزن کا پرومو",
      src: "trailers/payitaht-abdulhamid/shorts/payitaht-abdulhamid-short1.mp4",
      desc: "تیسرے سیزن کا آفیشل پرومو اردو سب ٹائٹلز کے ساتھ — سلطان کا عزم اٹل۔ TRT آفیشل۔",
      tag: "Short",
      poster: "trailers/payitaht-abdulhamid/payitaht-abdulhamid_ur2-poster.jpg",
      yt: "https://www.youtube.com/watch?v=9QGda1fEBGU" },
    { title: "پایہ تخت عبدالحمید — 114ویں قسط کا ٹریلر",
      src: "trailers/payitaht-abdulhamid/shorts/payitaht-abdulhamid-short2.mp4",
      desc: "114ویں قسط کا آفیشل ٹریلر اردو سب ٹائٹلز کے ساتھ۔ TRT1 آفیشل۔",
      tag: "Short",
      poster: "trailers/payitaht-abdulhamid/payitaht-abdulhamid_ur3-poster.jpg",
      yt: "https://www.youtube.com/watch?v=mFzVi9pKwIY" }
  ] },
  { name: "Destan", emoji: "🔥", shorts: [
    { title: "دستان — آفیشل ٹریلر 1",
      src: "trailers/destan/shorts/destan-short1.mp4",
      desc: "دستان کا پہلا آفیشل ٹریلر اردو سب ٹائٹلز کے ساتھ — اکّز اور باتوغا کی داستان۔ آفیشل Destan چینل۔",
      tag: "Short",
      poster: "trailers/destan/destan_ur-poster.jpg",
      yt: "https://www.youtube.com/watch?v=DwRxlm6VglM" },
    { title: "دستان — دوسرا تعارفی ٹیزر",
      src: "trailers/destan/shorts/destan-short2.mp4",
      desc: "دستان کا دوسرا آفیشل تعارفی ٹیزر اردو سب ٹائٹلز کے ساتھ۔ @Destan | atv آفیشل۔",
      tag: "Short",
      poster: "trailers/destan/destan_ur2-poster.jpg",
      yt: "https://www.youtube.com/watch?v=AFwF5heqGbc" },
    { title: "داستان — 13ویں قسط کا ٹریلر",
      src: "trailers/destan/shorts/destan-short3.mp4",
      desc: "دستان کی 13ویں قسط کا آفیشل ٹریلر اردو سب ٹائٹلز کے ساتھ — جھوٹ کی سزا موت! آفیشل atv چینل۔",
      tag: "Short",
      dur: "0:30",
      poster: "trailers/destan/shorts/destan-short3-poster.jpg",
      yt: "https://www.youtube.com/watch?v=GSbj5EYnvYE" }
  ] }
];
