import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REFRESH_TOKEN } from "../constants";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";
import { useUser } from "../context/context";
import GoogleLogo from "/google.svg";
import Background from "../backgrounds/Background";
import ReturnHome from "../components/ReturnHome";
import EmailIcon from "../assets/icons/email.png";
import PasswordIcon from "../assets/icons/password.png";
import InputWithIcon from "../components/InputWithIcon";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { isAuthenticated } = useUser();
  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get("referralCode");

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = () => {
    let endpoint = "api/v1/Oauth2/google";
    if (referralCode) endpoint += "?referralCode=" + referralCode;
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`;
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
  }, []);

  return (
    <>
      <Background image_path={"/login_signup.jpg"} />
      <ReturnHome />

      <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center">
        <div className="bg-[rgba(42,42,39,0.88)] rounded-[20px] px-3 py-2.5 shadow-inner mt-6 relative border border-[#D4AF37]/40 w-[450px]">

          <div className="flex justify-center mb-6">
            <div className="inline-flex flex-col items-center">
              <h1 className="text-3xl font-bold text-[#D4AF37] font-['Playfair_Display']">
                LOGIN
              </h1>
              <div className="mt-1 h-[2px] w-[56px] bg-[#BFA76A] rounded-full"></div>
            </div>
          </div>




          <div className="space-y-3">

            <InputWithIcon
              icon={<img src={EmailIcon} alt="" className="w-4 h-4" />}
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleCredentials}
            />

            <InputWithIcon
              icon={<img src={PasswordIcon} alt="" className="w-4 h-4" />}
              placeholder="Password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleCredentials}
            />
            <div>
              <Link
                to="/signup"
                className="block text-center text-md underline underline-offset-2
               text-[#BFAF6F] font-['Playfair_Display']"
              >
                Don&apos;t have an account? Click here
              </Link>

            </div>




            <button
              onClick={handleLogin}
              className="mx-auto block w-[220px] py-2 text-xl text-black 
             bg-[#D4AF37] 
             rounded-[20px] 
             font-['Playfair_Display'] 
             hover:bg-[#c9a634] 
             transition-colors"
            >
              LOGIN
            </button>

          </div>
        </div>

        {/* GOOGLE LOGIN */}
        <div className="mt-4">
          <div className="mt-3">
            <button
              onClick={handleGoogleLogin}
              className="mx-auto flex items-center justify-center w-[260px] py-2 px-4
               bg-[#3A3A36]
               border border-[#D4AF37]
               rounded-[20px]
               text-[#D4AF37]
               font-['Playfair_Display']
               hover:bg-[#2F2F2C]
               transition-colors"
            >
              <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>
          </div>

        </div>
      </div >
    </>
  );

}