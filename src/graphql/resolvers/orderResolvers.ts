import {Context} from '../context';

export const orderResolvers = {
    Query: {
        orderItems: async (parent: any, args: any, context: Context) => {
            return context.prisma.orderItem.findMany();
        },
        orderItem: async (parent: any, {id}: { id: number }, context: Context) => {
            return context.prisma.orderItem.findUnique({where: {id: Number(id)}});
        },
    },
    Mutation: {

        createOrderItem: async (parent: any, {productId, quantity}: {
            productId: number;
            quantity: number
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
            return context.prisma.orderItem.create({
                data: {
                    user: {connect: {id: Number(context.userId)}},
                    product: {connect: {id: Number(productId)}},
                    quantity,
                },
            });
        },
        deleteOrderItem: async (parent: any, {id}: { id: number }, context: Context) => {
            if (!context.userId) throw new Error('Unauthorized');
            return context.prisma.orderItem.delete({where: {id: Number(id)}});
        },
    },
    OrderItem: {
        product: async (parent: any, args: any, context: Context) => {
            return context.prisma.product.findUnique({where: {id: parent.productId}});
        },
        user: async (parent: any, args: any, context: Context) => {
            return context.prisma.user.findUnique({where: {id: parent.userId}});
        },
    },
};
