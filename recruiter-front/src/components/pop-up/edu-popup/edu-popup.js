import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import "../profile-add-popup.css";

const EducationPopup = ({ handleClose, handleAddEducation }) => {
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const educacaoFormatada = {
      ...formData,
      startDate: formatarData(formData.startDate),
      endDate: formData.endDate ? formatarData(formData.endDate) : "Atual",
    };
    handleAddEducation(educacaoFormatada);
    handleClose();
  };

  return (
    <div className="popup-background">
      <div className="popup-content">
        <h2>Adicionar Informações Educacionais</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Instituição"
            value={formData.institution}
            onChange={(e) => handleInputChange(e, "institution")}
            required
          />
          <input
            type="text"
            placeholder="Grau Obtido"
            value={formData.degree}
            onChange={(e) => handleInputChange(e, "degree")}
            required
          />
          <div className="date-picker-container">
            <div>
              <label>Início</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange(e, "startDate")}
                placeholder="Data de Início"
                required
              />
            </div>
            <div>
              <label>Fim</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange(e, "endDate")}
              />
            </div>
          </div>
          <p>*Deixe a data de conclusão em branco se ainda estiver cursando</p>
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

export default EducationPopup;
