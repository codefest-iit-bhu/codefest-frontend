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
