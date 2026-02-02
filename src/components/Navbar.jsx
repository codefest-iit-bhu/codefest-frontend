import React, { useState } from "react";
import Linker from "./Link";
import LogoutButton from "../components/LogoutButton";
import { useUser } from "../context/context";
import { Link } from "react-router-dom";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="relative w-screen h-12 font-bree font-bold text-[#421F00]">
        <img
          src="/Navbar/NavBackground.png"
          alt="NavBackground"
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
        <nav className="hidden lg:flex w-full h-full absolute z-10 justify-between items-center">
          <img
            src="/Navbar/NavStart.png"
            alt="NavStart"
            className="w-auto h-auto relative right-4"
          />
          <Linker text="Main" href="/" />
          <Linker text="Events" href="/events" />
          <Linker text="CA" href="/CA" />
          {isAuthenticated ? (
            <>
              <Linker text="My Teams" href="/myTeams" />
              {/* <Linker text="Games" href="/games" /> */}

              {/* Admin Only - Stock Game Admin */}
              {user?.role === "admin" && (
                <Linker text="Game Admin" href="/stock-game-admin" />
              )}

              <div className="bg-[url('/Navbar/NavButton.png')] w-[91px] h-[24px] font-semibold text-center">
                <LogoutButton />
              </div>
            </>
          ) : (
            <button
              className="w-[105px] h-[30px] text-center"
              style={{
                backgroundImage: "url('/Navbar/Navbutton2.svg')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Link to={"/login"}>Login/Signup</Link>
            </button>
          )}

          <img
            src="../Navbar/NavEnd.png"
            alt="NavEnd"
            className="w-auto h-auto relative left-4"
          />
        </nav>

        <div className="lg:hidden flex justify-end items-center pr-6 relative z-20 h-12">
          <button
            className="h-[50%] w-[25vw] font-bold text-xl text-[#421F00] flex items-center justify-center"
            onClick={toggleSidebar}
            style={{
              backgroundImage: "url('/Navbar/Navbutton2.svg')",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          >
            Menu
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75 z-10 transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSidebar}
        ></div>

        <div
          className={`fixed top-0 left-0 h-full w-72 bg-[#402605] text-white z-50 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col justify-around h-[90vh] p-4 space-y-4 items-stretch overscroll-none">
            <div
              className="h-[10%] w-full flex items-center justify-center font-bold text-2xl text-[#f0dd90] hover:bg-[#f0dd90] hover:text-black transition-all duration-500 p-5"
              onClick={closeSidebar}
            >
              Close
            </div>
            <Link
              to="/"
              className="h-[10%]  w-auto flex items-center justify-center font-bold text-2xl text-[#f0dd90] hover:bg-[#f0dd90] hover:text-black transition-all duration-500 p-5"
            >
              Main
            </Link>
            <Link
              to="/events"
              className="h-[10%] w-full flex items-center justify-center font-bold text-2xl text-[#f0dd90] hover:bg-[#f0dd90] hover:text-black transition-all duration-500 p-5"
            >
              Events
            </Link>
            <Link
              to="/CA"
              className="h-auto w-full flex items-center justify-center font-bold text-2xl text-[#f0dd90] hover:bg-[#f0dd90] hover:text-black transition-all duration-500 p-5"
            >
              CA
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/myTeams"
                  className="h-[10%] w-full flex items-center justify-center font-bold text-2xl text-[#f0dd90] hover:bg-[#f0dd90] hover:text-black transition-all duration-500 p-5"
                >
                  MyTeams
                </Link>
{/* 
                <Link
                  to="/games"
                  className="h-[10%] w-full flex items-center justify-center font-bold text-2xl text-[#f0dd90] hover:bg-[#f0dd90] hover:text-black transition-all duration-500 p-5"
                >
                  Games
                </Link> */}

                {/* Admin Only - Stock Game Admin */}
                {user?.role === "admin" && (
                  <Link
                    to="/stock-game-admin"
                    className="h-[10%] w-full flex items-center justify-center font-bold text-2xl text-[#f0dd90] hover:bg-[#f0dd90] hover:text-black transition-all duration-500 p-5"
                  >
                    Game Admin
                  </Link>
                )}

                <div className="h-auto w-full flex items-center justify-center font-bold text-2xl text-[#f0dd90] hover:bg-[#f0dd90] hover:text-[#fc0d05] transition-all duration-500 p-5">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="h-[10%] w-full flex items-center justify-center font-bold text-2xl text-[#f0dd90] hover:bg-[#f0dd90] hover:text-black transition-all duration-500 p-5"
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>
        <div className="h-12"></div>
      </div>
    </>
  );
}

export default Navbar;
