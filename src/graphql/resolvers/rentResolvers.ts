import {Context} from '../context';

export const rentResolvers = {
    Query: {
        rentItems: async (parent: any, args: any, context: Context) => {
            return context.prisma.rentItem.findMany({
                include: {
                    product: true,
                    user: true,
                },
            });
        },
        rentItem: async (parent: any, {id}: { id: number }, context: Context) => {
            return context.prisma.rentItem.findUnique({
                where: {id: Number(id)},
                include: {
                    product: true,
                    user: true,
                },
            });
        },
    },
    Mutation: {
        createRentItem: async (parent: any, {userId, productId, quantity, startDate, endDate}: {
            userId: number;
            productId: number;
            quantity: number;
            startDate: Date;
            endDate: Date
        }, context: Context) => {
            return context.prisma.rentItem.create({
                data: {
                    user: {connect: {id: Number(userId)}},
                    product: {connect: {id: Number(productId)}},
                    quantity,
                    startDate,
                    endDate,
                },
            });
        },
        deleteRentItem: async (parent: any, {id}: { id: number }, context: Context) => {
            return context.prisma.rentItem.delete({
                where: {id: Number(id)},
            });
        },
    },
    RentItem: {
        product: async (parent: any, args: any, context: Context) => {
            return context.prisma.product.findUnique({where: {id: parent.productId}});
        },
        user: async (parent: any, args: any, context: Context) => {
            return context.prisma.user.findUnique({where: {id: parent.userId}});
        },
    },
};
