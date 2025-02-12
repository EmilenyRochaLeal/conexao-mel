/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('VENDEDOR', 'COMPRADOR');

-- CreateEnum
CREATE TYPE "Roledemel" AS ENUM ('Cajueiro', 'Aroeira', 'Eucalipto', 'Laranjeira', 'Jataí', 'Marmeleiro', 'Silvestre');

-- CreateEnum
CREATE TYPE "PedidoEstado" AS ENUM ('ANDAMENTO', 'CANCELADO', 'PRONTO');

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_consumer_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "items";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagemName" TEXT,
    "role" "Roledemel" NOT NULL,
    "vendedorId" INTEGER NOT NULL,
    "estoque" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "compradorId" INTEGER NOT NULL,
    "estado" "PedidoEstado" NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "compradorId" INTEGER NOT NULL,
    "avaliacao" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_compradorId_fkey" FOREIGN KEY ("compradorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_compradorId_fkey" FOREIGN KEY ("compradorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
