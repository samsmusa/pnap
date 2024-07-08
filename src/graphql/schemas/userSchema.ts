import {gql} from 'apollo-server-express';

export const userSchema = gql`
  type User {
    id: ID!
    email: String!
    name: String
    password: String!
    products: [Product]
    orders: [OrderItem]
    rents: [RentItem]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
  }
  
  extend type Query {
  userOrders: [OrderItem]
}

extend type Query {
  userRents: [RentItem]
}

extend type Query {
  userProducts: [Product]
  
    boughtProducts: [OrderItem]
    soldProducts: [OrderItem]
    borrowedProducts: [RentItem]
    lentProducts: [RentItem]
}



  extend type Mutation {
    createUser(email: String!, name: String, password: String!): User
    updateUser(id: ID!, email: String, name: String, password: String): User
    deleteUser(id: ID!): User
    login(email: String!, password: String!): AuthPayload
  }
`;
