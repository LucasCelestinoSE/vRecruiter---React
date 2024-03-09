import React from "react";
import "./AddQuestionPopup.css";

const AddQuestionPopup = ({
  isEditMode,
  newQuestion,
  handleInputChange,
  handleSaveQuestion,
  handleClose,
}) => {
  const handleCheckboxChange = (optionIndex) => {
    const updatedOptions = (newQuestion.respostas || []).map(
      (option, index) => ({
        ...option,
        correta: index === optionIndex,
      })
    );

    handleInputChange({ target: { name: "respostas", value: updatedOptions } });
  };

  return (
    <div className="form-vac-container-popup">
      <h1>Adicionar Pergunta</h1>
      <label className="form-vac-label-popup">
        Pergunta:
        <textarea
          type="text"
          name="pergunta"
          value={newQuestion.pergunta}
          onChange={(e) => handleInputChange(e)}
          required
          className="form-vac-textarea-popup"
        />
      </label>

      <label className="form-vac-label-popup">Opções de Resposta:</label>
      {newQuestion.respostas.map((option, optionIndex) => (
        <div key={optionIndex} className="form-vac-option-container-popup">
          <input
            type="text"
            name="opcao"
            placeholder={`Opção ${optionIndex + 1}`}
            value={option.opcao}
            onChange={(e) => handleInputChange(e, optionIndex)}
            required
            className="form-vac-option-input-popup"
          />
          <label className="form-vac-option-checkbox">
            Correta
            <input
              type="checkbox"
              name="correta"
              checked={option.correta}
              onChange={() => handleCheckboxChange(optionIndex)}
            />
          </label>
        </div>
      ))}
      {isEditMode ? (
        <div></div>
      ) : (
        <div>
          <button
            type="button"
            onClick={handleSaveQuestion}
            className="form-vac-button-popup"
          >
            Salvar Pergunta
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="form-vac-button-secondary-popup"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddQuestionPopup;
