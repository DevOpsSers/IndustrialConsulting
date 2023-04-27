import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client"

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    
    const {
        query: { id }
    } = req
    
    if(req.method === "GET"){
        try{
            const data = await prisma.bookings.findMany({
                include: { User: true, Houses: true },
                where: {house_id: parseInt(id)}
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