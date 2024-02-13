import React, { useState } from "react";
import "./edit-profile-form.css";
const EditProfileForm = ({ userData, onSave, onCancel, onFileChange }) => {
  const [updatedData, setUpdatedData] = useState(userData);

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
    <form onSubmit={handleSubmit}>
      <label>
        Foto do perfil:
        <input type="file" accept="image/*" onChange={onFileChange} />
      </label>
      <label>
        Nome:
        <input
          type="text"
          name="nome"
          value={updatedData.nome}
          onChange={handleChange}
        />
      </label>
      <label>
        Idade:
        <input
          type="number"
          name="idade"
          value={updatedData.idade}
          onChange={handleChange}
        />
      </label>
      <label>
        Gênero:
        <input
          type="text"
          name="genero"
          value={updatedData.genero}
          onChange={handleChange}
        />
      </label>
      <label>
        CEP:
        <input
          type="text"
          name="cep"
          value={updatedData.cep}
          onChange={handleChange}
        />
      </label>
      <label>
        Cidade:
        <input
          type="text"
          name="cidade"
          value={updatedData.cidade}
          onChange={handleChange}
        />
      </label>
      <label>
        Estado:
        <input
          type="text"
          name="estado"
          value={updatedData.estado}
          onChange={handleChange}
        />
      </label>

      <h2>Experiências Profissionais</h2>
      {updatedData.experienciasProfissionais.map((experiencia, index) => (
        <div key={index}>
          <label>
            Cargo:
            <input
              type="text"
              value={experiencia.cargo}
              onChange={(e) => handleChangeExperience(e, index, "cargo")}
            />
          </label>
          <label>
            Empresa:
            <input
              type="text"
              value={experiencia.empresa}
              onChange={(e) => handleChangeExperience(e, index, "empresa")}
            />
          </label>
          <label>
            Data de Início:
            <input
              type="text"
              value={experiencia.dataInicio}
              onChange={(e) => handleChangeExperience(e, index, "dataInicio")}
            />
          </label>
          <label>
            Data de Fim:
            <input
              type="text"
              value={experiencia.dataFim}
              onChange={(e) => handleChangeExperience(e, index, "dataFim")}
            />
          </label>
          <button type="button" onClick={() => handleRemoveExperience(index)}>
            Remover Experiência
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddExperience}>
        Adicionar Experiência
      </button>

      <h2>Formações</h2>
      {updatedData.formacoes.map((formacao, index) => (
        <div key={index}>
          <label>
            Curso:
            <input
              type="text"
              value={formacao.curso}
              onChange={(e) => handleChangeEducation(e, index, "curso")}
            />
          </label>
          <label>
            Instituição:
            <input
              type="text"
              value={formacao.instituicao}
              onChange={(e) => handleChangeEducation(e, index, "instituicao")}
            />
          </label>
          <label>
            Data de Conclusão:
            <input
              type="text"
              value={formacao.dataConclusao}
              onChange={(e) => handleChangeEducation(e, index, "dataConclusao")}
            />
          </label>
          <button type="button" onClick={() => handleRemoveEducation(index)}>
            Remover Formação
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddEducation}>
        Adicionar Formação
      </button>

      <h2>Idiomas</h2>
      {updatedData.idiomas.map((idioma, index) => (
        <div key={index}>
          <label>
            Idioma:
            <input
              type="text"
              value={idioma.idioma}
              onChange={(e) => handleChangeLanguage(e, index, "idioma")}
            />
          </label>
          <label>
            Nível:
            <input
              type="text"
              value={idioma.nivel}
              onChange={(e) => handleChangeLanguage(e, index, "nivel")}
            />
          </label>
          <button type="button" onClick={() => handleRemoveLanguage(index)}>
            Remover Idioma
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddLanguage}>
        Adicionar Idioma
      </button>

      <h2>Habilidades</h2>
      {updatedData.habilidades.map((habilidade, index) => (
        <div key={index}>
          <label>
            Habilidade:
            <input
              type="text"
              value={habilidade}
              onChange={(e) => handleChangeSkill(e, index)}
            />
          </label>
          <button type="button" onClick={() => handleRemoveSkill(index)}>
            Remover Habilidade
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddSkill}>
        Adicionar Habilidade
      </button>

      <h2>Deficiências</h2>
      {updatedData.deficiencias.map((deficiencia, index) => (
        <div key={index}>
          <label>
            Deficiência:
            <input
              type="text"
              value={deficiencia}
              onChange={(e) => handleChangeDisability(e, index)}
            />
          </label>
          <button type="button" onClick={() => handleRemoveDisability(index)}>
            Remover Deficiência
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddDisability}>
        Adicionar Deficiência
      </button>

      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default EditProfileForm;
