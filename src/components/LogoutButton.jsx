import React from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const logoutHandler = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    await axios.delete("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Refresh-Token": refreshToken,
      },
    });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/"
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
