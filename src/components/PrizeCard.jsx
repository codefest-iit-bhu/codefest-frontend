import React, { useEffect, useRef } from 'react';

const PrizeCard = ({ rank, subRank, description }) => {
    const circleCanvasRef = useRef(null);
    const squareCanvasRef = useRef(null);

    // Helper to wrap text
    const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        // Special case for very short text to center perfectly vertically if needed
        // but for now we assume standard wrapping

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line.trim(), x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line.trim(), x, currentY);
    };

    useEffect(() => {
        // Draw Circular Badge
        const circleCanvas = circleCanvasRef.current;
        const circleCtx = circleCanvas.getContext('2d');
        const circleImg = new Image();
        circleImg.src = "/circleBg.png";

        circleImg.onload = () => {
            // Set canvas size to match image or fixed size
            // Assuming image is reasonably high res, we'll set canvas to a fixed size and draw image to fit
            const size = 300;
            circleCanvas.width = size;
            circleCanvas.height = size;

            circleCtx.clearRect(0, 0, size, size);
            circleCtx.drawImage(circleImg, 0, 0, size, size);

            // Text Styles
            circleCtx.font = "bold 34px 'Mate SC'";
            circleCtx.fillStyle = "#FFFFFF"; // Deep red
            circleCtx.textAlign = "center";
            circleCtx.textBaseline = "middle";
            circleCtx.shadowColor = "rgba(0, 0, 0, 0.3)";
            circleCtx.shadowBlur = 4;
            circleCtx.shadowOffsetX = 2;
            circleCtx.shadowOffsetY = 2;

            // Draw Rank Text (Centered)
            if (subRank) {
                // If subRank exists, draw both (e.g., "1st" and "YEAR")
                circleCtx.font = "bold 40px 'Mate SC'";
                circleCtx.fillText(rank, size / 2, size / 2 - 15);

                circleCtx.font = "bold 30px 'Mate SC'";
                circleCtx.fillText(subRank, size / 2, size / 2 + 25);
            } else {
                // Default single line behavior
                circleCtx.fillText(rank, size / 2, size / 2 + 10);
            }
        };

        // Draw Rectangular Ticket
        const squareCanvas = squareCanvasRef.current;
        const squareCtx = squareCanvas.getContext('2d');
        const squareImg = new Image();
        squareImg.src = "/squareBg.png";

        squareImg.onload = () => {
            const width = 500;
            const height = 250;
            squareCanvas.width = width;
            squareCanvas.height = height;

            squareCtx.clearRect(0, 0, width, height);
            squareCtx.drawImage(squareImg, 0, 0, width, height);

            // Text Styles
            squareCtx.font = "40px 'Aladin'"; // Slightly smaller for description
            squareCtx.fillStyle = "black";
            // squareCtx.fillStyle = "#3e2723"; // Dark brown fallback if black is too harsh
            squareCtx.textAlign = "center";
            squareCtx.textBaseline = "middle";

            // Draw Description Text
            // We use the wrap logic here
            const textX = width / 2;
            const textY = height / 2;
            const maxWidth = width - 190; // Padding
            const lineHeight = 45;

            // Calculate starting Y to vertically center the block of text
            // Rough estimation of height
            // For single line: y
            // For 2 lines: y - lineHeight/2
            const words = description.split(' ');
            let testLine = '';
            let lineCount = 1;
            for (let n = 0; n < words.length; n++) {
                if (squareCtx.measureText(testLine + words[n] + ' ').width > maxWidth && n > 0) {
                    lineCount++;
                    testLine = words[n] + ' ';
                } else {
                    testLine += words[n] + ' ';
                }
            }

            let startY = textY;
            if (lineCount > 1) {
                startY = textY - ((lineCount - 1) * lineHeight) / 2;
            }

            wrapText(squareCtx, description, textX, startY, maxWidth, lineHeight);
        };

    }, [rank, subRank, description]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex justify-center items-center drop-shadow-xl">
                <canvas
                    ref={circleCanvasRef}
                    className="w-32 h-32 md:w-40 md:h-40 object-contain"
                />
            </div>
            <div className="flex justify-center items-center drop-shadow-xl">
                <canvas
                    ref={squareCanvasRef}
                    className="w-72 h-32 md:w-[320px] md:h-[150px] object-contain"
                />
            </div>
        </div>
    );
};

export default PrizeCard;
