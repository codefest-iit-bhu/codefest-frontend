import React, { useEffect, useRef } from 'react';
import events from '../store/events';

const SubEventDescription = ({ eventId }) => {
    const event = events.find((e) => e.id === eventId);
    const canvasRef = useRef(null);

    // Initial canvas drawing
    useEffect(() => {
        if (!event) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = "/mTicket.png";

        img.onload = () => {
            document.fonts.ready.then(() => {
                // Set canvas resolution to match image
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw Background
                ctx.drawImage(img, 0, 0);

                // Configure Fonts
                const labelFont = "bold 24px 'Mate SC', serif";
                const valueFont = "bold 20px 'Mate SC', serif";
                const labelColor = "#800000";
                const valueColor = "#000000";

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // Helper to wrap text with word breaking
                const drawWrappedText = (text, x, y, maxWidth, lineHeight) => {
                    const words = text.split(' ');
                    let line = '';
                    let lines = [];

                    for (let n = 0; n < words.length; n++) {
                        let testLine = line + words[n] + ' ';
                        // Check if adding the next word exceeds width
                        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
                            lines.push(line);
                            line = words[n] + ' ';
                        } else {
                            // Check if a single word is overly long
                            if (ctx.measureText(words[n]).width > maxWidth) {
                                // Push current line if exists
                                if (line.trim().length > 0) {
                                    lines.push(line);
                                    line = "";
                                }
                                // Break the long word
                                let longWord = words[n];
                                while (ctx.measureText(longWord).width > maxWidth) {
                                    let sub = longWord;
                                    while (ctx.measureText(sub + "-").width > maxWidth && sub.length > 0) {
                                        sub = sub.slice(0, -1);
                                    }
                                    lines.push(sub + "-");
                                    longWord = longWord.slice(sub.length);
                                }
                                line = longWord + ' ';
                            } else {
                                line = testLine;
                            }
                        }
                    }
                    lines.push(line);

                    // Draw lines centered around Y
                    const totalHeight = lines.length * lineHeight;
                    let startY = y - (totalHeight / 2) + (lineHeight / 2);

                    if (lines.length === 1) startY = y;

                    lines.forEach((l, i) => {
                        ctx.fillText(l.trim(), x, startY + (i * lineHeight));
                    });
                };

                // Helper to draw text sections
                const drawSection = (label, value, yBase) => {
                    // Safe width for text (approx 55% of image width)
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

                    drawWrappedText(value || "TBA", canvas.width / 2, yBase + 25, maxWidth, 24);
                };

                // Platform (Top)
                drawSection("Platform:", event.platform, img.height * 0.18);
                drawSection("Date:", event.date, img.height * 0.48);
                drawSection("Duration:", event.duration || "See Details", img.height * 0.78);
            });
        };
    }, [event]);

    if (!event) return null;

    // Clean description text
    const cleanString = (str) => {
        if (!str) return '';
        let cleaned = str.replace(/^(\s*[a-z]+:\s*`?\s*)+/gi, ''); // Remove repeated prefixes
        cleaned = cleaned.replace(/`\s*$/, ''); // Remove trailing backtick
        return cleaned;
    };

    const description = cleanString(event.description);
    const combinedHTML = `
        ${description ? `<div class="mb-4">${description}</div>` : ''}
    `;

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto py-10 px-4 gap-10">

            {/* Main Header moved to top */}
            <h2 className="font-great-vibes text-5xl text-[#FFC107] drop-shadow-lg tracking-widest text-center">
                Detailed Description
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full">

                {/* Left Side: Ticket (Canvas) */}
                <div className="relative w-[300px] flex-shrink-0 flex justify-center">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-auto drop-shadow-xl object-contain"
                        style={{ maxWidth: '100%' }}
                    />
                </div>

                {/* Right Side: Parchment Description */}
                <div className="relative w-full max-w-[800px] flex flex-col items-center">
                    {/* Scrollable Container */}
                    <div className="relative w-full aspect-[4/3] md:aspect-[3/2]">
                        <img
                            src="/dataBg.png"
                            alt="Background"
                            className="w-full h-full object-fill drop-shadow-2xl"
                        />

                        {/* Content Area */}
                        <div className="absolute top-[12%] bottom-[12%] left-[12%] right-[10%] overflow-y-auto custom-scrollbar pr-4 text-center">
                            <div
                                className="font-mate-sc text-[#3e2723] text-lg md:text-xl font-semibold leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: combinedHTML }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SubEventDescription;
