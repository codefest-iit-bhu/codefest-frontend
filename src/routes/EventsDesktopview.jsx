import events from "../store/events.js";
import Timeline from "../components/Timeline.jsx";

export default function DesktopEventsPage() {
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

  const sortedEvents = filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date.split(",").slice(0, 2).join(","));
    const dateB = new Date(b.date.split(",").slice(0, 2).join(","));
    return dateA - dateB;
  });

  return (
    <div className="min-h-screen pb-20">
      <div className="relative flex flex-col justify-center items-center">
        {/* Events Heading */}
        <div>
          <img
            src="/events_heading.svg"
            alt="Events"
            className="relative p-[5vh] mx-auto w-[90%] md:[70%]"
          />
        </div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-7xl mx-auto px-4">
          {/* Central Spine */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.5)] rounded-full hidden md:block"></div>

          <div className="flex flex-col gap-8 md:gap-0">
            {sortedEvents.length > 0 ? (
              sortedEvents.map((event, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={event.id}
                    className="relative flex flex-col md:flex-row items-center justify-between w-full mb-12"
                  >
                    {/* Left Content */}
                    <div
                      className={`w-full md:w-[45%] flex justify-end ${isLeft ? "" : "invisible"}`}
                    >
                      {isLeft && <Timeline event={event} />}
                    </div>

                    {/* Center Connector */}
                    <div className="hidden md:flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 z-10 top-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full border-4 border-black shadow-[0_0_10px_#EAB308]"></div>
                    </div>

                    {/* Horizontal Connector Line */}
                    <div
                      className={`hidden md:block absolute top-1/2 h-1 bg-yellow-500/50 w-[5%] ${
                        isLeft ? "left-[45%]" : "right-[45%]"
                      }`}
                    ></div>

                    {/* Right Content */}
                    <div
                      className={`w-full md:w-[45%] flex justify-start ${isLeft ? "invisible" : ""}`}
                    >
                      {!isLeft && <Timeline event={event} />}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20">
                <p className="text-yellow-500 text-2xl">
                  No upcoming events at this time.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
