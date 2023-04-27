import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"
import * as yup from 'yup';

const houseSchema = yup.object().shape({
    owned_by: yup.number().required().positive().integer(),
    address_line_1: yup.string().required(),
    address_line_2: yup.string().required(),
    image_url: yup.string().url().nullable(),
    house_name: yup.string().nullable(),
    kw_h_cost: yup.number().required().positive().integer()
});

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    
    const {
        query: { id }
    } = req
    
    if(req.method === "GET"){

        try{
            console.log('SUCCESS')
            const data = await prisma.meterReads.findUnique({
                include: { User: true, Bookings:true },
                where: {
                  id: parseInt(id),
                },
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
    // else if(req.method === "POST"){

    //     try{

    //         var validation = await houseSchema.validate(req.query);
    //         console.log('SUCCESS')
    //         const data = await prisma.houses.update({
    //             where: {
    //                 id: parseInt(id),
    //             },
    //             data: { 
    //                 owned_by: Number(req.query.owned_by),
    //                 address_line_1: req.query.address_line_1,
    //                 address_line_2: req.query.address_line_2,
    //                 image_url: req.query.image_url,
    //                 house_name: req.query.house_name,
    //                 kw_h_cost: Number(req.query.kw_h_cost),
    //             }
    //         })

    //         const serializedData = JSON.parse(JSON.stringify(data, (key, value) => {
    //             return typeof value === 'bigint' ? value.toString() : value;
    //         }));

    //         res.status(200).json(serializedData)
        
    //     }catch(e){
    //         console.log(e)
    //         res.json(e);
    //         res.status(405).end();

    //     }

    // }else if(req.method === "DELETE"){
        
    //     try{
    //         console.log('SUCCESS')
    //         const data = await prisma.houses.delete({
    //             where: {
    //                 id: parseInt(id),
    //             },
    //         })

            
    //         res.status(200).json(`House ${id} succesfully deleted`)
        
    //     }catch(e){
    //         console.log(e)
    //         res.json(e);
    //         res.status(405).end();

    //     }

    // }
}