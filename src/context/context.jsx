import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../utils/axiosInstance";

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const res = await axios.get("/user/me", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res && res.data) {
              setIsAuthenticated(!!res.data._id);
              setUser(res.data);
            } else {
              localStorage.removeItem("token");
              setUser({});
            }
          } catch (error) {
            console.error("Error fetching user:", error);
            setUser({});
          }
        } else {
          setUser({});
        }
      } catch (error) {
        setUser({});
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
