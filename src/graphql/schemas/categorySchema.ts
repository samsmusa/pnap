import { gql } from 'apollo-server-express';

export const categorySchema = gql`
  type Category {
    id: ID!
    name: String!
    products: [Product]
  }

  extend type Query {
    categories: [Category]
    category(id: ID!): Category
  }

  extend type Mutation {
    createCategory(name: String!): Category
    updateCategory(id: ID!, name: String): Category
    deleteCategory(id: ID!): Category
  }
`;
