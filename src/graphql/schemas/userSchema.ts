import {gql} from 'apollo-server-express';

export const userSchema = gql`
  type User {
    id: ID!
    email: String!
    name: String
    password: String!
    products: [Product]
    orders: [OrderItem]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(email: String!, name: String, password: String!): User
    updateUser(id: ID!, email: String, name: String, password: String): User
    deleteUser(id: ID!): User
    login(email: String!, password: String!): AuthPayload
  }
`;
