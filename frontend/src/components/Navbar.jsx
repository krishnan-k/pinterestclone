import React, { useState } from "react";
import headerLogo from "../images/Pinterest.svg";
import { IoNotifications } from "react-icons/io5";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import "../component-css/Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [activeState, setActiveState] = useState(0);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/Explore", label: "Explore" },
    { path: "/Create", label: "Create" },
  ];
  const handleMouseOver = (index) => {
    setActiveState(index);
  };

  return (
    <div className="navbar-section">
      <div className="navbar-content">
        <div className="header-section">
          <div className="logo">
            <img src={headerLogo} alt="header-logo" />
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
          <div class="search-box">
            <div className="search-icons">
              <FaSearch />
            </div>
            <input
              type="text"
              class="form-control"
              placeholder="search anything"
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
