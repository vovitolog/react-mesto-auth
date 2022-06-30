import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [profession, setProfession] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setProfession(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateUser({
      name,
      profession,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"      
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      handleSubmit={handleSubmit}
    >
      <input
        minLength="2"
        maxLength="40"
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        id="name-input"
        placeholder="Имя"
        onChange={(event) => setName(event.target.value)}
        value={name || ""}
        required
      />
      <span className="popup__input-error" id="name-input-error"></span>
      <input
        minLength="2"
        maxLength="200"
        type="text"
        className="popup__input popup__input_type_profession"
        name="profession"
        id="profession-input"
        placeholder="Профессия"
        onChange={(event) => setProfession(event.target.value)}
        value={profession || ""}
        required
      />
      <span className="popup__input-error" id="profession-input-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
