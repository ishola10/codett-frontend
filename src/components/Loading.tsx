import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingScreen = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const fullText =
    "CODETT brings military training to life with highly realistic simulations that incorporate detailed models of military assets, adversarial forces, and dynamic environments. This immersive training experience helps officers and cadets understand the complexities of modern warfare, preparing them for real-world operations.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText((prevText) => prevText + fullText[index]);
      index += 1;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const handleContinueClick = () => {
    navigate("/auth");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background2.png')" }}
    >
      <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-lg w-full max-w-md mx-auto flex gap-4">
        <div className="flex-grow">
          <div>
            <h2 className="text-white px-3 bg-slate-600 inline-block text-lg font-semibold">
              STATUS
            </h2>
            <p className="text-gray-300 font-roboto-condensed w-64 text-[10px] mt-1 pl-3 border-l-2 border-slate-600 border-dotted whitespace-pre-wrap">
              {text}
              <span className="animate-ping inline-block w-1 h-1 bg-white rounded-full ml-1"></span>
            </p>
            <button
              onClick={handleContinueClick}
              className="flex items-center justify-center gap-1 text-white font-semibold px-1 rounded-lg hover:text-gray-400 transition duration-300 mt-4"
            >
              <img src="/images/icons/continue.png" alt="Continue Icon" className="w-4 h-4" />
              CONTINUE
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <img
            src="/images/logo.png"
            alt="CODETT Logo"
            className="w-24 h-24 md:w-32 md:h-32 m-0"
          />
          <div className="flex items-center justify-center rounded-full">
            <div className="animate-spin rounded-full border-t-2 border-white border-solid h-5 w-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
