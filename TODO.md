# TODO: Optimize Dashboard Loading Performance

## Problem
Dashboard loading lama karena:
1. Query database sequential (12 query dijalankan satu per satu)
2. Server Component melakukan HTTP fetch ke API sendiri (overhead tidak perlu)
3. Tidak ada caching (`cache: "no-store"`, `revalidate = 0`)
4. Kolom binary (foto) ikut di-fetch padahal tidak ditampilkan di dashboard

## Plan
- [x] Analisis kode dan identifikasi bottleneck
- [x] Edit `app/api/dashboard/route.ts` — parallelize query dengan `Promise.all()` + `select` field
- [x] Edit `app/page.tsx` — hapus fetch HTTP, ganti dengan direct Prisma query via `lib/dashboard.ts`
- [x] Buat `lib/dashboard.ts` — `unstable_cache` + parallel Prisma query + select field only
- [x] Update `lib/types.ts` — jadikan field selain dashboard-relevant optional
- [x] Fix `toIsoString` type di `lib/dashboard.ts`
- [x] Fix missing `catatan` field di `vehicleServiceReport` select
- [x] Test build — Next.js build berhasil, `/` revalidate 1m, TypeScript 0 errors

## Expected Impact
- Query DB dari ~1.5-3s → ~200-500ms (parallel)
- Cache mengurangi hit DB pada reload dalam 60 detik
- Payload JSON lebih kecil karena foto binary tidak di-fetch

