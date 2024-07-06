import {Context} from '../context';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const APP_SECRET = 'your-secret-key'; // Use a secure key in production

export const userResolvers = {
    Query: {
        users: async (parent: any, args: any, context: Context) => {
            return context.prisma.user.findMany();
        },
        user: async (parent: any, {id}: { id: number }, context: Context) => {
            return context.prisma.user.findUnique({where: {id: Number(id)}});
        },
        userOrders: async (parent: any, {}: {}, context: Context) => {
            return context.prisma.orderItem.findMany({
                where: {userId: Number(context.userId)},
                include: {
                    product: true,
                },
            });
        },
        userRents: async (parent: any, {}: {}, context: Context) => {
            return context.prisma.rentItem.findMany({
                where: {userId: Number(context.userId)},
                include: {
                    product: true,
                },
            });
        },
        userProducts: async (parent: any, {}: {}, context: Context) => {
            return context.prisma.product.findMany({
                where: {ownerId: Number(context.userId)},
                include: {
                    categories: true,
                },
            });
        },
    },
    Mutation: {
        createUser: async (parent: any, {email, name, password}: {
            email: string;
            name?: string;
            password: string
        }, context: Context) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            return context.prisma.user.create({
                data: {email, name, password: hashedPassword},
            });
        },
        updateUser: async (parent: any, {id, email, name, password}: {
            id: number;
            email?: string;
            name?: string;
            password?: string
        }, context: Context) => {
            const updatedData: any = {email, name};
            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }
            return context.prisma.user.update({
                where: {id: Number(id)},
                data: updatedData,
            });
        },
        deleteUser: async (parent: any, {id}: { id: number }, context: Context) => {
            return context.prisma.user.delete({where: {id: Number(id)}});
        },
        login: async (parent: any, {email, password}: {
            email: string;
            password: string
        }, context: Context) => {
            const user = await context.prisma.user.findUnique({where: {email}});
            if (!user) {
                throw new Error('No user found with that email');
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({userId: user.id}, APP_SECRET);

            return {
                token,
                user,
            };
        },
    },
    User: {
        products: async (parent: any, args: any, context: Context) => {
            return context.prisma.product.findMany({where: {ownerId: parent.id}});
        },
        orders: async (parent: any, args: any, context: Context) => {
            return context.prisma.orderItem.findMany({where: {userId: parent.id}});
        },
    },
};
