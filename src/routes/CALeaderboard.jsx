import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

// --- ASSET IMPORTS ---
import spaceBg from "../assets/space-bg.png";
import parchmentBg from "../assets/parchment-gears.png";
import titleImg from "../assets/title.png";
import singleGear from "../assets/gear-single.png";
import clusterGear from "../assets/gear-cluster.png";

// --- REUSABLE GEAR COMPONENT ---
const Gear = ({ img, className, reverse = false, size = "w-24" }) => {
  return (
    <img 
      src={img} 
      alt="decorative gear"
      className={`absolute ${size} opacity-90 pointer-events-none drop-shadow-2xl ${
        reverse ? "animate-spin-reverse" : "animate-spin-slow"
      } ${className}`} 
    />
  );
};

const CALeaderboard = () => {
  const [leaderboard, setLeaderborad] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("/ca/leaderboard");
        const data = response.data;
        
        // Sorting Logic: Sort by points (descending)
        let currentRank = 1;
        let board = [];
        for (let i = 0; i < data.length; i++) {
          let rank;
          if (i > 0 && data[i].points === data[i - 1].points) {
            rank = currentRank;
          } else {
            rank = i + 1;
          }
          currentRank = rank;
          board.push({ ...data[i], rank });
        }
        setLeaderborad(board);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      
      {/* --- MAIN BACKGROUND --- */}
      <main 
        className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${spaceBg})` }}
      >
        
        {/* --- DECORATIVE GEARS LAYER (Behind Parchment) --- */}
        
        {/* 1. TOP LEFT: Large Cluster hanging from corner */}
        <Gear 
          img={clusterGear} 
          className="top-[-8%] left-[-8%] z-0 opacity-80" 
          size="w-[45vw] md:w-[25vw]" 
          reverse={true} 
        />

        {/* 2. BOTTOM RIGHT: Large Cluster anchoring the bottom */}
        <Gear 
          img={clusterGear} 
          className="bottom-[-12%] right-[-5%] z-0 opacity-80" 
          size="w-[50vw] md:w-[30vw]" 
        />

        {/* 3. BOTTOM LEFT: Single Gear spinning fast */}
        <Gear 
          img={singleGear} 
          className="bottom-[10%] left-[-5%] z-0 opacity-60" 
          size="w-[20vw] md:w-[12vw]" 
          reverse={true}
        />

        {/* 4. TOP RIGHT: Small Single Gear floating */}
        <Gear 
          img={singleGear} 
          className="top-[-5%] right-[15%] z-0 opacity-50" 
          size="w-[15vw] md:w-[10vw]" 
        />


        {/* --- PARCHMENT CONTAINER (On top of gears) --- */}
        <div 
          className="relative z-10 w-full h-full bg-cover bg-center md:bg-[length:100%_100%] bg-no-repeat flex flex-col items-center text-[#3e2723] font-mono pt-20 pb-[25%] md:pb-[8%]"
          style={{ backgroundImage: `url(${parchmentBg})` }}
        >
          
          {/* 1. TITLE GRAPHIC */}
          <img 
            src={titleImg} 
            alt="Leaderboard" 
            className="w-[55%] md:w-[30%] mt-2 mb-2 shrink-0 drop-shadow-lg"
          />

          {/* 2. REWARDS SECTION */}
          <div className="w-[90%] md:w-[80%] md:ml-[10%] text-center mb-2 border-b-2 border-dotted border-[#3e2723] pb-2 shrink-0 z-10">
            <h3 className="text-[10px] md:text-sm font-bold uppercase mb-1 opacity-80">Rewards</h3>
            <div className="flex flex-wrap justify-center gap-2 md:gap-6 font-bold text-[10px] md:text-base">
              <span className="text-[#8b0000]">1st: ₹5000</span>
              <span>2nd: ₹3000</span>
              <span className="text-[#5d4037]">3rd: ₹2000</span>
            </div>
          </div>

          {/* 3. TABLE AREA */}
          {/* flex-1 & min-h-0 handle the vertical scroll logic */}
          <div className="w-full flex-1 min-h-0 overflow-y-auto px-6 md:pl-[22%] md:pr-[8%] no-scrollbar">
            
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader />
              </div>
            ) : (
              <table className="w-full text-left border-collapse table-fixed">
                <thead className="sticky top-0 bg-[#e3dac9]/95 z-10 backdrop-blur-[2px]">
                  <tr className="border-b-2 border-[#3e2723] text-xs md:text-xl font-bold uppercase">
                    <th className="w-[15%] md:w-[12%] py-2 text-center">Rank</th>
                    <th className="w-[45%] md:w-[38%] py-2 text-left pl-2">Name</th>
                    <th className="w-[25%] md:w-[35%] py-2 text-left hidden sm:table-cell">Institute</th>
                    <th className="w-[15%] py-2 text-right pr-2">Pts</th>
                  </tr>
                </thead>

                <tbody className="text-xs md:text-lg font-semibold">
                  {leaderboard.map((entry, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-[#3e2723]/5 transition-colors border-b border-[#3e2723]/20"
                    >
                      <td className="py-2 text-center">{entry.rank}.</td>
                      <td className="py-2 pl-2 truncate">
                        {entry.name}
                        {/* Mobile Subtext for Institute */}
                        <div className="sm:hidden text-[9px] italic opacity-70 truncate">
                          {entry.institute}
                        </div>
                      </td>
                      <td className="py-2 hidden sm:table-cell italic opacity-80 truncate">
                        - {entry.institute}
                      </td>
                      <td className="py-2 text-right pr-2">{entry.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 4. FOOTER WARNING */}
          <div className="absolute bottom-[8%] md:bottom-[2%] w-full text-center pointer-events-none">
            <p className="text-[9px] md:text-[10px] font-bold text-red-900 opacity-60">
              * Unfair means will lead to immediate disqualification.
            </p>
          </div>

        </div>
      </main>
    </>
  );
};

export default CALeaderboard;