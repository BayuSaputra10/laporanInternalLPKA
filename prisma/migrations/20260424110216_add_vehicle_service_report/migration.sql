-- CreateTable
CREATE TABLE "VehicleServiceReport" (
    "id" SERIAL NOT NULL,
    "jenisKendaraan" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "catatan" TEXT NOT NULL,
    "fotoServis" BYTEA,
    "reportNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleServiceReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleServiceReport_reportNumber_key" ON "VehicleServiceReport"("reportNumber");
