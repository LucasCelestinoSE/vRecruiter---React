// components/UserProfile.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditProfileForm from "./edit-profile-form";

import "./user-profile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    nome: "Jose Eduardo Santos Azevedo",
    idade: 21,
    email: "eduteste123@gmail.com",
    telefone: "(79) 99975-9461",
    genero: "Masculino",
    cep: "49400000",
    cidade: "Lagarto",
    estado: "Sergipe",
    experienciasProfissionais: [],
    formacoes: [],
    idiomas: [],
    habilidades: [],
    deficiencias: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedData) => {
    setUserData(updatedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="user-profile-container">
      {isEditing ? (
        <div>
          <EditProfileForm
            userData={userData}
            onSave={handleSave}
            onCancel={handleCancel}
            onFileChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="user-profile">
          <div className="user-profile-pic">
            <img
              src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
              alt="Imagem do Perfil"
            />
          </div>

          {!isEditing ? (
            <button onClick={handleEditClick}>Editar Perfil</button>
          ) : (
            <div></div>
          )}
          <div className="user-infos">
            <p>
              Nome: <b>{userData.nome}</b>
            </p>
            <p>
              Idade: <b>{userData.idade}</b> | Gênero:
              <b> {userData.genero}</b>
            </p>
          </div>

          <div className="user-contact">
            <p>
              Telefone: <b>{userData.telefone}</b>
            </p>
            <p>
              E-mail: <b>{userData.email}</b>
            </p>
          </div>

          <div className="user-loc-info">
            <p>
              Cidade: <b>{userData.cidade}</b>| Estado: <b>{userData.estado}</b>{" "}
              | CEP: <b>{userData.cep}</b>
            </p>
          </div>

          <div className="user-exp">
            <h2>Experiências Profissionais</h2>
            <ul>
              {userData.experienciasProfissionais.map((experiencia) => (
                <li key={experiencia.id}>
                  <p>Cargo: {experiencia.cargo}</p>
                  <p>Empresa: {experiencia.empresa}</p>
                  <p>Data de Início: {experiencia.dataInicio}</p>
                  <p>Data de Fim: {experiencia.dataFim}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="user-edu">
            <h2>Formações</h2>
            <ul>
              {userData.formacoes.map((formacao) => (
                <li key={formacao.id}>
                  <p>Curso: {formacao.curso}</p>
                  <p>Instituição: {formacao.instituicao}</p>
                  <p>Data de Conclusão: {formacao.dataConclusao}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="user-lang">
            <h2>Idiomas</h2>
            <ul>
              {userData.idiomas.map((idioma) => (
                <li key={idioma.id}>
                  <p>Idioma: {idioma.idioma}</p>
                  <p>Nível: {idioma.nivel}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="user-skills">
            <h2>Habilidades</h2>
            <ul>
              {userData.habilidades.map((habilidade, index) => (
                <li key={index}>{habilidade}</li>
              ))}
            </ul>
          </div>

          <div className="user-disability">
            <h2>Deficiências</h2>
            <ul>
              {userData.deficiencias.map((deficiencia, index) => (
                <li key={index}>{deficiencia}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
