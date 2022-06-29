import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ onClick, headerButtonText, userEmail, loggedIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" alt="Место" src={logo} />
        <div className="header__auth-wrapper">
          {location.pathname === "/sign-in" && (
            <Link to="/sign-up" className="header__button">
              Регистрация
            </Link>
          )}
          {location.pathname === "/sign-up" && (
            <Link to="/sign-in" className="header__button">
              Войти
            </Link>
          )}

          {loggedIn && (
            <>
              <p className="header__email-text">{userEmail}</p>
              <button className="header__button" onClick={onClick}>
                {headerButtonText}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
