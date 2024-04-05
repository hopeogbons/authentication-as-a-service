import bcrypt from "bcryptjs"
import {
  User,
  IUser,
  IUserCredentials,
  IAuthenticationData,
} from "../../models/User"
import { generateToken } from "../../services/auth.service"
import { redisClient } from "../../config/db/redis.config"

export const userResolvers = {
  Query: {
    user: async (_: any, { id }: { id: string }): Promise<IUser> => {
      try {
        const user = await User.findById(id).select("-password")
        if (!user) {
          throw new Error("User not found3.")
        }
        return { id: user.id, email: user.email }
      } catch (error) {
        throw new Error("Error finding user. ->2" + error)
      }
    },
  },
  Mutation: {
    register: async (
      _: any,
      { email, password }: IUserCredentials
    ): Promise<IAuthenticationData> => {
      try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          throw new Error("User already exists")
        }

        // Create a new user in the database
        const userObject = new User({
          email,
          password,
        })
        const user = await userObject.save()

        // Generate a token
        const token = generateToken(user)

        // Store the token in Redis
        await redisClient.set(`authToken:${user.id}`, token, "EX", 3600)

        return { id: user.id, token }
      } catch (error) {
        throw new Error("Registration failed")
      }
    },

    login: async (
      _: any,
      { email, password }: IUserCredentials
    ): Promise<IAuthenticationData> => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          throw new Error("User does not exist")
        }

        // Check the password
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
          throw new Error("Password is incorrect")
        }

        // Generate a token
        const token = generateToken(user)

        // Store the token in Redis
        await redisClient.set(`authToken:${user.id}`, token, "EX", 3600)

        return { id: user.id, token }
      } catch (error) {
        throw new Error("Login failed")
      }
    },
  },
}
