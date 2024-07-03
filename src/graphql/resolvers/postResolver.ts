import { Context } from '../context';

export default {
  Query: {
    posts: async (_parent: any, _args: any, context: Context) => {
      return context.prisma.post.findMany();
    },
    post: async (_parent: any, args: { id: string }, context: Context) => {
      return context.prisma.post.findUnique({ where: { id: Number(args.id) } });
    },
  },
  Mutation: {
    createPost: async (_parent: any, args: { title: string, content: string, authorId: string }, context: Context) => {
      return context.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          authorId: Number(args.authorId),
          published: false,
        },
      });
    },
  },
  Post: {
    author: async (parent: any, _args: any, context: Context) => {
      return context.prisma.post.findUnique({ where: { id: parent.id } }).author();
    },
  },
};
