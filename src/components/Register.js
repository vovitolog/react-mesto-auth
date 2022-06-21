import React, { useState } from "react";

function Register({ onRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      return;
    }

    console.log({ email, password });
    onRegister({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <h1 className="login__title">Регистрация</h1>
      <input
        minLength="2"
        maxLength="200"
        type="email"
        className="login__input"
        name="email"
        id="email-input"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />

      <input
        minLength="2"
        maxLength="200"
        type="password"
        className="login__input"
        name="password"
        id="password-input"
        placeholder="Пароль"
        value={data.password}
        onChange={handleChange}
      />
      <button className="login__button" type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
}

export default Register;
