import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "./styles/Auth.css";

const AuthWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="auth-page flex font-roboto-condensed  flex-col items-center justify-center min-h-screen bg-cover"
      style={{ backgroundImage: 'url("/images/background2.png")' }}
    >
      <div className="bg-gradient-to-t from-[#545454F2] to-[#1F1F1FF2] px-40">
        <div className="flex items-center justify-center text-white space-y-8 gap-2">
          <img
            src="/images/logo.png"
            alt="CODETT Logo"
            className="w-16 h-16 md:w-16 md:h-16 -mb-8"
          />
          <div>
            <h1 className="text-[3rem] font-bruno tracking-widest leading-none m-0 md:text-3xl text-center font-bold">
              CODETT
            </h1>
            <p className="text-sm md:text-[0.7rem] font-roboto-condensed">
              COMMAND DECISION TACTICAL TRAINER
            </p>
          </div>
        </div>
        <div className="flex  mt-8 justify-center">
          <button
            onClick={() => setIsLogin(true)}
            className={`tab ${isLogin ? "active" : ""}`}
          >
            LOG IN
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`tab ${!isLogin ? "active" : ""}`}
          >
            REGISTER
          </button>
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default AuthWrapper;
