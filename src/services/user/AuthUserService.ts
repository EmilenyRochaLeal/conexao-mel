import prismaClient from "../../prisma/indext";
import { compare } from "bcryptjs";

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
            throw new Error("Email ou Senha incorreto");
        }


        console.log(email);
    return {auth: true}
    }
}
export {AuthUserService};