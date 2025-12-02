/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Project` table. All the data in the column will be lost.
  - Added the required column `summary` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "images",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "summary" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProjectStep" ALTER COLUMN "content" DROP NOT NULL;
