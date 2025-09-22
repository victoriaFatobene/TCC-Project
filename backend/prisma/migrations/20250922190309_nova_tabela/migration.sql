/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `statusId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('RECEBIDO', 'PREPARANDO', 'PRONTO');

-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "readyAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'RECEBIDO';

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "statusId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "status_name_key" ON "public"."status"("name");

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
