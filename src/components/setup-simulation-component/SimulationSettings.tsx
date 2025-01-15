import React from "react";
import { useState } from "react";
import { resources } from "../../pages/user/simulation/simulationData";

const SimulationSettings = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSimultion, setActiveSimultion] = useState<string | null>(null);
  const [visibleSimultion, setVisibleSimultion] = useState<string | null>(null);

  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");

  const [duration, setDuration] = useState(6);
  const [selectedPopulation, setSelectedPopulation] = useState<string[]>([]);

  const durationCounter = (duration: number) => {
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

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleSimulationClick = (section: string) => {
    setActiveSimultion(activeSimultion === section ? null : section);
  };

  const handleSimulationVisibility = (section: string) => {
    setVisibleSimultion(visibleSimultion === section ? null : section);
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

  const toogleResources = toogleData(selectedPopulation, setSelectedPopulation);

  return (
    <div className="bg-black flex text-white">
      <div>
        <section
          className="p-2 bg-black cursor-pointer"
          onClick={() => toggleSection("SIMULATION_SETTINGS")}
        >
          SIMULATION SETTINGS
        </section>

        <div>
          {activeSection === "SIMULATION_SETTINGS" && (
            <span>
              <div className="p-2 bg-gradient-to-b from-[#1D1D1D] to-[#36383A] border-t-2 border-[#2470FD]">
                <p className="text-sm text-gray-500">
                  Selected simulation settings
                </p>
                <div
                  onClick={() => handleSimulationClick("SIMULATION_SETTINGS")}
                  className="flex items-center gap-2 cursor-pointer"
                >
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
              </div>
            </span>
          )}
        </div>
      </div>

      <div>
        {activeSimultion && (
          <div className="w-[100%] -mt-4 h-full mr-5 text-white p-4 flex flex-col gap-2">
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
              {visibleSimultion === "DURATION" && durationCounter(duration)}
            </section>

            <section className="p-2 bg-black cursor-pointer">
              <div onClick={() => handleSimulationVisibility("RESOURCES")}>
                <h2 className="text-sm font-semibold">RESOURCE AVAILABILITY</h2>
                <p className="text-sm text-gray-500">
                  {selectedPopulation} Resource Selected
                </p>
              </div>
              {visibleSimultion === "RESOURCES" && (
                <div className="grid grid-cols-3 items-center gap-2 mt-2">
                  {resources.map((resource) => (
                    <label
                      key={resource}
                      className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${
                        selectedPopulation.includes(resource)
                          ? " text-white"
                          : " hover:bg-[#2C2F33]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPopulation.includes(resource)}
                        onChange={() => toogleResources(resource)}
                        className="form-checkbox text-[#2470FD] border-gray-500 rounded"
                      />
                      <span className="text-[10px]">{resource}</span>
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

export default SimulationSettings;
