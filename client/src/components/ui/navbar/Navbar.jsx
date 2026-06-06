import "./Navbar.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Navbar() {

  const [scrolled, setScrolled] =
    useState(false);

  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

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
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        GREY GLOBES
      </div>

      <div className="navLinks">
        {isAuthenticated ? (
          <button
            id="nav-profile"
            className="navLink"
            onClick={() => navigate("/profile")}
          >
            {user?.username || "Profile"}
          </button>
        ) : (
          <button
            id="nav-signin"
            className="navLink"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
      </div>

    </nav>

  );

}

export default Navbar;