import React, { useState, useEffect } from "react";
import { getMissions } from "../services/appConfig";
import ControlMap from "./map/ControlMap";

const GetMission = () => {
  const [mission, setMission] = useState<any>(null);
  const [selectedRegion, setSelectedRegion] = useState<{ lat: number; lng: number } | null>(null);
  const [teamLocations, setTeamLocations] = useState<{ lat: number; lng: number; teamId: number }[]>(
    []
  );

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const response = await getMissions();
        if (response && response.data && response.data.length > 0) {
          const missionData = response.data[0];
          setMission(missionData);
          console.log(missionData);
        } else {
          console.error("No missions found or unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching mission:", error);
      }
    };
    fetchMission();
  }, []);

  const handleStartMission = () => {
    if (mission) {
      const { latitude, longitude } = mission.region;
      setSelectedRegion({
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      });

      const teamMarkers = mission.participants.map((participant: any) => ({
        lat: parseFloat(participant.latitude),
        lng: parseFloat(participant.longitude),
        teamId: participant.team_id,
      }));

      console.log("Team makers:", teamMarkers);
      setTeamLocations(teamMarkers);
    }
  };

  return (
    <div>
      <h1>Mission Details:</h1>
      {mission ? (
        <div>
          <p><strong>Name:</strong> {mission.name}</p>
          <p><strong>Region:</strong> {mission.region.state}</p>
          <button onClick={handleStartMission}>Start Mission</button>
        </div>
      ) : (
        <p>Loading mission...</p>
      )}

      {selectedRegion && (
        <ControlMap center={selectedRegion} teams={teamLocations} />
      )}
    </div>
  );
};

export default GetMission;
