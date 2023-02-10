/*
  Warnings:

  - You are about to drop the column `locationId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Job` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "locationId";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "image",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
