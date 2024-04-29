import React, { useState } from "react";
import "../profile-add-popup.css";

const LanguagePopup = ({ handleClose, handleAddLanguage }) => {
  const [formData, setFormData] = useState({
    language: "",
    level: "",
  });

  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddLanguage(formData);
    handleClose();
  };

  const languageLevels = ["Iniciante", "Intermediário", "Avançado", "Fluente"];

  return (
    <div className="popup-background">
      <div className="popup-content">
        <h2>Adicionar Idioma</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Idioma"
            value={formData.language}
            onChange={(e) => handleInputChange(e, "language")}
            required
          />
          <div className="dropdown-container">
            <label htmlFor="level">Nível:</label>
            <select
              id="level"
              value={formData.level}
              onChange={(e) => handleInputChange(e, "level")}
              required
              className="dropdown-select"
            >
              <option value="" disabled>
                Selecione o nível
              </option>
              {languageLevels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
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

export default LanguagePopup;
