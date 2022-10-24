import React, { useState } from 'react';
import '.././assets/styles/views/home.css';
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
    <div className="home_container">
      <h1 className="home_title">Introduce jugador</h1>
      <form className="home_form" onSubmit={sendPlayer}>
        <label htmlFor=""></label>
        <input
          placeholder="Nombre"
          className="home_form_input"
          type="text"
          required
          onChange={(event) => setPlayerName(event.target.value)}
        />
        <button className="home_form_btn" type="submit">
          Entrar
        </button>
      </form>
      <div className="home_img_container">
        <div className="home_img_lizard" />
        <div className="home_img_paper" />
        <div className="home_img_rock" />
        <div className="home_img_scissors" />
        <div className="home_img_spock" />
      </div>
    </div>
  );
};

export default Home;
