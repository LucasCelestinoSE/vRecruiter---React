import React, { useState } from "react";
import "./vacancy-card.css";
import { Link } from "react-router-dom";

const VacancyCard = ({ id, companyName, imageUrl, title, description }) => {
  const [isHover, setIsHover] = useState(false);

  return (
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

        <div>
          <p className="vacancy-title">{title}</p>
          <p className="vacancy-card-description">{description}</p>
          <Link to={`/vacancy/${id}`}>
            <button className="vacancy-button">ACESSAR</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;
