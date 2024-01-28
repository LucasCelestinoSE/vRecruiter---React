import React from "react";
import ContactPage from "./pages/landing-page-sections/contact-page/contact-page";
import LoginPage from "./pages/landing-page-sections/login-page/login-page";
import "./App.css";
import PlansPage from "./pages/landing-page-sections/plans-page/plans-page";
import AboutUs from "./pages/landing-page-sections/about-us/about-us";
import LandingPage from "./pages/landing-page.js";
import UserHomePage from "./pages/home/home-page";
import VacancyPage from "./pages/vacancy-page/vacancy-page.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/vacancy/:id" element={<VacancyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
