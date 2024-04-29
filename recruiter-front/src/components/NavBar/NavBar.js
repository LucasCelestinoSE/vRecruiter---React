import React, { useState, useEffect } from "react";
import "./NavBar.css";

function Navbar() {
  const [navbarBackground, setNavbarBackground] = useState(false);

  // Adicione um ouvinte de evento para verificar a posição de rolagem
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Define a posição de rolagem em que o plano de fundo aparecerá
        setNavbarBackground(true);
      } else {
        setNavbarBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Remova o ouvinte de evento quando o componente for desmontado
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={navbarBackground ? "navbar with-background" : "navbar"}>
      <div className="container">
        <div className="logo">Seu Logotipo</div>
        <ul className="nav-links">
          <li>
            <a href="#section1">Seção 1</a>
          </li>
          <li>
            <a href="#section2">Seção 2</a>
          </li>
          <li>
            <a href="#section3">Seção 3</a>
          </li>
          {/* Adicione mais itens de navegação conforme necessário */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
