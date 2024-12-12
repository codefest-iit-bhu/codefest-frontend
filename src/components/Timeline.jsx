import React from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard"; 

const Timeline = ({ events, index }) => {
  const event = events[index]; 

  return (
    <div className="timeline-container">
      <ol className="timeline ">
        {event && new Date() < new Date(event.last_date_reg) && (
          <li key={event.name} className="timeline-item">
            <Link to={`/event/${event.name}`} className="open-link">
              <EventCard
                title={event.title}
                date={event.date}
                lastDateReg={event.last_date_reg}
              />
            </Link>
          </li>
        )}
      </ol>
    </div>
  );
};


export default Timeline;