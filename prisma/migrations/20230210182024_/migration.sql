/*
  Warnings:

  - You are about to drop the column `locationId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `Membership` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subscriptionId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionRole" AS ENUM ('BASIC', 'PRO');

-- DropForeignKey
ALTER TABLE "Membership" DROP CONSTRAINT "Membership_userId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "locationId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Membership";

-- DropEnum
DROP TYPE "MembershipRole";

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "SubscriptionRole" NOT NULL DEFAULT 'BASIC',

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
