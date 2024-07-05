import {PrismaClient} from '@prisma/client';
import {User} from "../models/User";

const prisma = new PrismaClient();

export async function getAllUsers() {
    return prisma.user.findMany();
}

export async function getUserById(id: number) {
    return prisma.user.findUnique({where: {id}});
}

export async function createUser(data: Omit<User, 'id'>) {
    return prisma.user.create({
        data,
    });
}

export async function updateUser(id: number, data: Partial<Omit<User, 'id'>>) {
    return prisma.user.update({
        where: {id},
        data,
    });
}

export async function deleteUser(id: number) {
    return prisma.user.delete({
        where: {id},
    });
}

