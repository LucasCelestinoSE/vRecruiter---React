import React, { useState } from "react";
import VacancyModal from "../../modal/VacancyModal";
import "./vacancy-card.css";

const VacancyCard = ({
  id,
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
            <img src={imageUrl} alt={companyName} className="logo-company" />
            <p className="name-company">{companyName}</p>
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
