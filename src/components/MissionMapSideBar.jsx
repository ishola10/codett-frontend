import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const RightSidebar = (props) => {

  const objectives = props.objectives;

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
            Control Panel
          </Typography>

          <br />
          <hr />
          <br />
            <Card 
              key='1'
              sx={{ 
                height: 150, 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#FFF',
                borderRadius: '12px',
              }} 
            >
              <CardContent>
                <Typography variant="body2">
                  Mission Brief (Classified)
                </Typography>
              </CardContent>
            </Card>
            <br />

            <Card 
              key='2'
              sx={{ 
                height: 150, 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#FFF',
                borderRadius: '12px',
              }} 
            >
              <CardContent>
                <Typography variant="body2">
                  Mission Details 
                </Typography>
              </CardContent>
            </Card>
            <br />
            <Card 
              key='3'
              sx={{ 
                height: 150, 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#FFF',
                borderRadius: '12px',
              }} 
            > 
              <CardContent>
                <Typography variant="body2">
                  Mission Logs 
                </Typography>
              </CardContent>
            </Card>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RightSidebar;