# NOOBLE House Leather

Website statis responsif untuk brand produk kulit NOOBLE, dibuat dengan HTML, CSS, dan JavaScript murni. Tidak membutuhkan framework, instalasi package, atau build step.

## Cara menjalankan

1. Download atau clone repository.
2. Buka `index.html` di browser, atau jalankan dengan ekstensi Live Server di VS Code.
3. Koneksi internet dibutuhkan untuk Google Fonts dan gambar Unsplash.

## Sesuaikan sebelum dipublikasikan

- Buka `script.js` dan ubah `WHATSAPP_NUMBER` menjadi nomor bisnis Anda dengan kode negara, tanpa tanda `+` atau spasi. Contoh Indonesia: `62812xxxxxxxx`.
- Perbarui nomor, email, dan alamat pada `index.html`.
- Ganti foto demo Unsplash dengan foto asli produk untuk hasil yang sesuai dengan brand.
- Perbarui nama produk, kategori, harga, dan foto pada array `products` di `script.js`.

## Upload ke GitHub

1. Buat repository baru di GitHub.
2. Upload `index.html`, `style.css`, `script.js`, dan `README.md` (atau upload ZIP yang sudah diekstrak).
3. Untuk menerbitkan dengan GitHub Pages: buka **Settings → Pages**, pilih **Deploy from a branch**, pilih branch `main` dan folder `/ (root)`, lalu simpan.
4. Tunggu proses deploy selesai; URL website akan ditampilkan di halaman GitHub Pages.

## Struktur

- `index.html` — struktur dan konten halaman.
- `style.css` — desain desktop dan mobile.
- `script.js` — katalog, filter kategori, navigasi mobile, dan integrasi tautan WhatsApp.
- `README.md` — panduan penggunaan dan deployment.

## Catatan

Ini adalah frontend statis. Form kontak membuka WhatsApp dengan pesan yang sudah diisi; website tidak menyimpan pesan ke database. Gambar demo dimuat dari Unsplash dan dapat diganti dengan aset milik sendiri.
