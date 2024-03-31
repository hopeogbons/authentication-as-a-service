import mongoose from "mongoose"
import bcrypt from "bcryptjs"

interface UserInterface extends mongoose.Document {
  email: string
  password: string
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const UserSchema = new mongoose.Schema<UserInterface>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

UserSchema.pre<UserInterface>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model<UserInterface>("User", UserSchema)
