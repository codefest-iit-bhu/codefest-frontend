import React from "react";

const lookbackData = [
  { id: 1, label: "Prize Money", value: "₹ 5 Lakh" },
  { id: 2, label: "Colleges", value: "98+" },
  { id: 3, label: "Participants", value: "35k+" },
  { id: 4, label: "Unique Visitors", value: "3 Lakh+" },
  { id: 5, label: "Registrations", value: "22k+" },
];

const Lookback = ({ frame }) => {
  return (
    <div className="w-full flex flex-wrap justify-evenly gap-y-12 mt-6 px-0 md:px-10">
      {lookbackData.map((data) => (
        <div 
          key={data.id} 
          className="relative w-44 h-44 md:w-64 md:h-64 shrink-0 flex items-center justify-center hover:scale-105 transition-transform duration-300"
        >
          {/* BACKGROUND BOX 
              
          */}
          <div className="absolute w-[60%] h-[60%] bg-black/40 rounded-2xl backdrop-blur-sm z-0"></div>

          {/* FRAME */}
          <img 
            src={frame} 
            alt="frame" 
            className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-lg z-10" 
          />

          {/* CONTENT  */}
          <div className="relative z-20 flex flex-col items-center text-center px-6 pt-2">
            {/* Value:*/}
            <div className="text-lg md:text-3xl font-playball text-[#FFD700] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {data.value}
            </div>
            {/* Label */}
            <div className="text-[10px] md:text-sm font-playball uppercase tracking-wider text-white opacity-90 mt-1">
              {data.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Lookback;