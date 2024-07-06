import { gql } from 'apollo-server-express';

export const productSchema = gql`
  scalar DateTime

  type Product {
    id: ID!
    title: String!
    description: String
    published: DateTime!
    price: Float
    rent: Float
    owner: User!
    orderItems: [OrderItem]
    rentItems: [RentItem]
    productViews: [ProductView]
    categories: [Category]
  }

  type Category {
    id: ID!
    name: String!
    products: [Product]
  }

  extend type Query {
    products: [Product]
    product(id: ID!): Product
    categories: [Category]
    category(id: ID!): Category
  }

  extend type Mutation {
    createProduct(title: String!, description: String, published: DateTime, price: Float, rent: Float, categoryIds: [ID!]): Product
    updateProduct(id: ID!, title: String, description: String, published: DateTime, price: Float, rent: Float): Product
    deleteProduct(id: ID!): Product
    createCategory(name: String!): Category
    updateCategory(id: ID!, name: String!): Category
    deleteCategory(id: ID!): Category
  }
`;
