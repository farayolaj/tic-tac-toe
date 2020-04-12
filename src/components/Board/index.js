import React, { useRef, useState, useLayoutEffect } from 'react';
import Board from './../../model/Board';
import './index.css';

function BoardView() {

  const boardRef = useRef(new Board());
  const [boardRep, setBoardRep] = useState(boardRef.current.toArray());
  const [win, setWin] = useState(boardRef.current.win);
  const [gameOver, setGameOver] = useState(boardRef.current.gameOver);

  useLayoutEffect(() => {
    setWin(boardRef.current.win);
    setGameOver(boardRef.current.gameOver);
  }, [boardRep]);

  return (
    <div className="container">
      <div className="card">
        <div className="board">
          {boardRep.map((value, i) => (
            <div className={`cell ${win && win.set.includes(i) ? 'highlight' : ''}`} key={i} onClick={() => {
              boardRef.current.makeMove(i);
              setBoardRep(boardRef.current.toArray());
            }}>
              {value}
            </div>
          ))}
        </div>
        <button onClick={() => {
          boardRef.current.reset();
          setBoardRep(boardRef.current.toArray());
        }} className="button">Reset</button>
        {gameOver && <h1>GAMEOVER!!!</h1>}
        {win && <h2>{`${win.winner} wins`}</h2>}
      </div>

    </div >
  )
}

export default BoardView;