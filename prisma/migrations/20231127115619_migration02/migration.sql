/*
  Warnings:

  - Added the required column `createdBy` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Message` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL;
