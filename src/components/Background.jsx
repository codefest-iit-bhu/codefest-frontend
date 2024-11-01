import { useState, useEffect } from "react";
import "./Background.css";

const Background = () => {
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(30);
  const ASCII_CHARS = " .:-=+*#%"; 

  const calculateDimensions = () => {
    const charWidth = 10; 
    const charHeight = 18; 

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
        
        const randomValue = Math.random();
        
        const index = Math.floor(randomValue * (ASCII_CHARS.length));
        row += ASCII_CHARS[index];
      }
      buffer.push({ text: row, y: y }); 
    }

    return buffer;
  };

  const getGradientColor = (y) => {
    
    const distanceFromCenter = Math.abs(y - height / 2);
    const maxDistance = height / 2; 
    const ratio = distanceFromCenter / maxDistance;

    
    const a=0.7;
    
    const r = Math.round((255*a) * (1 - ratio) + 50 * ratio); 
    const g = Math.round((215*a) * (1 - ratio) + 50 * ratio); 
    const b = Math.round(0 * (1 - ratio) + 50 * ratio); 

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
