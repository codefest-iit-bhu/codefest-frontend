import React from "react";
import styles from "./About.module.css";
import aboutImage from "../assets/about_ca.avif";

const About = () => {
  return (
    
    <div className={styles.aboutContainers}>
      <div className={styles.aboutHeading}>
      <h1><b>What is the Campus Ambassador Program?</b></h1>
      </div>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutImage}>
          <img src={aboutImage} alt="About CodeFest" />
        </div>
        <div className={styles.aboutHead}>
          <p>
            The CA program is our warm invitation to all you dynamic and
            enthusiastic students who are eager to represent the spirit of
            CodeFest’24 team in your campus.
          </p>
          <p>
            Accompanied with the opportunity to foster innovation and build
            connections, are the exclusive perks, exciting goodies, and
            well-deserved rewards.
          </p>
        </div>
        </div>

    </div>
  );
};

export default About;
