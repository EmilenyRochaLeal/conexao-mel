import { Request, Response } from "express";
import { DeleteProdutoService } from "../../services/produto/DeleteProdutoService";


class DeleteProdutoController{
    async handle(req: Request, res: Response){
        const { id } = req.params as { id:string }
        const deleteProdutoService =  new DeleteProdutoService();

        const produto = await deleteProdutoService.execute({ id });

        return res.send(produto);
    }
}
export { DeleteProdutoController }