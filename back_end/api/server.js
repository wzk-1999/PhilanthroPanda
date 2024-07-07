// server.js

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001; // Change the port if necessary

const db = require("../repository/db");
app.use(cors()); // Enable CORS
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await db.query("SELECT * FROM jobs");
    res.json(jobs.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.get("/jobdescription/:id", async (req, res) => {
  const jobId = req.params.id; // Get the job id from request parameters
  try {
    const queryText = "SELECT * FROM jobs WHERE id = $1"; // Query with parameterized query
    const { rows } = await db.query(queryText, [jobId]); // Execute query with job id
    res.json(rows); // Send JSON response with job details
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs with id " + jobId });
  }
});

const bcrypt = require("bcrypt");
app.use(express.json()); // Middleware to parse JSON bodies

// Register of volunteer
app.post("/register/volunteer", async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const checkExists = "SELECT * FROM users WHERE email = $1"; // Query with parameterized query
    // console.log(checkExists);
    const { rows } = await db.query(checkExists, [email]); // Execute query with email
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);

    // Insert new student
    const insertStudentQuery =
      "INSERT INTO users(name, email, password, phone, address,role) VALUES($1, $2, $3, $4, $5,$6)";
    await db.query(insertStudentQuery, [
      name,
      email,
      hashedPassword,
      phone,
      address,
      "volunteer",
    ]);

    // Send a response back to the client
    res.status(201).json({ message: "volunteer registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Register of organization
app.post("/register/organization", async (req, res) => {
  const { name, email, password, phone, address,website } = req.body;

  try {
    const checkExists = "SELECT * FROM users WHERE email = $1"; // Query with parameterized query
    // console.log(checkExists);
    const { rows } = await db.query(checkExists, [email]); // Execute query with email
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);

    const insertOrgQuery =
      "INSERT INTO organizations(name, email, phone, address,website) VALUES($1, $2, $3, $4, $5)";
    await db.query(insertOrgQuery, [
      name,
      email,
      phone,
      address,
      website
    ]);
    // Insert new student
    const insertStudentQuery =
      "INSERT INTO users(name, email, password, phone, address,role) VALUES($1, $2, $3, $4, $5,$6)";
    await db.query(insertStudentQuery, [
      name,
      email,
      hashedPassword,
      phone,
      address,
      "organization",
    ]);

    // Send a response back to the client
    res.status(201).json({ message: "organization registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const jwt = require("jsonwebtoken"); // Import JSON Web Token

// Secret key for JWT
const jwtSecret = process.env.jwt_secret;

// User login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const { rows } = await db.query(checkUserQuery, [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).send("Server error");
  }
});

// Sample protected route
app.get("/protected", verifyToken, (req, res) => {
  res.send("This is a protected route");
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
