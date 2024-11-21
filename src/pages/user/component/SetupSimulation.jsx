import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";

const SetupSimulation = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [visibleSection, setVisibleSection] = useState(null);
  const [activeMission, setActiveMission] = useState(null);
  const [visibleMission, setVisibleMission] = useState(null);
  const [activeSimultion, setActiveSimultion] = useState(null);
  const [visibleSimultion, setVisibleSimultion] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState("Cloudy");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("Morning");
  const [selectedPopulation, setSelectedPopulation] = useState(
    "Define terrain population"
  );
  const [selectedMode, setSelectedMode] = useState("No");
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState("Define terrain population");

  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const toggleVisibility = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  const handleMissionClick = (section) => {
    setActiveMission(activeMission === section ? null : section);
  };

  const handleMissionVisibility = (section) => {
    setVisibleMission(visibleMission === section ? null : section);
  }

  const handleSimulationClick = (section) => {
    setActiveSimultion(activeSimultion === section ? null : section);
  };

  const handleSimulationVisibility = (section) => {
    setVisibleSimultion(visibleSimultion === section ? null : section);
  };

  const goals = [
    "Reconnaissance",
    "Escort",
    "Capture Point/Zone",
    "Destroy Targets",
    "Defense",
    "Search and Rescue",
    "Custom Objectives",
  ];

  const strategies = [
    "Aggressive",
    "Balanced",
    "Defensive",
  ];

  const toggleGoal = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const toogleStrategy = (strategy) => {
    if (selectedStrategy.includes(strategy)) {
      setSelectedStrategy(selectedStrategy.filter((s) => s !== strategy));
    } else {
      setSelectedStrategy([...selectedStrategy, strategy]);
    }
  };


  return (
    <div className="min-h-screen flex flex-col font-roboto-condensed bg-[#18191C]">
      <div className="w-full fixed px-8 py-4 flex justify-between items-center border-b border-gray-500 bg-opacity-90 backdrop-blur">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-300 text-sm hover:underline"
        >
          <span className="text-lg">‹</span> BACK
        </button>

        <div className="flex text-white items-center gap-2">
          <span className="text-sm font-semibold">3500 XP</span>
          <span
            onClick={() => navigate("/profile")}
            className="cursor-pointer px-2 border-l border-yellow-500 font-semibold"
          >
            USER2345
          </span>
        </div>
      </div>

      <div className="flex gap-5 md:flex-row flex-grow justify-between p-4 md:p-8 mt-14">
        <div className="flex flex-col justify-between text-white w-full md:w-1/4 h-[70vh] space-y-4">
          <div className="flex flex-col gap-2">
            <section
              className="p-2 bg-black cursor-pointer"
              onClick={() => toggleSection("ENVIRONMENT_SETTINGS")}
            >
              ENVIRONMENT SETTINGS
            </section>
            {activeSection === "ENVIRONMENT_SETTINGS" && (
              <span
                onClick={() => toggleVisibility("WEATHER_DETAILS")}
                className="p-2 cursor-pointer bg-gradient-to-b from-[#1D1D1D] to-[#36383A] border-t-2 border-[#2470FD]"
              >
                <p className="text-sm text-gray-500">
                  Selected environment conditions
                </p>

                <div className="flex gap-4 mt-2">
                  <img
                    className="w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded"
                    src="/images/icons/rain.png"
                    alt="Rain"
                  />
                  <img
                    className="w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded"
                    src="/images/icons/cloud.png"
                    alt="Cloud"
                  />
                  <img
                    className="w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded"
                    src="/images/icons/profile.png"
                    alt="Profile"
                  />
                </div>
              </span>
            )}

            <section
              className="p-2 bg-black cursor-pointer"
              onClick={() => toggleSection("MISSION_SETTINGS")}
            >
              MISSION SETTINGS
            </section>
            {activeSection === "MISSION_SETTINGS" && (
              <span className="p-2 bg-gradient-to-b from-[#1D1D1D] to-[#36383A] border-t-2 border-[#2470FD]">
                <p
                  onClick={handleMissionClick}
                  className="text-sm cursor-pointer text-gray-500"
                >
                  No mission selected
                </p>
              </span>
            )}

            <section
              className="p-2 bg-black cursor-pointer"
              onClick={() => toggleSection("SIMULATION_SETTINGS")}
            >
              SIMULATION SETTINGS
            </section>
            {activeSection === "SIMULATION_SETTINGS" && (
              <span className="p-2 bg-gradient-to-b from-[#1D1D1D] to-[#36383A] border-t-2 border-[#2470FD]">
                <p className="text-sm text-gray-500">
                  Selected simulation settings
                </p>
                <div onClick={handleSimulationClick} className="flex items-center gap-2">
                  <img
                    className="w-8 h-8"
                    src="/images/icons/normal.png"
                    alt=""
                  />
                  <div className="text-sm">
                    <p>Simulation duration: 20 mins</p>
                    <p>Resource Availability: Abundant</p>
                  </div>
                </div>
              </span>
            )}

            <section
              className="p-2 bg-black cursor-pointer"
              onClick={() => toggleSection("RESOURCES_AND_EQUIPMENTS")}
            >
              RESOURCES AND EQUIPMENTS
            </section>
            {activeSection === "RESOURCES_AND_EQUIPMENTS" && (
              <span className="p-2 bg-gradient-to-b from-[#1D1D1D] to-[#36383A] border-t-2 border-[#2470FD]">
                <p>Selected mission resources and equipments</p>
              </span>
            )}
          </div>

          <div>
            <button className="bg-[#2470FD] text-white p-2">
              START SIMULATION
            </button>
          </div>
        </div>

        <div className="flex flex-grow h-[70vh]">
          {visibleSection && (
            <div className="w-[30%] -mt-4 h-full mr-5 text-white p-4 flex flex-col gap-2">
              <section className="p-2 bg-black cursor-pointer">
                <div onClick={() => toggleVisibility("WEATHER")}>
                  <h2 className="text-sm font-semibold">WEATHER CONDITION</h2>
                  <p className="text-sm text-gray-500">
                    {selectedWeather} Weather Selected
                  </p>
                </div>
                {visibleSection === "WEATHER" && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedWeather === "Rain"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/rain.png"
                      alt="Rain"
                      onClick={() => setSelectedWeather("Rain")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedWeather === "Cloudy"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/cloudy.png"
                      alt="Cloudy"
                      onClick={() => setSelectedWeather("Cloudy")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedWeather === "Sunny"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/sun.png"
                      alt="Sunny"
                      onClick={() => setSelectedWeather("Sunny")}
                    />
                  </div>
                )}
              </section>

              <section className="p-2 bg-black cursor-pointer">
                <div onClick={() => toggleVisibility("TIME_OF_DAY")}>
                  <h2 className="text-sm font-semibold">TIME OF DAY</h2>
                  <p className="text-sm text-gray-500">
                    {selectedTimeOfDay} Selected
                  </p>
                </div>
                {visibleSection === "TIME_OF_DAY" && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedTimeOfDay === "Morning"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/morning.png"
                      alt="Morning"
                      onClick={() => setSelectedTimeOfDay("Morning")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedTimeOfDay === "Afternoon"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/sun.png"
                      alt="Afternoon"
                      onClick={() => setSelectedTimeOfDay("Afternoon")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedTimeOfDay === "Evening"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/cloud.png"
                      alt="Evening"
                      onClick={() => setSelectedTimeOfDay("Evening")}
                    />
                  </div>
                )}
              </section>

              <section className="p-2 bg-black cursor-pointer">
                <div onClick={() => toggleVisibility("POPULATION")}>
                  <h2 className="text-sm font-semibold">POPULATION</h2>
                  <p className="text-sm text-gray-500">
                    {selectedPopulation} Selected
                  </p>
                </div>
                {visibleSection === "POPULATION" && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedPopulation === "Low"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/morning.png"
                      alt="Morning"
                      onClick={() => setSelectedPopulation("Low")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedPopulation === "Mid"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/sun.png"
                      alt="Afternoon"
                      onClick={() => setSelectedPopulation("Mid")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedPopulation === "High"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/cloud.png"
                      alt="Evening"
                      onClick={() => setSelectedPopulation("High")}
                    />
                  </div>
                )}
              </section>
            </div>
          )}
          {activeMission && (
            <div className="w-[50%] -mt-4 h-full mr-5 text-white p-4 flex flex-col gap-2">
              <section className="p-2 bg-black cursor-pointer">
                <div onClick={() => handleMissionVisibility("MODE")}>
                  <h2 className="text-sm font-semibold">SIMULATION MODE</h2>
                  <p className="text-sm text-gray-500">
                    {selectedMode} Mode Selected
                  </p>
                </div>
                {visibleMission === "MODE" && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedMode === "Rain"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/group-user.png"
                      alt="Rain"
                      onClick={() => setSelectedMode("Group Play")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedMode === "Cloudy"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/vs.png"
                      alt="Cloudy"
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
                    Aggressive strategy selected
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
                          onChange={() => toogleStrategy(strategy)}
                          className="form-checkbox text-[#2470FD] border-gray-500 rounded"
                        />
                        <span className="text-[10px]">{strategy}</span>
                      </label>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {activeSimultion && (
            <div className="w-[30%] -mt-4 h-full mr-5 text-white p-4 flex flex-col gap-2">
              <section className="p-2 bg-black cursor-pointer">
                <div onClick={() => handleSimulationVisibility("DIFFICULTY")}>
                  <h2 className="text-sm font-semibold">SIMULATION DIFFICULTY</h2>
                  <p className="text-sm text-gray-500">
                    {selectedDifficulty} Difficulty Selected
                  </p>
                </div>
                {visibleSimultion === "DIFFICULTY" && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedDifficulty === "Easy"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/easy.png"
                      alt="Rain"
                      onClick={() => setSelectedDifficulty("Easy")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedDifficulty === "Normal"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/normal.png"
                      alt="Cloudy"
                      onClick={() => setSelectedDifficulty("Normal")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedDifficulty === "Hard"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/hard.png"
                      alt="Sunny"
                      onClick={() => setSelectedDifficulty("Hard")}
                    />
                  </div>
                )}
              </section>

              <section className="p-2 bg-black cursor-pointer">
                <div onClick={() => handleSimulationVisibility("DURATION")}>
                  <h2 className="text-sm font-semibold">SIMULATION DURATION</h2>
                  <p className="text-sm text-gray-500">
                  Choose how long the simulation lasts
                  </p>
                </div>
                {visibleSimultion === "DURATION" && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className="w-8 h-8"
                      src="/images/icons/normal.png"
                      alt=""
                    />
                    <div className="text-sm">
                      <p>Simulation duration: 20 mins</p>
                      <p>Resource Availability: Abundant</p>
                    </div>
                  </div>
                )}
              </section>


            </div>
          )}

          <div
            style={{
              backgroundImage: "url('/images/borno-bg.png')",
            }}
            className={`${
              visibleSection ? "w-[60%]" : "w-full"
            } text-black bg-cover bg-center flex-grow h-full shadow flex justify-center items-center`}
          >
            <div className="flex flex-col bg-black w-96 py-2 opacity-70 text-white text-center">
              <h1 className="text-4xl font-bold">BORNO SURGENT CAMP</h1>
              <p className="text-2xl">SAMBISA</p>
            </div>
          </div>
        </div>
      </div>

      <Footer className="text-white"></Footer>
    </div>
  );
};

export default SetupSimulation;
