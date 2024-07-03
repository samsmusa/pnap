import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    author: User!
  }

  type Query {
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String, authorId: ID!): Post
  }
`;
