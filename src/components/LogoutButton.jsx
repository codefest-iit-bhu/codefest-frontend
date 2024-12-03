import React from "react";
import { useAuth } from "../utils/islogged";

const LogoutButton = () => {
  const { handleLogout } = useAuth();

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
