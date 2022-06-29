export const BASE_URL = `https://auth.nomoreparties.co`;

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => checkResponse(response))
  .then((response) => {
    return response;
  }) 
  
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
      console.log(data); // Delete
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
    .then((response) => checkResponse(response));
    //.then((data) => data);
};
