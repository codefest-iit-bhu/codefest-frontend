import { useState, useEffect } from "react";
import InputWithIcon from "../components/InputWithIcon";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";
import { useUser } from "../context/context";
import Login_Signup from "../backgrounds/Login_Signup";
import "../App.css";
import GoogleLogo from "/google.svg";
import ReturnHome from "../components/ReturnHome";
import Loader from "../components/Loader";
import PersonIcon from "../assets/icons/person.png";
import EmailIcon from "../assets/icons/email.png";
import PasswordIcon from "../assets/icons/password.png";


export default function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get("referralCode");
  const [loading, setLoading] = useState(false)
  let login_endpoint = "/login"
  if (referralCode) {
    login_endpoint += "?referralCode=" + referralCode
  }

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        setLoading(true);
        const response = await axios.post(
          "/auth/signup",
          JSON.stringify({
            name: credentials.username,
            email: credentials.email,
            password: credentials.password,
            referralCode
          })
        );
        setLoading(false);
        if (response.status === 200) {
          toast.success("Email Verification sent");
          navigate(`/verifyEmail?email=${credentials.email}`);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const handleGoogleSignin = () => {
    let endpoint = "api/v1/Oauth2/google";
    if (referralCode) endpoint += "?referralCode=" + referralCode;
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`;
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
      <ReturnHome />
      {
        loading ? <Loader /> :
          <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center">
            <div className="bg-[rgba(42,42,39,0.88)] rounded-[20px] px-4 py-4 shadow-inner mt-6 relative border border-[#D4AF37]/40 w-[450px]">

              <div className="flex justify-center mb-6">
                <div className="inline-flex flex-col items-center">
                  <h1 className="text-3xl font-bold text-[#D4AF37] font-['Playfair_Display']">
                    SIGN UP
                  </h1>
                  <div className="mt-1 h-[2px] w-[56px] bg-[#BFA76A] rounded-full"></div>
                </div>
              </div>

             
 


              <div className="space-y-4">


                <InputWithIcon
                  icon={<img src={PersonIcon} alt="" className="w-4 h-4" />}
                  placeholder="Name"
                  name="username"
                  value={credentials.username}
                  onChange={handleCredentials}
                />

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


                <InputWithIcon
                  icon={<img src={PasswordIcon} alt="" className="w-4 h-4" />}
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={handleCredentials}
                />


                <Link
                  to={login_endpoint}
                  className="block text-center text-md underline underline-offset-2 
             text-[#BFAF6F] font-['Playfair_Display']"
                >
                  Already have an account? Click here
                </Link>
                <button
                  onClick={handleSubmit}
                  className="mx-auto block w-[220px] py-2 text-xl text-black 
             bg-[#D4AF37] 
             rounded-[20px] 
             font-['Playfair_Display'] 
             hover:bg-[#c9a634] 
             transition-colors"
                >
                  SIGN UP
                </button>


              </div>
            </div>

            <div className="mt-3">
              <button
                onClick={handleGoogleSignin}
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

      }
    </>
  );
}