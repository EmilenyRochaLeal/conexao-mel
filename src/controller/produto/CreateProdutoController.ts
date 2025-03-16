import { Request, Response } from  "express";
import { CreateProdutoService } from "../../services/produto/CreateProdutoService";
// import { UploadedFile } from "express-fileupload";

class CreateProdutoController {
    async handle(req: Request, res: Response){
        const {preco, descricao, role ,vendedorId, estoque} = req.body;

        const createProdutoService = new CreateProdutoService;

        if (!req.file){
            throw new Error("error ao enviar imagem");
        }else{

            const {originalname, filename: imagemName } = req.file;

            

            const produto = await createProdutoService.execute({
                preco, 
                descricao, 
                imagemName,
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