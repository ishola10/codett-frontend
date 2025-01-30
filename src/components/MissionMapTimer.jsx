// MissionMapTimer.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MissionMapTimer = ({ duration }) => {
const [timeLeft, setTimeLeft] = React.useState(duration * 60);


  React.useEffect(() => {
    if (timeLeft <= 0) return; 

    // console.log(`Current Duration: ${formatTime(timeLeft)}`);

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1); 
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds, duration) => {
    const minutes = Math.floor(seconds / 60);
    const durationInSeconds = duration * 60;
    const remainingSeconds = seconds % 60;
  
    return `${minutes}:${remainingSeconds < durationInSeconds ? "0" : ""}${remainingSeconds}`; 
  };

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
        marginTop: '10px',
        // paddingBottom: '30px'
      }}
    >
      <Card 
              sx={{ 
                height: 50, 
                border: '1px solid #ccc', 
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.85)', 
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '10px'
              }} 
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AccessTimeIcon sx={{ fontSize: '20px', color: '#FFF' }} />
                <Typography variant="h5" sx={{ fontSize: '16px', textAlign: 'left' }}>
                  {timeLeft > 0 ? formatTime(timeLeft, duration) : "Time's up!"}
                </Typography>
              </CardContent>
            </Card>
    </Box>
  );
};

export default MissionMapTimer;