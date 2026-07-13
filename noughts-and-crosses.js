class Marker {
  #symbol = "";

  constructor(symbol) {
    this.#symbol = symbol;
  }

  isNought() {
    return this.#symbol === "O";
  }

  isCross() {
    return this.#symbol === "X";
  }

  isBlank() {
    return this.#symbol === "blank";
  }

  equals(otherMarker) {
    return this.#symbol === otherMarker.#symbol;
  }
}

class Nought extends Marker {
  constructor() {
    super("O");
  }
}

class Cross extends Marker {
  constructor() {
    super("X");
  }
}

class BlankMarker extends Marker {
  constructor() {
    super("blank");
  }
}

class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
  }

  getName() {
    return this.name;
  }

  getMarker() {
    return this.marker;
  }

  changeName(newName) {
    this.name = newName;
    return this.name;
  }
}

class Board {
  constructor() {
    this.cells = [
      [new BlankMarker(), new BlankMarker(), new BlankMarker()],
      [new BlankMarker(), new BlankMarker(), new BlankMarker()],
      [new BlankMarker(), new BlankMarker(), new BlankMarker()],
    ];
  }

  isOccupied(row, column) {
    return !this.cells[row][column].isBlank();
  }

  getCell(row, column) {
    return this.cells[row][column];
  }

  placeMarker(row, column, marker) {
    if (this.cells[row][column].isBlank() && !this.checkWin()) {
      this.cells[row][column] = marker;
      return true;
    } else {
      return false; //this represents a failure to place a marker
    }
  }

  checkWin() {
    const winConditions = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [2, 0],
        [1, 1],
        [0, 2],
      ],
    ];

    for (let i = 0; i < 8; i++) {
      const condition = winConditions[i];
      const [cellA, cellB, cellC] = condition;

      if (
        this.getCell(cellA[0], cellA[1]).equals(
          this.getCell(cellB[0], cellB[1]),
        ) &&
        this.getCell(cellA[0], cellA[1]).equals(
          this.getCell(cellC[0], cellC[1]),
        ) &&
        this.isOccupied(cellA[0], cellA[1])
      ) {
        return true;
      }
    }
    return false;
  }

  checkDraw() {
    const winState = this.checkWin();
    if (winState === true) {
      return false;
    }

    let allFull = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellOccupied = this.isOccupied(i, j);
        if (!cellOccupied) {
          allFull = false;
        }
      }
    }
    return allFull;
  }

  resetBoard() {
    this.cells = [
      [new BlankMarker(), new BlankMarker(), new BlankMarker()],
      [new BlankMarker(), new BlankMarker(), new BlankMarker()],
      [new BlankMarker(), new BlankMarker(), new BlankMarker()],
    ];
  }
}

// enum example!
const GameResultTypes = {
  Win: "win",
  Draw: "draw",
  Pending: "pending",
};

class Game {
  constructor() {
    this.board = new Board();
    this.player1 = new Player("Player1", new Nought());
    this.player2 = new Player("Player2", new Cross());
    this.turnPlayer = this.player1;
    this.init()
  }

  init() {
    const cell0 = document.querySelector('.cell#cell0')
    cell0.addEventListener("click", () => {
      this.playTurn(0,0)
    })
    const cell1 = document.querySelector('.cell#cell1')
    cell1.addEventListener("click", () => {
      this.playTurn(1,0)
    })
    const cell2 = document.querySelector('.cell#cell2')
    cell2.addEventListener("click", () => {
      this.playTurn(2,0)
    })
    const cell3 = document.querySelector('.cell#cell3')
    cell3.addEventListener("click", () => {
      this.playTurn(0,1)
    })
    const cell4 = document.querySelector('.cell#cell4')
    cell4.addEventListener("click", () => {
      this.playTurn(1,1)
    })
    const cell5 = document.querySelector('.cell#cell5')
    cell5.addEventListener("click", () => {
      this.playTurn(2,1)
    })
    const cell6 = document.querySelector('.cell#cell6')
    cell6.addEventListener("click", () => {
      this.playTurn(0,2)
    })
    const cell7 = document.querySelector('.cell#cell7')
    cell7.addEventListener("click", () => {
      this.playTurn(1,2)
    })
    const cell8 = document.querySelector('.cell#cell8')
    cell8.addEventListener("click", () => {
      this.playTurn(2,2)
    })
  }

  changeNames(player1Name, player2Name) {
    this.player1.changeName(player1Name);
    this.player2.changeName(player2Name);
  }

  getTurnPlayer() {
    return this.turnPlayer;
  }

  changeTurnPlayer() {
    if (this.getGameResultType() === GameResultTypes.Pending) {
      if (this.getTurnPlayer() === this.player1) {
        this.turnPlayer = this.player2;
      } else {
        this.turnPlayer = this.player1;
      }
    }
  }

  getGameResultType() {
    if (this.board.checkWin()) {
      return GameResultTypes.Win;
    }

    if (this.board.checkDraw()) {
      return GameResultTypes.Draw;
    }
    return GameResultTypes.Pending;
  }

  announceWinner(player) {
    console.log(`${player.getName()} WON!`);
  }

  announceDraw() {
    console.log("DRAW!");
  }

  announceInvalidPlacement() {
    console.log("You can't do that!");
  }

  displayMarkerPlaced(row, column, playerMarker) {
    //cell id is (3 x column) + row in terms of cell coords
    const cellId = `cell${3 * column + row}`
    const cell = document.querySelector(`.cell#${cellId}`);
    if (playerMarker.isNought()) {
      cell.textContent = 'O';
    } else if (playerMarker.isCross()) {
      cell.textContent = 'X';
    } else {
      cell.textContent = '';
    }
  }

  playTurn(row, column) {
    const gameResult = this.getGameResultType();
    if (gameResult === GameResultTypes.Win) {
      this.announceWinner(this.getTurnPlayer());
      return;
    }
    if (gameResult === GameResultTypes.Draw) {
      this.announceDraw();
      return;
    }

    const turnPlayer = this.getTurnPlayer();
    const placed = this.board.placeMarker(row, column, turnPlayer.getMarker());
    if (!placed) {
      this.announceInvalidPlacement();
      return;
    }
    this.displayMarkerPlaced(row, column, turnPlayer.getMarker());
    this.changeTurnPlayer();
  }

  resetGame() {
    this.board.resetBoard();
    this.turnPlayer = this.player1;
  }
}

const myGame = new Game();
// myGame.changeNames("Alice", "Bob");
// myGame.playTurn(1, 1);
// myGame.playTurn(0, 2);
// myGame.playTurn(2, 1);
// myGame.playTurn(0, 1);
// myGame.playTurn(1, 0);
// myGame.playTurn(0, 0);
// console.log(myGame.board);
// myGame.resetGame();
// myGame.playTurn(1, 1);
// myGame.playTurn(0, 2);
// myGame.playTurn(2, 1);
// myGame.playTurn(0, 1);
// myGame.playTurn(1, 0);
// myGame.playTurn(0, 0);
// console.log(myGame.board);
