import React from 'react';
import '.././assets/styles/components/header.css';
import { persistenceStorage } from '../../services/persistenceStorage';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const goTo = useNavigate();

  const loggedPlayer = persistenceStorage.get('loggedPlayer');

  const logOutPlayer = () => {
    goTo('/');
  };

  return (
    <header className="header_container">
      <p>
        <i className="fa-regular fa-hand-spock"></i> <span>{loggedPlayer}</span>
      </p>
      <button className="header_btn" onClick={logOutPlayer}>
        {' '}
        <i className="fa-solid fa-right-from-bracket"></i>
      </button>
    </header>
  );
};

export default Header;
