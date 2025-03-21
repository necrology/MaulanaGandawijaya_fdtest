## Techincal Test Maulana Gandawijaya

Ini adalah aplikasi yang saya buat dengan laravel versi 11 dikombinasikan dengan Inertia JS untuk membuat aplikasi ini menjadi Single Page Application.

## System Requirements

- PHP <code>v8+</code>
- Node Js <code>v22+</code>
- PostgreSql <code>v17+</code> + Driver PostgreSql JDBC (Jika driver tidak ditemukan ketika laravel mencoba koneksi)
- Composer <code>v2+</code>

## Instalasi

Clone Project dan jalankan perintah pada terminal sebagai berikut :

```
git clone https://github.com/necrology/MaulanaGandawijaya_fdtest.git
cd MaulanaGandawijaya_fdtest
```

Install dan Update Composer dengan perintah :

```
composer install
composer update
```

Install Inertia Vue dengan perintah :

```
npm install @inertiajs/vue3
```

Lanjut copy file <code>.env.example</code> dengan nama <code>.env</code> Kemudian hapus hastag dan edit beberapa di file berikut ini:

Terkait database <code>dengan ketentuan database sudah dibuat</code>

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE={isi dengan nama database} //tanpa menggunakan tanda kurung kurawal
DB_USERNAME={isi dengan username postgresql} //tanpa menggunakan tanda kurung kurawal
DB_PASSWORD={isi dengan password posgresql} //tanpa menggunakan tanda kurung kurawal
```

Lalu edit juga bagian untuk service email seperti berikut :

```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME={isi dengan email} //tanpa menggunakan tanda kurung kurawal
MAIL_PASSWORD={isi dengan sandi aplikasi} //tanpa menggunakan tanda kurung kurawal
MAIL_ENCRYPTION=TLS
MAIL_FROM_ADDRESS="{isi dengan email}" //tanpa menggunakan tanda kurung kurawal
MAIL_FROM_NAME="${APP_NAME}"
```

Untuk mendapatkan sandi aplikasi dari gmail silahkan ikuti [tautan ini](https://myaccount.google.com/apppasswords)

Lanjut dengan proses migrate database

```
php artisan migrate
```

Lanjut dengan proses generate key

```
php artisan key:generate
```

Jalankan project dengan perintah :
```
php artisan serve
```

Lalu buka terminal baru dan jalankan juga perintah :

```
cd MaulanaGandawijaya_fdtest
npm run dev
```

## Third-party libraries yang digunakan

- Inertia Js untuk menjadikan aplikasi menjadi SPA
- Inertia Vue kolaborasi dengan vue js
- Laravel Breeze untuk autentikasi yang lebih efisien, optimal dan aman

## Penambahan fitur

- Pada landing page menambahkan fitur detail ketika data buku muncul untuk melihat secara detail buku yang ada

## Dokumen Unit Test

Dokumen unit test berada pada folder berikut :

```plaintext
MaulanaGandawijaya_fdtest/
├── documentation/                  # Folder dokumentasi
│   ├── Technical Testing Maulana Gandawijaya - Unit Test.pdf       
```
