# 🏢 Sistem Informasi Presensi & HRIS (Sawit & Co.)

> **Project Technical Test** > **Diajukan Kepada:** PT. Rubiconia Kanaya Pratama  
> **Kandidat:** Dimas Fiebry Prayhoga Putra

---

## 📋 Tentang Aplikasi

Aplikasi ini adalah **Sistem Manajemen Kehadiran (Attendance Management System)** berbasis web yang modern dan responsif. Dibangun menggunakan arsitektur **Monolith Modern** dengan Laravel sebagai backend dan React (via Inertia.js) sebagai frontend.

Sistem ini dirancang untuk menangani proses presensi pegawai menggunakan validasi **Geolokasi (GPS)** dan **Geofencing** (Radius Kantor), serta mencakup manajemen izin/sakit, perhitungan keterlambatan otomatis, dan pelaporan (Reporting) yang komprehensif.

---

## 🚀 Fitur Unggulan

### 👨‍💼 Panel Pegawai (Employee)
* **GPS Attendance:** Presensi Masuk & Pulang dengan validasi lokasi real-time.
* **Geofencing:** Sistem menolak presensi jika pegawai berada di luar radius kantor yang ditentukan.
* **Late Calculation:** Menghitung otomatis durasi keterlambatan (jam & menit) berdasarkan jam masuk kantor yang dikonfigurasi.
* **Leave Request:** Pengajuan Izin dan Sakit.
* **Dashboard Personal:** Melihat statistik kehadiran bulanan, status hari ini, dan riwayat aktivitas secara visual.
* **Realtime Clock:** Jam server yang tersinkronisasi untuk mencegah manipulasi waktu di sisi klien.

### 👮 Panel Admin
* **Dashboard Analitik:** Grafik trend kehadiran, komposisi status pegawai (Hadir/Telat/Sakit/Izin/Alpha), dan radar chart untuk analisis kedisiplinan.
* **Approval Workflow:** Menyetujui atau menolak pengajuan Izin/Sakit pegawai.
* **Monitoring Live:** Memantau siapa yang sudah hadir, terlambat, atau belum absen pada hari ini secara *real-time*.
* **Master Data:** Manajemen data pegawai (CRUD), penentuan Role, dan Reset Password.
* **Pengaturan Kantor:** Konfigurasi Jam Masuk/Pulang, Koordinat Kantor (Lat/Long), dan Radius Toleransi.
* **Reporting:**
    * Ekspor Laporan ke **Excel** (dengan styling rapi dan logo perusahaan).
    * Cetak Laporan **PDF** (dilengkapi Kop Surat Resmi Perusahaan).

---

## 🛠️ Teknologi yang Digunakan

* **Core Stack:**
    * Backend: Laravel 12
    * Frontend: React.js
    * Adapter: Inertia.js (Server-side routing for React)
    * Database: MySQL / MariaDB
* **UI/UX:**
    * Styling: Tailwind CSS
    * Icons: React Icons
* **Libraries:**
    * Charts: Chart.js & React-Chartjs-2
    * Excel: `maatwebsite/excel`
    * PDF: `barryvdh/laravel-dompdf`
    * Date Handling: Carbon (Backend) & Native JS Date (Frontend)

---

## ⚙️ Persyaratan Sistem (Requirements)

Pastikan server lokal Anda memiliki:
* PHP >= 8.3
* Composer
* Node.js & NPM
* MySQL

---

