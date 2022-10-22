import React, { useState } from 'react';
import { persistenceStorage } from '../../services/persistenceStorage';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [playerName, setPlayerName] = useState('');
  const goTo = useNavigate();
  const sendPlayer = async (event) => {
    event.preventDefault();

    const player = {
      name: playerName,
      score: 0,
      highScore: 0,
    };

    const players = persistenceStorage.get('players');
    persistenceStorage.persist('loggedPlayer', player.name);
    if (players === null) {
      const emptyPlayersArray = [];
      persistenceStorage.persist('players', [...emptyPlayersArray, player]);
      goTo('/game');
    } else {
      const joiningPlayer = players.filter(
        (playerToFind) => playerToFind.name === playerName
      );
      if (!joiningPlayer.length) {
        persistenceStorage.persist('players', [...players, player]);
        goTo('/game');
      } else {
        goTo('/game');
      }
    }
  };

  return (
    <>
      <h1>Introduce jugador</h1>
      <form onSubmit={sendPlayer}>
        <input
          type="text"
          required
          onChange={(event) => setPlayerName(event.target.value)}
        />
        <button>Enviar</button>
      </form>
    </>
  );
};

export default Home;
