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
      {isMobile ? <Background image_path={"/Home/LandingPageMobile.webp"} /> : <Background image_path={"/Home/Landing_page.webp"} />}
      <div className="overscroll-none w-screen h-screen flex flex-col justify-center items-center overflow-hidden px-6 sm:px-10">
        <div className="relative w-[98vw] max-w-[820px] sm:w-[520px] md:w-[620px] lg:w-[720px] ">
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
          <a
            href="/home"
            className="w-[65vw] sm:w-[300px] md:w-[360px] h-auto hover:scale-105 transition-all duration-300 mt-24 relative z-30"
          >
            <img
              src="/Home/ExploreBtn.webp"
              alt="Explore"
              className=""
            />
          </a>
          {
            !isAuthenticated &&
            <Link to="/login" className="relative w-fit h-fit -mb-8 sm:-mb-20 md:-mb-24">
              <img
                src="/Home/Signup.webp"
                alt="Register / Login"
                className="w-[50vw] sm:w-[230px] md:w-[280px] h-auto hover:scale-105 transition-all duration-300"
              />
            </Link>
          }
          {/* <a href="/CA" className="relative w-fit h-fit">
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
          </a> */}
        </div>
      </div>
    </>
  );
}
