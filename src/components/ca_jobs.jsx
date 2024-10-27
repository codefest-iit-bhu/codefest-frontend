import React from "react";
import styles from "./About.module.css";
import aboutImage from "../assets/images_2.jpeg"; // Adjust the path as necessary

const Job = () => {
  return (
    <div className={styles.aboutContainers}>
        <div className={styles.aboutHeading}>
      <h1><b>What is the Campus Ambassador's Job?</b></h1>
      </div>
      <div className={styles.aboutContainer}>
      <div className={styles.aboutImage}>
        <img src={aboutImage} alt="Work Image" />
      </div>
      <div className={styles.aboutHead}>
        <ul>
          <li>
            <span className="text-vermilion ">Coordinating </span>
            with our organizing team to facilitate the participation process for students from your college.
          </li>
          <li>
            <span className="text-vermilion ">Creating awareness </span>
            about CodeFest in your respective colleges by circulating posters, mails or messages in the official college groups.
          </li>
          <li>
            <span className="text-vermilion ">Promoting CodeFest </span>
            in your college campus and through various social media platforms, including but not limited to Facebook, Instagram, and LinkedIn.
          </li>
          <li>
            <span className="text-vermilion ">Encouraging students </span>
            from your college to participate in the event and engage in the various activities and competitions.
          </li>
          <li>
            <span className="text-vermilion ">Providing feedback and suggestions </span>
            to enhance the overall experience of participants.
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Job;
