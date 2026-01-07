import React from "react";

const TestimonialCard = ({ testimonial, bg, circleFrame }) => {
  return (
    <div 
      className="relative w-full h-36 md:h-52 bg-no-repeat bg-center flex items-center px-4 md:px-8 py-4 transition-transform hover:scale-102 duration-300"
      style={{ 
        backgroundImage: `url(${bg})`,
        backgroundSize: "100% 100%" 
      }}
    >
      {/* IMAGE SECTION */}
      <div className="relative w-20 h-20 md:w-32 md:h-32 shrink-0 ml-2 md:ml-4 mr-4 md:mr-8">
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

      {/* TEXT SECTION  */}
      <div className="flex flex-col justify-center h-full overflow-hidden flex-1 pr-2 md:pr-4">
        <p className="text-[#3e2723] text-sm md:text-lg font-bold font-body-serif italic leading-snug line-clamp-3 md:line-clamp-4">
          "{testimonial.msg}"
        </p>
        
        <h3 className="mt-2 text-[#5d4037] font-black uppercase text-xs md:text-sm tracking-widest font-gatsby">
          — {testimonial.name}
        </h3>
      </div>

    </div>
  );
};

export default TestimonialCard;