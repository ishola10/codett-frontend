import React from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  
  const navigate = useNavigate();
  return (
    <div className="bg-dark-overlay p-6 gap-2 flex flex-col rounded-lg w-full max-w-md">
    <label htmlFor="username" className="label">
      Username*
      <input id="username" type="text" placeholder="Username" className="input-field" />
    </label>
    <label htmlFor="email" className="label">
        Email*
        <input id="email" type="email" placeholder="Email" className="input-field" />
    </label>
    <label htmlFor="password" className="label">
      Password*
      <input id="password" type="password" placeholder="Password" className="input-field" />
    </label>
    <label htmlFor="confirm-password" className="label">
      Confirm Password*
      <input id="confirm-password" type="password" placeholder="Confirm Password" className="input-field" />
    </label>
    <div className="mt-2 flex items-center">
      <input type="checkbox" id="agreement" className="mr-2" />
      <label htmlFor="agreement" className="text-[10px] text-white">
      I agree to the processing of my personal data in accordance with the Privacy Policy
      </label>
    </div>
    <button onClick={() => navigate("/login")} className="btn-primary mt-2">REGISTER</button>
  </div>
  );
};

export default Register;
