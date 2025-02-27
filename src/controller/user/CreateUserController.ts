import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response){
        const {name, email,telefone, password, role} = req.body;
        console.log('Dados recebidos:', { name, email, telefone, password, role });
        const createUserService = new CreateUserService();
        try{
            const user = await createUserService.execute({ name, email, telefone, password, role });
            console.log('Usuário criado:', user);
            return res.status(201).json({ message: "Usuário cadastrado com sucesso!", user });
        } catch(error: any){
            console.error('Erro ao criar usuário:', error.message);
            return res.status(400).json({ error: error.message });
        } 
        
    }
}
export { CreateUserController };