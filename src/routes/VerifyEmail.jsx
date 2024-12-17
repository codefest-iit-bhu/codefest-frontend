import HeadingA from "../components/HeadingA";
import TextBox from "../components/TextBox";
import EmailBox from "../components/EmailBox";
import AnimatedButton from "../components/AnimatedButton";
import api from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN } from "../constants";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";
import PinInput from "react-pin-input";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const email = urlSearchParams.get("email");
    try {
      const response = await axios.post(
        "/auth/verify_email",
        JSON.stringify({
          email,
          otp: otp,
        })
      );
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
        toast.success("Email verified successfully");
        navigate("/");
      }
    } catch (error) {
      setOtp("")
    }
  };

  return (
    <>
      <Background image_path={"/login_signup.svg"} />
      <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-gray-600">
        <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
          <HeadingA text="Email Verification" size="2xl" />
          <div>If you don't find OTP, please check in spam.</div>
          <PinInput
            length={6}
            focus
            type="numeric"
            inputMode="text"
            onChange={(value) => setOtp(value)}
            onComplete={(value) => setOtp(value)}
            style={{ padding: '10px' }}
            inputStyle={{
              borderColor: 'gray',
              borderRadius: '5px',
              margin: '5px',
              width: '50px',
              height: '50px',
              textAlign: 'center',
              textDecorationColor: 'black'
            }}
          />
          <AnimatedButton text="Verify >" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}
