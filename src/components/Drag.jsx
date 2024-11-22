// File: DragAndDropSimulation.jsx
import React, { useState } from "react";

const DragAndDropSimulation = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    if (!droppedItems.includes(item)) {
      setDroppedItems((prev) => [...prev, item]);
      setItems((prev) => prev.filter((i) => i !== item));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping by preventing the default behavior
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex gap-8">
        {/* Draggable Items Box */}
        <div className="w-64 h-96 p-4 border border-gray-300 bg-white shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Draggable Items</h2>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                className="p-2 bg-blue-500 text-white text-sm rounded cursor-pointer shadow-md"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Drop Target Box */}
        <div
          className="w-64 h-96 p-4 border border-gray-300 bg-green-50 shadow-lg"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <h2 className="text-lg font-semibold mb-4">Drop Here</h2>
          <div className="flex flex-col gap-2">
            {droppedItems.length === 0 ? (
              <p className="text-gray-400 text-sm">Drag items here...</p>
            ) : (
              droppedItems.map((item) => (
                <div
                  key={item}
                  className="p-2 bg-green-500 text-white text-sm rounded shadow-md"
                >
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropSimulation;
