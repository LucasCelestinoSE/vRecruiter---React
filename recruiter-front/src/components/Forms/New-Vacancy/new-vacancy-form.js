import React, { useState } from "react";
import { saveNewVacancy } from "../../../services/firestore-DB";
import AddQuestionPopup from "./AddQuestionPopup"; // Certifique-se de importar o componente AddQuestionPopup corretamente
import QuestionList from "./QuestionList"; // Certifique-se de importar o componente QuestionList corretamente

import "./new-vacancy-form.css";

const NewVacancyForm = () => {
  const [isAddQuestModalOpen, setIsAddQuestModalOpen] = useState(false);
  const [vacancyData, setVacancyData] = useState({
    title: "",
    companyID: "",
    companyName: "",
    description: "",
    requisitos: "",
    bannerImage: "",
    imageUrl: "",
    questionario: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    pergunta: "",
    respostas: [
      { opcao: "", correta: false },
      { opcao: "", correta: false },
      { opcao: "", correta: false },
      { opcao: "", correta: false },
    ],
  });

  const handleSaveQuestion = () => {
    setVacancyData((prevData) => ({
      ...prevData,
      questionario: [...prevData.questionario, { ...newQuestion }],
    }));
    setNewQuestion({
      pergunta: "",
      respostas: [
        { opcao: "", correta: false },
        { opcao: "", correta: false },
        { opcao: "", correta: false },
        { opcao: "", correta: false },
      ],
    });
    setIsAddQuestModalOpen(false);
  };

  const handleInputChange = (e, optionIndex) => {
    const { name, value, type, checked } = e.target;
    const updatedQuestion = { ...newQuestion };

    if (type === "checkbox") {
      updatedQuestion.respostas[optionIndex].correta = checked;
    } else if (name === "opcao") {
      updatedQuestion.respostas[optionIndex].opcao = value;
    } else {
      updatedQuestion[name] = value;
    }

    setNewQuestion(updatedQuestion);
  };

  const handleAddQuestion = () => {
    setVacancyData((prevData) => ({
      ...prevData,
      questionario: [
        ...prevData.questionario,
        {
          pergunta: "",
          respostas: [
            { opcao: "", correta: false },
            { opcao: "", correta: false },
            { opcao: "", correta: false },
            { opcao: "", correta: false },
          ],
        },
      ],
    }));
    setIsAddQuestModalOpen(true);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...vacancyData.questionario];
    updatedQuestions.splice(index, 1);
    setVacancyData((prevData) => ({
      ...prevData,
      questionario: updatedQuestions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.values(vacancyData).some(
        (value) => value === "" || value === null || value === undefined
      ) ||
      vacancyData.questionario.some(
        (question) =>
          question.pergunta === "" ||
          question.respostas.some((option) => option.opcao === "")
      )
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const newVacancyId = await saveNewVacancy(vacancyData);
      console.log("Nova vaga criada com sucesso! ID:", newVacancyId);
    } catch (error) {
      console.error("Erro ao criar a nova vaga:", error.message);
    }
  };

  return (
    <div>
      <form className="form-vac-container" onSubmit={handleSubmit}>
        <h1>CRIAR VAGA</h1>
        <label className="form-vac-label">
          Título:
          <input
            type="text"
            name="title"
            value={vacancyData.title}
            onChange={(e) =>
              setVacancyData({ ...vacancyData, title: e.target.value })
            }
            required
            className="form-vac-input"
          />
        </label>

        <label className="form-vac-label">
          Descrição:
          <textarea
            type="text"
            name="description"
            value={vacancyData.description}
            onChange={(e) =>
              setVacancyData({ ...vacancyData, description: e.target.value })
            }
            required
            className="form-vac-textarea"
          />
        </label>

        <label className="form-vac-label">
          Requisitos:
          <textarea
            type="text"
            name="requisitos"
            value={vacancyData.requisitos}
            onChange={(e) =>
              setVacancyData({ ...vacancyData, requisitos: e.target.value })
            }
            required
            className="form-vac-textarea"
          />
        </label>

        <QuestionList
          questions={vacancyData.questionario}
          handleDeleteQuestion={handleDeleteQuestion}
        />

        <button
          type="button"
          onClick={() => setIsAddQuestModalOpen(true)}
          className="form-button"
        >
          Adicionar Pergunta
        </button>

        <button type="submit" className="form-vac-button">
          Criar Vaga
        </button>
      </form>

      {isAddQuestModalOpen && (
        <AddQuestionPopup
          newQuestion={newQuestion}
          handleInputChange={handleInputChange}
          handleAddQuestion={handleAddQuestion}
          handleSaveQuestion={handleSaveQuestion}
          handleClose={() => setIsAddQuestModalOpen(false)}
        />
      )}
    </div>
  );
};

export default NewVacancyForm;
