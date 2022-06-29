import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./Infotooltip";
import * as auth from "../auth.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedin] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      console.log("loggedIn");
      history.push("/");
    } /* else {
      localStorage.removeItem("jwt");
      history.push("/sign-in"); // Убрать
    } */
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    //console.log(jwt)
    if (jwt) {
      console.log(jwt);
      auth
        .getContent(jwt)
        .then((response) => {
          if (response) {
            console.log(response.data.email);
            setLoggedin(true);
            setUserEmail(response.data.email);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleUpdateUser({ name, profession }) {
    api
      .setNewUserInfo({ name, profession })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setNewProfilePhoto(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleLogin({ email, password }) {
    auth
      .authorize(email, password)
      .then((data) => {
        /* console.log(data);
        if (!data) {
          throw new Error("Произошла ошибка");
        } */
        console.log(data);
        console.log("вошел!!!!!!!!!!!!!!");
        setLoggedin(true);
        history.push("/");

        console.log(loggedIn);
        /* 
        const jwt  = data;
        console.log(jwt)
        if (jwt) {
          const { email } = data;
          localStorage.setItem("jwt", jwt);
          setUserEmail({
            email,          
          });         
        } */
      })
      .catch((error) => console.log(error));
  }

  function handleRegister({ email, password }) {
    auth
      .register(email, password)
      .then((response) => {
        if (response.status === 400) {
          console.log("Что-то пошло не так!");
        } else {
          console.log("Всё хорошо!");
          history.push("/sign-in");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        handleInfoTooltipPopupOpen();
      });
  }

  /*   function tockenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((response) => {
          if (response) {
            console.log(response.data.email);
            setUserEmail(response.data.email);
            setLoggedin(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }
 */
  function handleLogout() {
    localStorage.removeItem("jwt");
    setUserEmail("");
    setLoggedin(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <div className="page">
          <Header
            onClick={handleLogout}
            headerButtonText={"Выйти"}
            userEmail={userEmail}
            loggedIn={loggedIn}
          />
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <ProtectedRoute
              path="/"
              component={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
