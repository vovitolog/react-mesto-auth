import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText,
  handleSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_is-opened"}`}>
      <div className="popup__container">
        <button className="popup__button-close" onClick={onClose}></button>
        <div className="popup__content">
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" name={name} onSubmit={handleSubmit}>
            {children}
            <button type="submit" className="popup__button-save">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
