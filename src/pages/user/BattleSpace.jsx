import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";

const Battlespace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundImage =
    location.state?.backgroundImage || "/images/battle-bg.png";

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const bgImage = new Image();
      bgImage.src = backgroundImage;

      const iconImage = new Image();
      iconImage.src = "/images/icons/curly-arrow.png";

      bgImage.onload = () => setIsLoading(false);
    };

    preloadImages();
  }, [backgroundImage]);

  const locations = [
    {
      name: "BORNO STATE",
      image: "/images/battle-bg.png",
      coordinates: { lat: 11.5500, lng: 13.1000 },
    },
    {
      name: "LAGOS STATE",
      image: "/images/battle-bg2.png",
      coordinates: { lat: 6.5244, lng: 3.3792 },
    },
    {
      name: "ORJI TOWN CENTER",
      image: "/images/battle-bg3.png",
      coordinates: { lat: 5.1081, lng: 7.2975 }, 
    },
  ];

  const handleLocationClick = (coordinates) => {
    navigate("/map", { state: { coordinates } });
  };

  const handleRandomClick = () => {
    const nigeriaCoordinates = { lat: 9.082, lng: 8.6753 };
    navigate("/map", { state: { coordinates: nigeriaCoordinates } });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
          <h1 className="text-lg animate-pulse">Loading...</h1>
        </div>
      ) : (
        <div
          className="min-h-screen flex flex-col bg-cover bg-center text-white"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="w-full fixed px-8 py-4 flex justify-between items-center border-b border-gray-500 bg-opacity-90 backdrop-blur">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-300 text-sm hover:underline"
            >
              <span className="text-lg">‹</span> BACK
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">3500 XP</span>
              <span
                onClick={() => navigate("/profile")}
                className="text-white cursor-pointer px-2 border-l border-yellow-500 font-semibold"
              >
                USER2345
              </span>
            </div>
          </div>

          <div className="pt-24">
            <div className="text-left px-8">
              <h2 className="text-4xl font-bold">BATTLESPACE</h2>
              <p className="text-gray-400 text-xs">SELECT PREFERRED</p>
            </div>

            <div className="w-full max-w-8xl mt-36 flex flex-col items-center">
              <div className="grid grid-cols-4 gap-4 w-full px-8 mb-4">
                <div className="bg-black h-40 flex flex-col items-center justify-center shadow-lg">
                  <div className="bg-opacity-50 flex items-center mb-8 justify-center">
                    <img
                      src="/images/icons/curly-arrow.png"
                      className="w-8 h-8"
                      alt="arrow"
                    />
                  </div>
                  <div className="flex justify-between bg-blue-900 items-center px-2 py-1 -mb-[4.3rem] w-full">
                    <button
                      onClick={handleRandomClick}
                      className="text-sm text-white"
                    >
                      RANDOM
                    </button>
                    <span className="text-xs text-yellow-500">SELECTED</span>
                  </div>
                </div>

                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-cover bg-center h-40 shadow-lg relative cursor-pointer"
                    style={{
                      backgroundImage: `url(${location.image})`,
                    }}
                  >
                    <div className="bg-black bg-opacity-40 flex items-center justify-center">
                      <button
                        onClick={() => handleLocationClick(location.coordinates)}
                        className="mt-[8.3rem] text-left px-2 py-1 text-white text-sm bg-blue-900 w-full"
                      >
                        {location.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Battlespace;
