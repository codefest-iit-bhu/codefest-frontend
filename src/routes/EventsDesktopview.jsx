// import events from "../store/events.js";
// import Timeline from "../components/Timeline.jsx";

// export default function DesktopEventsPage() {
//     return (
//         <>
//             <div className="relative flex flex-col justify-center items-center">
//                 {/* Events Heading */}
//                 <div>
//                     <img
//                         src="/events_heading.svg"
//                         alt="Events"
//                         className="relative p-[10vh] mx-auto"
//                     />
//                 </div>

//                 {/* Timeline in Zig-Zag */}
//                 <div className="w-full flex flex-col h-full ">

//                     {
//                         events.sort((a, b) => (new Date(a.date.split(",").slice(0, 2).join(","))) - (new Date(b.date.split(",").slice(0, 2).join(",")))).map((event, index) => {
//                             return <div className={`flex ${index % 2 ? "justify-end" : "justify-start"} items-center lg:px-20`}>
//                                 {
//                                     index % 2 === 0 && <Timeline event={event} />
//                                 }
//                                 {
//                                     index % 2 !== 0 && (index !== events.length - 1)
//                                 }
                               

//                                 {
//                                     index % 2 !== 0 && <Timeline event={event} />
//                                 }

//                             </div>
//                         })
//                     }
//                 </div>


//                 {/* Footer Design
//                 <div>
//                     <img
//                         src="/events_foot_design.svg"
//                         alt="Events Footer Design"
//                         className="w-[100vw]"
//                     />
//                 </div> */}
//             </div>
//         </>
//     );
// }


import events from "../store/events.js";
import Timeline from "../components/Timeline.jsx";

export default function DesktopEventsPage() {
    const sortedEvents = events.sort((a, b) => (new Date(a.date.split(",").slice(0, 2).join(","))) - (new Date(b.date.split(",").slice(0, 2).join(","))));

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
              {sortedEvents
                .filter((event) => event.id !== "6" && event.id !== "7")
                .map((event, index) => {
                  const isLeft = index % 2 === 0;
                  //console.log(event);

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
                })}
            </div>
          </div>
        </div>
      </div>
    );
}