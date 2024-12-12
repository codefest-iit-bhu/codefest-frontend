import React from "react";
import './EventCard.css';

const EventCard = ({ title, date, lastDateReg }) => {
  return (
    <div className="event-card">
      <h1 className="event-title">{title}</h1>
      <p className="event-date">{date}</p>
      <hr className="divider" />
      <p className="deadline">Registration Deadline: {lastDateReg}</p>
    </div>
  );
};

export default EventCard;
