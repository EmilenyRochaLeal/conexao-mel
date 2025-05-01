import express, {Response, Request, NextFunction} from 'express'
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json"
import router from './router';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import path from 'path';


dotenv.config();

const app = express();

app.use(express.json()); 

// app.use(cors({
//     origin: process.env.FRONTEND_URL || 'http://localhost:3000',
//     credentials: true
 
// }));

app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://conexao-mel-front.vercel.app',
        'http://localhost:3000'
      ];
  
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));
  
app.use(fileUpload({
    limits: {fileSize: 50 * 1024 * 1024}
}));
app.use(
    '/files', 
    express.static(path.resolve(__dirname, '..', 'tmp'))
)
app.use(router);

// Configuração do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
    
})