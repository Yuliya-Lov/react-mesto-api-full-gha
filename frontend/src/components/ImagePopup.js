import React from "react"

function ImagePopup({ isOpen, title, image, onClose }) {
  return (
    <div className={`popup popup_type_view-image ${isOpen ? 'popup_opened' : ''}`}>
      {isOpen &&
        <div className="popup__opened-place">
          <img className="popup__opened-image" src={image} alt={title} />
          <h2 className="popup__opened-title">{title}</h2>
          <button type="button" onClick={onClose} className="popup__button-close" aria-label="Закрыть изображение."></button>
        </div>
      }
    </div>
  )
};

export default ImagePopup;
