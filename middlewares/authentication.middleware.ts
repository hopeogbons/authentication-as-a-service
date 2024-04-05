import { Request, Response } from "express"
import { IUser } from "../models/User"
import passport from "passport"

// Custom middleware to support Passport authentication with GraphQL
export const authenticate = (
  strategy: string,
  request: Request,
  response: Response
) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      strategy,
      { session: false },
      (error: Error | null, user: IUser, info: any) => {
        if (error) reject(error)
        else resolve(user)
      }
    )(request, response)
  })
