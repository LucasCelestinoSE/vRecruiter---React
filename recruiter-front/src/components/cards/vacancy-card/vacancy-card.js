import React from "react";
import { Link } from "react-router-dom";
import "./vacancy-card.css"; // Certifique-se de criar um arquivo de estilo correspondente

const VacancyCard = ({
  id,
  title,
  description,
  companyName,
  companyImageUrl,
  vaga,
}) => {
  const handleCardClick = () => {
    <Link to={`/vacancy/${id}`}> </Link>;
  };

  return (
    <div className="vacancy-card" onClick={handleCardClick}>
      <div className="company-info">
        <img src={companyImageUrl} alt={companyName} className="company-logo" />
        <p className="company-name">{companyName}</p>
      </div>
      <div className="vacancy-details">
        <h3 className="vacancy-title">{title}</h3>
        <p className="vacancy-description">{description}</p>
      </div>
      <button
        text="ACESSAR"
        textColor="white"
        backgroundColor="#2bc58c"
        textSize={14}
        onClick={() => {
          <Link to={`/vacancy/${id}`}> </Link>;
        }}
        height={35}
        width="100%"
        borderRadius={30}
      />
    </div>
  );
};

export default VacancyCard;
