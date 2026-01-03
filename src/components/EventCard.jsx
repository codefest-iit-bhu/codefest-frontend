
// import React from "react";
// import "./EventCard.css";

// const EventCard = ({ title, date, lastDateReg, img_src, img_bg_src }) => {
//   const hasEnded = new Date() > new Date(lastDateReg);

//   return (


//     <div
//       className={`event-card hover:scale-105 overflow-hidden transition-all bg-no-repeat bg-center duration-500 hover:bg-gray-900 z-[20] relative ${hasEnded ? "pointer-events-none opacity-60" : ""}`}
//       style={{ 
//         backgroundImage: `url(${img_bg_src})`,
//         // width: "400px",
//         // height: "500px",
//     }}
//     >
//       <div className="absolute top-0 left-0 w-full h-full max-[768px]:  max-[768px]:bg-opacity-60 pointer-events-none z-[-1]"></div>
//       <h2 className="event-title text-2xl font-bold sm:text-3xl z-[30]">
//         {title}
//       </h2>
//       <p className="event-date font-mono z-[30]">{date}</p>
//       {/* <hr className="divider z-[30]" /> */}
//       <p className="deadline font-mono sm:text-xl z-[30]">
//         Registration Deadline: <br /> {lastDateReg}
//       </p>
//       {hasEnded && (
//         <>
//           <span className="text-red-600 z-[30]">Registration Closed</span>
//         </>
//       )}
//     </div>

//   );
// };

// export default EventCard;  


// import React, { useState, useRef, useEffect } from 'react';

// const TicketGenerator = ({ title, date, lastDateReg, img_src, img_bg_src }) => {
//     const canvasRef = useRef(null);
//     const regText = "";
//     if(date > lastDateReg){
//       regText = "Registration Closed";
//     }
//     const [text, setText] = useState(`${title}\n${date}\nRegistration Deadline: ${lastDateReg}\n${regText}`);
//     const [imgSrc, setImgSrc] = useState(img_bg_src);
//     const [imgObj, setImgObj] = useState(null);

//     // Transformation States
//     const [position, setPosition] = useState({ x: 0.20, y: 0.47 });
//     const [fontSizePercent, setFontSizePercent] = useState(0.07);
//     const [rotation, setRotation] = useState(-10);
//     const [imgScale, setImgScale] = useState(100); // Percentage of original size

//     // Load Image Object
//     useEffect(() => {
//         const img = new Image();
//         img.src = imgSrc;
//         img.onload = () => {
//             setImgObj(img);
//         };
//     }, [imgSrc]);

//     useEffect(() => {
//         if (imgObj && canvasRef.current) {
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext('2d');

//             // Set actual canvas resolution based on Scale Slider
//             canvas.width = imgObj.width * (imgScale / 100);
//             canvas.height = imgObj.height * (imgScale / 100);

//             // 1. Draw Background (Scaled)
//             ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);

//             // 2. Setup Font (Scales relative to new canvas height)
//             const dynamicFontSize = Math.floor(canvas.height * fontSizePercent);
//             ctx.fillStyle = "white";
//             ctx.font = `${dynamicFontSize}px 'Georgia', serif`;
//             ctx.textBaseline = "top";

//             // 3. Transformation Logic
//             const startX = canvas.width * position.x;
//             const startY = canvas.height * position.y;
//             const angleInRadians = (rotation * Math.PI) / 180;

//             ctx.save();
//             ctx.translate(startX, startY);
//             ctx.rotate(angleInRadians);

//             // 4. Draw Multiline Text
//             const lines = text.split('\n');
//             const lineHeight = dynamicFontSize * 1.2;

//             lines.forEach((line, index) => {
//                 ctx.fillText(line, 0, index * lineHeight);
//             });

//             ctx.restore();
//         }
//     }, [text, imgObj, position, fontSizePercent, rotation, imgScale]);

//     const handleImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 setImgSrc(event.target.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleDownload = () => {
//         const link = document.createElement('a');
//         link.download = 'vintage-ticket.png';
//         link.href = canvasRef.current.toDataURL('image/png');
//         link.click();
//     };

//     return (
//         <div style={{ padding: '20px', maxWidth: '1000px', fontFamily: 'sans-serif', margin: 'auto' }}>

//             {imgObj && (
//                 <div style={{ marginTop: '30px', textAlign: 'center' }}>
//                     <div style={{ overflow: 'auto', borderRadius: '8px' }}>
//                         <canvas ref={canvasRef} style={{ display: 'block', margin: 'auto' }} />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TicketGenerator;



import React, { useState, useRef, useEffect } from "react";

/**
 * TicketGenerator
 *
 * - Draws an image to a canvas and overlays multiple text elements.
 * - Each text element (title, date, deadline, reg status) has its own style.
 * - All text elements share the same anchor point (position.x, position.y) and rotation.
 *
 * Props:
 * - title, date, lastDateReg, img_src, img_bg_src
 * - optional `styles` object to override defaults (see defaultStyles shape)
 */
const TicketGenerator = ({
  title = "Event Title",
  date = "2026-01-25",
  lastDateReg = "2026-01-20",
  img_src,
  img_bg_src,
  styles = {}, // optional override
}) => {
  const canvasRef = useRef(null);

  // compute registration status
  const hasEnded = new Date() > new Date(lastDateReg);
  const regText = hasEnded ? "Registration Closed" : "";

  // image source state (allows upload/replace)
  const [imgSrc, setImgSrc] = useState(img_bg_src || img_src || "");
  const [imgObj, setImgObj] = useState(null);

  // Transformation / layout state (single origin for all text)
  const [position, setPosition] = useState({ x: 0.20, y: 0.47 }); // normalized (0..1)
  const [rotation, setRotation] = useState(-10); // degrees, shared for all text
  const [imgScale, setImgScale] = useState(100); // percentage to scale image/canvas

  // Default styles for each text element (can be overridden via props.styles)
  const defaultStyles = {
    title: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSizePercent: 0.07, // relative to canvas height
      color: "#ffffff",
      fontWeight: "700",
      lineSpacing: 1.1, // multiplier of line height (if multi-line)
      textAlign: "left",
    },
    date: {
      fontFamily: "'Courier New', monospace",
      fontSizePercent: 0.035,
      color: "#fffbf0",
      fontWeight: "400",
      lineSpacing: 1.0,
      textAlign: "left",
    },
    deadline: {
      fontFamily: "'Courier New', monospace",
      fontSizePercent: 0.045,
      color: "#ffd166",
      fontWeight: "600",
      lineSpacing: 1.0,
      textAlign: "left",
    },
    reg: {
      fontFamily: "'Courier New', monospace",
      fontSizePercent: 0.04,
      color: "#ff5c5c",
      fontWeight: "700",
      lineSpacing: 1.0,
      textAlign: "left",
    },
  };

  // Merge defaults with any provided overrides
  const mergedStyles = {
    title: { ...defaultStyles.title, ...(styles.title || {}) },
    date: { ...defaultStyles.date, ...(styles.date || {}) },
    deadline: { ...defaultStyles.deadline, ...(styles.deadline || {}) },
    reg: { ...defaultStyles.reg, ...(styles.reg || {}) },
  };

  // Load the image object whenever imgSrc changes
  useEffect(() => {
    if (!imgSrc) {
      setImgObj(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous"; // in case you load from other origin
    img.src = imgSrc;
    img.onload = () => setImgObj(img);
    img.onerror = () => {
      console.error("Failed to load image:", imgSrc);
      setImgObj(null);
    };
  }, [imgSrc]);

 const splitAfterHyphen = (text) => {
  if (!text || typeof text !== "string") return [text];

  const idx = text.indexOf("-");
  if (idx === -1) return [text];

  return [
    text.slice(0, idx + 1), // include hyphen
    text.slice(idx + 1),    // rest goes to next line
  ];
};



  // Main drawing effect — runs whenever dependencies change
  useEffect(() => {
    if (!imgObj || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Scale canvas resolution according to imgScale percentage
    const scaleFactor = imgScale / 100;
    canvas.width = Math.max(1, Math.round(imgObj.width * scaleFactor));
    canvas.height = Math.max(1, Math.round(imgObj.height * scaleFactor));

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the background image to fill canvas
    // You can change drawImage params to cover / contain behavior if desired.
    ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);

    // Shared origin in pixels
    const originX = canvas.width * position.x;
    const originY = canvas.height * position.y;

    // Convert rotation to radians and prepare transform
    const angleRad = (rotation * Math.PI) / 180;

    // Prepare the lines in order with their styles
//    const lines = [
//   ...splitByHyphen(title).map(t => ({ text: t, style: mergedStyles.title })),

//   ...splitByHyphen(date).map(t => ({ text: t, style: mergedStyles.date })),

//   { text: "Registration Deadline:", style: mergedStyles.deadline },

//   ...splitByHyphen(lastDateReg).map(t => ({ text: t, style: mergedStyles.deadline })),

//   ...(regText
//     ? splitByHyphen(regText).map(t => ({ text: t, style: mergedStyles.reg }))
//     : []),
// ];
const lines = [
  ...splitAfterHyphen(title).map(t => ({ text: t, style: mergedStyles.title })),

  ...splitAfterHyphen(date).map(t => ({ text: t, style: mergedStyles.date })),

  { text: "Registration Deadline:", style: mergedStyles.deadline },

  ...splitAfterHyphen(lastDateReg).map(t => ({ text: t, style: mergedStyles.deadline })),

  ...(regText
    ? splitAfterHyphen(regText).map(t => ({ text: t, style: mergedStyles.reg }))
    : []),
];



    // Save context and transform around origin
    ctx.save();
    ctx.translate(originX, originY);
    ctx.rotate(angleRad);

    // We will draw lines starting at (0,0) and move down
    // Use each style's fontSizePercent to compute its own font size in px.
    let currentY = 0;
    for (let i = 0; i < lines.length; i++) {
      const { text, style } = lines[i];

      // compute font size in px relative to canvas height
      const fontSizePx = Math.max(8, Math.floor(canvas.height * (style.fontSizePercent || 0.04)));

      // build font string (we include weight and family)
      const fontWeight = style.fontWeight || "400";
      const fontFamily = style.fontFamily || "serif";
      ctx.font = `${fontWeight} ${fontSizePx}px ${fontFamily}`;

      // fill style
      ctx.fillStyle = style.color || "#ffffff";

      // Optional stroke for better contrast (comment if not needed)
      // ctx.lineWidth = Math.ceil(fontSizePx * 0.08);
      // ctx.strokeStyle = "rgba(0,0,0,0.6)";
      // ctx.strokeText(text, 0, currentY);

      // Draw text
      // textAlign is left by default; if centre/right required, handle here
      ctx.textBaseline = "top";
      ctx.fillText(text, 0, currentY);

      // advance currentY based on this line's spacing
      const lineSpacing = style.lineSpacing || 1.2;
      currentY += fontSizePx * lineSpacing;
    }

    ctx.restore();
  }, [imgObj, title, date, lastDateReg, regText, position, rotation, imgScale, mergedStyles]);

  // handle file uploads for image (keeps existing UI code)
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImgSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "ticket.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "auto", fontFamily: "sans-serif" }}>

      <div style={{ textAlign: "center" }}>
        {imgObj ? (
          <div style={{ display: "inline-block", position: "relative", overflow: "visible", borderRadius: 8 }}>
            <canvas
              ref={canvasRef}
              style={{
                display: "block",
                maxWidth: "100%",
                height: "auto",
                boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              }}
            />
          </div>
        ) : (
          <div style={{ padding: 40, color: "#666" }}>No image loaded yet</div>
        )}
      </div>
    </div>
  );
};

export default TicketGenerator;
