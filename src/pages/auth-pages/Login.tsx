import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../services/appConfig";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(API_ROUTES.LOGIN, { username, password });
      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data?.message || "Login failed");
      } else {
        setError("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label htmlFor="password" className="label">
        Password*
        <input
          type="password"
          placeholder="Password"
          className="input-field mt-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {error && <div className="text-red-500 mt-2">{error}</div>}

      <button className="btn-primary mt-4" onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Logging in..." : "LOGIN"}  
      </button>
    </div>
  );
};

export default Login;
