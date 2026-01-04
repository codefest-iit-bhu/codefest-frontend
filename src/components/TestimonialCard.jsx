import React from "react";

const TestimonialCard = ({ testimonial, bg, circleFrame }) => {
  return (
    <div 
      className="relative w-full h-32 md:h-44 bg-no-repeat bg-center flex items-center px-4 md:px-6 py-2 transition-transform hover:scale-102 duration-300"
      style={{ 
        backgroundImage: `url(${bg})`,
        backgroundSize: "100% 100%" 
      }}
    >
      {/* 1. IMAGE SECTION */}
      <div className="relative w-20 h-20 md:w-28 md:h-28 shrink-0 ml-4 md:ml-8 mr-4 md:mr-8">
        <img 
          src={circleFrame} 
          alt="frame" 
          className="absolute inset-0 w-full h-full scale-110 pointer-events-none drop-shadow-md z-20" 
        />
        <div className="w-full h-full rounded-full overflow-hidden border border-[#3e2723] bg-gray-300 z-10">
          <img 
            src={testimonial.imgSrc} 
            alt={testimonial.imgAlt} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>

      {/* 2. TEXT SECTION  */}
      <div className="flex flex-col justify-center h-full overflow-hidden flex-1 pr-4">
        <p className="text-[#3e2723] text-xs md:text-sm font-bold font-body-serif italic leading-snug line-clamp-3 md:line-clamp-4">
          "{testimonial.msg}"
        </p>
        
        <h3 className="mt-1 md:mt-2 text-[#5d4037] font-black uppercase text-[10px] md:text-xs tracking-widest font-gatsby">
          — {testimonial.name}
        </h3>
      </div>

    </div>
  );
};

export default TestimonialCard;