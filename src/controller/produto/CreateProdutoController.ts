import { Request, Response } from  "express";
import { CreateProdutoService } from "../../services/produto/CreateProdutoService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { resolve } from "path";
import { rejects } from "assert";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProdutoController {
    async handle(req: Request, res: Response){
        const {preco, descricao, role ,vendedorId, estoque} = req.body;

        const createProdutoService = new CreateProdutoService;

        if (!req.files || Object.keys(req.files).length === 0){
            throw new Error("error ao enviar imagem");
        }else{

            const file: UploadedFile = req.files['imagemName']

            const resultFile:UploadApiResponse = await new Promise((resolve, reject ) =>{
                cloudinary.uploader.upload_stream({}, function (error, result){
                    if (error){
                        reject(error);
                        return;
                    }

                    resolve(result)
                }).end(file.data)

            })

            const produto = await createProdutoService.execute({
                preco, 
                descricao, 
                imagemName: resultFile.url,
                role ,
                vendedorId,
                estoque
            });
            return res.json(produto);
        }

        

    }
}
export { CreateProdutoController };



// class CreateProdutoController {
//     async handle(req: Request, res: Response){
//         const {preco, descricao, role ,vendedorId, estoque} = req.body;

//         const createProdutoService = new CreateProdutoService;

//         if (!req.files || Object.keys(req.files).length === 0){
//             throw new Error("error ao enviar imagem")
//         }else{
            
//             const file = req.files['file']
//             console.log(file);
//             return res.json({});

//             // const produto = await createProdutoService.execute({
//             //     preco, 
//             //     descricao, 
//             //     ImagemName, 
//             //     role ,
//             //     vendedorId,
//             //     estoque
//             // });
//             // return res.json(produto);
//         }

        

//     }
// }
// export { CreateProdutoController };