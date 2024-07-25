// server.js

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001; // Change the port if necessary

const db = require("../repository/db");
app.use(cors()); // Enable CORS
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await db.query(`SELECT a.title ,
                        a.description ,
                        a.image,
                        a.image_type,
                        a."location" ,
                        o."name" organization_name 
                        FROM jobs a
                        left join
                        users u 
                        on a.user_id =u.user_id 
                        left join 
                        organizations o 
                        on o.organization_id =u.organization_id`);
    res.json(jobs.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.get("/jobdescription/:id", async (req, res) => {
  const jobId = req.params.id; // Get the job id from request parameters
  try {
    const queryText = `SELECT a.title ,
                        a.description ,
                        a.image,
                        a.image_type,
                        a."location" ,
                        o."name" organization_name 
                        FROM jobs a
                        left join
                        users u 
                        on a.user_id =u.user_id 
                        left join 
                        organizations o 
                        on o.organization_id =u.organization_id 
                        WHERE id = $1`; // Query with parameterized query
    const { rows } = await db.query(queryText, [jobId]); // Execute query with job id
    res.json(rows); // Send JSON response with job details
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs with id " + jobId });
  }
});

const bcrypt = require("bcrypt");
app.use(express.json()); // Middleware to parse JSON bodies

// Add new job
app.post("/Add/job", async (req, res) => {
  const { title, description, image, image_type, location, user_id } = req.body;
  try {
    // Insert new job
    const insertJobQuery =
      "INSERT INTO jobs(title, description, image,image_type, location, user_id) VALUES($1, $2, $3, $4, $5,$6)";
    await db.query(insertJobQuery, [
      title,
      description,
      Buffer.from(image, "base64"),
      image_type,
      location,
      user_id,
    ]);

    // Send a response back to the client
    res.status(201).json({ message: "job added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
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

app.post("/register/organization", async (req, res) => {
  const { organizationName, name, email, password, phone, address, website } =
    req.body;

  try {
    // Check if the user already exists
    const checkUserExistsQuery = "SELECT * FROM users WHERE email = $1";
    const { rows: userRows } = await db.query(checkUserExistsQuery, [email]);
    if (userRows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if the organization already exists
    const checkOrgExistsQuery = "SELECT * FROM organizations WHERE email = $1";
    const { rows: orgRows } = await db.query(checkOrgExistsQuery, [email]);
    if (orgRows.length > 0) {
      return res.status(400).json({ message: "Organization already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new organization
    const insertOrgQuery =
      "INSERT INTO organizations(name, email, phone, address, website) VALUES($1, $2, $3, $4, $5) RETURNING organization_id";
    const { rows: insertedOrgRows } = await db.query(insertOrgQuery, [
      organizationName,
      email,
      phone,
      address,
      website,
    ]);

    // Get the organization_id of the newly inserted organization
    const organization_id = insertedOrgRows[0].organization_id;

    // Insert the new user
    const insertUserQuery =
      "INSERT INTO users(name, email, password, phone, address, role, organization_id) VALUES($1, $2, $3, $4, $5, $6, $7)";
    await db.query(insertUserQuery, [
      name,
      email,
      hashedPassword,
      phone,
      address,
      "organization",
      organization_id,
    ]);

    // Send a response back to the client
    res.status(201).json({ message: "Organization registered successfully" });
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

    // // Payload for the token
    // const payload = { id: user.user_id };
    // console.log("JWT Payload:", payload); // Log the payload

    // Generate JWT token
    const token = jwt.sign({ id: user.user_id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user.user_id,
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

app.post("/apply/:id", async (req, res) => {
  const { user_id } = req.body;
  const job_id = req.params.id;
  // console.log(user_id);
  try {
    // Check if application exists
    const checkUserQuery =
      "SELECT * FROM applications WHERE opportunity_id = $1 and user_id=$2";
    // console.log(checkUserQuery);
    const { rows } = await db.query(checkUserQuery, [job_id, user_id]);
    if (rows.length > 0) {
      return res.status(400).json({
        message: "you have already applied this job, check for the status",
      });
    }

    // Insert new application
    const insertStudentQuery =
      "INSERT INTO applications(opportunity_id, user_id, status) VALUES($1, $2, $3)";
    await db.query(insertStudentQuery, [job_id, user_id, "pending"]);

    res.status(200).json({
      message: "Application submitted successfully",
    });
  } catch (err) {
    console.error("Error application in application table:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/trackStatus/:id", async (req, res) => {
  const { user_id } = req.body;
  const jobId = req.params.id; // Get the job id from request parameters
  try {
    const queryText = `select j.title 
                      ,j.company 
                      ,a.application_date 
                      ,a.status 
                  from 
                  jobs j
                  join 
                  applications a 
                  on j.id =a.opportunity_id 
                  where user_id =$1
                  and opportunity_id =$2 limit 1`; // Query with parameterized query
    const { rows } = await db.query(queryText, [user_id, jobId]); // Execute query with job id
    res.json(rows); // Send JSON response with job details
  } catch (error) {
    console.error("Failed to fetch status info with id", jobId, error);
    res
      .status(500)
      .json({ error: "Failed to fetch status info with id " + jobId });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
