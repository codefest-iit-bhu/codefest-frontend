import React, { useEffect } from "react";
import { useUser } from "../context/context";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user && Object.keys(user).length === 0) {
      window.location.href = "/login"
    }
  }, [user]);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return <>{Object.keys(user).length > 0 && children}</>;
};

export default PrivateRoute;
