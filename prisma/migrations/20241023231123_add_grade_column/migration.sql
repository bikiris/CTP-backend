/*
  Warnings:

  - Added the required column `grade` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GradeEmum" AS ENUM ('FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "grade" "GradeEmum" NOT NULL;
