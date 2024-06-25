import * as React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import jobs from "../constants/db";

export default function JobDescription() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const jb = jobs.find((jb) => {
    return jb.id === id;
  });
  return (
    <div className="App">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Card sx={{ maxWidth: 900, m: "auto", mt: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={jb.imageurl}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {jb.title}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {jb.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {jb.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
