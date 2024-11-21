import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Dashboard: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const imagesToLoad = [
      "/images/background2.png",
      "/images/background3.jpg",
      "/images/background4.jpg",
      "/images/background5.jpg",
      "/images/battle-bg.png",
      "/images/battle-bg2.png",
      "/images/battle-bg3.png",
      "/images/icons/vehicle.png",
      "/images/icons/ship.png",
      "/images/icons/jet.png",
      "/images/icons/Union.png",
      "/images/icons/Prestige-Logo.png",
    ];

    const preloadImages = imagesToLoad.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    Promise.all(preloadImages).then(() => {
      setIsPageLoaded(true);
    });
  }, []);

  const handleOperationClick = (section: string) => {
    setSelectedSection((prev) => (prev === section ? null : section));
  };

  const handleImageClick = (backgroundImage: string) => {
    if (
      selectedSection === "quick-Dashboard" ||
      selectedSection === "squad-vs-squad"
    ) {
      navigate("/battlespace", { state: { backgroundImage } });
    }
  };

  const getBackgroundImage = () => {
    const backgroundImages: Record<string, string> = {
      "joint-operation": "url('/images/background4.jpg')",
      "squad-vs-squad": "url('/images/background3.jpg')",
      training: "url('/images/background5.jpg')",
    };
    return (
      backgroundImages[selectedSection!] || "url('/images/background2.png')"
    );
  };

  const scores = Array.from({ length: 30 }, () =>
    Math.floor(Math.random() * 200)
  );
  const scoresPerPage = 6;
  const totalPages = Math.ceil(scores.length / scoresPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * scoresPerPage;
  const paginatedScores = scores.slice(startIndex, startIndex + scoresPerPage);

  return (
    <>
      {!isPageLoaded ? (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
          <p className="mt-4">Loading...</p>
        </div>
      ) : (
        <div
          className="flex flex-col min-h-screen text-white bg-cover bg-center font-roboto-condensed transition-all duration-500"
          style={{ backgroundImage: getBackgroundImage() }}
        >
          <Header />

          <div className="flex flex-col md:flex-row flex-grow justify-between p-4 md:p-6">
            <div className="flex flex-col w-full md:w-1/4 space-y-4">
              {[
                {
                  key: "quick-Dashboard",
                  label: "SOLO SIMULATION",
                  description: "Choose an operation type to simulate.",
                },
                {
                  key: "joint-operation",
                  label: "JOINT OPERATION",
                  description: "Simulate Air, Navy, and Land Operations",
                },
                {
                  key: "squad-vs-squad",
                  label: "TWO SIDE COMBAT",
                  description: "Choose an operation type to simulate.",
                },
                {
                  key: "training",
                  label: "TRAINING",
                  description: "Practice your operation strategies",
                },
              ].map(({ key, label, description }) => (
                <section
                  key={key}
                  className={`bg-[#1D1D1DF2] shadow cursor-pointer transition-all duration-300 ${
                    selectedSection === key
                      ? "bg-[#1E293DF2] border-t-2 border-[#2470FD]"
                      : ""
                  }`}
                  onClick={() => handleOperationClick(key)}
                >
                  <div className="text-x font-semibold text-[#9DA6A0] py-1 px-3">
                    <h2>{label}</h2>
                    {selectedSection === key && (
                      <p className="text-sm pt-2 text-white transition-opacity duration-300 opacity-100">
                        {description}
                      </p>
                    )}
                  </div>

                  {(selectedSection === "quick-Dashboard" ||
                    selectedSection === "squad-vs-squad") &&
                    selectedSection === key && (
                      <div className="py-2 bg-[#0D0E10F2] px-3 transition-opacity duration-300 opacity-100">
                        <p className="text-sm">{label} Selected</p>
                        <div className="flex gap-2 pt-1">
                          {[
                            { icon: "vehicle", bg: "/images/battle-bg.png" },
                            { icon: "ship", bg: "/images/battle-bg2.png" },
                            { icon: "jet", bg: "/images/battle-bg3.png" },
                          ].map(({ icon, bg }) => (
                            <button
                              key={icon}
                              className="p-2 hover:border border-white"
                              onClick={() => handleImageClick(bg)}
                            >
                              <img
                                src={`/images/icons/${icon}.png`}
                                alt={`${icon} icon`}
                                className="w-7 h-7"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </section>
              ))}
            </div>

            <div className="w-full md:w-[30%] flex flex-col shadow space-y-2">
              <h2 className="text-xl font-semibold px-3 mb-1 py-1 bg-[#141414F2] text-[#9DA6A0]">
                Scoreboard
              </h2>
              <div className="flex items-center justify-center gap-2 px-3 py-1 bg-[#000000D9] text-white">
                <img
                  src="/images/icons/Union.png"
                  alt="union"
                  className="w-3 h-5"
                />
                <span className="text-xs">20 Users Online</span>
              </div>
              <div className="overflow-y-auto max-h-72 flex flex-col gap-2">
                {paginatedScores.map((score, i) => (
                  <div
                    key={i}
                    className="flex items-center border-l-2 border-[#2470FD] bg-[#191A1D]"
                  >
                    <div className="flex items-center gap-1 w-24 bg-black p-2">
                      <img
                        src="/images/icons/Prestige-Logo.png"
                        alt="prestige"
                        className="w-4 h-4"
                      />
                      <span className="text-xs">Score: {score}</span>
                    </div>
                    <span className="text-xs px-3 py-1 text-[#2470FD] border-r border-white">
                      SQUAD {startIndex + i + 1}
                    </span>
                    <span className="text-xs p-2">Member Username</span>
                  </div>
                ))}
              </div>

              <section className="pagination md:w-36 items-center bg-black text-center my-0 mx-auto flex justify-between p-2">
                <button
                  className="text-xs text-gray-500"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <span className="text-xs">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="text-xs text-gray-500"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </section>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};

export default Dashboard;
