import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

import "./about-us.css";

const AboutUs = () => {
  const [isExpanded1, setExpanded1] = useState(false);
  const [isExpanded2, setExpanded2] = useState(false);

  const handleToggle1 = () => {
    setExpanded1(!isExpanded1);
  };

  const handleToggle2 = () => {
    setExpanded2(!isExpanded2);
  };

  return (
    <div className="about-section">
      <div className="about-us-title">
        <h1>SOBRE NÓS</h1>
      </div>
      <div className="expansion-itens">
        <div
          className={`about-item ${isExpanded1 ? "expanded" : ""}`}
          onClick={handleToggle1}
        >
          <h3>
            QUEM SOMOS <FaAngleDown />
          </h3>
          {isExpanded1 && (
            <div className="expand-content">
              <p>
                Somos uma empresa de recursos humanos comprometida em conectar
                talentos excepcionais a oportunidades de carreira gratificantes.
                Combinando expertise em recrutamento com uma abordagem
                personalizada, nossa equipe dedicada trabalha incansavelmente
                para atender às necessidades únicas de candidatos e empresas.
              </p>
            </div>
          )}
        </div>
        <hr className={`line ${isExpanded1 ? "expanded" : ""}`} />

        <div
          className={`about-item ${isExpanded2 ? "expanded" : ""}`}
          onClick={handleToggle2}
        >
          <h3>
            NOSSOS OBJETIVOS <FaAngleDown />
          </h3>
          {isExpanded2 && (
            <div className="expand-content">
              <p>
                Na Recruiter, temos objetivos claros e ambiciosos que norteiam
                nossas atividades diárias. Acreditamos que, ao alcançar esses
                objetivos, poderemos fazer uma diferença significativa no
                mercado de trabalho e proporcionar resultados excepcionais para
                nossos clientes e candidatos.
              </p>
            </div>
          )}
        </div>
        <hr className={`line ${isExpanded2 ? "expanded" : ""}`} />
      </div>
    </div>
  );
};

export default AboutUs;
