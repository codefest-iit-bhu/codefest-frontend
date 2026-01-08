import HeadingA from "../components/HeadingA";
import AnimatedButton from "../components/AnimatedButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN } from "../constants";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";
import PinInput from "react-pin-input";
import Background from "../backgrounds/Background";
import Login_Signup from "../backgrounds/Login_Signup";

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

      <Login_Signup />
      <div className="min-h-screen flex flex-col items-center justify-center px-4">


        <div
          className="
              w-full max-w-[450px]
              bg-[rgba(42,42,39,0.88)]
              rounded-[20px]
              px-4 py-4
              shadow-inner
              border border-[#D4AF37]/40
            "
        >
          <div className="flex justify-center mb-6">
            <div className="inline-flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-['Playfair_Display']">
                Email Verification
              </h1>
              <div className="mt-1 h-[2px] w-[56px] bg-[#BFA76A] rounded-full" />
            </div>
          </div>
          <div className="ml-4">
            If you don't find OTP, please check in spam.
          </div>
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
          <button
            onClick={handleSubmit}
            className="
                  w-full sm:w-[220px]
                  mx-auto block
                  py-3 sm:py-2
                  text-lg sm:text-xl
                  text-black
                  bg-[#D4AF37]
                  rounded-[20px]
                  font-['Playfair_Display']
                  hover:bg-[#c9a634]
                  transition-colors
                "
          >
            Verify
          </button>


        </div>
      </div>



      {/* <Login_Signup image_path={"/login_signup.webp"} />
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
      </div> */}
    </>
  );
}
