import React from 'react';
import '.././assets/styles/components/header.css';
import logout from '.././assets/images/logout.svg'
import { persistenceStorage } from '../../services/persistenceStorage';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const goTo = useNavigate();

  const loggedPlayer = persistenceStorage.get('loggedPlayer');

  const logOutPlayer = () => {
    goTo('/');
  };

  return (
    <header className='header_container'>
      <p>
        Jugador: <span>{loggedPlayer}</span>
      </p>
      <button className="header_btn" onClick={logOutPlayer}><img src={logout} alt="x"/></button>
    </header>
  );
};

export default Header;
