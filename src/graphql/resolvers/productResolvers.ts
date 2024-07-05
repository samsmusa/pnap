import {Context} from '../context';

export const productResolvers = {
    Query: {
        products: async (parent: any, args: any, context: Context) => {
            return context.prisma.product.findMany();
        },
        product: async (parent: any, {id}: { id: number }, context: Context) => {
            return context.prisma.product.findUnique({where: {id: Number(id)}});
        },
    },
    Mutation: {
        createProduct: async (parent: any, {title, description, published}: {
            title: string;
            description?: string;
            published?: boolean
        }, context: Context) => {
            if (!context.userId) {
                throw new Error('Not authenticated');
            }

            return context.prisma.product.create({
                data: {
                    title,
                    description,
                    published: published ?? false,
                    owner: {connect: {id: Number(context.userId)}},
                },
            });
        },
        updateProduct: async (parent: any, {id, title, description, published}: {
            id: number;
            title?: string;
            description?: string;
            published?: boolean
        }, context: Context) => {
            if (!context.userId) {
                throw new Error('Not authenticated');
            }

            return context.prisma.product.update({
                where: {id: Number(id)},
                data: {title, description, published},
            });
        },
        deleteProduct: async (parent: any, {id}: { id: number }, context: Context) => {
            if (!context.userId) {
                throw new Error('Not authenticated');
            }

            return context.prisma.product.delete({where: {id: Number(id)}});
        },
    },
    Product: {
        owner: async (parent: any, args: any, context: Context) => {
            return context.prisma.user.findUnique({where: {id: parent.ownerId}});
        },
        orderItems: async (parent: any, args: any, context: Context) => {
            return context.prisma.orderItem.findMany({where: {productId: parent.id}});
        },
    },
};
