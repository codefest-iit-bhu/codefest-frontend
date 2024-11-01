import React from 'react'

const TestimonialCard = ({ testimonial, isReversed }) => {
    return (
      <div className={`relative flex ${isReversed ? "md:flex-row-reverse" : ""} items-start`}>
        <img
          alt={testimonial.imgAlt}
          src={testimonial.imgSrc}
          className={`w-20 h-20 rounded-full shadow-lg transform transition-transform hover:scale-105 absolute z-10 ${isReversed ? "top-0 -right-6" : "top-0 -left-6"}`}
        />
        <div className="flex-1 p-8 bg-gray-300 rounded-lg shadow-lg ml-10 mr-10 mt-6 transform transition-transform hover:scale-105 hover:shadow-xl">
          <div className="text-xl font-semibold text-black font-serif mb-2">{testimonial.name}</div>
          <p className="text-black">{testimonial.msg}</p>
        </div>
      </div>
    );
  };

export default TestimonialCard
