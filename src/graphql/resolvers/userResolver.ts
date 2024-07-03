import { Context } from '../context';

export default {
  Query: {
    users: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.user.findMany();
    },
    user: async (_parent: any, args: { id: string }, context: Context) => {
      return context.prisma.user.findUnique({ where: { id: Number(args.id) } });
    },
  },
  Mutation: {
    createUser: async (_parent: any, args: { email: string, name: string }, context: Context) => {
      return context.prisma.user.create({
        data: {
          email: args.email,
          name: args.name,
        },
      });
    },
  },
  User: {
    posts: async (parent: any, _args: any, context: Context) => {
      return context.prisma.user.findUnique({ where: { id: parent.id } }).posts();
    },
  },
};
