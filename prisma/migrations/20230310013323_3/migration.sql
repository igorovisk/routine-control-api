/*
  Warnings:

  - Added the required column `description` to the `routines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "routines" ADD COLUMN     "description" TEXT NOT NULL;
