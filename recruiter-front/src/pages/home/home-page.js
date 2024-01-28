import React, { useState, useEffect } from "react";
import CompanyCard from "../../components/cards/company-card/company-card";
import VacancyCard from "../../components/cards/vacancy-card/vacancy-card";
import "./home-page.css";
import BannerImage from "../../assets/images/Background.png";
import UserButton from "../../components/buttons/userButton";
import { FaSearch, FaArrowUp } from "react-icons/fa";

const UserHomePage = () => {
  const [userName, setUserName] = useState("José Eduardo Santos Azevedo");
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [vacancies, setVacancies] = useState([]);

  const handleScroll = () => {
    setIsVisible(window.scrollY >= 300);
  };

  const handleSearch = () => {};

  useEffect(() => {
    const fetchUserData = async () => {};

    const fetchCompanies = async () => {};

    const fetchVacancies = async () => {};

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
        <UserButton
          username={userName}
          onProfileClick={() => console.log("Perfil clicado")}
          onLogoutClick={() => console.log("Sair clicado")}
        />
      </div>

      <div className="sections">
        <section className="companies-section">
          <h1>Empresas</h1>
          <CompanyCard
            id={1}
            imageUrl={BannerImage}
            companyName={"Empresa 1"}
          />
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
          <VacancyCard
            id={1}
            imageUrl={BannerImage}
            companyName={"Nome da Empresa"}
            title={"Título da Vaga"}
            description={
              "Uma descrição muito foda que anima qualquer um que a ler e vai querer dar uma olhada."
            }
          />
        </section>
      </div>

      {isVisible && (
        <button
          className="scroll-top-button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default UserHomePage;
