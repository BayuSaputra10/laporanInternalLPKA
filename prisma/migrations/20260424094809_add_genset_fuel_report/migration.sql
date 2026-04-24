-- CreateTable
CREATE TABLE "GensetFuelReport" (
    "id" SERIAL NOT NULL,
    "tambahSolar" DOUBLE PRECISION NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "fotoStruk" BYTEA,
    "reportNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GensetFuelReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GensetFuelReport_reportNumber_key" ON "GensetFuelReport"("reportNumber");
