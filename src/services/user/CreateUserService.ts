import { PrismaClient } from "@prisma/client";
import prismaClient from "../../prisma/indext";
import { hash } from "bcryptjs";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

// Função para validar senha segura
const isPasswordValid = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// Serviço de criação de usuário
export class CreateUserService {
  async execute({
    name,
    email,
    password,
    role,
  }: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) {
    //Verificação se o e-mailjá está cadastrado
    const existeEmail = await prisma.user.findUnique({ where: { email } });
    if (!existeEmail) {
      throw new Error("Email já cadastrado!");
    }

    const userExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExists) {
      throw new Error("Usuário já existe");
    }

    // Para Validar a senha
    if (!isPasswordValid(password)) {
      throw new Error(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, um número e um caractere especial."
      );
    }

    // Hash da senha antes de salvar
    const passwordHash = await bcrypt.hash(password, 10);

    // const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        role: "VENDEDOR",
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}

