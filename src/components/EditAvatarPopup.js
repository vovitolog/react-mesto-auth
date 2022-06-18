import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const profilePhoto = React.useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: profilePhoto.current.value,
    });
  }

  return (
    <PopupWithForm
      name="photo-edit"
      title="Обновить аватар"
      children=""
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      handleSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_type_photo"
        name="photo-url"
        id="photo-url-input"
        placeholder="Ссылка на фото"
        ref={profilePhoto}
        required
      />
      <span className="popup__input-error" id="photo-url-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
