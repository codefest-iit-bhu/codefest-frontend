
import events from "../store/events.js";
import Timeline from "../components/Timeline.jsx";
import { useRef, useEffect } from "react";

function LineConnector({ startRef, endRef }) {
    const lineRef = useRef(null);

    useEffect(() => {
        const updateLine = () => {
            if (startRef.current && endRef.current && lineRef.current) {
                const start = startRef.current.getBoundingClientRect();
                const end = endRef.current.getBoundingClientRect();

                const startX = start.left + start.width / 2;
                const startY = start.top;
                const endX = end.left + end.width / 2;
                const endY = end.top + end.height / 2;

                lineRef.current.setAttribute("x1", startX);
                lineRef.current.setAttribute("y1", startY);
                lineRef.current.setAttribute("x2", endX);
                lineRef.current.setAttribute("y2", endY);
            }
        };

        updateLine();
        window.addEventListener("resize", updateLine);
        return () => window.removeEventListener("resize", updateLine);
    }, [startRef, endRef]);

    return (
        <line
            ref={lineRef}
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="white"
            strokeWidth="10"
            strokeDasharray="10,10" 
            style={{
                filter: "drop-shadow(0px 4px 4px magenta)", 
                zIndex: -1 
            }}
        />
    );
}
export default function DesktopEventsPage() {
    const imageRefs = Array.from({ length: 5 }, () => useRef(null));

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
                    {/* SVG for connecting lines */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        {imageRefs.map((ref, i) => {
                            if (i < imageRefs.length - 1) {
                                return (
                                    <LineConnector
                                        key={i}
                                        startRef={imageRefs[i]}
                                        endRef={imageRefs[i + 1]}
                                    />
                                );
                            }
                            return null;
                        })}
                    </svg>
                    {/* First Row */}
                    <div className="flex justify-start items-center lg:px-20 zIndex: 1000">
                        <Timeline events={events} index={2} />
                        
                        <img
                            ref={imageRefs[0]}
                            src="/ctf_desk.svg"
                            alt="CTF"
                            className="w-[25vh] z-1"
                            style={{ position: "relative" }}
                        />

                    </div>

                    {/* Second Row */}
                    <div className="flex justify-end items-center lg:px-20">
                        <img
                            ref={imageRefs[1]}
                            src="/vistas_desk.svg"
                            alt="Vistas"
                            className="w-[25vh] z-1"
                            style={{ position: "relative" }}
                        />
                        <Timeline events={events} index={0} />
                    </div>

                    {/* Third Row */}
                    <div className="flex justify-start items-center lg:px-20">
                        <Timeline events={events} index={1} />
                        <img
                            ref={imageRefs[2]}
                            src="/enigma_desk.svg"
                            alt="enigma"
                            className="w-[25vh] z-1"
                            style={{ position: "relative" }}
                        />
                    </div>

                    {/* Fourth Row */}
                    <div className="flex justify-end items-center lg:px-20">
                        <img
                            ref={imageRefs[3]}
                            src="/haxplore_desk.svg"
                            alt="haxplore"
                            className="w-[25vh] z-1"
                            style={{ position: "relative" }}
                        />
                        <Timeline events={events} index={4} />
                    </div>

                    {/* Fifth Row */}
                    <div className="flex justify-start items-center lg:px-20">
                        <Timeline events={events} index={3} />
                        <img
                            ref={imageRefs[4]}
                            src="/manthan_desk.svg"
                            alt="manthan"
                            className="w-[25vh] z-1"
                            style={{ position: "relative" }}
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

