import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      setIsLoggedIn(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return { isLoggedIn, handleLogout };
};
