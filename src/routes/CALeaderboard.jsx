import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

// --- ASSETS ---
import spaceBg from "../assets/ca-leaderboard/space-bg.webp";
import parchmentBg from "../assets/ca-leaderboard/parchment-gears.webp";
import titleImg from "../assets/ca-leaderboard/title.webp";
import singleGear from "../assets/ca-leaderboard/gear-single.webp";
import clusterGear from "../assets/ca-leaderboard/gear-cluster.webp";

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
        
        // Handle different API structures (Array vs Object)
        const rawData = response.data;
        const data = Array.isArray(rawData) 
          ? rawData 
          : (rawData.data || rawData.leaderboard || []);

        // Logic to calculate Ranks (handling ties)
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
      
      <main 
        className="fixed inset-0 w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${spaceBg})` }}
      >
        
        {/* --- GEARS LAYER --- */}
        <Gear img={clusterGear} className="top-[-8%] left-[-8%] z-0 opacity-80" size="w-[45vw] md:w-[25vw]" reverse={true} />
        <Gear img={clusterGear} className="bottom-[-12%] right-[-5%] z-0 opacity-80" size="w-[50vw] md:w-[30vw]" />
        <Gear img={singleGear} className="bottom-[10%] left-[-5%] z-0 opacity-60" size="w-[20vw] md:w-[12vw]" reverse={true}/>
        <Gear img={singleGear} className="top-[-5%] right-[15%] z-0 opacity-50" size="w-[15vw] md:w-[10vw]" />

        {/* --- PARCHMENT CONTAINER --- */}
        <div 
          className="relative z-10 w-full h-full bg-cover bg-center md:bg-[length:100%_100%] bg-no-repeat flex flex-col items-center text-[#3e2723] font-mono pt-20 pb-[25%] md:pb-[6%]"
          style={{ backgroundImage: `url(${parchmentBg})` }}
        >
          
          {/* 1. TITLE GRAPHIC */}
          <img 
            src={titleImg} 
            alt="Leaderboard" 
            className="w-[50%] md:w-[25%] mt-1 mb-1 shrink-0 drop-shadow-lg transition-all duration-300 ease-in-out hover:drop-shadow-[0_0_25px_rgba(255,215,0,0.8)]"
          />

          {/* 2. REWARDS SECTION */}
          <div className="w-[90%] md:w-[80%] md:ml-[10%] text-center mb-1 border-b border-dotted border-[#3e2723] pb-1 shrink-0 z-10">
            <h3 className="text-[9px] md:text-xs font-bold uppercase mb-0 opacity-80">Rewards</h3>
            <div className="flex flex-wrap justify-center gap-2 md:gap-6 font-bold text-[9px] md:text-sm">
              <span className="text-[#8b0000]">1st: ₹5000</span>
              <span>2nd: ₹3000</span>
              <span className="text-[#5d4037]">3rd: ₹2000</span>
            </div>
          </div>

          {/* 3. TABLE AREA */}
          <div className="w-full flex-1 min-h-0 overflow-y-auto px-6 md:pl-[22%] md:pr-[8%] no-scrollbar">
            
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader />
              </div>
            ) : (
              <table className="w-full text-left border-collapse table-fixed text-xs md:text-sm">
                <thead className="sticky top-0 bg-[#e3dac9]/95 z-10 backdrop-blur-[2px]">
                  <tr className="border-b border-[#3e2723] font-bold uppercase">
                    <th className="w-[15%] md:w-[12%] py-1 text-center">Rank</th>
                    <th className="w-[45%] md:w-[38%] py-1 text-left pl-2">Name</th>
                    <th className="w-[25%] md:w-[35%] py-1 text-left hidden sm:table-cell">Institute</th>
                    <th className="w-[15%] py-1 text-right pr-2">Pts</th>
                  </tr>
                </thead>

                <tbody className="font-semibold">
                  {leaderboard.length > 0 ? (
                    leaderboard.map((entry, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-[#3e2723]/5 transition-colors border-b border-[#3e2723]/10"
                      >
                        <td className="py-1 text-center">{entry.rank}.</td>
                        <td className="py-1 pl-2 truncate">
                          {entry.name}
                          <div className="sm:hidden text-[8px] italic opacity-70 truncate">
                            {entry.institute}
                          </div>
                        </td>
                        <td className="py-1 hidden sm:table-cell italic opacity-80 truncate">
                          - {entry.institute}
                        </td>
                        <td className="py-1 text-right pr-2">{entry.points}</td>
                      </tr>
                    ))
                  ) : (
                    /* EMPTY STATE MESSAGE (Optional but good UX) */
                    <tr>
                      <td colSpan="4" className="text-center py-8 opacity-60 italic">
                        No participants yet. Be the first!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* 4. FOOTER */}
          <div className="absolute bottom-[8%] md:bottom-[2%] w-full text-center pointer-events-none">
            <p className="text-[8px] md:text-[10px] font-bold text-red-900 opacity-60">
              * Unfair means will lead to immediate disqualification.
            </p>
          </div>

        </div>
      </main>
    </>
  );
};

export default CALeaderboard;