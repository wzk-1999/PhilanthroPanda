import * as React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

//import useJobs from "../constants/jobs.js";

export default function JobDescription() {
  const [searchParams] = useSearchParams();
  const [job, setJobs] = useState([]);
  const id = searchParams.get("id");
  useEffect(() => {
    const fetchJob = async () => {
       const response = await fetch(
          'http://localhost:3001/jobdescription/'+id
       );
       const data = await response.json();
       console.log(data);
       setJobs(data[0]);
    };
    fetchJob();
  }, []);

  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Card sx={{ maxWidth: 900, m: "auto", mt: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={job.imageurl}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {job.title}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {job.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
