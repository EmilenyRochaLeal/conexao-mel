import prismaClient from "../../prisma/indext";
import { Roledemel } from "@prisma/client";

interface ProdutoRequest{
    preco: number,
    descricao: string,
    imagemName: string,
    role: Roledemel,
    vendedorId: string,
    estoque: number
}

class CreateProdutoService{
    async execute({ preco, descricao, imagemName, role ,vendedorId, estoque}: ProdutoRequest){

        const produto = await  prismaClient.produto.create({
            data:{
                preco: preco, 
                descricao: descricao, 
                imagemName: imagemName, 
                role: role,
                vendedorId: vendedorId, 
                estoque: estoque
            }
        })

        return produto;

    }
}

export {CreateProdutoService};