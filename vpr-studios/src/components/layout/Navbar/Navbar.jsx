import "./Navbar.scss";

import { NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineHome,
  HiOutlineFilm,
  HiOutlineTv,
  HiOutlineFire,
  HiOutlineBookmark,
  HiOutlineUser,
} from "react-icons/hi2";
import { useState, useEffect } from "react";

import { navLinks } from "../../../constants/navLinks";

function Navbar() {
  const navIcons = {
    Home: <HiOutlineHome />,
    Movies: <HiOutlineFilm />,
    "TV Shows": <HiOutlineTv />,
    Trending: <HiOutlineFire />,
    "My List": <HiOutlineBookmark />,
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const location = useLocation();
  return (
    <>
    <header
      className={`navbar ${isScrolled || isMenuOpen ? "navbar--scrolled" : ""}`}
    >
      <div className="container">
        <div className="navbar__wrapper">
          {/* Logo */}

          <NavLink to="/" className="navbar__logo">
            VPR Studios
          </NavLink>

          {/* Navigation */}

          <nav className={`navbar__menu ${isMenuOpen ? "active" : ""}`}>
            <div className="navbar__mobile-header">
              <button
                className="navbar__mobile-sign-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                <HiOutlineUser />
                <span>Sign In</span>
              </button>
            </div>
            <ul className="navbar__links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "navbar__link navbar__link--active"
                        : "navbar__link"
                    }
                  >
                    {navIcons[link.title]}

                    <span>{link.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}

          <div className="navbar__actions">
            <NavLink
              to="/search"
              aria-label="Search"
              className={
                location.pathname === "/search"
                  ? "navbar__icon-btn navbar__icon-btn--active"
                  : "navbar__icon-btn"
              }
            >
              <HiOutlineMagnifyingGlass />
            </NavLink>

            <button className="navbar__sign-btn">Sign In</button>

            <button
              className="navbar__menu-btn"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
            </button>
          </div>
        </div>
      </div>
      
    </header>

    {isMenuOpen && (
  <div
    className="navbar__overlay"
    onClick={() => setIsMenuOpen(false)}
  />
)}
</>
)}

export default Navbar;
