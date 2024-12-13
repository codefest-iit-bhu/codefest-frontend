import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/context";
import Background from "../backgrounds/Background";

export default function Home() {
  const { isAuthenticated } = useUser()
  return (
    <>
      <Background image_path={"/LandingPage.svg"} />
      <div className="absolute top-[15vh] lg:top-[10vh] w-screen flex justify-center sm:px-10 px-12 sm:scale-100 scale-110">
        <img src="/codefestLogo.svg" alt="" />
      </div>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-4 sm:gap-8 overflow-hidden -mt-[5vh] sm:mt-0">
        <a href="/home" className="w-fit h-fit">
          <img src="/exploreButton.png" alt="" className="hover:scale-110 scale-75 sm:scale-100" />
        </a>
        {
          !isAuthenticated &&
          <Link to="/login" className="w-fit h-fit">
            <img
              src="/registerLoginButton.png"
              alt=""
              className="hover:scale-110 scale-75 sm:scale-100"
            />
          </Link>
        }
        <a href="/CA" className="w-fit h-fit">
          <img
            src="/campusAmbassdorButton.png"
            alt=""
            className="hover:scale-110 scale-75 sm:scale-100"
          />
        </a>
      </div>
    </>
  );
}
