import React, { useState, useEffect } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import ExperiencePopup from "../../components/pop-up/exp-popup/exp-popup";

import EducationPopup from "../../components/pop-up/edu-popup/edu-popup";
import LanguagePopup from "../../components/pop-up/lang-popup/lang-poopup";
import DisabilityPopup from "../../components/pop-up/disab-poopup/diab-popup";
import CoursePopup from "../../components/pop-up/course-popup/course-popup";

import {
  saveUserProfile,
  getUserProfile,
  saveProfileImageToStorage,
  fetchProfileImageFromStorage,
} from "../../services/firestore-DB";

import "./user-profile.css";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showExperiencePopup, setShowExperiencePopup] = useState(false);
  const [showEduPopup, setShowEduPopup] = useState(false);
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [showDisabPopup, setShowDisabPopup] = useState(false);
  const [showCoursePopup, setShowCoursePopup] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const { uid } = useParams();

  const [userProfile, setUserProfile] = useState({});

  const [editedProfile, setEditedProfile] = useState({
    ...userProfile,
  });

  const saveProfile = async (uid, userProfile, selectedImage) => {
    try {
      await saveUserProfile(uid, userProfile, selectedImage);
    } catch (error) {
      console.error("Erro ao salvar o perfil:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);

        const userProfileData = await getUserProfile(uid);
        console.log(userProfileData);

        if (userProfileData) {
          setUserProfile(userProfileData);
          setEditedProfile(userProfileData);
          setUserImage(userProfileData.photoURL);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar o perfil:", error.message);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [uid]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserProfile({ ...editedProfile });
    saveProfile(uid, editedProfile, selectedImage);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile({ ...userProfile });
    setSelectedImage(null);
    setUserImage(userProfile.photoURL);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleRemoveItem = (listName, index) => {
    const updatedList = [...editedProfile[listName]];
    updatedList.splice(index, 1);
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [listName]: updatedList,
    }));
  };

  const handleAddExperience = (experienceData) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      experiences: [...(prevProfile?.experiences || []), experienceData], // Handle undefined prevProfile.experiences
    }));
    setShowExperiencePopup(false);
  };

  const handleAddEducation = (educationData) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      education: [...(prevProfile?.education || []), educationData],
    }));
    setShowEduPopup(false);
  };

  const handleAddLanguage = (languageData) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      languages: [...(prevProfile?.languages || []), languageData],
    }));
    setShowEduPopup(false);
  };

  const handleAddCourse = (courseData) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      courses: [...(prevProfile?.courses || []), courseData],
    }));
    setShowCoursePopup(false);
  };

  const handleAddDisability = (disabilityData) => {
    const { disability } = disabilityData;

    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      disabilities: [...(prevProfile?.disabilities || []), disability],
    }));
    setShowEduPopup(false);
  };

  const handleCloseExperiencePopup = () => {
    setShowExperiencePopup(false);
  };

  const handleCloseEduPopup = () => {
    setShowEduPopup(false);
  };

  const handleCloseLangPopup = () => {
    setShowLangPopup(false);
  };

  const handleCloseCoursePopup = () => {
    setShowCoursePopup(false);
  };

  const handleCloseDisabPopup = () => {
    setShowDisabPopup(false);
  };

  const formatPhoneNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, "");

    const isNumeric = /^[0-9]+$/.test(cleanedValue);

    if (isNumeric) {
      const formattedValue = cleanedValue.replace(
        /(\d{2})(\d{5})(\d{4})/,
        "($1) $2-$3"
      );
      return formattedValue;
    } else {
      return value;
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(selectedFile);
      setUserImage(objectUrl);
      setEditedProfile((prevProfile) => ({
        ...prevProfile,
        photoURL: selectedFile,
      }));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        {isEditing ? (
          <>
            <div>
              <div className="select-photo">
                <img
                  src={userImage || editedProfile.photoURL}
                  alt=""
                  className="profile-image"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
            </div>
            <b>Nome</b>
            <input
              className="name-input"
              type="text"
              name="name"
              value={userProfile.name}
              onChange={handleInputChange}
            />
          </>
        ) : (
          <>
            <img
              src={userProfile.photoURL}
              alt="Profile"
              className="profile-image"
            />
            <div className="header-text">
              <h1>{userProfile.name}</h1>
              <button className="edit-btn" onClick={handleEdit}>
                Editar
              </button>
            </div>
          </>
        )}
      </div>

      <div className="profile-info">
        <h2>Informações Pessoais</h2>
        {!isEditing ? (
          <>
            <p>Email: {userProfile.email}</p>
            <p>Telefone: {userProfile.phone}</p>
            <p>Idade: {userProfile.age}</p>
            <p>Gênero: {userProfile.gender}</p>
            <p>CEP: {userProfile.cep}</p>
            <p>Cidade: {userProfile.city}</p>
            <p>Estado: {userProfile.state}</p>
          </>
        ) : (
          <div className="user-info-inputs">
            <div className="user-info-input">
              <input
                type="text"
                name="email"
                value={editedProfile.email}
                onChange={handleInputChange}
                placeholder="Insira o seu email"
              />
            </div>
            <div className="user-info-input">
              <input
                type="text"
                name="phone"
                value={editedProfile.phone}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "phone",
                      value: formatPhoneNumber(e.target.value),
                    },
                  })
                }
                placeholder="Insira o seu número"
              />
            </div>
            <div className="user-info-input">
              <input
                type="text"
                name="age"
                value={editedProfile.age}
                onChange={handleInputChange}
                placeholder="Insira a sua idade"
              />
            </div>
            <div className="user-info-input">
              <input
                type="text"
                name="gender"
                value={editedProfile.gender}
                onChange={handleInputChange}
                placeholder="Gênero"
              />
            </div>
            <div className="user-info-input">
              <input
                type="text"
                name="cep"
                value={editedProfile.cep}
                onChange={handleInputChange}
                placeholder="Insira o CEP"
              />
            </div>
            <div className="user-info-input">
              <input
                type="text"
                name="city"
                value={editedProfile.city}
                onChange={handleInputChange}
                placeholder="Nome da sua cidade"
              />
            </div>
            <div className="user-info-input">
              <input
                type="text"
                name="state"
                value={editedProfile.state}
                onChange={handleInputChange}
                placeholder="Nome do seu estado"
              />
            </div>
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2>
          Experiências Profissionais
          {isEditing && (
            <>
              <span
                className="add-button"
                onClick={() => setShowExperiencePopup(true)}
              >
                <p>Adicionar</p>
                <IoMdAdd color="4caf50" />
              </span>
            </>
          )}
        </h2>
        {showExperiencePopup && (
          <ExperiencePopup
            handleClose={handleCloseExperiencePopup}
            handleAddExperience={handleAddExperience}
          />
        )}
        {editedProfile.experiences &&
          editedProfile.experiences.map((exp, index) => (
            <div className="exp-section" key={index}>
              <b>
                {exp.position}
                {isEditing && (
                  <LuTrash2
                    color="FF0000"
                    onClick={() => handleRemoveItem("experiences", index)}
                    style={{ cursor: "pointer", float: "right" }}
                  />
                )}
              </b>
              <p>{exp.company}</p>
              <p>
                {exp.startDate} - {exp.endDate}
              </p>
            </div>
          ))}
      </div>

      <div className="profile-section">
        <h2>
          Educação
          {isEditing && (
            <span className="add-button" onClick={() => setShowEduPopup(true)}>
              <p>Adicionar</p>
              <IoMdAdd color="4caf50" />
            </span>
          )}
        </h2>
        {showEduPopup && (
          <EducationPopup
            handleClose={handleCloseEduPopup}
            handleAddEducation={handleAddEducation}
          />
        )}
        {editedProfile.education &&
          editedProfile.education.map((edu, index) => (
            <div key={index} className="edu-section">
              <b>
                {edu.degree}
                {isEditing && (
                  <LuTrash2
                    color="FF0000"
                    onClick={() => handleRemoveItem("education", index)}
                    style={{ cursor: "pointer", float: "right" }}
                  />
                )}
              </b>
              <p> {edu.institution}</p>
              <p>
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
      </div>

      <div className="profile-section">
        <h2>
          Cursos Complementares
          {isEditing && (
            <span
              className="add-button"
              onClick={() => setShowCoursePopup(true)}
            >
              <p>Adicionar</p>
              <IoMdAdd color="4caf50" />
            </span>
          )}
        </h2>
        {showCoursePopup && (
          <CoursePopup
            handleClose={handleCloseCoursePopup}
            handleAddCourse={handleAddCourse}
          />
        )}

        {editedProfile.courses &&
          editedProfile.courses.map((course, index) => (
            <div key={index} className="course-section">
              <b>
                {course.courseName}
                {isEditing && (
                  <LuTrash2
                    color="FF0000"
                    onClick={() => handleRemoveItem("courses", index)}
                    style={{ cursor: "pointer", float: "right" }}
                  />
                )}
              </b>
              <p>{course.institution}</p>
              <p>
                {course.startDate} - {course.endDate}
              </p>
            </div>
          ))}
      </div>

      <div className="profile-section">
        <h2>
          Idiomas
          {isEditing && (
            <span className="add-button" onClick={() => setShowLangPopup(true)}>
              <p>Adicionar</p>
              <IoMdAdd color="4caf50" />
            </span>
          )}
        </h2>
        {showLangPopup && (
          <LanguagePopup
            handleClose={handleCloseLangPopup}
            handleAddLanguage={handleAddLanguage}
          />
        )}

        {editedProfile.languages &&
          editedProfile.languages.map((language, index) => (
            <div key={index} className="lang-section">
              <b>
                {language.language}
                {isEditing && (
                  <LuTrash2
                    color="FF0000"
                    onClick={() => handleRemoveItem("languages", index)}
                    style={{ cursor: "pointer", float: "right" }}
                  />
                )}
              </b>
              <p>{language.level}</p>
            </div>
          ))}
      </div>

      <div className="profile-section">
        <h2>
          Deficiências
          {isEditing && (
            <span
              className="add-button"
              onClick={() => setShowDisabPopup(true)}
            >
              <p>Adicionar</p>
              <IoMdAdd color="4caf50" />
            </span>
          )}
        </h2>
        {showDisabPopup && (
          <DisabilityPopup
            handleClose={handleCloseDisabPopup}
            handleAddDisability={handleAddDisability}
          />
        )}
        <ul>
          {editedProfile.disabilities &&
            editedProfile.disabilities.map((disability, index) => (
              <li key={index} className="disab-section">
                {disability}
                {isEditing && (
                  <LuTrash2
                    color="FF0000"
                    onClick={() => handleRemoveItem("disabilities", index)}
                    style={{ cursor: "pointer", float: "right" }}
                  />
                )}
              </li>
            ))}
        </ul>
        {isEditing && (
          <div className="edit-buttons">
            <button onClick={handleSave}>Salvar</button>
            <button className="cancel-btn" onClick={handleCancelEdit}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
