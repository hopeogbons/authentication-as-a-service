import { DocumentNode } from "graphql"
import { gql } from "apollo-server-express"

export const userSchema: DocumentNode = gql`
  type Query {
    user(id: ID!): User
  }
  type Mutation {
    register(email: String!, password: String!): AuthenticationData
    login(email: String!, password: String!): AuthenticationData
  }
  type User {
    id: ID!
    email: String!
  }
  type AuthenticationData {
    id: ID!
    token: String!
  }
`
