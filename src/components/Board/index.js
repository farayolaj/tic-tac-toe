import React, { useRef, useState, useLayoutEffect } from 'react';
import Board from './../../model/Board';
import './index.css';

/* TODO:
 * DISABLE RESET BUTTON WHILE GAME IS GOING ON
 * ADD SOME ANIMATIONS TO THE BUTTON
 * 
 */
function BoardView() {

  const boardRef = useRef(new Board());
  const [boardRep, setBoardRep] = useState(boardRef.current.toArray());
  const [win, setWin] = useState(boardRef.current.win);
  const [draw, setDraw] = useState(boardRef.current.isDraw());
  const [scores, setScores] = useState(boardRef.current.scores)

  useLayoutEffect(() => {
    setWin(boardRef.current.win);
    setDraw(boardRef.current.isDraw());
    setScores(boardRef.current.scores);
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
        <div className="scores">
          <span>X: {scores.X}</span>
          <span>O: {scores.O}</span>
        </div>
        <button onClick={() => {
          boardRef.current.reset();
          setBoardRep(boardRef.current.toArray());
        }} className="button">Reset</button>
        {draw && <h1>DRAW</h1>}
        {win && <h2>{`${win.winner} WINS`}</h2>}
      </div>

    </div >
  )
}

export default BoardView;