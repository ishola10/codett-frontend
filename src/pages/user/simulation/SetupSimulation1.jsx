import React, { useState,} from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../auth-pages/styles/Auth.css";
import EnvironmentSettings from "../../../components/setup-simulation-component/EnvironmentSettings";
import MissionSettings from "../../../components/setup-simulation-component/MissionSettings";
import SimulationSettings from "../../../components/setup-simulation-component/SimulationSettings";
import ResourceManagementSettings from "../../../components/setup-simulation-component/ResourceManagementSettings";
import {
  goals,
  strategies,
  resources,
  infantryUnits,
  vehicles,
  assets,
  navalForces,
  supplyResources,
} from "./simulationData";

const SetupSimulation = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [visibleSection, setVisibleSection] = useState(null);
  const [activeMission, setActiveMission] = useState(null);
  const [visibleMission, setVisibleMission] = useState(null);
  const [activeSimultion, setActiveSimultion] = useState(null);
  const [visibleSimultion, setVisibleSimultion] = useState(null);
  const [activeResources, setActiveResources] = useState(null);
  const [visibleResources, setVisibleResources] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState("Cloudy");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("Morning");
  const [selectedPopulation, setSelectedPopulation] = useState(
    "Define terrain population"
  );
  const [selectedMode, setSelectedMode] = useState("No");
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(
    "Define terrain population"
  );

  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [selectedInfantryUnits, setSelectedInfantryUnits] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedNavalForces, setSelectedNavalForces] = useState([]);
  const [selectedSupplyResources, setSelectedSupplyResources] = useState([]);

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
  };

  const handleSimulationClick = (section) => {
    setActiveSimultion(activeSimultion === section ? null : section);
  };

  const handleSimulationVisibility = (section) => {
    setVisibleSimultion(visibleSimultion === section ? null : section);
  };

  const handleResourcesClick = (section) => {
    setActiveResources(activeResources === section ? null : section);
  };

  const handleResourcesVisibility = (section) => {
    setVisibleResources(visibleResources === section ? null : section);
  };

  const toogleData = (data, setData) => (item) => {
    setData((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleGoal = toogleData(selectedGoals, setSelectedGoals);
  const toogleStrategy = toogleData(selectedStrategy, setSelectedStrategy);
  const toogleResources = toogleData(selectedPopulation, setSelectedPopulation);
  const toogleInfantryUnits = toogleData(
    selectedInfantryUnits,
    setSelectedInfantryUnits
  );
  const toogleVehicles = toogleData(selectedVehicles, setSelectedVehicles);
  const toogleAssets = toogleData(selectedAssets, setSelectedAssets);
  const toogleNavalForces = toogleData(
    selectedNavalForces,
    setSelectedNavalForces
  );
  const toogleSupplyResources = toogleData(
    selectedSupplyResources,
    setSelectedSupplyResources
  );


  const [duration, setDuration] = useState(20);

  const durationCounter = (duration) => {
    const increment = () => {
      setDuration(duration + 1);
    };

    const decrement = () => {
      setDuration(duration - 1);
    };

    return (
      <div className="flex items-center justify-left px-2 w-1/2 bg-[#1D1D1D] gap-2 rounded-lg mt-2">
        <button onClick={increment} className="text-xl">
          +
        </button>
        <p className="text-[10px]">
          <strong className="text-2xl">{duration}</strong> m
        </p>

        <button onClick={decrement} className="text-xl">
          -
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-roboto-condensed bg-[#18191C]">
      <div className="w-full fixed px-8 py-4 flex justify-between items-center border-b border-gray-500 bg-opacity-90 backdrop-blur">
        <button
          onClick={() => navigate("/battlespace")}
          className="text-gray-300 text-sm hover:underline"
        >
          <span className="text-lg">‹</span> BACK
        </button>

        <div className="flex text-white items-center gap-2">
          <span className="text-sm font-semibold">
            <img
              className="w-8 h-8"
              src="/images/icons/group-user.png"
              alt=""
            />
          </span>
          <p>VS</p>
          <span className="text-sm font-semibold">
            <img
              className="w-8 h-8"
              src="/images/icons/group-user.png"
              alt=""
            />
          </span>
          <span
            onClick={() => navigate("/profile")}
            className="cursor-pointer px-2 border-l border-yellow-500 font-semibold"
          >
            USER2345
          </span>
        </div>
      </div>
      <h1 className="h1 h">Friendly Forces</h1>
      <div className="flex gap-5 md:flex-row flex-grow justify-between p-4 md:px-8 ">
        <div className="flex flex-col justify-between text-white w-full md:w-1/4 h-[60vh] space-y-4">
          <div className="flex flex-col gap-2">
            <EnvironmentSettings />
            <MissionSettings />
            <SimulationSettings />
            <ResourceManagementSettings />


            
          </div>

          <div>
            <button
              onClick={() => navigate("/setup-simulation-enemy")}
              className="pri-btn"
            >
              Place Units
            </button>
          </div>
        </div>

        <div className="flex flex-grow h-[60vh]">

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
              <div className="flex items-center justify-center rounded-full">
                <div className="animate-spin rounded-full border-t-2 border-white border-solid h-5 w-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer className="text-white"></Footer>
    </div>
  );
};

export default SetupSimulation;
