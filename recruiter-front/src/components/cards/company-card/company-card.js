import React, { useState } from "react";
import "./company-card.css";
import { Link } from "react-router-dom";

const CompanyCard = ({ id, companyName, imageUrl }) => {
  const [isHover, setIsHover] = useState(false);

  const handleCardClick = () => {
    <Link to={`/company/${id}`}></Link>;
  };

  return (
    <div
      className={`company-card ${isHover ? "hovered" : ""}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img src={imageUrl} alt={companyName} className="company-logo" />
      <div className="company-details">
        <p className="company-name">{companyName}</p>
        <button className="company-button">Ver perfil</button>
      </div>
    </div>
  );
};

export default CompanyCard;
