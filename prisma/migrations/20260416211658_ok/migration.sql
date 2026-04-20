/*
  Warnings:

  - You are about to drop the column `reportId` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `voltR` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `voltS` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `voltT` on the `GensetReport` table. All the data in the column will be lost.
  - Added the required column `tanggal` to the `GensetReport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GensetReport" DROP CONSTRAINT "GensetReport_reportId_fkey";

-- DropIndex
DROP INDEX "GensetReport_reportId_key";

-- AlterTable
ALTER TABLE "GensetReport" DROP COLUMN "reportId",
DROP COLUMN "voltR",
DROP COLUMN "voltS",
DROP COLUMN "voltT",
ADD COLUMN     "ampereR" DOUBLE PRECISION,
ADD COLUMN     "ampereS" DOUBLE PRECISION,
ADD COLUMN     "ampereT" DOUBLE PRECISION,
ADD COLUMN     "catatan" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "volt" DOUBLE PRECISION,
ALTER COLUMN "gantiFilterOli" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "gantiFilterSolar" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "gantiOliMesin" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "speed" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "gensetid" INTEGER;

-- CreateTable
CREATE TABLE "GensetInspection" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "kondisi" TEXT NOT NULL,
    "keterangan" TEXT,
    "reportId" INTEGER NOT NULL,

    CONSTRAINT "GensetInspection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_gensetid_fkey" FOREIGN KEY ("gensetid") REFERENCES "GensetReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GensetInspection" ADD CONSTRAINT "GensetInspection_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "GensetReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
