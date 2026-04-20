/*
  Warnings:

  - You are about to drop the column `hourAkhir` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `hourAwal` on the `GensetReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GensetReport" DROP COLUMN "hourAkhir",
DROP COLUMN "hourAwal",
ADD COLUMN     "jadwalData" JSONB,
ADD COLUMN     "keteranganData" JSONB;
