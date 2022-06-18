import React from "react";

function Login() {
  return (
    <form className="login">
      <h1 className="login__title">Вход</h1>
      <input
        minLength="2"
        maxLength="200"
        type="email"
        className="login__input"
        name="email"
        id="email-input"
        placeholder="Email"
        /* onChange={(event) => setProfession(event.target.value)}
        value={} */
        required
      />

      <input
        minLength="2"
        maxLength="200"
        type="password"
        className="login__input"
        name="password"
        id="password-input"
        placeholder="Пароль"
        /* onChange={(event) => setProfession(event.target.value)}
        value={} */
        required
      />
      <button className="login__button" type="submit">
        Войти
      </button>
    </form>
  );
}

export default Login;
