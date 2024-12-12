import Timeline from "../components/Timeline";
import events from "../store/events.js";

function VerticalLine() {
    return (
        <img 
            src="/vertical_dotted_line.svg"
            alt="vertical_dotted_line"
            className="w-[1%] ml-[12%]"
        />
    );
}

export default function Eventsmobileview() {
    const eventDetails = [
        { icon: "/ctf_icon.svg", alt: "CTF", index: 2 },
        { icon: "/vistas_icon.svg", alt: "Vistas", index: 0 },
        { icon: "/enigma_icon.svg", alt: "Enigma", index: 1 },
        { icon: "/haxplore_icon.svg", alt: "Haxplore", index: 4 },
        { icon: "/manthan_icon.svg", alt: "Manthan", index: 3 },
    ];

    return (
        <div className="relative flex flex-col justify-center items-center">
            <div>
                <img
                    src="/events_heading.svg"
                    alt="Events"
                    className="relative p-[8vh] mx-auto"
                />
            </div>
            <div>
                {eventDetails.map((event, idx) => (
                    <div key={event.alt}>
                        <div className="flex">
                            <img 
                                src={event.icon}
                                alt={event.alt}
                                className="w-[26vw]"
                            />
                            <Timeline events={events} index={event.index} />
                        </div>
                        
                        {/* Render VerticalLine only if it's not the last event */}
                        {idx < eventDetails.length - 1 && <VerticalLine />}
                    </div>
                ))}
            </div>
            <div>
                <img 
                    src="/events_foot_design.svg"
                    alt="Events Footer Design"
                    className="w-[100vw] mt-[8vh]"
                />
            </div>
        </div>
    );
}