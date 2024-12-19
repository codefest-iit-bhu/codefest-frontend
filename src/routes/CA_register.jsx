import React from "react";
import Navbar from "../components/Navbar";
import CARegistration from "../components/ca_register";
export default function CA() {
  return (
    <>
      <Navbar />
      <div>
        <main className="bg-[#140B29] h-[100vh]">
          <CARegistration></CARegistration>
        </main>
      </div>
    </>
  );
}
