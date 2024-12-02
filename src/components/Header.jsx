import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const navItems = [
    { label: "DASHBOARD", path: "/dashboard" },
    { label: "SIMULATION", path: "/simulation" },
    { label: "EQUIPMENT", path: "/equipment" },
    { label: "MISSIONS", path: "/missions" },
  ];
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUsername(user?.username || "Guest");
  }, []);

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="flex justify-between items-center bg-[#1F1F1F] bg-opacity-70 p-2 md:px-8 py-3">
      <div className="flex items-center gap-2">
        <img src="/images/logo.png" alt="CODETT Logo" className="w-7 h-7" />
        <h1 className="text-2xl font-bold font-bruno">CODETT</h1>
      </div>
      <nav className="hidden bg-gray-600 md:flex text-sm md:text-base">
        {navItems.map(({ label, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`py-1 px-2 ${
              location.pathname === path
                ? "bg-white text-black"
                : "text-white hover:bg-white hover:text-black"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="text-xs md:text-sm">
        3500 XP{" "}
        <span
          onClick={goToProfile}
          className="px-2 ml-2 py-1 border-l-2 border-yellow-500 cursor-pointer bg-black bg-opacity-65"
        >
          {username}
        </span>
      </div>
    </header>
  );
};

export default Header;
