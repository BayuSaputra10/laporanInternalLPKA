/*
  Warnings:

  - You are about to drop the column `jadwalData` on the `GensetReport` table. All the data in the column will be lost.
  - You are about to drop the column `keteranganData` on the `GensetReport` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GensetReport" DROP COLUMN "jadwalData",
DROP COLUMN "keteranganData";
