import React from "react";

import VacancyCard from "../../components/cards/vacancy-card/vacancy-card";
import LogoImage from "../../assets/images/logo.png";
import BannerImage from "../../assets/images/Background.png";

import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

import "./company-page.css";

const CompanyPage = () => {
  return (
    <div className="CompanyPage-container">
      <Link to="/home" className="CompanyPage-back-button">
        <IoChevronBack />
      </Link>
      <div className="CompanyPage-info">
        <img
          className="CompanyPage-back-image"
          src={BannerImage}
          alt="Background"
        />

        <img
          className="CompanyPage-small-image"
          src={LogoImage}
          alt="Imagem Pequena"
        />
        <h1 className="CompanyPage-image-text">RECRUITER</h1>
      </div>
      <p className="CompanyPage-description">
        Alguma frase de efeito muito foda para cativar quem visitar a pagina
      </p>
      <div className="CompanyPage-vacations">
        <h1>Vagas disponíveis</h1>
        <VacancyCard
          id={1}
          imageUrl={LogoImage}
          companyName={"Nome da Empresa"}
          title={"Título da Vaga"}
          description={
            "Uma descrição muito foda que anima qualquer um que a ler e vai querer dar uma olhada."
          }
        />
      </div>
    </div>
  );
};

export default CompanyPage;
