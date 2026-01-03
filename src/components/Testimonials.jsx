import React from "react";
import TestimonialCard from "./TestimonialCard";

import touristImage from "../assets/Testimonial/tourist.jpeg";
import animeshpathakImage from "../assets/Testimonial/animesh-pathak.jpeg";
import rajShuklaImage from "../assets/Testimonial/raj-shukla.jpeg";
import infosecIITRImage from "../assets/Testimonial/infosec.jpeg";

const Testimonials = ({ bg, circleFrame }) => {
  
  const testimonials = [
      {
        name: "Gennady Korotkevich",
        imgAlt: "Tourist",
        imgSrc: touristImage,
        msg: "Marathon had some good problems and it was prepared very well. I loved the idea of hosting Mahamania at Topcoder!",
      },
      {
        name: "Animesh Pathak",
        imgAlt: "Animesh",
        imgSrc: animeshpathakImage,
        msg: "CodeFest is a phenomenal platform that challenges young minds to innovate and excel.",
      },
      {
        name: "Raj Shukla",
        imgAlt: "Raj",
        imgSrc: rajShuklaImage,
        msg: "I am extremely happy to get rank 1 on enigma, I never thought of this can happen.",
      },
      {
        name: "Infosec IIT R",
        imgAlt: "Infosec",
        imgSrc: infosecIITRImage,
        msg: "Some of the challenges were a bit tough others were easy. I will definitely recommend others.",
      },
    ];

  return (
    // Grid Setup: 1 column on mobile, 2 on tablet/desktop. 
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 w-full mt-4 px-2 md:px-4">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard 
          key={index} 
          testimonial={testimonial} 
          bg={bg} 
          circleFrame={circleFrame} 
        />
      ))}
    </div>
  );
};

export default Testimonials;