import Navbar from "../components/Navbar";
import Timeline from "../components/Timeline";
import events from "../store/events.js";
export default function Events() {
  return (
    <>
      <div className="bg-[rgba(20,11,41,1)]">
        <Navbar />
        <div className="relative flex flex-col justify-center items-center">
          <div>
            <img
              src="/events_heading.svg"
              alt="Events"
              class="relative p-[10vh] mx-auto"
            />
          </div>
          <div>
            <img 
            src="/events_track.svg"
            alt="Events Track image"
            className="relative mt-[10vh] "
            />
          </div>
          <div>
            <img 
            src="/events_foot_design.svg"
            alt="Events Footer Design"
            className="w-[100vw]"
            />
          </div>
        </div>
        {/* <Timeline events={events} /> */}
      </div>
    </>
  );
}
