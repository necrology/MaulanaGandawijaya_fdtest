USE portfolio_db;

START TRANSACTION;

INSERT INTO admins (name, email, password_hash)
VALUES ('Administrator', 'admin@portfolio.test', '$2b$10$lQU9PYAI6UwYTp9.ElZs/.KTSJCQ3NICTykeeV8dZdXxIe1cY7MCS')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO assets (id, original_name, file_name, path, mime_type, size, category, related_type, related_id)
VALUES
  (1, 'WhatsApp Image 2026-08-12 at 22.58.36.jpeg', 'maulana-ganda-wijaya-profile.jpeg', '/uploads/profile/maulana-ganda-wijaya-profile.jpeg', 'image/jpeg', 69545, 'profile', 'profile', 1),
  (2, 'Maulana Ganda Wijaya CV 2026.pdf', 'maulana-ganda-wijaya-cv-2026.pdf', '/uploads/cv/maulana-ganda-wijaya-cv-2026.pdf', 'application/pdf', 89572, 'cv', 'profile', 1),
  (3, 'project-placeholder.svg', 'project-placeholder.svg', '/uploads/project-placeholder.svg', 'image/svg+xml', 1212, 'project', 'project', 1),
  (4, 'pos-pujasera-login.png', 'pos-pujasera-login.png', '/uploads/project/pos-pujasera-login.png', 'image/png', 52958, 'project', 'project', 1),
  (5, 'pos-pujasera-kasir.png', 'pos-pujasera-kasir.png', '/uploads/project/pos-pujasera-kasir.png', 'image/png', 55195, 'project', 'project', 1),
  (6, 'pos-pujasera-data-penjualan.png', 'pos-pujasera-data-penjualan.png', '/uploads/project/pos-pujasera-data-penjualan.png', 'image/png', 41516, 'project', 'project', 1),
  (7, 'pos-pujasera-admin-barang.png', 'pos-pujasera-admin-barang.png', '/uploads/project/pos-pujasera-admin-barang.png', 'image/png', 39167, 'project', 'project', 1),
  (8, 'pos-pujasera-pengunjung.png', 'pos-pujasera-pengunjung.png', '/uploads/project/pos-pujasera-pengunjung.png', 'image/png', 44197, 'project', 'project', 1),
  (9, 'pos-pujasera-dashboard.png', 'pos-pujasera-dashboard.png', '/uploads/project/pos-pujasera-dashboard.png', 'image/png', 73041, 'project', 'project', 1),
  (10, 'pos-pujasera-persenan.png', 'pos-pujasera-persenan.png', '/uploads/project/pos-pujasera-persenan.png', 'image/png', 55614, 'project', 'project', 1),
  (11, 'pos-pujasera-user.png', 'pos-pujasera-user.png', '/uploads/project/pos-pujasera-user.png', 'image/png', 51163, 'project', 'project', 1),
  (12, 'pos-pujasera-toko-v2.png', 'pos-pujasera-toko-v2.png', '/uploads/project/pos-pujasera-toko-v2.png', 'image/png', 54715, 'project', 'project', 1),
  (13, 'pos-pujasera-profil-v2.png', 'pos-pujasera-profil-v2.png', '/uploads/project/pos-pujasera-profil-v2.png', 'image/png', 38151, 'project', 'project', 1),
  (14, 'emr-login.png', 'emr-login.png', '/uploads/project/emr-login.png', 'image/png', 794296, 'project', 'project', 2),
  (15, 'emr-dashboard.png', 'emr-dashboard.png', '/uploads/project/emr-dashboard.png', 'image/png', 267544, 'project', 'project', 2),
  (16, 'emr-rawat-jalan.png', 'emr-rawat-jalan.png', '/uploads/project/emr-rawat-jalan.png', 'image/png', 163317, 'project', 'project', 2),
  (17, 'emr-rawat-inap.png', 'emr-rawat-inap.png', '/uploads/project/emr-rawat-inap.png', 'image/png', 163147, 'project', 'project', 2),
  (18, 'emr-rawat-darurat.png', 'emr-rawat-darurat.png', '/uploads/project/emr-rawat-darurat.png', 'image/png', 118288, 'project', 'project', 2),
  (19, 'emr-masterdata.png', 'emr-masterdata.png', '/uploads/project/emr-masterdata.png', 'image/png', 117855, 'project', 'project', 2),
  (20, 'emr-antrean-kiosk.png', 'emr-antrean-kiosk.png', '/uploads/project/emr-antrean-kiosk.png', 'image/png', 504155, 'project', 'project', 2),
  (21, 'emr-setting.png', 'emr-setting.png', '/uploads/project/emr-setting.png', 'image/png', 75320, 'project', 'project', 2),
  (22, 'emr-profile.png', 'emr-profile.png', '/uploads/project/emr-profile.png', 'image/png', 52934, 'project', 'project', 2),
  (23, 'emr-anamnesa.png', 'emr-anamnesa.png', '/uploads/project/emr-anamnesa.png', 'image/png', 142420, 'project', 'project', 2),
  (24, 'hm-splash.png', 'hm-splash.png', '/uploads/project/hm-splash.png', 'image/png', 906315, 'project', 'project', 3),
  (25, 'hm-landing.png', 'hm-landing.png', '/uploads/project/hm-landing.png', 'image/png', 1109724, 'project', 'project', 3),
  (26, 'hm-login.png', 'hm-login.png', '/uploads/project/hm-login.png', 'image/png', 127182, 'project', 'project', 3),
  (27, 'hm-home.png', 'hm-home.png', '/uploads/project/hm-home.png', 'image/png', 578175, 'project', 'project', 3),
  (28, 'hm-jadwal-dokter.png', 'hm-jadwal-dokter.png', '/uploads/project/hm-jadwal-dokter.png', 'image/png', 89734, 'project', 'project', 3),
  (29, 'hm-booking.png', 'hm-booking.png', '/uploads/project/hm-booking.png', 'image/png', 84376, 'project', 'project', 3),
  (30, 'hm-bed-monitoring.png', 'hm-bed-monitoring.png', '/uploads/project/hm-bed-monitoring.png', 'image/png', 189449, 'project', 'project', 3),
  (31, 'ev-dashboard.png', 'ev-dashboard.png', '/uploads/project/ev-dashboard.png', 'image/png', 79941, 'project', 'project', 4),
  (32, 'ev-login.png', 'ev-login.png', '/uploads/project/ev-login.png', 'image/png', 56917, 'project', 'project', 4),
  (33, 'ev-calon.png', 'ev-calon.png', '/uploads/project/ev-calon.png', 'image/png', 137521, 'project', 'project', 4),
  (34, 'ev-hasil.png', 'ev-hasil.png', '/uploads/project/ev-hasil.png', 'image/png', 118074, 'project', 'project', 4),
  (35, 'ev-app-login.png', 'ev-app-login.png', '/uploads/project/ev-app-login.png', 'image/png', 60937, 'project', 'project', 4),
  (36, 'ev-app-home.png', 'ev-app-home.png', '/uploads/project/ev-app-home.png', 'image/png', 193527, 'project', 'project', 4),
  (37, 'ev-app-memilih.png', 'ev-app-memilih.png', '/uploads/project/ev-app-memilih.png', 'image/png', 110397, 'project', 'project', 4),
  (38, 'ev-app-suara.png', 'ev-app-suara.png', '/uploads/project/ev-app-suara.png', 'image/png', 67851, 'project', 'project', 4),
  (39, 'ev-app-profil.png', 'ev-app-profil.png', '/uploads/project/ev-app-profil.png', 'image/png', 85965, 'project', 'project', 4),
  (40, 'cp-home.png', 'cp-home.png', '/uploads/project/cp-home.png', 'image/png', 1566754, 'project', 'project', 5),
  (41, 'cp-about.png', 'cp-about.png', '/uploads/project/cp-about.png', 'image/png', 1559327, 'project', 'project', 5),
  (42, 'cp-unit.png', 'cp-unit.png', '/uploads/project/cp-unit.png', 'image/png', 1554304, 'project', 'project', 5),
  (43, 'cp-blog.png', 'cp-blog.png', '/uploads/project/cp-blog.png', 'image/png', 1556291, 'project', 'project', 5),
  (44, 'cp-kontak.png', 'cp-kontak.png', '/uploads/project/cp-kontak.png', 'image/png', 1558692, 'project', 'project', 5),
  (45, 'cp-struktur.png', 'cp-struktur.png', '/uploads/project/cp-struktur.png', 'image/png', 1570904, 'project', 'project', 5),
  (46, 'cp-admin-login.png', 'cp-admin-login.png', '/uploads/project/cp-admin-login.png', 'image/png', 110457, 'project', 'project', 5),
  (47, 'cp-admin-dashboard.png', 'cp-admin-dashboard.png', '/uploads/project/cp-admin-dashboard.png', 'image/png', 90377, 'project', 'project', 5),
  (48, 'cp-admin-tulisan.png', 'cp-admin-tulisan.png', '/uploads/project/cp-admin-tulisan.png', 'image/png', 173281, 'project', 'project', 5),
  (49, 'cp-admin-unit.png', 'cp-admin-unit.png', '/uploads/project/cp-admin-unit.png', 'image/png', 172052, 'project', 'project', 5),
  (50, 'cp6-cp-login.png', 'cp6-cp-login.png', '/uploads/project/cp6-cp-login.png', 'image/png', 21109, 'project', 'project', 6),
  (51, 'cp6-cp-admin-dashboard.png', 'cp6-cp-admin-dashboard.png', '/uploads/project/cp6-cp-admin-dashboard.png', 'image/png', 94024, 'project', 'project', 6),
  (52, 'cp6-cp-admin-user.png', 'cp6-cp-admin-user.png', '/uploads/project/cp6-cp-admin-user.png', 'image/png', 38737, 'project', 'project', 6),
  (53, 'cp6-cp-admin-jadwal.png', 'cp6-cp-admin-jadwal.png', '/uploads/project/cp6-cp-admin-jadwal.png', 'image/png', 44451, 'project', 'project', 6),
  (54, 'cp6-cp-admin-paket.png', 'cp6-cp-admin-paket.png', '/uploads/project/cp6-cp-admin-paket.png', 'image/png', 53356, 'project', 'project', 6),
  (55, 'cp6-cp-scan-qr.png', 'cp6-cp-scan-qr.png', '/uploads/project/cp6-cp-scan-qr.png', 'image/png', 27080, 'project', 'project', 6),
  (56, 'cp6-cp-hasil-scan.png', 'cp6-cp-hasil-scan.png', '/uploads/project/cp6-cp-hasil-scan.png', 'image/png', 49752, 'project', 'project', 6),
  (57, 'erp-dashboard.png', 'erp-dashboard.png', '/uploads/project/erp-dashboard.png', 'image/png', 173897, 'project', 'project', 7),
  (58, 'erp-master-barang.png', 'erp-master-barang.png', '/uploads/project/erp-master-barang.png', 'image/png', 142412, 'project', 'project', 7),
  (59, 'erp-stok-gudang.png', 'erp-stok-gudang.png', '/uploads/project/erp-stok-gudang.png', 'image/png', 135451, 'project', 'project', 7),
  (60, 'erp-purchase-order.png', 'erp-purchase-order.png', '/uploads/project/erp-purchase-order.png', 'image/png', 102431, 'project', 'project', 7),
  (61, 'erp-penjualan.png', 'erp-penjualan.png', '/uploads/project/erp-penjualan.png', 'image/png', 127459, 'project', 'project', 7),
  (62, 'erp-laporan.png', 'erp-laporan.png', '/uploads/project/erp-laporan.png', 'image/png', 89435, 'project', 'project', 7),
  (63, 'docsch-ds-login.png', 'docsch-ds-login.png', '/uploads/project/docsch-ds-login.png', 'image/png', 157283, 'project', 'project', 8),
  (64, 'docsch-ds-dashboard.png', 'docsch-ds-dashboard.png', '/uploads/project/docsch-ds-dashboard.png', 'image/png', 102703, 'project', 'project', 8),
  (65, 'docsch-ds-jadwal-dokter.png', 'docsch-ds-jadwal-dokter.png', '/uploads/project/docsch-ds-jadwal-dokter.png', 'image/png', 125047, 'project', 'project', 8),
  (66, 'docsch-ds-data-dokter.png', 'docsch-ds-data-dokter.png', '/uploads/project/docsch-ds-data-dokter.png', 'image/png', 114286, 'project', 'project', 8),
  (67, 'vcr-dashboard.png', 'vcr-dashboard.png', '/uploads/project/vcr-dashboard.png', 'image/png', 135334, 'project', 'project', 9),
  (68, 'vcr-stok.png', 'vcr-stok.png', '/uploads/project/vcr-stok.png', 'image/png', 153164, 'project', 'project', 9),
  (69, 'vcr-pengiriman.png', 'vcr-pengiriman.png', '/uploads/project/vcr-pengiriman.png', 'image/png', 121473, 'project', 'project', 9),
  (70, 'vcr-penjualan.png', 'vcr-penjualan.png', '/uploads/project/vcr-penjualan.png', 'image/png', 83492, 'project', 'project', 9),
  (71, 'vcr-pemakaian.png', 'vcr-pemakaian.png', '/uploads/project/vcr-pemakaian.png', 'image/png', 131664, 'project', 'project', 9),
  (72, 'vcr-validasi.png', 'vcr-validasi.png', '/uploads/project/vcr-validasi.png', 'image/png', 55332, 'project', 'project', 9),
  (73, 'pm10-posmcc-dashboard.png', 'pm10-posmcc-dashboard.png', '/uploads/project/pm10-posmcc-dashboard.png', 'image/png', 130171, 'project', 'project', 10),
  (74, 'pm10-posmcc-new-transaction.png', 'pm10-posmcc-new-transaction.png', '/uploads/project/pm10-posmcc-new-transaction.png', 'image/png', 227675, 'project', 'project', 10),
  (75, 'pm10-posmcc-tracking-order.png', 'pm10-posmcc-tracking-order.png', '/uploads/project/pm10-posmcc-tracking-order.png', 'image/png', 285331, 'project', 'project', 10),
  (76, 'pm10-posmcc-monitor-piutang.png', 'pm10-posmcc-monitor-piutang.png', '/uploads/project/pm10-posmcc-monitor-piutang.png', 'image/png', 254623, 'project', 'project', 10),
  (77, 'pm10-posmcc-report.png', 'pm10-posmcc-report.png', '/uploads/project/pm10-posmcc-report.png', 'image/png', 80193, 'project', 'project', 10),
  (78, 'pm10-posmcc-closing-pos.png', 'pm10-posmcc-closing-pos.png', '/uploads/project/pm10-posmcc-closing-pos.png', 'image/png', 168583, 'project', 'project', 10),
  (79, 'pm11-mrp-dashboard.png', 'pm11-mrp-dashboard.png', '/uploads/project/pm11-mrp-dashboard.png', 'image/png', 291590, 'project', 'project', 11),
  (80, 'pm11-mrp-otorisasi.png', 'pm11-mrp-otorisasi.png', '/uploads/project/pm11-mrp-otorisasi.png', 'image/png', 246448, 'project', 'project', 11),
  (81, 'pm11-mrp-form.png', 'pm11-mrp-form.png', '/uploads/project/pm11-mrp-form.png', 'image/png', 35815, 'project', 'project', 11),
  (82, 'pm11-mrp-form-mei.png', 'pm11-mrp-form-mei.png', '/uploads/project/pm11-mrp-form-mei.png', 'image/png', 36416, 'project', 'project', 11),
  (83, 'pm11-mrp-kontrakpayung.png', 'pm11-mrp-kontrakpayung.png', '/uploads/project/pm11-mrp-kontrakpayung.png', 'image/png', 52487, 'project', 'project', 11),
  (84, 'pm11-mrp-kp-list.png', 'pm11-mrp-kp-list.png', '/uploads/project/pm11-mrp-kp-list.png', 'image/png', 47302, 'project', 'project', 11),
  (85, 'pm12-po-dashboard.png', 'pm12-po-dashboard.png', '/uploads/project/pm12-po-dashboard.png', 'image/png', 308999, 'project', 'project', 12),
  (86, 'pm12-po-list.png', 'pm12-po-list.png', '/uploads/project/pm12-po-list.png', 'image/png', 304757, 'project', 'project', 12),
  (87, 'pm12-po-log-approval.png', 'pm12-po-log-approval.png', '/uploads/project/pm12-po-log-approval.png', 'image/png', 404270, 'project', 'project', 12),
  (88, 'pm13-crm-dashboard.png', 'pm13-crm-dashboard.png', '/uploads/project/pm13-crm-dashboard.png', 'image/png', 323195, 'project', 'project', 13),
  (89, 'pm13-crm-table.png', 'pm13-crm-table.png', '/uploads/project/pm13-crm-table.png', 'image/png', 208796, 'project', 'project', 13),
  (90, 'pm13-crm-forecast.png', 'pm13-crm-forecast.png', '/uploads/project/pm13-crm-forecast.png', 'image/png', 144567, 'project', 'project', 13),
  (91, 'pm13-crm-top-outlet.png', 'pm13-crm-top-outlet.png', '/uploads/project/pm13-crm-top-outlet.png', 'image/png', 262310, 'project', 'project', 13),
  (92, 'pm14-lnd-dashboard.png', 'pm14-lnd-dashboard.png', '/uploads/project/pm14-lnd-dashboard.png', 'image/png', 149661, 'project', 'project', 14),
  (93, 'pm15-posevt-dashboard.png', 'pm15-posevt-dashboard.png', '/uploads/project/pm15-posevt-dashboard.png', 'image/png', 245078, 'project', 'project', 15),
  (94, 'pm16-security-assessment-overview.png', 'pm16-security-assessment-overview.png', '/uploads/project/pm16-security-assessment-overview.png', 'image/png', 165638, 'project', 'project', 16),
  (95, 'pm16-security-assessment-findings.png', 'pm16-security-assessment-findings.png', '/uploads/project/pm16-security-assessment-findings.png', 'image/png', 166974, 'project', 'project', 16),
  (96, 'pm16-security-assessment-remediation.png', 'pm16-security-assessment-remediation.png', '/uploads/project/pm16-security-assessment-remediation.png', 'image/png', 177265, 'project', 'project', 16),
  (97, 'baregad-home.png', 'baregad-home.png', '/uploads/project/baregad-home.png', 'image/png', 350622, 'project', 'project', 17),
  (98, 'baregad-catalog.png', 'baregad-catalog.png', '/uploads/project/baregad-catalog.png', 'image/png', 620849, 'project', 'project', 17),
  (99, 'baregad-detail.png', 'baregad-detail.png', '/uploads/project/baregad-detail.png', 'image/png', 606279, 'project', 'project', 17),
  (100, 'otista-mobile-showcase.jpg', 'otista-mobile-showcase.jpg', '/uploads/project/otista-mobile-showcase.jpg', 'image/jpeg', 228149, 'project', 'project', 18),
  (101, 'otista-mobile-home.jpg', 'otista-mobile-home.jpg', '/uploads/project/otista-mobile-home.jpg', 'image/jpeg', 165062, 'project', 'project', 18),
  (102, 'otista-mobile-booking.jpg', 'otista-mobile-booking.jpg', '/uploads/project/otista-mobile-booking.jpg', 'image/jpeg', 140517, 'project', 'project', 18),
  (103, 'otista-mobile-profile.jpg', 'otista-mobile-profile.jpg', '/uploads/project/otista-mobile-profile.jpg', 'image/jpeg', 132018, 'project', 'project', 18),
  (104, 'Maulana Ganda Wijaya Portfolio 2026.pdf', 'maulana-ganda-wijaya-portfolio-2026.pdf', '/uploads/portfolio/maulana-ganda-wijaya-portfolio-2026.pdf', 'application/pdf', 4875304, 'cv', 'portfolio', 1)
ON DUPLICATE KEY UPDATE
  original_name = VALUES(original_name),
  file_name = VALUES(file_name),
  path = VALUES(path),
  mime_type = VALUES(mime_type),
  size = VALUES(size),
  category = VALUES(category),
  related_type = VALUES(related_type),
  related_id = VALUES(related_id);

INSERT INTO profiles (
  id, full_name, job_title, short_bio, about_detail, email, phone, location, profile_image_asset_id, cv_asset_id
) VALUES (
  1,
  'Maulana Ganda Wijaya',
  'Full-Stack, Mobile & IT Security Developer',
  'Profesional IT antusias dengan pengalaman lebih dari empat tahun dalam pengembangan aplikasi web full-stack, aplikasi mobile, infrastruktur, dan keamanan aplikasi.',
  'Saya adalah profesional IT antusias yang berfokus pada Full-Stack Development, Mobile Development, dan IT Security. Saya berpengalaman membangun serta memelihara aplikasi bisnis untuk sektor F&B, kesehatan, distribusi, manufaktur, dan koperasi, mulai dari analisis kebutuhan, pengembangan, integrasi, deployment, sampai troubleshooting.\n\nTeknologi yang saya gunakan mencakup PHP, Laravel, CodeIgniter, JavaScript, TypeScript, React, Next.js, Vue.js, Nuxt.js, Flutter, Dart, Go, Fiber, Python, Flask, Java, MySQL, PostgreSQL, Linux, jaringan komputer, serta application security dan penetration testing.\n\nSaya menyelesaikan pendidikan Sarjana Teknik Informatika di Sekolah Tinggi Teknologi Bandung dengan konsentrasi Keamanan Jaringan Komputer dan IPK 3,37. Tugas akhir saya berupa aplikasi E-Voting berbasis Android dan web menggunakan Flutter, CodeIgniter, dan MySQL dengan nilai A. Saya juga mengikuti pelatihan CCNA, Project Management Associate, Forsec Security, dan TOEFL.',
  'maulanagandawijaya@gmail.com',
  '+62 899-9228-241',
  'Cimahi, Indonesia',
  1,
  2
) ON DUPLICATE KEY UPDATE
  full_name = VALUES(full_name),
  job_title = VALUES(job_title),
  short_bio = VALUES(short_bio),
  about_detail = VALUES(about_detail),
  email = VALUES(email),
  phone = VALUES(phone),
  location = VALUES(location),
  profile_image_asset_id = VALUES(profile_image_asset_id),
  cv_asset_id = VALUES(cv_asset_id);

INSERT INTO skill_categories (id, name, slug, sort_order)
VALUES
  (1, 'Frontend', 'frontend', 1),
  (2, 'Backend & API', 'backend-api', 2),
  (5, 'Mobile', 'mobile', 3),
  (3, 'Database', 'database', 4),
  (6, 'Security & Infrastructure', 'security-infrastructure', 5),
  (4, 'Tools & Practices', 'tools-practices', 6)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  slug = VALUES(slug),
  sort_order = VALUES(sort_order);

INSERT INTO skills (id, category_id, name, icon, level, sort_order)
VALUES
  (1, 1, 'HTML & CSS', 'Palette', 88, 1),
  (2, 1, 'JavaScript / TypeScript', 'Code2', 88, 2),
  (3, 1, 'Vue.js / Nuxt.js', 'Layers3', 84, 3),
  (4, 2, 'PHP / Laravel', 'Server', 90, 1),
  (5, 2, 'CodeIgniter', 'Code2', 88, 2),
  (6, 2, 'REST API & BPJS Integration', 'Webhook', 82, 3),
  (7, 5, 'Flutter / Dart', 'Smartphone', 85, 1),
  (8, 3, 'MySQL', 'Database', 88, 1),
  (9, 3, 'PostgreSQL', 'Database', 82, 2),
  (10, 2, 'Python / Flask', 'Terminal', 72, 4),
  (11, 2, 'Node.js', 'Server', 78, 5),
  (12, 6, 'Application Security', 'Terminal', 82, 1),
  (13, 6, 'Penetration Testing', 'Terminal', 80, 2),
  (14, 6, 'Linux / Ubuntu Server', 'Server', 82, 3),
  (15, 6, 'Networking / CCNA', 'Globe2', 80, 4),
  (16, 4, 'Git', 'GitBranch', 85, 1),
  (17, 4, 'SDLC', 'BriefcaseBusiness', 82, 2),
  (18, 2, 'Java', 'Code2', 72, 6),
  (19, 1, 'React / Next.js', 'Layers3', 84, 4),
  (20, 2, 'Go / Fiber', 'Server', 80, 7)
ON DUPLICATE KEY UPDATE
  category_id = VALUES(category_id),
  name = VALUES(name),
  icon = VALUES(icon),
  level = VALUES(level),
  sort_order = VALUES(sort_order);

INSERT INTO projects (
  id, title, slug, short_description, detail_description, tech_stack, demo_link, github_link, thumbnail_asset_id, featured, sort_order
) VALUES (
  1,
  'Point of Sale Pujasera',
  'pos-pujasera-koperasi-pt-inti',
  'Sistem kasir terpusat untuk transaksi pujasera, pemantauan penjualan, dan laporan operasional.',
  'Sistem Point of Sale berbasis web untuk operasional kasir pujasera Koperasi PT INTI, dibangun dengan CodeIgniter 3.1.10, PHP, dan MySQL. Sistem melayani transaksi penjualan harian dengan pencatatan otomatis oleh kasir, pengelolaan stok barang (harga beli, harga jual, dan stok), serta perhitungan pembagian pendapatan antarpihak \u2014 koperasi dan pedagang warung \u2014 berdasarkan persentase yang diatur pada modul persenan. Setiap transaksi dicatat lengkap dengan kode barang, jumlah, total harga, waktu transaksi, dan pembagian pendapatan (pihak 1/2/3), sehingga laporan keuangan lebih transparan dan terpusat.\n\nSistem memiliki tiga tingkat akses \u2014 kasir, admin, dan superadmin \u2014 dengan fitur registrasi, login dengan remember me, reset password, serta log aktivitas. Modul laporan menyediakan cetak nota penjualan PDF dan rekapitulasi penjualan untuk memantau performa penjualan. Admin mengelola master barang dan data pengunjung, sementara superadmin mengelola pengguna, warung, persenan, dan pengaturan toko.',
  '["CodeIgniter 3","PHP","MySQL","Bootstrap 4","jQuery","DataTables","FPDF"]',
  NULL,
  NULL,
  4,
  FALSE,
  1
),
(
  2,
  'Electronic Medical Record (EMR)',
  'electronic-medical-record-emr',
  'Sistem rekam medis elektronik untuk pengelolaan pemeriksaan pasien secara digital.',
  'Sistem Electronic Medical Record (EMR) berbasis web untuk operasional rumah sakit, dibangun dengan CodeIgniter 3 (HMVC) dan PostgreSQL. Sumber kode sampel diambil dari implementasi RSUD Subang, sementara saya mengerjakan deployment, kustomisasi, dan pemeliharaan sistem ini untuk lebih dari tujuh rumah sakit di Jawa Barat, Banten, dan Jakarta — mencakup peningkatan versi EMR 2.x.x ke 3.x.x, BPJS bridging, deployment, troubleshooting, dan optimasi aplikasi.

Fitur utama yang dianalisis langsung dari source code:
- Registrasi pasien dan sistem antrean: kiosk mandiri (pasien baru / pasien lama) serta display antrean pendaftaran dan antrean poli untuk ruang tunggu.
- Rekam medis terintegrasi Rawat Jalan, Rawat Inap, dan Rawat Darurat: anamnesa, asesmen awal medis dan keperawatan, asesmen khusus spesialis (Anak, Bedah, Gigi dan Mulut, Kulit Kelamin, Mata, THT, Syaraf, Jantung, Geriatri, Obstetri, Akupuntur, Rehabilitasi Medik, Gizi, Psikiatri), CPPT (Catatan Perkembangan Pasien Terintegrasi), diagnosa, konsul antarpoli, rencana terapi, dan rekam jejak.
- Asuhan keperawatan berbasis standar NANDA: diagnosa keperawatan, intervensi, kriteria hasil, dan luaran keperawatan untuk rawat jalan maupun rawat inap.
- e-Order penunjang (laboratorium, radiologi), persetujuan tindakan medis / informed consent, transfer pasien internal dan eksternal, surat keterangan, penanganan pasien, serta modul hemodialisa.
- Modul pendukung: master data (standar asuhan keperawatan, diagnosa, obat, alat bantu), pengaturan identitas rumah sakit, survei IKM, dan monitoring/EIS.
- Manajemen pengguna multi-role: Administrator, IGD / Rawat Jalan / Rawat Inap (medis dan keperawatan), Dokter spesialis, Penunjang, dan Kebidanan — dengan hak akses per modul.
- Integrasi BPJS Kesehatan pada registrasi dan penjaminan pasien.

Database PostgreSQL berisi lebih dari 1.100 tabel yang mencakup master pasien, registrasi, poliklinik/dokter/ruangan, billing, dan seluruh formulir rekam medis elektronik. Aplikasi dioperasikan dengan data riil rumah sakit (contoh data sampel: lebih dari 58.000 registrasi rawat jalan dan 10.000 registrasi rawat inap).',
  '["CodeIgniter 3","PHP","PostgreSQL","HMVC","Bootstrap 4","jQuery","DataTables","Select2"]',
  NULL,
  NULL,
  15,
  TRUE,
  2
),
(
  3,
  'Hospital Mobile Application',
  'hospital-mobile-application',
  'Aplikasi mobile rumah sakit berbasis Flutter untuk layanan dan informasi rumah sakit.',
  'Sistem Hospital Mobile Application (Q-HOPES Mobile) untuk layanan pasien rumah sakit, dibangun dengan Flutter. Sumber kode sampel diambil dari implementasi RSUD Kabupaten Bekasi, dikerjakan sebagai bagian dari ekosistem layanan kesehatan PT Qtasnim Digital Teknologi dan diimplementasikan pada berbagai rumah sakit di Jawa Barat, Banten, dan Jakarta.\n\nFitur utama yang dianalisis langsung dari source code:\n- Splash screen dan halaman landing dengan pilihan Masuk / Buat Akun untuk autentikasi pengguna.\n- Autentikasi berbasis akun mobile (tabel rs_mobile_user) pada backend API.\n- Dashboard utama dengan banner informasi rumah sakit dan menu layanan: Jadwal Dokter, Registrasi Online, Riwayat Registrasi, dan Informasi Kamar (Bed Monitoring).\n- Jadwal dokter dengan filter poliklinik dan tanggal periksa, menampilkan nama dokter, jam praktik, poliklinik, dan kuota pasien — terintegrasi dengan data HFIS (Health Facility Information System) BPJS.\n- Registrasi online dengan dialog booking untuk pasien baru maupun pasien lama.\n- Informasi bed rawat inap per kelas kamar (Kelas 1, 2, 3) dengan statistik kapasitas, terisi, dan tersedia secara real-time.\n- Dukungan mode gelap (dark mode) dan penyesuaian tema.\n\nBackend menggunakan REST API PHP Slim Framework dengan database PostgreSQL berisi skema SIMRS rumah sakit: master pasien (lebih dari 616 ribu), 643 dokter, jadwal dokter per poliklinik, dan data bed rawat inap. Aplikasi diuji berjalan di emulator Android dengan data riil rumah sakit.',
  '["Flutter","Dart","Bloc/Cubit","Dio","PHP Slim","PostgreSQL","REST API","Android"]',
  NULL,
  NULL,
  24,
  TRUE,
  3
),
(
  4,
  'E-Voting Mobile & Web Application',
  'e-voting-mobile-web-application',
  'Aplikasi E-Voting berbasis Android dan web untuk mendukung pemilihan komunitas secara digital.',
  'Aplikasi E-Voting Mobile & Web Application untuk pemilihan Ketua RT, dikerjakan sebagai tugas akhir pada masa pandemi COVID-19 dengan nilai A. Proyek menggabungkan aplikasi Android Flutter untuk pemilih dan dashboard web CodeIgniter untuk panitia/administrator, dengan database MySQL.\n\nFitur utama yang dianalisis langsung dari source code:\n- Aplikasi mobile (Flutter): login pemilih menggunakan NIK dan No. KK dengan validasi jadwal pemilihan dan status izin memilih; beranda berisi pengumuman pemilihan; halaman memilih menampilkan kartu calon Ketua RT (foto, nomor urut, data diri, visi, misi) dengan dialog konfirmasi sebelum memberikan suara; halaman hasil suara menampilkan grafik batang perolehan suara sementara (charts_flutter); halaman profil menampilkan data diri pemilih beserta status sudah/belum memilih.\n- Dashboard web (CodeIgniter 3): autentikasi administrator, dashboard dengan grafik perolehan suara dan data golput per RT, CRUD data pemilih, data calon Ketua RT, jadwal pemilihan, kelola pengumuman, serta laporan hasil pemilihan yang dapat dicetak.\n- REST API PHP (mysqli) untuk pertukaran data antara aplikasi mobile dan database: login, data pemilih, daftar calon, pengumuman, hasil suara, dan proses pencoblosan yang memperbarui perolehan suara calon serta status memilih pemilih.\n- Database MySQL dengan skema pemilih, calon, jadwal pemilihan, pengumuman, dan hasil pemilihan per RT.\n\nAplikasi diuji berjalan di emulator Android dengan data riil (3 calon Ketua RT dan 3 pemilih terdaftar) terhubung ke API lokal, dan dashboard web ditampilkan serta diuji melalui Chrome headless.',
  '["Flutter","Dart","CodeIgniter 3","PHP","MySQL","Chart.js","REST API","Android"]',
  NULL,
  NULL,
  31,
  FALSE,
  4
),
(
  5,
  'Company Profile Website',
  'company-profile-website-koperasi-pt-inti',
  'Pengembangan website company profile Koperasi PT INTI beserta pengelolaan konten.',
  'Pengembangan website company profile Koperasi PT INTI beserta pengelolaan konten (content management) secara daring. Website dibangun dengan CodeIgniter 3 dan MySQL, terdiri dari halaman publik untuk memperkenalkan profil, unit usaha, berita/artikel, dan kontak, serta panel administrator untuk mengelola seluruh konten website.\n\nFitur utama yang dianalisis langsung dari source code:\n- Halaman publik (front-end): beranda dengan hero carousel, statistik singkat, dan daftar artikel terbaru; halaman profil/tentang perusahaan; halaman unit-unit usaha koperasi (8 unit terisi, antara lain Unit Simpan Pinjam, Warung INTIMART, sewa alat olah data, kerjasama perbankan dan mitra kerja, serta unit pendukung); halaman artikel/berita dengan kategori (Rapat Anggota, Kunjungan, dan lainnya) serta detail artikel; halaman struktur organisasi dengan galeri foto kegiatan (lightbox); dan halaman kontak dengan form pesan yang tersimpan ke database.\n- Panel administrator (AdminLTE): autentikasi login (session), dashboard dengan statistik pengunjung website per browser (Chrome, Mozilla Firefox, Googlebot) yang tercatat melalui counter kunjungan, CRUD tulisan/artikel dengan upload gambar, CRUD kategori, kelola komentar, CRUD unit usaha dengan upload gambar, kelola album dan foto galeri, kelola pesan masuk (inbox), kelola pengguna admin, serta log aktivitas.\n- Database MySQL dengan skema lengkap: tbl_tulisan (artikel), tbl_kategori, tbl_unit (unit usaha), tbl_album dan tbl_photo (galeri), tbl_inbox (pesan kontak), tbl_pengguna (admin), tbl_pengunjung (counter pengunjung), tbl_komentar, tbl_agenda, tbl_files, tbl_post_rating, tbl_post_views, dan tbl_log_aktivitas.\n- Fitur pendukung: visitor counter, hit counter artikel (jumlah baca), rating artikel, dan testimoni.\n\nWebsite dijalankan di lingkungan lokal (PHP built-in server dengan database MySQL/MariaDB) dan seluruh halaman publik serta panel admin ditampilkan serta diverifikasi melalui Chrome headless dengan data riil dari database.',
  '["CodeIgniter 3","PHP","MySQL","Bootstrap","AdminLTE","jQuery","Content Management","Web Development"]',
  NULL,
  NULL,
  40,
  FALSE,
  5
),
(
  6,
  'Security Checkpoint Patrol System',
  'security-checkpoint-patrol-system',
  'Aplikasi pemantauan patroli dan checkpoint pabrik untuk meningkatkan pelaporan keamanan operasional.',
  'Pengembangan Security Checkpoint Patrol System untuk PT Unggul Bukit Kencana (Check-Point UBK): aplikasi berbasis web untuk memantau patroli keamanan dan checkpoint di lingkungan pabrik. Sistem dibangun dengan CodeIgniter 3 dan MySQL, dengan dua level pengguna yaitu administrator dan pemeriksa (petugas security).

Fitur utama yang dianalisis langsung dari source code:
- Dua level akses: admin (dashboard, kelola data check-point, user, jadwal sesi, dan paket jadwal) serta pemeriksa (scan QR checkpoint, riwayat hasil check-point). Autentikasi berbasis session dengan redirect sesuai level pengguna.
- Form scan QR: petugas memilih sesi check-point (Sesi 1 s.d. 6), memindai QR pada area patroli, mengunggah foto bukti kondisi area, mengisi keterangan, dan mengirim data check-point ke database.
- Dashboard admin Data Check-Point: tabel riwayat check-point (tanggal & waktu, nama pemeriksa, sesi, area, foto bukti, keterangan) lengkap dengan filter rentang tanggal, pencarian, pagination, dan export ke Excel.
- Kelola user: CRUD data pengguna dengan level admin/pemeriksa; kelola jadwal sesi (waktu mulai dan selesai per sesi) dan paket jadwal (misal Paket Malam dengan 6 sesi).
- Halaman riwayat hasil check-point untuk petugas dengan filter tanggal dan tabel data patroli.
- Database MySQL dengan skema: data_check_point (hasil patroli + foto bukti), data_jadwal_sesi (sesi patroli), jadwal_paket (paket jadwal), dan users (pengguna sistem).

Sistem dijalankan di lingkungan lokal (PHP built-in server dengan database MySQL/MariaDB) dan seluruh halaman admin maupun petugas diverifikasi melalui Chrome headless dengan data riil: patroli 4 sesi per hari di area Gudang Obat, Area Parkir, dan Ruang Server, lengkap dengan foto bukti.',
  '["CodeIgniter 3","PHP","MySQL","Bootstrap","jQuery","QR Code","DataTables","Web Development"]',
  NULL,
  NULL,
  50,
  FALSE,
  6
),
(
  7,
  'ERP Distribusi Farmasi & Alat Kesehatan',
  'erp-distribusi-farmasi-alat-kesehatan',
  'Pengembangan dan pemeliharaan ERP untuk otomasi proses distribusi obat serta alat kesehatan.',
  'Pengembangan dan pemeliharaan ERP Distribusi Farmasi & Alat Kesehatan untuk PT Sapta Sari Tama: sistem informasi manajemen untuk mengotomasi proses distribusi obat serta alat kesehatan ke apotek, rumah sakit, klinik, dan puskesmas. Tampilan aplikasi dibangun dengan antarmuka PHP native dengan navigasi atas (top navigation) yang ringkas, dan basis pengembangan berbasis CodeIgniter 3.\n\nFitur utama yang dianalisis dan ditampilkan:\n- Dashboard operasional: ringkasan penjualan 30 hari, total item barang, peringatan stok menipis, dan pengiriman aktif; grafik penjualan harian serta distribusi pelanggan per segmen (apotek, rumah sakit, klinik, puskesmas, toko alat kesehatan).\n- Master barang: data produk obat (obat bebas, obat bebas terbatas, obat keras, obat generik) dan alat kesehatan (alat kesehatan, alat laboratorium) lengkap dengan kode, satuan, harga beli, harga jual, dan stok minimum.\n- Stok & gudang: monitoring jumlah stok per gudang, peringatan stok menipis, serta tanggal kedaluwarsa (expired date) setiap batch.\n- Purchase order: pembelian dari pemasok distributor farmasi (PT Kimia Farma Trading, PT Enseval, PT Anugerah Pharmindo, dan lainnya) dengan status draft / diterima.\n- Penjualan & distribusi: faktur penjualan ke pelanggan dengan status diproses / dikirim / selesai, lengkap dengan kota tujuan.\n- Laporan: rekapitulasi penjualan per bulan, top 5 produk terlaris, total pembelian, estimasi margin, dengan opsi ekspor PDF dan Excel.\n\nTeknologi: PHP (antarmuka native), CodeIgniter 3 sebagai basis pengembangan, MySQL untuk penyimpanan data (barang, kategori, pemasok, pelanggan, stok, purchase order, penjualan), Bootstrap 5 untuk antarmuka, dan Chart.js untuk visualisasi grafik. Tanggung jawab pada proyek ini mencakup maintenance, optimasi, troubleshooting, dan perbaikan bug untuk menjaga stabilitas serta performa aplikasi bisnis.\n\nTampilan divisualisasikan melalui Chrome headless dengan data riil: 14 produk obat & alkes, 7 purchase order, 10 faktur penjualan ke 6 segmen pelanggan.',
  '["PHP","CodeIgniter 3","MySQL","Bootstrap 5","Chart.js","ERP","Inventory Management","Web Development"]',
  NULL,
  NULL,
  57,
  TRUE,
  7
),
(
  8,
  'Doctor Scheduling Application',
  'doctor-scheduling-application',
  'Aplikasi internal untuk mengelola jadwal praktik dokter dan membantu efisiensi operasional rumah sakit.',
  'Pengembangan Doctor Scheduling Application untuk RSU Kasih Bunda: aplikasi internal untuk mengelola jadwal praktik dokter dan membantu efisiensi operasional rumah sakit. Aplikasi dibangun dengan template SB Admin 2 (Bootstrap 4) dan menggunakan library FullCalendar untuk visualisasi jadwal praktik dokter, mendukung juga pengelolaan website rumah sakit, SIMRS, server, jaringan, dan kebutuhan teknis operasional lainnya.\n\nFitur utama yang dianalisis dan ditampilkan:\n- Halaman login: autentikasi pengguna dengan panel split (branding rumah sakit di sisi kiri dan form login di kanan).\n- Dashboard: statistik ringkas (total dokter aktif, jadwal hari ini, total poli, kuota pasien per hari), grafik bar jadwal praktik per poli per minggu, donut chart distribusi jadwal per poli, tabel jadwal praktik hari ini dengan status kuota (Aktif / Penuh), dan panel notifikasi.\n- Jadwal Dokter: kalender interaktif FullCalendar dengan tampilan bulan / minggu / agenda, navigasi tanggal, dan event jadwal praktik per dokter per poli (warna berbeda tiap poli, misal biru Poli Anak, hijau Poli Umum, toska Poli Kandungan, kuning Poli Gigi, merah Poli Penyakit Dalam), dilengkapi panel jadwal hari ini dan legenda warna, serta form modal tambah jadwal (pilih dokter, poli, tanggal, kuota pasien, jam mulai & selesai).\n- Data Dokter: tabel DataTables dengan pencarian, pagination, dan aksi edit/hapus; data 12 dokter lintas spesialis (Anak, Penyakit Dalam, Obstetri & Ginekologi, Kedokteran Gigi, Mata, Bedah, Syaraf, Jiwa, THT, Paru) dengan kuota pasien dan status (Aktif / Cuti).\n\nTeknologi: SB Admin 2 (Bootstrap 4 + jQuery + Chart.js + DataTables), FullCalendar untuk penjadwalan kalender, dan Font Awesome untuk ikon. Aplikasi ini menjadi bagian dari dukungan operasional teknis rumah sakit secara menyeluruh.\n\nTampilan divisualisasikan melalui Chrome headless dengan data riil: 12 dokter aktif di 8 poli dengan jadwal mingguan 38 slot praktik.',
  '["SB Admin 2","Bootstrap 4","FullCalendar","jQuery","Chart.js","DataTables","PHP","Web Development"]',
  NULL,
  NULL,
  63,
  FALSE,
  8
),
(
  9,
  'Corporate Voucher Management',
  'corporate-voucher-management',
  'Sistem manajemen voucher korporat untuk mendukung operasional penjualan dan pemesanan.',
  'Pengembangan Corporate Voucher Management untuk PT Champ Resto Indonesia Tbk: sistem manajemen voucher korporat (voucher corporate) berbasis web untuk mendukung operasional penjualan dan pemakaian voucher di seluruh outlet dan office. Sistem telah berjalan di lingkungan produksi dengan autentikasi internal karyawan dan diakses dalam mode read-only (SELECT) untuk keperluan pemantauan data tanpa operasi perubahan. Bagian data kredensial (kode voucher dan kode buku) ditutup (blur) pada dokumentasi demi keamanan.\n\nFitur utama yang dianalisis langsung dari aplikasi produksi:\n- Dashboard Voucher Corporate: ringkasan statistik (481 buku terdistribusi, 55.500 lembar terdistribusi, 17.867 lembar terjual, 4.496 lembar terpakai), grafik statistik penjualan dan pemakaian per bulan, ringkasan voucher nominal (Rp 50.000 / Rp 100.000: total terjual, redeem, aktif, terdistribusi), donut chart grafik voucher corporate, serta log aktivitas pengguna.\n- Stok: data stok voucher per buku penerimaan (kode terima, tanggal fin. terima, kode buku, nominal, no. PO CRI, keterangan) dengan filter status kirim dan nominal, serta ekspor data.\n- Pengiriman: data pengiriman voucher ke outlet/office (kode kirim, status pengiriman, nama outlet/office, lokasi, kode buku, jenis kirim, waktu kirim) dengan download data.\n- Stok & Penjualan: current stock voucher (50K / 100K / total) per kode outlet/office serta daftar penjualan.\n- Voucher Terpakai (Pemakaian): daftar voucher yang sudah terpakai lengkap dengan nominal, waktu aktivasi, outlet jual, outlet pakai, dan waktu pakai; tersedia download Excel.\n- Validasi / Aktivasi: pemilihan nominal voucher, kode buku & voucher, dan histori penjualan harian.\n\nTeknologi: Laravel 10, PHP, MySQL, Bootstrap (template admin), DataTables untuk tabel interaktif, ApexCharts untuk grafik, dan jQuery. Aplikasi ini mendukung operasional penjualan dan layanan voucher PT Champ Resto Indonesia Tbk secara menyeluruh.\n\nDokumentasi diambil dari aplikasi produksi melalui Chrome headless dengan autentikasi internal karyawan; bagian kredensial (kode voucher dan kode buku) diblur untuk keamanan data.',
  '["Laravel 10","PHP","MySQL","Bootstrap","DataTables","ApexCharts","jQuery","Voucher Management"]',
  NULL,
  NULL,
  67,
  TRUE,
  9
),
(
  10,
  'POSMCC V2',
  'posmcc-v2',
  'POS Call Center (POSMCC V2) terintegrasi dengan sistem POS utama untuk layanan pemesanan, tracking order, monitor piutang, report dan closing harian PT Champ Resto Indonesia Tbk.',
  'POSMCC V2 (Point of Sales Master Call Center) adalah aplikasi web internal PT Champ Resto Indonesia Tbk untuk mendukung tim Call Center dalam menerima, memproses, dan memantau transaksi pemesanan dari seluruh outlet. Aplikasi digunakan di lingkungan internal perusahaan dengan autentikasi karyawan, dan didokumentasikan dengan data sensitif (nama pelanggan, telepon, alamat, NIP, nama agent, nomor order, outlet) yang disamarkan memakai Gaussian blur halus demi keamanan data.

Fitur utama:
- Dashboard: heatmap transaksi per brand 10 hari ke depan (GRILLMAN, MS, CHOPSTIX, RAACHA, PLATINUM, GOKANA, BMK), Daily Sales Report (accumulate sales, total transaksi, tax, delivery, sales hari ini), status tracking order, target sales bulan berjalan dan sumber via.
- New Transaction: formulir transaksi baru dengan data pelanggan (nama, telepon, alamat), outlet tujuan, menu, metode pengantaran dan pembayaran.
- Tracking Order: pemantauan status order (Menunggu, Proses, Dikirim, Selesai, Dibatalkan) dengan filter data, status warna pembayaran, tanda tangan PIC/CUST/SPV dan upload SO/invoice.
- Monitor Piutang: kalender piutang (jatuh tempo H-, hari H, H+), summary piutang (H-3, belum terbayar, terbayar hari ini) dan list data piutang per outlet dengan status Compliment/Belum Lunas.
- Report: report sales, sumber via per week, data piutang, top menu, trading dan reservasi dengan rentang tanggal dan unduhan Excel.
- Closing POS: summary closing harian (penjualan, voucher, kartu, diskon, tax, service, delivery, transaksi), detail kartu, delivery, outlet tujuan dan detail agent MCC (NIP, nama, transaksi, sales).
- Menu lain: cek DLV Postab, setting event, setting sidebar akses, reservasi, monitor invoice dan finance.

Teknologi: Nuxt.js (Vue.js), Laravel (API), Tailwind CSS dengan tema gelap, Iconify, chart dan tabel interaktif. Aplikasi menjadi ujung tombak operasional Call Center PT Champ Resto Indonesia Tbk.',
  '["Nuxt.js","Vue.js","Laravel","Tailwind CSS","Call Center POS","Dashboard Analytics"]',
  NULL,
  NULL,
  73,
  TRUE,
  10
),
(
  11,
  'Material Requirement Planning (MRP)',
  'material-requirement-planning-mrp',
  'Sistem Material Requirement Planning dan procurement (Purchase Request, Cash Advance, MRP, Kontrak Payung) dengan alur approval multi-level untuk PT Champ Resto Indonesia Tbk.',
  'Material Requirement Planning (MRP) adalah aplikasi web internal PT Champ Resto Indonesia Tbk untuk mengelola seluruh siklus pengadaan (procurement) perusahaan: Purchase Request (PR), Cash Advance (CA), Material Requirement Planning (MRP) dan Kontrak Payung. Aplikasi digunakan di lingkungan internal perusahaan dengan autentikasi karyawan dan didokumentasikan secara read-only (tanpa insert/delete) dengan data sensitif (nomor dokumen, nama pemohon, nama approver, nomor PO) disamarkan memakai Gaussian blur halus demi keamanan data.\n\nFitur utama yang dianalisis langsung dari aplikasi produksi:\n- Dashboard Procurement: summary status pengajuan dengan kartu statistik (Perlu Approve/Proses, Purchase Request, Otorisasi Pengajuan, Budget Approved, Purchase Quote, Budget Revised, Otorisasi PO, Published PO, Barang Diterima, Ditolak, Dibatalkan) dengan angka real-time (contoh: 142 Otorisasi Pengajuan, 117 Budget Approved, 47 Published PO, 121 Barang Diterima pada periode Jan-Agt 2026) serta daftar pengajuan lengkap dengan filter status, periode dan pencarian.\n- List Pengajuan (Purchase Request): tabel dengan kolom No. Dokumen, Tipe (Barang/Jasa), Jenis anggaran (OPEX/CAPEX), Pemohon, Departemen, Keperluan, Nilai Pengajuan, Nilai Pengadaan, Tgl. Pengajuan, Tgl. Kirim, Status Terakhir, Approval PR dan Approval PO - menunjukkan alur persetujuan multi-level (pemohon ke General Manager ke COO/CFO ke procurement ke PO).\n- Pengajuan MRP: form Material Requirements Planning dengan pilihan periode (kalender bulan), area (BANDUNG, BEKASI, CIREBON, SURABAYA, DENPASAR, MAKASAR), kategori barang, tombol Tampilkan Barang, Setting Kategori Barang, Download/Upload, dan tabel kategori yang ditampilkan (Kode, Nama Barang, Periode, Total, Harga, Value) serta info budget.\n- Kontrak Payung: form Setting Kontrak Payung dengan detail kontrak (nama, periode awal/akhir, keterangan), upload dokumen pendukung PDF (maks 15 file), pemilihan supplier/distributor dan pemilihan barang, plus halaman list kontrak dengan filter periode, status (Kontrak Baru, Approve Kontrak, Ditolak, Dibatalkan) dan pencarian.\n- Modul lain: Cash Advance (pengajuan uang muka dengan approval pimpinan, budget, verifikasi/validasi CC, finance), Download Purchase Request, Download Receiving Status Report, dan menu Budget (Dashboard Budget, Requisition Barang).\n\nTeknologi: Nuxt.js (Vue.js) untuk frontend SPA, Laravel (backend API), Tailwind CSS, komponen ikon Iconify, date picker Vue DatePicker, dan tabel interaktif dengan filter status. Aplikasi menjadi sistem pusat pengadaan PT Champ Resto Indonesia Tbk untuk approval, budget control, purchasing dan kontrak.\n\nDokumentasi diambil dari aplikasi produksi melalui Chrome headless dengan autentikasi internal karyawan; akses dibatasi read-only (SELECT saja). Bagian data sensitif - nomor dokumen pengajuan, nama pemohon, nama approver, dan nomor PO - disamarkan memakai Gaussian blur halus agar tidak terbaca.',
  '["Nuxt.js","Vue.js","Laravel","Tailwind CSS","Material Requirement Planning","Procurement"]',
  NULL,
  NULL,
  79,
  FALSE,
  11
),
(
  12,
  'PO Purchasing System',
  'po-purchasing-system',
  'Sistem pengelolaan Purchase Order dengan dashboard, daftar PO, dan riwayat approval multi-level.',
  'PO Purchasing System merupakan aplikasi web internal untuk mendukung proses pengadaan dari pembuatan Purchase Order sampai persetujuan.

Fitur yang didokumentasikan:
- Dashboard PO terbaru dan ringkasan status.
- Daftar Purchase Order dengan filter periode dan pencarian.
- Riwayat approval beserta status, waktu, dan catatan proses.
- Monitoring nilai PO dan progres persetujuan.

Seluruh data operasional pada screenshot portofolio telah diburamkan.',
  '["Nuxt.js","Vue.js","Laravel","Tailwind CSS","Purchase Order","Approval Workflow"]',
  NULL,
  NULL,
  85,
  FALSE,
  12
),
(
  13,
  'Customer Relationship Management (CRM) System',
  'crm-system',
  'Dashboard CRM untuk mengelola penawaran delivery, rencana order, tindak lanjut customer, dan performa outlet.',
  'Customer Relationship Management (CRM) System merupakan dashboard internal untuk mendukung aktivitas customer relationship dan monitoring penawaran delivery.

Fitur yang didokumentasikan:
- Dashboard penawaran delivery dan forecast rencana order.
- Konfirmasi rencana order serta tindak lanjut customer.
- Ringkasan top outlet, kota, kuantitas order, dan estimasi penjualan.
- Daftar order customer serta monitoring customer yang belum melakukan order.
- Filter periode, outlet, area manager, dan pencarian data.

Seluruh screenshot menggunakan data yang telah diburamkan. URL produksi dan parameter identitas tidak dipublikasikan.',
  '["Nuxt.js","Vue.js","Laravel","Tailwind CSS","CRM Dashboard","Delivery Management"]',
  NULL,
  NULL,
  88,
  FALSE,
  13
),
(
  14,
  'Learning & Development Video Platform',
  'learning-development-video-platform',
  'Platform video Learning & Development untuk distribusi materi pelatihan, aktivitas belajar, dan evaluasi karyawan.',
  'Learning & Development Video Platform merupakan dashboard internal untuk mengelola materi pembelajaran berbasis video dan evaluasi karyawan.

Fitur yang didokumentasikan:
- Dashboard video dan dashboard quiz.
- Metadata video, deskripsi, serta periode tayang.
- Target distribusi berdasarkan tujuan, departemen, brand, dan jabatan.
- Monitoring aktivitas, status video, status proses, dan ketersediaan quiz.
- Upload video, filter data, pencarian, dan export laporan.

Kode, judul materi, identitas pengunggah, dan data internal pada screenshot telah diburamkan.',
  '["Nuxt.js","Vue.js","Laravel","Tailwind CSS","Video Learning","Quiz System"]',
  NULL,
  NULL,
  92,
  FALSE,
  14
),
(
  15,
  'Event Point of Sale (POS) System',
  'event-pos-system',
  'Dashboard POS Event untuk monitoring transaksi, metode pembayaran, penjualan menu, dan operasional outlet acara.',
  'Event Point of Sale (POS) System merupakan dashboard internal untuk memantau transaksi outlet selama kegiatan atau event.

Fitur yang didokumentasikan:
- Pemilihan event, outlet, perangkat, dan periode transaksi.
- Ringkasan penjualan, pajak, transaksi tunai, dan non-tunai.
- Monitoring menu terjual dan jumlah porsi.
- Daftar transaksi dengan metode pembayaran serta detail penjualan per menu.
- Download laporan operasional.

Kode outlet, nomor transaksi, nama event, nilai penjualan, menu, dan waktu transaksi pada screenshot telah diburamkan.',
  '["Nuxt.js","Vue.js","Laravel","Tailwind CSS","POS Event","Transaction Monitoring"]',
  NULL,
  NULL,
  93,
  FALSE,
  15
),
(
  16,
  'Application Security Assessment',
  'application-security-assessment',
  'Dokumentasi security assessment yang memuat scope, matriks risiko, bukti pengujian, dan rekomendasi remediasi teredaksi.',
  'Melakukan application security assessment dan penetration testing terhadap aplikasi bisnis untuk mengidentifikasi kelemahan, menilai risiko, memvalidasi dampak secara terkontrol, dan menyusun rekomendasi remediasi.

Dokumentasi portofolio menampilkan:
- Ringkasan scope, metodologi, dan matriks risiko.
- Rekap kategori temuan dan tingkat risiko.
- Bukti pengujian atau proof of concept yang telah dimosaik.
- Panduan patch dan kesimpulan assessment.

Untuk menjaga kerahasiaan, identitas, endpoint, payload, credential, bukti teknis, dan detail temuan diburamkan. Dokumen asli tidak dipublikasikan.',
  '["Application Security","Penetration Testing","Vulnerability Assessment","OWASP","Risk Analysis","Remediation"]',
  NULL,
  NULL,
  94,
  TRUE,
  16
),
(
  17,
  'Baregad Sparepart E-Commerce',
  'baregad-sparepart-ecommerce',
  'Storefront sparepart kendaraan dengan katalog, pencarian, kompatibilitas produk, ulasan, dan alur konversi WhatsApp.',
  'Baregad Sparepart merupakan platform e-commerce berbasis Next.js untuk membantu pelanggan menemukan sparepart kendaraan secara lebih cepat dan meyakinkan sebelum melakukan pemesanan.

Fitur utama yang tersedia:
- Storefront responsif dengan pencarian, filter kategori, pengurutan, dan katalog produk.
- Detail produk berisi kompatibilitas kendaraan, informasi stok, rating, ulasan, serta foto pendukung.
- Alur konversi ke WhatsApp agar pelanggan dapat melanjutkan konsultasi atau pemesanan secara langsung.
- Dashboard admin untuk pengelolaan produk, pesanan, pengguna, hak akses, ulasan, dan pengaturan aplikasi.
- Backend-for-frontend atau API gateway untuk memisahkan kebutuhan antarmuka dari layanan data.
- Metadata SEO dan struktur halaman yang mendukung visibilitas mesin pencari serta preview saat tautan dibagikan.

Screenshot berasal dari website publik dan tidak memuat data pelanggan atau credential.',
  '["Next.js 16","React 19","TypeScript","Tailwind CSS 4","BFF / API Gateway","SEO"]',
  'https://baregadsparepart.web.id/',
  NULL,
  97,
  TRUE,
  17
),
(
  18,
  'RSUD Otista Mobile (SIPANTES)',
  'rsud-otista-mobile-sipantes',
  'Aplikasi mobile layanan RSUD Otista Soreang dengan informasi rumah sakit, booking, konsultasi, autentikasi, dan profil pasien.',
  'RSUD Otista Mobile atau SIPANTES merupakan aplikasi Flutter untuk memperluas akses layanan digital RSUD Otto Iskandardinata Soreang melalui perangkat mobile.

Fitur dan implementasi yang didokumentasikan:
- Layanan guest untuk melihat informasi rumah sakit dan menu layanan tanpa membuka data pasien.
- Registrasi dan autentikasi pengguna untuk mengakses layanan personal.
- Alur booking layanan, konsultasi, serta pengelolaan profil pengguna.
- Arsitektur Flutter berbasis BLoC dan repository agar state, tampilan, serta akses data terpisah dengan rapi.
- REST API berbasis Go Fiber dan MySQL dengan validasi input, pencarian, pagination, serta parameter binding.
- Endpoint pembacaan data dirancang terstruktur untuk kebutuhan aplikasi mobile dan integrasi layanan.

Seluruh screenshot diambil pada guest mode dan tidak menampilkan identitas maupun data medis pasien.',
  '["Flutter","Dart","BLoC","Go","Fiber","MySQL","REST API"]',
  NULL,
  NULL,
  100,
  TRUE,
  18
) ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  short_description = VALUES(short_description),
  detail_description = VALUES(detail_description),
  tech_stack = VALUES(tech_stack),
  demo_link = VALUES(demo_link),
  github_link = VALUES(github_link),
  thumbnail_asset_id = VALUES(thumbnail_asset_id),
  featured = VALUES(featured),
  sort_order = VALUES(sort_order);

INSERT INTO project_images (id, project_id, asset_id, caption, sort_order)
VALUES
  (1, 1, 4,  'Halaman login aplikasi', 1),
  (2, 1, 5,  'Layar kasir untuk transaksi penjualan', 2),
  (3, 1, 6,  'Rekap data transaksi penjualan', 3),
  (4, 1, 7,  'Manajemen master barang', 4),
  (5, 1, 8,  'Data pengunjung pujasera', 5),
  (6, 1, 9,  'Dashboard superadmin', 6),
  (7, 1, 10, 'Pengaturan persenan pembagian pendapatan', 7),
  (8, 1, 11, 'Manajemen pengguna aplikasi', 8),
  (9, 1, 12, 'Pengaturan profil toko', 9),
  (10, 1, 13, 'Halaman profil pengguna', 10),
  (12, 2, 14, 'Halaman login aplikasi EMR', 1),
  (13, 2, 15, 'Dashboard administrator EMR', 2),
  (14, 2, 16, 'Rekam medis rawat jalan dan daftar pasien', 3),
  (15, 2, 17, 'Rekam medis rawat inap dan daftar pasien', 4),
  (16, 2, 18, 'Rekam medis rawat darurat dan daftar pasien', 5),
  (17, 2, 19, 'Master data asuhan keperawatan (NANDA)', 6),
  (18, 2, 20, 'Kiosk antrean mandiri untuk pasien', 7),
  (19, 2, 21, 'Pengaturan identitas rumah sakit', 8),
  (20, 2, 22, 'Profil pengguna aplikasi', 9),
  (21, 2, 23, 'Form anamnesa pasien rawat jalan', 10),
  (22, 3, 24, 'Halaman splash screen aplikasi', 1),
  (23, 3, 25, 'Halaman landing dengan pilihan Masuk / Buat Akun', 2),
  (24, 3, 26, 'Halaman login pengguna aplikasi', 3),
  (25, 3, 27, 'Dashboard utama dengan menu layanan rumah sakit', 4),
  (26, 3, 28, 'Jadwal dokter dengan kuota pasien per poliklinik', 5),
  (27, 3, 29, 'Dialog booking registrasi pasien baru / pasien lama', 6),
  (28, 3, 30, 'Informasi bed rawat inap per kelas kamar', 7),
  (29, 4, 31, 'Dashboard admin perolehan suara per RT', 1),
  (30, 4, 32, 'Halaman login dashboard administrator', 2),
  (31, 4, 33, 'Data calon Ketua RT pada dashboard web', 3),
  (32, 4, 34, 'Laporan hasil pemilihan', 4),
  (33, 4, 35, 'Halaman login pemilih pada aplikasi mobile', 5),
  (34, 4, 36, 'Beranda pengumuman pemilihan di aplikasi mobile', 6),
  (35, 4, 37, 'Kartu calon Ketua RT dengan foto dan nomor urut', 7),
  (36, 4, 38, 'Grafik hasil suara sementara di aplikasi mobile', 8),
  (37, 4, 39, 'Profil pemilih dengan status sudah / belum memilih', 9),
  (38, 5, 40, 'Beranda dengan hero carousel dan menu utama', 1),
  (39, 5, 41, 'Halaman profil dan sejarah perusahaan', 2),
  (40, 5, 42, 'Halaman unit-unit usaha koperasi', 3),
  (41, 5, 43, 'Halaman artikel dan berita kegiatan', 4),
  (42, 5, 44, 'Halaman kontak dengan form pesan', 5),
  (43, 5, 45, 'Halaman struktur organisasi dan galeri foto', 6),
  (44, 5, 46, 'Halaman login administrator', 7),
  (45, 5, 47, 'Dashboard statistik pengunjung website', 8),
  (46, 5, 48, 'Kelola artikel / tulisan pada panel admin', 9),
  (47, 5, 49, 'Kelola data unit usaha pada panel admin', 10),
  (55, 6, 50, 'Halaman login aplikasi', 1),
  (49, 6, 51, 'Dashboard admin dengan data hasil patroli', 2),
  (50, 6, 52, 'Kelola data user (admin & pemeriksa)', 3),
  (51, 6, 53, 'Kelola jadwal sesi patroli', 4),
  (52, 6, 54, 'Kelola paket jadwal patroli', 5),
  (53, 6, 55, 'Form scan QR checkpoint pada aplikasi petugas', 6),
  (54, 6, 56, 'Riwayat hasil check-point petugas', 7),
  (56, 7, 57, 'Dashboard operasional dengan statistik dan grafik penjualan', 1),
  (57, 7, 58, 'Master barang: obat dan alat kesehatan', 2),
  (58, 7, 59, 'Monitoring stok dan gudang dengan tanggal kedaluwarsa', 3),
  (59, 7, 60, 'Manajemen purchase order dari pemasok', 4),
  (60, 7, 61, 'Penjualan dan distribusi dengan status pengiriman', 5),
  (61, 7, 62, 'Laporan rekap penjualan dan produk terlaris', 6),
  (62, 8, 63, 'Halaman login aplikasi penjadwalan dokter', 1),
  (63, 8, 64, 'Dashboard dengan statistik dan grafik jadwal per poli', 2),
  (64, 8, 65, 'Kalender jadwal praktik dokter (FullCalendar)', 3),
  (65, 8, 66, 'Data dokter lengkap dengan DataTables', 4),
  (66, 9, 67, 'Dashboard voucher corporate dengan statistik dan grafik', 1),
  (67, 9, 68, 'Data stok voucher per buku terima', 2),
  (68, 9, 69, 'Data pengiriman voucher ke outlet / office', 3),
  (69, 9, 70, 'Stok & penjualan voucher per outlet', 4),
  (70, 9, 71, 'Daftar voucher terpakai dengan detail aktivasi', 5),
  (71, 9, 72, 'Halaman validasi dan aktivasi voucher', 6),
  (72, 10, 73, 'Dashboard POSMCC V2 dengan target sales dan transaksi harian', 1),
  (73, 10, 74, 'Halaman new transaction (transaksi baru) dengan data pelanggan', 2),
  (74, 10, 75, 'Tracking order transaksi dengan status pengiriman', 3),
  (75, 10, 76, 'Monitor piutang dengan kalender jatuh tempo', 4),
  (76, 10, 77, 'Halaman report sales, sumber via, piutang dan data lainnya', 5),
  (77, 10, 78, 'Halaman closing POS dengan summary dan detail agent MCC', 6),
  (78, 11, 79, 'Dashboard Purchase Request dengan status approval dan daftar pengajuan (Published PO)', 1),
  (79, 11, 80, 'List Otorisasi Pengajuan dengan detail pemohon, nilai dan progress approval', 2),
  (80, 11, 81, 'Form Pengajuan Material Requirements Planning (periode, area, kategori barang)', 3),
  (81, 11, 82, 'Form MRP dengan periode Mei 2026 terpilih dan tabel kategori barang', 4),
  (82, 11, 83, 'Form Setting Kontrak Payung (detail kontrak, dokumen, supplier dan barang)', 5),
  (83, 11, 84, 'Halaman list Kontrak Payung dengan filter periode dan status', 6),
  (84, 12, 85, 'Dashboard Purchase Order dengan data operasional yang telah diburamkan', 1),
  (85, 12, 86, 'Daftar Purchase Order dengan filter periode', 2),
  (86, 12, 87, 'Riwayat approval Purchase Order', 3),
  (87, 13, 88, 'Dashboard penawaran delivery dengan data customer teredaksi', 1),
  (88, 13, 89, 'Tabel tindak lanjut customer yang telah diburamkan', 2),
  (89, 13, 90, 'Forecast rencana order dan histori potensial order', 3),
  (90, 13, 91, 'Ringkasan top outlet, kota, dan order customer teredaksi', 4),
  (91, 14, 92, 'Dashboard video Learning & Development dengan data internal teredaksi', 1),
  (92, 15, 93, 'Dashboard POS Event dengan transaksi dan nilai penjualan teredaksi', 1),
  (93, 16, 94, 'Preview teredaksi untuk scope, metodologi, dan matriks risiko', 1),
  (94, 16, 95, 'Preview teredaksi untuk temuan dan bukti pengujian', 2),
  (95, 16, 96, 'Preview teredaksi untuk rekomendasi remediasi dan kesimpulan', 3),
  (96, 17, 97, 'Beranda Baregad Sparepart dengan pencarian dan kategori produk', 1),
  (97, 17, 98, 'Katalog sparepart dengan filter dan pengurutan produk', 2),
  (98, 17, 99, 'Detail produk dengan kompatibilitas, stok, rating, dan ulasan', 3),
  (99, 18, 100, 'Showcase antarmuka RSUD Otista Mobile (SIPANTES)', 1),
  (100, 18, 101, 'Beranda guest dengan akses informasi dan layanan rumah sakit', 2),
  (101, 18, 102, 'Alur booking layanan pada aplikasi mobile', 3),
  (102, 18, 103, 'Halaman profil pengguna pada aplikasi mobile', 4)
ON DUPLICATE KEY UPDATE
  project_id = VALUES(project_id),
  asset_id = VALUES(asset_id),
  caption = VALUES(caption),
  sort_order = VALUES(sort_order);

INSERT INTO experiences (id, company, position, start_date, end_date, is_current, description, tech_stack, sort_order)
VALUES (
  1,
  'PT Champ Resto Indonesia Tbk',
  'Web Developer & Security',
  '2025-04-01',
  NULL,
  TRUE,
  'Mengembangkan dan memelihara aplikasi bisnis untuk Voucher Management, POS, MRP, Purchasing, CRM, Learning & Development, dan Event Management.\nMelakukan security assessment dan penetration testing untuk mengidentifikasi kerentanan serta memberikan rekomendasi remediasi.',
  '["Nuxt.js","Laravel 10","TypeScript","PHP","Application Security"]',
  1
),
(
  2,
  'PT Mitra Medika Sejati / RSU Kasih Bunda',
  'IT Staff',
  '2024-08-01',
  '2024-12-31',
  FALSE,
  'Mengembangkan aplikasi penjadwalan dokter serta mengelola website rumah sakit, SIMRS, server, jaringan, dan layanan IT support.\nMenangani maintenance hardware dan software serta troubleshooting untuk menjaga operasional rumah sakit tetap stabil.',
  '["Web Development","SIMRS","Server","Networking","IT Support"]',
  2
),
(
  3,
  'PT Sapta Sari Tama',
  'IT Staff Programmer',
  '2024-06-01',
  '2024-08-31',
  FALSE,
  'Mengembangkan dan memelihara aplikasi ERP berbasis CodeIgniter 3 untuk otomasi proses bisnis distribusi.\nMelakukan maintenance, optimasi, troubleshooting, dan perbaikan bug untuk menjaga stabilitas serta performa aplikasi.',
  '["CodeIgniter 3","PHP","ERP","SQL"]',
  3
),
(
  4,
  'PT Qtasnim Digital Teknologi',
  'Web Developer',
  '2023-01-01',
  '2024-04-30',
  FALSE,
  'Mengembangkan aplikasi mobile dan Electronic Medical Record menggunakan Flutter, CodeIgniter, Ext JS, dan PostgreSQL.\nMengerjakan BPJS bridging, upgrade EMR, deployment, troubleshooting, dan optimasi pada lebih dari tujuh proyek rumah sakit.',
  '["Flutter","CodeIgniter","Ext JS","PostgreSQL","BPJS Bridging"]',
  4
),
(
  5,
  'PT Unggul Bukit Kencana',
  'IT Staff',
  '2022-07-01',
  '2022-12-31',
  FALSE,
  'Mengembangkan aplikasi checkpoint pabrik untuk pelaporan keamanan dan pemantauan operasional.\nMengelola server Ubuntu, jaringan, database, aplikasi Node.js, backup, dukungan hardware/software, serta pemantauan Haiwell PLC dan HMI.',
  '["Node.js","Ubuntu Server","Networking","Database","Haiwell PLC/HMI"]',
  5
),
(
  6,
  'Koperasi PT INTI',
  'Freelance Web Developer',
  '2021-11-01',
  '2022-03-31',
  FALSE,
  'Mengembangkan sistem Point of Sale berbasis web untuk kasir pujasera dan pemantauan penjualan.\nSistem membantu pengelola memantau performa penjualan, data keuangan, dan laporan operasional secara terpusat.',
  '["Web POS","Transaction System","Sales Reporting","Database"]',
  6
) ON DUPLICATE KEY UPDATE
  company = VALUES(company),
  position = VALUES(position),
  start_date = VALUES(start_date),
  end_date = VALUES(end_date),
  is_current = VALUES(is_current),
  description = VALUES(description),
  tech_stack = VALUES(tech_stack),
  sort_order = VALUES(sort_order);

INSERT INTO social_links (id, platform, url, icon, sort_order, is_active)
VALUES
  (1, 'GitHub', 'https://github.com/necrology', 'Github', 1, TRUE),
  (2, 'LinkedIn', 'https://www.linkedin.com/in/maulanagw', 'Linkedin', 2, TRUE),
  (3, 'Instagram', 'https://instagram.com/username', 'Instagram', 3, FALSE),
  (4, 'WhatsApp', 'https://wa.me/628999228241', 'MessageCircle', 4, TRUE),
  (5, 'Email', 'mailto:maulanagandawijaya@gmail.com', 'Mail', 5, TRUE)
ON DUPLICATE KEY UPDATE
  platform = VALUES(platform),
  url = VALUES(url),
  icon = VALUES(icon),
  sort_order = VALUES(sort_order),
  is_active = VALUES(is_active);

COMMIT;
