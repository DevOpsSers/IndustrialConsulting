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
        console.log("PUTAMIDER")
        console.log(req.query)
        
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });

        if(user){
            res.status(409).json('Email already registered')
        }

        try{
            

            var validation = await userSchema.validate(req.body);

            const { email, role, phone_number, name} = req.body

            await prisma.user.create({
                data: { email, role, phone_number, name}
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