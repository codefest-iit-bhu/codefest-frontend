import Timeline from "../components/Timeline";
import events from "../store/events.js";

function VerticalLine() {
    return (
        <img
            src="/vertical_dotted_line.svg"
            alt="vertical_dotted_line"
            className="w-[1%] ml-[12%] scale-150 sm:scale-100 relative max-[768px]:left-[38%]"
        />
    );
}

export default function Eventsmobileview() {
    const eventDetails = [
        { icon: "/vistas_icon.svg", alt: "Vistas", index: 0 },
        { icon: "/enigma_icon.svg", alt: "Enigma", index: 1 },
        { icon: "/ctf_icon.svg", alt: "CTF", index: 2 },
        { icon: "/manthan_icon.svg", alt: "Manthan", index: 3 },
        { icon: "/haxplore_icon.svg", alt: "Haxplore", index: 4 },
        { icon: "/haxplore_icon.svg", alt: "Haxplore", index: 5 },
        { icon: "/haxplore_icon.svg", alt: "Haxplore", index: 6 },
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
                {events.sort((a, b) => (new Date(a.date.split(",").slice(0, 2).join(","))) - (new Date(b.date.split(",").slice(0, 2).join(",")))).map((event, index) => (
                    <div key={event.name}>
                        <div className="flex">
                            <img
                                src={event.image_desk_path}
                                alt={event.name}
                                className="max-[768px]:hidden rounded-full mr-6"
                            />
                            <Timeline event={event} />
                        </div>

                        {/* Render VerticalLine only if it's not the last event */}
                        {index < eventDetails.length - 1 && <VerticalLine />}
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
