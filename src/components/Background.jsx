import React, { useState, useEffect } from "react";
import "./Background.css";

const Background = () => {
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(30);
  const ASCII_CHARS = " .:-=+*#%"; // A gradient of ASCII characters for different levels of intensity

  const calculateDimensions = () => {
    const charWidth = 10; // Approximate width of a character in pixels
    const charHeight = 18; // Approximate height of a character in pixels

    const newWidth = Math.floor(window.innerWidth / charWidth);
    const newHeight = Math.floor(window.innerHeight / charHeight);

    setWidth(newWidth);
    setHeight(newHeight);
  };

  useEffect(() => {
    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, []);

  const generateRandomPattern = () => {
    let buffer = [];

    for (let y = 0; y < height; y++) {
      let row = "";
      for (let x = 0; x < width; x++) {
        // Generate a random value between 0 and 1
        const randomValue = Math.random();
        // Map the random value to an ASCII character based on intensity
        const index = Math.floor(randomValue * (ASCII_CHARS.length));
        row += ASCII_CHARS[index];
      }
      buffer.push({ text: row, y: y }); // Store row text along with its Y position
    }

    return buffer;
  };

  const getGradientColor = (y) => {
    // Calculate the distance from the center
    const distanceFromCenter = Math.abs(y - height / 2);
    const maxDistance = height / 2; // Maximum distance to the edges
    const ratio = distanceFromCenter / maxDistance;

    // Define colors
    const a=0.7;
    // Interpolate between the colors based on the ratio
    const r = Math.round((255*a) * (1 - ratio) + 50 * ratio); // Ranges from gold to dark gray
    const g = Math.round((215*a) * (1 - ratio) + 50 * ratio); // G ranges from gold to dark gray
    const b = Math.round(0 * (1 - ratio) + 50 * ratio); // B remains constant at 0

    return `rgb(${r}, ${g}, ${b})`;
  };

  const pattern = generateRandomPattern();

  return (
    <div className="ascii-background">
      {pattern.map((row, index) => (
        <div key={index} style={{ color: getGradientColor(row.y) }}>
          {row.text}
        </div>
      ))}
    </div>
  );
};

export default Background;
