import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { User } from "../../models/User"

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          return done(null, false, { message: "Incorrect email." })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." })
        }

        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  )
)
