import { useState } from "react";
import BoardView from "./views/Board";
import "./App.css";
import Home from "./views/Home";

function App() {
  const onFormSubmit = (event) => {
    event.preventDefault();
    setGameStarted(true);
  };

  const onToggle = (value) => {
    toUseAI(value);
  };

  const toggleIsEasy = () => setIsEasy(!isEasy);

  const [useAI, toUseAI] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [isEasy, setIsEasy] = useState(false);

  return gameStarted ? (
    <BoardView
      useAI={useAI}
      onExit={() => setGameStarted(false)}
      isEasy={isEasy}
    />
  ) : (
    <Home
      {...{
        onToggle,
        onFormSubmit,
        comp: useAI,
        level: isEasy,
        onLevelChanged: toggleIsEasy,
      }}
    />
  );
}

export default App;
