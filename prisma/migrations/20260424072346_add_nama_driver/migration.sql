/*
  Warnings:

  - You are about to drop the column `ampere` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `ampereR` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `ampereS` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `ampereT` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `catatan` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `gantiFilterOli` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `gantiFilterSolar` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `gantiOliMesin` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `generator` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `hz` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `kw` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `mesin` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `oliPress` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `shift` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `speed` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `temp` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `volt` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `reportId` on the `VehicleReport` table. All the data in the column will be lost.
  - You are about to drop the column `solarAkhir` on the `VehicleReport` table. All the data in the column will be lost.
  - You are about to drop the column `solarAwal` on the `VehicleReport` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleName` on the `VehicleReport` table. All the data in the column will be lost.
  - You are about to drop the `Inspection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reportNumber]` on the table `VehicleReport` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hourMeterAkhir` to the `GensetReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourMeterAwal` to the `GensetReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktuPemakaianJam` to the `GensetReport` table without a default value. This is not possible if the table is not empty.
  - Made the column `solarLevelAkhir` on table `GensetReport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `solarLevelAwal` on table `GensetReport` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `jenisKendaraan` to the `VehicleReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `keperluan` to the `VehicleReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `namaDriver` to the `VehicleReport` table without a default value. This is not possible if the table is not empty.
  - The required column `reportNumber` was added to the `VehicleReport` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `solarAkhirStrip` to the `VehicleReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solarAwalStrip` to the `VehicleReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `VehicleReport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inspection" DROP CONSTRAINT "Inspection_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Inspection" DROP CONSTRAINT "Inspection_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_gensetid_fkey";

-- DropForeignKey
ALTER TABLE "VehicleReport" DROP CONSTRAINT "VehicleReport_reportId_fkey";

-- DropIndex
DROP INDEX "VehicleReport_reportId_key";

-- AlterTable
ALTER TABLE "GensetReport" DROP COLUMN "ampere",
DROP COLUMN "ampereR",
DROP COLUMN "ampereS",
DROP COLUMN "ampereT",
DROP COLUMN "catatan",
DROP COLUMN "gantiFilterOli",
DROP COLUMN "gantiFilterSolar",
DROP COLUMN "gantiOliMesin",
DROP COLUMN "generator",
DROP COLUMN "hz",
DROP COLUMN "kw",
DROP COLUMN "mesin",
DROP COLUMN "oliPress",
DROP COLUMN "shift",
DROP COLUMN "speed",
DROP COLUMN "temp",
DROP COLUMN "volt",
ADD COLUMN     "hourMeterAkhir" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hourMeterAwal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "photoData" BYTEA,
ADD COLUMN     "waktuPemakaianJam" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "solarLevelAkhir" SET NOT NULL,
ALTER COLUMN "solarLevelAwal" SET NOT NULL;

-- AlterTable
ALTER TABLE "VehicleReport" DROP COLUMN "reportId",
DROP COLUMN "solarAkhir",
DROP COLUMN "solarAwal",
DROP COLUMN "vehicleName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "fotoData" BYTEA,
ADD COLUMN     "jenisKendaraan" TEXT NOT NULL,
ADD COLUMN     "keperluan" TEXT NOT NULL,
ADD COLUMN     "kmPemakaian" DOUBLE PRECISION,
ADD COLUMN     "namaDriver" TEXT NOT NULL,
ADD COLUMN     "reportNumber" TEXT NOT NULL,
ADD COLUMN     "solarAkhirStrip" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "solarAwalStrip" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "solarPemakaian" DOUBLE PRECISION,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft',
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "kmAwal" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "kmAkhir" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "Inspection";

-- DropTable
DROP TABLE "Report";

-- CreateIndex
CREATE UNIQUE INDEX "VehicleReport_reportNumber_key" ON "VehicleReport"("reportNumber");

-- AddForeignKey
ALTER TABLE "GensetInspection" ADD CONSTRAINT "GensetInspection_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InspectionItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
