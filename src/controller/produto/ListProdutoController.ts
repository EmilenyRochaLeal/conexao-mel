import { Request, Response } from "express";
import { ListProdutos } from "../../services/produto/ListProdutos";

class ListProdutoController {
  async handle(req: Request, res: Response) {
    //const { preco, descricao, role, vendedorId, estoque } = req.body;
    const idProduto = req.idProduto;
    const listProduto = new ListProdutos();

    const seller = await listProduto.execute(idProduto);

    return res.json(seller);
  }
}

export { ListProdutoController };
