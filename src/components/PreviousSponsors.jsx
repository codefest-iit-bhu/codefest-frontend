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
  <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] relative">
    <img src="/previousSponsorsBox.png" alt="" className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] absolute" />
    <div className="absolute w-[164px] h-[165px] md:w-[248px] md:h-[248px] top-[17px] left-[17px] md:top-[25px] md:left-[25px] overflow-hidden flex items-center justify-center">
      <img src={src} alt="" className="w-[167px] h-[167px] md:w-[200px] md:h-[200px]" />
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
    <div className="p-6 mb-10">
      <div className="w-fit mb-10">
        <img
          src="/previousSponsors.png"
          alt=""
          className="h-[150px] object-contain"
        />
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
