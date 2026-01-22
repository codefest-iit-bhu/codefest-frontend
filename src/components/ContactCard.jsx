import React, { useEffect, useRef } from 'react';

const ContactCard = ({ name, phone, text }) => {
    const canvasRef = useRef(null);

    // Helper to wrap text (reused logic)
    const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

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
        return currentY; // Return last Y position for stacking
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = "/contactBg.png";

        img.onload = () => {
            // Set canvas size based on image aspect ratio roughly, or fixed high res
            // The image looks like a vertical polaroid stack
            const width = 400;
            const height = 500;
            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);

            // Draw image
            ctx.drawImage(img, 0, 0, width, height);

            // Text Configuration
            ctx.textAlign = "center";
            ctx.textBaseline = "top";

            // Define Writing Area (Polaroid Text Box)
            // Based on visual inspection of typical polaroid assets:
            // Center X approx width/2
            // Start Y approx 30% down or wherever the "black/dark" area is
            // Looking at previous screenshot, it seems the writeable area is the dark square in the middle-top.

            const centerX = width / 2-20; // Slight offset due to stack rotation visual
            const startY = 150; // Start inside the dark box
            const maxWidth = 200; // Constrained width inside the frame

            // 1. Draw Query Text "For further queries..."
            ctx.font = "20px 'Mate SC'";
            ctx.fillStyle = "#E0E0E0"; // Light gray for the small text
            let nextY = wrapText(ctx, text, centerX, startY, maxWidth, 28);

            // Spacing
            nextY += 40;

            // 2. Draw Name
            ctx.font = "bold 28px 'Mate SC'";
            ctx.fillStyle = "#FFFFFF"; // White for Name
            nextY = wrapText(ctx, name, centerX, nextY, maxWidth, 32);

            // Spacing
            nextY += 40;

            // 3. Draw Phone
            ctx.font = "bold 22px 'Aladin'";
            ctx.fillStyle = "#FFD700"; // Gold for Phone
            ctx.fillText(`(${phone})`, centerX, nextY);
        };
    }, [name, phone, text]);

    return (
        <div className="flex justify-center items-center">
            <canvas
                ref={canvasRef}
                className="w-full max-w-md h-auto drop-shadow-2xl"
            />
        </div>
    );
};

export default ContactCard;
