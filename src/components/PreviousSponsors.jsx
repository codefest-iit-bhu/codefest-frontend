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

const SponsorLogo = ({ src, alt }) => (
  <div className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] relative">
    <img
      src="/previousSponsorsBox.svg"
      alt=""
      className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] absolute z-[2]"
    />
    <div className="bg-white rounded-full absolute w-[125px] h-[125px] md:w-[249px] md:h-[249px] top-[13px] left-[13px] md:top-[25px] md:left-[25px] overflow-hidden flex items-center justify-center">
      <img
        src={src}
        alt=""
        className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
      />
    </div>
  </div>
);

const PreviousSponsors = () => {
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
    <div className="sm:p-6 mb-10">
      {/* <div className="w-fit mb-10">
        <img
          src="/previousSponsors.png"
          alt=""
          className="h-[150px] object-contain"
        />
      </div> */}
      <div className="relative m-10">
        <div className="text-5xl md:text-7xl p-10 relative text-white z-[1]">
          PREVIOUS SPONSORS
        </div>
        <div className="text-5xl md:text-7xl p-10 absolute top-0 translate-x-[-3px] translate-y-[-3px] z-[0.5] text-gray-500">
          PREVIOUS SPONSORS
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {sponsors.map((sponsor, index) => (
          <SponsorLogo key={index} src={sponsor.src} alt={sponsor.alt} />
        ))}
      </div>
    </div>
  );
};

export default PreviousSponsors;
