import React, { useState } from "react";
import { FaAngleDown, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./userButton.css";

const UserButton = ({ username, onProfileClick, onLogoutClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoutClick = () => {
    onLogoutClick();
  };

  return (
    <div className="user-button" onClick={handleDropdownToggle}>
      <span>{username}</span>
      <FaAngleDown color="#fff" />
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-menu-item">
            <span onClick={onProfileClick}>
              <FaUserCircle />
              <span>Perfil</span>
            </span>
          </div>

          <div className="dropdown-menu-item">
            <span onClick={handleLogoutClick}>
              <FaSignOutAlt />
              <Link to="/">
                <span>Sair</span>
              </Link>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserButton;
