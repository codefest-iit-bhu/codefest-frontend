import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { AxiosResponse } from 'axios';

const UserContext = createContext < UserContextType | undefined > (undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState < User | null > (null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get("/auth/me", {
            "headers": { "Authorization": `Bearer ${token}` },
          });
          if (res && res.data)
            setUser(res.data);
          else {
            localStorage.removeItem("token")
            setUser({})
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser({});
        }
      } else {
        setUser({});
      }
    };
    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
