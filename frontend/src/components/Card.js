import React from "react"

const Card = ({ currentUser, card, handleClick, handleLike, handleDeleteClick }) => {

  const isOwn = card.owner._id === currentUser.id;

  const isLiked = card.likes.some(i => i._id === currentUser.id);
  const cardLikeButtonClassName = (
    `place__like-button ${isLiked && 'place__like-button_active'}`
  );

  return (
    <article className="place">
      <img
        src={card.link}
        onClick={() => handleClick(card)}
        className="place__image"
        alt={card.name} />
      {isOwn && <button
        type="button"
        onClick={() => handleDeleteClick(card)}
        className="place__delete-button"
        aria-label="Удалить место."></button>}
      <div className="place__about">
        <h2 className="place__title">{card.name}</h2>
        <button
          type="button"
          onClick={() => handleLike(card)}
          className={cardLikeButtonClassName}
          aria-label="Поставить лайк.">{card.likes.length}</button>
      </div>
    </article>
  )
};

export default Card;
