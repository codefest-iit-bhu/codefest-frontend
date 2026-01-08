import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Whoarewe from "../components/Whoarewe";
import Lookback from "../components/Lookback";
import Testimonials from "../components/Testimonials";
import PreviousSponsors from "../components/PreviousSponsors";
import Footer from "../components/Footer";

// Assets
import bgImg from "../assets/home/home-bg.webp";
import crownImg from "../assets/home/crown.webp";
import maskImg from "../assets/home/mask.webp";
import heelsImg from "../assets/home/heels.webp";
import arrowImg from "../assets/home/arrow.webp";
import letterImg from "../assets/home/letter.webp";

import lookbackFrame from "../assets/home/lookback-frame.webp";
import testimonialBg from "../assets/home/testi-bg.webp";
import testimonialCircle from "../assets/home/testi-circle.webp";
import sponsorCircle from "../assets/home/sponsor-circle.webp";



export default function Home() {

  const [showScrollArrow, setShowScrollArrow] = useState(true);

  //SCROLL HANDLER FUNCTION
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // If we are within 10px of the bottom, hide the arrow
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setShowScrollArrow(false);
    } else {
      setShowScrollArrow(true);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="relative w-full min-h-screen overflow-x-hidden text-[#e3dac9] font-body-serif bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none h-full w-full" />

        <div className="relative z-10">

          {/* === HERO SECTION === */}
          <div className="flex flex-col items-center justify-start w-full px-4 pt-[12vh] pb-10 min-h-screen">

            {/* Title Section */}
            <div className="relative w-full max-w-[90vw] flex justify-center items-center mb-[5vh] z-20">
              <img
                src={crownImg}
                alt="Crown"
                className="absolute -top-[50%] left-[15%] md:left-[22%] w-[15%] md:w-[8%] drop-shadow-2xl -rotate-12"
              />

              <h1 className="text-5xl sm:text-7xl md:text-9xl font-engagement font-normal text-[#C5A059] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] tracking-widest text-center">
                CODEFEST'26
              </h1>
            </div>

            {/* Letter Section */}
            <div className="relative w-full max-w-full md:h-[75vh] flex items-center justify-center my-4 md:my-0">

              {/* Heels */}
              <img
                src={heelsImg}
                alt="Heels"
                className="absolute left-[-8%] bottom-[-5%] md:left-[-2%] md:bottom-[-5%] w-[45%] md:w-[30%] z-20 drop-shadow-xl"
              />

              {/* Mask */}
              <img
                src={maskImg}
                alt="Mask"
                className="absolute right-[-8%] top-[-5%] md:right-[-2%] md:top-[-5%] w-[45%] md:w-[30%] rotate-12 z-20 drop-shadow-xl"
              />

              {/* Letter Image */}
              <div className="relative md:absolute inset-0 flex items-center justify-center z-0">
                <img
                  src={letterImg}
                  className="rotate-0 md:rotate-90 w-[85vw] md:w-auto md:h-[60vw] max-w-none opacity-95 drop-shadow-2xl transition-all duration-500"
                  alt="Parchment"
                />

                {/* Text Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">

                  {/* Safe Zone Container */}
                  <div className="
                          relative
                          w-[70%] h-[65%] 
                          md:w-[45%] md:h-[70%] 
                          overflow-hidden
                        ">


                    {/* SCROLLABLE TEXT */}
                    <div
                      className="w-full h-full overflow-y-auto no-scrollbar pb-10 px-4 rounded-lg shadow-sm backdrop-blur-[1px]"
                      onScroll={handleScroll}
                    >
                      <div className="w-full !text-left text-[#3e2723] font-playball text-xs md:text-xl italic leading-relaxed md:leading-loose tracking-wide">
                        <Whoarewe />
                      </div>
                    </div>

                    {/* 5. DYNAMIC ARROW INDICATOR */}
                    <div
                      className={`absolute bottom-1 right-1 transition-opacity duration-300 pointer-events-none ${showScrollArrow ? "opacity-70" : "opacity-0"
                        }`}
                    >
                      <img
                        src={arrowImg}
                        alt="Scroll Down"
                        className="w-8 md:w-12 animate-bounce opacity-80 drop-shadow-sm"
                      />
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* === OTHER SECTIONS === */}
          <div className="flex flex-col w-full gap-24 pb-16 px-4 md:px-[5%]">

            {/* Lookback */}
            <div className="w-full">
              <h2 className="text-4xl md:text-6xl text-[#FFD700] mb-12 border-b border-[#C5A059]/40 inline-block pb-2 tracking-wide font-namdhinggo font-bold pl-2 drop-shadow-md">
                LOOKBACK
              </h2>
              <Lookback frame={lookbackFrame} />
            </div>

            {/* Testimonials */}
            <div className="w-full">
              <h2 className="text-4xl md:text-6xl text-[#FFD700] mb-12 border-b border-[#C5A059]/40 inline-block pb-2 tracking-wide font-namdhinggo font-bold pl-2 drop-shadow-md">
                TESTIMONIALS
              </h2>
              <Testimonials
                bg={testimonialBg}
                circleFrame={testimonialCircle}
              />
            </div>

            {/* Previous Sponsors */}
            <div className="w-full mb-10">
              <h2 className="text-4xl md:text-6xl text-[#FFD700] mb-12 border-b border-[#C5A059]/40 inline-block pb-2 tracking-wide font-namdhinggo font-bold pl-2 drop-shadow-md">
                PREVIOUS SPONSORS
              </h2>
              <PreviousSponsors frame={sponsorCircle} />
            </div>

          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⠿⠟⠛⠻⣿⠆⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣆⣀⣀⠀⣿⠂⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠻⣿⣿⣿⠅⠛⠋⠈⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢼⣿⣿⣿⣃⠠⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣟⡿⠃⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣛⣛⣫⡄⠀⢸⣦⣀⠀⠀⠀⠀
// ⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⡆⠸⣿⣿⣿⡷⠂⠨⣿⣿⣿⣿⣶⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠀⣤⣾⣿⣿⣿⣿⡇⢀⣿⡿⠋⠁⢀⡶⠪⣉⢸⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⡏⢸⣿⣷⣿⣿⣷⣦⡙⣿⣿⣿⣿⣿⡏⠀⠀
// ⠀⠀⠀⠈⣿⣿⣿⣿⣿⣿⣿⣿⣇⢸⣿⣿⣿⣿⣿⣷⣦⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀
// ⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
// ⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀
// ⠀⠀⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀
// ⠀⠀⠀⢹⣿⣵⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀