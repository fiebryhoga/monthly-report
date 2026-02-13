# 🏢 Sistem Informasi Presensi & HRIS (Sawit & Co.)

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Inertia.js](https://img.shields.io/badge/Inertia-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

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
    * Backend: Laravel 10.x / 11.x
    * Frontend: React.js 18
    * Adapter: Inertia.js (Server-side routing for React)
    * Database: MySQL / MariaDB
* **UI/UX:**
    * Styling: Tailwind CSS
    * Icons: React Icons (Feather Icons)
* **Libraries:**
    * Charts: Chart.js & React-Chartjs-2
    * Excel: `maatwebsite/excel`
    * PDF: `barryvdh/laravel-dompdf`
    * Date Handling: Carbon (Backend) & Native JS Date (Frontend)

---

## ⚙️ Persyaratan Sistem (Requirements)

Pastikan server lokal Anda memiliki:
* PHP >= 8.1
* Composer
* Node.js & NPM
* MySQL

---

## 📦 Cara Instalasi

Ikuti langkah-langkah berikut untuk menjalankan project di komputer lokal:

### 1. Clone Repositori
```bash
git clone [https://github.com/username-anda/repo-project.git](https://github.com/username-anda/repo-project.git)
cd repo-project
2. Install DependenciesInstall library backend (PHP) dan frontend (JS):Bashcomposer install
npm install
3. Konfigurasi EnvironmentDuplikat file .env.example menjadi .env:Bashcp .env.example .env
Buka file .env dan sesuaikan konfigurasi database Anda:Cuplikan kodeDB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_rubiconia_test  # Pastikan database ini sudah dibuat di MySQL
DB_USERNAME=root
DB_PASSWORD=
4. Generate Key & Storage LinkBashphp artisan key:generate
php artisan storage:link
5. Migrasi & Seeding DatabaseJalankan perintah ini untuk membuat tabel dan mengisi data dummy (Akun Admin & Pegawai):Bashphp artisan migrate:fresh --seed
6. Jalankan AplikasiBuka dua terminal terpisah untuk menjalankan server:Terminal 1 (Laravel Server):Bashphp artisan serve
Terminal 2 (Vite Development):Bashnpm run dev
Akses aplikasi di browser melalui: http://127.0.0.1:8000🔑 Akun Demo (Seeder)Gunakan akun berikut untuk pengujian (akun ini dibuat otomatis oleh perintah seed):RoleEmailPasswordAdminadmin@sawit.compasswordPegawaipegawai@sawit.compassword(Anda juga bisa membuat akun pegawai baru melalui menu Master Data di panel Admin)📸 Tangkapan Layar (Preview)Dashboard AdminDashboard PegawaiMonitoring PresensiLaporan PDFCatatan: Screenshot di atas adalah representasi visual dari aplikasi.📝 Catatan PengembangFitur-fitur berikut diimplementasikan dengan pertimbangan teknis khusus:Atomic Design Pattern: Komponen React dipecah menjadi bagian kecil (seperti StatCard, ChartsSection, AttendanceCard) agar kode bersih, mudah dibaca, dan reusable.Validasi Berlapis: Validasi dilakukan di Frontend (HTML5/React State) untuk UX yang cepat, dan di Backend (Laravel Request) untuk keamanan data yang mutlak.Optimasi Aset (Inertia.js): Penggunaan Inertia memungkinkan aplikasi terasa seperti SPA (Single Page Application) yang cepat tanpa perlu membuat API yang rumit, namun tetap SEO friendly.Robust Date Handling:Menggunakan Carbon di backend untuk memastikan perhitungan keterlambatan akurat dan konsisten, terlepas dari setting waktu di perangkat user.🤝 KontakJika ada pertanyaan mengenai teknis kode atau arsitektur aplikasi ini, silakan hubungi saya:Dimas Fiebry Prayhoga Putra📧 Email: [masukkan-email-anda@email.com]💼 LinkedIn: [Link LinkedIn Anda]🐙 GitHub: [Link GitHub Anda]