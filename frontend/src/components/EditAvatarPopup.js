import React from "react";
import PopupWithForm from '../components/PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const userAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(userAvatar.current.value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title='Обновить аватар'
      name='avatar-edit'
      buttonText={isLoading ? 'Сохранение...':'Сохранить'}
      onSubmit={handleSubmit} >
      <div className="form__input-container">
        <input
          type="url"
          id="avatar-input"
          ref={userAvatar}
          placeholder="Ссылка на картинку"
          className="form__input form__input_value_name"
          minLength="2"
          maxLength="200"
          required />
        <span className="form__input-error name-input-error"></span>
      </div>
    </PopupWithForm>
  )
}
