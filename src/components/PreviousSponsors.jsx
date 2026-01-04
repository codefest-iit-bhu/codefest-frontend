import React from "react";
import aws from "../assets/Sponsors/aws.png";
import cisco from "../assets/Sponsors/cisco.png";
import mozilla from "../assets/Sponsors/mozilla1.png";
import topcoder from "../assets/Sponsors/top-coder.png";
import eligible from "../assets/Sponsors/eligible.png";
import uber from "../assets/Sponsors/uber.png";
import zebronics from "../assets/Sponsors/zebronics.png";
import grabon from "../assets/Sponsors/grab-on.png";
import hackerearth from "../assets/Sponsors/hackerearth.png";
import hackerrank from "../assets/Sponsors/hackerrank.png";

const PreviousSponsors = ({ frame }) => {
  const sponsors = [
    { src: aws, alt: "AWS logo" },
    { src: cisco, alt: "CISCO logo" },
    { src: mozilla, alt: "Mozilla logo" },
    { src: topcoder, alt: "Topcoder logo" },
    { src: eligible, alt: "Eligible logo" },
    { src: uber, alt: "Uber logo" },
    { src: zebronics, alt: "Zebronics logo" },
    { src: grabon, alt: "GrabOn logo" },
    { src: hackerearth, alt: "Hackerearth logo" },
    { src: hackerrank, alt: "HackerRank logo" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-8 mb-10">
      {sponsors.map((sponsor, index) => (
        <div 
          key={index} 
          className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          
          {/* 1. THE SPONSOR CIRCLE FRAME */}
          <img
            src={frame}
            alt="Sponsor Frame"
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-20"
          />

          {/* 2. THE LOGO */}
          <div className="w-[65%] h-[65%] bg-white rounded-full flex items-center justify-center overflow-hidden z-10 shadow-inner">
            <img
              src={sponsor.src}
              alt={sponsor.alt}
              className="w-[80%] object-contain"
            />
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default PreviousSponsors;