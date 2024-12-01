import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../services/appConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [agreement, setAgreement] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async () => {
    const { username, email, password, name } = formData;

    if (!agreement) {
      setError("You must agree to the Privacy Policy");
      return;
    }

    try {
      await axios.post(API_ROUTES.REGISTER, { username, email, password, name });
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-dark-overlay py-4 px-6 gap-2 flex flex-col rounded-lg w-full max-w-md">
      <label htmlFor="name" className="label">
        Name*
        <input
          id="name"
          type="text"
          placeholder="Name"
          className="input-field"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="username" className="label">
        Username*
        <input
          id="username"
          type="text"
          placeholder="Username"
          className="input-field"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email" className="label">
        Email*
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="input-field"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="label">
        Password*
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="input-field"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <div className="mt-2 flex items-center">
        <input
          type="checkbox"
          id="agreement"
          className="mr-2"
          checked={agreement}
          onChange={() => setAgreement((prev) => !prev)}
        />
        <label htmlFor="agreement" className="text-[10px] text-white">
          I agree to the processing of my personal data in accordance with the Privacy Policy
        </label>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {success && <div className="text-green-500 mt-2">{success}</div>}
      <button onClick={handleRegister} className="btn-primary mt-2">
        REGISTER
      </button>
    </div>
  );
};

export default Register;