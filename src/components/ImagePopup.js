import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image-view  ${card.link && "popup_is-opened"}`}
    >
      <div className="popup__wrapper">
        <button className="popup__button-close" onClick={onClose}></button>
        <img className="popup__image" alt={card.name} src={card.link} />
        <p className="popup__description">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
