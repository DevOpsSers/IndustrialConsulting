import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"
import * as yup from 'yup';

const userSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.string().oneOf(['admin', 'visitor', 'owner','stuff']),
    status: yup.string().oneOf(['active', 'pending']),
});

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    if(req.method === "POST"){
        
        const user = await prisma.users.findUnique({
            where: {
                email: req.query.email,
            },
        });

        if(user){
            res.status(409).json('Email already registered')
        }

        try{
            

            var validation = await userSchema.validate(req.query);

            const { email, role, phone_number, name, surname, status, password} = req.query

            await prisma.users.create({
                data: { email, role, phone_number, name, surname, status, password}
            })

            // const serializedData = JSON.parse(JSON.stringify(data, (key, value) => {
            //     return typeof value === 'bigint' ? value.toString() : value;
            // }));

            // res.status(200).json(serializedData)

            res.status(200).json('exito')
        
        }catch(e){
            console.log(e)
            res.json(e);
            res.status(405).end();

        }
            
        
    }else{
        res.status(200).json({message: 'Wrong method'})
    }
}