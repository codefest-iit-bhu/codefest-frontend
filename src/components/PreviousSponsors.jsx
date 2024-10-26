import React from 'react';
import aws from '../assets/Sponsors/aws.png';
import cisco from '../assets/Sponsors/cisco.png';
import mozilla from '../assets/Sponsors/mozilla1.png';
import topcoder from '../assets/Sponsors/top-coder.png';
import eligible from '../assets/Sponsors/eligible.png';
import uber from '../assets/Sponsors/uber.png';
import zebronics from '../assets/Sponsors/zebronics.png';
import grabon from '../assets/Sponsors/grab-on.png';
import hackerearth from '../assets/Sponsors/hackerearth.png';
import hackerrank from '../assets/Sponsors/hackerrank.png';

const SponsorLogo = ({ src, alt }) => (
  <div className="flex items-center justify-center p-2 border rounded-full bg-white border-border aspect-square">
    <img src={src} alt={alt} className="h-100" />
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
    <div className="p-6 bg-background rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Previous Sponsors</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mx-4">
        {sponsors.map((sponsor, index) => (
          <SponsorLogo key={index} src={sponsor.src} alt={sponsor.alt} />
        ))}
      </div>
    </div>
  );
};

export default PreviousSponsors;