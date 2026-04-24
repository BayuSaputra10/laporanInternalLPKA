# TODO - Tambah Kolom Nama Driver di Form Kendaraan

- [x] 1. Buat rencana edit
- [x] 2. Konfirmasi user
- [x] 3. Edit `prisma/schema.prisma` — tambah field `namaDriver`
- [x] 4. Edit `lib/types.ts` — tambah `namaDriver` pada interface `VehicleReport`
- [x] 5. Edit `app/api/reports/vehicle/route.ts` — baca, validasi, sort, select `namaDriver`
- [x] 6. Edit `app/reports/vehicle/create/page.tsx` — input field Nama Driver
- [x] 7. Edit `app/reports/vehicle/page.tsx` — tampilkan kolom Nama Driver di tabel
- [x] 8. Edit `app/reports/vehicle/[id]/page.tsx` — sertakan `namaDriver` di safeData
- [x] 9. Edit `app/reports/vehicle/[id]/VehicleDetailClient.tsx` — tampilkan Nama Driver di detail
- [x] 10. Jalankan migrasi Prisma (`npx prisma migrate dev --name add_nama_driver`)
- [x] 11. Verifikasi build/compile OK

