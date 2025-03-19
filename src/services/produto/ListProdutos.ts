import prismaClient from "../../prisma/indext";

class ListProdutos{
    async execute(idProduto: string){

        const produto = await prismaClient.produto.findMany({
            where:{
                id: idProduto
            },
                select: {
                    id: true,
                    preco: true,
                    imagemName: true,
                    descricao: true,
                    role: true, 
                    vendedorId:true,
                    estoque:true,
                }
            }
        );

        return produto;

    }
}

export {ListProdutos};

