import React from 'react';
import { persistenceStorage } from '../../services/persistenceStorage';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const goTo = useNavigate();

  const loggedPlayer = persistenceStorage.get('loggedPlayer');

  const logOutPlayer = () => {
    goTo('/');
  };

  return (
    <header>
      <p>
        Jugador: <span>{loggedPlayer}</span>
      </p>
      <button onClick={logOutPlayer}>Salir</button>
    </header>
  );
};

export default Header;
