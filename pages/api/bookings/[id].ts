import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"
import * as yup from 'yup';

const userSchema = yup.object().shape({
    name: yup.string().required(),
    role: yup.string().oneOf(['admin', 'visitor', 'owner','stuff']),
    status: yup.string().oneOf(['active', 'pending']),
});

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    
    const {
        query: { id }
    } = req
    
    if(req.method === "GET"){

        try{
            console.log('SUCCESS')
            const data = await prisma.bookings.findUnique({
                include: { User: true, Houses: true }, 
                where: {
                  id: Number(id),
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

    }else if(req.method === "POST"){

        try{

            var validation = await userSchema.validate(req.query);
            console.log('SUCCESS')
            const data = await prisma.users.update({
                where: {
                    id: parseInt(id),
                },
                data: { 
                    phone_number: req.query.phone_number, 
                    role: req.query.role,
                    name: req.query.name, 
                    surname: req.query.surname, 
                    status: req.query.status,
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

    }else if(req.method === "DELETE"){
        
        try{
            console.log('SUCCESS')
            const data = await prisma.users.delete({
                where: {
                    id: parseInt(id),
                },
            })

            
            res.status(200).json(`User ${id} succesfully deleted`)
        
        }catch(e){
            console.log(e)
            res.json(e);
            res.status(405).end();

        }

    }
}