import React, { useEffect, useState } from 'react';
import '.././assets/styles/views/game.css';
import { gameOptions } from '../constants/gameOptions';

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
      <main className='game_container'>
      <h1 className='game_title'>Piedra, Papel, Tijera, Lagarto, Spock</h1>
      <div className='game_scoreboard_container'>
      <div className='game_scoreboard_player'>
      <p>{loggedPlayer}:  </p>
     
<img src={gameOptions.find((option) => option.name === playerChoice)?.icon} alt={playerChoice} />
     
      <p>Jugador: {playerChoice}</p>
      </div>
      
      <div className='game_scoreboard_computer'>
      <p>Ordenador:  </p>
      <img src={gameOptions.find((option) => option.name === computerChoice)?.icon} alt={computerChoice} />
      <p>Ordenador: {computerChoice}</p>
      </div>
      </div>
<div className='game_buttons_container'> {gameOptions.map((btn, key) => (
          <button
          className='game_buttons'
            key={key}
            onClick={() => {
              handlePlayerChoice(btn.name)
              setPlayerChoice(btn.name)
            }}
          > <img className='game_buttons_icon' src={btn.icon} alt="" />
          </button>
        ))}</div>
     
      <p>Resultado partida: {result}</p> 
      </main>
      
    </>
  );
};

export default Game;
