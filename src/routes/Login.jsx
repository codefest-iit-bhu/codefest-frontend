import React, { useEffect } from "react";
import HeadingA from "../components/HeadingA";
import EmailBox from "../components/EmailBox";
import PasswordBox from "../components/PasswordBox";
import AnimatedButton from "../components/AnimatedButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL, REFRESH_TOKEN } from "../constants";
import toast from "react-hot-toast";
import TextBox from "../components/TextBox";
import axios from "../utils/axiosInstance";
import { useUser } from "../context/context";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { isAuthenticated } = useUser();

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/Oauth2/google`;
  };

  const handleLogin = async () => {
    const response = await axios.post(
      "/auth/login",
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );

    if (response.status === 200) {
      const { refreshToken, token } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      toast.success("Login successful");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
      return;
    }
  }, [])

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
        <HeadingA text="weee" size="2xl" />
        <EmailBox
          placeholder="Email"
          name="email"
          value={credentials.email}
          onChange={handleCredentials}
        />
        <PasswordBox
          placeholder="Password"
          name="password"
          value={credentials.password}
          onChange={handleCredentials}
        />
        <AnimatedButton text="Login >" onClick={handleLogin} />
        <Link
          to="/signup"
          className="text-gray-400 text-md underline underline-offset-2"
        >
          Don't have an account? Click here
        </Link>
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
