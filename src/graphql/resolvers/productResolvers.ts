import { Context } from '../context';

export const productResolvers = {
  Query: {
    products: async (parent: any, args: any, context: Context) => {
      return context.prisma.product.findMany({
        include: {
          owner: true,
          categories: {
            include: {
              category: true,
            },
          },
          orderItems: true,
          rentItems: true,
          productViews: true,
        },
      });
    },
    product: async (parent: any, { id }: { id: number }, context: Context) => {
      return context.prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
          owner: true,
          categories: {
            include: {
              category: true,
            },
          },
          orderItems: true,
          rentItems: true,
          productViews: true,
        },
      });
    },
  },
  Mutation: {
    createProduct: async (parent: any, { title, description, published, price, rent, categoryIds }: { title: string; description?: string; published?: Date; price: number; rent: number; categoryIds: number[] }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      return context.prisma.product.create({
        data: {
          title,
          description,
          published: published || new Date(),
          price,
          rent,
          owner: { connect: { id: Number(context.userId) } },
          categories: {
            create: categoryIds.map((categoryId) => ({
              category: { connect: { id: Number(categoryId) } },
            })),
          },
        },
      });
    },
    updateProduct: async (parent: any, { id, title, description, published, price, rent, categoryIds }: { id: number; title?: string; description?: string; published?: Date; price?: number; rent?: number; categoryIds?: number[] }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      return context.prisma.product.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          published,
          price,
          rent,
          categories: categoryIds
            ? {
                deleteMany: {},
                create: categoryIds.map((categoryId) => ({
                  category: { connect: { id: categoryId } },
                })),
              }
            : undefined,
        },
      });
    },
    deleteProduct: async (parent: any, { id }: { id: number }, context: Context) => {
      if (!context.userId) {
        throw new Error('Not authenticated');
      }

      return context.prisma.product.delete({
        where: { id: Number(id) },
      });
    },
  },
  Product: {
    owner: async (parent: any, args: any, context: Context) => {
      return context.prisma.user.findUnique({ where: { id: parent.ownerId } });
    },
    categories: async (parent: any, args: any, context: Context) => {
      return context.prisma.category.findMany({
        where: {
          products: {
            some: {
              productId: parent.id,
            },
          },
        },
      });
    },
    orderItems: async (parent: any, args: any, context: Context) => {
      return context.prisma.orderItem.findMany({ where: { productId: parent.id } });
    },
    rentItems: async (parent: any, args: any, context: Context) => {
      return context.prisma.rentItem.findMany({ where: { productId: parent.id } });
    },
    productViews: async (parent: any, args: any, context: Context) => {
      return context.prisma.productView.findMany({ where: { productId: parent.id } });
    },
  },
};
