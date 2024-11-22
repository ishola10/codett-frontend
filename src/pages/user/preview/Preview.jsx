import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [droppedIcons, setDroppedIcons] = useState([]);
  const navigate = useNavigate();

  const blueIcons = [
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

  const redIcons = [
    {
      name: "Engineer_MGRS-Mapper",
      icon: "/images/red-icons/Engineer_MGRS-Mapper.png",
    },
    {
      name: "Information-Operations_MGRS-Mapper",
      icon: "/images/red-icons/Information-Operations_MGRS-Mapper.png",
    },
    {
      name: "Law-Enforcement-Agency_MGRS-Mapper",
      icon: "/images/red-icons/Law-Enforcement-Agency_MGRS-Mapper.png",
    },
    {
      name: "Medical_MGRS-Mapper",
      icon: "/images/red-icons/Medical_MGRS-Mapper.png",
    },
    {
      name: "Medical-Treatment-Facility-(Hospital)_MGRS-Mapper",
      icon: "/images/red-icons/Medical-Treatment-Facility-(Hospital)_MGRS-Mapper.png",
    },
    {
      name: "Military-Intelligence_MGRS-Mapper",
      icon: "/images/red-icons/Military-Intelligence_MGRS-Mapper.png",
    },
    {
      name: "Missile_MGRS-Mapper",
      icon: "/images/red-icons/Missile_MGRS-Mapper.png",
    },
    {
      name: "Mortar-Unit_MGRS-Mapper",
      icon: "/images/red-icons/Mortar-Unit_MGRS-Mapper.png",
    },
    {
      name: "Personnel-Services_MGRS-Mapper",
      icon: "/images/red-icons/Personnel-Services_MGRS-Mapper.png",
    },
    {
      name: "Police-Department_MGRS-Mapper",
      icon: "/images/red-icons/Police-Department_MGRS-Mapper.png",
    },
    {
      name: "Signal_MGRS-Mapper",
      icon: "/images/red-icons/Signal_MGRS-Mapper.png",
    },
    {
      name: "Space-Unit_MGRS-Mapper",
      icon: "/images/red-icons/Space-Unit_MGRS-Mapper.png",
    },
  ];

  const ModalObjective = () => {
    const [typedText, setTypedText] = useState("");
    const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec ultricies bibendum, justo odio tincidunt leo, sed ultricies turpis nisl nec felis. In hac habitasse platea dictumst. Integer nec turpis nec nisl aliquet lacinia. Donec ultricies tincidunt mauris, nec ultricies sapien. Donec ultricies tincidunt mauris, nec ultricies sapien.`;
  
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
  
      return () => clearInterval(interval);
    }, [fullText]);
  
    return (
      <div className="fixed inset-0 max-w-96 ml-[35%] flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <img
            src="/images/anime-pic.jpg"
            className="w-10 h-10 rounded-lg"
            alt=""
          />
          <h1 className="text-2xl font-bold">MISSION OBJECTIVE</h1>
          <p className="text-gray-500 mt-2 text-[12px]">{typedText}</p>
          <button
            onClick={() => setIsModalVisible(false)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            OK
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col font-roboto-condensed bg-[#18191C] relative">
      {isModalVisible && <ModalObjective />}
      {isModalVisible && <div className="fixed inset-0 bg-black opacity-70 z-40"></div>}

      <div
        className={`w-full fixed px-8 py-4 flex justify-between items-center border-b border-gray-500 bg-opacity-90 backdrop-blur ${
          isModalVisible ? "z-30" : ""
        }`}
      >
        <button
          onClick={() => navigate("/enemy-preview")}
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

      <div
        className={`flex gap-5 md:flex-row flex-grow justify-between p-4 md:p-8 mt-14 ${
          isModalVisible ? "z-30" : ""
        }`}
      >
        <div className="flex flex-col gap-5 w-[25%]">
          <div className="flex flex-col gap-2 ">
            <h1 className="text-white text-2xl">FRIENDLY FORCES</h1>
            <div className="flex gap-2 flex-wrap p-2 bg-gradient-to-b from-[#1D1D1D] to-[#36383A]">
              {blueIcons.map((icon, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={icon.icon}
                    alt={icon.name}
                    className="w-12 h-12"
                    draggable
                  />
                  <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-sm text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                    {icon.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundImage: "url('/images/borno-bg2.png')",
          }}
          className="text-black bg-cover w-[50%] bg-center flex-grow h-[70vh] shadow flex justify-center items-center relative"
        >
          {droppedIcons.map((icon, index) => (
            <img
              key={index}
              src={icon.icon}
              alt={icon.name}
              className="absolute"
              style={{
                top: icon.position.y,
                left: icon.position.x,
              }}

              
            />
          ))}

          <button className="pri-btn mt-80" onClick={() => navigate("/play-simulation")}>START SIMULATION</button>
        </div>

        <div className="flex flex-col gap-5 w-[25%]">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-2xl">ENEMY FORCES</h1>
            <div className="flex gap-2 flex-wrap p-2 bg-gradient-to-b from-[#1D1D1D] to-[#36383A]">
              {redIcons.map((icon, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={icon.icon}
                    alt={icon.name}
                    className="w-12 h-12"
                    draggable
                  />
                  <span className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-sm text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                    {icon.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Preview;
