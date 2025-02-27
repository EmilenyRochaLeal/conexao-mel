import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";


const router = Router();

const createUserController = new CreateUserController();

// Rotas user
// router.post('/users', new CreateUserController().handle)

// Rota para testar o deploy backend
router.get("/", (req, res) => {
    res.send("Conexão Mel está funcionando!");
  });
  

router.post("/cadastro", (req, res) => createUserController.handle(req, res));

export default  router;
