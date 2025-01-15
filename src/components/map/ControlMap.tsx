import React, { useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface ControlMapProps {
  center: { lat: number; lng: number };
  teams: { lat: number; lng: number; teamId: number }[];
}

const ControlMap: React.FC<ControlMapProps> = ({ center, teams }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  const mapContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    position: "relative",
  };

  const sidebarStyle: React.CSSProperties = {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "white",
    padding: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    borderRadius: "5px",
    zIndex: "1",
  };

  const teamColors: { [key: number]: string } & { default: string } =
    React.useMemo(
      () => ({
        1: "red",
        2: "blue",
        default: "yellow",
      }),
      []
    );

  useEffect(() => {
    if (mapRef.current) {
      const existingMarkers = (mapRef.current as any)._markers || [];
      existingMarkers.forEach(
        (marker: google.maps.marker.AdvancedMarkerElement) =>
          (marker.map = null)
      );

      const markers = teams.map((team) => {
        const markerContent = document.createElement("div");
        markerContent.style.backgroundColor =
          teamColors[team.teamId] || teamColors.default;
        markerContent.style.borderRadius = "50%";
        markerContent.style.width = "20px";
        markerContent.style.height = "20px";
        markerContent.style.border = "2px solid white";
        markerContent.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
        markerContent.title = `Team ${team.teamId}`;

        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: { lat: team.lat, lng: team.lng },
          map: mapRef.current!,
          content: markerContent,
        });

        return marker;
      });

      (mapRef.current as any)._markers = markers;

      mapRef.current.setCenter(center);
    }
  }, [center, teams, teamColors]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCvCuQI3Se4e4r2q4SbEEHEr-OgOMDrRQw">
      <div style={mapContainerStyle}>
        <div style={sidebarStyle}>
          <h4>Mission Teams</h4>
          <p>
            Region: ({center.lat}, {center.lng})
          </p>
          <ul>
            {teams.map((team, index) => (
              <li key={index}>
                Team {team.teamId}: ({team.lat}, {team.lng})
              </li>
            ))}
          </ul>
        </div>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={10}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          options={{
            mapId: "7084e232d1e426c",
          }}
        />
      </div>
    </LoadScript>
  );
};

export default ControlMap;


// previous code


// import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


// interface ControlMapProps {
//   center: { lat: number; lng: number };
//   teams: { lat: number; lng: number; teamId: number }[];
// }

// const ControlMap: React.FC<ControlMapProps> = ({ center, teams }) => {
//   const mapContainerStyle: React.CSSProperties = {
//     width: "100%",
//     height: "100vh",
//     position: "relative",
//   };

//   const sidebarStyle: React.CSSProperties = {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     background: "white",
//     padding: "10px",
//     boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
//     borderRadius: "5px",
//     zIndex: "1",
//   };

//   const teamColors: Record<number, string> = {
//     1: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//     2: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyCvCuQI3Se4e4r2q4SbEEHEr-OgOMDrRQw">
//       <div style={mapContainerStyle}>
//         <div style={sidebarStyle}>
//           <h4>Mission Teams</h4>
//           <p>
//             Region: ({center.lat}, {center.lng})
//           </p>
//           <ul>
//             {teams.map((team, index) => (
//               <li key={index}>
//                 Team {team.teamId}: ({team.lat}, {team.lng})
//               </li>
//             ))}
//           </ul>
//         </div>
//         <GoogleMap
//           mapContainerStyle={{ width: "100%", height: "100%" }}
//           center={center}
//           zoom={10}
//           options={{
//             mapId: "7084e232d1e426c",
//           }}
//         >
//           {teams.map((team, index) => (
//             <Marker
//               key={index}
//               position={{ lat: team.lat, lng: team.lng }}
//               icon={{
//                 url:
//                   teamColors[team.teamId] ||
//                   "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
//               }}
//             />
//           ))}
//         </GoogleMap>
//       </div>
//     </LoadScript>
//   );
// };

// export default ControlMap;
