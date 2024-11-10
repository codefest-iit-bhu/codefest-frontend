import React from "react";
import perk from "../assets/CA_images/perks.svg";
import HeadingA from "../components/HeadingA";
import TextBox from "../components/TextBox";
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
    <section className="py-10">
      <div className="px-20">
        <p className="text-5xl font-bold text-white mb-10">
          Why should you become a Campus Ambassador?
        </p>
        <hr className="my-4 mb-10" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-evenly">
        <div className="w-full md:w-1/2 rounded-md py-4 backdrop-blur-[2px]">
          <div className="w-full px-8">
            <ul className="space-y-6 list-none">
              {tasks.map((task, i) => (
                <li key={i} className="flex flex-col">
                  <span className="text-lime-400 text-xl font-bold font-sans">
                    {task.start}
                  </span>
                  <p className="text-emerald-100 font-sans text-lg font-bold">
                    {task.rest}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pb-10 md:w-1/3 w-full flex justify-center">
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
