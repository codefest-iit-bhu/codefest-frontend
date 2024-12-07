import Navbar from "../components/Navbar";
import Timeline from "../components/Timeline";
import events from "../store/events.js";

export default function Events() {
  return (
    <>
      {/* <div className="white ml-12 mt-12">Events</div> */}
      <Navbar />
      <Timeline events={events} />
    </>
  );
}
