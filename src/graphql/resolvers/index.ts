import userResolvers from './userResolver';
import postResolvers from './postResolver';

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },
  User: userResolvers.User,
  Post: postResolvers.Post,
};
