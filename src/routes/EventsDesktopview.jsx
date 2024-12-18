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
                        events.sort((a, b) => (new Date(a.last_date_reg)) - (new Date(b.last_date_reg))).map((event, index) => {
                            return <div className={`flex ${index % 2 ? "justify-end" : "justify-start"} items-center lg:px-20`}>
                                {
                                    index % 2 === 0 && <Timeline event={event} />
                                }
                                {
                                    index % 2 !== 0 && (index !== events.length - 1) && <div className="w-1/3 border-dotted border-t-[6px] border-l-[6px] h-40 rounded-tl-full relative top-20">
                                    </div>
                                }
                                <img
                                    src={event.image_desk_path}
                                    alt={event.name}
                                    className="w-[25vh]"
                                />
                                {
                                    index % 2 === 0 && (index !== events.length - 1) && <div className="w-1/3 border-dotted border-t-[6px] border-spacing-16 border-r-[6px] h-40 rounded-tr-full relative top-20">
                                    </div>
                                }
                                {
                                    index % 2 !== 0 && <Timeline event={event} />
                                }
                            </div>
                        })
                    }
                </div>


                {/* Footer Design */}
                <div>
                    <img
                        src="/events_foot_design.svg"
                        alt="Events Footer Design"
                        className="w-[100vw]"
                    />
                </div>
            </div>
        </>
    );
}
