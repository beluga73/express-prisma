/*
  Warnings:

  - You are about to drop the column `status` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `columnId` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "status",
ADD COLUMN     "columnId" INTEGER NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Column" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;
