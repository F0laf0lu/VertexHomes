/*
  Warnings:

  - You are about to drop the column `address` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `Listing` table. All the data in the column will be lost.
  - The `yearBuilt` column on the `Listing` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `agentId` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `propertyType` on the `Listing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'SPECIALPURPOSE', 'LAND');

-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('ACTIVE', 'PENDING', 'CLOSED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "address",
DROP COLUMN "country",
DROP COLUMN "isAvailable",
ADD COLUMN     "agentId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "listingStatus" "ListingStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "squareFeet" INTEGER,
ADD COLUMN     "street" TEXT NOT NULL,
DROP COLUMN "propertyType",
ADD COLUMN     "propertyType" "PropertyType" NOT NULL,
DROP COLUMN "yearBuilt",
ADD COLUMN     "yearBuilt" INTEGER;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "AgentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
