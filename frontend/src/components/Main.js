import React from "react";
import Card from "./Card";

const Main = ({ currentUser, cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) => {
  console.log(cards);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <img
            src={currentUser.avatar}
            alt="Фотография пользователя."
            className="profile__avatar" />
          <button
            type="button"
            onClick={onEditAvatar}
            className="profile__edit-button profile__edit-button_type_photo"
            aria-label="Изменить фотографию."></button>
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__self-description">{currentUser.about}</p>
          <button
            type="button"
            onClick={onEditProfile}
            className="profile__edit-button profile__edit-button_type_info"
            aria-label="Редактировать профиль."></button>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"
          aria-label="Добавить место."></button>
      </section>
      <section className="places" aria-label="Места.">
        {cards.map(card => (<Card
          currentUser={currentUser}
          card={card} key={card._id}
          handleClick={onCardClick}
          handleLike={onCardLike}
          handleDeleteClick={onCardDelete} />))}
      </section>
    </main>
  )
};

export default Main;
