import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';

function App() {
  const [currentUser, setCurrentUser] = React.useState(
    {
      name: '',
      about: '',
      avatar: ''
    })
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isConfirmPopupOpen || isImagePopupOpen || isInfoTooltipOpen
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSucces, setIsSucces] = React.useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('')

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          id: userData._id
        })
      })
      .catch(err => console.error('Ошибка при выполнении запроса:', err));
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(cardsData => {
        setCards(cardsData.data);
      })
      .catch(err => console.error('Ошибка при выполнении запроса:', err));
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes ? card.likes.some(i => i === currentUser.id) : false;
    const apiRequest = isLiked
      ? api.removeLike(card._id)
      : api.pushLike(card._id);

    apiRequest
      .then((newCard) => {
        setCards((state) =>
          state.map(item => item._id === card._id ? newCard.data : item)
        )
      })
      .catch(err => console.error('Ошибка при выполнении запроса:', err));
  }

  function deleteConfirmCard() {
    setIsLoading(true);
    api.removeCard(deletedCard._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== deletedCard._id));
        closeAllPopups();
        setDeletedCard(null)
      }
      )
      .catch(err => console.error('Ошибка при выполнении запроса:', err))
      .finally(() => setIsLoading(false))
  }

  function handleCardDelete(card) {
    handleConfirmClick();
    setDeletedCard(card);
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    api.editUserInfo(newUserInfo)
      .then((user) => {
        setCurrentUser({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          id: user._id
        })
        closeAllPopups();
      })
      .catch(err => console.error('Ошибка при выполнении запроса:', err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.editUserPhoto(avatar)
      .then((user) => {
        setCurrentUser({
          ...currentUser,
          avatar: user.avatar
        })
        closeAllPopups();
      })
      .catch(err => console.error('Ошибка при выполнении запроса:', err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateCards(card) {
    setIsLoading(true);
    api.addCard(card)
      .then(card => {
        setCards([card, ...cards])
        closeAllPopups();
      })
      .catch(err => console.error('Ошибка при выполнении запроса:', err))
      .finally(() => setIsLoading(false))
  }

  function handleCardClick(data) {
    setImagePopupOpen(true);
    setSelectedCard({
      ...selectedCard,
      title: data.name,
      image: data.link
    })
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setTimeout(handleChangeIsSucces(false), 1000);
  }

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function handleOverlayClick(evt) {
      if (evt.target.classList.contains('popup'))
        closeAllPopups();
    }

    function cleanForms(evt) {
      setTimeout(() => document.forms[evt.target.name].reset(), 1000);
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      document.addEventListener('click', handleOverlayClick);
      document.addEventListener('submit', cleanForms);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
        document.removeEventListener('click', handleOverlayClick);
        document.removeEventListener('submit', cleanForms);

      }
    }
  }, [isOpen])

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleConfirmClick() {
    setConfirmPopupOpen(true);
  }

  function handleChangeIsLogged(value) {
    setIsLoggedIn(value);
  }

  function signOut() {
    document.cookie = "name=jwt; expires=-1";
    setEmail('');
  }

  function handleChangeIsSucces(value) {
    setIsSucces(value);
  }

  function handletokenCheck() {
    auth.checkToken()
      .then(data => {
        setEmail(data.data.email);
        setCurrentUser({
          name: data.data.name,
          about: data.data.about,
          avatar: data.data.avatar,
          id: data.data._id
        })
        api.getInitialCards()
          .then(cardsData => {
            setCards(cardsData.data);
          })
          .catch(err => console.error('Ошибка при выполнении запроса:', err));
        handleChangeIsLogged(true);
        navigate("/", { replace: true });
      })
      .catch(err => console.error(`"Ошибка запроса: ${err}`))
  }

  React.useEffect(() => {
    handletokenCheck();

  }, [])

  React.useEffect(() => {
    handletokenCheck()
  }, [isLoggedIn])


  function onLogin(em, pass) {
    return auth.login(em, pass)
      .then(data => {
        handleChangeIsLogged(true);
        /*      if(data.token){
               localStorage.setItem('token', data.token);
             } */
        navigate("/", { replace: true });
      })
      .catch((e) => {
        setIsInfoTooltipOpen(true);
        return Promise.reject();
      })
  }

  function onRegister(em, pass) {
    return auth.register(em, pass)
      .then(() => {
        handleChangeIsSucces(true);
        setIsInfoTooltipOpen(true);
        navigate('/signin', { replace: true })
      })
      .catch((e) => {
        handleChangeIsSucces(false);
        setIsInfoTooltipOpen(true);
        return Promise.reject();
      })
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          handleChangeIsLogged={handleChangeIsLogged}
          signOut={signOut} />
        <Routes>
          <Route path='/' element={<ProtectedRoute
            isLoggedIn={isLoggedIn}
            element={Main}
            currentUser={currentUser}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />}
          />
          <Route
            path='/signup'
            element={<Register isLoggedIn={isLoggedIn} onRegister={onRegister} />} />
          <Route
            path='/signin'
            element={<Login isLoggedIn={isLoggedIn} handleChangeIsLogged={handleChangeIsLogged} onLogin={onLogin} />} />
        </Routes>
        {isLoggedIn && <Footer />}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isLoggedIn={isLoggedIn}
          isSucces={isSucces}
          onClose={closeAllPopups}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          {...selectedCard}
          onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading} />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleUpdateCards}
          isLoading={isLoading} />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={deleteConfirmCard}
          isLoading={isLoading} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
