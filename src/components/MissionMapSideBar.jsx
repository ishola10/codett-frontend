import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const RightSidebar = ({ ...props }) => {
  const {
    objectives,
    participants,
    scores,
    user,
    region,
    status,
    weather,
    condition,
    missionType,
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
          <Typography variant="p" component="div">
            Control Panel
          </Typography>

          <hr />

          <Card
            key="1"
            sx={{
              height: 150,
              border: "1px solid #ccc",
              borderRadius: "4px",
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
              borderRadius: "4px",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              color: "#FFF",
              borderRadius: "12px",
            }}
          >
            <CardContent>
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
              height: 150,
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              color: "#FFF",
              borderRadius: "12px",
            }}
          >
            <CardContent>
              <Typography variant="body2">Mission Logs</Typography>

              <Typography sx={{ fontSize: "12px" }}>
                Not available at the moments
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RightSidebar;
