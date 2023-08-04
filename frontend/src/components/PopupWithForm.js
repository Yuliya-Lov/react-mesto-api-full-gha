import React from "react"

const PopupWithForm = ({ isOpen, onClose, children, title, name, buttonText, onSubmit }) => {


  return (
    <div className={`popup popup_type_with_form ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
        type="button"
        onClick={onClose}
        className="popup__button-close"
        aria-label="Закрыть форму." />
        <form
        onSubmit={(e) => onSubmit(e)}
        className={`form form_type_${name}`}
        name={name}>
          {children}
          <button
          type="submit"
          className="form__submit-button">{buttonText}</button>
        </form>
      </div>
    </div>
  )
};

export default PopupWithForm;
