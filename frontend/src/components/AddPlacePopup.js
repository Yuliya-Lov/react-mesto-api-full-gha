import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleInputChange(e) {
    e.target.id === "card-title-input"
      ? setTitle(e.target.value)
      : setLink(e.target.value)
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault(e);
    onAddPlace({
      name: title,
      link: link
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title='Новое место'
      name='add-card'
      buttonText={isLoading ? 'Сохранение...':'Создать'}
      onSubmit={(e) => handleAddPlaceSubmit(e)}>
      <div className="form__input-container">
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          id="card-title-input"
          value={title}
          placeholder="Название"
          className="form__input form__input_value_name"
          minLength="2"
          maxLength="30"
          required />
        <span className="form__input-error name-input-error">{title}</span>
        <input
          onChange={(e) => handleInputChange(e)}
          type="url"
          id="card-url-input"
          value={link}
          placeholder="Ссылка на картинку"
          className="form__input form__input_value_name"
          minLength="0"
          maxLength="200"
          required />
        <span className="form__input-error name-input-error"></span>
      </div>
    </PopupWithForm>
  )
}
