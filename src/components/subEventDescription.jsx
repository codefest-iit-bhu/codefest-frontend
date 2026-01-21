import React, { useEffect, useRef } from "react";
import events from "../store/events";
import eventLine from "../assets/eventlin.webp";

const SubEventDescription = ({ eventId }) => {
  const event = events.find((e) => e.id === eventId);
  const canvasRef = useRef(null);

  // Initial canvas drawing
  useEffect(() => {
    if (!event) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "/mTicket.png";

    img.onload = () => {
      document.fonts.ready.then(() => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const labelFont = "bold 24px 'Mate SC', serif";
        const valueFont = "bold 20px 'Mate SC', serif";
        const labelColor = "#800000";
        const valueColor = "#000000";

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const drawWrappedText = (text, x, y, maxWidth, lineHeight) => {
          const words = text.split(" ");
          let line = "";
          let lines = [];

          for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + " ";
            if (ctx.measureText(testLine).width > maxWidth && n > 0) {
              lines.push(line);
              line = words[n] + " ";
            } else {
              if (ctx.measureText(words[n]).width > maxWidth) {
                if (line.trim().length > 0) {
                  lines.push(line);
                  line = "";
                }
                let longWord = words[n];
                while (ctx.measureText(longWord).width > maxWidth) {
                  let sub = longWord;
                  while (
                    ctx.measureText(sub + "-").width > maxWidth &&
                    sub.length > 0
                  ) {
                    sub = sub.slice(0, -1);
                  }
                  lines.push(sub + "-");
                  longWord = longWord.slice(sub.length);
                }
                line = longWord + " ";
              } else {
                line = testLine;
              }
            }
          }
          lines.push(line);

          const totalHeight = lines.length * lineHeight;
          let startY = y - totalHeight / 2 + lineHeight / 2;
          if (lines.length === 1) startY = y;

          lines.forEach((l, i) => {
            ctx.fillText(l.trim(), x, startY + i * lineHeight);
          });
        };

        const drawSection = (label, value, yBase) => {
          const maxWidth = canvas.width * 0.55;
          ctx.font = labelFont;
          ctx.fillStyle = labelColor;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          ctx.fillText(label, canvas.width / 2, yBase - 25);

          ctx.font = valueFont;
          ctx.fillStyle = valueColor;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
          drawWrappedText(
            value || "TBA",
            canvas.width / 2,
            yBase + 25,
            maxWidth,
            24
          );
        };

        const platform = event.platform || "TBA";
        drawSection("Platform:", platform, img.height * 0.18);
        drawSection("Date:", event.date, img.height * 0.48);
        drawSection(
          "Duration:",
          event.duration || "See Details",
          img.height * 0.78
        );
      });
    };
  }, [event]);

  if (!event) return null;

  // Clean string
  const cleanString = (str) => {
    if (!str) return "";
    let cleaned = str.replace(/^(\s*[a-z]+:\s*`?\s*)+/gi, "");
    cleaned = cleaned.replace(/`\s*$/, "");
    return cleaned.trim();
  };

  // Simple format text - just handle line breaks and bullets
  const formatText = (text) => {
    if (!text) return "";

    let formatted = cleanString(text);

    // Replace newlines with <br>
    //formatted = formatted.replace(/\n/g, "<br/>");

    return formatted;
  };

  // Define all possible detail sections
 const detailSections = [
   { key: "description", title: "Description" },
   { key: "registration_and_team", title: "Registration and Team Formation" },
   {
     key: "prototype_submission",
     title: "Prototype Submission and Presentation",
   },
   { key: "rules", title: "General Guidelines" },
   { key: "github_repository", title: "GitHub Repository" },
   { key: "documentation", title: "Documentation" },
   { key: "code_quality", title: "Code Quality" },
   { key: "demonstration", title: "Demonstration" },
   { key: "evaluation_criteria", title: "Evaluation Criteria" },
   { key: "scoring", title: "Scoring System" },
   { key: "submission", title: "Submission Guidelines" },
   { key: "howto", title: "How to Participate" },
   { key: "registration_attention", title: "Registration Note" },
 ];
  // Build the combined HTML from available sections
  const sections = detailSections
    .filter((section) => event[section.key])
    .map(
      (section) => `
            <div class="mb-6">
                <h3 class="text-xl font-bold text-[#800000] text-center">${section.title}</h3>
                <div>${formatText(event[section.key])}</div>
            </div>
        `
    )
    .join("");

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto py-10 px-4 gap-10">
      {/* <h2 className="font-roboto text-5xl text-[#FFC107] drop-shadow-lg tracking-widest text-center">
        Detailed Description
      </h2> */}
       <div className="flex items-center justify-center gap-2 sm:gap-4 w-full mb-12">
                <img
                  src={eventLine}
                  className="w-20 sm:w-48 md:w-48 lg:w-64 object-contain"
                  alt="line"
                />
                <h2 className="text-[#FFD700] text-3xl sm:text-4xl md:text-5xl font-alex-brush text-center leading-none whitespace-nowrap">
                  Detailed Description
                </h2>
                <img
                  src={eventLine}
                  className="w-20 sm:w-48 md:w-48 lg:w-64 h-auto object-contain"
                  alt="line"
                />
              </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full">
        {/* Left Side: Ticket (Canvas) */}
        <div className=" hidden lg:flex relative w-[350px] flex-shrink-0 flex justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-auto drop-shadow-xl object-contain"
            style={{ maxWidth: "100%" }}
          />
        </div>

        {/* Right Side: Parchment Description */}
        <div className="relative w-full max-w-[800px] flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] md:aspect-[3/2]">
            <img
              src="/dataBg.png"
              alt="Background"
              className="w-full h-full object-fill drop-shadow-2xl"
            />

            {/* Content Area */}
            <div className="absolute top-[14%] bottom-[14%] left-[14%] right-[10%] overflow-y-auto custom-scrollbar pr-4 text-justify">
              <div
                className="font-mate-sc text-[#3e2723] text-l md:text-l font-semibold leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sections }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubEventDescription;
