import prismaClient from "../../prisma/indext";

class ListMeusProdutosService{
    async execute(user_id: string) {
        const produtos = await prismaClient.produto.findMany({
          where: {
            vendedorId: user_id, 
          },
          select: {
            id: true,
            preco: true,
            imagemName: true,
            descricao: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        });
    
        return produtos;
      }
    }

export {ListMeusProdutosService}
