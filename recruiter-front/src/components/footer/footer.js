import React from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/images/logo-bgr.png";
import "./footer.css";

const Footer = () => {
  const constraints = window.innerWidth;

  const createIconButton = ({ icon, onTap }) => (
    <span
      role="button"
      tabIndex={0}
      onClick={() => onTap()}
      onKeyDown={() => onTap()}
      className="icon-button"
    >
      {icon}
    </span>
  );

  return (
    <div className="footer-container">
      <div className="white-space"></div>
      <div
        className="social-media-section"
        style={{ flex: constraints > 600 ? 5 : 5 }}
      >
        <div className="contact-text">
          ENTRE EM CONTATO POR MEIO DAS NOSSAS REDES SOCIAIS
        </div>
        <div className="social-media-icons">
          {createIconButton({
            icon: (
              <FaInstagram size={constraints > 800 ? 32 : 26} color="white" />
            ),
            onTap: () => {},
          })}
          {createIconButton({
            icon: (
              <FaLinkedin size={constraints > 800 ? 32 : 26} color="white" />
            ),
            onTap: () => {},
          })}
          {createIconButton({
            icon: (
              <FaWhatsapp size={constraints > 800 ? 32 : 26} color="white" />
            ),
            onTap: () => {},
          })}
          {createIconButton({
            icon: (
              <FaXTwitter size={constraints > 800 ? 32 : 26} color="white" />
            ),
            onTap: () => {},
          })}
        </div>
      </div>
      <div className="logo-section" style={{ flex: 1, textAlign: "center" }}>
        <img src={logo} alt="Logo" className="logo-img" />
      </div>
    </div>
  );
};

export default Footer;
