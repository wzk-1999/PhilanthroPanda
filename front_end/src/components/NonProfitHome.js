import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import NonProfitHeader from "./NonProfitHeader";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import JobCard from "./JobCard";

const NonProfitHome = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = () => {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        // console.log("token exists");
        try {
          const decodedToken = jwtDecode(token); // Decode JWT token using jwt-decode

          // console.log(decodedToken);
          // console.log(decodedToken.id);
          setUserId(decodedToken.id);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch user details (decode JWT)

  // Check if user has already applied for this job
  useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!userId) return;
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      const trackUrl = `http://127.0.0.1:3001/jobs/show`;

      try {
        const response = await fetch(trackUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });
        const data = await response.json();
        // console.log("runed");
        // console.log(data);
        if (data.length > 0) {
          setJobs(data);
          // console.log("applied");
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error Getting aaplied jobs:", error);
      }
    };
    checkApplicationStatus();
  }, [userId]);

  return (
    <>
      <NonProfitHeader headerNavigation="nonprofithome" />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Open Jobs
        </Typography>
        <Grid container spacing={4}>
          {jobs.map((item) => (
            <Grid
              item
              xs={6}
              key={item.id}
              id={item.id}
              onClick={() => navigate(`/applicantList?id=${item.id}`)}
            >
              <JobCard
                title={item.title}
                description={item.description}
                location={item.location}
                skills={item.skills}
                organization_name={item.organization_name}
              ></JobCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default NonProfitHome;
