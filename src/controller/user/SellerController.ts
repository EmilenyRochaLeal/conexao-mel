import { Request, Response } from "express";
import { SellerService } from "../../services/user/SellerService";

class SellerController{
    async handle(req: Request, res: Response){
       const sellerService = new SellerService();

       const seller =  await sellerService.execute();

       return res.json(seller);
    }
}

export {SellerController};