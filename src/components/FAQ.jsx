import React, { useState } from "react";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What is the role of a Campus Ambassador?",
            answer:
                "Campus Ambassadors are passionate student representatives who spark excitement for CodeFest within their colleges. They act as a bridge between the organizers and their peers, ensuring smooth participation and offering valuable insights into the event.",
        },
        {
            question: "Am I suitable to become a Campus Ambassador?",
            answer:
                "Any passionate and motivated college student from any academic background or technical skill level is eligible to apply.",
        },
        {
            question:
                "Can there be multiple Campus Ambassadors from a particular college?",
            answer:
                "The number of Campus Ambassadors chosen from each college may vary depending on the college size and number of applications.",
        },
        {
            question:
                "How much time do I need to invest once selected as a Campus Ambassador?",
            answer:
                "The time commitment will vary depending on the tasks allotted and the stage of the CodeFest cycle.",
        },
        {
            question: "Will my progress be monitored?",
            answer:
                "Yes, your dedication will shine on our leaderboard. We will track your progress based on the number of referrals you bring to CodeFest and reward the top scorers with exciting prizes, so stay motivated and keep the CodeFest spirit alive!",
        },
    ];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full mx-auto border-t-[1px] p-4 font-mono flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center">FAQs</h1>
            <div className="space-y-4 w-[70vw]">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-lg shadow-sm"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full p-4 text-left text-lg font-medium flex justify-between items-center focus:outline-none hover:bg-purple-800 transition-all duration-500"
                        >
                            <span>{faq.question}</span>
                            <svg
                                className={`w-5 h-5 transform transition-transform ${activeIndex === index ? "rotate-180" : ""
                                    }`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {activeIndex === index && (
                            <div className="p-4 text-purple-500">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
