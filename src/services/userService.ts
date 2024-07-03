import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const createUser = async (email: string, name?: string): Promise<User> => {
  return await prisma.user.create({
    data: {
      email,
      name,
    },
  });
};
