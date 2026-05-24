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
    this.changeTurnPlayer();
  }

  resetGame() {
    this.board.resetBoard();
    this.turnPlayer = this.player1;
  }
}

