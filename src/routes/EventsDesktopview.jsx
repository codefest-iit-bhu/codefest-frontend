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
                <div className="w-full">
                    {/* First Row */}
                    <div className="flex justify-start items-center lg:px-20 ">
                        <Timeline events={events} index={2} />
                        
                        <img
                            src="/ctf_desk.svg"
                            alt="CTF"
                            className="w-[25vh]"
                        />
                    </div>

                    {/* Second Row */}
                    <div className="flex justify-end items-center lg:px-20">
                        <img
                            src="/vistas_desk.svg"
                            alt="Vistas"
                            className="w-[25vh]"
                        />
                        <Timeline events={events} index={0} />
                    </div>

                    {/* Third Row */}
                    <div className="flex justify-start items-center lg:px-20">
                        <Timeline events={events} index={1} />
                        <img
                            src="/enigma_desk.svg"
                            alt="enigma"
                            className="w-[25vh]"
                        />
                    </div>

                    {/* Fourth Row */}
                    <div className="flex justify-end items-center lg:px-20">
                        <img
                            src="/haxplore_desk.svg"
                            alt="haxplore"
                            className="w-[25vh]"
                        />
                        <Timeline events={events} index={4} />
                    </div>

                    {/* Fifth Row */}
                    <div className="flex justify-start items-center lg:px-20">
                        <Timeline events={events} index={3} />
                        <img
                            src="/manthan_desk.svg"
                            alt="manthan"
                            className="w-[25vh]"
                        />
                    </div>
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
