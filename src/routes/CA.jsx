// import React from "react";
// import Navbar from "../components/Navbar";
// import AboutCA from "../components/ca_about";
// import Job from "../components/ca_jobs";
// import Home from "../components/ca_home";
// export default function CA(){
//   return (
//     <>
//     <Navbar/>
//     <div >
//       <main >
//           {/* <AboutCA />
//           <Job/> */}
//           <Home/>
//      </main>
//     </div>
//     </>
//   );
// };


import BenefitsSection from "../components/Benefit_CA";
import FAQSection from "../components/faqCA"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function CA() {
  return (
    <>
      <Navbar />
      <div className="bg-[#140B29] w-screen flex flex-col items-center">
        <BenefitsSection/>
      </div>
      <div className="bg-[#140B29]">
        <FAQSection/>
      </div>
      <Footer />
    </>
  );
}
