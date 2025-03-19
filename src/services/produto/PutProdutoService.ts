import prismaClient from "../../prisma/indext"
import { Roledemel } from "@prisma/client";

interface UpdateProps {
    id: string;
    preco: number;
    descricao: string;
    imagemName: string;
    role: Roledemel;
}

class PutProdutoService {

  async execute({id, preco, descricao, imagemName, role}: UpdateProps) {
    if (!id){
        throw new Error("Solicitação invalida")
    }
      // Verificando se o produto existe
      const produtoExistente = await prismaClient.produto.findUnique({
        where: { id },
      });

      if (!produtoExistente) {
        throw new Error("Produto não existe");
      }

      // Atualizando o produto
     await prismaClient.produto.update({
        where: { id },
        data: {
          descricao: descricao,
          preco: preco,
          imagemName: imagemName ?? produtoExistente.imagemName, // Mantém a imagem antiga caso não fornecida
          role: role
        },
      });

      return  {message: "Produto Atualizado"};
    } 
    }

export { PutProdutoService }
