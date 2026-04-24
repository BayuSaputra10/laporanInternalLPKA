# TODO - Genset Service Report

## Database & Schema
- [ ] Update `prisma/schema.prisma` — tambah model `GensetServiceReport`
- [ ] Update `lib/types.ts` — tambah interface & update DashboardData/FooterData

## API
- [ ] Create `app/api/reports/genset-service/route.ts` — GET, POST, DELETE
- [ ] Update `app/api/reports/[id]/route.ts` — tambah lookup genset service
- [ ] Update `app/actions/report.ts` — tambah type `genset-service`

## UI Pages
- [ ] Create `app/reports/genset-service/page.tsx` — list
- [ ] Create `app/reports/genset-service/create/page.tsx` — form
- [ ] Create `app/reports/genset-service/[id]/page.tsx` — detail server
- [ ] Create `app/reports/genset-service/[id]/GensetServiceDetailClient.tsx` — detail client

## Dashboard & Footer
- [ ] Update `app/page.tsx` — stat card, tombol, tabel terbaru
- [ ] Update `app/components/Footer.tsx` — card summary genset service

## Migration
- [ ] Jalankan `npx prisma migrate dev --name add_genset_service_report`

