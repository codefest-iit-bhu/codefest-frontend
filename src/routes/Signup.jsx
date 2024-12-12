import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";
import { useUser } from "../context/context";
import Login_Signup from "../backgrounds/Login_Signup";
import "../App.css";
import GoogleLogo from "/google.svg";

export default function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleCredentials = (e) => {
    console.log(e.target.name);
    console.log(e.target);
    console.log(e.target.value);
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Password does not match");
    } else {
      const response = await axios.post(
        "/auth/signup",
        JSON.stringify({
          name: credentials.username,
          email: credentials.email,
          password: credentials.password,
        })
      );

      if (response.status === 200) {
        toast.success("Email Verification sent");
        navigate(`/verifyEmail?email=${credentials.email}`);
      }
    }
  };

  const handleGoogleSignin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/v1/Oauth2/google`;
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
      return;
    }
  }, []);

  return (
    <>
      <Login_Signup />
      <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center">
        <div className="relative bg-purple-900 p-6 rounded-2xl shadow-lg w-[450px]">
          <div className="bg-gray-100 rounded-xl px-6 py-8 shadow-inner mt-6 relative">
            <div className="absolute -top-4 left-4 flex space-x-2">
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="relative px-4 py-1 font-bold text-black bg-gray-400 rounded-lg hover:bg-gray-500"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                className="relative px-4 py-1 font-bold text-black bg-gray-100 rounded-lg"
              >
                Sign up
              </button>
            </div>
            <div className="space-y-6">
              <div className="flex items-center">
                <label className="block text-lg font-medium text-black mb-2 w-24">
                  Name
                </label>
                <div className="pixel-corners--wrapper">
                  <input
                    type="text"
                    name="username"
                    placeholder="name"
                    value={credentials.username}
                    onChange={handleCredentials}
                    className="bg-gray-300 block flex-1 px-3 py-2 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-black pixel-corners"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="block text-lg font-medium text-black mb-2 w-24">
                  E-mail
                </label>
                <div className="pixel-corners--wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={credentials.email}
                    onChange={handleCredentials}
                    className="bg-gray-300 block flex-1 px-3 py-2 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-black pixel-corners"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="block text-lg font-medium text-black mb-2 w-24">
                  Password
                </label>
                <div className="pixel-corners--wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={credentials.password}
                    onChange={handleCredentials}
                    className="bg-gray-300 block flex-1 px-3 py-2 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-black pixel-corners"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="block text-lg font-medium text-black mb-2 w-24">
                  Confirm Password
                </label>
                <div className="pixel-corners--wrapper">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    value={credentials.confirmPassword}
                    onChange={handleCredentials}
                    className="bg-gray-300 block flex-1 px-3 py-2 border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-black pixel-corners"
                  />
                </div>
              </div>
              <Link
                to="/login"
                className="text-blue-400 text-md underline underline-offset-2"
              >
                Already have an account? Click here
              </Link>
              <button
                onClick={handleSubmit}
                className="w-full py-2 text-xl text-black bg-orange-200 rounded-full border-2 border-black hover:bg-orange-400 pixel-corners"
              >
                SIGN UP
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleGoogleSignin}
            className="bg-orange-200 flex items-center justify-center w-full py-2 px-4 text-black rounded-full border-2 border-black hover:bg-orange-400 pixel-corners"
          >
            <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
}