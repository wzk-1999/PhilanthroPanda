import ResponsiveAppBar from "./ResponsiveAppBar";
import JobCard from "./JobCard";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import useJobs from "../constants/jobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const jobs = useJobs();
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box height={600} overflow={'auto'}  sx={{ my: 2, mx: 30 }}>
        <Grid container spacing={2}>
          {jobs.map((item) => (
            <Grid
              item
              xs={6}
              key={item.id}
              id={item.id}
              onClick={() => navigate(`/jobdescription?id=${item.id}`)}
            >
              <JobCard
                title={item.title}
                description={item.description}
                company={item.company}
                location={item.location}
                skills={item.skills}
              ></JobCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
