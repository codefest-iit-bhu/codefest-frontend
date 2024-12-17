import React, { useState } from "react";
import Link from "./Link";
import LogoutButton from "../components/LogoutButton";
import { useUser } from "../context/context";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated } = useUser();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="h-12 flex justify-evenly items-center absolute top-0 left-0 w-full bg-[#4E4040] z-[10]">
        <nav className="hidden lg:flex text-white w-full py-1">
          <div className="flex space-x-4 w-full">
            <Link text="Main" href="/" />
            <Link text="Events" href="/events" />
            <Link text="CA" href="/CA" />
            {isAuthenticated ? (
              <>
                <Link text="My Teams" href="/myTeams" />
                <LogoutButton />
              </>
            ) : (
              <Link text="Login/Register" href="/login" />
            )}
          </div>
        </nav>

        <div className="lg:hidden flex items-center">
          <Link
            className="flex items-center w-fit text-white mx-4 mt-4 font-bold text-2xl"
            href="/home"
          >
            CodeFest
          </Link>

          <div className="flex w-full items-center justify-end">
            <button
              className="h-[1.5rem] w-fit mx-4 mt-4 flex items-center justify-center font-bold text-2xl text-white"
              onClick={toggleSidebar}
            >
              [
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              </svg>
              ]
            </button>
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-full bg-gray-800 bg-opacity-75 z-10 transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          onClick={closeSidebar}
        ></div>

        <div
          className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white z-20 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full p-4 space-y-4">
            <div
              className="h-[1.5rem] w-full flex items-center justify-center font-bold text-2xl text-gray-500 hover:bg-gray-400 hover:text-black"
              onClick={closeSidebar}
            >
              [ Close ]
            </div>
            <Link text="Home" href="/" />
            <Link text="Events" href="/events" />
            <Link text="CA" href="/CA" />
            {isAuthenticated ? (
              <>
                <Link text="My Teams" href="/myTeams" />
                <LogoutButton />
              </>
            ) : (
              <Link text="Login/Register" href="/login" />
            )}
          </div>
        </div>
      </div>
      <div className="block h-10"></div>
    </>
  );
}

export default Navbar;