import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Background from "../backgrounds/Background";
import CaHero from "../components/CaHero";
import Benefit_CA from "../components/Benefit_CA";

export default function CA() {
  return (
    <>
      <div className="bg-[url('src/assets/CA_images/Capage.png')] bg-cover bg-center min-h-screen">
        <Navbar />
        <CaHero />
        <Benefit_CA />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
