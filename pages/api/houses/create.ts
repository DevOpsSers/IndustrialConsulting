import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client"
import * as yup from 'yup';

const houseSchema = yup.object().shape({
    owned_by: yup.string().required(),
    address_line_1: yup.string().required(),
    address_line_2: yup.string().required(),
    image_url: yup.string().required(),
    house_name: yup.string().nullable(),
    kw_h_cost: yup.number().required().positive().integer()
});

export default async function Handler( req: NextApiRequest, res: NextApiResponse ){
    if(req.method === "POST"){

        req.body.kw_h_cost = Number(req.body.kw_h_cost)

        try{
            
            var validation = await houseSchema.validate(req.body);

            const user = await prisma.user.findUnique({
                where: {
                    id: req.body.owned_by,
                },
            });

            if(!user){
                res.status(409).json('Owner doesn´t exist')
            }
            

            const { owned_by, address_line_1, address_line_2, image_url, house_name, kw_h_cost} = req.body
            
            const parsedKwHCost = Number(kw_h_cost);
            
            await prisma.houses.create({
                data: { 
                    owned_by: owned_by, 
                    address_line_1: address_line_1, 
                    address_line_2: address_line_2, 
                    image_url: image_url, 
                    house_name: house_name, 
                    kw_h_cost: parsedKwHCost
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