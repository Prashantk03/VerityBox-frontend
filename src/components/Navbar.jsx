import { useNavigate } from "react-router-dom";
import { FiFeather } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
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
      <nav
        className={`fixed w-full z-20 top-0 start-0 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800"
            : "bg-transparent"
        }  `}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          {/* Left Section */}
          <div 
          onClick={() => navigate("/")}
          className="p-2 text-white"
          >
            <FiFeather size={32} className="text-indigo-400" />
          </div>

          {/* Middle Section */}
          <div className="flex-1 text-center text-lg hidden md:flex space-x-6">
            <button
              onClick={() => navigate("/")}
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/journal")}
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              My Journal
            </button>
            <button
              onClick={() => navigate("/community")}
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              Community
            </button>
            <button
              onClick={() => navigate("/me")}
              className="text-slate-300 hover:text-white transition-colors duration-300"
            >
              My Profile
            </button>
          </div>

          {/* Right Section */}
          {!sessionId && (
            <div className="hidden md:flex space-x-4">
              <GenerateKeyButton />
              <RestoreKey />
            </div>
          )}
          <button className="md:hidden p-2 text-black" onClick={toggleMenu}>
            <HiMenu className="h-8 w-8 text-white" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="flex md:hidden fixed inset-0 z-50 bg-black/0 animate-fadeIn"
          onClick={closeMenu}
        >
          <div
            className="ml-auto w-64 h-full bg-slate-950 border-l border-slate-800 text-white p-4 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b-2 text-center">VerityBox</div>
            <button
              onClick={() => navigate("/")}
              className="w-full py-2 mt-4 hover:bg-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/journal")}
              className="w-full py-2 hover:bg-slate-800"
            >
              My Journal
            </button>
            <button
              onClick={() => navigate("/community")}
              className="w-full py-2 hover:bg-slate-800"
            >
              Community
            </button>
            <button
              onClick={() => {
                navigate("/me");
                closeMenu();
              }}
              className="w-full py-2 hover:bg-slate-800"
            >
              My Profile
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
