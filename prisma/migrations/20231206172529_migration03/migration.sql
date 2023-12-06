/*
  Warnings:

  - The values [example] on the enum `Ticket_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `type` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `type` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('open', 'closed', 'pending') NOT NULL DEFAULT 'open';
