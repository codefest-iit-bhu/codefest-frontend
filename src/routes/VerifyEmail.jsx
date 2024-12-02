import HeadingA from "../components/HeadingA";
import TextBox from "../components/TextBox";
import EmailBox from "../components/EmailBox";
import AnimatedButton from "../components/AnimatedButton";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN } from "../constants";

const VERIFY_EMAIL_URL = "/auth/verify_email";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        VERIFY_EMAIL_URL,
        JSON.stringify({
          email: email,
          otp: otp,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        // saving refresh token in local storage
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
        alert("Email verified successfully");
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
      navigate("/signup");
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
          <HeadingA text="yoooo" size="2xl" />
          <EmailBox
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextBox
            placeholder="OTP"
            name="otp"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <AnimatedButton text="Verify >" onClick={handleSubmit} />
        </div>
      </div>
    </>
  );
}
