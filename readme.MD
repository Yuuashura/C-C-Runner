## C/C++ Runner
### 🚀 Overview
C/C++ Runner adalah extension Visual Studio Code sederhana yang dirancang untuk mempercepat alur kerja Anda dengan memungkinkan kompilasi dan eksekusi file C dan C++ secara cepat menggunakan GCC/G++ di jendela konsol terpisah.

Extension ini unik karena memberikan Anda kontrol penuh atas shell eksekusi (PowerShell atau CMD) dan secara otomatis menahan jendela konsol agar Anda dapat melihat output program tanpa perlu menambahkan command system("pause") secara manual.

Fitur Utama
Kompilasi Cepat: Menggunakan gcc untuk file .c dan g++ untuk file .cpp.

Eksekusi Eksternal: Menjalankan program di jendela konsol PowerShell atau CMD terpisah.

Pause Otomatis: Jendela konsol akan otomatis tertahan (silent pause) hingga Anda menutupnya, tanpa memerlukan command pause di kode sumber Anda.

Kontrol Penuh: Tombol Run, Stop, dan Restart di bilah judul editor dan context menu.

Konfigurasi Shell: Pilih shell eksekusi default sesuai preferensi Anda.

🛠️ Persyaratan
Untuk menggunakan extension ini, Anda harus sudah menginstal kompiler GCC (GNU Compiler Collection) pada sistem Anda.

MinGW-w64 (Disarankan): Pastikan Anda telah menginstal MinGW-w64 dan menambahkan path ke folder bin (misalnya, C:\mingw64\bin) ke Environment Variables PATH Windows Anda.

📦 Instalasi
Karena extension ini belum dipublikasikan di Marketplace (atau jika Anda menginstalnya dari sumber), Anda harus menginstal file .vsix secara manual.

Unduh .vsix: Dapatkan file .vsix terbaru dari halaman rilis GitHub Anda.

Buka VS Code: Buka Visual Studio Code.

Buka Extensions View: Klik ikon Extensions (Ctrl+Shift+X).

Install dari VSIX: Klik ikon tiga titik (...) di kanan atas tampilan Extensions, lalu pilih "Install from VSIX..."

Pilih file .vsix yang telah Anda unduh.

⚙️ Penggunaan & Command
Command Palette (Ctrl+Shift+P)
Semua command dapat diakses melalui Command Palette.

Command ID	Title	Keterangan
cpp-runner.run	Run C/C++ File	Kompilasi dan eksekusi program.
cpp-runner.restart	Restart C/C++ Run	Menghentikan proses yang berjalan dan menjalankannya kembali.
cpp-runner.stop	Stop C/C++ Run	Menghentikan paksa proses eksekusi konsol.
cpp-runner.openSettings	Open C/C++ Runner Settings	Langsung membuka halaman konfigurasi extension.

Ekspor ke Spreadsheet
Keybindings Default
Run / Restart: Tekan F5

⚙️ Konfigurasi Shell
Anda dapat memilih shell mana yang akan digunakan extension untuk eksekusi program. Defaultnya adalah PowerShell.

Buka Command Palette (Ctrl+Shift+P).

Ketik dan pilih "Open C/C++ Runner Settings".

Cari pengaturan C/C++ Runner: Execution Shell.

Pilih salah satu dari:

PowerShell (Disarankan): Menggunakan powershell.exe.

CMD: Menggunakan cmd.exe