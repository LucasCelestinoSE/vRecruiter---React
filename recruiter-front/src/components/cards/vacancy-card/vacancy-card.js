import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link
import VacancyModal from "../../modal/VacancyModal";
import "./vacancy-card.css";

const VacancyCard = ({
  id, // id da vaga
  companyId, // id da empresa
  companyName,
  imageUrl,
  title,
  description,
  requisitos,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const vaga = { id, companyName, imageUrl, title, description, requisitos };

  return (
    <>
      <div
        className={`vacancy-card ${isHover ? "hovered" : ""}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="vacancy-details">
          <div className="company-info">
            {/* Usando o companyId em vez do id da vaga */}
            <Link to={`/company/${companyId}`}>
              <img src={imageUrl} alt={companyName} className="logo-company" />
            </Link>

            <Link to={`/company/${companyId}`} className="name-company">
              <p>{companyName}</p>
            </Link>
          </div>

          <div className="vacancy-info">
            <p className="vacancy-title">{title}</p>
            <p className="vacancy-card-description">{description}</p>
            <button
              className="vacancy-button"
              onClick={() => setShowModal(true)}
            >
              SAIBA MAIS
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <VacancyModal vaga={vaga} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default VacancyCard;
