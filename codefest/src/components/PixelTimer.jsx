import React, { useEffect, useState } from "react";
import "./PixelTimer.css";

const PixelTimer = ({ height = "150px", width = "500px" }) => {
  const targetDate = new Date("2025-01-03T00:00:00"); // Hardcoded target date
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  function calculateTimeLeft(target) {
    const now = new Date();

    let months = target.getMonth() - now.getMonth();
    let days = target.getDate() - now.getDate();
    let hours = target.getHours() - now.getHours();
    let minutes = target.getMinutes() - now.getMinutes();
    let seconds = target.getSeconds() - now.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const prevMonthDays = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthDays;
      months--;
    }
    if (months < 0) {
      months += 12;
    }

    return { months, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const renderTimeUnits = () => {
    const units = [];
    if (timeLeft.months > 0) units.push({ label: "Months", value: timeLeft.months });
    if (timeLeft.days > 0 || units.length > 0) units.push({ label: "Days", value: timeLeft.days });
    if (timeLeft.hours > 0 || units.length > 0) units.push({ label: "Hours", value: timeLeft.hours });
    if (timeLeft.minutes > 0 || units.length > 0) units.push({ label: "Minutes", value: timeLeft.minutes });
    units.push({ label: "Seconds", value: timeLeft.seconds });

    return units.map((unit, index) => (
      <React.Fragment key={index}>
        <div className="timer-section">
          <span className="timer-value">{String(unit.value).padStart(2, "0")}</span>
          <span className="timer-label">{unit.label}</span>
        </div>
        {index < units.length - 1 && <span className="timer-colon">:</span>}
      </React.Fragment>
    ));
  };

  return (
    <div className="timer-container" style={{ height, width }}>
      <div className="timer-frame">{renderTimeUnits()}</div>
    </div>
  );
};

export default PixelTimer;
