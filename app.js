/*
  TANTA — DATA TANTANGAN
  ==========================================
  Kalau mau menambah tantangan:
  1. Copy object "challenge" di bawah.
  2. Taruh tantangan baru DI ATAS tantangan lama.
  3. Ubah isi yang diperlukan.
  4. Tidak perlu database/server.

  Status dihitung otomatis dari waktu mulai/selesai di browser.
*/

const INSTAGRAM = {
  tanta: "https://www.instagram.com/tantanyata?stkn=b2RpbzF2OTczdWc1",
  faqih: "https://www.instagram.com/qqiyyyh?stkn=cWloNzkwNHQ2bXM3"
};

const challenges = [
  {
    id: "01",
    title: "xxx",
    description: "Temui Faqih dan ucapkan kalimat yang telah ditentukan.",
    start: "2026-10-02T10:10:00+07:00",
    end: "2026-10-02T11:00:00+07:00",
    startText: "xxx, xxx Oktober 2026 — xxx WIB",
    endText: "xxx, xxx Oktober 2026 — xxx WIB",
    prize: "Rp50.000",
    winnersCount: 1,
    method: [
      "Temui Faqih secara langsung pada waktu yang telah ditentukan.",
      "Ucapkan kalimat yang sudah ditentukan dengan suara yang jelas dan terdengar."
    ],
    quote: "xxx",
    rules: [
      "Tantangan harus dilakukan sesuai waktu yang telah ditentukan.",
      "Peserta harus bertemu dan berbicara langsung di depan Faqih.",
      "Suara harus jelas dan keras, bukan berbisik.",
      "Kalimat harus diucapkan sesuai yang telah ditentukan.",
      "Tantangan hanya berlaku selama waktu yang ditentukan.",
      "Peserta pertama yang berhasil memenuhi seluruh ketentuan menjadi pemenang.",
      "Keputusan mengenai terpenuhinya ketentuan tantangan ditentukan oleh Faqih."
    ],
    claim: {
      type: "direct",
      text: "Karena tantangan ini mengharuskan peserta bertemu langsung dengan Faqih, hadiah diberikan langsung kepada pemenang setelah tantangan dinyatakan berhasil."
    },
    winner: null
  }
];

function getStatus(challenge) {
  const now = Date.now();
  const start = new Date(challenge.start).getTime();
  const end = new Date(challenge.end).getTime();
  if (now < start) return { key: "mendatang", label: "Mendatang" };
  if (now <= end) return { key: "mulai", label: "Mulai" };
  return { key: "selesai", label: "Selesai" };
}

function statusBadge(challenge) {
  const s = getStatus(challenge);
  return `<span class="status ${s.key}"><span class="status-dot"></span>${s.label}</span>`;
}

const app = document.getElementById("app");
const topBack = document.getElementById("topBack");

function home() {
  topBack.hidden = true;
  app.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">Tantangan</div>
      <h1>Semua tantangan.</h1>
      <p>Pilih tantangan yang ingin kamu ikuti. Baca ketentuannya dengan baik sebelum mulai.</p>
    </section>
    <section class="challenge-list">
      ${challenges.map(cardTemplate).join("")}
    </section>
  `;
  bindCards();
  setNav("home");
  window.scrollTo({top:0, behavior:"smooth"});
}

function cardTemplate(c) {
  return `
    <button class="challenge-card" data-challenge="${c.id}">
      ${statusBadge(c)}
      <div class="card-title">Tantangan ${c.id} — ${escapeHtml(c.title)}</div>
      <div class="card-desc">${escapeHtml(c.description)}</div>
      <div class="card-meta">
        <div class="meta-item">
          <span class="meta-label">Waktu</span>
          <span class="meta-value">2 Okt 2026 · 10.10–11.00</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Hadiah</span>
          <span class="meta-value">${escapeHtml(c.prize)}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Pemenang</span>
          <span class="meta-value">${c.winnersCount} orang</span>
        </div>
      </div>
      <span class="card-arrow">›</span>
    </button>
  `;
}

function detail(id) {
  const c = challenges.find(x => x.id === id);
  if (!c) return home();
  topBack.hidden = false;
  app.innerHTML = `
    <section class="detail-top">
      <button class="back-link" id="backHome">← Kembali ke Home</button>
      ${statusBadge(c)}
      <div class="detail-title-row">
        <div>
          <h1 class="detail-title">Tantangan ${c.id}<br>${escapeHtml(c.title)}</h1>
          <p class="detail-desc">${escapeHtml(c.description)}</p>
        </div>
      </div>
      <div class="quote"><span class="quote-mark">“</span>${escapeHtml(c.quote)}</div>
    </section>

    <section class="info-grid">
      <div class="info-cell"><div class="info-label">Waktu mulai</div><div class="info-value">${escapeHtml(c.startText)}</div></div>
      <div class="info-cell"><div class="info-label">Waktu selesai</div><div class="info-value">${escapeHtml(c.endText)}</div></div>
      <div class="info-cell"><div class="info-label">Hadiah</div><div class="info-value">${escapeHtml(c.prize)}</div></div>
      <div class="info-cell"><div class="info-label">Jumlah pemenang</div><div class="info-value">${c.winnersCount} orang</div></div>
    </section>

    <section class="section">
      <div class="section-head"><span class="section-icon">↗</span>Cara Melakukan</div>
      <ol class="steps">
        ${c.method.map((x,i)=>`<li><span class="step-num">${i+1}</span><span>${escapeHtml(x)}</span></li>`).join("")}
      </ol>
    </section>

    <section class="section">
      <div class="section-head"><span class="section-icon">✓</span>Aturan</div>
      <ul class="rules">${c.rules.map(x=>`<li><span>${escapeHtml(x)}</span></li>`).join("")}</ul>
    </section>

    <section class="section">
      <div class="section-head"><span class="section-icon">◎</span>Wajib Follow</div>
      <div class="follow-box">
        <div class="follow-title">Sebelum mengikuti tantangan</div>
        <div class="follow-desc">Pastikan kamu sudah mengikuti kedua akun Instagram di bawah ini.</div>
        <div class="ig-row">
          <a class="ig-btn" href="${INSTAGRAM.tanta}" target="_blank" rel="noopener">
            <span class="ig-left"><span class="ig-icon">◎</span><span>@tantanyata<br><small style="font-weight:500;color:#777">Instagram Tanta</small></span></span><span>↗</span>
          </a>
          <a class="ig-btn" href="${INSTAGRAM.faqih}" target="_blank" rel="noopener">
            <span class="ig-left"><span class="ig-icon">◎</span><span>@qqiyyyh<br><small style="font-weight:500;color:#777">Faqih — pembuat Tanta</small></span></span><span>↗</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><span class="section-icon">🎁</span>Cara Klaim Hadiah</div>
      <div class="winner">${escapeHtml(c.claim.text)}</div>
    </section>

    <section class="section">
      <div class="section-head"><span class="section-icon">♛</span>Pemenang</div>
      <div class="winner">${c.winner ? `<span class="winner-name">${escapeHtml(c.winner)}</span>` : `<span class="winner-empty">Belum ditentukan.</span>`}</div>
    </section>

    <a class="primary-btn" href="${INSTAGRAM.tanta}" target="_blank" rel="noopener" style="display:block;text-align:center;text-decoration:none">Instagram Tanta ↗</a>
  `;
  document.getElementById("backHome").addEventListener("click", home);
  topBack.onclick = home;
  setNav(null);
  window.scrollTo({top:0, behavior:"smooth"});
}

function about() {
  topBack.hidden = true;
  app.innerHTML = `
    <section class="page-head">
      <div class="eyebrow">Tanta</div>
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
          <button class="acc-btn">Aturan Tanta <span class="chev">⌄</span></button>
          <div class="acc-content">Setiap tantangan memiliki aturan masing-masing. Peserta wajib membaca dan memahami seluruh ketentuan sebelum mengikuti tantangan.</div>
        </div>
        <div class="acc-item">
          <button class="acc-btn">Ide & Kritik <span class="chev">⌄</span></button>
          <div class="acc-content">Punya ide atau kritik untuk Tanta? Kirim langsung melalui Instagram Tanta.</div>
        </div>
        <div class="acc-item">
          <button class="acc-btn">Tentang Hadiah <span class="chev">⌄</span></button>
          <div class="acc-content">Cara pemberian hadiah mengikuti jenis tantangan. Tantangan tertentu dapat memberikan hadiah langsung, sementara tantangan yang membutuhkan bukti dapat menggunakan klaim melalui DM Instagram.</div>
        </div>
      </div>
    </section>

    <a class="primary-btn" href="${INSTAGRAM.tanta}" target="_blank" rel="noopener" style="display:block;text-align:center;text-decoration:none">Ikuti @tantanyata ↗</a>
    <div style="height:10px"></div>
    <a class="ig-btn" href="${INSTAGRAM.faqih}" target="_blank" rel="noopener">
      <span class="ig-left"><span class="ig-icon">◎</span><span>@qqiyyyh<br><small style="font-weight:500;color:#777">Instagram pribadi Faqih</small></span></span><span>↗</span>
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
topBack.addEventListener("click", home);
home();

// Refresh status while the app stays open.
setInterval(()=>{
  const current = document.querySelector("[data-challenge]");
  if (current && app.querySelector(".challenge-card")) home();
}, 60000);
