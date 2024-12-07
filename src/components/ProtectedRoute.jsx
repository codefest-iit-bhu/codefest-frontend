import React, { useEffect, useState } from "react";
import { useUser } from "../context/context";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      window.location.href = "/"
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return <>{isAuthenticated && children}</>;
};

export default PrivateRoute;
