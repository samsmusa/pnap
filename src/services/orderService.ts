import {OrderItem} from "../models/Order";
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllOrderItems() {
    return prisma.orderItem.findMany();
}

export async function getOrderItemById(id: number) {
    return prisma.orderItem.findUnique({where: {id}});
}

export async function createOrderItem(data: Omit<OrderItem, 'id'>) {
    return prisma.orderItem.create({
        data,
    });
}

export async function deleteOrderItem(id: number) {
    return prisma.orderItem.delete({
        where: {id},
    });
}
