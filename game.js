class GekitaiGame {
  constructor(gameBoard) {
    this.gameBoard = gameBoard;
    this.players = ["X", "O"];
    this.currentPlayerIndex = 0;
  }

  playGame(cell) {
    if (typeof this.gameBoard[cell] !== "number") {
      // Check if the cell value is not a number
      this.gameBoard[cell] = this.players[this.currentPlayerIndex];
      this.pushAdjacentPieces(cell);
      this.reloadInnerTexts();
      this.checkForWin();

      if (
        Object.values(this.gameBoard).filter((marker) => marker !== undefined)
          .length ===
        8 * this.players.length
      ) {
        alert(
          "Player " + this.currentPlayerIndex + " wins by occupying all spaces!"
        );
        location.reload();
      } else if (this.checkForWin()) {
        alert(
          "Player " +
            (this.currentPlayerIndex + 1) +
            " wins by lining up three in a row!"
        );
        location.reload();
      } else {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
      }
    } else {
      // Clear the number value from the cell if it exists
      this.gameBoard[cell] = undefined;
    }
  }

  reloadInnerTexts() {
    for (let i = 0; i < 36; i++) {
      // Assuming a 6x6 grid
      const cellElement = document.querySelector(`.cell[data-index="${i}"]`);
      if (cellElement) {
        cellElement.innerText =
          this.gameBoard[i] !== undefined ? this.gameBoard[i] : "";
      }
    }
  }

  pushAdjacentPieces(cell) {
    // Define the directions in which a piece can be pushed
    const directions = [
      [-1, 0], // up
      [1, 0], // down
      [0, -1], // left
      [0, 1], // right
    ];

    console.log(cell);
    // For each direction, check if there is a piece to push
    directions.forEach(([dx, dy]) => {
      const x = cell % 6;
      const y = Math.floor(cell / 6);
      console.log(x, y);
      const nx = x + dx;
      const ny = y + dy;

      // Check if the new position is within the board
      if (nx >= 0 && nx < 6 && ny >= 0 && ny < 6) {
        const nCell = ny * 6 + nx;

        // Check if the new position is occupied
        if (this.gameBoard[nCell] !== undefined) {
          const nnx = nx + dx;
          const nny = ny + dy;

          // Check if the next position is within the board and unoccupied
          if (nnx >= 0 && nnx < 6 && nny >= 0 && nny < 6) {
            const nnCell = nny * 6 + nnx;
            console.log(nnCell);

            if (this.gameBoard[nnCell] === undefined) {
              console.log("pushing");
              // Push the piece
              this.gameBoard[nnCell] = this.gameBoard[nCell];
              this.gameBoard[nCell] = undefined;
              console.log(this.gameBoard);
            }
          } else if (nnx < 0 || nnx >= 6 || nny < 0 || nny >= 6) {
            // If the next position is off the board, remove the piece
            this.gameBoard[nCell] = undefined;
          }
        }
      }
    });
  }

  checkForWin() {
    const board = Object.values(this.gameBoard);
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [6, 7, 8],
      [7, 8, 9],
      [8, 9, 10],
      [9, 10, 11],
      [12, 13, 14],
      [13, 14, 15],
      [14, 15, 16],
      [15, 16, 17],
      [18, 19, 20],
      [19, 20, 21],
      [20, 21, 22],
      [21, 22, 23],
      [24, 25, 26],
      [25, 26, 27],
      [26, 27, 28],
      [27, 28, 29],
      [30, 31, 32],
      [31, 32, 33],
      [32, 33, 34],
      [33, 34, 35],

      // Columns
      [0, 6, 12],
      [6, 12, 18],
      [12, 18, 24],
      [18, 24, 30],
      [1, 7, 13],
      [7, 13, 19],
      [13, 19, 25],
      [19, 25, 31],
      [2, 8, 14],
      [8, 14, 20],
      [14, 20, 26],
      [20, 26, 32],
      [3, 9, 15],
      [9, 15, 21],
      [15, 21, 27],
      [21, 27, 33],
      [4, 10, 16],
      [10, 16, 22],
      [16, 22, 28],
      [22, 28, 34],
      [5, 11, 17],
      [11, 17, 23],
      [17, 23, 29],
      [23, 29, 35],

      // Diagonals
      [0, 7, 14],
      [1, 8, 15],
      [2, 9, 16],
      [3, 10, 17],
      [4, 11, 18],
      [5, 12, 19],
      [6, 13, 20],
      [7, 14, 21],
      [8, 15, 22],
      [9, 16, 23],
      [10, 17, 24],
      [11, 18, 25],
      [12, 19, 26],
      [13, 20, 27],
      [14, 21, 28],
      [15, 22, 29],
      [16, 23, 30],
      [17, 24, 31],
      [18, 25, 32],
      [19, 26, 33],
      [20, 27, 34],
      [21, 28, 35],
      [2, 7, 12],
      [3, 8, 13],
      [4, 9, 14],
      [5, 10, 15],
      [10, 15, 20],
      [15, 20, 25],
      [20, 25, 30],
      [25, 31, 36],
      [8, 13, 18],
      [9, 14, 19],
      [14, 19, 24],
      [19, 24, 29],
      [24, 29, 34],
      [29, 34, 35],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        alert(board[a] + " wins!");
        location.reload();
        return;
      }
    }
  }

  isTie() {
    return Object.values(this.gameBoard).every(
      (marker) => marker !== undefined
    );
  }
}

const game = new GekitaiGame({
  0: undefined,
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined,
  9: undefined,
  10: undefined,
  11: undefined,
  12: undefined,
  13: undefined,
  14: undefined,
  15: undefined,
  16: undefined,
  17: undefined,
  18: undefined,
  19: undefined,
  20: undefined,
  21: undefined,
  22: undefined,
  23: undefined,
  24: undefined,
  25: undefined,
  26: undefined,
  27: undefined,
  28: undefined,
  29: undefined,
  30: undefined,
  31: undefined,
  32: undefined,
  33: undefined,
  34: undefined,
  35: undefined,
});

const board = document.getElementById("game");
const cells = Array.from(board.querySelectorAll(".cell"));

for (let i = 0; i < cells.length; i++) {
  cells[i].dataset.index = i; // Assign index to data-index attribute
  cells[i].addEventListener("click", function () {
    const index = this.dataset.index;
    game.playGame(index);
  });
}
