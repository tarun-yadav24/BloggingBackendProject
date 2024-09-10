/*
  Warnings:

  - You are about to drop the column `Summary` on the `post` table. All the data in the column will be lost.
  - Added the required column `content` to the `post` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "Summary",
ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
