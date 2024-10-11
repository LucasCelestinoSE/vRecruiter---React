import React, { useState } from "react";

const RegisterCompanyForm = () => {
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui você deve enviar os dados para o backend
    console.log("Cadastro da empresa:", companyName);
    // Resetando o campo após o envio
    setCompanyName("");
  };

  return (
    <div>
      <h2>Cadastrar Nova Empresa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome da Empresa"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default RegisterCompanyForm;
