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
          {events
            .sort(
              (a, b) =>
                new Date(a.date.split(",").slice(0, 2).join(",")) -
                new Date(b.date.split(",").slice(0, 2).join(","))
            )
            .filter((event) => event.id !== "6" && event.id !== "7")
            .map((event, index) => (
              <div key={event.name}>
                <div className="flex">
                  <Timeline event={event} />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
}
