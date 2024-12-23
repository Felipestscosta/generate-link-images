-- CreateTable
CREATE TABLE "Ean" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "data_utilizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ean_pkey" PRIMARY KEY ("id")
);
