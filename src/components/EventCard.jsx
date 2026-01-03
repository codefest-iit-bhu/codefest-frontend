import React from "react";
import "./EventCard.css";

const EventCard = ({ title, date, lastDateReg, img_src }) => {
  const hasEnded = new Date() > new Date(lastDateReg);
  // console.log(title, " : ", new Date(lastDateReg))
  return (
    <div
      className={`event-card hover:scale-105 overflow-hidden transition-all bg-cover bg-no-repeat bg-center duration-500 hover:bg-gray-900 z-[10] relative ${hasEnded ? "pointer-events-none opacity-60" : ""}`}
      style={{ backgroundImage: `url(${img_src})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full max-[768px]:bg-black bg-[rgba(20,11,41,1)] max-[768px]:bg-opacity-60 pointer-events-none z-[-1]"></div>
      <h1 className="event-title text-2xl font-bold sm:text-3xl z-[30]">
        {title}
      </h1>
      <p className="event-date font-mono z-[30]">{date}</p>
      <hr className="divider z-[30]" />
      <p className="deadline font-mono sm:text-xl z-[30]">
        Registration Deadline: <br /> {lastDateReg}
      </p>
      {hasEnded && (
        <>
          <span className="text-red-600 z-[30]">Registration Closed</span>
        </>
      )}
    </div>
  );
};

export default EventCard;
