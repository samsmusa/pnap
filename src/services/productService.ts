import {PrismaClient} from '@prisma/client';
import {Product} from "../models/Product";

const prisma = new PrismaClient();

export async function getAllProducts() {
    return prisma.product.findMany();
}

export async function getProductById(id: number) {
    return prisma.product.findUnique({where: {id}});
}

export async function createProduct(data: Omit<Product, 'id'>) {
    return prisma.product.create({
        data,
    });
}

export async function updateProduct(id: number, data: Partial<Omit<Product, 'id'>>) {
    return prisma.product.update({
        where: {id},
        data,
    });
}

export async function deleteProduct(id: number) {
    return prisma.product.delete({
        where: {id},
    });
}
