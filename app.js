/*
  TANTA — DATA TANTANGAN
  Status dihitung otomatis dari waktu mulai/selesai di browser.
*/

const INSTAGRAM = {
  tanta: "https://www.instagram.com/tantanyata/",
  faqih: "https://www.instagram.com/qqiyyyh/"
};

const challenges = [
  {
    id: "01",
    title: "Bicara",
    description: "Temui Faqih dan ucapkan kalimat yang telah ditentukan.",
    start: "2026-09-29T14:00:00+07:00",
    end: "2026-09-29T15:00:00+07:00",
    startText: "Selasa, 29 September 2026 — 14.00 WIB",
    endText: "Selasa, 29 September 2026 — 15.00 WIB",
    prize: "Rpxxx",
    winnersCount: 1,
    method: [
      "Temui Faqih secara langsung pada waktu yang telah ditentukan.",
      "Ucapkan kalimat yang sudah ditentukan dengan suara yang jelas dan terdengar."
    ],
    quote: "Faqih i love you",
    rules: [
      "Tantangan harus dilakukan sesuai waktu yang telah ditentukan.",
      "Peserta harus bertemu dan berbicara langsung di depan Faqih.",
      "Suara harus jelas dan terdengar, bukan berbisik.",
      "Kalimat harus diucapkan sesuai yang telah ditentukan.",
      "Tantangan hanya berlaku selama waktu yang ditentukan.",
      "Peserta pertama yang berhasil memenuhi seluruh ketentuan menjadi pemenang.",
      "Keputusan mengenai terpenuhinya ketentuan tantangan ditentukan oleh Faqih."
    ],
    claim: {
      type: "direct",
      text: "Karena tantangan ini mengharuskan peserta bertemu langsung dengan Faqih, hadiah diberikan langsung kepada pemenang setelah tantangan dinyatakan berhasil."
    },
    winner: "Jacob"
  },
  {
    id: "02",
    title: "Keluarga",
    description: "Ucapkan \"I love you\" kepada setiap anggota keluargamu, terutama ayah dan ibu.",
    start: "2026-09-30T00:00:00+07:00",
    end: null,
    startText: "Rabu, 30 September 2026 — 00.00 WIB",
    endText: "∞ (Infinity)",
    prize: "Hubungan keluarga menjadi lebih erat",
    winnersCount: 0,
    method: [
      "Luangkan waktu untuk bersama keluargamu.",
      "Ucapkan \"I love you\" kepada setiap anggota keluarga yang kamu temui, terutama ayah dan ibu.",
      "Sampaikan dengan tulus dan langsung, bukan sekadar untuk menyelesaikan tantangan.",
      "Kalau memungkinkan, lanjutkan dengan mengobrol, mengucapkan terima kasih, atau melakukan hal baik bersama keluarga."
    ],
    quote: "I love you",
    rules: [
      "Tantangan dimulai pada 30 September 2026 pukul 00.00 WIB.",
      "Tantangan tidak memiliki batas waktu dan berlangsung Infinity.",
      "Target utama adalah ayah dan ibu, tetapi tantangan dianjurkan dilakukan kepada seluruh anggota keluarga.",
      "Ucapan harus disampaikan dengan tulus dan tidak boleh digunakan untuk merendahkan atau mempermalukan anggota keluarga.",
      "Tidak ada perlombaan, urutan pemenang, atau jumlah peserta yang dibatasi.",
      "Tidak ada hadiah berupa uang atau barang.",
      "Hadiah dari tantangan ini adalah hubungan keluarga yang menjadi lebih erat.",
      "Tidak ada sistem klaim hadiah. Tantangan ini dilakukan untuk diri sendiri dan keluarga."
    ],
    claim: null,
    winner: null
  }
];

function getStatus(challenge) {
  const now = Date.now();
  const start = new Date(challenge.start).getTime();

  if (now < start) return { key: "mendatang", label: "Mendatang" };

  // end === null berarti tantangan berlangsung tanpa batas waktu.
  if (challenge.end === null) return { key: "mulai", label: "Berlangsung" };

  const end = new Date(challenge.end).getTime();
  if (now <= end) return { key: "mulai", label: "Mulai" };
  return { key: "selesai", label: "Selesai" };
}

function statusBadge(challenge) {
  const s = getStatus(challenge);
  return `<span class="status ${s.key}">${svgIcon("dot", "status-dot")}<span>${s.label}</span></span>`;
}

function svgIcon(name, cls = "ui-icon") {
  const icons = {
    back: '<path d="m15 5-7 7 7 7"/>',
    arrow: '<path d="M5 12h13"/><path d="m13 6 6 6-6 6"/>',
    external: '<path d="M14 5h5v5"/><path d="m19 5-9 9"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    gift: '<rect x="4" y="9" width="16" height="11" rx="2"/><path d="M3 9h18v4H3z"/><path d="M12 9v11"/><path d="M12 9H8.5a2.5 2.5 0 1 1 0-5c2.2 0 3.5 5 3.5 5Z"/><path d="M12 9h3.5a2.5 2.5 0 1 0 0-5c-2.2 0-3.5 5-3.5 5Z"/>',
    crown: '<path d="m4 7 3 3 5-6 5 6 3-3-2 12H6L4 7Z"/><path d="M6 16h12"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    dot: '<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>',
    quote: '<path d="M7 8h4v5H8.5A3.5 3.5 0 0 0 12 16.5V18A6 6 0 0 1 6 12V9a1 1 0 0 1 1-1Zm10 0h4v5h-2.5A3.5 3.5 0 0 0 22 16.5V18a6 6 0 0 1-6-6V9a1 1 0 0 1 1-1Z"/>'
  };
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ""}</svg>`;
}

const app = document.getElementById("app");

function home(push = true) {
  if (push) history.pushState({ page: "home" }, "", location.pathname + location.search);
  app.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">${svgIcon("dot", "eyebrow-icon")}Tantangan Nyata</div>
      <h1>Semua tantangan.</h1>
      <p>Pilih tantangan yang ingin kamu lihat. Setiap tantangan punya waktu, aturan, hadiah, dan pemenangnya sendiri.</p>
    </section>
    <section class="challenge-list">
      <section class="ad-card" aria-label="Iklan">
        <div class="ad-label">Iklan</div>
        <div class="ad-content">
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-1648640273473007"
               data-ad-slot="ISI_AD_SLOT_ID_DI_SINI"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </section>
      ${[...challenges]
        .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime())
        .map(cardTemplate)
        .join("")}
    </section>
  `;
  bindCards();
  setNav("home");
  window.scrollTo({top:0, behavior:"smooth"});
}

function cardTemplate(c) {
  return `
    <button class="challenge-card" data-challenge="${c.id}" aria-label="Buka Tantangan ${c.id}">
      ${statusBadge(c)}
      <div class="card-title">Tantangan ${c.id} — ${escapeHtml(c.title)}</div>
      <div class="card-desc">${escapeHtml(c.description)}</div>
      <div class="card-meta">
        <div class="meta-item">
          <span class="meta-label">Waktu</span>
          <span class="meta-value">${escapeHtml(c.startText.replace(" — ", " · "))}${c.end ? "–" + escapeHtml(c.endText.split(" — ")[1] || "") : " · ∞"}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Hadiah</span>
          <span class="meta-value">${escapeHtml(c.prize)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Pemenang</span>
          <span class="meta-value">${c.winnersCount ? c.winnersCount + " orang" : "Tidak ada"}</span>
        </div>
      </div>
      <span class="card-arrow" aria-hidden="true">${svgIcon("arrow")}</span>
    </button>
  `;
}

function detail(id, push = true) {
  if (push) history.pushState({ page: "detail", id }, "", location.pathname + location.search + "#challenge-" + encodeURIComponent(id));
  const c = challenges.find(x => x.id === id);
  if (!c) return home();
  app.innerHTML = `
    <section class="detail-top">
      <button class="back-link" id="backHome">${svgIcon("back")}<span>Kembali ke Home</span></button>
      ${statusBadge(c)}
      <h1 class="detail-title">Tantangan ${c.id}<br>${escapeHtml(c.title)}</h1>
      <p class="detail-desc">${escapeHtml(c.description)}</p>
      <div class="quote"><span class="quote-mark">${svgIcon("quote")}</span>${escapeHtml(c.quote)}</div>
    </section>

    <section class="info-grid">
      <div class="info-cell"><div class="info-label">Waktu mulai</div><div class="info-value">${escapeHtml(c.startText)}</div></div>
      <div class="info-cell"><div class="info-label">Waktu selesai</div><div class="info-value">${escapeHtml(c.endText)}</div></div>
      <div class="info-cell"><div class="info-label">Hadiah</div><div class="info-value">${escapeHtml(c.prize)}</div></div>
      <div class="info-cell"><div class="info-label">${c.winnersCount ? "Jumlah pemenang" : "Pemenang"}</div><div class="info-value">${c.winnersCount ? c.winnersCount + " orang" : "Tidak ada"}</div></div>
    </section>

    <section class="section">
      <div class="section-head"><span class="section-icon">${svgIcon("external")}</span>Cara Melakukan</div>
      <ol class="steps">
        ${c.method.map((x,i)=>`<li><span class="step-num">${i+1}</span><span>${escapeHtml(x)}</span></li>`).join("")}
      </ol>
    </section>

    <section class="section">
      <div class="section-head"><span class="section-icon">${svgIcon("check")}</span>Aturan</div>
      <ul class="rules">${c.rules.map(x=>`<li>${svgIcon("dot", "rule-dot")}<span>${escapeHtml(x)}</span></li>`).join("")}</ul>
    </section>

    <section class="section">
      <div class="section-head"><span class="section-icon">${svgIcon("instagram")}</span>Wajib Follow</div>
      <div class="follow-box">
        <div class="follow-title">Sebelum mengikuti tantangan</div>
        <div class="follow-desc">Pastikan kamu sudah mengikuti kedua akun Instagram di bawah ini.</div>
        <div class="ig-row">
          <a class="ig-btn" href="${INSTAGRAM.tanta}" target="_blank" rel="noopener">
            <span class="ig-left"><span class="ig-icon">${svgIcon("instagram")}</span><span>@tantanyata<br><small style="font-weight:500;color:#777">Instagram Tanta</small></span></span><span>${svgIcon("external")}</span>
          </a>
          <a class="ig-btn" href="${INSTAGRAM.faqih}" target="_blank" rel="noopener">
            <span class="ig-left"><span class="ig-icon">${svgIcon("instagram")}</span><span>@qqiyyyh<br><small style="font-weight:500;color:#777">Faqih — pembuat Tanta</small></span></span><span>${svgIcon("external")}</span>
          </a>
        </div>
      </div>
    </section>

    ${c.claim ? `
    <section class="section">
      <div class="section-head"><span class="section-icon">${svgIcon("gift")}</span>Cara Klaim Hadiah</div>
      <div class="winner">${escapeHtml(c.claim.text)}</div>
    </section>` : `
    <section class="section">
      <div class="section-head"><span class="section-icon">${svgIcon("gift")}</span>Tentang Hadiah</div>
      <div class="winner">Tidak ada hadiah yang perlu diklaim. Hadiah dari tantangan ini adalah hubungan keluarga yang menjadi lebih erat.</div>
    </section>`}

    ${c.winner ? `
    <section class="section">
      <div class="section-head"><span class="section-icon">${svgIcon("crown")}</span>Pemenang</div>
      <div class="winner"><span class="winner-name">${escapeHtml(c.winner)}</span></div>
    </section>` : `
    <section class="section">
      <div class="section-head"><span class="section-icon">${svgIcon("crown")}</span>Pemenang</div>
      <div class="winner">Tidak ada. Ini bukan perlombaan.</div>
    </section>`}

    <a class="primary-btn" href="${INSTAGRAM.tanta}" target="_blank" rel="noopener">Instagram Tanta ${svgIcon("external")}</a>
  `;

  document.getElementById("backHome").addEventListener("click", () => history.back());
  setNav(null);
  window.scrollTo({top:0, behavior:"smooth"});
}

function about(push = true) {
  if (push) history.pushState({ page: "about" }, "", location.pathname + location.search + "#about");
  app.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">${svgIcon("dot", "eyebrow-icon")}Tanta</div>
      <h1>Tentang Tanta.</h1>
      <p>Tantangan nyata, dilakukan di dunia nyata.</p>
    </section>

    <section class="about-card">
      <h2>Tentang Tanta</h2>
      <p>Tanta adalah singkatan dari <strong>Tantangan Nyata</strong>, tempat untuk menemukan dan mengikuti berbagai tantangan yang dilakukan secara nyata di dunia.</p>
      <div class="creator">
        <div class="creator-mark">F</div>
        <div><small>Dibuat oleh</small><strong>Faqih Musyaffa</strong></div>
      </div>
    </section>

    <section class="about-card">
      <h2>Cara Main</h2>
      <ol class="steps">
        <li><span class="step-num">1</span><span>Pilih tantangan yang ingin kamu ikuti.</span></li>
        <li><span class="step-num">2</span><span>Baca cara, aturan, waktu, hadiah, dan ketentuan follow Instagram.</span></li>
        <li><span class="step-num">3</span><span>Lakukan tantangan sesuai ketentuan.</span></li>
        <li><span class="step-num">4</span><span>Klaim hadiah sesuai cara klaim pada tantangan.</span></li>
      </ol>
    </section>

    <section class="about-card">
      <h2>Informasi</h2>
      <div class="accordion">
        <div class="acc-item open">
          <button class="acc-btn">Aturan Tanta <span class="chev">${svgIcon("chevron")}</span></button>
          <div class="acc-content">Setiap tantangan memiliki aturan masing-masing. Peserta wajib membaca dan memahami seluruh ketentuan sebelum mengikuti tantangan.</div>
        </div>
        <div class="acc-item">
          <button class="acc-btn">Ide & Kritik <span class="chev">${svgIcon("chevron")}</span></button>
          <div class="acc-content">Punya ide atau kritik untuk Tanta? Kirim langsung melalui Instagram Tanta.</div>
        </div>
        <div class="acc-item">
          <button class="acc-btn">Tentang Hadiah <span class="chev">${svgIcon("chevron")}</span></button>
          <div class="acc-content">Cara pemberian hadiah mengikuti jenis tantangan. Tantangan tertentu dapat memberikan hadiah langsung, sementara tantangan yang membutuhkan bukti dapat menggunakan klaim melalui DM Instagram.</div>
        </div>
      </div>
    </section>

    <a class="primary-btn" href="${INSTAGRAM.tanta}" target="_blank" rel="noopener">Ikuti @tantanyata ${svgIcon("external")}</a>
    <div style="height:10px"></div>
    <a class="ig-btn" href="${INSTAGRAM.faqih}" target="_blank" rel="noopener">
      <span class="ig-left"><span class="ig-icon">${svgIcon("instagram")}</span><span>@qqiyyyh<br><small style="font-weight:500;color:#777">Instagram pribadi Faqih</small></span></span><span>${svgIcon("external")}</span>
    </a>
  `;

  document.querySelectorAll(".acc-btn").forEach(btn=>{
    btn.addEventListener("click",()=>btn.parentElement.classList.toggle("open"));
  });

  setNav("about");
  window.scrollTo({top:0, behavior:"smooth"});
}

function bindCards() {
  document.querySelectorAll("[data-challenge]").forEach(card=>{
    card.addEventListener("click",()=>detail(card.dataset.challenge));
  });
}

function setNav(page){
  document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active", x.dataset.go===page));
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[s]));
}

document.addEventListener("click", e=>{
  const btn=e.target.closest("[data-go]");
  if(!btn) return;
  const page=btn.dataset.go;
  if(page==="home") home();
  if(page==="about") about();
});

if (!history.state) history.replaceState({ page: "home" }, "", location.pathname + location.search);

home(false);

window.addEventListener("popstate", event => {
  const state = event.state || { page: "home" };
  if (state.page === "detail" && state.id) detail(state.id, false);
  else if (state.page === "about") about(false);
  else home(false);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).catch(() => {});
  });
}

try {
  (window.adsbygoogle = window.adsbygoogle || []).push({});
} catch (e) {}

setInterval(()=>{
  const current = document.querySelector("[data-challenge]");
  if (current && app.querySelector(".challenge-card")) home();
}, 60000);
