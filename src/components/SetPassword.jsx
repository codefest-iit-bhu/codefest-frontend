import React, { useState } from "react";
import AnimatedButton from "../components/AnimatedButton";
import HeadingA from "../components/HeadingA";
import PasswordInput from "../components/PasswordBox";
import Login_Signup from "../backgrounds/Login_Signup"
import InputWithIcon from "./InputWithIcon";
import PasswordIcon from "../assets/icons/password.png";

const SetPassword = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");
    onSubmit(password);
  };

  return (
  <div className="relative min-h-screen overflow-hidden">
    {/* Background */}
    <Login_Signup />

    {/* Foreground Content */}
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
      <div
        className="
          w-full max-w-[450px]
          bg-[rgba(42,42,39,0.88)]
          rounded-[20px]
          px-4 py-4
          shadow-inner
          border border-[#D4AF37]/40
        "
      >
        <div className="flex justify-center mb-6">
          <div className="inline-flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-['Playfair_Display']">
              Create Password
            </h1>
            <div className="mt-1 h-[2px] w-[56px] bg-[#BFA76A] rounded-full" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithIcon
            icon={<img src={PasswordIcon} alt="" className="w-4 h-4" />}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <InputWithIcon
            icon={<img src={PasswordIcon} alt="" className="w-4 h-4" />}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

          <button
            type="submit"
            className="
              w-full sm:w-[220px]
              mx-auto block
              py-3 sm:py-2
              text-lg sm:text-xl
              text-black
              bg-[#D4AF37]
              rounded-[20px]
              font-['Playfair_Display']
              hover:bg-[#c9a634]
              transition-colors
            "
          >
            Create Password
          </button>
        </form>
      </div>
    </div>
  </div>

  );
};

export default SetPassword;
