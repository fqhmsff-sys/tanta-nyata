# TANTA — Tantangan Nyata

Versi awal Tanta dibuat sebagai aplikasi mobile-first yang terasa seperti app, tetapi seluruh isinya bisa dikelola langsung dari kode.

## Isi
- Home
- Tentang
- 1 kartu Tantangan 01 — Bicara
- Detail tantangan
- Status otomatis: Mendatang / Mulai / Selesai
- Dua akun Instagram wajib follow
- Cara klaim hadiah
- Pemenang
- Tidak ada login
- Tidak ada database
- Tidak ada backend/server

## Cara menjalankan
Cara paling sederhana:
1. Ekstrak ZIP.
2. Buka `index.html` di browser.

Untuk pengalaman yang lebih baik saat pengembangan, bisa pakai VS Code + Live Server.

## Cara menambah tantangan
Buka `app.js`, cari:

`const challenges = [`

Copy object tantangan yang sudah ada, lalu tempel di posisi paling atas array. Ubah:
- id
- title
- description
- start / end
- startText / endText
- prize
- winnersCount
- method
- quote (jika ada)
- rules
- claim
- winner

Status tidak perlu ditulis manual. Status dihitung dari tanggal mulai dan selesai.

## Instagram
Akun Tanta:
https://www.instagram.com/tantanyata/

Instagram Faqih:
https://www.instagram.com/qqiyyyh/

Catatan:
Link yang tersimpan di `app.js` mengikuti link yang diberikan saat pembuatan versi ini.

## Catatan desain
- Dasar: putih
- Teks: hitam
- Aksen: orange
- Status: hijau / kuning / merah
- Mobile-first
- Tanpa gambar pada kartu tantangan
