import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import SetPassword from "../components/SetPassword";

const SetPasswordRoute = () => {
  const navigate = useNavigate();
  
  const handleSetPassword = async (password) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");

      const response = await axios.post("/auth/set-password", {
        email,
        password,
      });

      const { token, refreshToken } = response.data
      localStorage.setItem("token", token)
      localStorage.setItem("refreshToken", refreshToken)
      navigate("/")
    } catch (error) {
      console.error("Failed to set password:", error.response?.data || error.message);
    }
  };

  React.useEffect(() => {
    if (window.location.search.includes("refreshToken")) {
      window.location.href = "/main"
    }
  }, []);

  return (
    <div className="set-password-page">
      <SetPassword onSubmit={handleSetPassword} />
    </div>
  );
};

export default SetPasswordRoute;
