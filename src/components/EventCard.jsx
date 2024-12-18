import React from "react";
import './EventCard.css';

const EventCard = ({ title, date, lastDateReg }) => {
  return (
    <div className="event-card hover:scale-105 transition-all duration-500 hover:bg-gray-900">
      <h1 className="event-title text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="event-date font-mono ">{date}</p>
      <hr className="divider" />
      <p className="deadline font-mono sm:text-xl">Registration Deadline: {lastDateReg}</p>
    </div>
  );
};

export default EventCard;
