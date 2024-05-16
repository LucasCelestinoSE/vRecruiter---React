import React, { useState, useEffect, useRef } from "react";
import CompanyCard from "../../components/cards/company-card/company-card";
import VacancyCard from "../../components/cards/vacancy-card/vacancy-card";
import "./home-page.css";
import BannerImage from "../../assets/images/Background.png";
import UserButton from "../../components/buttons/userButton";
import { FaSearch } from "react-icons/fa";
import { logout } from "../../services/auth";
import ScrollTopButton from "../../components/buttons/scroll-top-button/scroll-top-button";
import { getVacancies, getCompanies } from "../../services/firestore-DB";
import { Link } from "react-router-dom";

const UserHomePage = () => {
  const [userName, setUserName] = useState("José Eduardo Santos Azevedo");
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const uidRef = useRef("");

  const handleScroll = () => {
    setIsVisible(window.scrollY >= 300);
  };

  const handleSearch = () => {};

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      uidRef.current = user ? user.uid : null;
      setIsUserLoggedIn(!!user);
    };

    const fetchCompanies = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error.message);
      }
    };

    const fetchVacancies = async () => {
      try {
        const vacanciesData = await getVacancies();
        setVacancies(vacanciesData);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error.message);
      }
    };

    fetchUserData();
    fetchCompanies();
    fetchVacancies();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="user-home-page">
      <div className="banner">
        <img src={BannerImage} alt="Background" />
      </div>

      <div className="user-info">
        {isUserLoggedIn && (
          <UserButton username="MENU" onLogoutClick={() => logout()} />
        )}
      </div>

      <div className="sections">
        <section className="companies-section">
          <h1>Empresas</h1>
          {companies.map((company) => (
            <CompanyCard
              id={company.id}
              imageUrl={company.imageUrl}
              companyName={company.name}
            />
          ))}
        </section>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar vagas"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={handleSearch}>
            <FaSearch color="#FFF" />
          </button>
        </div>

        <section className="vacancies-section">
          <h1>Vagas</h1>
          {vacancies.map((vaga) => (
            <VacancyCard
              key={vaga.id}
              id={vaga.id}
              imageUrl={vaga.imageUrl}
              companyName={vaga.companyName}
              title={vaga.title}
              description={vaga.description}
            />
          ))}
        </section>
      </div>

      {isVisible && <ScrollTopButton />}
    </div>
  );
};

export default UserHomePage;
