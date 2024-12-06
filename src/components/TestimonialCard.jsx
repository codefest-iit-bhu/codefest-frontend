import React from "react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <>
      <div
        className="w-[600px] h-[235px] relative flex-shrink-0"
        style={{
          background: 'url("/testimonialBox.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      >
        <div className="w-[125px] h-[125px] top-[40px] left-[8px] absolute rounded-full overflow-hidden">
          <img src={testimonial.imgSrc} alt="" />
        </div>
        <div className="absolute h-[120px] w-[380px] top-[40px] left-[150px] overflow-x-hidden overflow-y-scroll no-scrollbar text-black">
          <p className="font-bold">{testimonial.name}</p>
          {testimonial.msg}
        </div>
      </div>
    </>
  );
};

export default TestimonialCard;
