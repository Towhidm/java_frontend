import React, { useState, useEffect } from "react";
// You would replace this with the path to your icon
import { PiBriefcase } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "antd";
import { CgProfile } from "react-icons/cg";
interface NavbarProps {
  isHomePage?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isHomePage = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const getNavbarClasses = () => {
    if (!isHomePage) return "bg-black sticky top-0";

    return isScrolled
      ? "bg-black/90 backdrop-blur-md fixed top-0"
      : "bg-black/40 backdrop-blur-2xl  absolute top-0";
  };

  return (
    <nav
      className={`w-full z-50 transition-all duration-500 ease-in-out ${getNavbarClasses()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3 text-white">
          <PiBriefcase className="w-8 h-8 " />
          <span className="text-xl font-bold">Job Portal</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-white">
          <a href="/" className="hover:text-teal-400">
            Home
          </a>
          <Link to="/jobs" className="hover:text-teal-400">
            Jobs
          </Link>
          <Link to="/about" className="hover:text-teal-400">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-teal-400">
            Contact Us
          </Link>
        </div>

        {/* Desktop Buttons */}
        {!user ? (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="text-white hover:text-teal-400">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-medium"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Button
              className="bg-teal-500 hover:bg-teal-600 text-white border-none"
              onClick={logout}
              variant="solid"
              color="primary"
            >
              Logout
            </Button>

            <div className="bg-teal-500 rounded-full w-10 h-10 flex items-center justify-center">
              <CgProfile className="text-white text-xl" />
            </div>
          </div>
        )}

        {/* MOBILE MENU BUTTON (Responsive part) */}
        <div className="md:hidden ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-teal-400 focus:outline-none"
          >
            {isOpen ? (
              <span className="text-2xl">✕</span> // Close icon
            ) : (
              <span className="text-2xl">☰</span> // Hamburger icon
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN (Controlled via Tailwind Classes) */}
      <div
        className={`md:hidden text-white  bg-black transition-all duration-500 ease-in-out overflow-hidden border-t border-white/10 ${
          isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 p-6  justify-center items-center">
          <Link
            to="/"
            className="hover:text-teal-400 text-lg transition-colors"
          >
            Home
          </Link>
          {" "}
          <Link
            to="/jobs"
            className="hover:text-teal-400 text-lg transition-colors"
          >
            Jobs
          </Link>
          <Link
            to="/about"
            className="hover:text-teal-400 text-lg transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-teal-400 text-lg transition-colors"
          >
            Contact Us
          </Link>
          {user ? (
            <div className="flex flex-col justify-center items-center  gap-4">
              <Button
                className="bg-teal-500 hover:bg-teal-600 text-white border-none"
                onClick={logout}
                variant="solid"
                color="primary"
              >
                Logout
              </Button>

              <div className="bg-teal-500 rounded-full w-10 h-10 flex items-center justify-center">
                <CgProfile className="text-white text-xl" />
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-teal-400 text-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-teal-500 hover:bg-teal-600 text-center text-white px-5 py-3 rounded-lg font-medium transition-all w-full"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
