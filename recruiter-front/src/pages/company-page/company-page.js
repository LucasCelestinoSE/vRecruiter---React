import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import VacancyCard from "../../components/cards/vacancy-card/vacancy-card";
import {
  getCompanyById,
  getVacanciesFromCompany,
} from "../../services/firestore-DB";

import "./company-page.css";

const CompanyPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyData = await getCompanyById(id);
        setCompany(companyData);
      } catch (error) {
        console.error("Erro ao buscar empresa:", error.message);
      }
    };

    const fetchCompanyVacancies = async () => {
      try {
        const vagasDaEmpresa = await getVacanciesFromCompany(id);
        setVagas(vagasDaEmpresa);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error.message);
        setVagas([]);
        alert("Erro ao carregar as vagas da empresa.");
      }
    };

    fetchCompanyData();
    fetchCompanyVacancies();
  }, [company, id]);

  return (
    <div className="CompanyPage-container">
      <Link to="/home" className="CompanyPage-back-button">
        <IoChevronBack />
      </Link>
      <div className="CompanyPage-info">
        <img
          className="CompanyPage-back-image"
          src={company?.bannerImage || ""}
          alt="Background"
        />
        <img
          className="CompanyPage-small-image"
          src={company?.imageUrl || ""}
          alt="Imagem Pequena"
        />
        <h1 className="CompanyPage-image-text">{company?.name || ""}</h1>
      </div>
      <p className="CompanyPage-description">{company?.description || ""}</p>
      <div className="CompanyPage-vacations">
        {vagas.length > 0 ? (
          <>
            <h1>Vagas disponíveis</h1>
            {vagas.map((vaga) => (
              <VacancyCard
                key={vaga.id}
                id={vaga.id}
                imageUrl={vaga.imageUrl}
                companyName={vaga.companyName}
                title={vaga.title}
                description={vaga.description}
              />
            ))}
          </>
        ) : (
          <p>Não há vagas disponíveis no momento.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyPage;
