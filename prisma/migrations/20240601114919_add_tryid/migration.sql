/*
  Warnings:

  - Added the required column `tryid` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `useranswer` ADD COLUMN `tryid` INTEGER NOT NULL;
