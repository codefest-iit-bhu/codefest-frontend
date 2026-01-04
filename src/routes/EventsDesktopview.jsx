import events from "../store/events.js";
import Timeline from "../components/Timeline.jsx";

export default function DesktopEventsPage() {
    return (
        <>
            <div className="relative flex flex-col justify-center items-center">
                {/* Events Heading */}
                <div>
                    <img
                        src="/events_heading.svg"
                        alt="Events"
                        className="relative p-[10vh] mx-auto"
                    />
                </div>

                {/* Timeline in Zig-Zag */}
                <div className="w-full flex flex-col h-full gap-20">

                    {
                        events.sort((a, b) => (new Date(a.date.split(",").slice(0, 2).join(","))) - (new Date(b.date.split(",").slice(0, 2).join(",")))).map((event, index) => {
                            return <div className={`flex ${index % 2 ? "justify-end" : "justify-start"} items-center lg:px-20`}>
                                {
                                    index % 2 === 0 && <Timeline event={event} />
                                }
                                {
                                    index % 2 !== 0 && (index !== events.length - 1) 
                                }
                                {/* <img
                                    src={event.image_desk_path}
                                    alt={event.name}
                                    className={`w-40 rounded-full ${index % 2 === 0 ? 'ml-6' : 'mr-6'}`}
                                /> */}
                                {
                                    index % 2 === 0 && (index !== events.length - 1)
                                    
                                }
                                {
                                    index % 2 !== 0 && <Timeline event={event} />
                                }
                            </div>
                        })
                    }
                </div>


                {/* Footer Design
                <div>
                    <img
                        src="/events_foot_design.svg"
                        alt="Events Footer Design"
                        className="w-[100vw]"
                    />
                </div> */}
            </div>
        </>
    );
}
