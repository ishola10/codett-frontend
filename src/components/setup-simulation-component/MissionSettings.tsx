import React, { useState, useEffect } from "react";
import { goals, strategies } from "../../pages/user/simulation/simulationData";
import { getRegions } from "../../services/appConfig";

const MissionSettings = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeMission, setActiveMission] = useState<string | null>(null);
  const [visibleMission, setVisibleMission] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleMissionClick = (section: string) => {
    setActiveMission(activeMission === section ? null : section);
  };

  const handleMissionVisibility = (section: string) => {
    setVisibleMission(visibleMission === section ? null : section);
  };

  const toogleData =
    (data: string[], setData: React.Dispatch<React.SetStateAction<string[]>>) =>
    (item: string) => {
      setData((prev: string[]) =>
        prev.includes(item)
          ? prev.filter((i: string) => i !== item)
          : [...prev, item]
      );
    };

  const toggleGoal = toogleData(selectedGoals, setSelectedGoals);
  const toggleStrategy = toogleData(selectedStrategy, setSelectedStrategy);

  const isMissionSelected = Boolean(
    selectedMode && selectedGoals.length > 0 && selectedStrategy.length > 0
  );

  const [regions, setRegions] = useState<
    { id: number; name: string; description: string }[]
  >([]);
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getRegions();
        if (response && response.data) {
          setRegions(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching weapons:", error);
      }
    };
    fetchRegions();
  }, []);

  return (
    <div className="flex bg-black text-white">
      <div>
        <section
          className="p-2 bg-black cursor-pointer"
          onClick={() => toggleSection("MISSION_SETTINGS")}
        >
          MISSION SETTINGS
        </section>

        <div>
          <span>
            {activeSection === "MISSION_SETTINGS" && (
              <span>
                <p
                  onClick={() => handleMissionClick("MISSION_SETTINGS")}
                  className="p-2 bg-gradient-to-b cursor-pointer from-[#1D1D1D] to-[#36383A] border-t-2 border-[#2470FD]"
                >
                  {isMissionSelected
                    ? "Mission selected"
                    : "No mission selected"}
                </p>
              </span>
            )}
          </span>
        </div>
      </div>

      <div>
        {activeMission && (
          <div className="w-[100%] -mt-4 h-full mr-5 text-white p-4 flex flex-col gap-2">
            <section className="p-2 bg-black cursor-pointer">
              <div onClick={() => handleMissionVisibility("MODE")}>
                <h2 className="text-sm font-semibold">SIMULATION MODE</h2>
                <p className="text-sm text-gray-500">
                  {selectedMode || "No"} Mode Selected
                </p>
              </div>
              {visibleMission === "MODE" && (
                <div className="flex items-center gap-2 mt-2">
                  <img
                    className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                      selectedMode === "Group Play"
                        ? "border-b-2 border-[#2470FD]"
                        : ""
                    }`}
                    src="/images/icons/group-user.png"
                    alt="Group Play"
                    onClick={() => setSelectedMode("Group Play")}
                  />
                  <img
                    className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                      selectedMode === "Team vs Team"
                        ? "border-b-2 border-[#2470FD]"
                        : ""
                    }`}
                    src="/images/icons/vs.png"
                    alt="Team vs Team"
                    onClick={() => setSelectedMode("Team vs Team")}
                  />
                </div>
              )}
            </section>

            <section className="p-2 bg-black cursor-pointer">
              <div onClick={() => handleMissionVisibility("OBJECTIVE")}>
                <h2 className="text-sm font-semibold">MISSION OBJECTIVES</h2>
                <p className="text-sm w-full text-gray-500">
                  Define the core goal of the mission
                </p>
              </div>
              {visibleMission === "OBJECTIVE" && (
                <div className="grid w-full grid-cols-2 gap-2">
                  {goals.map((goal) => (
                    <label
                      key={goal}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                        selectedGoals.includes(goal)
                          ? " text-white"
                          : "bg-[#1D1D1D] hover:bg-[#2C2F33]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedGoals.includes(goal)}
                        onChange={() => toggleGoal(goal)}
                        className="form-checkbox text-[#2470FD] border-gray-500 rounded"
                      />
                      <span className="text-[10px]">{goal}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <section className="p-2 bg-black cursor-pointer">
              <div onClick={() => handleMissionVisibility("STRATEGY")}>
                <h2 className="text-sm font-semibold">MISSION STRATEGY</h2>
                <p className="text-sm text-gray-500">
                  {selectedStrategy.length > 0
                    ? selectedStrategy.join(", ")
                    : "No strategy selected"}
                </p>
              </div>
              {visibleMission === "STRATEGY" && (
                <div className="grid grid-cols-2 items-center gap-2 mt-2">
                  {strategies.map((strategy) => (
                    <label
                      key={strategy}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                        selectedStrategy.includes(strategy)
                          ? " text-white"
                          : "bg-[#1D1D1D] hover:bg-[#2C2F33]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStrategy.includes(strategy)}
                        onChange={() => toggleStrategy(strategy)}
                        className="form-checkbox text-[#2470FD] border-gray-500 rounded"
                      />
                      <span className="text-[10px]">{strategy}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <section className="p-2 bg-black cursor-pointer">
              <div onClick={() => handleMissionVisibility("REGION")}>
                <h2 className="text-sm font-semibold">MISSION REGION</h2>
                <p className="text-sm text-gray-500">
                  {regions.length > 0
                    ? regions.map((region) => region.name).join(", ")
                    : "No region selected"}
                </p>
              </div>
              {visibleMission === "REGION" && (
                <div className="grid grid-cols-2 items-center gap-2 mt-2">
                  {regions.map((region) => (
                    <label
                      key={region.id}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                        selectedStrategy.includes(region.name)
                          ? " text-white"
                          : "bg-[#1D1D1D] hover:bg-[#2C2F33]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStrategy.includes(region.name)}
                        onChange={() => toggleStrategy(region.name)}
                        className="form-checkbox text-[#2470FD] border-gray-500 rounded"
                      />
                      <span className="text-[10px]">{region.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionSettings;
