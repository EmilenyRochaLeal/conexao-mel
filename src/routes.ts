import { Router } from 'express';
import { CreateUserController } from './controller/user/CreateUserController';
import { AuthUserController } from './controller/user/AuthUserController';

const router = Router();

// Rotas user
router.post('/users', new CreateUserController().handle)
router.post('/signin', new AuthUserController().handle)

// Rota para testar o deploy backend 
router.get('/', (req, res) => {
    res.send('Deploy Backend feito com sucesso. ');
});

export { router };
