import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./About.module.css";
import aboutImage from "../assets/home_ca.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.aboutContainers}>
      <div className={styles.aboutHeading}>
        <h1 className="text-vermilion">
          <b>CodeFest '24</b>
        </h1>
      </div>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutHead}>
          <p className="mt-2 text-xl">Imagine. Create. Iterate.</p>
          <p className="mt-1 text-xl">IIT (BHU), Varanasi | February 2025</p>
          <h2 className="text-2xl font-semibold">
            Want to be a part of the <span className="text-vermilion">BIGGEST</span> coding festival of the country?
          </h2>
          <p className="mt-2">
            Be part of <span className="text-vermilion">CODEFEST'24</span> by becoming our{" "}
            <span className="text-vermilion">CAMPUS AMBASSADOR</span>.
          </p>
          <button
            className="mt-6 bg-brown-600 text-white hover:bg-vermilion flex items-center justify-center px-6 py-2 rounded-lg"
            onClick={() => navigate("/ca-register")}
          >
            REGISTER
          </button>
        </div>
        <div className={styles.aboutImage}>
          <img src={aboutImage} alt="About CodeFest" />
        </div>
      </div>
    </div>
  );
};

export default Home;
