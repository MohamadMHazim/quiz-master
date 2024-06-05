/*
  Warnings:

  - You are about to alter the column `grade` on the `useranswer` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `useranswer` MODIFY `grade` BOOLEAN NOT NULL;
