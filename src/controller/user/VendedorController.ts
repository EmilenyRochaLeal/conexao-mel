import { Request, Response } from "express";
import { VendedorService } from "../../services/user/VendedorService";

class VendedorController{
    async handle(req: Request, res: Response){
       const user_id = req.user_id;
       console.log("Id do user", user_id);

       const vendedorService = new VendedorService();

       const seller =  await vendedorService.execute(user_id);

       return res.json(seller);
    }
}

export {VendedorController};