import React from "react";
import Navbar from "../components/Navbar";
import AboutCA from "../components/ca_about";
import Job from "../components/ca_jobs";
export default function CA(){
  return (
    <>
    <Navbar/>
    <div >
      <main >
          <AboutCA />
          <Job/>
      </main>
    </div>
    </>
  );
};


