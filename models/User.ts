import mongoose from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser {
  id: string
  email: string
}

export interface IUserCredentials {
  email: string
  password: string
}

export interface IAuthenticationData {
  id: string
  token: string
}

export interface IUserSchema extends mongoose.Document {
  id: string
  email: string
  password: string
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema = new mongoose.Schema<IUserSchema>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

UserSchema.pre<IUserSchema>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model<IUserSchema>("User", UserSchema)
