import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import Banner from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";
import { getVacancyById } from "../../services/firestore-DB";

import "./vacancy-page.css";

const VacancyPage = () => {
  const { id } = useParams();
  const [vaga, setVaga] = useState(null);

  useEffect(() => {
    const fetchVagaData = async () => {
      try {
        const vagaData = await getVacancyById(id);
        setVaga(vagaData);
      } catch (error) {
        console.error("Erro ao buscar vaga:", error);
      }
    };

    fetchVagaData();
  }, [id]);

  return (
    <>
      <div className="VacancyPage-container">
        <Link to="/home" className="VacancyPage-back-button">
          <IoChevronBack />
        </Link>
        <img
          className="VacancyPage-large-image"
          src={vaga?.bannerImage || ""}
          alt="Imagem Grande"
        />
        <div className="VacancyPage-company-info">
          <img
            className="VacancyPage-small-image"
            src={vaga?.imageUrl || ""}
            alt="Imagem Pequena"
          />
          <p className="VacancyPage-image-text">{vaga?.companyName || ""}</p>
          <button className="VacancyPage-image-button">Candidatar-se</button>
        </div>
      </div>

      <div className="VacancyPage-content">
        <h1 className="VacancyPage-title">{vaga?.title || ""}</h1>
        <p className="VacancyPage-description">{vaga?.description || ""}</p>

        <h2>REQUISITOS</h2>
        <div className="requisitos">
          <p>{vaga?.requisitos || ""}</p>
        </div>
      </div>
    </>
  );
};

export default VacancyPage;
