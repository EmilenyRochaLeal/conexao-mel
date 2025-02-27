/*
  Warnings:

  - The values [Jataí] on the enum `Roledemel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Roledemel_new" AS ENUM ('Cajueiro', 'Aroeira', 'Eucalipto', 'Laranjeira', 'Marmeleiro', 'Silvestre');
ALTER TABLE "Produto" ALTER COLUMN "role" TYPE "Roledemel_new" USING ("role"::text::"Roledemel_new");
ALTER TYPE "Roledemel" RENAME TO "Roledemel_old";
ALTER TYPE "Roledemel_new" RENAME TO "Roledemel";
DROP TYPE "Roledemel_old";
COMMIT;
