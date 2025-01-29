import { Router } from 'express';
import { CreateUserController } from './controller/user/CreateUserController';

const router = Router();

// Rotas user
router.post('/users', new CreateUserController().handle)


export { router };
