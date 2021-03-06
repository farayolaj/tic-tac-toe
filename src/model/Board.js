export default class Board {

    // this holds all possible winning states
    static possibleWins = new Map([
        [0b111000000, [6, 7, 8]],
        [0b000111000, [3, 4, 5]],
        [0b000000111, [0, 1, 2]],
        [0b100100100, [2, 5, 8]],
        [0b010010010, [1, 4, 7]],
        [0b001001001, [0, 3, 6]],
        [0b100010001, [0, 4, 8]],
        [0b001010100, [2, 4, 6]]
    ]);

    /**
     * 
     * @param {string} firstPlayer the player to play first
     */
    constructor(firstPlayer = 'X') {
        // this is Player X's representation of the board
        this.playerX = 0b000000000;
        // this is Player O's representation of the board
        this.playerO = 0b000000000;
        // this holds the representation of the player whose turn it is
        this.currentPlayer = firstPlayer === 'X' ? 'X' : 'O';
        this.scores = {
            X: 0,
            O: 0
        };
    }

    /**
     * 
     * @param {Number} cell cell to be filled
     * @returns {boolean}
     */
    isValidMove(cell) {
        const freeCells = this.playerO | this.playerX;

        // invalid move if cell is already filled by either player X or O
        if ((cell & freeCells) === cell) return false

        return true;
    }

    /**
     *
     * @param {Number} cell cell to be filled
     */
    makeMove(cell) {
        // this helps to perform binary operations between
        // the binary representation of the move and that of the board
        const cellInBin = Math.pow(2, cell);

        if (this.isValidMove(cellInBin) && !this.isGameOver()) {
            this[`player${this.currentPlayer}`] += cellInBin;
            this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
            this.isAWin();
            this.isGameOver();
        }
    }

    /**
     * checks if game is over and returns a boolean accordingly
     * @returns {boolean}
     */
    isGameOver() {
        if (this.gameOver) return this.gameOver
        this.gameOver = (this.playerO | this.playerX) === 0b111111111 ? true : this.isAWin() ? true : false;
        return this.gameOver
    }

    isDraw() {
        if (this.isGameOver() && !this.win) return true
        else return false;
    }

    /**
     * checks if there is a win on the board and returns the winning player
     * or null if there is no win
     * @returns {{winner: string, set: Number[]}}
     */
    isAWin() {
        if (this.win) return this.win;

        const player = this.currentPlayer === 'O' ? this.playerX : this.playerO;
        let out;
        Board.possibleWins.forEach((value, key) => {
            if ((player & key) === key) {
                out = {
                    winner: this.currentPlayer === 'O' ? 'X' : 'O',
                    set: value
                };
                this.scores[out.winner] += 1;
            }
        });
        this.win = out;
        return out;
    }

    /**
     * @param {Number} cell being played
     */
    isWinningMove(cell) {
        const player = this.currentPlayer === 'O' ? this.playerO : this.playerX;
        let out;

        if (this.isValidMove(cell)) {
            const postState = player + Math.pow(2, cell);
            Board.possibleWins.forEach((value, key) => {
                if ((postState & key) === key) {
                    out = {
                        winner: this.currentPlayer,
                        set: value
                    };
                    this.scores[out.winner] += 1;
                }
            });
        }
        return out;
    }

    /**
     * @returns {string[]}
     */
    toArray() {
        const playerX = this.getAsString('X');
        const playerO = this.getAsString('O');
        // console.log(playerX, playerO);
        const out = [];

        for (let i = playerX.length - 1; i >= 0; i--) {
            if (playerX[i] === '1') out.push('X')
            else if (playerO[i] === '1') out.push('O')
            else out.push('');
        }

        return out;
    }

    /**
     * Returns the binary representation of X or O's state as string
     * @returns {string}
     */
    getAsString(XorO) {
        return this[`player${XorO}`].toString(2).padStart(9, '0');
    }

    /**
     * Cleans the board while switching the first player
     */
    reset() {
        this.playerX = 0b000000000;
        this.playerO = 0b000000000;
        this.win = null;
        this.gameOver = null;
    }

    getPossibleMoves() {
        const playerX = this.getAsString('X');
        const playerO = this.getAsString('O');
        // console.log(playerX, playerO);
        const out = [];

        for (let i = playerX.length - 1; i >= 0; i--) {
            if (playerX[i] === '0' && playerO[i] === '0') out.push(8 - i)
        }

        return out;
    }

    static copy(board) {
        const copy = new Board();
        copy.playerO = board.playerO;
        copy.playerX = board.playerX;
        copy.scores = board.scores;
        copy.currentPlayer = board.currentPlayer;
        copy.gameOver = board.gameOver;
        copy.win = board.win;
        return copy;
    }
}