import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./company-card.css";

const CompanyCard = ({ id, companyName, imageUrl }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={`company-card ${isHover ? "hovered" : ""}`}>
      <img src={imageUrl} alt={companyName} className="company-logo" />
      <div className="company-details">
        <p className="company-name">{companyName}</p>
        <Link to={`/company/${id}`}>
          <button className="company-button">PERFIL</button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
