import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./services/auth-provider.js";
import ContactPage from "./pages/landing-page-sections/contact-page/contact-page";
import LoginPage from "./pages/landing-page-sections/login-page/login-page";
import "./App.css";
import PlansPage from "./pages/landing-page-sections/plans-page/plans-page";
import AboutUs from "./pages/landing-page-sections/about-us/about-us";
import LandingPage from "./pages/landing-page.js";
import UserHomePage from "./pages/home/home-page";
import CompanyPage from "./pages/company-page/company-page.js";
import UserProfile from "./pages/user-profile/user-profile.js";
import NewVacancyForm from "./components/Forms/New-Vacancy/new-vacancy-form.js";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/form" element={<NewVacancyForm />} />
          <Route path="/profile/:uid" element={<UserProfile />} />
          <Route path="/company/:id" element={<CompanyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
