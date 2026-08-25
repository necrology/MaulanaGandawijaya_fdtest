# Portfolio Fullstack Next.js + MySQL

Website portfolio profesional Maulana Ganda Wijaya dengan public page, admin panel, 18 project terdokumentasi, upload file ke `public/uploads`, dan database MySQL.

Production: `https://maulana-gandawijaya.my.id`

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MySQL lokal XAMPP
- `mysql2/promise`
- `bcryptjs`
- HTTP-only cookie session dengan JWT (`jose`)

## Struktur Penting

```txt
src/app/(public)        Halaman publik
src/app/admin           Login dan admin panel
src/app/api             API route CRUD
src/components          Komponen reusable publik
src/components/admin    Komponen admin panel
src/lib                 DB, auth, upload, repository/helper
src/types               TypeScript type
database/schema.sql     Query pembuatan tabel
database/seed.sql       Data awal
public/uploads          Folder file upload
```

## Setup dari Nol

1. Install dependency:

```bash
npm install
```

2. Jalankan XAMPP, aktifkan Apache dan MySQL.

3. Buat database dan tabel melalui phpMyAdmin atau MySQL CLI.

Via phpMyAdmin:

- Buka `http://localhost/phpmyadmin`
- Masuk tab SQL
- Jalankan isi file `database/schema.sql`
- Setelah itu jalankan isi file `database/seed.sql`

Via MySQL CLI:

```bash
mysql -u root < database/schema.sql
mysql -u root portfolio_db < database/seed.sql
```

4. Buat `.env.local` dari contoh:

```bash
copy .env.example .env.local
```

Default koneksi lokal:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=portfolio_db
AUTH_SECRET=change-this-secret-for-production
ADMIN_SESSION_DAYS=7
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTACT_NOTIFICATION_WEBHOOK_URL=
```

5. Jalankan development server:

```bash
npm run dev
```

6. Buka website:

- Public: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

Default admin:

```txt
email: admin@portfolio.test
password: admin12345
```

## Fitur

- Homepage tanpa foto profil, tombol Download Portfolio PDF, CTA contact, serta statistik project, skill, dan pengalaman.
- About dengan foto ringkas berdampingan bersama professional summary, email, telepon, dan domisili.
- About, Skills, Projects, Project Detail, Experience, dan Contact dengan global collaboration CTA.
- Navigasi berbentuk white pill, contact shortcut, logo MGW, favicon, serta layout responsif.
- Portfolio mencakup 18 project web, mobile, enterprise, healthcare, e-commerce, dan application security.
- Project Baregad Sparepart dan RSUD Otista Mobile dilengkapi screenshot aman tanpa data pelanggan/pasien.
- Contact form tersimpan ke tabel `contact_messages` dan dapat mengirim notifikasi webhook server.
- Jika webhook belum dikonfigurasi, form membuka pesan WhatsApp siap kirim sebagai fallback notifikasi.
- SEO metadata, canonical URL, Open Graph thumbnail 1200x630, Twitter Card, `robots.txt`, dan `sitemap.xml`.
- Downloadable portfolio PDF dan CV ATS-friendly tersedia pada `public/uploads`.
- LinkedIn, GitHub, WhatsApp, dan email tampil sebagai kanal kontak aktif.
- Admin login dengan bcrypt dan cookie HTTP-only.
- Admin dashboard statistik.
- CRUD profile, project, project images, skill category, skill, experience, social link, contact message, dan asset.
- Upload profile image, CV/portfolio PDF, thumbnail project, banyak foto project, dan asset manual.
- Metadata file upload dicatat ke tabel `assets`.
- Query database memakai prepared statement melalui `mysql2/promise`.

## API Utama

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET|PUT /api/profile`
- `GET|POST /api/projects`
- `GET|PUT|DELETE /api/projects/[id]`
- `GET /api/projects/slug/[slug]`
- `GET|POST /api/projects/[id]/images`
- `DELETE /api/project-images/[id]`
- `GET|POST /api/skills/categories`
- `PUT|DELETE /api/skills/categories/[id]`
- `GET|POST /api/skills`
- `PUT|DELETE /api/skills/[id]`
- `GET|POST /api/experiences`
- `PUT|DELETE /api/experiences/[id]`
- `GET|POST /api/social-links`
- `PUT|DELETE /api/social-links/[id]`
- `GET|POST /api/contact-messages`
- `PATCH|DELETE /api/contact-messages/[id]`
- `GET /api/assets`
- `POST /api/assets/upload`
- `DELETE /api/assets/[id]`

## Validasi dan Upload

- Validasi sederhana dilakukan di form HTML dan route handler.
- File upload disimpan ke `public/uploads/{category}`.
- Category asset: `profile`, `cv`, `project`, `skill`, `general`.
- Jangan hapus folder `public/uploads`, karena file yang diupload dan placeholder awal berada di sana.

## Notifikasi Contact

Set `CONTACT_NOTIFICATION_WEBHOOK_URL` ke endpoint webhook yang menerima request JSON `POST`. Payload berisi field `content`, `text`, `source`, dan `contact`, sehingga kompatibel dengan webhook umum seperti Discord/Slack atau endpoint otomasi pribadi.

Jika variabel tersebut kosong atau webhook gagal, pesan tetap tersimpan ke database dan pengunjung mendapat tombol WhatsApp berisi pesan yang sudah diformat.

## Script

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Docker Production

1. Buat env Docker:

```bash
cp .env.docker.example .env.docker
```

2. Edit nilai password dan secret di `.env.docker`.

3. Build dan jalankan:

```bash
docker compose --env-file .env.docker up -d --build
```

4. Cek log:

```bash
docker compose --env-file .env.docker logs -f app
```

5. Stop:

```bash
docker compose --env-file .env.docker down
```

Service `db` akan mengimport `database/schema.sql` dan `database/seed.sql` saat volume MySQL pertama kali dibuat. Upload file tetap disimpan di folder host `public/uploads`.

Untuk database dengan volume yang sudah ada, terapkan pembaruan seed secara manual:

```bash
docker compose --env-file .env.docker exec -T db sh -lc 'mysql -u root -p"$MYSQL_ROOT_PASSWORD" portfolio_db' < database/seed.sql
```
