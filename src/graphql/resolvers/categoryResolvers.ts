import { Context } from '../context';

export const categoryResolvers = {
  Query: {
    categories: async (parent: any, args: any, context: Context) => {
      return context.prisma.category.findMany();
    },
    category: async (parent: any, { id }: { id: number }, context: Context) => {
      return context.prisma.category.findUnique({
        where: { id: Number(id) },
        include: {
          products: true,
        },
      });
    },
  },
  Mutation: {
    createCategory: async (parent: any, { name }: { name: string }, context: Context) => {
      return context.prisma.category.create({
        data: { name },
      });
    },
    updateCategory: async (parent: any, { id, name }: { id: number; name: string }, context: Context) => {
      return context.prisma.category.update({
        where: { id: Number(id) },
        data: { name },
      });
    },
    deleteCategory: async (parent: any, { id }: { id: number }, context: Context) => {
      return context.prisma.category.delete({
        where: { id: Number(id) },
      });
    },
  },
  Category: {
    products: async (parent: any, args: any, context: Context) => {
      return context.prisma.product.findMany({
        where: {
          categories: {
            some: {
              categoryId: parent.id,
            },
          },
        },
      });
    },
  },
};
