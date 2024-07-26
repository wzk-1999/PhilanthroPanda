const express = require("express");
const router = express.Router();
const db = require("../../repository/db");

router.post("/apply/:id", async (req, res) => {
  const { user_id } = req.body;
  const job_id = req.params.id;
  try {
    const checkUserQuery =
      "SELECT * FROM applications WHERE opportunity_id = $1 and user_id=$2";
    const { rows } = await db.query(checkUserQuery, [job_id, user_id]);
    if (rows.length > 0) {
      return res.status(400).json({
        message: "You have already applied for this job, check the status",
      });
    }
    const insertApplicationQuery =
      "INSERT INTO applications(opportunity_id, user_id, status) VALUES($1, $2, $3)";
    await db.query(insertApplicationQuery, [job_id, user_id, "pending"]);
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("Error inserting into application table:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/trackStatus/:id", async (req, res) => {
  const { user_id } = req.body;
  const jobId = req.params.id;
  try {
    const queryText = `SELECT j.title, o.name company, a.application_date, a.status
                       FROM jobs j
                       JOIN applications a ON j.id = a.opportunity_id
                       join users u on u.user_id=j.user_id
                       join organizations o on o.organization_id=u.organization_id
                       WHERE a.user_id = $1 AND a.opportunity_id = $2 LIMIT 1`;
    const { rows } = await db.query(queryText, [user_id, jobId]);
    res.json(rows);
  } catch (error) {
    console.error("Failed to fetch status info with id", jobId, error);
    res
      .status(500)
      .json({ error: "Failed to fetch status info with id " + jobId });
  }
});

// view applied jobs

router.post("/applied/alljobs", async (req, res) => {
  const { user_id } = req.body;
  try {
    const searchJobQuery = `select a.application_id
                                    ,a.application_date
                                    ,a.status
                                    ,j.id
                                    ,j.title
                                    ,j.location
                                    ,u.name recruiter_name
                                    ,u.email 
                                    ,u.phone
                                    ,o.name company_name
                          FROM applications a JOIN
                          jobs j
                          ON j.id = a.opportunity_id
                          join users u on u.user_id=j.user_id
                          join organizations o on o.organization_id=u.organization_id
                            where a.user_id=${user_id}
                            order by a.application_date desc`;
    const { rows } = await db.query(searchJobQuery);
    if (rows.length > 0) {
      res.status(200).json(rows);
    } else {
      res.status(404).json({ message: "you didn't applied any jobs yet" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
