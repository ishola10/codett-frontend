// MissionMapTimer.js
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MissionMapTimer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = React.useState(duration);

  React.useEffect(() => {
    if (timeLeft <= 0) return; 

    console.log(`Current Duration: ${formatTime(timeLeft)}`);

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1); 
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`; 
  };

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '300px', 
        height: '22vh', 
        zIndex: 1,
        marginLeft: '5px',
        marginTop: '10px',
        paddingBottom: '30px'
      }}
    >
      <Card sx={{ height: '100%', borderRadius: '25px', backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#FFF' }}>
        <CardContent>
          <Typography variant="p" component="div">
            Mission Timer
          </Typography>
          <hr />
          <Box sx={{ marginTop: '10px' }}>
            <Card 
              sx={{ 
                height: 30, 
                border: '1px solid #ccc', 
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.85)', 
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                
              }} 
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontSize: '16px', paddingTop: '5px', textAlign: 'left' }}>
                  {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MissionMapTimer;