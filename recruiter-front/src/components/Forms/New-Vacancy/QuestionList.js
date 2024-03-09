// QuestionList.js
import React, { useState } from "react";
import AddQuestionPopup from "./AddQuestionPopup";
import "./QuestionList.css";

const QuestionList = ({ questions, handleDeleteQuestion }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleQuestionClick = (index) => {
    setSelectedQuestion(index);
  };

  const handleClosePopup = () => {
    setSelectedQuestion(null);
  };

  return (
    <div className="question-list-container">
      <h2>Perguntas Adicionadas:</h2>
      <ul className="question-list">
        {questions.map((question, index) => (
          <>
            <div className="question-list-title">
              <h2>{question.pergunta}</h2>

              <button onClick={() => handleDeleteQuestion(index)}>
                Excluir
              </button>
            </div>
            <li
              key={index}
              className="question-card"
              onClick={() => handleQuestionClick(index)}
            >
              <ul className="options-list">
                {question.respostas.map((option, optionIndex) => (
                  <li key={optionIndex} className="option-card">
                    <strong>{`Opção ${optionIndex + 1}: `}</strong>
                    {option.opcao} - {option.correta ? "Correta" : "Incorreta"}
                  </li>
                ))}
              </ul>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
