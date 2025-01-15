import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapComponent = () => {
  const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
  };

  const center = {
    lat: 11.75,
    lng: 13.00,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCvCuQI3Se4e4r2q4SbEEHEr-OgOMDrRQw"> 
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      />
    </LoadScript>
  );
};

export default MapComponent;
