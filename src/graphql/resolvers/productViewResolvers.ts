import {Context} from '../context';

export const productViewResolvers = {
    Query: {
        productViews: async (parent: any, args: any, context: Context) => {
            return context.prisma.productView.findMany({
                include: {
                    product: true,
                },
            });
        },
        productView: async (parent: any, {id}: { id: number }, context: Context) => {
            return context.prisma.productView.findUnique({
                where: {id: Number(id)},
                include: {
                    product: true,
                },
            });
        },
    },
    Mutation: {
        createProductView: async (parent: any, {productId, count}: {
            productId: number;
            count: number
        }, context: Context) => {
            return context.prisma.productView.create({
                data: {
                    product: {connect: {id: Number(productId)}},
                    count,
                },
            });
        },
        updateProductView: async (parent: any, {id, count}: {
            id: number;
            count: number
        }, context: Context) => {
            return context.prisma.productView.update({
                where: {id: Number(id)},
                data: {count},
            });
        },
        deleteProductView: async (parent: any, {id}: { id: number }, context: Context) => {
            return context.prisma.productView.delete({
                where: {id: Number(id)},
            });
        },
    },
    ProductView: {
        product: async (parent: any, args: any, context: Context) => {
            return context.prisma.product.findUnique({where: {id: parent.productId}});
        },
    },
};
