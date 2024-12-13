import React from "react";
import perk from "../assets/CA_images/perks.svg";
import HeadingA from "../components/HeadingA";
import TextBox from "../components/TextBox";
import { useUser } from "../context/context";
import { useNavigate } from "react-router-dom";
const tasks = [
  {
    start: "• A certificate of recognition, authenticated by the HoD",
    rest: "of the Department of Computer Science and Engineering, IIT(BHU), that will boost your resume and showcase your leadership skills.",
  },
  {
    start: "• Unlock a treasure chest of exciting goodies",
    rest: "- perks you won't find anywhere else!",
  },
  {
    start: "• Free access",
    rest: "to exclusive workshops, seminars, and events organized by CodeFest that will enhance your knowledge and skills in various domains of coding.",
  },
  {
    start: "• Build lasting connections and professional networks",
    rest: "with like-minded peers within the vibrant CodeFest community.",
  },
  {
    start: "• Track your impact",
    rest: "and see your hard work pay off with the dynamic leaderboard on CodeFest’s official website. The top-ranked Campus Ambassadors will unlock exclusive rewards and recognition.",
  },
  {
    start: "• A lifetime experience",
    rest: "of being part of a dynamic community of coders eager to learn, innovate, and create an impact.",
  },
];

const BenefitsSection = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate()
  return (
    <section className="py-10 flex flex-col items-center sm:px-3 lg:w-4/5">
      <div className="px-10">
        <p className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">
          Why should you become a
          <img src="/campusAmbassdor.png" alt="" />
        </p>
      </div>

      {
        isAuthenticated &&
        <div>
          <a href="/ca-register">
            <button className="p-4 rounded-lg bg-orange-500 text-white text-lg font-bold">Register Now!</button>
          </a>
          {
            user.role === "admin" &&
            <a href="/allCaRequests">
              <button className="p-4 rounded-lg bg-purple-500 text-white text-lg font-bold ml-5">Admin Panel</button>
            </a>
          }
        </div>
      }

      <ul className="w-full list-[circle]">
        {tasks.map((task, i) => (
          <>
            <li key={i} className="flex flex-col w-full px-10 text-wrap font-mono text-lg md:text-2xl">
              <span className="font-bold">{task.start}</span>
              {task.rest}
            </li>
            {(i == 2) && <img src="/cloud1.svg" />}
          </>
        ))}
      </ul>
    </section>
  );
};

export default BenefitsSection;
