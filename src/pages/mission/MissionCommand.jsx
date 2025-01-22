import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MissionMapSideBar from "../../components/MissionMapSideBar";
import MissionMapBottomBar from "../../components/MissionMapBottomBar";
import { getMission } from "../../services/appConfig";
import { useSearchParams } from 'react-router-dom';
import FullPageLoader from "../../components/FullPageLoader";
import Typography from '@mui/material/Typography';
import {APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';

const MissionCommand = () => {
  const [mission, setMission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const missionId = queryParams.get('mission_id');

  const [mapType, setMapType] = useState('terrain'); 

  const handleMapTypeChange = () => {
    setMapType(mapType === 'terrain' ? 'satellite' : 'terrain'); 
  };

  const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
  };

  const getMissionById = async (missionId) => {
    const response = await getMission(missionId);
    if (response && response.data !== null) {
      setIsLoading(false);
      setMission(response.data);

      // set marker states
      let objectiveMarker = {
        lng: parseFloat(response.data.objectives[0].longitude),
        lat: parseFloat(response.data.objectives[0].latitude),
        icon: `http://localhost:8000/icons/${response.data.objectives[0].symbol.icon}`,
        title: response.data.objectives[0].description
      }

      // let friendlyMarker = {
      //   lng: parseFloat(response.data.participants[0].team.longitude),
      //   lat: parseFloat(response.data.participants[0].team.latitude)
      // }

      // let hostileMarker = {
      //   lng: parseFloat(response.data.participants[1].team.longitude),
      //   lat: parseFloat(response.data.participants[1].team.latitude)
      // }

      // console.log(`http://localhost:8000/icons/${response.data.objectives[0].symbol.icon}`);

      handleAddMarker(objectiveMarker);

    } else {
      setMission(null);
      setIsLoading(false);
    }
  }

  const handleAddMarker = (marker) => {
    // Add the new marker to the existing markers array
    setMarkers([...markers, marker]); 
  };

  useEffect(() => {
    getMissionById(missionId);
  }, []);

  return (
    <div sx={{ py: 0, backgroundColor: "#000" }}>
      <FullPageLoader isLoading={isLoading} />
      <MissionMapSideBar mission={mission} />
      <MissionMapBottomBar handleMapTypeChange={handleMapTypeChange} />
      {
        mission !== null ?
          <APIProvider apiKey={'AIzaSyCvCuQI3Se4e4r2q4SbEEHEr-OgOMDrRQw'}>
            <Map
              mapId={'7084e23d1e426c'}
              mapTypeId={mapType}
              style={{width: '100vw', height: '100vh'}}
              defaultCenter={{
                lat: parseFloat(mission.region.latitude),
                lng: parseFloat(mission.region.longitude)
              }}
              options={{
                streetViewControl: true, // Optional: Hide Street View control
                fullscreenControl: true, // Optional: Hide fullscreen control
              }}
              defaultZoom={10}
              gestureHandling={'greedy'}
              disableDefaultUI={true}>

              {markers.map((marker, index) => (
                <AdvancedMarker title={marker.title} key={index} position={{
                  lat: marker.lat,
                  lng: marker.lng
                }}>
                  <img src={marker.icon} width={32} height={32} />
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>
        : <Typography varaint="body2">
          Loading....
        </Typography>
      }
    </div>
  );
};

export default MissionCommand;
