import clone from 'lodash.clonedeep';
import Board from './Board';

export default class MinMax {

  static EASY = 3;
  static HARD = 0;

  constructor(player='X', maxDepth=5) {
    this.player = player;
    this.maxDepth = maxDepth;
  }

  /**
   * 
   * @param {Board} board 
   * @param {Number} depth
   */
  maximize(board, depth=MinMax.EASY) {
    board = Board.copy(board);
    if (depth > this.maxDepth || board.isGameOver() || board.isAWin())
      return [null, this.calcUtility(board)];

    let maxUtil = -Infinity;
    let maxUtilMove = null;

    board.getPossibleMoves().forEach(value => {
      // console.log(value);
      const boardClone = clone(board);
      boardClone.makeMove(value);
      const utility = this.minimize(boardClone, depth+1)[1];

      if (utility > maxUtil) {
        maxUtil = utility;
        maxUtilMove = value;
      }
    });
    // console.log([maxUtilMove, maxUtil]);

    return [maxUtilMove, maxUtil];
  }

  /**
   * 
   * @param {Board} board 
   */
  minimize(board, depth=0) {
    if (depth > this.maxDepth || board.isGameOver() || board.isAWin())
      return [null, this.calcUtility(board)];

    let minUtil = Infinity;
    let minUtilMove = null;

    board.getPossibleMoves().forEach(value => {
      const boardClone = clone(board);
      boardClone.makeMove(value);
      const utility = this.maximize(boardClone, depth+1)[1];

      if (utility < minUtil) {
        minUtil = utility;
        minUtilMove = value;
      }
    });

    return [minUtilMove, minUtil]
  }

  /**
   * 
   * @param {Board} board 
   */
  calcUtility(board) {
    const isAWin = board.isAWin();
    if (!isAWin) return 0;
    if (isAWin.winner === this.player) return 1;
    else return -1;
  }
}
