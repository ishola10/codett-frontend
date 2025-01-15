import React, { useEffect, useState } from "react";
import {
  vehicles,
  navalForces,
  supplyResources,
} from "../../pages/user/simulation/simulationData";
import { getWeapons, getEquipments } from "../../services/appConfig";

const ResourceManagementSettings = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeResources, setActiveResources] = useState<string | null>(null);
  const [visibleResources, setVisibleResources] = useState<string | null>(null);
  const [selectedWeapons, setSelectedWeapons] = useState<number[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<number[]>([]);
  const [selectedNavalForces, setSelectedNavalForces] = useState<string[]>([]);
  const [selectedSupplyResources, setSelectedSupplyResources] = useState<string[]>([]);

  const [weapons, setWeapons] = useState<
    { id: number; name: string; description: string }[]
  >([]);
  const [equipments, setEquipments] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  useEffect(() => {
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

    fetchWeapons();
    fetchEquipments();
  }, []);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleResourcesClick = (section: string) => {
    setActiveResources(activeResources === section ? null : section);
  };

  const handleResourcesVisibility = (section: string) => {
    setVisibleResources(visibleResources === section ? null : section);
  };

  const toggleSelection =
    <T,>(
      selectedItems: T[],
      setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>
    ) =>
    (item: T) => {
      setSelectedItems((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );
    };

  const toggleWeapon = toggleSelection(selectedWeapons, setSelectedWeapons);
  const toogleVehicles = toggleSelection(selectedVehicles, setSelectedVehicles);
  const toggleEquipment = toggleSelection(selectedEquipments, setSelectedEquipments);
  const toogleNavalForces = toggleSelection(selectedNavalForces, setSelectedNavalForces);
  const toogleSupplyResources = toggleSelection(selectedSupplyResources, setSelectedSupplyResources);

  useEffect(() => {
    const payload = {
      selectedWeapons,
      selectedVehicles,
      selectedEquipments,
      selectedNavalForces,
      selectedSupplyResources,
    };
    console.log("Payload:", payload);
  }, [
    selectedWeapons,
    selectedVehicles,
    selectedEquipments,
    selectedNavalForces,
    selectedSupplyResources,
  ]);

  return (
    <div className="bg-black text-white">
      <section
        className="p-2 bg-black cursor-pointer"
        onClick={() => toggleSection("RESOURCES_AND_EQUIPMENTS")}
      >
        RESOURCES AND EQUIPMENTS
      </section>

      <div>
        {activeSection === "RESOURCES_AND_EQUIPMENTS" && (
          <span className="p-2 bg-gradient-to-b from-[#1D1D1D] to-[#36383A] border-t-2 border-[#2470FD]">
            <p
              className="cursor-pointer"
              onClick={() => handleResourcesClick("RESOURCES_AND_EQUIPMENTS")}
            >
              Selected mission resources and equipments
            </p>
          </span>
        )}
      </div>

      <div>
        {activeResources && (
          <div className="w-[50%] -mt-4 h-full mr-5 text-white p-4 flex flex-col gap-2">
            <section className="p-2 bg-black cursor-pointer">
              <div onClick={() => handleResourcesVisibility("WEAPONS")}>
                <h2 className="text-[12px] font-semibold">WEAPONS</h2>
                <p className="text-[10px] text-gray-500">
                  {selectedWeapons.length} Weapons Selected
                </p>
              </div>
              {visibleResources === "WEAPONS" && (
                <div className="grid grid-cols-3 items-center mt-2">
                  {weapons.map((weapon) => (
                    <label
                      key={weapon.id}
                      className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${
                        selectedWeapons.includes(weapon.id)
                          ? " text-white"
                          : " hover:bg-[#2C2F33]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedWeapons.includes(weapon.id)}
                        onChange={() => toggleWeapon(weapon.id)}
                        className="form-checkbox text-[#2470FD] border-gray-500 rounded"
                      />
                      <span className="text-[10px]">{weapon.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <section className="p-2 bg-black cursor-pointer">
              <div onClick={() => handleResourcesVisibility("VEHICLES")}>
                <h2 className="text-[12px] font-semibold">VEHICLES</h2>
                <p className="text-[10px] text-gray-500">
                  {selectedVehicles.length} Vehicles Selected
                </p>
              </div>
              {visibleResources === "VEHICLES" && (
                <div className="grid grid-cols-2 items-center gap-2 mt-2">
                  {vehicles.map((vehicle) => (
                    <label
                      key={vehicle}
                      className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${
                        selectedVehicles.includes(vehicle)
                          ? " text-white"
                          : " hover:bg-[#2C2F33]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedVehicles.includes(vehicle)}
                        onChange={() => toogleVehicles(vehicle)}
                        className="form-checkbox text-[#2470FD] border-gray-500 rounded"
                      />
                      <span className="text-[10px]">{vehicle}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <section className="p-2 bg-black cursor-pointer">
              <div onClick={() => handleResourcesVisibility("ASSETS")}>
                <h2 className="text-[12px] font-semibold">EQUIPMENTS</h2>
                <p className="text-[10px] text-gray-500">
                  {selectedEquipments.length} Equiments Selected
                </p>
              </div>
              {visibleResources === "ASSETS" && (
                <div className="grid grid-cols-3 items-center gap-2 mt-2">
                  {equipments.map((equipment) => (
                    <label
                      key={equipment.id}
                      className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${
                        selectedEquipments.includes(equipment.id)
                          ? " text-white"
                          : " hover:bg-[#2C2F33]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedEquipments.includes(equipment.id)}
                        onChange={() => toggleEquipment(equipment.id)}
                        className="form-checkbox text-[#2470FD] border-gray-500 rounded"
                      />
                      <span className="text-[10px]">{equipment.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <section className="p-2 bg-black cursor-pointer">
              <div onClick={() => handleResourcesVisibility("NAVAL_FORCES")}>
                <h2 className="text-[12px] font-semibold">NAVAL FORCES</h2>
                <p className="text-[10px] text-gray-500">
                  {selectedNavalForces.length} Naval Forces Selected
                </p>
              </div>
              {visibleResources === "NAVAL_FORCES" && (
                <div className="grid grid-cols-2 items-center gap-2 mt-2">
                  {navalForces.map((navalForce) => (
                    <label
                      key={navalForce}
                      className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${
                        selectedNavalForces.includes(navalForce)
                          ? " text-white"
                          : " hover:bg-[#2C2F33]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedNavalForces.includes(navalForce)}
                        onChange={() => toogleNavalForces(navalForce)}
                        className="form-checkbox text-[#2470FD] border-gray-500 rounded"
                      />
                      <span className="text-[10px]">{navalForce}</span>
                    </label>
                  ))}
                </div>
              )}
            </section>

            <section className="p-2 bg-black cursor-pointer">
              <div
                onClick={() => handleResourcesVisibility("SUPPLY_RESOURCES")}
              >
                <h2 className="text-[12px] font-semibold">SUPPLY RESOURCES</h2>
                <p className="text-[10px] text-gray-500">
                  {selectedSupplyResources.length} Resources Selected
                </p>
              </div>
              {visibleResources === "SUPPLY_RESOURCES" && (
                <div className="grid grid-cols-2 items-center gap-2 mt-2">
                  {supplyResources.map((resource) => (
                    <label
                      key={resource}
                      className={`flex items-center gap-2 p-1 rounded cursor-pointer transition-colors ${
                        selectedSupplyResources.includes(resource)
                          ? " text-white"
                          : " hover:bg-[#2C2F33]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSupplyResources.includes(resource)}
                        onChange={() => toogleSupplyResources(resource)}
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

export default ResourceManagementSettings;
