import {
  faRightFromBracket,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import tailwindLogo from "../assets/tailwind.png";
import djangoLogo from "../assets/django.png";
import reactLogo from "../assets/react.png";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import viteLogo from "../assets/vite.png";

const Navbar = () => {
  const logos = [reactLogo, tailwindLogo, djangoLogo, viteLogo];
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  // TODO: Change logo every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // !Function to toggle menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 z-50 bg-white shadow-md w-full py-4">
      <div className="md:container md:mx-auto mx-4 flex items-center justify-between">
        <div className="flex">
          <img className="h-9 mr-2" src={logos[currentLogoIndex]} alt="Logo" />
          <NavLink
            to="/"
            style={{
              fontWeight: 700,
              color: "#3172c4",
              fontSize: "24px",
              letterSpacing: "0.5px",
            }}
          >
            DRVT Project
          </NavLink>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 outline-none border-none text-2xl"
        >
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars} // Toggle between menu and close icon
            aria-hidden="true"
          />
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-4 absolute md:static bg-white w-full md:w-auto left-0 top-16 py-4 md:py-0 shadow-md md:shadow-none`}
          style={{ color: "#999", fontWeight: 500, fontSize: "17px" }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            My Products
          </NavLink>
          <NavLink
            to="/addProduct"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Add Product
          </NavLink>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              `block md:inline-block py-2 mx-4 md:mx-0 ${
                isActive ? "text-black" : "hover:text-gray-700"
              }`
            }
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Logout
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ fontSize: "18px", marginLeft: "5px" }}
              aria-hidden="true"
            />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
