/*
  Warnings:

  - Added the required column `unidadeMedida` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UnidadeMedida" AS ENUM ('LITRO', 'QUILO');

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "unidadeMedida" "UnidadeMedida" NOT NULL;
