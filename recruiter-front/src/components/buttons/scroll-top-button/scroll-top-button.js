import React from "react";
import { FaArrowUp } from "react-icons/fa";
import "./scroll-top-button.css";

const ScrollTopButton = () => {
  return (
    <button
      className="scroll-top-button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollTopButton;
