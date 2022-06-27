import React from "react";
import logo from '../images/logo.svg';

function Header({onClick, headerButtonText}) {
  return (
    
    <header className="header">
      <div className="header__container">
      <img className="header__logo" alt="Место" src={logo} />
      <button className="header__button" onClick={onClick}>{headerButtonText}</button>
      </div>
    </header>
    
  );
}

export default Header;
