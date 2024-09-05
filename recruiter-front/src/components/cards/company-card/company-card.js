import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./company-card.css";

const CompanyCard = ({ id, companyName, imageUrl, description }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <Link
      to={`/company/${id}`}
      className={`company-card ${isHover ? "hovered" : ""}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img src={imageUrl} alt={companyName} className="company-logo" />
      <div className="company-details">
        <p className="company-name">{companyName}</p>
      </div>
      {isHover && (
        <div className="overlay">
          <p className="overlay-text">Visitar perfil</p>
        </div>
      )}
    </Link>
  );
};

export default CompanyCard;
