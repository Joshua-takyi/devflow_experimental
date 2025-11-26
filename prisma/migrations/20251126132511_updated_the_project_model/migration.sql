/*
  Warnings:

  - You are about to drop the column `likes` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Project` table. All the data in the column will be lost.
  - Made the column `content` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "likes",
DROP COLUMN "views",
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "isPublic" SET DEFAULT true;

-- CreateTable
CREATE TABLE "MetaData" (
    "id" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
