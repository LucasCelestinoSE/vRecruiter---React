import React, { useEffect, useState } from "react";
import ContactPage from "./pages/landing-page-sections/contact-page/contact-page";
import LandingPage from "./pages/landing-page-sections/landing-page/landing-page";
import LoginPage from "./pages/landing-page-sections/login-page/login-page";
import "./App.css";
import PlansPage from "./pages/landing-page-sections/plans-page/plans-page";
import AboutUs from "./pages/landing-page-sections/about-us/about-us";
import Footer from "./components/footer/footer";
import UserHomePage from "./pages/home/home-page";

import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";

function App() {
  const [navbarBackground, setNavbarBackground] = useState(false);

  useEffect(() => {
    function smoothScroll(targetId) {
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    }

    document.querySelectorAll(".navbar a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        smoothScroll(targetId);
      });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setNavbarBackground(true);
      } else {
        setNavbarBackground(false);
      }
    });
  }, []);

  return (
    <Router>
      <div className={`App ${navbarBackground ? "with-background" : ""}`}>
        <div className="navbar">
          <ul>
            <li>
              <Link to="/home">ACESSAR VAGAS</Link>
            </li>
            <li>
              <a href="#contact">CONTATO</a>
            </li>
            <li>
              <a href="#about-us">SOBRE NÓS</a>
            </li>
          </ul>
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>

        <div className="login-page" id="login">
          <LoginPage />
        </div>

        <div className="contact-page" id="contact">
          <ContactPage />
        </div>

        <div className="plans-page" id="plans">
          <PlansPage />
        </div>

        <div className="about-us" id="about-us">
          <AboutUs />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
