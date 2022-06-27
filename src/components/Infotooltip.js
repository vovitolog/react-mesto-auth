import registrationSuccess from "../images/reg_success.svg"
import registrationFail from "../images/reg_fail.svg"

function InfoTooltip({ onClose, isOpen, alert }) {
  return (
    <div
      className={`popup popup_type_infotooltip ${isOpen && "popup_is-opened"}`}
    >
      <div className="popup__container">
        <button className="popup__button-close" onClick={onClose}></button>
        <div className="popup__content">
          <img className="popup__status-icon"
          src={registrationSuccess} />
          <h2 className="popup__title">{alert}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
