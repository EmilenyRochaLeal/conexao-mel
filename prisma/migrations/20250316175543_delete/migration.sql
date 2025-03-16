/*
  Warnings:

  - You are about to drop the column `name` on the `Produto` table. All the data in the column will be lost.
  - You are about to drop the column `unidadeMedida` on the `Produto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "name",
DROP COLUMN "unidadeMedida";
