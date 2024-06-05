/*
  Warnings:

  - Added the required column `grade` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `useranswer` ADD COLUMN `grade` INTEGER NOT NULL;
