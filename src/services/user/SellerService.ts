import prismaClient from "../../prisma/indext";

class SellerService{
    async execute(){
        return {ok: true};
    }
}

export {SellerService}