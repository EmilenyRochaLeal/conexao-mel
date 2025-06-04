import { Request, Response } from 'express';
import { PutProdutoService } from '../../services/produto/PutProdutoService';

class PutProdutoController {
    async handle(req: Request, res: Response){
        const { id } = req.params  as { id: string };
        const { descricao, preco, imagemName, role } = req.body;

        const putProdutoService = new PutProdutoService();

        const produtoAtualizado = await putProdutoService.execute({ id: String(id), descricao, preco, imagemName, role })

        if (!produtoAtualizado) {
          return res.status(404).json({ message: 'Produto não encontrado' });
      }

      return res.status(200).json({
        message: 'Produto atualizado com sucesso',
        produto: produtoAtualizado,
    });
    }
}
export {PutProdutoController}