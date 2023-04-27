import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    
    const session = await getServerSession(req,res, authOptions)
    
    if(!session){
        res.status(401).json({message: 'Not allowed'})
    }
    
    if(req.method === "GET"){
        try{
            
            let user_data = await prisma.user.findFirst({
                where:{
                    email: session?.user?.email
                },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    phone_number: true,
                    name: true,
                    image: true,
                },
            })
            
            let booking = await prisma.bookings.findFirst({
                where:{ 
                    visitor_id: user_data?.id,
                    start_date: { lte: new Date() },
                    end_date: { gte: new Date() }
                },
                include:{
                    Houses: true
                }
                
            })

            if(!booking){
                res.status(404).json({message: 'Booking Not Found'})
            }

            res.status(200).json(booking)
        
        }catch(e){
            console.log(e)
            res.json(e);
            res.status(405).end();

        }
    }else{
        res.status(200).json({message: 'Wrong method'})
    }
}