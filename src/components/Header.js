import React from "react";
import logo from "../images/logo.svg";

function Header({ onClick, headerButtonText }) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" alt="Место" src={logo} />
        <div className="header__auth-wrapper">
          <p className="header__email-text">ttttttttttttttttt</p>
          <button className="header__button" onClick={onClick}>
            {headerButtonText}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
