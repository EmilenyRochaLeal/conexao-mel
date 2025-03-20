import { Request, Response } from "express";
import { ListProdutos } from "../../services/produto/ListProdutos";

class ListProdutoController {
  async handle(req: Request, res: Response) {
   
    const idProduto = req.idProduto;
    const listProduto = new ListProdutos();

    const vendedor = await listProduto.execute(idProduto);

    return res.json(vendedor);
  }
}

export { ListProdutoController };
