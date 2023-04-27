import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/client"

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    
    const {
        query: { booking_id }
    } = req

    if(req.method === "GET"){
        try{
            // console.log('SUCCESS')
            const booking = await prisma.bookings.findFirst({
                where: {
                    id: Number(booking_id),
                  },
            })

            if(!booking){
                res.status(500).json({"message": "Booking doesn´t exist"})
            }
            
            const reads = await prisma.meterReads.findMany({
                include:{
                    User:true
                },
                where: {
                    booking_id: Number(booking_id),
                  },
            })


            res.status(200).json(reads)
        
        }catch(e){
            console.log(e)
            res.json(e);
            res.status(405).end();

        }
    }else{
        res.status(200).json({message: 'Wrong method'})
    }
}