import React from "react";
import { Box, Grid, Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const missionLogs = [
  { id: 1, text: "Mission started at 14:00 UTC" },
  { id: 2, text: "Objective 1 completed" },
  { id: 3, text: "Encountered obstacles, adjusted route" },
  { id: 4, text: "Mission completed successfully at 16:45 UTC" },
];

const MissionCompleted = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        component="iframe"
        title="Mission Map"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCvCuQI3Se4e4r2q4SbEEHEr-OgOMDrRQw&q=Borno,Nigeria"
        allowFullScreen
        loading="lazy"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          filter: "blur(1.5px)",
        }}
      />

      <Grid container sx={{ height: "100%", p: 4, alignItems: "center"}}>
        <Grid item xs={12} md={9}>
          <Typography
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            MISSION COMPLETED ✅
          </Typography>
        </Grid>

        <Grid item xs={12} md={3} container direction="column" spacing={3}>
          <Grid item>
            <Paper sx={{ p: 3, bgcolor: "#1e1e1e", color: "white", opacity: 0.9 }}>
              <Typography variant="h6" gutterBottom>
                Mission Logs 📜
              </Typography>
              <List>
                {missionLogs.map((log) => (
                  <ListItem key={log.id}>
                    <ListItemText primary={log.text} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item>
            <Paper sx={{ p: 3, bgcolor: "#1e1e1e", color: "white", opacity: 0.9 }}>
              <Typography variant="h6" gutterBottom>
                Mission Summary
              </Typography>
              <Typography>🌍 Location: Borno, Nigeria</Typography>
              <Typography>🕒 Duration: 2 hours 45 minutes</Typography>
              <Typography>⛅ Weather: Cloudy</Typography>
              <Typography>🔧 Condition: Moderate</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MissionCompleted;
