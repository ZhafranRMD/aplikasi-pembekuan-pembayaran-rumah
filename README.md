# 🏠 FREEZEHOUSE / SIMPEKA RUMAH
### Sistem Informasi Manajemen Pembekuan & Penangguhan Pembayaran Rumah & KPR

Aplikasi web modern, responsif, dan *offline-first* untuk mengelola, mensimulasikan, dan menghasilkan surat somasi / berita acara resmi terkait **penahanan termin pembayaran rumah (wanprestasi developer / bangunan mangkrak / cacat konstruksi)** serta **moratorium cicilan KPR (restrukturisasi perbankan nasional)**.

---

## ⚡ Fitur Utama

1. **Dasbor Eksekutif & Real-time Metrics**:
   - Total akumulasi dana pembayaran yang berhasil dibekukan/ditahan (Rp).
   - Total nilai aset properti terlindungi.
   - Distribusi kategori sengketa (Mangkrak, Cacat Mutu Bangunan, Sengketa Legalitas Tanah/Sertifikat, Moratorium KPR Finansial).
   - Status pemantauan (Aktif Dibekukan, Dalam Mediasi, Sedang Ditinjau, Selesai/Dicairkan, Ditolak).

2. **Manajemen Pengajuan Pembekuan Pembayaran (CRUD Lengkap)**:
   - Formulir terstruktur: Identitas pemohon, unit properti, nomor kontrak/PPJB/KPR, pihak lawan (Bank / Developer).
   - Rincian nominal cicilan/termin yang dibekukan, durasi bulan, dan total dana tertahan.
   - Kronologi fakta lapangan, tuntutan pemohon, serta rujukan dasar hukum.
   - Dokumentasi bukti foto kerusakan / bangunan mangkrak.

3. **Generator Dokumen Surat Resmi & Berita Acara Legal (A4 Siap Cetak / PDF)**:
   - Template surat formal standar hukum Indonesia:
     - **Surat Somasi & Pemberitahuan Penahanan Pembayaran Termin** ke Developer.
     - **Surat Permohonan Moratorium & Restrukturisasi Cicilan KPR** ke Bank.
     - **Berita Acara Penahanan Uang Retensi Cacat Konstruksi**.
   - Dilengkapi nomor surat resmi, tembusan BPSK/OJK, tenggat waktu tanggapan 7 hari kerja, meterai tempel visual Rp 10.000, dan kolom tanda tangan.
   - Layout cetak bersih format A4 via `window.print()`.

4. **Kalkulator & Simulator Finansial Terpadu**:
   - **Simulasi Moratorium KPR**: Hitung penghematan kas bulanan, cicilan selama masa beku, dan perpanjangan tenor pada Skema Penuh (0 cicilan) maupun Pokok Saja.
   - **Kalkulator Denda Keterlambatan Developer**: Menghitung denda penalti 1‰ (satu permil / 0.1% per hari) dari total harga rumah sesuai standar PPJB KemenPUPR & Pasal 1243 KUHPerdata.

5. **Basis Data Firebase Firestore Terisolasi**:
   - Single source of truth: `D:\devproject\configuration\Firebasefirestore.txt` (Project: `zhafran-firebase`).
   - Namespace root: `/apps/pembekuan-rumah/pengajuan/{id}`.
   - Dukungan cache persisten lokal (`persistentLocalCache` & `persistentMultipleTabManager`) untuk operasional 100% offline tanpa menguras kuota harian.

---

## 🚀 Cara Menjalankan Aplikasi

### Cara 1: Menggunakan File Pintas (1 Klik)
Klik 2x file berikut:
- **`Buka_Aplikasi.bat`** (di dalam folder proyek ini), atau
- **`D:\devproject\Buka_Aplikasi_Pembekuan_Rumah.bat`** (di folder utama D:\devproject)

### Cara 2: Melalui Terminal / Command Prompt
```bash
cd "D:\devproject\Aplikasi Pembekuan Pembayaran Rumah"
npm run dev
```
Buka peramban di `http://localhost:5174`.

---

## ⚖️ Rujukan Regulasi Hukum
- **Pasal 1243 Kitab Undang-Undang Hukum Perdata (KUHPerdata)**: Penggantian biaya, kerugian dan bunga karena tidak dipenuhinya suatu perikatan (*wanprestasi*).
- **Undang-Undang No. 8 Tahun 1999 tentang Perlindungan Konsumen**: Hak konsumen atas kompensasi, ganti rugi, dan kesesuaian mutu barang.
- **Peraturan OJK No. 11/POJK.03/2020**: Stimulus perekonomian nasional & restrukturisasi kredit perbankan.
- **PP No. 12 Tahun 2021 tentang Perumahan dan Kawasan Permukiman**: Standar PPJB dan sanksi keterlambatan penyerahan unit.

---
© 2026 FREEZEHOUSE / SIMPEKA RUMAH — Dikembangkan untuk Kak Appank (Zhafran Ramadhan)

