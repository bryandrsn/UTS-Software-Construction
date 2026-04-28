# 🛠️ Sistem Pelaporan Jalan Rusak (Microservices Architecture)

Project ini adalah implementasi arsitektur **Microservices** berbasis **Node.js** yang dirancang untuk menangani pelaporan infrastruktur publik (khususnya jalan rusak). Sistem ini dibangun menggunakan pola **API Composition** pada API Gateway untuk menyatukan data dari berbagai service secara efisien.

## 🏗️ Arsitektur Sistem

Proyek ini terbagi menjadi 4 komponen utama yang saling berkomunikasi melalui protokol HTTP:

1.  **API Gateway (Port 8000)**: Pintu masuk tunggal (entry point) yang menangani routing, proxy, dan agregasi data menggunakan Axios.
2.  **Service User (Port 3001)**: Mengelola data pengguna/warga yang melakukan pelaporan.
3.  **Service Media (Port 3002)**: Mengelola penyimpanan metadata dan akses file bukti foto kerusakan.
4.  **Service Report (Port 3003)**: Core service yang menangani CRUD pelaporan jalan rusak, lokasi, dan status perbaikan.

### Alur Kerja Agregasi Data
Saat melakukan request `GET /api/reports/:id`, API Gateway akan secara paralel mengambil data dari ketiga service lainnya dan menyatukannya dalam satu respons JSON yang utuh.

---

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize (MySQL)
- **Database**: MySQL
- **HTTP Client**: Axios (untuk komunikasi antar-service)
- **Testing Tool**: Postman

---

## 📁 Struktur Folder

```text
.
├── api-gateway/         # Entry point & Data Aggregator
├── service-user/        # Manajemen data pengguna
├── service-media/       # Manajemen file/foto bukti
└── service-report/      # Manajemen laporan jalan rusak
