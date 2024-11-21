import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";

const MapComponent = () => {
  const location = useLocation();
  const { coordinates } = location.state || { coordinates: { lat: 0, lng: 0 } };

  const [locations, setLocations] = useState({
    location1: null,
    location2: null,
    location3: null,
  });
  const [clickCount, setClickCount] = useState(0);
  const [distance1To3, setDistance1To3] = useState(null);
  const [distance2To3, setDistance2To3] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const LocationSelector = () => {
    const map = useMapEvents({
      click(e) {
        if (clickCount === 0) {
          setLocations((prev) => ({
            ...prev,
            location3: { lat: e.latlng.lat, lng: e.latlng.lng },
          }));
        } else if (clickCount === 1) {
          setLocations((prev) => ({
            ...prev,
            location1: { lat: e.latlng.lat, lng: e.latlng.lng },
          }));
        } else if (clickCount === 2) {
          setLocations((prev) => ({
            ...prev,
            location2: { lat: e.latlng.lat, lng: e.latlng.lng },
          }));
        }

        setClickCount((prev) => prev + 1);
      },
    });

    useEffect(() => {
      if (locations.location1 && locations.location3) {
        const route1To3 = L.Routing.control({
          waypoints: [
            L.latLng(locations.location1.lat, locations.location1.lng),
            L.latLng(locations.location3.lat, locations.location3.lng),
          ],
          routeWhileDragging: false,
          lineOptions: {
            styles: [{ color: "blue", weight: 4 }],
          },
        }).addTo(map);

        route1To3.on("routesfound", (e) => {
          const route = e.routes[0];
          const distance = route.summary.totalDistance / 1000;
          setDistance1To3(distance.toFixed(2));
        });
      }

      if (locations.location2 && locations.location3) {
        const route2To3 = L.Routing.control({
          waypoints: [
            L.latLng(locations.location2.lat, locations.location2.lng),
            L.latLng(locations.location3.lat, locations.location3.lng),
          ],
          routeWhileDragging: false,
          lineOptions: {
            styles: [{ color: "red", weight: 4 }],
          },
        }).addTo(map);

        route2To3.on("routesfound", (e) => {
          const route = e.routes[0];
          const distance = route.summary.totalDistance / 1000;
          setDistance2To3(distance.toFixed(2));
        });
      }

      if (distance1To3 && distance2To3) {
        setTotalDistance(
          (parseFloat(distance1To3) + parseFloat(distance2To3)).toFixed(2)
        );
      }
    }, [map]);

    return null;
  };

  const getInstructionMessage = () => {
    switch (clickCount) {
      case 0:
        return (
          <div className="flex gap-2">
            <img
              src="/images/anime-pic.jpg"
              className="w-10 h-10 rounded-lg"
              alt=""
            />
            <div>
              <h2 className="font-bold text-left text-[12px]">Mission Objective</h2>
              <p className="text-[12px]">
                Select <span className="text-yellow-300">Location 3</span>, the
                critical target (e.g., the hospital).
              </p>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h2 className="font-bold text-[12px]">Deploy Team Alpha</h2>
            <p className="text-[12px]">
              Click to set <span className="text-yellow-300">Location 1</span>{" "}
              for the first user (e.g., the rescuer).
            </p>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="font-bold text-[12px]">Deploy Team Beta</h2>
            <p className="text-[12px]">
              Click to set <span className="text-yellow-300">Location 2</span>{" "}
              for the second user (e.g., the attacker).
            </p>
          </div>
        );
      default:
        return (
          <div className="flex gap-2">
            <h2 className="font-bold text-[12px]">Mission Summary</h2>
            <p className="text-[12px]">
              <strong>Distance from Team Alpha to Target:</strong>{" "}
              {distance1To3} km
            </p>
            <p className="text-[12px]">
              <strong>Distance from Team Beta to Target:</strong> {distance2To3}{" "}
              km
            </p>
            <p className="text-yellow-300 text-[12px]">
              <strong>Total Distance Covered:</strong> {totalDistance} km
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
        {coordinates && coordinates.lat && coordinates.lng ? (
          <MapContainer
            center={[coordinates.lat, coordinates.lng]}
            zoom={10}
            className="h-full w-full"
            whenCreated={setMapInstance}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <LocationSelector />

            {locations.location3 && <Marker position={locations.location3} />}
            {locations.location1 && (
              <Marker position={locations.location1} />
            )}
            {locations.location2 && (
              <Marker position={locations.location2} />
            )}
          </MapContainer>
        ) : (
          <div className="text-center p-4">Loading map...</div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white text-center p-1 rounded-t-lg shadow-lg">
        {getInstructionMessage()}
      </div>
    </div>
  );
};

export default MapComponent;
