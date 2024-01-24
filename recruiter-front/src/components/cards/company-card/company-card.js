import React, { useState } from "react";
import "./company-card.css";
import { Link } from "react-router-dom";
const CompanyCard = ({ id, name, imageUrl }) => {
  const [isHover, setIsHover] = useState(false);

  const handleCardClick = () => {
    <Link to={`/company/${id}`}> </Link>;
  };

  return (
    <div
      className={`company-card ${isHover ? "hovered" : ""}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={
          name === "COMPES"
            ? "assets/images/COMPES.png"
            : "assets/images/LK.png"
        }
        alt={name}
        className="company-logo"
      />
      <div className="company-details">
        <p className="company-name">{name}</p>
 
      </div>
    </div>
  );
};

export default CompanyCard;
