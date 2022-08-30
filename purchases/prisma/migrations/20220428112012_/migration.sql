/*
  Warnings:

  - You are about to drop the column `STATUS` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "STATUS",
ADD COLUMN     "status" "PurchaseStatus" NOT NULL DEFAULT E'PENDING';
