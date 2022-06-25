function InfoTooltip({onClose, isOpen, alert}) {
  return (
    <div className={`popup popup_type_infotool${isOpen && "popup_is-opened"}`}>
      <div className="popup__container">
        <button className="popup__button-close" onClick={onClose}></button>
        <div className="popup__content">
          <h2 className="popup__title">{alert}</h2>          
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
