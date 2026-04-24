# TODO: Implementasi Form Pengisian Solar Genset

- [x] 1. Prisma Schema — Tambah model `GensetFuelReport`
- [x] 2. Types — Tambah `GensetFuelReport`, update `FooterData` & `DashboardData`
- [x] 3. Server Action — Tambah `genset-fuel` di `deleteReport`
- [x] 4. API Route — Buat `app/api/reports/genset-fuel/route.ts`
- [x] 5. API Detail Route — Update `app/api/reports/[id]/route.ts` untuk lookup `gensetFuelReport`
- [x] 6. UI List — Buat `app/reports/genset-fuel/page.tsx`
- [x] 7. UI Create — Buat `app/reports/genset-fuel/create/page.tsx`
- [x] 8. UI Detail Server — Buat `app/reports/genset-fuel/[id]/page.tsx`
- [x] 9. UI Detail Client — Buat `app/reports/genset-fuel/[id]/GensetFuelDetailClient.tsx`
- [x] 10. Dashboard — Update `app/page.tsx` (stats, button, latest table)
- [x] 11. Footer — Update `app/components/Footer.tsx` untuk `todayGensetFuel`
- [x] 12. Migrasi & Generate — Jalankan `prisma migrate dev` dan `prisma generate`
- [x] 13. Build Test — Jalankan `next build`

