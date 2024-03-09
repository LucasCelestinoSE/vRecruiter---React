import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import "../profile-add-popup.css";

const CoursePopup = ({ handleClose, handleAddCourse }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    institution: "",
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
    const formatedCourseData = {
      ...formData,
      startDate: formatarData(formData.startDate),
      endDate: formData.endDate ? formatarData(formData.endDate) : "Atual",
    };
    handleAddCourse(formatedCourseData);
    handleClose();
  };

  return (
    <div className="popup-background">
      <div className="popup-content">
        <h2>Adicionar Curso</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome do Curso"
            value={formData.courseName}
            onChange={(e) => handleInputChange(e, "courseName")}
            required
          />
          <input
            type="text"
            placeholder="Instituição/Plataforma"
            value={formData.institution}
            onChange={(e) => handleInputChange(e, "institution")}
            required
          />

          <div className="date-picker-container">
            <label>
              Início
              <input
                type="date"
                placeholder="Data de Início"
                value={formData.startDate}
                onChange={(e) => handleInputChange(e, "startDate")}
                required
              />
            </label>

            <label>
              Fim
              <input
                type="date"
                value={formData.endDate}
                placeholder="Data de Término"
                onChange={(e) => handleInputChange(e, "endDate")}
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

export default CoursePopup;
