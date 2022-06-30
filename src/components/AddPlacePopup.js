import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      handleSubmit={handleSubmit}
    >
      <input
        minLength="2"
        maxLength="30"
        type="text"
        className="popup__input popup__input_type_place"
        name="place-name"
        id="place-name-input"
        placeholder="Название"
        onChange={(event) => setName(event.target.value)}
        value={name || ""}
        required
      />
      <span className="popup__input-error" id="place-name-input-error"></span>
      <input
        type="url"
        className="popup__input popup__input_type_url"
        name="image-url"
        id="image-url-input"
        placeholder="Ссылка на картинку"
        onChange={(event) => setLink(event.target.value)}
        value={link || ""}
        required
      />
      <span className="popup__input-error" id="image-url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
