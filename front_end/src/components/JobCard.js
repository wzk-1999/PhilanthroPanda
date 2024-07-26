import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function JobCard(props) {
  
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            {props.organization_name}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
                Location : {props.location}
          </Typography>
          <Typography sx={{
              height: '200px', // set your desired height
              overflowY: 'auto', // enable vertical scrolling
              padding: '10px', // optional padding
              border: '1px solid #ccc', // optional border for better visibility
              borderRadius: '4px', // optional border radius
            }} variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
                Skills Required : {props.skills}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
