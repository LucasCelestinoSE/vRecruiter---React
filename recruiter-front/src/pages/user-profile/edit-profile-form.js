import React, { useState, useEffect } from "react";
import { IoAddCircleOutline, IoCloudUploadOutline } from "react-icons/io5";
import Dropzone from "react-dropzone-uploader";
import { CircularProgress } from "@mui/material";
import { useDropzone } from "react-dropzone";
import ExperienceModal from "../../components/modal/experience-modal/exp-modal";

import "./edit-profile-form.css";

const EditProfileForm = ({
  userData,
  onFileChange,
  onSave,
  onCancel,
  selectedImage,
}) => {
  const [updatedData, setUpdatedData] = useState(userData);
  const [cepData, setCepData] = useState({});
  const [loadingCep, setLoadingCep] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const openExperienceModal = () => {
    setIsExperienceModalOpen(true);
  };

  const closeExperienceModal = () => {
    setIsExperienceModalOpen(false);
  };

  useEffect(() => {
    const fetchCepData = async () => {
      try {
        setLoadingCep(true);
        const response = await fetch(
          `https://viacep.com.br/ws/${updatedData.cep}/json/`
        );
        const data = await response.json();
        setCepData(data);

        setUpdatedData((prevData) => ({
          ...prevData,
          cidade: data.localidade || prevData.cidade,
          estado: data.uf || prevData.estado,
        }));
      } catch (error) {
        console.error("Erro ao obter dados do CEP:", error);
      } finally {
        setLoadingCep(false);
      }
    };
    if (updatedData.cep.length === 8) {
      fetchCepData();
    }
  }, [updatedData.cep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeExperience = (e, index, field) => {
    const value = e.target.value;
    setUpdatedData((prevData) => {
      const updatedExperiences = [...prevData.experienciasProfissionais];
      updatedExperiences[index][field] = value;
      return { ...prevData, experienciasProfissionais: updatedExperiences };
    });
  };

  const handleRemoveExperience = (index) => {
    setUpdatedData((prevData) => {
      const updatedExperiences = [...prevData.experienciasProfissionais];
      updatedExperiences.splice(index, 1);
      return { ...prevData, experienciasProfissionais: updatedExperiences };
    });
  };

  const handleAddExperience = () => {
    setUpdatedData((prevData) => ({
      ...prevData,
      experienciasProfissionais: [
        ...prevData.experienciasProfissionais,
        { cargo: "", empresa: "", dataInicio: "", dataFim: "" },
      ],
    }));
  };

  const handleChangeEducation = (e, index, field) => {
    const value = e.target.value;
    setUpdatedData((prevData) => {
      const updatedEducations = [...prevData.formacoes];
      updatedEducations[index][field] = value;
      return { ...prevData, formacoes: updatedEducations };
    });
  };

  const handleRemoveEducation = (index) => {
    setUpdatedData((prevData) => {
      const updatedEducations = [...prevData.formacoes];
      updatedEducations.splice(index, 1);
      return { ...prevData, formacoes: updatedEducations };
    });
  };

  const handleAddEducation = () => {
    setUpdatedData((prevData) => ({
      ...prevData,
      formacoes: [
        ...prevData.formacoes,
        { curso: "", instituicao: "", dataConclusao: "" },
      ],
    }));
  };

  const handleChangeLanguage = (e, index, field) => {
    const value = e.target.value;
    setUpdatedData((prevData) => {
      const updatedLanguages = [...prevData.idiomas];
      updatedLanguages[index][field] = value;
      return { ...prevData, idiomas: updatedLanguages };
    });
  };

  const handleRemoveLanguage = (index) => {
    setUpdatedData((prevData) => {
      const updatedLanguages = [...prevData.idiomas];
      updatedLanguages.splice(index, 1);
      return { ...prevData, idiomas: updatedLanguages };
    });
  };

  const handleAddLanguage = () => {
    setUpdatedData((prevData) => ({
      ...prevData,
      idiomas: [...prevData.idiomas, { idioma: "", nivel: "" }],
    }));
  };

  const handleChangeSkill = (e, index) => {
    const value = e.target.value;
    setUpdatedData((prevData) => {
      const updatedSkills = [...prevData.habilidades];
      updatedSkills[index] = value;
      return { ...prevData, habilidades: updatedSkills };
    });
  };

  const handleRemoveSkill = (index) => {
    setUpdatedData((prevData) => {
      const updatedSkills = [...prevData.habilidades];
      updatedSkills.splice(index, 1);
      return { ...prevData, habilidades: updatedSkills };
    });
  };

  const handleAddSkill = () => {
    setUpdatedData((prevData) => ({
      ...prevData,
      habilidades: [...prevData.habilidades, ""],
    }));
  };

  const handleChangeDisability = (e, index) => {
    const value = e.target.value;
    setUpdatedData((prevData) => {
      const updatedDisabilities = [...prevData.deficiencias];
      updatedDisabilities[index] = value;
      return { ...prevData, deficiencias: updatedDisabilities };
    });
  };

  const handleRemoveDisability = (index) => {
    setUpdatedData((prevData) => {
      const updatedDisabilities = [...prevData.deficiencias];
      updatedDisabilities.splice(index, 1);
      return { ...prevData, deficiencias: updatedDisabilities };
    });
  };

  const handleAddDisability = () => {
    setUpdatedData((prevData) => ({
      ...prevData,
      deficiencias: [...prevData.deficiencias, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="edit-profile-left">
          <label>
            Foto do perfil:
            <input type="file" accept="image/*" onChange={onFileChange} />
          </label>
          <label className="form-label-photo">
            {selectedImage && (
              <img
                src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
                alt="Foto de perfil"
                onLoad={() => setIsLoading(false)}
              />
            )}
          </label>
          <label className="form-label">
            Nome
            <input
              type="text"
              name="nome"
              className="form-input"
              value={updatedData.nome}
              onChange={handleChange}
            />
          </label>
          <div className="mini-inputs">
            <label className="form-label">
              Idade
              <br />
              <input
                type="number"
                name="idade"
                className="form-mini-input"
                value={updatedData.idade}
                onChange={handleChange}
              />
            </label>

            <label className="form-label">
              Gênero
              <br />
              <input
                type="text"
                name="genero"
                className="form-mini-input"
                value={updatedData.genero}
                onChange={handleChange}
              />
            </label>
          </div>
          <label className="form-label">
            Telefone
            <br />
            <input
              type="text"
              name="telefone"
              className="form-input"
              value={updatedData.telefone}
              onChange={handleChange}
              placeholder="DDD + Telefone"
            />
          </label>
          <label className="form-label">
            Email
            <br />
            <input
              type="text"
              name="email"
              className="form-input"
              value={updatedData.email}
              onChange={handleChange}
            />
          </label>
          <p style={{ color: "#797979", fontSize: "14px" }}>
            *Insira apenas o CEP
          </p>
          <div className="location-inputs">
            <label className="form-label">
              CEP
              <input
                type="text"
                name="cep"
                className="form-input-cep"
                value={updatedData.cep}
                onChange={handleChange}
              />
            </label>
            <label className="form-label">
              Cidade
              <input
                type="text"
                name="cidade"
                className="form-input"
                value={updatedData.cidade}
                onChange={handleChange}
                readOnly
                style={{ color: "#797979" }}
              />
            </label>
            <label className="form-label">
              Estado
              <input
                type="text"
                name="estado"
                className="form-input"
                value={updatedData.estado}
                onChange={handleChange}
                readOnly
                style={{ color: "#797979" }}
              />
            </label>
          </div>
        </div>
        <div className="edit-profile-right">
          <h2 className="form-section-title">Experiências Profissionais</h2>
          {updatedData.experienciasProfissionais &&
            updatedData.experienciasProfissionais.map((experiencia, index) => (
              <div key={index} className="form-subsection">
                <label className="form-label">
                  Cargo
                  <input
                    type="text"
                    className="form-input"
                    value={experiencia.cargo}
                    onChange={(e) => handleChangeExperience(e, index, "cargo")}
                  />
                </label>
                <label className="form-label">
                  Empresa
                  <input
                    type="text"
                    className="form-input"
                    value={experiencia.empresa}
                    onChange={(e) =>
                      handleChangeExperience(e, index, "empresa")
                    }
                  />
                </label>
                <label className="form-label">
                  Data de Início
                  <input
                    type="text"
                    className="form-input"
                    value={experiencia.dataInicio}
                    onChange={(e) =>
                      handleChangeExperience(e, index, "dataInicio")
                    }
                  />
                </label>
                <label className="form-label">
                  Data de Fim
                  <input
                    type="text"
                    className="form-input"
                    value={experiencia.dataFim}
                    onChange={(e) =>
                      handleChangeExperience(e, index, "dataFim")
                    }
                  />
                </label>
                <button
                  type="button"
                  className="form-button"
                  onClick={() => handleRemoveExperience(index)}
                >
                  Remover
                </button>
              </div>
            ))}
          <button
            type="button"
            className="form-button"
            onClick={openExperienceModal}
          >
            Adicionar Experiência
          </button>

          <ExperienceModal
            isOpen={isExperienceModalOpen}
            closeModal={closeExperienceModal}
            onSave={handleAddExperience}
          />

          <h2 className="form-section-title">Formações</h2>
          {updatedData.formacoes &&
            updatedData.formacoes.map((formacao, index) => (
              <div key={index} className="form-subsection">
                <label className="form-label">
                  Curso
                  <input
                    type="text"
                    className="form-input"
                    value={formacao.curso}
                    onChange={(e) => handleChangeEducation(e, index, "curso")}
                  />
                </label>
                <label className="form-label">
                  Instituição
                  <input
                    type="text"
                    className="form-input"
                    value={formacao.instituicao}
                    onChange={(e) =>
                      handleChangeEducation(e, index, "instituicao")
                    }
                  />
                </label>
                <label className="form-label">
                  Data de Conclusão
                  <input
                    type="text"
                    className="form-input"
                    value={formacao.dataConclusao}
                    onChange={(e) =>
                      handleChangeEducation(e, index, "dataConclusao")
                    }
                  />
                </label>
                <button
                  type="button"
                  className="form-button"
                  onClick={() => handleRemoveEducation(index)}
                >
                  Remover Formação
                </button>
              </div>
            ))}
          <button
            type="button"
            className="form-button"
            onClick={handleAddEducation}
          >
            Adicionar Formação
          </button>

          <h2 className="form-section-title">Idiomas</h2>
          {updatedData.idiomas &&
            updatedData.idiomas.map((idioma, index) => (
              <div key={index} className="form-subsection">
                <label className="form-label">
                  Idioma
                  <input
                    type="text"
                    className="form-input"
                    value={idioma.idioma}
                    onChange={(e) => handleChangeLanguage(e, index, "idioma")}
                  />
                </label>
                <label className="form-label">
                  Nível
                  <input
                    type="text"
                    className="form-input"
                    value={idioma.nivel}
                    onChange={(e) => handleChangeLanguage(e, index, "nivel")}
                  />
                </label>
                <button
                  type="button"
                  className="form-button"
                  onClick={() => handleRemoveLanguage(index)}
                >
                  Remover Idioma
                </button>
              </div>
            ))}
          <button
            type="button"
            className="form-button"
            onClick={handleAddLanguage}
          >
            Adicionar Idioma
          </button>

          <h2 className="form-section-title">Habilidades</h2>
          {updatedData.habilidades &&
            updatedData.habilidades.map((habilidade, index) => (
              <div key={index} className="form-subsection">
                <label className="form-label">
                  Habilidade
                  <input
                    type="text"
                    className="form-input"
                    value={habilidade}
                    onChange={(e) => handleChangeSkill(e, index)}
                  />
                </label>
                <button
                  type="button"
                  className="form-button"
                  onClick={() => handleRemoveSkill(index)}
                >
                  Remover Habilidade
                </button>
              </div>
            ))}
          <button
            type="button"
            className="form-button"
            onClick={handleAddSkill}
          >
            Adicionar Habilidade
          </button>

          <h2 className="form-section-title">
            Deficiências
            <button
              type="button"
              className="form-button-right"
              onClick={handleAddDisability}
            >
              <IoAddCircleOutline />
            </button>
          </h2>

          {updatedData.deficiencias &&
            updatedData.deficiencias.map((deficiencia, index) => (
              <div key={index} className="form-subsection">
                <label className="form-label">
                  Deficiência:
                  <input
                    type="text"
                    className="form-input"
                    value={deficiencia}
                    onChange={(e) => handleChangeDisability(e, index)}
                  />
                </label>
                <button
                  type="button"
                  className="form-button"
                  onClick={() => handleRemoveDisability(index)}
                >
                  Remover Deficiência
                </button>
              </div>
            ))}
        </div>
      </form>

      <div className="form-buttons">
        <button type="submit" className="form-button" onClick={onSave}>
          Salvar
        </button>
        <button type="button" className="form-button-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </>
  );
};

export default EditProfileForm;
