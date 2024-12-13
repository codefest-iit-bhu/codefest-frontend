import React from "react";
import './EventCard.css';

const EventCard = ({ title, date, lastDateReg }) => {
  return (
    <div className="event-card">
      <h1 className="event-title">{title}</h1>
      <p className="event-date font-mono">{date}</p>
      <hr className="divider" />
      <p className="deadline font-mono">Registration Deadline: {lastDateReg}</p>
    </div>
  );
};

export default EventCard;
