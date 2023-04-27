import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    
    console.log("AYAYAY")
    console.log(req.query.start)
    console.log(req.query.end)
    
    if(req.method === "GET"){
        var data

        if(req.query.start && req.query.end){
            

            var start = new Date(req.query.start)
            var end = new Date(req.query.end)

            data = await prisma.$queryRaw`
            SELECT 
                    h.id as house_id,
                    h.house_name,
                    h.address_line_1,
                    h.address_line_2,
                    h.image_url,
                    u.id as owner_id,
                    u.name as owner_name,
                    COALESCE(
                    (
                        SELECT 'false' FROM "Bookings" b
                        WHERE b.house_id = h.id AND (
                        (b.start_date <= ${start} AND b.end_date >= ${start}) OR 
                        (b.start_date <= ${end} AND b.end_date >= ${end}) OR 
                        (b.start_date >= ${start} AND b.end_date <= ${end})
                        )
                        LIMIT 1
                    ),
                    'true'
                    ) AS available
                FROM "Houses" h
                JOIN "User" u ON u.id = h.owned_by
                `;
                // SELECT 
                //     h.*,
                //     u.*,
                //     COALESCE(
                //     (
                //         SELECT 'false' FROM "Bookings" b
                //         WHERE b.house_id = h.id AND (
                //         (b.start_date <= ${start} AND b.end_date >= ${start}) OR 
                //         (b.start_date <= ${end} AND b.end_date >= ${end}) OR 
                //         (b.start_date >= ${start} AND b.end_date <= ${end})
                //         )
                //         LIMIT 1
                //     ),
                //     'true'
                //     ) AS available
                // FROM "Houses" h
                // JOIN "User" u ON u.id = h.owned_by
                // `
            console.log(data)
            res.status(200).json(data)

        }else{

            try{
                // console.log('SUCCESS')
                data = await prisma.houses.findMany({
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
        }
    }else{
        res.status(200).json({message: 'Wrong method'})
    }
}