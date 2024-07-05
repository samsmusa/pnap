import { gql } from 'apollo-server-express';

export const orderSchema = gql`
  type OrderItem {
    id: ID!
    quantity: Int!
    product: Product!
    user: User!
  }

  extend type Query {
    orderItems: [OrderItem]
    orderItem(id: ID!): OrderItem
  }

  extend type Mutation {
    createOrderItem(userId: ID!, productId: ID!, quantity: Int!): OrderItem
    deleteOrderItem(id: ID!): OrderItem
  }
`;
