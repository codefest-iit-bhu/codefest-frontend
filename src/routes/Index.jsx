import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../context/context";
import Background from "../backgrounds/Background";

export default function Home() {
  const { isAuthenticated } = useUser();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check screen size on initial render
    handleResize();

    // Add event listener to update on resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <Background image_path={"/Home/LandingPageMobile.webp"} />
      ) : (
        <Background image_path={"/Home/Landing_page.webp"} />
      )}
      <div className="overscroll-none w-screen h-screen flex flex-col justify-center items-center overflow-hidden px-6 sm:px-10">
        <div className="relative w-[98vw] max-w-[820px] sm:w-[520px] md:w-[620px] lg:w-[720px] ">
          <img
            src="/Home/CodefestLogo.webp"
            alt="Codefest'26 logo"
            className="w-full"
          />
        </div>

        {/* <div className="flex flex-col justify-center items-center gap-0 -mt-24 sm:-mt-32 md:-mt-40"> */}
        <div className="flex items-center">
          <Link to="/home" className="h-auto">
            <img
              src="/Home/ExploreBtn.webp"
              alt="Explore"
              className="w-[65vw] sm:w-[300px] md:w-[390px] h-auto hover:scale-105 transition-all duration-300 mt-5 mb-5  relative z-30"
            />
          </Link>
        </div>
        <div>
            <Link
              to="/CA"
              className="relative w-fit h-fit -mb-8 sm:-mb-20 md:-mb-24"
            >
              <img
                src="/Home/CABtn.webp"
                alt="CA"
                className="w-[58vw] sm:w-[260px] md:w-[320px] h-auto hover:scale-105 transition-all duration-300 mb-5"
              />
            </Link>
        </div>
        <div>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="relative w-fit h-fit -mb-8 sm:-mb-20 md:-mb-24"
            >
              <img
                src="/Home/Signup.webp"
                alt="Register / Login"
                className="w-[55vw] sm:w-[230px] md:w-[270px] h-auto hover:scale-105 transition-all duration-300"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}