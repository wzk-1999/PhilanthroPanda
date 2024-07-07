import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import DefaultHeader from './DefaultHeader'; // Ensure the path is correct

const NonProfitHome = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/jobs');
        const data = await response.json();
        data.forEach(dt => {
            dt.applicantsCount = (Math.random() % 2) === 1 ? 5 : 4;
        })
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <DefaultHeader />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Open Jobs
        </Typography>
        <Grid container spacing={4}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              <Paper elevation={3} sx={{ p: 3, height: 350, overflowY: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  {job.title}
                </Typography>
                <Typography variant="body1" sx={{ height: 250, overflowY: 'auto' }} gutterBottom>
                  {job.description}
                </Typography>
                <Box mt={2}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Number of Applicants: {job.applicantsCount}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default NonProfitHome;
