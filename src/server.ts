import express, {Response, Request, NextFunction} from 'express'
import 'express-async-errors';
import cors from 'cors';
import router from './router'
import dotenv from 'dotenv';
// import fileUpload from 'express-fileupload';
import path from 'path';


dotenv.config();

const app = express();

app.use(express.json()); 

app.use(cors());
// app.use(fileUpload({
//     limits: {fileSize: 50 * 1024 * 1024}
// }));
app.use(
    '/files', 
    express.static(path.resolve(__dirname, '..', 'tmp'))
)
app.use(router);

// Configuração do CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL do projeto frontend
    credentials: true
}));







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