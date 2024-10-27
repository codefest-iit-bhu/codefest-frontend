import React, { useState } from 'react';
import faq from '../assets/CA_images/faq.svg';

const FAQSection = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqItems = [
    {
      question: "What is the role of a Campus Ambassador?",
      answer: "Campus Ambassadors are passionate student representatives who spark excitement for CodeFest within their colleges. They act as a bridge between the organizers and their peers, ensuring smooth participation and offering valuable insights into the event.",
    },
    {
      question: "Am I suitable to become a Campus Ambassador?",
      answer: "Any passionate and motivated college student from any academic background or technical skill level is eligible to apply.",
    },
    {
      question: "Can there be multiple Campus Ambassadors from a particular college?",
      answer: "The number of Campus Ambassadors chosen from each college may vary depending on the college size and number of applications.",
    },
    {
      question: "How much time do I need to invest once selected as a Campus Ambassador?",
      answer: "The time commitment will vary depending on the tasks allotted and the stage of the CodeFest cycle.",
    },
    {
      question: "Will my progress be monitored?",
      answer: "Yes, your dedication will shine on our leaderboard. We will track your progress based on the number of referrals you bring to CodeFest and reward the top scorers with exciting prizes, so stay motivated and keep the CodeFest spirit alive!",
    },
  ];


  const handleQuestionClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full py-10 bg-white">

      <div className="flex items-end justify-end px-40 mb-10">
        <h1 className="text-6xl font-bold text-black">FAQ</h1>
      </div>
      <hr className="ml-[900px] mr-16 my-4 mb-10" />

      <div className="flex flex-col md:flex-row justify-center items-start">

        <div className="md:w-1/3 w-full ">
          <img
            src={faq}
            alt="Campus Ambassador Perks"
            className="w-64 h-64 object-cover"
          />
        </div>


        <div className="flex items-start justify-start md:w-1/3 w-full">
          <ul className="space-y-4">
            {faqItems.map((item, index) => (
              <li key={index} className="border-b pb-4">
                <h3
                  className="font-bold text-lg text-gray-800 cursor-pointer"
                  onClick={() => handleQuestionClick(index)} 
                >
                  {item.question}
                </h3>

                {expandedIndex === index && (
                  <p className="text-gray-600 mt-2 transition-all duration-300">
                    {item.answer}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
