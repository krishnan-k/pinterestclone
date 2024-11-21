import React, { useEffect, useRef, useState } from "react";
import headerLogo from "../images/Pinterest.svg";
import { FaSearch } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import "../component-css/Navbar.css";
import "../component-css/ImageGrid.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [activeState, setActiveState] = useState<number>(0);
  const [pictures, setPictures] = useState<any[]>([]);
  const [searchInput, setSearchInputs] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/Explore", label: "Explore" },
    { path: "/Create", label: "Create" },
  ];

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/postimage/imagesget"
        );
        const data = await response.json();
        setPictures(data);
      } catch (error) {
        console.error("Error fetching pictures:", error);
      }
    };
    fetchPictures();
  }, []);

  const filteredPictures = pictures.filter((picture) =>
    picture.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputs(e.target.value);
    setIsSearchActive(e.target.value !== "");
  };

  const handleImageClick = (id: string) => {
    document.body.classList.remove("search-active");
    setIsSearchActive(false);
    navigate(`/imagesget/${id}`);
  };

  //Add and remove class in search
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
        document.body.classList.remove("search-active");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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
                  onClick={() => setActiveState(index)}
                >
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="input-box" ref={searchBoxRef}>
          <div className="search-box">
            <div className="search-icons">
              <FaSearch />
            </div>
            <form className="d-flex search-section" role="search">
              <input
                type="search"
                className="form-control"
                placeholder="Search anything"
                value={searchInput}
                onChange={handleSearchChange}
                onFocus={() => {
                  setIsSearchActive(true);
                  document.body.classList.add("search-active");
                }}
              />
            </form>
          </div>
          {isSearchActive && (
            <div className="image-section-search">
              <div className="picture-grid">
                {filteredPictures.length > 0 ? (
                  filteredPictures.map((picture) => (
                    <div
                      className="img-card"
                      key={picture._id}
                      onClick={() => handleImageClick(picture._id)}
                    >
                      <img
                        className="card-img-top"
                        src={picture.imageUrl}
                        alt={picture.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{picture.title}</h5>
                        <p className="card-text">{picture.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No images found.</p>
                )}
              </div>
            </div>
          )}
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
