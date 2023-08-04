import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmPopup({ isOpen, onClose, onConfirm, isLoading}) {

  function handleDeleteSubmit(e) {
    e.preventDefault(e);
    onConfirm();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title='Вы уверены?'
      name='confirm-action'
      buttonText={isLoading ? 'Сохранение...':'Да'}
      onSubmit={(e) => handleDeleteSubmit(e)}
    />
  )
}
