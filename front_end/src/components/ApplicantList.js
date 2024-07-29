import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import NonProfitHeader from './NonProfitHeader'; 
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ApplicantList = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(null); 

  const navigate = useNavigate();

  const id = searchParams.get("id");

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

        const trackUrl = `http://127.0.0.1:3001/applied/allApplicants`;

        try {
            const response = await fetch(trackUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: userId, opportunity_id : id }),
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
      <NonProfitHeader headerNavigation="nonprofithome"/>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Container>
      <Typography variant="h4" gutterBottom>
        Job Applications
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Application ID</TableCell>
              <TableCell>Application Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Applicant Email</TableCell>
              <TableCell>Applicant Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((application) => (
              <TableRow key={application.application_id}>
                
                <TableCell>{application.application_id}</TableCell>
                <TableCell>{new Date(application.application_date).toLocaleString()}</TableCell>
                <TableCell>{application.status}</TableCell>
                <TableCell>{application.title}</TableCell>
                <TableCell>{application.location}</TableCell>
                <TableCell>{application.applicant_name}</TableCell>
                <TableCell>{application.applicant_email}</TableCell>
                <TableCell>{application.applicant_phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
      </Container>
    </>
  );
};

export default ApplicantList;
