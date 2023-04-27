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
        console.log("GET RUNNING")
        try{
            console.log('SUCCESS')
            const data = await prisma.user.findUnique({
                where: {
                  id: id,
                },
              })

            // const serializedData = JSON.parse(JSON.stringify(data, (key, value) => {
            //     return typeof value === 'bigint' ? value.toString() : value;
            // }));

            res.status(200).json(data)
        
        }catch(e){
            console.log(e)
            res.json(e);
            res.status(405).end();

        }

    }else if(req.method === "POST"){

        try{
            console.log(req.body)
            var validation = await userSchema.validate(req.body);
            const data = await prisma.user.update({
                where: {
                    id: (id),
                },
                data: { 
                    phone_number: req.body.phone_number, 
                    role: req.body.role,
                    name: req.body.name, 
                }
            })


            res.status(200).json(data)
        
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