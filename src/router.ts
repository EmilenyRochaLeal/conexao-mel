import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from './controller/user/AuthUserController';
import { VendedorController } from "./controller/user/VendedorController";
import { CreateProdutoController } from "./controller/produto/CreateProdutoController";
import { ListProdutoController } from "./controller/produto/ListProdutoController";
import { DeleteProdutoController } from "./controller/produto/DeleteProdutoController";

import { isAuthenticated } from "./middleware/isAuthenticated";

import uploadConfig from './config/multer';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

const createUserController = new CreateUserController();

// Rota para testar o deploy backend
router.get("/", (req, res) => {
    res.send("Conexão Mel está funcionando!");
  });

// Rotas user
router.post('/cadastro', new CreateUserController().handle)

router.post('/signin', new AuthUserController().handle)

// Rotas do vendedor 
router.get('/me', isAuthenticated , new VendedorController().handle)


// Rotas de produto
router.post('/produto', isAuthenticated , upload.single('imagemName'),  new CreateProdutoController().handle)
router.get('/listagem',  new ListProdutoController().handle)
router.delete('/produto',  isAuthenticated, new DeleteProdutoController().handle)

export default  router;
