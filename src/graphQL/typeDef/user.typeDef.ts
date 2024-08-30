import { gql } from "apollo-server-express";

export const userTypeDef = gql`
  type User {
    id: ID!
    first_name: String
    last_name: String!
    email: String!
  }

  type Query {
    getAllUsers: [User!]
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(createParam: CreateParam!): User!
    updateUser(id: ID!, updateParam: UpdateParam!): User
    deleteUser(id: ID!): User
  }

  input CreateParam {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }

  input UpdateParam {
    first_name: String
    last_name: String
    email: String
  }
`;
