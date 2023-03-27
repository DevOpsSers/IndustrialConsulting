// pages/api/homes.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Create a new home
    const { name, email, password, energyTariff } = req.body;

    const home = await prisma.home.create({
      data: {
        name,
        email,
        password,
        energyTariff,
      },
    });

    res.json(home);
  } else if (req.method === 'GET') {
    // Get all homes
    const homes = await prisma.home.findMany();

    res.json(homes);
  }
}
