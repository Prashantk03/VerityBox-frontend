import { useNavigate } from "react-router-dom";
import { FiFeather } from "react-icons/fi";
import { useSession } from "../context/sessionProvider";
import RestoreKey from "../components/RestoreKey";
import GenerateKeyButton from "../components/generateKey";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { sessionId } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true); 
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
    {/* Large screen */}
      <nav className={`fixed w-full z-20 top-0 start-0 transition-all duration-300 ${
                scrolled ? "bg-gray-400 opacity-90 " : "bg-transparent"}  `}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          {/* Left Section */}
          <button className="md:hidden p-2" onClick={toggleMenu}>
            <FiFeather size={30} />
          </button>

          {/* Middle Section */}
          <div className="flex-1 text-center text-lg hidden md:flex space-x-6">
            <button
              onClick={() => navigate("/")}
              className="hover:text-gray-900 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/journal")}
              className="hover:text-gray-900 transition"
            >
              My Journal
            </button>
            <button
              onClick={() => navigate("/community")}
              className="hover:text-gray-900 transition"
            >
              Community
            </button>
          </div>

          {/* Right Section */}
          {!sessionId && (
            <div className="hidden md:flex space-x-4">
              <GenerateKeyButton />
              <RestoreKey />
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50" onClick={closeMenu}>
          <div
            className="w-64 h-full bg-gray-900 opacity-90 text-white p-4"
            onClick={(e) => e.stopPropagation()}
            >
            <div className="border-b-2 text-center">
              VerityBox
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full py-2 mt-4 hover:bg-gray-600"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/journal")}
              className="w-full py-2 hover:bg-gray-600"
            >
              My Journal
            </button>
            <button
              onClick={() => navigate("/community")}
              className="w-full py-2 hover:bg-gray-600"
            >
              Community
            </button>

            {!sessionId && (
              <>
                <GenerateKeyButton />
                <div className="mt-2">
                  <RestoreKey toggleMenu={toggleMenu} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
