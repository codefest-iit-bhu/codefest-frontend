import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import events from "../store/events";
import axios from "../utils/axiosInstance";
import { useUser } from "../context/context";
import TeamRegistrationModal from "./TeamRegistrationModel";
import JoinTeamModal from "./JoinTeamModal";

const BannerDiv = ({ segments, className = "", href, onClick }) => {
    const style = {
        backgroundImage: "url('/Bg.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    const content = (
        <div
            className={`flex items-center pt-10 pb-10 pl-16 pr-16 justify-center ${className}`}
            style={style}
        >
            <p className="text-center font-aladin text-xl md:text-2xl leading-tight">
                {segments.map((seg, index) => (
                    <span key={index} style={{ color: seg.color }}>
                        {seg.text}
                    </span>
                ))}
            </p>
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-102"
            >
                {content}
            </a>
        );
    }

    if (onClick) {
        return (
            <div
                onClick={onClick}
                className="cursor-pointer transition-transform hover:scale-105"
            >
                {content}
            </div>
        );
    }

    return <div>{content}</div>;
};

const SubEventHero = ({ eventId }) => {
    const event = events.find((e) => e.id === eventId);
    const { isAuthenticated } = useUser();
    const navigate = useNavigate();

    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false);
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        if (!event) return;

        async function getIsMember() {
            try {
                const res = await axios.get(`/event/is_member/${event.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setIsMember(res.data.isMember);
            } catch (err) {
                console.error("Error checking membership:", err);
            }
        }

        if (isAuthenticated) getIsMember();
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

    const handleRegisterClick = () => {
        if (isMember) {
            return;
        }

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        setIsRegistrationModalOpen(true);
    };

    const handleJoinClick = () => {
        if (isMember) {
            if (event.unstop) window.open(event.unstop, "_blank");
            return;
        }

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        setIsJoinTeamModalOpen(true);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full py-12 space-y-8 md:space-y-12">
            <h1 className="text-4xl md:text-6xl font-aladin text-[#FFC107] text-center drop-shadow-lg tracking-wider px-4">
                {event.title}
            </h1>

            <BannerDiv
                segments={[
                    { text: "Registration Deadline: ", color: "#FFC107" },
                    { text: deadlineText, color: "white" },
                ]}
                className="w-[90%] md:w-[600px] min-h-[80px]"
            />

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full px-4">
                <BannerDiv
                    onClick={handleRegisterClick}
                    segments={[
                        {
                            text: isMember
                                ? "You are already registered"
                                : "Create New Team",
                            color: "#FFC107",
                        },
                    ]}
                    className="w-full md:w-[350px] min-h-[70px]"
                />

                {event.max_members > 1 && (
                    <BannerDiv
                        onClick={handleJoinClick}
                        segments={[
                            {
                                text: isMember
                                    ? "Click here for more details"
                                    : "Join a team",
                                color: "#FFC107",
                            },
                        ]}
                        className="w-full md:w-[350px] min-h-[70px]"
                    />
                )}
            </div>

            <TeamRegistrationModal
                isOpen={isRegistrationModalOpen}
                onClose={() => setIsRegistrationModalOpen(false)}
                event={event}
            />

            <JoinTeamModal
                isOpen={isJoinTeamModalOpen}
                onClose={() => setIsJoinTeamModalOpen(false)}
                event={event}
            />
        </div>
    );
};

export default SubEventHero;