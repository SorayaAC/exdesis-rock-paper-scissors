/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '.././assets/styles/views/game.css';
import { gameOptions } from '../constants/gameOptions';
import { gameOptionsNull } from '../constants/gameOptionsNull';
import { persistenceStorage } from '../../services/persistenceStorage';
import Header from '../components/header';
import Footer from '../components/footer';

export const Game = () => {
  const playerList = persistenceStorage.get('players');
  const loggedPlayer = persistenceStorage.get('loggedPlayer');
  const player = playerList?.find(({ name }) => name === loggedPlayer);

  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [playerScore, setPlayerScore] = useState(player?.score);
  const [computerScore, setComputerScore] = useState(0);
  const choices = ['Piedra', 'Papel', 'Tijeras', 'Lagarto', 'Spock'];

  const playersUpdated = playerList?.map((playerToUpdate) => {
    if (playerToUpdate.name === loggedPlayer) {
      return { ...playerToUpdate };
    }
    return playerToUpdate;
  });
  persistenceStorage.persist('players', playersUpdated);

  const handlePlayerChoice = (value) => {
    setPlayerChoice(value);
    setComputerChoice(null);
    generateComputerChoice();
  };
  const generateComputerChoice = () => {
    setTimeout(() => {
      const randomChoice = Math.floor(Math.random() * choices.length);
      setComputerChoice(choices[randomChoice]);
    }, 1000);
  };

  const generateResult = () => {
    if (playerChoice === null || computerChoice === null) {
      setResult('');
    } else if (playerChoice === computerChoice) {
      setResult('Empate');
    } else if (
      (playerChoice === 'Tijeras' && computerChoice === 'Papel') ||
      (playerChoice === 'Papel' && computerChoice === 'Piedra') ||
      (playerChoice === 'Piedra' && computerChoice === 'Lagarto') ||
      (playerChoice === 'Lagarto' && computerChoice === 'Spock') ||
      (playerChoice === 'Spock' && computerChoice === 'Tijeras') ||
      (playerChoice === 'Tijeras' && computerChoice === 'Lagarto') ||
      (playerChoice === 'Lagarto' && computerChoice === 'Papel') ||
      (playerChoice === 'Papel' && computerChoice === 'Spock') ||
      (playerChoice === 'Spock' && computerChoice === 'Piedra') ||
      (playerChoice === 'Piedra' && computerChoice === 'Tijeras')
    ) {
      setResult('¡Has ganado!');
      setPlayerScore(playerScore + 1);
    } else {
      setResult('¡Has perdido!');
      setComputerScore(computerScore + 1);
    }
  };

  const generateScore = () => {
    const playersUpdated = playerList?.map((playerToUpdate) => {
      if (playerToUpdate.name === loggedPlayer) {
        return { ...playerToUpdate, score: playerScore };
      }
      return playerToUpdate;
    });
    persistenceStorage.persist('players', playersUpdated);
  };

  useEffect(() => {
    generateResult();
    generateScore();
  }, [computerChoice]);

  return (
    <>
      <Header />
      <main className="game_container">
        <h1 className="game_title">Piedra Papel Tijera Lagarto Spock</h1>
        <div className="game_scoreboard_container">
          <div className="game_scoreboard_player">
            <p>
              {loggedPlayer}: {playerScore}{' '}
            </p>

            <img
              className="game_scoreboard_img"
              src={
                gameOptionsNull.find((option) => option.name === playerChoice)
                  ?.icon
              }
              alt={playerChoice}
            />
          </div>

          <div className="game_scoreboard_computer">
            <p>CPU: {computerScore} </p>
            <img
              className="game_scoreboard_img"
              src={
                gameOptionsNull.find((option) => option.name === computerChoice)
                  ?.icon
              }
              alt={computerChoice}
            />
          </div>
        </div>
        <div className="game_buttons_container">
          {' '}
          {gameOptions.map((btn, key) => (
            <button
              className="game_buttons"
              key={key}
              onClick={() => {
                handlePlayerChoice(btn.name);
                setPlayerChoice(btn.name);
              }}
            >
              {' '}
              <img className="game_buttons_icon" src={btn.icon} alt="" />
            </button>
          ))}
        </div>
        <div className="game_result_container">
          <p className="game_result">{result}</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Game;
