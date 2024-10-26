import React from 'react';
import TestimonialCard from './TestimonialCard';
import touristImage from '../assets/Testimonial/tourist.jpeg';
import rajShuklaImage from '../assets/Testimonial/raj-shukla.jpeg';
import infosecIITRImage from '../assets/Testimonial/infosec.jpeg';


const Testimonials = () => {
  const testimonials = [
    {
      name: "Gennady Korotkevich (Tourist)",
      imgAlt: "Gennady Korotkevich (Tourist) Profile",
      imgSrc: touristImage,
      msg: "Marathon had some good problems and it was prepared very well. I loved the idea of hosting Mahamania at Topcoder! The problems were interesting too. Perplexed had some nice problems as well. Overall I enjoyed all three events -- thanks a lot!",
    },
    {
      name: "Raj Shukla",
      imgAlt: "Raj Shukla Profile",
      imgSrc: rajShuklaImage,
      msg: "Thanks, thanks for organizing such amazing competitions. I really enjoy spending time on CodeFest hackathons. This will help in my career growth as well. I am extremely happy to get rank 1 on enigma, I never thought of this can happen.",
    },
    {
      name: "Infosec IIT R",
      imgAlt: "Infosec IIT R Profile",
      imgSrc: infosecIITRImage,
      msg: "I feel that the competition was challenging. Some of the challenges were a bit tough others were easy. I will definitely recommend others to take part in this CTF and also encourage organizers to conduct such events more often.",
    }
  ];

  return (
    <div className="w-full px-6 py-12 bg-background flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-center text-primary mb-10 font-serif">Testimonials</h2>
      <div className="space-y-12 w-full max-w-3xl">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} isReversed={index % 2 !== 0} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
