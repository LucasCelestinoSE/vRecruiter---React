import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaBriefcase, FaMailBulk, FaInfo } from "react-icons/fa";
import { slide as Menu } from "react-burger-menu";
import "./landing-page.css";
import Footer from "../components/footer/footer";
import PresentationPage from "./landing-page-sections/landing-page/presentation-page";
import LoginPage from "./landing-page-sections/login-page/login-page";
import ContactPage from "./landing-page-sections/contact-page/contact-page";
import AboutUs from "./landing-page-sections/about-us/about-us";
import PlansPage from "./landing-page-sections/plans-page/plans-page";

function App() {
  const [navbarBackground, setNavbarBackground] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setNavbarBackground(true);
      setShowScrollButton(true);
    } else {
      setNavbarBackground(false);
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`App ${navbarBackground ? "with-background" : ""}`}>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/home">ACESSAR VAGAS</Link>
          </li>
          <li>
            <a href="/login">CONTATO</a>
          </li>
          <li>
            <a href="#about-us" onClick={() => scrollToSection("about-us")}>
              SOBRE NÓS
            </a>
          </li>
        </ul>
      </div>

      <Menu left width={"250px"}>
        <Link to="/home">
          <FaBriefcase /> ACESSAR VAGAS
        </Link>
        <a href="#contact" onClick={() => scrollToSection("contact")}>
          <FaMailBulk /> CONTATO
        </a>

        <a href="#about-us" onClick={() => scrollToSection("about-us")}>
          <FaInfo /> SOBRE NÓS
        </a>
      </Menu>

      <div id="presentation" className="presentation-section">
        <PresentationPage />
      </div>
      <div id="login" className="login-section">
        <LoginPage />
      </div>
      <div id="contact" className="contact-section">
        <ContactPage />
      </div>
      <div id="plans" className="plans-section">
        <PlansPage />
      </div>
      <div id="about-us" className="about-us-section">
        <AboutUs />
      </div>
      <Footer />

      {showScrollButton && (
        <div className="scroll-top-button" onClick={scrollToTop}>
          <FaArrowUp />
        </div>
      )}
    </div>
  );
}

export default App;
