import Navbar from "../components/Navbar";
import Timeline from "../components/Timeline";
import events from "../store/events.js"

export default function Events(){
    return(
        <>
            <Navbar />
            {/* <div className="white ml-12 mt-12">Events</div> */}
            <Timeline events={events} />
        </>
    );
}