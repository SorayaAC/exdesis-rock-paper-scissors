import React, { useEffect, useState } from 'react';
import { persistenceStorage } from '../../services/persistenceStorage';
import Header from '../components/header';

export const Game = () => {
  const playerList = persistenceStorage.get('players');
  const loggedPlayer = persistenceStorage.get('loggedPlayer');
  // const player = playerList?.find(({ name }) => name === loggedPlayer);

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  // const [playerScore, setPlayerScore] = useState(player?.score);
  // const [computerScore, setComputerScore] = useState(0);
  const choices = [
    'Piedra', 'Papel', 'Tijeras', 'Lagarto', 'Spock'];

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

  useEffect(() => {
      switch(playerChoice + computerChoice) {
        case 'TijerasPapel':
        case 'PapelPiedra':
        case 'PiedraLagarto':
        case 'LagartoSpock':
        case 'SpockTijeras':
        case 'TijerasLagarto':
        case 'LagartoPapel':
        case 'PapelSpock':
        case 'SpockPiedra':
        case 'PiedraTijeras':
          setResult('Has ganado!');
          break;
        case 'PapelTijeras':
        case 'PiedraPapel':
        case 'LagartoPiedra': 
        case 'SpockLagarto':
        case 'TijerasSpock':
        case 'LagartoTijeras':
        case 'PapelLagarto':
        case 'SpockPapel':
        case 'PiedraSpock':
        case 'TijerasPiedra':
          setResult('Has perdido!');
          break;
        case 'PiedraPiedra':
        case 'PapelPapel':
        case 'TijerasTijeras':
        case 'LagartoLagarto':
        case 'SpockSpock':
          setResult('¡Empate!');
          break;
          default: 
           setResult('');      
  }
}, [playerChoice, computerChoice]);

  return (
    <>
      <Header /> 
      <main>
      <h1>Piedra, Papel, Tijera, Lagarto, Spock</h1>
      <p>Puntos jugador:  </p>
      <p>Jugador: {playerChoice}</p>
      <p>Puntos ordenador:  </p>
      <p>Ordenador: {computerChoice}</p>
      <button onClick={() => handlePlayerChoice('Piedra')}>Piedra</button>
      <button onClick={() => handlePlayerChoice('Papel')}>Papel</button>
      <button onClick={() => handlePlayerChoice('Tijeras')}>Tijeras</button>
      <button onClick={() => handlePlayerChoice('Lagarto')}>Lagarto</button>
      <button onClick={() => handlePlayerChoice('Spock')}>Spock</button>
      <p>Resultado partida: {result}</p> 
      </main>
      
    </>
  );
};

export default Game;
