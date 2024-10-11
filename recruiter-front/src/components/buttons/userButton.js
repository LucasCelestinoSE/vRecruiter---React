import React, { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./userButton.css";

const UserButton = ({ username, onLogoutClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const uidRef = useRef("");

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoutClick = () => {
    onLogoutClick();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      uidRef.current = user ? user.uid : null;
      setIsLoggedIn(!!user);
    };
    fetchUserData();
  }, []);

  return (
    <div className="user-button">
      {!isLoggedIn ? (
        <Link className="login-link" to="/">
          <FaUserCircle />
          <h1>LOGIN</h1>
        </Link>
      ) : (
        <div onClick={handleDropdownToggle}>
          <span>MENU</span>
          <FaAngleDown color="#fff" />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-menu-item">
                <span
                  onClick={() =>
                    (window.location.href = `/profile/${uidRef.current}`)
                  }
                >
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
      )}
    </div>
  );
};

export default UserButton;
