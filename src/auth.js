export const BASE_URL = `https://auth.nomoreparties.co`;

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  /*   .then((response) => {
    return response.json();
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));   */
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Заполните все поля");
      } else if (response.status === 401) {
        throw new Error("Данный email не зарегистрирован");
      } else return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data.token;
      }
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data);
};
