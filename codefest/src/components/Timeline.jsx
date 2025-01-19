import React from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";

const Timeline = ({ event }) => {
  return (
    <div className="timeline-container">
      <ol className="timeline">
        {event && (
          <li key={event.name} className="timeline-item">
            <Link to={`/event/${event.name}`} className="open-link">
              <EventCard
                title={event.title}
                date={event.date}
                lastDateReg={event.last_date_reg}
                img_src={event.image_desk_path}
              />
            </Link>
          </li>
        )}
      </ol>
    </div>
  );
};


export default Timeline;
