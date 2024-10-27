const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("../config/authConfig"); // Adjust path as needed
const jobsRoutes = require("./routes/jobs");
const authRoutes = require("./routes/auth");
const applicationsRoutes = require("./routes/applications");

const app = express();
const port = process.env.port || 3001;

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());

// Configure session middleware before passport
app.use(
  session({
    secret: "your_secret_key", // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true if using HTTPS
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use(jobsRoutes);
app.use(authRoutes);
app.use(applicationsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
