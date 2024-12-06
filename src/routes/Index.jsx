import React, { useState, useEffect } from "react";
import GlitchText from "../components/GlitchedCodeFest";
import Link from "../components/Link";
import { useAuth } from "../utils/islogged";
import LogoutButton from "../components/LogoutButton";
import Background1 from "../backgrounds/Background1";

export default function Home() {
  const { isLoggedIn, handleLogout } = useAuth();
  return (
    <>
      <Background1 />
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <a href="/home"className="w-fit h-fit">
        <img src="/exploreButton.png" alt="" className="hover:scale-110"/>
      </a>
      <a href="#"className="w-fit h-fit">
        <img src="/registerLoginButton.png" alt="" className="hover:scale-110"/>
      </a>
      <a href="#"className="w-fit h-fit">
        <img src="/campusAmbassdorButton.png" alt="" className="hover:scale-110"/>
      </a>
      </div>
    </>
  );
}
