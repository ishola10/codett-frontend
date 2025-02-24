import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { getIcons } from "../services/appConfig";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';

// const Item = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const MissionCommandSideBar = ({...props}) => {
  // const {objectives, participants, scores, user, region, status, weather, condition, missionType} = props;
  const [icons, setIcons] = useState([]);

  const handleSearch = () => {

  }

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await getIcons();
        if (response && response.data.length > 0) {
          setIcons(response.data);
        } else {
          console.error("No icons found or unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    };

    fetchIcons();
  }, []);

  const onDragStart = (e) => {
    // console.log(e.target.src);
    e.dataTransfer.setData("iconUrl", e.target.src);
    e.dataTransfer.setData("iconId", e.target.id);
  }

  return (
    <Box 
      sx={{ 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        width: '300px', 
        height: '100vh', 
        zIndex: 1,
        marginRight: '25px',
        marginTop: '10px',
        paddingBottom: '30px'
      }}
    >
      <Card sx={{ height: '100%', borderRadius: '25px', backgroundColor: 'rgba(0, 0, 0, 0.85)', color: '#FFF' }}> 
        <CardContent>
          <Typography variant="p" component="div">
            Mission Echelon
          </Typography>

          <br />

          <TextField 
            fullWidth
            placeholder='Search Symbol'
            id="outlined-basic" 
            label="Search"
            onChange={handleSearch} 
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: 'white', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', 
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white', 
              },
              '& .MuiInputBase-input': {
                color: 'white', 
              },
            }}
          />
          
          <br />
          <br />

          <Grid
            container
            spacing={2}
            columns={{ xs: 2, sm: 6, md: 12 }}
             sx={{  overflowY: 'auto', height: '100vh', '&::-webkit-scrollbar': {
              width: '8px', 
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '8px', 
              backgroundColor: 'rgba(255, 255, 255, 0.90)', 
            }}}
          >
            {icons && icons.map((icon, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card sx={{ background: 'transparent'}}>
                  <img
                    id={icon.id}
                    src={`http://api.codett.ng/icons/${icon.icon}`}
                    alt={icon.title}
                    width={92}
                    height={92}
                    draggable
                    onDragStart={onDragStart}
                  />
                  <CardContent>
                    <Typography gutterBottom sx={{ fontSize: '10px', color: '#FFF'}}>{icon.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {icon.affiliation}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MissionCommandSideBar;