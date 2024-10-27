import React from 'react';
import perk from '../assets/CA_images/perks.svg';
const tasks = [
  {
    start: "A certificate of recognition, authenticated by the HoD",
    rest: "of the Department of Computer Science and Engineering, IIT(BHU), that will boost your resume and showcase your leadership skills.",
  },
  {
    start: "Unlock a treasure chest of exciting goodies",
    rest: "– perks you won’t find anywhere else!",
  },
  {
    start: "Free access",
    rest: "to exclusive workshops, seminars, and events organized by CodeFest that will enhance your knowledge and skills in various domains of coding.",
  },
  {
    start: "Build lasting connections and professional networks",
    rest: "with like-minded peers within the vibrant CodeFest community.",
  },
  {
    start: "Track your impact",
    rest: "and see your hard work pay off with the dynamic leaderboard on CodeFest’s official website. The top-ranked Campus Ambassadors will unlock exclusive rewards and recognition.",
  },
  {
    start: "A lifetime experience",
    rest: "of being part of a dynamic community of coders eager to learn, innovate, and create an impact.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="px-20">
        <p className="text-4xl font-bold text-gray-800 mb-10">
          Why should you become a Campus Ambassador?
        </p>
        <hr className="my-4 mb-10"/>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-evenly">

        <div className="md:w-1/2 w-full max-w-md px-8">
          <ul className="space-y-6 list-none">
            {tasks.map((task, i) => (
              <li key={i} className="flex flex-col">
                <span className="text-orange-600 text-lg font-semibold">
                  {task.start}
                </span>
                <p className="text-gray-700">{task.rest}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="pb-10">
          <img
            src={perk}
            alt="Campus Ambassador Perks"
            className="w-30 h-64 "
          />
        </div>
      </div>
      
    </section>

  );
};

export default BenefitsSection;
