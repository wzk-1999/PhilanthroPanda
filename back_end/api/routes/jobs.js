const express = require("express");
const router = express.Router();
const db = require("../../repository/db");

router.get("/api/jobs", async (req, res) => {
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

router.get("/jobdescription/:id", async (req, res) => {
  const jobId = req.params.id;
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
                        WHERE id = $1`;
    const { rows } = await db.query(queryText, [jobId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job with id " + jobId });
  }
});

router.post("/Add/job", async (req, res) => {
  const { title, description, image, image_type, location, user_id } = req.body;
  try {
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
    res.status(201).json({ message: "job added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// volunteer fuzzy search jobs

router.post("/jobs/search", async (req, res) => {
  const { searchWord } = req.body;
  try {
    const searchJobQuery = `select j.id
                                    ,j.title
                                    ,j.description
                                    ,j.skills
                                    ,o.name company_name
                            from jobs j
                            join users u
                            on u.user_id=j.user_id
                            join organizations o
                            on o.organization_id=u.organization_id
                            where j.title ilike '%${searchWord}%'
                            or j.description ilike '%${searchWord}%'
                            or j.skills ilike '%${searchWord}%'
                            or o.name ilike '%${searchWord}%'`;
    const { rows } = await db.query(searchJobQuery);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res
        .status(404)
        .json({ message: "No jobs found on your given search word" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
