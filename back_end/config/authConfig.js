const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const db = require("../repository/db"); // Adjust path to your db config file

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if email is available
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : `${profile.username}@github.com`; // Fallback to GitHub username

        // Check if user exists in the database
        const checkUserQuery = "SELECT * FROM users WHERE email = $1";
        let user = await db.query(checkUserQuery, [email]);

        if (user.rows.length === 0) {
          // If user doesn't exist, create a new one
          const insertUserQuery =
            "INSERT INTO users(name, email, password, role) VALUES($1, $2, $3,$4) RETURNING *";
          const newUser = await db.query(insertUserQuery, [
            profile.displayName || profile.username || "Unnamed User",
            email,
            "fake ps",
            "volunteer", // or 'organization', based on your app's logic
          ]);

          user = newUser;
        }

        return done(null, user.rows[0]);
      } catch (err) {
        console.error("Error with GitHub login:", err);
        done(err, null);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if email is available
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : `${profile.id}@gmail.com`; // Fallback to google id
        const name = profile.displayName || "Unnamed User";
        // Check if user exists in the database
        const checkUserQuery = "SELECT * FROM users WHERE email = $1";
        let user = await db.query(checkUserQuery, [email]);

        if (user.rows.length === 0) {
          // If user doesn't exist, create a new one
          const insertUserQuery =
            "INSERT INTO users(name, email, password, role) VALUES($1, $2, $3,$4) RETURNING *";
          const newUser = await db.query(insertUserQuery, [
            name,
            email,
            "google fake password",
            "volunteer", // or 'organization', based on your app's logic
          ]);

          user = newUser;
        }

        return done(null, user.rows[0]);
      } catch (err) {
        console.error("Error with GitHub login:", err);
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { user_id: user.user_id, name: user.name });
});

passport.deserializeUser(async (userInfo, done) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE user_id = $1", [
      userInfo.user_id,
    ]);
    done(null, user.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
