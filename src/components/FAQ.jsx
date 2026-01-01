import React, { useState } from "react";
import faqImg from "../assets/CA_images/faq.png";
import qbgImg from "../assets/CA_images/qbg.png";

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
        <div className="w-[80vw] flex flex-col items-center mx-auto px-4 md:px-20 font-mono min-h-[130vh]">
            <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-10 mb-10 w-full text-center md:text-left">
                <img src={faqImg} alt="" className="hidden md:block" />
                <h1 className="text-[25px] md:text-[45px] font-bold text-[#fbeccd] [-webkit-text-stroke:1.5px_#726147] z-20 mx-4 font-rye">Frequently Asked Questions</h1>
                <img src={faqImg} alt="" className="hidden md:block" />
            </div>
            <div className="space-y-4 w-full z-10 mb-4">
                {faqs.map((faq, index) => (
                    <div key={index}>
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full p-12 px-5 md:px-14 xl:px-20 text-black text-left text-base md:text-lg font-medium flex items-center justify-between bg-cover bg-no-repeat bg-center"
                            style={{ backgroundImage: `url(${qbgImg})` }}
                        >
                            <span className="text-black text-base xl:text-xl font-bold pr-4 font-mate-sc">{faq.question}</span>
                            <svg
                                className={`w-5 h-5 flex-shrink-0 transform transition-transform ${activeIndex === index ? "rotate-180" : ""}`}
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
                            <div className="p-4 md:p-8 text-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d6c999] via-[#bba87a] to-[#cab98a] opacity-100 rounded-[40px] border-solid border-[#8f774b] border-[5px] text-mate-sc">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
