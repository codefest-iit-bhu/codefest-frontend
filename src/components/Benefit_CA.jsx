// import React, { useEffect, useState } from "react";
// import { useUser } from "../context/context";
// import axios from "../utils/axiosInstance";
// const tasks = [
//   {
//     start: "• A certificate of recognition, authenticated by the HoD",
//     rest: "of the Department of Computer Science and Engineering, IIT(BHU), that will boost your resume and showcase your leadership skills.",
//   },
//   {
//     start: "• Unlock a treasure chest of exciting goodies",
//     rest: "- perks you won't find anywhere else!",
//   },
//   {
//     start: "• Free access",
//     rest: "to exclusive workshops, seminars, and events organized by CodeFest that will enhance your knowledge and skills in various domains of coding.",
//   },
//   {
//     start: "• Build lasting connections and professional networks",
//     rest: "with like-minded peers within the vibrant CodeFest community.",
//   },
//   {
//     start: "• Track your impact",
//     rest: "and see your hard work pay off with the dynamic leaderboard on CodeFest’s official website. The top-ranked Campus Ambassadors will unlock exclusive rewards and recognition.",
//   },
//   {
//     start: "• A lifetime experience",
//     rest: "of being part of a dynamic community of coders eager to learn, innovate, and create an impact.",
//   },
// ];

// const BenefitsSection = () => {
//   // const { user } = useUser();
//   // const [caRequestExists, setCaRequestExists] = useState(false);
//   // useEffect(() => {
//   //   const fetchRequest = async () => {
//   //     const response = await axios.get("/ca/my", {
//   //       headers: {
//   //         Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //       },
//   //     });
//   //     if (response.data && Object.keys(response.data).length > 0) setCaRequestExists(true);
//   //   };

//   //   if (localStorage.getItem("token")) fetchRequest();
//   // }, [])
//   return (
//     <section className="py-10 flex flex-col items-center sm:px-3 lg:w-4/5">
//       {/* <div className="px-10 mt-12">
//         <p className="text-3xl md:text-5xl font-bold text-white mb-10 text-center">
//           Why should you become a
//           <img src="/campusAmbassdor.png" alt="Campus Ambassador" />
//         </p>
//       </div>

//       {
//         <div>
//           <button className="p-4 rounded-lg transition-all duration-500 hover:bg-orange-600 bg-orange-500 text-white text-lg font-bold" onClick={() => window.location.href = "/ca-register"}>
//             {
//               caRequestExists ? "Your Request" : "Register Now!"
//             }
//           </button>
//           <a href="/ca_leaderboard">
//             <button className="p-4 rounded-lg transition-all duration-500 hover:bg-gray-200 bg-white border-2 border-orange-500 text-orange-500 text-lg font-bold ml-5" onClick={() => window.location.href = "/ca-register"}>
//               CA Leaderboard
//             </button>
//           </a>
//           {
//             user?.role === "admin" &&
//             <a href="/allCaRequests">
//               <button className="p-4 rounded-lg bg-purple-500 hover:bg-purple-700 transition-all duration-500 text-white text-lg font-bold ml-5">Admin Panel</button>
//             </a>
//           }
//           {
//             caRequestExists &&
//             <button className="p-4 rounded-lg transition-all duration-500 hover:bg-orange-600 bg-orange-500 text-white text-lg font-bold ml-5" onClick={() => window.location.href = "/winzo-referrals"}>
//               Winzo Referral
//             </button>
//           }
//           {
//             (caRequestExists || user?.role === "admin") &&
//             <button className="p-4 rounded-lg transition-all duration-500 hover:bg-green-600 bg-green-500 text-white text-lg font-bold ml-5" onClick={() => window.location.href = "/winzo_leaderboard"}>
//               Winzo Leaderboard
//             </button>
//           }

//         </div>
//       } */}

// <ul className="w-full list-[circle] mt-5 flex flex-col gap-8">
//   {tasks.map((task, i) => (
//     <div key={i}>
//       <li className="flex flex-col w-full px-10 text-wrap font-mono text-lg md:text-2xl">
//         <span className="font-bold text-indigo-400">{task.start}</span>
//         {task.rest}
//       </li>
//       {(i == 2) && <img src="/cloud1.svg" className="w-1/2" alt="" />}
//     </div>
//   ))}
// </ul> 
//     </section>
//   );
// };

// export default BenefitsSection;


import React from 'react'
import whyImg from "../assets/CA_images/why.webp"

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

const Benefit_CA = () => {
  return (
    <div className='relative flex flex-col items-center justify-center my-10 px-5 md:px-20'>
      <img src={whyImg} alt="" />
    </div>
    
  )
}

export default Benefit_CA
