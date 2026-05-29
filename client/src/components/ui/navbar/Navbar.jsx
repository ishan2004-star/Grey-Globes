import "./Navbar.css";

import { useEffect, useState } from "react";

function Navbar() {

  const [scrolled, setScrolled] =
    useState(false);

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

      <div className="logo">
        GREY GLOBES
      </div>

    </nav>

  );

}

export default Navbar;