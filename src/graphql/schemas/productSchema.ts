import { gql } from 'apollo-server-express';

export const productSchema = gql`
  type Product {
    id: ID!
    title: String!
    description: String
    published: Boolean!
    owner: User!
    orderItems: [OrderItem]
  }

  extend type Query {
    products: [Product]
    product(id: ID!): Product
  }

  extend type Mutation {
    createProduct(title: String!, description: String, published: Boolean, ownerId: ID!): Product
    updateProduct(id: ID!, title: String, description: String, published: Boolean): Product
    deleteProduct(id: ID!): Product
  }
`;
