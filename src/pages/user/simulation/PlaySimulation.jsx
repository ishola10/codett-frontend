import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";

const PlaySimulation = () => {
  const navigate = useNavigate();

  const [background, setBackground] = useState("/images/borno-bg2.png");

  const backgrounds = [
    { name: "Satellite", image: "/images/Info Frame (1).png" },
    { name: "Terrain", image: "/images/Info Frame (2).png" },
    { name: "Night", image: "/images/Info Frame (3).png" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-roboto-condensed bg-[#18191C]">
      <div className="w-full fixed px-8 py-4 flex justify-between items-center border-b border-gray-500 bg-opacity-90 backdrop-blur">
        <button
          onClick={() => navigate("/preview")}
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
        <div
          style={{
            backgroundImage: `url('${background}')`,
          }}
          className="text-black bg-cover w-[60%] bg-center flex-grow h-[70vh] shadow flex justify-center items-center"
        ></div>

        <div className="flex flex-col gap-2 text-white w-full md:w-1/4 h-[70vh] space-y-4">
          <section className="bg-[#1D1D1D] border border-gray-400 p-2">
            <p>PAUSE, PLAY, STOP</p>
            <img src="" alt="" />
          </section>
          <section className="bg-[#1D1D1D] border border-gray-400 p-2">
            <p>MISSION OBJECTIVES</p>
            <img src="" alt="" />
          </section>
          <section className="bg-[#1D1D1D] border border-gray-400 p-2">
            <p>MISSION OBJECTIVES</p>
            <img src="" alt="" />
          </section>
          <section className="bg-[#1D1D1D] border border-gray-400 p-2">
            <p>EQUIPMENTS</p>
            <img src="" alt="" />
          </section>
          <section className="bg-[#1D1D1D] border border-gray-400 p-2">
            <p>Vehicles</p>
            <img src="" alt="" />
          </section>
        </div>
      </div>

      <div className="fixed top-[78%] left-10 flex gap-2">
        {backgrounds.map((bg) => (
          <button
            key={bg.name}
            onClick={() => setBackground(bg.image)}
            className="w-8 h-8 rounded border-2 border-gray-500 hover:border-gray-300 overflow-hidden focus:ring focus:ring-yellow-500"
          >
            <img
              src={bg.image}
              alt={bg.name}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PlaySimulation;
