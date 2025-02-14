import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 bg-white shadow-md w-full py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <img className="h-10 mr-2" src={logos[currentLogoIndex]} alt="Logo" />
          <NavLink
            to="/"
            style={{
              fontWeight: 800,
              color: "#3172c4",
              fontSize: "24px",
              letterSpacing: "1px",
            }}
          >
            DRVT Project
          </NavLink>
        </div>
        <div
          className="space-x-4"
          style={{ color: "#999", fontWeight: 500, opacity: 0.8 }}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-black" : "hover:text-gray-700"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-black" : "hover:text-gray-700"
            }
          >
            My Products
          </NavLink>
          <NavLink
            to="/addProduct"
            className={({ isActive }) =>
              isActive ? "text-black" : "hover:text-gray-700"
            }
          >
            Add Product
          </NavLink>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive ? "text-black" : "hover:text-gray-700"
            }
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
