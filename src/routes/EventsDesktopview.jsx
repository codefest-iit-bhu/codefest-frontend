import events from "../store/events.js";
import Timeline from "../components/Timeline.jsx";

function VerticalLine({ angle }) {
    return (
        <img
            src="/vertical_dotted_line.svg"
            alt="vertical_dotted_line"
            className={`w-[1.5%] ml-[12%] transform`}
            style={{
                transform: `rotate(${angle}deg)`, // Dynamically set the rotation angle
                transformOrigin: "top center",   // Adjust pivot point
            }}
        />
    );
}

export default function DesktopEventsPage() {
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
                        <div className={`flex ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"} items-center`}>
                            {/* Timeline */}
                            <Timeline events={events} index={event.index} className={`${idx % 2 === 0 ? "ml-0" : "ml-auto"}`} />

                            {/* Event Icon */}
                            <img
                                src={event.icon}
                                alt={event.alt}
                                className="w-[10vw]"
                            />
                        </div>

                        {/* Render VerticalLine only if it's not the last event */}
                        {idx < eventDetails.length - 1 && (
                            <div className="flex justify-center">
                                <VerticalLine angle={idx % 2 === 1 ? 45 : -45} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <img
                    src="/events_foot_design.svg"
                    alt="Events Footer Design"
                    className="w-[100vw]"
                />
            </div>
        </div>
    );
}
