// Routes.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactPage from "../pages/landing-page-sections/contact-page/contact-page";
import LandingPage from "../pages/landing-page-sections/landing-page/landing-page";
import LoginPage from "../pages/landing-page-sections/login-page/login-page";
import UserHomePage from "../pages/home/home-page";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={LandingPage} />
        <Route path="/login" element={LoginPage} />
        <Route path="/contact" element={ContactPage} />
        <Route path="/home" element={UserHomePage} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
