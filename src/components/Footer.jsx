import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="flex fixed top-[90%] w-full justify-between items-center bg-[#1F1F1F] bg-opacity-70 p-2 md:px-8 py-3">
      <div className="flex gap-7">
        <button onClick={() => {
            navigate("/dashboard");
        }} className="text-sm md:text-sm hover:underline flex items-center gap-2">
          <img src="/images/icons/home.png" alt="home" className="w-4 h-4" />
          EXIT TO MAIN MENU
        </button>

        <button onClick={() => {
            navigate("/settings");
          }} className="text-sm md:text-sm flex hover:underline items-center gap-2">
          <img src="/images/icons/setting.png" alt="" className="w-4 h-4" />
          SETTINGS
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 w-[30%] py-2 bg-black bg-opacity-50 border border-[#9DA6A0]">
        <img src="/images/icons/copy.png" alt="copy" className="w-4 h-4" />
        <p className="text-[12px]">
          <strong className="text-[#2470FD]">User262:</strong> Just completed
          Kugwa navy operation with 50 kills
        </p>
      </div>
    </footer>
  );
};

export default Footer;
