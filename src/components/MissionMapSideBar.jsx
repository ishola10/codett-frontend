import * as React from "react";
// import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const RightSidebar = ({ ...props }) => {
  const {
    objectives,
    participants,
    // scores,
    // user,
    region,
    // status,
    // weather,
    // condition,
    // missionType,
    missionLog
  } = props;
  
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "300px",
        height: "100vh",
        zIndex: 1,
        marginRight: "5px",
        marginTop: "10px",
        paddingBottom: "30px",
      }}
    >
      <Card
        sx={{
          height: "100%",
          borderRadius: "25px",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          color: "#FFF",
        }}
      >
        <CardContent>
          <Typography>
            Control Panel
          </Typography>
          <br />

          <Card
            key="1"
            sx={{
              height: 150,
              border: "1px solid #ccc",
              // borderRadius: "4px",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              color: "#FFF",
              borderRadius: "12px",
            }}
          >
            <CardContent>
              <Typography variant="body2">
                Mission Brief (Classified)
              </Typography>

              {objectives &&
                objectives.map((el, index) => (
                  <div key={index}>
                    <Typography sx={{ fontSize: "12px", color: "#FFDC36" }}>
                      {el.description}
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      Lat: {el.latitude}
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      Lng: {el.longitude}
                    </Typography>
                  </div>
                ))}

              {region && (
                <Box sx={{ marginTop: "10px" }}>
                  <hr />
                  <Typography sx={{ fontSize: "12px" }}>
                    Location: {region.state}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
          <br />

          <Card
            key="2"
            sx={{
              height: 220,
              border: "1px solid #ccc",
              // borderRadius: "4px",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              color: "#FFF",
              borderRadius: "12px",
            }}
          >
            <CardContent sx={{ height: '220px', overflowY: 'auto', '&::-webkit-scrollbar': {
              width: '8px', 
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '8px', 
              backgroundColor: 'rgba(255, 255, 255, 0.90)', 
            }}}>
              <Typography variant="body2" sx={{ marginBottom: "6px" }}>
                Units / Forces (Tactical Team)
              </Typography>
              {participants &&
                participants.map((el, index) => (
                  <Box key={index} sx={{ marginBottom: "6px" }}>
                    <hr />
                    <Typography sx={{ fontSize: "12px", color: "#FFDC36" }}>
                      {el.team.name}
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      Lat: {el.latitude}
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      Lng: {el.longitude}
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      Affiliation: {el.team.symbol.affiliation}
                    </Typography>
                  </Box>
                ))}
            </CardContent>
          </Card>
          <br />

          <Card
            key="3"
            sx={{
              height: 250,
              border: "1px solid #ccc",
              // borderRadius: "4px",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              color: "#FFF",
              borderRadius: "12px",
            }}
          >
            <CardContent sx={{ height: '250px', overflowY: 'auto', '&::-webkit-scrollbar': {
              width: '8px', 
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '8px', 
              backgroundColor: 'rgba(255, 255, 255, 0.90)', 
            }}}>
              <Typography variant="body2">Mission Logs</Typography>

              {missionLog && missionLog.map((el, index) => (
                <Typography sx={{ fontSize: "12px", color: "#FFDC36", marginBottom: '6px' }}>
                  {el.title} | {el.description}
                </Typography>
              ))}
              
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RightSidebar;
