import React from "react";
import './EventCard.css';

const EventCard = ({ title, date, lastDateReg,img_src }) => {
  const hasEnded=new Date() > new Date(lastDateReg);
  // console.log(title," : ",new Date(lastDateReg))
  return (
    <div className={`event-card hover:scale-105 transition-all bg-[url('${img_src}')] bg-contain duration-500 hover:bg-gray-900 z-[10] relative ${hasEnded?"pointer-events-none opacity-60":""}`}>
      <h1 className="event-title text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="event-date font-mono ">{date}</p>
      <hr className="divider" />
      <p className="deadline font-mono sm:text-xl">Registration Deadline: <br /> {lastDateReg}</p>
      {hasEnded && (<><span className="text-red-600">Registration Closed</span></>)}
    </div>
  );
};

export default EventCard;
