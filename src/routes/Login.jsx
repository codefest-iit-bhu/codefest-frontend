import React from 'react';
import HeadingA from "../components/HeadingA";
import EmailBox from "../components/EmailBox";
import PasswordBox from "../components/PasswordBox";
import AnimatedButton from "../components/AnimatedButton";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN } from "../constants";
import toast from "react-hot-toast";
import TextBox from '../components/TextBox';

const LOGIN_URL = "/auth/login";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = 'https://codefest-backend-igxy.onrender.com/api/v1/Oauth2/google';
  };

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="rounded-md flex flex-col items-center py-4 w-[500px] backdrop-blur-[2px]">
        <HeadingA text="weee" size="2xl" />
        <TextBox placeholder="Username" />
        <TextBox placeholder="Password" />
        <AnimatedButton text="Login >" />
        <a href="/signup" className="text-gray-400 text-md underline underline-offset-2">Don't have an account? Click here</a>
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
