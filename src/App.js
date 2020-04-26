import React from 'react';
import './App.css';
import Board from './views/Board.js';
import Home from './views/Home';
import { useState } from 'react';

function App() {
  const onFormSubmit = (event) => {
    event.preventDefault();
    setGameStarted(true);
  }

  const onToggle = (value) => {
    toUseAI(value);
  }

  const toggleIsEasy = () => setIsEasy(!isEasy);

  const [useAI, toUseAI] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [isEasy, setIsEasy] = useState(false);

  return gameStarted ? 
    <Board useAI={useAI} onExit={() => setGameStarted(false)} isEasy={isEasy} /> 
    : 
    <Home {...{onToggle, onFormSubmit, comp: useAI, level: isEasy, onLevelChanged: toggleIsEasy}} />;
}

export default App;
