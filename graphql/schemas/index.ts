import { gql } from "apollo-server-express"
import { userSchema } from "./user.schema"

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`

export const typeDefs = [userSchema]
