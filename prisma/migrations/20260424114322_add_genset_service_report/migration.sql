-- CreateTable
CREATE TABLE "GensetServiceReport" (
    "id" SERIAL NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "catatan" TEXT NOT NULL,
    "fotoServis" BYTEA,
    "reportNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GensetServiceReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GensetServiceReport_reportNumber_key" ON "GensetServiceReport"("reportNumber");
