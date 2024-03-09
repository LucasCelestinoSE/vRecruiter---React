import React, { useState } from "react";
import "../profile-add-popup.css";

const DisabilityPopup = ({ handleClose, handleAddDisability }) => {
  const [formData, setFormData] = useState({
    disability: "",
  });

  const handleInputChange = (e, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddDisability(formData);
    handleClose();
  };

  return (
    <div className="popup-background">
      <div className="popup-content">
        <h2>Adicionar Deficiência</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Deficiência"
            value={formData.disability}
            onChange={(e) => handleInputChange(e, "disability")}
            required
          />
          <div className="pop-up-buttons">
            <button type="submit">Adicionar</button>
            <button type="button" onClick={handleClose}>
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisabilityPopup;
