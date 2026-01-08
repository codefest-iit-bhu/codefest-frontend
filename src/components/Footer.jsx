import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useUser } from "../context/context";

const Footer = () => {
  const { isAuthenticated } = useUser();
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              QuickLinks
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-400 transition">
                  Main
                </a>
              </li>
              {/* <li>
                                <a href="/CA" className="hover:text-gray-400 transition">
                                    Campus Ambassador
                                </a>
                            </li> */}
              <li>
                {isAuthenticated ? (
                  <a href="/myTeams" className="hover:text-gray-400 transition">
                    My Teams
                  </a>
                ) : (
                  <a href="/login" className="hover:text-gray-400 transition">
                    Login
                  </a>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
            <ul className="w-full">
              <li>
                <a href="/home" className="hover:text-gray-400 transition">
                  Home
                </a>
              </li>
              {/* <li>
                                <a href="/ca-register" className="hover:text-gray-400 transition">
                                    CA Registration
                                </a>
                            </li> */}
              <li>
                <a href="/events" className="hover:text-gray-400 transition">
                  Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Follow Us On
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/codefest_iitbhu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-2xl hover:text-purple-500 transition-all duration-300"
                />
              </a>
              <a
                href="https://x.com/c0defest"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-2xl hover:text-purple-500 transition-all duration-300"
                />
              </a>
              <a
                href="https://www.facebook.com/codefest/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-2xl hover:text-purple-500 transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            © 2026 Codefest'26. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
