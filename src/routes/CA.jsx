import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../backgrounds/Background";
import CaHero from "../components/CaHero";
import Benefit_CA from "../components/Benefit_CA";
import carBg from "../assets/CA_images/CArbg.webp";

export default function CA() {
  return (
    <>
      <div
        className="bg-cover bg-center bg-fixed bg-no-repeat min-h-screen"
        style={{ backgroundImage: `url(${carBg})` }}
      >
        <Navbar />
        <CaHero />
        
        <Benefit_CA />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
