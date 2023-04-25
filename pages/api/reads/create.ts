import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"
import * as yup from 'yup';

const readSchema = yup.object().shape({
    posted_by: yup.number().required().positive().integer(),
    booking_id: yup.number().required().positive().integer(),
    value: yup.number().required().positive().integer(),
    img_url: yup.string().required(),
});

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    if(req.method === "POST"){
        console.log('DIABLO')
        console.log(req.query.posted_by)
        try{
            
            let parsed_posted_by = Number(req.query.posted_by)
            let parsed_booking_id = Number(req.query.booking_id)

            var validation = await readSchema.validate(req.query);

            const user = await prisma.users.findUnique({
                where: {
                    id: parsed_posted_by,
                },
            });

            const booking = await prisma.bookings.findUnique({
                where: {
                    id: parsed_booking_id,
                },
            });
    
            if(!user || !booking){
                res.status(409).json('User and booking must exist')
            }
            

            const { posted_by, booking_id, value, img_url} = req.query
            
            await prisma.meterReads.create({
                data: { 
                    posted_by: parsed_posted_by, 
                    booking_id: parsed_booking_id, 
                    value: BigInt(value), 
                    img_url: img_url, 
                }
            })

            res.status(200).json('Success')
        
        }catch(e){
            console.log(e)
            res.json(e);
            res.status(405).end();

        }
            
        
    }else{
        res.status(500).json({message: 'Wrong method'})
    }
}