import { gql } from 'apollo-server-express';
import userSchema from './userSchema';
import postSchema from './postSchema';

const baseSchema = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseSchema, userSchema, postSchema];
