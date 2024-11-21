import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-dark-overlay p-6 gap-2 flex flex-col rounded-lg w-full max-w-md">
      <label htmlFor="username" className="label">
        Username*
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="input-field mt-2"
        />
      </label>

      <label htmlFor="password" className="label">
        Password*
        <input
          type="password"
          placeholder="Password"
          className="input-field mt-2"
        />
      </label>

      <button className="btn-primary mt-4" onClick={handleLogin}>
        LOGIN
      </button>
    </div>
  );
};

export default Login;
