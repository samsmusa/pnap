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
        createRentItem: async (parent: any, {productId, quantity, startDate, endDate}: {
            productId: number;
            quantity: number;
            startDate: Date;
            endDate: Date
        }, context: Context) => {
            if (!context.userId) throw new Error('Unauthorized');
            const product = await context.prisma.product.findUnique({
                where: {id: Number(productId)},
            })
            if (!product) throw new Error('product not found');
            if (product.ownerId === parseInt(context.userId)) throw new Error("User" +
                " can't buy" +
                " own" +
                " product")

            return context.prisma.rentItem.create({
                data: {
                    user: {connect: {id: Number(context.userId)}},
                    product: {connect: {id: Number(productId)}},
                    quantity,
                    startDate,
                    endDate,
                },
            });
        },
        deleteRentItem: async (parent: any, {id}: { id: number }, context: Context) => {
            if (!context.userId) throw new Error('Unauthorized');
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
