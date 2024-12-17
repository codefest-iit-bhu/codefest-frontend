import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SetPassword from "../components/SetPassword";
import axios from "../utils/axiosInstance";
import Background from "../backgrounds/Background";

const SetPasswordRoute = () => {
  const navigate = useNavigate();

  const handleSetPassword = async (password) => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    const response = await axios.post("/auth/set-password", {
      email,
      password,
    });

    const { token, refreshToken } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    navigate("/");
  };

  return (
    <>
      <Background image_path={"/login_signup.svg"} />
      <div className="set-password-page">
        <SetPassword onSubmit={handleSetPassword} />
      </div>
    </>
  );
};

export default SetPasswordRoute;
