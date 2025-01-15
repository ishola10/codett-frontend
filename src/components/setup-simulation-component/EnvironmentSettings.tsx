import { useState, useEffect } from "react";
import { getWeatherConditions } from "../../services/appConfig";

const EnvironmentSettings = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<{
    WEATHER?: boolean;
    TIME_OF_DAY?: boolean;
    POPULATION?: boolean;
  }>({});
  const [selectedWeather, setSelectedWeather] = useState<number | null>(null);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("Morning");
  const [selectedPopulation, setSelectedPopulation] = useState(
    "Define terrain population"
  );

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const toggleVisibility = (section: keyof typeof visibleSections) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [weatherConditions, setWeatherConditions] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  useEffect(() => {
    const fetchWeatherConditions = async () => {
      try {
        const response = await getWeatherConditions();
        if (response && response.data) {
          setWeatherConditions(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching weather conditions:", error);
      }
    };

    fetchWeatherConditions();
  }, []);

  useEffect(() => {
    const payload = {
      weatherId: selectedWeather,
      timeOfDay: selectedTimeOfDay,
      population: selectedPopulation,
    };
    console.log("Payload:", payload);
  }, [selectedWeather, selectedTimeOfDay, selectedPopulation]);

  return (
    <div className="bg-black text-white">
      <div className="flex gap-4">
        <div>
          <section
            className="p-2 text-white bg-black cursor-pointer"
            onClick={() => toggleSection("ENVIRONMENT_SETTINGS")}
          >
            ENVIRONMENT SETTINGS
          </section>

          <div>
            {activeSection === "ENVIRONMENT_SETTINGS" && (
              <span>
                <div className="p-2 cursor-pointer bg-gradient-to-b from-[#1D1D1D] to-[#36383A] border-t-2 border-[#2470FD]">
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
                </div>
              </span>
            )}
          </div>
        </div>

        <div>
          {activeSection === "ENVIRONMENT_SETTINGS" && (
            <div className="w-[100%] -mt-4 h-full mr-5 text-white p-4 flex flex-col gap-2">
              <section className="p-2 bg-black cursor-pointer">
                <div onClick={() => toggleVisibility("WEATHER")}>
                  <h2 className="text-sm font-semibold">WEATHER CONDITION</h2>
                  <p className="text-sm text-gray-500">
                    {selectedWeather !== null
                      ? `Weather ID: ${selectedWeather}`
                      : "No weather selected"}
                  </p>
                </div>
                {visibleSections.WEATHER && (
                  <ul className="grid grid-cols-3 gap-2 mt-2">
                    {weatherConditions.map((weather) => (
                      <li
                        key={weather.id}
                        onClick={() => setSelectedWeather(weather.id)}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          selectedWeather === weather.id
                            ? "border-b-2 border-[#2470FD]"
                            : "bg-[#1D1D1D] hover:bg-[#2C2F33]"
                        }`}
                      >
                        {weather.name}
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="p-2 bg-black cursor-pointer">
                <div onClick={() => toggleVisibility("TIME_OF_DAY")}>
                  <h2 className="text-sm font-semibold">TIME OF DAY</h2>
                  <p className="text-sm text-gray-500">
                    {selectedTimeOfDay} Selected
                  </p>
                </div>
                {visibleSections.TIME_OF_DAY && (
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
                {visibleSections.POPULATION && (
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedPopulation === "Low"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/morning.png"
                      alt="Low"
                      onClick={() => setSelectedPopulation("Low")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedPopulation === "Mid"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/sun.png"
                      alt="Mid"
                      onClick={() => setSelectedPopulation("Mid")}
                    />
                    <img
                      className={`w-8 h-8 p-2 cursor-pointer bg-[#D9D9D91A] rounded ${
                        selectedPopulation === "High"
                          ? "border-b-2 border-[#2470FD]"
                          : ""
                      }`}
                      src="/images/icons/cloud.png"
                      alt="High"
                      onClick={() => setSelectedPopulation("High")}
                    />
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentSettings;
