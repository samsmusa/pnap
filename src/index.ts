// import { createApolloServer } from './app';
// import { PrismaClient } from '@prisma/client';
// import logger from './utils/logger';
//
// const prisma = new PrismaClient();
//
// const PORT = process.env.PORT || 4000;
//
// const startServer = async () => {
//   try {
//     await prisma.$connect();
//     logger.info('Database connected successfully');
//
//     const app = await createApolloServer();
//
//     app.listen(PORT, () => {
//       logger.info(`Server is running at http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     logger.error('Error starting the server:', error);
//     process.exit(1);
//   }
// };
//
// startServer();
import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import {mergeTypeDefs, mergeResolvers} from '@graphql-tools/merge';
import {makeExecutableSchema} from '@graphql-tools/schema';
import {isAuthenticated} from './utils/auth';
import {context} from './graphql/context';
import {gql} from 'apollo-server-express';

// Importing individual schemas
import {productSchema} from './graphql/schemas/productSchema';
import {userSchema} from './graphql/schemas/userSchema';
import {orderSchema} from './graphql/schemas/orderSchema';

// Importing resolvers
import {productResolvers} from './graphql/resolvers/productResolvers';
import {userResolvers} from './graphql/resolvers/userResolvers';
import {orderResolvers} from './graphql/resolvers/orderResolvers';

// Importing routes
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';

// Root query and mutation
const rootTypeDefs = gql`
  type Query
  type Mutation
`;

// Merging schemas and resolvers
// const typeDefs = mergeTypeDefs([rootTypeDefs, productSchema, userSchema, orderSchema]);
// const resolvers = mergeResolvers([productResolvers, userResolvers, orderResolvers]);
//
// const schema = makeExecutableSchema({typeDefs, resolvers});
//
// const app = express();
//
// app.use(express.json());
// app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/order-items', orderRoutes);
//
// const server = new ApolloServer({schema, context});
//
// server.start().then(() => {
//     server.applyMiddleware({app});
//
//     app.listen({port: 4000}, () => {
//         console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
//     });
// });

// Merging schemas and resolvers
const typeDefs = mergeTypeDefs([rootTypeDefs, productSchema, userSchema, orderSchema]);
const resolvers = mergeResolvers([productResolvers, userResolvers, orderResolvers]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const server = new ApolloServer({ schema, context });

server.start().then(() => {
  server.applyMiddleware({ app });

  app.use('/api/products', isAuthenticated, productRoutes);
  app.use('/api/users', isAuthenticated, userRoutes);
  app.use('/api/order-items', isAuthenticated, orderRoutes);

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    console.log(`Swagger docs available at http://localhost:4000/api-docs`);
  });
});