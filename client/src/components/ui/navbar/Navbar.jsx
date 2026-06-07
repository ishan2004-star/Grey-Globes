import "./Navbar.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Navbar() {

  const [scrolled, setScrolled] =
    useState(false);
  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 40);

    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  return (

    <nav className={`navbar ${
      scrolled ? "navbarScrolled" : ""
    }`}>

      <div
        className="logo"
        onClick={() => handleNavigate("/")}
        style={{ cursor: "pointer" }}
      >
        GREY GLOBES
      </div>

      <button
        className={`navToggle ${
          menuOpen ? "navToggleOpen" : ""
        }`}
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navLinks ${
        menuOpen ? "navLinksOpen" : ""
      }`}>
        <button
          className="navLink"
          type="button"
          onClick={() => handleNavigate("/explore")}
        >
          Explore
        </button>

        <button
          className="navLink"
          type="button"
          onClick={() => handleNavigate("/compare")}
        >
          Compare
        </button>

        <button
          className="navLink"
          type="button"
          onClick={() => handleNavigate("/analyze")}
        >
          Analyze
        </button>

        {isAuthenticated ? (
          <button
            id="nav-profile"
            className="navAvatar"
            type="button"
            onClick={() => handleNavigate("/profile")}
            aria-label="Open profile"
          >
            IS
          </button>
        ) : (
          <button
            id="nav-signin"
            className="navLink"
            type="button"
            onClick={() => handleNavigate("/login")}
          >
            Sign In
          </button>
        )}
      </div>

    </nav>

  );

}

export default Navbar;
