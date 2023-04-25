import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    if(req.method === "GET"){
        try{
            let data;

            if(req.query.section=="upcoming"){

                data = await prisma.bookings.findMany({
                    include: { User: true, Houses: true },
                    where: { start_date: { gt: new Date() } },
                });

            }else if(req.query.section=="passed"){

                data = await prisma.bookings.findMany({
                    include: { User: true, Houses: true },
                    where: { end_date: { lt: new Date() } },
                });

            }else if(req.query.section=="current"){

                data = await prisma.bookings.findMany({
                    include: { User: true, Houses: true },
                    where: {
                        start_date: { lte: new Date() },
                        end_date: { gte: new Date() }
                    },
                });

            }else{

                data = await prisma.bookings.findMany({
                    include: { User: true, Houses:true },
                })

            }

            

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