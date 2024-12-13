import React, { useState } from "react";
import faq from "../assets/CA_images/faq.svg";

const FAQSection = () => {
  const faqItems = [
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

  return (
    <div className="w-full py-10 flex flex-col">
      <div className="flex justify-center px-40 mb-10 relative">
        <h1 className="text-[100px] font-bold text-white z-20">FAQs</h1>
        <img src="/cloud2.svg" alt="" className="absolute right-0" />
      </div>

      <div className="flex justify-center">
        <div id="accordion-collapse" data-accordion="collapse" className="font-mono flex flex-col gap-4 z-10 sm:px-3 lg:w-4/5">
          {faqItems.map((item, index) => (
            <>
              <h2 id={`accordion-collapse-heading-${index}`}>
                <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-purple-500 gap-3 text-white text-lg bg-transparent" data-accordion-target={`#accordion-collapse-body-${index}`} aria-expanded="true" aria-controls={`accordion-collapse-body-${index}`}>
                  <span> {item.question} </span>
                  <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                  </svg>
                </button>
              </h2>
              <div id={`accordion-collapse-body-${index}`} className="hidden" aria-labelledby={`accordion-collapse-heading-${index}`}>
                <div className="p-5 border border-b-0 border-gray-200 bg-gray-500">
                  <p className="mb-2"> {item.answer} </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FAQSection;
