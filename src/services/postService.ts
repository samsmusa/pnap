import { PrismaClient, Post } from '@prisma/client';

const prisma = new PrismaClient();

export const getPosts = async (): Promise<Post[]> => {
  return await prisma.post.findMany();
};

export const getPostById = async (id: number): Promise<Post | null> => {
  return await prisma.post.findUnique({ where: { id } });
};

export const createPost = async (title: string, content: string, authorId: number): Promise<Post> => {
  return await prisma.post.create({
    data: {
      title,
      content,
      authorId,
      published: false,
    },
  });
};
