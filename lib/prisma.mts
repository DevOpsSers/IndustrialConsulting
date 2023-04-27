import { PrismaClient, Home } from '@prisma/client'

const prisma = new PrismaClient()

async function getHomesByHomeowner(homeownerId: number): Promise<Home[]> {
  const homes = await prisma.home.findMany({
    where: {
      homeownerId,
    },
  })
  return homes
}
