# Gunakan image Nginx resmi yang ringan (Alpine adalah pilihan yang baik untuk ukuran kecil)
FROM nginx:alpine

# Salin semua file dari direktori lokal saat ini (build context)
# ke direktori default Nginx untuk konten web statis di dalam kontainer.
# /usr/share/nginx/html adalah lokasi standar Nginx mencari file-file webnya.
COPY . /usr/share/nginx/html

# EXPOSE memberitahu Docker bahwa kontainer akan mendengarkan pada port 80.
# Ini lebih merupakan dokumentasi daripada aturan yang memaksa.
EXPOSE 80

# Perintah default untuk menjalankan Nginx di latar depan (foreground).
# Ini penting agar kontainer tetap berjalan dan tidak langsung mati.
CMD ["nginx", "-g", "daemon off;"]