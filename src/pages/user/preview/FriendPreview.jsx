import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";

const FriendPreview = () => {
  const iconList = [
    {
      name: "Air-and-Missile-Defense_MGRS-Mapper",
      icon: "/images/blue-icons/Air-and-Missile-Defense_MGRS-Mapper.png",
    },
    {
      name: "Air-Naval-Gunfire-Liaison-Company-(ANGLICO)_MGRS-Mapper",
      icon: "/images/blue-icons/Air-Naval-Gunfire-Liaison-Company-(ANGLICO)_MGRS-Mapper.png",
    },
    {
      name: "Army-Aviation_Fixed-wing-aviation_MGRS-Mapper",
      icon: "/images/blue-icons/Army-Aviation_Fixed-wing-aviation_MGRS-Mapper.png",
    },
    {
      name: "Cavalry_MGRS-Mapper",
      icon: "/images/blue-icons/Cavalry_MGRS-Mapper.png",
    },
    {
      name: "Civil-Military-Cooperation-(NATO)_MGRS-Mapper",
      icon: "/images/blue-icons/Civil-Military-Cooperation-(NATO)_MGRS-Mapper.png",
    },
    {
      name: "Engineer_MGRS-Mapper (1)",
      icon: "/images/blue-icons/Engineer_MGRS-Mapper (1).png",
    },
    {
      name: "Helicopter_Rotary-wing-aviation_MGRS-Mapper",
      icon: "/images/blue-icons/Helicopter_Rotary-wing-aviation_MGRS-Mapper.png",
    },
    {
      name: "Isolated-Personnel_MGRS-Mapper",
      icon: "/images/blue-icons/Isolated-Personnel_MGRS-Mapper.png",
    },
    {
      name: "Judge-Advocate-General-(JAG)_MGRS-Mapper",
      icon: "/images/blue-icons/Judge-Advocate-General-(JAG)_MGRS-Mapper.png",
    },
    {
      name: "Public-Affairs_MGRS-Mapper",
      icon: "/images/blue-icons/Public-Affairs_MGRS-Mapper.png",
    },
    {
      name: "Quartermaster-Unit_MGRS-Mapper",
      icon: "/images/blue-icons/Quartermaster-Unit_MGRS-Mapper.png",
    },
    {
      name: "Sea,-Air,-Land-(SEAL)_MGRS-Mapper",
      icon: "/images/blue-icons/Sea,-Air,-Land-(SEAL)_MGRS-Mapper.png",
    },
    {
      name: "Security-(Internal-Security-Forces)_MGRS-Mapper",
      icon: "/images/blue-icons/Security-(Internal-Security-Forces)_MGRS-Mapper.png",
    },
    {
      name: "Transportation-Unit_MGRS-Mapper",
      icon: "/images/blue-icons/Transportation-Unit_MGRS-Mapper.png",
    },
    {
      name: "U.S.-Marshall-Service_MGRS-Mapper",
      icon: "/images/blue-icons/U.S.-Marshall-Service_MGRS-Mapper.png",
    },
  ];

  const [droppedIcons, setDroppedIcons] = useState([]);
  const [draggedIcons, setDraggedIcons] = useState([]);

  const handleDragStart = (e, icon, index) => {
    if (draggedIcons.includes(index)) {
      e.preventDefault();
      return;
    }

    e.dataTransfer.setData(
      "icon",
      JSON.stringify({
        ...icon,
        index,
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
      })
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const iconData = JSON.parse(e.dataTransfer.getData("icon"));

    const dropX =
      e.clientX - e.target.getBoundingClientRect().left - iconData.offsetX;
    const dropY =
      e.clientY - e.target.getBoundingClientRect().top - iconData.offsetY;

    setDroppedIcons((prev) => [
      ...prev,
      { ...iconData, position: { x: dropX, y: dropY } },
    ]);

    setDraggedIcons((prev) => [...new Set([...prev, iconData.index])]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-roboto-condensed bg-[#18191C]">
      <div className="w-full fixed px-8 py-4 flex justify-between items-center border-b border-gray-500 bg-opacity-90 backdrop-blur">
        <button
          onClick={() => navigate("/setup-simulation-enemy")}
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

      <div className="flex gap-5 md:flex-row flex-grow justify-between p-4 md:p-8 mt-14">
        <div className="flex flex-col justify-between text-white w-full md:w-[30%] h-[70vh] space-y-4">
          <div>
            <h1 className="text-3xl mb-4">FRIENDLY FORCES PREVIEW</h1>
            <p className="text-blue-500">DRAG AND DROP UNITS ON BATTLESPACE</p>
          </div>
          <div>
            <div className="grid grid-cols-4 gap-4 w-full bg-gradient-to-b from-[#1D1D1D] to-[#36383A] p-5 mb-4">
              {iconList.map((icon, index) => (
                <div
                  key={icon.name}
                  draggable={!draggedIcons.includes(index)}
                  onDragStart={(e) => handleDragStart(e, icon, index)}
                  className={`cursor-pointer shadow-md w-9 relative group ${
                    draggedIcons.includes(index)
                      ? "border-2 border-red-500 bg-black bg-opacity-50 pointer-events-none"
                      : ""
                  }`}
                >
                  <img src={icon.icon} className="w-8 h-8" alt={icon.name} />
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                    {icon.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => navigate("/enemy-preview")} className="pri-btn w-20">Continue</button>
        </div>

        <div
          style={{
            backgroundImage: "url('/images/borno-bg.png')",
          }}
          className="text-black bg-cover w-[50%] bg-center flex-grow h-[70vh] shadow flex justify-center items-center relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {droppedIcons.map((icon, index) => (
            <img
              key={index}
              src={icon.icon}
              alt={icon.name}
              className="absolute w-8 h-8"
              style={{
                left: `${icon.position.x}px`,
                top: `${icon.position.y}px`,
              }}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FriendPreview;
