import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import BasicPresentation from '../../models/BasicPresentation';

import '../../css/presentationCards.css';
import ButtonMailto from '../Buttons/ButtonMailTo';

interface BasicPresentationProps{
    user : BasicPresentation
}

export default function PresentationCard(props: BasicPresentationProps) {
  const handleLinkedIn={
    
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="280"
        image={""+props.user.img}
        alt={props.user.firstname+" "+props.user.lastname}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {props.user.firstname+" "+props.user.lastname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {props.user.description}
        </Typography>
      </CardContent>
      <CardActions>
            <a href={""+props.user.linkedin} target="_blank"><LinkedInIcon fontSize="large" className='linkedIn'/></a>
            <a href={""+props.user.github} target="_blank"><GitHubIcon fontSize="large" className='github'/></a>
            <ButtonMailto mailto={props.user.mail}/>
      </CardActions>
    </Card>
  );
}
