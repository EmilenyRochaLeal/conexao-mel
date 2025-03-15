import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from './controller/user/AuthUserController';
import { VendedorController } from "./controller/user/VendedorController";

import { isAuthenticated } from "./middleware/isAuthenticated";


const router = Router();

const createUserController = new CreateUserController();

// Rota para testar o deploy backend
router.get("/", (req, res) => {
    res.send("Conexão Mel está funcionando!");
  });

// Rotas user
router.post('/cadastro', new CreateUserController().handle)

router.post('/signin', new AuthUserController().handle)

// Rotas do produtor 
router.get('/me', isAuthenticated , new VendedorController().handle)

export default  router;
