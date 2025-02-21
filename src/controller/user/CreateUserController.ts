import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response){
        const {name, email, password, role} = req.body;

        const createUserService = new CreateUserService();
        try{
            const user = await createUserService.execute({ name, email, password, role });
            return res.status(201).json({ message: "Usuário cadastrado com sucesso!", user });
        } catch(error: any){
            return res.status(400).json({ error: error.message });
        } 
        
    }
}
export { CreateUserController };