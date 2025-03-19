import prismaClient from "../../prisma/indext"

interface DeleteProps{
    id : string
}

class DeleteProdutoService{
    async execute({id}: DeleteProps) {
        if (!id){
            throw new Error("Solicitação invalida")
        }

        const findProduto = await prismaClient.produto.findFirst({
            where:{
                id: id
            }
        });

        if (!findProduto){
            throw new Error("Produto não existe")
        }

        await prismaClient.produto.delete({
            where:{
                id: findProduto.id
            }
        })
        return {message: "Produto Deletado"}
    }
}

export { DeleteProdutoService };