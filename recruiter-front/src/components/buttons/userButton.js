import React, { useState } from "react";
import {
  FaUser,
  FaAngleDown,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import "./userButton.css";

const UserButton = ({ username, onProfileClick, onLogoutClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="user-button" onClick={handleDropdownToggle}>
      <span>{username}</span>
      <FaAngleDown color="#fff" />
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <span onClick={onProfileClick}>
            <FaUserCircle />
            <span>Perfil</span>
          </span>
          <span onClick={onLogoutClick}>
            <FaSignOutAlt />
            <span>Sair</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default UserButton;
