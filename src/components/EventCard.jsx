import React from "react";
import './EventCard.css';

const EventCard = ({ title, date, lastDateReg }) => {
  const hasEnded=new Date() > new Date(lastDateReg.split(",").slice(0, 2).join(","));
  return (
    <div className={`event-card hover:scale-105 transition-all duration-500 hover:bg-gray-900 ${hasEnded?"pointer-events-none opacity-60":""}`}>
      <h1 className="event-title text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="event-date font-mono ">{date}</p>
      <hr className="divider" />
      <p className="deadline font-mono sm:text-xl">Registration Deadline: {lastDateReg}</p>
      {hasEnded && (<><span className="text-red-600">Registration Closed</span></>)}
    </div>
  );
};

export default EventCard;
