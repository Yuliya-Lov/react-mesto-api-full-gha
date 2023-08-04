import React from 'react';

const AuthForm = (props) => {
  return (
    <form className="form" onSubmit={props.handleSubmit}>
    <div className="form__input-container">
      <input type="email" name="email" onChange={props.handleChange} placeholder="Email" value={props.values[0]} className="form__input form__input_theme_dark" minLength="2" maxLength="40" required />
      <span className="form__input-error"></span>
      <input type="password" name="password" onChange={props.handleChange} placeholder="Пароль" value={props.values[1]} className="form__input form__input_theme_dark" minLength="2" maxLength="40" required />
      <span className="form__input-error"></span>
    </div>
    <button className="form__submit-button form__submit-button_theme_dark">{props.buttonText}</button>
  </form>
  )
}

export default AuthForm;
