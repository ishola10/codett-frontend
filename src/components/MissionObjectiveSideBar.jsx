import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MissionObjectiveSideBar = ({...props}) => {

  const {objectives, participants, scores, user, region, status, weather, condition, missionType} = props;

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        width: '300px', 
        height: '100vh', 
        zIndex: 1,
        marginRight: '5px',
        marginTop: '10px',
        paddingBottom: '30px'
      }}
    >
      <Card sx={{ height: '100%', borderRadius: '25px', backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#FFF' }}> 
        <CardContent>
          <Typography variant="p" component="div">
            Mission Objectives
          </Typography>

          
        </CardContent>
      </Card>
    </Box>
  );
};

export default MissionObjectiveSideBar;