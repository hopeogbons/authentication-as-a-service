import express from "express"
import passport from "passport"
import { typeDefs } from "./graphql/schemas"
import { resolvers } from "./graphql/resolvers"
// import { authenticate } from "./middlewares/authentication.middleware"
import { ApolloServer } from "apollo-server-express"
import { IResolvers } from "@graphql-tools/utils"
import { DocumentNode } from "graphql"
import { initializeMongoDB } from "./config/db/mongodb.config"
import { initializeRedis } from "./config/db/redis.config"

require("dotenv").config()

// MongoDB
initializeMongoDB()

// Redis
initializeRedis()

const app: any = express()

// Initialize passport
app.use(passport.initialize())
require("./config/passport/passportConfig")

// Apollo server
async function startApolloServer(
  typeDefs: DocumentNode[],
  resolvers: IResolvers
) {
  const apolloServer = new ApolloServer({ typeDefs, resolvers })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app, path: "/graphql" })

  const host: string = process.env.GRAPHQL_HOST!
  const port: number = Number(process.env.GRAPHQL_PORT)!

  app.listen(port, () =>
    console.log(
      `Node Express Server Running: ${host}:${port}${apolloServer.graphqlPath}`
    )
  )
}

startApolloServer(typeDefs, resolvers)
