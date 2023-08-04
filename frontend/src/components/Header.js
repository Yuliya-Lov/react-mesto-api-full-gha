import React from "react";
import logo from '../images/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';


const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick =(e) => {
    if (location.pathname === '/'){
      props.signOut();
      props.handleChangeIsLogged(false);
      navigate('/sign-in', {replace: true})
    }
    if (location.pathname === '/sign-in'){
      navigate('/sign-up', {replace: true})
    }
    if (location.pathname === '/sign-up'){
      navigate('/sign-in', {replace: true})
    }
  }


  return (
    <header className="header">
      <a className="header__link" href="#"><img className="header__logo" src={logo} alt="Логотип: Место Россия." /></a>
      <div className="header__logged">
      <p className="header__current-user">{props.isLoggedIn ? props.email : ''}</p>
      <button className={`header__action-button ${props.isLoggedIn && 'header__action-button_foggy'}`} onClick={handleClick}>
        {props.isLoggedIn ? 'Выйти' : (location.pathname === '/sign-in'? 'Регистрация' : 'Вход')}
        </button>
      </div>
    </header>
  )
};

export default Header;
