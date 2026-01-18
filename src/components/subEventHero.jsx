import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import events from "../store/events";
import axios from "../utils/axiosInstance";
import { useUser } from "../context/context";
import TeamRegistrationModal from "./TeamRegistrationModel";
import JoinTeamModal from "./JoinTeamModal";

const BannerCanvas = ({
    segments,
    className = "",
    href,
    onClick,
    baseFontSize = 30,
}) => {
    const canvasRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const bgImageRef = useRef(null);

    useEffect(() => {
        const img = new Image();
        img.src = "/Bg.png";
        img.onload = () => {
            bgImageRef.current = img;
            setImageLoaded(true);
        };
    }, []);

    useEffect(() => {
        if (imageLoaded && canvasRef.current && bgImageRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const img = bgImageRef.current;

            // Set canvas resolution to match image resolution for best quality
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            // Draw Background
            ctx.drawImage(img, 0, 0);

            // Configure Font
            // Scale font based on canvas width to ensure it fits horizontally
            // baseFontSize will now act as a divider. e.g. 25 means width/25
            const fontSize = canvas.width / baseFontSize;
            ctx.font = `${fontSize}px Rye, serif`;
            ctx.textBaseline = "middle";
            ctx.textAlign = "center"; // Align text to center for multi-segment centering

            // Measure total text width for centering
            let totalText = segments.map(seg => seg.text).join('');
            const totalWidth = ctx.measureText(totalText).width;

            // Draw Text Centered
            let currentX = (canvas.width - totalWidth) / 2;
            // Adjust center Y if needed - assuming image is centered
            const centerY = canvas.height / 2;

            segments.forEach((seg) => {
                ctx.fillStyle = seg.color;
                ctx.textAlign = "left"; // Draw each segment from left
                ctx.fillText(seg.text, currentX, centerY);
                currentX += ctx.measureText(seg.text).width;
            });
        }
    }, [imageLoaded, segments, baseFontSize]);

    const style = { width: "100%", height: "auto", maxWidth: "600px" };

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block transition-transform hover:scale-105 ${className}`}
                style={style}
            >
                <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />
            </a>
        );
    }

    if (onClick) {
        return (
            <div
                onClick={onClick}
                className={`cursor-pointer transition-transform hover:scale-105 ${className}`}
                style={style}
            >
                <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />
            </div>
        );
    }

    return (
        <div className={className} style={style}>
            <canvas ref={canvasRef} style={{ width: "100%", height: "auto" }} />
        </div>
    );
};

const SubEventHero = ({ eventId }) => {
    const event = events.find((e) => e.id === eventId);
    const { isAuthenticated, user } = useUser();
    const navigate = useNavigate();

    const [fontLoaded, setFontLoaded] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [registrations_open, setRegistrations_open] = useState(false);

    const hasEnded = event ? new Date() > new Date(event.last_date_reg) : false;

    useEffect(() => {
        document.fonts.ready.then(() => {
            setFontLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (!event) return;

        async function getIsMember() {
            try {
                const res = await axios.get(`/event/is_member/${event.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setIsMember(res.data.isMember);
                if (res.data.isMember) {
                    setTeamName(res.data.teamName);
                }
            } catch (err) {
                console.error("Error checking membership:", err);
            }
        }

        async function getEventData() {
            try {
                const res = await axios.get(`/event/${event.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setRegistrations_open(res.data.registrations_open);
            } catch (err) {
                console.error("Error fetching event data:", err);
            }
        }

        if (isAuthenticated) getIsMember();
        getEventData();
    }, [event, isAuthenticated]);

    if (!event) {
        return <div>Event not found</div>;
    }

    const deadlineText = event.deadline
        ? new Date(event.deadline).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }) +
        ", " +
        new Date(event.deadline).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        })
        : "TBA";

    if (!fontLoaded) return null;

    const handleRegisterClick = () => {
        if (isMember) {
            // Already a member, maybe redirect to team or show message
            // For now, mirroring Arithmetica, maybe open WhatsApp or do nothing
            if (event.unstop) window.open(event.unstop, "_blank");
            return;
        }

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        // Logic for opening modal
        setIsRegistrationModalOpen(true);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full py-12 space-y-12 md:gap-12">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-rye text-[#FFC107] text-center drop-shadow-lg tracking-wider">
                {event.title}
            </h1>

            {/* Deadline Banner */}
            <BannerCanvas
                baseFontSize={32}
                segments={[
                    { text: "Registration Deadline: ", color: "#FFC107" },
                    { text: deadlineText, color: "white" },
                ]}
                className="w-[90%] md:w-[600px]"
            />

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full px-4">
                {/* Register Button - Logic applied */}
                {/* Visuals: usage of BannerCanvas */}
                <BannerCanvas
                    baseFontSize={24}
                    onClick={handleRegisterClick}
                    segments={[{ text: isMember ? "Joined (Click for details)" : "Register now here", color: "#FFC107" }]}
                    className="w-[300px]"
                />

                {/* Further Details Button */}
                <BannerCanvas
                    baseFontSize={35}
                    onClick={() => {
                        if (event.further_details) {
                            window.open(event.further_details, "_blank");
                        }
                    }}
                    segments={[
                        { text: "Further details will be updated ", color: "#FFC107" },
                        { text: "here", color: "#FFC107" },
                    ]}
                    className="w-[350px]"
                />
            </div>

            {/* Modals */}
            <TeamRegistrationModal
                isOpen={isRegistrationModalOpen}
                onClose={() => setIsRegistrationModalOpen(false)}
                event={event}
            />

            <JoinTeamModal
                isOpen={isJoinTeamModalOpen}
                onClose={() => setIsJoinTeamModalOpen(false)}
            />
        </div>
    );
};

export default SubEventHero;
