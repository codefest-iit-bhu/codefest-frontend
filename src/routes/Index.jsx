import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/context";
import Background from "../backgrounds/Background";

export default function Home() {
  const { isAuthenticated } = useUser();
  return (
    <>
      <Background image_path={"/Landing_page_2026.svg"} />
      <div className="overscroll-none w-screen h-screen flex flex-col justify-center items-center overflow-hidden px-6 sm:px-10">
        <div className="relative w-[98vw] max-w-[820px] sm:w-[580px] md:w-[720px] lg:w-[820px]">
          <img
            src="/Codefest_logo_26.svg"
            alt="Codefest'26 logo"
            className="w-full h-auto"
          />

          <img
            src="/codefest_text.svg"
            alt="Codefest'26"
            className="absolute inset-0 m-auto -translate-y-[45%] w-[62%] sm:w-[66%] md:w-[66%] lg:w-[64%] h-auto"
          />
        </div>

        <div className="flex flex-col justify-center items-center gap-0 -mt-24 sm:-mt-32 md:-mt-40">
          <a href="/home" className="relative w-fit h-fit -mb-14 sm:-mb-16 md:-mb-18">
            <img
              src="/red_btn.svg"
              alt="Explore"
              className="w-[180px] sm:w-[240px] md:w-[260px] h-auto hover:scale-105 transition-all duration-300"
            />
            <img
              src="/EXPLORE.svg"
              alt="Explore Text"
              className="absolute inset-0 m-auto w-[45%] h-auto pointer-events-none"
            />
          </a>
          {
            !isAuthenticated &&
            <Link to="/login" className="relative w-fit h-fit -mb-16 sm:-mb-20 md:-mb-24">
              <img
                src="/red_btn.svg"
                alt="Register / Login"
                className="w-[220px] sm:w-[300px] md:w-[340px] h-auto hover:scale-105 transition-all duration-300"
              />
              <img
                src="/LOGIN.svg"
                alt="Login Text"
                className="absolute inset-0 m-auto w-[50%] h-auto pointer-events-none"
              />
            </Link>
          }
          <a href="/CA" className="relative w-fit h-fit">
            <img
              src="/red_btn.svg"
              alt="Campus Ambassdor"
              className="w-[260px] sm:w-[340px] md:w-[380px] h-auto hover:scale-105 transition-all duration-300"
            />
            <img
              src="/CA.svg"
              alt="Campus Ambassador Text"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-auto pointer-events-none"
            />
          </a>
        </div>
      </div>
    </>
  );
}
