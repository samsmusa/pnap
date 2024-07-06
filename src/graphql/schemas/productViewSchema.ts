import { gql } from 'apollo-server-express';

export const productViewSchema = gql`
  type ProductView {
    id: ID!
    count: Int!
    product: Product!
  }

  extend type Query {
    productViews: [ProductView]
    productView(id: ID!): ProductView
  }

  extend type Mutation {
    createProductView(productId: ID!, count: Int!): ProductView
    updateProductView(id: ID!, count: Int!): ProductView
    deleteProductView(id: ID!): ProductView
  }
`;
