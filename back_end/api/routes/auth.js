const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../repository/db");

const jwtSecret = process.env.jwt_secret;

router.post("/register/volunteer", async (req, res) => {
  const { name, email, password, phone, address } = req.body;
  try {
    const checkExists = "SELECT * FROM users WHERE email = $1";
    const { rows } = await db.query(checkExists, [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const insertUserQuery =
      "INSERT INTO users(name, email, password, phone, address, role) VALUES($1, $2, $3, $4, $5, $6)";
    await db.query(insertUserQuery, [
      name,
      email,
      hashedPassword,
      phone,
      address,
      "volunteer",
    ]);
    res.status(201).json({ message: "Volunteer registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/register/organization", async (req, res) => {
  const { organizationName, name, email, password, phone, address, website } =
    req.body;
  try {
    const checkUserExistsQuery = "SELECT * FROM users WHERE email = $1";
    const { rows: userRows } = await db.query(checkUserExistsQuery, [email]);
    if (userRows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }
    const checkOrgExistsQuery = "SELECT * FROM organizations WHERE email = $1";
    const { rows: orgRows } = await db.query(checkOrgExistsQuery, [email]);
    if (orgRows.length > 0) {
      return res.status(400).json({ message: "Organization already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const insertOrgQuery =
      "INSERT INTO organizations(name, email, phone, address, website) VALUES($1, $2, $3, $4, $5) RETURNING organization_id";
    const { rows: insertedOrgRows } = await db.query(insertOrgQuery, [
      organizationName,
      email,
      phone,
      address,
      website,
    ]);
    const organization_id = insertedOrgRows[0].organization_id;
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
    res.status(201).json({ message: "Organization registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const { rows } = await db.query(checkUserQuery, [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
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

module.exports = router;
