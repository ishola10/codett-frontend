import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/loading");

    setTimeout(() => {
      navigate("/auth");
    }, 10000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#191A1D] text-white p-6 overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/bg-vid.mp4"
        autoPlay
        loop
        muted
      ></video>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>

      <div className="relative z-10 text-center flex flex-col items-center justify-center gap-10 space-y-8">
        <div className="flex items-center justify-center  gap-4">
          <img
            src="/images/logo.png"
            alt="CODETT Logo"
            className="w-24 h-24 md:w-32 md:h-32"
          />
          <div>
            <h1 className="text-[6rem] leading-none m-0 max-md:text-5xl font-bruno font-bold">
              CODETT
            </h1>
            <p className="text-sm md:text-[26px] tracking-widest font-roboto-condensed">
              COMMAND DECISION TACTICAL TRAINER
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 text-sm md:text-base mt-5">
          <span>CLICK</span>
          <button
            onClick={handleClick}
            className="font-semibold hover:text-gray-400 transition duration-300"
          >
            HERE
          </button>
          <span>TO START</span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
