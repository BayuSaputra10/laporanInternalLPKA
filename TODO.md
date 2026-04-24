# TODO: Add Laporan Pengisian Solar Kendaraan Dinas

## Steps
- [ ] 1. Update `prisma/schema.prisma` — add `VehicleFuelReport` model
- [ ] 2. Update `lib/types.ts` — add `VehicleFuelReport` interface & update `FooterData`/`DashboardData`
- [ ] 3. Run Prisma migration & generate
- [ ] 4. Create `app/api/reports/vehicle-fuel/route.ts` — GET, POST, DELETE
- [ ] 5. Update `app/api/reports/[id]/route.ts` — include `VehicleFuelReport` lookup
- [ ] 6. Create `app/reports/vehicle-fuel/create/page.tsx` — fuel fill form
- [ ] 7. Create `app/reports/vehicle-fuel/page.tsx` — list page
- [ ] 8. Create `app/reports/vehicle-fuel/[id]/page.tsx` — detail server component
- [ ] 9. Create `app/reports/vehicle-fuel/[id]/VehicleFuelDetailClient.tsx` — detail client + PDF
- [ ] 10. Update `app/page.tsx` — stats, button, recent reports, footerData query
- [ ] 11. Update `app/components/Footer.tsx` — include fuel report stats
- [ ] 12. Update `app/actions/report.ts` — support `vehicle-fuel` delete
- [ ] 13. Test & verify

