import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    if(req.method === "GET"){
        try{
            // console.log('SUCCESS')
            const data = await prisma.houses.findMany({
                include: { User: true },
            })

            const serializedData = JSON.parse(JSON.stringify(data, (key, value) => {
                return typeof value === 'bigint' ? value.toString() : value;
            }));

            res.status(200).json(serializedData)
        
        }catch(e){
            console.log(e)
            res.json(e);
            res.status(405).end();

        }
    }else{
        res.status(200).json({message: 'Wrong method'})
    }
}