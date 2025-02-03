import { Router } from 'express';
import { CreateUserController } from './controller/user/CreateUserController';

const router = Router();

// Rotas user
router.post('/users', new CreateUserController().handle)

// Rota para testar o deploy backend 
router.get('/', (req, res) => {
    res.send('Deploy Backend feito com sucesso. ');
});

export { router };
