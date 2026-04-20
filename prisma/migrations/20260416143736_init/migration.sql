-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "catatan" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VehicleReport" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "vehicleName" TEXT NOT NULL,
    "kmAwal" INTEGER NOT NULL,
    "kmAkhir" INTEGER NOT NULL,
    "solarAwal" INTEGER NOT NULL,
    "solarAkhir" INTEGER NOT NULL,

    CONSTRAINT "VehicleReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GensetReport" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "regu" TEXT NOT NULL,
    "hourAwal" INTEGER NOT NULL,
    "hourAkhir" INTEGER NOT NULL,

    CONSTRAINT "GensetReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" SERIAL NOT NULL,
    "reportId" INTEGER NOT NULL,
    "item" TEXT NOT NULL,
    "kondisi" TEXT NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleReport_reportId_key" ON "VehicleReport"("reportId");

-- CreateIndex
CREATE UNIQUE INDEX "GensetReport_reportId_key" ON "GensetReport"("reportId");

-- AddForeignKey
ALTER TABLE "VehicleReport" ADD CONSTRAINT "VehicleReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GensetReport" ADD CONSTRAINT "GensetReport_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
