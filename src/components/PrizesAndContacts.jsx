import React from 'react';
import PrizeCard from './PrizeCard';
import ContactCard from './ContactCard';

import events from '../store/events';

const PrizesAndContacts = ({ eventId }) => {
    const event = events.find(e => e.id === eventId);

    // Use prizes from store if available and is an array, otherwise default to empty or keep hardcoded for fallback if needed
    // The user requested "fetch prizes array from store", so we prioritize store.
    const prizes = Array.isArray(event?.prizes) ? event.prizes : [];

    // Parse contact info into a normalized array
    let contactsToRender = [];
    const defaultQueryText = "For further queries about this event, please contact";

    if (event?.contact) {
        if (Array.isArray(event.contact)) {
            // New format: Array of objects { name, phone }
            contactsToRender = event.contact.map(c => ({
                name: c.name,
                phone: c.phone,
                text: defaultQueryText
            }));
        }
    }
    return (
        <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-20 p-8 pb-20">
            {/* Left Column: Prizes */}
            <div className="flex flex-col items-center gap-8 w-full lg:w-1/2">
                <h2 className="text-[#FFD700] text-6xl md:text-7xl font-normal text-center mb-4 leading-none" style={{ fontFamily: 'Engagement, cursive' }}>
                    Prizes
                </h2>

                <div className="flex flex-col w-full items-center">
                    {prizes.map((prize, index) => (
                        <div
                            key={index}
                            className={`transform hover:scale-105 transition-transform duration-300 ${index % 2 !== 0 ? 'lg:ml-20' : ''}`}
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
            <div className="flex flex-col items-center gap-8 w-full lg:w-1/3">
                <h2 className="text-[#FFD700] text-6xl md:text-7xl font-normal text-center mb-4 leading-none" style={{ fontFamily: 'Engagement, cursive' }}>
                    Contact
                </h2>

                <div className="flex flex-col gap-8">
                    {contactsToRender.map((contact, index) => (
                        <div key={index} className="transform hover:scale-105 transition-transform duration-300">
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
