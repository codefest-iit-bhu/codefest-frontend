import BenefitsSection from "../components/Benefit_CA";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function CA() {
  return (
    <>
      <Navbar />
      <div className="bg-[#140B29] w-screen flex flex-col items-center">
        <BenefitsSection />
      </div>
      <div className="bg-[#140B29] ">
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
