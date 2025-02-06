import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MissionMapPointer = ({...props}) => {

  const {lat, lng} = props;

  const approximate = (number, decimals = 4) => {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
  }

  const approximatedLatNumber = approximate(lat);
  const approximatedLngNumber = approximate(lng);

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '120px', 
        height: '16vh', 
        zIndex: 1,
        marginLeft: '5px',
        marginTop: '140px',
      }}
    >
      <Card 
        sx={{ 
          height: 50, 
          border: '1px solid #ccc', 
          borderRadius: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.85)', 
          color: '#FFF',
        }} 
      >
        <CardContent>
          <Typography variant="body2" sx={{ fontSize: '12px', marginTop: '-6px' }}>
            Lat: {approximatedLatNumber} <br /> Lng: {approximatedLngNumber}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MissionMapPointer;