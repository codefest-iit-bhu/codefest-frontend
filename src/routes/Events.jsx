import Navbar from "../components/Navbar";
import Timeline from "../components/Timeline";

export default function Events(){
    const events = [
        { date: '2024-10-01', title: 'Event 1', description: 'Description for event 1.' },
        { date: '2024-10-15', title: 'Event 2', description: 'Description for event 2.' },
        { date: '2024-10-20', title: 'Event 3', description: 'Description for event 3.' },
        { date: '2024-10-25', title: 'Event 4', description: 'Description for event 4.' },
    ];
    return(
        <>
            <Navbar />
            <div className="white ml-12 mt-12">Events</div>
            {/* <Timeline events={events} /> */}
        </>
    );
}