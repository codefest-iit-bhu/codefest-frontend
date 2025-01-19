import React from "react";
import Link from "next/link";  // Correct import for Next.js Link
import { useUser } from "@/context/context";
import Background from "@/backgrounds/Background";

export default function Home() {
  const { isAuthenticated } = useUser();

  return (
    <>
      <Background image_path={"/LandingPage.svg"} />
      <div className="absolute top-[15vh] lg:top-[10vh] w-screen flex justify-center sm:px-10 px-12 sm:scale-100 scale-110">
        <img src="/codefestLogo.svg" alt="Codefest'25" />
      </div>
      <div className="overscroll-none w-screen h-screen flex flex-col justify-center items-center gap-4 sm:gap-6 overflow-hidden -mt-[5vh] sm:mt-0">
        {/* <PixelTimer /> */}
        <Link href="/home" className="w-fit h-fit">
          <img src="/exploreButton.png" alt="Explore" className="hover:scale-110 scale-75 sm:scale-100 transition-all duration-300" />
        </Link>
        {
          !isAuthenticated &&
          <Link href="/login" passHref>
            <div className="w-fit h-fit">
              <img
                src="/registerLoginButton.png"
                alt="Register / Login"
                className="hover:scale-110 scale-75 sm:scale-100 transition-all duration-300"
              />
            </div>
          </Link>
        }
        <Link href="/CA" className="w-fit h-fit">
          <img
            src="/campusAmbassdorButton.png"
            alt="Campus Ambassdor"
            className="hover:scale-110 scale-75 sm:scale-100 transition-all duration-300"
          />
        </Link>
      </div>
    </>
  );
}
