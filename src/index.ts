import { createApolloServer } from './app';
import { PrismaClient } from '@prisma/client';
import logger from './utils/logger';

const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');

    const app = await createApolloServer();

    app.listen(PORT, () => {
      logger.info(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
