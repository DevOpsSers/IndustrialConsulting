import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"
import * as yup from 'yup';


const bookingSchema = yup.object().shape({
    visitor_id: yup.number().integer().positive().required(),
    house_id: yup.number().integer().positive().required(),
    start_date: yup.date().typeError('Start date must be a valid date').required(),
    end_date: yup.date().typeError('End date must be a valid date').required()
        .when('start_date', (start_date, schema) => {
        return schema.min(start_date, 'End date must be after start date');
    }),
});

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    if(req.method === "POST"){
        
        try{
            console.log(req.query)
            var validation = await bookingSchema.validate(req.query)
            .then(valid => console.log(valid))
            .catch(error => console.error(error.errors, error.path));
            

            const user = await prisma.users.findUnique({
                where: {
                    id: BigInt(req.body.visitor_id),
                },
            });

            const house = await prisma.houses.findUnique({
                where: {
                    id: BigInt(req.body.house_id),
                },
            });
    
            if(!user || !house){
                res.status(409).json('Owner and House must exist')
            }
            

            const { visitor_id, house_id, start_date, end_date} = req.body
            
      
            await prisma.bookings.create({
                data: { 
                    visitor_id: Number(visitor_id), 
                    house_id: Number(house_id), 
                    start_date: new Date(start_date), 
                    end_date: new Date(end_date), 
                }
            })

            res.status(200).json('Success')
        
        }catch(e){
            console.log(e)
            res.json(e);
            res.status(405).end();

        }
            
        
    }else{
        res.status(200).json({message: 'Wrong method'})
    }
}