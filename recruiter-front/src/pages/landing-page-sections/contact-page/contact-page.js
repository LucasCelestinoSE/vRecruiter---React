import React, { useState, useRef } from "react";
import Lottie from "lottie-web";
import { addFormDataToFirestore } from "../../../services/firestore-DB";

import logo from "../../../assets/images/logo-bgr.png";
import "./contact-page.css";

function ContactPage() {
  const [selectedServices, setselectedServices] = useState([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      nome: event.target.nome.value,
      email: event.target.email.value,
      telefone: event.target.telefone.value,
      empresa: event.target.empresa.value,
      cargo: event.target.cargo.value,
      funcionarios: event.target.funcionarios.value,
      servicos: selectedServices,
    };

    try {
      // Adiciona os dados ao Firestore
      const docId = await addFormDataToFirestore(formData);

      // Lógica adicional, se necessário

      // Redireciona ou executa outras ações após o sucesso
    } catch (error) {
      // Lida com erros, se necessário
    }
  };

  const handleProductChange = (event) => {
    const value = event.target.value;

    if (selectedServices.includes(value)) {
      setselectedServices(
        selectedServices.filter((product) => product !== value)
      );
      setSelectedCount(selectedCount - 1);
    } else if (selectedCount < 3) {
      setselectedServices([...selectedServices, value]);
      setSelectedCount(selectedCount + 1);
    }
  };

  const container = useRef(null);

  React.useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../../assets/anim/contact-us-anim.json"),
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-left-section">
        <img src={logo} alt="Recruiter logo" />
        <h1>Agende uma demonstração gratuita da RECRUITER</h1>
        <p>
          Veja como nossas ferramentas de recrutamento, admissão e avaliação de
          desempenho vão te dar o poder para impulsionar os resultados do seu
          RH.
        </p>
        <h2>Nessa conversa, vamos:</h2>
        <ul>
          <li>
            Identificar e priorizar as necessidades desde a seleção, admissão ao
            desenvolvimento de talentos da sua empresa, entendendo como a
            RECRUITER pode te ajudar.
          </li>
          <li>
            Mostrar na prática como nossos produtos de Recrutamento & Seleção,
            Admissão e treinamento e Avaliação de desempenho funcionam.
          </li>
          <li>Tirar todas as dúvidas sobre nossas soluções.</li>
          <li>
            Discutir planos e preços de acordo com as suas necessidades e da sua
            empresa.
          </li>
        </ul>
        <div className="contact-animation" ref={container}></div>
      </div>
      <div className="contact-right-section">
        <form onSubmit={handleFormSubmit}>
          <p>
            Por favor, preencha o formulário e entraremos em contato dentro de
            um dia útil.
          </p>
          <div className="form-group">
            <label htmlFor="nome">Nome*</label>
            <input type="text" id="nome" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone*</label>
            <input type="tel" id="telefone" required />
          </div>
          <div className="form-group">
            <label htmlFor="empresa">Empresa*</label>
            <input type="text" id="empresa" required />
          </div>
          <div className="form-group">
            <label htmlFor="cargo">Qual seu cargo atual?*</label>
            <input type="text" id="cargo" required />
          </div>
          <div className="form-group">
            <label htmlFor="funcionarios">
              Quantos funcionários sua empresa possui?*
            </label>
            <input type="number" id="funcionarios" required />
          </div>

          <div className="checkbox-group">
            <p>Quais produtos você deseja conhecer?* (Máx: 3)</p>
            <label>
              <input
                type="checkbox"
                name="produtos"
                value="Recrutamento"
                onChange={handleProductChange}
                disabled={
                  selectedCount >= 3 &&
                  !selectedServices.includes("Recrutamento")
                }
              />
              Recrutamento
            </label>
            <label>
              <input
                type="checkbox"
                name="produtos"
                value="Admissão"
                onChange={handleProductChange}
                disabled={
                  selectedCount >= 3 && !selectedServices.includes("Admissão")
                }
              />
              Admissão
            </label>
            <label>
              <input
                type="checkbox"
                name="produtos"
                value="Educação corporativa"
                onChange={handleProductChange}
                disabled={
                  selectedCount >= 3 &&
                  !selectedServices.includes("Educação corporativa")
                }
              />
              Educação corporativa
            </label>
            <label>
              <input
                type="checkbox"
                name="produtos"
                value="Clima e Engajamento (Pulses by group)"
                onChange={handleProductChange}
                disabled={
                  selectedCount >= 3 &&
                  !selectedServices.includes(
                    "Clima e Engajamento (Pulses by group)"
                  )
                }
              />
              Clima e Engajamento (Pulses by group)
            </label>
          </div>
          <button type="submit">ENVIAR</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
