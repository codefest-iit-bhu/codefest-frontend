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
        <h1 className="text-[100px] font-bold text-white z-[0.5]">FAQ</h1>
        <img src="/cloud2.svg" alt="" className="absolute right-0" />
      </div>

      <ul className="w-full flex flex-col items-center text-3xl z-[0.5]">
        {faqItems.map((item, index) => (
          <li key={index}>FAQ item</li>
        ))}
      </ul>
    </div>
  );
};

export default FAQSection;
