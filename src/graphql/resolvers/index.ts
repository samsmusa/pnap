import {userResolvers} from './userResolvers';
import {orderResolvers} from './orderResolvers';
import {productResolvers} from './productResolvers';

export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...orderResolvers.Query,
        ...productResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...orderResolvers.Mutation,
        ...productResolvers.Mutation,
    },
    User: userResolvers.User,
    Product: productResolvers.Product,
    Order: orderResolvers.OrderItem,
};
