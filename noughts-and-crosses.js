class Marker {
    #symbol = '';

    constructor(symbol) {
        this.#symbol = symbol;
    }

    isNought() {
        return this.#symbol === 'O'
    }

    isCross() {
        return this.#symbol === 'X'
    }

    isBlank() {
        return this.#symbol === 'blank'
    }

    equals(otherMarker) {
        return this.#symbol === otherMarker.#symbol;
    }
}

class Nought extends Marker {
    constructor() {
        super('O');
    }
}

class Cross extends Marker {
    constructor() {
        super('X');
    }
}

class BlankMarker extends Marker {
    constructor() {
        super('blank');
    }
}

class Player {

    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }

    getName() {
        return this.name
    }

    getMarker() {
        return this.marker
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
            [new BlankMarker(), new BlankMarker(), new BlankMarker()]
        ];
    }

    getCell(row, column) {
        return this.cells[row][column]
    }

    placeMarker(row, column, marker) {
        this.cells[row][column] = marker
    }
}

const myBoard = new Board()
myBoard.placeMarker(1, 0, new Nought())
myBoard.placeMarker(1, 0, new Cross())
myBoard.placeMarker(1, 0, new BlankMarker())
console.log(myBoard.getCell(1,0))