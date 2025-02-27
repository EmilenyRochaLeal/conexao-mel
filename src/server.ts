import express, {Response, Request, NextFunction} from 'express'
import 'express-async-errors';
import cors from 'cors';
import router from './router'
import dotenv from 'dotenv';


dotenv.config();

const app = express();

// Configuração do CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL do projeto frontend
    credentials: true
}));

// Permite o uso de json
app.use(express.json()); 

app.use(cors());

app.use(router);

// Middleware para tratamento de erros
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if (err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
});

const PORT = process.env.PORT || 3333;

app.listen(3333, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    
})