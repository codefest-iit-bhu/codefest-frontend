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
import Navbar from "../components/Navbar";

export default function CA() {
  return (
    <>
      <Navbar />
      <div>
        <BenefitsSection/>
      </div>
      <div>
        <FAQSection/>
      </div>
    </>
  );
}
