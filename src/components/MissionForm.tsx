import React, { useState, useEffect } from "react";
import {
  getConditions,
  getWeatherConditions,
  getRegions,
  getEquipments,
  getWeapons,
} from "../services/appConfig";

const MissionForm: React.FC = () => {
  const [weatherConditions, setWeatherConditions] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [conditions, setConditions] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [regions, setRegions] = useState<
    { id: number; state: string; description: string }[]
  >([]);

  const [equipments, setEquipments] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  const [weapons, setWeapons] = useState<
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

    const fetchConditions = async () => {
      try {
        const response = await getConditions();
        if (response && response.data) {
          setConditions(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching conditions:", error);
      }
    };

    const fetchRegions = async () => {
      try {
        const response = await getRegions();
        if (response && response.data) {
          setRegions(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    const fetchEquipments = async () => {
      try {
        const response = await getEquipments();
        if (response && response.data) {
          setEquipments(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };

    const fetchWeapons = async () => {
      try {
        const response = await getWeapons();
        if (response && response.data) {
          setWeapons(response.data);
        } else {
          console.error("Unexpected API response:", response);
        }
      } catch (error) {
        console.error("Error fetching weapons:", error);
      }
    };

    fetchWeatherConditions();
    fetchConditions();
    fetchRegions();
    fetchEquipments();
    fetchWeapons();
  }, []);

  const [formData, setFormData] = useState({
    mission_type_id: 1,
    weather_id: 1,
    condition_id: 1,
    region_id: 1,
    mission_status_id: 1,
    avatar:
      "https://res.cloudinary.com/delino12/image/upload/v1736368756/army_image.webp",
    name: "",
    duration: "",
    is_active: false,
    rules: "",
    objectives: [
      {
        description: "",
        coordinate: {
          lng: "",
          lat: "",
        },
      },
    ],
    participants: [
      {
        team_id: 1,
        name: "",
        weapon_ids: [] as number[],
        equipment_ids: [] as number[],
        coordinate: {
          lng: "",
          lat: "",
        },
      },
      {
        team_id: 2,
        name: "",
        weapon_ids: [] as number[],
        equipment_ids: [] as number[],
        coordinate: {
          lng: "",
          lat: "",
        },
      },
    ],
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    path: string
  ) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let temp: any = updated;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          temp = temp[key];
        }
      });
      return updated;
    });
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleSelection = (path: string, value: number) => {
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let temp: any = updated;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          temp = temp[key];
        }
      });
      console.log(`Selected ${path}:`, value);

      return updated;
    });
  };

  const handleCheckboxChange = (
    teamIndex: number,
    type: "weapon_ids" | "equipment_ids",
    id: number
  ) => {
    setFormData((prev) => {
      const updatedParticipants = [...prev.participants];
      const currentArray = updatedParticipants[teamIndex][type];
      if (currentArray.includes(id)) {
        updatedParticipants[teamIndex][type] = currentArray.filter(
          (item) => item !== id
        );
      } else {
        updatedParticipants[teamIndex][type] = [...currentArray, id];
      }
      return { ...prev, participants: updatedParticipants };
    });
  };

  const isChecked = (
    teamIndex: number,
    type: "weapon_ids" | "equipment_ids",
    id: number
  ) => formData.participants[teamIndex][type].includes(id);

  return (
    <form onSubmit={handleSubmit} className="font-sans">
      {currentStep === 1 && (
        <div className="bg-black text-white p-6">
          <h1 className="text-2xl font-bold mb-4">Mission Details</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-[50%] gap-6">
            <label className="block">
              <span className="text-gray-300">Mission Name:</span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange(e, "name")}
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Objective Description:</span>
              <input
                type="text"
                value={formData.objectives[0].description}
                onChange={(e) =>
                  handleInputChange(e, "objectives.0.description")
                }
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-300">Longitude:</span>
              <input
                type="text"
                value={formData.objectives[0].coordinate.lng}
                onChange={(e) =>
                  handleInputChange(e, "objectives.0.coordinate.lng")
                }
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-300">Latitude:</span>
              <input
                type="text"
                value={formData.objectives[0].coordinate.lat}
                onChange={(e) =>
                  handleInputChange(e, "objectives.0.coordinate.lat")
                }
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>

            <label className="block">
              <span className="text-gray-300">Duration (minutes):</span>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange(e, "duration")}
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>
            <label className="block col-span-full">
              <span className="text-gray-300">Select Weather:</span>
              <ul className="grid grid-cols-3 gap-4 mt-2">
                {weatherConditions.map((weather) => (
                  <li
                    key={weather.id}
                    className={`px-4 py-2 rounded ${
                      formData.weather_id === weather.id
                        ? "bg-blue-500"
                        : "bg-gray-600"
                    } hover:bg-gray-500 cursor-pointer`}
                    onClick={() => handleSelection("weather_id", weather.id)}
                  >
                    {weather.name}
                  </li>
                ))}
              </ul>
            </label>

            <label className="block col-span-full">
              <span className="text-gray-300">Select Condition:</span>
              <ul className="grid grid-cols-2 gap-4 mt-2">
                {conditions.map((condition) => (
                  <li
                    key={condition.id}
                    className={`px-4 py-2 rounded ${
                      formData.condition_id === condition.id
                        ? "bg-blue-500"
                        : "bg-gray-600"
                    } hover:bg-gray-500 cursor-pointer`}
                    onClick={() =>
                      handleSelection("condition_id", condition.id)
                    }
                  >
                    {condition.name}
                  </li>
                ))}
              </ul>
            </label>

            <label className="block col-span-full">
              <span className="text-gray-300">Select Region:</span>
              <ul className="grid grid-cols-2 gap-4 mt-2">
                {regions.map((region) => (
                  <li
                    key={region.id}
                    className={`px-4 py-2 rounded ${
                      formData.region_id === region.id
                        ? "bg-blue-500"
                        : "bg-gray-600"
                    } hover:bg-gray-500 cursor-pointer`}
                    onClick={() => handleSelection("region_id", region.id)}
                  >
                    {region.state}
                  </li>
                ))}
              </ul>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => handleInputChange(e, "is_active")}
                className="mr-2"
              />
              <span className="text-gray-300">Is Active</span>
            </label>
            <label className="block col-span-full">
              <span className="text-gray-300">Rules:</span>
              <textarea
                value={formData.rules}
                onChange={(e) => handleInputChange(e, "rules")}
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="bg-gray-800 text-white p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Team 1 Details</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-[50%] gap-6">
            <label className="block">
              <span className="text-gray-300">Team Name:</span>
              <input
                type="text"
                value={formData.participants[0].name}
                onChange={(e) => handleInputChange(e, "participants.0.name")}
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Longitude:</span>
              <input
                type="text"
                value={formData.participants[0].coordinate.lng}
                onChange={(e) =>
                  handleInputChange(e, "participants.0.coordinate.lng")
                }
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Latitude:</span>
              <input
                type="text"
                value={formData.participants[0].coordinate.lat}
                onChange={(e) =>
                  handleInputChange(e, "participants.0.coordinate.lat")
                }
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>
            <label className="block col-span-full">
              <span className="text-gray-300">Select Weapons:</span>
              <ul className="grid grid-cols-4 gap-4 mt-2">
                {weapons.map((weapon) => (
                  <li
                    key={weapon.id}
                    className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={isChecked(0, "weapon_ids", weapon.id)}
                        onChange={() =>
                          handleCheckboxChange(0, "weapon_ids", weapon.id)
                        }
                      />
                      {weapon.name}
                    </label>
                  </li>
                ))}
              </ul>
            </label>

            <label className="block col-span-full">
              <span className="text-gray-300">Select Equipments:</span>
              <ul className="grid grid-cols-4 gap-4 mt-2">
                {equipments.map((equipment) => (
                  <li
                    key={equipment.id}
                    className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={isChecked(0, "equipment_ids", equipment.id)}
                        onChange={() =>
                          handleCheckboxChange(0, "equipment_ids", equipment.id)
                        }
                      />
                      {equipment.name}
                    </label>
                  </li>
                ))}
              </ul>
            </label>
          </div>
          <div className="mt-6 w-[50%] flex justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="bg-gray-800 text-white p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Team 2 Details</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-[50%] gap-6">
            <label className="block">
              <span className="text-gray-300">Team Name:</span>
              <input
                type="text"
                value={formData.participants[0].name}
                onChange={(e) => handleInputChange(e, "participants.0.name")}
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Longitude:</span>
              <input
                type="text"
                value={formData.participants[0].coordinate.lng}
                onChange={(e) =>
                  handleInputChange(e, "participants.0.coordinate.lng")
                }
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>
            <label className="block">
              <span className="text-gray-300">Latitude:</span>
              <input
                type="text"
                value={formData.participants[0].coordinate.lat}
                onChange={(e) =>
                  handleInputChange(e, "participants.0.coordinate.lat")
                }
                className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded"
              />
            </label>
            <label className="block col-span-full">
              <span className="text-gray-300">Select Weapons:</span>
              <ul className="grid grid-cols-4 gap-4 mt-2">
                {weapons.map((weapon) => (
                  <li
                    key={weapon.id}
                    className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={isChecked(1, "weapon_ids", weapon.id)}
                        onChange={() =>
                          handleCheckboxChange(1, "weapon_ids", weapon.id)
                        }
                      />
                      {weapon.name}
                    </label>
                  </li>
                ))}
              </ul>
            </label>

            <label className="block col-span-full">
              <span className="text-gray-300">Select Equipments:</span>
              <ul className="grid grid-cols-4 gap-4 mt-2">
                {equipments.map((equipment) => (
                  <li
                    key={equipment.id}
                    className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={isChecked(1, "equipment_ids", equipment.id)}
                        onChange={() =>
                          handleCheckboxChange(1, "equipment_ids", equipment.id)
                        }
                      />
                      {equipment.name}
                    </label>
                  </li>
                ))}
              </ul>
            </label>
          </div>
          <div className="mt-6 flex w-[50%] justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            >
              Previous
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default MissionForm;
