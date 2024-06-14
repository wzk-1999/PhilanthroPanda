import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function JobCard(props) {
  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={props.imageurl}
          alt="green iguana"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="div">
            {props.company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
