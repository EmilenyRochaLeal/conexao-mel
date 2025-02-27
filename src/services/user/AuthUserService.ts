import prismaClient from "../../prisma/indext";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string,
    password: string
}

class AuthUserService{
    async execute({email, password}:AuthRequest){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if (!user){
            throw new Error("Email ou Senha incorreto");
        }
        const passwordCompare = await compare(password, user.password);

        if (passwordCompare == false){
            throw new Error("Senha incorreto");
        }

        const token = sign(
            {
                name: user.name, 
                email: user.email
            }, 
             process.env.JWT_SECRET as string,
            {
                subject: user.id.toString(),
                expiresIn: '30d'
             }
    )

        
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
    }
    }
}
export {AuthUserService};