import React, { useState } from "react";
import AnimatedButton from "../components/AnimatedButton";
import HeadingA from "../components/HeadingA";
import PasswordInput from "../components/PasswordBox";

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
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
        <HeadingA text="Create your Password" size="2xl" />
        <form
          onSubmit={handleSubmit}
          className="text-2xl flex flex-col items-center font-semibold text-center text-gray-800 dark:text-gray-200 mb-6"
        >
          <PasswordInput
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <PasswordInput
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          <AnimatedButton text="Create Password >" type="Submit" />
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
