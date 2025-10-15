
# C/C++ Runner

### 🚀 Overview
C/C++ Runner adalah extension Visual Studio Code sederhana yang dirancang untuk mempercepat alur kerja Anda dengan memungkinkan kompilasi dan eksekusi file C dan C++ secara cepat menggunakan GCC/G++ di jendela konsol terpisah.

Extension ini unik karena memberikan Anda kontrol penuh atas shell eksekusi (PowerShell atau CMD) dan secara otomatis menahan jendela konsol agar Anda dapat melihat output program tanpa perlu menambahkan command system("pause") secara manual.





## Fitur Utama
- Kompilasi Cepat: Menggunakan gcc untuk file .c dan g++ untuk file .cpp.
- Eksekusi Eksternal: Program berjalan di jendela konsol PowerShell atau CMD terpisah.
- Silent Pause Otomatis: Jendela konsol akan tetap terbuka setelah program selesai, menunggu Anda menekan tombol apa pun, tanpa menampilkan pesan default yang mengganggu.
- Kontrol Penuh: Tombol Run, Stop, dan Restart tersedia di bilah judul editor.
- Konfigurasi Shell: Pilih shell eksekusi default Anda melalui pengaturan VS Code


## 🛠️ Persyaratan

Untuk menggunakan extension ini, Anda harus memiliki kompiler GCC (GNU Compiler Collection) yang terinstal pada sistem Anda.


- `MinGW-w64 (Disarankan): Pastikan Anda telah menginstal MinGW-w64 dan menambahkan path ke folder bin (misalnya, C:\mingw64\bin) ke Environment Variables PATH Windows Anda.`


## Penggunaan & Command

### `CTRL + SHIFT + P`

| Command ID | Title (Judul) | Function (Fungsi/Keterangan) |
| :--- | :--- | :--- |
| `cpp-runner.run (F5)` | **Jalankan File C/C++** | Mengkompilasi dan mengeksekusi program. |
| `cpp-runner.restart` | **Restart Jalankan C/C++** | Menghentikan proses yang sedang berjalan dan memulai ulang eksekusi. |
| `cpp-runner.stop` | **Hentikan Jalankan C/C++** | Menghentikan paksa (terminate) proses eksekusi konsol. |
| `cpp-runner.openSettings` | **Buka Pengaturan C/C++ Runner** | Menavigasi dengan cepat ke halaman konfigurasi ekstensi. |

## ⚙️ Konfigurasi Shell (Penting!)

Fitur ini memungkinkan Anda memilih *shell* mana yang akan digunakan *extension* untuk mengeksekusi program Anda. Nilai *default*-nya adalah **PowerShell**.

### Cara Mengubah Shell Default

1.  **Akses Pengaturan:** Buka **Command Palette** (Ctrl+Shift+P atau F1).
2.  Ketik dan pilih *command*: **`Open C/C++ Runner Settings`**.
3.  Di bilah pencarian pengaturan, cari: **`C/C++ Runner: Execution Shell`**.
4.  Pilih salah satu dari opsi berikut:
    * **`PowerShell` (Disarankan):** Menggunakan `powershell.exe`.
    * **`CMD`:** Menggunakan `cmd.exe`.



---

### Alur Kerja

Ketika Anda menjalankan *extension*:

1.  Buka *file* C atau C++ Anda.
2.  Tekan **F5** (atau klik ikon **Run** di bilah judul *editor*).
3.  *Extension* mengkompilasi *file* tersebut.
4.  Jendela *shell* eksternal (**PS** atau **CMD**) terbuka, menjalankan program Anda, dan tetap terbuka (*pause*) hingga Anda menekan tombol apa pun.

# ©
- [@RomiKusumaBakti](https://github.com/romikusumabakti)