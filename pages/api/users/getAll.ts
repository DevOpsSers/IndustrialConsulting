import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/client";


type Data = {
    name: String
}

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    if(req.method === "GET"){
        try{
            
            const data = await prisma.users.findMany()

            res.status(200).json(data)
        
        }catch(e){


        }
    }
}