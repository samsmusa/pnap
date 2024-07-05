import {PrismaClient} from '@prisma/client';
import {Request} from 'express';
import {getUserId} from '../utils/auth';

const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient;
    userId: string | null;
}

export const context = ({req}: { req: Request }): Context => {
    const userId = getUserId(req);
    return {
        prisma,
        userId,
    };
};
