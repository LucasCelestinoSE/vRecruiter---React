import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import CompanyCard from "../../components/cards/company-card/company-card";
import VacancyCard from "../../components/cards/vacancy-card/vacancy-card";
import "./home-page.css";
import BannerImage from "../../assets/images/Background.png";
import UserButton from "../../components/buttons/userButton";
import { FaSearch } from "react-icons/fa";
import { logout } from "../../services/auth";
import ScrollTopButton from "../../components/buttons/scroll-top-button/scroll-top-button";
import { getVacancies, getCompanies } from "../../services/firestore-DB";
import Footer from "../../components/footer/footer";

const UserHomePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const uidRef = useRef("");

  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY >= 300);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      uidRef.current = user ? user.uid : null;
      setIsUserLoggedIn(!!user);

      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error.message);
      }

      try {
        const vacanciesData = await getVacancies();
        setVacancies(vacanciesData);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error.message);
      }
    };

    fetchData();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const filteredVacancies = useMemo(() => {
    if (!searchTerm) return vacancies;
    return vacancies.filter((vaga) =>
      vaga.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [vacancies, searchTerm]);

  return (
    <div className="user-home-page">
      <div className="banner">
        <img src={BannerImage} alt="Background" />
      </div>

      <div className="user-info">
        <UserButton username="MENU" onLogoutClick={logout} />
      </div>

      <div className="sections">
        <h1>EMPRESAS</h1>
        <div className="companies-container">
          <div className="companies-section">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                id={company.id}
                imageUrl={company.imageUrl}
                companyName={company.name}
              />
            ))}
          </div>
        </div>
        <div className="search-container">
          <h1>VAGAS</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button onClick={() => handleSearch(searchTerm)}>
              <FaSearch color="#FFF" />
            </button>
          </div>
        </div>

        <div className="vacancies-container">
          <div className="vacancies-section">
            {filteredVacancies.length > 0 ? (
              filteredVacancies.map((vaga) => (
                <VacancyCard
                  key={vaga.id}
                  id={vaga.id}
                  companyId={vaga.companyID}
                  imageUrl={vaga.imageUrl}
                  companyName={vaga.companyName}
                  title={vaga.title}
                  description={vaga.description}
                  requisitos={vaga.requisitos}
                />
              ))
            ) : (
              <p>Vaga não encontrada.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {isVisible && <ScrollTopButton />}
    </div>
  );
};

export default UserHomePage;
