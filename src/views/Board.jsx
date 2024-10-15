import clone from "lodash.clonedeep";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Cell from "../components/Cell";
import Container from "../components/Container";
import FlexRow from "../components/FlexRow";
import Board from "../model/Board";
import "./Board.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import PredictWorker from "../model/predict?worker";

// console.log('-- Inside Board.js --')

function BoardView({ useAI, onExit, isEasy }) {
  const [board, setBoard] = useState(new Board("X"));

  const boardArr = board.toArray();
  const isWin = board.isAWin();
  const scores = board.scores;
  const isDraw = board.isDraw();

  useEffect(() => {
    if (board.currentPlayer === "O" && useAI) {
      const worker = new PredictWorker();
      worker.onmessage = (e) => {
        const move = e.data[0];
        if (move !== null) {
          board.makeMove(move);
          setBoard(clone(board));
        }
      };
      worker.postMessage({ board, player: "O", isEasy });

      return () => worker.terminate();
    }
  }, [board, isEasy, useAI]);

  return (
    <Container>
      <Card>
        {`${board.currentPlayer}'s turn... ${
          useAI && board.currentPlayer === "O" ? "(AI)" : ""
        }`}
        <div className="board">
          {boardArr.map((value, i) => (
            <Cell
              $inWinSet={isWin && isWin.set.includes(i)}
              key={i}
              onClick={() => {
                if (!(useAI && board.currentPlayer === "O")) {
                  board.makeMove(i);
                  setBoard(clone(board));
                }
              }}
            >
              {value}
            </Cell>
          ))}
        </div>
        <div className="scores">
          <span>X: {scores.X}</span>
          <span>O: {scores.O}</span>
        </div>
        <FlexRow>
          <Button
            onClick={() => {
              board.reset();
              setBoard(clone(board));
            }}
          >
            Reset
          </Button>
          <Button onClick={onExit}>Home</Button>
        </FlexRow>
        {isWin && <h2>{`${isWin.winner} WINS`}</h2>}
        {isDraw && <h1>DRAW</h1>}
      </Card>
    </Container>
  );
}

export default BoardView;
