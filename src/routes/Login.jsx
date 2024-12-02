import HeadingA from "../components/HeadingA";
import EmailBox from "../components/EmailBox";
import PasswordBox from "../components/PasswordBox";
import AnimatedButton from "../components/AnimatedButton";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN } from "../constants";

//const LOGIN_URL = "/auth/login";
const LOGIN_URL =
  "https://codefest-backend-igxy.onrender.com/api/v1/auth/login";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        LOGIN_URL,
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // saving refresh token in local storage
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
        alert(response.data.message);
        navigate("/home");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
      // Refreshing the page
      window.location.reload();
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
          <HeadingA text="weee" size="2xl" />
          <EmailBox
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <PasswordBox
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <AnimatedButton text="Login >" onClick={handleSubmit} />
          <a
            href="/signup"
            className="text-gray-400 text-md underline underline-offset-2"
          >
            Dont have an account? Click here
          </a>
        </div>
      </div>
    </>
  );
}
