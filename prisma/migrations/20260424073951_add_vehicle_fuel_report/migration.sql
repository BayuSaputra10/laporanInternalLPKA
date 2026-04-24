-- CreateTable
CREATE TABLE "VehicleFuelReport" (
    "id" SERIAL NOT NULL,
    "jenisKendaraan" TEXT NOT NULL,
    "tambahSolar" DOUBLE PRECISION NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "fotoStruk" BYTEA,
    "reportNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VehicleFuelReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleFuelReport_reportNumber_key" ON "VehicleFuelReport"("reportNumber");
