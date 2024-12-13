import React from "react";
import Navbar from "../components/Navbar";
import AboutCA from "../components/ca_about";
import Job from "../components/ca_jobs";
import Home from "../components/ca_home";
import CARegistration from "../components/ca_register";
export default function CA() {
  return (
    <>
      <Navbar />
      <div>
        <main className="bg-[#140B29] h-[100vh]">
          {/* <AboutCA />
          <Job/> */}
          <CARegistration></CARegistration>
        </main>
      </div>
    </>
  );
}
