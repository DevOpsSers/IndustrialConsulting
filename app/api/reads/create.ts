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

        console.log('DIABLO123')
        console.log(req.body)

        try{
            
            
            const user = await prisma.user.findUnique({
                where: {
                    id: req.body.posted_by,
                },
            });

            const booking = await prisma.bookings.findUnique({
                where: {
                    id: Number(req.body.booking_id),
                },
            });
    
            if(!user || !booking){
                res.status(409).json('User and booking must exist')
            }
            

            const { posted_by, booking_id, value, img_url} = req.body
            
            await prisma.meterReads.create({
                data: { 
                    posted_by: posted_by, 
                    booking_id: Number(booking_id), 
                    value: Number(value), 
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