# Rayyan Auditore — Portofolio (Noir Detective)

React + Vite + TypeScript + Tailwind CSS.

## Menjalankan
```bash
cd project
npm install
npm run dev        # development
npm run build      # build produksi → project/dist
```

## Form kontak
Secara bawaan, tombol "Send Tip" membuka aplikasi email dengan pesan terisi otomatis.
Untuk mengirim langsung tanpa membuka aplikasi email, buat `project/.env` (lihat `.env.example`)
dan isi `VITE_FORM_ENDPOINT` dengan endpoint form (mis. Formspree).

## Menambah / mengganti foto
Taruh file di `project/public/` lalu panggil dengan `asset('namafile.jpg')` (lihat `MemoryBoard.tsx`).
Gunakan foto ≤ 1800px lebar agar situs tetap ringan.
