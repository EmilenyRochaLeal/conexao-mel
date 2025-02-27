import { PrismaClient, UserType } from "@prisma/client";
import prismaClient from "../../prisma/indext";
import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface UserRequest {
  name: string;
  email: string;
  telefone: string;
  password: string;
  role: string;
}

// Função para validar senha segura
const isPasswordValid = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return regex.test(password);
};

// Serviço de criação de usuário
export class CreateUserService {
  async execute({
    name,
    email,
    telefone,
    password,
    role,
  }: UserRequest) {

  
    
    // VALIDAÇÕES POR EMAIL, SENHA, NOME 

    const existeEmail = await prisma.user.findUnique({ where: { email } });
    if (existeEmail) {
      throw new Error("Email já cadastrado!");
    }
    // Para Validar a senha
    if (!isPasswordValid(password)) {
      throw new Error(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial."
      );
    }

    if (name.length > 100) {
      throw new Error("O nome não pode ter mais de 100 caracteres.");
    }
    

    // Hash da senha antes de salvar
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        telefone: telefone,
        password: passwordHash,
        role: role as UserType,
      },
      select: {
        id: true,
        name: true,
        email: true, 
        telefone: true,
        createdAt: true,
      },
    });
    return user;
  }
}
