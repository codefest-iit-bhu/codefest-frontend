import React from "react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <>
      <div
        className="w-[300px] h-[126px] md:w-[600px] md:h-[235px] relative flex-shrink-0 text-[12px] md:text-lg font-mono hover:scale-[102%] transition-all duration-500"
        style={{
          background: 'url("/testimonialBox.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <div className="w-[63px] h-[63px] top-[20px] left-[4px] md:w-[125px] md:h-[125px] md:top-[40px] md:left-[8px] absolute rounded-full overflow-hidden">
          <img src={testimonial.imgSrc} alt="" />
        </div>
        <div className="absolute h-[60px] w-[190px] top-[20px] left-[75px] md:h-[120px] md:w-[380px] md:top-[40px] md:left-[150px] overflow-x-hidden overflow-y-scroll no-scrollbar text-black">
          <p className="font-bold">{testimonial.name}</p>
          {testimonial.msg}
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
