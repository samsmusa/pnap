import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schemas';
import { resolvers } from './graphql/resolvers';
import { context } from './graphql/context';

const app = express();

app.use(express.json());

const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  return app;
};

export { createApolloServer };
