import ResponsiveAppBar from "./ResponsiveAppBar";
import JobCard from "./JobCard";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
// import jobs from '../constants/db';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/jobs"); // Use full URL if necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // const response = await fetch("/api/jobs");
        const data = await response.json();
        console.log("Fetched jobs:", data); // Debugging log
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);
  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box sx={{ my: 2, mx: 30 }}>
        <Grid container spacing={2}>
          {jobs.map((item) => (
            <Grid
              item
              xs={6}
              key={item.id}
              id={item.id}
              onClick={() => navigate(`/jobdescription/?id=${item.id}`)}
            >
              <JobCard
                title={item.title}
                description={item.description}
                company={item.company}
                imageurl={item.imageurl}
              ></JobCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
