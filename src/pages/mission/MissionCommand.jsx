import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'; 
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MissionMapSideBar from "../../components/MissionMapSideBar";
import MissionCommandSideBar from "../../components/MissionCommandSideBar";
import MissionObjectiveSideBar from "../../components/MissionObjectiveSideBar";
import MissionMapBottomBar from "../../components/MissionMapBottomBar";
import MissionMapTimer from "../../components/MissionMapTimer";
import { getMission } from "../../services/appConfig";
// import { useSearchParams } from 'react-router-dom';
import FullPageLoader from "../../components/FullPageLoader";
import Typography from '@mui/material/Typography';
import {APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import { duration } from "@mui/material";

const MissionCommand = () => {
  const [mission, setMission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const BASE_URL = process.env.ASSET_URL;
  // const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const missionId = queryParams.get('mission_id');

  const [markerRef, marker] = useAdvancedMarkerRef();
  const [mapType, setMapType] = useState('terrain'); 

  const [toggleCommand, setToggleCommand] = useState(false);
  const [displaySidebar, setDisplaySidebar] = useState(3);


  const handleMapTypeChange = () => {
    setMapType(mapType === 'terrain' ? 'satellite' : 'terrain'); 
  };

  const getMissionById = async (missionId) => {
    const response = await getMission(missionId);
    if (response && response.data !== null) {
      setIsLoading(false);
      setMission(response.data);
      console.log(`Mission Duration: ${response.data.duration} seconds`);
      setMarkers([
        {
          lng: parseFloat(response.data.objectives[0].longitude),
          lat: parseFloat(response.data.objectives[0].latitude),
          icon: `https://api.codett.ng/icons/${response.data.objectives[0].symbol.icon}`,
          title: response.data.objectives[0].symbol.description,
          description: response.data.objectives[0].description,
          duration: response.data.duration
        },
        {
          lng: parseFloat(response.data.participants[0].longitude),
          lat: parseFloat(response.data.participants[0].latitude),
          icon: `https://api.codett.ng/icons/${response.data.participants[0].team.symbol.icon}`,
          title: response.data.participants[0].team.symbol.title,
          description: response.data.participants[0].team.symbol.description
        },
        {
          lng: parseFloat(response.data.participants[1].longitude),
          lat: parseFloat(response.data.participants[1].latitude),
          icon: `https://api.codett.ng/icons/${response.data.participants[1].team.symbol.icon}`,
          title: response.data.participants[1].team.symbol.title,
          description: response.data.participants[1].team.symbol.description
        }
      ]);
    } else {
      setMission(null);
      setIsLoading(false);
    }
  }

  const handleViewMarkerInfo = (marker) => {
    setInfo(marker);
    setInfowindowOpen(true);
  }

  const handleCloseMarkerInfo = (marker) => {
    setInfowindowOpen((prevInfowindowOpen) => false);
  }

  const handleMapTypeChange = () => {
    setMapType(mapType === 'terrain' ? 'satellite' : 'terrain'); 
  }

  useEffect(() => {
    getMissionById(missionId);
  }, []);

  return (
    <div sx={{ py: 0, backgroundColor: "#000" }}>
      <FullPageLoader isLoading={isLoading} />
      {displaySidebar === 1 && <MissionMapSideBar {...mission} />}
      {displaySidebar === 2 && <MissionObjectiveSideBar {...mission} />}
      {displaySidebar === 3 && <MissionCommandSideBar {...mission} />}
      
      {mission && <MissionMapTimer duration={mission.duration} />}
      <MissionMapBottomBar 
        handleMapTypeChange={handleMapTypeChange} 
        handleSideBarDisplay={setDisplaySidebar}
      />
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
                <AdvancedMarker 
                  key={index}
                  onClick={() => handleViewMarkerInfo(marker)}
                  title={marker.title} 
                  ref={markerRef} 
                  position={{
                    lat: marker.lat,
                    lng: marker.lng
                  }}>
                  <img src={marker.icon} width={64} height={64} alt={marker.title} />
                </AdvancedMarker>
              ))}


              {info && (
                <InfoWindow
                  position={{
                    lat: info.lat,
                    lng: info.lng
                  }}
                  maxWidth={120}
                  onCloseClick={() => handleCloseMarkerInfo(marker)}>
                  
                    <Typography sx={{ fontSize: '12px' }}>{info.description}</Typography>
                  
                  </InfoWindow>
              )}
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
