import React from 'react';
import PopupWithForm from '../components/PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser,isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [user, setUser] = React.useState({
    userName: '',
    userDescription: ''
  })

  function handleInputChange(e) {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    onUpdateUser({
      ...currentUser,
      name: user.userName,
      about: user.userDescription,
    });
  }

  React.useEffect(() => {
    setUser({
      userName: currentUser.name,
      userDescription: currentUser.about
    })
  }, [currentUser, isOpen])

  return (<PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    title='Редактировать профиль'
    name='profile-edit'
    buttonText={isLoading ? 'Сохранение...':'Сохранить'}
    onSubmit={handleSubmit}>
    <div className="form__input-container">
      <input type="text" name="userName" onChange={handleInputChange} id="name-input" value={user.userName} placeholder="Полное имя" className="form__input form__input_value_name" minLength="2" maxLength="40" required />
      <span className="form__input-error name-input-error"></span>
      <input type="text" name="userDescription" value={user.userDescription} onChange={handleInputChange} id="employment-input" placeholder="Род деятельности" className="form__input form__input_value_name" minLength="2" maxLength="200" required />
      <span className="form__input-error name-input-error"></span>
    </div>
  </PopupWithForm>)
}
