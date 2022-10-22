import React, { useState } from 'react';
import { persistenceStorage } from '../../services/persistenceStorage';
import Header from '../components/header';

export const Game = () => {
  const playerList = persistenceStorage.get('players');
  const loggedPlayer = persistenceStorage.get('loggedPlayer');

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const choices = ['rock', 'paper', 'scissors'];

  const playersUpdated = playerList?.map((playerToUpdate) => {
		if (playerToUpdate.name === loggedPlayer) {
			return { ...playerToUpdate };
		}
		return playerToUpdate;

	});
  persistenceStorage.persist('players', playersUpdated);

  const handlePlayerChoice = (value) => {
    setPlayerChoice(value);
    generateComputerChoice();
  };

  const generateComputerChoice = () => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerChoice);
  };

  return (
    <div>
      <Header />
      <h1>Piedra Papel o Tijera</h1>
      <p>Jugador: {playerChoice}</p>
      <p>Máquina: {computerChoice}</p>
      <button onClick={() => handlePlayerChoice('Piedra')}>Piedra</button>
      <button onClick={() => handlePlayerChoice('Papel')}>Papel</button>
      <button onClick={() => handlePlayerChoice('Tijera')}>Tijera</button>
    </div>
  );
};

export default Game;
