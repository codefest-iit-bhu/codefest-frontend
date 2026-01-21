import React from "react";
import PrizeCard from "./PrizeCard";
import ContactCard from "./ContactCard";
import eventLine from "../assets/eventlin.webp";
import events from "../store/events";

const PrizesAndContacts = ({ eventId }) => {
  const event = events.find((e) => e.id === eventId);

  // Use prizes from store if available and is an array, otherwise default to empty or keep hardcoded for fallback if needed
  // The user requested "fetch prizes array from store", so we prioritize store.
  const prizes = Array.isArray(event?.prizes) ? event.prizes : [];

  // Parse contact info into a normalized array
  let contactsToRender = [];
  const defaultQueryText =
    "For further queries about this event, please contact";

  if (event?.contact) {
    if (Array.isArray(event.contact)) {
      // New format: Array of objects { name, phone }
      contactsToRender = event.contact.map((c) => ({
        name: c.name,
        phone: c.phone,
        text: defaultQueryText,
      }));
    }
  }

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-12 p-4 sm:p-8 pb-12 sm:pb-20">
      {/* Left Column: Prizes */}
      <div className="flex flex-col items-center gap-6 sm:gap-8 mb-24 w-full lg:w-1/2">
        <div className="flex items-center justify-center gap-2 sm:gap-4 w-full">
          <img
            src={eventLine}
            className="w-28 sm:w-24 md:w-32 lg:w-48 h-auto object-contain"
            alt="line"
          />
          <h2 className="text-[#FFD700] text-5xl sm:text-4xl md:text-5xl font-alex-brush text-center leading-none whitespace-nowrap">
            Prizes
          </h2>
          <img
            src={eventLine}
            className="w-28 sm:w-24 md:w-32 lg:w-48 h-auto object-contain"
            alt="line"
          />
        </div>

        <div className="flex flex-col items-center w-full">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`w-full`}
            >
              <PrizeCard
                rank={prize.rank}
                subRank={prize.subText}
                description={prize.description}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Contact */}
      <div className="flex flex-col items-center gap-6 sm:gap-8 w-full lg:w-1/2 mb-24">
        <div className="flex items-center justify-center gap-2 sm:gap-4 w-full"> 
          <img
            src={eventLine}
            className="w-28 sm:w-20 md:w-24 lg:w-48 h-auto object-contain"
            alt="line"
          />
          <h2 className="text-[#FFD700] text-5xl sm:text-4xl md:text-5xl font-alex-brush text-center leading-none whitespace-nowrap">
            Contact
          </h2>
          <img
            src={eventLine}
            className="w-28 sm:w-20 md:w-24 lg:w-48 h-auto object-contain"
            alt="line"
          />
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 w-full">
          {contactsToRender.map((contact, index) => (
            <div
              key={index}
              className="w-full"
            >
              <ContactCard
                name={contact.name}
                phone={contact.phone}
                text={contact.text}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrizesAndContacts;
