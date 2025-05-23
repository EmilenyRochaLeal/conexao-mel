import { Request, Response } from "express";
import { ListMeusProdutosService } from "../../services/user/ListMeusProdutosService";

class ListMeusProdutosController{
    async handle(req: Request, res: Response){
       const user_id = req.user_id;
    
        const service = new ListMeusProdutosService();
        const produtos = await service.execute(user_id);
    
        return res.json(produtos);
      }
    }
       

export { ListMeusProdutosController };