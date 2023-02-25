/*
  Warnings:

  - The values [Onsite,Remote] on the enum `JobType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('USER', 'PREMIUM');

-- AlterEnum
BEGIN;
CREATE TYPE "JobType_new" AS ENUM ('ONSITE', 'REMOTE');
ALTER TABLE "Job" ALTER COLUMN "type" TYPE "JobType_new" USING ("type"::text::"JobType_new");
ALTER TYPE "JobType" RENAME TO "JobType_old";
ALTER TYPE "JobType_new" RENAME TO "JobType";
DROP TYPE "JobType_old";
COMMIT;

-- CreateTable
CREATE TABLE "Membership" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "role" "MembershipRole" NOT NULL DEFAULT 'USER',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
