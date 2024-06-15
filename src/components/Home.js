import ResponsiveAppBar from './ResponsiveAppBar';
import JobCard from './JobCard';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import jobs from '../constants/db';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box sx={{ my: 2,  mx: 30}}>
        <Grid container spacing={2}>
          {jobs.map((item) => (
            <Grid item xs={6} key={item.id} id={item.id} onClick={() => navigate(`/jobdescription/?id=${item.id}`) }>
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
