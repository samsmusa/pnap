import { gql } from 'apollo-server-express';
import {userSchema} from './userSchema';
import {orderSchema} from './orderSchema';
import {productSchema} from './productSchema';

const baseSchema = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseSchema, userSchema, orderSchema, productSchema];
