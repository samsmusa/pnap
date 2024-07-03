import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post]
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(email: String!, name: String): User
  }
`;
