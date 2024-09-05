import React from "react";
import "./vacancy-modal.css";

const VacancyModal = ({ vaga, onClose }) => {
  if (!vaga) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div
          className="VacancyPage-company-info"
          style={{
            backgroundImage: `url(${vaga.imageUrl || ""})`,
          }}
        >
          <p className="VacancyPage-image-text">{vaga.companyName || ""}</p>
          <button className="VacancyPage-image-button">Candidatar-se</button>
        </div>
        <div className="VacancyPage-content">
          <h1 className="VacancyPage-title">{vaga.title || ""}</h1>
          <p className="VacancyPage-description">{vaga.description || ""}</p>
          <h2>REQUISITOS</h2>
          <div className="requisitos">
            <p>{vaga.requisitos || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyModal;
