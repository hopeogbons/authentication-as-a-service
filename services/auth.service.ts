import jwt from "jsonwebtoken"
import { IUser } from "../models/User"

// Helper function to generate a JWT token
export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  )
}
