import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from './controller/user/AuthUserController';


const router = Router();

const createUserController = new CreateUserController();

// Rotas user
// router.post('/users', new CreateUserController().handle)
router.post('/signin', new AuthUserController().handle)

// Rota para testar o deploy backend
router.get("/", (req, res) => {
    res.send("Conexão Mel está funcionando!");
  });
  

router.post("/register", (req, res) => createUserController.handle(req, res));

export default  router;
