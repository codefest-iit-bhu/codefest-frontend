import React from "react";
import SubEventHero from "../components/subEventHero";
import OverviewBg from "../components/overviewBg";
import SubEventDescription from "../components/subEventDescription";
import PrizesAndContacts from "../components/PrizesAndContacts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SubEvent = ({eventId}) => {
    return (
        <div
            className="w-full min-h-screen"
            style={{
                backgroundImage: "url('/subEventBg.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <Navbar />
            <SubEventHero eventId={eventId} />
            <OverviewBg eventId={eventId} />
            <SubEventDescription eventId={eventId} />
            <PrizesAndContacts eventId={eventId} />
            <Footer />
        </div>
    );
};

export default SubEvent;