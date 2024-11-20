import React, { useState } from "react";
import headerLogo from "../images/Pinterest.svg";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import "../component-css/Navbar.css";
import { Link } from "react-router-dom";

// Define the type for navigation links
interface NavLink {
  path: string;
  label: string;
}

const Navbar: React.FC = () => {
  const [activeState, setActiveState] = useState<number>(0);

  const navLinks: NavLink[] = [
    { path: "/", label: "Home" },
    { path: "/Explore", label: "Explore" },
    { path: "/Create", label: "Create" },
  ];

  const handleMouseOver = (index: number): void => {
    setActiveState(index);
  };

  return (
    <div className="navbar-section">
      <div className="navbar-content">
        <div className="header-section">
          <div className="logo">
            <Link to="/">
              <img src={headerLogo} alt="Pinterest Logo" />
            </Link>
          </div>
          <div className="navigation">
            <ul>
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className={`${activeState === index ? "active" : ""}`}
                  onClick={() => handleMouseOver(index)}
                >
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="input-box">
          <div className="search-box">
            <div className="search-icons">
              <FaSearch />
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Search anything"
            />
          </div>
        </div>
        <div className="navigaion-icons">
          <div className="icon-1">
            <IoNotifications />
          </div>
          <div className="icon-1">
            <BiSolidMessageRoundedDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
