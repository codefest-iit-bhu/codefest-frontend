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

  // Filter events with deadline after January 15, 2026
  const cutoffDate = new Date("2026-01-15");

  const filteredEvents = events.filter((event) => {
    // Extract the end date from the event date string
    // Assuming date format like "10 to 12 Jan, 2026" or "15 Jan, 2026"
    const dateParts = event.date.split(",");
    let eventEndDate;

    if (dateParts.length >= 2) {
      const dateStr = dateParts[0].trim();
      const year = dateParts[1].trim();

      // Check if it's a date range (contains "to")
      if (dateStr.includes("to")) {
        const endDatePart = dateStr.split("to")[1].trim();
        eventEndDate = new Date(`${endDatePart}, ${year}`);
      } else {
        // Single date
        eventEndDate = new Date(`${dateStr}, ${year}`);
      }

      return eventEndDate > cutoffDate;
    }

    return false;
  });

  const sortedEvents = filteredEvents.sort(
    (a, b) =>
      new Date(a.date.split(",").slice(0, 2).join(",")) -
      new Date(b.date.split(",").slice(0, 2).join(","))
  );

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
        {sortedEvents.length > 0 ? (
          sortedEvents.map((event, index) => (
            <div key={event.name}>
              <div className="flex">
                <Timeline event={event} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 px-4">
            <p className="text-yellow-500 text-xl">
              No upcoming events at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
