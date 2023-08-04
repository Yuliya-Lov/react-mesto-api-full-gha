import React from "react";
import success_icon from "../images/success_icon.png";
import failed_icon from "../images/failed_icon.png";

const InfoTooltip = (props) => {
 const [message, setMessage] = React.useState({'value': ''})

 React.useEffect(() => {
    (props.isLoggedIn || props.isSucces) ? setMessage({'value': 'Вы успешно зарегистрировались!'}) : setMessage({'value': 'Что-то пошло не так! Попробуйте еще раз.'})

 }, [props.isLoggedIn, props.isSucces])

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img className="popup__status-icon" src={(props.isLoggedIn || props.isSucces) ? success_icon : failed_icon} alt="Иконка статуса авторизации"></img>
        <h2 className="popup__info-message">{message['value']}</h2>
        <button
        type="button"
        onClick={props.onClose}
        className="popup__button-close"
        aria-label="Закрыть форму." />
      </div>
    </div>
  )
};

export default InfoTooltip;
