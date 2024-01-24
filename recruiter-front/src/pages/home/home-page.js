import React, { useState, useEffect } from "react";
import CompanyCard from "../../components/cards/company-card/company-card";
import VacancyCard from "../../components/cards/vacancy-card/vacancy-card";
import "./home-page.css";

const UserHomePage = () => {
  const [userName, setUserName] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [vacancies, setVacancies] = useState([]);

  const handleScroll = () => {
    setIsVisible(window.scrollY >= 300);
  };

  const handleSearch = () => {
    // Implement your search logic here
    // Update the 'vacancies' state based on the search term
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // Fetch user data here
      // Set user name using setUserName
    };

    const fetchCompanies = async () => {
      // Fetch companies data here
      // Set companies using setCompanies
    };

    const fetchVacancies = async () => {
      // Fetch vacancies data here
      // Set vacancies using setVacancies
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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for vacancies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>
         
        </button>
      </div>

      <section className="companies-section">
        <h2>Companies</h2>
        <div className="company-list">
          {companies.map((company) => (
            <CompanyCard key={company.id} {...company} />
          ))}
        </div>
      </section>

      <section className="vacancies-section">
        <h2>Vacancies</h2>
        <p>Total vacancies: {vacancies.length}</p>
        <div className="vacancy-list">
          {vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} {...vacancy} />
          ))}
        </div>
      </section>

      {isVisible && (
        <button
          className="scroll-top-button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          
        </button>
      )}
    </div>
  );
};

export default UserHomePage;
