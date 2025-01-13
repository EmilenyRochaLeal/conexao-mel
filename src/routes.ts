import {Router, Request, Response} from 'express'

const router = Router();


router.get('/teste', (req: Request, res: Response) => {
    // throw new Error('Erro ao fazer requisição')
    //return res.json({ Nome: 'Emileny' }); 
    return res.json({ Nome: 'teste alcilene' });
});

export { router };
