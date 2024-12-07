import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BackendRedirection = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const refreshToken = urlParams.get("refreshToken");
    if (token && refreshToken) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      window.location.href = "/"
      // navigate("/")
    } else {
      window.location.href = "/login"
      // navigate("/login")
    }
  }, []);
  return <div></div>;
};

export default BackendRedirection;
