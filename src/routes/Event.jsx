import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import events from "../store/events.js";

import SubEvent from "./SubEvent.jsx";


export const Event = () => {
  const { name } = useParams();
  const event = events.find((event) => event.name === name);

  if (event) {
    return <SubEvent eventId={event.id} />;
  }
  return (
    <>
      <Navbar />
    </>
  );
};

export default Event;
