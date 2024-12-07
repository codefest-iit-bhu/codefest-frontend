import HeadingA from "../components/HeadingA";
import TextBox from "../components/TextBox";
import PasswordBox from "../components/PasswordBox";
import EmailBox from "../components/EmailBox";
import AnimatedButton from "../components/AnimatedButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";
import axios from "../utils/axiosInstance";
import { useUser } from "../context/context";

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

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
      return;
    }
  }, [])

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
          <HeadingA text="eyyy" size="2xl" />
          <TextBox
            placeholder="Username"
            name="username"
            value={credentials.username}
            onChange={handleCredentials}
          />
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
          <PasswordBox
            placeholder="Confirm Password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleCredentials}
          />
          <AnimatedButton text="Signup >" onClick={handleSubmit} />
          <Link
            to="/login"
            className="text-gray-400 text-md underline underline-offset-2"
          >
            Already have an account? Click here
          </Link>
        </div>
      </div>
    </>
  );
}
