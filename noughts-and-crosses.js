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

const marker1 = new BlankMarker();

const marker2 = new BlankMarker();
console.log(marker1.equals(marker2))

class Player {

    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }

    changeName(newName) {
        this.name = newName
        return this.name
    } 

    placeMarker(marker) {

    }

}