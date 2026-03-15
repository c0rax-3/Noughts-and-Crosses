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

    isOccupied(row, column) {
        return !(this.cells[row][column].isBlank())
    }

    checkEndCondition() {
        if (this.getCell(0,0) === this.getCell(0,1) && this.getCell(0,1) === this.getCell(0,2) 
        && this.isOccupied(0,0)) {
            return this.getCell(0,0)
        }

        if (this.getCell(1,0) === this.getCell(1,1) && this.getCell(1,2) === this.getCell(1,0) 
        && this.isOccupied(1,0)) {
            return this.getCell(1,0)
        }

        if (this.getCell(2,0) === this.getCell(2,1) && this.getCell(2,0) === this.getCell(2,2) 
        && this.isOccupied(2,0)) {
            return this.getCell(2,0)
        }

        if (this.getCell(0,0) === this.getCell(1,0) && this.getCell(1,0) === this.getCell(2,0) 
        && this.isOccupied(0,0)) {
            return this.getCell(0,0)
        }

        if (this.getCell(0,1) === this.getCell(1,1) && this.getCell(1,1) === this.getCell(2,1) 
        && this.isOccupied(0,1)) {
            return this.getCell(0,1)
        }

        if (this.getCell(0,2) === this.getCell(1,2) && this.getCell(1,2) === this.getCell(2,2) 
        && this.isOccupied(0,2)) {
            return this.getCell(0,2)
        }

        if (this.getCell(0,0) === this.getCell(1,1) && this.getCell(1,1) === this.getCell(2,2) 
        && this.isOccupied(0,0)) {
            return this.getCell(0,0)
        }

        if (this.getCell(0,2) === this.getCell(1,1) && this.getCell(1,0) === this.getCell(2,0) 
        && this.isOccupied(0,2)) {
            return this.getCell(0,2)
        }

        let allFull = true
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cellOccupied = this.isOccupied(i, j)
                if (!cellOccupied) {
                    allFull = false
                }
            }
        }

        if (allFull) {
            return 'draw'
        }
        return null
    }
}


const myBoard = new Board()
myBoard.placeMarker(0, 0, new Nought())
myBoard.placeMarker(0, 0, new Cross())
myBoard.placeMarker(1, 0, new BlankMarker())
console.log(myBoard.getCell(1,0))