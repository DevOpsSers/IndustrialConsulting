import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    if(req.method === "GET"){
        try{
            console.log('SUCCESS')
            const data = await prisma.users.findMany({
                select: {
                    id: true,
                    email: true,
                    role: true,
                    phone_number: true,
                    name: true,
                    surname: true,
                    status:true,
                    created_at:true,
                }
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