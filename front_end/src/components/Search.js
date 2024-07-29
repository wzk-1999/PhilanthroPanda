import ResponsiveAppBar from "./ResponsiveAppBar";
import JobCard from "./JobCard";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate,useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Search = () => {
    const [searchParams] = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [userId, setUserId] = useState(null); 

    const navigate = useNavigate();

    const key = searchParams.get("key");

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

        const trackUrl = `http://127.0.0.1:3001/jobs/search`;

        try {
            const response = await fetch(trackUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchWord: key }),
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

export default Search;
