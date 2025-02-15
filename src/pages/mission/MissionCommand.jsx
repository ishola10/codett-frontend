import React, { useState, useEffect, useRef, forwardRef, useCallback} from "react";
import { useLocation } from 'react-router-dom'; 
import MissionMapSideBar from "../../components/MissionMapSideBar";
import MissionCommandSideBar from "../../components/MissionCommandSideBar";
import MissionObjectiveSideBar from "../../components/MissionObjectiveSideBar";
import MissionMapBottomBar from "../../components/MissionMapBottomBar";
import MissionMapTimer from "../../components/MissionMapTimer";
import MissionMapPointer from "../../components/MissionMapPointer";
import { getMission, updateMissionParticipant, updateMissionParticipantPosition, getMissionLogs } from "../../services/appConfig";
// import { useSearchParams } from 'react-router-dom';
import FullPageLoader from "../../components/FullPageLoader";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef, useApiIsLoaded} from '@vis.gl/react-google-maps';
import { duration } from "@mui/material";

const MissionCommand = () => {
  const ASSET_URL = process.env.ASSET_URL;

  const apiIsLoaded = useApiIsLoaded();

  const [map, setMap] = useState(null);
  const [mission, setMission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [info, setInfo] = useState(null);
  const [missionLog, setMissionLog] = useState(null);
  
  // const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  const missionId = queryParams.get('mission_id');

  const [markerRef, marker] = useAdvancedMarkerRef();
  const [mapType, setMapType] = useState('terrain'); 

  const [toggleCommand, setToggleCommand] = useState(false);
  const [displaySidebar, setDisplaySidebar] = useState(3);

  const [mousePosition, setMousePosition] = useState({lat: 0, lng: 0});

  const libraries = ['places'];

  const mapRef = useRef();

  // Capture the map instance
  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    mapRef.current = mapInstance;
  }, []);

  const handleMarkerDragStart = (marker, map) => {
    console.log(map);
  };

  const handleMarkerDragEnd = (event, currentMarker) => {
    
    const newLng = event.latLng.lng();
    const newLat = event.latLng.lat();
    const participantId = currentMarker.id;

    updateMissionParticipants(participantId, newLng, newLat, missionId);
    
  };

  const updateMissionParticipants = async (participantId, newLng, newLat, missionId) => {
    const query = {
      participant_id: participantId,
      lat: newLat,
      lng: newLng,
      mission_id: missionId
    }

    const response = await updateMissionParticipantPosition(missionId, query);
    if (response && response.data !== null) {
      getMissionById(missionId);
    } else {
      setMission(null);
      setIsLoading(false);
    }
  }

  const handleMapTypeChange = () => {
    setMapType(mapType === 'terrain' ? 'hybrid' : 'terrain'); 
  };

  const getMissionById = async (missionId) => {
    const response = await getMission(missionId);
    if (response && response.data !== null) {
      setIsLoading(false);
      setMission(response.data);

      const initMarkers = [];

      response.data.participants.forEach(function(element, index) {
        initMarkers.push({
          id: element.id,
          lng: parseFloat(element.longitude),
          lat: parseFloat(element.latitude),
          icon: `http://localhost:8000/icons/${element.team.symbol.icon}`,
          title: element.team.symbol.title,
          description: element.team.symbol.description
        });
      });

      setMarkers(initMarkers);

    } else {
      setMission(null);
      setIsLoading(false);
    }
  }

  const getMissionLogById = async (missionId) => {
    const response = await getMissionLogs(missionId);
    if (response && response.data !== null) {
      setIsLoading(false);
      setMissionLog(response.data);
    } else {
      setMissionLog(null);
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

  // Handle drop event (convert screen coordinates to LatLng)
  const onDrop = (event, dragType = 1) => {
    event.preventDefault();
    const iconUrl = event.dataTransfer.getData("iconUrl");
    const iconId = event.dataTransfer.getData("iconId");
    console.log(`Droping image url: ${iconUrl}`);
    console.log(`Icon id: ${iconId}`);
    updateMission(iconId);
  };

  // Prevent default behavior on drag over
  const onDragOver = (event) => {
    event.preventDefault();
  };

  const handleMouseMovement = (event) => {
    setMousePosition({
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng
    });
  }

  const updateMission = async (symbolId) => {
    const query = {
      symbol_id: symbolId,
      lat: mousePosition.lat,
      lng: mousePosition.lng,
      mission_id: missionId
    }

    const response = await updateMissionParticipant(missionId, query);
    if (response && response.data !== null) {
      getMissionById(missionId);
    } else {
      setMission(null);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    
    getMissionById(missionId);
    getMissionLogById(missionId);

    if (!apiIsLoaded) return;  

  }, [isLoading, apiIsLoaded]);

  return (
    <div sx={{ py: 0, backgroundColor: "#000" }}>
      <FullPageLoader isLoading={isLoading} />

      {displaySidebar === 1 && <MissionMapSideBar {...mission} missionLog={missionLog} />}
      {displaySidebar === 2 && <MissionObjectiveSideBar {...mission} />}
      {displaySidebar === 3 && <MissionCommandSideBar {...mission} />}

      {mission && <MissionMapTimer duration={40} />}
      {mission && <MissionMapPointer {...mousePosition} />}

      <MissionMapBottomBar 
        handleMapTypeChange={handleMapTypeChange} 
        handleSideBarDisplay={setDisplaySidebar}
      />
      {mission && mission !== null ? 
        <APIProvider apiKey={'AIzaSyCvCuQI3Se4e4r2q4SbEEHEr-OgOMDrRQw'}>
          <Box onDragOver={onDragOver} onDrop={onDrop}>
            <Map
              mapId={'7084e23d1e426c'}
              onLoad={onMapLoad}
              onMouseout={handleMouseMovement}
              mapTypeId={mapType}
              style={{width: '100vw', height: '100vh'}}
              defaultCenter={{
                lat: parseFloat(mission.region.latitude),
                lng: parseFloat(mission.region.longitude)
              }}
              options={{
                streetViewControl: true, 
                fullscreenControl: true, 
                tilt: 45, // Enables 3D tilt view
                heading: 0, // Adjust camera direction (0 = North)
                zoomControl: true,
                mapTypeControl: true,
                disableDefaultUI: false, // Show controls
              }}
              defaultZoom={10}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              >

              {markers.map((marker, index) => (
                <AdvancedMarker 
                  key={marker.id}
                  onClick={() => handleViewMarkerInfo(marker)}
                  draggable 
                  onDragStart={(event) => handleMarkerDragStart(marker, event.map)} 
                  onDrag={(e) => {
                    console.log(`lat: `+e.latLng.lat());
                    console.log(`lng: `+e.latLng.lng());
                  }}
                  onDragEnd={(e) => handleMarkerDragEnd(e, marker)} 
                  title={marker.title} 
                  ref={markerRef} 
                  position={{
                    lat: marker.lat,
                    lng: marker.lng
                  }}
                  >
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
          </Box>
        </APIProvider>
        : <Typography varaint="body2">Loading....</Typography>
      }
    </div>
  );
};

export default MissionCommand;
