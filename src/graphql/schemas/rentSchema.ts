import { gql } from 'apollo-server-express';

export const rentSchema = gql`
  type RentItem {
    id: ID!
    quantity: Int!
    product: Product!
    user: User!
    startDate: DateTime!
    endDate: DateTime!
  }

  extend type Query {
    rentItems: [RentItem]
    rentItem(id: ID!): RentItem
  }

  extend type Mutation {
    createRentItem(productId: ID!, quantity: Int!, startDate: DateTime!, endDate: DateTime!): RentItem
    deleteRentItem(id: ID!): RentItem
  }
`;
