import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import "../profile-add-popup.css";

const ExperiencePopup = ({ handleClose, handleAddExperience }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
  });

  const formatarData = (data) => {
    const dataObj = new Date(data);
    dataObj.setDate(dataObj.getDate() + 1);
    return format(dataObj, "dd/MM/yyyy", { locale: ptBR });
  };

  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleDateChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };

  const handleCurrentCheckboxChange = (e) => {
    setFormData({
      ...formData,
      isCurrent: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const experienciaFormatada = {
      ...formData,
      startDate: formatarData(formData.startDate),
      endDate: formData.isCurrent ? "Atual" : formatarData(formData.endDate),
    };
    handleAddExperience(experienciaFormatada);
    handleClose();
  };

  const closePopup = () => {
    setIsPopUpOpen(false);
  };

  return (
    <div className="popup-background">
      <div className="popup-content">
        <h2>Adicionar Experiência Profissional</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cargo"
            value={formData.position}
            onChange={(e) => handleInputChange(e, "position")}
            required
          />
          <input
            type="text"
            placeholder="Empresa"
            value={formData.company}
            onChange={(e) => handleInputChange(e, "company")}
            required
          />
          <div className="date-picker-container">
            <div>
              <label>Início:</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleDateChange(e, "startDate")}
                placeholder="Data de Início"
                required
              />
            </div>
            <div>
              {!formData.isCurrent ? <label>Fim:</label> : null}
              {formData.isCurrent ? null : (
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleDateChange(e, "endDate")}
                  placeholder="Data de Término"
                  required={!formData.isCurrent}
                />
              )}
            </div>
          </div>

          <div className="checkbox-data">
            <label>
              <b>Ainda empregado?</b>
              <input
                type="checkbox"
                checked={formData.isCurrent}
                onChange={handleCurrentCheckboxChange}
              />
            </label>
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

export default ExperiencePopup;
