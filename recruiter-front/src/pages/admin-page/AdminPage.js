import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import {
  getCompanies,
  editCompany,
  saveCompanyImageToStorage,
  deleteCompany,
} from "../../services/firestore-DB";
import "./admin-page.css";

const CompanyItem = ({ company, onEdit, onDelete }) => {
  return (
    <div className="company-item">
      <img src={company.imageUrl} alt={company.name} />
      <div>
        <h3>{company.name}</h3>
        <div className="button-container">
          <Button variant="contained" onClick={() => onEdit(company)}>
            Editar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onDelete(company.id)}
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [previewBanner, setPreviewBanner] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    bannerImageFile: null,
    profileImageFile: null,
    description: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const fetchedCompanies = await getCompanies();
        setCompanies(fetchedCompanies);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error.message);
      }
    };

    fetchCompanies();
  }, []);

  const handleOpenDialog = (company) => {
    setSelectedCompany(company);
    setFormData({
      name: company.name,
      bannerImageFile: null,
      profileImageFile: null,
      description: company.description,
    });
    setPreviewBanner(company.bannerImage); // Definir a imagem existente como preview
    setPreviewProfile(company.imageUrl); // Definir a imagem existente como preview
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: "",
      description: "",
      bannerImageFile: null,
      profileImageFile: null,
    });
    setPreviewBanner(null);
    setPreviewProfile(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const fileUrl = URL.createObjectURL(files[0]);
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      if (name === "bannerImageFile") {
        setPreviewBanner(fileUrl);
      } else if (name === "profileImageFile") {
        setPreviewProfile(fileUrl);
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedCompany) return;

    try {
      let bannerImage = selectedCompany.bannerImage;
      let imageUrl = selectedCompany.imageUrl;

      if (formData.bannerImageFile) {
        bannerImage = await saveCompanyImageToStorage(
          selectedCompany.id,
          formData.bannerImageFile,
          "banner"
        );
      }

      if (formData.profileImageFile) {
        imageUrl = await saveCompanyImageToStorage(
          selectedCompany.id,
          formData.profileImageFile,
          "profile"
        );
      }

      const updatedData = {
        name: formData.name,
        description: formData.description,
        bannerImage,
        imageUrl,
      };

      await editCompany(selectedCompany.id, updatedData);
      setCompanies(
        companies.map((company) =>
          company.id === selectedCompany.id
            ? { ...company, ...updatedData }
            : company
        )
      );
      handleCloseDialog();
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error.message);
    }
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      await deleteCompany(companyId);
      setCompanies(companies.filter((company) => company.id !== companyId));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Erro ao excluir a empresa:", error.message);
    }
  };

  const handleOpenDeleteDialog = (companyId) => {
    setSelectedCompany(companyId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedCompany(null);
  };

  return (
    <div className="admin-page">
      <h1>Página de Administração - Empresas</h1>

      <div className="companies-container">
        {companies.map((company) => (
          <CompanyItem
            key={company.id}
            company={company}
            onEdit={handleOpenDialog}
            onDelete={handleOpenDeleteDialog}
          />
        ))}
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            width: "650px",
            overflowY: "hidden",
          },
        }}
      >
        <DialogTitle>Editar Empresa</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "200px",
              border: "2px dashed #ccc",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("banner-upload").click()}
          >
            {previewBanner ? (
              <div className="image-container-banner">
                <img
                  src={previewBanner}
                  alt="Preview Banner"
                  className="image-preview"
                />
                <div className="overlay">Selecionar Banner</div>
              </div>
            ) : (
              <span>Selecionar Banner</span>
            )}
            <input
              type="file"
              name="bannerImageFile"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="banner-upload"
            />
          </div>
          <div
            style={{}}
            onClick={() => document.getElementById("profile-upload").click()}
          >
            {previewProfile ? (
              <div className="image-container-profile">
                <img
                  src={previewProfile}
                  alt="Preview Profile"
                  className="image-preview"
                />
                <div className="overlay">Selecionar Imagem de Perfil</div>
              </div>
            ) : (
              <span>Selecionar Imagem de Perfil</span>
            )}
            <input
              type="file"
              name="profileImageFile"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="profile-upload"
            />
          </div>

          <TextField
            name="name"
            label="Nome da Empresa"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="description"
            label="Descrição"
            fullWidth
            value={formData.description}
            onChange={handleInputChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>
          <WarningIcon />
          Excluir Empresa
        </DialogTitle>
        <DialogContent>
          <p>Tem certeza que deseja excluir esta empresa?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteCompany(selectedCompany)}
            color="secondary"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminPage;
