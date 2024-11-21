import React from "react";

const Conditions = () => {
  return (
    <div>
      <h1>Select Prefered Game Conditions</h1>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <input type="checkbox" id="weather" name="weather" value="weather" />
          <label for="weather">Weather</label>
        </div>

        <div className="flex items-center gap-4">
          <input type="checkbox" id="time" name="time" value="time" />
          <label for="time">Time</label>
        </div>

        <div className="flex items-center gap-4">
          <input type="checkbox" id="map" name="map" value="map" />
          <label for="map">Map</label>
        </div>

        <div className="flex items-center gap-4">
          <input type="checkbox" id="mode" name="mode" value="mode" />
          <label for="mode">Mode</label>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="difficulty"
            name="difficulty"
            value="difficulty"
          />
          <label for="difficulty">Difficulty</label>
        </div>

        <div className="flex items-center gap-4">
          <input type="checkbox" id="enemy" name="enemy" value="enemy" />
          <label for="enemy">Enemy</label>
        </div>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  );
};

export default Conditions;
