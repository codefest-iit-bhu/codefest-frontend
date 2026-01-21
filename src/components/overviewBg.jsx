import React from "react";
import events from "../store/events";

const OverviewBg = ({ eventId }) => {
    const event = events.find((e) => e.id === eventId);

    if (!event) {
        return <div className="text-white text-center">Event not found</div>;
    }

    return (
        <div className="flex justify-center items-center w-full py-10 px-4">
            <div
                className="relative w-full max-w-[800px] aspect-[953/537] bg-no-repeat bg-contain bg-center flex items-center justify-center p-12 md:p-20"
                style={{ backgroundImage: "url(/overviewBg.png)" }}
            >
                <div className="w-[70%] h-[60%] overflow-y-auto custom-scrollbar flex">
                    <div
                        className="m-auto font-aladin text-black text-center text-sm md:text-lg lg:text-xl leading-relaxed tracking-wide w-full"
                        dangerouslySetInnerHTML={{ __html: event.overview }}
                    />
                </div>
            </div>
        </div>
    );
};

export default OverviewBg;
